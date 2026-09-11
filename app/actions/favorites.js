// app/actions/favorites.js
'use server'

import { createClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'
/**
 * Toggles the current user's favorite for a video. Returns the new state
 * so the client can reconcile if it wants, but the client also does an
 * optimistic update for instant feedback.
 */
export async function toggleFavoriteAction(videoId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Try to delete first. If a row existed, we've unfavorited it.
  const { data: deleted } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('video_id', videoId)
    .select('video_id')

  if (deleted && deleted.length > 0) {
    revalidatePath('/portal/videos')
    return { favorited: false }
  }

  // No row existed — insert one.
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, video_id: videoId })

  if (error) throw error
  revalidatePath('/portal/videos')
  return { favorited: true }
}