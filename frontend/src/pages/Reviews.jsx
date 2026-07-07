import SectionHeading from '../components/SectionHeading.jsx'
import ReviewList from '../components/ReviewList.jsx'

export default function Reviews() {
  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Patient Stories</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Real experiences from patients at Vijaya Clinics.</p>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="Reviews" title="What our patients say" />
        <div className="mt-12">
          <ReviewList />
        </div>
      </div>
    </div>
  )
}
