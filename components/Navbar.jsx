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
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const handleLogout = async () => {
    close()
    await signOut()
    router.push('/')
    router.refresh()
  }

  const LOCALES = ['en', 'ar', 'zh']

    const switchLanguage = (code) => {
    if (code === lang) return
    const segments = (pathname || '/').split('/').filter(Boolean)
    const hasLocale = LOCALES.includes(segments[0])
    const rest = hasLocale ? segments.slice(1) : segments
    
    // Just swap the locale prefix for ALL pages now
    const tail = rest.join('/')
    if (code === 'en') {
      router.push(tail ? `/${tail}` : '/')
    } else {
      router.push(tail ? `/${code}/${tail}` : `/${code}`)
    }
  }

  const homeHref = lang === 'en' ? '/' : `/${lang}`


  const isInstructor = profile?.role === 'instructor' || profile?.role === 'admin'
  const portalBase = isInstructor ? '/instructor' : '/portal'
  const portalHref = lang === 'en' ? portalBase : `/${lang}${portalBase}`

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
        <Link href={homeHref} className="logo" onClick={close}>
          <div className="logo-mark">ء</div>
          <div className="logo-text">
            <span className="en">Hamzat Wasl</span>
            <span className="ar arabic">همزة وصل</span>
          </div>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href={`${homeHref}#courses`} onClick={close}>{t.nav.courses}</a>
          <a href={`${homeHref}#path`} onClick={close}>{t.nav.path}</a>
          <a href={`${homeHref}#stories`} onClick={close}>{t.nav.stories}</a>
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
                <Link href={lang === 'en' ? '/login' : `/${lang}/login`} className="nav-login" onClick={close}>{t.nav.login}</Link>
                <Link href={lang === 'en' ? '/register' : `/${lang}/register`} className="btn btn-primary nav-cta" onClick={close}>{t.nav.cta}</Link>
              </>
            ))}
          </div>
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Switch language">
    {['en', 'ar', 'zh'].map((code) => {
    const label = code === 'en' ? 'EN' : code === 'ar' ? 'ع' : '中'
    const active = lang === code
    return (
      <button
        key={code}
        type="button"
        className={active ? 'active' : ''}
        onClick={() => switchLanguage(code)}
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
              <Link href={lang === 'en' ? '/login' : `/${lang}/login`} className="nav-login">{t.nav.login}</Link>
              <Link href={lang === 'en' ? '/register' : `/${lang}/register`} className="btn btn-primary nav-cta">{t.nav.cta}</Link>
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