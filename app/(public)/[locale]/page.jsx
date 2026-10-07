// app/(public)/[locale]/page.jsx
import Hero from '@/components/Hero.jsx'
import Stats from '@/components/Stats.jsx'
import Courses from '@/components/Courses.jsx'
import LearningPath from '@/components/LearningPath.jsx'
import Testimonials from '@/components/Testimonials.jsx'
import CTA from '@/components/CTA.jsx'
import { metadataFor, homePath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) return {}
  return metadataFor('home', locale, homePath)
}

export default async function HomePage({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) notFound()

  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <LearningPath />
      <Testimonials />
      <CTA />
    </>
  )
}