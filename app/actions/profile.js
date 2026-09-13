// app/actions/profile.js
'use server'

import { createClient } from '../../lib/supabase/server'

/**
 * Update the current user's profile. Accepts any subset of
 * { fullName, bio, avatarUrl } and only writes the fields provided.
 * Email and role are not editable here (email is managed by Supabase Auth,
 * role is admin-only).
 */
export async function updateProfileAction({ fullName, bio, avatarUrl }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const patch = {}
  if (typeof fullName === 'string') patch.full_name = fullName.trim()
  if (typeof bio === 'string') patch.bio = bio.trim()
  if (typeof avatarUrl === 'string') patch.avatar_url = avatarUrl.trim()

  if (Object.keys(patch).length === 0) return { ok: true }

  const { error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', user.id)
  if (error) throw error
  return { ok: true }
}

export async function updatePasswordAction(newPassword) {
  if (!newPassword || newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters.')
  }
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
  return { ok: true }
}