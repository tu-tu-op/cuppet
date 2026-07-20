import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'

export default function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView()
      } else {
        window.scrollTo({ top: 0 })
      }
    })
    return () => window.cancelAnimationFrame(frame)
  }, [location.hash, location.pathname])

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--paper)] text-[var(--ink)]">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
