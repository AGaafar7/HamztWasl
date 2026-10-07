// scripts/seed-arabic-rules-additions.mjs
//
// Appends additional multiple-choice questions to existing lessons in the
// "Arabic rules" course, extracted from 2009 & 2022 Chinese national
// Arabic-major exams. Matches each lesson by Arabic title (same as
// seed-arabic-rules-lessons.mjs) and merges new questions into the
// existing content.questions array — original questions are preserved.
//
// Idempotent: each new question has a stable id (prefixed with 'x-').
// On re-run, questions whose id already exists in the lesson are skipped,
// so running twice will not duplicate anything.
//
// Run once:  node scripts/seed-arabic-rules-additions.mjs

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'
import { arabicRulesAdditions } from '../data/arabic-rules-additions.js'

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
  let addedTotal = 0
  let skippedTotal = 0
  let lessonsTouched = 0

  for (const addition of arabicRulesAdditions) {
    const titleAr = addition.titleAr

    // Find the existing lesson by Arabic title.
    const { data: existing, error: fetchErr } = await supabase
      .from('course_lessons')
      .select('id, content')
      .eq('course_id', COURSE_ID)
      .eq('kind', 'multiplechoice')
      .eq('content->>title->>ar', titleAr)
      .maybeSingle()

    if (fetchErr) {
      console.warn(`  ⚠ ${titleAr}: ${fetchErr.message}`)
      continue
    }
    if (!existing) {
      console.warn(`  ⚠ ${titleAr}: not found in course — skipping`)
      continue
    }

    const currentQuestions = existing.content?.questions || []
    const currentIds = new Set(currentQuestions.map((q) => q.id))

    const toAdd = addition.questions.filter((q) => !currentIds.has(q.id))
    const skipped = addition.questions.length - toAdd.length

    if (toAdd.length === 0) {
      console.log(`  · ${titleAr}: no new questions (${skipped} already present)`)
      skippedTotal += skipped
      continue
    }

    const merged = [...currentQuestions, ...toAdd]

    const { error: upErr } = await supabase
      .from('course_lessons')
      .update({ content: { ...existing.content, questions: merged } })
      .eq('id', existing.id)

    if (upErr) {
      console.warn(`  ⚠ ${titleAr}: ${upErr.message}`)
      continue
    }

    lessonsTouched += 1
    addedTotal += toAdd.length
    skippedTotal += skipped
    console.log(`  + ${titleAr}: +${toAdd.length} new (${merged.length} total, ${skipped} skipped)`)
  }

  console.log(`\nDone. ${addedTotal} questions added across ${lessonsTouched} lessons. ${skippedTotal} already present.`)
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})