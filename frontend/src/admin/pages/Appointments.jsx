import { useEffect, useState } from 'react'
import { Loader2, Check, X, CalendarClock, CheckCheck, User, Phone, FileText, Paperclip } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import { StatusBadge } from './Dashboard.jsx'
import api from '../../utils/api.js'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
]

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [rescheduleId, setRescheduleId] = useState(null)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')

  function load() {
    setLoading(true)
    api.get('/appointments').then((res) => setAppointments(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id, status) {
    await api.patch(`/appointments/${id}/status`, { status })
    load()
    setSelected(null)
  }

  async function submitReschedule(id) {
    await api.patch(`/appointments/${id}/reschedule`, { date: rescheduleDate, time: rescheduleTime })
    setRescheduleId(null)
    setRescheduleDate('')
    setRescheduleTime('')
    load()
  }

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter)

  return (
    <AdminLayout title="Appointment Management">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              filter === f.key ? 'bg-teal-fade text-white' : 'bg-white text-teal-700 shadow-card'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="mt-5 space-y-3">
          {filtered.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink/50 shadow-card">No appointments in this filter.</p>}
          {filtered.map((a) => (
            <div key={a._id} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button onClick={() => setSelected(a)} className="text-left">
                  <p className="font-display font-semibold text-teal-800">{a.name}</p>
                  <p className="mt-0.5 text-xs text-ink/55">
                    {a.type === 'in-clinic' ? `In-Clinic • ${a.date || '—'} ${a.time || ''}` : `Tele-Consultation • ${a.consultType || ''}`}
                  </p>
                </button>
                <StatusBadge status={a.status} />
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-sand-50 px-3 py-1 text-ink/60">{a.phone}</span>
                <span className="rounded-full bg-sand-50 px-3 py-1 text-ink/60">{a.age} yrs, {a.gender}</span>
              </div>

              {rescheduleId === a._id ? (
                <div className="mt-4 flex flex-wrap items-end gap-2 rounded-xl bg-sand-50 p-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink/70">New Date</label>
                    <input type="date" value={rescheduleDate} onChange={(e) => setRescheduleDate(e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-ink/70">New Time</label>
                    <input type="time" value={rescheduleTime} onChange={(e) => setRescheduleTime(e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
                  </div>
                  <button onClick={() => submitReschedule(a._id)} className="rounded-lg bg-teal-fade px-4 py-1.5 text-sm font-semibold text-white">Save</button>
                  <button onClick={() => setRescheduleId(null)} className="rounded-lg bg-white px-4 py-1.5 text-sm text-ink/60">Cancel</button>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.status === 'pending' && (
                    <>
                      <ActionBtn onClick={() => updateStatus(a._id, 'confirmed')} icon={Check} label="Accept" color="bg-teal-600" />
                      <ActionBtn onClick={() => updateStatus(a._id, 'cancelled')} icon={X} label="Reject" color="bg-red-500" />
                    </>
                  )}
                  {a.status === 'confirmed' && (
                    <>
                      <ActionBtn onClick={() => updateStatus(a._id, 'completed')} icon={CheckCheck} label="Mark Complete" color="bg-green-600" />
                      <ActionBtn onClick={() => { setRescheduleId(a._id); setRescheduleDate(a.date || ''); setRescheduleTime(a.time || '') }} icon={CalendarClock} label="Reschedule" color="bg-teal-500" />
                      <ActionBtn onClick={() => updateStatus(a._id, 'cancelled')} icon={X} label="Cancel" color="bg-red-500" />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && <PatientModal appointment={selected} onClose={() => setSelected(null)} />}
    </AdminLayout>
  )
}

function ActionBtn({ onClick, icon: Icon, label, color }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 rounded-full ${color} px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90`}>
      <Icon size={14} /> {label}
    </button>
  )
}

function PatientModal({ appointment: a, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-soft" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-teal-50 p-2.5 text-teal-600"><User size={20} /></div>
          <div>
            <p className="font-display text-lg font-semibold text-teal-800">{a.name}</p>
            <p className="text-xs text-ink/55">{a.age} years • {a.gender}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <p className="flex items-center gap-2 text-ink/75"><Phone size={15} className="text-teal-500" /> {a.phone}</p>
          <p className="flex items-center gap-2 text-ink/75"><FileText size={15} className="text-teal-500" /> {a.email}</p>
          <div>
            <p className="font-medium text-ink/80">Concern</p>
            <p className="mt-1 text-ink/65">{a.problem}</p>
          </div>
          <p className="text-ink/65">
            {a.type === 'in-clinic' ? `Date & Time: ${a.date || '—'} at ${a.time || '—'}` : `Preferred Time: ${a.preferredTime ? new Date(a.preferredTime).toLocaleString() : '—'}`}
          </p>
          {a.reportUrl && (
            <a href={a.reportUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-teal-600 underline">
              <Paperclip size={15} /> View uploaded report
            </a>
          )}
        </div>
        <button onClick={onClose} className="mt-6 w-full rounded-full bg-teal-fade py-2.5 text-sm font-semibold text-white">Close</button>
      </div>
    </div>
  )
}
