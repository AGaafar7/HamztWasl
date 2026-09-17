'use client'

import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import LessonLibraryList from '../../../components/LessonLibraryList'

export default function SpeakingClient({ lessons = [], completedIds = [] }) {
  const { t } = useLanguage()
  const sp = t.learn.speaking

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{sp.eyebrow}</span>
        <h1 className="page-title">{sp.title}</h1>
        <p>{sp.lede}</p>
      </div>

      {lessons.length > 0 ? (
        <div className="lesson-library-section">
          <h2 className="lesson-library-heading">From instructor lessons</h2>
          <LessonLibraryList
            lessons={lessons}
            completedIds={completedIds}
            openStandalone
            from="speaking"
          />
        </div>
      ) : (
        <p className="portal-empty">No speaking lessons yet.</p>
      )}
    </section>
  )
}