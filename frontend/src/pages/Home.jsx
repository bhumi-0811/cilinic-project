import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Phone, Sparkles, ShieldCheck, HeartHandshake, Users, Brain, Stethoscope } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import TreatmentCard from '../components/TreatmentCard.jsx'
import { clinic, doctor, stats, allTreatments } from '../utils/clinicData.js'
import doctorImg from '../assets/doctor-video.jpg'
import entranceImg from '../assets/entrance-door.jpg'

const highlights = [
  { icon: Sparkles, title: 'Modern Equipment', desc: 'Advanced diagnostic and treatment technology for reliable, safe results.' },
  { icon: HeartHandshake, title: 'Personalized Care', desc: 'Every treatment plan is built around your skin, history, and comfort.' },
  { icon: Stethoscope, title: 'Experienced Dermatologist', desc: '12+ years of focused clinical dermatology practice in Nagpur.' },
  { icon: ShieldCheck, title: 'Comfortable Environment', desc: 'A calm, clean clinic — including a dedicated counselling room.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-fade">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-mint-300/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white/90">
              <Brain size={14} /> Skin Care &amp; Mental Wellness, Together
            </p>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Healthy Skin. <br /> Calm Mind. <br /> Confident You.
            </h1>
            <p className="mt-5 max-w-md text-sm text-white/85 sm:text-base">
              Vijaya Clinics brings expert dermatology and thoughtful mental wellness care together under one roof in Nagpur — led by Dr. Amit Nikam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/appointment" className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-700 shadow-soft transition hover:scale-105 sm:px-6 sm:py-3.5 sm:text-base">
                <Calendar size={18} /> Book Appointment
              </Link>
              <a href={`tel:${clinic.phone}`} className="flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-base">
                <Phone size={18} /> Call Now
              </a>
            </div>
          </motion.div>
          <div className="pb-6 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[240px] sm:max-w-sm"
          >
            <div className="glass rounded-3xl p-2 shadow-soft">
              <img src={doctorImg} alt="Dr. Amit Nikam at Vijaya Clinics" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            </div>
            <div className="glass-dark absolute -bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl px-4 py-3 text-center text-white shadow-soft sm:-bottom-6 sm:left-0 sm:w-auto sm:translate-x-0 sm:px-5 sm:py-4 sm:text-left">
              <p className="font-display text-sm font-semibold">{doctor.name}</p>
              <p className="text-xs text-white/80">{doctor.designation}</p>
            </div>
          </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/15 bg-black/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-8 sm:grid-cols-4 sm:gap-6 sm:px-6 sm:py-10 lg:px-8">
            {stats.map((s) => <AnimatedCounter key={s.label} {...s} />)}
          </div>
        </div>
      </section>

      {/* Consultation cards */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Book a Consultation" title="Two ways to begin your care" subtitle="Choose the path that fits how you want to be seen — in person or from wherever you are." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-teal-100 bg-white p-8 shadow-card">
            <div className="mb-5 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600"><Stethoscope size={26} /></div>
            <h3 className="font-display text-xl font-semibold text-teal-800">Skin Health Consultation</h3>
            <p className="mt-2 text-sm text-ink/70">In-clinic exams, online follow-ups, or a video consultation — whichever suits you.</p>
            <ul className="mt-4 space-y-1 text-sm text-ink/60">
              <li>• Online</li><li>• In-clinic</li><li>• Video Consultation</li>
            </ul>
            <Link to="/appointment" className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white">
              Book Skin Consultation
            </Link>
          </div>
          <div className="rounded-3xl border border-mint-200 bg-mint-50 p-8 shadow-card">
            <div className="mb-5 inline-flex rounded-2xl bg-white p-3 text-mint-600"><Brain size={26} /></div>
            <h3 className="font-display text-xl font-semibold text-teal-800">Mental Wellness Consultation</h3>
            <p className="mt-2 text-sm text-ink/70">A private, judgement-free space to talk — online, in person, or over video.</p>
            <ul className="mt-4 space-y-1 text-sm text-ink/60">
              <li>• Online</li><li>• In-person</li><li>• Video Consultation</li>
            </ul>
            <Link to="/appointment" className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white">
              Book Mental Wellness Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-sand-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Why Choose Us" title="Clinic highlights" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="rounded-2xl bg-white p-6 text-center shadow-card">
                <div className="mx-auto inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600"><h.icon size={22} /></div>
                <p className="mt-4 font-display font-semibold text-teal-800">{h.title}</p>
                <p className="mt-2 text-sm text-ink/65">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments preview */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading eyebrow="Treatments" title="Explore our specialized care" subtitle="A few of the treatments we offer — browse the full list for details on each." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTreatments.slice(0, 9).map((t) => <TreatmentCard key={t.slug} {...t} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/treatments" className="text-sm font-semibold text-teal-600 underline">View all treatments →</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-teal-800 px-6 py-14 text-center sm:py-16">
        <img src={entranceImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="relative mx-auto max-w-2xl px-6">
          <Users className="mx-auto text-mint-300" size={32} />
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">Ready to feel better in your skin — and your mind?</h2>
          <Link to="/appointment" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-teal-700 shadow-soft transition hover:scale-105">
            <Calendar size={18} /> Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
