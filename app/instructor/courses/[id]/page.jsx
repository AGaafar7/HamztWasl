// app/instructor/courses/[id]/page.jsx
import { notFound } from 'next/navigation'
import { requireUser } from '../../../../lib/supabase/server'
import { fetchCourseLessons } from '../../../../lib/queries/lessons'
import EditCourseClient from './EditCourseClient'

export default async function EditCoursePage({ params, searchParams }) {
  const { id } = await params
  const { tab } = await searchParams
  const { supabase } = await requireUser()

  const { data: course } = await supabase
    .from('courses')
    .select('id, glyph, theme, level, type, price, lessons_count, status, title, "desc"')
    .eq('id', id)
    .maybeSingle()

  if (!course) notFound()

  const lessons = await fetchCourseLessons(id)

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
      defaultTab={typeof tab === 'string' ? tab : 'details'}
    />
  )
}