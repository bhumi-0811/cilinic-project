import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TestimonialCarousel({ reviews, accent = 'teal' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5500)
    return () => clearInterval(t)
  }, [reviews.length])

  function go(dir) {
    setIndex((i) => (i + dir + reviews.length) % reviews.length)
  }

  const accentColor = accent === 'teal' ? 'text-teal-500' : 'text-mint-500'
  const r = reviews[index]

  return (
    <div className="relative mx-auto max-w-2xl text-center">
      <Quote className={`mx-auto ${accentColor}`} size={32} />
      <div className="relative mt-6 min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-display text-lg text-ink/80 sm:text-xl">&ldquo;{r.comment}&rdquo;</p>
            <div className="mt-4 flex justify-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill={s < r.rating ? 'currentColor' : 'none'} />)}
            </div>
            <p className="mt-3 font-display text-sm font-semibold text-teal-800">{r.name}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} aria-label="Previous testimonial" className="rounded-full bg-white p-2 text-ink/50 shadow-card transition hover:text-teal-600">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-teal-500' : 'w-1.5 bg-teal-200'}`}
            />
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next testimonial" className="rounded-full bg-white p-2 text-ink/50 shadow-card transition hover:text-teal-600">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
