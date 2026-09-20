import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

// Service-role client — this endpoint runs outside user context.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * Verify the XPay webhook signature.
 *
 * ⚠️ PLACEHOLDER — the exact verification algorithm is not yet known.
 * Paymob used HMAC-SHA512 over a specific field order. XPay likely uses
 * HMAC-SHA256 over the raw body with a timestamp header. Replace the body
 * of this function with XPay's documented method once available.
 *
 * Until then, this returns false for everything, which means
 * enrollments will NOT be created. Fix this before going live.
 */
function verifySignature(rawBody, headers) {
  const secret = process.env.XPAY_WEBHOOK_SECRET
  if (!secret) {
    console.error('XPAY_WEBHOOK_SECRET is not set')
    return false
  }

  // TODO: replace with XPay's actual verification scheme.
  // Placeholder — do NOT ship as-is.
  console.error('XPay webhook signature verification not implemented')
  return false
}

export async function POST(request) {
  // Read raw body once — needed for signature verification.
  const rawBody = await request.text()
  const headers = Object.fromEntries(request.headers.entries())

  if (!verifySignature(rawBody, headers)) {
    console.error('XPay webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only handle the completed event; ignore everything else.
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ ok: true })
  }

  const session = event.data?.object || event.data || event

  // CRITICAL: never fulfil on `status` alone. Check paymentStatus === 'paid'.
  if (session.paymentStatus !== 'paid') {
    console.log('Session not paid, skipping enrollment:', session.id)
    return NextResponse.json({ ok: true })
  }

  const userId = session.metadata?.user_id
  const courseId = session.metadata?.course_id
  if (!userId || !courseId) {
    console.error('Missing user_id/course_id in session metadata:', session.id)
    return NextResponse.json({ ok: true })
  }

  // Idempotent insert — safe if webhook fires twice for the same session.
  const { error } = await supabaseAdmin
    .from('enrollments')
    .insert({ user_id: userId, course_id: courseId })

  if (error && error.code !== '23505') {
    console.error('Enrollment insert failed:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}