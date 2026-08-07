import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['in-clinic', 'tele-consultation'], required: true },
    source: { type: String, enum: ['website', 'whatsapp'], default: 'website' },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    problem: { type: String, required: true },
    // In-clinic specific
    date: String,
    time: String,
    doctor: { type: String, default: 'Dr. Amit Nikam' },
    // Tele-consultation specific
    consultType: { type: String, enum: ['Skin', 'Mental Wellness'] },
    preferredTime: String,
    meetingLink: String,
    paymentStatus: { type: String, enum: ['pending', 'paid', 'not-required'], default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    // Shared
    reportUrl: String,
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', appointmentSchema)
