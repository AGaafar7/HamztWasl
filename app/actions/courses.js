// app/actions/courses.js
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6)
}

/**
 * Create a course owned by the current instructor. Returns { id } on success.
 * Course always starts as 'draft' — publishing is a separate action so you
 * can save work-in-progress without it appearing in the catalog.
 */
export async function createCourseAction(form) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const titleEn = (form.titleEn || '').trim()
  if (!titleEn) throw new Error('English title is required')

  // Derive a URL-safe id from the title. Arabic/Chinese-only titles get a
  // generic fallback.
  let baseId = slugify(titleEn) || `course-${Date.now()}`
  let id = baseId

  // The courses table uses a human-readable text id. If the slug collides,
  // append a short suffix and try once more.
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data: existing } = await supabase
      .from('courses')
      .select('id')
      .eq('id', id)
      .maybeSingle()
    if (!existing) break
    id = `${baseId}-${randomSuffix()}`
  }

  const { error } = await supabase
    .from('courses')
    .insert({
      id,
      glyph: form.glyph || null,
      theme: form.theme || 't1',
      level: form.level,
      type: form.type,
      price: form.type === 'paid' ? Number(form.price) || 0 : 0,
      lessons_count: Number(form.lessons) || 0,
      status: 'draft',
      instructor_id: user.id,
      title: {
        en: titleEn,
        ar: (form.titleAr || '').trim() || titleEn,
        zh: (form.titleZh || '').trim() || titleEn,
      },
      desc: {
        en: (form.descEn || '').trim(),
        ar: (form.descAr || '').trim() || (form.descEn || '').trim(),
        zh: (form.descZh || '').trim() || (form.descEn || '').trim(),
      },
    })

  if (error) throw error

  revalidatePath('/instructor/courses')
  revalidatePath('/instructor')
  return { id }
}

export async function updateCourseAction(id, form) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const titleEn = (form.titleEn || '').trim()
  if (!titleEn) throw new Error('English title is required')

  const { error } = await supabase
    .from('courses')
    .update({
      glyph: form.glyph || null,
      theme: form.theme || 't1',
      level: form.level,
      type: form.type,
      price: form.type === 'paid' ? Number(form.price) || 0 : 0,
      lessons_count: Number(form.lessons) || 0,
      title: {
        en: titleEn,
        ar: (form.titleAr || '').trim() || titleEn,
        zh: (form.titleZh || '').trim() || titleEn,
      },
      desc: {
        en: (form.descEn || '').trim(),
        ar: (form.descAr || '').trim() || (form.descEn || '').trim(),
        zh: (form.descZh || '').trim() || (form.descEn || '').trim(),
      },
    })
    .eq('id', id)
    .eq('instructor_id', user.id)   // belt and suspenders; RLS already enforces

  if (error) throw error

  revalidatePath('/instructor/courses')
  revalidatePath(`/instructor/courses/${id}`)
  revalidatePath('/instructor')
  revalidatePath('/portal')
  return { ok: true }
}

export async function publishCourseAction(id, publish) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('courses')
    .update({ status: publish ? 'published' : 'draft' })
    .eq('id', id)
    .eq('instructor_id', user.id)

  if (error) throw error

  revalidatePath('/instructor/courses')
  revalidatePath(`/instructor/courses/${id}`)
  revalidatePath('/instructor')
  revalidatePath('/portal')
  return { ok: true }
}

export async function deleteCourseAction(id) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .eq('instructor_id', user.id)

  if (error) throw error

  revalidatePath('/instructor/courses')
  revalidatePath('/instructor')
  revalidatePath('/portal')
  return { ok: true }
}