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

/** Fetch the current user's profile row (full_name, bio, avatar_url, role, created_at). */
export async function fetchProfile() {
  const user = await getCurrentUser()
  if (!user) return null
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, bio, role, created_at')
    .eq('id', user.id)
    .single()
  if (error) throw error
  return data
}

/**
 * Aggregated data for the student profile page: how many courses they're
 * enrolled in, how many lessons they've completed, which courses are done.
 */
export async function fetchStudentProfileData(userId) {
  const supabase = await createClient()

  const [enrRes, compRes] = await Promise.all([
    supabase.from('enrollments').select('course_id, enrolled_at').eq('user_id', userId),
    supabase.from('lesson_completions').select('course_id, lesson_key, completed_at').eq('user_id', userId),
  ])

  const enrollments = enrRes.data || []
  const completions = compRes.data || []
  const courseIds = enrollments.map((e) => e.course_id)

  let coursesData = []
  let lessonsData = []
  if (courseIds.length > 0) {
    const [cRes, lRes] = await Promise.all([
      supabase
        .from('courses')
        .select('id, title, glyph, theme, level, type, instructor_id, profiles:instructor_id(full_name)')
        .in('id', courseIds),
      supabase
        .from('course_lessons')
        .select('course_id')
        .in('course_id', courseIds),
    ])
    coursesData = cRes.data || []
    lessonsData = lRes.data || []
  }

  const lessonsPerCourse = {}
  for (const l of lessonsData) {
    lessonsPerCourse[l.course_id] = (lessonsPerCourse[l.course_id] || 0) + 1
  }

  const completionsPerCourse = {}
  const lastActivity = {}
  for (const c of completions) {
    if (!c.course_id) continue
    completionsPerCourse[c.course_id] = (completionsPerCourse[c.course_id] || 0) + 1
    const t = new Date(c.completed_at).getTime()
    if (!lastActivity[c.course_id] || t > lastActivity[c.course_id]) {
      lastActivity[c.course_id] = t
    }
  }

  const perCourse = coursesData.map((course) => {
    const total = lessonsPerCourse[course.id] || 0
    const done = completionsPerCourse[course.id] || 0
    const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0
    return {
      id: course.id,
      title: course.title,
      glyph: course.glyph,
      theme: course.theme,
      level: course.level,
      type: course.type,
      instructor: course.profiles?.full_name || 'Hamzat Wasl Team',
      total,
      done,
      pct,
      isComplete: total > 0 && done >= total,
      lastActivity: lastActivity[course.id] || null,
    }
  })

  return {
    enrolledCount: enrollments.length,
    completedLessonsCount: completions.filter((c) => c.course_id).length,
    finishedCount: perCourse.filter((c) => c.isComplete).length,
    inProgress: perCourse.filter((c) => !c.isComplete),
    finished: perCourse.filter((c) => c.isComplete),
  }
}