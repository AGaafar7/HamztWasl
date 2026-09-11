// app/instructor/page.jsx
import { createClient } from '../../lib/supabase/server'
import {
  fetchInstructorCourses,
  fetchInstructorPractices,
  fetchInstructorEarnings,
} from '../../lib/queries/instructor'
import DashboardClient from './DashboardClient'

export default async function InstructorDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const [courses, practices, earnings] = await Promise.all([
    fetchInstructorCourses(user.id),
    fetchInstructorPractices(user.id),
    fetchInstructorEarnings(user.id),
  ])

  return (
    <DashboardClient
      profile={profile}
      courses={courses}
      practices={practices}
      earnings={earnings}
    />
  )
}