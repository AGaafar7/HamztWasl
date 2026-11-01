'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { gloss } from '../i18n/gloss.js'

export default function LessonLibraryList({ 
  lessons,
  completedIds = [], 
  openStandalone = false,
  from = null,          // e.g. 'listening' | 'reading' | 'speaking' | 'writing'
   }) {
  const { lang } = useLanguage()
  const completedSet = useMemo(() => new Set(completedIds), [completedIds])

  if (!lessons || lessons.length === 0) return null
  const showArabicTitle = from === 'speaking'


  return (
    <div className="lesson-library">
      {lessons.map((lesson) => {
        const titleEn = gloss(lesson.content?.title, lang) || 'Untitled lesson'
        const titleAr = lesson.content?.title?.ar || ''
        const source = lesson.courseId
          ? gloss(lesson.courseTitle, lang) || 'Course lesson'
          : 'Standalone lesson'
        
        // If the caller says we're showing these as free practice content,
        // always open the standalone route — even for lessons that live
        // inside a free course. Otherwise honour the lesson's real home.
        const localePrefix = lang === 'en' ? '' : `/${lang}`
        const base = (openStandalone || !lesson.courseId)
          ? `${localePrefix}/portal/lessons/${lesson.id}`
          : `${localePrefix}/portal/courses/${lesson.courseId}/lessons/${lesson.id}`
        const href = from ? `${base}?from=${from}` : base

        const done = completedSet.has(lesson.id)

        return (
          <Link
            key={lesson.id}
            href={href}
            className={`lesson-library-card ${done ? 'lesson-library-card-done' : ''}`}
          >
            <div className="lesson-library-body">
              <span className="lesson-library-source">{source}</span>
                {showArabicTitle && titleAr ? (
                <>
                  <h3 className="lesson-library-title arabic" dir="rtl">
                    {titleAr}
                  </h3>
                  <span className="lesson-library-subtitle">{titleEn}</span>
                </>
              ) : (
                <h3 className="lesson-library-title">{titleEn}</h3>
              )}
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