// app/(public)/[locale]/terms/page.jsx
import { metadataFor, termsPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'
import { getTranslations } from '@/i18n/translations.js'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) return {}
  return metadataFor('terms', locale, termsPath)
}

export default async function TermsPage({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) notFound()

  const t = getTranslations(locale)
  const content = t.legal.terms
  const today = new Date().toLocaleDateString(locale === 'ar' ? 'ar-EG' : locale === 'zh' ? 'zh-CN' : 'en-US')

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="page-title">{content.title}</h1>
        <p style={{ marginTop: 8, color: 'var(--grey)' }}>
          {content.lastUpdated}: {today}
        </p>

        <div className="legal-body">
          {content.sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}