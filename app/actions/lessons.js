// app/actions/lessons.js
'use server'

import { createClient } from '../../lib/supabase/server'

const DEFAULT_CONTENT = {
  text: { title: { en: '', ar: '', zh: '' }, body: { en: '', ar: '', zh: '' } },
  tested: { title: { en: '', ar: '', zh: '' }, body: { en: '', ar: '', zh: '' }, questions: [] },
  video: { videoId: '' },
  listening: { title: { en: '', ar: '', zh: '' }, lines: [] },
  reading: { title: { en: '', ar: '', zh: '' }, passage: { en: '', ar: '', zh: '' }, questions: [] },
  speaking: { title: { en: '', ar: '', zh: '' }, words: [] },
  writing: { title: { en: '', ar: '', zh: '' }, items: [] },
}

export async function createLessonAction({ courseId = null, kind }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  if (!DEFAULT_CONTENT[kind]) throw new Error('Unknown lesson kind')

  let nextOrder = 0
  if (courseId) {
    const { data: last } = await supabase
      .from('course_lessons')
      .select('sort_order')
      .eq('course_id', courseId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()
    nextOrder = (last?.sort_order ?? -1) + 1
  }

  const { data, error } = await supabase
    .from('course_lessons')
    .insert({
      course_id: courseId,
      instructor_id: user.id,
      sort_order: nextOrder,
      kind,
      content: DEFAULT_CONTENT[kind],
    })
    .select('id')
    .single()

  if (error) throw error
  return { id: data.id }
}

export async function updateLessonAction(lessonId, content) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('course_lessons')
    .update({ content })
    .eq('id', lessonId)
    .eq('instructor_id', user.id)
  if (error) throw error

  return { ok: true }
}

export async function removeLessonAction(lessonId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('course_lessons')
    .delete()
    .eq('id', lessonId)
    .eq('instructor_id', user.id)
  if (error) throw error

  return { ok: true }
}

export async function reorderLessonsAction(courseId, orderedIds) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase
      .from('course_lessons')
      .update({ sort_order: i })
      .eq('id', orderedIds[i])
      .eq('course_id', courseId)
      .eq('instructor_id', user.id)
    if (error) throw error
  }

  return { ok: true }
}