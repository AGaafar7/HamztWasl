'use client'

import { useState, useTransition } from 'react'
import { createSubscriptionCheckoutAction } from '../../actions/payments'
import { cancelSubscriptionAction } from '../../actions/subscription'

export default function BillingClient({ active, expiresAt, cancelled }) {
  const [loading, setLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
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

  const onCancel = () => {
    if (!confirm(
      'Cancel your subscription? You will lose access to all practice sections immediately. This cannot be undone.'
    )) return

    setError('')
    setCancelLoading(true)
    startTransition(async () => {
      try {
        await cancelSubscriptionAction()
      } catch (err) {
        console.error('Cancel failed:', err)
        setError('Could not cancel. Please try again.')
      } finally {
        setCancelLoading(false)
      }
    })
  }

  const expiresLabel = expiresAt
    ? new Date(expiresAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

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
          {active && expiresLabel && (
            <span className="billing-renew">Renews on {expiresLabel}</span>
          )}
          {!active && cancelled && (
            <span className="billing-renew">Cancelled</span>
          )}
          {!active && !cancelled && expiresLabel && (
            <span className="billing-renew">Expired on {expiresLabel}</span>
          )}
        </div>

        <p className="billing-desc">
          {active &&
            'You have full access to Listening, Reading, Speaking, and Writing practice.'}
          {!active && cancelled &&
            'Your subscription is cancelled. The practice sections are locked. Subscribe again to restore access.'}
          {!active && !cancelled && expiresLabel &&
            'Your subscription has expired. Subscribe again to restore access to all practice sections.'}
          {!active && !cancelled && !expiresLabel &&
            'Subscribe to unlock all practice sections. $25 per month.'}
        </p>

        {active && (
          <button
            type="button"
            className="btn btn-ghost billing-cancel-btn"
            onClick={onCancel}
            disabled={cancelLoading}
          >
            {cancelLoading ? 'Cancelling…' : 'Cancel subscription'}
          </button>
        )}

        {!active && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubscribe}
            disabled={loading}
          >
            {loading
              ? 'Starting checkout…'
              : cancelled
              ? 'Subscribe again — $25 / month'
              : 'Subscribe — $25 / month'}
          </button>
        )}

        {error && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
      </div>
    </section>
  )
}