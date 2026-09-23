import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useTypewriter } from '../hooks/useTypewriter'
import { useStarkAudio } from '../hooks/useStarkAudio'

export function Hero() {
  const { displayText } = useTypewriter(HACKATHON_DATA.kicker, 35, 100)
  const { playRepulsorHover } = useStarkAudio()

  return (
    <section id="top" className="stark-shell stark-hero relative overflow-hidden min-h-[660px] md:min-h-[720px] flex flex-col justify-center">
      {/* Dynamic Cyber Video Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => e.currentTarget.play()}
          className="w-full h-full object-cover object-center md:object-[70%_center] opacity-85 filter contrast-110 brightness-100 scale-100 transform-gpu"
        >
          <source src="/videos/1790183415100607.mp4" type="video/mp4" />
        </video>
        {/* Left Side Subtle Shadow Overlay for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,7,8,0.85) 0%, rgba(5,7,8,0.50) 45%, rgba(5,7,8,0.15) 80%, rgba(5,7,8,0.05) 100%)',
          }}
        />
        {/* Seamless Top & Bottom Frame Fades */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#050708] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050708] via-[#050708]/60 to-transparent" />
      </div>


      {/* Overlay Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] scanlines"
        aria-hidden="true"
      />


      {/* Hero Content Column (Positioned Left) */}
      <div className="relative z-10 flex flex-col items-start w-full max-w-2xl py-12 md:py-16">
        <div className="hero-kicker" aria-label={HACKATHON_DATA.kicker}>
          {displayText}
          <span className="cursor-blink">|</span>
        </div>

        <motion.h1
          className="glitch stark-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="glitch-word">CODE</span>
          <br />
          BEYOND
          <br />
          <em>BOUNDARIES.</em>
        </motion.h1>

        <motion.p
          className="hero-manifesto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Think It. Prompt It. Build It.
        </motion.p>

        <motion.a
          href={HACKATHON_DATA.registrationUrl}
          className="stark-cta arc-pulse-glow mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onMouseEnter={playRepulsorHover}
        >
          INITIALIZE UPLINK <ArrowUpRight className="inline-block ml-2 w-4 h-4" />
        </motion.a>

        <div className="hero-readout mt-8">
          <span>ARC REACTOR STATUS</span>
          <strong>100%</strong>
          <i />
        </div>
      </div>
    </section>
  )
}
