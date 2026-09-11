// app/instructor/courses/[id]/page.jsx
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'
import EditCourseClient from './EditCourseClient'

export default async function EditCoursePage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: course, error } = await supabase
    .from('courses')
    .select('id, glyph, theme, level, type, price, lessons_count, status, title, "desc"')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    // RLS denies non-owned rows; that surfaces as "no rows", not an error,
    // so this branch is for real DB errors only.
    console.error('Fetch course failed:', error)
  }
  if (!course) notFound()

  // Shape it to match what the client expects.
  const shaped = {
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
  }

  return <EditCourseClient course={shaped} />
}