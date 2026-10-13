// scripts/seed-speaking-lessons.mjs
//
// Seeds standalone speaking lessons from the five batch CSVs in scripts/.
// Each row becomes one speaking lesson (course_id = null), so it shows up
// as its own tile in /portal/speaking.
//
// Idempotent: matches each lesson by the Arabic title stored in
// content->title->>ar. Re-running updates in place rather than duplicating.
//
// Run:  node scripts/seed-speaking-lessons.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
// .env.local. Uses the service role so RLS is bypassed — this is a local
// admin tool, never bundled with the app.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
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

const BATCH_FILES = [
  'speaking-lessons-batch-1.csv',
  'speaking-lessons-batch-2.csv',
  'speaking-lessons-batch-3.csv',
  'speaking-lessons-batch-4.csv',
  'speaking-lessons-batch-5.csv',
]

// ---------------------------------------------------------------
// Minimal CSV parser (no dependency). Handles the quoted fields
// our generator might produce, and strips a UTF-8 BOM if present.
// ---------------------------------------------------------------
function parseCsv(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return []
  const header = splitCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line)
    const row = {}
    header.forEach((h, i) => (row[h] = cells[i] ?? ''))
    return row
  })
}

function splitCsvLine(line) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"'
        i++
      } else if (c === '"') {
        inQuotes = false
      } else {
        cur += c
      }
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') {
        out.push(cur)
        cur = ''
      } else {
        cur += c
      }
    }
  }
  out.push(cur)
  return out
}

function readCsv(name) {
  const p = path.join(path.dirname(fileURLToPath(import.meta.url)), name)
  if (!existsSync(p)) {
    console.warn(`⚠ ${name} not found — skipping`)
    return []
  }
  return parseCsv(readFileSync(p, 'utf8'))
}

// ---------------------------------------------------------------
// Main
// ---------------------------------------------------------------
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

  // 2. Find the current max sort_order across standalone speaking lessons
  //    so we append after them.
  const { data: lastLesson } = await supabase
    .from('course_lessons')
    .select('sort_order')
    .eq('kind', 'speaking')
    .is('course_id', null)
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  let nextOrder = (lastLesson?.sort_order ?? -1) + 1

  // 3. Load all batch files.
  let inserted = 0
  let updated = 0
  let skipped = 0
  let failed = 0

  for (const batchFile of BATCH_FILES) {
    const rows = readCsv(batchFile)
    if (rows.length === 0) continue

    console.log(`\n▶ ${batchFile}  (${rows.length} rows)`)

    for (const row of rows) {
      if ((row.include || '').trim().toLowerCase() !== 'yes') {
        skipped++
        continue
      }

      const arabic = (row.arabic_corrected || '').trim()
      if (!arabic) {
        console.warn(`  ⚠ empty arabic_corrected — skipping row`)
        failed++
        continue
      }

      const titleEn = (row.title_en || arabic).trim()
      const titleAr = (row.title_ar || arabic).trim()
      const titleZh = (row.title_zh || titleEn).trim()

      const content = {
        title: { en: titleEn, ar: titleAr, zh: titleZh },
        words: [
          {
            id: `${titleAr}::single`, // stable, deterministic id
            arabic,
            transliteration: (row.transliteration || '').trim(),
            meaning: (row.meaning_en || '').trim(),
            type: 'word',
          },
        ],
      }

      // Look up existing lesson by Arabic title.
      // content->title->>ar: `->` for the intermediate step (stays jsonb),
      // `->>` for the final extraction (returns text).
      const { data: existing, error: lookupErr } = await supabase
        .from('course_lessons')
        .select('id')
        .is('course_id', null)
        .eq('kind', 'speaking')
        .filter('content->title->>ar', 'eq', titleAr)
        .maybeSingle()

      if (lookupErr) {
        console.warn(`  ⚠ lookup "${titleAr}": ${lookupErr.message}`)
        failed++
        continue
      }

      if (existing) {
        const { error: upErr } = await supabase
          .from('course_lessons')
          .update({ content })
          .eq('id', existing.id)
        if (upErr) {
          console.warn(`  ⚠ update "${titleAr}": ${upErr.message}`)
          failed++
          continue
        }
        updated++
        console.log(`  ✓ updated: ${titleAr}`)
      } else {
        const { error: insErr } = await supabase
          .from('course_lessons')
          .insert({
            course_id: null,
            instructor_id: instructor.id,
            sort_order: nextOrder,
            kind: 'speaking',
            content,
          })
        if (insErr) {
          console.warn(`  ⚠ insert "${titleAr}": ${insErr.message}`)
          failed++
          continue
        }
        nextOrder++
        inserted++
        console.log(`  + inserted: ${titleAr}`)
      }
    }
  }

  console.log(
    `\nDone. Inserted ${inserted}, updated ${updated}, skipped ${skipped}, failed ${failed}.`
  )
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})