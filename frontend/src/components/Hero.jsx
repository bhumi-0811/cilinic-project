import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import heroVideo from '../assets/video/hero-video.mp4'
import heroPoster from '../assets/hero-poster.jpg'

export default function Hero() {
  return (
    <section className="relative -mt-16 h-[100svh] min-h-[560px] w-full overflow-hidden lg:-mt-[76px]">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover motion-reduce:hidden"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Static fallback for reduced-motion preference - same framing, no motion */}
        <img src={heroPoster} alt="" className="hidden h-full w-full object-cover motion-reduce:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/75 via-teal-800/55 to-teal-900/85" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-mint-200"
        >
          Nagpur
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-4 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Vijaya Clinics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-5 max-w-md text-sm font-light tracking-wide text-white/80 sm:text-base"
        >
          Centre for Skin &amp; Mental Health
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
