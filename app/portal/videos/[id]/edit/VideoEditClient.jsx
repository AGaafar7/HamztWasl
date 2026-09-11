'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../../i18n/gloss.js'
import { speak } from '../../../../../utils/speak.js'
import { useYouTubePlayer } from '../../../../../utils/useYouTubePlayer.js'

/**
 * Instructor / course-creation tool — NOT part of the learner experience.
 * Reachable only via the low-key "Instructor tools" link at the bottom of
 * the video page. Transcription (AssemblyAI) and manual timing calibration
 * happen here.
 */
export default function VideoEditClient({ video }) {
  const { lang } = useLanguage()

  const { mountRef, playerRef, currentTime } = useYouTubePlayer(video.youtubeId)

  const [calibrating, setCalibrating] = useState(false)
  const [calibration, setCalibration] = useState({})
  const [copied, setCopied] = useState(false)

  const [audioUrl, setAudioUrl] = useState('')
  const [languageCode, setLanguageCode] = useState('ar')
  const [transcribeState, setTranscribeState] = useState('idle')
  const [transcribeError, setTranscribeError] = useState('')
  const [transcribeResult, setTranscribeResult] = useState(null)
  const pollRef = useRef(null)

  useEffect(() => () => clearInterval(pollRef.current), [])

  const lineWindow = (line, i) => {
    const cal = calibration[i]
    return { start: cal?.startSec ?? line.startSec, end: cal?.endSec ?? line.endSec }
  }

  const handleLineMark = (i) => {
    setCalibration((prev) => {
      const existing = prev[i] || {}
      const tsec = Number(currentTime.toFixed(2))
      if (existing.startSec == null) return { ...prev, [i]: { startSec: tsec } }
      if (existing.endSec == null) return { ...prev, [i]: { ...existing, endSec: tsec } }
      return { ...prev, [i]: { startSec: tsec } }
    })
  }

  const copyCalibration = () => {
    const out = video.transcript.map((line, i) => {
      const { start, end } = lineWindow(line, i)
      return { arabic: line.arabic, startSec: start ?? null, endSec: end ?? null }
    })
    navigator.clipboard?.writeText(JSON.stringify(out, null, 2)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const startAssemblyAiTranscription = async () => {
    if (!audioUrl.trim()) return
    setTranscribeState('submitting')
    setTranscribeError('')
    setTranscribeResult(null)
    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ audioUrl: audioUrl.trim(), languageCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submit failed')

      setTranscribeState('polling')
      pollRef.current = setInterval(async () => {
        const pollRes = await fetch(`/api/transcribe/${data.id}`)
        const pollData = await pollRes.json()
        if (pollData.status === 'completed') {
          clearInterval(pollRef.current)
          setTranscribeResult(pollData.lines)
          setTranscribeState('done')
        } else if (pollData.status === 'error') {
          clearInterval(pollRef.current)
          setTranscribeError(pollData.error || 'Transcription failed')
          setTranscribeState('error')
        }
      }, 3000)
    } catch (err) {
      setTranscribeError(err.message)
      setTranscribeState('error')
    }
  }

  const copyAssemblyAiResult = () => {
    navigator.clipboard?.writeText(JSON.stringify(transcribeResult, null, 2))
  }

  return (
    <section>
      <Link href={`/portal/videos/${video.id}`} className="back-link">← Back to video</Link>

      <div className="video-detail-head">
        <h1 className="page-title">Instructor tools — {gloss(video.title, lang)}</h1>
        <p className="transcript-hint">
          Transcribe and time-sync this video's audio. None of this is visible to learners — the
          normal video page only shows the finished, saved transcript.
        </p>
      </div>

      <div className="video-embed">
        <div ref={mountRef} />
      </div>

      <div className="transcribe-panel">
        <h3>🎙️ Transcribe with AssemblyAI</h3>
        <p className="calibrate-hint" style={{ marginBottom: 14 }}>
          For accurate highlighting, this should be the untrimmed audio extracted from this exact
          video (see README) — that way its timing matches the YouTube embed above. Requires
          <code> ASSEMBLYAI_API_KEY</code> in your <code>.env.local</code>.
        </p>
        <div className="transcribe-row">
          <input
            type="url"
            className="form-input"
            placeholder="https://your-storage.example.com/audio.mp3"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            disabled={transcribeState === 'submitting' || transcribeState === 'polling'}
          />
          <select
            className="form-input"
            style={{ maxWidth: 110 }}
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            disabled={transcribeState === 'submitting' || transcribeState === 'polling'}
          >
            <option value="ar">Arabic</option>
            <option value="en">English (test)</option>
          </select>
          <button
            type="button"
            className="btn btn-primary btn-small"
            onClick={startAssemblyAiTranscription}
            disabled={!audioUrl.trim() || transcribeState === 'submitting' || transcribeState === 'polling'}
          >
            {transcribeState === 'submitting' ? 'Submitting…' : transcribeState === 'polling' ? 'Transcribing…' : 'Transcribe'}
          </button>
        </div>
        {transcribeState === 'error' && <p className="form-error" style={{ marginTop: 12 }}>{transcribeError}</p>}
        {transcribeState === 'done' && (
          <div className="transcribe-result">
            <div className="calibrate-bar">
              <span className="calibrate-clock">✅ {transcribeResult.length} line(s) transcribed</span>
              <button type="button" className="btn btn-small btn-ghost" onClick={copyAssemblyAiResult}>
                Copy result JSON
              </button>
            </div>
            <p className="calibrate-hint">
              Play the video above — since this audio was extracted from that exact video, the
              timing matches, so highlighting here tracks the video's own playhead. Paste the
              copied JSON over the <code>transcript</code> array for this video in
              <code> data/videos.js</code> to make it permanent.
            </p>
            <div className="transcribe-preview">
              {transcribeResult.map((line, i) => (
                <div className="transcript-line" key={i}>
                  <span className="transcript-time">{line.time}</span>
                  <div className="transcript-main">
                    <div className="transcript-arabic arabic">
                      {line.words.map((w, wi) => {
                        const isPlaying = currentTime >= w.startSec && currentTime < w.endSec
                        return (
                          <Fragment key={wi}>
                          <span
                            key={wi}
                            className={`transcript-word ${isPlaying ? 'now-playing' : ''}`}
                            onClick={() => {
                              if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                                playerRef.current.seekTo(w.startSec, true)
                              }
                            }}
                          >
                            {w.arabic}
                          </span>
                          {wi < line.words.length - 1 ? ' ' : ''}
                          </Fragment>
                        )
                      })}
                      <button type="button" className="line-play" onClick={() => speak(line.arabic)}>🔊</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="calibrate-bar">
        <button
          type="button"
          className={`btn btn-small ${calibrating ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setCalibrating((c) => !c)}
        >
          🎯 {calibrating ? 'Calibrating — click a line to mark start, click again for end' : 'Calibrate timing manually'}
        </button>
        {calibrating && (
          <button type="button" className="btn btn-small btn-ghost" onClick={copyCalibration}>
            {copied ? 'Copied!' : 'Copy timings JSON'}
          </button>
        )}
        {calibrating && <span className="calibrate-clock">{currentTime.toFixed(1)}s</span>}
      </div>
      {calibrating && (
        <p className="calibrate-hint">
          Play the video above. Click a line the instant it starts (sets start time), click it again
          when it ends (sets end time). When done, hit "Copy timings JSON" and paste the result over the
          matching lines in <code>src/data/videos.js</code>.
        </p>
      )}

      <div className="transcript-block">
        <h3>Saved transcript</h3>
        {video.transcript.length === 0 && (
          <p className="portal-empty">No transcript saved yet for this video.</p>
        )}
        {video.transcript.map((line, i) => {
          const { start, end } = lineWindow(line, i)
          return (
            <div className="transcript-line" key={i}>
              <span className="transcript-time">{line.time}</span>
              <div className="transcript-main">
                <div
                  className={`transcript-arabic arabic ${calibrating ? 'calibrate-target' : ''}`}
                  onClick={calibrating ? () => handleLineMark(i) : undefined}
                >
                  {line.words.map((w, wi) => (<Fragment key={wi}> <span key={wi} className="transcript-word">{w.arabic}</span> {wi < line.words.length - 1 ? ' ' : ''}
  </Fragment>))}
                  {calibrating && (
                    <span className="calibrate-badge">
                      {start != null ? `${start}s` : '—'} → {end != null ? `${end}s` : '—'}
                    </span>
                  )}
                </div>
                <p className="transcript-gloss">{gloss(line.gloss, lang)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}