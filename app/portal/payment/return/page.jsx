'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ReturnContent() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'

  if (success) {
    return (
      <>
        <h1 className="page-title">Payment received</h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
          We're confirming your payment with Paymob. This usually takes a
          few seconds — refresh the portal in a moment and your course will
          be unlocked.
        </p>
        <p style={{ fontSize: 14, color: 'var(--grey)', marginTop: 8 }}>
          If it doesn't appear within a minute, please contact support.
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="page-title">Payment not completed</h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
        Your payment wasn't completed. You haven't been charged, and no
        course has been unlocked.
      </p>
      <p style={{ fontSize: 14, color: 'var(--grey)', marginTop: 8 }}>
        You can try again from the portal whenever you're ready.
      </p>
    </>
  )
}

export default function PaymentReturnPage() {
  return (
    <section className="wrap" style={{ padding: '72px 0', maxWidth: 640 }}>
      <Suspense fallback={null}>
        <ReturnContent />
      </Suspense>
      <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
        <Link href="/portal" className="btn btn-primary">
          Back to portal
        </Link>
      </div>
    </section>
  )
}