// lib/supabase/server.js
import { cache } from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Cached per-request Supabase server client. React's `cache()` ensures
 * every caller in the same render tree gets the exact same instance, so
 * cookie parsing and connection setup happen once.
 */
export const createClient = cache(async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component — middleware handles refresh.
          }
        },
      },
    }
  )
})

/**
 * Current user, cached per request. Every helper that needs the user id
 * should call this instead of `supabase.auth.getUser()` directly — that
 * used to be a network round-trip that fired 3–5 times per page.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const supabase = await createClient()
  return { supabase, user }
}