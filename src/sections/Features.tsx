import { motion } from 'framer-motion'
import {
  Calendar,
  CalendarClock,
  Github,
  HardDrive,
  Inbox,
  Mail,
  MessagesSquare,
  Newspaper,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

function ContactRow({
  Icon,
  name,
  schedule,
  preview,
  time,
  unread,
}: {
  Icon: typeof Newspaper
  name: string
  schedule: string
  preview: string
  time: string
  unread?: number
}) {
  return (
    <div className="flex items-center gap-4 border-b border-black/[0.07] px-4 py-4 last:border-b-0 sm:px-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0e9df]">
        <Icon className="h-4 w-4 text-[#24583b]" strokeWidth={1.7} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[13px] font-semibold text-[#171a17]">{name}</p>
          <span className="shrink-0 text-[10px] font-medium text-[#2c6042]">{time}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] text-black/45">{preview}</p>
          {unread && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#24583b] text-[9px] font-bold text-white">
              {unread}
            </span>
          )}
        </div>
        <p className="mt-1 flex items-center gap-1 text-[9px] uppercase tracking-[0.08em] text-black/30">
          <CalendarClock className="h-2.5 w-2.5" />
          {schedule}
        </p>
      </div>
    </div>
  )
}

function SourceChip({ Icon, label }: { Icon: typeof Mail; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/50 px-2.5 py-1 text-[9.5px] font-medium text-black/55">
      <Icon className="h-3 w-3 text-[#2c6042]" />
      {label}
    </span>
  )
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

export default function Features() {
  return (
    <section id="agents" className="border-y border-black/10 bg-[#eae8e1] py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The product"
          title={<>An inbox for work that runs itself.</>}
          sub="Scheduled agents and connected conversations live together, so delegating work feels as natural as sending a message."
          align="left"
        />

        <motion.div
          {...reveal}
          className="mt-20 grid items-center gap-10 border-t border-black/10 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <div className="max-w-sm">
            <span className="font-mono text-[10px] text-black/30">01 / SCHEDULED AGENTS</span>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[#171a17]">
              Give recurring work a name and a schedule.
            </h3>
            <p className="mt-4 text-sm leading-6 text-black/50">
              Each routine becomes a contact in your inbox. It runs when promised and only
              interrupts you when the result is ready.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f8f7f2] shadow-[0_24px_60px_-48px_rgba(15,28,19,0.5)]">
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Agent inbox
              </p>
              <span className="flex items-center gap-1.5 text-[10px] text-black/35">
                <span className="h-1.5 w-1.5 rounded-full bg-[#43855b]" />
                3 active
              </span>
            </div>
            <ContactRow
              Icon={Newspaper}
              name="Tech brief"
              schedule="Daily · 7:00 AM"
              preview="Three stories worth your attention this morning"
              time="7:00"
              unread={1}
            />
            <ContactRow
              Icon={Inbox}
              name="Inbox close"
              schedule="Weekdays · 6:00 PM"
              preview="12 emails today, two need a reply"
              time="18:00"
            />
            <ContactRow
              Icon={HardDrive}
              name="Project watch"
              schedule="Weekly · Friday"
              preview="Four files changed in Projects this week"
              time="Fri"
            />
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="mt-20 grid items-center gap-10 border-t border-black/10 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20"
        >
          <div className="order-2 rounded-[1.5rem] border border-black/10 bg-[#f8f7f2] p-5 shadow-[0_24px_60px_-48px_rgba(15,28,19,0.5)] sm:p-7 lg:order-1">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#171a17]">Cuppet Assistant</p>
                <p className="mt-0.5 text-[10px] text-black/35">Connected to your workspace</p>
              </div>
              <span className="rounded-full border border-black/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-black/35">
                Read only
              </span>
            </div>
            <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-[#173c2a] px-4 py-3 text-[12px] leading-5 text-white">
              What needs my attention before I log off?
            </div>
            <div className="mt-3 max-w-[88%] rounded-2xl rounded-bl-sm bg-[#e9e8e2] px-4 py-3">
              <p className="text-[12px] leading-5 text-black/65">
                Two things: approve Finance’s invoice by 5:30, and reply to Sarah’s revised brief
                before tomorrow’s design review.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <SourceChip Icon={Mail} label="Gmail" />
                <SourceChip Icon={Calendar} label="Calendar" />
                <SourceChip Icon={HardDrive} label="Drive" />
                <SourceChip Icon={Github} label="GitHub" />
              </div>
            </div>
          </div>

          <div className="order-1 max-w-sm lg:order-2">
            <span className="font-mono text-[10px] text-black/30">02 / CONNECTED CHAT</span>
            <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-[#171a17]">
              Ask one question across all your accounts.
            </h3>
            <p className="mt-4 text-sm leading-6 text-black/50">
              Cuppet reads the relevant source, answers with context, and shows where every detail
              came from.
            </p>
            <div className="mt-7 flex items-center gap-3 text-[11px] font-medium text-[#24583b]">
              <MessagesSquare className="h-4 w-4" strokeWidth={1.6} />
              General chat is included, too
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
