'use client'

import { useLanguage } from '@/i18n/LanguageContext.jsx'

export default function ContactClient() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="contact-head">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 className="page-title">{c.title}</h1>
          <p className="contact-lede">{c.lede}</p>
        </div>

        <div className="contact-grid">
          <a href="mailto:a.gaafar.junior@gmail.com" className="contact-card">
            <span className="contact-card-icon" aria-hidden="true">✉️</span>
            <div className="contact-card-body">
              <span className="contact-card-label">{c.emailLabel}</span>
              <span className="contact-card-value" dir="ltr">
                a.gaafar.junior@gmail.com
              </span>
              <span className="contact-card-hint">{c.emailHint}</span>
            </div>
          </a>

          <a href="tel:+201273299508" className="contact-card">
            <span className="contact-card-icon" aria-hidden="true">📞</span>
            <div className="contact-card-body">
              <span className="contact-card-label">{c.phoneLabel}</span>
              <span className="contact-card-value" dir="ltr">
                +20 1273299508
              </span>
              <span className="contact-card-hint">{c.phoneHint}</span>
            </div>
          </a>

          <div className="contact-card contact-card-static">
  <span className="contact-card-icon" aria-hidden="true">📍</span>
  <div className="contact-card-body">
    <span className="contact-card-label">{c.addressLabel}</span>
    <span className="contact-card-value contact-card-value-sm" dir="ltr">
      Cleopatra
      <br />
      Alexandria, Egypt
    </span>
    <span className="contact-card-hint">{c.addressHint}</span>
  </div>
</div>
        </div>

        <div className="contact-note">
          <p>{c.note}</p>
        </div>
      </div>
    </section>
  )
}