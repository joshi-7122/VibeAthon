import { motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import { ArmorTrackCard } from './ArmorTrackCard'

export function Tracks() {
  return (
    <section id="tracks" className="stark-shell stark-section carbon-fiber-bg">
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
    </section>
  )
}
