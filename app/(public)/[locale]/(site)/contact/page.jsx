// app/(public)/[locale]/contact/page.jsx
import { metadataFor, contactPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'
import ContactClient from './ContactClient.jsx'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) return {}
  return metadataFor('contact', locale, contactPath)
}

export default async function ContactPage({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) notFound()
  return <ContactClient />
}