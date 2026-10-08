// scripts/generate-letter-recording-list.mjs
//
// Reads the four letter-data CSVs exported from Supabase
//   (letters.csv, letter-examples.csv, letter-vocabulary.csv, letter-expressions.csv)
// and produces a single two-column CSV per phase for a recording studio.
//
// Two columns only: العربية (with diacritics), اللهجة (in Arabic).
//
// Phase selection is done via the PHASE constant below. Set to:
//   '1'   → letter names + glyphs + example words
//   '2'   → vocabulary words
//   '3'   → expressions
//   'all' → everything in one file
//
// Run:  node scripts/generate-letter-recording-list.mjs
// Output: scripts/letter-recording-list-phase-{1,2,3,all}.csv

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// ---- Config ----

// Which phase to generate. Change this between runs.
const PHASE = '3'

// Dialects, in the fixed order the studio should record them.
// The alphabet content is MSA in the source data, so every text is
// recorded once per dialect — giving MSA plus four colloquial copies.
const DIALECTS_AR = [
  { key: 'msa',       label: 'فصحى' },
  { key: 'egyptian',  label: 'مصري' },
  { key: 'levantine', label: 'شامي' },
  { key: 'gulf',      label: 'خليجي' },
  { key: 'darija',    label: 'مغربي' },
]

// ---- CSV reading (minimal, no dependencies) ----

function parseCsv(text) {
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1)
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
  const p = path.join(ROOT, 'scripts', name)
  if (!existsSync(p)) {
    console.warn(`⚠ ${name} not found — skipping`)
    return []
  }
  return parseCsv(readFileSync(p, 'utf8'))
}

// ---- Build rows ----

const rows = [] // each row is [arabic, dialect_label]

function addWord(arabic) {
  if (!arabic || !arabic.trim()) return
  for (const d of DIALECTS_AR) {
    rows.push([arabic.trim(), d.label])
  }
}

// Load the four CSVs
const letters     = readCsv('letters.csv')
const examples    = readCsv('letter-examples.csv')
const vocabulary  = readCsv('letter-vocabulary.csv')
const expressions = readCsv('letter-expressions.csv')

// ---- Phase 1 — names, glyphs, examples ----

if (PHASE === '1' || PHASE === 'all') {
  // Letter names — always unique, no deduplication needed
  for (const l of letters) {
    addWord(l.name)
  }

  // Letter glyphs — spoken as "حَرْف الـ" + bare name
  for (const l of letters) {
    const bareName = (l.name || '').replace(/^ال/, '')
    addWord(`حَرْف ال${bareName}`)
  }

  // Example words — deduplicate, since the same word can appear
  // as an example under multiple letters (e.g. بَاب, كِتَاب).
  const seenExamples = new Set()
  for (const e of examples) {
    const key = (e.arabic || '').trim()
    if (!key || seenExamples.has(key)) continue
    seenExamples.add(key)
    addWord(key)
  }
}

// ---- Phase 2 — vocabulary ----

if (PHASE === '2' || PHASE === 'all') {
  const seenVocab = new Set()
  for (const v of vocabulary) {
    const key = (v.arabic || '').trim()
    if (!key || seenVocab.has(key)) continue
    seenVocab.add(key)
    addWord(key)
  }
}

// ---- Phase 3 — expressions ----

if (PHASE === '3' || PHASE === 'all') {
  const seenExpressions = new Set()
  for (const x of expressions) {
    const key = (x.arabic || '').trim()
    if (!key || seenExpressions.has(key)) continue
    seenExpressions.add(key)
    addWord(key)
  }
}

// ---- Write output CSV ----

const quote = (s) => `"${String(s).replace(/"/g, '""')}"`

const csv = [
  'العربية,اللهجة',
  ...rows.map(([ar, dl]) => `${quote(ar)},${quote(dl)}`),
].join('\n')

const suffix = PHASE === 'all' ? 'all' : PHASE
const outPath = path.join(
  ROOT,
  'scripts',
  `letter-recording-list-phase-${suffix}.csv`
)

// Prepend BOM so Excel on Windows opens Arabic correctly.
writeFileSync(outPath, '\uFEFF' + csv, 'utf8')

const unique = rows.length / DIALECTS_AR.length
console.log(
  `Phase ${PHASE}: wrote ${rows.length} rows (${unique} unique words × ${DIALECTS_AR.length} dialects)`
)
console.log(`Output: ${outPath}`)