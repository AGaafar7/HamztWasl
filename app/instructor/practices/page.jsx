// app/instructor/practices/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchInstructorPractices, fetchInstructorCourses } from '../../../lib/queries/instructor'
import InstructorPracticesClient from './InstructorPracticesClient'

export default async function InstructorPracticesPage() {
  const { user } = await requireUser()
  const [practices, courses] = await Promise.all([
    fetchInstructorPractices(user.id),
    fetchInstructorCourses(user.id),
  ])
  return <InstructorPracticesClient practices={practices} courses={courses} />
}