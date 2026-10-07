'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

const LOCALE_DIRS = {
  en: 'ltr',
  ar: 'rtl',
  zh: 'ltr',
}

/**
 * The URL is the source of truth for the language. `initialLocale`
 * is passed in from the layout (server-rendered from the [locale] param),
 * so the very first render already has the correct lang/dir, and
 * crawlers see the right values without running any JS.
 */
export function LanguageProvider({ children, initialLocale = 'en' }) {
  const [lang, setLangState] = useState(initialLocale)
  const dir = LOCALE_DIRS[lang] || 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  // Kept for any component that still calls setLang — but now it's
  // a no-op state setter. Real navigation is done by LanguageSwitcher
  // pushing a new URL. Will be removed once all callers migrate.
  const setLang = (l) => setLangState(l)

  // Kept for old callers; LanguageSwitcher no longer uses it.
  const toggleLang = () => setLangState((l) => (l === 'en' ? 'ar' : 'en'))

  return (
    <LanguageContext.Provider
      value={{ lang, dir, t: translations[lang] || translations.en, setLang, toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}