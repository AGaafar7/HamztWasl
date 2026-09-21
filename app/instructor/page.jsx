// app/instructor/page.jsx
import { requireUser } from '../../lib/supabase/server'
import {
  fetchInstructorCourses,
  fetchInstructorEarnings,
  fetchInstructorStats,
} from '../../lib/queries/instructor'
import DashboardClient from './DashboardClient'

export default async function InstructorDashboard() {
  const { supabase, user } = await requireUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const [courses, earnings, stats] = await Promise.all([
    fetchInstructorCourses(user.id),
    fetchInstructorEarnings(user.id),
    fetchInstructorStats(user.id),
  ])

  return (
    <DashboardClient
      profile={profile}
      courses={courses}
      earnings={earnings}
      stats={stats}
    />
  )
}