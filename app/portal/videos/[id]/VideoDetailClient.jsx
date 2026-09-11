'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../i18n/gloss.js'
import { speak } from '../../../../utils/speak.js'
import { useYouTubePlayer } from '../../../../utils/useYouTubePlayer.js'
import { youtubeThumbnail } from '../../../../lib/youtube.js'
import WordExamplesModal from '../../../../components/WordExamplesModal.jsx'
import { findWordExamplesAction } from '../../../actions/videos'

const DOUBLE_CLICK_WINDOW_MS = 280

export default function VideoDetailClient({ video, moreVideos }) {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const vd = t.learn.videoDetail
  const vLabels = t.learn.videos

  const [activeWord, setActiveWord] = useState(null)
  const [showFullTranscript, setShowFullTranscript] = useState(false)
  const [examplesFor, setExamplesFor] = useState(null)
  const [examplesLoading, setExamplesLoading] = useState(false)
  const clickTimerRef = useRef(null)

  const { mountRef, currentTime } = useYouTubePlayer(video.youtubeId)

  const [activeLineIndex, setActiveLineIndex] = useState(null)
  useEffect(() => {
    if (!video) return
    const idx = video.transcript.findIndex(
      (line) =>
        line.startSec != null &&
        line.endSec != null &&
        currentTime >= line.startSec &&
        currentTime < line.endSec
    )
    if (idx !== -1) setActiveLineIndex(idx)
  }, [currentTime, video])

  useEffect(() => {
    router.prefetch?.('/portal/videos')
  }, [router])

  useEffect(() => () => clearTimeout(clickTimerRef.current), [])

  const hasAnyTiming = video.transcript.some((l) => l.startSec != null)
  const activeLine = activeLineIndex != null ? video.transcript[activeLineIndex] : null

  const isWordNowPlaying = (w) => {
    if (w.startSec == null || w.endSec == null) return false
    return currentTime >= w.startSec && currentTime < w.endSec
  }

  const handleWordActivate = async (key, w) => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
      clickTimerRef.current = null
      setActiveWord(null)

      // Double-click → fetch cross-video examples via Server Action.
      setExamplesLoading(true)
      setExamplesFor({ word: w.arabic, examples: [] })
      try {
        const examples = await findWordExamplesAction(w.arabic)
        setExamplesFor({ word: w.arabic, examples })
      } catch (err) {
        console.error('findWordExamples failed:', err)
        setExamplesFor({ word: w.arabic, examples: [] })
      } finally {
        setExamplesLoading(false)
      }
      return
    }
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null
      setActiveWord((prev) => (prev === key ? null : key))
    }, DOUBLE_CLICK_WINDOW_MS)
  }

  const renderWords = (line, lineIdx) =>
    line.words.map((w, wi) => {
      const key = `${lineIdx}-${wi}`
      return (
        <span
          key={wi}
          className={`transcript-word ${activeWord === key ? 'active' : ''} ${isWordNowPlaying(w) ? 'now-playing' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            handleWordActivate(key, w)
          }}
        >
          {w.arabic}
          {activeWord === key && (
            <span className="word-popup" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <span className="word-popup-arabic arabic">{w.arabic}</span>
              <strong>{gloss(w.gloss, lang)}</strong>
              <span>{gloss(w.grammar, lang)}</span>
              <span className="word-popup-hint">Double-click for other examples</span>
            </span>
          )}
        </span>
      )
    })

  return (
    <section>
      <Link href="/portal/videos" className="back-link">← {vd.back}</Link>

      <div className="video-detail-head">
        <h1 className="page-title">{gloss(video.title, lang)}</h1>
        <div className="video-tags">
          {video.dialects.map((d) => <span className="tag" key={d}>{vLabels[d]}</span>)}
          <span className="tag tag-level">{vLabels[video.level]}</span>
        </div>
      </div>

      <div className="video-embed">
        <div ref={mountRef} />
      </div>
      <a className="watch-on-youtube" href={video.watchUrl} target="_blank" rel="noreferrer">
        Watch on YouTube ↗
      </a>

      <div className="now-caption">
        {!hasAnyTiming ? (
          <p className="now-caption-placeholder">
            No verified timing yet for this video — see the instructor tools link below.
          </p>
        ) : activeLine == null ? (
          <p className="now-caption-placeholder">{t.learn.videoDetail.tapHint}</p>
        ) : (
          <>
            <div className="transcript-arabic arabic now-caption-arabic">
              {renderWords(activeLine, activeLineIndex)}
              <button type="button" className="line-play" onClick={() => speak(activeLine.arabic)}>🔊</button>
            </div>
            <p className="transcript-gloss now-caption-gloss">{gloss(activeLine.gloss, lang)}</p>
          </>
        )}
      </div>

      {video.transcript.length > 0 && (
        <button
          type="button"
          className="btn btn-ghost btn-small full-transcript-toggle"
          onClick={() => setShowFullTranscript((s) => !s)}
        >
          {showFullTranscript ? 'Hide full transcript' : 'Show full transcript'}
        </button>
      )}

      {showFullTranscript && (
        <div className="transcript-block">
          {video.transcript.map((line, i) => (
            <div className="transcript-line" key={i}>
              <span className="transcript-time">{line.time}</span>
              <div className="transcript-main">
                <div className="transcript-arabic arabic">
                  {renderWords(line, i)}
                  <button type="button" className="line-play" onClick={() => speak(line.arabic)}>🔊</button>
                </div>
                <p className="transcript-gloss">{gloss(line.gloss, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="more-videos">
        <h3>{vd.moreVideos}</h3>
        <div className="more-videos-row">
          {moreVideos.map((v) => (
            <Link
              href={`/portal/videos/${v.id}`}
              className="more-video-card"
              key={v.id}
              style={{ backgroundImage: `url(${youtubeThumbnail(v.youtubeId)})` }}
            >
              <span>{gloss(v.title, lang)}</span>
            </Link>
          ))}
        </div>
      </div>

      <Link href={`/portal/videos/${video.id}/edit`} className="instructor-tools-link">
        Instructor tools (transcription &amp; timing) →
      </Link>

      {examplesFor && (
        <WordExamplesModal
          word={examplesFor.word}
          examples={examplesFor.examples}
          currentVideoId={video.id}
          lang={lang}
          loading={examplesLoading}
          onClose={() => setExamplesFor(null)}
        />
      )}
    </section>
  )
}