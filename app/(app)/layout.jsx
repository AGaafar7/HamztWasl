import '../globals.css'
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

export default function AppLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${manrope.variable} ${inter.variable} ${cairo.variable}`}
    >
      <body>
        <Providers initialLocale="en">
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
