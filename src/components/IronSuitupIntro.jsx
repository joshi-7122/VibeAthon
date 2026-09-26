import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { IntroPresents } from './IntroPresents'

const TOTAL_FRAMES = 206
const FPS = 24
// Frames downloading at once; enough to fill the pipe without starving the
// early frames
const LOAD_CONCURRENCY = 6
// Never hold visitors on the loader longer than this, however slow the network
const MAX_INTRO_MS = 20000

const SUITUP_STEPS = [
  'ATTACHING AUTONOMOUS EXOSUIT CHASSIS SEGMENTS...',
  'SYNCHRONIZING PISTON HYDRAULICS & POWER CORE...',
  'LOCKING HELMET SENSOR VISOR & TACTICAL HUD...',
  'SEALING TITANIUM-GRAPHITE ALLOY ARMOR...',
  'EXOSUIT INITIALIZATION 100% COMPLETE. UNVEILING VIBATHON...'
]

export function IronSuitupIntro({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const hasAutoLaunched = useRef(false)
  const canvasRef = useRef(null)

  const handleSuitupLaunch = useCallback(() => {
    if (isExiting || hasAutoLaunched.current) return
    hasAutoLaunched.current = true
    setIsFlashing(true)
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 600)
    }, 400)
  }, [isExiting, onComplete])

  // Canvas Frame-Sequence Animation with Synchronized Progress Bar
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    const images = new Array(TOTAL_FRAMES + 1)
    const loaded = new Array(TOTAL_FRAMES + 1).fill(false)
    let isCancelled = false

    const formatPath = (index) => `/intro-frames/frame_${String(index).padStart(4, '0')}.webp`

    // Download frames in order, a few at a time, so the early frames arrive
    // first on a real network (all at once, they'd finish in random order)
    let nextToLoad = 1
    const loadNext = () => {
      if (isCancelled || nextToLoad > TOTAL_FRAMES) return
      const index = nextToLoad++
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        loaded[index] = true
        if (index === 1) drawFrame(img)
        loadNext()
      }
      img.onerror = () => {
        // Don't stall on a missing frame; drawFrame skips broken images
        loaded[index] = true
        loadNext()
      }
      img.src = formatPath(index)
      images[index] = img
    }
    for (let i = 0; i < LOAD_CONCURRENCY; i++) loadNext()

    const mountTime = performance.now()
    let animId

    const drawFrame = (img) => {
      if (!img || !img.complete || img.naturalWidth === 0) return
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
      }

      const vw = img.naturalWidth || 1920
      const vh = img.naturalHeight || 1080
      const cw = canvas.width
      const ch = canvas.height

      const hRatio = cw / vw
      const vRatio = ch / vh
      const ratio = Math.max(hRatio, vRatio)

      const drawW = vw * ratio
      const drawH = vh * ratio
      const shiftX = (cw - drawW) / 2
      const shiftY = (ch - drawH) / 2

      ctx.drawImage(img, 0, 0, vw, vh, shiftX, shiftY, drawW, drawH)
    }

    // Buffered playback: the playhead only moves on to frames that have
    // downloaded, so a slow connection pauses on the last frame (like a video
    // buffering) instead of flashing black and skipping ahead
    let playhead = 1
    let lastTime = null
    let lastDrawnFrame = 0

    const renderLoop = (now) => {
      if (isCancelled) return
      const dt = lastTime === null ? 0 : (now - lastTime) / 1000
      lastTime = now

      // Start once the first second of frames is ready
      const startBuffer = Math.min(FPS, TOTAL_FRAMES)
      const started = playhead > 1 || loaded.slice(1, startBuffer + 1).every(Boolean)
      if (started) {
        const next = Math.min(Math.floor(playhead + dt * FPS), TOTAL_FRAMES)
        let target = Math.floor(playhead)
        while (target < next && loaded[target + 1]) target++
        playhead = target === next ? Math.min(playhead + dt * FPS, TOTAL_FRAMES) : target
      }

      const currentFrameIndex = Math.floor(playhead)
      const pct = Math.min(Math.round((currentFrameIndex / TOTAL_FRAMES) * 100), 100)
      setProgress(pct)

      if (pct < 25) setCurrentStepIndex(0)
      else if (pct < 50) setCurrentStepIndex(1)
      else if (pct < 75) setCurrentStepIndex(2)
      else if (pct < 100) setCurrentStepIndex(3)
      else setCurrentStepIndex(4)

      if (currentFrameIndex !== lastDrawnFrame && loaded[currentFrameIndex]) {
        drawFrame(images[currentFrameIndex])
        lastDrawnFrame = currentFrameIndex
      }

      // Done, or give up waiting on a very slow connection
      if (currentFrameIndex >= TOTAL_FRAMES || now - mountTime > MAX_INTRO_MS) {
        handleSuitupLaunch()
        return
      }

      animId = requestAnimationFrame(renderLoop)
    }

    animId = requestAnimationFrame(renderLoop)

    return () => {
      isCancelled = true
      cancelAnimationFrame(animId)
    }
  }, [handleSuitupLaunch])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#050708] text-white flex flex-col justify-between overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Flash overlay on transition */}
          <div
            className={`fixed inset-0 bg-white pointer-events-none z-[100000] transition-opacity duration-300 ${
              isFlashing ? 'opacity-90' : 'opacity-0'
            }`}
          />

          {/* Full-screen graphics canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Subtle dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/60 via-transparent to-[#050708]/75 pointer-events-none z-[1]" />

          {/* Scanlines texture */}
          <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.05] scanlines" />

          {/* ── Top HUD bar ── */}
          <div className="relative z-20 flex justify-between items-start font-mono text-xs p-6 md:p-10">
            <div className="flex items-center gap-3 text-[#00ADEF]">
              <Cpu className="w-5 h-5 animate-pulse" />
              <div>
                <div className="font-bold tracking-widest text-sm text-white">
                  EXOSUIT EXP-01 // INDUSTRIAL ASSEMBLY PROTOCOL
                </div>
                <div className="text-[10px] text-[#00ADEF]">
                  VIBATHON OS // ARC REACTOR CORE INGESTION
                </div>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Bottom Section: Loading Bar & Step Status + IEEE GUSB CIS PRESENTS ── */}
          <div className="relative z-20 flex flex-col items-center gap-3 px-6 pb-8 md:pb-12">
            {/* Progress + step status HUD */}
            <div className="w-full max-w-lg flex flex-col items-center gap-2">
              {/* Step Status Message */}
              <div className="font-mono text-xs md:text-sm text-[#55d8ff] tracking-widest uppercase max-w-md h-6 flex items-center justify-center font-bold text-center drop-shadow-[0_0_8px_rgba(0,173,239,0.5)]">
                {SUITUP_STEPS[currentStepIndex]}
              </div>

              {/* Glowing Progress Bar */}
              <div className="w-full h-2 bg-[#8b9aa6]/20 relative overflow-hidden border border-[#00ADEF]/50 shadow-[0_0_15px_rgba(0,173,239,0.4)] rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#00ADEF] via-[#55d8ff] to-[#FFFFFF] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage / Status readout */}
              <div className="text-[11px] font-mono text-[#00ADEF] tracking-widest font-bold uppercase">
                {progress >= 100 ? 'UNVEILING VIBATHON LANDING PAGE...' : `INITIALIZING... ${progress}%`}
              </div>
            </div>

            {/* IEEE GUSB CIS PRESENTS */}
            <div className="w-full flex justify-center mt-2">
              <IntroPresents />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
