import { motion } from 'framer-motion'
import { ArrowRight, Check, LockKeyhole } from 'lucide-react'
import PhoneMockup from '../components/PhoneMockup'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute left-0 top-0 h-full w-px bg-black/[0.04] sm:left-[calc(50%-576px)]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[minmax(0,1fr)_440px] gap-16 lg:gap-12 xl:gap-20 items-center">
        <div className="min-w-0 text-center lg:text-left">
          <motion.div variants={fade} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b49] pulse-dot" />
              Private beta · iOS & Android
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 font-display font-normal tracking-[-0.035em] text-[3.55rem] leading-[0.91] sm:text-[5rem] lg:text-[5.25rem] text-[#171a17]"
          >
            Work gets done.
            <span className="block italic text-[#2c6042]">You get a message.</span>
          </motion.h1>

          <motion.p
            variants={fade}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 text-[16px] sm:text-[17px] text-black/55 leading-7 max-w-[36rem] mx-auto lg:mx-0"
          >
            Create an agent in one sentence. It works across your connected accounts, keeps its
            schedule, and sends the result to your inbox. No dashboards to babysit.
          </motion.p>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
          >
            <a
              href="#cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#173c2a] hover:bg-[#102e20] text-[#f8f5ee] text-sm font-semibold px-6 py-3.5 rounded-full transition-all"
            >
              Join private beta
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how"
              className="w-full sm:w-auto inline-flex items-center justify-center text-sm text-black/65 font-semibold px-5 py-3.5 rounded-full hover:text-black transition-colors"
            >
              See how it works
              <span aria-hidden="true" className="ml-1">↓</span>
            </a>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-[11px] font-medium text-black/45"
          >
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#2c6042]" />
              No workflow builder
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#2c6042]" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-1.5">
              <LockKeyhole className="w-3.5 h-3.5 text-[#2c6042]" />
              Read-first access
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full min-w-0 justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#dfe7dc] px-4 pt-4 sm:px-8 sm:pt-6">
            <div className="mb-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-[#254633]/60">
              <span>Today’s agent activity</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2c6042]" />
                Live
              </span>
            </div>
            <div className="mx-auto flex max-w-[350px] justify-center">
              <PhoneMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
