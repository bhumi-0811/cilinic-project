import mongoose from 'mongoose'

const treatmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    overview: { type: String, default: '' },
    benefits: { type: String, default: '' },
    duration: { type: String, default: '' },
    beforeAfterCare: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Treatment', treatmentSchema)
