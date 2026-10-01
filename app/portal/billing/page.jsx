import Link from 'next/link'
import { requireUser } from '../../../lib/supabase/server'
import { fetchSubscriptionStatus } from '../../../lib/queries/user'
import BillingClient from './BillingClient'

export const metadata = { title: 'Billing' }

export default async function BillingPage() {
  await requireUser()
  const { active, expiresAt } = await fetchSubscriptionStatus()
  return <BillingClient active={active} expiresAt={expiresAt} />
}