import { useState, useEffect } from 'react'

// Types `text` out one character at a time once `enabled` is true.
export function useTypewriter(text, speed = 40, delay = 200, enabled = true) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled) return

    let index = 0
    let intervalId

    const startTyping = () => {
      intervalId = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(intervalId)
          setIsComplete(true)
        }
      }, speed)
    }

    const timeoutId = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, delay, enabled])

  return { displayText, isComplete }
}
