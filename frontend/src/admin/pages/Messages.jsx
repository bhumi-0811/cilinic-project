import { useEffect, useState } from 'react'
import { Loader2, Mail, Phone, CheckCircle2 } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import api from '../../utils/api.js'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    api.get('/contact').then((res) => setMessages(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function markRead(id) {
    await api.patch(`/contact/${id}/read`)
    load()
  }

  return (
    <AdminLayout title="Contact Messages">
      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="space-y-3">
          {messages.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m._id} className={`rounded-2xl bg-white p-5 shadow-card ${!m.read ? 'ring-2 ring-teal-200' : ''}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display font-semibold text-teal-800">{m.name}</p>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/55">
                    <span className="flex items-center gap-1"><Mail size={13} /> {m.email}</span>
                    <span className="flex items-center gap-1"><Phone size={13} /> {m.phone}</span>
                  </p>
                </div>
                {!m.read && (
                  <button onClick={() => markRead(m._id)} className="flex shrink-0 items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                    <CheckCircle2 size={14} /> Mark read
                  </button>
                )}
              </div>
              <p className="mt-3 text-sm text-ink/70">{m.message}</p>
              <p className="mt-3 text-xs text-ink/40">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
