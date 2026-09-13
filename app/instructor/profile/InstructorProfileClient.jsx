'use client'

import { useState, useTransition } from 'react'
import { useAuth } from '../../../context/AuthContext.jsx'
import { updateProfileAction, updatePasswordAction } from '../../actions/profile'
import AvatarUploader from '../../../components/AvatarUploader'

const TABS = [
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
]

export default function InstructorProfileClient({ profile, stats }) {
  const { refreshProfile } = useAuth()
  const [tab, setTab] = useState('account')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [, startTransition] = useTransition()

  const [form, setForm] = useState({
    fullName: profile?.full_name || '',
    bio: profile?.bio || '',
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
          bio: form.bio,
        })
        await refreshProfile()
        setSaved(true)
        setTimeout(() => setSaved(false), 2200)
      } catch (err) {
        setError(err.message || 'Failed to save')
      }
    })
  }

  const joined = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', {
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
          <h1 className="profile-hero-name">
            {form.fullName || 'Instructor'}
          </h1>
          <p className="profile-hero-email">{profile?.email}</p>
          <p className="profile-hero-since">Instructor since {joined}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <span className="profile-stat-value">{stats?.practiceCount ?? 0}</span>
          <span className="profile-stat-label">Lessons authored</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">{stats?.studentCount ?? 0}</span>
          <span className="profile-stat-label">Students taught</span>
        </div>
        <div className="profile-stat">
          <span className="profile-stat-value">
            {profile?.role === 'admin' ? 'Admin' : 'Instructor'}
          </span>
          <span className="profile-stat-label">Role</span>
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
            <h3 className="profile-section-title">Instructor profile</h3>
            <p className="profile-section-desc">
              This is what students see on your course cards.
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
              <label className="form-label">Bio</label>
              <textarea
                className="form-input"
                rows="4"
                value={form.bio}
                onChange={(e) => update('bio', e.target.value)}
                placeholder="A short introduction — your teaching background, languages, specialities…"
              />
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

        {tab === 'security' && <SecurityTab />}
      </div>
    </section>
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