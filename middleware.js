// middleware.js
import { NextResponse } from 'next/server'
import { updateSession } from './lib/supabase/middleware.js'

// The portal now lives inside the locale tree. These are the paths
// *without* the locale prefix (e.g. checking '/portal', not '/ar/portal')
const PROTECTED_PATHS = ['/portal', '/instructor', '/login', '/register']

// Routes that logged-in users should be redirected away from.
const AUTH_PAGES = ['/login', '/register']

// Routes that must NOT be rewritten to /en/... — they live outside the
// [locale] tree and have their own routing:
//   /auth/*  — the OAuth handshake, needs to run for signed-out users
//   /api/*   — API routes, no layout, no locale
const LOCALE_EXEMPT_PREFIXES = ['/auth', '/api', '/harfbuzzjs', '/fonts']

// Locales served by app/(public)/[locale]/.
// Add a new locale here AND in i18n/metadata.js's LOCALES array;
// nothing else needs to change.
const LOCALES = ['en', 'ar', 'zh']
const DEFAULT_LOCALE = 'en'

export async function middleware(request) {
  const { response, user, supabase } = await updateSession(request)
  const { pathname } = request.nextUrl

  const segments = pathname.split('/').filter(Boolean)
  const firstSeg = segments[0]
  const hasLocalePrefix = LOCALES.includes(firstSeg)
  
  // Determine the path without the locale (e.g. '/ar/portal' -> '/portal')
  const pathWithoutLocale = hasLocalePrefix 
    ? '/' + segments.slice(1).join('/') 
    : pathname

  const isProtected = PROTECTED_PATHS.some((p) => pathWithoutLocale.startsWith(p))
  const isAuthPage = AUTH_PAGES.some((p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + '/'))
  const isLocaleExempt = LOCALE_EXEMPT_PREFIXES.some((p) => pathname.startsWith(p))

  // 1. Handle paths that are missing a locale entirely
  if (!isLocaleExempt && !hasLocalePrefix) {
    const url = request.nextUrl.clone()
    
    // Check if the user is coming from a specific locale page
    const referer = request.headers.get('referer') || ''
    let targetLocale = DEFAULT_LOCALE
    
    if (referer.includes('/ar/') || referer.endsWith('/ar')) targetLocale = 'ar'
    else if (referer.includes('/zh/') || referer.endsWith('/zh')) targetLocale = 'zh'
    
    url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  // Extract the current locale so we can use it in redirects below
  const localePrefix = hasLocalePrefix ? `/${firstSeg}` : ''

  // ---- Auth gates ----

  // 2. If it's a protected route and user is not logged in, go to localized login
  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = `${localePrefix}/login`
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // 3. If it's an auth page and user is already logged in, redirect to correct portal
  if (isAuthPage && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const url = request.nextUrl.clone()
    url.pathname = profile?.role === 'instructor' 
      ? `${localePrefix}/instructor` 
      : `${localePrefix}/portal`
    url.search = ''
    return NextResponse.redirect(url)
  }

  // 4. If accessing instructor routes but role is not instructor/admin, go to portal
  if (pathWithoutLocale.startsWith('/instructor') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'instructor' && profile?.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = `${localePrefix}/portal`
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
  '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|wasm|ttf|otf|woff|woff2|mp3|mp4|webm|json|txt|xml|css|js)$).*)',
  ],
}