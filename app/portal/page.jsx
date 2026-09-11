// app/portal/page.jsx
import { fetchCourses } from '../../lib/queries/courses'
import { fetchEnrolledCourseIds, fetchCompletedCountMap } from '../../lib/queries/user'
import PortalCoursesClient from './PortalCoursesClient'

export default async function PortalCoursesPage() {
  const [courses, enrolledIds, completedMap] = await Promise.all([
    fetchCourses(),
    fetchEnrolledCourseIds(),
    fetchCompletedCountMap(),
  ])

  const enrolledSet = new Set(enrolledIds)

  const merged = courses.map((c) => {
    const enrolled = enrolledSet.has(c.id)
    const completed = completedMap[c.id] || 0
    const progress = enrolled
      ? Math.min(100, Math.round((completed / Math.max(c.lessons, 1)) * 100))
      : null
    return { ...c, enrolled, progress }
  })

  return <PortalCoursesClient courses={merged} />
}