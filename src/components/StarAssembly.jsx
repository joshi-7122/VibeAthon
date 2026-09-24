import { useState } from 'react'
import { motion } from 'framer-motion'

// TEMPORARY: Currently using idCard as photo until actual photos are uploaded
const crewMembers = [
  {
    id: '002',
    name: 'ANSH VASHISTH',
    role: 'MARK-XLI',
    idCard: '/ansh-id.jpg',
    photo: '/ansh-id.jpg'
  },
  {
    id: '003',
    name: 'MOHAMMAD RAHIL',
    role: 'MARK-XVII',
    idCard: '/mohammad-id.jpg',
    photo: '/mohammad-id.jpg'
  },
  {
    id: '004',
    name: 'TARUN KHUSWAHA',
    role: 'MARK-XXX',
    idCard: '/tarun-id.jpg',
    photo: '/tarun-id.jpg'
  },
  {
    id: '005',
    name: 'ATHARAV SINGH',
    role: 'MARK-XLII',
    idCard: '/atharav-id.jpg',
    photo: '/atharav-id.jpg'
  },
  {
    id: '009',
    name: 'KRITIKA JHA',
    role: 'MARK-XLIX',
    idCard: '/kritika-id.jpg',
    photo: '/kritika-id.jpg'
  },
  {
    id: '006',
    name: 'ARNAV MAITREY',
    role: 'MARK-XXVI',
    idCard: '/arnav-id.jpg',
    photo: '/arnav-id.jpg'
  },
  {
    id: '007',
    name: 'PRIYANSHI CHAUBEY',
    role: 'IronHeart MARK-2',
    idCard: '/priyanshi-id.jpg',
    photo: '/priyanshi-id.jpg'
  },
  {
    id: '008',
    name: 'ARYAN JOSHI',
    role: 'MARK-XXVII',
    idCard: '/aryan-id.jpg',
    photo: '/aryan-id.jpg'
  },
  {
    id: '010',
    name: 'ADITI RAJ SHARMA',
    role: 'IronHeart V8',
    idCard: '/aditi-id.jpg',
    photo: '/aditi-id.jpg'
  },
  {
    id: '011',
    name: 'MEDHAVI',
    role: 'IronHeart MIT',
    idCard: '/medhavi-id.jpg',
    photo: '/medhavi-id.jpg'
  },
  {
    id: '012',
    name: 'ANIRUDH KAUSHIK',
    role: 'HULKBUSTER',
    idCard: '/anirudh-id.jpg',
    photo: '/anirudh-id.jpg'
  }
]

export function StarAssembly() {
  return (
    <section id="crew" className="stark-shell stark-section relative overflow-hidden bg-[#050708] border-t border-[#FF0000]/20">
      {/* Background HUD & Particles (Red Accent) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.04)_0%,rgba(0,0,0,0)_70%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Scan line effect over the background */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF0000]/20 to-transparent shadow-[0_0_15px_#FF0000]"
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <motion.p
          className="font-mono text-[#FF0000] text-[10px] tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          // THE MINDS BEHIND THE MISSION
        </motion.p>
        
        <motion.h2
          className="font-sans font-black text-white text-5xl md:text-7xl uppercase tracking-tight relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          THE STAR<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#8b9aa6] drop-shadow-[0_0_15px_rgba(255,0,0,0.2)]">
            ASSEMBLY.
          </span>
          {/* Subtle red glitch line behind text */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#FF0000]/30 -z-10"
            animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.h2>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
        {crewMembers.map((member, idx) => (
          <CrewCard key={member.id} member={member} index={idx} />
        ))}
      </div>
    </section>
  )
}

function CrewCard({ member, index }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] aspect-[3/4] min-w-[240px] max-w-[300px] perspective-1000"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)} // Touch toggle for mobile
    >
      <motion.div
        className="w-full h-full relative cursor-pointer"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          y: isFlipped ? -10 : 0, // Slight lift on hover
          boxShadow: isFlipped ? '0 20px 40px rgba(255,0,0,0.2)' : '0 10px 20px rgba(0,0,0,0.4)'
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE (ID CARD) */}
        <div 
          className="absolute inset-0 bg-[#090d12] border border-[#FF0000]/20 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={member.idCard}
            alt={`${member.name} ID Card`}
            className="w-full h-full object-contain" // Preserves original card aspect ratio
          />
          {/* Subtle Idle Animation overlay */}
          <motion.div
            className="absolute inset-0 border-2 border-[#FF0000]/0 pointer-events-none rounded-lg"
            animate={{ borderColor: ['rgba(255,0,0,0)', 'rgba(255,0,0,0.3)', 'rgba(255,0,0,0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* BACK FACE (PHOTO) */}
        <div 
          className="absolute inset-0 bg-[#050708] border-2 border-[#FF0000]/60 rounded-lg overflow-hidden flex flex-col justify-end shadow-[0_0_30px_rgba(255,0,0,0.15)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Scan line effect on the back */}
          {isFlipped && (
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[#FF0000]/50 to-transparent shadow-[0_0_15px_#FF0000] z-20 pointer-events-none"
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
          )}

          <div className="absolute inset-0 z-0">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
            />
            {/* Cinematic dark overlay fading up */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/60 to-transparent" />
          </div>

          <div className="relative z-10 p-5 text-left border-t border-[#FF0000]/30 bg-[#050708]/80 backdrop-blur-md">
            <div className="font-mono text-[#FF0000] text-[9px] tracking-[0.2em] mb-1 uppercase">PERSONNEL // {member.id}</div>
            <h4 className="font-sans font-black text-white text-lg tracking-wider uppercase mb-1">
              {member.name}
            </h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-emerald-500 text-[10px] tracking-widest uppercase">
                STATUS // VERIFIED
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
