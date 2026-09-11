'use client'

import { useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../i18n/gloss.js'
import { recordPracticeAttemptAction } from '../../actions/practice'

export default function ReadingClient({ exercises }) {
  const { t, lang } = useLanguage()
  const r = t.learn.reading
  const [selectedExercise, setSelectedExercise] = useState(exercises[0] || null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!selectedExercise) return <p className="portal-empty">{r.noExercises}</p>

  const currentQ = selectedExercise.questions[currentQuestionIndex]
  const isLast = currentQuestionIndex === selectedExercise.questions.length - 1

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return
    setLoading(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/comprehension/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passage: selectedExercise.passage[lang] || selectedExercise.passage.en,
          question: currentQ.question[lang] || currentQ.question.en,
          userAnswer: userAnswer.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Check failed')
      setFeedback(data)

      recordPracticeAttemptAction({
        type: 'reading',
        refId: selectedExercise.id,
        score: data.correct ? 100 : 0,
        details: {
          questionIndex: currentQuestionIndex,
          userAnswer: userAnswer.trim(),
          feedback: data.feedback,
        },
      }).catch((err) => console.error('Save reading attempt failed:', err))
    } catch (err) {
      setFeedback({ correct: false, feedback: err.message || 'Something went wrong.' })
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (isLast) {
      setDone(true)
      return
    }
    setCurrentQuestionIndex((i) => i + 1)
    setUserAnswer('')
    setFeedback(null)
  }

  const handleRetry = () => {
    setFeedback(null)
    setUserAnswer('')
  }

  if (done) {
    return (
      <div className="section-head">
        <h1 className="page-title">{r.completeTitle}</h1>
        <p>{r.completeBody}</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setDone(false)
            setCurrentQuestionIndex(0)
            setUserAnswer('')
            setFeedback(null)
          }}
        >
          {r.startOver}
        </button>
      </div>
    )
  }

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{r.eyebrow}</span>
        <h1 className="page-title">{gloss(selectedExercise.title, lang)}</h1>
        <p>{r.title}</p>
      </div>

      <div
        className="passage-box"
        style={{
          background: 'var(--bg-soft)',
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '24px',
        }}
      >
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          {selectedExercise.passage[lang] || selectedExercise.passage.en}
        </p>
      </div>

      <div className="question-box" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
          {r.question} {currentQuestionIndex + 1} {r.of} {selectedExercise.questions.length}
        </h3>
        <p style={{ fontSize: '1.1rem' }}>
          {currentQ.question[lang] || currentQ.question.en}
        </p>
      </div>

      <textarea
        className="form-input"
        rows="4"
        placeholder={r.placeholder}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={loading || feedback?.correct === true}
        style={{ fontSize: '1rem', marginBottom: '16px' }}
      />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading || !userAnswer.trim() || feedback?.correct === true}
        >
          {loading ? r.checking : r.submit}
        </button>
        {feedback && !feedback.correct && (
          <button className="btn btn-ghost" onClick={handleRetry}>
            {r.tryAgain}
          </button>
        )}
        {feedback?.correct && (
          <button className="btn btn-primary" onClick={handleNext}>
            {isLast ? r.finish : r.next}
          </button>
        )}
      </div>

      {feedback && (
        <div
          className={`feedback-box ${feedback.correct ? 'feedback-correct' : 'feedback-incorrect'}`}
          style={{
            padding: '16px',
            borderRadius: '12px',
            background: feedback.correct ? 'var(--green-soft)' : 'rgba(231,98,30,0.08)',
            border: `1px solid ${feedback.correct ? 'var(--green)' : 'var(--orange)'}`,
          }}
        >
          <p style={{ fontWeight: 'bold', marginBottom: '6px' }}>
            {feedback.correct ? `✅ ${r.correct}` : `❌ ${r.notQuite}`}
          </p>
          <p>{feedback.feedback}</p>
        </div>
      )}
    </section>
  )
}