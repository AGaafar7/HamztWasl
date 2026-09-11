'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/client'
import { createVideoWithTranscriptAction } from '../../../actions/video-admin'

const DIALECTS = [
  { id: 'msa', label: 'MSA' },
  { id: 'egyptian', label: 'Egyptian' },
  { id: 'levantine', label: 'Levantine' },
  { id: 'gulf', label: 'Gulf' },
  { id: 'darija', label: 'Darija' },
  { id: 'iraqi', label: 'Iraqi' },
]

function extractYoutubeId(url) {
  if (!url) return ''
  // Accept: watch?v=ID, youtu.be/ID, embed/ID, shorts/ID
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : url.trim()
}

export default function NewVideoClient() {
  const router = useRouter()
  const [form, setForm] = useState({
    youtubeUrl: '',
    titleEn: '',
    titleAr: '',
    titleZh: '',
    dialects: [],
    level: 'beginner',
    theme: 't1',
  })
  const [audioFile, setAudioFile] = useState(null)
  const [state, setState] = useState('idle') // idle|uploading|transcribing|saving|done|error
  const [error, setError] = useState('')

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggleDialect = (id) => setForm((f) => ({
    ...f,
    dialects: f.dialects.includes(id)
      ? f.dialects.filter((d) => d !== id)
      : [...f.dialects, id],
  }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const youtubeId = extractYoutubeId(form.youtubeUrl)
    if (!youtubeId) {
      setError('Could not read a YouTube video id from that URL.')
      return
    }
    if (!form.titleEn.trim()) {
      setError('English title is required.')
      return
    }
    if (!audioFile) {
      setError('Please attach the audio file for this video.')
      return
    }

    try {
      // 1. Upload audio to Supabase Storage.
      setState('uploading')
      const supabase = createClient()
      const safeName = audioFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const path = `${Date.now()}-${safeName}`
      const { error: uploadErr } = await supabase
        .storage.from('audio').upload(path, audioFile)
      if (uploadErr) throw new Error(`Upload failed: ${uploadErr.message}`)
      const { data: { publicUrl } } = supabase
        .storage.from('audio').getPublicUrl(path)

      // 2. Submit to AssemblyAI via existing API route.
      setState('transcribing')
      const submitRes = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ audioUrl: publicUrl, languageCode: 'ar' }),
      })
      const submitData = await submitRes.json()
      if (!submitRes.ok) throw new Error(submitData.error || 'Submit failed')

      // 3. Poll until done.
      const lines = await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            const pollRes = await fetch(`/api/transcribe/${submitData.id}`)
            const pollData = await pollRes.json()
            if (pollData.status === 'completed') {
              clearInterval(interval)
              resolve(pollData.lines)
            } else if (pollData.status === 'error') {
              clearInterval(interval)
              reject(new Error(pollData.error || 'Transcription failed'))
            }
          } catch (err) {
            clearInterval(interval)
            reject(err)
          }
        }, 3000)
      })

      // 4. Save everything to the DB.
      setState('saving')
      const { id } = await createVideoWithTranscriptAction(
        {
          youtubeId,
          titleEn: form.titleEn,
          titleAr: form.titleAr,
          titleZh: form.titleZh,
          dialects: form.dialects,
          level: form.level,
          theme: form.theme,
        },
        lines
      )

      // 5. Go to the annotation page.
      setState('done')
      router.push(`/instructor/videos/${id}`)
      router.refresh()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong')
      setState('error')
    }
  }

  const busy = state !== 'idle' && state !== 'error'

  return (
    <section>
      <Link href="/instructor/videos" className="back-link">← Back to videos</Link>

      <div className="section-head">
        <h1 className="page-title">Add a video</h1>
        <p>
          Paste the YouTube URL, fill in the details, and attach the audio
          file. The site will transcribe it automatically and add it to the
          library.
        </p>
      </div>

      <form className="instructor-form" onSubmit={onSubmit}>
        <fieldset className="instructor-fieldset" disabled={busy}>
          <legend>Video</legend>

          <div className="form-group">
            <label className="form-label">YouTube URL *</label>
            <input
              className="form-input"
              placeholder="https://www.youtube.com/watch?v=..."
              value={form.youtubeUrl}
              onChange={(e) => update('youtubeUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Title (English) *</label>
            <input
              className="form-input"
              value={form.titleEn}
              onChange={(e) => update('titleEn', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Title (Arabic)</label>
            <input
              className="form-input arabic" dir="rtl"
              value={form.titleAr}
              onChange={(e) => update('titleAr', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Title (Chinese)</label>
            <input
              className="form-input"
              value={form.titleZh}
              onChange={(e) => update('titleZh', e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="instructor-fieldset" disabled={busy}>
          <legend>Tags</legend>

          <div className="form-group">
            <label className="form-label">Dialects</label>
            <div className="filter-chips">
              {DIALECTS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`chip ${form.dialects.includes(d.id) ? 'active' : ''}`}
                  onClick={() => toggleDialect(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="instructor-form-row">
            <div className="form-group">
              <label className="form-label">Level</label>
              <select className="form-input" value={form.level}
                onChange={(e) => update('level', e.target.value)}>
                <option value="novice">Novice</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select className="form-input" value={form.theme}
                onChange={(e) => update('theme', e.target.value)}>
                <option value="t1">Navy</option>
                <option value="t2">Gold</option>
                <option value="t3">Orange</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="instructor-fieldset" disabled={busy}>
          <legend>Audio file</legend>
          <p className="calibrate-hint" style={{ marginBottom: 12 }}>
            Upload the untrimmed audio of the exact video above — mp3, m4a,
            wav, or mp4. See the note at the bottom of this page for how to
            get it.
          </p>
          <input
            type="file"
            accept="audio/*,video/mp4"
            className="form-input"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
          />
          {audioFile && (
            <p className="calibrate-hint" style={{ marginTop: 8 }}>
              {audioFile.name} — {(audioFile.size / 1024 / 1024).toFixed(1)} MB
            </p>
          )}
        </fieldset>

        {state === 'uploading' && <p className="speaking-loading">⬆️ Uploading audio…</p>}
        {state === 'transcribing' && <p className="speaking-loading">🎙️ Transcribing with AssemblyAI… (this can take a minute)</p>}
        {state === 'saving' && <p className="speaking-loading">💾 Saving to the library…</p>}

        {error && <p className="form-error">{error}</p>}

        <div className="instructor-form-actions">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Working…' : 'Add & transcribe'}
          </button>
          <Link href="/instructor/videos" className="btn btn-ghost">Cancel</Link>
        </div>
      </form>

      <details className="calibrate-hint" style={{ marginTop: 24 }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          How to get the audio file
        </summary>
        <div style={{ marginTop: 10, lineHeight: 1.7 }}>
          <p>On your own machine, install the tool once:</p>
          <pre><code>pip install -U yt-dlp</code></pre>
          <p>Then, for any video:</p>
          <pre><code>yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=VIDEO_ID" -o "audio.%(ext)s"</code></pre>
          <p>
            Drag the resulting <code>audio.mp3</code> into the box above.
            Because it's the exact, untrimmed audio of that video, the
            timestamps will line up with the YouTube embed when students
            watch it.
          </p>
        </div>
      </details>
    </section>
  )
}