import { useState } from 'react'
import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import './CrewSection.css'

// Light tubes of the armour display cases, as % across the backdrop image
const HALL_TUBES = [3.9, 18.8, 31.9, 58.4, 68.4, 81.3, 95.8]

// Hall of Armor backdrop: slow drift, flickering case lights, a live
// platform under Tony, an armour scan and rising sparks
function MarksBackdrop() {
  return (
    <div className="marks-backdrop" aria-hidden="true">
      <div className="marks-backdrop__stage">
        <div className="marks-backdrop__drift">
          <img src="/marks-hall.webp" alt="" loading="lazy" decoding="async" />
          {HALL_TUBES.map((x, i) => (
            <span
              key={x}
              className="marks-backdrop__tube"
              style={{ left: `${x}%`, animationDelay: `${(i * 1.7) % 6}s` }}
            />
          ))}
          <span className="marks-backdrop__platform" />
          <span className="marks-backdrop__ring" />
          <span className="marks-backdrop__scan" />
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className="marks-backdrop__spark"
              style={{
                left: `${38 + ((i * 37) % 26)}%`,
                animationDelay: `${(i * 0.9) % 7}s`,
                animationDuration: `${6 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      </div>
      <span className="marks-backdrop__shade" />
    </div>
  )
}

// '#FFC83D' -> '255, 200, 61' for use in rgba(var(--glow-rgb), a)
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function CrewCard({ member, index, flipped, onToggle, decorative }) {
  const unit = String(index + 1).padStart(2, '0')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <motion.article
      className={`crew-card ${flipped ? 'is-flipped' : ''}`}
      style={{ '--accent': member.color, '--glow-rgb': hexToRgb(member.glow || member.color) }}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.08, ease: 'easeOut' }}
      onClick={onToggle}
      onKeyDown={decorative ? undefined : handleKeyDown}
      role={decorative ? undefined : 'button'}
      tabIndex={decorative ? -1 : 0}
      aria-pressed={decorative ? undefined : flipped}
      aria-label={decorative ? undefined : `${member.name}, ${member.suit}. ${flipped ? 'Show armor card' : 'Show photo'}`}
    >
      <div className="crew-card__inner">
        {/* Front: armor card */}
        <div className="crew-card__face crew-card__face--front">
          <span className="crew-card__edge" aria-hidden="true" />
          <div className="crew-card__media">
            <img src={member.image} alt="" loading="lazy" decoding="async" draggable="false" />
            <span className="crew-card__scan" aria-hidden="true" />
            <span className="crew-card__sweep" aria-hidden="true" />
            <span className="crew-card__bracket crew-card__bracket--tl" aria-hidden="true" />
            <span className="crew-card__bracket crew-card__bracket--br" aria-hidden="true" />
          </div>
          <div className="crew-card__info">
            <span className="crew-card__unit">UNIT {unit}</span>
            <p className="crew-card__suit">{member.suit}</p>
            <h3 className={`crew-card__name ${member.title ? 'crew-card__name--title' : ''}`}>
              {member.title || member.name}
            </h3>
            <p className="crew-card__role">
              <span className="crew-card__dot" aria-hidden="true" />
              Tap to reveal pilot
            </p>
          </div>
        </div>

        {/* Back: the person behind the armor */}
        <div className="crew-card__face crew-card__face--back">
          <span className="crew-card__edge" aria-hidden="true" />
          <div className="crew-card__photo">
            {member.photo ? (
              <img
                src={member.photo}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className={member.photoCutout ? 'crew-card__cutout' : undefined}
              />
            ) : (
              <div className="crew-card__placeholder" aria-hidden="true">
                <span className="crew-card__reactor">
                  <span>{initials(member.name)}</span>
                </span>
                <span className="crew-card__placeholder-text">Pilot photo incoming</span>
              </div>
            )}
            <span className="crew-card__bracket crew-card__bracket--tl" aria-hidden="true" />
            <span className="crew-card__bracket crew-card__bracket--br" aria-hidden="true" />
          </div>
          <div className="crew-card__info">
            <span className="crew-card__unit">PILOT {unit}</span>
            <p className="crew-card__suit">{member.suit}</p>
            <h3 className="crew-card__name">{member.name}</h3>
            <p className="crew-card__role">
              <span className="crew-card__dot" aria-hidden="true" />
              {member.role || 'Organizer'}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function CrewSection() {
  const crew = HACKATHON_DATA.crew
  // Key of the flipped card ("copy-index"); the belt pauses while one is open
  const [flippedKey, setFlippedKey] = useState(null)

  const toggle = (key) => setFlippedKey((current) => (current === key ? null : key))

  return (
    <section id="marks" className="stark-shell stark-section relative overflow-hidden">
      <MarksBackdrop />

      {/* Centered cinematic heading: red spaced label, heavy white line,
          red divider, brushed-silver second line with a red glow */}
      <motion.div
        className="marks-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="marks-heading__label">// Organizing Squad</p>
        <h2 className="marks-heading__title">
          <span className="marks-heading__line">OUR</span>
          <span className="marks-heading__divider" aria-hidden="true" />
          <span className="marks-heading__line marks-heading__line--steel">MARKS.</span>
        </h2>
        <p className="marks-heading__note">
          The armored squad behind VIBEATHON. Tap a card to meet the pilot inside.
        </p>
      </motion.div>

      {/* Endless conveyor: the list is rendered twice and slid by half its
          width, so the loop is seamless. The second copy is hidden from
          screen readers and keyboard focus. */}
      <div className={`crew-belt ${flippedKey ? 'is-paused' : ''}`}>
        <div className="crew-belt__track" style={{ '--crew-count': crew.length }}>
          {[0, 1].map((copy) =>
            crew.map((member, i) => {
              const key = `${copy}-${i}`
              return (
                <div key={key} className="crew-slide" aria-hidden={copy === 1 ? 'true' : undefined}>
                  <CrewCard
                    member={member}
                    index={i}
                    flipped={flippedKey === key}
                    onToggle={() => toggle(key)}
                    decorative={copy === 1}
                  />
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
