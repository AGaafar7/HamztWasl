// lib/queries/admin-videos.js
import { createClient } from '../supabase/server'

/** List of all videos for the instructor videos dashboard. */
export async function fetchAllVideosForAdmin() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('videos')
    .select(`
      id, youtube_id, title, dialects, level, theme, created_at,
      video_transcript_lines ( id )
    `)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map((v) => ({
    id: v.id,
    youtubeId: v.youtube_id,
    title: v.title,
    dialects: v.dialects || [],
    level: v.level,
    theme: v.theme,
    lineCount: v.video_transcript_lines?.length || 0,
    createdAt: v.created_at,
  }))
}