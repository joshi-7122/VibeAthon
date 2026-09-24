import { useEffect, useRef, useState } from 'react'
import './StarkCursor.css'

// Which cursor state applies to the element under the pointer (first match wins)
function stateFor(el) {
  if (!(el instanceof Element)) return 'default'
  if (el.closest('[disabled], [aria-disabled="true"]')) return 'blocked'
  if (el.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')) return 'text'
  if (el.closest('a[href]')) return 'link'
  if (el.closest('button, [role="button"], summary, label, select, .crew-card')) return 'hover'
  return 'default'
}

// One armoured finger: red plates with gold knuckle bands, rounded gold tip
function Finger({ x, y, w, h, bands = 2, tilt = 0 }) {
  const cx = x + w / 2
  const step = h / (bands + 1)
  return (
    <g transform={tilt ? `rotate(${tilt} ${cx} ${y + h})` : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={w / 2} fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.9" />
      {Array.from({ length: bands }, (_, i) => (
        <rect key={i} x={x + 0.4} y={y + step * (i + 1) - 0.9} width={w - 0.8} height="1.8" rx="0.9" fill="url(#st-gold)" />
      ))}
      <path d={`M${x + 0.6} ${y + w / 2} A ${w / 2 - 0.6} ${w / 2 - 0.6} 0 0 1 ${x + w - 0.6} ${y + w / 2}`} fill="url(#st-gold)" />
    </g>
  )
}

// Iron Man-style gauntlet, drawn upright with the index fingertip at (15, 2) =
// the exact click point. CSS tilts it. Open palm by default; the pointing pose
// appears over anything clickable.
function Gauntlet() {
  return (
    <svg className="st-cursor__hand" viewBox="0 0 40 56" aria-hidden="true">
      <defs>
        <linearGradient id="st-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff4a4a" />
          <stop offset="55%" stopColor="#c8141e" />
          <stop offset="100%" stopColor="#6e0710" />
        </linearGradient>
        <linearGradient id="st-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="45%" stopColor="#f2b544" />
          <stop offset="100%" stopColor="#9a6212" />
        </linearGradient>
        <radialGradient id="st-reactor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#bff6ff" />
          <stop offset="100%" stopColor="#00b8e6" />
        </radialGradient>
      </defs>

      {/* Open hand: fingers spread, thumb out */}
      <g className="st-cursor__pose st-cursor__pose--open">
        <Finger x={4} y={21} w={6} h={14} bands={1} tilt={-38} />
        <Finger x={12.2} y={2} w={5.6} h={24} tilt={-6} />
        <Finger x={18.6} y={0.5} w={5.8} h={25} />
        <Finger x={25.2} y={3} w={5.6} h={23} tilt={6} />
        <Finger x={31.2} y={9} w={5} h={18} tilt={13} />
      </g>

      {/* Pointing hand: index extended, other fingers curled, thumb tucked */}
      <g className="st-cursor__pose st-cursor__pose--point">
        <Finger x={12.2} y={1} w={5.6} h={25} />
        <rect x="18" y="19" width="6" height="9" rx="3" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.9" />
        <rect x="24" y="20" width="5.6" height="8.5" rx="2.8" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.9" />
        <rect x="29.4" y="22" width="5" height="7.5" rx="2.5" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.9" />
        <path d="M6 30 Q8 25 14 27 L20 30 Q21 33 17.5 34 L10 35 Q6.5 34.5 6 30 Z" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.9" />
      </g>

      {/* Palm, repulsor and wrist cuff (shared by both poses) */}
      <path d="M10.5 24 H35.5 L34.5 41 Q34 45 30 45.5 H15.5 Q11.5 45 11 41 Z" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="1" />
      <path d="M13 26.5 H33 L32.4 29 H13.6 Z" fill="url(#st-gold)" opacity="0.85" />
      <circle cx="23" cy="35.5" r="5.6" fill="#1a0507" stroke="url(#st-gold)" strokeWidth="1.1" />
      <circle cx="23" cy="35.5" r="4" fill="url(#st-reactor)" className="st-cursor__reactor" />
      <rect x="13.5" y="45" width="19" height="4.5" rx="1.2" fill="url(#st-gold)" />
      <path d="M14.5 49.5 H31.5 L30.5 56 H15.5 Z" fill="url(#st-red)" stroke="url(#st-gold)" strokeWidth="0.8" />
    </svg>
  )
}

export function StarkCursor({ busy = false }) {
  // Only on devices with a real mouse; touch screens keep their default behaviour
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const rootRef = useRef(null)
  const pointerRef = useRef(null)
  const pulseRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-stark-cursor')

    const root = rootRef.current
    const pointer = pointerRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const pos = { x: -200, y: -200, visible: false }
    const last = { x: -200, y: -200 }
    const trail = [] // recent positions for the light streak
    const flares = []
    const puffs = []
    let state = 'default'
    let frame = 0
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!pos.visible) {
        pos.visible = true
        last.x = pos.x
        last.y = pos.y
        html.classList.add('stark-cursor-visible')
      }
      const next = stateFor(e.target)
      if (next !== state) {
        state = next
        root.dataset.state = state
      }
    }

    const onLeave = () => {
      pos.visible = false
      html.classList.remove('stark-cursor-visible')
    }

    const onDown = () => {
      const pulse = pulseRef.current
      pulse.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      pulse.classList.remove('is-firing')
      void pulse.offsetWidth // restart the animation
      pulse.classList.add('is-firing')
      root.classList.add('is-pressed')
      // a burst of sparks from the tip
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2
        const v = 1.5 + Math.random() * 2.5
        flares.push({ x: pos.x, y: pos.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 1 + Math.random(), life: 0, max: 16 + Math.random() * 12 })
      }
    }
    const onUp = () => root.classList.remove('is-pressed')

    const tick = () => {
      frame++
      pointer.style.transform = `translate(${pos.x}px, ${pos.y}px)`

      const vx = pos.x - last.x
      const vy = pos.y - last.y
      last.x = pos.x
      last.y = pos.y
      const speed = Math.hypot(vx, vy)
      const moving = pos.visible && speed > 0.8

      // Emit from the gauntlet's wrist, streaming opposite the direction of travel
      const tailX = pos.x + 21
      const tailY = pos.y + 28
      if (pos.visible) {
        trail.unshift({ x: tailX, y: tailY, age: 0 })
        if (trail.length > 14) trail.pop()
      }
      const dirX = moving ? -vx / speed : 0.4
      const dirY = moving ? -vy / speed : 0.6

      const flareCount = moving ? Math.min(4, 1 + Math.floor(speed / 6)) : state === 'hover' || state === 'link' ? (frame % 4 === 0 ? 1 : 0) : 0
      for (let i = 0; i < flareCount && flares.length < 180; i++) {
        const spread = (Math.random() - 0.5) * 0.8
        const v = (moving ? Math.min(speed * 0.35, 6) : 0.8) * (0.6 + Math.random() * 0.8)
        flares.push({
          x: tailX + (Math.random() - 0.5) * 6,
          y: tailY + (Math.random() - 0.5) * 6,
          vx: (dirX - dirY * spread) * v,
          vy: (dirY + dirX * spread) * v,
          r: 0.9 + Math.random() * 1.3,
          life: 0,
          max: 14 + Math.random() * 18,
        })
      }
      // Very light smoke
      if (moving && frame % 3 === 0 && puffs.length < 50) {
        puffs.push({ x: tailX, y: tailY, vx: dirX * 0.6, vy: dirY * 0.6 - 0.1, r: 3, life: 0, max: 50 + Math.random() * 20 })
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Smoke haze
      ctx.globalCompositeOperation = 'source-over'
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i]
        if (++p.life > p.max) { puffs.splice(i, 1); continue }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy = p.vy * 0.95 - 0.015; p.r += 0.35
        const t = p.life / p.max
        const a = (t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85) * 0.06
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        g.addColorStop(0, `rgba(230, 215, 212, ${a})`)
        g.addColorStop(1, 'rgba(180, 160, 158, 0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      }

      ctx.globalCompositeOperation = 'lighter'

      // Light streak behind the tail while moving
      for (const pt of trail) pt.age++
      if (trail.length > 2 && speed > 2) {
        ctx.lineCap = 'round'
        for (let i = 1; i < trail.length; i++) {
          const a = (1 - i / trail.length) * Math.min(1, speed / 14)
          ctx.strokeStyle = `rgba(255, ${Math.round(120 - i * 5)}, 60, ${a * 0.55})`
          ctx.lineWidth = Math.max(0.5, 3 - i * 0.2)
          ctx.beginPath(); ctx.moveTo(trail[i - 1].x, trail[i - 1].y); ctx.lineTo(trail[i].x, trail[i].y); ctx.stroke()
        }
      }

      // Flares: white-hot core fading through orange to red
      for (let i = flares.length - 1; i >= 0; i--) {
        const f = flares[i]
        if (++f.life > f.max) { flares.splice(i, 1); continue }
        f.x += f.vx; f.y += f.vy; f.vx *= 0.9; f.vy *= 0.9
        const t = f.life / f.max
        const a = 1 - t
        const r = f.r * (1 + t * 0.6) * 3
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r)
        g.addColorStop(0, `rgba(255, 245, 230, ${a})`)
        g.addColorStop(0.25, `rgba(255, ${Math.round(170 - t * 120)}, 60, ${a * 0.85})`)
        g.addColorStop(0.6, `rgba(255, 30, 30, ${a * 0.35})`)
        g.addColorStop(1, 'rgba(255, 0, 0, 0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    html.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      html.removeEventListener('mouseleave', onLeave)
      html.classList.remove('has-stark-cursor', 'stark-cursor-visible')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={rootRef} className={`st-cursor ${busy ? 'is-busy' : ''}`} data-state="default" aria-hidden="true">
      <canvas ref={canvasRef} className="st-cursor__fx" />
      <div ref={pulseRef} className="st-cursor__pulse">
        <span className="st-cursor__pulse-ring st-cursor__pulse-ring--outer" />
        <span className="st-cursor__pulse-ring st-cursor__pulse-ring--inner" />
      </div>
      <div ref={pointerRef} className="st-cursor__pointer">
        <Gauntlet />
        {/* Link badge */}
        <span className="st-cursor__badge st-cursor__badge--link">
          <svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></svg>
        </span>
        {/* Text I-beam */}
        <svg className="st-cursor__ibeam" viewBox="0 0 16 32">
          <path d="M3 2 H13 M8 2 V30 M3 30 H13" />
        </svg>
        {/* Not allowed */}
        <svg className="st-cursor__blocked" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" />
          <path d="M7.5 7.5 L24.5 24.5" />
        </svg>
        {/* Busy: spinning reactor */}
        <svg className="st-cursor__busy" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" className="st-cursor__busy-ring" />
          <circle cx="20" cy="20" r="6" className="st-cursor__busy-core" />
        </svg>
      </div>
    </div>
  )
}
