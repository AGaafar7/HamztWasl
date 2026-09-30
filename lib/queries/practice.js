// lib/queries/practice.js
import { createClient, getCurrentUser } from '../supabase/server'

/**
 * Fetch the current user's attempts for one lesson's multiple-choice quiz.
 * Returns a map of { questionId: { attempts, correct, lastPickedId } }.
 */
export async function fetchMultipleChoiceAttempts(lessonId) {
  const user = await getCurrentUser()
  if (!user) return {}

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('practice_attempts')
    .select('ref_id, score, details, created_at')
    .eq('user_id', user.id)
    .eq('practice_type', 'multiplechoice')
    .like('ref_id', `${lessonId}:%`)
    .order('created_at', { ascending: true })

  if (error) throw error

  const byQuestion = {}
  for (const row of data || []) {
    const qid = row.details?.question_id
    if (!qid) continue
    if (!byQuestion[qid]) {
      byQuestion[qid] = { attempts: 0, correct: false, lastPickedId: null }
    }
    byQuestion[qid].attempts += 1
    byQuestion[qid].lastPickedId = row.details?.picked_option_id || null
    if (row.score >= 100) byQuestion[qid].correct = true
  }
  return byQuestion
}