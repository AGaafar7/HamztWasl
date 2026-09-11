'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Stats() {
  const { t } = useLanguage()
  return (
    <div className="stats-band">
      <div className="wrap stats-grid">
        {t.stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
