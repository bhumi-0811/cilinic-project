import { Link } from 'react-router-dom'
import { GraduationCap, Languages, Stethoscope, Calendar } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { doctor } from '../utils/clinicData.js'
import doctorImg from '../assets/doctor-desk.jpg'

export default function DoctorProfile() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <img src={doctorImg} alt={doctor.name} className="w-full rounded-3xl object-cover shadow-soft" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-500">Doctor Profile</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-teal-800 sm:text-4xl">{doctor.name}</h1>
          <p className="mt-1 text-teal-600">{doctor.designation}</p>
          <p className="mt-6 text-ink/75">{doctor.bio}</p>

          <div className="mt-8 space-y-4">
            <div className="flex gap-3">
              <GraduationCap className="mt-0.5 shrink-0 text-teal-500" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink/85">Qualifications</p>
                <ul className="mt-1 space-y-1 text-sm text-ink/65">
                  {doctor.qualifications.map((q) => <li key={q}>{q}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <Stethoscope className="mt-0.5 shrink-0 text-teal-500" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink/85">Specializations</p>
                <p className="mt-1 text-sm text-ink/65">{doctor.specializations.join(', ')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Languages className="mt-0.5 shrink-0 text-teal-500" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink/85">Languages</p>
                <p className="mt-1 text-sm text-ink/65">{doctor.languages.join(', ')}</p>
              </div>
            </div>
          </div>

          <Link to="/appointment" className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-fade px-6 py-3.5 font-semibold text-white shadow-soft">
            <Calendar size={18} /> Book a Consultation
          </Link>
        </div>
      </section>

      <section className="bg-sand-50 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="Timeline" title="Experience &amp; Education" />
          <div className="mt-10 space-y-6 border-l-2 border-teal-200 pl-6">
            <div>
              <p className="font-display font-semibold text-teal-800">DDV — College of Physicians and Surgeons, Mumbai</p>
              <p className="text-sm text-ink/60">Postgraduate diploma in dermatology, venereology &amp; leprosy</p>
            </div>
            <div>
              <p className="font-display font-semibold text-teal-800">MBBS — Jawaharlal Nehru Medical College, Sawangi, Wardha</p>
              <p className="text-sm text-ink/60">Foundational medical degree</p>
            </div>
            <div>
              <p className="font-display font-semibold text-teal-800">Practicing Dermatologist, Nagpur</p>
              <p className="text-sm text-ink/60">12+ years treating skin, hair and mental wellness concerns across Nagpur</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
