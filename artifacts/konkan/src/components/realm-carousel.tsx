import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '@/data/sections';
import { Link } from 'wouter';

const categoryLabels: Record<string, string> = {
  history: 'HERITAGE',
  geography: 'LANDSCAPES',
  culture: 'CULTURE',
  art: 'CRAFT',
  music: 'FOLK ARTS',
  cuisine: 'CUISINE',
  village: 'VILLAGE LIFE',
  festivals: 'FESTIVALS',
  'local-festivals': 'OCCASIONS',
  tourism: 'TOURISM',
  agriculture: 'AGRICULTURE',
  ecology: 'ECOLOGY',
  ecotourism: 'ECOTOURISM',
  'hidden-gems': 'HIDDEN GEMS',
  adventure: 'ADVENTURE',
  'flora-fauna': 'FLORA & FAUNA',
  beaches: 'OCEAN',
  personalities: 'PERSONALITIES',

  // ── New realms — batch A ──
  'konkan-railway': 'JOURNEYS',
  'language-dialects': 'CULTURE',
  'maritime-history': 'HERITAGE',
  'religious-mosaic': 'CULTURE',
  monsoon: 'LANDSCAPES',
  'weddings-rituals': 'CELEBRATION',
  handicrafts: 'CRAFT',
  'freedom-struggle': 'HERITAGE',
  'water-sports': 'ADVENTURE',
  homestays: 'TOURISM',
  'geology-coastline': 'LANDSCAPES',
  diaspora: 'LEGACIES',

  // ── New realms — batch B ──
  'wildlife-sanctuaries': 'FLORA & FAUNA',
  'forts-of-konkan': 'HERITAGE',
  'textiles-costume': 'CRAFT',
  'fishing-traditions': 'VILLAGE LIFE',
  'sacred-groves': 'ECOLOGY',
  'literature-poets': 'PERSONALITIES',
};

const categoryAccents: Record<string, string> = {
  history: '#c17f3a',
  geography: '#3a9e6e',
  culture: '#a04e7a',
  art: '#c17f3a',
  music: '#a04e7a',
  cuisine: '#d45f2a',
  village: '#3a9e6e',
  festivals: '#a04e7a',
  'local-festivals': '#a04e7a',
  tourism: '#2a8fb5',
  agriculture: '#3a9e6e',
  ecology: '#3a9e6e',
  ecotourism: '#3a9e6e',
  'hidden-gems': '#2a8fb5',
  adventure: '#d45f2a',
  'flora-fauna': '#3a9e6e',
  beaches: '#2a8fb5',
  personalities: '#c17f3a',

  // ── New realms — batch A ──
  'konkan-railway': '#2a8fb5',
  'language-dialects': '#c17f3a',
  'maritime-history': '#2a8fb5',
  'religious-mosaic': '#a04e7a',
  monsoon: '#3a9e6e',
  'weddings-rituals': '#a04e7a',
  handicrafts: '#c17f3a',
  'freedom-struggle': '#c17f3a',
  'water-sports': '#d45f2a',
  homestays: '#3a9e6e',
  'geology-coastline': '#3a9e6e',
  diaspora: '#c17f3a',

  // ── New realms — batch B ──
  'wildlife-sanctuaries': '#3a9e6e',
  'forts-of-konkan': '#c17f3a',
  'textiles-costume': '#a04e7a',
  'fishing-traditions': '#2a8fb5',
  'sacred-groves': '#3a9e6e',
  'literature-poets': '#c17f3a',
};

export function RealmCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number>(0);

  const go = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    const idx = (current + 1) % sections.length;
    setDirection(1);
    setCurrent(idx);
  }, [current]);

  const prev = useCallback(() => {
    const idx = (current - 1 + sections.length) % sections.length;
    setDirection(-1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [next]);

  const slide = sections[current];
  const accent = categoryAccents[slide.id] ?? '#3a9e6e';
  const label  = categoryLabels[slide.id]  ?? slide.id.toUpperCase();

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? '6%'  : '-6%',  opacity: 0, scale: 1.04 }),
    center: {                 x: 0,               opacity: 1, scale: 1    },
    exit:   (d: number) => ({ x: d > 0 ? '-6%' : '6%',  opacity: 0, scale: 0.97 }),
  };

  return (
    <section id="carousel" className="relative w-full overflow-hidden bg-[#020d08]" style={{ height: '80vh', minHeight: 480 }}>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.95, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover select-none"
            style={{ filter: 'brightness(0.62) saturate(1.1)' }}
            draggable={false}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/60 via-transparent to-transparent" />
          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Touch */}
      <div
        className="absolute inset-0 z-10"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 60) diff > 0 ? next() : prev();
        }}
      />

      {/* Slide number — top-left */}
      <div className="absolute top-8 left-8 z-20 font-sans text-[#f4ecd8]/30 text-xs tracking-[0.4em] select-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            {String(current + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span className="mx-2 opacity-30">/</span>
        <span className="opacity-30">{String(sections.length).padStart(2, '0')}</span>
      </div>

      {/* Content — bottom-left */}
      <div className="absolute bottom-0 left-0 z-20 p-8 md:p-14 max-w-3xl">
        {/* Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span
              className="text-[10px] font-sans tracking-[0.35em] uppercase font-medium"
              style={{ color: accent }}
            >
              {label}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${current}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-[#f4ecd8] leading-none mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            {slide.title}
          </motion.h2>
        </AnimatePresence>

        {/* Desc */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[#f4ecd8]/65 font-sans text-sm md:text-base leading-relaxed max-w-lg"
          >
            {slide.desc}
          </motion.p>
        </AnimatePresence>

        {/* Accent line */}
        <motion.div
          key={`line-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.35 }}
          className="mt-6 h-[1px] w-32 origin-left"
          style={{ backgroundColor: accent }}
        />

        {/* Explore CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6"
          >
            <Link
              href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/realm/${slide.id}`}
              className="inline-flex items-center gap-3 text-[11px] font-sans tracking-[0.28em] uppercase px-6 py-3 border transition-all duration-300 hover:gap-4 hover:px-7"
              style={{
                borderColor: `${accent}60`,
                color: accent,
                backgroundColor: `${accent}12`,
              }}
              onClick={e => e.stopPropagation()}
            >
              Explore {slide.title}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-[#f4ecd8]/10">
        <motion.div
          key={current}
          className="h-full origin-left"
          style={{ backgroundColor: accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5.5, ease: 'linear' }}
        />
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 border border-[#f4ecd8]/20 hover:border-[#f4ecd8]/60 bg-[#020d08]/40 hover:bg-[#020d08]/70 backdrop-blur-sm transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 border border-[#f4ecd8]/20 hover:border-[#f4ecd8]/60 bg-[#020d08]/40 hover:bg-[#020d08]/70 backdrop-blur-sm transition-all duration-300 flex items-center justify-center group"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dot nav — bottom right */}
      <div className="absolute bottom-8 right-8 md:right-14 z-20 flex flex-col gap-1.5 items-center">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? '2px' : '2px',
              height: i === current ? '20px' : '6px',
              backgroundColor: i === current ? accent : 'rgba(244,236,216,0.25)',
              borderRadius: '1px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
}
