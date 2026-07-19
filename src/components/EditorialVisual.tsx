import { Cable, Funnel, Radar, ShieldCheck } from 'lucide-react'
import type { BlogVisual } from '../data/blog'

const VISUALS = {
  signal: {
    Icon: Radar,
    label: 'Signal / 01',
    title: 'Notice what changed.',
  },
  connections: {
    Icon: Cable,
    label: 'Context / 02',
    title: 'Work where work lives.',
  },
  filter: {
    Icon: Funnel,
    label: 'Selection / 03',
    title: 'Less, but more relevant.',
  },
  trust: {
    Icon: ShieldCheck,
    label: 'Trust / 04',
    title: 'Read first. Act later.',
  },
} satisfies Record<BlogVisual, { Icon: typeof Radar; label: string; title: string }>

export default function EditorialVisual({
  variant,
  compact = false,
}: {
  variant: BlogVisual
  compact?: boolean
}) {
  const { Icon, label, title } = VISUALS[variant]

  return (
    <div
      className={`editorial-visual editorial-visual--${variant} relative overflow-hidden border border-black/10 bg-[#e3e9df] ${
        compact ? 'min-h-[280px]' : 'min-h-[340px] sm:min-h-[430px]'
      }`}
      role="img"
      aria-label={`Abstract editorial illustration: ${title}`}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-black/10 px-5 py-4">
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
          {label}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#2c6042]" />
      </div>

      <div className="absolute left-1/2 top-[53%] flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#173c2a]/20 bg-[#F5F3EE]/65 sm:h-36 sm:w-36">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#173c2a] sm:h-16 sm:w-16">
          <Icon className="h-6 w-6 text-[#F5F3EE]" strokeWidth={1.4} />
        </span>
      </div>

      <div className="absolute bottom-0 inset-x-0 flex items-end justify-between border-t border-black/10 px-5 py-4">
        <p className="max-w-[11rem] font-display text-[1.45rem] leading-none tracking-[-0.02em] text-[#173c2a]">
          {title}
        </p>
        <span className="font-mono text-[9px] text-black/30">CUPPET / 2026</span>
      </div>

      <span className="absolute left-[14%] top-[23%] h-2 w-2 rounded-full bg-[#43855b]" />
      <span className="absolute right-[16%] top-[34%] h-2 w-2 rounded-full border border-[#173c2a]/40" />
      <span className="absolute bottom-[28%] left-[23%] h-px w-[18%] bg-[#173c2a]/20" />
      <span className="absolute bottom-[35%] right-[18%] h-px w-[22%] bg-[#173c2a]/20" />
    </div>
  )
}
