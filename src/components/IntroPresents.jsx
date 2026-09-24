import { useState } from 'react'
import { motion } from 'framer-motion'
import './IntroPresents.css'

const WORDS = [
  { text: 'IEEE GUSB', accent: false },
  { text: 'CIS', accent: true },
]

// Last letter lands at roughly this time (seconds); the sweep, beam and
// "PRESENTS" follow it.
const ASSEMBLED_AT = 1.9

// The intro is short and skippable, so like the logo fly-out it plays even
// when the OS asks for reduced motion (Windows turns that on whenever its
// animation effects are off).

// Each letter is an armour part: it launches from a random point off to the
// side, tumbling, and snaps into its slot.
function makeParts() {
  const w = window.innerWidth
  const h = window.innerHeight
  const letters = WORDS.flatMap((word) => word.text.replace(/\s/g, '').split(''))
  // Shuffle the landing order so parts arrive from all over, not left-to-right
  const order = letters.map((_, i) => i).sort(() => Math.random() - 0.5)

  return letters.map((_, i) => {
    const angle = Math.random() * Math.PI * 2
    const dist = 0.55 + Math.random() * 0.35
    return {
      x: Math.cos(angle) * w * dist,
      y: Math.sin(angle) * h * dist,
      rotate: (Math.random() < 0.5 ? -1 : 1) * (180 + Math.random() * 360),
      rotateX: (Math.random() - 0.5) * 140,
      scale: 0.3 + Math.random() * 1.8,
      delay: 0.15 + (order[i] / letters.length) * 1.05 + Math.random() * 0.12,
    }
  })
}

function Part({ char, accent, part }) {
  const spring = { type: 'spring', stiffness: 170, damping: 15, mass: 0.9, delay: part.delay }
  return (
    <motion.span
      className={`intro-part${accent ? ' is-accent' : ''}`}
      initial={{
        x: part.x,
        y: part.y,
        rotate: part.rotate,
        rotateX: part.rotateX,
        scale: part.scale,
        opacity: 0,
        filter: 'blur(6px)',
      }}
      animate={{ x: 0, y: 0, rotate: 0, rotateX: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
      transition={{
        default: spring,
        opacity: { duration: 0.25, delay: part.delay },
        filter: { duration: 0.6, delay: part.delay + 0.1 },
      }}
    >
      {char}
      {/* Weld flash as the part locks into place */}
      <motion.span
        className="intro-part__weld"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 1, 0], scale: [0.2, 1.4, 1.8] }}
        transition={{ duration: 0.45, delay: part.delay + 0.55, ease: 'easeOut' }}
      />
    </motion.span>
  )
}

export function IntroPresents() {
  const [parts] = useState(makeParts)

  let n = 0
  return (
    <div className="intro-presents" aria-label="IEEE GUSB CIS presents">
      <div className="intro-presents__title" aria-hidden="true">
        {WORDS.map((word) => (
          <span key={word.text} className="intro-presents__word">
            {word.text.split(' ').map((chunk) => (
              <span key={chunk} className="intro-presents__chunk">
                {chunk.split('').map((char) => {
                  const part = parts[n++]
                  return <Part key={n} char={char} accent={word.accent} part={part} />
                })}
              </span>
            ))}
          </span>
        ))}

        {/* Systems-check light sweep once the name is assembled */}
        <motion.span
          className="intro-presents__sweep"
          initial={{ x: '-120%', opacity: 0 }}
          animate={{ x: '120%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.8, delay: ASSEMBLED_AT, ease: 'easeInOut' }}
        />
      </div>

      <motion.span
        className="intro-presents__beam"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: ASSEMBLED_AT + 0.1, ease: 'easeOut' }}
      />

      <motion.span
        className="intro-presents__presents"
        aria-hidden="true"
        initial={{ opacity: 0, letterSpacing: '1.4em', filter: 'blur(4px)' }}
        animate={{ opacity: 1, letterSpacing: '0.6em', filter: 'blur(0px)' }}
        transition={{ duration: 0.7, delay: ASSEMBLED_AT + 0.3, ease: 'easeOut' }}
      >
        Presents
      </motion.span>
    </div>
  )
}
