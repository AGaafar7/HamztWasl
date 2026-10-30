// app/(public)/[locale]/pricing/page.jsx
import { metadataFor, pricingPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'
import PricingClient from './PricingClient.jsx'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) return {}
  return metadataFor('pricing', locale, pricingPath)
}

export default async function PricingPage({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) notFound()
  return <PricingClient />
}