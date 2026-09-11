// app/actions/enrollments.js
'use server'

import { createClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Enrolls the current user in a course. Idempotent — re-enrolling is a
 * no-op, not an error. Paid courses enroll without payment for now;
 * Stripe comes later.
 */
export async function enrollAction(courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('enrollments')
    .insert({ user_id: user.id, course_id: courseId })

  // 23505 = unique_violation. Already enrolled — that's fine.
  if (error && error.code !== '23505') throw error
  revalidatePath('/portal')
  revalidatePath(`/portal/courses/${courseId}`)
  return { enrolled: true }
}