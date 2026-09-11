'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Testimonials() {
  const { t } = useLanguage()
  const s = t.storiesSection

  return (
    <section className="section" id="stories">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2>{s.title}</h2>
          <p>{s.lede}</p>
        </div>

        <div className="testi-grid">
          {s.list.map((story) => (
            <div className="testi-card" key={story.name}>
              <p className="testi-quote">{story.quote}</p>
              <div className="testi-person">
                <span className="avatar">{story.name[0]}</span>
                <div>
                  <strong>{story.name}</strong>
                  <span>{story.place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
