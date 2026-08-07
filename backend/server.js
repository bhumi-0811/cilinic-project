import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import faqRoutes from './routes/faqRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import treatmentRoutes from './routes/treatmentRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import availabilityRoutes from './routes/availabilityRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import whatsappRoutes from './routes/whatsappRoutes.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
// Capture raw body too - needed to verify the Razorpay webhook signature
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads', express.static(path.resolve('uploads')))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 })
app.use('/api', limiter)

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Vijaya Clinics API is running' }))

app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/faqs', faqRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/treatments', treatmentRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/whatsapp', whatsappRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Vijaya Clinics API running on http://localhost:${PORT}`))
})
