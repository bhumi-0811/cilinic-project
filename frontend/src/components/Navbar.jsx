import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Calendar } from 'lucide-react'
import logo from '../assets/logo.jpg'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/doctor-profile', label: 'Doctor' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-card' : 'bg-white/90'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vijaya Clinics logo" className="h-9 w-9 shrink-0 rounded-full object-cover shadow-soft sm:h-11 sm:w-11" />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-base font-semibold text-teal-700 sm:text-lg">Vijaya Clinics</p>
            <p className="hidden truncate text-[11px] tracking-wide text-teal-500 min-[380px]:block">Centre for Skin &amp; Mental Health</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-teal-600 ${isActive ? 'text-teal-700' : 'text-ink/70'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/appointment"
            className="flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105"
          >
            <Calendar size={16} /> Book Appointment
          </Link>
        </div>

        <button
          className="shrink-0 rounded-lg p-2 text-teal-700 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div id="mobileNav" className="glass border-t border-teal-100 px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-teal-50 text-teal-700' : 'text-ink/70'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-teal-fade px-5 py-3 text-sm font-semibold text-white"
            >
              <Calendar size={16} /> Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
