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

/** Fetch one lesson by id, plus its course context. */
export async function fetchLesson(lessonId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select('id, course_id, sort_order, kind, content')
    .eq('id', lessonId)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return {
    id: data.id,
    courseId: data.course_id,
    sortOrder: data.sort_order,
    kind: data.kind,
    content: data.content || {},
  }
}

/**
 * Returns { index, total, prev, next } for a lesson within its course.
 * Used by the lesson page for "Previous" / "Next" navigation.
 */
export async function fetchLessonSiblings(courseId, lessonId) {
  const lessons = await fetchCourseLessons(courseId)
  const idx = lessons.findIndex((l) => l.id === lessonId)
  return {
    index: idx,
    total: lessons.length,
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null,
  }
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