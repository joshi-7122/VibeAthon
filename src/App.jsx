import { useState } from 'react'
import { IronSuitupIntro } from './components/IronSuitupIntro'
import { HudCursor } from './components/HudCursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MarqueeTicker } from './components/MarqueeTicker'
import { AboutSection } from './components/AboutSection'
import { Stats } from './components/Stats'
import { Tracks } from './components/Tracks'
import { PrizesSection } from './components/PrizesSection'
import { Timeline } from './components/Timeline'
import { Footer } from './components/Footer'

export function App() {
  const [showSuitupIntro, setShowSuitupIntro] = useState(true)

  return (
    <div className="stark-page">
      {showSuitupIntro && (
        <IronSuitupIntro onComplete={() => setShowSuitupIntro(false)} />
      )}
      
      <HudCursor />
      <Header />
      <main>
        <Hero introDone={!showSuitupIntro} />
        <MarqueeTicker />
        <AboutSection />
        <Stats />
        <Tracks />
        <PrizesSection />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}

export default App
