import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useCountUp } from '../hooks/useCountUp'

// Every number inside a value counts up together, keeping its zero padding,
// so text values like "04/10/2026" or "9 AM ONWARDS" animate too
function StatItem({ stat, isVisible }) {
  const display = String(stat.rawDisplay ?? stat.value)
  const hasDigits = /\d/.test(display)
  // 0 -> 1000 with the count-up's easing, used as a 0..1 progress
  const progress = useCountUp(hasDigits ? 1000 : 0, 2000, isVisible) / 1000

  const formattedDisplay = () => {
    if (!hasDigits) return display
    if (typeof stat.value === 'number') {
      return Math.round(progress * stat.value).toLocaleString('en-US')
    }
    return display.replace(/\d+/g, (digits) =>
      String(Math.round(progress * Number(digits))).padStart(digits.length, '0'),
    )
  }

  return (
    <div>
      <strong>{formattedDisplay()}</strong>
      <span>{stat.label}</span>
    </div>
  )
}

// `ready` holds the count-up until the suit-up intro has cleared, so it
// never plays hidden behind the loader
export function Stats({ ready = true }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const isVisible = inView && ready

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      ref={ref}
      className="stark-shell stats-grid"
      aria-label="Event statistics"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {HACKATHON_DATA.stats.map((stat, index) => (
        <StatItem key={index} stat={stat} isVisible={isVisible} />
      ))}
    </motion.section>
  )
}
