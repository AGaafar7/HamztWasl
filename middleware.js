import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware.js'

// Routes that require a logged-in user.
const PROTECTED_PREFIXES = ['/portal', '/instructor']

// Routes that logged-in users should be redirected away from.
const AUTH_PAGES = ['/login', '/register']

export async function middleware(request) {
  const { response, user, supabase } = await updateSession(request)
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (AUTH_PAGES.includes(pathname) && user) {
    // Send them to the right portal based on their role.
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    url.pathname = profile?.role === 'instructor' ? '/instructor' : '/portal'
    url.search = ''
    return NextResponse.redirect(url)
  }

  // Instructor routes: only instructors/admins.
  if (pathname.startsWith('/instructor') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'instructor' && profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/portal'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  // Run on everything except static assets and the Next internals.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)',
  ],
}