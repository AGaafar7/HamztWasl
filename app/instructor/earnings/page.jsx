// app/instructor/earnings/page.jsx
import { createClient } from '../../../lib/supabase/server'
import { fetchInstructorEarnings } from '../../../lib/queries/instructor'
import InstructorEarningsClient from './InstructorEarningsClient'

export default async function InstructorEarningsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const earnings = await fetchInstructorEarnings(user.id)
  return <InstructorEarningsClient earnings={earnings} />
}