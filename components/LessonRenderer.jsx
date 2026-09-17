'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { gloss } from '../i18n/gloss.js'
import { speak } from '../utils/speak.js'
import { toggleLessonCompleteAction } from '../app/actions/progress'
import dynamic from 'next/dynamic'
const TracingCanvas = dynamic(() => import('./TracingCanvas'), { ssr: false })

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
  writing: 'Writing',
}

export default function LessonRenderer({
  course = null,
  lesson,
  siblings = null,
  isCompleted: initialCompleted = false,
  videoData = null,
}) {
  const { t, lang } = useLanguage()
  const [completed, setCompleted] = useState(initialCompleted)
  const [, startTransition] = useTransition()

  const title =
    gloss(lesson.content?.title, lang) ||
    (siblings ? `Lesson ${siblings.index + 1}` : 'Lesson')

  const onToggleComplete = () => {
    const next = !completed
    setCompleted(next)
    startTransition(async () => {
      try {
        await toggleLessonCompleteAction(course?.id ?? null, `lesson:${lesson.id}`)
      } catch (err) {
        console.error('Toggle complete failed:', err)
        setCompleted(!next)
      }
    })
  }

  const backHref = course ? `/portal/courses/${course.id}` : '/portal'
  const backLabel = course ? gloss(course.title, lang) : 'Back to portal'

  const progressPct =
    siblings && siblings.total
      ? Math.round(((siblings.index + 1) / siblings.total) * 100)
      : 0

  return (
    <section className="lesson-page">
      <div className="lesson-page-topbar">
        <Link href={backHref} className="back-link">← {backLabel}</Link>
        {siblings && (
          <span className="lesson-page-position">
            Lesson {siblings.index + 1} of {siblings.total}
          </span>
        )}
      </div>

      {siblings && siblings.total > 1 && (
        <div className="lesson-page-progress">
          <div
            className="lesson-page-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      <article className="lesson-page-card">
        <header className="lesson-page-head">
          <span className="lesson-kind">
            {KIND_LABEL[lesson.kind] || lesson.kind}
          </span>
          <h1 className="lesson-page-title">{title}</h1>
        </header>

        <div className="lesson-page-body">
          {lesson.kind === 'text' && <TextLesson lesson={lesson} />}
          {lesson.kind === 'tested' && <TestedLesson lesson={lesson} />}
          {lesson.kind === 'listening' && <ListeningLesson lesson={lesson} />}
          {lesson.kind === 'reading' && <ReadingLesson lesson={lesson} />}
          {lesson.kind === 'speaking' && <SpeakingLesson lesson={lesson} />}
          {lesson.kind === 'writing' && <WritingLesson lesson={lesson} />}
          {lesson.kind === 'video' && <VideoLesson lesson={lesson} videoData={videoData} />}
        </div>
      </article>

      <div className="lesson-page-foot">
        <div className="lesson-page-nav">
          {siblings?.prev ? (
            <Link
              href={`/portal/courses/${course.id}/lessons/${siblings.prev.id}`}
              className="btn btn-ghost btn-small"
            >
              ← Previous
            </Link>
          ) : (
            <span />
          )}
          {siblings?.next && (
            <Link
              href={`/portal/courses/${course.id}/lessons/${siblings.next.id}`}
              className="btn btn-ghost btn-small"
            >
              Next →
            </Link>
          )}
        </div>

        
          <button
            type="button"
            className={`btn ${completed ? 'btn-ghost' : 'btn-primary'}`}
            onClick={onToggleComplete}
          >
            {completed ? '✓ Completed — tap to undo' : 'Mark as complete'}
          </button>
      
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
   Tested — interactive quiz with Gemini grading
   ============================================================ */
function TestedLesson({ lesson }) {
  const { lang } = useLanguage()
  const c = lesson.content || {}
  const body = c.body?.ar || c.body?.en || ''
  const questions = c.questions || []

  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState({})
  const [revealed, setRevealed] = useState({})

  if (questions.length === 0) {
    return (
      <div className="lesson-body-text">
              {body && (
        <div className="lesson-body-text-body arabic" dir="rtl">
          {body}
        </div>
      )}
        <p className="portal-empty">This lesson has no questions yet.</p>
      </div>
    )
  }

  const onCheck = async (q) => {
    const userAnswer = (answers[q.id] || '').trim()
    if (!userAnswer) return
    setLoading((s) => ({ ...s, [q.id]: true }))
    try {
      const res = await fetch('/api/comprehension/check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          passage: body || q.prompt,
          question: q.prompt,
          userAnswer,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Check failed')
      setResults((s) => ({ ...s, [q.id]: data }))
    } catch (err) {
      setResults((s) => ({
        ...s,
        [q.id]: {
          correct: false,
          feedback: err.message || 'Check failed. Try again.',
        },
      }))
    } finally {
      setLoading((s) => ({ ...s, [q.id]: false }))
    }
  }

  const onReveal = (qid) => {
    setRevealed((s) => ({ ...s, [qid]: !s[qid] }))
  }

  return (
    <div className="lesson-body-text">
            {body && (
        <div className="lesson-body-text-body arabic" dir="rtl">
          {body}
        </div>
      )}

      <div className="lesson-questions">
        <h3>Questions</h3>
        {questions.map((q, i) => {
          const result = results[q.id]
          const isCorrect = result?.correct === true
          const isWrong = result && !result.correct
          const isRevealed = revealed[q.id]
          return (
            <div
              className={`quiz-card ${isCorrect ? 'quiz-correct' : ''} ${isWrong ? 'quiz-wrong' : ''}`}
              key={q.id || i}
            >
              <div className="quiz-card-head">
                <span className="quiz-card-num">Question {i + 1}</span>
                {isCorrect && (
                  <span className="quiz-badge quiz-badge-correct">✓ Correct</span>
                )}
                {isWrong && (
                  <span className="quiz-badge quiz-badge-wrong">Try again</span>
                )}
              </div>

              <p className="quiz-card-prompt arabic" dir="rtl">{q.prompt}</p>

              <textarea
                className="form-input quiz-input arabic"
                dir="rtl"
                rows="3"
                placeholder="اكتب إجابتك هنا…"
                value={answers[q.id] || ''}
                onChange={(e) =>
                  setAnswers((s) => ({ ...s, [q.id]: e.target.value }))
                }
                disabled={isCorrect || loading[q.id]}
              />

              <div className="quiz-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  onClick={() => onCheck(q)}
                  disabled={!answers[q.id]?.trim() || loading[q.id] || isCorrect}
                >
                  {loading[q.id] ? 'Checking…' : 'Check answer'}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => onReveal(q.id)}
                >
                  {isRevealed ? 'Hide reference' : 'Show reference answer'}
                </button>
              </div>

              {result && (
                <div className={`quiz-feedback ${result.correct ? 'good' : 'bad'}`}>
                  {result.feedback}
                </div>
              )}

              {isRevealed && (
                <div className="quiz-reference">
                  <span className="quiz-reference-label">Reference answer</span>
                  <p className="quiz-reference-text arabic" dir="rtl">{q.answer}</p>
                  {q.hint && <p className="quiz-hint">Hint: {q.hint}</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ============================================================
   Listening
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
      <p className="lesson-listen-intro">
        Listen to the audio, then type what you hear in Arabic.
      </p>

      {lines.map((line, i) => {
        const state = checked[line.id]
        const isGood = state?.accuracy >= 70
        return (
          <div className="lesson-listen-line" key={line.id || i}>
            <div className="lesson-listen-head">
              <span className="lesson-listen-counter">
                Line {i + 1} of {lines.length}
              </span>
            </div>

            <div className="lesson-listen-playrow">
              <button
                type="button"
                className="listen-play-btn"
                onClick={() => speak(line.arabic)}
              >
                🔊 Play the line
              </button>
              <span className="lesson-listen-hint">
                You can replay as many times as you need
              </span>
            </div>

            <label className="lesson-listen-label">
              Type what you heard
            </label>
            <input
              type="text"
              dir="rtl"
              className="form-input arabic lesson-listen-input"
              placeholder="اكتب هنا…"
              value={answers[line.id] || ''}
              onChange={(e) =>
                setAnswers((a) => ({ ...a, [line.id]: e.target.value }))
              }
            />

            <div className="lesson-listen-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onCheck(line.id, line.arabic)}
                disabled={!answers[line.id]?.trim()}
              >
                Check answer
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onReveal(line.id)}
              >
                Show answer
              </button>
            </div>

            {state && (
              <div className={`listen-result ${isGood ? 'good' : 'retry'}`}>
                <div className="listen-accuracy">
                  {isGood ? '✓ ' : '✕ '}
                  Accuracy: {state.accuracy}%
                </div>
                {state.revealed && (
                  <div className="listen-reveal">
                    <span className="arabic listen-reveal-arabic">
                      {line.arabic}
                    </span>
                    {gloss(line.gloss, lang) && (
                      <p className="listen-reveal-gloss">{gloss(line.gloss, lang)}</p>
                    )}
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
   Reading — passage always Arabic, interactive comprehension
   ============================================================ */
function ReadingLesson({ lesson }) {
  const c = lesson.content || {}

  // The student is learning to READ in Arabic, so the passage always
  // shows the Arabic version — not the UI language. Fall back to English
  // only if the instructor left the Arabic empty.
  const passage = c.passage?.ar || c.passage?.en || ''
  const questions = c.questions || []

  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState({})
  const [revealed, setRevealed] = useState({})

  if (!passage && questions.length === 0) {
    return <p className="portal-empty">This lesson has no content yet.</p>
  }

  const onCheck = async (q) => {
    const userAnswer = (answers[q.id] || '').trim()
    if (!userAnswer) return
    setLoading((s) => ({ ...s, [q.id]: true }))
    try {
      const res = await fetch('/api/comprehension/check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ passage, question: q.prompt, userAnswer }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Check failed')
      setResults((s) => ({ ...s, [q.id]: data }))
    } catch (err) {
      setResults((s) => ({
        ...s,
        [q.id]: {
          correct: false,
          feedback: err.message || 'Check failed. Try again.',
        },
      }))
    } finally {
      setLoading((s) => ({ ...s, [q.id]: false }))
    }
  }

  const onReveal = (qid) => {
    setRevealed((s) => ({ ...s, [qid]: !s[qid] }))
  }

  return (
    <div className="lesson-reading">
      {passage && (
        <div className="passage-box arabic" dir="rtl">
          <p>{passage}</p>
        </div>
      )}

      {questions.length > 0 && (
        <div className="lesson-questions">
          <h3>Comprehension questions</h3>
          {questions.map((q, i) => {
            const result = results[q.id]
            const isCorrect = result?.correct === true
            const isWrong = result && !result.correct
            const isRevealed = revealed[q.id]
            return (
              <div
                className={`quiz-card ${isCorrect ? 'quiz-correct' : ''} ${isWrong ? 'quiz-wrong' : ''}`}
                key={q.id || i}
              >
                <div className="quiz-card-head">
                  <span className="quiz-card-num">Question {i + 1}</span>
                  {isCorrect && (
                    <span className="quiz-badge quiz-badge-correct">✓ Correct</span>
                  )}
                  {isWrong && (
                    <span className="quiz-badge quiz-badge-wrong">Try again</span>
                  )}
                </div>

                <p className="quiz-card-prompt arabic" dir="rtl">{q.prompt}</p>

                <textarea
                  className="form-input quiz-input arabic"
                  dir="rtl"
                  rows="3"
                  placeholder="اكتب إجابتك هنا…"
                  value={answers[q.id] || ''}
                  onChange={(e) =>
                    setAnswers((s) => ({ ...s, [q.id]: e.target.value }))
                  }
                  disabled={isCorrect || loading[q.id]}
                />

                <div className="quiz-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    onClick={() => onCheck(q)}
                    disabled={!answers[q.id]?.trim() || loading[q.id] || isCorrect}
                  >
                    {loading[q.id] ? 'Checking…' : 'Check answer'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    onClick={() => onReveal(q.id)}
                  >
                    {isRevealed ? 'Hide reference' : 'Show reference answer'}
                  </button>
                </div>

                {result && (
                  <div className={`quiz-feedback ${result.correct ? 'good' : 'bad'}`}>
                    {result.feedback}
                  </div>
                )}

                {isRevealed && (
                  <div className="quiz-reference">
                    <span className="quiz-reference-label">Reference answer</span>
                    <p className="quiz-reference-text arabic" dir="rtl">{q.answer}</p>
                    {q.hint && <p className="quiz-hint">Hint: {q.hint}</p>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Speaking
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
   Writing
   ============================================================ */
function WritingLesson({ lesson }) {
  const items = lesson.content?.items || []
  const [current, setCurrent] = useState(0)

  if (items.length === 0) {
    return <p className="portal-empty">This lesson has no items to trace yet.</p>
  }

  const item = items[current]

  return (
    <div className="writing-lesson">
      {items.length > 1 && (
        <div className="writing-tabs">
          {items.map((it, i) => (
            <button
              key={it.id || i}
              type="button"
              className={`writing-tab ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <span className="arabic">{it.arabic}</span>
              {it.transliteration && (
                <span className="writing-tab-translit">{it.transliteration}</span>
              )}
            </button>
          ))}
        </div>
      )}

      <TracingCanvas guide={item.arabic} />

      <div className="writing-meta">
        {item.transliteration && (
          <span className="writing-translit">{item.transliteration}</span>
        )}
        {item.meaning && <span className="writing-meaning">{item.meaning}</span>}
      </div>

      {items.length > 1 && (
        <div className="writing-nav">
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={() => setCurrent((i) => Math.max(0, i - 1))}
            disabled={current === 0}
          >
            ← Previous
          </button>
          <span className="writing-position">
            {current + 1} / {items.length}
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={() => setCurrent((i) => Math.min(items.length - 1, i + 1))}
            disabled={current === items.length - 1}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Video
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