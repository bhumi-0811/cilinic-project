import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, CheckCircle2 } from 'lucide-react'
import api from '../utils/api.js'

export default function TeleConsultForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [status, setStatus] = useState('idle')

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'reports' && value?.[0]) formData.append('reports', value[0])
        else formData.append(key, value)
      })
      formData.append('type', 'tele-consultation')
      await api.post('/appointments', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-mint-50 p-10 text-center">
        <CheckCircle2 className="text-teal-600" size={40} />
        <p className="font-display text-lg font-semibold text-teal-800">Video consultation requested!</p>
        <p className="text-sm text-ink/70">We'll email your meeting link once the slot is confirmed.</p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm font-medium text-teal-600 underline">Book another</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <Field label="Full Name" error={errors.name}>
        <input {...register('name', { required: 'Name is required' })} className="input" placeholder="Your name" />
      </Field>
      <Field label="Age" error={errors.age}>
        <input type="number" {...register('age', { required: 'Age is required', min: 1 })} className="input" placeholder="Age" />
      </Field>
      <Field label="Gender" error={errors.gender}>
        <select {...register('gender', { required: 'Please select' })} className="input">
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <input {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' } })} className="input" placeholder="10-digit mobile number" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Email" error={errors.email}>
          <input type="email" {...register('email', { required: 'Email is required' })} className="input" placeholder="you@email.com" />
        </Field>
      </div>
      <Field label="Consultation Type" error={errors.consultType}>
        <select {...register('consultType', { required: true })} className="input">
          <option value="Skin">Skin Health Consultation</option>
          <option value="Mental Wellness">Mental Wellness Consultation</option>
        </select>
      </Field>
      <Field label="Preferred Time" error={errors.preferredTime}>
        <input type="datetime-local" {...register('preferredTime', { required: 'Preferred time is required' })} className="input" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Describe your concern" error={errors.problem}>
          <textarea {...register('problem', { required: 'Please describe your concern' })} rows={3} className="input" placeholder="Briefly describe what you'd like to discuss" />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-ink/80">Upload Reports (optional)</label>
        <input type="file" {...register('reports')} className="w-full rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-sm" />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-fade px-6 py-3.5 font-semibold text-white shadow-soft transition hover:scale-[1.01] disabled:opacity-70"
        >
          {status === 'loading' && <Loader2 className="animate-spin" size={18} />}
          Request Video Consultation
        </button>
        {status === 'error' && <p className="mt-2 text-center text-sm text-red-500">Something went wrong. Please call us at 9168837837 or try again.</p>}
      </div>
    </form>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/80">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  )
}
