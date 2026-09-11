// lib/queries/courses.js
import { createClient } from '../supabase/server'

/**
 * Server-only. Returns the published course catalog, shaped identically to
 * the old data/courses.js `getCourses(lang)` output, so consumers don't
 * change at all.
 */
export async function fetchCourses(lang = 'en') {
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
    levelLabel: pickLevelLabel(c.level, lang),
    type: c.type,
    price: Number(c.price),
    lessons: c.lessons_count,
    title: c.title?.[lang] || c.title?.en || '',
    desc: c.desc?.[lang] || c.desc?.en || '',
    instructor: c.profiles?.full_name || 'Huroof Team',
    progress: null, // filled in later from `enrollments`
  }))
}

export async function fetchCourse(id, lang = 'en') {
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
    levelLabel: pickLevelLabel(data.level, lang),
    type: data.type,
    price: Number(data.price),
    lessons: data.lessons_count,
    title: data.title?.[lang] || data.title?.en || '',
    desc: data.desc?.[lang] || data.desc?.en || '',
    instructor: data.profiles?.full_name || 'Huroof Team',
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