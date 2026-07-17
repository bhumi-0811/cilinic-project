import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2, CheckCircle2, Send } from 'lucide-react'
import api from '../utils/api.js'

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [status, setStatus] = useState('idle')

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await api.post('/contact', data)
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-teal-50 p-8 text-center">
        <CheckCircle2 className="text-teal-600" size={36} />
        <p className="font-display text-lg font-semibold text-teal-800">Message sent!</p>
        <p className="text-sm text-ink/70">We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <input {...register('name', { required: true })} placeholder="Your name" className="input" />
        {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
      </div>
      <div>
        <input type="email" {...register('email', { required: true })} placeholder="Email address" className="input" />
        {errors.email && <p className="mt-1 text-xs text-red-500">Email is required</p>}
      </div>
      <div>
        <input {...register('phone', { required: true, pattern: /^[0-9]{10}$/ })} placeholder="Phone number" className="input" />
        {errors.phone && <p className="mt-1 text-xs text-red-500">Enter a valid 10-digit number</p>}
      </div>
      <div>
        <textarea {...register('message', { required: true })} rows={4} placeholder="Your message" className="input" />
        {errors.message && <p className="mt-1 text-xs text-red-500">Message is required</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 rounded-full bg-teal-fade px-6 py-3.5 font-semibold text-white shadow-soft transition hover:scale-[1.01] disabled:opacity-70"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <Send size={16} />}
        Send Message
      </button>
      {status === 'error' && <p className="text-center text-sm text-red-500">Couldn't send right now - please call us instead.</p>}
    </form>
  )
}
