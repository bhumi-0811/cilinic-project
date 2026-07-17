import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import FAQ from '../models/FAQ.js'
import Review from '../models/Review.js'
import User from '../models/User.js'
import Doctor from '../models/Doctor.js'
import Settings from '../models/Settings.js'
import Treatment from '../models/Treatment.js'
import { treatmentSeedData } from './treatmentSeedData.js'

dotenv.config()

const faqs = [
  { category: 'Appointments', question: 'How do I book an appointment at Vijaya Clinics?', answer: 'You can book online through our Appointment page, call us directly, or message us on WhatsApp.' },
  { category: 'Appointments', question: 'Can I reschedule my appointment?', answer: 'Yes, call the clinic at least a few hours in advance and our reception will help you find a new slot.' },
  { category: 'Consultation', question: 'Is video consultation as effective as an in-clinic visit?', answer: 'For most follow-ups and initial assessments, yes. For procedures, an in-clinic visit is recommended.' },
  { category: 'General', question: 'What are your clinic timings?', answer: 'Monday to Saturday, 11:30 AM–2:00 PM and 6:00 PM–8:30 PM. Closed Wednesdays and Sundays.' },
]

const reviews = [
  { name: 'Priya S.', rating: 5, comment: 'Dr. Nikam explained everything patiently and my skin has cleared up so much in 3 months.', approved: true },
  { name: 'Rohan M.', rating: 5, comment: 'The counselling room felt genuinely safe and non-judgemental.', approved: true },
  { name: 'Anjali T.', rating: 4, comment: 'Very professional staff, clean clinic, smooth video consultation.', approved: true },
]

function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function seed() {
  await connectDB()

  // FAQs and reviews
  await FAQ.deleteMany()
  await Review.deleteMany()
  await FAQ.insertMany(faqs)
  await Review.insertMany(reviews)

  // Treatments
  await Treatment.deleteMany()
  await Treatment.insertMany(treatmentSeedData.map((t) => ({ ...t, slug: slugify(t.name) })))

  // Doctor profile (singleton)
  const doctorExists = await Doctor.findOne()
  if (!doctorExists) {
    await Doctor.create({
      name: 'Dr. Amit Nikam',
      designation: 'Consultant Dermatologist',
      bio: 'Dr. Amit Nikam is a practicing dermatologist in Nagpur, dedicated to combining evidence-based skin care with a calm, patient-first approach.',
      qualifications: ['MBBS - Jawaharlal Nehru Medical College, Sawangi, Wardha', 'DDV - College of Physicians and Surgeons, Mumbai'],
      specializations: ['Clinical Dermatology', 'Aesthetic & Cosmetic Treatments', 'Hair & Scalp Disorders', 'Mental Wellness Counselling'],
      languages: ['English', 'Hindi', 'Marathi'],
      experienceYears: 12,
    })
  }

  // Clinic settings (singleton)
  const settingsExists = await Settings.findOne()
  if (!settingsExists) {
    await Settings.create({
      clinicName: 'Vijaya Clinics',
      phone: '9168837837',
      phoneAlt: '8010444800',
      email: 'amitsnikam@gmail.com',
      address: '5, Modern Society, Ring Road, Chatrapati Nagar, Nagpur, Maharashtra 440015',
      instagram: 'https://www.instagram.com/vijaya_clinics_nagpur',
      hours: [
        { days: 'Monday – Saturday', time: '11:30 AM – 2:00 PM & 6:00 PM – 8:30 PM' },
        { days: 'Wednesday', time: 'Closed' },
        { days: 'Sunday', time: 'Closed' },
      ],
    })
  }

  // Admin/Doctor login account
  const adminEmail = (process.env.ADMIN_EMAIL || 'amitsnikam@gmail.com').toLowerCase().trim()
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123'
  const userExists = await User.findOne({ email: adminEmail })
  if (!userExists) {
    await User.create({ name: 'Dr. Amit Nikam', email: adminEmail, password: adminPassword })
    console.log(`\nAdmin login created:\n  Email: ${adminEmail}\n  Password: ${adminPassword}\n  (Change this password after first login - Settings page in the admin dashboard)\n`)
  } else {
    console.log('\nAdmin login already exists - skipped creating a new one.\n')
  }

  console.log('Seed data inserted successfully')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
