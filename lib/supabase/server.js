import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Server-side Supabase client. Use in Server Components, Server Actions,
 * and Route Handlers. Reads/writes the session cookie so RLS runs as the
 * logged-in user, not as a service role.
 */
export async function createClient() {
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
            // Called from a Server Component — safe to ignore, the
            // middleware refreshes the session cookie instead.
          }
        },
      },
    }
  )
}

/**
 * Like createClient(), but guarantees a signed-in user. If there's no
 * session it redirects to /login instead of letting the page crash on
 * `user.id`. Use this in any Server Component that assumes auth.
 */
export async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return { supabase, user }
}