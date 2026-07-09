import { useEffect, useState } from 'react'
import { Loader2, Star, Check, X } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import api from '../../utils/api.js'

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  function load() {
    setLoading(true)
    api.get('/reviews/all').then((res) => setReviews(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function setApproval(id, approved) {
    await api.patch(`/reviews/${id}/approve`, { approved })
    load()
  }

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.approved
    if (filter === 'approved') return r.approved
    return true
  })

  return (
    <AdminLayout title="Reviews">
      <div className="flex flex-wrap gap-2">
        {['pending', 'approved', 'all'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition ${
              filter === f ? 'bg-teal-fade text-white' : 'bg-white text-teal-700 shadow-card'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {filtered.length === 0 && <p className="col-span-full rounded-2xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">No reviews here.</p>}
          {filtered.map((r) => (
            <div key={r._id} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill={s < r.rating ? 'currentColor' : 'none'} />)}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.approved ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {r.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="mt-3 text-sm text-ink/75">&ldquo;{r.comment}&rdquo;</p>
              <p className="mt-3 font-display text-sm font-semibold text-teal-700">{r.name}</p>
              <div className="mt-4 flex gap-2">
                {!r.approved && (
                  <button onClick={() => setApproval(r._id, true)} className="flex items-center gap-1.5 rounded-full bg-teal-600 px-4 py-1.5 text-xs font-semibold text-white">
                    <Check size={14} /> Approve
                  </button>
                )}
                {r.approved && (
                  <button onClick={() => setApproval(r._id, false)} className="flex items-center gap-1.5 rounded-full bg-yellow-500 px-4 py-1.5 text-xs font-semibold text-white">
                    <X size={14} /> Unapprove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
