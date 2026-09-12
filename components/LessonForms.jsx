'use client'

import { useState } from 'react'

/* ============================================================
   Shared helpers
   ============================================================ */

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
  return (
    <div className="lesson-form">
      <TitleFields title={local.title}
        onChange={(lang, v) => setLocal((c) => ({ ...c, title: { ...c.title, [lang]: v } }))} />
      <BodyFields body={local.body}
        onChange={(lang, v) => setLocal((c) => ({ ...c, body: { ...c.body, [lang]: v } }))} />
      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
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

      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
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

      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}

/* ============================================================
   Reading
   ============================================================ */

export function ReadingLessonForm({ content, onSave }) {
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

      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
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
  const addWord = () => setLocal((c) => ({
    ...c,
    words: [...c.words, { id: `w${Date.now()}`, arabic: '', transliteration: '', meaning: '' }],
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

      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
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

      <button type="button" className="btn btn-primary" onClick={() => onSave(local)}>
        Save lesson
      </button>
    </div>
  )
}

/* ============================================================
   Video (used in course editor only)
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
      <button type="button" className="btn btn-primary"
        onClick={() => onSave({ videoId: selectedId })}
        disabled={!selectedId}>
        Save lesson
      </button>
    </div>
  )
}

/* ============================================================
   Dispatcher — renders the right form for a given kind
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