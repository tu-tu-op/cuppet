import { Link } from 'react-router'
import { Logo } from './Navbar'

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-7">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo size="sm" />
          <p className="text-[11px] text-black/35">Work gets done. You get a message.</p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] text-black/45">
          <Link to="/" className="hover:text-black transition-colors">Product</Link>
          <Link to="/about" className="hover:text-black transition-colors">About Us</Link>
          <Link to="/blog" className="hover:text-black transition-colors">Blog</Link>
          <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-black transition-colors">Terms</Link>
        </nav>
        <p className="text-[11px] text-black/25">© 2026 Cuppet</p>
      </div>
    </footer>
  )
}
