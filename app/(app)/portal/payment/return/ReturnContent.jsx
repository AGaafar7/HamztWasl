'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Inner() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  if (sessionId) {
    return (
      <>
        <h1 className="page-title">Payment received</h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>
          We're confirming your payment. This usually takes a few seconds —
          refresh the portal in a moment and your course will be unlocked.
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
    </>
  )
}

export default function ReturnContent() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}