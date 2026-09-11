// app/portal/listening/page.jsx
import { fetchAllTranscriptLines, fetchVideos } from '../../../lib/queries/videos'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import ListeningClient from './ListeningClient'

export default async function ListeningPage() {
  const [lines, videos, lessons] = await Promise.all([
    fetchAllTranscriptLines(),
    fetchVideos(),
    fetchFreeLessonsByKind('listening'),
  ])

  const videosWithLines = videos.filter((v) => lines.some((l) => l.videoId === v.id))

  return <ListeningClient lines={lines} videos={videosWithLines} lessons={lessons} />
}