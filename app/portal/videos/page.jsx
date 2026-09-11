// app/portal/videos/page.jsx
import { fetchVideos } from '../../../lib/queries/videos'
import { fetchFavoriteVideoIds } from '../../../lib/queries/user'
import VideosClient from './VideosClient'

export default async function VideosPage() {
  const [videos, favorites] = await Promise.all([
    fetchVideos(),
    fetchFavoriteVideoIds(),
  ])
  return <VideosClient videos={videos} initialFavorites={favorites} />
}