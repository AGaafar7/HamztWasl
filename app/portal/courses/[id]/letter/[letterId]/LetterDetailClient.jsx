'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../../../i18n/gloss.js'
import { speak } from '../../../../../../utils/speak.js'
import { toggleLessonCompleteAction } from '../../../../../actions/progress'
import TracingCanvas from '../../../../../../components/TracingCanvas'

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
  const { t, lang } = useLanguage()
  const L = t.learn.letter
  const [dialect, setDialect] = useState('msa')
  const [completed, setCompleted] = useState(initialCompleted)
  const [imageFailed, setImageFailed] = useState(false)
  const [, startTransition] = useTransition()

  // Example-word canvases — driven by clicking example word cards.
  const [activeExampleWord, setActiveExampleWord] = useState(
    letter.examples?.[0] || {
      word: letter.arabic,
      transliteration: letter.transliteration,
      meaning: letter.name,
    }
  )

  // Vocabulary-list canvas — driven by clicking vocab items. Fully independent
  // of activeExampleWord.
  const [activeVocabWord, setActiveVocabWord] = useState(
    letter.vocabulary?.[0] || null
  )

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

  const selectExampleWord = (ex) => {
    setActiveExampleWord(ex)
    playWithFallback(ex.word)
  }

  const selectVocabWord = (v) => {
    setActiveVocabWord(v)
    playWithFallback(v.arabic)
  }

  return (
    <div className="letter-detail">
      <Link href={`/portal/courses/${courseId}`} className="back-link">
        ← {L.backToCourse}
      </Link>

      {/* ---------- Header ---------- */}
      <div className="letter-header">
        <span className="letter-big arabic">{letter.arabic}</span>
        <div className="letter-info">
          <h1>{letter.name}</h1>
          <p className="letter-translit">{letter.transliteration}</p>
          {letter.makhraj && (
            <p className="letter-makhraj">📍 {gloss(letter.makhraj, lang)}</p>
          )}

          <button
            type="button"
            className={`btn btn-small ${completed ? 'btn-primary' : 'btn-ghost'}`}
            style={{ marginTop: 12 }}
            onClick={handleToggleComplete}
          >
            {completed ? L.learned : L.markLearned}
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-small"
            style={{ marginTop: 12, marginInlineStart: 8 }}
            onClick={() => playWithFallback(letter.name)}
          >
            🔊 {L.listenName}
          </button>
        </div>
      </div>

      {/* ---------- Dialects ---------- */}
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

      {/* ---------- Video + articulation ---------- */}
      <div className="letter-media">
        <div className="letter-video">
          <h3>{L.pronunciation}</h3>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${letter.videoId}?start=${letter.startTime || 0}`}
              title={`${L.pronunciation} — ${letter.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="letter-diagram">
          <h3>{L.articulation}</h3>
          {imageFailed ? (
            <div className="letter-diagram-fallback">{L.articulatorFallback}</div>
          ) : (
            <img
              src={letter.mouthImage}
              alt={`${L.articulation} — ${letter.name}`}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
      </div>

      {/* ---------- Example words (original position) ---------- */}
      <div className="letter-examples">
        <h3>{L.exampleWords}</h3>
        <div className="examples-grid">
          {letter.examples.map((ex, i) => {
            const isActive = activeExampleWord?.word === ex.word
            return (
              <div
                key={i}
                className={`example-card ${isActive ? 'example-card-active' : ''}`}
                onClick={() => selectExampleWord(ex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    selectExampleWord(ex)
                  }
                }}
              >
                <span className="example-word arabic">{ex.word}</span>
                <span className="example-translit">{ex.transliteration}</span>
                <span className="example-meaning">{ex.meaning}</span>
                <button
                  type="button"
                  className="example-audio"
                  onClick={(e) => {
                    e.stopPropagation()
                    selectExampleWord(ex)
                  }}
                  aria-label="Play"
                >
                  🔊
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* ---------- Example-word canvases (see + write) ---------- */}
      <div className="letter-canvases-row">
        <div className="letter-canvas-col">
          <h3>See it written</h3>
          <p className="letter-canvas-hint">
            Follow the numbered strokes in order.
          </p>
          <TracingCanvas
            guide={activeExampleWord?.word || letter.arabic}
            showStrokeOrder
            strokeOrderKey={letter.id}
            height={260}
          />
        </div>
        <div className="letter-canvas-col">
          <h3>Write it yourself</h3>
          <p className="letter-canvas-hint">
            Trace over the guide with your finger or stylus.
          </p>
          <TracingCanvas
            guide={activeExampleWord?.word || letter.arabic}
            height={260}
          />
        </div>
      </div>

      {/* ---------- Vocabulary list + its own write canvas ---------- */}
      {letter.vocabulary?.length > 0 && (
        <div className="letter-vocab-row">
          <div className="letter-vocab-col">
            <h3>More words with {letter.arabic}</h3>
            <div className="letter-vocab-list">
              {letter.vocabulary.map((v) => {
                const isActive = activeVocabWord?.arabic === v.arabic
                return (
                  <button
                    type="button"
                    key={v.id}
                    className={`letter-vocab-item ${isActive ? 'active' : ''}`}
                    onClick={() => selectVocabWord(v)}
                  >
                    <div className="letter-vocab-text">
                      <span className="letter-vocab-arabic arabic">{v.arabic}</span>
                      <span className="letter-vocab-translit">{v.transliteration}</span>
                      <span className="letter-vocab-meaning">{v.meaning}</span>
                    </div>
                    <span
                      className="letter-vocab-play"
                      onClick={(e) => {
                        e.stopPropagation()
                        selectVocabWord(v)
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          selectVocabWord(v)
                        }
                      }}
                    >
                      🔊
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="letter-vocab-canvas-col">
            <h3>Write it</h3>
            <p className="letter-canvas-hint">
              Currently showing:{' '}
              <span className="arabic">{activeVocabWord?.arabic || '—'}</span>
            </p>
            <TracingCanvas
              guide={activeVocabWord?.arabic || ''}
              height={260}
            />
          </div>
        </div>
      )}

      {/* ---------- Expressions ---------- */}
      {letter.expressions?.length > 0 && (
        <div className="letter-expressions">
          <h3>Expressions with {letter.arabic}</h3>
          <div className="letter-expression-list">
            {letter.expressions.map((e) => (
              <div className="letter-expression-item" key={e.id}>
                <div className="letter-expression-text">
                  <span className="letter-expression-arabic arabic">{e.arabic}</span>
                  <span className="letter-expression-translit">{e.transliteration}</span>
                  <span className="letter-expression-meaning">{e.meaning}</span>
                </div>
                <button
                  type="button"
                  className="letter-expression-play"
                  onClick={() => playWithFallback(e.arabic)}
                  aria-label="Play"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Nav ---------- */}
      <div className="letter-navigation">
        {prevLetter && (
          <Link
            href={`/portal/courses/${courseId}/letter/${prevLetter.id}`}
            className="btn btn-ghost"
          >
            ← {prevLetter.name}
          </Link>
        )}
        {nextLetter && (
          <Link
            href={`/portal/courses/${courseId}/letter/${nextLetter.id}`}
            className="btn btn-ghost"
          >
            {nextLetter.name} →
          </Link>
        )}
      </div>
    </div>
  )
}