import { useState } from 'react'
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
