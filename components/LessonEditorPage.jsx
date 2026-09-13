'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateLessonAction, removeLessonAction } from '../app/actions/lessons'
import { KIND_LABELS, LessonFormByKind } from './LessonForms'

export default function LessonEditorPage({
  lesson,
  backHref,
  backLabel,
  videoChoices = [],
  redirectAfterDelete,
}) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const onSave = (content) => {
    setError('')
    setSaved(false)
    startTransition(async () => {
      try {
        await updateLessonAction(lesson.id, content)
        setSaved(true)
        setTimeout(() => setSaved(false), 1800)
      } catch (err) {
        const msg = err?.message || ''
        if (msg.includes('timeout') || msg.includes('Gateway')) {
          setError('Save took too long. Refresh to confirm it went through.')
        } else {
          setError(msg || 'Failed to save')
        }
      }
    })
  }

  const onDelete = () => {
    if (!confirm('Delete this lesson? This cannot be undone.')) return
    startTransition(async () => {
      try {
        await removeLessonAction(lesson.id)
        router.push(redirectAfterDelete)
        router.refresh()
      } catch (err) {
        setError(err.message || 'Failed to delete')
      }
    })
  }

  const title =
    lesson.content?.title?.en ||
    lesson.content?.title?.ar ||
    `Untitled ${KIND_LABELS[lesson.kind]} lesson`

  return (
    <section className="lesson-editor-page">
      <Link href={backHref} className="back-link">← {backLabel}</Link>

      <div className="lesson-editor-head">
        <div>
          <span className="lesson-kind">{KIND_LABELS[lesson.kind]}</span>
          <h1 className="page-title">{title}</h1>
        </div>
        <button type="button" className="btn btn-ghost btn-small" onClick={onDelete}>
          Delete lesson
        </button>
      </div>

      {error && <p className="form-error">{error}</p>}
      {saved && <p className="form-success">✅ Saved</p>}

      <LessonFormByKind
        kind={lesson.kind}
        content={lesson.content}
        videoChoices={videoChoices}
        onSave={onSave}
      />
    </section>
  )
}