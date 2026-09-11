'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function LearningPath() {
  const { t } = useLanguage()
  const p = t.pathSection

  return (
    <section className="section path-section" id="path">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow"><span className="arabic">{p.eyebrowAr}</span> {p.eyebrow}</span>
          <h2>{p.title}</h2>
          <p>{p.lede}</p>
        </div>

        <div className="path-rail">
          <div className="path-line" />
          <div className="path-steps">
            {p.steps.map((s) => (
              <div className={`path-step ${s.state}`} key={s.label}>
                <div className="path-node arabic">{s.glyph}</div>
                <div>
                  <div className="label">{s.label}</div>
                  <div className="sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="path-note">
          <span className="num">{p.noteNum}</span>
          <p>{p.note}</p>
        </div>
      </div>
    </section>
  )
}
