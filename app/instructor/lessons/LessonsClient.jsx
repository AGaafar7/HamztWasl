'use client'

import LessonsEditor from '../../../components/LessonsEditor'

export default function LessonsClient({ initialLessons }) {
  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Standalone Lessons</h1>
          <p>
            Author listening, reading, speaking, video or text lessons that
            aren't part of a course. They appear in the free practice areas
            for all learners.
          </p>
        </div>
      </div>
      <LessonsEditor courseId={null} initialLessons={initialLessons} />
    </section>
  )
}