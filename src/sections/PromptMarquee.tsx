const SERVICES = ['Gmail', 'Google Calendar', 'Drive', 'GitHub', 'Notion']

export default function PromptMarquee() {
  return (
    <section className="border-y border-[var(--rule)] bg-[var(--paper-2)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-6 sm:px-8 md:flex-row md:justify-between md:gap-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
          Works with the tools you already open
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {SERVICES.map((service) => (
            <span
              key={service}
              className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--ink-soft)]"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
