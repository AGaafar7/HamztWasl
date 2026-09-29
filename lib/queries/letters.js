// lib/queries/letters.js
import { createClient } from '../supabase/server'

export async function fetchLetters() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('letters')
    .select('id, position, arabic, name, transliteration, makhraj, video_id, start_time, mouth_image')
    .order('position', { ascending: true })
  if (error) throw error
  return data.map(mapLetter)
}

export async function fetchLetter(letterId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('letters')
    .select(`
      id, position, arabic, name, transliteration, makhraj, video_id, start_time, mouth_image,
      letter_examples ( id, word, transliteration, meaning, sort_order ),
      letter_pronunciations ( dialect, audio_url ),
      letter_vocabulary ( id, sort_order, arabic, transliteration, meaning ),
      letter_expressions ( id, sort_order, arabic, transliteration, meaning )
    `)
    .eq('id', letterId)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return mapLetterWithExtras(data)
}

function mapLetter(l) {
  return {
    id: l.id,
    arabic: l.arabic,
    name: l.name,
    transliteration: l.transliteration,
    makhraj: l.makhraj,
    videoId: l.video_id,
    startTime: l.start_time !== null ? Number(l.start_time) : 0,
    mouthImage: l.mouth_image,
  }
}

function mapLetterWithExtras(l) {
  const examples = (l.letter_examples || [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((ex) => ({
      word: ex.word,
      transliteration: ex.transliteration,
      meaning: ex.meaning,
    }))

  // Words that already appear in the example words — we exclude them
  // from the vocabulary list so the same word never shows twice on
  // the same page.
  const exampleWords = new Set(
    examples.map((ex) => normalizeArabicWord(ex.word))
  )

  const vocabulary = (l.letter_vocabulary || [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => ({
      id: v.id,
      arabic: v.arabic,
      transliteration: v.transliteration,
      meaning: v.meaning,
    }))
    .filter((v) => !exampleWords.has(normalizeArabicWord(v.arabic)))

  return {
    ...mapLetter(l),
    examples,
    vocabulary,
    expressions: (l.letter_expressions || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((e) => ({
        id: e.id,
        arabic: e.arabic,
        transliteration: e.transliteration,
        meaning: e.meaning,
      })),
    pronunciations: Object.fromEntries(
      (l.letter_pronunciations || []).map((p) => [p.dialect, p.audio_url])
    ),
  }
}

/**
 * Strips Arabic diacritics and normalizes letter variants so that
 * "تَمْر" and "تمر" compare equal. Used to dedupe the vocabulary list
 * against the example words on the letter page.
 */
function normalizeArabicWord(w) {
  return (w || '')
    .replace(/[\u064B-\u0652]/g, '')   // diacritics
    .replace(/[أإآٱ]/g, 'ا')            // alif variants
    .replace(/[ىئ]/g, 'ي')              // yaa variants
    .replace(/ة/g, 'ه')                 // taa marbuta
    .replace(/ـ/g, '')                  // tatweel
    .replace(/[؟،.!؛:"'’\-،]/g, '')     // punctuation
    .replace(/\s+/g, '')
    .trim()
}

/**
 * Letters with their examples, in one query — for the speaking deck and
 * any other place that needs the full set with example words attached.
 */
export async function fetchLettersWithExamples() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('letters')
    .select(`
      id, position, arabic, name, transliteration, makhraj,
      letter_examples ( word, transliteration, meaning, sort_order )
    `)
    .order('position', { ascending: true })
  if (error) throw error

  return (data || []).map((l) => ({
    id: l.id,
    arabic: l.arabic,
    name: l.name,
    transliteration: l.transliteration,
    makhraj: l.makhraj,
    examples: (l.letter_examples || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((ex) => ({
        word: ex.word,
        transliteration: ex.transliteration,
        meaning: ex.meaning,
      })),
  }))
}