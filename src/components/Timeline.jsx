import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Flag, Radar, ScanSearch, ShieldCheck, Trophy, Wrench } from 'lucide-react'
import './Timeline.css'

// 4 October, 9:00 AM – 4:00 PM IST.
// kind: 'reveal' = problem statement drop, 'eval' = evaluation round,
// 'final' = results; everything else is a regular checkpoint.
const MILESTONES = [
  {
    time: '9:00 AM',
    label: 'Suit Check-In',
    status: 'START',
    title: 'REGISTRATION',
    desc: 'Teams check in, get verified and settle in for the day ahead.',
    icon: Flag,
  },
  {
    time: '9:30 AM',
    label: 'Mission Briefing',
    status: 'UNLOCKED',
    title: 'PROBLEM STATEMENTS REVEALED',
    desc: 'Problem statements go live. Teams study the challenges and pick their mission.',
    icon: Radar,
    kind: 'reveal',
  },
  {
    time: '10:00 AM',
    label: 'Arc Reactor Online',
    status: 'IN PROGRESS',
    title: 'BUILD STARTS',
    desc: 'The build sprint begins. Ideate, architect and start shipping your solution.',
    icon: Wrench,
  },
  {
    time: '1:00 PM',
    label: 'Evaluation — Round 01',
    status: 'CHECKPOINT',
    title: 'EVALUATION ROUND 1 & MENTORING',
    desc: 'First evaluation of your progress, with mentors on hand to guide your next steps.',
    icon: ScanSearch,
    kind: 'eval',
  },
  {
    time: '3:30 PM',
    label: 'Evaluation — Round 02',
    status: 'FINAL CHECK',
    title: 'EVALUATION ROUND 2 (FINAL)',
    desc: 'The final round of evaluation. Present your build to the judges.',
    icon: ShieldCheck,
    kind: 'eval',
  },
  {
    time: '4:00 PM',
    label: 'Mission Complete',
    status: 'COMPLETE',
    title: 'RESULTS ANNOUNCEMENT',
    desc: 'Winners are announced and the raid comes to a close.',
    icon: Trophy,
    kind: 'final',
  },
]

function MilestoneRow({ item, index }) {
  const Icon = item.icon
  // Even rows sit right of the conduit, odd rows left (the first milestone starts on the right)
  const onRight = index % 2 === 0
  const rowRef = useRef(null)
  const inView = useInView(rowRef, { amount: 0.5 })
  const revealed = useInView(rowRef, { once: true, amount: 0.6 })

  // "System unlock" for the problem statement reveal: LOCKED -> UNLOCKED
  const [unlocked, setUnlocked] = useState(item.kind !== 'reveal')
  useEffect(() => {
    if (item.kind !== 'reveal' || !revealed) return
    const id = setTimeout(() => setUnlocked(true), 550)
    return () => clearTimeout(id)
  }, [item.kind, revealed])

  const kindClass = item.kind ? `timeline-card--${item.kind}` : ''

  return (
    <motion.div
      ref={rowRef}
      className={`timeline-row relative flex items-center gap-8 flex-col md:flex-row ${onRight ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: onRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Milestone card */}
      <div className="w-full md:w-1/2 pl-12 md:pl-0">
        <div
          className={`timeline-card relative bg-[#090d12] border-2 border-[#00ADEF]/40 p-5 lg:p-6 group hover:border-[#FF0000] transition-colors ${kindClass} ${
            item.kind === 'reveal' && unlocked ? 'is-unlocked' : ''
          }`}
        >
          {/* Corner HUD markers */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ADEF]" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ADEF]" />
          {item.kind === 'eval' && <span className="timeline-card__scan" aria-hidden="true" />}
          {item.kind === 'reveal' && <span className="timeline-card__unlock-sweep" aria-hidden="true" />}

          <div className="flex justify-between items-center gap-3 mb-1.5">
            <span className="font-mono text-xs font-bold text-[#FF0000] tracking-widest">{item.time}</span>
            <span
              className={`timeline-status font-mono text-[9px] px-2 py-0.5 border ${
                item.kind === 'reveal' && !unlocked ? 'is-locked' : ''
              }`}
            >
              {item.kind === 'reveal' && !unlocked ? 'LOCKED' : item.status}
            </span>
          </div>

          <p className="timeline-card__label font-mono text-[10px] uppercase tracking-[0.25em] mb-2">
            {'// '}{item.label}
          </p>

          <h3 className="font-sans font-black text-lg lg:text-xl text-white uppercase tracking-tight mb-2">
            {item.title}
          </h3>

          <p className="font-mono text-xs text-[#8b9aa6] leading-relaxed">{item.desc}</p>
        </div>
      </div>

      {/* Central node */}
      <div
        className={`timeline-node absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050708] border-2 border-[#00ADEF] flex items-center justify-center z-10 shadow-[0_0_15px_#00ADEF] ${
          inView ? 'is-active' : ''
        } ${item.kind ? `timeline-node--${item.kind}` : ''}`}
      >
        <Icon className="w-4 h-4 text-[#00ADEF]" />
      </div>

      {/* Spacer for the 2-column layout */}
      <div className="hidden md:block w-1/2" />
    </motion.div>
  )
}

export function Timeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  // The conduit lights up progressively as the schedule scrolls past
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 75%', 'end 55%'] })
  const glowScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Blueprint suit fades in and settles as the section enters, fades as it leaves
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const suitOpacity = useTransform(sectionProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0])
  const suitScale = useTransform(sectionProgress, [0, 0.3], [1.08, 1])

  return (
    <section id="timeline" ref={sectionRef} className="stark-shell stark-section relative">
      {/* Iron Man blueprint backdrop: stays in view behind the schedule */}
      <div className="timeline-backdrop" aria-hidden="true">
        <div className="timeline-backdrop__sticky">
          <motion.div className="timeline-backdrop__stage" style={{ opacity: suitOpacity, scale: suitScale }}>
            {/* Frame sizes the suit to cover the whole viewport; drift slowly pans/zooms it */}
            <div className="timeline-backdrop__suit">
              <div className="timeline-backdrop__drift">
                <img src="/timeline-suit.jpg" alt="" loading="lazy" decoding="async" />
                <span className="timeline-backdrop__reactor" />
                <span className="timeline-backdrop__eye timeline-backdrop__eye--left" />
                <span className="timeline-backdrop__eye timeline-backdrop__eye--right" />
                <span className="timeline-backdrop__scan" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-heading relative z-10">
        <div>
          <p className="section-label">// SCHEDULE & EVENT TIMELINE</p>
          <h2>
            8-HOUR RAID<br />
            <span>TIMELINE.</span>
          </h2>
        </div>
        <p className="section-note">
          Tick Tock Hack!<br />
          4 October · 9:00 AM – 4:00 PM IST · Two evaluation rounds.
        </p>
      </div>

      <div ref={trackRef} className="relative z-10 mt-12 max-w-5xl mx-auto">
        {/* Central power conduit: dim base + progressively illuminated overlay */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[#00ADEF]/25 via-[#FF0000]/25 to-[#00ADEF]/25" />
        <motion.div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 origin-top bg-gradient-to-b from-[#00ADEF] via-[#FF0000] to-[#00ADEF] shadow-[0_0_15px_rgba(0,173,239,0.7)]"
          style={{ scaleY: glowScale }}
        />

        <div className="timeline-list">
          {MILESTONES.map((item, idx) => (
            <MilestoneRow key={item.time} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
