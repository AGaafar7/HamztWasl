// app/portal/page.jsx
import { fetchCourses } from '../../lib/queries/courses'
import { fetchEnrolledCourseIds, fetchCompletedCountMap } from '../../lib/queries/user'
import PortalCoursesClient from './PortalCoursesClient'
import { createClient } from '../../lib/supabase/server'

export default async function PortalCoursesPage() {
  const [courses, enrolledIds, completedMap] = await Promise.all([
    fetchCourses(),
    fetchEnrolledCourseIds(),
    fetchCompletedCountMap(),
  ])

    // Count actual lessons per course so progress uses the real number,
  // not the declared lessons_count an instructor typed in.
  const supabase = await createClient()
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
    // Use the real count when the course has real lessons; fall back to the
    // declared count for special courses (alphabet).
    const denominator = countsByCourse[c.id] || c.lessons
    const progress = enrolled
      ? Math.min(100, Math.round((completed / Math.max(denominator, 1)) * 100))
      : null
    return { ...c, enrolled, progress }
  })

  return <PortalCoursesClient courses={merged} />
}