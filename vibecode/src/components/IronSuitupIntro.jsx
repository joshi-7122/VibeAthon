import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ShieldCheck, Cpu } from 'lucide-react'

export function IronSuitupIntro({ onComplete }) {
  const canvasRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const hasAutoLaunched = useRef(false)

  const SUITUP_STEPS = [
    'ATTACHING AUTONOMOUS EXOSUIT CHASSIS SEGMENTS...',
    'SYNCHRONIZING PISTON HYDRAULICS & POWER CORE...',
    'LOCKING HELMET SENSOR VISOR & TACTICAL HUD...',
    'SEALING TITANIUM-GRAPHITE ALLOY ARMOR...',
    'EXOSUIT INITIALIZATION 100% COMPLETE. UNVEILING VIBATHON...'
  ]

  const handleSuitupLaunch = () => {
    if (isExiting) return
    setIsFlashing(true)
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 600)
    }, 400)
  }

  // Progress counter effect with AUTO-UNVEIL on 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          if (!hasAutoLaunched.current) {
            hasAutoLaunched.current = true
            setTimeout(handleSuitupLaunch, 400)
          }
          return 100
        }
        const next = prev + 2
        // Update step text based on progress percentage
        if (next < 25) setCurrentStepIndex(0)
        else if (next < 50) setCurrentStepIndex(1)
        else if (next < 75) setCurrentStepIndex(2)
        else if (next < 100) setCurrentStepIndex(3)
        else setCurrentStepIndex(4)
        return next
      })
    }, 35)

    return () => clearInterval(interval)
  }, [])

  // Three.js Particle Swarm Background Animation
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Prehensile Particle Swarm Background
    const particlesCount = 900
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40
      posArray[i + 1] = (Math.random() - 0.5) * 40
      posArray[i + 2] = (Math.random() - 0.5) * 40
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x00adef,
      transparent: true,
      opacity: 0.7
    })

    const particleSystem = new THREE.Points(particlesGeo, particlesMat)
    scene.add(particleSystem)

    // Animation Loop
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      particleSystem.rotation.y += 0.003
      particleSystem.rotation.x += 0.001
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  // Dynamic glow & pulse calculation based on progress (0% -> 100%)
  const coreGlowIntensity = 0.4 + (progress / 100) * 0.6
  const pulseSpeed = Math.max(0.5, 2.2 - (progress / 100) * 1.7)

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#050708] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.12, filter: 'blur(25px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* 100% Core Energy Flash Overlay */}
          <div
            className={`fixed inset-0 bg-white pointer-events-none z-[100000] transition-opacity duration-300 ${
              isFlashing ? 'opacity-90' : 'opacity-0'
            }`}
          />

          {/* Background 3D Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          {/* Background HUD Overlay Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,173,239,0.15),transparent_70%)] pointer-events-none z-0" />
          <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] scanlines" />

          {/* Top Header HUD Metadata */}
          <div className="relative z-20 flex justify-between items-start font-mono text-xs">
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

          {/* Center Photorealistic Animated Arc Reactor */}
          <div className="relative z-20 my-auto text-center flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-88 md:h-88 flex items-center justify-center mb-6">
              {/* SVG Arc Reactor Container */}
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full drop-shadow-[0_0_40px_rgba(0,173,239,0.6)]"
              >
                <defs>
                  {/* Glow Filters */}
                  <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur1" />
                    <feGaussianBlur stdDeviation="16" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Dark Metallic Frame Gradients */}
                  <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2c3644" />
                    <stop offset="50%" stopColor="#121820" />
                    <stop offset="100%" stopColor="#080b0f" />
                  </linearGradient>

                  <linearGradient id="ringBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#415166" />
                    <stop offset="100%" stopColor="#10151c" />
                  </linearGradient>

                  {/* Copper Wire Coil Texture Gradient */}
                  <linearGradient id="copperCoil" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b87333" />
                    <stop offset="50%" stopColor="#e59866" />
                    <stop offset="100%" stopColor="#784212" />
                  </linearGradient>
                </defs>

                {/* 1. Outer Dark Gunmetal Mechanical Chassis */}
                <circle cx="150" cy="150" r="145" fill="url(#chassisGrad)" stroke="#00ADEF" strokeWidth="1.5" strokeOpacity="0.4" />
                <circle cx="150" cy="150" r="132" fill="url(#ringBevelGrad)" stroke="#00ADEF" strokeWidth="1" strokeOpacity="0.2" />
                <circle cx="150" cy="150" r="124" fill="#080b0f" />

                {/* 10 Outer Mechanical Bolts */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i * 36 * Math.PI) / 180
                  const bx = 150 + 138 * Math.cos(angle)
                  const by = 150 + 138 * Math.sin(angle)
                  return (
                    <circle
                      key={i}
                      cx={bx}
                      cy={by}
                      r="3.5"
                      fill="#3a4756"
                      stroke="#00ADEF"
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                  )
                })}

                {/* 2. ROTATING RING: 10 Trapezoid Light Blocks wrapped in Copper Coils */}
                <g className="animate-spin origin-center" style={{ animationDuration: '18s' }}>
                  {Array.from({ length: 10 }).map((_, i) => {
                    const angle = i * 36
                    return (
                      <g key={i} transform={`rotate(${angle} 150 150)`}>
                        {/* Copper Wire Coil Segment behind block */}
                        <rect x="142" y="32" width="16" height="18" fill="url(#copperCoil)" rx="2" />
                        <line x1="142" y1="36" x2="158" y2="36" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
                        <line x1="142" y1="40" x2="158" y2="40" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
                        <line x1="142" y1="44" x2="158" y2="44" stroke="#fff" strokeWidth="0.8" opacity="0.4" />

                        {/* Glowing Light Trapezoid Node */}
                        <path
                          d="M 134 52 L 166 52 L 160 82 L 140 82 Z"
                          fill="#55D8FF"
                          filter="url(#arcGlow)"
                          opacity={coreGlowIntensity}
                        />
                        <path
                          d="M 136 54 L 164 54 L 158 80 L 142 80 Z"
                          fill="#FFFFFF"
                          opacity={coreGlowIntensity}
                        />
                      </g>
                    )
                  })}
                </g>

                {/* 3. COUNTER-ROTATING RING: Inner Concentric Metallic Mechanical Ring */}
                <g
                  className="animate-spin origin-center"
                  style={{ animationDuration: '11s', animationDirection: 'reverse' }}
                >
                  <circle cx="150" cy="150" r="92" fill="none" stroke="#00ADEF" strokeWidth="3" strokeDasharray="14 6" strokeOpacity="0.85" />
                  <circle cx="150" cy="150" r="82" fill="none" stroke="#2c3644" strokeWidth="5" />
                  <circle cx="150" cy="150" r="74" fill="none" stroke="#00ADEF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />
                </g>

                {/* 4. CENTRAL PULSING ENERGY CORE (Heartbeat pulse) */}
                <g
                  filter="url(#arcGlow)"
                  className="animate-pulse"
                  style={{ animationDuration: `${pulseSpeed}s` }}
                >
                  {/* Outer Cyan Volumetric Energy Aura */}
                  <circle cx="150" cy="150" r="66" fill="#00ADEF" opacity={0.25 + (progress / 100) * 0.45} />
                  <circle cx="150" cy="150" r="56" fill="#55D8FF" opacity={0.4 + (progress / 100) * 0.5} />
                  <circle cx="150" cy="150" r="44" fill="#FFFFFF" />

                  {/* Central Inverted Triangle Blueprint matching reference image */}
                  <polygon
                    points="150,186 114,124 186,124"
                    fill="none"
                    stroke="#00ADEF"
                    strokeWidth="5"
                  />
                  <polygon
                    points="150,174 122,128 178,128"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                  <polygon
                    points="150,162 130,132 170,132"
                    fill="#FFFFFF"
                  />
                </g>
              </svg>

              {/* Central Dynamic Percentage Readout inside Arc Reactor */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 font-mono">
                <div className="text-xs text-[#00ADEF] tracking-widest font-bold uppercase drop-shadow-[0_0_8px_#00ADEF]">
                  POWER
                </div>
                <div className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tighter drop-shadow-[0_0_15px_#00ADEF]">
                  {progress}%
                </div>
              </div>
            </div>

            {/* Current Step Status */}
            <div className="font-mono text-xs md:text-sm text-[#55d8ff] tracking-widest uppercase max-w-md h-8 flex items-center justify-center font-bold">
              {SUITUP_STEPS[currentStepIndex]}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-2 bg-[#8b9aa6]/20 mt-4 relative overflow-hidden border border-[#00ADEF]/40 shadow-[0_0_15px_rgba(0,173,239,0.3)]">
              <div
                className="h-full bg-gradient-to-r from-[#00ADEF] via-[#55d8ff] to-[#FFFFFF] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Controls / Status Bar */}
          <div className="relative z-20 flex flex-col md:flex-row justify-between items-center gap-4 font-mono">
            <div className="flex items-center gap-3 text-[10px] text-[#8b9aa6] uppercase tracking-wider">
              <Zap className="w-4 h-4 text-[#00ADEF]" />
              <span>EXOSUIT PISTONS: ARMED</span>
              <span className="mx-2 text-[#00ADEF]">•</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CHASSIS LOCK: COMPLETE</span>
            </div>

            <div className="text-xs font-mono text-[#00ADEF] tracking-widest font-bold uppercase animate-pulse">
              {progress >= 100 ? 'UNVEILING VIBATHON LANDING PAGE...' : 'INITIALIZING ARC REACTOR...'}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
