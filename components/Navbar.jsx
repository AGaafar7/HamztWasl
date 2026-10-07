'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { t, lang, setLang } = useLanguage()
  const { user, profile, loading, signOut } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const handleLogout = async () => {
    close()
    await signOut()
    router.push('/')
    router.refresh()
  }

  const isInstructor = profile?.role === 'instructor' || profile?.role === 'admin'
  const portalHref = isInstructor ? '/instructor' : '/portal'

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
        <Link href="/" className="logo" onClick={close}>
          <div className="logo-mark">ء</div>
          <div className="logo-text">
            <span className="en">Hamzat Wasl</span>
            <span className="ar arabic">همزة وصل</span>
          </div>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="/#courses" onClick={close}>{t.nav.courses}</a>
          <a href="/#path" onClick={close}>{t.nav.path}</a>
          <a href="/#stories" onClick={close}>{t.nav.stories}</a>
          <div className="nav-links-mobile-actions">
            {!loading && (user ? (
              <>
                <Link href={portalHref} className="nav-login" onClick={close}>{t.portal.myPortal}</Link>
                <button type="button" className="btn btn-primary nav-cta" onClick={handleLogout}>
                  {t.portal.logout}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-login" onClick={close}>{t.nav.login}</Link>
                <Link href="/register" className="btn btn-primary nav-cta" onClick={close}>{t.nav.cta}</Link>
              </>
            ))}
          </div>
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Switch language">
  {['en', 'ar', 'zh'].map((code) => {
    const label = code === 'en' ? 'EN' : code === 'ar' ? 'ع' : '中'
    const target = code === 'en' ? '/' : `/${code}`
    const active = lang === code
    return (
      <button
        key={code}
        type="button"
        className={active ? 'active' : ''}
        onClick={() => {
          if (active) return
          router.push(target)
        }}
      >
        {label}
      </button>
    )
  })}
</div>

          {!loading && (user ? (
            <>
              <Link href={portalHref} className="nav-login">{t.portal.myPortal}</Link>
              <button type="button" className="btn btn-primary nav-cta" onClick={handleLogout}>{t.portal.logout}</button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-login">{t.nav.login}</Link>
              <Link href="/register" className="btn btn-primary nav-cta">{t.nav.cta}</Link>
            </>
          ))}

          <button
            type="button"
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}