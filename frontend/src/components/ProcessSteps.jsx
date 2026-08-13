import { motion } from 'framer-motion'

export default function ProcessSteps({ steps, accent = 'teal' }) {
  const numColor = accent === 'teal' ? 'text-teal-200' : 'text-mint-200'
  const lineColor = accent === 'teal' ? 'bg-teal-100' : 'bg-mint-100'

  return (
    <div className="mx-auto max-w-3xl">
      {steps.map((s, i) => (
        <motion.div
          key={s.step}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="relative flex gap-6 pb-12 last:pb-0"
        >
          {i < steps.length - 1 && (
            <span className={`absolute left-[27px] top-14 h-[calc(100%-2rem)] w-px ${lineColor}`} />
          )}
          <span className={`shrink-0 font-display text-4xl font-semibold ${numColor}`}>{s.step}</span>
          <div className="pt-1.5">
            <p className="font-display text-lg font-semibold text-teal-800">{s.title}</p>
            <p className="mt-1.5 text-sm text-ink/65">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
