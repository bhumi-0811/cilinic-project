import SectionHeading from '../components/SectionHeading.jsx'
import FAQList from '../components/FAQList.jsx'

export default function FAQ() {
  return (
    <div>
      <section className="bg-teal-fade px-6 py-14 text-center sm:py-16">
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">Frequently Asked Questions</h1>
      </section>
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Have a question?" subtitle="Search or browse by category." />
        <div className="mt-10">
          <FAQList />
        </div>
      </div>
    </div>
  )
}
