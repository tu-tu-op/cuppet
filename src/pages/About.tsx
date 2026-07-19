import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, CircleDotDashed } from 'lucide-react'
import { Link } from 'react-router'
import Seo from '../components/Seo'
import SiteLayout from '../components/SiteLayout'
import CTA from '../sections/CTA'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
}

export default function About() {
  return (
    <SiteLayout>
      <Seo
        title="About Us"
        description="Cuppet is building a better way to use AI: selected, relevant information from the tools you already use, delivered when it matters."
        path="/about"
      />
      <main>
        <section className="relative border-b border-black/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="relative mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-black/25" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                  About Cuppet
                </span>
              </div>
              <h1 className="mt-8 max-w-4xl font-display text-[4rem] font-normal leading-[0.9] tracking-[-0.04em] text-[#171a17] sm:text-[6.8rem]">
                Make better use <span className="italic text-[#2c6042]">of AI.</span>
              </h1>
              <div className="mt-10 grid gap-7 border-t border-black/10 pt-7 md:grid-cols-[1fr_1.1fr]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/35">
                  Our point of view
                </p>
                <p className="max-w-xl text-[16px] leading-7 text-black/55">
                  AI should not ask for more of your attention. It should help you decide what
                  deserves it.
                </p>
              </div>
              <ArrowDown className="mt-16 h-5 w-5 text-[#2c6042]" strokeWidth={1.5} />
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-36">
          <motion.div
            {...reveal}
            className="mx-auto grid max-w-6xl gap-10 border-t border-black/10 pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
          >
            <div>
              <span className="font-mono text-[10px] text-black/30">01 / THE PROBLEM</span>
              <h2 className="mt-5 font-display text-[2.8rem] font-normal leading-none tracking-[-0.025em] text-[#171a17] sm:text-[3.5rem]">
                The problem
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-[18px] leading-8 text-black/67 sm:text-[20px] sm:leading-9">
                Everyone knows that AI is good at research, coding, writing, planning, and dozens
                of other tasks. The technology can explain almost any topic and generate more
                information than any person could reasonably consume. Yet most of us still begin
                the day by opening the same inboxes, feeds, documents, calendars, project boards,
                and dashboards to work out what changed and what deserves a response. The problem
                is no longer access to information; it is the effort required to separate what is
                relevant from everything that is merely available. Today’s AI often adds another
                destination to that routine. We open a chatbot, collect context from several
                places, write the right prompt, and then evaluate a response that may be useful but
                knows little about the commitments already shaping our day. A perfect summary of
                everything is still too much when only two details require a decision. As
                information becomes easier to create, attention becomes more valuable. AI should
                not increase the number of things we need to check. It should reduce them.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="border-y border-black/10 bg-[#e7e8e1] px-5 py-24 sm:px-8 sm:py-36">
          <motion.div
            {...reveal}
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"
          >
            <div>
              <span className="font-mono text-[10px] text-black/30">02 / THE SOLUTION</span>
              <h2 className="mt-5 font-display text-[2.8rem] font-normal leading-none tracking-[-0.025em] text-[#171a17] sm:text-[3.5rem]">
                The solution
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-[18px] leading-8 text-black/67 sm:text-[20px] sm:leading-9">
                We believe AI should become a quiet layer across the tools people already use.
                Instead of waiting for another prompt, it should remember the outcome you care
                about, read only the sources you deliberately connect, and select the small amount
                of information that matches your instructions. A daily industry brief should
                contain the three changes relevant to your work, not every headline published
                overnight. An inbox update should surface the messages that need your reply, not
                celebrate the number of emails it processed. A project monitor should stay silent
                until a meaningful decision, deadline, or file changes. And when something does
                deserve attention, the result should arrive through a familiar channel with a
                clear link back to the source. This is the idea behind Cuppet: persistent agents
                that work across your existing accounts, keep the schedule you set, and send a
                concise message when there is something worth knowing. Less searching, less
                context switching, and fewer dashboards to babysit. The value of AI is not measured
                by how much it can produce. It is measured by how clearly it helps you use the
                finite time and attention you already have.
              </p>
              <Link
                to="/"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#173c2a] group"
              >
                See the product
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <motion.div
            {...reveal}
            className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden border border-black/10 bg-[#dde7dc]">
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#173c2a]/15" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-[#173c2a]/15" />
              <span className="absolute h-48 w-48 rounded-full border border-[#173c2a]/15" />
              <span className="absolute h-28 w-28 rounded-full border border-[#173c2a]/20" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#173c2a]">
                <CircleDotDashed className="h-7 w-7 text-[#F5F3EE]" strokeWidth={1.3} />
              </span>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                Our measure
              </p>
              <h2 className="mt-6 max-w-lg font-display text-[3rem] font-normal leading-[0.97] tracking-[-0.03em] text-[#171a17] sm:text-[4rem]">
                More signal. <span className="italic text-[#2c6042]">Less software.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-7 text-black/52">
                The best result is not more time spent inside Cuppet. It is fewer questions to
                remember, fewer places to check, and a clearer understanding of what matters next.
              </p>
            </div>
          </motion.div>
        </section>

        <CTA />
      </main>
    </SiteLayout>
  )
}
