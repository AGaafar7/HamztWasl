'use client'

import { useMemo, useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../i18n/gloss.js'
import { speak } from '../../../utils/speak.js'
import { recordPracticeAttemptAction } from '../../actions/practice'
import LessonLibraryList from '../../../components/LessonLibraryList'

function normalize(str) {
  return str
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[.,،؟!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function similarity(a, b) {
  const wa = normalize(a).split(' ').filter(Boolean)
  const wb = normalize(b).split(' ').filter(Boolean)
  if (wa.length === 0) return 0
  const setB = new Set(wb)
  const matches = wa.filter((w) => setB.has(w)).length
  return Math.round((matches / wa.length) * 100)
}

export default function ListeningClient({ lines, videos, lessons = [], completedIds = [] }) {
  const { t, lang } = useLanguage()
  const l = t.learn.listening
  const [videoFilter, setVideoFilter] = useState('all')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(null)

  const deck = useMemo(
    () => (videoFilter === 'all' ? lines : lines.filter((line) => line.videoId === videoFilter)),
    [lines, videoFilter]
  )
  const current = deck.length ? deck[index % deck.length] : null

  const onCheck = () => {
    if (!answer.trim() || !current) return
    const accuracy = similarity(answer, current.arabic)
    setChecked({ accuracy, revealed: false })

    // Save the attempt (fire-and-forget; failure doesn't block the UI).
    recordPracticeAttemptAction({
      type: 'listening',
      refId: current.videoId,
      score: accuracy,
      details: {
        expected: current.arabic,
        heard: answer.trim(),
        videoId: current.videoId,
      },
    }).catch((err) => console.error('Save listening attempt failed:', err))
  }
  const onShowAnswer = () => setChecked({ accuracy: checked?.accuracy ?? 0, revealed: true })
  const onNext = () => {
    if (!deck.length) return
    setIndex((i) => (i + 1) % deck.length)
    setAnswer('')
    setChecked(null)
  }
  const changeVideo = (id) => {
    setVideoFilter(id)
    setIndex(0)
    setAnswer('')
    setChecked(null)
  }

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{l.title}</span>
        <h1 className="page-title">{l.title}</h1>
        <p>{l.lede}</p>
      </div>
            {lessons.length > 0 && (
        <div className="lesson-library-section">
          <h2 className="lesson-library-heading">From instructor lessons</h2>
          <LessonLibraryList lessons={lessons} completedIds={completedIds} openStandalone/>
        </div>
      )}

      <div className="listen-picker">
        <span className="filter-label">{l.pickVideo}</span>
        <div className="filter-chips">
          <button
            type="button"
            className={`chip ${videoFilter === 'all' ? 'active' : ''}`}
            onClick={() => changeVideo('all')}
          >
            All
          </button>
          {videos.map((v) => (
            <button
              key={v.id}
              type="button"
              className={`chip ${videoFilter === v.id ? 'active' : ''}`}
              onClick={() => changeVideo(v.id)}
            >
              {gloss(v.title, lang)}
            </button>
          ))}
        </div>
      </div>

      {!current ? (
        <p className="portal-empty">No transcript lines available yet.</p>
      ) : (
        <div className="listen-card">
          <div className="video-embed listen-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}`}
              title={gloss(current.videoTitle, lang)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="listen-video-title">{gloss(current.videoTitle, lang)}</div>

          <button type="button" className="listen-play-btn" onClick={() => speak(current.arabic)}>
            🔊 {l.play}
          </button>

          <label className="form-label" htmlFor="listen-answer">{l.yourAnswer}</label>
          <input
            id="listen-answer"
            type="text"
            dir="rtl"
            className="form-input arabic listen-input"
            placeholder={l.placeholder}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="listen-actions">
            <button type="button" className="btn btn-primary" onClick={onCheck}>{l.check}</button>
            <button type="button" className="btn btn-ghost" onClick={onShowAnswer}>{l.showAnswer}</button>
            <button type="button" className="btn btn-ghost" onClick={onNext}>{l.next}</button>
          </div>

          {checked && (
            <div className={`listen-result ${checked.accuracy >= 70 ? 'good' : 'retry'}`}>
              <div className="listen-accuracy">
                {l.accuracy}: {checked.accuracy}%
              </div>
              <p>{checked.accuracy >= 70 ? l.correct : l.tryAgain}</p>
              {checked.revealed && (
                <div className="listen-reveal">
                  <span className="arabic">{current.arabic}</span>
                  <p>{gloss(current.gloss, lang)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}