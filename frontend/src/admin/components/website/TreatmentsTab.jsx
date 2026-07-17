import { useEffect, useState } from 'react'
import { Loader2, Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import api from '../../../utils/api.js'

const emptyForm = { name: '', category: '', overview: '', benefits: '', duration: '', beforeAfterCare: '' }

export default function TreatmentsTab() {
  const [treatments, setTreatments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // treatment object or 'new'
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  function load() {
    setLoading(true)
    api.get('/treatments').then((res) => setTreatments(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function startEdit(t) {
    setEditing(t._id)
    setForm({ name: t.name, category: t.category, overview: t.overview || '', benefits: t.benefits || '', duration: t.duration || '', beforeAfterCare: t.beforeAfterCare || '' })
  }

  function startNew() {
    setEditing('new')
    setForm(emptyForm)
  }

  async function save() {
    setSaving(true)
    try {
      if (editing === 'new') {
        await api.post('/treatments', form)
      } else {
        await api.put(`/treatments/${editing}`, form)
      }
      setEditing(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id) {
    if (!confirm('Delete this treatment?')) return
    await api.delete(`/treatments/${id}`)
    load()
  }

  const grouped = treatments.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || []
    acc[t.category].push(t)
    return acc
  }, {})

  return (
    <div>
      <button onClick={startNew} className="flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft">
        <Plus size={16} /> Add Treatment
      </button>

      {editing && (
        <div className="mt-5 rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-teal-800">{editing === 'new' ? 'New Treatment' : 'Edit Treatment'}</p>
            <button onClick={() => setEditing(null)}><X size={18} className="text-ink/50" /></button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input placeholder="Treatment name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            <input placeholder="Category (e.g. Hair Treatments)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" />
            <input placeholder="Duration (e.g. 30-45 mins per session)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input sm:col-span-2" />
            <textarea placeholder="Overview" value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} rows={2} className="input sm:col-span-2" />
            <textarea placeholder="Benefits" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} rows={2} className="input sm:col-span-2" />
            <textarea placeholder="Before/After care instructions" value={form.beforeAfterCare} onChange={(e) => setForm({ ...form, beforeAfterCare: e.target.value })} rows={2} className="input sm:col-span-2" />
          </div>
          <button onClick={save} disabled={saving || !form.name || !form.category} className="mt-4 flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="mt-6 space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-teal-500">{category}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((t) => (
                  <div key={t._id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-card">
                    <span className="text-sm font-medium text-ink/80">{t.name}</span>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(t)} className="rounded-lg bg-teal-50 p-2 text-teal-600"><Pencil size={14} /></button>
                      <button onClick={() => remove(t._id)} className="rounded-lg bg-red-50 p-2 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {treatments.length === 0 && <p className="text-center text-sm text-ink/50">No treatments yet - add your first one above.</p>}
        </div>
      )}
    </div>
  )
}
