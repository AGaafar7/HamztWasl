// lib/queries/lessons.js
import { createClient } from '../supabase/server'

export async function fetchCourseLessons(courseId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select('id, course_id, sort_order, kind, content, updated_at')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data || []).map(mapLesson)
}

export async function fetchStandaloneLessons(instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select('id, course_id, sort_order, kind, content, updated_at')
    .eq('instructor_id', instructorId)
    .is('course_id', null)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(mapLesson)
}

function mapLesson(r) {
  return {
    id: r.id,
    courseId: r.course_id,
    sortOrder: r.sort_order,
    kind: r.kind,
    content: r.content || {},
    updatedAt: r.updated_at,
  }
}