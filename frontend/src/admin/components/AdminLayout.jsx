import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarCheck, MessageSquare, Star, Globe, UserCog, Settings as SettingsIcon,
  LogOut, Menu, X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import logo from '../../assets/logo.jpg'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarCheck },
  { to: '/admin/messages', label: 'Contact Messages', icon: MessageSquare },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/website', label: 'Website Management', icon: Globe },
  { to: '/admin/doctor-profile', label: 'Doctor Profile', icon: UserCog },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

export default function AdminLayout({ children, title }) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-teal-800 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display text-sm font-semibold text-white">Vijaya Admin</span>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="text-white" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-teal-800 pt-16 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:pt-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden items-center gap-3 border-b border-white/10 px-6 py-6 lg:flex">
          <img src={logo} alt="Vijaya Clinics" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="font-display text-sm font-semibold text-white">Vijaya Clinics</p>
            <p className="text-xs text-white/60">Admin Dashboard</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-teal-fade text-white shadow-soft' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} /> {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-4 py-5">
          <p className="truncate px-2 text-xs text-white/50">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
        />
      )}

      {/* Main content */}
      <main className="min-w-0 flex-1 px-4 pb-16 pt-20 sm:px-6 lg:px-10 lg:pt-10">
        {title && <h1 className="mb-6 font-display text-2xl font-semibold text-teal-800 sm:text-3xl">{title}</h1>}
        {children}
      </main>
    </div>
  )
}
