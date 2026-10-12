// lib/queries/courses.js
import { createClient } from '../supabase/server'

/**
 * Server-only. Returns the published course catalog, shaped identically to
 * the old data/courses.js `getCourses(lang)` output, so consumers don't
 * change at all.
 */
export async function fetchCourses() {
  const supabase = await createClient()

  const [coursesRes, lessonsRes, lettersRes] = await Promise.all([
    supabase
      .from('courses')
      .select('id, glyph, theme, level, type, price, lessons_count, title, "desc", instructor_id, profiles:instructor_id(full_name)')
      .eq('status', 'published')
      .order('created_at', { ascending: true }),
    supabase.from('course_lessons').select('course_id'),
    supabase.from('letters').select('id'),
  ])

  if (coursesRes.error) throw coursesRes.error

  const lessonsPerCourse = {}
  for (const row of lessonsRes.data || []) {
    lessonsPerCourse[row.course_id] = (lessonsPerCourse[row.course_id] || 0) + 1
  }
  const lettersCount = lettersRes.data?.length ?? 0

  return coursesRes.data.map((c) => {
    // alphabet renders from letters; every other course from course_lessons.
    // Fall back to the stored lessons_count if neither source has rows yet.
    const live =
      c.id === 'alphabet'
        ? lettersCount
        : (lessonsPerCourse[c.id] ?? null)

    return {
      id: c.id,
      glyph: c.glyph,
      theme: c.theme,
      level: c.level,
      type: c.type,
      price: Number(c.price),
      lessons: live ?? c.lessons_count ?? 0,
      title: c.title,
      desc: c.desc,
      instructor: c.profiles?.full_name || 'Hamzat Wasl Team',
      progress: null,
    }
  })
}

export async function fetchCourse(id) {
  const supabase = await createClient()

  const [courseRes, lessonsRes, lettersRes] = await Promise.all([
    supabase
      .from('courses')
      .select('id, glyph, theme, level, type, price, lessons_count, title, "desc", instructor_id, profiles:instructor_id(full_name)')
      .eq('id', id)
      .maybeSingle(),
    supabase.from('course_lessons').select('course_id').eq('course_id', id),
    id === 'alphabet'
      ? supabase.from('letters').select('id')
      : Promise.resolve({ data: null }),
  ])

  if (courseRes.error) throw courseRes.error
  if (!courseRes.data) return null

  const c = courseRes.data
  const live =
    c.id === 'alphabet'
      ? (lettersRes.data?.length ?? 0)
      : (lessonsRes.data?.length ?? 0)

  return {
    id: c.id,
    glyph: c.glyph,
    theme: c.theme,
    level: c.level,
    type: c.type,
    price: Number(c.price),
    lessons: live || c.lessons_count || 0,
    title: c.title,
    desc: c.desc,
    instructor: c.profiles?.full_name || 'Hamzat Wasl Team',
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