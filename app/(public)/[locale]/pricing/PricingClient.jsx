'use client'

import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageContext.jsx'

export default function PricingClient() {
  const { t, lang } = useLanguage()
  const p = t.pricing

  return (
    <section className="section">
      <div className="wrap">
        <div className="pricing-head">
          <span className="eyebrow">{p.eyebrow}</span>
          <h1 className="page-title">{p.title}</h1>
          <p className="pricing-lede">{p.lede}</p>
        </div>

        <div className="pricing-grid">
          {/* Subscription (highlighted) */}
          <article className="pricing-card pricing-card-featured">
            <span className="pricing-badge">{p.subscription.badge}</span>
            <header className="pricing-card-head">
              <h2 className="pricing-card-name">{p.subscription.name}</h2>
              <div className="pricing-card-price">
                <span className="pricing-card-amount">
                  ${p.subscription.priceUsd}
                </span>
                <span className="pricing-card-period">
                  / {p.subscription.period}
                </span>
              </div>
              <p className="pricing-card-price-egp">
                ≈ {p.subscription.priceEgp}
              </p>
              <p className="pricing-card-tagline">
                {p.subscription.tagline}
              </p>
            </header>

            <ul className="pricing-features">
              {p.subscription.features.map((feature, i) => (
                <li key={i}>
                  <span className="pricing-check" aria-hidden="true">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/portal/billing`}
              className="btn btn-primary pricing-cta"
            >
              {p.subscription.cta}
            </Link>
          </article>

          {/* Courses (one-time) */}
          <article className="pricing-card">
            <header className="pricing-card-head">
              <h2 className="pricing-card-name">{p.courses.name}</h2>
              <div className="pricing-card-price">
                <span className="pricing-card-amount">
                  ${p.courses.fromUsd}+
                </span>
              </div>
              <p className="pricing-card-price-egp">
                ≈ {p.courses.fromEgp}+
              </p>
              <p className="pricing-card-tagline">{p.courses.tagline}</p>
            </header>

            <ul className="pricing-features">
              {p.courses.features.map((feature, i) => (
                <li key={i}>
                  <span className="pricing-check" aria-hidden="true">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href={`/portal`} className="btn btn-ghost pricing-cta">
              {p.courses.cta}
            </Link>
          </article>
        </div>

        <div className="pricing-faq">
          <h2 className="pricing-faq-title">{p.faq.title}</h2>
          <div className="pricing-faq-list">
            {p.faq.items.map((item, i) => (
              <details className="pricing-faq-item" key={i}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="pricing-note">
          <p>{p.note}</p>
        </div>
      </div>
    </section>
  )
}