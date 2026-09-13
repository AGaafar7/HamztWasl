'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  createLessonAction,
  removeLessonAction,
  reorderLessonsAction,
} from '../app/actions/lessons'
import { KIND_LABELS } from './LessonForms'

export default function LessonsEditor({ courseId, initialLessons = [] }) {
  const router = useRouter()
  const [lessons, setLessons] = useState(initialLessons)
  const [pickingKind, setPickingKind] = useState(false)
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  const addLesson = (kind) => {
    setPickingKind(false)
    startTransition(async () => {
      try {
        const { id } = await createLessonAction({ courseId, kind })
        router.push(`/instructor/courses/${courseId}/lessons/${id}`)
      } catch (err) {
        setError(err.message || 'Failed to add lesson')
      }
    })
  }

  const removeLesson = (id) => {
    if (!confirm('Delete this lesson?')) return
    setLessons((prev) => prev.filter((l) => l.id !== id))
    startTransition(async () => {
      try {
        await removeLessonAction(id)
        router.refresh()
      } catch (err) {
        setError(err.message || 'Failed to delete')
        router.refresh()
      }
    })
  }

  const moveLesson = (id, direction) => {
    const idx = lessons.findIndex((l) => l.id === id)
    if (idx === -1) return
    const swap = direction === 'up' ? idx - 1 : idx + 1
    if (swap < 0 || swap >= lessons.length) return
    const next = lessons.slice()
    ;[next[idx], next[swap]] = [next[swap], next[idx]]
    setLessons(next)
    startTransition(async () => {
      try {
        await reorderLessonsAction(courseId, next.map((l) => l.id))
      } catch (err) {
        setError(err.message || 'Failed to reorder')
      }
    })
  }

  return (
    <div className="lessons-editor">
      {lessons.length === 0 ? (
        <div className="empty-state-card">
          <p className="portal-empty" style={{ padding: 0 }}>
            No lessons yet.
          </p>
          <p style={{ fontSize: 13.5, color: 'var(--grey)', marginTop: 4 }}>
            Add your first lesson below.
          </p>
        </div>
      ) : (
        <div className="lesson-tile-list">
          {lessons.map((lesson, i) => {
            const title =
              lesson.content?.title?.en ||
              lesson.content?.title?.ar ||
              `Untitled ${KIND_LABELS[lesson.kind]} lesson`
            return (
              <div className="lesson-tile-row" key={lesson.id}>
                <Link
                  href={`/instructor/courses/${courseId}/lessons/${lesson.id}`}
                  className="lesson-tile-row-main"
                >
                  <span className="lesson-kind">{KIND_LABELS[lesson.kind]}</span>
                  <span className="lesson-tile-row-title">{title}</span>
                  <span className="lesson-tile-row-go">→</span>
                </Link>
                <div className="lesson-row-actions">
                  <button
                    type="button"
                    className="mini-play"
                    disabled={i === 0}
                    onClick={() => moveLesson(lesson.id, 'up')}
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="mini-play"
                    disabled={i === lessons.length - 1}
                    onClick={() => moveLesson(lesson.id, 'down')}
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="mini-play"
                    onClick={() => removeLesson(lesson.id)}
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pickingKind ? (
        <div className="kind-picker">
          {Object.entries(KIND_LABELS).map(([kind, label]) => (
            <button
              key={kind}
              type="button"
              className="chip"
              onClick={() => addLesson(kind)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="filter-clear"
            onClick={() => setPickingKind(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-primary btn-small"
          onClick={() => setPickingKind(true)}
          style={{ marginTop: 16 }}
        >
          + Add lesson
        </button>
      )}

      {error && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
    </div>
  )
}