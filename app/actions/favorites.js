// app/actions/favorites.js
'use server'

import { createClient } from '../../lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleFavoriteAction(videoId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: deleted } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('video_id', videoId)
    .select('video_id')

  if (deleted && deleted.length > 0) {
    revalidatePath('/', 'layout')
    return { favorited: false }
  }

  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: user.id, video_id: videoId })

  if (error) throw error
  
  revalidatePath('/', 'layout')
  return { favorited: true }
}