const SERVICES = ['Gmail', 'Google Calendar', 'Drive', 'GitHub', 'Notion']

export default function PromptMarquee() {
  return (
    <section className="border-y border-black/10 bg-[#ebe9e2]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-7 sm:px-8 md:flex-row md:justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
          Works with the tools you already open
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {SERVICES.map((service) => (
            <span
              key={service}
              className="text-[13px] font-semibold tracking-[-0.01em] text-black/55"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
