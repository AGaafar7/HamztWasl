// app/instructor/videos/[id]/page.jsx
import { notFound } from 'next/navigation'
import { fetchVideo } from '../../../../lib/queries/videos'
import AnnotateClient from './AnnotateClient'

export default async function VideoAnnotatePage({ params }) {
  const { id } = await params
  const video = await fetchVideo(id)
  if (!video) notFound()
  return <AnnotateClient video={video} />
}