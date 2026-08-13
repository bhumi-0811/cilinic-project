import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import signage from '../assets/signage.jpg'
import reception from '../assets/reception.jpg'
import treatmentRoom from '../assets/treatment-room.jpg'
import treatmentRoom2 from '../assets/treatment-room-2.jpg'
import counsellingRoom from '../assets/counselling-room.jpg'
import interior from '../assets/interior-1.jpg'
import entrance from '../assets/entrance-door.jpg'
import doctorDesk from '../assets/doctor-desk.jpg'

const images = [
  { src: signage, caption: 'Vijaya Clinics', size: 'tall' },
  { src: entrance, caption: 'Clinic Entrance', size: 'short' },
  { src: reception, caption: 'Reception', size: 'tall' },
  { src: treatmentRoom, caption: 'Treatment Room', size: 'short' },
  { src: doctorDesk, caption: "Doctor's Desk", size: 'tall' },
  { src: counsellingRoom, caption: 'Counselling Room', size: 'short' },
  { src: treatmentRoom2, caption: 'Clinic Interior', size: 'tall' },
  { src: interior, caption: 'Clinic Ambience', size: 'short' },
]

export default function CinematicGallery() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-62%'])

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-teal-900 motion-reduce:h-auto">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:py-16">
        <div className="mb-10 px-6 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-300">A Look Inside</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">The Vijaya Clinics Experience</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-5 px-6 motion-reduce:flex-wrap motion-reduce:!transform-none lg:gap-7 lg:px-8">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative shrink-0 overflow-hidden rounded-2xl shadow-soft ${
                img.size === 'tall' ? 'h-[60vh] w-[68vw] sm:w-[38vw] lg:h-[70vh] lg:w-[26vw]' : 'h-[42vh] w-[68vw] self-end sm:w-[38vw] lg:h-[48vh] lg:w-[26vw]'
              }`}
            >
              <img src={img.src} alt={img.caption} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-medium text-white">{img.caption}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
