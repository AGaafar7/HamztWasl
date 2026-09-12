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
  writing: 'Writing',
}

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
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, content } : l))
    )
    startTransition(async () => {
      try {
        await updateLessonAction(id, content)
      } catch (err) {
        // A Vercel gateway timeout means the request took too long to
        // respond, but the DB write often succeeded. Tell the user to
        // refresh and check, rather than losing their work.
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
          { lesson.kind === 'text' ? (
            <TextLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'tested' ? (
            <TestedLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'listening' ? (
            <ListeningLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'reading' ? (
            <ReadingLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'speaking' ? (
            <SpeakingLessonForm content={lesson.content} onSave={onSave} />
          ) : lesson.kind === 'writing' ? (
            <WritingLessonForm content={lesson.content} onSave={onSave} />
          ) : null}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Shared helpers
   ============================================================ */

function TitleFields({ title, onChange }) {
  return (
    <div className="lesson-lang-grid">
      <input className="form-input" placeholder="Title (EN)"
        value={title.en || ''} onChange={(e) => onChange('en', e.target.value)} />
      <input className="form-input arabic" dir="rtl" placeholder="العنوان"
        value={title.ar || ''} onChange={(e) => onChange('ar', e.target.value)} />
      <input className="form-input" placeholder="标题"
        value={title.zh || ''} onChange={(e) => onChange('zh', e.target.value)} />
    </div>
  )
}

function BodyFields({ body, onChange, arRows = 4 }) {
  return (
    <>
      <textarea className="form-input" rows="4" placeholder="Body (EN)"
        value={body.en || ''} onChange={(e) => onChange('en', e.target.value)} />
      <textarea className="form-input arabic" dir="rtl" rows={arRows} placeholder="النص"
        value={body.ar || ''} onChange={(e) => onChange('ar', e.target.value)} />
      <textarea className="form-input" rows="4" placeholder="正文"
        value={body.zh || ''} onChange={(e) => onChange('zh', e.target.value)} />
    </>
  )
}

/* ============================================================
   Text & Tested — unchanged from the previous turn
   ============================================================ */

function TextLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    body: content.body || { en: '', ar: '', zh: '' },
  })
  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />
      <BodyFields body={local.body}
        onChange={(lang, v) => setLocal((c) => ({ ...c, body: { ...c.body, [lang]: v } }))} />
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
  const addQ = () => setLocal((c) => ({
    ...c,
    questions: [...c.questions, { id: `q${Date.now()}`, prompt: '', answer: '', hint: '' }],
  }))
  const updateQ = (id, key, value) => setLocal((c) => ({
    ...c,
    questions: c.questions.map((q) => (q.id === id ? { ...q, [key]: value } : q)),
  }))
  const removeQ = (id) => setLocal((c) => ({
    ...c, questions: c.questions.filter((q) => q.id !== id),
  }))

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />
      <BodyFields body={local.body}
        onChange={(lang, v) => setLocal((c) => ({ ...c, body: { ...c.body, [lang]: v } }))} />

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
        <button type="button" className="btn btn-ghost btn-small" onClick={addQ}>
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

/* ============================================================
   Listening — title + list of lines (Arabic + gloss)
   ============================================================ */

function ListeningLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    lines: content.lines || [],
  })

  const addLine = () => setLocal((c) => ({
    ...c,
    lines: [...c.lines, { id: `l${Date.now()}`, arabic: '', gloss: { en: '', zh: '' } }],
  }))
  const updateLine = (id, key, value) => setLocal((c) => ({
    ...c,
    lines: c.lines.map((l) => {
      if (l.id !== id) return l
      if (key === 'arabic') return { ...l, arabic: value }
      return { ...l, gloss: { ...l.gloss, [key]: value } }
    }),
  }))
  const removeLine = (id) => setLocal((c) => ({
    ...c, lines: c.lines.filter((l) => l.id !== id),
  }))

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <div className="question-list">
        <h4>Lines the student will hear and type</h4>
        {local.lines.map((l) => (
          <div className="line-row" key={l.id}>
            <input
              className="form-input arabic" dir="rtl"
              placeholder="الجملة العربية"
              value={l.arabic}
              onChange={(e) => updateLine(l.id, 'arabic', e.target.value)}
            />
            <input className="form-input" placeholder="English gloss"
              value={l.gloss.en || ''}
              onChange={(e) => updateLine(l.id, 'en', e.target.value)} />
            <input className="form-input" placeholder="中文翻译"
              value={l.gloss.zh || ''}
              onChange={(e) => updateLine(l.id, 'zh', e.target.value)} />
            <button type="button" className="mini-play"
              onClick={() => removeLine(l.id)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-small" onClick={addLine}>
          + Add line
        </button>
      </div>

      <button type="button" className="btn btn-primary btn-small"
        onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}

/* ============================================================
   Reading — title + passage + questions
   ============================================================ */

function ReadingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    passage: content.passage || { en: '', ar: '', zh: '' },
    questions: content.questions || [],
  })

  const addQ = () => setLocal((c) => ({
    ...c,
    questions: [...c.questions, { id: `q${Date.now()}`, prompt: '', answer: '', hint: '' }],
  }))
  const updateQ = (id, key, value) => setLocal((c) => ({
    ...c,
    questions: c.questions.map((q) => (q.id === id ? { ...q, [key]: value } : q)),
  }))
  const removeQ = (id) => setLocal((c) => ({
    ...c, questions: c.questions.filter((q) => q.id !== id),
  }))

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <h4 className="lesson-subhead">Passage</h4>
      <BodyFields body={local.passage} arRows={5}
        onChange={(lang, v) => setLocal((c) => ({ ...c, passage: { ...c.passage, [lang]: v } }))} />

      <div className="question-list">
        <h4>Comprehension questions</h4>
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
        <button type="button" className="btn btn-ghost btn-small" onClick={addQ}>
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

/* ============================================================
   Speaking — title + list of words
   ============================================================ */

function SpeakingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    words: content.words || [],
  })

  const addWord = () => setLocal((c) => ({
    ...c,
    words: [...c.words, {
      id: `w${Date.now()}`, arabic: '', transliteration: '', meaning: '',
    }],
  }))
  const updateWord = (id, key, value) => setLocal((c) => ({
    ...c,
    words: c.words.map((w) => (w.id === id ? { ...w, [key]: value } : w)),
  }))
  const removeWord = (id) => setLocal((c) => ({
    ...c, words: c.words.filter((w) => w.id !== id),
  }))

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <div className="question-list">
        <h4>Words the student will pronounce</h4>
        {local.words.map((w) => (
          <div className="word-row" key={w.id}>
            <input className="form-input arabic" dir="rtl" placeholder="الكلمة"
              value={w.arabic}
              onChange={(e) => updateWord(w.id, 'arabic', e.target.value)} />
            <input className="form-input" placeholder="transliteration"
              value={w.transliteration}
              onChange={(e) => updateWord(w.id, 'transliteration', e.target.value)} />
            <input className="form-input" placeholder="meaning"
              value={w.meaning}
              onChange={(e) => updateWord(w.id, 'meaning', e.target.value)} />
            <button type="button" className="mini-play"
              onClick={() => removeWord(w.id)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-small" onClick={addWord}>
          + Add word
        </button>
      </div>

      <button type="button" className="btn btn-primary btn-small"
        onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}

/* ============================================================
   Writing — title + list of items (letters or words) to trace
   ============================================================ */

function WritingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    items: content.items || [],
  })

  const addItem = () => setLocal((c) => ({
    ...c,
    items: [...c.items, {
      id: `w${Date.now()}`, arabic: '', transliteration: '', meaning: '',
    }],
  }))
  const updateItem = (id, key, value) => setLocal((c) => ({
    ...c,
    items: c.items.map((it) => (it.id === id ? { ...it, [key]: value } : it)),
  }))
  const removeItem = (id) => setLocal((c) => ({
    ...c, items: c.items.filter((it) => it.id !== id),
  }))

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <div className="question-list">
        <h4>Letters or words to trace</h4>
        {local.items.map((it) => (
          <div className="word-row" key={it.id}>
            <input className="form-input arabic" dir="rtl" placeholder="الحرف أو الكلمة"
              value={it.arabic}
              onChange={(e) => updateItem(it.id, 'arabic', e.target.value)} />
            <input className="form-input" placeholder="transliteration"
              value={it.transliteration}
              onChange={(e) => updateItem(it.id, 'transliteration', e.target.value)} />
            <input className="form-input" placeholder="meaning"
              value={it.meaning}
              onChange={(e) => updateItem(it.id, 'meaning', e.target.value)} />
            <button type="button" className="mini-play"
              onClick={() => removeItem(it.id)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-small" onClick={addItem}>
          + Add item
        </button>
      </div>

      <button type="button" className="btn btn-primary btn-small"
        onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}