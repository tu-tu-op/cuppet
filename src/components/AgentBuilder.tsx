import { useState } from 'react'
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

  return { name, schedule, cron, task: raw.trim().replace(/[.]+$/, ''), Icon }
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
    window.setTimeout(() => {
      setAgent(parsePrompt(text))
      setBuilding(false)
    }, 700)
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-black/10 bg-[var(--ink)] p-5 surface-elevated sm:p-8">
      <div className="mb-7 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgba(245,243,238,0.5)]">
          <Wand2 className="h-3.5 w-3.5 text-[#9ac3a3]" />
          Build an agent
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-[rgba(245,243,238,0.35)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78b88a]" />
          Live preview
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && create(value)}
          placeholder="e.g. Summarize my emails every evening at 6pm"
          className="flex-1 rounded-xl border border-[rgba(245,243,238,0.1)] bg-[rgba(245,243,238,0.05)] px-5 py-3.5 text-sm text-[var(--paper)] outline-none placeholder:text-[rgba(245,243,238,0.3)] focus:border-[rgba(245,243,238,0.3)]"
        />
        <button
          onClick={() => create(value)}
          disabled={building || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--paper)] px-6 py-3.5 text-sm font-semibold text-[var(--forest)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Sparkles className="h-4 w-4" />
          {building ? 'Creating…' : 'Create agent'}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => create(p)}
            className="rounded-full border border-[rgba(245,243,238,0.1)] px-3.5 py-1.5 text-[11px] text-[rgba(245,243,238,0.45)] transition-colors hover:border-[rgba(245,243,238,0.2)] hover:text-[rgba(245,243,238,0.8)]"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[120px]">
        {building && (
          <p className="flex items-center justify-center gap-3 py-10 text-sm text-[rgba(245,243,238,0.45)]">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="typing-dot h-2 w-2 rounded-full bg-[#78b88a]"
                  style={{ animationDelay: `${d * 0.18}s` }}
                />
              ))}
            </span>
            Parsing your sentence…
          </p>
        )}

        {agent && !building && (
          <div className="rounded-2xl border border-[rgba(245,243,238,0.1)] bg-[rgba(245,243,238,0.05)] p-5">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dce7dc]">
                  <agent.Icon className="h-5 w-5 text-[var(--forest)]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--ink)] bg-[#78b88a]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--paper)]">{agent.name}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(245,243,238,0.05)] px-2 py-0.5 text-[10px] font-semibold text-[#b7d3bd]">
                    <Check className="h-3 w-3" />
                    Added to your chats
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[rgba(245,243,238,0.45)]">
                  “{agent.task}”
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(245,243,238,0.1)] bg-[rgba(245,243,238,0.05)] px-3 py-1 text-[11px] font-medium text-[#c5dec9]">
                    <CalendarClock className="h-3.5 w-3.5" />
                    {agent.schedule}
                  </span>
                  <code className="rounded-full border border-[rgba(245,243,238,0.1)] bg-black/20 px-3 py-1 font-mono text-[10.5px] text-[rgba(245,243,238,0.3)]">
                    cron · {agent.cron}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {!agent && !building && (
          <p className="py-10 text-center text-xs text-[rgba(245,243,238,0.25)]">
            Your new agent will appear here as a contact — ready to message you on schedule.
          </p>
        )}
      </div>
    </div>
  )
}
