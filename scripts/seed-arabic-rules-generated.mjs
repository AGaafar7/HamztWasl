// scripts/seed-arabic-rules-generated.mjs
//
// Reads all 24 generated batch CSVs and appends their questions to the
// matching arabic-rules lesson. Each row is one question. Matches the
// lesson by the Arabic title stored in content->title->>ar.
//
// Idempotent: dedupes on question_id. Re-running will skip questions
// already present and only add new ones.
//
// Run:  node scripts/seed-arabic-rules-generated.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in
// .env.local.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync, readdirSync } from 'fs'
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
const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------
// Minimal CSV parser (no dependencies). Handles quoted fields,
// escaped quotes (""), and strips a UTF-8 BOM if present.
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

// ---------------------------------------------------------------
// Find all batch CSVs in scripts/, sorted numerically.
// ---------------------------------------------------------------
function findBatchFiles() {
  const files = readdirSync(SCRIPTS_DIR)
    .filter((f) => /^arabic-rules-generated-batch-\d+\.csv$/.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/(\d+)/)[1], 10)
      const nb = parseInt(b.match(/(\d+)/)[1], 10)
      return na - nb
    })
  return files
}

// ---------------------------------------------------------------
// Convert a CSV row to a question object matching the shape used
// by LessonRenderer / MultipleChoiceLessonForm.
// ---------------------------------------------------------------
function rowToQuestion(row) {
  // Options in the CSV are option_a, option_b, option_c, option_d.
  // Convert to the [{ id, text }] shape the app expects.
  const options = [
    { id: 'a', text: (row.option_a || '').trim() },
    { id: 'b', text: (row.option_b || '').trim() },
    { id: 'c', text: (row.option_c || '').trim() },
    { id: 'd', text: (row.option_d || '').trim() },
  ].filter((o) => o.text.length > 0)

  if (options.length < 2) return null

  const correct = (row.correct || '').trim().toLowerCase()
  if (!['a', 'b', 'c', 'd'].includes(correct)) return null
  if (!options.find((o) => o.id === correct)) return null

  // Build a minimal whyCorrect explanation (English only from CSV).
  // The lesson renderer shows whatever we put here; the CSV provides
  // the English explanation and, if present, the Arabic and Chinese.
  const whyCorrect = {
    en: (row.why_correct_en || '').trim(),
    ar: (row.why_correct_ar || '').trim(),
    zh: (row.why_correct_zh || '').trim(),
  }

  return {
    id: (row.question_id || '').trim(),
    prompt: (row.prompt || '').trim(),
    options,
    correctOptionId: correct,
    whyCorrect,
    whyWrong: {},  // no per-option wrong explanations in the CSVs
  }
}

// ---------------------------------------------------------------
// Main
// ---------------------------------------------------------------
async function main() {
  const files = findBatchFiles()
  if (files.length === 0) {
    console.error('No batch CSV files found in scripts/.')
    console.error('Expected files matching: arabic-rules-generated-batch-*.csv')
    process.exit(1)
  }

  console.log(`Found ${files.length} batch file(s):`)
  files.forEach((f) => console.log(`  · ${f}`))
  console.log('')

  // Group all rows by lesson title.
  const rowsByLesson = new Map()  // titleAr → [row, ...]
  let totalRows = 0

  for (const file of files) {
    const csvPath = path.join(SCRIPTS_DIR, file)
    const text = readFileSync(csvPath, 'utf8')
    const rows = parseCsv(text)

    for (const row of rows) {
      if ((row.include || '').trim().toLowerCase() !== 'yes') continue
      const titleAr = (row.lesson_title_ar || '').trim()
      if (!titleAr) {
        console.warn(`  ⚠ ${file}: row missing lesson_title_ar, skipped`)
        continue
      }
      if (!rowsByLesson.has(titleAr)) rowsByLesson.set(titleAr, [])
      rowsByLesson.get(titleAr).push(row)
      totalRows++
    }
  }

  console.log(`Loaded ${totalRows} rows across ${rowsByLesson.size} lessons.\n`)

  let totalInserted = 0
  let totalSkipped = 0
  let totalFailed = 0

  for (const [titleAr, rows] of rowsByLesson) {
    // Fetch the lesson by Arabic title.
    const { data: existing, error: fetchErr } = await supabase
      .from('course_lessons')
      .select('id, content')
      .eq('course_id', COURSE_ID)
      .eq('kind', 'multiplechoice')
      .filter('content->title->>ar', 'eq', titleAr)
      .maybeSingle()

    if (fetchErr) {
      console.warn(`  ⚠ lookup "${titleAr}": ${fetchErr.message}`)
      totalFailed += rows.length
      continue
    }
    if (!existing) {
      console.warn(`  ⚠ "${titleAr}": lesson not found — skipping ${rows.length} rows`)
      totalFailed += rows.length
      continue
    }

    const existingQuestions = existing.content?.questions || []
    const existingIds = new Set(existingQuestions.map((q) => q.id))

    const newQuestions = []
    let skippedThisLesson = 0

    for (const row of rows) {
      const q = rowToQuestion(row)
      if (!q) {
        console.warn(`  ⚠ "${titleAr}": malformed row (id=${row.question_id}), skipped`)
        totalFailed++
        continue
      }
      if (existingIds.has(q.id)) {
        skippedThisLesson++
        continue
      }
      newQuestions.push(q)
      existingIds.add(q.id)
    }

    if (newQuestions.length === 0) {
      console.log(`  · ${titleAr}: no new questions (${skippedThisLesson} already present)`)
      totalSkipped += skippedThisLesson
      continue
    }

    const merged = [...existingQuestions, ...newQuestions]

    const { error: upErr } = await supabase
      .from('course_lessons')
      .update({ content: { ...existing.content, questions: merged } })
      .eq('id', existing.id)

    if (upErr) {
      console.warn(`  ⚠ "${titleAr}": ${upErr.message}`)
      totalFailed += newQuestions.length
      continue
    }

    console.log(
      `  + ${titleAr}: +${newQuestions.length} new (${merged.length} total, ${skippedThisLesson} skipped)`
    )
    totalInserted += newQuestions.length
    totalSkipped += skippedThisLesson
  }

  console.log(
    `\nDone. Inserted ${totalInserted}, skipped ${totalSkipped} (already present), failed ${totalFailed}.`
  )
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})