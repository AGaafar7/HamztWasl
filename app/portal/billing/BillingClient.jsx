'use client'

import { useState, useTransition } from 'react'
import { createSubscriptionCheckoutAction } from '../../actions/payments'

export default function BillingClient({ active, expiresAt }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  const onSubscribe = () => {
    setError('')
    setLoading(true)
    startTransition(async () => {
      try {
        const { url } = await createSubscriptionCheckoutAction()
        window.location.href = url
      } catch (err) {
        console.error('Subscribe failed:', err)
        setError('Could not start checkout. Please try again.')
        setLoading(false)
      }
    })
  }

  const expiresLabel = expiresAt
    ? new Date(expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '—'

  return (
    <section>
      <div className="section-head">
        <h1 className="page-title">Billing & Subscription</h1>
        <p>Manage access to the practice sections.</p>
      </div>

      <div className="billing-card">
        <div className="billing-status">
          <span className={`billing-badge ${active ? 'active' : 'inactive'}`}>
            {active ? '✓ Active' : 'Inactive'}
          </span>
          {active && (
            <span className="billing-renew">Renews on {expiresLabel}</span>
          )}
        </div>

        <p className="billing-desc">
          {active
            ? 'You have full access to Listening, Reading, Speaking, and Writing practice.'
            : 'Subscribe to unlock all practice sections. $25 per month.'}
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={onSubscribe}
          disabled={loading}
        >
          {loading
            ? 'Starting checkout…'
            : active
            ? 'Extend 30 more days — $25'
            : 'Subscribe — $25 / month'}
        </button>

        {error && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
      </div>
    </section>
  )
}