import React from 'react'

export function MarqueeTicker() {
  const tickerItems = [
    "STARK R&D TRANSMISSION // VIBATHON 1.0 IS LIVE",
    "8 HOURS TO COMPILE",
    "ARC REACTOR STATUS: 100% ONLINE",
    "OVERRIDE THE PROTOCOL",
    "5 CORE INTEL TRACKS",
    "INITIALIZE UPLINK NOW"
  ]

  return (
    <div className="relative w-full z-30 overflow-hidden bg-gradient-to-r from-[#050708] via-[#002438] to-[#050708] border-y border-[#00ADEF]/40 shadow-[0_0_20px_rgba(0,173,239,0.25)] py-2">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            {tickerItems.map((item, idx) => (
              <span
                key={`${i}-${idx}`}
                className="font-mono text-[11px] md:text-xs mx-8 text-[#55d8ff] tracking-[0.22em] uppercase font-bold flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-[#FF0000] rounded-full animate-ping" />
                {item}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
