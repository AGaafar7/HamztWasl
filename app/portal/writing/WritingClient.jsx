'use client'

import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import LessonLibraryList from '../../../components/LessonLibraryList'

export default function WritingClient({ lessons = [], completedIds = [] }) {
  const { t } = useLanguage()
  const w = t.learn.writing

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{w.eyebrow}</span>
        <h1 className="page-title">{w.title}</h1>
        <p>{w.lede}</p>
      </div>

      {lessons.length === 0 ? (
        <p className="portal-empty">{w.empty}</p>
      ) : (
        <LessonLibraryList lessons={lessons} completedIds={completedIds} />
      )}
    </section>
  )
}