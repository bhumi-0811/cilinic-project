// Central source of truth for clinic content.
// Doctor info verified from public Eka Care listings (Dr. Amit Nikam, Dr. Pritisha Saxena Nikam).

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
    { days: 'Monday - Saturday', time: '11:30 AM - 2:00 PM & 6:00 PM - 8:30 PM' },
    { days: 'Wednesday', time: 'Closed' },
    { days: 'Sunday', time: 'Closed' },
  ],
}

// --- Dermatology: Dr. Amit Nikam ---------------------------------------
export const dermatologist = {
  name: 'Dr. Amit Nikam',
  fullName: 'Dr. Amit Shyamsundar Nikam',
  designation: 'Dermatologist',
  role: 'Founder & Chief Consultant Dermatologist, Vijaya Clinics',
  registration: 'Maharashtra Medical Council - Reg. No. 2017051754',
  qualifications: ['MBBS', 'DDV (Mumbai)', 'PGDCC (Pune)'],
  experienceYears: 11,
  languages: ['English', 'Hindi', 'Marathi'],
  bio: 'Dr. Amit Nikam is the Founder of Vijaya Clinics and its Chief Consultant Dermatologist. He has a special interest in clinical skin conditions such as tinea, acne, psoriasis, eczema, alopecia, pigmentation and melasma. His vision is to make quality skin care affordable and accessible - the clinic is equipped with modern technology suited to Indian skin, including laser hair reduction, chemical peels, carbon laser peel, HydraFacial and photofacial.',
  concerns: [
    'Pigmentation', 'Melasma', 'Acne', 'Acne Scars', 'Psoriasis', 'Tinea',
    'Eczema', 'Alopecia', 'Skin Infections', 'Falling Hair', 'Herpes Infection',
  ],
}

// --- Psychiatry: Dr. Pritisha Saxena Nikam ------------------------------
export const psychiatrist = {
  name: 'Dr. Pritisha Saxena Nikam',
  designation: 'Psychiatrist & Therapist',
  role: 'Director & Chief Consultant, Vijaya Clinics',
  registration: 'Maharashtra Medical Council - Reg. No. 2018115808',
  qualifications: ['MBBS', 'DPM'],
  experienceYears: 7,
  languages: ['English', 'Hindi', 'Marathi'],
  bio: 'Dr. Pritisha Saxena Nikam is a dedicated Psychiatrist and Therapist serving as Director & Chief Consultant at Vijaya Clinics. She provides personalised, evidence-based care for mental health challenges and relationship concerns, integrating psychotherapeutic approaches like CBT and DBT with thoughtful medication management. She has been featured in publications including The Times of India, India Times and Dainik Bhaskar for her contributions to mental health awareness, and regularly conducts workshops and online initiatives aimed at reducing stigma and promoting emotional resilience.',
  concerns: [
    'Depression', 'Anxiety Disorders', 'OCD', 'Bipolar Disorder', 'PTSD',
    'ADHD', 'Schizophrenia', 'Psychosis', 'Sleep Disturbances', 'Psychological Stress',
  ],
  recognition: [
    'Featured in The Times of India, India Times and Dainik Bhaskar for mental health awareness work',
    'Conducts workshops and online initiatives on psychoeducation and emotional resilience',
    'Member, Indian Medical Association',
  ],
}

export const treatmentCategories = [
  {
    id: 'clinical-disorders',
    label: 'Clinical Dermatology',
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
    label: 'Hair & Scalp',
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

export const dermatologyProcess = [
  { step: '01', title: 'Understand', desc: 'We listen closely to your concern, history and what you\u2019re hoping to achieve.' },
  { step: '02', title: 'Assess', desc: 'A thorough clinical examination to identify the underlying cause, not just the symptom.' },
  { step: '03', title: 'Personalise', desc: 'A treatment plan built around your skin, lifestyle and comfort - not a one-size-fits-all protocol.' },
  { step: '04', title: 'Treat', desc: 'Evidence-based treatment using modern, well-maintained equipment suited to Indian skin.' },
  { step: '05', title: 'Follow Through', desc: 'Clear aftercare guidance and follow-up so progress is tracked, not left to chance.' },
]

export const stats = [
  { label: 'Years - Dermatology', value: 11, suffix: '+' },
  { label: 'Years - Psychiatry', value: 7, suffix: '+' },
  { label: 'Skin Procedures', value: 150, suffix: '+' },
  { label: 'Patients Cared For', value: 5, suffix: 'k+' },
]

// Testimonials paraphrased from public Google reviews on each doctor's listing.
export const dermatologyReviews = [
  { name: 'Shubham Bawankule', rating: 5, comment: 'One of the best experiences I\u2019ve had with skin care treatment.' },
  { name: 'Rahul Gour', rating: 5, comment: 'Dr. Nikam explained every treatment option clearly, and the clinic is spotless and well-kept.' },
  { name: 'Zainab Maimoon', rating: 5, comment: 'Treated for three months and saw real, lasting improvement - would recommend him for acne and pigmentation.' },
]

export const psychiatryReviews = [
  { name: 'Krishna', rating: 5, comment: 'It\u2019s so easy to talk to her and be honest about how I\u2019m feeling - the treatment has worked wonderfully for me.' },
  { name: 'Sanskruti Gujar', rating: 5, comment: 'I could feel real change within a few months, thanks to how deeply she understands each situation.' },
  { name: 'Dhananjay Gurve', rating: 5, comment: 'Feeling calmer with every visit after years of consulting different psychiatrists - this has been the best experience.' },
]

export const faqs = [
  { category: 'Dermatology', question: 'What skin concerns does Dr. Amit Nikam treat?', answer: 'Pigmentation, melasma, acne and acne scars, psoriasis, eczema, fungal infections, alopecia and general skin/hair concerns, among others.' },
  { category: 'Dermatology', question: 'What technology does the clinic use?', answer: 'Vijaya Clinics is equipped with modern dermatology technology suited to Indian skin, including laser hair reduction, chemical peels, carbon laser peel, HydraFacial and photofacial.' },
  { category: 'Psychiatry', question: 'What does Dr. Pritisha treat?', answer: 'Depression, anxiety disorders, OCD, bipolar disorder, PTSD, ADHD, psychosis and related concerns, using a combination of psychotherapy and medication management where needed.' },
  { category: 'Psychiatry', question: 'Is mental health care kept private and separate from dermatology visits?', answer: 'Yes - Vijaya Clinics has a dedicated counselling space for mental wellness consultations, separate from dermatology areas.' },
  { category: 'General', question: 'What are your clinic timings?', answer: 'Monday to Saturday, 11:30 AM-2:00 PM and 6:00 PM-8:30 PM. Closed on Wednesdays and Sundays.' },
  { category: 'General', question: 'Where is the clinic located?', answer: '5, Modern Society, Ring Road, Chatrapati Nagar, Nagpur, Maharashtra 440015.' },
]
