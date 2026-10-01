'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

/**
 * Cancels the subscription. Clears the expiry date and locks practice
 * access immediately. Cancel is final — the user cannot undo it, and
 * must subscribe again (paying $25) to restore access.
 */
export async function cancelSubscriptionAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_expires_at: null,
      subscription_cancelled: true,
    })
    .eq('id', user.id)

  if (error) throw error

  revalidatePath('/portal/billing')
  revalidatePath('/portal/listening')
  revalidatePath('/portal/reading')
  revalidatePath('/portal/speaking')
  revalidatePath('/portal/writing')
  return { ok: true }
}