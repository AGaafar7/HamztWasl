// app/actions/video-admin.js
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6)
}

export async function createVideoWithTranscriptAction(videoData, lines) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const titleEn = (videoData.titleEn || '').trim()
  if (!titleEn) throw new Error('English title is required')
  if (!videoData.youtubeId) throw new Error('YouTube URL is required')

  let baseId = slugify(titleEn) || `video-${Date.now()}`
  let id = baseId
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data: existing } = await supabase
      .from('videos').select('id').eq('id', id).maybeSingle()
    if (!existing) break
    id = `${baseId}-${randomSuffix()}`
  }

  const watchUrl = `https://www.youtube.com/watch?v=${videoData.youtubeId}`

  const { error: videoErr } = await supabase.from('videos').insert({
    id,
    youtube_id: videoData.youtubeId,
    watch_url: watchUrl,
    title: {
      en: titleEn,
      ar: (videoData.titleAr || '').trim() || titleEn,
      zh: (videoData.titleZh || '').trim() || titleEn,
    },
    dialects: videoData.dialects || [],
    level: videoData.level || 'beginner',
    theme: videoData.theme || 't1',
  })
  if (videoErr) throw videoErr

  if (lines && lines.length > 0) {
    const lineRows = lines.map((line, i) => ({
      video_id: id,
      sort_order: i,
      time_label: line.time,
      start_sec: line.startSec ?? null,
      end_sec: line.endSec ?? null,
      arabic: line.arabic,
      gloss: line.gloss || null,
    }))

    const { data: insertedLines, error: lineErr } = await supabase
      .from('video_transcript_lines')
      .insert(lineRows)
      .select('id, sort_order')
    if (lineErr) throw lineErr

    const lineIdByOrder = Object.fromEntries(
      insertedLines.map((r) => [r.sort_order, r.id])
    )

    const wordRows = []
    lines.forEach((line, i) => {
      if (!line.words?.length) return
      line.words.forEach((w, wi) => {
        wordRows.push({
          line_id: lineIdByOrder[i],
          sort_order: wi,
          arabic: w.arabic,
          start_sec: w.startSec ?? null,
          end_sec: w.endSec ?? null,
          gloss: w.gloss || null,
          grammar: w.grammar || null,
          root: w.root || null,
        })
      })
    })

    if (wordRows.length > 0) {
      const { error: wordErr } = await supabase
        .from('video_transcript_words')
        .insert(wordRows)
      if (wordErr) throw wordErr
    }
  }

  revalidatePath('/', 'layout')
  return { id }
}

export async function updateWordAction(wordId, patch) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const update = {}
  if ('arabic' in patch) update.arabic = patch.arabic
  if ('gloss' in patch) update.gloss = patch.gloss
  if ('grammar' in patch) update.grammar = patch.grammar
  if ('root' in patch) update.root = patch.root

  const { error } = await supabase
    .from('video_transcript_words')
    .update(update)
    .eq('id', wordId)
  if (error) throw error
  return { ok: true }
}

export async function deleteVideoAction(videoId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('videos').delete().eq('id', videoId)
  if (error) throw error

  revalidatePath('/', 'layout')
  return { ok: true }
}