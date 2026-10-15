// scripts/seed-arabic-rules-new-lessons.mjs
//
// Creates 4 new lessons in the arabic-rules course. Run once.
// Idempotent: matches by Arabic title; updates in place if it exists.
//
// Run: node scripts/seed-arabic-rules-new-lessons.mjs

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'

config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local'),
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const COURSE_ID = 'arabic-rules'

const newLessons = [
  {
    title: {
      en: 'Verbs of nearness and hope',
      ar: 'أفعال المقاربة والرجاء',
      zh: '近似与希望动词',
    },
    questions: [],
  },
  {
    title: {
      en: 'Lā of absolute negation',
      ar: 'لا النافية للجنس',
      zh: '类属否定 لا',
    },
    questions: [],
  },
  {
    title: {
      en: 'Conditional sentences',
      ar: 'أسلوب الشرط',
      zh: '条件句',
    },
    questions: [],
  },
  {
    title: {
      en: 'Accusative categories',
      ar: 'المنصوبات',
      zh: '宾格类别',
    },
    questions: [],
  },
]

async function main() {
  const { data: instructor, error: instErr } = await supabase
    .from('profiles')
    .select('id')
    .in('role', ['instructor', 'admin'])
    .limit(1)
    .single()

  if (instErr || !instructor) {
    console.error('No instructor/admin profile found.')
    process.exit(1)
  }
  console.log(`Using instructor: ${instructor.id}`)

  const { data: course } = await supabase
    .from('courses')
    .select('id')
    .eq('id', COURSE_ID)
    .single()

  if (!course) {
    console.error(`Course "${COURSE_ID}" not found.`)
    process.exit(1)
  }

  const { data: lastLesson } = await supabase
    .from('course_lessons')
    .select('sort_order')
    .eq('course_id', COURSE_ID)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextOrder = (lastLesson?.sort_order ?? -1) + 1

  let inserted = 0
  let updated = 0
  let failed = 0

  for (const lesson of newLessons) {
    const titleAr = lesson.title.ar

    const { data: existing, error: lookupErr } = await supabase
      .from('course_lessons')
      .select('id')
      .eq('course_id', COURSE_ID)
      .eq('kind', 'multiplechoice')
      .filter('content->title->>ar', 'eq', titleAr)
      .maybeSingle()

    if (lookupErr) {
      console.warn(`  ⚠ lookup "${titleAr}": ${lookupErr.message}`)
      failed++
      continue
    }

    const content = { title: lesson.title, questions: lesson.questions }

    if (existing) {
      // Only update title if the lesson exists — do NOT wipe its questions.
      const { data: existingRow } = await supabase
        .from('course_lessons')
        .select('content')
        .eq('id', existing.id)
        .single()

      const existingQuestions = existingRow?.content?.questions || []
      const { error: upErr } = await supabase
        .from('course_lessons')
        .update({
          content: { title: lesson.title, questions: existingQuestions },
        })
        .eq('id', existing.id)

      if (upErr) {
        console.warn(`  ⚠ update "${titleAr}": ${upErr.message}`)
        failed++
        continue
      }
      updated++
      console.log(`  ✓ exists: ${titleAr} (${existingQuestions.length} Q preserved)`)
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
        failed++
        continue
      }
      nextOrder++
      inserted++
      console.log(`  + inserted: ${titleAr} (0 Q)`)
    }
  }

  console.log(`\nDone. Inserted ${inserted}, updated ${updated}, failed ${failed}.`)
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})