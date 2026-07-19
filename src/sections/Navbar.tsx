import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, NavLink } from 'react-router'

const LINKS = [
  { label: 'Product', href: '/', end: true },
  { label: 'About Us', href: '/about', end: false },
  { label: 'Blog', href: '/blog', end: false },
]

export function Logo({
  size = 'md',
  onNavigate,
}: {
  size?: 'md' | 'sm'
  onNavigate?: () => void
}) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="group flex items-center gap-2.5"
      aria-label="Cuppet home"
    >
      <img
        src="/cuppet-icon-full-color.svg"
        alt=""
        width={size === 'md' ? 34 : 30}
        height={size === 'md' ? 34 : 30}
        className={`shrink-0 object-contain transition-transform duration-300 group-hover:-rotate-6 ${
          size === 'md' ? 'h-[34px] w-[34px]' : 'h-[30px] w-[30px]'
        }`}
      />
      <span className="font-body text-[17px] tracking-[-0.03em] text-[#171a17] font-semibold">
        Cuppet
      </span>
    </Link>
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

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#F5F3EE]/85 backdrop-blur-xl border-b border-black/10' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo onNavigate={() => setOpen(false)} />

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end={l.end}
              className={({ isActive }) =>
                `relative py-2 text-[13px] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-[#173c2a] after:transition-transform ${
                  isActive
                    ? 'text-[#171a17] after:scale-x-100'
                    : 'text-black/55 after:scale-x-0 hover:text-black hover:after:scale-x-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/#cta"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold bg-[#173c2a] hover:bg-[#102e20] text-[#F5F3EE] px-4 py-2.5 rounded-full transition-colors"
          >
            Join private beta
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-black/10 bg-[#F5F3EE]/60 text-[#171a17]"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-[#F5F3EE]/95 backdrop-blur-xl border-b border-black/10 px-5 pb-5 pt-2 space-y-1"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block border-b border-black/[0.06] py-3 text-sm transition-colors ${
                  isActive ? 'font-semibold text-[#173c2a]' : 'text-black/60 hover:text-black'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/#cta"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold bg-[#173c2a] text-[#F5F3EE] px-4 py-2.5 rounded-full"
          >
            Join private beta
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
  )
}
