import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = () => {
    if (/^\S+@\S+\.\S+$/.test(email)) setDone(true)
  }

  return (
    <section id="cta" className="border-t border-[var(--rule)]">
      <div className="relative mx-auto max-w-6xl overflow-hidden bg-[var(--ink)] px-6 py-16 text-center sm:px-10 sm:py-24 md:my-8 md:rounded-[var(--radius-surface)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgba(245,243,238,0.4)]">
          Private beta
        </p>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-[2.6rem] font-normal leading-[0.98] tracking-[-0.03em] text-[var(--paper)] sm:text-[4rem]">
          Your next status update should arrive on its own.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[rgba(245,243,238,0.5)]">
          Join the early group shaping Cuppet for iOS and Android. We’ll only write when there is
          something useful to share.
        </p>

        {done ? (
          <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-[rgba(245,243,238,0.15)] bg-[rgba(245,243,238,0.05)] px-6 py-3.5 text-sm text-[rgba(245,243,238,0.75)]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#92bf9d]">
              <Check className="h-3 w-3 text-[var(--forest)]" strokeWidth={3} />
            </span>
            You're on the list — we'll message you. Naturally.
          </div>
        ) : (
          <div className="mx-auto mt-9 flex max-w-md flex-col gap-2 rounded-full border border-[rgba(245,243,238,0.15)] bg-[rgba(245,243,238,0.05)] p-1.5 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="you@example.com"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-[var(--paper)] outline-none placeholder:text-[rgba(245,243,238,0.3)]"
            />
            <button
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--paper)] px-5 py-3 text-sm font-semibold text-[var(--forest)] transition-opacity duration-200 hover:opacity-90"
            >
              Get early access
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <p className="mt-5 text-[10px] text-[rgba(245,243,238,0.25)]">
          No spam · Early access is free · Leave anytime
        </p>
      </div>
    </section>
  )
}
