'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../i18n/gloss.js'

export default function CourseDetailClient({ course, letters, lessons, completedKeys }) {
  const { t, lang } = useLanguage()
  const p = t.portal
  const completedSet = useMemo(() => new Set(completedKeys || []), [completedKeys])

  const title = gloss(course.title, lang)
  const desc = gloss(course.desc, lang)
  const levelLabel = t.learn.videos[course.level] || course.level
  const typeLabel = course.type === 'free' ? p.priceFree : `$${course.price}`

  // Special-case: the alphabet course still uses the dedicated letters grid.
  if (course.id === 'alphabet') {
    const total = letters.length
    const done = letters.filter((l) => completedSet.has(`letter:${l.id}`)).length
    const pct = total ? Math.round((done / total) * 100) : 0

    return (
      <div>
        <div className="section-head">
          <h1 className="page-title">{title}</h1>
          <p>{desc}</p>
          <p>
            <strong>{course.lessons} {p.lessonsLabel}</strong> · {levelLabel} · {typeLabel}
          </p>
        </div>

        {done > 0 && (
          <div className="portal-progress" style={{ marginBottom: 24, maxWidth: 420 }}>
            <div className="row">
              <span>{p.progressLabel}</span>
              <span>{done} / {total} · {pct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        <div className="alphabet-grid">
          {letters.map((letter) => {
            const isDone = completedSet.has(`letter:${letter.id}`)
            return (
              <Link
                href={`/portal/courses/${course.id}/letter/${letter.id}`}
                key={letter.id}
                className={`alphabet-card ${isDone ? 'alphabet-card-done' : ''}`}
              >
                {isDone && <span className="alphabet-check">✓</span>}
                <span className="alphabet-glyph arabic">{letter.arabic}</span>
                <span className="alphabet-name">{letter.name}</span>
                <span className="alphabet-translit">{letter.transliteration}</span>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  // Generic course: render its lessons.
  if (lessons.length === 0) {
    return (
      <div>
        <div className="section-head">
          <h1 className="page-title">{title}</h1>
          <p>{desc}</p>
          <p>
            <strong>{course.lessons} {p.lessonsLabel}</strong> · {levelLabel} · {typeLabel}
          </p>
        </div>
        <p className="portal-empty">This course is coming soon. Check back later!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="section-head">
        <h1 className="page-title">{title}</h1>
        <p>{desc}</p>
        <p>
          <strong>{lessons.length} {p.lessonsLabel}</strong> · {levelLabel} · {typeLabel}
        </p>
      </div>

      <div className="course-lessons">
        {lessons.map((lesson, i) => (
          <CourseLessonView key={lesson.id} index={i} lesson={lesson} />
        ))}
      </div>
    </div>
  )
}

function CourseLessonView({ index, lesson }) {
  const { lang } = useLanguage()
  const c = lesson.content || {}

  if (lesson.kind === 'text') {
    return (
      <article className="course-lesson">
        <div className="course-lesson-index">{index + 1}</div>
        <div className="course-lesson-body">
          {c.title && gloss(c.title, lang) && (
            <h2 className="course-lesson-title">{gloss(c.title, lang)}</h2>
          )}
          <p className="course-lesson-text">{gloss(c.body, lang)}</p>
        </div>
      </article>
    )
  }

  if (lesson.kind === 'tested') {
    return (
      <article className="course-lesson">
        <div className="course-lesson-index">{index + 1}</div>
        <div className="course-lesson-body">
          {c.title && gloss(c.title, lang) && (
            <h2 className="course-lesson-title">{gloss(c.title, lang)}</h2>
          )}
          <p className="course-lesson-text">{gloss(c.body, lang)}</p>
          {c.questions && c.questions.length > 0 && (
            <ol className="course-lesson-questions">
              {c.questions.map((q) => (
                <li key={q.id}>
                  <p className="course-lesson-q">{q.prompt}</p>
                  <details className="course-lesson-a">
                    <summary>Show answer</summary>
                    <p>{q.answer}</p>
                    {q.hint && <p className="course-lesson-hint">Hint: {q.hint}</p>}
                  </details>
                </li>
              ))}
            </ol>
          )}
        </div>
      </article>
    )
  }

  // Other kinds render a placeholder for now.
  return (
    <article className="course-lesson course-lesson-placeholder">
      <div className="course-lesson-index">{index + 1}</div>
      <div className="course-lesson-body">
        <p className="portal-empty">
          This lesson ({lesson.kind}) will be rendered here in a future update.
        </p>
      </div>
    </article>
  )
}