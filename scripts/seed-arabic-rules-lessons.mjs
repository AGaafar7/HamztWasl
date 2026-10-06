// scripts/seed-arabic-rules-lessons.mjs
//
// Seeds the "Arabic Rules" course with lesson modules extracted from
// Chinese national Arabic-major exams and Alexandria University grammar
// quizzes.
//
// Idempotent: matches each lesson by (course_id, content->>title->>ar).
// If a lesson with the same Arabic title exists, it is updated in place.
// Otherwise, it is inserted.
//
// Run once:  node scripts/seed-arabic-rules-lessons.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'
import { arabicRulesLessons } from '../data/arabic-rules-lessons.js'

config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local'),
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const COURSE_ID = 'arabic-rules'

async function main() {
  // 1. Find an instructor/admin to own the lessons.
  const { data: instructor, error: instErr } = await supabase
    .from('profiles')
    .select('id')
    .in('role', ['instructor', 'admin'])
    .limit(1)
    .single()

  if (instErr || !instructor) {
    console.error('No instructor/admin profile found. Create one first.')
    process.exit(1)
  }
  console.log(`Using instructor: ${instructor.id}`)

  // 2. Confirm the course exists.
  const { data: course, error: courseErr } = await supabase
    .from('courses')
    .select('id')
    .eq('id', COURSE_ID)
    .single()

  if (courseErr || !course) {
    console.error(`Course "${COURSE_ID}" not found. Run seed-arabic-rules.mjs first.`)
    process.exit(1)
  }

  // 3. Find the current max sort_order in this course (append after existing lessons).
  const { data: lastLesson } = await supabase
    .from('course_lessons')
    .select('sort_order')
    .eq('course_id', COURSE_ID)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextOrder = (lastLesson?.sort_order ?? -1) + 1

  // 4. Insert / update each lesson.
  let inserted = 0
  let updated = 0

  for (const lesson of arabicRulesLessons) {
    const titleAr = lesson.title.ar

    // Look for existing lesson with this Arabic title in this course.
    const { data: existing } = await supabase
      .from('course_lessons')
      .select('id')
      .eq('course_id', COURSE_ID)
      .eq('kind', 'multiplechoice')
      .eq('content->>title->>ar', titleAr)
      .maybeSingle()

    const content = {
      title: lesson.title,
      questions: lesson.questions,
    }

    if (existing) {
      const { error: upErr } = await supabase
        .from('course_lessons')
        .update({ content })
        .eq('id', existing.id)
      if (upErr) {
        console.warn(`  ⚠ update "${titleAr}": ${upErr.message}`)
        continue
      }
      updated += 1
      console.log(`  ✓ updated: ${titleAr} (${lesson.questions.length} Q)`)
    } else {
      const { error: insErr } = await supabase
        .from('course_lessons')
        .insert({
          course_id: COURSE_ID,
          instructor_id: instructor.id,
          sort_order: nextOrder,
          kind: 'multiplechoice',
          content,
        })
      if (insErr) {
        console.warn(`  ⚠ insert "${titleAr}": ${insErr.message}`)
        continue
      }
      nextOrder += 1
      inserted += 1
      console.log(`  + inserted: ${titleAr} (${lesson.questions.length} Q)`)
    }
  }

  console.log(`\nDone. Inserted ${inserted}, updated ${updated}, total ${arabicRulesLessons.length}.`)
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})