import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone, Calendar, ArrowUp } from 'lucide-react'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function FloatingButtons() {
  const { settings: clinic } = useSiteData()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-end gap-2.5 sm:right-5 sm:gap-3"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="rounded-full bg-white p-3 text-teal-700 shadow-card transition hover:scale-110"
        >
          <ArrowUp size={18} />
        </button>
      )}
      <a
        href={`https://wa.me/91${clinic.phone}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="rounded-full bg-[#25D366] p-3 text-white shadow-card transition hover:scale-110 sm:p-3.5"
      >
        <MessageCircle size={18} className="sm:hidden" />
        <MessageCircle size={20} className="hidden sm:block" />
      </a>
      <a
        href={`tel:${clinic.phone}`}
        aria-label="Call clinic"
        className="rounded-full bg-teal-600 p-3 text-white shadow-card transition hover:scale-110 sm:p-3.5"
      >
        <Phone size={18} className="sm:hidden" />
        <Phone size={20} className="hidden sm:block" />
      </a>
      <Link
        to="/appointment"
        aria-label="Book appointment"
        className="flex items-center gap-2 rounded-full bg-teal-fade px-3.5 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-105 sm:px-4 sm:py-3.5"
      >
        <Calendar size={18} />
        <span className="hidden sm:inline">Book</span>
      </Link>
    </div>
  )
}
