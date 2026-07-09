import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function Contact() {
  const { settings: clinic } = useSiteData()

  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">We're here to help — reach out any way that's easiest for you.</p>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get in Touch" title="Send us a message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-sand-50 p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-teal-600" size={20} />
                <div className="min-w-0">
                  <p className="font-semibold text-ink/85">{clinic.name}</p>
                  <p className="break-words text-sm text-ink/65">{clinic.address}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-sand-50 p-6">
              <div className="flex items-center gap-3">
                <Phone className="shrink-0 text-teal-600" size={20} />
                <a href={`tel:${clinic.phone}`} className="break-words text-ink/85 hover:text-teal-700">{clinic.phone}</a>
              </div>
            </div>
            <div className="rounded-2xl bg-sand-50 p-6">
              <div className="flex items-center gap-3">
                <Mail className="shrink-0 text-teal-600" size={20} />
                <a href={`mailto:${clinic.email}`} className="break-all text-ink/85 hover:text-teal-700">{clinic.email}</a>
              </div>
            </div>
            <div className="rounded-2xl bg-sand-50 p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 shrink-0 text-teal-600" size={20} />
                <ul className="space-y-1 text-sm text-ink/65">
                  {clinic.hours.map((h) => (
                    <li key={h.days}><span className="font-medium text-ink/80">{h.days}:</span> {h.time}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card">
              <iframe
                title="Vijaya Clinics location"
                src={clinic.mapEmbed}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
