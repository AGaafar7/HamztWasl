'use client'

import Link from 'next/link'

export default function DashboardClient({ profile, courses, earnings, stats }) {
  const publishedCourses = courses.filter((c) => c.status === 'published').length
  const displayName =
    profile?.full_name?.split(' ')[0] ||
    profile?.email?.split('@')[0] ||
    'there'

  const studentCount = stats?.studentCount ?? 0

  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Welcome back, {displayName}</h1>
          <p>Here's how your courses are doing this month.</p>
        </div>
        <Link href="/instructor/courses/new" className="btn btn-primary">
          + New Course
        </Link>
      </div>

      <div className="instructor-stats-grid">
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">Total Revenue</span>
          <span className="instructor-stat-value">${earnings.total.toFixed(2)}</span>
          <span className="instructor-stat-sub">
            ${earnings.thisMonth.toFixed(2)} this month
          </span>
        </div>
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">Students</span>
          <span className="instructor-stat-value">{studentCount.toLocaleString()}</span>
          <span className="instructor-stat-sub">across all courses</span>
        </div>
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">Published Courses</span>
          <span className="instructor-stat-value">
            {publishedCourses} / {courses.length}
          </span>
          <span className="instructor-stat-sub">
            {courses.length - publishedCourses} draft(s) pending
          </span>
        </div>
        <div className="instructor-stat-card">
          <span className="instructor-stat-label">Lessons</span>
          <span className="instructor-stat-value">{stats?.lessonCount ?? 0}</span>
          <span className="instructor-stat-sub">authored</span>
        </div>
      </div>

      <div className="instructor-section">
        <div className="instructor-section-head">
          <h2>Recent sales</h2>
          <Link href="/instructor/earnings" className="back-link">View all →</Link>
        </div>
        {earnings.transactions.length === 0 ? (
          <p className="portal-empty">No sales yet.</p>
        ) : (
          <div className="instructor-table">
            {earnings.transactions.slice(0, 5).map((tx) => (
              <div className="instructor-row" key={tx.id}>
                <span className="instructor-row-main">
                  <strong>{tx.courseTitle?.en || tx.courseId || 'Course'}</strong>
                  <span>{tx.student}</span>
                </span>
                <span className="instructor-row-date">{tx.date}</span>
                <span className="instructor-row-amount">+${tx.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="instructor-section">
        <div className="instructor-section-head">
          <h2>Your courses</h2>
          <Link href="/instructor/courses" className="back-link">Manage →</Link>
        </div>
        {courses.length === 0 ? (
          <p className="portal-empty">
            You haven't created any courses yet. Click "New Course" to start.
          </p>
        ) : (
          <div className="instructor-table">
            {courses.map((c) => (
              <div className="instructor-row" key={c.id}>
                <span className="instructor-row-main">
                  <strong>{c.title?.en || c.id}</strong>
                  <span>{c.level} · {c.lessons} lessons</span>
                </span>
                <span className={`instructor-status ${c.status}`}>{c.status}</span>
                <span className="instructor-row-date">{c.updatedAt}</span>
                <span className="instructor-row-amount">
                  {c.type === 'free' ? 'Free' : `$${c.price}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}