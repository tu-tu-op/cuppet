import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  tone = 'light',
}: {
  eyebrow: string
  title: React.ReactNode
  sub?: string
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
}) {
  const isDark = tone === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className={`h-px w-8 ${isDark ? 'bg-white/30' : 'bg-black/25'}`} />
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isDark ? 'text-white/60' : 'text-black/50'
          }`}
        >
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-6 font-display font-normal tracking-[-0.025em] text-[2.5rem] leading-[0.98] sm:text-[3.55rem] ${
          isDark ? 'text-[#f7f4ed]' : 'text-[#171a17]'
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-7 ${
            align === 'center' ? 'mx-auto' : ''
          } ${isDark ? 'text-white/60' : 'text-black/55'}`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  )
}
