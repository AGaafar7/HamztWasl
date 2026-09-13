// app/instructor/courses/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchInstructorCourses } from '../../../lib/queries/instructor'
import InstructorCoursesClient from './InstructorCoursesClient'

export default async function InstructorCoursesPage() {
  const { user } = await requireUser()
  const courses = await fetchInstructorCourses(user.id)
  return <InstructorCoursesClient courses={courses} />
}