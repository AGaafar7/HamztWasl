// app/(public)/[locale]/refund-policy/page.jsx
import { metadataFor, refundPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'
import { translations } from '@/i18n/translations.js'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) return {}
  return metadataFor('refund', locale, refundPath)
}

export default async function RefundPolicyPage({ params }) {
  const { locale } = await params
  if (!LOCALES.includes(locale)) notFound()

  const t = translations[locale] || translations.en
  const content = t.legal.refund

  // Format date according to locale
  const dateLocale = locale === 'ar' ? 'ar-EG' : locale === 'zh' ? 'zh-CN' : 'en-US'
  const formattedDate = new Date().toLocaleDateString(dateLocale)

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="page-title">{content.title}</h1>
        <p style={{ marginTop: 8, color: 'var(--grey)' }}>
          {content.lastUpdated}: {formattedDate}
        </p>

        <div className="legal-body">
          {content.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}