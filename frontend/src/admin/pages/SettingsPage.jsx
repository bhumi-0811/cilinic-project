import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, KeyRound, Mail, LogOut, CheckCircle2 } from 'lucide-react'
import AdminLayout from '../components/AdminLayout.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import api from '../../utils/api.js'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwMessage, setPwMessage] = useState(null)

  const [emailForm, setEmailForm] = useState({ newEmail: '', currentPassword: '' })
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailMessage, setEmailMessage] = useState(null)

  async function handlePasswordChange(e) {
    e.preventDefault()
    setPwMessage(null)
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMessage({ type: 'error', text: "New passwords don't match" })
      return
    }
    setPwLoading(true)
    try {
      await api.patch('/auth/change-password', {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      setPwMessage({ type: 'success', text: 'Password updated successfully' })
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setPwMessage({ type: 'error', text: err.response?.data?.message || 'Could not update password' })
    } finally {
      setPwLoading(false)
    }
  }

  async function handleEmailChange(e) {
    e.preventDefault()
    setEmailMessage(null)
    setEmailLoading(true)
    try {
      const res = await api.patch('/auth/change-email', emailForm)
      setEmailMessage({ type: 'success', text: `Email updated to ${res.data.email}` })
      setEmailForm({ newEmail: '', currentPassword: '' })
    } catch (err) {
      setEmailMessage({ type: 'error', text: err.response?.data?.message || 'Could not update email' })
    } finally {
      setEmailLoading(false)
    }
  }

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <AdminLayout title="Settings">
      <div className="grid max-w-2xl gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wide text-teal-500">Logged in as</p>
          <p className="mt-1 font-display font-semibold text-teal-800">{user?.name}</p>
          <p className="text-sm text-ink/60">{user?.email}</p>
        </div>

        <form onSubmit={handlePasswordChange} className="rounded-2xl bg-white p-6 shadow-card">
          <p className="flex items-center gap-2 font-display font-semibold text-teal-800"><KeyRound size={18} /> Change Password</p>
          <div className="mt-4 grid gap-3">
            <input type="password" required placeholder="Current password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} className="input" autoComplete="current-password" />
            <input type="password" required minLength={6} placeholder="New password (min 6 characters)" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} className="input" autoComplete="new-password" />
            <input type="password" required placeholder="Confirm new password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })} className="input" autoComplete="new-password" />
          </div>
          {pwMessage && (
            <p className={`mt-3 text-sm ${pwMessage.type === 'success' ? 'text-teal-600' : 'text-red-500'}`}>
              {pwMessage.type === 'success' && <CheckCircle2 size={14} className="mr-1 inline" />}{pwMessage.text}
            </p>
          )}
          <button type="submit" disabled={pwLoading} className="mt-4 flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft disabled:opacity-70">
            {pwLoading && <Loader2 className="animate-spin" size={16} />} Update Password
          </button>
        </form>

        <form onSubmit={handleEmailChange} className="rounded-2xl bg-white p-6 shadow-card">
          <p className="flex items-center gap-2 font-display font-semibold text-teal-800"><Mail size={18} /> Change Email</p>
          <div className="mt-4 grid gap-3">
            <input type="email" required placeholder="New email address" value={emailForm.newEmail} onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })} className="input" />
            <input type="password" required placeholder="Current password (to confirm)" value={emailForm.currentPassword} onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })} className="input" autoComplete="current-password" />
          </div>
          {emailMessage && (
            <p className={`mt-3 text-sm ${emailMessage.type === 'success' ? 'text-teal-600' : 'text-red-500'}`}>
              {emailMessage.type === 'success' && <CheckCircle2 size={14} className="mr-1 inline" />}{emailMessage.text}
            </p>
          )}
          <button type="submit" disabled={emailLoading} className="mt-4 flex items-center gap-2 rounded-full bg-teal-fade px-5 py-2.5 text-sm font-semibold text-white shadow-soft disabled:opacity-70">
            {emailLoading && <Loader2 className="animate-spin" size={16} />} Update Email
          </button>
        </form>

        <button onClick={handleLogout} className="flex items-center justify-center gap-2 rounded-full bg-teal-800 px-6 py-3.5 text-sm font-semibold text-white">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </AdminLayout>
  )
}
