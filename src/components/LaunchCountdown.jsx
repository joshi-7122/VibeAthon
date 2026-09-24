import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Timer } from 'lucide-react'
import { useStarkAudio } from '../hooks/useStarkAudio'
import { HACKATHON_DATA } from '../data/hackathon'
import './LaunchCountdown.css'

// Launch time carries a fixed IST offset, so the countdown targets the same
// instant for every visitor, whatever their time zone.
const LAUNCH = new Date(HACKATHON_DATA.launchDate)
const DURATION_HOURS = HACKATHON_DATA.durationHours
const END = new Date(LAUNCH.getTime() + DURATION_HOURS * 3600 * 1000)

const UNITS = [
  { key: 'days', label: 'Days', perUnit: 86400 },
  { key: 'hours', label: 'Hrs', perUnit: 3600 },
  { key: 'minutes', label: 'Min', perUnit: 60 },
  { key: 'seconds', label: 'Sec', perUnit: 1 },
]

function breakdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    total,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

const pad = (n) => String(n).padStart(2, '0')

// Launch time shown in India time for everyone
const LAUNCH_LABEL = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
}).format(LAUNCH) + ' IST'

// Arc reactor geometry
const PROGRESS_R = 57
const PROGRESS_LEN = 2 * Math.PI * PROGRESS_R
const COILS = Array.from({ length: 10 }, (_, i) => i * 36)

// One rolling two-digit block
function Digits({ value }) {
  return (
    <span className="countdown__digits">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="countdown__digit-value"
          initial={{ y: '-60%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '60%', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function LaunchCountdown() {
  const [now, setNow] = useState(() => Date.now())
  const [hovered, setHovered] = useState(null)
  const [pinged, setPinged] = useState(false)
  const { playCommandConfirm, speakJarvis } = useStarkAudio()

  // Tick on each whole second so the digits change together
  useEffect(() => {
    let timeout
    const tick = () => {
      setNow(Date.now())
      timeout = setTimeout(tick, 1000 - (Date.now() % 1000))
    }
    tick()
    return () => clearTimeout(timeout)
  }, [])

  const phase = now < LAUNCH.getTime() ? 'countdown' : now < END.getTime() ? 'live' : 'complete'
  const target = phase === 'countdown' ? LAUNCH : END
  const t = breakdown(target.getTime() - now)

  const status = {
    countdown: { label: 'Arming', tone: 'arming' },
    live: { label: 'Raid live', tone: 'live' },
    complete: { label: 'Mission complete', tone: 'done' },
  }[phase]

  // Outer ring fills once per minute
  const minuteProgress = phase === 'complete' ? 1 : (60 - t.seconds) / 60

  const announce = () => {
    playCommandConfirm()
    setPinged(true)
    setTimeout(() => setPinged(false), 900)
    if (phase === 'complete') {
      speakJarvis('The build raid is complete, sir. Excellent work.')
    } else {
      const parts = [
        t.days && `${t.days} ${t.days === 1 ? 'day' : 'days'}`,
        t.hours && `${t.hours} ${t.hours === 1 ? 'hour' : 'hours'}`,
        `${t.minutes} ${t.minutes === 1 ? 'minute' : 'minutes'}`,
      ].filter(Boolean)
      speakJarvis(
        phase === 'live'
          ? `The raid is live, sir. ${parts.join(', ')} remaining.`
          : `T-minus ${parts.join(', ')} until launch, sir.`
      )
    }
  }

  return (
    <div className="countdown">
      {/* Header */}
      <div className="countdown__header">
        <div className="countdown__title">
          <Timer className="w-4 h-4" />
          <span>LAUNCH_SEQUENCE // {phase === 'countdown' ? 'T-MINUS' : phase === 'live' ? 'TIME LEFT' : 'END'}</span>
        </div>
        <span className={`countdown__status countdown__status--${status.tone}`}>
          <span className="countdown__status-dot" aria-hidden="true" />
          {status.label}
        </span>
      </div>

      {/* Arc reactor: click for a JARVIS time check */}
      <button
        type="button"
        className={`countdown__reactor ${pinged ? 'is-pinged' : ''}`}
        onClick={announce}
        aria-label="Ask JARVIS for the time remaining"
      >
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <radialGradient id="reactor-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#d6fbff" />
              <stop offset="70%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00ADEF" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="reactor-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b8c2c9" />
              <stop offset="45%" stopColor="#5b646b" />
              <stop offset="100%" stopColor="#2a3035" />
            </linearGradient>
            <linearGradient id="reactor-copper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0a868" />
              <stop offset="100%" stopColor="#8a4b1c" />
            </linearGradient>
          </defs>

          {/* Minute progress ring */}
          <circle cx="60" cy="60" r={PROGRESS_R} className="countdown__reactor-track" />
          <circle
            cx="60"
            cy="60"
            r={PROGRESS_R}
            className="countdown__reactor-progress"
            strokeDasharray={PROGRESS_LEN}
            strokeDashoffset={PROGRESS_LEN * (1 - minuteProgress)}
          />

          {/* Casing */}
          <circle cx="60" cy="60" r="50" fill="url(#reactor-metal)" />
          <circle cx="60" cy="60" r="45" className="countdown__reactor-well" />

          {/* Glow that shows between the coils */}
          <circle cx="60" cy="60" r="37" className="countdown__reactor-glow" />

          {/* Copper coils */}
          <g className="countdown__reactor-coils">
            {COILS.map((deg) => (
              <g key={deg} transform={`rotate(${deg} 60 60)`}>
                <rect x="54.5" y="21" width="11" height="15" rx="1.5" fill="url(#reactor-copper)" className="countdown__reactor-coil" />
                <line x1="55.5" y1="25" x2="64.5" y2="25" className="countdown__reactor-wire" />
                <line x1="55.5" y1="28.5" x2="64.5" y2="28.5" className="countdown__reactor-wire" />
                <line x1="55.5" y1="32" x2="64.5" y2="32" className="countdown__reactor-wire" />
              </g>
            ))}
          </g>

          {/* Inner housing + spinning energy ring */}
          <circle cx="60" cy="60" r="22" className="countdown__reactor-inner" />
          <circle cx="60" cy="60" r="19" className="countdown__reactor-spin" />

          {/* Core */}
          <circle cx="60" cy="60" r="15" fill="url(#reactor-core)" className="countdown__reactor-core" />
          <circle cx="60" cy="60" r="5" className="countdown__reactor-heart" />
        </svg>
        <span className="countdown__reactor-hint">Tap for status</span>
      </button>

      {/* Digits */}
      <div className="countdown__grid" role="timer" aria-live="off" aria-label={`${t.days} days ${t.hours} hours ${t.minutes} minutes ${t.seconds} seconds`}>
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="countdown__cell-wrap">
            <div
              className={`countdown__cell ${hovered === unit.key ? 'is-active' : ''}`}
              onPointerEnter={() => setHovered(unit.key)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(unit.key)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
            >
              <Digits value={t[unit.key]} />
              <span className="countdown__label">{unit.label}</span>
              <span className="countdown__total" aria-hidden={hovered !== unit.key}>
                = {Math.floor(t.total / unit.perUnit).toLocaleString('en-IN')} {unit.label.toLowerCase()} total
              </span>
            </div>
            {i < UNITS.length - 1 && <span className="countdown__colon" aria-hidden="true">:</span>}
          </div>
        ))}
      </div>

      {/* Launch time */}
      <div className="countdown__meta">
        <span className="countdown__when-label">{phase === 'countdown' ? 'Launch window' : 'Launched'}</span>
        <span className="countdown__when-value">{LAUNCH_LABEL}</span>
      </div>
    </div>
  )
}
