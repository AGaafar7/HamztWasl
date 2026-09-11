'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { deleteVideoAction } from '../../actions/video-admin'

export default function InstructorVideosClient({ videos }) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const onDelete = (id, title) => {
    if (!confirm(`Delete "${title}"? This removes the transcript too.`)) return
    startTransition(async () => {
      try {
        await deleteVideoAction(id)
        router.refresh()
      } catch (err) {
        alert(err.message || 'Delete failed')
      }
    })
  }

  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Videos</h1>
          <p>All videos in the library. Each one can be annotated word-by-word.</p>
        </div>
        <Link href="/instructor/videos/new" className="btn btn-primary">
          + Add Video
        </Link>
      </div>

      {videos.length === 0 ? (
        <p className="portal-empty">
          No videos yet. Click "Add Video" to paste a YouTube URL and upload its audio.
        </p>
      ) : (
        <div className="instructor-table">
          {videos.map((v) => (
            <div className="instructor-row" key={v.id}>
              <span className="instructor-row-main">
                <strong>{v.title?.en || v.id}</strong>
                <span>
                  {v.lineCount} {v.lineCount === 1 ? 'line' : 'lines'} ·{' '}
                  {v.dialects.length > 0 ? v.dialects.join(', ') : 'no dialect'} ·{' '}
                  {v.level}
                </span>
              </span>
              <span className="instructor-row-date">{v.createdAt?.slice(0, 10)}</span>
              <Link
                href={`/instructor/videos/${v.id}`}
                className="btn btn-small btn-ghost"
              >
                Annotate
              </Link>
              <button
                type="button"
                className="mini-play"
                onClick={() => onDelete(v.id, v.title?.en || v.id)}
                aria-label="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}