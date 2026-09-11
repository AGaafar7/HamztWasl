// app/instructor/courses/page.jsx
import { createClient } from '../../../lib/supabase/server'
import { fetchInstructorCourses } from '../../../lib/queries/instructor'
import InstructorCoursesClient from './InstructorCoursesClient'

export default async function InstructorCoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const courses = await fetchInstructorCourses(user.id)
  return <InstructorCoursesClient courses={courses} />
}