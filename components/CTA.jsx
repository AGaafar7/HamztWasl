'use client'

import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function CTA() {
  const { t, lang } = useLanguage()
  const c = t.ctaSection
  const localePrefix = lang === 'en' ? '' : `/${lang}`
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="cta-band">
          <div>
            <h2>{c.title}</h2>
            <p>{c.lede}</p>
          </div>
            <div className="cta-actions">
            <a href="#courses" className="btn btn-primary">{c.primary}</a>
            <Link href={`${localePrefix}/pricing`} className="btn btn-on-navy">{c.ghost}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
