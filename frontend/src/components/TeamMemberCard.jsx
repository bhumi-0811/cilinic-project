import { motion } from 'framer-motion'

// Simple deterministic accent picker so cards feel varied but stay on-brand
const accents = [
  'from-mint-400 to-teal-500',
  'from-teal-500 to-mint-600',
  'from-mint-500 to-teal-600',
  'from-teal-400 to-mint-500',
  'from-mint-600 to-teal-700',
]

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function TeamMemberCard({ photo, name, role, description, index = 0 }) {
  const accent = accents[index % accents.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-soft sm:p-7"
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-24 w-24 rounded-full object-cover shadow-soft sm:h-28 sm:w-28"
        />
      ) : (
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${accent} font-display text-2xl font-semibold text-white shadow-soft sm:h-28 sm:w-28`}
        >
          {getInitials(name)}
        </div>
      )}

      <h3 className="mt-5 font-display text-lg font-semibold text-teal-800">{name}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-mint-600">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">{description}</p>
    </motion.div>
  )
}
