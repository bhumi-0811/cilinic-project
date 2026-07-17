import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext.jsx'
import NotFound from './NotFound.jsx'

export default function TreatmentDetail() {
  const { slug } = useParams()
  const { treatments } = useSiteData()
  const treatment = treatments.find((t) => t.slug === slug)

  if (!treatment) return <NotFound />

  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-200">{treatment.category}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">{treatment.name}</h1>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-teal-800">Overview</h2>
            <p className="mt-2 text-sm text-ink/70">
              {treatment.overview || `${treatment.name} is treated at Vijaya Clinics with a personalised plan designed by Dr. Amit Nikam based on your skin type, medical history and severity of the condition.`}
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-teal-800">Benefits</h2>
            {treatment.benefits ? (
              <p className="mt-2 text-sm text-ink/70">{treatment.benefits}</p>
            ) : (
              <ul className="mt-2 space-y-1.5 text-sm text-ink/70">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-500" /> Evidence-based, dermatologist-led approach</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-500" /> Treatment plan tailored to your skin</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-500" /> Clear guidance on aftercare and follow-up</li>
              </ul>
            )}
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-teal-800">Duration &amp; Recovery</h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink/70">
              <Clock size={16} className="shrink-0 text-teal-500" />
              {treatment.duration || 'Session length and number of sittings vary by severity - discussed at consultation.'}
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-teal-800">Before &amp; After Care</h2>
            <p className="mt-2 text-sm text-ink/70">
              {treatment.beforeAfterCare || 'Specific pre- and post-treatment instructions will be shared by Dr. Nikam based on your exact treatment plan.'}
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-sand-50 p-8 text-center">
          <p className="font-display text-lg font-semibold text-teal-800">Ready to discuss {treatment.name.toLowerCase()}?</p>
          <Link to="/appointment" className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal-fade px-6 py-3 text-sm font-semibold text-white shadow-soft">
            <Calendar size={16} /> Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}
