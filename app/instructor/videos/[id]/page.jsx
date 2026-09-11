// app/instructor/videos/[id]/page.jsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'

export default async function VideoAnnotatePage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: video } = await supabase
    .from('videos')
    .select(`
      id, youtube_id, title,
      video_transcript_lines ( id, arabic, sort_order )
    `)
    .eq('id', id)
    .maybeSingle()

  if (!video) notFound()

  const lineCount = video.video_transcript_lines?.length || 0

  return (
    <section>
      <Link href="/instructor/videos" className="back-link">← Back to videos</Link>
      <div className="section-head">
        <h1 className="page-title">{video.title?.en || video.id}</h1>
        <p>
          {lineCount} line{lineCount === 1 ? '' : 's'} saved.{' '}
          The word-by-word annotation editor is coming in the next update.
        </p>
      </div>
    </section>
  )
}