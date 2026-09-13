'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../i18n/gloss.js'

const KIND_LABEL = {
  text: 'Text',
  tested: 'Quiz',
  video: 'Video',
  listening: 'Listening',
  reading: 'Reading',
  speaking: 'Speaking',
  writing: 'Writing',
}

export default function CourseDetailClient({ course, letters, lessons, completedKeys }) {
  const { t, lang } = useLanguage()
  const p = t.portal
  const completedSet = useMemo(() => new Set(completedKeys || []), [completedKeys])

  const title = gloss(course.title, lang)
  const desc = gloss(course.desc, lang)
  const levelLabel = t.learn.videos[course.level] || course.level
  const typeLabel = course.type === 'free' ? p.priceFree : `$${course.price}`

  /* ============================================================
     Alphabet course — keep the letter grid, but frame it properly
     ============================================================ */
  if (course.id === 'alphabet') {
    const total = letters.length
    const done = letters.filter((l) => completedSet.has(`letter:${l.id}`)).length
    const pct = total ? Math.round((done / total) * 100) : 0

    return (
      <div className="course-detail">
        <CourseHero
          course={course}
          title={title}
          desc={desc}
          levelLabel={levelLabel}
          typeLabel={typeLabel}
          meta={`${total} ${p.lessonsLabel}`}
        />

        <div className="course-progress-card">
          <div className="course-progress-info">
            <div className="course-progress-head">
              <span className="course-progress-label">
                {p.progressLabel}
              </span>
              <span className="course-progress-value">
                {done} / {total} · {pct}%
              </span>
            </div>
            <div className="course-progress-track">
              <div
                className="course-progress-fill"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="course-lessons-section">
          <div className="course-lessons-head">
            <h2>Letters</h2>
            <span className="course-lessons-count">
              {done} of {total} completed
            </span>
          </div>
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
      </div>
    )
  }

  /* ============================================================
     Generic course
     ============================================================ */
  if (lessons.length === 0) {
    return (
      <div className="course-detail">
        <CourseHero
          course={course}
          title={title}
          desc={desc}
          levelLabel={levelLabel}
          typeLabel={typeLabel}
          meta={`${course.lessons} ${p.lessonsLabel}`}
        />
        <p className="portal-empty">
          This course is being prepared — check back soon.
        </p>
      </div>
    )
  }

  const done = lessons.filter((l) => completedSet.has(`lesson:${l.id}`)).length
  const pct = Math.round((done / lessons.length) * 100)
  const nextIndex = lessons.findIndex((l) => !completedSet.has(`lesson:${l.id}`))
  const resumeIndex = nextIndex === -1 ? 0 : nextIndex
  const resumeLesson = lessons[resumeIndex]

  const ctaLabel =
    done === 0
      ? 'Start course'
      : done === lessons.length
      ? 'Review from the start'
      : `Continue — Lesson ${resumeIndex + 1}`

  return (
    <div className="course-detail">
      <CourseHero
        course={course}
        title={title}
        desc={desc}
        levelLabel={levelLabel}
        typeLabel={typeLabel}
        meta={`${lessons.length} ${p.lessonsLabel}`}
      />

      <div className="course-progress-card">
        <div className="course-progress-info">
          <div className="course-progress-head">
            <span className="course-progress-label">
              {done > 0 ? p.progressLabel : 'Ready to begin?'}
            </span>
            <span className="course-progress-value">
              {done} / {lessons.length} · {pct}%
            </span>
          </div>
          <div className="course-progress-track">
            <div
              className="course-progress-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        {resumeLesson && (
          <Link
            href={`/portal/courses/${course.id}/lessons/${resumeLesson.id}`}
            className="btn btn-primary"
          >
            {ctaLabel} →
          </Link>
        )}
      </div>

      <div className="course-lessons-section">
        <div className="course-lessons-head">
          <h2>Course content</h2>
          <span className="course-lessons-count">
            {done} of {lessons.length} completed
          </span>
        </div>

        <div className="lesson-list-container">
          {lessons.map((lesson, i) => {
            const lessonTitle =
              gloss(lesson.content?.title, lang) || `Lesson ${i + 1}`
            const isDone = completedSet.has(`lesson:${lesson.id}`)
            const isCurrent = i === nextIndex
            return (
              <Link
                key={lesson.id}
                href={`/portal/courses/${course.id}/lessons/${lesson.id}`}
                className={`lesson-row-item ${isDone ? 'lesson-done' : ''} ${isCurrent ? 'lesson-current' : ''}`}
              >
                <span className="lesson-row-num">
                  {isDone ? '✓' : i + 1}
                </span>
                <div className="lesson-row-body">
                  <span className="lesson-row-kind">
                    {KIND_LABEL[lesson.kind] || lesson.kind}
                  </span>
                  <span className="lesson-row-title">{lessonTitle}</span>
                </div>
                <span className="lesson-row-end">
                  {isDone ? '' : '→'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Hero — shared by both course kinds
   ============================================================ */
function CourseHero({ course, title, desc, levelLabel, typeLabel, meta }) {
  return (
    <div className={`course-hero ${course.theme || 't1'}`}>
      {course.glyph && (
        <div className="course-hero-glyph arabic">{course.glyph}</div>
      )}
      <div className="course-hero-body">
        <div className="course-hero-badges">
          <span className="course-hero-badge">{levelLabel}</span>
          <span className="course-hero-badge">{typeLabel}</span>
        </div>
        <h1 className="course-hero-title">{title}</h1>
        {desc && <p className="course-hero-desc">{desc}</p>}
        <div className="course-hero-meta">
          {meta}
          {course.instructor && course.instructor !== 'Huroof Team' && (
            <> · by {course.instructor}</>
          )}
        </div>
      </div>
    </div>
  )
}