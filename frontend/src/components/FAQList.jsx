import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { faqs } from '../utils/clinicData.js'

export default function FAQList() {
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  const categories = useMemo(() => ['All', ...new Set(faqs.map((f) => f.category))], [])
  const [category, setCategory] = useState('All')

  const filtered = faqs.filter((f) => {
    const matchesCategory = category === 'All' || f.category === category
    const matchesQuery = f.question.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-full border border-teal-200 bg-white py-3 pl-11 pr-4 text-sm shadow-card focus:border-teal-400"
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                category === c ? 'bg-teal-fade text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-2xl space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink/60">No FAQs match your search yet.</p>
        )}
        {filtered.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-card">
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-medium text-ink/85">{f.question}</span>
              <ChevronDown size={18} className={`shrink-0 text-teal-500 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-ink/70">{f.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
