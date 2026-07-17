import { useState } from 'react'
import { X, User, Phone, Mail, FileText, Paperclip, Check, CalendarClock, CheckCheck, Loader2 } from 'lucide-react'
import { StatusBadge } from '../pages/Dashboard.jsx'

export default function PatientModal({ appointment: a, onClose, onUpdateStatus, onReschedule }) {
  const [reschedOpen, setReschedOpen] = useState(false)
  const [date, setDate] = useState(a.date || '')
  const [time, setTime] = useState(a.time || '')
  const [busy, setBusy] = useState(false)

  async function handleAction(fn) {
    setBusy(true)
    try {
      await fn()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-soft sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-full bg-teal-50 p-2.5 text-teal-600"><User size={20} /></div>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold text-teal-800">{a.name}</p>
              <p className="text-xs text-ink/55">{a.age} years, {a.gender}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <StatusBadge status={a.status} />
            <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-ink/40 hover:bg-sand-50 hover:text-ink/70">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <p className="flex items-center gap-2 break-words text-ink/75"><Phone size={15} className="shrink-0 text-teal-500" /> {a.phone}</p>
          <p className="flex items-center gap-2 break-words text-ink/75"><Mail size={15} className="shrink-0 text-teal-500" /> {a.email}</p>
          <div>
            <p className="font-medium text-ink/80">Concern</p>
            <p className="mt-1 text-ink/65">{a.problem}</p>
          </div>
          <p className="text-ink/65">
            {a.type === 'in-clinic'
              ? `Date & Time: ${a.date || '-'} at ${a.time || '-'}`
              : `Preferred Time: ${a.preferredTime ? new Date(a.preferredTime).toLocaleString() : '-'} - ${a.consultType || ''}`}
          </p>
          {a.reportUrl && (
            <a href={a.reportUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-teal-600 underline">
              <Paperclip size={15} /> View uploaded report
            </a>
          )}
        </div>

        {onUpdateStatus && (
          <div className="mt-6 border-t border-sand-100 pt-5">
            {reschedOpen ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-ink/80">Reschedule appointment</p>
                <div className="flex flex-wrap gap-2">
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input flex-1" />
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input flex-1" />
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={busy}
                    onClick={() => handleAction(() => onReschedule(a._id, date, time)).then(() => setReschedOpen(false))}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-teal-fade px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {busy ? <Loader2 size={15} className="animate-spin" /> : 'Save New Time'}
                  </button>
                  <button onClick={() => setReschedOpen(false)} className="rounded-full bg-sand-50 px-4 py-2.5 text-sm text-ink/60">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {a.status === 'pending' && (
                  <>
                    <ModalActionBtn onClick={() => handleAction(() => onUpdateStatus(a._id, 'confirmed'))} icon={Check} label="Accept" color="bg-teal-600" busy={busy} />
                    <ModalActionBtn onClick={() => handleAction(() => onUpdateStatus(a._id, 'cancelled'))} icon={X} label="Reject" color="bg-red-500" busy={busy} />
                  </>
                )}
                {a.status === 'confirmed' && (
                  <>
                    <ModalActionBtn onClick={() => handleAction(() => onUpdateStatus(a._id, 'completed'))} icon={CheckCheck} label="Mark Complete" color="bg-green-600" busy={busy} />
                    <ModalActionBtn onClick={() => setReschedOpen(true)} icon={CalendarClock} label="Reschedule" color="bg-teal-500" busy={busy} />
                    <ModalActionBtn onClick={() => handleAction(() => onUpdateStatus(a._id, 'cancelled'))} icon={X} label="Cancel" color="bg-red-500" busy={busy} />
                  </>
                )}
                {(a.status === 'completed' || a.status === 'cancelled') && (
                  <p className="text-sm text-ink/50">No further actions available for this appointment.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ModalActionBtn({ onClick, icon: Icon, label, color, busy }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={`flex items-center gap-1.5 rounded-full ${color} px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60`}
    >
      <Icon size={14} /> {label}
    </button>
  )
}
