'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext.jsx'

const NAV = [
  { href: '/instructor', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/instructor/courses', label: 'My Courses', icon: '📚' },
   { href: '/instructor/videos', label: 'Videos', icon: '🎬' },
  { href: '/instructor/practices', label: 'Practices', icon: '🎯' },
  { href: '/instructor/earnings', label: 'Earnings', icon: '💰' },
  { href: '/instructor/lessons', label: 'Lessons', icon: '📝' },
]

export default function InstructorLayout({ children }) {
  const { profile, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const linkClass = (href, exact = false) => {
    const active = exact ? pathname === href : pathname.startsWith(href)
    return `sidebar-link ${active ? 'active' : ''}`
  }

  const initial = (profile?.full_name || profile?.email || 'I')[0].toUpperCase()
  const displayName = profile?.full_name || profile?.email || 'Instructor'

  return (
    <div className="portal-shell wrap">
      <aside className="portal-sidebar">
        <div className="instructor-badge">
          <div className="instructor-avatar">{initial}</div>
          <div>
            <strong>{displayName}</strong>
            <span>Instructor</span>
          </div>
        </div>

        <div className="sidebar-group">
          <div className="sidebar-heading">Manage</div>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href, item.exact)}>
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="sidebar-group sidebar-group-bottom">
          <Link href="/" className="sidebar-link">
            <span className="sidebar-icon">🏠</span>
            Back to site
          </Link>
          <button type="button" className="sidebar-link sidebar-link-btn" onClick={handleLogout}>
            <span className="sidebar-icon">↩</span>
            Log out
          </button>
        </div>
      </aside>

      <div className="portal-content">{children}</div>
    </div>
  )
}