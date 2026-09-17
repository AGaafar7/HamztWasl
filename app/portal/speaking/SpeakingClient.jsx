'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { speak } from '../../../utils/speak.js'
import { recordPracticeAttemptAction } from '../../actions/practice'
import LessonLibraryList from '../../../components/LessonLibraryList'

function buildDecks(letters) {
  const letterDeck = letters.map((l) => ({
    id: `letter-${l.id}`,
    arabic: l.name,
    transliteration: l.transliteration,
    meaning: `Letter ${l.transliteration}`,
    type: 'letter',
    dialect: 'msa',
  }))

  const wordDeck = letters.flatMap((l) =>
    (l.examples || []).map((ex, i) => ({
      id: `${l.id}-ex-${i}`,
      arabic: ex.word,
      transliteration: ex.transliteration,
      meaning: ex.meaning,
      type: 'word',
      dialect: 'msa',
    }))
  )

  const merged = []
  const max = Math.max(wordDeck.length, letterDeck.length)
  for (let i = 0; i < max; i++) {
    if (i < wordDeck.length) merged.push(wordDeck[i])
    if (i < letterDeck.length) merged.push(letterDeck[i])
  }
  return merged
}

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
    const containmentScore = Math.round((shorter / longer) * 100)
    if (containmentScore >= 50) return Math.max(containmentScore, 60)
    return containmentScore
  }

  const maxLen = Math.max(na.length, nb.length)
  const dist = levenshtein(na, nb)
  const levScore = Math.round(((maxLen - dist) / maxLen) * 100)

  const setA = new Set(na.split(''))
  const setB = new Set(nb.split(''))
  const intersection = [...setA].filter((c) => setB.has(c)).length
  const union = new Set([...setA, ...setB]).size
  const jaccardScore = union > 0 ? Math.round((intersection / union) * 100) : 0

  return Math.max(levScore, jaccardScore)
}

export default function SpeakingClient({ letters, lessons = [], completedIds = [] }) {
  const { t } = useLanguage()
  const sp = t.learn.speaking
  const deck = useMemo(() => buildDecks(letters), [letters])
  const [index, setIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [stats, setStats] = useState({ attempted: 0, correct: 0 })

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const current = deck[index]
  const progressPct = Math.round((stats.correct / Math.max(stats.attempted, 1)) * 100)

  useEffect(() => () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
  }, [])

  if (!current) {
    return <p className="portal-empty">{sp.noLetters}</p>
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []

      const mimeType =
        typeof MediaRecorder !== 'undefined' &&
        MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : typeof MediaRecorder !== 'undefined' &&
            MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/mp4'

      const mediaRecorder = new MediaRecorder(stream, { mimeType })

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        setAudioBlob(blob)
        stream.getTracks().forEach((tr) => tr.stop())
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()

      setRecording(true)
      setFeedback(null)
      setAudioBlob(null)
    } catch (err) {
      console.error('Mic error:', err)
      setFeedback({ error: sp.micDenied })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setRecording(false)
  }

  const submitRecording = async () => {
    if (!audioBlob) return
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
      const score = similarity(heard, current.arabic)
      const correct = score >= 70

      setFeedback({ correct, score, heard, expected: current.arabic })
      setStats((s) => ({
        attempted: s.attempted + 1,
        correct: s.correct + (correct ? 1 : 0),
      }))

      recordPracticeAttemptAction({
        type: 'speaking',
        refId: current.id,
        score,
        details: { expected: current.arabic, heard, correct },
      }).catch((err) => console.error('Save speaking attempt failed:', err))
    } catch (err) {
      setFeedback({ error: err.message || 'Something went wrong. Try again.' })
    } finally {
      setLoading(false)
    }
  }

  const nextWord = () => {
    setIndex((i) => (i + 1) % deck.length)
    setFeedback(null)
    setAudioBlob(null)
  }

  const tryAgain = () => {
    setFeedback(null)
    setAudioBlob(null)
  }

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{sp.eyebrow}</span>
        <h1 className="page-title">{sp.title}</h1>
        <p>{sp.lede}</p>
      </div>
            {lessons.length > 0 && (
        <div className="lesson-library-section">
          <h2 className="lesson-library-heading">From instructor lessons</h2>
          <LessonLibraryList lessons={lessons} completedIds={completedIds} openStandalone/>
        </div>
      )}

      {stats.attempted > 0 && (
        <div className="speaking-stats">
          <span><strong>{stats.correct}</strong> / {stats.attempted} {sp.correct}</span>
          <span>{sp.session}: {progressPct}% {sp.accuracy}</span>
        </div>
      )}

      <div className="speaking-card">
        <span className="speaking-type">
          {current.type === 'letter' ? sp.letterName : sp.exampleWord}
        </span>
        <div className="speaking-arabic arabic">{current.arabic}</div>
        <div className="speaking-translit">{current.transliteration}</div>
        <div className="speaking-meaning">{current.meaning}</div>

        {current.type === 'letter' && (
          <div className="speaking-say-hint">
            💡 {sp.letterTip} <strong className="arabic">هذا حرف {current.arabic}</strong> {sp.letterTipEnd}
          </div>
        )}

        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => speak(current.arabic, 'msa')}
          style={{ marginTop: '12px' }}
        >
          🔊 {sp.hearFirst}
        </button>
      </div>

      <div className="speaking-controls">
        {!recording && !audioBlob && !feedback && (
          <button type="button" className="btn btn-primary" onClick={startRecording}>
            🎤 {sp.record}
          </button>
        )}

        {recording && (
          <button type="button" className="btn btn-primary speaking-recording" onClick={stopRecording}>
            <span className="recording-dot" /> {sp.stop}
          </button>
        )}

        {audioBlob && !feedback && !loading && (
          <div className="speaking-review">
            <audio src={URL.createObjectURL(audioBlob)} controls />
            <div className="speaking-actions">
              <button type="button" className="btn btn-primary" onClick={submitRecording}>
                {sp.check}
              </button>
              <button type="button" className="btn btn-ghost" onClick={startRecording}>
                {sp.reRecord}
              </button>
            </div>
          </div>
        )}

        {loading && <p className="speaking-loading">{sp.listening}</p>}
      </div>

      {feedback && !feedback.error && (
        <div className={`speaking-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
          <div className="speaking-feedback-head">
            <span className="speaking-feedback-emoji">{feedback.correct ? '✅' : '❌'}</span>
            <span className="speaking-feedback-title">
              {feedback.correct ? sp.wellPronounced : sp.notQuite}
            </span>
            <span className="speaking-feedback-score">{feedback.score}% {sp.match}</span>
          </div>

          <div className="speaking-compare">
            <div className="speaking-compare-row">
              <span className="speaking-compare-label">{sp.expected}</span>
              <span className="arabic speaking-compare-arabic">{feedback.expected}</span>
            </div>
            <div className="speaking-compare-row">
              <span className="speaking-compare-label">{sp.heard}</span>
              <span className="arabic speaking-compare-arabic">{feedback.heard || '—'}</span>
            </div>
          </div>

          {!feedback.correct && <p className="speaking-hint">{sp.hint}</p>}

          <div className="speaking-actions">
            <button type="button" className="btn btn-primary" onClick={nextWord}>
              {sp.nextWord}
            </button>
            <button type="button" className="btn btn-ghost" onClick={tryAgain}>
              {sp.tryAgain}
            </button>
          </div>
        </div>
      )}

      {feedback?.error && (
        <div className="speaking-feedback wrong">
          <p>{feedback.error}</p>
          <button type="button" className="btn btn-ghost" onClick={tryAgain}>
            {sp.tryAgain}
          </button>
        </div>
      )}
    </section>
  )
}