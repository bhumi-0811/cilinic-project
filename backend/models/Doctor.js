import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Dr. Amit Nikam' },
    designation: { type: String, default: 'Consultant Dermatologist' },
    photoUrl: { type: String, default: '' },
    bio: { type: String, default: '' },
    qualifications: [{ type: String }],
    specializations: [{ type: String }],
    languages: [{ type: String }],
    experienceYears: { type: Number, default: 12 },
  },
  { timestamps: true }
)

export default mongoose.model('Doctor', doctorSchema)
