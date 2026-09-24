import { motion } from 'framer-motion'
import { Flag, Target, Cpu, Wrench, Scan, Shield, RefreshCw, Rocket, CheckCircle } from 'lucide-react'

const MILESTONES = [
  {
    phase: '01',
    time: '10:00 AM',
    label: 'SYSTEM DIAGNOSTICS',
    title: 'SYSTEM DIAGNOSTICS & SETUP',
    desc: 'Registration, team verification, event briefing, rules, environment setup and final readiness check.',
    icon: Flag,
    status: 'START',
    type: 'normal'
  },
  {
    phase: '02',
    time: '11:00 AM',
    label: 'MISSION BRIEFING',
    title: 'PROBLEM STATEMENTS REVEALED',
    desc: 'Problem statements go live. Teams analyze requirements, select their challenge and lock their initial approach.',
    icon: Target,
    status: 'UNLOCKED',
    type: 'reveal'
  },
  {
    phase: '03',
    time: '12:00 PM',
    label: 'ARC REACTOR ONLINE',
    title: 'IDEATION & ARCHITECTURE',
    desc: 'Solution ideation, feature prioritization, technology selection, system architecture and task allocation.',
    icon: Cpu,
    status: 'IN PROGRESS',
    type: 'normal'
  },
  {
    phase: '04',
    time: '02:00 PM',
    label: 'ARMOR ASSEMBLY',
    title: 'CORE BUILD SPRINT',
    desc: 'Teams enter the main development sprint — building the MVP, integrating APIs, AI models, databases and core functionality.',
    icon: Wrench,
    status: 'IN PROGRESS',
    type: 'normal'
  },
  {
    phase: '05',
    time: '03:00 PM',
    label: 'EVALUATION — ROUND 01',
    title: 'FIRST EVALUATION',
    desc: 'Initial prototype review, progress assessment, technical validation and mentor feedback.',
    icon: Scan,
    status: 'CHECKPOINT',
    type: 'eval'
  },
  {
    phase: '06',
    time: '04:00 PM',
    label: 'SYSTEM UPGRADE',
    title: 'ITERATE & OPTIMIZE',
    desc: 'Teams implement feedback, improve functionality, resolve bugs, refine UX and prepare the solution for final evaluation.',
    icon: RefreshCw,
    status: 'IN PROGRESS',
    type: 'normal'
  },
  {
    phase: '07',
    time: '05:00 PM',
    label: 'EVALUATION — ROUND 02',
    title: 'FINAL EVALUATION',
    desc: 'Final prototype review, feature validation, technical assessment and judging checkpoint.',
    icon: Shield,
    status: 'FINAL CHECK',
    type: 'eval'
  },
  {
    phase: '08',
    time: '05:30 PM',
    label: 'FINAL UPLINK',
    title: 'DEPLOYMENT & FINAL PITCH',
    desc: 'Code freeze, final submission, pitch deck preparation, demo rehearsal and deployment readiness.',
    icon: Rocket,
    status: 'FINALIZING',
    type: 'normal'
  },
  {
    phase: '09',
    time: '06:00 PM',
    label: 'MISSION COMPLETE',
    title: '8-HOUR RAID COMPLETE',
    desc: 'Final submissions locked. Teams move into the final demo / closing phase.',
    icon: CheckCircle,
    status: 'COMPLETE',
    type: 'normal'
  }
]

export function Timeline() {
  return (
    <section id="timeline" className="stark-shell stark-section relative overflow-hidden">
      {/* Animated Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center mix-blend-screen opacity-50" aria-hidden="true">
        <motion.img
          src="/timeline-bg-vertical.jpg"
          alt=""
          className="w-full h-full object-cover object-top opacity-60"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 section-heading">
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

      <div className="relative z-10 mt-12 max-w-5xl mx-auto">
        {/* Central Power Conduit */}
        <motion.div 
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ADEF] via-[#FF0000] to-[#00ADEF] -translate-x-1/2 shadow-[0_0_15px_rgba(0,173,239,0.7)] origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

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
                whileInView={
                  item.type === 'reveal'
                    ? { opacity: 1, x: 0, scale: [0.9, 1.05, 1], filter: ['brightness(1.5)', 'brightness(1)'] }
                    : { opacity: 1, x: 0 }
                }
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Node Milestone Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <motion.div 
                    className={`relative bg-[#090d12]/90 backdrop-blur-sm border-2 ${
                      item.type === 'eval' ? 'border-[#00ADEF]/60 shadow-[0_0_15px_rgba(0,173,239,0.1)]' :
                      item.type === 'reveal' ? 'border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.15)]' :
                      'border-[#00ADEF]/40'
                    } p-6 group hover:shadow-[0_0_20px_rgba(0,173,239,0.35)] hover:border-[#00ADEF] transition-all duration-300 overflow-hidden`}
                  >
                    {/* Scanning effect for Eval nodes */}
                    {item.type === 'eval' && (
                      <motion.div
                        className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#00ADEF]/20 to-transparent z-0 pointer-events-none"
                        animate={{ top: ['-30%', '130%'] }}
                        transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
                      />
                    )}

                    {/* Corner HUD Markers */}
                    <span className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${item.type === 'reveal' ? 'border-[#FFD700]' : 'border-[#00ADEF]'}`} />
                    <span className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${item.type === 'reveal' ? 'border-[#FFD700]' : 'border-[#00ADEF]'}`} />

                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-mono text-xs font-bold ${item.type === 'reveal' ? 'text-[#FFD700]' : 'text-[#FF0000]'} tracking-widest`}>
                          {item.time}
                        </span>
                        <span className={`font-mono text-[9px] px-2 py-0.5 border ${item.type === 'reveal' ? 'border-[#FFD700]/40 text-[#FFD700]' : 'border-[#00ADEF]/40 text-[#00ADEF]'}`}>
                          {item.status}
                        </span>
                      </div>

                      <div className={`font-mono text-[10px] mb-1 tracking-widest uppercase ${item.type === 'reveal' ? 'text-[#FFD700]/80' : 'text-[#00ADEF]/80'}`}>
                        // {item.label}
                      </div>

                      <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight mb-2">
                        {item.title}
                      </h3>

                      <p className="font-mono text-xs text-[#8b9aa6] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Central Node Badge */}
                <motion.div 
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050708] border-2 ${
                    item.type === 'reveal' ? 'border-[#FFD700]' : 'border-[#00ADEF]'
                  } flex items-center justify-center z-10`}
                  animate={{ boxShadow: item.type === 'reveal' ? ['0 0 10px rgba(255,215,0,0.4)', '0 0 20px rgba(255,215,0,0.8)', '0 0 10px rgba(255,215,0,0.4)'] : ['0 0 10px rgba(0,173,239,0.4)', '0 0 20px rgba(0,173,239,0.8)', '0 0 10px rgba(0,173,239,0.4)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon className={`w-4 h-4 ${item.type === 'reveal' ? 'text-[#FFD700]' : 'text-[#00ADEF]'}`} />
                </motion.div>

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
