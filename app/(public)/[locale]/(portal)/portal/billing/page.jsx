import { requireUser } from '@/lib/supabase/server'
import { fetchSubscriptionStatus } from '@/lib/queries/user'
import { translations } from '@/i18n/translations.js'
import BillingClient from './BillingClient'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = translations[locale] || translations.en
  return { title: t.portal.billingPage.title }
}

export default async function BillingPage({ params }) {
  const { locale } = await params
  await requireUser()
  const { active, expiresAt, cancelled } = await fetchSubscriptionStatus()
  
  return <BillingClient active={active} expiresAt={expiresAt} cancelled={cancelled} />
}