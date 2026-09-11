// scripts/seed.mjs
//
// Seeds the content tables in Supabase from the local mock data files.
// Run: node scripts/seed.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
// Uses the service role so RLS is bypassed (safe — this is a local admin tool,
// never bundled with the app).

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'

import { videos } from '../data/videos.js'
import { alphabetLetters } from '../data/alphabet.js'
import { dictionaryEntries } from '../data/dictionary.js'
import { comprehensionExercises } from '../data/comprehension.js'
import { getCourses } from '../data/courses.js'
import { instructorCourses, instructorPractices } from '../data/instructor.js'

config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// Merge the per-language getCourses output into { en, ar, zh } JSONB objects.
function mergedCourses() {
  const en = getCourses('en')
  const ar = getCourses('ar')
  const zh = getCourses('zh')
  return en.map((c) => {
    const a = ar.find((x) => x.id === c.id)
    const z = zh.find((x) => x.id === c.id)
    return {
      id: c.id,
      glyph: c.glyph,
      theme: c.theme,
      level: c.level,
      type: c.type,
      price: c.price,
      lessons_count: c.lessons,
      status: 'published',
      title: { en: c.title, ar: a?.title || c.title, zh: z?.title || c.title },
      desc:  { en: c.desc,  ar: a?.desc  || c.desc,  zh: z?.desc  || c.desc  },
    }
  })
}

async function wipe() {
  console.log('Wiping content tables…')
  // Order matters: children first, then parents.
  const order = [
    'video_transcript_words',
    'video_transcript_lines',
    'videos',
    'letter_examples',
    'letter_pronunciations',
    'letters',
    'dictionary_examples',
    'dictionary_conjugations',
    'dictionary_forms',
    'dictionary_entries',
    'comprehension_questions',
    'comprehension_exercises',
    'practices',
    'courses',
  ]
  for (const table of order) {
    const { error } = await supabase.from(table).delete().neq('id', '__none__')
    // some tables have no `id` column - handle both
    if (error && error.code !== '42703') {
      // fall back to deleting via a non-matching always-false filter
      const { error: e2 } = await supabase.from(table).delete().not('created_at', 'is', null)
      if (e2) console.warn(`  ⚠ ${table}: ${e2.message}`)
    }
  }
}

async function seedCourses() {
  const rows = mergedCourses()
  console.log(`Seeding ${rows.length} courses…`)
  const { error } = await supabase.from('courses').insert(rows)
  if (error) throw error
}

async function seedLetters() {
  console.log(`Seeding ${alphabetLetters.length} letters…`)
  const letterRows = alphabetLetters.map((l, i) => ({
    id: l.id,
    position: i + 1,
    arabic: l.arabic,
    name: l.name,
    transliteration: l.transliteration,
    makhraj: l.makhraj || null,
    video_id: l.videoId || null,
    start_time: l.startTime || 0,
    mouth_image: l.mouthImage || null,
  }))
  const { error } = await supabase.from('letters').insert(letterRows)
  if (error) throw error

  const exampleRows = []
  for (const l of alphabetLetters) {
    l.examples.forEach((ex, i) => {
      exampleRows.push({
        letter_id: l.id,
        word: ex.word,
        transliteration: ex.transliteration,
        meaning: ex.meaning,
        sort_order: i,
      })
    })
  }
  console.log(`Seeding ${exampleRows.length} letter examples…`)
  const { error: exErr } = await supabase.from('letter_examples').insert(exampleRows)
  if (exErr) throw exErr
}

async function seedVideos() {
  console.log(`Seeding ${videos.length} videos…`)
  const videoRows = videos.map((v) => ({
    id: v.id,
    youtube_id: v.youtubeId,
    watch_url: v.watchUrl,
    title: v.title,
    dialects: v.dialects || [],
    level: v.level,
    theme: v.theme,
  }))
  const { error } = await supabase.from('videos').insert(videoRows)
  if (error) throw error

  for (const v of videos) {
    if (!v.transcript?.length) continue

    // Insert lines with explicit sort_order, get generated UUIDs back.
    const lineRows = v.transcript.map((line, i) => ({
      video_id: v.id,
      sort_order: i,
      time_label: line.time,
      start_sec: line.startSec,
      end_sec: line.endSec,
      arabic: line.arabic,
      gloss: line.gloss || null,
    }))
    const { data: insertedLines, error: lineErr } = await supabase
      .from('video_transcript_lines')
      .insert(lineRows)
      .select('id, sort_order')
    if (lineErr) throw lineErr

    // Match each returned line back to its original index by sort_order.
    const lineIdByIndex = Object.fromEntries(
      insertedLines.map((r) => [r.sort_order, r.id])
    )

    const wordRows = []
    v.transcript.forEach((line, i) => {
      if (!line.words?.length) return
      line.words.forEach((w, wi) => {
        wordRows.push({
          line_id: lineIdByIndex[i],
          sort_order: wi,
          arabic: w.arabic,
          start_sec: w.startSec ?? null,
          end_sec: w.endSec ?? null,
          gloss: w.gloss || null,
          grammar: w.grammar || null,
        })
      })
    })
    if (wordRows.length) {
      console.log(`  ${v.id}: ${lineRows.length} lines, ${wordRows.length} words`)
      const { error: wordErr } = await supabase.from('video_transcript_words').insert(wordRows)
      if (wordErr) throw wordErr
    }
  }
}

async function seedDictionary() {
  console.log(`Seeding ${dictionaryEntries.length} dictionary entries…`)
  const entries = dictionaryEntries.map((e) => ({
    id: e.id,
    search_terms: e.searchTerms || [],
    arabic: e.arabic,
    gloss: e.gloss,
    grammar: e.grammar || null,
    root: e.root || null,
  }))
  const { error } = await supabase.from('dictionary_entries').insert(entries)
  if (error) throw error

  const forms = []
  const conjs = []
  const examples = []
  for (const e of dictionaryEntries) {
    (e.forms || []).forEach((f) =>
      forms.push({ entry_id: e.id, dialect: f.dialect, arabic: f.arabic })
    )
    if (e.conjugations) {
      for (const tense of ['present', 'past']) {
        (e.conjugations[tense] || []).forEach((c, i) =>
          conjs.push({ entry_id: e.id, tense, sort_order: i, arabic: c.arabic, label: c.label })
        )
      }
    }
    (e.examples || []).forEach((ex, i) =>
      examples.push({
        entry_id: e.id,
        sort_order: i,
        arabic: ex.arabic,
        gloss: ex.gloss,
        dialect: ex.dialect || null,
      })
    )
  }
  if (forms.length) await supabase.from('dictionary_forms').insert(forms)
  if (conjs.length) await supabase.from('dictionary_conjugations').insert(conjs)
  if (examples.length) await supabase.from('dictionary_examples').insert(examples)
}

async function seedComprehension() {
  console.log(`Seeding ${comprehensionExercises.length} comprehension exercises…`)
  const exRows = comprehensionExercises.map((e) => ({
    id: e.id,
    title: e.title,
    passage: e.passage,
  }))
  const { error } = await supabase.from('comprehension_exercises').insert(exRows)
  if (error) throw error

  const qs = []
  for (const e of comprehensionExercises) {
    (e.questions || []).forEach((q, i) =>
      qs.push({
        exercise_id: e.id,
        sort_order: i,
        question: q.question,
        reference_answer: q.referenceAnswer,
      })
    )
  }
  if (qs.length) {
    const { error: qErr } = await supabase.from('comprehension_questions').insert(qs)
    if (qErr) throw qErr
  }
}

async function seedInstructor() {
  console.log(`Seeding ${instructorPractices.length} practices…`)
  const rows = instructorPractices.map((p) => ({
    id: p.id,
    course_id: p.courseId,
    title: p.title,
    type: p.type,
    status: p.status,
    content: null,
  }))
  const { error } = await supabase.from('practices').insert(rows)
  if (error) throw error
}

async function main() {
  const cmd = process.argv[2]
  if (cmd === '--wipe-only') {
    await wipe()
    return
  }
  await wipe()
  await seedCourses()
  await seedLetters()
  await seedVideos()
  await seedDictionary()
  await seedComprehension()
  await seedInstructor()
  console.log('\n✓ Seed complete.')
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message || err)
  process.exit(1)
})