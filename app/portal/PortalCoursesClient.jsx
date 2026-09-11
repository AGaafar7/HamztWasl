'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { enrollAction } from '../actions/enrollments'

const TABS = ['all', 'free', 'paid', 'inProgress']

export default function PortalCoursesClient({ courses: initialCourses }) {
  const { t } = useLanguage()
  const p = t.portal
  const { profile, signOut } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('all')
  const [courses, setCourses] = useState(initialCourses)
  const [, startTransition] = useTransition()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const handleEnroll = (courseId) => {
    // Optimistic: flip the card to "enrolled" instantly.
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: true, progress: 0 } : c))
    )
    startTransition(async () => {
      try {
        await enrollAction(courseId)
      } catch (err) {
        console.error('Enroll failed:', err)
        // Roll back.
        setCourses((prev) =>
          prev.map((c) => (c.id === courseId ? { ...c, enrolled: false, progress: null } : c))
        )
      }
    })
  }

  const filtered = courses.filter((c) => {
    if (tab === 'free') return c.type === 'free'
    if (tab === 'paid') return c.type === 'paid'
    if (tab === 'inProgress') return c.enrolled && (c.progress ?? 0) < 100
    return true
  })

  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>{p.greeting}{profile?.full_name ? `, ${profile.full_name}` : ''}</h1>
          <p>{p.subtitle}</p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>{p.logout}</button>
      </div>

      <div className="portal-tabs" role="tablist">
        {TABS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`tab-btn ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key)}
          >
            {p.tabs[key]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="portal-empty">{p.emptyState}</p>
      ) : (
        <div className="courses-grid portal-grid">
          {filtered.map((c) => (
            <article className="course-card" key={c.id}>
              <div className={`course-thumb ${c.theme}`}>
                <span className="level-pill"><span className="dot" />{c.levelLabel}</span>
                <span className="glyph arabic">{c.glyph}</span>
                <span className={`price-badge ${c.type === 'free' ? 'is-free' : 'is-paid'}`}>
                  {c.type === 'free' ? p.priceFree : `$${c.price}`}
                </span>
              </div>
              <div className="course-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>

                {c.enrolled && (
                  <div className="portal-progress">
                    <div className="row">
                      <span>{p.progressLabel}</span>
                      <span>{c.progress ?? 0}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${c.progress ?? 0}%` }} />
                    </div>
                  </div>
                )}

                <div className="course-foot">
                  <div className="instructor">
                    <span className="avatar">{c.instructor[0]}</span>
                    <div className="instructor-meta">
                      <small>{c.instructor}</small>
                      <span>{c.lessons} {p.lessonsLabel}</span>
                    </div>
                  </div>

                  {c.enrolled ? (
                    <Link href={`/portal/courses/${c.id}`} className="btn btn-primary btn-small">
                      {p.continueBtn}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={() => handleEnroll(c.id)}
                    >
                      {c.type === 'free' ? p.enrollFree : p.enrollBtn}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="portal-note">{p.comingSoonNote}</p>
    </section>
  )
}