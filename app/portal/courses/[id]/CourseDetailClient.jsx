'use client'

import { useMemo } from 'react'
import Link from 'next/link'

export default function CourseDetailClient({ course, letters, completedKeys }) {
  const completedSet = useMemo(() => new Set(completedKeys || []), [completedKeys])

  if (course.id === 'alphabet') {
    const total = letters.length
    const done = letters.filter((l) => completedSet.has(`letter:${l.id}`)).length
    const pct = total ? Math.round((done / total) * 100) : 0

    return (
      <div>
        <div className="section-head">
          <h1 className="page-title">{course.title}</h1>
          <p>{course.desc}</p>
          <p>
            <strong>{course.lessons} lessons</strong> · {course.levelLabel} ·{' '}
            {course.type === 'free' ? 'Free' : 'Paid'}
          </p>
        </div>

        {done > 0 && (
          <div className="portal-progress" style={{ marginBottom: 24, maxWidth: 420 }}>
            <div className="row">
              <span>Progress</span>
              <span>{done} / {total} letters · {pct}%</span>
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

  return (
    <div>
      <h1 className="page-title">{course.title}</h1>
      <p>{course.desc}</p>
      <p className="portal-empty">This course is coming soon. Check back later!</p>
    </div>
  )
}