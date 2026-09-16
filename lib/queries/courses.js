// lib/queries/courses.js
import { createClient } from '../supabase/server'

/**
 * Server-only. Returns the published course catalog, shaped identically to
 * the old data/courses.js `getCourses(lang)` output, so consumers don't
 * change at all.
 */
export async function fetchCourses() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, glyph, theme, level, type, price, lessons_count, title, "desc", instructor_id, profiles:instructor_id(full_name)')
    .eq('status', 'published')
    .order('created_at', { ascending: true })

  if (error) throw error

  return data.map((c) => ({
    id: c.id,
    glyph: c.glyph,
    theme: c.theme,
    level: c.level,
    type: c.type,
    price: Number(c.price),
    lessons: c.lessons_count,
    title: c.title,          // raw { en, ar, zh } — gloss() in the client
    desc: c.desc,            // raw { en, ar, zh } — gloss() in the client
    instructor: c.profiles?.full_name || 'Hamzat Wasl Team',
    progress: null,
  }))
}

export async function fetchCourse(id) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, glyph, theme, level, type, price, lessons_count, title, "desc", instructor_id, profiles:instructor_id(full_name)')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    id: data.id,
    glyph: data.glyph,
    theme: data.theme,
    level: data.level,
    type: data.type,
    price: Number(data.price),
    lessons: data.lessons_count,
    title: data.title,
    desc: data.desc,
    instructor: data.profiles?.full_name || 'Hamzat Wasl Team',
    progress: null,
  }
}

function pickLevelLabel(level, lang) {
  const map = {
    en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    ar: { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' },
    zh: { beginner: '初级', intermediate: '中级', advanced: '高级' },
  }
  return (map[lang] || map.en)[level] || level
}