// middleware.js
import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware.js'

// Routes that require a logged-in user.
const PROTECTED_PREFIXES = ['/portal', '/instructor']

// Routes that logged-in users should be redirected away from.
const AUTH_PAGES = ['/login', '/register']

// Locales served by app/(public)/[locale]/.
// Add a new locale here AND in i18n/metadata.js's LOCALES array;
// nothing else needs to change.
const LOCALES = ['en', 'ar', 'zh']
const DEFAULT_LOCALE = 'en'

export async function middleware(request) {
  const { response, user, supabase } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Never rewrite API routes — they live at app/api/* with no layout,
  // no locale, and rewriting them would break fetch calls from the client.
  if (pathname.startsWith('/api/')) return response

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  const isAuthPage = AUTH_PAGES.includes(pathname)

  // Rewrite bare public paths to the default locale, so:
  //   /            → internally /en
  //   /terms       → internally /en/terms
  //   /privacy     → internally /en/privacy
  // The browser URL stays bare. This is a rewrite, not a redirect.
  // Paths that already start with /ar or /zh are left alone.
  const segments = pathname.split('/').filter(Boolean)
  const firstSeg = segments[0]
  const hasLocalePrefix = LOCALES.includes(firstSeg)

  if (!isProtected && !isAuthPage && !hasLocalePrefix) {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // ---- Auth gates (unchanged from before) ----

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthPage && user) {
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
  // Run on everything except static assets and Next internals.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)',
  ],
}