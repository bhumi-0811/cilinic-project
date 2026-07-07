import mongoose from 'mongoose'

const faqSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('FAQ', faqSchema)
