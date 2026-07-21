import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { locations, categoryColors, type Location } from '@/data/locations';

const catLabel: Record<Location['category'], string> = {
  heritage: 'Heritage', nature: 'Nature', beach: 'Beach',
  culture: 'Culture', adventure: 'Adventure',
};

// ── Accurate Konkan SVG map ────────────────────────────────────────────────
// ViewBox 0 0 380 760. Sea=left, Land=right. North=top, South=bottom.
// Coastline traced from actual lat/lng proportions.
function KonkanSVGMap({ selected, onSelect, zoomed }: {
  selected: Location; onSelect: (l: Location) => void; zoomed: boolean;
}) {
  const col = categoryColors[selected.category];
  const ox = (selected.coords.x / 380) * 100;
  const oy = (selected.coords.y / 760) * 100;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm">
      <motion.div
        className="w-full h-full"
        animate={zoomed ? { scale: 2.1, x: `calc(40% - ${ox * 2.1 * 0.5}%)`, y: `calc(40% - ${oy * 2.1 * 0.3}%)` } : { scale: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{ transformOrigin: `${ox}% ${oy}%` }}
      >
        <svg viewBox="0 0 380 760" className="w-full h-full" style={{ display: 'block' }}>
          <defs>
            {/* Ocean gradient */}
            <linearGradient id="oceanGrad" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#041c14"/>
              <stop offset="50%" stopColor="#062a1c"/>
              <stop offset="100%" stopColor="#020d08"/>
            </linearGradient>
            {/* Land gradient */}
            <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#062318"/>
              <stop offset="40%" stopColor="#083020"/>
              <stop offset="100%" stopColor="#041808"/>
            </linearGradient>
            {/* Ghats gradient */}
            <linearGradient id="ghatsGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0a3820" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#051205" stopOpacity="0.2"/>
            </linearGradient>
            {/* Coast glow */}
            <filter id="coastGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Pin glow */}
            <filter id="pinGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Vignette */}
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="100%" stopColor="#020d08" stopOpacity="0.7"/>
            </radialGradient>
            {/* River gradient */}
            <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a5a42" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#0d3828" stopOpacity="0.3"/>
            </linearGradient>
            {/* Sea shimmer */}
            <pattern id="seaPattern" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="40" y2="8" stroke="#0d3825" strokeWidth="0.3" opacity="0.5"/>
              <line x1="0" y1="18" x2="40" y2="16" stroke="#0d3825" strokeWidth="0.2" opacity="0.3"/>
            </pattern>
          </defs>

          {/* Ocean background */}
          <rect width="380" height="760" fill="url(#oceanGrad)"/>
          {/* Sea texture lines */}
          <rect width="380" height="760" fill="url(#seaPattern)" opacity="0.8"/>

          {/* ── Land mass ─────────────────────────────────────────── */}
          {/* Main land polygon — coast on left edge, solid land to the right */}
          <path
            d={`
              M 130,0
              C 128,15 125,25 120,38
              L 105,52
              C 98,58 92,64 86,68
              C 78,74 72,82 70,90
              C 66,100 64,112 62,122
              L 58,138
              C 56,148 56,156 58,164
              C 60,172 64,178 68,184
              C 72,190 76,196 78,204
              C 80,212 80,220 80,228
              C 80,238 80,246 82,254
              C 84,262 87,268 88,276
              C 89,284 88,292 88,300
              C 88,310 90,318 92,326
              C 95,336 98,344 100,352
              C 102,360 103,368 103,376
              C 103,386 104,396 106,406
              C 108,418 110,428 112,438
              C 115,450 118,460 122,470
              C 126,480 130,488 132,496
              C 134,504 134,510 132,516
              C 130,522 126,526 122,530
              C 118,534 116,538 118,544
              C 120,550 126,556 132,562
              C 138,568 144,574 148,580
              C 152,586 155,592 156,600
              C 158,610 160,622 162,634
              C 165,648 168,660 172,672
              C 176,684 180,696 185,708
              C 190,720 196,730 200,740
              L 200,760 L 380,760 L 380,0 Z
            `}
            fill="url(#landGrad)"
          />

          {/* Western Ghats ridges — subtle relief */}
          <path d="M 265,0 C 270,30 275,50 272,80 C 269,110 260,130 262,160 C 264,190 272,210 270,240 C 268,270 258,290 260,320 C 262,350 270,370 268,400 C 266,430 258,450 260,480 C 262,510 270,530 268,560 C 266,590 258,610 256,640 C 254,670 256,700 258,730 L 258,760 L 380,760 L 380,0 Z"
            fill="url(#ghatsGrad)" opacity="0.7"/>
          <path d="M 310,0 C 315,40 318,80 314,120 C 310,160 300,200 302,240 C 304,280 312,320 310,360 C 308,400 298,440 300,480 C 302,520 310,560 308,600 C 306,640 296,680 298,720 L 298,760 L 380,760 L 380,0 Z"
            fill="url(#ghatsGrad)" opacity="0.4"/>

          {/* ── Coastline ─────────────────────────────────────────── */}
          <path
            d={`
              M 120,38
              L 105,52
              C 98,58 92,64 86,68
              C 78,74 72,82 70,90
              C 66,100 64,112 62,122
              L 58,138
              C 56,148 56,156 58,164
              C 60,172 64,178 68,184
              C 72,190 76,196 78,204
              C 80,212 80,220 80,228
              C 80,238 80,246 82,254
              C 84,262 87,268 88,276
              C 89,284 88,292 88,300
              C 88,310 90,318 92,326
              C 95,336 98,344 100,352
              C 102,360 103,368 103,376
              C 103,386 104,396 106,406
              C 108,418 110,428 112,438
              C 115,450 118,460 122,470
              C 126,480 130,488 132,496
              C 134,504 134,510 132,516
              C 130,522 126,526 122,530
              C 118,534 116,538 118,544
              C 120,550 126,556 132,562
              C 138,568 144,574 148,580
              C 152,586 155,592 156,600
              C 158,610 160,622 162,634
              C 165,648 168,660 172,672
              C 176,684 180,696 185,708
            `}
            fill="none"
            stroke="#24a876"
            strokeWidth="1.8"
            strokeLinecap="round"
            filter="url(#coastGlow)"
          />
          {/* Coast highlight (inner glow) */}
          <path
            d={`
              M 120,38 L 105,52 C 98,58 92,64 86,68 C 78,74 72,82 70,90
              C 66,100 64,112 62,122 L 58,138
              C 56,148 56,156 58,164 C 60,172 64,178 68,184
              C 72,190 76,196 78,204 C 80,212 80,220 80,228
              C 80,238 80,246 82,254 C 84,262 87,268 88,276
              C 89,284 88,292 88,300 C 88,310 90,318 92,326
              C 95,336 98,344 100,352 C 102,360 103,368 103,376
              C 103,386 104,396 106,406 C 108,418 110,428 112,438
              C 115,450 118,460 122,470 C 126,480 130,488 132,496
              C 134,504 134,510 132,516 C 130,522 126,526 122,530
              C 118,534 116,538 118,544 C 120,550 126,556 132,562
              C 138,568 144,574 148,580 C 152,586 155,592 156,600
              C 158,610 160,622 162,634 C 165,648 168,660 172,672
              C 176,684 180,696 185,708
            `}
            fill="none"
            stroke="#3dcc94"
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* ── Rivers (thin blue lines running east→west) ──────────── */}
          {/* Ulhas / Thane creek */}
          <path d="M 76,100 C 100,95 130,90 175,88" fill="none" stroke="#1a6845" strokeWidth="1.2" opacity="0.6"/>
          {/* Kundalika */}
          <path d="M 85,178 C 110,172 140,168 180,165" fill="none" stroke="#1a6845" strokeWidth="1" opacity="0.5"/>
          {/* Savitri */}
          <path d="M 90,236 C 115,230 148,226 190,222" fill="none" stroke="#1a6845" strokeWidth="1" opacity="0.5"/>
          {/* Vasishti */}
          <path d="M 94,312 C 120,306 155,302 200,298" fill="none" stroke="#1a6845" strokeWidth="1" opacity="0.5"/>
          {/* Shastri */}
          <path d="M 100,376 C 128,370 165,366 210,362" fill="none" stroke="#1a6845" strokeWidth="0.9" opacity="0.45"/>
          {/* Terekhol */}
          <path d="M 124,530 C 148,524 180,520 220,518" fill="none" stroke="#1a6845" strokeWidth="0.9" opacity="0.4"/>
          {/* Mandovi */}
          <path d="M 142,568 C 165,562 195,558 235,556" fill="none" stroke="#1a6845" strokeWidth="1.1" opacity="0.5"/>
          {/* Zuari */}
          <path d="M 148,598 C 172,592 205,588 248,586" fill="none" stroke="#1a6845" strokeWidth="1" opacity="0.45"/>
          {/* Kali (Karwar) */}
          <path d="M 175,684 C 200,678 235,674 275,672" fill="none" stroke="#1a6845" strokeWidth="0.9" opacity="0.4"/>

          {/* ── State border lines ─────────────────────────────────── */}
          {/* Maharashtra / Goa */}
          <line x1="122" y1="528" x2="320" y2="528" stroke="#1e4a30" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.7"/>
          {/* Goa / Karnataka */}
          <line x1="148" y1="600" x2="320" y2="600" stroke="#1e4a30" strokeWidth="0.8" strokeDasharray="5 4" opacity="0.6"/>

          {/* ── State labels ───────────────────────────────────────── */}
          <text x="185" y="280" fontSize="9" fill="#2d8060" opacity="0.75" fontFamily="serif" fontStyle="italic" transform="rotate(-88, 185, 280)">MAHARASHTRA</text>
          <text x="195" y="570" fontSize="8" fill="#2d8060" opacity="0.7"  fontFamily="serif" fontStyle="italic" transform="rotate(-88, 195, 570)">GOA</text>
          <text x="205" y="670" fontSize="8" fill="#2d8060" opacity="0.65" fontFamily="serif" fontStyle="italic" transform="rotate(-88, 205, 670)">KARNATAKA</text>

          {/* ── Sea labels ─────────────────────────────────────────── */}
          <text x="26" y="200" fontSize="7.5" fill="#1a5840" fontFamily="serif" fontStyle="italic" opacity="0.8" transform="rotate(-90, 26, 200)">ARABIAN  SEA</text>

          {/* ── Compass rose ───────────────────────────────────────── */}
          <g transform="translate(22, 28)" opacity="0.5">
            <line x1="0" y1="-10" x2="0" y2="10" stroke="#2d8060" strokeWidth="0.8"/>
            <line x1="-10" y1="0" x2="10" y2="0" stroke="#2d8060" strokeWidth="0.8"/>
            <polygon points="0,-10 -2,-4 2,-4" fill="#3a9e6e"/>
            <text x="0" y="-12" fontSize="5" fill="#3a9e6e" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold">N</text>
          </g>

          {/* ── Scale bar ──────────────────────────────────────────── */}
          <g transform="translate(18, 740)" opacity="0.45">
            <line x1="0" y1="0" x2="40" y2="0" stroke="#2d8060" strokeWidth="0.8"/>
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#2d8060" strokeWidth="0.8"/>
            <line x1="40" y1="-3" x2="40" y2="3" stroke="#2d8060" strokeWidth="0.8"/>
            <text x="20" y="-5" fontSize="4.5" fill="#2d8060" textAnchor="middle" fontFamily="sans-serif">100 km</text>
          </g>

          {/* Vignette overlay */}
          <rect width="380" height="760" fill="url(#vignette)" pointerEvents="none"/>

          {/* ── Location pins ─────────────────────────────────────── */}
          {locations.map((loc) => {
            const isSel = loc.id === selected.id;
            const c = categoryColors[loc.category];
            return (
              <g key={loc.id} onClick={() => onSelect(loc)} style={{ cursor: 'pointer' }} filter={isSel ? 'url(#pinGlow)' : undefined}>
                {isSel && (
                  <circle cx={loc.coords.x} cy={loc.coords.y} r="12"
                    fill="none" stroke={c} strokeWidth="1" opacity="0.35"
                    style={{ animation: 'pinPulse 2s ease-in-out infinite' }}/>
                )}
                {/* Pin shape */}
                <circle cx={loc.coords.x} cy={loc.coords.y} r={isSel ? 6 : 4}
                  fill={isSel ? c : `${c}88`} opacity={isSel ? 1 : 0.8}/>
                <circle cx={loc.coords.x} cy={loc.coords.y} r={isSel ? 6 : 4}
                  fill="none" stroke={isSel ? '#f4ecd8' : c} strokeWidth={isSel ? 1.5 : 0.8} opacity={isSel ? 0.9 : 0.6}/>
                {/* Inner dot */}
                <circle cx={loc.coords.x} cy={loc.coords.y} r={isSel ? 2 : 1.5}
                  fill={isSel ? '#f4ecd8' : '#f4ecd888'}/>
                {/* Name label */}
                <text
                  x={loc.coords.x + (loc.coords.x < 160 ? 9 : -9)}
                  y={loc.coords.y + 3.5}
                  fontSize={isSel ? 7 : 5.5}
                  fill={isSel ? '#f4ecd8' : '#a8c4b8'}
                  fontFamily="serif"
                  textAnchor={loc.coords.x < 160 ? 'start' : 'end'}
                  opacity={isSel ? 1 : 0.75}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {loc.name}
                </text>
              </g>
            );
          })}

          <style>{`
            @keyframes pinPulse {
              0%,100% { r: 12; opacity: 0.35; }
              50% { r: 17; opacity: 0.1; }
            }
          `}</style>
        </svg>
      </motion.div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export function KonkanMap() {
  const [selected, setSelected] = useState<Location>(locations[2]);
  const [zoomed,   setZoomed]   = useState(false);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const color = categoryColors[selected.category];
  const cat   = catLabel[selected.category];

  return (
    <section id="map" className="relative bg-[#020d08] overflow-hidden border-t border-[#0d2d1e]">

      {/* Section header */}
      <div className="px-8 md:px-16 py-14 pb-0">
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
          <p className="text-[#f4ecd8]/45 font-sans text-sm max-w-xs leading-relaxed">
            720 kilometres of coastline. {locations.length} notable stops. Click any marker to explore.
          </p>
        </motion.div>
        <div className="mt-6 h-[1px] bg-gradient-to-r from-[#3a9e6e]/40 via-[#3a9e6e]/10 to-transparent" />
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '78vh' }}>

        {/* Left: Map panel */}
        <div className="relative w-full lg:w-[32%] xl:w-[30%] bg-[#020d08] border-r border-[#0d2d1e] flex flex-col" style={{ minHeight: 500 }}>

          {/* Zoom toggle */}
          <button
            onClick={() => setZoomed(z => !z)}
            className="absolute top-3 right-3 z-20 flex items-center gap-1.5 text-[9px] font-sans tracking-[0.2em] uppercase text-[#f4ecd8]/45 hover:text-[#f4ecd8]/80 transition-colors border border-[#f4ecd8]/12 hover:border-[#f4ecd8]/35 px-2.5 py-1.5 backdrop-blur-sm bg-[#020d08]/70"
          >
            {zoomed ? (
              <><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M2 2l5 5M7 2L2 7" stroke="currentColor" strokeWidth="1.5"/></svg> Reset</>
            ) : (
              <><svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5h7M4.5 1v7" stroke="currentColor" strokeWidth="1.5"/></svg> Zoom</>
            )}
          </button>

          <div className="flex-1 p-3 pt-8">
            <KonkanSVGMap selected={selected} onSelect={setSelected} zoomed={zoomed} />
          </div>

          {/* Legend */}
          <div className="px-4 py-3 border-t border-[#0d2d1e] flex flex-wrap gap-x-3 gap-y-1.5">
            {(Object.entries(categoryColors) as [Location['category'], string][]).map(([c, col]) => (
              <div key={c} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col }}/>
                <span className="text-[8px] font-sans tracking-[0.12em] uppercase text-[#f4ecd8]/35">{catLabel[c]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Full-bleed image with overlaid text */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: 420 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0"
            >
              {/* Full-bleed image */}
              <motion.img
                key={`img-${selected.id}`}
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(1) saturate(1.2)' }}
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* Dark gradient overlay — heavier at bottom & left for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/95 via-[#020d08]/30 to-transparent"/>

              {/* Category badge — top left */}
              <div className="absolute top-8 left-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}/>
                  <span
                    className="text-[10px] font-sans tracking-[0.35em] uppercase font-medium"
                    style={{ color }}
                  >
                    {cat}
                  </span>
                </div>
              </div>

              {/* Nav dots — top right */}
              <div className="absolute top-8 right-8 flex items-center gap-1.5 flex-wrap justify-end max-w-[200px]">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelected(loc)}
                    className="transition-all duration-300"
                    style={{
                      width: loc.id === selected.id ? 20 : 5,
                      height: 3,
                      backgroundColor: loc.id === selected.id ? color : 'rgba(244,236,216,0.18)',
                      borderRadius: 1.5,
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    aria-label={loc.name}
                  />
                ))}
              </div>

              {/* Text content — bottom overlay */}
              <motion.div
                key={`text-${selected.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-0 left-0 right-0 px-8 md:px-12 xl:px-16 pb-10 md:pb-14"
              >
                {/* Region */}
                <p
                  className="text-[10px] tracking-[0.35em] uppercase font-sans mb-2"
                  style={{ color: `${color}aa` }}
                >
                  {selected.region}
                </p>

                {/* Name */}
                <h3
                  className="font-serif text-[#f4ecd8] leading-none mb-3"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
                >
                  {selected.name}
                </h3>

                {/* Divider */}
                <div className="h-[1px] w-14 mb-4" style={{ backgroundColor: `${color}80` }}/>

                {/* Tagline */}
                <p className="font-serif italic text-[#f4ecd8]/60 text-base md:text-lg mb-4 max-w-lg leading-relaxed">
                  "{selected.tagline}"
                </p>

                {/* Description */}
                <p className="text-[#f4ecd8]/70 font-sans text-sm md:text-[0.9rem] leading-[1.8] max-w-2xl mb-5 line-clamp-3">
                  {selected.description}
                </p>

                {/* Highlights + explore */}
                <div className="flex flex-wrap items-center gap-3">
                  {selected.highlights.slice(0, 3).map(h => (
                    <span
                      key={h}
                      className="text-xs font-sans px-3 py-1 border tracking-[0.06em]"
                      style={{ borderColor: `${color}30`, color: `${color}cc`, backgroundColor: `${color}10` }}
                    >
                      {h}
                    </span>
                  ))}

                  <a
                    href={`/#realms`}
                    className="ml-auto flex items-center gap-2 text-[10px] font-sans tracking-[0.25em] uppercase transition-all duration-300 hover:gap-3"
                    style={{ color }}
                  >
                    Explore Konkan
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
