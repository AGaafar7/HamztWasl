// lib/queries/user.js
import { createClient, getCurrentUser } from '../supabase/server'

export async function fetchFavoriteVideoIds() {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('favorites')
    .select('video_id')
    .eq('user_id', user.id)
  if (error) throw error
  return (data || []).map((f) => f.video_id)
}

export async function fetchEnrolledCourseIds() {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id)
  if (error) throw error
  return (data || []).map((e) => e.course_id)
}

export async function fetchCompletedCountMap() {
  const user = await getCurrentUser()
  if (!user) return {}

  const supabase = await createClient()
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

export async function fetchCompletedLessonKeys(courseId) {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('lesson_key')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
  if (error) throw error
  return (data || []).map((r) => r.lesson_key)
}

export async function fetchStandaloneCompletedLessonKeys() {
  const user = await getCurrentUser()
  if (!user) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lesson_completions')
    .select('lesson_key')
    .eq('user_id', user.id)
    .is('course_id', null)
  if (error) throw error
  return (data || []).map((r) => r.lesson_key)
}