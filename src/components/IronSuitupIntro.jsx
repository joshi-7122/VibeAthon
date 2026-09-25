import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { IntroPresents } from './IntroPresents'

const TOTAL_FRAMES = 206
const FPS = 24

export function IronSuitupIntro({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
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

  // Canvas Frame-Sequence Animation:
  // Decoded image frames drawn to <canvas> run 100% automatically on page load
  // without ANY browser autoplay policies or play/pause button overlays.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    const images = new Array(TOTAL_FRAMES + 1)
    let isCancelled = false

    const formatPath = (index) => `/intro-frames/frame_${String(index).padStart(4, '0')}.jpg`

    // Load first frame immediately and render as placeholder
    const firstImg = new Image()
    firstImg.src = formatPath(1)
    images[1] = firstImg

    // Preload next frames in background
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = formatPath(i)
      images[i] = img
    }

    const startTime = performance.now()
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

    firstImg.onload = () => {
      if (!isCancelled) drawFrame(firstImg)
    }

    let lastDrawnFrame = 1

    const renderLoop = (now) => {
      if (isCancelled) return
      const elapsed = (now - startTime) / 1000
      const currentFrameIndex = Math.min(Math.floor(elapsed * FPS) + 1, TOTAL_FRAMES)

      const currentImg = images[currentFrameIndex]
      if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
        drawFrame(currentImg)
        lastDrawnFrame = currentFrameIndex
      } else if (images[lastDrawnFrame]) {
        drawFrame(images[lastDrawnFrame])
      }

      if (currentFrameIndex >= TOTAL_FRAMES) {
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

          {/* Full-screen high-performance graphics canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Subtle dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/60 via-transparent to-[#050708]/70 pointer-events-none z-[1]" />

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

            <button
              onClick={handleSuitupLaunch}
              className="text-[#8b9aa6] hover:text-[#00ADEF] transition-colors border border-[#8b9aa6]/30 px-3 py-1.5 text-[10px] tracking-widest uppercase cursor-pointer"
            >
              [ SKIP INTRO ]
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* ── Bottom: IEEE GUSB CIS PRESENTS (centered at bottom) ── */}
          <div className="relative z-20 flex justify-center pb-10 md:pb-14">
            <IntroPresents />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
