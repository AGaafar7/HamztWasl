'use client'

import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import LessonLibraryList from '../../../components/LessonLibraryList'

export default function ListeningClient({ lessons = [], completedIds = [] }) {
  const { t } = useLanguage()
  const l = t.learn.listening
  return (
  <section>
    <div className="section-head">
      <span className="eyebrow">{l.title}</span>
      <h1 className="page-title">{l.title}</h1>
      <p>{l.lede}</p>
    </div>

    {lessons.length > 0 ? (
      <div className="lesson-library-section">
        <h2 className="lesson-library-heading">From instructor lessons</h2>
        <LessonLibraryList
          lessons={lessons}
          completedIds={completedIds}
          openStandalone
          from="listening"
        />
      </div>
    ) : (
      <p className="portal-empty">No listening lessons yet.</p>
    )}
  </section>
)
}