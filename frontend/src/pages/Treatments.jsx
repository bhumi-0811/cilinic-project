import SectionHeading from '../components/SectionHeading.jsx'
import TreatmentCard from '../components/TreatmentCard.jsx'
import { treatmentCategories } from '../utils/clinicData.js'

export default function Treatments() {
  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Our Treatments</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Comprehensive skin, hair and aesthetic care — tap any treatment to learn more.</p>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {treatmentCategories.map((cat) => (
          <div key={cat.id} className="mb-16 last:mb-0">
            <SectionHeading title={cat.label} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.treatments.map((t) => <TreatmentCard key={t.slug} {...t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
