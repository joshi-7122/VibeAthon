import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { HACKATHON_DATA } from '../data/hackathon'
import './Header.css'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef(null)

  // Track active section on scroll for HUD indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home')
        return
      }

      const sectionIds = ['contact', 'timeline', 'tracks', 'about']
      const scrollPosition = window.scrollY + 250

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Logo Area */}
      <div className="flex-1 flex items-center">
        <a href="#top" className="transition-transform hover:scale-105">
          <img src="/vibathon-logo-new.png" alt={HACKATHON_DATA.name} className="h-12 md:h-16 w-auto object-contain" />
        </a>
      </div>

      {/* Desktop Navigation Items with Clean Glowing Cyan Underline */}
      <nav className="hidden md:flex flex-none items-center justify-center gap-6 lg:gap-10">
        {HACKATHON_DATA.navLinks.map((link) => {
          const sectionId = link.href.replace('#', '')
          const isActive =
            activeSection === sectionId ||
            (sectionId === 'top' && activeSection === 'home')

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

      {/* Access Files Button */}
      <div className="flex flex-1 items-center justify-end gap-4">
        <a href={HACKATHON_DATA.registrationUrl} className="stark-access-btn">
          <span className="btn-hud-corner btn-hud-tl" />
          <span className="btn-hud-corner btn-hud-tr" />
          <span className="btn-hud-corner btn-hud-bl" />
          <span className="btn-hud-corner btn-hud-br" />
          <span className="stark-access-btn-scan" aria-hidden="true" />
          <span>REGISTER</span>
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
                activeSection === sectionId ||
                (sectionId === 'top' && activeSection === 'home')

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
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
