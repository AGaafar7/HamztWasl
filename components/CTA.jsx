'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function CTA() {
  const { t } = useLanguage()
  const c = t.ctaSection

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
            <a href="#" className="btn btn-on-navy">{c.ghost}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
