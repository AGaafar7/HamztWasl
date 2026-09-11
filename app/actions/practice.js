// app/actions/practice.js
'use server'

import { createClient } from '../../lib/supabase/server'

/**
 * Records a practice attempt. `type` is one of 'listening' | 'reading' |
 * 'speaking'. `refId` is whatever identifies the target (video id,
 * exercise id, or the letter/word). `score` is 0-100. `details` is
 * free-form JSON — the specifics of each practice flow.
 *
 * Fire-and-forget from the client's perspective; nothing is displayed
 * from these rows yet. When we build a stats page, this data is ready.
 */
export async function recordPracticeAttemptAction({ type, refId, score, details }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const cleanScore = Math.max(0, Math.min(100, Math.round(Number(score) || 0)))

  const { error } = await supabase
    .from('practice_attempts')
    .insert({
      user_id: user.id,
      practice_type: type,
      ref_id: refId || null,
      score: cleanScore,
      details: details || null,
    })

  if (error) throw error
  return { recorded: true }
}