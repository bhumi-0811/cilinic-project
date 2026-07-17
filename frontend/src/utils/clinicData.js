// Central source of truth for clinic content.
// Keeping this in one file avoids the "duplicated/typo'd data across pages" bugs from before.

export const clinic = {
  name: 'Vijaya Clinics',
  tagline: 'Centre for Skin & Mental Health',
  phone: '9168837837',
  phoneAlt: '8010444800',
  email: 'amitsnikam@gmail.com',
  address: '5, Modern Society, Ring Road, Chatrapati Nagar, Nagpur, Maharashtra 440015',
  mapEmbed: 'https://www.google.com/maps?q=Chhatrapati+Square+Nagpur&output=embed',
  instagram: 'https://www.instagram.com/vijaya_clinics_nagpur',
  hours: [
    { days: 'Monday – Saturday', time: '11:30 AM – 2:00 PM & 6:00 PM – 8:30 PM' },
    { days: 'Wednesday', time: 'Closed' },
    { days: 'Sunday', time: 'Closed' },
  ],
}

export const doctor = {
  name: 'Dr. Amit Nikam',
  designation: 'Consultant Dermatologist',
  qualifications: ['MBBS - Jawaharlal Nehru Medical College, Sawangi, Wardha', 'DDV - College of Physicians and Surgeons, Mumbai'],
  bio: 'Dr. Amit Nikam is a practicing dermatologist in Nagpur, dedicated to combining evidence-based skin care with a calm, patient-first approach. Vijaya Clinics was built on the belief that skin health and mental wellness are deeply connected - one rarely thrives without the other.',
  specializations: ['Clinical Dermatology', 'Aesthetic & Cosmetic Treatments', 'Hair & Scalp Disorders', 'Mental Wellness Counselling'],
  languages: ['English', 'Hindi', 'Marathi'],
}

export const treatmentCategories = [
  {
    id: 'clinical-disorders',
    label: 'Clinical Disorders',
    icon: 'ShieldPlus',
    treatments: [
      { slug: 'fungal-infections', name: 'Fungal Infections' },
      { slug: 'eczema', name: 'Eczema' },
      { slug: 'psoriasis', name: 'Psoriasis' },
      { slug: 'herpes', name: 'Herpes' },
      { slug: 'skin-allergy', name: 'Skin Allergy' },
      { slug: 'skin-infection', name: 'Skin Infection' },
      { slug: 'skin-tags', name: 'Skin Tags' },
      { slug: 'nail-disorders', name: 'Nail Disorders' },
    ],
  },
  {
    id: 'aesthetic-treatments',
    label: 'Aesthetic Treatments',
    icon: 'Sparkles',
    treatments: [
      { slug: 'derma-pen', name: 'Derma Pen' },
      { slug: 'prp-vampire-facial', name: 'PRP (Vampire Facial)' },
      { slug: 'hydrafacial', name: 'HydraFacial' },
      { slug: 'carbon-laser-peel', name: 'Carbon Laser Peel' },
      { slug: 'chemical-peels', name: 'Chemical Peels' },
      { slug: 'laser-hair-reduction', name: 'Laser Hair Reduction' },
      { slug: 'skin-tag-removal', name: 'Skin Tag Removal' },
      { slug: 'photofacial', name: 'Photofacial' },
    ],
  },
  {
    id: 'hair-treatments',
    label: 'Hair Treatments',
    icon: 'Wind',
    treatments: [
      { slug: 'gfc', name: 'GFC' },
      { slug: 'prp-for-hair', name: 'PRP for Hair' },
      { slug: 'hair-regrowth-therapy', name: 'Hair Regrowth Therapy' },
      { slug: 'dandruff-scalp-treatment', name: 'Dandruff & Scalp Treatment' },
      { slug: 'hair-fall-treatment', name: 'Hair Fall Treatment' },
      { slug: 'hair-thinning', name: 'Hair Thinning' },
      { slug: 'alopecia', name: 'Alopecia' },
      { slug: 'trichology', name: 'Trichology' },
    ],
  },
  {
    id: 'skin-anti-aging',
    label: 'Skin & Anti-Aging',
    icon: 'Sun',
    treatments: [
      { slug: 'anti-aging', name: 'Anti-Aging Treatments' },
      { slug: 'melasma', name: 'Melasma Treatment' },
      { slug: 'pigmentation', name: 'Pigmentation Treatment' },
      { slug: 'acne-treatment', name: 'Acne Treatment' },
      { slug: 'acne-scars', name: 'Acne Scar Treatment' },
      { slug: 'wrinkle-treatment', name: 'Wrinkle Treatment' },
      { slug: 'keloid-treatment', name: 'Keloid Treatment' },
      { slug: 'scar-treatment', name: 'Scar Treatment' },
    ],
  },
]

export const allTreatments = treatmentCategories.flatMap((c) => c.treatments.map((t) => ({ ...t, category: c.label })))

export const stats = [
  { label: 'Years of Experience', value: 12, suffix: '+' },
  { label: 'Happy Patients', value: 8000, suffix: '+' },
  { label: 'Skin Procedures', value: 150, suffix: '+' },
  { label: 'Success Rate', value: 98, suffix: '%' },
]

export const faqs = [
  { category: 'Appointments', question: 'How do I book an appointment at Vijaya Clinics?', answer: 'You can book online through our Appointment page, call us directly, or message us on WhatsApp. Choose between an in-clinic visit or a video consultation.' },
  { category: 'Appointments', question: 'Can I reschedule my appointment?', answer: 'Yes, call the clinic at least a few hours in advance and our reception will help you find a new slot.' },
  { category: 'Consultation', question: 'Is video consultation as effective as an in-clinic visit?', answer: 'For most follow-ups, prescription renewals and initial assessments, video consultation works well. For procedures or detailed skin examination, an in-clinic visit is recommended.' },
  { category: 'Treatments', question: 'How many sessions does a typical treatment need?', answer: 'This varies by condition and treatment type. Dr. Nikam will discuss a personalised treatment plan and expected number of sessions during your consultation.' },
  { category: 'Mental Wellness', question: 'Do you offer counselling alongside dermatology care?', answer: 'Yes - Vijaya Clinics has a dedicated counselling room for mental wellness consultations, separate from our dermatology services, with both online and in-person options.' },
  { category: 'General', question: 'What are your clinic timings?', answer: 'Monday to Saturday, 11:30 AM–2:00 PM and 6:00 PM–8:30 PM. We are closed on Wednesdays and Sundays.' },
]
