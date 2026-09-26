import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useTypewriter } from '../hooks/useTypewriter'


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

function playBackdrop(video, onBlocked) {
  if (!video) return () => {}
  prepareVideo(video)
  video.play().catch(() => {
    onBlocked?.()
  })
  return () => {}
}

// Theme audio that plays alongside the first hero video
const INTRO_AUDIO = '/audio/hero-intro.m4a'

export function Hero({ introDone = true }) {
  const videoRef = useRef(null)
  const loopRef = useRef(null)
  const cleanupsRef = useRef([])
  const [loopPlaying, setLoopPlaying] = useState(false)
  // Hero text stays hidden while the first video plays, then animates in
  const [textReady, setTextReady] = useState(false)
  const revealText = () => setTextReady(true)
  const { displayText } = useTypewriter(HACKATHON_DATA.kicker, 35, 100, textReady)

  const startLoop = () => cleanupsRef.current.push(playBackdrop(loopRef.current))

  const audioRef = useRef(null)
  const audioStartedRef = useRef(false)
  const videoStartRef = useRef(0)

  const playAudioFrom = useCallback((offset = 0) => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio'))
    audio.muted = false
    audio.volume = 1.0
    audio.currentTime = offset
    return audio.play()
  }, [])

  // Automatically start audio without requiring any user click
  const startAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audioStartedRef.current) return

    audioStartedRef.current = true
    if (!videoStartRef.current) {
      videoStartRef.current = performance.now()
    }

    // Try playing immediately
    playAudioFrom(0).catch(() => {
      // If the browser strictly pauses unmuted autoplay on the initial tick,
      // trigger playback automatically on ANY natural presence (cursor movement, hover, scroll)
      const passiveTriggers = [
        'mousemove',
        'pointermove',
        'mouseenter',
        'wheel',
        'scroll',
        'touchstart',
        'touchmove',
        'keydown',
        'focus',
        'click',
      ]

      const handlePassivePresence = () => {
        passiveTriggers.forEach((evt) => window.removeEventListener(evt, handlePassivePresence))

        const el = audioRef.current
        if (!el) return

        let offset = 0
        if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
          offset = videoRef.current.currentTime
        } else if (videoStartRef.current) {
          const elapsed = (performance.now() - videoStartRef.current) / 1000
          if (elapsed >= 6.5) return
          offset = elapsed
        }

        el.muted = false
        el.volume = 1.0
        el.currentTime = offset
        el.play().catch(() => {})
      }

      passiveTriggers.forEach((evt) =>
        window.addEventListener(evt, handlePassivePresence, { passive: true, once: true })
      )
    })
  }, [playAudioFrom])

  // First video is running: start its audio and begin fetching the loop
  // video in the background so it's ready when the first one ends
  const handleFirstVideoPlaying = useCallback(() => {
    startAudio()
    const loop = loopRef.current
    if (loop && loop.preload !== 'auto') {
      loop.preload = 'auto'
      loop.load()
    }
  }, [startAudio])

  // First video finished (or failed): reveal text and start loop while audio continues to completion
  const handleFirstVideoDone = useCallback(() => {
    revealText()
    startLoop()
  }, [])

  // Mark both videos muted/inline before they load, and clean up on unmount
  useEffect(() => {
    const video = videoRef.current
    const loop = loopRef.current
    const audio = audioRef.current
    prepareVideo(video)
    prepareVideo(loop)
    const cleanups = cleanupsRef.current
    return () => {
      cleanups.forEach((fn) => fn())
      if (audio) {
        audio.pause()
      }
    }
  }, [])

  // Play the intro video and auto-start companion audio once suit-up intro clears
  useEffect(() => {
    if (!introDone) return
    // If autoplay is blocked, show the text right away instead of an empty hero
    cleanupsRef.current.push(playBackdrop(videoRef.current, () => setTextReady(true)))
    
    // Auto-trigger the intro audio immediately without requiring a click
    startAudio()

    // Safety net in case the video stalls and never ends
    const fallback = setTimeout(() => {
      setTextReady(true)
      startLoop()
    }, 8000)
    return () => clearTimeout(fallback)
  }, [introDone, startAudio])

  // Browsers pause silent videos in background tabs and don't always resume;
  // pick up where we left off when the tab becomes visible again.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== 'visible') {
        audioRef.current?.pause()
        return
      }
      const first = videoRef.current
      if (loopPlaying) {
        loopRef.current?.play().catch(() => {})
        if (audioRef.current && !audioRef.current.ended) {
          audioRef.current.play().catch(() => {})
        }
      } else if (introDone && first && !first.ended) {
        first.play().catch(() => {})
        if (audioRef.current && !audioRef.current.ended) {
          audioRef.current.play().catch(() => {})
        }
      }
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
          // 86 MB: don't fetch it while the loader and first video need the
          // bandwidth; warmLoop() starts it once the first video is playing
          preload="none"
          onPlaying={() => setLoopPlaying(true)}
          // Mirrored horizontally so the HUD graphics sit away from the headline
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
          onPlaying={handleFirstVideoPlaying}
          onEnded={handleFirstVideoDone}
          onError={handleFirstVideoDone}
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

      <audio
        ref={audioRef}
        src={INTRO_AUDIO}
        preload="auto"
      />

      {/* Overlay Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] scanlines"
        aria-hidden="true"
      />


      {/* Hero Content Column (Positioned Left) */}
      <div className="relative z-10 flex flex-col items-start w-full max-w-2xl py-12 md:py-16">
        <motion.div
          className="hero-kicker"
          aria-label={HACKATHON_DATA.kicker}
          initial={{ opacity: 0 }}
          animate={textReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayText}
          <span className="cursor-blink">|</span>
        </motion.div>

        <motion.h1
          className="glitch stark-title"
          initial={{ opacity: 0, y: 30 }}
          animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
          animate={textReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Think It. Prompt It. Build It.
        </motion.p>

        <motion.a
          href={HACKATHON_DATA.registrationUrl}
          target={HACKATHON_DATA.registrationUrl?.startsWith('http') ? '_blank' : undefined}
          rel={HACKATHON_DATA.registrationUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="stark-cta arc-pulse-glow mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={textReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          INITIALIZE UPLINK <ArrowUpRight className="inline-block ml-2 w-4 h-4" />
        </motion.a>

        <motion.div
          className="hero-readout mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <span>ARC REACTOR STATUS</span>
          <strong>100%</strong>
          <i />
        </motion.div>
      </div>
    </section>
  )
}
