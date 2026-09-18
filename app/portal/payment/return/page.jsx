import Link from 'next/link'

export const metadata = { title: 'Payment received' }

export default function PaymentReturnPage() {
  return (
    <section className="wrap" style={{ padding: '72px 0', maxWidth: 640 }}>
      <h1 className="page-title">Payment received</h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
        We're confirming your payment with Paymob. This usually takes a few
        seconds — refresh the portal in a moment and your course will be
        unlocked.
      </p>
      <p style={{ fontSize: 14, color: 'var(--grey)', marginTop: 8 }}>
        If it doesn't appear within a minute, please contact support.
      </p>
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <Link href="/portal" className="btn btn-primary">
          Back to portal
        </Link>
      </div>
    </section>
  )
}