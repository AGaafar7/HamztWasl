'use client'

import Link from 'next/link'
import { KIND_LABELS } from '../../../components/LessonForms'

export default function LessonsListClient({ lessons }) {
  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Standalone Lessons</h1>
          <p>
            Author listening, reading, speaking, writing or text lessons that
            aren't part of a course. They appear in the free practice areas for
            all learners.
          </p>
        </div>
        <Link href="/instructor/lessons/new" className="btn btn-primary">
          + New Lesson
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="empty-state-card">
          <p className="portal-empty" style={{ padding: 0 }}>
            You haven't authored any standalone lessons yet.
          </p>
          <Link href="/instructor/lessons/new" className="btn btn-primary btn-small">
            Create your first lesson
          </Link>
        </div>
      ) : (
        <div className="lessons-tile-grid">
          {lessons.map((lesson) => {
            const title =
              lesson.content?.title?.en ||
              lesson.content?.title?.ar ||
              `Untitled ${KIND_LABELS[lesson.kind]} lesson`
            return (
              <Link
                key={lesson.id}
                href={`/instructor/lessons/${lesson.id}`}
                className="lesson-tile"
              >
                <span className="lesson-kind">{KIND_LABELS[lesson.kind]}</span>
                <h3 className="lesson-tile-title">{title}</h3>
                <span className="lesson-tile-meta">
                  {lesson.updatedAt
                    ? `Updated ${lesson.updatedAt.slice(0, 10)}`
                    : 'Draft'}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}