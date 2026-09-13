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

/**
 * Returns listening / reading / speaking lessons visible in the free
 * practice areas:
 *   - standalone lessons (course_id is null)
 *   - lessons inside FREE, published courses
 *
 * Paid course lessons are intentionally excluded — they stay inside the
 * course where students enrolled. RLS already restricts what the current
 * user can see; this filter is about WHERE content is surfaced, not
 * whether they're allowed to see it.
 */
export async function fetchFreeLessonsByKind(kind) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select(`
      id, course_id, kind, content, updated_at,
      courses ( id, title, type, status )
    `)
    .eq('kind', kind)
    .order('updated_at', { ascending: false })
  if (error) throw error

  return (data || [])
    .filter((row) => {
      if (!row.course_id) return true          // standalone — always free
      if (!row.courses) return false
      return row.courses.status === 'published' && row.courses.type === 'free'
    })
    .map((row) => ({
      id: row.id,
      courseId: row.course_id,
      courseTitle: row.courses?.title || null,
      kind: row.kind,
      content: row.content || {},
    }))
}

/**
 * Fetch one standalone lesson owned by the given instructor.
 * Returns null if not found or not owned.
 */
export async function fetchStandaloneLessonById(lessonId, instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select('id, kind, content, updated_at')
    .eq('id', lessonId)
    .eq('instructor_id', instructorId)
    .is('course_id', null)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return {
    id: data.id,
    kind: data.kind,
    content: data.content || {},
    updatedAt: data.updated_at,
  }
}

/**
 * Fetch one course lesson owned by the given instructor. Returns null if
 * it doesn't exist, isn't owned, or doesn't belong to the given course.
 */
export async function fetchCourseLessonById(lessonId, courseId, instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('course_lessons')
    .select('id, kind, content, updated_at')
    .eq('id', lessonId)
    .eq('course_id', courseId)
    .eq('instructor_id', instructorId)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return {
    id: data.id,
    kind: data.kind,
    content: data.content || {},
    updatedAt: data.updated_at,
  }
}