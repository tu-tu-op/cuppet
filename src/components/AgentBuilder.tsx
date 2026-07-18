import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  CalendarClock,
  Check,
  Github,
  GraduationCap,
  HardDrive,
  Inbox,
  Newspaper,
  Sparkles,
  Wand2,
} from 'lucide-react'

type Parsed = {
  name: string
  schedule: string
  cron: string
  task: string
  Icon: typeof Sparkles
}

const PRESETS = [
  'Deliver me tech news every morning at 7am',
  'Summarize my emails every evening at 6pm',
  'Give me a weekly Drive folder change report every Friday',
  'Create a study plan for my JEE exam on November 15th',
]

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function parsePrompt(raw: string): Parsed {
  const lower = raw.toLowerCase()

  // --- time ---
  let hour24: number | null = null
  let minute = 0
  let timeLabel = ''
  const t = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/)
  if (t) {
    let h = parseInt(t[1], 10)
    minute = t[2] ? parseInt(t[2], 10) : 0
    if (t[3] === 'pm' && h !== 12) h += 12
    if (t[3] === 'am' && h === 12) h = 0
    hour24 = h
    timeLabel = `${t[1]}:${pad(minute)} ${t[3].toUpperCase()}`
  } else if (lower.includes('morning')) {
    hour24 = 7
    timeLabel = '7:00 AM'
  } else if (lower.includes('evening')) {
    hour24 = 18
    timeLabel = '6:00 PM'
  } else if (lower.includes('afternoon')) {
    hour24 = 15
    timeLabel = '3:00 PM'
  } else if (lower.includes('night')) {
    hour24 = 21
    timeLabel = '9:00 PM'
  }

  // --- recurrence ---
  const dayHit = DAYS.find((d) => lower.includes(d))
  const monthHit = MONTHS.find((m) => lower.includes(m))
  const dateNum = monthHit ? lower.match(/(\d{1,2})(?:st|nd|rd|th)?/) : null

  let schedule = 'On demand'
  let cron = 'manual trigger'
  const timePart = timeLabel ? ` · ${timeLabel}` : ''
  const cronTime = hour24 !== null ? `${minute} ${hour24}` : '0 9'

  if (lower.includes('weekly') || dayHit) {
    const dayName = dayHit ? dayHit[0].toUpperCase() + dayHit.slice(1) : 'Friday'
    const dow = dayHit ? DAYS.indexOf(dayHit) : 5
    schedule = `Weekly · ${dayName}${timePart}`
    cron = `${cronTime} * * ${dow}`
  } else if (/\b(every|daily|each)\b/.test(lower)) {
    schedule = `Daily${timePart}`
    cron = `${cronTime} * * *`
  } else if (monthHit && dateNum) {
    const mon = MONTHS.indexOf(monthHit) + 1
    const d = parseInt(dateNum[1], 10)
    const monShort = monthHit.slice(0, 3)
    schedule = `One-time · ${monShort[0].toUpperCase() + monShort.slice(1)} ${d}${timePart}`
    cron = `${cronTime} ${d} ${mon} *`
  }

  // --- agent identity ---
  let name = 'Custom Agent'
  let Icon: typeof Sparkles = Sparkles
  if (lower.includes('news')) {
    name = 'Tech News Agent'
    Icon = Newspaper
  } else if (lower.includes('email') || lower.includes('mail') || lower.includes('inbox')) {
    name = 'Inbox Summary Agent'
    Icon = Inbox
  } else if (lower.includes('drive') || lower.includes('folder') || lower.includes('file')) {
    name = 'Drive Watch Agent'
    Icon = HardDrive
  } else if (lower.includes('study') || lower.includes('jee') || lower.includes('exam')) {
    name = 'Study Coach Agent'
    Icon = GraduationCap
  } else if (lower.includes('calendar') || lower.includes('meeting') || lower.includes('schedule')) {
    name = 'Calendar Brief Agent'
    Icon = Calendar
  } else if (lower.includes('github') || lower.includes('repo') || lower.includes('issue')) {
    name = 'Repo Watch Agent'
    Icon = Github
  }

  const task = raw.trim().replace(/[.]+$/, '')
  return { name, schedule, cron, task, Icon }
}

export default function AgentBuilder() {
  const [value, setValue] = useState('')
  const [agent, setAgent] = useState<Parsed | null>(null)
  const [building, setBuilding] = useState(false)

  const create = (text: string) => {
    if (!text.trim() || building) return
    setValue(text)
    setBuilding(true)
    setAgent(null)
    setTimeout(() => {
      setAgent(parsePrompt(text))
      setBuilding(false)
    }, 900)
  }

  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-[#171a17] p-5 sm:p-8 max-w-3xl mx-auto shadow-[0_30px_80px_-50px_rgba(10,25,16,0.7)]">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
          <Wand2 className="w-3.5 h-3.5 text-[#9ac3a3]" />
          Build an agent
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78b88a]" />
          Live preview
        </span>
      </div>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && create(value)}
          placeholder="e.g. Summarize my emails every evening at 6pm"
          className="flex-1 bg-white/[0.055] border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/5 outline-none rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 transition-all"
        />
        <button
          onClick={() => create(value)}
          disabled={building || !value.trim()}
          className="inline-flex items-center justify-center gap-2 bg-[#edf1e9] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[#173c2a] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {building ? 'Creating…' : 'Create agent'}
        </button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mt-4">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => create(p)}
            className="text-[11px] text-white/45 hover:text-white/80 bg-white/[0.025] border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="mt-6 min-h-[132px]">
        <AnimatePresence mode="wait">
          {building && (
            <motion.div
              key="building"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-sm text-white/45 py-10 justify-center"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="typing-dot w-2 h-2 rounded-full bg-[#78b88a]"
                    style={{ animationDelay: `${d * 0.18}s` }}
                  />
                ))}
              </div>
              Parsing your sentence, scheduling the run…
            </motion.div>
          )}

          {agent && !building && (
            <motion.div
              key={agent.task + agent.schedule}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="rounded-2xl border border-white/10 bg-white/[0.055] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#dce7dc] flex items-center justify-center">
                    <agent.Icon className="w-5 h-5 text-[#173c2a]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#78b88a] border-2 border-[#171a17]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-white text-sm">{agent.name}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#b7d3bd] bg-white/[0.06] rounded-full px-2 py-0.5">
                      <Check className="w-3 h-3" />
                      Added to your chats
                    </span>
                  </div>
                  <p className="text-xs text-white/45 mt-1 line-clamp-2">“{agent.task}”</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#c5dec9] bg-white/[0.04] border border-white/10 rounded-full px-3 py-1">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {agent.schedule}
                    </span>
                    <code className="text-[10.5px] font-mono text-white/30 bg-black/20 border border-white/10 rounded-full px-3 py-1">
                      cron · {agent.cron}
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!agent && !building && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-white/25 py-10"
            >
              Your new agent will appear here as a contact — ready to message you on schedule.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
