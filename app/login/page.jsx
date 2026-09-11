'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const { t } = useLanguage()
  const a = t.auth.login
  const { signIn, signInWithOAuth } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/portal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError(a.errorRequired)
      return
    }
    setError('')
    setLoading(true)
    try {
      const { profile } = await signIn({ email, password })
      const dest =
        profile?.role === 'instructor' && next === '/portal' ? '/instructor' : next
      router.replace(dest)
      router.refresh()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const onOAuth = async (provider) => {
    setError('')
    setOauthLoading(provider)
    try {
      await signInWithOAuth(provider, next)
      // Browser navigates away; state resets on next mount.
    } catch (err) {
      setError(err.message || 'Login failed')
      setOauthLoading(null)
    }
  }

  return (
    <section className="auth-page">
      <div className="wrap auth-wrap">
        <div className="auth-card">
          <h1>{a.title}</h1>
          <p className="auth-subtitle">{a.subtitle}</p>

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
            <button
              type="button"
              className="oauth-btn"
              onClick={() => onOAuth('apple')}
              disabled={oauthLoading === 'apple' || loading}
            >
              <AppleIcon />
              {oauthLoading === 'apple' ? '…' : a.withApple}
            </button>
          </div>

          <div className="auth-divider"><span>{a.or}</span></div>

          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">{a.emailLabel}</label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="login-password">{a.passwordLabel}</label>
                <a href="#" className="form-link-small">{a.forgot}</a>
              </div>
              <input
                id="login-password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? '…' : a.submit}
            </button>
          </form>

          <p className="auth-switch">
            {a.noAccount} <Link href="/register">{a.createOne}</Link>
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

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M17.05 12.04c-.03-2.79 2.28-4.13 2.38-4.2-1.3-1.9-3.32-2.16-4.04-2.19-1.72-.17-3.36 1.01-4.23 1.01-.87 0-2.22-.99-3.65-.96-1.88.03-3.61 1.09-4.57 2.77-1.95 3.38-.5 8.38 1.4 11.13.93 1.34 2.04 2.85 3.5 2.8 1.4-.06 1.93-.91 3.63-.91 1.69 0 2.17.91 3.65.88 1.51-.03 2.46-1.37 3.38-2.72 1.07-1.56 1.51-3.08 1.53-3.16-.03-.01-2.94-1.13-2.98-4.45zM14.29 3.86c.77-.94 1.3-2.24 1.15-3.53-1.12.05-2.47.75-3.27 1.68-.72.83-1.34 2.16-1.17 3.42 1.24.1 2.52-.63 3.29-1.57z"/>
    </svg>
  )
}