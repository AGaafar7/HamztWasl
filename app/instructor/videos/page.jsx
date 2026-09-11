// app/instructor/videos/page.jsx
import { fetchAllVideosForAdmin } from '../../../lib/queries/admin-videos'
import InstructorVideosClient from './InstructorVideosClient'

export default async function InstructorVideosPage() {
  const videos = await fetchAllVideosForAdmin()
  return <InstructorVideosClient videos={videos} />
}