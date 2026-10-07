// app/(public)/[locale]/terms/page.jsx
import { metadataFor, termsPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'

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

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="page-title">Terms of Service</h1>
        <p style={{ marginTop: 8, color: 'var(--grey)' }}>
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>

        <div className="legal-body">
          <h2>1. Acceptance of terms</h2>
          <p>By creating an account or using this service, you agree to these terms. If you do not agree, please do not use the service.</p>

          <h2>2. Your account</h2>
          <p>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.</p>

          <h2>3. Content and courses</h2>
          <p>Course content, video links, transcripts, and audio are provided for personal, non-commercial educational use. Some content is sourced from publicly available third-party platforms (e.g. YouTube) and remains the property of its original owners.</p>

          <h2>4. Instructor accounts</h2>
          <p>Instructors are responsible for the accuracy and legality of the content they publish. We reserve the right to remove any course that violates these terms or applicable law.</p>

          <h2>5. Payments</h2>
          <p>Paid courses are currently in preview. When payments go live, additional terms will apply and will be presented at purchase.</p>

          <h2>6. Acceptable use</h2>
          <p>You agree not to misuse the service — including attempting to access other users&apos; accounts, scraping content at scale, or uploading unlawful material.</p>

          <h2>7. Termination</h2>
          <p>You may delete your account at any time. We may suspend or terminate accounts that violate these terms.</p>

          <h2>8. Disclaimer</h2>
          <p>The service is provided &quot;as is&quot; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from use of the service.</p>

          <h2>9. Changes</h2>
          <p>We may update these terms from time to time. Continued use after changes constitutes acceptance of the updated terms.</p>

          <h2>10. Contact</h2>
          <p>Questions? Email <a href="mailto:a.gaafar.junior@gmail.com">a.gaafar.junior@gmail.com</a>.</p>
        </div>
      </div>
    </section>
  )
}