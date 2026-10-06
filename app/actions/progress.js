// app/actions/progress.js
'use server'

import { createClient } from '../../lib/supabase/server'

export async function toggleLessonCompleteAction(courseId, lessonKey) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Try delete first (un-complete).
  let delQuery = supabase
    .from('lesson_completions')
    .delete()
    .eq('user_id', user.id)
    .eq('lesson_key', lessonKey)
  delQuery = courseId ? delQuery.eq('course_id', courseId) : delQuery.is('course_id', null)

  const { data: deleted } = await delQuery.select('lesson_key')

  let completed
  if (deleted && deleted.length > 0) {
    completed = false
  } else {
    const { error: insErr } = await supabase
      .from('lesson_completions')
      .insert({
        user_id: user.id,
        course_id: courseId || null,
        lesson_key: lessonKey,
      })
    if (insErr) throw insErr
    completed = true

    // Auto-enroll only when there's an actual course.
    if (courseId) {
      const { error: enrollErr } = await supabase
        .from('enrollments')
        .insert({ user_id: user.id, course_id: courseId })
      if (enrollErr && enrollErr.code !== '23505') {
        console.error('Auto-enroll failed:', enrollErr.message)
      }
    }
  }

  return { completed }
}

/**
 * Resets a student's progress on a multiple-choice lesson: deletes all
 * of their practice_attempts rows for that lesson AND their
 * lesson_completions row (if any). After this runs, the lesson looks
 * freshly unanswered AND the course progress bar drops by one.
 *
 * Fire-and-forget from the client's perspective; the caller hard-reloads
 * afterward so the server component re-fetches fresh state.
 */
export async function resetLessonAction(lessonId, courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // 1. Delete all multiplechoice attempts for this lesson.
  const { error: attemptsErr } = await supabase
    .from('practice_attempts')
    .delete()
    .eq('user_id', user.id)
    .eq('practice_type', 'multiplechoice')
    .like('ref_id', `${lessonId}:%`)

  if (attemptsErr) throw attemptsErr

  // 2. Delete the lesson_completions row. lesson_key format is
  //    'lesson:<lessonId>' (see toggleLessonCompleteAction in
  //    app/actions/progress.js). course_id may be null for standalone
  //    lessons, so we scope by both lesson_key and course_id.
  let delQuery = supabase
    .from('lesson_completions')
    .delete()
    .eq('user_id', user.id)
    .eq('lesson_key', `lesson:${lessonId}`)

  delQuery = courseId
    ? delQuery.eq('course_id', courseId)
    : delQuery.is('course_id', null)

  const { error: completionErr } = await delQuery
  if (completionErr) throw completionErr

  return { ok: true }
}