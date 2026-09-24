import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import './LogoFlyIn.css'

// Arc reactor that spins beside the logo
function LogoReactor() {
  return (
    <svg className="logo-fly__reactor" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" className="logo-fly__reactor-casing" />
      <g className="logo-fly__reactor-coils">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="18" y="5" width="4" height="6" rx="0.8" transform={`rotate(${i * 45} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="10" className="logo-fly__reactor-ring" />
      <circle cx="20" cy="20" r="6" className="logo-fly__reactor-core" />
    </svg>
  )
}

// Once: fly out of the reactor toward the viewer and settle.
const ONCE = {
  word: {
    animate: {
      opacity: [0, 1, 1, 1],
      scale: [0.15, 1.45, 0.94, 1],
      x: [-60, 8, -2, 0],
      filter: ['blur(8px)', 'blur(3px)', 'blur(0px)', 'blur(0px)'],
    },
    transition: { duration: 0.9, delay: 0.45, times: [0, 0.45, 0.75, 1], ease: 'easeOut' },
  },
  streak: (i) => ({
    animate: { scaleX: [0, 1, 0.2], opacity: [0, 1, 0], x: ['-20%', '10%', '60%'] },
    transition: { duration: 0.6, delay: 0.45 + i * 0.06, ease: 'easeOut' },
  }),
}

// Loop (6s cycle): fly out and settle, hold, zoom off past the viewer, repeat.
const LOOP_SECONDS = 6
const LOOP = {
  word: {
    animate: {
      opacity: [0, 1, 1, 1, 1, 0],
      scale: [0.15, 1.45, 0.94, 1, 1, 1.9],
      x: [-60, 8, -2, 0, 0, 50],
      filter: ['blur(8px)', 'blur(3px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
    },
    transition: {
      duration: LOOP_SECONDS,
      delay: 0.45,
      times: [0, 0.07, 0.12, 0.15, 0.9, 1],
      ease: 'easeOut',
      repeat: Infinity,
    },
  },
  streak: (i) => ({
    animate: {
      scaleX: [0, 1, 0.2, 0.2, 1, 0.2],
      opacity: [0, 1, 0, 0, 1, 0],
      x: ['-20%', '10%', '60%', '60%', '10%', '60%'],
    },
    transition: {
      duration: LOOP_SECONDS,
      delay: 0.45 + i * 0.06,
      times: [0, 0.05, 0.1, 0.9, 0.95, 1],
      ease: 'easeOut',
      repeat: Infinity,
    },
  }),
}

/**
 * Spinning arc reactor + VIBEATHON wordmark that flies out of it.
 * Render inside an element with class "logo-fly"; size it with --logo-h.
 * `play` starts the animation; `loop` repeats the fly-in / fly-off cycle.
 */
export function LogoFlyIn({ play = true, loop = false }) {
  const mode = loop ? LOOP : ONCE

  return (
    <>
      <motion.span
        className="logo-fly__reactor-wrap"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={play ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <LogoReactor />
      </motion.span>

      <span className="logo-fly__word">
        {/* Speed streaks that whip past as the wordmark flies */}
        {[0, 1, 2].map((i) => {
          const streak = mode.streak(i)
          return (
            <motion.span
              key={i}
              className={`logo-fly__streak logo-fly__streak--${i}`}
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0, x: '-20%' }}
              animate={play ? streak.animate : undefined}
              transition={streak.transition}
            />
          )
        })}
        <motion.img
          src="/vibeathon-logo.png"
          alt={HACKATHON_DATA.name}
          className="logo-fly__img"
          initial={{ opacity: 0, scale: 0.15, x: -60, filter: 'blur(8px)' }}
          animate={play ? mode.word.animate : undefined}
          transition={mode.word.transition}
        />
      </span>
    </>
  )
}
