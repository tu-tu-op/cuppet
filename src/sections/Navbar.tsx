import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Agents', href: '#agents' },
  { label: 'Security', href: '#security' },
  { label: 'Examples', href: '#examples' },
]

export function Logo({ size = 'md' }: { size?: 'md' | 'sm' }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 group">
      <div
        className={`${size === 'md' ? 'w-8 h-8' : 'w-7 h-7'} rounded-full bg-[#173c2a] flex items-center justify-center transition-transform group-hover:-rotate-6`}
      >
        <span className="font-body text-[11px] font-bold text-[#f5f2e9]">C</span>
      </div>
      <span className="font-body text-[17px] tracking-[-0.03em] text-[#171a17] font-semibold">
        Cuppet
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#f4f2ec]/85 backdrop-blur-xl border-b border-black/10' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-black/55 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold bg-[#173c2a] hover:bg-[#102e20] text-[#f7f4ed] px-4 py-2.5 rounded-full transition-colors"
          >
            Join private beta
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-black/10 bg-white/50 text-[#171a17]"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[#f4f2ec]/95 backdrop-blur-xl border-b border-black/10 px-5 pb-5 pt-2 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-black/65 hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold bg-[#173c2a] text-[#f7f4ed] px-4 py-2.5 rounded-full"
          >
            Join private beta
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </header>
  )
}
