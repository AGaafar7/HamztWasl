import './globals.css'
import Providers from '../components/Providers.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

/**
 * Real server-rendered metadata — this is the actual SEO win of moving to
 * Next.js: these tags are in the HTML on first response, before any JS
 * runs, so crawlers see them immediately (a pure client-side SPA can't do
 * this at all). Per-page metadata can override this in each page.jsx.
 *
 * NOTE: this covers the default English version only. Full multi-language
 * SEO (indexing the AR/ZH content separately) needs locale-based routing
 * (e.g. /ar/..., /zh/...) — a further step beyond this pass, since the
 * language switcher here is still client-side state, not part of the URL.
 */
export const metadata = {
  metadataBase: new URL('https://hamztwasl.app'),
  title: {
    default: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    template: '%s | Hamzat Wasl',
  },
  description:
    'Hamzat Wasl helps learners everywhere learn Arabic from the alphabet up, with native instructors, real video lessons, and structured courses.',
  openGraph: {
    title: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    description:
      'Real instructors, structured letter-by-letter courses, and a learning path that shows exactly how far you\'ve come.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
