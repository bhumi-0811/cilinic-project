import { useEffect, useState } from 'react'
import { Loader2, Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import api from '../../../utils/api.js'

const emptyForm = { category: '', question: '', answer: '' }

export default function FaqTab() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  function load() {
    setLoading(true)
    api.get('/faqs').then((res) => setFaqs(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function startEdit(f) {
    setEditing(f._id)
    setForm({ category: f.category, question: f.question, answer: f.answer })
  }

  function startNew() {
    setEditing('new')
    setForm(emptyForm)
  }

  async function save() {
    setSaving(true)
    try {
      if (editing === 'new') await api.post('/faqs', form)
      else await api.put(`/faqs/${editing}`, form)
      setEditing(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id) {
    if (!confirm('Delete this FAQ?')) return
    await api.delete(`/faqs/${id}`)
    load()
  }

  return (
    <div>
      <button onClick={startNew} className="flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft">
        <Plus size={16} /> Add FAQ
      </button>

      {editing && (
        <div className="mt-5 rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-teal-800">{editing === 'new' ? 'New FAQ' : 'Edit FAQ'}</p>
            <button onClick={() => setEditing(null)}><X size={18} className="text-ink/50" /></button>
          </div>
          <div className="mt-4 grid gap-3">
            <input placeholder="Category (e.g. Appointments)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input" />
            <input placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="input" />
            <textarea placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={3} className="input" />
          </div>
          <button onClick={save} disabled={saving || !form.question || !form.answer} className="mt-4 flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
      ) : (
        <div className="mt-6 space-y-2">
          {faqs.map((f) => (
            <div key={f._id} className="rounded-xl bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-500">{f.category}</p>
                  <p className="mt-1 text-sm font-semibold text-ink/85">{f.question}</p>
                  <p className="mt-1 text-sm text-ink/60">{f.answer}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => startEdit(f)} className="rounded-lg bg-teal-50 p-2 text-teal-600"><Pencil size={14} /></button>
                  <button onClick={() => remove(f._id)} className="rounded-lg bg-red-50 p-2 text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && <p className="text-center text-sm text-ink/50">No FAQs yet.</p>}
        </div>
      )}
    </div>
  )
}
