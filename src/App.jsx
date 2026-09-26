import { useState, useEffect } from 'react'
import { IronSuitupIntro } from './components/IronSuitupIntro'
import { StarkCursor } from './components/StarkCursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MarqueeTicker } from './components/MarqueeTicker'
import { AboutSection } from './components/AboutSection'
import { Stats } from './components/Stats'
import { Tracks } from './components/Tracks'
import { PrizesSection } from './components/PrizesSection'
import { Timeline } from './components/Timeline'
import { CrewSection } from './components/CrewSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'
import { BackgroundMusic } from './components/BackgroundMusic'

export function App() {
  const [showSuitupIntro, setShowSuitupIntro] = useState(true)

  // Warm up and unlock Web Audio context on any natural presence
  useEffect(() => {
    const unlock = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {})
          }
        }
      } catch {
        // ignore
      }
    }

    const events = ['mousemove', 'pointermove', 'scroll', 'wheel', 'touchstart', 'keydown', 'click']
    events.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, unlock))
  }, [])

  return (
    <div className="stark-page">
      {showSuitupIntro && (
        <IronSuitupIntro onComplete={() => setShowSuitupIntro(false)} />
      )}
      
      <StarkCursor busy={showSuitupIntro} />
      <BackgroundMusic start={!showSuitupIntro} />
      <Header introDone={!showSuitupIntro} />
      <main>
        <Hero introDone={!showSuitupIntro} />
        <MarqueeTicker />
        <AboutSection />
        <Stats ready={!showSuitupIntro} />
        <Tracks />
        <PrizesSection />
        <Timeline />
        <CrewSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
