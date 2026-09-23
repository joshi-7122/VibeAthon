export function TrackCard({ track }) {
  const { name, category, detail, icon: Icon, image } = track

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

      {/* Corner HUD Brackets in Neon Blue */}
      <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00ADEF]/40 group-hover:border-[#00ADEF] group-hover:drop-shadow-[0_0_6px_#00ADEF] transition-all duration-300" />

      {/* DEFAULT RESTING STATE:
          Only displays the main track name centered in large, bold font. Fades out on hover. */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-2 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:blur-[2px]">
        <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl text-white tracking-tight uppercase group-hover:text-[#00ADEF] transition-colors duration-300 drop-shadow-[0_2px_16px_rgba(0,173,239,0.35)]">
          {name}
        </h3>
      </div>

      {/* HOVER STATE:
          Elegantly slides up and fades in over the main track name.
          Reveals secondary track category and description text. */}
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
          <span>ACCESS PROTOCOL</span>
          <span className="text-sm font-sans transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
        </div>
      </div>
    </article>
  )
}
