// app/actions/enrollments.js
'use server'

import { createClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

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

  if (error && error.code !== '23505') throw error
  
  revalidatePath('/', 'layout')
  return { enrolled: true }
}