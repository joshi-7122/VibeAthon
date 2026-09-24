import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { ArrowUp, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { HACKATHON_DATA } from '../data/hackathon'
import { scrollToSection, useActiveSection } from '../hooks/useActiveSection'
import { LogoFlyIn } from './LogoFlyIn'
import './Footer.css'

// Every section except the footer itself, straight from the site data
const QUICK_LINKS = HACKATHON_DATA.sections.filter((section) => section.id !== 'contact')
const SECTION_IDS = HACKATHON_DATA.sections.map((section) => section.id)

const LAUNCH = new Date(HACKATHON_DATA.launchDate).getTime()
const END = LAUNCH + HACKATHON_DATA.durationHours * 3600 * 1000
const LAUNCH_LABEL = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
}).format(LAUNCH) + ' IST'

function formatSpan(ms) {
  const mins = Math.max(0, Math.floor(ms / 60000))
  const d = Math.floor(mins / 1440)
  const h = Math.floor((mins % 1440) / 60)
  const m = mins % 60
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// Live mission status, driven by the event dates in the site data
function MissionStatus() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(id)
  }, [])

  const phase = now < LAUNCH ? 'countdown' : now < END ? 'live' : 'complete'
  const value =
    phase === 'countdown' ? `T-minus ${formatSpan(LAUNCH - now)}`
      : phase === 'live' ? `Live · ${formatSpan(END - now)} left`
        : 'Mission complete'
  const detail = phase === 'complete' ? 'See you at the next build' : LAUNCH_LABEL

  return (
    <a
      href="#about"
      className={`mission-status mission-status--${phase}`}
      onClick={(e) => scrollToSection('about', e)}
      aria-label={`Mission status: ${value}. ${detail}`}
    >
      <span className="mission-status__reactor" aria-hidden="true">
        <span className="mission-status__ring" />
        <span className="mission-status__core" />
      </span>
      <span className="mission-status__text">
        <span className="mission-status__label">// Mission Status</span>
        <span className="mission-status__value">{value}</span>
        <span className="mission-status__detail">{detail}</span>
      </span>
    </a>
  )
}

export function Footer() {
  const { contact } = HACKATHON_DATA
  // Start the looping logo fly-out the first time the footer comes into view
  const logoRef = useRef(null)
  const logoInView = useInView(logoRef, { once: true, amount: 0.6 })
  const activeSection = useActiveSection(SECTION_IDS)
  const mapQuery = encodeURIComponent(contact.mapQuery)
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, '')}`

  return (
    <footer id="contact" className="stark-shell site-footer">
      <span className="site-footer__energy" aria-hidden="true" />

      <div className="site-footer__grid">
        {/* Brand */}
        <div className="site-footer__col site-footer__brand">
          <a
            ref={logoRef}
            href="#top"
            onClick={(e) => scrollToSection('top', e)}
            className="site-footer__logo logo-fly"
            aria-label={`${HACKATHON_DATA.name} home`}
          >
            <LogoFlyIn play={logoInView} loop />
          </a>
          <p className="site-footer__tagline">{HACKATHON_DATA.tagline}</p>
          <p className="site-footer__organizers">
            Organized by <span>{contact.organizers}</span>
          </p>
          <MissionStatus />
        </div>

        {/* Quick links */}
        <nav className="site-footer__col" aria-label="Footer">
          <h3 className="site-footer__heading">// Quick Links</h3>
          <ul className="site-footer__links">
            {QUICK_LINKS.map((section) => {
              const isActive = activeSection === section.id
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(e) => scrollToSection(section.id, e)}
                  >
                    <span className="site-footer__link-mark" aria-hidden="true" />
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Contact */}
        <div className="site-footer__col">
          <h3 className="site-footer__heading">// Contact Us</h3>
          <dl className="site-footer__contact">
            <div>
              <dt><Mail className="w-3.5 h-3.5" /> Email</dt>
              <dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            </div>
            <div>
              <dt><Phone className="w-3.5 h-3.5" /> Phone</dt>
              <dd><a href={phoneHref}>{contact.phone}</a></dd>
            </div>
            <div>
              <dt><MapPin className="w-3.5 h-3.5" /> Address</dt>
              <dd>{contact.address}</dd>
            </div>
          </dl>
        </div>

        {/* Map */}
        <div className="site-footer__col">
          <h3 className="site-footer__heading">// Find Us</h3>
          <div className="site-footer__map">
            <span className="site-footer__bracket site-footer__bracket--tl" aria-hidden="true" />
            <span className="site-footer__bracket site-footer__bracket--tr" aria-hidden="true" />
            <span className="site-footer__bracket site-footer__bracket--bl" aria-hidden="true" />
            <span className="site-footer__bracket site-footer__bracket--br" aria-hidden="true" />
            <iframe
              title={`Map: ${contact.mapQuery}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            className="site-footer__map-link"
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Maps <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <p>
          © 2026 {HACKATHON_DATA.name} • Organized by {contact.organizers}
          <span className="site-footer__rights">All rights reserved.</span>
        </p>
        <a href="#top" className="site-footer__top" onClick={(e) => scrollToSection('top', e)}>
          Back to top <ArrowUp className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  )
}
