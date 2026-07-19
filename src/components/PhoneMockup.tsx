import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCheck,
  ChevronLeft,
  MoreVertical,
  Phone,
  Sparkles,
  Newspaper,
  CalendarClock,
  Send,
  Plus,
  Mic,
} from 'lucide-react'

type Msg =
  | { kind: 'date'; text: string }
  | { kind: 'in'; text: string; time: string }
  | { kind: 'digest'; time: string }
  | { kind: 'out'; text: string; time: string }
  | { kind: 'typing' }
  | { kind: 'chip'; text: string; sub: string }

const SCRIPT: { delay: number; msg: Msg }[] = [
  { delay: 500, msg: { kind: 'date', text: 'Today' } },
  {
    delay: 900,
    msg: { kind: 'in', text: 'Good morning. Your 7:00 AM tech digest is ready — 3 stories worth your attention today.', time: '7:00 AM' },
  },
  { delay: 1400, msg: { kind: 'digest', time: '7:00 AM' } },
  { delay: 1600, msg: { kind: 'typing' } },
  {
    delay: 1800,
    msg: { kind: 'in', text: 'Want a deeper dive on any of these? Just reply here.', time: '7:01 AM' },
  },
  {
    delay: 2000,
    msg: { kind: 'out', text: 'Add a startups section from tomorrow', time: '7:12 AM' },
  },
  { delay: 1200, msg: { kind: 'typing' } },
  {
    delay: 1700,
    msg: { kind: 'in', text: 'Done. Your digest now includes a startups section — starting tomorrow, 7:00 AM sharp.', time: '7:12 AM' },
  },
  { delay: 1000, msg: { kind: 'chip', text: 'Next run', sub: 'Tomorrow · 7:00 AM' } },
]

function Ticks() {
  return (
    <span className="inline-flex items-center ml-1.5 align-middle">
      <CheckCheck className="w-3.5 h-3.5 text-[#b7d3bd]" />
    </span>
  )
}

function DigestCard() {
  const items = [
    { tag: 'AI', title: 'Open-weight models close the gap with frontier labs' },
    { tag: 'Chips', title: 'Next-gen accelerators push inference costs down 40%' },
    { tag: 'Dev', title: 'Agent frameworks become the default app backend' },
  ]
  return (
    <div className="mt-1 rounded-xl overflow-hidden border border-black/[0.08] bg-[#F5F3EE]">
      <div className="px-3 py-2 flex items-center gap-2 border-b border-black/[0.08] bg-[#dde8df]">
        <Newspaper className="w-3.5 h-3.5 text-[#2c6042]" />
        <span className="text-[11px] font-semibold text-[#24583b] tracking-wide uppercase">
          Tech Digest · 3 stories
        </span>
      </div>
      <div className="divide-y divide-black/[0.06]">
        {items.map((it) => (
          <div key={it.title} className="px-3 py-2">
            <span className="text-[9px] font-bold text-[#2c6042] uppercase tracking-widest">{it.tag}</span>
            <p className="text-[12px] leading-snug text-black/70 mt-0.5">{it.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PhoneMockup() {
  const [step, setStep] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step >= SCRIPT.length) {
      const t = setTimeout(() => setStep(0), 5200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), SCRIPT[step].delay)
    return () => clearTimeout(t)
  }, [step])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [step])

  const visible = SCRIPT.slice(0, step).map((s) => s.msg)

  return (
    <div className="relative w-full max-w-[390px] select-none">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 -top-3 z-20 h-8 w-8 border-l border-t border-[#173c2a]/45"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-3 z-20 h-8 w-8 border-r border-t border-[#173c2a]/45"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -left-3 z-20 h-8 w-8 border-b border-l border-[#173c2a]/45"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 z-20 h-8 w-8 border-b border-r border-[#173c2a]/45"
      />
      <div className="relative h-[620px] overflow-hidden bg-[#F5F3EE] flex flex-col shadow-[0_28px_70px_-42px_rgba(12,25,17,0.4)]">
          {/* Chat header */}
          <div className="py-3.5 px-3 flex items-center gap-2.5 bg-[#efede8] border-b border-black/[0.08] z-10">
            <ChevronLeft className="w-5 h-5 text-black/40 -ml-1" />
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#24583b] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#F5F3EE]" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#67a476] border-2 border-[#efede8]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#171a17] leading-tight">Tech News Agent</p>
              <p className="text-[10.5px] text-[#2c6042] leading-tight">scheduled · daily 7:00 AM</p>
            </div>
            <Phone className="w-4 h-4 text-black/30" />
            <MoreVertical className="w-4 h-4 text-black/30" />
          </div>

          {/* Chat body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2 scrollbar-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(23,60,42,0.07) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <AnimatePresence initial={false}>
              {visible.map((m, i) => (
                <motion.div
                  key={`${step === 0 ? 'reset' : 'run'}-${i}`}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={
                    m.kind === 'out'
                      ? 'flex justify-end'
                      : m.kind === 'date' || m.kind === 'chip'
                        ? 'flex justify-center'
                        : 'flex justify-start'
                  }
                >
                  {m.kind === 'date' && (
                    <span className="text-[10px] font-medium text-black/45 bg-[#e5e6e0] px-3 py-1 rounded-full border border-black/[0.06]">
                      {m.text}
                    </span>
                  )}

                  {m.kind === 'in' && (
                    <div className="max-w-[82%] bg-[#e7e8e2] rounded-2xl rounded-tl-sm px-3 py-2">
                      <p className="text-[13px] leading-snug text-black/70">{m.text}</p>
                      <p className="text-[9.5px] text-black/35 text-right mt-1">{m.time}</p>
                    </div>
                  )}

                  {m.kind === 'digest' && (
                    <div className="max-w-[88%] bg-[#e7e8e2] rounded-2xl rounded-tl-sm px-2.5 py-2">
                      <DigestCard />
                      <p className="text-[9.5px] text-black/35 text-right mt-1 px-1">{m.time}</p>
                    </div>
                  )}

                  {m.kind === 'out' && (
                    <div className="max-w-[80%] bg-[#24583b] rounded-2xl rounded-tr-sm px-3 py-2">
                      <p className="text-[13px] leading-snug text-[#F5F3EE]">
                        {m.text}
                        <Ticks />
                      </p>
                      <p className="text-[9.5px] text-[#F5F3EE]/45 text-right mt-0.5">{m.time}</p>
                    </div>
                  )}

                  {m.kind === 'typing' && (
                    <div className="bg-[#e7e8e2] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="typing-dot w-1.5 h-1.5 rounded-full bg-black/30"
                          style={{ animationDelay: `${d * 0.18}s` }}
                        />
                      ))}
                    </div>
                  )}

                  {m.kind === 'chip' && (
                    <span className="flex items-center gap-2 text-[10.5px] font-medium text-[#24583b] bg-[#dde8df] border border-[#2c6042]/15 px-3.5 py-1.5 rounded-full">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {m.text}: <span className="text-[#2c6042] font-semibold">{m.sub}</span>
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="px-2.5 pb-4 pt-2 bg-[#efede8] border-t border-black/[0.06] flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-[#dedfd9] rounded-full px-3.5 py-2.5">
              <Plus className="w-4 h-4 text-black/35" />
              <span className="text-[12.5px] text-black/35 flex-1">Message</span>
              <Mic className="w-4 h-4 text-black/35" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#24583b] flex items-center justify-center">
              <Send className="w-4 h-4 text-[#F5F3EE] -ml-0.5" />
            </div>
          </div>
      </div>

    </div>
  )
}
