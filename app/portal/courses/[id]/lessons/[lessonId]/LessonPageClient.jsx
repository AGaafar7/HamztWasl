'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../../../i18n/gloss.js'
import { speak } from '../../../../../../utils/speak.js'
import { toggleLessonCompleteAction } from '../../../../../actions/progress'

/* -------- similarity helper (used by listening lesson) -------- */
function normalizeArabic(str) {
  return (str || '')
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ىئ]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ـ/g, '')
    .replace(/[؟،.!؛:"'’\-،]/g, '')
    .replace(/\s+/g, '')
    .trim()
}
function levenshtein(a, b) {
  const m = a.length, n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}
function similarity(a, b) {
  const na = normalizeArabic(a)
  const nb = normalizeArabic(b)
  if (!na && !nb) return 100
  if (!na || !nb) return 0
  if (na === nb) return 100
  if (na.includes(nb) || nb.includes(na)) {
    const shorter = Math.min(na.length, nb.length)
    const longer = Math.max(na.length, nb.length)
    return Math.max(Math.round((shorter / longer) * 100), 60)
  }
  const maxLen = Math.max(na.length, nb.length)
  const dist = levenshtein(na, nb)
  const levScore = Math.round(((maxLen - dist) / maxLen) * 100)
  const setA = new Set(na.split(''))
  const setB = new Set(nb.split(''))
  const inter = [...setA].filter((c) => setB.has(c)).length
  const union = new Set([...setA, ...setB]).size
  const jacScore = union > 0 ? Math.round((inter / union) * 100) : 0
  return Math.max(levScore, jacScore)
}
/* ---------------------------------------------------------------- */

const KIND_LABEL = {
  text: 'Text',
  tested: 'Tested',
  video: 'Video',
  listening: 'Listening',
  reading: 'Reading',
  speaking: 'Speaking',
}

export default function LessonPageClient({
  course, lesson, siblings, isCompleted: initialCompleted, videoData,
}) {
  const { t, lang } = useLanguage()
  const [completed, setCompleted] = useState(initialCompleted)
  const [, startTransition] = useTransition()

  const title =
    gloss(lesson.content?.title, lang) || `Lesson ${siblings.index + 1}`

  const onToggleComplete = () => {
    const next = !completed
    setCompleted(next)
    startTransition(async () => {
      try {
        await toggleLessonCompleteAction(course.id, `lesson:${lesson.id}`)
      } catch (err) {
        console.error('Toggle complete failed:', err)
        setCompleted(!next)
      }
    })
  }

  return (
    <section className="lesson-page">
      <Link href={`/portal/courses/${course.id}`} className="back-link">
        ← {gloss(course.title, lang)}
      </Link>

      <div className="lesson-page-head">
        <div className="lesson-page-meta">
          <span className="lesson-kind">{KIND_LABEL[lesson.kind] || lesson.kind}</span>
          <span className="lesson-page-position">
            Lesson {siblings.index + 1} of {siblings.total}
          </span>
        </div>
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="lesson-page-body">
        {lesson.kind === 'text' && <TextLesson lesson={lesson} />}
        {lesson.kind === 'tested' && <TestedLesson lesson={lesson} />}
        {lesson.kind === 'listening' && <ListeningLesson lesson={lesson} />}
        {lesson.kind === 'reading' && <ReadingLesson lesson={lesson} />}
        {lesson.kind === 'speaking' && <SpeakingLesson lesson={lesson} />}
        {lesson.kind === 'video' && <VideoLesson lesson={lesson} videoData={videoData} />}
      </div>

      <div className="lesson-page-foot">
        <button
          type="button"
          className={`btn ${completed ? 'btn-ghost' : 'btn-primary'}`}
          onClick={onToggleComplete}
        >
          {completed ? '✓ Completed — tap to undo' : 'Mark as complete'}
        </button>

        <div className="lesson-page-nav">
          {siblings.prev && (
            <Link
              href={`/portal/courses/${course.id}/lessons/${siblings.prev.id}`}
              className="btn btn-ghost btn-small"
            >
              ← Previous
            </Link>
          )}
          {siblings.next && (
            <Link
              href={`/portal/courses/${course.id}/lessons/${siblings.next.id}`}
              className="btn btn-primary btn-small"
            >
              Next lesson →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Text
   ============================================================ */
function TextLesson({ lesson }) {
  const { lang } = useLanguage()
  const body = gloss(lesson.content?.body, lang)
  if (!body) return <p className="portal-empty">This lesson has no content yet.</p>
  return <div className="lesson-body-text">{body}</div>
}

/* ============================================================
   Tested — body + reveal-answer questions
   ============================================================ */
function TestedLesson({ lesson }) {
  const { lang } = useLanguage()
  const c = lesson.content || {}
  const body = gloss(c.body, lang)
  return (
    <div className="lesson-body-text">
      {body && <div className="lesson-body-text-body">{body}</div>}
      {c.questions?.length > 0 && (
        <div className="lesson-questions">
          <h3>Questions</h3>
          {c.questions.map((q, i) => (
            <div className="lesson-q" key={q.id || i}>
              <p className="lesson-q-prompt">{i + 1}. {q.prompt}</p>
              <details className="lesson-q-answer">
                <summary>Show answer</summary>
                <p>{q.answer}</p>
                {q.hint && <p className="lesson-q-hint">Hint: {q.hint}</p>}
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Listening — instructor-authored lines; play, type, check
   ============================================================ */
function ListeningLesson({ lesson }) {
  const { lang } = useLanguage()
  const lines = lesson.content?.lines || []
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})

  if (lines.length === 0) {
    return <p className="portal-empty">This lesson has no lines yet.</p>
  }

  const onCheck = (lineId, expectedArabic) => {
    const accuracy = similarity(answers[lineId] || '', expectedArabic)
    setChecked((p) => ({ ...p, [lineId]: { ...(p[lineId] || {}), accuracy } }))
  }
  const onReveal = (lineId) => {
    setChecked((p) => ({
      ...p,
      [lineId]: { accuracy: p[lineId]?.accuracy ?? 0, revealed: true },
    }))
  }

  return (
    <div className="lesson-listen">
      {lines.map((line, i) => {
        const state = checked[line.id]
        return (
          <div className="lesson-listen-line" key={line.id || i}>
            <div className="lesson-listen-head">
              <button
                type="button"
                className="listen-play-btn"
                onClick={() => speak(line.arabic)}
              >
                🔊 Play
              </button>
              <span className="lesson-listen-index">
                {i + 1} / {lines.length}
              </span>
            </div>
            <input
              type="text"
              dir="rtl"
              className="form-input arabic"
              placeholder="What did you hear?"
              value={answers[line.id] || ''}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [line.id]: e.target.value }))
              }
            />
            <div className="listen-actions">
              <button
                type="button"
                className="btn btn-primary btn-small"
                onClick={() => onCheck(line.id, line.arabic)}
              >
                Check
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={() => onReveal(line.id)}
              >
                Show answer
              </button>
            </div>
            {state && (
              <div className={`listen-result ${state.accuracy >= 70 ? 'good' : 'retry'}`}>
                <div className="listen-accuracy">Accuracy: {state.accuracy}%</div>
                {state.revealed && (
                  <div className="listen-reveal">
                    <span className="arabic">{line.arabic}</span>
                    {gloss(line.gloss, lang) && <p>{gloss(line.gloss, lang)}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================
   Reading — passage + reveal-answer questions
   ============================================================ */
function ReadingLesson({ lesson }) {
  const { lang } = useLanguage()
  const c = lesson.content || {}
  const passage = gloss(c.passage, lang)
  return (
    <div className="lesson-reading">
      {passage && (
        <div className="passage-box">
          <p>{passage}</p>
        </div>
      )}
      {c.questions?.length > 0 && (
        <div className="lesson-questions">
          <h3>Comprehension questions</h3>
          {c.questions.map((q, i) => (
            <div className="lesson-q" key={q.id || i}>
              <p className="lesson-q-prompt">{i + 1}. {q.prompt}</p>
              <details className="lesson-q-answer">
                <summary>Show answer</summary>
                <p>{q.answer}</p>
                {q.hint && <p className="lesson-q-hint">Hint: {q.hint}</p>}
              </details>
            </div>
          ))}
        </div>
      )}
      {!passage && !c.questions?.length && (
        <p className="portal-empty">This lesson has no content yet.</p>
      )}
    </div>
  )
}

/* ============================================================
   Speaking — word list, record & check each
   ============================================================ */
function SpeakingLesson({ lesson }) {
  const words = lesson.content?.words || []
  const [selectedId, setSelectedId] = useState(words[0]?.id || null)
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  if (words.length === 0) {
    return <p className="portal-empty">This lesson has no words yet.</p>
  }

  const selected = words.find((w) => w.id === selectedId)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const mimeType =
        typeof MediaRecorder !== 'undefined' &&
        MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      const mr = new MediaRecorder(stream, { mimeType })
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      mr.onstop = () => {
        setAudioBlob(new Blob(chunksRef.current, { type: mimeType }))
        stream.getTracks().forEach((tr) => tr.stop())
      }
      mediaRecorderRef.current = mr
      mr.start()
      setRecording(true)
      setFeedback(null)
      setAudioBlob(null)
    } catch {
      setFeedback({ error: 'Microphone access denied.' })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setRecording(false)
  }

  const submit = async () => {
    if (!audioBlob || !selected) return
    setLoading(true)
    setFeedback(null)
    try {
      const form = new FormData()
      form.append('audio', audioBlob, 'recording.webm')
      form.append('language', 'ar')
      const res = await fetch('/api/stt', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'STT failed')
      const heard = (data.text || '').trim()
      const score = similarity(heard, selected.arabic)
      setFeedback({ correct: score >= 70, score, heard, expected: selected.arabic })
    } catch (err) {
      setFeedback({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lesson-speaking">
      <div className="lesson-speaking-words">
        {words.map((w, i) => (
          <button
            key={w.id || i}
            type="button"
            className={`lesson-word-chip ${selectedId === w.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedId(w.id)
              setFeedback(null)
              setAudioBlob(null)
            }}
          >
            <span className="arabic">{w.arabic}</span>
            {w.transliteration && (
              <span className="lesson-word-translit">{w.transliteration}</span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <>
          <div className="speaking-card" style={{ marginTop: 20 }}>
            <div className="speaking-arabic arabic">{selected.arabic}</div>
            {selected.transliteration && (
              <div className="speaking-translit">{selected.transliteration}</div>
            )}
            {selected.meaning && (
              <div className="speaking-meaning">{selected.meaning}</div>
            )}
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => speak(selected.arabic)}
              style={{ marginTop: 12 }}
            >
              🔊 Hear it
            </button>
          </div>

          <div className="speaking-controls">
            {!recording && !audioBlob && !feedback && (
              <button type="button" className="btn btn-primary" onClick={startRecording}>
                🎤 Record
              </button>
            )}
            {recording && (
              <button
                type="button"
                className="btn btn-primary speaking-recording"
                onClick={stopRecording}
              >
                <span className="recording-dot" /> Stop
              </button>
            )}
            {audioBlob && !feedback && !loading && (
              <div className="speaking-review">
                <audio src={URL.createObjectURL(audioBlob)} controls />
                <div className="speaking-actions">
                  <button type="button" className="btn btn-primary" onClick={submit}>
                    Check
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={startRecording}>
                    Re-record
                  </button>
                </div>
              </div>
            )}
            {loading && <p className="speaking-loading">🎧 Listening…</p>}
          </div>

          {feedback && !feedback.error && (
            <div className={`speaking-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
              <div className="speaking-feedback-head">
                <span className="speaking-feedback-emoji">
                  {feedback.correct ? '✅' : '❌'}
                </span>
                <span className="speaking-feedback-title">
                  {feedback.correct ? 'Well pronounced!' : 'Not quite'}
                </span>
                <span className="speaking-feedback-score">
                  {feedback.score}% match
                </span>
              </div>
              <div className="speaking-compare">
                <div className="speaking-compare-row">
                  <span className="speaking-compare-label">Expected</span>
                  <span className="arabic speaking-compare-arabic">{feedback.expected}</span>
                </div>
                <div className="speaking-compare-row">
                  <span className="speaking-compare-label">We heard</span>
                  <span className="arabic speaking-compare-arabic">
                    {feedback.heard || '—'}
                  </span>
                </div>
              </div>
            </div>
          )}
          {feedback?.error && (
            <div className="speaking-feedback wrong">
              <p>{feedback.error}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ============================================================
   Video — embed + link to full portal page
   ============================================================ */
function VideoLesson({ lesson, videoData }) {
  const { lang } = useLanguage()
  if (!videoData) {
    return (
      <p className="portal-empty">
        This lesson points at a video that no longer exists.
      </p>
    )
  }
  return (
    <div className="lesson-video">
      <div className="video-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoData.youtubeId}`}
          title={gloss(videoData.title, lang)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <Link
        href={`/portal/videos/${videoData.id}`}
        className="btn btn-ghost btn-small"
        style={{ marginTop: 16 }}
      >
        Open full transcript & practice →
      </Link>
    </div>
  )
}