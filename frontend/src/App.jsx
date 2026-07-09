import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingButtons from './components/FloatingButtons.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import Treatments from './pages/Treatments.jsx'
import TreatmentDetail from './pages/TreatmentDetail.jsx'
import Reviews from './pages/Reviews.jsx'
import FAQ from './pages/FAQ.jsx'
import Contact from './pages/Contact.jsx'
import Appointment from './pages/Appointment.jsx'
import NotFound from './pages/NotFound.jsx'

import ProtectedRoute from './admin/components/ProtectedRoute.jsx'
import AdminLogin from './admin/pages/Login.jsx'
import AdminDashboard from './admin/pages/Dashboard.jsx'
import AdminAppointments from './admin/pages/Appointments.jsx'
import AdminMessages from './admin/pages/Messages.jsx'
import AdminReviews from './admin/pages/ReviewsAdmin.jsx'
import AdminWebsite from './admin/pages/WebsiteManagement.jsx'
import AdminDoctorProfile from './admin/pages/DoctorProfileAdmin.jsx'
import AdminSettings from './admin/pages/SettingsPage.jsx'
import { SiteDataProvider } from './context/SiteDataContext.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <SiteDataProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </SiteDataProvider>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/doctor-profile" element={<PublicLayout><DoctorProfile /></PublicLayout>} />
        <Route path="/treatments" element={<PublicLayout><Treatments /></PublicLayout>} />
        <Route path="/treatments/:slug" element={<PublicLayout><TreatmentDetail /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/appointment" element={<PublicLayout><Appointment /></PublicLayout>} />

        {/* Admin / Doctor portal */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute><AdminAppointments /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />
        <Route path="/admin/website" element={<ProtectedRoute><AdminWebsite /></ProtectedRoute>} />
        <Route path="/admin/doctor-profile" element={<ProtectedRoute><AdminDoctorProfile /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  )
}
