// app/portal/listening/page.jsx
import { fetchAllTranscriptLines, fetchVideos } from '../../../lib/queries/videos'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import ListeningClient from './ListeningClient'

export default async function ListeningPage() {
  const [lines, videos, lessons, completedKeys] = await Promise.all([
    fetchAllTranscriptLines(),
    fetchVideos(),
    fetchFreeLessonsByKind('listening'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const videosWithLines = videos.filter((v) => lines.some((l) => l.videoId === v.id))
  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return (
    <ListeningClient
      lines={lines}
      videos={videosWithLines}
      lessons={lessons}
      completedIds={completedIds}
    />
  )
}