// app/instructor/earnings/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchInstructorEarnings } from '../../../lib/queries/instructor'
import InstructorEarningsClient from './InstructorEarningsClient'

export default async function InstructorEarningsPage() {
  const { user } = await requireUser()
  const earnings = await fetchInstructorEarnings(user.id)
  return <InstructorEarningsClient earnings={earnings} />
}