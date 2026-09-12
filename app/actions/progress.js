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