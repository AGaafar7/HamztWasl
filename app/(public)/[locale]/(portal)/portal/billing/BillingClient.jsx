'use client'

import { useState, useTransition } from 'react'
import { useLanguage } from '@/i18n/LanguageContext.jsx'
import { createSubscriptionCheckoutAction } from '@/app/actions/payments'
import { cancelSubscriptionAction } from '@/app/actions/subscription'

export default function BillingClient({ active, expiresAt, cancelled }) {
  const { t, lang } = useLanguage()
  const b = t.portal.billingPage

  const [loading, setLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  // Use the localized date format (e.g., Arabic numerals for 'ar')
  const dateLocale = lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US'

  const onSubscribe = () => {
    setError('')
    setLoading(true)
    startTransition(async () => {
      try {
        const { url } = await createSubscriptionCheckoutAction()
        window.location.href = url
      } catch (err) {
        console.error('Subscribe failed:', err)
        setError(b.errCheckout)
        setLoading(false)
      }
    })
  }

  const onCancel = () => {
    if (!confirm(b.cancelConfirm)) return

    setError('')
    setCancelLoading(true)
    startTransition(async () => {
      try {
        await cancelSubscriptionAction()
      } catch (err) {
        console.error('Cancel failed:', err)
        setError(b.errCancel)
      } finally {
        setCancelLoading(false)
      }
    })
  }

  const expiresLabel = expiresAt
    ? new Date(expiresAt).toLocaleDateString(dateLocale, {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null

  return (
    <section>
      <div className="section-head">
        <h1 className="page-title">{b.title}</h1>
        <p>{b.subtitle}</p>
      </div>

      <div className="billing-card">
        <div className="billing-status">
          <span className={`billing-badge ${active ? 'active' : 'inactive'}`}>
            {active ? `✓ ${b.statusActive}` : b.statusInactive}
          </span>
          {active && expiresLabel && (
            <span className="billing-renew">{b.renewsOn} {expiresLabel}</span>
          )}
          {!active && cancelled && (
            <span className="billing-renew">{b.cancelled}</span>
          )}
          {!active && !cancelled && expiresLabel && (
            <span className="billing-renew">{b.expiredOn} {expiresLabel}</span>
          )}
        </div>

        <p className="billing-desc">
          {active && b.descActive}
          {!active && cancelled && b.descCancelled}
          {!active && !cancelled && expiresLabel && b.descExpired}
          {!active && !cancelled && !expiresLabel && b.descInactive}
        </p>

        {active && (
          <button
            type="button"
            className="btn btn-ghost billing-cancel-btn"
            onClick={onCancel}
            disabled={cancelLoading}
          >
            {cancelLoading ? b.cancellingBtn : b.cancelBtn}
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
              ? b.startingCheckout
              : cancelled
              ? b.subscribeAgainBtn
              : b.subscribeBtn}
          </button>
        )}

        {error && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
      </div>
    </section>
  )
}