// lib/queries/lessons-content.js
import { createClient } from '../supabase/server'

/**
 * Small list for the lesson picker: all videos, so an instructor can
 * attach one to a course lesson.
 */
export async function fetchVideoChoices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select('id, title, youtube_id')
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data || []).map((v) => ({
    id: v.id,
    title: v.title,
    youtubeId: v.youtube_id,
  }))
}