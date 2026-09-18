'use server'

import { createClient } from '../../lib/supabase/server'

// payments.js
const PAYMOB_BASE = 'https://accept-alpha.paymob.com/api'
// Fixed exchange rate for converting the DB's USD prices into EGP at
// checkout time. Update this when the rate drifts meaningfully; or, if you
// later decide to store prices in EGP directly (Option A), delete this and
// use course.price directly.
const USD_TO_EGP = 50
export async function createPaymentIntentAction(courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, price, type')
    .eq('id', courseId)
    .single()

  if (!course || course.type !== 'paid') throw new Error('Invalid course')

  const amountCents = Math.round(course.price * USD_TO_EGP * 100)
  const apiKey = process.env.PAYMOB_API_KEY
  const integrationId = Number(process.env.PAYMOB_INTEGRATION_ID)

  if (!apiKey || !integrationId) {
    throw new Error('Paymob is not configured')
  }

  // 1. Authenticate — exchange API key for a short-lived auth token
  const authRes = await fetch(`${PAYMOB_BASE}/auth/tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey }),
  })
  if (!authRes.ok) throw new Error(`Paymob auth failed: ${await authRes.text()}`)
  const { token } = await authRes.json()

  // 2. Register an order — Paymob needs an order record before the iframe
  const orderRes = await fetch(`${PAYMOB_BASE}/ecommerce/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: false,
      amount_cents: amountCents,
      currency: 'EGP',
      items: [],
      // We pass our identifiers here so they come back in the webhook
      merchant_order_id: `${user.id}::${courseId}::${Date.now()}`,
    }),
  })
  if (!orderRes.ok) throw new Error(`Paymob order failed: ${await orderRes.text()}`)
  const order = await orderRes.json()

  // 3. Request a payment key — this is what the iframe uses
  const nameParts = (user.user_metadata?.full_name || 'Student User').split(' ')
  const firstName = nameParts[0] || 'Student'
  const lastName = nameParts.slice(1).join(' ') || 'User'

  const keyRes = await fetch(`${PAYMOB_BASE}/acceptance/payment_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: order.id,
      currency: 'EGP',
      integration_id: integrationId,
      redirection_url: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/payment/return`,
      billing_data: {
        first_name: firstName,
        last_name: lastName,
        email: user.email || 'na@example.com',
        phone_number: user.user_metadata?.phone || 'NA',
        apartment: 'NA',
        floor: 'NA',
        street: 'NA',
        building: 'NA',
        shipping_method: 'NA',
        postal_code: 'NA',
        city: 'NA',
        country: 'EG',
        state: 'NA',
      },
    }),
  })
  if (!keyRes.ok) throw new Error(`Paymob payment key failed: ${await keyRes.text()}`)
  const { token: paymentToken } = await keyRes.json()

  return { paymentToken, orderId: order.id }
}