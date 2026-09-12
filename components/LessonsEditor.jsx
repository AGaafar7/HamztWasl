'use client'

import { useState, useTransition } from 'react'
import {
  createLessonAction,
  updateLessonAction,
  removeLessonAction,
  reorderLessonsAction,
} from '../app/actions/lessons'
import { KIND_LABELS, LessonFormByKind } from './LessonForms'

const STANDALONE_HIDDEN = new Set(['video'])

export default function LessonsEditor({
  courseId = null,
  initialLessons = [],
  videoChoices = [],
}) {
  const [lessons, setLessons] = useState(initialLessons)
  const [expanded, setExpanded] = useState(null)
  const [pickingKind, setPickingKind] = useState(false)
  const [error, setError] = useState('')
  const [, startTransition] = useTransition()

  const addLesson = (kind) => {
    setPickingKind(false)
    startTransition(async () => {
      try {
        const { id } = await createLessonAction({ courseId, kind })
        setLessons((prev) => [
          ...prev,
          { id, courseId, sortOrder: prev.length, kind, content: {} },
        ])
        setExpanded(id)
      } catch (err) {
        setError(err.message || 'Failed to add lesson')
      }
    })
  }

  const removeLesson = (id) => {
    if (!confirm('Delete this lesson?')) return
    setLessons((prev) => prev.filter((l) => l.id !== id))
    if (expanded === id) setExpanded(null)
    startTransition(async () => {
      try {
        await removeLessonAction(id)
      } catch (err) {
        setError(err.message || 'Failed to delete')
      }
    })
  }

  const saveContent = (id, content) => {
    setLessons((prev) => prev.map((l) => (l.id === id ? { ...l, content } : l)))
    startTransition(async () => {
      try {
        await updateLessonAction(id, content)
      } catch (err) {
        const msg = err?.message || ''
        if (msg.includes('timeout') || msg.includes('Gateway')) {
          setError('Save took too long. Refresh the page to confirm it went through.')
        } else {
          setError(msg || 'Failed to save')
        }
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
    if (courseId) {
      startTransition(async () => {
        try {
          await reorderLessonsAction(courseId, next.map((l) => l.id))
        } catch (err) {
          setError(err.message || 'Failed to reorder')
        }
      })
    }
  }

  return (
    <div className="lessons-editor">
      {lessons.length === 0 ? (
        <p className="portal-empty" style={{ padding: '20px 0' }}>
          No lessons yet.
        </p>
      ) : (
        <div className="lesson-list">
          {lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              expanded={expanded === lesson.id}
              onToggle={() =>
                setExpanded((cur) => (cur === lesson.id ? null : lesson.id))
              }
              onRemove={() => removeLesson(lesson.id)}
              onMoveUp={() => moveLesson(lesson.id, 'up')}
              onMoveDown={() => moveLesson(lesson.id, 'down')}
              canMoveUp={i > 0}
              canMoveDown={i < lessons.length - 1}
              onSave={(content) => saveContent(lesson.id, content)}
              videoChoices={videoChoices}
            />
          ))}
        </div>
      )}

      {pickingKind ? (
        <div className="kind-picker">
          {Object.entries(KIND_LABELS)
            .filter(([kind]) => {
              if (courseId) return true
              return !STANDALONE_HIDDEN.has(kind)
            })
            .map(([kind, label]) => (
              <button key={kind} type="button" className="chip"
                onClick={() => addLesson(kind)}>
                {label}
              </button>
            ))}
          <button type="button" className="filter-clear"
            onClick={() => setPickingKind(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary btn-small"
          onClick={() => setPickingKind(true)} style={{ marginTop: 8 }}>
          + Add lesson
        </button>
      )}

      {error && <p className="form-error" style={{ marginTop: 12 }}>{error}</p>}
    </div>
  )
}

function LessonCard({
  lesson, expanded, onToggle, onRemove,
  onMoveUp, onMoveDown, canMoveUp, canMoveDown, onSave,
  videoChoices = [],
}) {
  const title =
    lesson.content?.title?.en ||
    lesson.content?.title?.ar ||
    `Untitled ${KIND_LABELS[lesson.kind]} lesson`

  return (
    <div className={`lesson-card ${expanded ? 'expanded' : ''}`}>
      <div className="lesson-card-head" onClick={onToggle}>
        <span className="lesson-kind">{KIND_LABELS[lesson.kind]}</span>
        <span className="lesson-title">{title}</span>
        <div className="lesson-row-actions" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="mini-play"
            disabled={!canMoveUp} onClick={onMoveUp} aria-label="Move up">↑</button>
          <button type="button" className="mini-play"
            disabled={!canMoveDown} onClick={onMoveDown} aria-label="Move down">↓</button>
          <button type="button" className="mini-play"
            onClick={onRemove} aria-label="Delete">✕</button>
        </div>
      </div>

      {expanded && (
        <div className="lesson-card-body">
          <LessonFormByKind
            kind={lesson.kind}
            content={lesson.content}
            videoChoices={videoChoices}
            onSave={onSave}
          />
        </div>
      )}
    </div>
  )
}