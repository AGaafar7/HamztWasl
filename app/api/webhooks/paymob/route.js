import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Paymob's exact concatenation order for transaction callbacks.
// From their docs — order matters.
/**
 * Paymob's exact HMAC concatenation order for the Transaction Processed
 * (POST) callback. Field order and naming per:
 * https://developers.paymob.com/paymob-docs/.../hmac
 *
 * Note the misspelled `error_occured` — that's what Paymob's actual
 * payload sends, so it must match byte for byte.
 */
function computeHmac(obj) {
  const fields = [
    obj.amount_cents,
    obj.created_at,
    obj.currency,
    obj.error_occured,
    obj.has_parent_transaction,
    obj.id,
    obj.integration_id,
    obj.is_3d_secure,
    obj.is_auth,
    obj.is_capture,
    obj.is_refunded,
    obj.is_standalone_payment,
    obj.is_voided,
    obj.order?.id,
    obj.owner,
    obj.pending,
    obj.source_data?.pan,
    obj.source_data?.sub_type,
    obj.source_data?.type,
    obj.success,
  ]

  const str = fields
    .map((v) => (v === undefined || v === null ? '' : String(v)))
    .join('')

  return crypto
    .createHmac('sha512', process.env.PAYMOB_HMAC_SECRET)
    .update(str)
    .digest('hex')
}

export async function POST(request) {
  const hmacFromQuery = request.nextUrl.searchParams.get('hmac')
  const body = await request.json()

  if (body.type !== 'TRANSACTION') return NextResponse.json({ ok: true })

  const obj = body.obj
  
   const debugFields = [
    obj.amount_cents, obj.created_at, obj.currency, obj.error_occured,
    obj.has_parent_transaction, obj.id, obj.integration_id, obj.is_3d_secure,
    obj.is_auth, obj.is_capture, obj.is_refunded, obj.is_standalone_payment,
    obj.is_voided, obj.order?.id, obj.owner, obj.pending,
    obj.source_data?.pan, obj.source_data?.sub_type, obj.source_data?.type,
    obj.success,
  ]
  console.log('Paymob HMAC debug:', {
    received: hmacFromQuery,
    concatenated: debugFields.map((v) => v === undefined || v === null ? '' : String(v)).join(''),
    fieldCount: debugFields.length,
  })
  // --- END TEMPORARY DEBUG ---

  const expected = computeHmac(obj)
  if (hmacFromQuery !== expected) {
    console.error('HMAC mismatch', { got: hmacFromQuery, expected })
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 })
  }

  if (!obj.success) {
    // record failure somewhere if you want, but no enrollment
    return NextResponse.json({ ok: true })
  }

  const [userId, courseId] = (obj.order?.merchant_order_id || '').split('::')
  if (!userId || !courseId) {
    console.error('Bad merchant_order_id', obj.order?.merchant_order_id)
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