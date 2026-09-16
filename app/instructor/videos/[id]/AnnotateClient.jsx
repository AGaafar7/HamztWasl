'use client'

import { Fragment, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../../i18n/gloss.js'
import { useYouTubePlayer } from '../../../../utils/useYouTubePlayer.js'
import { updateWordAction } from '../../../actions/video-admin'

/**
 * Linear annotation editor. Flattens every word across every line into one
 * array. "Save & next" jumps to the next word that's still empty, so the
 * instructor just keeps clicking through.
 */
export default function AnnotateClient({ video }) {
  const { lang } = useLanguage()
  const { mountRef, playerRef } = useYouTubePlayer(video.youtubeId)

  // Flatten transcript to one linear list of words.
  const flat = useMemo(() => {
    const arr = []
    video.transcript.forEach((line, lineIdx) => {
      line.words.forEach((word, wordIdx) => {
        arr.push({ ...word, lineIdx, wordIdx })
      })
    })
    return arr
  }, [video])

  const [wordsState, setWordsState] = useState(flat)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [, startTransition] = useTransition()
  const [saving, setSaving] = useState(false)

  const selected = wordsState[selectedIdx]

  const isAnnotated = (w) =>
    (w.gloss?.en || w.gloss?.zh || w.grammar?.en || w.grammar?.zh || w.root)

  const annotatedCount = wordsState.filter(isAnnotated).length
  const progressPct = wordsState.length
    ? Math.round((annotatedCount / wordsState.length) * 100)
    : 0

  // Local draft for the currently selected word.
  const [draft, setDraft] = useState(() => makeDraft(selected))

  // Snapshot of what we last wrote to the DB, keyed by word id. Lets us
  // skip the network call when nothing actually changed.
  const savedSnapshotRef = useRef(new Map())
  useEffect(() => {
    // Seed the snapshot map with whatever came in from the server, so a
    // word that was already annotated and untouched is a no-op on save.
    const map = savedSnapshotRef.current
    wordsState.forEach((w) => {
      if (!map.has(w.id)) map.set(w.id, makeDraft(w))
    })
    // Only seed once per loaded video; wordsState identity changes on every
    // local save, but we don't want to overwrite an existing snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video.id])
   // Refresh the draft whenever the selected word changes.
  useEffect(() => {
    setDraft(makeDraft(selected))
  }, [selected?.id])


  const updateDraft = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const draftsEqual = (a, b) =>
    a.meaningEn === b.meaningEn &&
    a.meaningZh === b.meaningZh &&
    a.grammarEn === b.grammarEn &&
    a.grammarZh === b.grammarZh &&
    a.root === b.root

  const saveWord = async (word, d) => {
        const normalized = {
      meaningEn: d.meaningEn.trim(),
      meaningZh: d.meaningZh.trim(),
      grammarEn: d.grammarEn.trim(),
      grammarZh: d.grammarZh.trim(),
      root: d.root.trim(),
    }

        // Nothing changed since last save — skip the round-trip entirely.
    const previous = savedSnapshotRef.current.get(word.id)
    if (previous && draftsEqual(previous, normalized)) {
      return
    }

    await updateWordAction(word.id, {
      gloss: { en: normalized.meaningEn, zh: normalized.meaningZh },
      grammar: { en: normalized.grammarEn, zh: normalized.grammarZh },
      root: normalized.root,
    })

    savedSnapshotRef.current.set(word.id, normalized)

    setWordsState((prev) =>
      prev.map((w) =>
        w.id === word.id
          ? {
              ...w,
              gloss: { en: normalized.meaningEn, zh: normalized.meaningZh },
              grammar: { en: normalized.grammarEn, zh: normalized.grammarZh },
              root: normalized.root,
            }
          : w
      )
    )
  }

  const goToWord = (idx) => {
    if (idx < 0 || idx >= wordsState.length) return
    // Save current before switching.
    setSaving(true)
    startTransition(async () => {
      try {
        await saveWord(selected, draft)
      } catch (err) {
        console.error('Save failed:', err)
      } finally {
        setSaving(false)
        setSelectedIdx(idx)
      }
    })
  }

  const saveAndStay = () => {
    setSaving(true)
    startTransition(async () => {
      try {
        await saveWord(selected, draft)
      } catch (err) {
        console.error('Save failed:', err)
      } finally {
        setSaving(false)
      }
    })
  }

  const saveAndNext = () => {
    // Find the next un-annotated word starting from the next index.
    let next = selectedIdx + 1
    while (next < wordsState.length && isAnnotated(wordsState[next])) {
      next++
    }
    // If we ran off the end, just go to the next word (last one).
    if (next >= wordsState.length) next = Math.min(selectedIdx + 1, wordsState.length - 1)
    if (next === selectedIdx) {
      saveAndStay()
      return
    }
    goToWord(next)
  }

  const seekTo = (sec) => {
    if (sec != null && playerRef.current?.seekTo) {
      playerRef.current.seekTo(sec, true)
    }
  }

  return (
    <section>
      <Link href="/instructor/videos" className="back-link">← Back to videos</Link>

      <div className="portal-header">
        <div>
          <h1 className="page-title">{gloss(video.title, lang)}</h1>
          <p>
            {annotatedCount} of {wordsState.length} words annotated · {progressPct}%
          </p>
        </div>
        <Link href={`/portal/videos/${video.id}`} className="btn btn-ghost btn-small">
          Preview as student →
        </Link>
      </div>

      <div className="portal-progress" style={{ maxWidth: 560, marginBottom: 24 }}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="annotate-layout">
        <div className="annotate-left">
          <div className="video-embed annotate-embed">
            <div ref={mountRef} />
          </div>

          <div className="transcript-block annotate-transcript">
            {video.transcript.map((line, lineIdx) => (
              <div className="transcript-line" key={lineIdx}>
                <span className="transcript-time">{line.time}</span>
                <div className="transcript-main">
                  <div className="transcript-arabic arabic">
                    {line.words.map((word, wordIdx) => {
                      const flatIdx = flat.findIndex(
                        (f) => f.lineIdx === lineIdx && f.wordIdx === wordIdx
                      )
                      const w = wordsState[flatIdx]
                      const selectedHere = flatIdx === selectedIdx
                      const done = isAnnotated(w)
                      return (
                        <Fragment key={wordIdx}>
                          <span
                            className={`transcript-word annotate-word ${
                              selectedHere ? 'annotate-selected' : ''
                            } ${done ? 'annotate-done' : ''}`}
                            onClick={() => {
                              seekTo(word.startSec)
                              goToWord(flatIdx)
                            }}
                          >
                            {word.arabic}
                          </span>
                          {wordIdx < line.words.length - 1 ? ' ' : ''}
                        </Fragment>
                      )
                    })}
                  </div>
                  {line.gloss && (
                    <p className="transcript-gloss">{gloss(line.gloss, lang)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="annotate-right">
          {!selected ? (
            <p className="portal-empty">No words to annotate.</p>
          ) : (
            <div className="annotate-panel">
              <div className="annotate-panel-head">
                <span className="annotate-word-big arabic">{selected.arabic}</span>
                <span className="annotate-position">
                  Word {selectedIdx + 1} / {wordsState.length}
                </span>
              </div>

              <div className="form-group">
                <label className="form-label">Meaning (English)</label>
                <input
                  className="form-input"
                  value={draft.meaningEn}
                  onChange={(e) => updateDraft('meaningEn', e.target.value)}
                  placeholder="e.g. what"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Meaning (Chinese)</label>
                <input
                  className="form-input"
                  value={draft.meaningZh}
                  onChange={(e) => updateDraft('meaningZh', e.target.value)}
                  placeholder="e.g. 什么"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Grammar (English)</label>
                <input
                  className="form-input"
                  value={draft.grammarEn}
                  onChange={(e) => updateDraft('grammarEn', e.target.value)}
                  placeholder="e.g. interrogative pronoun"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Grammar (Chinese)</label>
                <input
                  className="form-input"
                  value={draft.grammarZh}
                  onChange={(e) => updateDraft('grammarZh', e.target.value)}
                  placeholder="e.g. 疑问代词"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Root</label>
                <input
                  className="form-input arabic" dir="rtl"
                  value={draft.root}
                  onChange={(e) => updateDraft('root', e.target.value)}
                  placeholder="e.g. ك ت ب"
                />
              </div>

              <div className="annotate-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  onClick={saveAndNext}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save & next →'}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={saveAndStay}
                  disabled={saving}
                >
                  Save
                </button>
              </div>

              <div className="annotate-nav">
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => goToWord(selectedIdx - 1)}
                  disabled={selectedIdx === 0}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => goToWord(selectedIdx + 1)}
                  disabled={selectedIdx === wordsState.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function makeDraft(w) {
  return {
    meaningEn: w?.gloss?.en || '',
    meaningZh: w?.gloss?.zh || '',
    grammarEn: w?.grammar?.en || '',
    grammarZh: w?.grammar?.zh || '',
    root: w?.root || '',
  }
}