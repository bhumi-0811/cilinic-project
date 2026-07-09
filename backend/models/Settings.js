import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema(
  {
    clinicName: { type: String, default: 'Vijaya Clinics' },
    phone: { type: String, default: '9168837837' },
    phoneAlt: { type: String, default: '8010444800' },
    email: { type: String, default: 'amitsnikam@gmail.com' },
    address: { type: String, default: '5, Modern Society, Ring Road, Chatrapati Nagar, Nagpur, Maharashtra 440015' },
    instagram: { type: String, default: 'https://www.instagram.com/vijaya_clinics_nagpur' },
    hours: [
      {
        days: String,
        time: String,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Settings', settingsSchema)
