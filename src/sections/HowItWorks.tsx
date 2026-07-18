import { motion } from 'framer-motion'
import { MessageSquareText, BotMessageSquare, BellRing } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import AgentBuilder from '../components/AgentBuilder'

const STEPS = [
  {
    n: '01',
    Icon: MessageSquareText,
    title: 'Describe the outcome',
    body: 'Write what you want in plain English. No flowcharts, triggers, or configuration screens.',
  },
  {
    n: '02',
    Icon: BotMessageSquare,
    title: 'Cuppet sets the routine',
    body: 'Your request becomes a persistent agent with the right schedule and account access.',
  },
  {
    n: '03',
    Icon: BellRing,
    title: 'Results arrive in chat',
    body: 'The agent works in the background and sends a concise update when there is something worth reading.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-36">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title={<>A request in. A result out.</>}
          sub="Cuppet removes the machinery between deciding what you want and receiving the finished work."
          align="left"
        />

        <div className="grid sm:grid-cols-3 mt-16 mb-16 border-y border-black/10">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative py-8 sm:px-7 sm:py-10 ${
                i > 0 ? 'border-t border-black/10 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-black/35">{s.n}</span>
                <s.Icon className="w-4 h-4 text-[#2c6042]" strokeWidth={1.6} />
              </div>
              <h3 className="mt-12 text-[17px] font-semibold tracking-[-0.02em] text-[#171a17]">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-black/50 leading-6">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AgentBuilder />
        </motion.div>
      </div>
    </section>
  )
}
