import { useState } from 'react'
import { Building2, Video } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import InClinicForm from '../components/InClinicForm.jsx'
import TeleConsultForm from '../components/TeleConsultForm.jsx'

export default function Appointment() {
  const [tab, setTab] = useState('in-clinic')

  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Book an Appointment</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Choose in-clinic or video consultation — either way, Dr. Nikam will be ready for you.</p>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Appointment" title="How would you like to be seen?" />

        <div className="mx-auto mt-8 flex max-w-sm rounded-full bg-teal-50 p-1.5">
          <button
            onClick={() => setTab('in-clinic')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-semibold transition sm:gap-2 sm:text-sm ${
              tab === 'in-clinic' ? 'bg-teal-fade text-white shadow-soft' : 'text-teal-700'
            }`}
          >
            <Building2 size={16} className="shrink-0" /> <span className="truncate">In-Clinic</span>
          </button>
          <button
            onClick={() => setTab('tele')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-semibold transition sm:gap-2 sm:text-sm ${
              tab === 'tele' ? 'bg-teal-fade text-white shadow-soft' : 'text-teal-700'
            }`}
          >
            <Video size={16} className="shrink-0" /> <span className="truncate">Tele Consultation</span>
          </button>
        </div>

        <div className="mt-10 rounded-3xl border border-teal-100 bg-white p-5 shadow-card sm:p-10">
          {tab === 'in-clinic' ? <InClinicForm /> : <TeleConsultForm />}
        </div>
      </div>
    </div>
  )
}
