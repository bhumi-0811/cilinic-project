import { useEffect, useState } from 'react'
import { Loader2, Save, Plus, Trash2, CalendarOff } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import api from '../../utils/api.js'

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function AvailabilityAdmin() {
  const [availability, setAvailability] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [newBlockedReason, setNewBlockedReason] = useState('')

  useEffect(() => {
    api.get('/availability').then((res) => setAvailability(res.data)).finally(() => setLoading(false))
  }, [])

  function updateDay(dayIndex, field, value) {
    setAvailability((a) => {
      const schedule = [...a.weeklySchedule]
      schedule[dayIndex] = { ...schedule[dayIndex], [field]: value }
      return { ...a, weeklySchedule: schedule }
    })
  }

  function updateWindow(dayIndex, windowIndex, field, value) {
    setAvailability((a) => {
      const schedule = [...a.weeklySchedule]
      const windows = [...schedule[dayIndex].windows]
      windows[windowIndex] = { ...windows[windowIndex], [field]: value }
      schedule[dayIndex] = { ...schedule[dayIndex], windows }
      return { ...a, weeklySchedule: schedule }
    })
  }

  function addWindow(dayIndex) {
    setAvailability((a) => {
      const schedule = [...a.weeklySchedule]
      schedule[dayIndex] = { ...schedule[dayIndex], windows: [...schedule[dayIndex].windows, { start: '10:00', end: '13:00' }] }
      return { ...a, weeklySchedule: schedule }
    })
  }

  function removeWindow(dayIndex, windowIndex) {
    setAvailability((a) => {
      const schedule = [...a.weeklySchedule]
      schedule[dayIndex] = { ...schedule[dayIndex], windows: schedule[dayIndex].windows.filter((_, i) => i !== windowIndex) }
      return { ...a, weeklySchedule: schedule }
    })
  }

  function addBlockedDate() {
    if (!newBlockedDate) return
    setAvailability((a) => ({ ...a, blockedDates: [...(a.blockedDates || []), { date: newBlockedDate, reason: newBlockedReason }] }))
    setNewBlockedDate('')
    setNewBlockedReason('')
  }

  function removeBlockedDate(index) {
    setAvailability((a) => ({ ...a, blockedDates: a.blockedDates.filter((_, i) => i !== index) }))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await api.put('/availability', availability)
      setAvailability(res.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !availability) {
    return (
      <AdminLayout title="Availability">
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      </AdminLayout>
    )
  }

  const sortedSchedule = [...availability.weeklySchedule].sort((a, b) => a.day - b.day)

  return (
    <AdminLayout title="Availability">
      <p className="mb-6 max-w-2xl text-sm text-ink/60">
        This schedule controls which slots patients can book - both on the website and through the WhatsApp booking bot.
      </p>

      <div className="max-w-3xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Slot duration (minutes)</label>
              <input
                type="number"
                value={availability.slotDurationMinutes}
                onChange={(e) => setAvailability((a) => ({ ...a, slotDurationMinutes: Number(e.target.value) }))}
                className="input"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink/80">Patients per slot</label>
              <input
                type="number"
                value={availability.slotsPerBooking}
                onChange={(e) => setAvailability((a) => ({ ...a, slotsPerBooking: Number(e.target.value) }))}
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sortedSchedule.map((day) => {
            const dayIndex = availability.weeklySchedule.findIndex((d) => d.day === day.day)
            return (
              <div key={day.day} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold text-teal-800">{dayNames[day.day]}</p>
                  <label className="flex items-center gap-2 text-sm text-ink/70">
                    <input
                      type="checkbox"
                      checked={day.isOpen}
                      onChange={(e) => updateDay(dayIndex, 'isOpen', e.target.checked)}
                      className="h-4 w-4 accent-teal-600"
                    />
                    Open
                  </label>
                </div>

                {day.isOpen && (
                  <div className="mt-3 space-y-2">
                    {day.windows.map((w, wi) => (
                      <div key={wi} className="flex flex-wrap items-center gap-2">
                        <input type="time" value={w.start} onChange={(e) => updateWindow(dayIndex, wi, 'start', e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
                        <span className="text-ink/40">to</span>
                        <input type="time" value={w.end} onChange={(e) => updateWindow(dayIndex, wi, 'end', e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
                        <button onClick={() => removeWindow(dayIndex, wi)} className="rounded-lg bg-red-50 p-2 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => addWindow(dayIndex)} className="flex items-center gap-1.5 text-sm font-medium text-teal-600">
                      <Plus size={14} /> Add time window
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="flex items-center gap-2 font-display font-semibold text-teal-800"><CalendarOff size={18} /> Blocked Dates (holidays, leave)</p>
          <div className="mt-4 space-y-2">
            {(availability.blockedDates || []).map((b, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-sand-50 px-4 py-2.5 text-sm">
                <span>{b.date} {b.reason && <span className="text-ink/50">- {b.reason}</span>}</span>
                <button onClick={() => removeBlockedDate(i)} className="rounded-lg bg-red-50 p-1.5 text-red-500"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <input type="date" value={newBlockedDate} onChange={(e) => setNewBlockedDate(e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
            <input placeholder="Reason (optional)" value={newBlockedReason} onChange={(e) => setNewBlockedReason(e.target.value)} className="rounded-lg border border-teal-200 px-3 py-1.5 text-sm" />
            <button onClick={addBlockedDate} className="flex items-center gap-1.5 rounded-lg bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-teal-fade px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-70"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Availability
        </button>
        {saved && <span className="ml-3 text-sm font-medium text-teal-600">Saved!</span>}
      </div>
    </AdminLayout>
  )
}
