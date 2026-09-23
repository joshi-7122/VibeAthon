import { useState, useEffect, useRef } from 'react'

export function useCountUp(targetValue, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!trigger || hasRun.current) return

    if (typeof targetValue !== 'number' || isNaN(targetValue)) {
      setCount(targetValue)
      return
    }

    hasRun.current = true
    let startTimestamp = null

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * targetValue))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(targetValue)
      }
    }

    window.requestAnimationFrame(step)
  }, [targetValue, duration, trigger])

  return count
}
