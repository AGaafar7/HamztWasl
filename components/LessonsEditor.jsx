'use client'

import { useState, useTransition } from 'react'
import {
  createLessonAction,
  updateLessonAction,
  removeLessonAction,
  reorderLessonsAction,
} from '../app/actions/lessons'

const KIND_LABELS = {
  text: 'Text',
  tested: 'Tested',
  video: 'Video',
  listening: 'Listening',
  reading: 'Reading',
  speaking: 'Speaking',
}

const COMING_SOON = new Set(['video', 'listening', 'reading', 'speaking'])

export default function LessonsEditor({ courseId = null, initialLessons = [] }) {
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
          {
            id,
            courseId,
            sortOrder: prev.length,
            kind,
            content: {},
          },
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
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, content } : l))
    )
    startTransition(async () => {
      try {
        await updateLessonAction(id, content)
      } catch (err) {
        setError(err.message || 'Failed to save')
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
            />
          ))}
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
              {COMING_SOON.has(kind) ? ' (soon)' : ''}
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
          style={{ marginTop: 8 }}
        >
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
          {COMING_SOON.has(lesson.kind) ? (
            <p className="lesson-coming-soon">
              The {KIND_LABELS[lesson.kind]} editor is coming in the next update.
              This placeholder lesson is saved to your account.
            </p>
          ) : lesson.kind === 'text' ? (
            <TextLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'tested' ? (
            <TestedLessonForm content={lesson.content} onSave={onSave} />
          ) : null}
        </div>
      )}
    </div>
  )
}

function TextLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    body: content.body || { en: '', ar: '', zh: '' },
  })
  const setT = (lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))
  const setB = (lang, v) => setLocal((c) => ({ ...c, body:  { ...c.body,  [lang]: v } }))

  return (
    <div className="lesson-form">
      <div className="lesson-lang-grid">
        <input className="form-input" placeholder="Title (EN)"
          value={local.title.en} onChange={(e) => setT('en', e.target.value)} />
        <input className="form-input arabic" dir="rtl" placeholder="العنوان"
          value={local.title.ar} onChange={(e) => setT('ar', e.target.value)} />
        <input className="form-input" placeholder="标题"
          value={local.title.zh} onChange={(e) => setT('zh', e.target.value)} />
      </div>
      <textarea className="form-input" rows="4" placeholder="Body (EN)"
        value={local.body.en} onChange={(e) => setB('en', e.target.value)} />
      <textarea className="form-input arabic" dir="rtl" rows="4" placeholder="النص"
        value={local.body.ar} onChange={(e) => setB('ar', e.target.value)} />
      <textarea className="form-input" rows="4" placeholder="正文"
        value={local.body.zh} onChange={(e) => setB('zh', e.target.value)} />
      <button type="button" className="btn btn-primary btn-small"
        onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}

function TestedLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    body: content.body || { en: '', ar: '', zh: '' },
    questions: content.questions || [],
  })
  const setT = (lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))
  const setB = (lang, v) => setLocal((c) => ({ ...c, body:  { ...c.body,  [lang]: v } }))

  const addQuestion = () =>
    setLocal((c) => ({
      ...c,
      questions: [...c.questions, { id: `q${Date.now()}`, prompt: '', answer: '', hint: '' }],
    }))
  const updateQ = (id, key, value) =>
    setLocal((c) => ({
      ...c,
      questions: c.questions.map((q) => (q.id === id ? { ...q, [key]: value } : q)),
    }))
  const removeQ = (id) =>
    setLocal((c) => ({ ...c, questions: c.questions.filter((q) => q.id !== id) }))

  return (
    <div className="lesson-form">
      <div className="lesson-lang-grid">
        <input className="form-input" placeholder="Title (EN)"
          value={local.title.en} onChange={(e) => setT('en', e.target.value)} />
        <input className="form-input arabic" dir="rtl" placeholder="العنوان"
          value={local.title.ar} onChange={(e) => setT('ar', e.target.value)} />
        <input className="form-input" placeholder="标题"
          value={local.title.zh} onChange={(e) => setT('zh', e.target.value)} />
      </div>
      <textarea className="form-input" rows="4" placeholder="Body (EN)"
        value={local.body.en} onChange={(e) => setB('en', e.target.value)} />
      <textarea className="form-input arabic" dir="rtl" rows="4" placeholder="النص"
        value={local.body.ar} onChange={(e) => setB('ar', e.target.value)} />
      <textarea className="form-input" rows="4" placeholder="正文"
        value={local.body.zh} onChange={(e) => setB('zh', e.target.value)} />

      <div className="question-list">
        <h4>Questions</h4>
        {local.questions.map((q) => (
          <div className="question-row" key={q.id}>
            <input className="form-input" placeholder="Question"
              value={q.prompt} onChange={(e) => updateQ(q.id, 'prompt', e.target.value)} />
            <input className="form-input" placeholder="Expected answer"
              value={q.answer} onChange={(e) => updateQ(q.id, 'answer', e.target.value)} />
            <input className="form-input" placeholder="Hint (optional)"
              value={q.hint} onChange={(e) => updateQ(q.id, 'hint', e.target.value)} />
            <button type="button" className="mini-play"
              onClick={() => removeQ(q.id)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-small" onClick={addQuestion}>
          + Add question
        </button>
      </div>

      <button type="button" className="btn btn-primary btn-small"
        onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}