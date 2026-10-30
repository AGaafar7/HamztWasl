'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/i18n/LanguageContext.jsx'
import { gloss } from '@/i18n/gloss.js'
import { useAuth } from '@/context/AuthContext.jsx'
import { updateProfileAction, updatePasswordAction } from '@/app/actions/profile'
import AvatarUploader from '@/components/AvatarUploader'

const TABS = [
  { id: 'account', labelKey: 'account' },
  { id: 'progress', labelKey: 'progress' },
  { id: 'security', labelKey: 'security' },
]

export default function ProfileClient({ profile, data }) {
  const { t, lang } = useLanguage()
  const { refreshProfile } = useAuth()
  const [tab, setTab] = useState('account')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const p = t.portal.profile
  const localePrefix = lang === 'en' ? '' : `/${lang}`
  const dateLocale = lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US'

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
    ? new Date(profile.created_at).toLocaleDateString(dateLocale, {
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const initial = (form.fullName || profile?.email || '?')[0].toUpperCase()

  return (
    <section className="profile-page">
      <div className="profile-hero">
        <AvatarUploader
          currentUrl={profile?.avatar_url || ''}
          fullName={form.fullName}
        />
        <div className="profile-hero-body">
          <h1 className="profile-hero-name">{form.fullName || p.studentFallback}</h1>
          <p className="profile-hero-email">{profile?.email}</p>
          <p className="profile-hero-since">{p.memberSince} {memberSince}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-value">{data.enrolledCount}</span>
          <span className="profile-stat-label">{p.stats.enrolled}</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">{data.completedLessonsCount}</span>
          <span className="profile-stat-label">{p.stats.lessons}</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">{data.finishedCount}</span>
          <span className="profile-stat-label">{p.stats.finished}</span>
        </div>
      </div>

      <div className="profile-tabs" role="tablist">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            role="tab"
            aria-selected={tab === tabItem.id}
            className={`profile-tab ${tab === tabItem.id ? 'active' : ''}`}
            onClick={() => setTab(tabItem.id)}
          >
            {p.tabs[tabItem.labelKey]}
          </button>
        ))}
      </div>

      <div className="profile-body">
        {tab === 'account' && (
          <div className="profile-section">
            <h3 className="profile-section-title">{p.accountDetails}</h3>
            <p className="profile-section-desc">{p.accountDesc}</p>

            <div className="form-group">
              <label className="form-label">{p.fullName}</label>
              <input
                className="form-input"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder={p.fullName}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{p.email}</label>
              <input className="form-input" value={profile?.email || ''} disabled />
              <p className="profile-field-hint">{p.emailHint}</p>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              type="button"
              className={`btn btn-primary ${saved ? 'save-btn state-saved' : ''}`}
              onClick={onSaveProfile}
            >
              {saved ? p.saved : p.saveChanges}
            </button>
          </div>
        )}

        {tab === 'progress' && (
          <ProgressTab data={data} lang={lang} localePrefix={localePrefix} />
        )}

        {tab === 'security' && (
          <SecurityTab p={p.securityTab} />
        )}
      </div>
    </section>
  )
}

function ProgressTab({ data, lang, localePrefix }) {
  const { t } = useLanguage()
  const pt = t.portal.profile.progressTab

  return (
    <>
      <div className="profile-section">
        <h3 className="profile-section-title">{pt.finishedTitle}</h3>
        <p className="profile-section-desc">{pt.finishedDesc}</p>

        {data.finished.length === 0 ? (
          <p className="portal-empty" style={{ padding: '20px 0' }}>
            {pt.emptyFinished}
          </p>
        ) : (
          <div className="profile-course-list">
            {data.finished.map((c) => (
              <CourseMini
                key={c.id}
                course={c}
                lang={lang}
                localePrefix={localePrefix}
                done
              />
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">{pt.inProgressTitle}</h3>
        <p className="profile-section-desc">{pt.inProgressDesc}</p>

        {data.inProgress.length === 0 ? (
          <p className="portal-empty" style={{ padding: '20px 0' }}>
            {pt.emptyInProgress}
          </p>
        ) : (
          <div className="profile-course-list">
            {data.inProgress.map((c) => (
              <CourseMini
                key={c.id}
                course={c}
                lang={lang}
                localePrefix={localePrefix}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function CourseMini({ course, lang, localePrefix, done }) {
  return (
    <Link
      href={`${localePrefix}/portal/courses/${course.id}`}
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

function SecurityTab({ p }) {
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
      <h3 className="profile-section-title">{p.title}</h3>
      <p className="profile-section-desc">{p.desc}</p>

      <div className="form-group">
        <label className="form-label">{p.newPassword}</label>
        <input
          type="password"
          className="form-input"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <div className="form-group">
        <label className="form-label">{p.confirmPassword}</label>
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
        {saved ? p.updated : p.updateBtn}
      </button>
    </div>
  )
}