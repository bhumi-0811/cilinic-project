import { useEffect, useState } from 'react'
import { Star, Loader2 } from 'lucide-react'
import api from '../utils/api.js'

const fallbackReviews = [
  { name: 'Priya S.', rating: 5, comment: 'Dr. Nikam explained everything patiently and my skin has cleared up so much in 3 months. Highly recommend Vijaya Clinics.' },
  { name: 'Rohan M.', rating: 5, comment: 'The counselling room felt genuinely safe and non-judgemental. Grateful this clinic treats skin and mind together.' },
  { name: 'Anjali T.', rating: 4, comment: 'Very professional staff, clean clinic, and the video consultation was smooth for my follow-up visit.' },
]

export default function ReviewList() {
  const [reviews, setReviews] = useState(fallbackReviews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/reviews')
      .then((res) => { if (res.data?.length) setReviews(res.data) })
      .catch(() => { /* keep fallback reviews if backend isn't running yet */ })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading && (
        <div className="col-span-full flex justify-center py-6 text-teal-500">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!loading && reviews.map((r, i) => (
        <div key={r._id || i} className="glass rounded-2xl p-6 shadow-card">
          <div className="flex gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} size={16} fill={s < r.rating ? 'currentColor' : 'none'} />
            ))}
          </div>
          <p className="mt-4 text-sm text-ink/80">&ldquo;{r.comment}&rdquo;</p>
          <p className="mt-4 font-display text-sm font-semibold text-teal-700">{r.name}</p>
        </div>
      ))}
    </div>
  )
}
