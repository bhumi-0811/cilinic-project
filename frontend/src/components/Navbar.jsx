import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpg'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dermatology', label: 'Dermatology' },
  { to: '/psychiatry', label: 'Psychiatry' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'
  // On the home page the hero is dark/full-bleed, so start transparent with light text.
  // Every other page has a light background right at the top, so the bar should never be transparent there.
  const transparent = isHome && !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent ? 'bg-transparent' : 'glass shadow-card'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vijaya Clinics logo" className="h-9 w-9 shrink-0 rounded-full object-cover shadow-soft sm:h-11 sm:w-11" />
          <div className="min-w-0 leading-tight">
            <p className={`truncate font-display text-base font-semibold sm:text-lg ${transparent ? 'text-white' : 'text-teal-700'}`}>
              Vijaya Clinics
            </p>
            <p className={`hidden truncate text-[11px] tracking-wide min-[380px]:block ${transparent ? 'text-white/75' : 'text-teal-500'}`}>
              Centre for Skin &amp; Mental Health
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.label}
                to={l.to}
                className={`relative text-sm font-medium transition-colors ${
                  transparent
                    ? active ? 'text-white' : 'text-white/80 hover:text-white'
                    : active ? 'text-teal-700' : 'text-ink/70 hover:text-teal-600'
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ${active ? 'scale-x-100' : ''}`}
                />
              </Link>
            )
          })}
        </div>

        <button
          className={`shrink-0 rounded-lg p-2 lg:hidden ${transparent ? 'text-white' : 'text-teal-700'}`}
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
            {links.map((l) => {
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${active ? 'bg-teal-50 text-teal-700' : 'text-ink/70'}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
