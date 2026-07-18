import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) setDone(true)
  }

  return (
    <section id="cta" className="border-t border-black/10 px-5 py-8 sm:px-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#171a17] px-6 py-16 text-center sm:px-10 sm:py-24"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Private beta
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-display text-[2.8rem] font-normal leading-[0.98] tracking-[-0.03em] text-[#f5f2eb] sm:text-[4.3rem]">
          Your next status update should arrive on its own.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-white/48">
          Join the early group shaping Cuppet for iOS and Android. We’ll only write when there is
          something useful to share.
        </p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm text-white/75"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#92bf9d]">
              <Check className="w-3 h-3 text-[#173c2a]" strokeWidth={3} />
            </span>
            You're on the list — we'll message you. Naturally.
          </motion.div>
        ) : (
          <div className="mx-auto mt-9 flex max-w-md flex-col gap-2 rounded-[1rem] border border-white/15 bg-white/[0.045] p-1.5 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent outline-none px-4 py-3 text-sm text-white placeholder:text-white/30"
            />
            <button
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#edf1e9] px-5 py-3 text-sm font-semibold text-[#173c2a] transition-colors hover:bg-white"
            >
              Get early access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <p className="mt-5 text-[10px] text-white/25">
          No spam · Early access is free · Leave anytime
        </p>
      </motion.div>
    </section>
  )
}
