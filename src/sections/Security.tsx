import { Eye, Lock, ShieldCheck, Smartphone, KeyRound, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

const ITEMS = [
  {
    Icon: Eye,
    title: 'Read-first connectors',
    body: 'Connected services start with the narrowest permissions needed for the job.',
  },
  {
    Icon: Lock,
    title: 'Tokens stay in the vault',
    body: 'OAuth credentials are encrypted on the backend and never travel to your phone.',
  },
  {
    Icon: Smartphone,
    title: 'Revoke access anytime',
    body: 'Disconnect an account without rebuilding agents or changing your device setup.',
  },
]

export default function Security() {
  return (
    <section id="security" className="bg-[var(--forest-deep)] py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Security"
          title={<>Useful access. Nothing more.</>}
          sub="Cuppet is designed around a simple boundary: agents can read what they need, while your credentials remain out of reach."
          align="left"
          tone="dark"
        />

        <div className="mt-14 rounded-[var(--radius-surface)] border border-[rgba(245,243,238,0.14)] bg-[rgba(245,243,238,0.05)] p-6 sm:p-8">
          <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="flex items-center gap-4 sm:flex-col sm:text-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(245,243,238,0.14)] bg-[rgba(245,243,238,0.05)]">
                <Smartphone className="h-5 w-5 text-[rgba(245,243,238,0.7)]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[rgba(245,243,238,0.85)]">Your device</p>
                <p className="mt-1 text-[10px] text-[rgba(245,243,238,0.35)]">No credentials stored</p>
              </div>
            </div>
            <ArrowRight className="hidden h-4 w-4 text-[rgba(245,243,238,0.2)] sm:block" />
            <div className="flex items-center gap-4 sm:flex-col sm:text-center">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--paper)]">
                <ShieldCheck className="h-6 w-6 text-[var(--forest)]" strokeWidth={1.6} />
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#86b895]">
                  <KeyRound className="h-2.5 w-2.5 text-[var(--forest-deep)]" />
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--paper)]">Encrypted vault</p>
                <p className="mt-1 text-[10px] text-[rgba(245,243,238,0.35)]">Tokens live here</p>
              </div>
            </div>
            <ArrowRight className="hidden h-4 w-4 text-[rgba(245,243,238,0.2)] sm:block" />
            <div className="flex items-center gap-4 sm:flex-col sm:text-center">
              <div className="grid h-12 w-12 shrink-0 grid-cols-2 gap-1 rounded-full border border-[rgba(245,243,238,0.14)] bg-[rgba(245,243,238,0.05)] p-3.5">
                <span className="rounded-full bg-[rgba(245,243,238,0.55)]" />
                <span className="rounded-full bg-[rgba(245,243,238,0.35)]" />
                <span className="rounded-full bg-[rgba(245,243,238,0.35)]" />
                <span className="rounded-full bg-[rgba(245,243,238,0.55)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[rgba(245,243,238,0.85)]">Your accounts</p>
                <p className="mt-1 text-[10px] text-[rgba(245,243,238,0.35)]">Read-first access</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid border-y border-[rgba(245,243,238,0.14)] sm:grid-cols-3">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`py-7 sm:px-7 ${
                i > 0 ? 'border-t border-[rgba(245,243,238,0.14)] sm:border-l sm:border-t-0' : ''
              }`}
            >
              <item.Icon className="h-4 w-4 text-[#a8ceb2]" strokeWidth={1.5} />
              <h3 className="mt-7 text-sm font-semibold text-[rgba(245,243,238,0.9)]">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[rgba(245,243,238,0.45)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
