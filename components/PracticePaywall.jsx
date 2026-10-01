'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { createSubscriptionCheckoutAction } from '../app/actions/payments'

export default function PracticePaywall({ reason = 'subscribe' }) {
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

  return (
    <div className="paywall-card">
      <span className="paywall-eyebrow">Practice Access</span>
      <h2 className="paywall-title">
        {reason === 'expired' ? 'Your subscription expired' : 'Subscribe to unlock all practice'}
      </h2>
      <p className="paywall-lede">
        Listening, Reading, Speaking, and Writing practice are available to
        subscribers. $25 per month, cancel anytime.
      </p>

      <ul className="paywall-features">
        <li>🎧 Listening Practice — dictation on real Arabic audio</li>
        <li>📖 Reading Practice — passages with AI-graded comprehension</li>
        <li>🎤 Speaking Practice — pronunciation scoring</li>
        <li>✍️ Writing Practice — trace letters and words</li>
      </ul>

      <button
        type="button"
        className="btn btn-primary paywall-cta"
        onClick={onSubscribe}
        disabled={loading}
      >
        {loading ? 'Starting checkout…' : 'Subscribe — $25 / month'}
      </button>

      {error && <p className="form-error">{error}</p>}

      <p className="paywall-foot">
        Already subscribed? <Link href="/portal/billing">Manage your subscription</Link>.
      </p>
    </div>
  )
}