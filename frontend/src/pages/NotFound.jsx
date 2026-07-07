import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-semibold text-teal-200">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-teal-800">Page not found</h1>
      <p className="mt-2 text-ink/65">The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="mt-6 rounded-full bg-teal-fade px-6 py-3 font-semibold text-white shadow-soft">Back to Home</Link>
    </div>
  )
}
