import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sand-50">
        <Loader2 className="animate-spin text-teal-500" size={32} />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return children
}
