// app/instructor/courses/[id]/lessons/[lessonId]/page.jsx
import { notFound } from 'next/navigation'
import { createClient } from '../../../../../../lib/supabase/server'
import { fetchCourseLessonById } from '../../../../../../lib/queries/lessons'
import { fetchVideoChoices } from '../../../../../../lib/queries/lessons-content'
import CourseLessonEditClient from './CourseLessonEditClient'

export default async function CourseLessonEditorPage({ params }) {
  const { id, lessonId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [lesson, videoChoices] = await Promise.all([
    fetchCourseLessonById(lessonId, id, user.id),
    fetchVideoChoices(),
  ])
  if (!lesson) notFound()

  const { data: course } = await supabase
    .from('courses')
    .select('id, title')
    .eq('id', id)
    .eq('instructor_id', user.id)
    .maybeSingle()
  if (!course) notFound()

  return (
    <CourseLessonEditClient
      lesson={lesson}
      course={{ id: course.id, title: course.title }}
      videoChoices={videoChoices}
    />
  )
}