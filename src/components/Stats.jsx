import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { useCountUp } from '../hooks/useCountUp'

function ScrambleText({ text, isVisible }) {
  const [displayText, setDisplayText] = useState(text.replace(/[^\s-]/g, '0'))
  
  useEffect(() => {
    if (!isVisible) return
    
    let iterations = 0
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*"
    const nums = "0123456789"
    
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (letter === ' ' || letter === '-') return letter
        if (index < iterations) {
          return text[index]
        }
        if (/[0-9]/.test(letter)) {
          return nums[Math.floor(Math.random() * nums.length)]
        }
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      
      if (iterations >= text.length) {
        clearInterval(interval)
      }
      
      iterations += 1 / 3
    }, 30)
    
    return () => clearInterval(interval)
  }, [text, isVisible])
  
  return <>{displayText}</>
}

function StatItem({ stat, isVisible }) {
  const count = useCountUp(
    typeof stat.value === 'number' ? stat.value : 0,
    2000,
    isVisible
  )

  const formattedDisplay = () => {
    if (typeof stat.value !== 'number') {
      return <ScrambleText text={stat.rawDisplay} isVisible={isVisible} />
    }
    return count.toLocaleString('en-US')
  }

  return (
    <div>
      <strong>{formattedDisplay()}</strong>
      <span>{stat.label}</span>
    </div>
  )
}

export function Stats() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
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
