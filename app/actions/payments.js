'use server'

import { createClient } from '../../lib/supabase/server'

const XPAY_BASE = 'https://api.xpay.app'

// Fixed exchange rate for converting DB (USD) prices into EGP at checkout.
// Update when the rate drifts. If you later move prices to EGP in the DB,
// delete this and use course.price directly.
const USD_TO_EGP = 50

export async function createCheckoutSessionAction(courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, price, type')
    .eq('id', courseId)
    .single()

  if (!course || course.type !== 'paid') throw new Error('Invalid course')

  const amountEgp = Math.round(course.price * USD_TO_EGP * 100) // piastres

  const secretKey = process.env.XPAY_SECRET_KEY
  if (!secretKey) throw new Error('XPay is not configured')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hamztwasl.vercel.app'
  const courseTitle = course.title?.en || course.id

  const res = await fetch(`${XPAY_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mode: 'payment',
      uiMode: 'hosted',
      currency: 'EGP',
      lineItems: [{
        quantity: 1,
        priceData: {
          currency: 'EGP',
          unitAmount: amountEgp,
          productData: {
            name: courseTitle,
            description: `Enrollment in ${courseTitle}`,
          },
        },
      }],
      afterCompletion: {
        type: 'redirect',
        redirect: {
          url: `${siteUrl}/portal/payment/return?session_id={CHECKOUT_SESSION_ID}`,
        },
      },
      cancelUrl: `${siteUrl}/portal`,
      customerDetails: {
        email: user.email || undefined,
        name: user.user_metadata?.full_name || undefined,
      },
      metadata: {
        user_id: user.id,
        course_id: courseId,
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('XPay session creation failed:', res.status, text)
    throw new Error('Payment could not be started')
  }

  const session = await res.json()
  return { url: session.url, sessionId: session.id }
}