import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { HACKATHON_DATA } from '../data/hackathon'
import { LogoFlyIn } from './LogoFlyIn'
import { useActiveSection } from '../hooks/useActiveSection'
import './Header.css'

export function Header({ introDone = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)

  // Highlight the section in view (same section list as the footer links)
  const activeSection = useActiveSection(HACKATHON_DATA.sections.map((section) => section.id))

  // Interactive Cursor Radial Light Field
  const handleMouseMove = (e) => {
    if (!headerRef.current) return
    const rect = headerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    headerRef.current.style.setProperty('--mouse-x', `${x}px`)
    headerRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      className="stark-hud-header relative z-40"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Logo: reactor spins up, then the wordmark flies out of it toward the viewer */}
      <a href="#top" className="hud-logo logo-fly" aria-label={`${HACKATHON_DATA.name} home`}>
        <LogoFlyIn play={introDone} />
      </a>

      {/* Desktop Navigation Items with Clean Glowing Cyan Underline */}
      <nav className="hidden md:flex items-center gap-0 xl:gap-3">
        {HACKATHON_DATA.navLinks.map((link) => {
          const sectionId = link.href.replace('#', '')
          const isActive = activeSection === sectionId

          return (
            <a
              key={link.label}
              href={link.href}
              className={`hud-nav-item ${isActive ? 'active-item' : ''}`}
            >
              <span>{link.label}</span>
              {/* Repulsor thruster flare, ignites on hover */}
              <span className="hud-thruster" aria-hidden="true">
                <span className="hud-thruster__nozzle" />
                <span className="hud-thruster__flame" />
              </span>
            </a>
          )
        })}
      </nav>

      {/* Register Button: armor plate with a live arc reactor */}
      <div className="flex items-center gap-4">
        <a
          href={HACKATHON_DATA.registrationUrl}
          target={HACKATHON_DATA.registrationUrl?.startsWith('http') ? '_blank' : undefined}
          rel={HACKATHON_DATA.registrationUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="suit-register-btn"
        >
          <span className="suit-register-btn__plate">
            <span className="suit-register-btn__sweep" aria-hidden="true" />
            <span className="suit-register-btn__reactor" aria-hidden="true">
              <span className="suit-register-btn__core" />
            </span>
            <span className="suit-register-btn__label">Register</span>
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#00E5FF] p-1.5 border border-[#00E5FF]/40 bg-[#090d12] hover:bg-[#00E5FF]/10 transition-colors rounded-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Bottom Horizontal Energy Line */}
      <div className="hud-energy-bottom-bar" aria-hidden="true" />

      {/* Mobile HUD Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[#03070a]/95 border-b border-[#00E5FF]/30 backdrop-blur-md md:hidden px-6 py-4 flex flex-col gap-3 font-mono text-xs tracking-widest shadow-2xl z-50"
          >
            {HACKATHON_DATA.navLinks.map((link, idx) => {
              const sectionId = link.href.replace('#', '')
              const isActive =
                activeSection === sectionId

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 border-b border-white/5 transition-colors uppercase font-bold flex items-center justify-between ${
                    isActive ? 'text-[#00E5FF]' : 'text-[#8b9aa6] hover:text-[#00E5FF]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-[#00E5FF]/60">// 0{idx + 1}</span>
                </a>
              )
            })}
            <a
              href={HACKATHON_DATA.registrationUrl}
              target={HACKATHON_DATA.registrationUrl?.startsWith('http') ? '_blank' : undefined}
              rel={HACKATHON_DATA.registrationUrl?.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 py-3 px-4 bg-[#FF0000]/15 border border-[#FF0000]/60 hover:bg-[#FF0000]/30 text-[#FF5A5A] hover:text-white transition-colors uppercase font-bold text-center flex items-center justify-center gap-2 rounded-sm tracking-wider"
            >
              <span>REGISTER ON UNSTOP</span>
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
