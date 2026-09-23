'use client'

import { useState } from 'react'
import { ArrowUpRight, Bot, Cpu, Shield, Zap } from 'lucide-react'

function TrackCard({ name, image, category, detail, Icon }: { name: string; image: string; category: string; detail: string; Icon: typeof Bot }) {
  return (
    <article className="track-card relative overflow-hidden group border border-[#00ADEF]/25 hover:border-[#00ADEF] bg-[#050708] min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] flex items-center justify-center p-6 sm:p-8 cursor-pointer select-none transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,173,239,0.3)]">
      {/* Suit Artwork Image Background */}
      {image && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top opacity-55 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 ease-out filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/65 to-[#050708]/30" />
        </div>
      )}

      {/* Subtle Sci-Fi Cyber Grid Background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(0,173,239,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,173,239,0.035)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Cybernetic Radial Glow Overlay on Hover */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,173,239,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner HUD Brackets */}
      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />

      {/* Default State: Only centered main track name */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:blur-[2px]">
        <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-white tracking-tight uppercase group-hover:text-[#00ADEF] transition-colors duration-300 drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
          {name}
        </h3>
      </div>

      {/* Hover State: Slide up and fade in category & description */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-8 text-center opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none group-hover:pointer-events-auto bg-[#050708]/95 backdrop-blur-md">
        {Icon && (
          <div className="mb-3 text-[#00ADEF] p-2 rounded-lg bg-[#00ADEF]/10 border border-[#00ADEF]/30 shadow-[0_0_15px_rgba(0,173,239,0.25)]">
            <Icon className="w-6 h-6" />
          </div>
        )}

        {/* Secondary Track Category */}
        <div className="mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#00ADEF]/40 bg-[#00ADEF]/10 text-[#00ADEF] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(0,173,239,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ADEF] animate-pulse" />
          {category}
        </div>

        {/* Description Text */}
        <p className="font-mono text-xs sm:text-sm text-[#edf4f7] leading-relaxed max-w-[280px]">
          {detail}
        </p>

        {/* Interactive Cue */}
        <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#00ADEF] uppercase font-semibold">
          <span>DEPLOY ARMOR</span>
          <span className="text-sm font-sans transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
        </div>
      </div>
    </article>
  )
}

const tracks = [
  ['WAR MACHINE', '/tracks/suit-1.jpg', 'Artificial Intelligence & ML', 'Heavy Weaponized Systems, Autonomous Tactical Defense & Cyber-Armor Warfare.', Bot],
  ['MARK II', '/tracks/suit-2.jpg', 'Web3 & Decentralized Systems', 'Raw Titanium Chassis, Sub-Orbital Aerodynamics & Decentralized Flight Mesh.', Shield],
  ['MARK L', '/tracks/suit-3.jpg', 'Unrestricted Open Innovation', 'Bleeding Edge Nanotech, Reconfigurable Morphing Systems & Extreme Prototypes.', Cpu],
  ['MARK I', '/tracks/suit-4.jpg', 'Blockchain & Ledger Tech', 'Original Arc Reactor Generation, Resilient Hardware & Immutable Kinetic Design.', Zap],
  ['MARK XLII', '/tracks/suit-5.jpg', 'Machine Learning Systems', 'Autonomous Prehensile Telemetry, Neural Micro-Thrusters & Predictive Assembly.', Cpu],
]

const phases = [
  ['PHASE 01', 'SYSTEM DIAGNOSTICS', 'Recon'],
  ['PHASE 02', 'ASSEMBLE ARMOR', 'Prototyping'],
  ['PHASE 03', 'GLOBAL DEPLOYMENT', 'The Pitch'],
]

export default function Page() {
  return <main className="stark-page"><div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] scanlines" aria-hidden="true" /><header className="stark-shell stark-header"><a href="#top" className="logo-lockup"><img src="/vibathon-logo.png" alt="VIBATHON" /><span>VIBATHON // ONLINE</span></a><div className="hidden font-mono text-[10px] tracking-[0.28em] text-[#8b9aa6] md:block">WAR MACHINE / MARK II / MARK L / MARK I / MARK XLII</div><a href="#tracks" className="stark-link">[ ACCESS FILES ]</a></header>
    <section id="top" className="stark-shell stark-hero relative overflow-hidden min-h-[660px] md:min-h-[720px] flex flex-col justify-center"><div className="absolute inset-y-0 right-0 w-full lg:w-1/2 z-0 flex items-center justify-center lg:justify-end pointer-events-none overflow-hidden pr-0 lg:pr-6"><img src="/hero-hologram.png" alt="Iron Man Cyan Hologram (Transparent)" className="h-[88%] md:h-[95%] w-auto max-w-full object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_40px_rgba(0,173,239,0.5)] mix-blend-screen opacity-100" /></div><div className="relative z-10 flex flex-col items-start w-full max-w-2xl py-12 md:py-16"><div className="hero-kicker" aria-label="TRANSMISSION 001 // PROTOCOL OVERRIDE">TRANSMISSION 001 <span>//</span> PROTOCOL OVERRIDE</div><h1 className="glitch stark-title"><span className="glitch-word">OVERRIDE</span><br /><em>THE PROTOCOL.</em></h1><p className="hero-manifesto">Think It. Prompt It. Build It.</p><a href="#tracks" className="stark-cta mt-8">INITIALIZE UPLINK <ArrowUpRight data-icon="inline-end" /></a><div className="hero-readout mt-8"><span>ARC REACTOR STATUS</span><strong>100%</strong><i /></div></div></section>
    <section className="stark-shell stats-grid" aria-label="Event statistics"><div><strong>14,000,605</strong><span>SIMULATIONS</span></div><div><strong>5</strong><span>CORE A.I. TRACKS</span></div><div><strong>24</strong><span>HOURS TO COMPILE</span></div><div><strong>∞</strong><span>STARK GRANTS POOL</span></div></section>
    <section id="tracks" className="stark-shell stark-section"><div className="section-heading"><div><p className="section-label">// BOUNTIES / R&D OPERATIONS</p><h2>CHOOSE YOUR<br /><span>INTELLIGENCE.</span></h2></div><p className="section-note">Five specialized tracks. One mission.<br />Build what comes next.</p></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 xl:gap-6">{tracks.map(([name, image, category, detail, Icon]) => <TrackCard key={name as string} name={name as string} image={image as string} category={category as string} detail={detail as string} Icon={Icon} />)}</div></section>
    <section className="stark-shell stark-section build-section"><div className="section-heading"><div><p className="section-label">// THE BUILD PLAN</p><h2>COMPILE.<br /><span>DEPLOY.</span></h2></div><p className="section-note">The armor comes together<br />one phase at a time.</p></div><div className="timeline">{phases.map(([phase, title, detail], index) => <div className="phase" key={phase}><span className="phase-number">0{index + 1}</span><div><p>{phase as string}</p><h3>{title as string}</h3><span>{detail as string}</span></div></div>)}</div></section>
    <footer className="stark-shell stark-footer"><span>VIBATHON © 2026 / STARK R&D NETWORK</span><a href="#top">RETURN TO SYSTEM <ArrowUpRight data-icon="inline-end" /></a></footer>
  </main>
}
