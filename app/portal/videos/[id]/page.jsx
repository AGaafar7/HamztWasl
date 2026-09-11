// app/portal/videos/[id]/page.jsx
import { notFound } from 'next/navigation'
import { fetchVideo, fetchOtherVideos } from '../../../../lib/queries/videos'
import VideoDetailClient from './VideoDetailClient'

export default async function VideoDetailPage({ params }) {
  const { id } = await params
  const video = await fetchVideo(id)
  if (!video) notFound()

  const moreVideos = await fetchOtherVideos(id, 4)

  return <VideoDetailClient video={video} moreVideos={moreVideos} />
}