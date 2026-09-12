'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createLessonAction } from '../../../actions/lessons'

const KINDS = [
  { id: 'text', icon: '📝', title: 'Text', desc: 'A paragraph, a rule, a table of conjunctions' },
  { id: 'tested', icon: '✅', title: 'Tested', desc: 'Content followed by questions the student answers' },
  { id: 'listening', icon: '🎧', title: 'Listening', desc: 'Lines the student hears and types back' },
  { id: 'reading', icon: '📖', title: 'Reading', desc: 'A passage plus comprehension questions' },
  { id: 'speaking', icon: '🎤', title: 'Speaking', desc: 'Words the student records and compares' },
  { id: 'writing', icon: '✍️', title: 'Writing', desc: 'Letters and words the student traces' },
]

export default function NewLessonClient() {
  const router = useRouter()
  const [creating, setCreating] = useState(null)
  const [error, setError] = useState('')

  const onPick = async (kind) => {
    setCreating(kind)
    setError('')
    try {
      const { id } = await createLessonAction({ courseId: null, kind })
      router.push(`/instructor/lessons/${id}`)
      router.refresh()
    } catch (err) {
      setError(err.message || 'Failed to create lesson')
      setCreating(null)
    }
  }

  return (
    <section>
      <Link href="/instructor/lessons" className="back-link">← Back to lessons</Link>

      <div className="section-head">
        <h1 className="page-title">What kind of lesson?</h1>
        <p>Pick a type and we'll take you to the editor.</p>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="kind-grid">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            className="kind-card"
            onClick={() => onPick(k.id)}
            disabled={creating !== null}
          >
            <span className="kind-card-icon">{k.icon}</span>
            <span className="kind-card-title">{k.title}</span>
            <span className="kind-card-desc">{k.desc}</span>
            {creating === k.id && (
              <span className="kind-card-loading">Creating…</span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}