import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Clock, CalendarClock, CheckCircle2, XCircle, Loader2, Eye } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import PatientModal from '../components/PatientModal.jsx'
import api from '../../utils/api.js'

const statCards = [
  { key: 'total', label: 'Total Appointments', icon: CalendarDays, color: 'bg-teal-50 text-teal-600' },
  { key: 'today', label: "Today's Appointments", icon: Clock, color: 'bg-mint-50 text-mint-600' },
  { key: 'upcoming', label: 'Upcoming Appointments', icon: CalendarClock, color: 'bg-sand-100 text-teal-600' },
  { key: 'completed', label: 'Completed Appointments', icon: CheckCircle2, color: 'bg-green-50 text-green-600' },
  { key: 'cancelled', label: 'Cancelled Appointments', icon: XCircle, color: 'bg-red-50 text-red-500' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  function load() {
    api.get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {statCards.map((c) => (
              <div key={c.key} className="rounded-2xl bg-white p-5 shadow-card">
                <div className={`inline-flex rounded-xl p-2.5 ${c.color}`}><c.icon size={20} /></div>
                <p className="mt-4 font-display text-3xl font-semibold text-teal-800">{stats?.[c.key] ?? 0}</p>
                <p className="mt-1 text-sm text-ink/60">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-teal-800">Recent Appointments</h2>
              <Link to="/admin/appointments" className="text-sm font-medium text-teal-600 underline">View all -&gt;</Link>
            </div>

            <div className="mt-4 space-y-2.5">
              {stats?.recent?.length ? stats.recent.map((a) => (
                <div key={a._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-card">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink/85">{a.name}</p>
                    <p className="mt-0.5 truncate text-xs capitalize text-ink/55">{a.type.replace('-', ' ')} - {a.phone}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <StatusBadge status={a.status} />
                    <button
                      onClick={() => setSelected(a)}
                      aria-label="Preview appointment details"
                      title="Preview"
                      className="rounded-full bg-teal-50 p-2 text-teal-600 transition hover:bg-teal-100"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              )) : (
                <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">No appointments yet.</p>
              )}
            </div>
          </div>
        </>
      )}

      {selected && <PatientModal appointment={selected} onClose={() => setSelected(null)} />}
    </AdminLayout>
  )
}

export function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700',
    confirmed: 'bg-teal-50 text-teal-700',
    completed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-600',
  }
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}