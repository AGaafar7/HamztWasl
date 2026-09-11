'use client'

import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { getCourses } from '../data/courses.js'

export default function Courses() {
  const { t, lang } = useLanguage()
  const c = t.coursesSection
  const preview = getCourses(lang).slice(0, 3)

  return (
    <section className="section" id="courses">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p>{c.lede}</p>
        </div>

        <div className="courses-grid">
          {preview.map((course) => (
            <article className="course-card" key={course.id}>
              <div className={`course-thumb ${course.theme}`}>
                <span className="level-pill"><span className="dot" />{course.levelLabel}</span>
                <span className="glyph arabic">{course.glyph}</span>
                <span className={`price-badge ${course.type === 'free' ? 'is-free' : 'is-paid'}`}>
                  {course.type === 'free' ? t.portal.priceFree : `$${course.price}`}
                </span>
              </div>
              <div className="course-body">
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <div className="course-foot">
                  <div className="instructor">
                    <span className="avatar">{course.instructor[0]}</span>
                    <div className="instructor-meta">
                      <small>{course.instructor}</small>
                      <span>{course.lessons} {t.portal.lessonsLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="courses-cta">
          <Link href="/portal" className="btn btn-ghost">{c.viewAll}</Link>
        </div>
      </div>
    </section>
  )
}
