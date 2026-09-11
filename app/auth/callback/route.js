import { NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/portal'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Auth callback failed:', error.message)
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  // After OAuth, email confirmation, or magic link: route by role.
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const dest =
    next === '/portal' && profile?.role === 'instructor' ? '/instructor' : next

  return NextResponse.redirect(`${origin}${dest}`)
}