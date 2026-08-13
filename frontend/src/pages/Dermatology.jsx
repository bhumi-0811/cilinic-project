import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Languages, BadgeCheck, Calendar, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import TreatmentCard from '../components/TreatmentCard.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import { dermatologist, allTreatments, dermatologyProcess, dermatologyReviews } from '../utils/clinicData.js'
import { useSiteData } from '../context/SiteDataContext.jsx'
import doctorImgFallback from '../assets/doctor-desk.jpg'
import treatmentRoomImg from '../assets/treatment-room.jpg'

export default function Dermatology() {
  const { settings: clinic, doctor, treatments } = useSiteData()
  const photo = doctor.photoUrl || doctorImgFallback
  const treatmentList = (treatments.length ? treatments : allTreatments).slice(0, 9)

  return (
    <div>
      {/* Doctor intro */}
      <section className="bg-teal-fade px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mint-200">Dermatology</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">{dermatologist.name}</h1>
            <p className="mt-2 text-white/80">{dermatologist.role}</p>
            <p className="mt-6 max-w-xl text-white/85">{dermatologist.bio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <GraduationCap className="mt-0.5 shrink-0 text-mint-200" size={20} />
                <div>
                  <p className="text-sm font-semibold text-white">Qualifications</p>
                  <p className="mt-1 text-sm text-white/75">{dermatologist.qualifications.join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <BadgeCheck className="mt-0.5 shrink-0 text-mint-200" size={20} />
                <div>
                  <p className="text-sm font-semibold text-white">Experience</p>
                  <p className="mt-1 text-sm text-white/75">{dermatologist.experienceYears}+ years</p>
                </div>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Languages className="mt-0.5 shrink-0 text-mint-200" size={20} />
                <div>
                  <p className="text-sm font-semibold text-white">Languages</p>
                  <p className="mt-1 text-sm text-white/75">{dermatologist.languages.join(', ')}</p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs text-white/50">{dermatologist.registration}</p>
          </div>

          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            src={photo}
            alt={dermatologist.name}
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft"
          />
        </div>
      </section>

      {/* Concerns */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center lg:px-8">
        <SectionHeading eyebrow="Patient Concerns" title="Conditions Commonly Treated" />
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {dermatologist.concerns.map((c) => (
            <span key={c} className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">{c}</span>
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section className="bg-sand-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Treatments" title="Dermatology &amp; Aesthetic Care" subtitle="A sample of what we offer - see the full list for details on each." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentList.map((t) => <TreatmentCard key={t.slug} {...t} />)}
          </div>
          <div className="mt-8 text-center">
            <Link to="/treatments" className="text-sm font-semibold text-teal-600 underline underline-offset-4">View all treatments →</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading eyebrow="How We Work" title="Our Approach to Your Skin" />
        <div className="mt-14">
          <ProcessSteps steps={dermatologyProcess} accent="teal" />
        </div>
      </section>

      {/* Clinic photo strip */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        <img src={treatmentRoomImg} alt="Vijaya Clinics treatment room" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-teal-900/40" />
      </section>

      {/* Reviews */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Patient Stories" title="Dermatology Reviews" />
          <div className="mt-14">
            <TestimonialCarousel reviews={dermatologyReviews} accent="teal" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-teal-800 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Have a skin or hair concern?</h2>
          <p className="mt-3 text-white/75">Reach out to Vijaya Clinics - we're happy to answer your questions.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-2"><MapPin size={15} /> {clinic.address}</span>
            <span className="flex items-center gap-2"><Phone size={15} /> {clinic.phone}</span>
          </div>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-soft transition hover:scale-105">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
