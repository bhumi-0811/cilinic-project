import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function DoctorCard({ photo, name, specialty, intro, to, accent = 'teal' }) {
  const accentText = accent === 'teal' ? 'text-teal-600' : 'text-mint-600'
  const accentBadge = accent === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-mint-50 text-mint-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <Link to={to} className="group relative block overflow-hidden rounded-[2rem] bg-white shadow-card transition-shadow duration-500 hover:shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${accentBadge}`}>
              {specialty}
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-[26px]">{name}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
              {intro}
            </p>
            <div className={`mt-4 flex items-center gap-1.5 text-sm font-semibold text-white`}>
              Explore Profile
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
