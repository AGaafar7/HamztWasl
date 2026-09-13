'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../i18n/gloss.js'
import { useAuth } from '../../../context/AuthContext.jsx'
import { updateProfileAction, updatePasswordAction } from '../../actions/profile'

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'progress', label: 'Progress' },
  { id: 'security', label: 'Security' },
]

export default function ProfileClient({ profile, data }) {
  const { lang } = useLanguage()
  const { refreshProfile } = useAuth()
  const [tab, setTab] = useState('account')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const [form, setForm] = useState({
    fullName: profile?.full_name || '',
    avatarUrl: profile?.avatar_url || '',
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSaveProfile = () => {
    setError('')
    setSaved(false)
    startTransition(async () => {
      try {
        await updateProfileAction({
          fullName: form.fullName,
          avatarUrl: form.avatarUrl,
        })
        await refreshProfile()
        setSaved(true)
        setTimeout(() => setSaved(false), 2200)
      } catch (err) {
        setError(err.message || 'Failed to save')
      }
    })
  }

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const initial = (form.fullName || profile?.email || '?')[0].toUpperCase()

  return (
    <section className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar">
          {form.avatarUrl ? (
            <img src={form.avatarUrl} alt={form.fullName} />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        <div className="profile-hero-body">
          <h1 className="profile-hero-name">{form.fullName || 'Student'}</h1>
          <p className="profile-hero-email">{profile?.email}</p>
          <p className="profile-hero-since">Member since {memberSince}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-value">{data.enrolledCount}</span>
          <span className="profile-stat-label">Courses enrolled</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">{data.completedLessonsCount}</span>
          <span className="profile-stat-label">Lessons completed</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">{data.finishedCount}</span>
          <span className="profile-stat-label">Courses finished</span>
        </div>
      </div>

      <div className="profile-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`profile-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="profile-body">
        {tab === 'account' && (
          <div className="profile-section">
            <h3 className="profile-section-title">Account details</h3>
            <p className="profile-section-desc">
              How your name appears across the site.
            </p>

            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                className="form-input"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Avatar URL</label>
              <input
                className="form-input"
                value={form.avatarUrl}
                onChange={(e) => update('avatarUrl', e.target.value)}
                placeholder="https://…"
              />
              <p className="profile-field-hint">
                Leave blank to use your initial.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={profile?.email || ''} disabled />
              <p className="profile-field-hint">
                Email is managed by your sign-in provider and can't be changed here.
              </p>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="button"
              className={`btn btn-primary ${saved ? 'save-btn state-saved' : ''}`}
              onClick={onSaveProfile}
            >
              {saved ? '✅ Saved!' : 'Save changes'}
            </button>
          </div>
        )}

        {tab === 'progress' && (
          <ProgressTab data={data} lang={lang} />
        )}

        {tab === 'security' && (
          <SecurityTab />
        )}
      </div>
    </section>
  )
}

function ProgressTab({ data, lang }) {
  return (
    <>
      <div className="profile-section">
        <h3 className="profile-section-title">Completed courses</h3>
        <p className="profile-section-desc">
          Courses you've finished from start to finish.
        </p>

        {data.finished.length === 0 ? (
          <p className="portal-empty" style={{ padding: '20px 0' }}>
            Complete a course to see it here.
          </p>
        ) : (
          <div className="profile-course-list">
            {data.finished.map((c) => (
              <CourseMini key={c.id} course={c} lang={lang} done />
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">In progress</h3>
        <p className="profile-section-desc">
          Courses you've started but haven't finished yet.
        </p>

        {data.inProgress.length === 0 ? (
          <p className="portal-empty" style={{ padding: '20px 0' }}>
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="profile-course-list">
            {data.inProgress.map((c) => (
              <CourseMini key={c.id} course={c} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function CourseMini({ course, lang, done }) {
  return (
    <Link
      href={`/portal/courses/${course.id}`}
      className={`profile-course ${done ? 'profile-course-done' : ''}`}
    >
      <div className={`profile-course-thumb ${course.theme}`}>
        <span className="arabic">{course.glyph}</span>
      </div>
      <div className="profile-course-body">
        <span className="profile-course-instructor">{course.instructor}</span>
        <h4 className="profile-course-title">{gloss(course.title, lang)}</h4>
        <div className="profile-course-progress">
          <div className="profile-course-track">
            <div
              className="profile-course-fill"
              style={{ width: `${course.pct}%` }}
            />
          </div>
          <span className="profile-course-pct">
            {course.done} / {course.total}
          </span>
        </div>
      </div>
      <span className="profile-course-end">{done ? '✓' : '→'}</span>
    </Link>
  )
}

function SecurityTab() {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const onSubmit = () => {
    setError('')
    setSaved(false)
    if (pw.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (pw !== confirm) {
      setError('Passwords do not match.')
      return
    }
    startTransition(async () => {
      try {
        await updatePasswordAction(pw)
        setSaved(true)
        setPw('')
        setConfirm('')
        setTimeout(() => setSaved(false), 2400)
      } catch (err) {
        setError(err.message || 'Failed to update password')
      }
    })
  }

  return (
    <div className="profile-section">
      <h3 className="profile-section-title">Change password</h3>
      <p className="profile-section-desc">
        Choose a new password for your account.
      </p>

      <div className="form-group">
        <label className="form-label">New password</label>
        <input
          type="password"
          className="form-input"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Confirm new password</label>
        <input
          type="password"
          className="form-input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button
        type="button"
        className={`btn btn-primary ${saved ? 'save-btn state-saved' : ''}`}
        onClick={onSubmit}
      >
        {saved ? '✅ Password updated' : 'Update password'}
      </button>
    </div>
  )
}