'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function PortalLayout({ children }) {
  const { t } = useLanguage()
  const pathname = usePathname()
  const s = t.learn.sidebar

  const linkClass = (href, exact = false) => {
    const active = exact ? pathname === href : pathname.startsWith(href)
    return `sidebar-link ${active ? 'active' : ''}`
  }

  return (
    <div className="portal-shell wrap">
      <aside className="portal-sidebar">
        <div className="sidebar-group">
          <div className="sidebar-heading">{s.explore}</div>
          <Link href="/portal" className={linkClass('/portal', true)}>
            <span className="sidebar-dot" /> {s.courses}
          </Link>
          <Link href="/portal/videos" className={linkClass('/portal/videos')}>
            <span className="sidebar-dot" /> {s.videos}
          </Link>
          <Link href="/portal/dictionary" className={linkClass('/portal/dictionary')}>
            <span className="sidebar-dot" /> {s.dictionary}
          </Link>
        </div>

        <div className="sidebar-group">
          <div className="sidebar-heading">{s.practice}</div>
          <Link href="/portal/listening" className={linkClass('/portal/listening')}>
            <span className="sidebar-dot" /> {s.listening}
          </Link>
          <Link href="/portal/reading" className={linkClass('/portal/reading')}>
            <span className="sidebar-dot" /> {s.reading}
          </Link>
          <Link href="/portal/speaking" className={linkClass('/portal/speaking')}>
            <span className="sidebar-dot" /> {s.speaking}
          </Link>
        </div>
      </aside>
      <div className="portal-content">{children}</div>
    </div>
  )
}