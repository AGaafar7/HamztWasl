'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function RegisterPage() {
  const { t } = useLanguage()
  const a = t.auth.register
  const { signUp, signInWithOAuth } = useAuth()
  const router = useRouter()

  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      setError(a.errorRequired)
      return
    }
    if (password !== confirm) {
      setError(a.errorMismatch)
      return
    }
    setError('')
    setLoading(true)
    try {
      await signUp({ email, password, fullName: name, role })
      window.location.href = role === 'instructor' ? '/instructor' : '/portal'
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const onOAuth = async (provider) => {
    setError('')
    setOauthLoading(provider)
    try {
      // OAuth users always land as students — role choice is only
      // available via email signup.
      await signInWithOAuth(provider, '/portal')
    } catch (err) {
      setError(err.message || 'Registration failed')
      setOauthLoading(null)
    }
  }

  return (
    <section className="auth-page">
      <div className="wrap auth-wrap">
        <div className="auth-card">
          <h1>{a.title}</h1>
          <p className="auth-subtitle">{a.subtitle}</p>

          <div className="role-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'student'}
              className={`role-tab ${role === 'student' ? 'active' : ''}`}
              onClick={() => setRole('student')}
            >
              🎓 I'm a student
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'instructor'}
              className={`role-tab ${role === 'instructor' ? 'active' : ''}`}
              onClick={() => setRole('instructor')}
            >
              🧑‍🏫 I'm an instructor
            </button>
          </div>

          {role === 'student' && (
            <>
              <div className="oauth-buttons">
                <button
                  type="button"
                  className="oauth-btn"
                  onClick={() => onOAuth('google')}
                  disabled={oauthLoading === 'google' || loading}
                >
                  <GoogleIcon />
                  {oauthLoading === 'google' ? '…' : a.withGoogle}
                </button>
              </div>

              <div className="auth-divider"><span>or</span></div>
            </>
          )}

          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">{a.nameLabel}</label>
              <input
                id="reg-name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">{a.emailLabel}</label>
              <input
                id="reg-email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">{a.passwordLabel}</label>
                <input
                  id="reg-password"
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">{a.confirmLabel}</label>
                <input
                  id="reg-confirm"
                  type="password"
                  className="form-input"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? '…' : a.submit}
            </button>
          </form>

          <p className="auth-demo-note">
            By creating an account, you agree to our{' '}
            <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <p className="auth-switch">
            {a.haveAccount} <Link href="/login">{a.signIn}</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  )
}