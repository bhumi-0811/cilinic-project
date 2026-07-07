import { ShieldCheck, Eye, Target } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import interiorImg from '../assets/interior-1.jpg'

export default function About() {
  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">About Vijaya Clinics</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Centre for Skin &amp; Mental Health, Nagpur</p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <img src={interiorImg} alt="Vijaya Clinics interior" className="w-full rounded-3xl object-cover shadow-soft" />
        <div>
          <SectionHeading eyebrow="Our Story" title="Where dermatology meets calm" />
          <p className="mt-6 text-ink/75">
            Vijaya Clinics was founded to close a gap we kept seeing: skin conditions and mental wellbeing are rarely treated as connected, even though they so often are. Stress shows up on the skin, and skin conditions weigh on the mind. Our clinic in Chatrapati Nagar, Nagpur, brings both kinds of care into one calm, considered space.
          </p>
          <p className="mt-4 text-ink/75">
            From advanced dermatology treatments to a dedicated, private counselling room, every part of Vijaya Clinics is designed around one idea: patients deserve care that treats the whole person.
          </p>
        </div>
      </section>

      <section className="bg-sand-50 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3 lg:px-8">
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <Target className="mx-auto text-teal-600" size={28} />
            <p className="mt-4 font-display font-semibold text-teal-800">Our Mission</p>
            <p className="mt-2 text-sm text-ink/65">To deliver evidence-based dermatology and compassionate mental wellness care, accessible to every patient who walks through our doors.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <Eye className="mx-auto text-teal-600" size={28} />
            <p className="mt-4 font-display font-semibold text-teal-800">Our Vision</p>
            <p className="mt-2 text-sm text-ink/65">To be Nagpur's most trusted centre for integrated skin and mental health care, known for both clinical excellence and genuine warmth.</p>
          </div>
          <div className="rounded-2xl bg-white p-8 text-center shadow-card">
            <ShieldCheck className="mx-auto text-teal-600" size={28} />
            <p className="mt-4 font-display font-semibold text-teal-800">Our Promise</p>
            <p className="mt-2 text-sm text-ink/65">Personalised treatment plans, modern equipment, and a comfortable environment — every single visit.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
