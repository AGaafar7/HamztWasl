// app/portal/listening/page.jsx
import { fetchAllTranscriptLines, fetchVideos } from '../../../lib/queries/videos'
import ListeningClient from './ListeningClient'

export default async function ListeningPage() {
  const [lines, videos] = await Promise.all([
    fetchAllTranscriptLines(),
    fetchVideos(),
  ])

  const videosWithLines = videos.filter((v) => lines.some((l) => l.videoId === v.id))

  return <ListeningClient lines={lines} videos={videosWithLines} />
}