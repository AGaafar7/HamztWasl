// app/portal/profile/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchProfile, fetchStudentProfileData } from '../../../lib/queries/user'
import ProfileClient from './ProfileClient'

export default async function StudentProfilePage() {
  const { user } = await requireUser()
  const [profile, data] = await Promise.all([
    fetchProfile(),
    fetchStudentProfileData(user.id),
  ])
  return <ProfileClient profile={profile} data={data} />
}