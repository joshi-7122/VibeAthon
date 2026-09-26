import { useCallback, useRef } from 'react'

export function useStarkAudio() {
  const audioCtxRef = useRef(null)

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    // Safari and Chrome start the context suspended until a user gesture
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }, [])

  // Repulsor hover sound: quick ascending tone burst
  const playRepulsorHover = useCallback(() => {
    try {
      const ctx = getAudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.08)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.12)
    } catch {
      // Silently fail if audio not available
    }
  }, [getAudioContext])

  // Terminal command confirmation sound: two-tone beep
  const playCommandConfirm = useCallback(() => {
    try {
      const ctx = getAudioContext()
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)
      osc1.type = 'sine'
      osc1.frequency.value = 1200
      osc2.type = 'sine'
      osc2.frequency.value = 1600
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.1)
      osc2.start(ctx.currentTime + 0.1)
      osc2.stop(ctx.currentTime + 0.2)
    } catch {
      // Silently fail
    }
  }, [getAudioContext])

  // JARVIS voice synthesis for command confirmation  
  const speakJarvis = useCallback((text) => {
    try {
      if (typeof window === 'undefined' || !window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.95
      utterance.pitch = 0.9
      utterance.volume = 1.0
      
      const setBestVoice = () => {
        const voices = window.speechSynthesis.getVoices()
        if (!voices || voices.length === 0) return
        const preferredVoice = voices.find(v => 
          (v.lang === 'en-GB' || v.lang.startsWith('en-GB')) ||
          v.name.toLowerCase().includes('daniel') ||
          v.name.toLowerCase().includes('british') ||
          v.name.toLowerCase().includes('oliver') ||
          v.name.toLowerCase().includes('george')
        ) || voices.find(v => v.lang.startsWith('en'))
        if (preferredVoice) utterance.voice = preferredVoice
      }

      setBestVoice()
      if (!utterance.voice && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          setBestVoice()
        }
      }

      window.speechSynthesis.speak(utterance)
    } catch {
      // Silently fail
    }
  }, [])

  return { playRepulsorHover, playCommandConfirm, speakJarvis }
}
