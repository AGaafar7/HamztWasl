'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'
import Link from 'next/link'

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-mark">ح</div>
              <div className="logo-text">
                <span className="en" style={{ color: '#fff' }}>Huroof</span>
                <span className="ar arabic">حروف</span>
              </div>
            </div>
            <p>{f.tagline}</p>
          </div>

          <div>
            <h4>{f.learn}</h4>
            <ul>
              <li><a href="#courses">{f.learnLinks[0]}</a></li>
              <li><a href="#path">{f.learnLinks[1]}</a></li>
              <li><a href="#instructors">{f.learnLinks[2]}</a></li>
            </ul>
          </div>

          <div>
            <h4>{f.company}</h4>
            <ul>
              <li><a href="#">{f.companyLinks[0]}</a></li>
              <li><a href="#">{f.companyLinks[1]}</a></li>
              <li><a href="#stories">{f.companyLinks[2]}</a></li>
            </ul>
          </div>

          <div>
            <h4>{f.support}</h4>
            <ul>
              <li><Link href="/term">{f.supportLinks[0]}</Link></li>
              <li><Link href="/privacy">{f.supportLinks[1]}</Link>.</li>
              <li><a href="#">{f.supportLinks[2]}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
  <a href="/terms">Terms</a>
  <span>·</span>
  <a href="/privacy">Privacy</a>
</div>
          <span>{f.rights}</span>
          <span>{f.made}</span>
        </div>
      </div>
    </footer>
  )
}
