'use client'

import Link from 'next/link'

export default function InstructorCoursesClient({ courses }) {
  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>My Courses</h1>
          <p>{courses.length} course(s) — published and drafts.</p>
        </div>
        <Link href="/instructor/courses/new" className="btn btn-primary">
          + New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="portal-empty">No courses yet. Click "New Course" to create your first one.</p>
      ) : (
        <div className="course-admin-list">
          {courses.map((c) => (
            <article className="course-admin-card" key={c.id}>
              <div className="course-admin-main">
                <div className="course-admin-titles">
                  <h3>{c.title?.en || c.id}</h3>
                  {c.title?.ar && <p className="arabic" dir="rtl">{c.title.ar}</p>}
                </div>
                <div className="course-admin-meta">
                  <span className={`instructor-status ${c.status}`}>{c.status}</span>
                  <span className="course-admin-chip">{c.level}</span>
                  <span className="course-admin-chip">{c.lessons} lessons</span>
                </div>
              </div>

              <div className="course-admin-side">
                <span className="course-admin-price">
                  {c.type === 'free' ? 'Free' : `$${c.price}`}
                </span>
                <Link href={`/instructor/courses/${c.id}`} className="btn btn-small btn-ghost">
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}