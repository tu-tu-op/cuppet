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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--paper-3)]">
        <Icon className="h-4 w-4 text-[var(--forest-mid)]" strokeWidth={1.7} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-[13px] font-semibold text-[var(--ink)]">{name}</p>
          <span className="shrink-0 text-[10px] font-medium text-[var(--forest-mid)]">{time}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-[11px] text-[var(--ink-faint)]">{preview}</p>
          {unread ? (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--forest-mid)] text-[9px] font-bold text-[var(--paper)]">
              {unread}
            </span>
          ) : null}
        </div>
        <p className="mt-1 flex items-center gap-1 text-[9px] uppercase tracking-[0.08em] text-[var(--ink-faint)]">
          <CalendarClock className="h-2.5 w-2.5" />
          {schedule}
        </p>
      </div>
    </div>
  )
}

function SourceChip({ Icon, label }: { Icon: typeof Mail; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--rule)] bg-[var(--paper)]/60 px-2.5 py-1 text-[9.5px] font-medium text-[var(--ink-soft)]">
      <Icon className="h-3 w-3 text-[var(--forest-mid)]" />
      {label}
    </span>
  )
}

export default function Features() {
  return (
    <section id="agents" className="border-y border-[var(--rule)] bg-[var(--paper-2)] py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The product"
          title={<>An inbox for work that runs itself.</>}
          sub="Scheduled agents and connected conversations live together, so delegating work feels as natural as sending a message."
          align="left"
        />

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
              Scheduled agents
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[var(--ink)]">
              Give recurring work a name and a schedule.
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Each routine becomes a contact in your inbox. It runs when promised and only
              interrupts you when the result is ready.
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-surface)] border border-[var(--rule)] bg-[var(--paper)] surface-elevated">
            <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                Agent inbox
              </p>
              <span className="flex items-center gap-1.5 text-[10px] text-[var(--ink-faint)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--leaf)]" />
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
        </div>

        <div className="mt-20 grid items-center gap-10 border-t border-[var(--rule)] pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="order-2 rounded-[var(--radius-surface)] border border-[var(--rule)] bg-[var(--paper)] p-5 surface-elevated sm:p-7 lg:order-1">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[var(--ink)]">Cuppet Assistant</p>
                <p className="mt-0.5 text-[10px] text-[var(--ink-faint)]">
                  Connected to your workspace
                </p>
              </div>
              <span className="rounded-full border border-[var(--rule)] px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                Read only
              </span>
            </div>
            <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-[var(--forest)] px-4 py-3 text-[12px] leading-5 text-[var(--paper)]">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)]">
              Connected chat
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[var(--ink)]">
              Ask one question across all your accounts.
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">
              Cuppet reads the relevant source, answers with context, and shows where every detail
              came from.
            </p>
            <div className="mt-7 flex items-center gap-3 text-[11px] font-medium text-[var(--forest-mid)]">
              <MessagesSquare className="h-4 w-4" strokeWidth={1.6} />
              General chat is included, too
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
