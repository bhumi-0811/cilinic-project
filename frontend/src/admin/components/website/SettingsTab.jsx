import { useEffect, useState } from 'react'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'
import api from '../../../utils/api.js'

export default function SettingsTab() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data)).finally(() => setLoading(false))
  }, [])

  function updateField(field, value) {
    setSettings((s) => ({ ...s, [field]: value }))
  }

  function updateHour(index, field, value) {
    setSettings((s) => {
      const hours = [...s.hours]
      hours[index] = { ...hours[index], [field]: value }
      return { ...s, hours }
    })
  }

  function addHourRow() {
    setSettings((s) => ({ ...s, hours: [...(s.hours || []), { days: '', time: '' }] }))
  }

  function removeHourRow(index) {
    setSettings((s) => ({ ...s, hours: s.hours.filter((_, i) => i !== index) }))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await api.put('/settings', settings)
      setSettings(res.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !settings) return <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>

  return (
    <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Clinic Name" value={settings.clinicName} onChange={(v) => updateField('clinicName', v)} />
        <Field label="Primary Phone" value={settings.phone} onChange={(v) => updateField('phone', v)} />
        <Field label="Alternate Phone" value={settings.phoneAlt} onChange={(v) => updateField('phoneAlt', v)} />
        <Field label="Email" value={settings.email} onChange={(v) => updateField('email', v)} />
        <div className="sm:col-span-2">
          <Field label="Address" value={settings.address} onChange={(v) => updateField('address', v)} textarea />
        </div>
        <div className="sm:col-span-2">
          <Field label="Instagram URL" value={settings.instagram} onChange={(v) => updateField('instagram', v)} />
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-ink/80">Opening Hours</p>
        <div className="space-y-2">
          {(settings.hours || []).map((h, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <input value={h.days} onChange={(e) => updateHour(i, 'days', e.target.value)} placeholder="Days (e.g. Monday - Saturday)" className="input flex-1" />
              <input value={h.time} onChange={(e) => updateHour(i, 'time', e.target.value)} placeholder="Time (e.g. 11:30 AM - 2:00 PM)" className="input flex-1" />
              <button onClick={() => removeHourRow(i)} className="rounded-lg bg-red-50 p-2.5 text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <button onClick={addHourRow} className="mt-3 flex items-center gap-1.5 text-sm font-medium text-teal-600">
          <Plus size={16} /> Add row
        </button>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="mt-8 flex items-center gap-2 rounded-full bg-teal-fade px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-70"
      >
        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
        Save Changes
      </button>
      {saved && <span className="ml-3 text-sm font-medium text-teal-600">Saved!</span>}
    </div>
  )
}

function Field({ label, value, onChange, textarea = false }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/80">{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={2} className="input" />
      ) : (
        <input value={value || ''} onChange={(e) => onChange(e.target.value)} className="input" />
      )}
    </div>
  )
}
