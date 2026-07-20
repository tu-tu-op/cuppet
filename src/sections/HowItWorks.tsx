import { MessageSquareText, BotMessageSquare, BellRing } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import AgentBuilder from '../components/AgentBuilder'

const STEPS = [
  {
    n: '1',
    Icon: MessageSquareText,
    title: 'Describe the outcome',
    body: 'Write what you want in plain English. No flowcharts, triggers, or configuration screens.',
  },
  {
    n: '2',
    Icon: BotMessageSquare,
    title: 'Cuppet sets the routine',
    body: 'Your request becomes a persistent agent with the right schedule and account access.',
  },
  {
    n: '3',
    Icon: BellRing,
    title: 'Results arrive in chat',
    body: 'The agent works in the background and sends a concise update when there is something worth reading.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={<>A request in. A result out.</>}
          sub="Cuppet removes the machinery between deciding what you want and receiving the finished work."
          align="left"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-surface)] border border-[var(--rule)] bg-[var(--rule)] sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-[var(--paper)] p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl leading-none tracking-[-0.03em] text-[var(--forest-mid)]">
                  {s.n}
                </span>
                <s.Icon className="h-4 w-4 text-[var(--forest-mid)]" strokeWidth={1.6} />
              </div>
              <h3 className="mt-10 text-[17px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <AgentBuilder />
        </div>
      </div>
    </section>
  )
}
