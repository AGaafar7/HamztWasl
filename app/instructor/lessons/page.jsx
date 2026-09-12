// app/instructor/lessons/page.jsx
import { createClient } from '../../../lib/supabase/server'
import { fetchStandaloneLessons } from '../../../lib/queries/lessons'
import { fetchVideoChoices } from '../../../lib/queries/lessons-content'
import LessonsClient from './LessonsClient'

export default async function InstructorLessonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const [lessons, videoChoices] = await Promise.all([
    fetchStandaloneLessons(user.id),
    fetchVideoChoices(),
  ])
  return <LessonsClient initialLessons={lessons} videoChoices={videoChoices} />
}