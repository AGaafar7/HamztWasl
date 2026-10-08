// app/(public)/[locale]/refund-policy/page.jsx
import { metadataFor, refundPath, LOCALES } from '@/i18n/metadata.js'
import { notFound } from 'next/navigation'

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

  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <h1 className="page-title">Refund Policy</h1>
        <p style={{ marginTop: 8, color: 'var(--grey)' }}>
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>

        <div className="legal-body">
          <p>
            This Refund Policy applies to every paid product offered on
            Hamzat Wasl, including course purchases and the practice
            subscription. Please read it carefully before you pay — by
            completing a purchase, you agree to the terms below.
          </p>

          <h2>1. All purchases are non-refundable</h2>
          <p>
            <strong>All payments made on Hamzat Wasl are final and non-refundable.</strong>{" "}
            This applies to:
          </p>
          <ul>
            <li>One-time course purchases</li>
            <li>The monthly practice subscription</li>
            <li>Any future paid product offered on the platform</li>
          </ul>
          <p>
            By completing a purchase, you acknowledge and agree that:
          </p>
          <ul>
            <li>
              You have read the course or subscription description and
              understand exactly what you are purchasing before you pay.
            </li>
            <li>
              You have had the opportunity to explore the free portions
              of the platform and are satisfied that the paid content is
              what you need.
            </li>
            <li>
              You will not receive a refund, in whole or in part, for
              reasons such as change of mind, unused subscription time,
              failure to use the service, or misreading of the product
              description.
            </li>
            <li>
              Subscription periods are not paused, extended, prorated, or
              credited when you do not log in or do not use the platform.
            </li>
          </ul>

          <h2>2. Cancellation of subscription</h2>
          <p>
            You may cancel your practice subscription at any time from the{" "}
            <strong>Billing</strong> page inside your account. Cancellation
            takes effect <strong>immediately</strong>:
          </p>
          <ul>
            <li>Access to the practice sections ends the moment you cancel.</li>
            <li>You will not be charged again.</li>
            <li>
              Amounts already paid for the current period are{" "}
              <strong>not refunded, prorated, or credited</strong>.
            </li>
          </ul>
          <p>
            If you cancel and later decide to subscribe again, you will pay
            the full subscription price for a fresh 30-day period. There is
            no reactivation without a new payment.
          </p>

          <h2>3. Narrow exceptions</h2>
          <p>
            We may, at our sole discretion, issue a refund in the following
            limited cases:
          </p>
          <ul>
            <li>
              <strong>Duplicate charge.</strong> If you were charged more
              than once for the same purchase due to a technical error on
              our side or the payment processor&apos;s side, we will refund the
              duplicate amount in full.
            </li>
            <li>
              <strong>Unauthorized charge.</strong> If your payment method
              was used without your authorization and you have reported
              this to your bank or card issuer, we will cooperate fully
              with the investigation and refund the affected transaction
              once it is confirmed.
            </li>
            <li>
              <strong>Sustained service failure.</strong> If a paid feature
              was materially unavailable for a sustained period due to our
              fault, we may, at our discretion, issue an account credit or
              a prorated refund proportional to the affected time.
            </li>
          </ul>
          <p>
            To request a refund under this section, email{" "}
            <a href="mailto:a.gaafar.junior@gmail.com">a.gaafar.junior@gmail.com</a>{" "}
            within <strong>14 days</strong> of the charge, including:
          </p>
          <ul>
            <li>Your account email</li>
            <li>The transaction reference or payment confirmation</li>
            <li>A clear description of the issue</li>
          </ul>
          <p>
            Requests received after this 14-day window will not be
            considered.
          </p>

          <h2>4. Processing of approved refunds</h2>
          <p>
            When a refund is approved, it is issued to the original payment
            method. Processing time depends on your bank or card issuer and
            is typically 5–14 business days. Hamzat Wasl does not control
            and cannot accelerate this timeline.
          </p>

          <h2>5. Chargebacks</h2>
          <p>
            Please contact us before filing a chargeback with your bank.
            Most issues can be resolved quickly by email. Filing a
            chargeback without first contacting us may result in
            suspension of your account and forfeiture of access to paid
            content, pending resolution of the dispute.
          </p>

          <h2>6. Changes to this policy</h2>
          <p>
            We may update this Refund Policy from time to time. Material
            changes will be announced in-app before they take effect and
            will not apply retroactively to purchases made before the
            change.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:a.gaafar.junior@gmail.com">a.gaafar.junior@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  )
}