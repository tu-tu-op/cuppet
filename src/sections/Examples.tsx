import { motion } from 'framer-motion'
import { CalendarClock, GraduationCap, HardDrive, Inbox, Newspaper } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const EXAMPLES = [
  {
    Icon: Newspaper,
    name: 'Morning brief',
    prompt: 'Send me the three tech stories worth reading every morning at 7.',
    schedule: 'Daily · 7:00 AM',
    result: 'A concise digest, already ranked.',
  },
  {
    Icon: Inbox,
    name: 'Inbox close',
    prompt: 'Summarize my inbox at 6 and flag anything that needs a reply.',
    schedule: 'Weekdays · 6:00 PM',
    result: 'The day’s loose ends in one message.',
  },
  {
    Icon: HardDrive,
    name: 'Project watch',
    prompt: 'Tell me what changed in the client folder every Friday.',
    schedule: 'Weekly · Friday',
    result: 'A change log without checking Drive.',
  },
  {
    Icon: GraduationCap,
    name: 'Study coach',
    prompt: 'Build a plan for my JEE exam and check in each evening.',
    schedule: 'Daily · 8:30 PM',
    result: 'A living plan that adapts as you progress.',
  },
]

export default function Examples() {
  return (
    <section id="examples" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="In practice"
          title={<>The kind of work that should already be done.</>}
          sub="Start with a sentence. Refine the agent by replying to it like you would to a capable teammate."
          align="left"
        />

        <div className="mt-16 border-y border-black/10">
          {EXAMPLES.map((example, index) => (
            <motion.article
              key={example.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="group grid gap-5 border-b border-black/10 py-7 last:border-b-0 sm:grid-cols-[180px_minmax(0,1fr)_170px] sm:items-center sm:gap-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/45">
                  <example.Icon className="h-4 w-4 text-[#2c6042]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-[#171a17]">{example.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[9px] uppercase tracking-[0.08em] text-black/30">
                    <CalendarClock className="h-2.5 w-2.5" />
                    {example.schedule}
                  </p>
                </div>
              </div>
              <p className="text-[15px] leading-6 text-black/65">“{example.prompt}”</p>
              <p className="text-xs leading-5 text-black/38 sm:text-right">{example.result}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
