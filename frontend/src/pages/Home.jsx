import { useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, HeartHandshake, Users, MapPin, Phone, Mail } from 'lucide-react'
import Hero from '../components/Hero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import AnimatedCounter from '../components/AnimatedCounter.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import CinematicGallery from '../components/CinematicGallery.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import { stats, dermatologist, psychiatrist, dermatologyReviews, psychiatryReviews } from '../utils/clinicData.js'
import { useSiteData } from '../context/SiteDataContext.jsx'
import doctorImgFallback from '../assets/doctor-amit.jpeg'
import prithishaImg from '../assets/dr-pritisha.jpg'
import interiorImg from '../assets/interior-1.jpg'

const whyUs = [
  { icon: Sparkles, title: 'Specialist-Led Care', desc: 'Every consultation is led directly by a specialist - dermatology and psychiatry, under one roof.' },
  { icon: HeartHandshake, title: 'Personalised Attention', desc: 'Treatment plans built around your skin, mind and history - never a one-size-fits-all protocol.' },
  { icon: ShieldCheck, title: 'Evidence-Based Approach', desc: 'Modern, well-maintained equipment and clinically grounded treatment decisions.' },
  { icon: Users, title: 'Skin & Mind, Together', desc: 'One clinic identity built on the belief that skin health and mental wellness are deeply connected.' },
]

export default function Home() {
  const { settings: clinic, doctor } = useSiteData()
  const amitPhoto = doctor.photoUrl || doctorImgFallback
  const galleryRef = useRef(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('section') === 'gallery') {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  return (
    <div>
      <Hero />

      {/* About Vijaya Clinics */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img src={interiorImg} alt="Vijaya Clinics interior" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft" />
            <div className="glass-dark absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-5 text-white shadow-soft sm:-right-8">
              <p className="font-display text-3xl font-semibold">2</p>
              <p className="mt-1 text-xs text-white/80">Specialities under one calm, considered roof</p>
            </div>
          </motion.div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-500">About Vijaya Clinics</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-teal-800 sm:text-4xl">
              Where skin care meets peace of mind
            </h2>
            <p className="mt-6 text-ink/70">
              Vijaya Clinics was founded on a simple observation: skin conditions and mental wellbeing are rarely unrelated. Stress surfaces on the skin, and skin concerns weigh on the mind. Our clinic in Nagpur brings both kinds of specialist care into one calm, considered space.
            </p>
            <p className="mt-4 text-ink/70">
              Led by a dermatologist and a psychiatrist working under a single clinic identity, Vijaya Clinics is built around evidence-based care, modern equipment, and the belief that patients deserve to be treated as whole people - not just symptoms.
            </p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 underline underline-offset-4">
              Discover Our Approach
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 rounded-[2rem] bg-teal-fade px-6 py-10 sm:grid-cols-4 sm:px-10">
          {stats.map((s) => <AnimatedCounter key={s.label} {...s} />)}
        </div>
      </section>

      {/* Two Specialities - doctor cards */}
      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Meet Our Specialists" title="Two Specialities, One Clinic" subtitle="Dermatology and Psychiatry, each led by a dedicated specialist." />
          <div className="mt-14 grid gap-7 sm:grid-cols-2">
            <DoctorCard
              photo={amitPhoto}
              name={dermatologist.name}
              specialty="Dermatology"
              intro="Evidence-based skin, hair and aesthetic care with a calm, patient-first approach."
              to="/dermatology"
              accent="teal"
            />
            <DoctorCard
              photo={prithishaImg}
              name={psychiatrist.name}
              specialty="Psychiatry & Mental Health"
              intro="Personalised, evidence-based care for mental health and relationship concerns."
              to="/psychiatry"
              accent="mint"
            />
          </div>
        </div>
      </section>

      {/* Dermatology preview */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-500">Dermatology</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-teal-800 sm:text-4xl">Skin &amp; hair care, led by {dermatologist.name}</h2>
            <p className="mt-6 text-ink/70">{dermatologist.bio}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {dermatologist.concerns.slice(0, 6).map((c) => (
                <li key={c} className="rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-medium text-teal-700">{c}</li>
              ))}
            </ul>
            <Link to="/dermatology" className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-fade px-6 py-3.5 font-semibold text-white shadow-soft transition hover:scale-[1.02]">
              Explore Dermatology
            </Link>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            src={amitPhoto}
            alt={dermatologist.name}
            className="order-1 aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft lg:order-2"
          />
        </div>
      </section>

      {/* Psychiatry preview */}
      <section className="bg-mint-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              src={prithishaImg}
              alt={psychiatrist.name}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mint-600">Psychiatry &amp; Mental Health</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-teal-800 sm:text-4xl">A calm space, led by {psychiatrist.name}</h2>
              <p className="mt-6 text-ink/70">{psychiatrist.bio}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {psychiatrist.concerns.slice(0, 6).map((c) => (
                  <li key={c} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-mint-700">{c}</li>
                ))}
              </ul>
              <Link to="/psychiatry" className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 font-semibold text-white shadow-soft transition hover:scale-[1.02]">
                Explore Psychiatry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div ref={galleryRef}>
        <CinematicGallery />
      </div>

      {/* Patient stories */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Patient Stories" title="What patients tell us" />
          <div className="mt-14 grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-teal-500">Dermatology</p>
              <TestimonialCarousel reviews={dermatologyReviews} accent="teal" />
            </div>
            <div>
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-mint-600">Psychiatry</p>
              <TestimonialCarousel reviews={psychiatryReviews} accent="mint" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Vijaya Clinics */}
      <section className="bg-sand-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading eyebrow="Why Vijaya Clinics" title="Care you can trust" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-6 text-center shadow-card">
                <div className="mx-auto inline-flex rounded-2xl bg-teal-50 p-3 text-teal-600"><w.icon size={22} /></div>
                <p className="mt-4 font-display font-semibold text-teal-800">{w.title}</p>
                <p className="mt-2 text-sm text-ink/65">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <div className="rounded-[2.5rem] bg-teal-fade px-8 py-16 text-center text-white sm:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Get in Touch</p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-3xl font-semibold sm:text-4xl">
            We're here for your skin and your mind
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/85">
            <span className="flex items-center gap-2"><MapPin size={16} /> {clinic.address}</span>
            <span className="flex items-center gap-2"><Phone size={16} /> {clinic.phone}</span>
            <span className="flex items-center gap-2"><Mail size={16} /> {clinic.email}</span>
          </div>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-teal-700 shadow-soft transition hover:scale-105">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
