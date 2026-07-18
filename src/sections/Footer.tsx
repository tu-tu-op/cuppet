import { Logo } from './Navbar'

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-7">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo size="sm" />
          <p className="text-[11px] text-black/35">Work gets done. You get a message.</p>
        </div>
        <nav className="flex items-center gap-6 text-[11px] text-black/45">
          <a href="#how" className="hover:text-black transition-colors">How it works</a>
          <a href="#agents" className="hover:text-black transition-colors">Agents</a>
          <a href="#security" className="hover:text-black transition-colors">Security</a>
          <a href="#examples" className="hover:text-black transition-colors">Examples</a>
        </nav>
        <p className="text-[11px] text-black/25">© 2026 Cuppet</p>
      </div>
    </footer>
  )
}
