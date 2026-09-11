// lib/queries/user.js
import { createClient } from '../supabase/server'

export async function fetchFavoriteVideoIds() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('favorites')
    .select('video_id')
    .eq('user_id', user.id)

  if (error) throw error
  return (data || []).map((f) => f.video_id)
}

/**
 * Returns { [courseId]: progressPercent } for the current user's enrollments.
 * Empty object if not logged in (though the portal is auth-gated, so this
 * really only happens in edge cases).
 */
export async function fetchEnrollmentMap() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {}

  const { data, error } = await supabase
    .from('enrollments')
    .select('course_id, progress')
    .eq('user_id', user.id)

  if (error) throw error
  return Object.fromEntries((data || []).map((e) => [e.course_id, e.progress]))
}


/** Returns ['alphabet', 'arabic-for-travel'] for the current user. */
export async function fetchEnrolledCourseIds() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id)
  if (error) throw error
  return (data || []).map((e) => e.course_id)
}

/**
 * Returns { [courseId]: completedCount } — number of completed lessons per
 * course the user is tracking. Courses with zero completions won't appear.
 */
export async function fetchCompletedCountMap() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {}

  // Supabase JS doesn't expose GROUP BY directly; select the rows and
  // aggregate in JS. Fine at this scale — the whole table is one user's
  // rows, typically < 100.
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('course_id')
    .eq('user_id', user.id)
  if (error) throw error

  const counts = {}
  for (const row of data || []) {
    counts[row.course_id] = (counts[row.course_id] || 0) + 1
  }
  return counts
}

/** Returns ['letter:alif', 'letter:baa'] for one course, for the current user. */
export async function fetchCompletedLessonKeys(courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('lesson_completions')
    .select('lesson_key')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
  if (error) throw error
  return (data || []).map((r) => r.lesson_key)
}