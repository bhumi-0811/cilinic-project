import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import FAQ from '../models/FAQ.js'
import Review from '../models/Review.js'

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

async function seed() {
  await connectDB()
  await FAQ.deleteMany()
  await Review.deleteMany()
  await FAQ.insertMany(faqs)
  await Review.insertMany(reviews)
  console.log('Seed data inserted successfully')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
