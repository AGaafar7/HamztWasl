// app/auth/callback/route.js
import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')
  const next = searchParams.get('next') ?? '/portal'

  // Google / Apple sometimes bounce back with an error before we even get a code.
  if (errorParam) {
    console.error('OAuth error from provider:', errorParam)
    return NextResponse.redirect(`${origin}/login?error=${errorParam}`)
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  try {
    const supabase = await createClient()

    // 1. Exchange the code — this gives us the session AND the user in one round-trip.
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth callback exchange failed:', error.message)
      return NextResponse.redirect(`${origin}/login?error=auth_failed`)
    }

    const user = data?.user
    if (!user) {
      return NextResponse.redirect(`${origin}/login?error=no_user`)
    }

    // 2. One DB query for the role. Wrapped so a transient failure can't
    // 500 the whole callback — a student-default is fine to fall back on.
    let role = 'student'
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      if (profile?.role) role = profile.role
    } catch (e) {
      console.error('Profile lookup failed, defaulting to student:', e)
    }

    const dest =
      next === '/portal' && (role === 'instructor' || role === 'admin')
        ? '/instructor'
        : next

    return NextResponse.redirect(`${origin}${dest}`)
  } catch (err) {
    console.error('Auth callback unexpected error:', err)
    return NextResponse.redirect(`${origin}/login?error=callback_failed`)
  }
}