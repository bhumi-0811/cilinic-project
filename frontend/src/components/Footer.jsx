import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import logo from '../assets/logo.jpg'
import { useSiteData } from '../context/SiteDataContext.jsx'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/doctor-profile', label: 'Doctor' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/appointment', label: 'Appointment' },
]

export default function Footer() {
  const { settings: clinic } = useSiteData()
  return (
    <footer className="bg-teal-800 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Vijaya Clinics" className="h-10 w-10 rounded-full object-cover" />
            <p className="font-display text-lg font-semibold">Vijaya Clinics</p>
          </div>
          <p className="mt-4 text-sm text-white/70">Centre for Skin &amp; Mental Health — where dermatology meets calm, careful attention.</p>
          <div className="mt-5 flex gap-3">
            <a href={clinic.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook (coming soon)" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"><Facebook size={16} /></a>
            <a href="#" aria-label="YouTube (coming soon)" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20"><Youtube size={16} /></a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-mint-300">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {quickLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-mint-300">Important Links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-white">Cancellation Policy</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-mint-300">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> <span className="break-words">{clinic.address}</span></li>
            <li className="flex items-center gap-2"><Phone size={16} className="shrink-0" /> <a href={`tel:${clinic.phone}`} className="break-words hover:text-white">{clinic.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={16} className="shrink-0" /> <a href={`mailto:${clinic.email}`} className="break-all hover:text-white">{clinic.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Vijaya Clinics. All rights reserved. &nbsp;·&nbsp;
        <Link to="/admin/login" className="hover:text-white/90">Doctor/Admin Login</Link>
      </div>
    </footer>
  )
}
