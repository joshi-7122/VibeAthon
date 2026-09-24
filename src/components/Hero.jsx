import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useTypewriter } from '../hooks/useTypewriter'
import { useStarkAudio } from '../hooks/useStarkAudio'

// Events that count as a real user gesture in every browser (Safari ignores
// scroll and touchstart for this), used to start playback if autoplay is blocked.
const GESTURE_EVENTS = ['click', 'touchend', 'pointerup', 'keydown']

// Muted, inline playback is what every browser allows to autoplay. React only
// sets `muted` as a property, but iOS/macOS Safari check the attributes too.
function prepareVideo(video) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  video.setAttribute('muted', '')
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')
}

// Try to play; if the browser blocks it (Low Power Mode, data saver, Safari
// "Never Auto-Play"), keep retrying on each user gesture until it succeeds.
// Returns a cleanup function that removes any pending retry listeners.
function playBackdrop(video) {
  if (!video) return () => {}
  prepareVideo(video)
  let removeListeners = () => {}
  video.play().catch(() => {
    const retry = () => {
      video.play().then(() => removeListeners(), () => {})
    }
    GESTURE_EVENTS.forEach((e) => window.addEventListener(e, retry, { passive: true }))
    removeListeners = () => GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, retry))
  })
  return () => removeListeners()
}

export function Hero({ introDone = true }) {
  const videoRef = useRef(null)
  const loopRef = useRef(null)
  const cleanupsRef = useRef([])
  const [loopPlaying, setLoopPlaying] = useState(false)
  const [bgVideoFinished, setBgVideoFinished] = useState(false)
  
  const { displayText } = useTypewriter(bgVideoFinished ? HACKATHON_DATA.kicker : '', 35, 100)
  const { playRepulsorHover } = useStarkAudio()

  const startLoop = () => cleanupsRef.current.push(playBackdrop(loopRef.current))

  // Mark both videos muted/inline before they load, and clean up on unmount
  useEffect(() => {
    prepareVideo(videoRef.current)
    prepareVideo(loopRef.current)
    const cleanups = cleanupsRef.current
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Play the intro video once, after the suit-up intro has cleared
  useEffect(() => {
    if (introDone) cleanupsRef.current.push(playBackdrop(videoRef.current))
  }, [introDone])

  // Play loop video after background video finishes and text animations are done
  useEffect(() => {
    if (bgVideoFinished) {
      const timer = setTimeout(() => {
        startLoop()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [bgVideoFinished])

  // Browsers pause silent videos in background tabs and don't always resume;
  // pick up where we left off when the tab becomes visible again.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      const first = videoRef.current
      if (loopPlaying) loopRef.current?.play().catch(() => {})
      else if (introDone && first && !first.ended) first.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [introDone, loopPlaying])

  return (
    <section id="top" className="stark-shell stark-hero relative overflow-hidden min-h-[660px] md:min-h-[720px] aspect-video flex flex-col justify-center">
      {/* Backdrop: intro video plays once, then the HUD video loops.
          The intro video holds its last frame until the loop is actually playing,
          and shows a poster frame if the browser won't play video at all.
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
          style={{ transform: 'scaleX(-1)' }}
          className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-[1500ms] ease-in-out ${loopPlaying ? 'opacity-75' : 'opacity-0'}`}
        />
        <video
          src="/videos/hero-bg.mp4"
          poster="/videos/hero-poster.jpg"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={() => setBgVideoFinished(true)}
          onError={() => setBgVideoFinished(true)}
          className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-[1500ms] ease-in-out ${loopPlaying ? 'opacity-0' : 'opacity-75'}`}
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
          animate={bgVideoFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
          animate={bgVideoFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Think It. Prompt It. Build It.
        </motion.p>

        <motion.a
          href={HACKATHON_DATA.registrationUrl}
          className="stark-cta arc-pulse-glow mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={bgVideoFinished ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onMouseEnter={playRepulsorHover}
        >
          INITIALIZE UPLINK <ArrowUpRight className="inline-block ml-2 w-4 h-4" />
        </motion.a>

        <motion.div 
          className="hero-readout mt-8"
          initial={{ opacity: 0 }}
          animate={bgVideoFinished ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span>ARC REACTOR STATUS</span>
          <strong>100%</strong>
          <i />
        </motion.div>
      </div>
    </section>
  )
}
