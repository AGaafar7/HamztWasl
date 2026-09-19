'use client'

import { useState } from 'react'
import SaveButton from './SaveButton'

/* ============================================================
   Shared helpers
   ============================================================ */


function validateLesson(kind, content) {
  const errors = []

  const titleEn = (content.title?.en || '').trim()
  const titleAr = (content.title?.ar || '').trim()
  if (!titleEn) errors.push('English title is required.')
  if (!titleAr) errors.push('Arabic title is required.')

  switch (kind) {
    case 'text':
      if (!(content.body?.ar || '').trim()) {
        errors.push('The Arabic body is required.')
      }
      break
    case 'tested':
      if (!(content.body?.ar || '').trim()) {
        errors.push('The Arabic body is required.')
      }
      if (!(content.questions || []).some((q) => (q.prompt || '').trim() && (q.answer || '').trim())) {
        errors.push('Add at least one question with a prompt and an answer.')
      }
      break
    case 'listening':
      if (!(content.lines || []).some((l) => (l.arabic || '').trim())) {
        errors.push('Add at least one Arabic line.')
      }
      break
    case 'reading':
      if (!(content.passage?.ar || '').trim()) {
        errors.push('The Arabic passage is required.')
      }
      if (!(content.questions || []).some((q) => (q.prompt || '').trim() && (q.answer || '').trim())) {
        errors.push('Add at least one question with a prompt and an answer.')
      }
      break
    case 'speaking':
      if (!(content.words || []).some((w) => (w.arabic || '').trim())) {
        errors.push('Add at least one Arabic word or letter.')
      }
      break
    case 'writing':
      if (!(content.items || []).some((it) => (it.arabic || '').trim())) {
        errors.push('Add at least one Arabic item to trace.')
      }
      break
    // video: no validation needed
  }

  return errors
}

export function TitleFields({ title, onChange }) {
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

export function BodyFields({ body, onChange, arRows = 4 }) {
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
   Text
   ============================================================ */

export function TextLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    body: content.body || { en: '', ar: '', zh: '' },
  })
   const [validationError, setValidationError] = useState('')

  const handleSave = () => {
    const errors = validateLesson('text', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />
      <BodyFields body={local.body}
        onChange={(lang, v) => setLocal((c) => ({ ...c, body: { ...c.body, [lang]: v } }))} />
       {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Tested
   ============================================================ */

export function TestedLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    body: content.body || { en: '', ar: '', zh: '' },
    questions: content.questions || [],
  })
  const [validationError, setValidationError] = useState('')
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

    const handleSave = () => {
    const errors = validateLesson('tested', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }



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
        {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Listening
   ============================================================ */

export function ListeningLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    lines: content.lines || [],
  })
  const addLine = () => setLocal((c) => ({
    ...c,
    lines: [...c.lines, { id: `l${Date.now()}`, arabic: '', gloss: { en: '', zh: '' } }],
  }))
   const [validationError, setValidationError] = useState('')
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
    const handleSave = () => {
    const errors = validateLesson('listening', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <div className="question-list">
        <h4>Lines the student will hear and type</h4>
        {local.lines.map((l) => (
          <div className="line-row" key={l.id}>
            <input className="form-input arabic" dir="rtl" placeholder="الجملة العربية"
              value={l.arabic}
              onChange={(e) => updateLine(l.id, 'arabic', e.target.value)} />
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

      {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Reading (unchanged structure from last version)
   ============================================================ */

export function ReadingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    passage: content.passage || { en: '', ar: '', zh: '' },
    questions: content.questions || [],
  })
  const [showGen, setShowGen] = useState(false)
  const [genCount, setGenCount] = useState(3)
  const [genInstructions, setGenInstructions] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState('')
  const [validationError, setValidationError] = useState('')

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

  const onGenerate = async () => {
    const arabic = (local.passage.ar || '').trim()
    if (!arabic) {
      setGenError('Fill in the Arabic passage first — the AI reads it to write questions.')
      return
    }
    setGenerating(true)
    setGenError('')
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ passage: arabic, count: genCount, instructions: genInstructions }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generate failed')
      setLocal((c) => ({ ...c, questions: [...c.questions, ...(data.questions || [])] }))
      setShowGen(false)
      setGenInstructions('')
    } catch (err) {
      setGenError(err.message || 'Something went wrong')
    } finally {
      setGenerating(false)
    }
  }

  const arabicPassageReady = (local.passage.ar || '').trim().length > 0

  const handleSave = () => {
    const errors = validateLesson('reading', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <h4 className="lesson-subhead">Passage</h4>
      <BodyFields body={local.passage} arRows={5}
        onChange={(lang, v) => setLocal((c) => ({ ...c, passage: { ...c.passage, [lang]: v } }))} />

      <div className="question-list">
        <div className="question-list-head">
          <h4>Comprehension questions</h4>
          <button
            type="button"
            className="btn btn-ghost btn-small ai-gen-btn"
            onClick={() => setShowGen((s) => !s)}
            disabled={!arabicPassageReady}
            title={!arabicPassageReady ? 'Fill in the Arabic passage first' : ''}
          >
            ✨ {showGen ? 'Close' : 'Generate with AI'}
          </button>
        </div>

        {showGen && (
          <div className="ai-gen-panel">
            <div className="form-group">
              <label className="form-label">Number of questions</label>
              <input type="number" className="form-input" min="1" max="10"
                value={genCount} onChange={(e) => setGenCount(Number(e.target.value))}
                style={{ maxWidth: 120 }} />
            </div>
            <div className="form-group">
              <label className="form-label">
                Instructions for the AI <span className="form-optional">(optional)</span>
              </label>
              <textarea className="form-input" rows="3"
                placeholder="e.g. Focus on vocabulary about family. Ask one inference question at the end."
                value={genInstructions}
                onChange={(e) => setGenInstructions(e.target.value)} />
            </div>
            {genError && <p className="form-error">{genError}</p>}
            <div className="ai-gen-actions">
              <button type="button" className="btn btn-primary btn-small"
                onClick={onGenerate} disabled={generating}>
                {generating ? 'Generating…' : 'Generate questions'}
              </button>
              <button type="button" className="btn btn-ghost btn-small"
                onClick={() => { setShowGen(false); setGenError('') }} disabled={generating}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {local.questions.map((q, i) => (
          <div className="question-block" key={q.id}>
            <div className="question-block-head">
              <span className="question-number">Question {i + 1}</span>
              <button type="button" className="mini-play"
                onClick={() => removeQ(q.id)} aria-label="Remove question">✕</button>
            </div>
            <input className="form-input" placeholder="Question (Arabic)"
              value={q.prompt}
              onChange={(e) => updateQ(q.id, 'prompt', e.target.value)} />
            <input className="form-input" placeholder="Expected answer (Arabic)"
              value={q.answer}
              onChange={(e) => updateQ(q.id, 'answer', e.target.value)} />
            <input className="form-input" placeholder="Hint (optional)"
              value={q.hint}
              onChange={(e) => updateQ(q.id, 'hint', e.target.value)} />
          </div>
        ))}

        <button type="button" className="btn btn-ghost btn-small" onClick={addQ}>
          + Add question manually
        </button>
      </div>

       {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Speaking
   ============================================================ */

export function SpeakingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    words: content.words || [],
  })
  const [validationError, setValidationError] = useState('')
  const addWord = () => setLocal((c) => ({
    ...c,
    words: [...c.words, { id: `w${Date.now()}`, arabic: '', transliteration: '', meaning: '' , type: 'word'}],
  }))
  const updateWord = (id, key, value) => setLocal((c) => ({
    ...c,
    words: c.words.map((w) => (w.id === id ? { ...w, [key]: value } : w)),
  }))
  const removeWord = (id) => setLocal((c) => ({
    ...c, words: c.words.filter((w) => w.id !== id),
  }))

    const handleSave = () => {
    const errors = validateLesson('speaking', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }

  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />

      <div className="question-list">
        <h4>Words or letters the student will pronounce</h4>
        {local.words.map((w) => (
  <div className="word-row word-row-speaking" key={w.id}>
    <select
      className="form-input"
      value={w.type || 'word'}
      onChange={(e) => updateWord(w.id, 'type', e.target.value)}
      style={{ maxWidth: 110 }}
    >
      <option value="word">Word</option>
      <option value="letter">Letter</option>
    </select>
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

       {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Writing
   ============================================================ */

export function WritingLessonForm({ content, onSave }) {
  const [local, setLocal] = useState({
    title: content.title || { en: '', ar: '', zh: '' },
    items: content.items || [],
  })
  const [validationError, setValidationError] = useState('')
  const addItem = () => setLocal((c) => ({
    ...c,
    items: [...c.items, { id: `w${Date.now()}`, arabic: '', transliteration: '', meaning: '' }],
  }))
  const updateItem = (id, key, value) => setLocal((c) => ({
    ...c,
    items: c.items.map((it) => (it.id === id ? { ...it, [key]: value } : it)),
  }))
  const removeItem = (id) => setLocal((c) => ({
    ...c, items: c.items.filter((it) => it.id !== id),
  }))

    const handleSave = () => {
    const errors = validateLesson('writing', local)
    if (errors.length > 0) { setValidationError(errors.join(' ')); return }
    setValidationError('')
    onSave(local)
  }

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

      {validationError && <p className="form-error">{validationError}</p>}
      <SaveButton onClick={handleSave} label="Save lesson" />
    </div>
  )
}

/* ============================================================
   Video
   ============================================================ */

export function VideoLessonForm({ content, videoChoices = [], onSave }) {
  const [selectedId, setSelectedId] = useState(content.videoId || '')

  return (
    <div className="lesson-form">
      <div className="form-group">
        <label className="form-label">Choose a video from your library</label>
        <select className="form-input" value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">— pick one —</option>
          {videoChoices.map((v) => (
            <option key={v.id} value={v.id}>{v.title?.en || v.id}</option>
          ))}
        </select>
      </div>
      {videoChoices.length === 0 && (
        <p className="calibrate-hint">
          Your video library is empty. Add a video first from{' '}
          <strong>Videos → + Add Video</strong>.
        </p>
      )}
      <SaveButton
        onClick={() => onSave({ videoId: selectedId })}
        label="Save lesson"
        className="btn btn-primary"
      />
    </div>
  )
}

/* ============================================================
   Dispatcher + labels
   ============================================================ */

export function LessonFormByKind({ kind, content, onSave, videoChoices = [] }) {
  switch (kind) {
    case 'text':      return <TextLessonForm content={content} onSave={onSave} />
    case 'tested':    return <TestedLessonForm content={content} onSave={onSave} />
    case 'listening': return <ListeningLessonForm content={content} onSave={onSave} />
    case 'reading':   return <ReadingLessonForm content={content} onSave={onSave} />
    case 'speaking':  return <SpeakingLessonForm content={content} onSave={onSave} />
    case 'writing':   return <WritingLessonForm content={content} onSave={onSave} />
    case 'video':     return <VideoLessonForm content={content} videoChoices={videoChoices} onSave={onSave} />
    default:          return <p className="portal-empty">Unknown lesson kind.</p>
  }
}

export const KIND_LABELS = {
  text: 'Text',
  tested: 'Tested',
  video: 'Video',
  listening: 'Listening',
  reading: 'Reading',
  speaking: 'Speaking',
  writing: 'Writing',
}