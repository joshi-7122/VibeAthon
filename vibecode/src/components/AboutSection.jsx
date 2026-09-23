import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Cpu } from 'lucide-react'
import { useStarkAudio } from '../hooks/useStarkAudio'

export function AboutSection() {
  const [terminalOutput, setTerminalOutput] = useState([
    '$ stark init --protocol-override',
    '[OK] JARVIS Core ingestion initialized...',
    '[OK] Arc Reactor output stabilized at 100%',
    '[OK] Security override active. Ready for build raid.'
  ])
  const [inputVal, setInputVal] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [arcPower, setArcPower] = useState(100)
  const scrollRef = useRef(null)
  const { playCommandConfirm, speakJarvis } = useStarkAudio()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [terminalOutput])

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    const cmd = inputVal.trim()
    let response = `Command executed: "${cmd}" - System protocol active.`
    
    if (cmd.toLowerCase() === 'help') {
      response = 'Available commands: help, status, tracks, clear, override, protocol clean-slate, power --boost'
    } else if (cmd.toLowerCase() === 'status') {
      response = 'STATUS: All 5 Intelligence Nodes Nominal. 8 Hours to compile.'
    } else if (cmd.toLowerCase() === 'tracks') {
      response = 'ARMOR TRACKS: MARK XLII (AI/ML), MARK L (Web3), HULKBUSTER (Innovation), MARK XLVI (Blockchain), MARK LXXXV (ML)'
    } else if (cmd.toLowerCase() === 'clear') {
      setTerminalOutput(['$ stark init --protocol-override'])
      setInputVal('')
      return
    } else if (cmd.toLowerCase() === 'protocol clean-slate') {
      response = '[ALERT] CLEAN SLATE PROTOCOL ACTIVATED. ALL ARMOR SUITS DETONATING...'
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setTerminalOutput(prev => [...prev, '[OK] Protocol complete. All suits destroyed.'])
      }, 2000)
    } else if (cmd.toLowerCase() === 'power --boost') {
      setArcPower(400)
      response = '[BOOST] Arc Reactor output: 400% CAPACITY. WARNING: Exceeding safe parameters.'
    }

    setTerminalOutput(prev => [...prev, `$ ${cmd}`, response])
    setInputVal('')
    playCommandConfirm()
    if (cmd.toLowerCase() === 'protocol clean-slate') {
      speakJarvis('Clean Slate Protocol activated, sir. All suits are detonating.')
    } else if (cmd.toLowerCase() === 'power --boost') {
      speakJarvis('Arc Reactor output increased to 400 percent capacity. Exceeding safe parameters, sir.')
    } else {
      speakJarvis('Command acknowledged, sir.')
    }
  }

  return (
    <section id="about" className={`stark-shell stark-section relative overflow-hidden ${isShaking ? 'animate-screen-shake border-2 border-[#FF0000]' : ''}`}>
      <div className="section-heading">
        <div>
          <p className="section-label">// SYSTEM OVERVIEW & SPECS</p>
          <h2>
            ABOUT<br />
            <span>VIBEATHON.</span>
          </h2>
        </div>
        <p className="section-note">
          Where artificial intelligence meets Stark-level engineering.<br />
          Think it. Prompt it. Build it.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mt-8">
        {/* Left Column: About Card */}
        <motion.div
          className="relative bg-[#090d12] border-2 border-[#00ADEF]/40 p-6 lg:p-8 flex flex-col justify-between"
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
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">NATIONAL</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">Build Raid</div>
              </div>
              <div className="p-4 bg-[#050708] border border-[#00ADEF]/20">
                <div className="font-sans font-bold text-[#00ADEF] text-lg mb-1">SQUAD BASED</div>
                <div className="font-mono text-[10px] text-[#8b9aa6] uppercase tracking-wider">1-4 Builders</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Terminal */}
        <motion.div
          className="relative bg-[#050708] border-2 border-[#00ADEF]/50 p-6 flex flex-col justify-between font-mono"
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

          <div>
            <div className="flex items-center justify-between border-b border-[#00ADEF]/30 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs text-[#00ADEF]">
                <Terminal className="w-4 h-4" />
                <span>JARVIS_TERMINAL // ARC: {arcPower}%</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00ADEF]" />
              </div>
            </div>

            <div ref={scrollRef} className="space-y-2 text-xs text-[#8b9aa6] max-h-[220px] overflow-y-auto pr-2">
              {terminalOutput.map((out, idx) => (
                <div
                  key={idx}
                  className={out.startsWith('$') ? 'text-[#00ADEF] font-bold' : out.includes('OK') ? 'text-emerald-400' : 'text-[#aab7bf]'}
                >
                  {out}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleCommandSubmit} className="mt-4 pt-3 border-t border-[#00ADEF]/30 flex items-center gap-2">
            <span className="text-[#00ADEF] text-xs font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'status', 'protocol clean-slate')..."
              className="bg-transparent text-xs text-white focus:outline-none w-full font-mono"
            />
          </form>
        </motion.div>
      </div>
    </section>
  )
}
