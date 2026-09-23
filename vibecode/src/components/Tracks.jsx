import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { ArmorTrackCard } from './ArmorTrackCard'

export function Tracks() {
  return (
    <section id="tracks" className="stark-shell stark-section relative overflow-hidden">
      {/* Scroll-Revealed Stark Lab Backdrop */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
        whileInView={{ opacity: 0.55, scale: 1, filter: 'blur(0px)' }}
        viewport={{ amount: 0.2, once: false }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/stark-lab-backdrop.jpg"
          alt="Stark Armor Lab Backdrop"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-90"
        />
        {/* Vignette and Dark Gradient Overlay for UI readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050708] via-[#050708]/80 to-[#050708]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,7,8,0.85)_100%)]" />
      </motion.div>

      <div className="relative z-10">
        <div className="section-heading">
          <div>
            <p className="section-label">// BOUNTIES / R&amp;D OPERATIONS</p>
            <h2>
              CHOOSE YOUR<br />
              <span>INTELLIGENCE.</span>
            </h2>
          </div>
          <p className="section-note">
            Five specialized tracks. One mission.<br />
            Build what comes next.
          </p>
        </div>

        <motion.div
          className="armory-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, staggerChildren: 0.1 }}
        >
          {HACKATHON_DATA.tracks.map((track, i) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
            >
              <ArmorTrackCard track={track} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
