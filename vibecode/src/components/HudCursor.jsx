import { useEffect, useRef } from 'react'

export function HudCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let trail = []
    let mouse = { x: -100, y: -100, active: false }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouse.active = true
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Append smooth mouse path history for energy flare stream
      trail.unshift({
        x: mouse.x,
        y: mouse.y,
        age: 0
      })

      if (trail.length > 20) {
        trail.pop()
      }
    }

    const onMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    let rotationAngle = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      rotationAngle += 0.025

      // Age trail history points
      for (let i = 0; i < trail.length; i++) {
        trail[i].age += 1
      }
      trail = trail.filter((pt) => pt.age < 20)

      // 1. Render Glowing Blue Energy Flare Ribbon (Continuous beam flare, zero confetti)
      if (trail.length > 1) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Outer Cyan Plasma Plume Flare Glow
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)
        for (let i = 1; i < trail.length; i++) {
          const xc = (trail[i].x + trail[i - 1].x) / 2
          const yc = (trail[i].y + trail[i - 1].y) / 2
          ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc)
        }
        ctx.strokeStyle = '#00E5FF'
        ctx.lineWidth = 6
        ctx.shadowColor = '#00E5FF'
        ctx.shadowBlur = 16
        ctx.globalAlpha = 0.8
        ctx.stroke()

        // Inner White-Hot Core Beam
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)
        for (let i = 1; i < trail.length; i++) {
          const xc = (trail[i].x + trail[i - 1].x) / 2
          const yc = (trail[i].y + trail[i - 1].y) / 2
          ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc)
        }
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2.5
        ctx.shadowColor = '#FFFFFF'
        ctx.shadowBlur = 10
        ctx.globalAlpha = 0.95
        ctx.stroke()

        ctx.restore()
      }

      // 2. Render Sleek Blue HUD Target Cursor at lead position
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        ctx.save()

        // Outer Orbit Ring
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Rotating Crosshair Ticks
        for (let i = 0; i < 4; i++) {
          const a = rotationAngle + (i * Math.PI) / 2
          const x1 = mouse.x + Math.cos(a) * 7
          const y1 = mouse.y + Math.sin(a) * 7
          const x2 = mouse.x + Math.cos(a) * 12
          const y2 = mouse.y + Math.sin(a) * 12

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = '#00E5FF'
          ctx.lineWidth = 1.2
          ctx.shadowColor = '#00E5FF'
          ctx.shadowBlur = 6
          ctx.stroke()
        }

        // Center White Core Dot
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = '#FFFFFF'
        ctx.shadowColor = '#00E5FF'
        ctx.shadowBlur = 10
        ctx.fill()

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    />
  )
}
