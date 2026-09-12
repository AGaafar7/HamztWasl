// app/instructor/lessons/page.jsx
import { createClient } from '../../../lib/supabase/server'
import { fetchStandaloneLessons } from '../../../lib/queries/lessons'
import LessonsListClient from './LessonsListClient'

export default async function InstructorLessonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const lessons = await fetchStandaloneLessons(user.id)
  return <LessonsListClient lessons={lessons} />
}