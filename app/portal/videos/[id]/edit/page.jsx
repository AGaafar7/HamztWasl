// app/portal/videos/[id]/edit/page.jsx
import { notFound } from 'next/navigation'
import { fetchVideo } from '../../../../../lib/queries/videos'
import VideoEditClient from './VideoEditClient'

export default async function VideoEditPage({ params }) {
  const { id } = await params
  const video = await fetchVideo(id)
  if (!video) notFound()
  return <VideoEditClient video={video} />
}