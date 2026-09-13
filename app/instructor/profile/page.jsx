// app/instructor/profile/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchProfile } from '../../../lib/queries/user'
import { fetchInstructorStats } from '../../../lib/queries/instructor'
import InstructorProfileClient from './InstructorProfileClient'

export default async function InstructorProfilePage() {
  const { user } = await requireUser()
  const [profile, stats] = await Promise.all([
    fetchProfile(),
    fetchInstructorStats(user.id),
  ])
  return <InstructorProfileClient profile={profile} stats={stats} />
}