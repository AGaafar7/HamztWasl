// lib/queries/videos.js
import { createClient } from '../supabase/server'

/** Fetch all videos (list page). */
export async function fetchVideos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('id, youtube_id, watch_url, title, dialects, level, theme')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data.map(mapVideo)
}

/** Fetch one video with its full transcript (detail page). */
export async function fetchVideo(id) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select(`
      id, youtube_id, watch_url, title, dialects, level, theme,
      video_transcript_lines (
        id, sort_order, time_label, start_sec, end_sec, arabic, gloss,
        video_transcript_words (
          id, sort_order, arabic, start_sec, end_sec, gloss, grammar, root
        )
      )
    `)
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapVideoWithTranscript(data)
}

/**
 * Cross-video word lookup. Normalizes the word, then scans all transcript
 * words for a match. Returns one example per video, not per occurrence.
 *
 * Note: this pulls the whole word table and filters in JS. Fine at this
 * dataset size (~500 words). When you get to thousands of videos, replace
 * with a Postgres function and a trigram index on a normalized column.
 */
export async function findWordExamples(word) {
  const target = normalizeArabicWord(word)
  if (!target) return []

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('video_transcript_words')
    .select(`
      arabic,
      video_transcript_lines!inner (
        arabic, gloss, start_sec, video_id,
        videos!inner ( id, title )
      )
    `)

  if (error) throw error

  const seen = new Set()
  const results = []
  for (const row of data || []) {
    if (normalizeArabicWord(row.arabic) !== target) continue
    const line = row.video_transcript_lines
    const video = line?.videos
    if (!video || seen.has(video.id)) continue
    seen.add(video.id)
    results.push({
      videoId: video.id,
      videoTitle: video.title,
      lineArabic: line.arabic,
      lineGloss: line.gloss,
      startSec: line.start_sec !== null ? Number(line.start_sec) : null,
    })
  }
  return results
}

export function normalizeArabicWord(w) {
  return (w || '')
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[؟،.!؛:"'’]/g, '')
    .trim()
}

function mapVideo(v) {
  return {
    id: v.id,
    youtubeId: v.youtube_id,
    watchUrl: v.watch_url,
    title: v.title,
    dialects: v.dialects || [],
    level: v.level,
    theme: v.theme,
  }
}

function mapVideoWithTranscript(v) {
  const lines = (v.video_transcript_lines || [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((line) => ({
      time: line.time_label,
      startSec: line.start_sec !== null ? Number(line.start_sec) : null,
      endSec: line.end_sec !== null ? Number(line.end_sec) : null,
      arabic: line.arabic,
      gloss: line.gloss,
      words: (line.video_transcript_words || [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((w) => ({
          id: w.id,
          arabic: w.arabic,
          startSec: w.start_sec !== null ? Number(w.start_sec) : null,
          endSec: w.end_sec !== null ? Number(w.end_sec) : null,
          gloss: w.gloss,
          grammar: w.grammar,
          root: w.root,
        })),
    }))
  return { ...mapVideo(v), transcript: lines }
}

/** Used by the "more videos" row at the bottom of the detail page. */
export async function fetchOtherVideos(excludeId, limit = 4) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('id, youtube_id, title')
    .neq('id', excludeId)
    .limit(limit)

  if (error) throw error
  return data.map((v) => ({
    id: v.id,
    youtubeId: v.youtube_id,
    title: v.title,
  }))
}

/**
 * Flat list of every transcript line across every video, each tagged with
 * its parent video's id, title, and youtube id. Used by the listening
 * practice page, which doesn't care which video a line came from.
 */
export async function fetchAllTranscriptLines() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('video_transcript_lines')
    .select(`
      arabic, gloss, start_sec, end_sec,
      videos!inner ( id, youtube_id, title )
    `)
    .order('video_id', { ascending: true })
    .order('sort_order', { ascending: true })

  if (error) throw error

  return (data || []).map((row) => ({
    arabic: row.arabic,
    gloss: row.gloss,
    startSec: row.start_sec !== null ? Number(row.start_sec) : null,
    endSec: row.end_sec !== null ? Number(row.end_sec) : null,
    videoId: row.videos.id,
    youtubeId: row.videos.youtube_id,
    videoTitle: row.videos.title,
  }))
}
