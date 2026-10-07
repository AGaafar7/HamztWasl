'use client'

import { LanguageProvider } from '../i18n/LanguageContext.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'

export default function Providers({ children, initialLocale = 'en' }) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  )
}