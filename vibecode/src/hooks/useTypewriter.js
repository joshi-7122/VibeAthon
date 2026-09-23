import { useState, useEffect } from 'react'

export function useTypewriter(text, speed = 40, delay = 200) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let index = 0
    let timeoutId

    const startTyping = () => {
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, speed)
    }

    timeoutId = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay])

  return { displayText, isComplete }
}
