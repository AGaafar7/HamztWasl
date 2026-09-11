// app/portal/courses/[id]/page.jsx
import { notFound } from 'next/navigation'
import { fetchCourse } from '../../../../lib/queries/courses'
import { fetchLetters } from '../../../../lib/queries/letters'
import { fetchCompletedLessonKeys } from '../../../../lib/queries/user'
import CourseDetailClient from './CourseDetailClient'

export default async function CourseDetailPage({ params }) {
  const { id } = await params
  const course = await fetchCourse(id, 'en')
  if (!course) notFound()

  const [letters, completedKeys] = await Promise.all([
    id === 'alphabet' ? fetchLetters() : Promise.resolve([]),
    fetchCompletedLessonKeys(id),
  ])

  return (
    <CourseDetailClient
      course={course}
      letters={letters}
      completedKeys={completedKeys}
    />
  )
}