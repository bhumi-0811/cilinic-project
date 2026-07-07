export default function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? 'text-mint-300' : 'text-teal-500'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 text-3xl font-semibold sm:text-4xl ${light ? 'text-white' : 'text-teal-800'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base ${light ? 'text-white/80' : 'text-ink/70'}`}>{subtitle}</p>}
    </div>
  )
}
