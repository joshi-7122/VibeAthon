import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the header line, from a list
 * of section ids in page order. Missing sections are skipped.
 */
export function useActiveSection(ids, offset = 250) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const list = key.split('|')
    const update = () => {
      // Bottom of the page: the last section wins even if it's short
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = list[0]
      for (const id of list) {
        const el = document.getElementById(id)
        if (!el) continue
        if (atBottom || el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [key, offset])

  return active
}

/** Smooth-scrolls to a section and records it in the URL without a jump. */
export function scrollToSection(id, event) {
  const el = document.getElementById(id)
  if (!el) return
  event?.preventDefault()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
}
