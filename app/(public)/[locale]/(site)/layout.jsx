import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'

export default function PublicSiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}