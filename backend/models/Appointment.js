import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['in-clinic', 'tele-consultation'], required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
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
    // Shared
    reportUrl: String,
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Appointment', appointmentSchema)
