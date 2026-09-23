import { motion } from 'framer-motion'
import { Clock, Flag, Rocket } from 'lucide-react'

const MILESTONES = [
  {
    phase: '01',
    date: 'HOUR 00:00',
    title: 'SYSTEM DIAGNOSTICS & SETUP',
    desc: 'Registration & Uplink Lock, Team Formation & Architecture Blueprinting.',
    icon: Flag,
    status: 'COMPLETED'
  },
  {
    phase: '02',
    date: 'HOUR 02:00',
    title: 'ASSEMBLE ARMOR & PROTO-BUILD',
    desc: 'AI Ingestion, Smart Contract & Model Compilation, Core Sprint.',
    icon: Clock,
    status: 'IN PROGRESS'
  },
  {
    phase: '03',
    date: 'HOUR 06:00',
    title: 'DEPLOYMENT & FINAL PITCH UPLINK',
    desc: 'System Integration, Pitch Deck Ingestion & Live Demo Submission.',
    icon: Rocket,
    status: 'PENDING'
  }
]

export function Timeline() {
  return (
    <section id="timeline" className="stark-shell stark-section">
      <div className="section-heading">
        <div>
          <p className="section-label">// SCHEDULE & EVENT TIMELINE</p>
          <h2>
            8-HOUR RAID<br />
            <span>TIMELINE.</span>
          </h2>
        </div>
        <p className="section-note">
          Tick Tock Hack!<br />
          Precision milestone schedule for the 8-hour build raid.
        </p>
      </div>

      <div className="relative mt-12 max-w-5xl mx-auto">
        {/* Central Power Conduit */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ADEF] via-[#FF0000] to-[#00ADEF] -translate-x-1/2 shadow-[0_0_15px_rgba(0,173,239,0.7)]" />

        <div className="space-y-12">
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon
            const isEven = idx % 2 === 0

            return (
              <motion.div
                key={item.phase}
                className={`relative flex items-center gap-8 flex-col md:flex-row ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Node Milestone Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="relative bg-[#090d12] border-2 border-[#00ADEF]/40 p-6 group hover:border-[#FF0000] transition-colors">
                    {/* Corner HUD Markers */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ADEF]" />
                    <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ADEF]" />

                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-xs font-bold text-[#FF0000] tracking-widest">
                        {item.date}
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[#00ADEF]/40 text-[#00ADEF]">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-[#8b9aa6] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Central Node Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050708] border-2 border-[#00ADEF] flex items-center justify-center z-10 shadow-[0_0_15px_#00ADEF]">
                  <Icon className="w-4 h-4 text-[#00ADEF]" />
                </div>

                {/* Spacer for 2-column layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
