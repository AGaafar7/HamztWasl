// app/portal/courses/[id]/page.jsx
import { notFound } from 'next/navigation'
import { fetchCourse } from '../../../../lib/queries/courses'
import { fetchLetters } from '../../../../lib/queries/letters'
import { fetchCourseLessons } from '../../../../lib/queries/lessons'
import { fetchCompletedLessonKeys } from '../../../../lib/queries/user'
import CourseDetailClient from './CourseDetailClient'

export default async function CourseDetailPage({ params }) {
  const { id } = await params
  const course = await fetchCourse(id)
  if (!course) notFound()

  const [letters, lessons, completedKeys] = await Promise.all([
    id === 'alphabet' ? fetchLetters() : Promise.resolve([]),
    fetchCourseLessons(id),
    fetchCompletedLessonKeys(id),
  ])

  return (
    <CourseDetailClient
      course={course}
      letters={letters}
      lessons={lessons}
      completedKeys={completedKeys}
    />
  )
}