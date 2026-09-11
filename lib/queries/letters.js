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
      letter_pronunciations ( dialect, audio_url )
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
  return {
    ...mapLetter(l),
    examples: (l.letter_examples || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((ex) => ({
        word: ex.word,
        transliteration: ex.transliteration,
        meaning: ex.meaning,
      })),
    // { msa: 'https://…', egyptian: 'https://…' } — empty object until you
    // add rows to letter_pronunciations, which is fine: the client falls
    // back to TTS for any dialect missing here.
    pronunciations: Object.fromEntries(
      (l.letter_pronunciations || []).map((p) => [p.dialect, p.audio_url])
    ),
  }
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