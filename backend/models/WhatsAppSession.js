import mongoose from 'mongoose'

// WhatsApp bots are stateless per webhook call, so we persist where each
// phone number is in the booking conversation between messages.
const whatsappSessionSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    step: {
      type: String,
      enum: ['start', 'awaiting_date', 'awaiting_slot', 'awaiting_name', 'awaiting_age', 'awaiting_gender', 'awaiting_problem', 'awaiting_payment_choice', 'done'],
      default: 'start',
    },
    data: {
      date: String,
      time: String,
      name: String,
      age: Number,
      gender: String,
      problem: String,
      paymentChoice: String, // 'online' | 'on-visit'
    },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model('WhatsAppSession', whatsappSessionSchema)
