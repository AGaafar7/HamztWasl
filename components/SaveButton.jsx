'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * A save button that shows its own state inline. Works with any async
 * `onClick` that either resolves (success) or throws (failure).
 *
 * Handles the Vercel timeout case specially: a gateway timeout usually
 * means the write *did* go through, so we tell the user to refresh rather
 * than showing a red "failed".
 */
export default function SaveButton({
  onClick,
  label = 'Save',
  savingLabel = 'Saving…',
  savedLabel = '✅ Saved!',
  className = 'btn btn-primary',
}) {
  const [state, setState] = useState('idle') // idle | saving | saved | refresh | error
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handle = async () => {
    clearTimeout(timerRef.current)
    setState('saving')
    try {
      await onClick()
      setState('saved')
      timerRef.current = setTimeout(() => setState('idle'), 2400)
    } catch (err) {
      const msg = err?.message || ''
      if (msg.includes('timeout') || msg.includes('Gateway')) {
        setState('refresh')
      } else {
        setState('error')
      }
      timerRef.current = setTimeout(() => setState('idle'), 4000)
    }
  }

  const labelFor = {
    idle: label,
    saving: savingLabel,
    saved: savedLabel,
    refresh: 'Saved — refresh to confirm',
    error: 'Save failed — try again',
  }[state]

  return (
    <button
      type="button"
      className={`${className} save-btn state-${state}`}
      onClick={handle}
      disabled={state === 'saving'}
    >
      {state === 'saving' && <span className="save-btn-spinner" />}
      {labelFor}
    </button>
  )
}