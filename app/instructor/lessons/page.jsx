// app/instructor/lessons/page.jsx
import { requireUser } from '../../../lib/supabase/server'
import { fetchStandaloneLessons } from '../../../lib/queries/lessons'
import LessonsListClient from './LessonsListClient'

export default async function InstructorLessonsPage() {
  const { user } = await requireUser()
  const lessons = await fetchStandaloneLessons(user.id)
  return <LessonsListClient lessons={lessons} />
}