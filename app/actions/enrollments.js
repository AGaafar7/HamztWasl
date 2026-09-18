'use server'

import { createClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Enrolls the current user in a FREE course. Idempotent — re-enrolling is
 * a no-op, not an error.
 *
 * PAID courses are intentionally rejected here: paid enrollment only
 * happens via the Paymob webhook (see app/api/webhooks/paymob/route.js).
 * This guard prevents a student from bypassing checkout by calling the
 * action directly from devtools or a crafted request.
 */
export async function enrollAction(courseId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .select('type')
    .eq('id', courseId)
    .single()

  if (courseErr || !course) throw new Error('Course not found')
  if (course.type !== 'free') {
    throw new Error('Paid courses must be purchased through checkout')
  }

  const { error } = await supabase
    .from('enrollments')
    .insert({ user_id: user.id, course_id: courseId })

  // 23505 = unique_violation. Already enrolled — that's fine.
  if (error && error.code !== '23505') throw error
  revalidatePath('/portal')
  revalidatePath(`/portal/courses/${courseId}`)
  return { enrolled: true }
}