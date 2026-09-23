import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useTypewriter } from '../hooks/useTypewriter'
import { useStarkAudio } from '../hooks/useStarkAudio'

// Muted autoplay needs the `muted` *attribute* on iOS Safari (React only sets
// the property). If the device still blocks playback (e.g. iPhone Low Power
// Mode, data saver), start the video on the visitor's first interaction.
function playBackdrop(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.setAttribute('muted', '')
  video.play().catch(() => {
    const events = ['pointerdown', 'touchstart', 'keydown', 'scroll']
    const retry = () => {
      events.forEach((e) => window.removeEventListener(e, retry))
      video.play().catch(() => {})
    }
    events.forEach((e) => window.addEventListener(e, retry, { once: true, passive: true }))
  })
}

export function Hero({ introDone = true }) {
  const videoRef = useRef(null)
  const loopRef = useRef(null)
  const [loopPlaying, setLoopPlaying] = useState(false)
  const { displayText } = useTypewriter(HACKATHON_DATA.kicker, 35, 100)
  const { playRepulsorHover } = useStarkAudio()

  // Play the intro video once, after the suit-up intro has cleared,
  // then crossfade to the HUD video, which loops for the rest of the visit.
  useEffect(() => {
    if (introDone) playBackdrop(videoRef.current)
  }, [introDone])

  return (
    <section id="top" className="stark-shell stark-hero relative overflow-hidden min-h-[660px] md:min-h-[720px] aspect-video flex flex-col justify-center">
      {/* Backdrop: intro video plays once, then the HUD video loops.
          The intro video holds its last frame until the loop is actually playing.
          The section keeps a 16:9 shape and the videos use object-contain,
          so the full frame is always visible (no cropping). */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          src="/videos/hero-loop.mp4"
          ref={loopRef}
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setLoopPlaying(true)}
          className={`absolute inset-0 w-full h-full object-contain object-center filter brightness-105 contrast-110 transition-opacity duration-[1500ms] ease-in-out ${loopPlaying ? 'opacity-75' : 'opacity-0'}`}
        />
        <video
          src="/videos/hero-bg.mp4"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={() => playBackdrop(loopRef.current)}
          className={`absolute inset-0 w-full h-full object-contain object-center filter brightness-105 contrast-110 transition-opacity duration-[1500ms] ease-in-out ${loopPlaying ? 'opacity-0' : 'opacity-75'}`}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(5,7,8,0.92) 0%, rgba(5,7,8,0.72) 45%, rgba(5,7,8,0.38) 75%, rgba(5,7,8,0.18) 100%)',
          }}
        />
        {/* Bottom fade to page bg */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, #050708)' }}
        />
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
