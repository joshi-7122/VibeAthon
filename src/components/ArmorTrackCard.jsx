import { useRef, useState, useCallback, useEffect } from 'react'

const ARMOR_CONFIG = {
  'WAR MACHINE': {
    primaryGlow: 'rgba(200,160,50,0.55)',
    secondaryGlow: 'rgba(100,80,20,0.3)',
    eyeColor: '#FFD700',
    reactorColor: '#FFAA00',
    scanColor: 'rgba(255,200,60,0.18)',
    borderColor: '#B8860B',
    borderHover: '#FFD700',
    particleColor: '#FFB800',
    rimLight: 'rgba(255,180,0,0.35)',
    bgAccent: 'rgba(255,165,0,0.06)',
  },
  'MARK II': {
    primaryGlow: 'rgba(150,220,255,0.45)',
    secondaryGlow: 'rgba(50,120,180,0.3)',
    eyeColor: '#00DDFF',
    reactorColor: '#00C4FF',
    scanColor: 'rgba(0,220,255,0.14)',
    borderColor: '#1a6f9a',
    borderHover: '#00ADEF',
    particleColor: '#00BBFF',
    rimLight: 'rgba(0,180,255,0.3)',
    bgAccent: 'rgba(0,150,255,0.05)',
  },
  'MARK L': {
    primaryGlow: 'rgba(80,240,200,0.45)',
    secondaryGlow: 'rgba(20,180,150,0.3)',
    eyeColor: '#00FFC8',
    reactorColor: '#00E5B0',
    scanColor: 'rgba(0,255,200,0.13)',
    borderColor: '#0d6e5a',
    borderHover: '#00FFC8',
    particleColor: '#00F0C0',
    rimLight: 'rgba(0,240,190,0.3)',
    bgAccent: 'rgba(0,200,160,0.05)',
  },
  'MARK I': {
    primaryGlow: 'rgba(255,120,50,0.45)',
    secondaryGlow: 'rgba(180,60,20,0.3)',
    eyeColor: '#FF6600',
    reactorColor: '#FF5500',
    scanColor: 'rgba(255,90,30,0.15)',
    borderColor: '#7a2e0a',
    borderHover: '#FF6600',
    particleColor: '#FF7700',
    rimLight: 'rgba(255,100,30,0.3)',
    bgAccent: 'rgba(220,80,20,0.05)',
  },
  'MARK XLII': {
    primaryGlow: 'rgba(180,100,255,0.45)',
    secondaryGlow: 'rgba(100,40,200,0.3)',
    eyeColor: '#CC44FF',
    reactorColor: '#BB33EE',
    scanColor: 'rgba(200,80,255,0.13)',
    borderColor: '#5a1a8a',
    borderHover: '#CC44FF',
    particleColor: '#DD55FF',
    rimLight: 'rgba(200,80,255,0.3)',
    bgAccent: 'rgba(160,60,220,0.06)',
  },
}

function Particle({ x, y, color }) {
  return (
    <span
      style={{
        position: 'absolute',
        left: x + '%',
        top: y + '%',
        width: '2px',
        height: '2px',
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: '0 0 6px ' + color,
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  )
}

export function ArmorTrackCard({ track }) {
  const { name, number, category, detail, image } = track
  const armor = ARMOR_CONFIG[name] || ARMOR_CONFIG['MARK II']

  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [scanPhase, setScanPhase] = useState(0)
  const [particles, setParticles] = useState([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [breathOffset, setBreathOffset] = useState(0)
  const scanTimers = useRef([])
  const breathRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    let start
    const animate = (ts) => {
      if (!start) start = ts
      const t = (ts - start) / 1000
      setBreathOffset(Math.sin(t * 0.55) * 4)
      breathRef.current = requestAnimationFrame(animate)
    }
    breathRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(breathRef.current)
  }, [prefersReducedMotion])

  const clearScanTimers = () => {
    scanTimers.current.forEach(clearTimeout)
    scanTimers.current = []
  }

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    const pts = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 75,
    }))
    setParticles(pts)
    if (prefersReducedMotion) { setScanPhase(4); return }
    setScanPhase(1)
    const t1 = setTimeout(() => setScanPhase(2), 280)
    const t2 = setTimeout(() => setScanPhase(3), 600)
    const t3 = setTimeout(() => setScanPhase(4), 950)
    scanTimers.current = [t1, t2, t3]
  }, [prefersReducedMotion])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
    clearScanTimers()
    setScanPhase(0)
    setParticles([])
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -3.5, y: dx * 3.5 })
  }, [prefersReducedMotion])

  const showEyes    = scanPhase >= 1
  const showReactor = scanPhase >= 2
  const showSweep   = scanPhase === 3
  const showHud     = scanPhase >= 4

  const innerTransform = hovered
    ? `scale(1.035) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(12px)`
    : `scale(1) rotateX(0deg) rotateY(0deg) translateY(${breathOffset}px)`

  const innerTransition = hovered
    ? 'transform 0.1s ease-out, border-color 0.4s, box-shadow 0.4s'
    : 'transform 0.65s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.4s'

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={name + ' – ' + category}
      style={{ perspective: '900px', transformStyle: 'preserve-3d', outline: 'none' }}
      className="armor-bay-card"
    >
      <div
        className="armor-bay-inner"
        style={{
          transform: innerTransform,
          transition: innerTransition,
          borderColor: hovered ? armor.borderHover : armor.borderColor + '88',
          boxShadow: hovered
            ? '0 0 0 1px ' + armor.borderHover + ', 0 0 50px ' + armor.primaryGlow + ', 0 0 100px ' + armor.secondaryGlow + ', inset 0 0 40px ' + armor.bgAccent
            : '0 0 0 1px ' + armor.borderColor + '33, 0 12px 40px rgba(0,0,0,0.7)',
        }}
      >
        {/* Chamber bg */}
        <div className="armor-chamber" aria-hidden="true">
          <div className="chamber-panels" />
          <div className="chamber-grid" />
          <div className="chamber-vol-light" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% -5%, ' + armor.bgAccent + ', transparent 75%)' }} />
          <div className="chamber-floor" style={{ background: 'linear-gradient(to top, ' + armor.primaryGlow + ' 0%, transparent 30%)' }} />
        </div>

        {/* Suit image */}
        <div className="suit-frame">
          <div
            className="suit-img-wrap"
            style={{
              filter: hovered
                ? 'brightness(1.15) contrast(1.04) drop-shadow(0 0 32px ' + armor.primaryGlow + ')'
                : 'brightness(0.78) contrast(1.02)',
              transition: 'filter 0.5s ease',
            }}
          >
            <img src={image} alt={name} className="suit-image" loading="lazy" />
            <div className="suit-vignette" />
          </div>

          {/* Rim light */}
          <div
            className="suit-rim"
            style={{
              opacity: hovered ? 1 : 0,
              background: 'linear-gradient(90deg, ' + armor.rimLight + ' 0%, transparent 35%, transparent 65%, ' + armor.rimLight + ' 100%)',
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Eye glows */}
          <div className="eye-left" style={{ opacity: showEyes ? 1 : 0, background: armor.eyeColor, boxShadow: '0 0 14px 7px ' + armor.eyeColor, transition: 'opacity 0.22s ease' }} />
          <div className="eye-right" style={{ opacity: showEyes ? 1 : 0, background: armor.eyeColor, boxShadow: '0 0 14px 7px ' + armor.eyeColor, transition: 'opacity 0.22s ease' }} />



          {/* Scan sweep */}
          <div
            className={showSweep ? 'scan-bar scan-bar--active' : 'scan-bar'}
            style={{ background: 'linear-gradient(to bottom, transparent 0%, ' + armor.scanColor + ' 50%, transparent 100%)' }}
          />

          {/* Particles */}
          {particles.map((p) => (
            <Particle key={p.id} x={p.x} y={p.y} color={armor.particleColor} />
          ))}
        </div>

        {/* HUD overlay — graphical elements only, no readable armor text */}
        <div
          className="armor-hud"
          aria-hidden="true"
          style={{ opacity: showHud ? 1 : 0, transition: 'opacity 0.45s ease' }}
        >
          <span className="hud-c hud-c--tl" style={{ borderColor: armor.borderHover }} />
          <span className="hud-c hud-c--tr" style={{ borderColor: armor.borderHover }} />
          <span className="hud-c hud-c--bl" style={{ borderColor: armor.borderHover }} />
          <span className="hud-c hud-c--br" style={{ borderColor: armor.borderHover }} />

          {/* Subtle horizontal scan line accents — purely graphical */}
          <div className="hud-line hud-line--top" style={{ background: armor.borderHover + '55' }} />
          <div className="hud-line hud-line--bottom" style={{ background: armor.borderHover + '44' }} />
        </div>

        {/* Bottom info — hackathon track content only */}
        <div className="armor-info">
          {/* Track number — tiny, subtle, purely structural */}
          <span className="armor-track-num" style={{ color: armor.eyeColor }}>TRACK {number}</span>

          {/* Hero title: the actual hackathon track name */}
          <h3
            className="armor-name"
            style={{
              color: hovered ? armor.eyeColor : '#edf4f7',
              textShadow: hovered ? '0 0 24px ' + armor.primaryGlow : 'none',
              transition: 'color 0.4s ease, text-shadow 0.4s ease',
            }}
          >
            {category}
          </h3>

          {/* Track description — fades in on hover */}
          <p
            className="armor-detail-text"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.45s ease 0.12s' }}
          >
            {detail}
          </p>


        </div>

        {/* Border glow ring */}
        <div
          className="card-glow-ring"
          style={{
            opacity: hovered ? 1 : 0,
            boxShadow: 'inset 0 0 0 1px ' + armor.borderHover,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
    </article>
  )
}
