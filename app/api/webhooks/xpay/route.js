import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * Verify the XPay webhook signature.
 *
 * Scheme (per XPay docs):
 *   Header: XPay-Signature: t=1730000000,v1=a1b2c3d4...
 *   Signed payload: `${timestamp}.${rawBody}`
 *   Algorithm: HMAC-SHA256
 *   Secret: the whsec_... you got when creating the endpoint
 *
 * Rejects events older than 5 minutes (replay protection).
 */
function verifySignature(rawBody, header, secret) {
  if (!header || !secret) return false

  const parts = Object.fromEntries(
    header.split(',').map((kv) => kv.split('='))
  )
  const timestamp = parts.t
  const signature = parts.v1
  if (!timestamp || !signature) return false

  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (age > 300) {
    console.error('XPay webhook timestamp out of tolerance:', age)
    return false
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')

  const a = Buffer.from(signature, 'hex')
  const b = Buffer.from(expected, 'hex')
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(request) {
  const rawBody = await request.text()
  const header = request.headers.get('xpay-signature')
  const secret = process.env.XPAY_WEBHOOK_SECRET

  if (!verifySignature(rawBody, header, secret)) {
    console.error('XPay webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only handle the completed and async_payment_succeeded events.
  // Fawry arrives `unpaid` in `completed`, then paid in `async_payment_succeeded`.
  const handlable =
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  if (!handlable) {
    return NextResponse.json({ ok: true })
  }

  const session = event.data?.object
  if (!session) {
    console.error('No session in event payload')
    return NextResponse.json({ ok: true })
  }

  // CRITICAL: never fulfil on status alone — check paymentStatus.
  if (session.paymentStatus !== 'paid') {
    console.log('Session not paid, skipping:', session.id)
    return NextResponse.json({ ok: true })
  }

  const userId = session.metadata?.user_id
  const kind = session.metadata?.kind || 'course'
  if (!userId) {
    console.error('Missing user_id in session metadata:', session.id, session.metadata)
    return NextResponse.json({ ok: true })
  }

  // ---- Branch 1: subscription payment ------------------------------
  // Extends the user's subscription by 30 days. If they're already
  // subscribed and haven't expired, the days stack on top of the
  // existing expiry. If they're new or expired, it starts from today.
  if (kind === 'subscription') {
    const { data: profile, error: fetchErr } = await supabaseAdmin
      .from('profiles')
      .select('subscription_expires_at')
      .eq('id', userId)
      .single()

    if (fetchErr) {
      console.error('Profile lookup failed:', fetchErr)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    const now = Date.now()
    const current = profile?.subscription_expires_at
      ? new Date(profile.subscription_expires_at).getTime()
      : 0
    const startFrom = Math.max(now, current)
    const newExpiry = new Date(
      startFrom + 30 * 24 * 60 * 60 * 1000
    ).toISOString()

    const { error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update({ subscription_expires_at: newExpiry })
      .eq('id', userId)

    if (updateErr) {
      console.error('Subscription extension failed:', updateErr)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    console.log(
      `Subscription extended for ${userId} — new expiry ${newExpiry}`
    )
    return NextResponse.json({ ok: true })
  }

  // ---- Branch 2: course enrollment (existing behavior) -------------
  const courseId = session.metadata?.course_id
  if (!courseId) {
    console.error('Missing course_id in session metadata:', session.id, session.metadata)
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabaseAdmin
    .from('enrollments')
    .insert({ user_id: userId, course_id: courseId })

  if (error && error.code !== '23505') {
    console.error('Enrollment insert failed:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}