// app/instructor/practices/page.jsx
import { createClient } from '../../../lib/supabase/server'
import { fetchInstructorPractices, fetchInstructorCourses } from '../../../lib/queries/instructor'
import InstructorPracticesClient from './InstructorPracticesClient'

export default async function InstructorPracticesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [practices, courses] = await Promise.all([
    fetchInstructorPractices(user.id),
    fetchInstructorCourses(user.id),
  ])

  return <InstructorPracticesClient practices={practices} courses={courses} />
}