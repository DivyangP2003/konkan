import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations, categoryColors, type Location } from '@/data/locations';

// Category labels
const catLabel: Record<Location['category'], string> = {
  heritage: 'Heritage',
  nature: 'Nature',
  beach: 'Beach',
  culture: 'Culture',
  adventure: 'Adventure',
};

function KonkanSVGMap({
  selected,
  onSelect,
  zoomed,
}: {
  selected: Location;
  onSelect: (loc: Location) => void;
  zoomed: boolean;
}) {
  const color = categoryColors[selected.category];

  // Zoom transform: scale 1.85 centered on selected pin
  const zoomOriginX = (selected.coords.x / 320) * 100;
  const zoomOriginY = (selected.coords.y / 620) * 100;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="w-full h-full"
        animate={
          zoomed
            ? {
                scale: 1.9,
                x: `calc(50% - ${zoomOriginX}%)`,
                y: `calc(50% - ${zoomOriginY}%)`,
              }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ transformOrigin: `${zoomOriginX}% ${zoomOriginY}%` }}
      >
        <svg
          viewBox="0 0 320 620"
          className="w-full h-full"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Sea radial gradient */}
            <radialGradient id="seaGrad" cx="20%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#0a3028" />
              <stop offset="100%" stopColor="#020d08" />
            </radialGradient>
            {/* Land gradient */}
            <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#041a0f" />
              <stop offset="100%" stopColor="#062318" />
            </linearGradient>
            {/* Ghats ridge gradient */}
            <linearGradient id="ghatsGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#063020" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#041408" stopOpacity="0.3"/>
            </linearGradient>
            {/* Pin glow */}
            <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <filter id="pinGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background: sea */}
          <rect width="320" height="620" fill="url(#seaGrad)" />

          {/* Sea shimmer lines */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => (
            <line key={i} x1="0" y1={620 * t} x2="100" y2={620 * t + 10}
              stroke="#0e4035" strokeWidth="0.5" opacity="0.4"/>
          ))}

          {/* Land mass: right of coastline */}
          <path
            d="M 80,0 L 52,45 C 54,100, 57,125, 60,148
               C 62,165, 64,178, 66,190
               C 68,208, 72,225, 76,238
               C 79,255, 85,272, 88,290
               C 88,304, 88,310, 88,316
               C 90,328, 93,336, 96,342
               C 100,358, 103,368, 104,378
               C 107,396, 109,408, 110,418
               C 113,440, 121,456, 128,470
               C 130,478, 132,484, 134,482
               C 134,488, 130,494, 124,492
               C 128,504, 138,511, 144,516
               C 152,520, 161,513, 163,506
               C 168,521, 172,532, 175,542
               C 182,562, 190,580, 195,596
               L 320,620 L 320,0 Z"
            fill="url(#landGrad)"
          />

          {/* Ghats ridges (decorative) */}
          <path
            d="M 200,0 L 220,80 L 240,40 L 255,110 L 270,60 L 285,140 L 300,90 L 320,180 L 320,0 Z"
            fill="url(#ghatsGrad)"
            opacity="0.5"
          />
          <path
            d="M 230,200 L 250,280 L 270,240 L 285,320 L 305,270 L 320,350 L 320,180 Z"
            fill="url(#ghatsGrad)"
            opacity="0.4"
          />
          <path
            d="M 240,380 L 260,450 L 280,410 L 300,480 L 320,440 L 320,350 Z"
            fill="url(#ghatsGrad)"
            opacity="0.35"
          />
          <path
            d="M 250,520 L 270,580 L 290,550 L 310,610 L 320,580 L 320,440 Z"
            fill="url(#ghatsGrad)"
            opacity="0.3"
          />

          {/* Coastline path */}
          <path
            d="M 52,45 C 54,100, 57,125, 60,148
               C 62,165, 64,178, 66,190
               C 68,208, 72,225, 76,238
               C 79,255, 85,272, 88,290
               C 88,304, 88,310, 88,316
               C 90,328, 93,336, 96,342
               C 100,358, 103,368, 104,378
               C 107,396, 109,408, 110,418
               C 113,440, 121,456, 128,470
               C 130,478, 132,484, 134,482
               C 134,488, 130,494, 124,492
               C 128,504, 138,511, 144,516
               C 152,520, 161,513, 163,506
               C 168,521, 172,532, 175,542
               C 182,562, 190,580, 195,596"
            fill="none"
            stroke="#1a6852"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Coast highlight */}
          <path
            d="M 52,45 C 54,100, 57,125, 60,148
               C 62,165, 64,178, 66,190
               C 68,208, 72,225, 76,238
               C 79,255, 85,272, 88,290
               C 88,304, 88,310, 88,316
               C 90,328, 93,336, 96,342
               C 100,358, 103,368, 104,378
               C 107,396, 109,408, 110,418
               C 113,440, 121,456, 128,470
               C 130,478, 132,484, 134,482
               C 134,488, 130,494, 124,492
               C 128,504, 138,511, 144,516
               C 152,520, 161,513, 163,506
               C 168,521, 172,532, 175,542
               C 182,562, 190,580, 195,596"
            fill="none"
            stroke="#2a9e78"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Maharashtra/Goa border line */}
          <line x1="115" y1="500" x2="320" y2="500"
            stroke="#1a3025" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.6"/>
          <text x="135" y="497" fontSize="5" fill="#2a6048" opacity="0.7" fontFamily="sans-serif">MAHARASHTRA</text>
          <text x="135" y="510" fontSize="5" fill="#2a6048" opacity="0.7" fontFamily="sans-serif">GOA</text>

          {/* Goa/Karnataka border */}
          <line x1="150" y1="565" x2="320" y2="565"
            stroke="#1a3025" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.5"/>
          <text x="165" y="578" fontSize="5" fill="#2a6048" opacity="0.7" fontFamily="sans-serif">KARNATAKA</text>

          {/* Direction label */}
          <text x="14" y="40" fontSize="6" fill="#0e4535" fontFamily="sans-serif" opacity="0.8">ARABIAN</text>
          <text x="16" y="50" fontSize="6" fill="#0e4535" fontFamily="sans-serif" opacity="0.8">SEA</text>

          {/* Location pins */}
          {locations.map((loc) => {
            const isSelected = loc.id === selected.id;
            const col = categoryColors[loc.category];
            return (
              <g
                key={loc.id}
                onClick={() => onSelect(loc)}
                style={{ cursor: 'pointer' }}
                filter={isSelected ? 'url(#pinGlow)' : undefined}
              >
                {/* Pulse ring for selected */}
                {isSelected && (
                  <circle cx={loc.coords.x} cy={loc.coords.y} r="10"
                    fill="none" stroke={col} strokeWidth="1" opacity="0.4"
                    style={{ animation: 'pinPulse 2s ease-in-out infinite' }}
                  />
                )}
                {/* Outer ring */}
                <circle cx={loc.coords.x} cy={loc.coords.y} r={isSelected ? 7 : 5}
                  fill="none" stroke={col} strokeWidth={isSelected ? 1.5 : 1} opacity={isSelected ? 0.9 : 0.55}/>
                {/* Inner dot */}
                <circle cx={loc.coords.x} cy={loc.coords.y} r={isSelected ? 3 : 2}
                  fill={col} opacity={isSelected ? 1 : 0.7}/>
                {/* Label */}
                <text
                  x={loc.coords.x + 8}
                  y={loc.coords.y + 3}
                  fontSize={isSelected ? 6.5 : 5.5}
                  fill={isSelected ? '#f4ecd8' : '#a8c4b8'}
                  fontFamily="serif"
                  opacity={isSelected ? 1 : 0.7}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {loc.name}
                </text>
              </g>
            );
          })}

          {/* Pulse animation CSS */}
          <style>{`
            @keyframes pinPulse {
              0%, 100% { r: 10; opacity: 0.4; }
              50% { r: 14; opacity: 0.1; }
            }
          `}</style>
        </svg>
      </motion.div>
    </div>
  );
}

export function KonkanMap() {
  const [selected, setSelected] = useState<Location>(locations[2]); // Start at Murud-Janjira
  const [zoomed, setZoomed] = useState(false);

  const color = categoryColors[selected.category];
  const cat   = catLabel[selected.category];

  return (
    <section id="map" className="relative bg-[#020d08] py-0 overflow-hidden border-t border-[#0d2d1e]">
      {/* Section header */}
      <div className="px-8 md:px-16 py-16 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#3a9e6e] font-sans mb-3">
              Explore the Coast
            </p>
            <h2 className="font-serif text-[#f4ecd8] text-4xl md:text-6xl leading-none">
              The Konkan <span className="italic text-[#3a9e6e]">Shore</span>
            </h2>
          </div>
          <p className="text-[#f4ecd8]/50 font-sans text-sm max-w-xs leading-relaxed">
            720 kilometres of coastline. 16 notable stops. Click any marker to explore.
          </p>
        </motion.div>
        <div className="mt-6 h-[1px] bg-gradient-to-r from-[#3a9e6e]/40 via-[#3a9e6e]/10 to-transparent" />
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '70vh' }}>

        {/* Left: Map */}
        <div className="relative w-full lg:w-[30%] xl:w-[28%] bg-[#020d08] border-r border-[#0d2d1e] flex flex-col"
          style={{ minHeight: 480 }}>

          {/* Zoom toggle */}
          <button
            onClick={() => setZoomed(z => !z)}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase text-[#f4ecd8]/50 hover:text-[#f4ecd8]/90 transition-colors border border-[#f4ecd8]/15 hover:border-[#f4ecd8]/40 px-3 py-1.5 backdrop-blur-sm bg-[#020d08]/60"
          >
            {zoomed ? (
              <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5"/></svg> Reset</>
            ) : (
              <><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h8M5 1v8" stroke="currentColor" strokeWidth="1.5"/></svg> Zoom</>
            )}
          </button>

          <div className="flex-1 p-4 pt-8">
            <KonkanSVGMap selected={selected} onSelect={setSelected} zoomed={zoomed} />
          </div>

          {/* Category legend */}
          <div className="px-4 py-3 border-t border-[#0d2d1e] flex flex-wrap gap-x-4 gap-y-1.5">
            {(Object.entries(categoryColors) as [Location['category'], string][]).map(([cat, col]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col }} />
                <span className="text-[9px] font-sans tracking-[0.15em] uppercase text-[#f4ecd8]/40">{catLabel[cat]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info panel */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.55, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="h-full flex flex-col lg:flex-row"
            >
              {/* Image */}
              <div className="relative w-full lg:w-[45%] xl:w-[42%] overflow-hidden" style={{ minHeight: 280 }}>
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.75) saturate(1.15)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020d08]/80 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/70 to-transparent lg:hidden block" />

                {/* Category badge on image */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                  <span
                    className="text-[10px] font-sans tracking-[0.3em] uppercase font-medium"
                    style={{ color }}
                  >
                    {cat}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 px-8 md:px-10 xl:px-14 py-10 flex flex-col justify-center space-y-6">
                {/* Region */}
                <p className="text-[10px] tracking-[0.35em] uppercase font-sans" style={{ color: `${color}90` }}>
                  {selected.region}
                </p>

                {/* Name */}
                <h3 className="font-serif text-[#f4ecd8] leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  {selected.name}
                </h3>

                {/* Tagline */}
                <p className="font-serif italic text-[#f4ecd8]/55 text-xl leading-tight">
                  "{selected.tagline}"
                </p>

                <div className="h-[1px] w-16" style={{ backgroundColor: `${color}60` }} />

                {/* Description */}
                <p className="text-[#f4ecd8]/70 font-sans text-sm md:text-[0.95rem] leading-[1.8]">
                  {selected.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/30 mb-3">
                    Highlights
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs font-sans px-3 py-1.5 border tracking-[0.08em]"
                        style={{
                          borderColor: `${color}30`,
                          color: `${color}cc`,
                          backgroundColor: `${color}0a`,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location nav dots */}
                <div className="flex items-center gap-1.5 pt-2 flex-wrap">
                  {locations.map((loc, i) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelected(loc)}
                      className="transition-all duration-300"
                      style={{
                        width: loc.id === selected.id ? 24 : 6,
                        height: 3,
                        backgroundColor: loc.id === selected.id ? color : 'rgba(244,236,216,0.2)',
                        borderRadius: 1.5,
                        border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      aria-label={loc.name}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
