'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { gloss } from '../i18n/gloss.js'

export default function LessonLibraryList({ lessons, completedIds = [] }) {
  const { lang } = useLanguage()
  const completedSet = useMemo(() => new Set(completedIds), [completedIds])

  if (!lessons || lessons.length === 0) return null

  return (
    <div className="lesson-library">
      {lessons.map((lesson) => {
        const title = gloss(lesson.content?.title, lang) || 'Untitled lesson'
        const source = lesson.courseId
          ? gloss(lesson.courseTitle, lang) || 'Course lesson'
          : 'Standalone lesson'
        const href = lesson.courseId
          ? `/portal/courses/${lesson.courseId}/lessons/${lesson.id}`
          : `/portal/lessons/${lesson.id}`
        const done = completedSet.has(lesson.id)

        return (
          <Link
            key={lesson.id}
            href={href}
            className={`lesson-library-card ${done ? 'lesson-library-card-done' : ''}`}
          >
            <div className="lesson-library-body">
              <span className="lesson-library-source">{source}</span>
              <h3 className="lesson-library-title">{title}</h3>
            </div>
            {done ? (
              <span className="lesson-library-check">✓</span>
            ) : (
              <span className="lesson-library-go">→</span>
            )}
          </Link>
        )
      })}
    </div>
  )
}