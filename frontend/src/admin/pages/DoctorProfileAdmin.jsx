import { useEffect, useRef, useState } from 'react'
import { Loader2, Save, Camera } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import api from '../../utils/api.js'

export default function DoctorProfileAdmin() {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    api.get('/doctor').then((res) => setDoctor(res.data)).finally(() => setLoading(false))
  }, [])

  function updateField(field, value) {
    setDoctor((d) => ({ ...d, [field]: value }))
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  async function save() {
    setSaving(true)
    setSaved(false)
    try {
      const formData = new FormData()
      formData.append('name', doctor.name || '')
      formData.append('designation', doctor.designation || '')
      formData.append('bio', doctor.bio || '')
      formData.append('experienceYears', doctor.experienceYears || 0)
      formData.append('qualifications', (doctor.qualifications || []).join(', '))
      formData.append('specializations', (doctor.specializations || []).join(', '))
      formData.append('languages', (doctor.languages || []).join(', '))
      if (fileRef.current?.files?.[0]) formData.append('photo', fileRef.current.files[0])

      const res = await api.put('/doctor', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setDoctor(res.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading || !doctor) return (
    <AdminLayout title="Doctor Profile">
      <div className="flex justify-center py-16 text-teal-500"><Loader2 className="animate-spin" size={28} /></div>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Doctor Profile">
      <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={preview || doctor.photoUrl || 'https://via.placeholder.com/96?text=Doctor'}
              alt="Doctor"
              className="h-20 w-20 rounded-full border border-teal-100 object-cover"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 rounded-full bg-teal-fade p-1.5 text-white shadow-card"
              aria-label="Change photo"
            >
              <Camera size={14} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </div>
          <div>
            <p className="font-display font-semibold text-teal-800">Profile Photo</p>
            <p className="text-xs text-ink/55">Click the camera icon to change</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={doctor.name} onChange={(v) => updateField('name', v)} />
          <Field label="Designation" value={doctor.designation} onChange={(v) => updateField('designation', v)} />
          <Field label="Years of Experience" value={doctor.experienceYears} onChange={(v) => updateField('experienceYears', v)} type="number" />
          <Field label="Languages (comma separated)" value={(doctor.languages || []).join(', ')} onChange={(v) => updateField('languages', v.split(',').map((s) => s.trim()))} />
          <div className="sm:col-span-2">
            <Field label="About / Bio" value={doctor.bio} onChange={(v) => updateField('bio', v)} textarea />
          </div>
          <div className="sm:col-span-2">
            <Field label="Qualifications (comma separated)" value={(doctor.qualifications || []).join(', ')} onChange={(v) => updateField('qualifications', v.split(',').map((s) => s.trim()))} textarea />
          </div>
          <div className="sm:col-span-2">
            <Field label="Specializations (comma separated)" value={(doctor.specializations || []).join(', ')} onChange={(v) => updateField('specializations', v.split(',').map((s) => s.trim()))} textarea />
          </div>
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
    </AdminLayout>
  )
}

function Field({ label, value, onChange, textarea = false, type = 'text' }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/80">{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={2} className="input" />
      ) : (
        <input type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="input" />
      )}
    </div>
  )
}
