'use client'

import Link from 'next/link'
import { gloss } from '../i18n/gloss.js'

export default function WordExamplesModal({
  word,
  examples,
  currentVideoId,
  onClose,
  lang,
  loading = false,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-word arabic">{word}</span>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {loading ? (
          <p className="modal-subtitle">Searching…</p>
        ) : (
          <>
            <p className="modal-subtitle">
              This word appears in {examples.length} video{examples.length === 1 ? '' : 's'}:
            </p>

            {examples.length === 0 ? (
              <p className="portal-empty">
                No other examples of this word yet — check back as more videos get transcribed.
              </p>
            ) : (
              <div className="modal-examples">
                {examples.map((ex, i) => (
                  <Link
                    href={`/portal/videos/${ex.videoId}`}
                    key={i}
                    className="modal-example"
                    onClick={onClose}
                  >
                    <p className="modal-example-arabic arabic">{ex.lineArabic}</p>
                    <p className="modal-example-gloss">{gloss(ex.lineGloss, lang)}</p>
                    <span className="modal-example-video">
                      {gloss(ex.videoTitle, lang)}
                      {ex.videoId === currentVideoId ? ' (this video)' : ''}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}