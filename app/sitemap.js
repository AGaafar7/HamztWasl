// app/sitemap.js
import { SITE_URL, LOCALES, homePath, termsPath, privacyPath, contactPath, refundPath } from '@/i18n/metadata.js'

export default function sitemap() {
  const now = new Date()

  const pages = [
    { page: 'home', pathFor: homePath },
    { page: 'terms', pathFor: termsPath },
    { page: 'privacy', pathFor: privacyPath },
    { page: 'contact', pathFor: contactPath },
     { page: 'refund', pathFor: refundPath },
  ]

  const entries = []
  for (const { pathFor } of pages) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${pathFor(locale)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE_URL}${pathFor(l)}`])
          ),
        },
      })
    }
  }

  return entries
}