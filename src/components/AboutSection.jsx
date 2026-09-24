import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { LaunchCountdown } from './LaunchCountdown'

export function AboutSection() {
  return (
    <section id="about" className="stark-shell stark-section relative overflow-hidden">
      {/* Iron Man Suit-Up Video Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          src="/videos/suitup2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-65"
        />
        {/* Darken so the text and cards stay readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5,7,8,0.35) 0%, rgba(5,7,8,0.55) 70%, rgba(5,7,8,0.80) 100%)',
          }}
        />
        {/* Fade top and bottom edges into the page */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #050708 0%, transparent 20%, transparent 80%, #050708 100%)' }}
        />
      </div>

      <div className="section-heading relative z-10">
        <div>
          <p className="section-label">// SYSTEM OVERVIEW & SPECS</p>
          <h2>
            ABOUT<br />
            <span>VIBEATHON.</span>
          </h2>
        </div>
        <p className="section-note bg-[#050708]/80 backdrop-blur-sm border border-[#00ADEF]/25 rounded px-4 py-3 max-w-xl">
          Where artificial intelligence meets Stark-level engineering.<br />
          Think it. Prompt it. Build it.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mt-8">
        {/* Left Column: About Card */}
        <motion.div
          className="relative bg-[#090d12]/90 backdrop-blur-md border-2 border-[#00ADEF]/40 p-6 lg:p-8 flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* HUD Corner Brackets */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ADEF]" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ADEF]" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ADEF]" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ADEF]" />

          <div>
            <div className="flex items-center gap-2 text-[#00ADEF] font-mono text-xs tracking-widest uppercase mb-4">
              <Cpu className="w-4 h-4" />
              <span>STARK R&D SPECS // PROTOCOL 01</span>
            </div>

            <h3 className="font-sans font-black text-2xl lg:text-3xl text-white uppercase tracking-tight mb-4">
              UNRESTRICTED AGENTIC BUILD RAID
            </h3>

            <p className="font-mono text-sm text-[#8b9aa6] leading-relaxed mb-6">
              VIBEATHON is an intensive 8-hour sprint designed for developers, AI prompt engineers, and systems architects. Build high-impact autonomous agents, decentralized infrastructure, and next-gen machine learning models under Stark R&D protocols.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#050708] border border-[#00ADEF]/20">
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">8 HOURS</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">Sprint Duration</div>
              </div>
              <div className="p-4 bg-[#050708] border border-[#00ADEF]/20">
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">5 TRACKS</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">AI & Web3 Scope</div>
              </div>
              <div className="p-4 bg-[#050708] border border-[#00ADEF]/20">
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">SPRINT</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">Build Raid</div>
              </div>
              <div className="p-4 bg-[#050708] border border-[#00ADEF]/20">
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">SQUAD BASED</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">1-3 Members</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Launch Countdown */}
        <motion.div
          className="relative bg-[#050708]/90 backdrop-blur-md border-2 border-[#00ADEF]/50 p-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* HUD Corner Brackets */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF0000]" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF0000]" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF0000]" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF0000]" />

          <LaunchCountdown />
        </motion.div>
      </div>
    </section>
  )
}
