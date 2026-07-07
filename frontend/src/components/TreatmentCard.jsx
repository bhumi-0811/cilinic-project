import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function TreatmentCard({ name, slug }) {
  return (
    <Link
      to={`/treatments/${slug}`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-teal-100 bg-white px-4 py-4 shadow-card transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft sm:px-5"
    >
      <span className="min-w-0 break-words font-medium text-ink/85 group-hover:text-teal-700">{name}</span>
      <ArrowUpRight size={18} className="shrink-0 text-teal-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-600" />
    </Link>
  )
}
