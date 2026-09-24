import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { ArrowUp, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'

function LinkedinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
import { HACKATHON_DATA } from '../data/hackathon'
import { scrollToSection, useActiveSection } from '../hooks/useActiveSection'
import { LogoFlyIn } from './LogoFlyIn'
import './Footer.css'

// Every section except the footer itself, straight from the site data
const QUICK_LINKS = HACKATHON_DATA.sections.filter((section) => section.id !== 'contact')
const SECTION_IDS = HACKATHON_DATA.sections.map((section) => section.id)

function SocialLinks() {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <a
        href="https://www.linkedin.com/company/ieee-gu-cis/posts/?feedView=all"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-4 py-2 border border-[#00ADEF]/30 bg-[#00ADEF]/10 hover:bg-[#00ADEF]/20 text-[#00ADEF] transition-all hover:border-[#00ADEF]/60"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
        }}
        aria-label="LinkedIn"
      >
        <LinkedinIcon className="w-5 h-5" />
        <span className="font-mono text-xs font-bold tracking-widest uppercase">LINKEDIN</span>
      </a>
      <a
        href="https://www.instagram.com/ieeecis.gusb?stkn=c3I3bWNxbHM1azVy"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-4 py-2 border border-[#00ADEF]/30 bg-[#00ADEF]/10 hover:bg-[#00ADEF]/20 text-[#00ADEF] transition-all hover:border-[#00ADEF]/60"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
        }}
        aria-label="Instagram"
      >
        <InstagramIcon className="w-5 h-5" />
        <span className="font-mono text-xs font-bold tracking-widest uppercase">INSTAGRAM</span>
      </a>
    </div>
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
          <SocialLinks />
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
