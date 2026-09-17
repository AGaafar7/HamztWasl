'use client'

import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import LessonLibraryList from '../../../components/LessonLibraryList'

export default function ReadingClient({ lessons = [], completedIds = [] }) {
  const { t } = useLanguage()
  const r = t.learn.reading

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{r.eyebrow}</span>
        <h1 className="page-title">{r.title}</h1>
        <p>{r.lede}</p>
      </div>

      {lessons.length > 0 ? (
        <div className="lesson-library-section">
          <h2 className="lesson-library-heading">From instructor lessons</h2>
          <LessonLibraryList
            lessons={lessons}
            completedIds={completedIds}
            openStandalone
            from="reading"
          />
        </div>
      ) : (
        <p className="portal-empty">No reading lessons yet.</p>
      )}
    </section>
  )
}