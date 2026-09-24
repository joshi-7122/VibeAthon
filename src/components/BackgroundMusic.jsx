import { useEffect, useRef } from 'react'

// Drop the track at public/audio/background-music.mp3. If the file is missing
// the player simply stays silent.
const MUSIC_SRC = '/audio/background-music.mp3'
const VOLUME = 0.08 // kept low so it stays in the background and never gets irritating
const FADE_MS = 2500
// Wait for the hero intro audio (~6.5s) to finish before the music comes in
const START_DELAY_MS = 7000
const GESTURE_EVENTS = ['click', 'touchend', 'pointerup', 'keydown']

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// iOS / iPadOS Safari ignore audio.volume (it always reads back 1)
function canSetVolume(audio) {
  const previous = audio.volume
  audio.volume = 0.5
  const ok = Math.abs(audio.volume - 0.5) < 0.01
  audio.volume = previous
  return ok
}

// Volume control for the track. Uses audio.volume where the browser allows
// it, otherwise routes the element through a Web Audio gain node. Returns
// null if neither works, so the music is skipped rather than played loud.
function createVolume(audio, graphRef) {
  if (canSetVolume(audio)) {
    return {
      set: (v) => { audio.volume = clamp01(v) },
      get: () => audio.volume,
      resume: () => Promise.resolve(),
    }
  }

  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null
  // An element can only be connected to Web Audio once, so keep the graph
  if (!graphRef.current) {
    try {
      const ctx = new AudioCtx()
      const gain = ctx.createGain()
      gain.gain.value = 0
      ctx.createMediaElementSource(audio).connect(gain)
      gain.connect(ctx.destination)
      graphRef.current = { ctx, gain }
    } catch {
      return null
    }
  }
  const { ctx, gain } = graphRef.current
  return {
    set: (v) => { gain.gain.value = clamp01(v) },
    get: () => gain.gain.value,
    resume: () => (ctx.state === 'running' ? Promise.resolve() : ctx.resume()),
  }
}

function fadeTo(volume, target, ms) {
  const from = volume.get()
  const start = performance.now()
  const step = (now) => {
    // rAF timestamps can be slightly earlier than `start`, so clamp at 0 too
    const t = clamp01((now - start) / ms)
    volume.set(from + (target - from) * t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/**
 * Looping background music for the whole visit. Starts softly once the intro
 * is over; if the browser blocks sound it starts on the first click/key press.
 * Pauses while the tab is hidden and picks up again when the visitor returns.
 */
export function BackgroundMusic({ start = true }) {
  const audioRef = useRef(null)
  const graphRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!start || !audio) return

    let started = false
    // The file may already have failed to load before this effect ran
    let failed = Boolean(audio.error)
    let volume = null
    const removeGestures = () => GESTURE_EVENTS.forEach((e) => window.removeEventListener(e, tryPlay))

    function tryPlay() {
      if (started || failed) return
      volume = volume || createVolume(audio, graphRef)
      if (!volume) {
        failed = true
        removeGestures()
        return
      }
      volume.set(0)
      Promise.all([volume.resume(), audio.play()])
        .then(() => {
          started = true
          removeGestures()
          fadeTo(volume, VOLUME, FADE_MS)
        })
        .catch(() => {
          // Blocked until the visitor interacts: retry on their next gesture
          GESTURE_EVENTS.forEach((e) => window.addEventListener(e, tryPlay, { passive: true }))
        })
    }

    const onError = () => {
      failed = true
      removeGestures()
    }
    const onVisibility = () => {
      if (!started) return
      if (document.visibilityState === 'hidden') audio.pause()
      else audio.play().catch(() => {})
    }

    audio.addEventListener('error', onError)
    document.addEventListener('visibilitychange', onVisibility)
    const timer = setTimeout(tryPlay, START_DELAY_MS)

    return () => {
      clearTimeout(timer)
      removeGestures()
      audio.removeEventListener('error', onError)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [start])

  // preload="none": the track is only fetched when it's about to play, so it
  // doesn't compete with the hero videos while the page is loading
  return <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" aria-hidden="true" />
}
