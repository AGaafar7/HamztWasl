// app/(public)/[locale]/(portal)/portal/layout.jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/i18n/LanguageContext.jsx'

export default function PortalLayout({ children }) {
  const { t, lang } = useLanguage()
  const pathname = usePathname()
  const s = t.learn.sidebar

  const localePrefix = lang === 'en' ? '' : `/${lang}`

  const linkClass = (href, exact = false) => {
    const active = exact ? pathname === href : pathname.startsWith(href)
    return `sidebar-link ${active ? 'active' : ''}`
  }

  return (
    <div className="portal-shell wrap">
      <aside className="portal-sidebar">
        <div className="sidebar-group">
          <div className="sidebar-heading">{s.explore}</div>
          <Link href={`${localePrefix}/portal/profile`} className={linkClass(`${localePrefix}/portal/profile`)}>
            <span className="sidebar-dot" /> {s.profile}
          </Link>
          <Link href={`${localePrefix}/portal`} className={linkClass(`${localePrefix}/portal`, true)}>
            <span className="sidebar-dot" /> {s.courses}
          </Link>
          <Link href={`${localePrefix}/portal/videos`} className={linkClass(`${localePrefix}/portal/videos`)}>
            <span className="sidebar-dot" /> {s.videos}
          </Link>
          <Link href={`${localePrefix}/portal/dictionary`} className={linkClass(`${localePrefix}/portal/dictionary`)}>
            <span className="sidebar-dot" /> {s.dictionary}
          </Link>
          <Link href={`${localePrefix}/portal/billing`} className={linkClass(`${localePrefix}/portal/billing`)}>
            <span className="sidebar-dot" /> {t.portal.billing}
          </Link>
        </div>

        <div className="sidebar-group">
          <div className="sidebar-heading">{s.practice}</div>
          <Link href={`${localePrefix}/portal/listening`} className={linkClass(`${localePrefix}/portal/listening`)}>
            <span className="sidebar-dot" /> {s.listening}
          </Link>
          <Link href={`${localePrefix}/portal/reading`} className={linkClass(`${localePrefix}/portal/reading`)}>
            <span className="sidebar-dot" /> {s.reading}
          </Link>
          <Link href={`${localePrefix}/portal/speaking`} className={linkClass(`${localePrefix}/portal/speaking`)}>
            <span className="sidebar-dot" /> {s.speaking}
          </Link>
          <Link href={`${localePrefix}/portal/writing`} className={linkClass(`${localePrefix}/portal/writing`)}>
            <span className="sidebar-dot" /> {s.writing}
          </Link>
        </div>
      </aside>
      <div className="portal-content">{children}</div>
    </div>
  )
}