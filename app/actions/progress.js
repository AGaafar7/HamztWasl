// app/actions/progress.js
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

export async function toggleLessonCompleteAction(courseId, lessonKey) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Try to delete first (un-complete).
  const { data: deleted } = await supabase
    .from('lesson_completions')
    .delete()
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('lesson_key', lessonKey)
    .select('lesson_key')

  let completed
  if (deleted && deleted.length > 0) {
    completed = false
  } else {
    const { error: insErr } = await supabase
      .from('lesson_completions')
      .insert({ user_id: user.id, course_id: courseId, lesson_key: lessonKey })
    if (insErr) throw insErr
    completed = true

    // Auto-enroll (idempotent).
    const { error: enrollErr } = await supabase
      .from('enrollments')
      .insert({ user_id: user.id, course_id: courseId })
    if (enrollErr && enrollErr.code !== '23505') {
      console.error('Auto-enroll failed:', enrollErr.message)
    }
  }

  // Invalidate cached server-rendered data so the portal and course pages
  // reflect the change on next navigation.
  revalidatePath('/portal')
  revalidatePath(`/portal/courses/${courseId}`)
  revalidatePath(`/portal/courses/${courseId}/letter/${lessonKey.replace('letter:', '')}`)

  return { completed }
}