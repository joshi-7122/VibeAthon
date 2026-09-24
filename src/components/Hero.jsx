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
function playBackdrop(video, onBlocked) {
  if (!video) return () => {}
  prepareVideo(video)
  let removeListeners = () => {}
  video.play().catch(() => {
    onBlocked?.()
    const retry = () => {
      video.play().then(() => removeListeners(), () => {})
    }
    GESTURE_EVENTS.forEach((e) => window.addEventListener(e, retry, { passive: true }))
    removeListeners = () => GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, retry))
  })
  return () => removeListeners()
}

// Theme audio that plays alongside the first hero video (it runs ~6.5s, so
// it carries on for a few seconds over the looping HUD video)
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
  const { playRepulsorHover } = useStarkAudio()

  const startLoop = () => cleanupsRef.current.push(playBackdrop(loopRef.current))

  const audioRef = useRef(null)
  const audioStartedRef = useRef(false)
  const videoStartRef = useRef(0)

  const playAudioFrom = (offset) => {
    const audio = audioRef.current
    if (!audio) return Promise.reject(new Error('no audio'))
    audio.currentTime = offset
    return audio.play()
  }

  // Start with the first video. Browsers block sound until the visitor has
  // interacted with the page, so if that happens, start on their first
  // click/key press, lined up with where the video has got to.
  const startAudio = () => {
    if (audioStartedRef.current) return
    audioStartedRef.current = true
    videoStartRef.current = performance.now()
    playAudioFrom(0).catch(() => {
      const remove = () => GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, retry))
      const retry = () => {
        remove()
        const elapsed = (performance.now() - videoStartRef.current) / 1000
        const audio = audioRef.current
        if (audio && elapsed < audio.duration - 0.5) playAudioFrom(elapsed).catch(() => {})
      }
      GESTURE_EVENTS.forEach((e) => window.addEventListener(e, retry, { passive: true }))
      cleanupsRef.current.push(remove)
    })
  }

  // First video finished (or failed): reveal the text and move on to the loop
  const handleFirstVideoDone = () => {
    revealText()
    startLoop()
  }

  // Mark both videos muted/inline before they load, and clean up on unmount
  useEffect(() => {
    prepareVideo(videoRef.current)
    prepareVideo(loopRef.current)
    const cleanups = cleanupsRef.current
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Play the intro video once, after the suit-up intro has cleared,
  // then crossfade to the HUD video, which loops for the rest of the visit.
  useEffect(() => {
    if (!introDone) return
    // If autoplay is blocked, show the text right away instead of an empty hero
    cleanupsRef.current.push(playBackdrop(videoRef.current, () => setTextReady(true)))
    // Safety net in case the video stalls and never ends
    const fallback = setTimeout(() => setTextReady(true), 8000)
    return () => clearTimeout(fallback)
  }, [introDone])

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
          onPlaying={startAudio}
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


      <audio ref={audioRef} src={INTRO_AUDIO} preload="auto" />

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
          className="stark-cta arc-pulse-glow mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={textReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          onMouseEnter={playRepulsorHover}
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
