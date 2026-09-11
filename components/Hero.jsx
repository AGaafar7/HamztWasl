'use client'

import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="arabic">{h.eyebrowAr}</span> {h.eyebrow}
          </span>
          <h1>
            {h.titleBefore}<span className="accent">{h.titleAccent}</span>{h.titleAfter}
          </h1>
          <p className="lede">{h.lede}</p>
          <div className="hero-actions">
            <a href="#courses" className="btn btn-primary">{h.ctaPrimary}</a>
            <a href="#path" className="btn btn-ghost">{h.ctaGhost}</a>
          </div>
          <div className="hero-trust">
            <div className="avatars">
              <span>金</span>
              <span>ミ</span>
              <span>사</span>
              <span>+</span>
            </div>
            <small><strong>{h.trustStrong}</strong> {h.trustRest}</small>
          </div>
        </div>

        <div className="hero-visual">
          <div className="letter-card">
            <div className="float-chip chip-streak">
              <span className="dot" />
              <div>
                <strong>{h.card.streakTitle}</strong>
                <span>{h.card.streakSub}</span>
              </div>
            </div>

            <div className="letter-top">
              <span className="letter-tag">{h.card.lessonTag}</span>
              <span className="letter-tag">{h.card.levelTag}</span>
            </div>

            <div className="letter-big">
              <div className="letter-glyph">ع</div>
              <div className="letter-meta">
                <div className="name">{h.card.name}</div>
                <div className="sound">{h.card.sound}</div>
                <div className="play">▶ {h.card.play}</div>
              </div>
            </div>

            <div className="letter-progress">
              <div className="row">
                <span>{h.card.progressLabel}</span>
                <span>{h.card.progressValue}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="float-chip chip-mastered">
              <span className="dot" />
              <div>
                <strong>{h.card.masteredTitle}</strong>
                <span>{h.card.masteredSub}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
