// app/portal/page.jsx
import { fetchCourses } from '../../lib/queries/courses'
import { fetchEnrolledCourseIds, fetchCompletedCountMap } from '../../lib/queries/user'
import { requireUser } from '../../lib/supabase/server'
import PortalCoursesClient from './PortalCoursesClient'

export default async function PortalCoursesPage() {
  const [{ supabase }, courses, enrolledIds, completedMap] = await Promise.all([
    requireUser(),
    fetchCourses(),
    fetchEnrolledCourseIds(),
    fetchCompletedCountMap(),
  ])

  const { data: lessonRows } = await supabase
    .from('course_lessons')
    .select('course_id')

  const countsByCourse = {}
  for (const row of lessonRows || []) {
    countsByCourse[row.course_id] = (countsByCourse[row.course_id] || 0) + 1
  }

  const enrolledSet = new Set(enrolledIds)

  const merged = courses.map((c) => {
    const enrolled = enrolledSet.has(c.id)
    const completed = completedMap[c.id] || 0
    const denominator = countsByCourse[c.id] || c.lessons
    const progress = enrolled
      ? Math.min(100, Math.round((completed / Math.max(denominator, 1)) * 100))
      : null
    return { ...c, enrolled, progress }
  })

  return <PortalCoursesClient courses={merged} />
}