import '../../globals.css'
import { Manrope, Inter, Cairo } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
})
import Providers from '@/components/Providers.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'

export const metadata = {
  metadataBase: new URL('https://hamztwasl.app'),
  title: {
    default: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    template: '%s | Hamzat Wasl',
  },
  description:
    "Hamzat Wasl helps learners everywhere learn Arabic from the alphabet up, with native instructors, real video lessons, and structured courses.",
  openGraph: {
    title: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    description:
      "Real instructors, structured letter-by-letter courses, and a learning path that shows exactly how far you've come.",
    type: 'website',
  },
}

// Locale → BCP-47 / dir mapping. Add new locales here and in
// middleware.js's LOCALES array; nothing else needs to change.
const LOCALE_META = {
  en: { htmlLang: 'en', dir: 'ltr' },
  ar: { htmlLang: 'ar', dir: 'rtl' },
  zh: { htmlLang: 'zh', dir: 'ltr' },
}

export function generateStaticParams() {
  return Object.keys(LOCALE_META).map((locale) => ({ locale }))
}

export default async function PublicLayout({ children, params }) {
  const { locale } = await params
  const meta = LOCALE_META[locale] || LOCALE_META.en

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${manrope.variable} ${inter.variable} ${cairo.variable}`}
    >
      <body>
        <Providers initialLocale={locale}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
