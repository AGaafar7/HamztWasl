// app/instructor/courses/[id]/page.jsx
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'
import { fetchCourseLessons } from '../../../../lib/queries/lessons'
import { fetchVideoChoices } from '../../../../lib/queries/lessons-content'
import EditCourseClient from './EditCourseClient'

export default async function EditCoursePage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: course } = await supabase
    .from('courses')
    .select('id, glyph, theme, level, type, price, lessons_count, status, title, "desc"')
    .eq('id', id)
    .maybeSingle()

  if (!course) notFound()

  const [lessons, videoChoices] = await Promise.all([
    fetchCourseLessons(id),
    fetchVideoChoices(),
  ])

  return (
    <EditCourseClient
      course={{
        id: course.id,
        glyph: course.glyph,
        theme: course.theme,
        level: course.level,
        type: course.type,
        price: Number(course.price),
        lessons: course.lessons_count,
        status: course.status,
        title: course.title,
        desc: course.desc,
      }}
      initialLessons={lessons}
      videoChoices={videoChoices}
    />
  )
}