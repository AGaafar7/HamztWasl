'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { speak } from '../../../../../../utils/speak.js'
import { toggleLessonCompleteAction } from '../../../../../actions/progress'

const DIALECTS = [
  { id: 'msa', label: 'فصحى', badge: 'MSA' },
  { id: 'egyptian', label: 'مصري', badge: 'Egyptian' },
  { id: 'levantine', label: 'شامي', badge: 'Levantine' },
  { id: 'gulf', label: 'خليجي', badge: 'Khaleeji' },
  { id: 'moroccan', label: 'مغربي', badge: 'Maghrebi' },
  { id: 'iraqi', label: 'عراقي', badge: 'Iraqi' },
]

export default function LetterDetailClient({
  courseId,
  letter,
  prevLetter,
  nextLetter,
  isCompleted: initialCompleted,
}) {
  const [dialect, setDialect] = useState('msa')
  const [completed, setCompleted] = useState(initialCompleted)
  const [, startTransition] = useTransition()

  const playWithFallback = (text) => {
    const audioUrl = letter.pronunciations?.[dialect]
    if (audioUrl) {
      const a = new Audio(audioUrl)
      a.play().catch(() => speak(text, dialect))
      return
    }
    speak(text, dialect)
  }

  const handleToggleComplete = () => {
    const next = !completed
    setCompleted(next)
    startTransition(async () => {
      try {
        await toggleLessonCompleteAction(courseId, `letter:${letter.id}`)
      } catch (err) {
        console.error('Toggle complete failed:', err)
        setCompleted(!next)
      }
    })
  }

  return (
    <div className="letter-detail">
      <Link href={`/portal/courses/${courseId}`} className="back-link">← Back to course</Link>

      <div className="letter-header">
        <span className="letter-big arabic">{letter.arabic}</span>
        <div className="letter-info">
          <h1>{letter.name}</h1>
          <p className="letter-translit">{letter.transliteration}</p>
          <p className="letter-makhraj">📍 {letter.makhraj}</p>

          <button
            type="button"
            className={`btn btn-small ${completed ? 'btn-primary' : 'btn-ghost'}`}
            style={{ marginTop: 12 }}
            onClick={handleToggleComplete}
          >
            {completed ? '✓ Learned — tap to undo' : 'Mark as learned'}
          </button>
        </div>
      </div>

      <div className="dialect-selector">
        {DIALECTS.map((d) => (
          <button
            key={d.id}
            className={`dialect-btn ${dialect === d.id ? 'active' : ''}`}
            onClick={() => setDialect(d.id)}
          >
            {d.label} <span className="dialect-badge">{d.badge}</span>
          </button>
        ))}
      </div>

      <div className="letter-media">
        <div className="letter-video">
          <h3>Pronunciation</h3>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${letter.videoId}?start=${letter.startTime || 0}`}
              title={`Pronunciation of ${letter.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="letter-diagram">
          <h3>Articulation Point</h3>
          <img src={letter.mouthImage} alt={`Articulation point of ${letter.name}`} />
        </div>
      </div>

      <div className="letter-examples">
        <h3>Example Words</h3>
        <div className="examples-grid">
          {letter.examples.map((ex, i) => (
            <div key={i} className="example-card">
              <span className="example-word arabic">{ex.word}</span>
              <span className="example-translit">{ex.transliteration}</span>
              <span className="example-meaning">{ex.meaning}</span>
              <button
                type="button"
                className="example-audio"
                onClick={() => playWithFallback(ex.word)}
              >
                🔊
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => playWithFallback(letter.name)}
        >
          🔊 Listen to letter name
        </button>
      </div>

      <div className="letter-navigation">
        {prevLetter && (
          <Link href={`/portal/courses/${courseId}/letter/${prevLetter.id}`} className="btn btn-ghost">
            ← {prevLetter.name}
          </Link>
        )}
        {nextLetter && (
          <Link href={`/portal/courses/${courseId}/letter/${nextLetter.id}`} className="btn btn-ghost">
            {nextLetter.name} →
          </Link>
        )}
      </div>
    </div>
  )
}