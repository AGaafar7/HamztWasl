'use client'

import { useState, useTransition } from 'react'
import { resetLessonAction } from '../app/actions/progress'

/**
 * A small destructive-action button that resets the student's
 * multiple-choice attempts for this lesson. Not visible unless the
 * lesson is a multiplechoice kind.
 *
 * After success, does a hard reload so the server component re-fetches
 * fresh (empty) attempts and the question components remount with clean
 * state. router.refresh() alone wouldn't work because the question
 * components initialise their state with useState(() => ...) and that
 * initialiser only runs on mount.
 */
export default function ResetLessonProgressButton({ lessonId, courseId }) {
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  const doReset = () => {
    setError('')
    setBusy(true)
    startTransition(async () => {
      try {
        await resetLessonAction(lessonId, courseId)
        window.location.reload()
      } catch (err) {
        console.error('Reset failed:', err)
        setError('Could not reset. Please try again.')
        setBusy(false)
      }
    })
  }

  if (!confirming) {
    return (
      <button
        type="button"
        className="btn btn-ghost btn-small reset-progress-btn"
        onClick={() => setConfirming(true)}
      >
        ↻ Reset progress
      </button>
    )
  }

  return (
    <div className="reset-progress-confirm">
      <span className="reset-progress-confirm-text">
        Reset all answers and unmark this lesson?
      </span>
      <button
        type="button"
        className="btn btn-small reset-progress-danger"
        onClick={doReset}
        disabled={busy}
      >
        {busy ? 'Resetting…' : 'Yes, reset'}
      </button>
      <button
        type="button"
        className="btn btn-ghost btn-small"
        onClick={() => { setConfirming(false); setError('') }}
        disabled={busy}
      >
        Cancel
      </button>
      {error && <span className="form-error" style={{ marginTop: 8 }}>{error}</span>}
    </div>
  )
}