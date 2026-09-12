// app/instructor/lessons/[id]/page.jsx
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'
import { fetchStandaloneLessonById } from '../../../../lib/queries/lessons'
import EditLessonClient from './EditLessonClient'

export default async function EditStandaloneLessonPage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const lesson = await fetchStandaloneLessonById(id, user.id)
  if (!lesson) notFound()
  return <EditLessonClient lesson={lesson} />
}