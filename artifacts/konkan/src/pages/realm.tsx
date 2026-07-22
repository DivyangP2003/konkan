import { useParams, useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sections } from '@/data/sections';
import { realmContent } from '@/data/realm-content';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

/* ── Accent / label maps (all realms) ─────────────────────────────────── */
const accentMap: Record<string, string> = {
  history: '#c17f3a', geography: '#3a9e6e', culture: '#a04e7a',
  art: '#c17f3a', music: '#a04e7a', cuisine: '#d45f2a',
  village: '#3a9e6e', festivals: '#a04e7a', 'local-festivals': '#a04e7a',
  tourism: '#2a8fb5', agriculture: '#3a9e6e', ecology: '#3a9e6e',
  ecotourism: '#3a9e6e', 'hidden-gems': '#2a8fb5', adventure: '#d45f2a',
  'flora-fauna': '#3a9e6e', beaches: '#2a8fb5', personalities: '#c17f3a',
  'konkan-railway': '#2a8fb5', 'language-dialects': '#c17f3a',
  'maritime-history': '#2a8fb5', 'religious-mosaic': '#a04e7a',
  monsoon: '#3a9e6e', 'weddings-rituals': '#a04e7a', handicrafts: '#c17f3a',
  'freedom-struggle': '#c17f3a', 'water-sports': '#d45f2a',
  homestays: '#3a9e6e', 'geology-coastline': '#3a9e6e', diaspora: '#c17f3a',
  'wildlife-sanctuaries': '#3a9e6e', 'forts-of-konkan': '#c17f3a',
  'textiles-costume': '#a04e7a', 'fishing-traditions': '#2a8fb5',
  'sacred-groves': '#3a9e6e', 'literature-poets': '#c17f3a',
};

const categoryLabel: Record<string, string> = {
  history: 'Heritage', geography: 'Landscape', culture: 'Culture',
  art: 'Craft & Art', music: 'Folk Arts', cuisine: 'Cuisine',
  village: 'Village Life', festivals: 'Celebration', 'local-festivals': 'Local Occasions',
  tourism: 'Travel', agriculture: 'Farming', ecology: 'Ecology',
  ecotourism: 'Ecotourism', 'hidden-gems': 'Hidden Gems', adventure: 'Adventure',
  'flora-fauna': 'Flora & Fauna', beaches: 'Ocean & Beaches', personalities: 'Legacies',
  'konkan-railway': 'Journeys', 'language-dialects': 'Language',
  'maritime-history': 'Maritime', 'religious-mosaic': 'Faiths',
  monsoon: 'Seasons', 'weddings-rituals': 'Rituals', handicrafts: 'Crafts',
  'freedom-struggle': 'History', 'water-sports': 'Adventure',
  homestays: 'Slow Travel', 'geology-coastline': 'Earth & Rock', diaspora: 'Diaspora',
  'wildlife-sanctuaries': 'Wildlife', 'forts-of-konkan': 'Forts',
  'textiles-costume': 'Textiles', 'fishing-traditions': 'Fishing',
  'sacred-groves': 'Sacred', 'literature-poets': 'Literature',
};

/* ── Related-realm definitions ────────────────────────────────────────── */
const relatedIds: Record<string, string[]> = {
  history:      ['forts-of-konkan', 'maritime-history', 'freedom-struggle', 'personalities'],
  geography:    ['monsoon', 'ecology', 'beaches', 'geology-coastline'],
  culture:      ['festivals', 'music', 'language-dialects', 'weddings-rituals'],
  art:          ['handicrafts', 'culture', 'music', 'textiles-costume'],
  music:        ['festivals', 'culture', 'local-festivals', 'weddings-rituals'],
  cuisine:      ['agriculture', 'fishing-traditions', 'village', 'homestays'],
  village:      ['homestays', 'agriculture', 'fishing-traditions', 'culture'],
  festivals:    ['local-festivals', 'culture', 'religious-mosaic', 'music'],
  'local-festivals': ['festivals', 'weddings-rituals', 'culture', 'village'],
  tourism:      ['homestays', 'hidden-gems', 'beaches', 'konkan-railway'],
  agriculture:  ['cuisine', 'village', 'ecology', 'homestays'],
  ecology:      ['flora-fauna', 'sacred-groves', 'wildlife-sanctuaries', 'geography'],
  ecotourism:   ['ecology', 'homestays', 'adventure', 'flora-fauna'],
  'hidden-gems': ['beaches', 'tourism', 'adventure', 'forts-of-konkan'],
  adventure:    ['water-sports', 'hidden-gems', 'ecology', 'beaches'],
  'flora-fauna': ['ecology', 'sacred-groves', 'wildlife-sanctuaries', 'monsoon'],
  beaches:      ['tourism', 'hidden-gems', 'water-sports', 'fishing-traditions'],
  personalities: ['history', 'literature-poets', 'freedom-struggle', 'maritime-history'],
  'konkan-railway': ['tourism', 'geography', 'hidden-gems', 'homestays'],
  'language-dialects': ['culture', 'literature-poets', 'diaspora', 'religious-mosaic'],
  'maritime-history': ['history', 'forts-of-konkan', 'fishing-traditions', 'personalities'],
  'religious-mosaic': ['culture', 'festivals', 'local-festivals', 'sacred-groves'],
  monsoon:      ['geography', 'ecology', 'beaches', 'flora-fauna'],
  'weddings-rituals': ['culture', 'festivals', 'cuisine', 'textiles-costume'],
  handicrafts:  ['art', 'culture', 'village', 'textiles-costume'],
  'freedom-struggle': ['history', 'personalities', 'maritime-history', 'forts-of-konkan'],
  'water-sports': ['beaches', 'adventure', 'ecology', 'hidden-gems'],
  homestays:    ['tourism', 'village', 'cuisine', 'agriculture'],
  'geology-coastline': ['geography', 'beaches', 'ecology', 'forts-of-konkan'],
  diaspora:     ['culture', 'cuisine', 'language-dialects', 'personalities'],
  'wildlife-sanctuaries': ['ecology', 'flora-fauna', 'sacred-groves', 'adventure'],
  'forts-of-konkan': ['history', 'maritime-history', 'hidden-gems', 'tourism'],
  'textiles-costume': ['art', 'handicrafts', 'culture', 'weddings-rituals'],
  'fishing-traditions': ['village', 'cuisine', 'maritime-history', 'beaches'],
  'sacred-groves': ['ecology', 'flora-fauna', 'religious-mosaic', 'wildlife-sanctuaries'],
  'literature-poets': ['personalities', 'culture', 'language-dialects', 'history'],
};

/* ── Section index maps ────────────────────────────────────────────────── */
const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]));

/* ────────────────────────────────────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────────────────────────────────── */
export default function RealmPage() {
  const params    = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'read' | 'visit'>('read');

  const base    = import.meta.env.BASE_URL.replace(/\/$/, '');
  const id      = params.id ?? '';
  const section = sections.find(s => s.id === id);

  if (!section) {
    navigate(`${base}/`);
    return null;
  }

  const accent  = accentMap[id] ?? '#3a9e6e';
  const label   = categoryLabel[id] ?? '';
  const content = realmContent[id] ?? { subtitle: section.desc, body: [section.desc] };
  const related = (relatedIds[id] ?? [])
    .map(rid => sections.find(s => s.id === rid))
    .filter(Boolean) as typeof sections;

  const currentIndex = sections.findIndex(s => s.id === id);
  const prev = sections[(currentIndex - 1 + sections.length) % sections.length];
  const next = sections[(currentIndex + 1) % sections.length];

  /* Split body paragraphs: first two in the main column, rest in second column */
  const bodyFirst  = content.body.slice(0, 2);
  const bodyRest   = content.body.slice(2);

  /* Gallery images: realm's own gallery + the section's hero image */
  const galleryImages = [
    section.image,
    ...(content.gallery ?? []).map(g => `/assets/${g}`),
  ].filter((v, i, a) => a.indexOf(v) === i); // dedupe

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: 520 }}>
        {/* Hero Image */}
        <motion.img
          src={section.image}
          alt={section.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.42) saturate(1.15)' }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/60 via-transparent to-transparent" />

        {/* Accent line — top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, ${accent}, transparent 60%)` }}
        />

        {/* Back link */}
        <motion.a
          href={`${base}/`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-28 left-8 md:left-16 flex items-center gap-2.5 text-[9px] tracking-[0.32em] uppercase font-sans text-[#f4ecd8]/45 hover:text-[#f4ecd8] transition-colors duration-300"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M14 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Konkan
        </motion.a>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-16 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 font-sans text-[9px] tracking-[0.4em] uppercase"
            style={{ color: accent }}
          >
            {label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-5 max-w-3xl"
          >
            {section.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="font-serif italic text-lg md:text-xl text-[#f4ecd8]/65 max-w-xl leading-snug"
          >
            {content.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          KEY FACTS BAR
         ══════════════════════════════════════════════════════════════ */}
      {content.keyFacts && content.keyFacts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-y border-[#0d2d1e] bg-[#020d08]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {content.keyFacts.map((fact, i) => (
              <div
                key={i}
                className={`px-8 md:px-10 py-6 md:py-7 ${i < content.keyFacts!.length - 1 ? 'border-r border-[#0d2d1e]' : ''}`}
              >
                <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/30 mb-2">
                  {fact.label}
                </p>
                <p className="font-serif text-sm md:text-base text-[#f4ecd8]/90 leading-snug">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          READ / VISIT TABS
         ══════════════════════════════════════════════════════════════ */}
      <div className="border-b border-[#0d2d1e] sticky top-[64px] z-30 bg-[#020d08]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex gap-0">
          {(['read', 'visit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-6 py-4 font-sans text-[10px] tracking-[0.28em] uppercase transition-colors duration-300"
              style={{ color: activeTab === tab ? accent : 'rgba(244,236,216,0.35)' }}
            >
              {tab === 'read' ? 'Read' : 'Visit & Do'}
              {activeTab === tab && (
                <motion.div
                  layoutId="realmTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: accent }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          TAB: READ
         ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {activeTab === 'read' && (
          <motion.div
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── BODY TEXT ───────────────────────────────────────────── */}
            <section className="py-20 md:py-28 px-8 md:px-16 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Column 1: first two paragraphs */}
                <div className="space-y-7">
                  {bodyFirst.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                      className="text-base md:text-lg text-[#f4ecd8]/75 font-sans leading-[1.85]"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                {/* Column 2: rest of paragraphs */}
                <div className="space-y-7">
                  {bodyRest.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
                      className="text-base md:text-lg text-[#f4ecd8]/75 font-sans leading-[1.85]"
                    >
                      {para}
                    </motion.p>
                  ))}

                  {/* Quote */}
                  {content.quote && (
                    <motion.blockquote
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative pl-6 mt-10 border-l-2"
                      style={{ borderColor: accent }}
                    >
                      <p className="font-serif italic text-xl md:text-2xl text-[#f4ecd8]/88 leading-snug mb-3">
                        "{content.quote.text}"
                      </p>
                      {content.quote.attribution && (
                        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#f4ecd8]/40">
                          — {content.quote.attribution}
                        </p>
                      )}
                    </motion.blockquote>
                  )}
                </div>
              </div>
            </section>

            {/* ── GALLERY ─────────────────────────────────────────────── */}
            {galleryImages.length > 1 && (
              <section className="px-4 md:px-8 pb-20 max-w-[1600px] mx-auto">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-6 px-4 font-sans text-[9px] tracking-[0.38em] uppercase text-[#f4ecd8]/30"
                >
                  Gallery
                </motion.p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
                  {galleryImages.map((src, i) => {
                    const isLarge = i === 0;
                    return (
                      <motion.div
                        key={src + i}
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.06 }}
                        className={`relative overflow-hidden group ${
                          isLarge ? 'md:col-span-2 md:row-span-2' : ''
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1100ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-[#020d08]/20 group-hover:bg-[#020d08]/5 transition-colors duration-700" />
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── HIGHLIGHTS ──────────────────────────────────────────── */}
            {content.highlights && content.highlights.length > 0 && (
              <section className="py-16 md:py-24 px-8 md:px-16 border-t border-[#0d2d1e]">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-14"
                  >
                    <div>
                      <p
                        className="mb-3 font-sans text-[9px] tracking-[0.38em] uppercase"
                        style={{ color: accent }}
                      >
                        Highlights
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl text-[#f4ecd8]">
                        What defines this realm
                      </h2>
                    </div>
                    <div className="hidden md:block h-[1px] w-24 bg-[#0d2d1e]" />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0d2d1e]">
                    {content.highlights.map((hl, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="bg-[#020d08] p-8 md:p-10 group hover:bg-[#0d2d1e]/50 transition-colors duration-500"
                      >
                        <div
                          className="w-8 h-[2px] mb-5 transition-all duration-500 group-hover:w-16"
                          style={{ backgroundColor: accent }}
                        />
                        <h3 className="font-serif text-xl md:text-2xl text-[#f4ecd8] mb-3 leading-snug">
                          {hl.title}
                        </h3>
                        <p className="font-sans text-sm text-[#f4ecd8]/55 leading-relaxed">
                          {hl.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
            {/* ── DID YOU KNOW ────────────────────────────────────────── */}
            {content.didYouKnow && content.didYouKnow.length > 0 && (
              <section className="py-16 md:py-24 px-8 md:px-16 border-t border-[#0d2d1e]">
                <div className="max-w-7xl mx-auto">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 font-sans text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: accent }}
                  >
                    Did You Know
                  </motion.p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {content.didYouKnow.map((fact, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="flex gap-5"
                      >
                        <span
                          className="font-serif italic text-2xl shrink-0 select-none"
                          style={{ color: accent }}
                        >
                          ✦
                        </span>
                        <p className="font-sans text-base text-[#f4ecd8]/70 leading-relaxed">
                          {fact}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
        
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB: VISIT & DO
           ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'visit' && (
          <motion.div
            key="visit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <section className="py-20 md:py-28 px-8 md:px-16 max-w-7xl mx-auto">
              {content.thingsToDo && content.thingsToDo.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-14"
                  >
                    <p
                      className="mb-3 font-sans text-[9px] tracking-[0.38em] uppercase"
                      style={{ color: accent }}
                    >
                      Experiences
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-[#f4ecd8]">
                      Things to do & see
                    </h2>
                  </motion.div>

                  <div className="space-y-px bg-[#0d2d1e]">
                    {content.thingsToDo.map((thing, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-[#020d08] flex items-start gap-6 px-8 md:px-10 py-6 md:py-7 group hover:bg-[#0d2d1e]/60 transition-colors duration-400"
                      >
                        <span
                          className="font-serif italic text-2xl shrink-0 mt-0.5 select-none"
                          style={{ color: accent }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-base text-[#f4ecd8]/75 leading-relaxed group-hover:text-[#f4ecd8]/90 transition-colors">
                          {thing}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="font-serif text-xl text-[#f4ecd8]/40 italic">
                    Visit experiences coming soon for this realm.
                  </p>
                </div>
              )}

              {/* Best time to visit */}
              {content.bestTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-20 flex items-center gap-6 p-8 md:p-10 border border-[#0d2d1e]"
                >
                  <span className="font-serif italic text-3xl shrink-0" style={{ color: accent }}>◐</span>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#f4ecd8]/30 mb-2">
                      Best Time to Visit
                    </p>
                    <p className="font-serif text-lg md:text-xl text-[#f4ecd8]/85">
                      {content.bestTime}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Local tip */}
              {content.localTip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 p-8 md:p-10 border-l-2"
                  style={{ borderColor: accent }}
                >
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#f4ecd8]/30 mb-3">
                    Local Tip
                  </p>
                  <p className="font-serif italic text-lg text-[#f4ecd8]/85 leading-relaxed">
                    {content.localTip}
                  </p>
                </motion.div>
              )}

              {/* Warnings */}
              {content.warnings && content.warnings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 p-8 md:p-10 border border-[#3a1f1f] bg-[#1a0d0d]/40"
                >
                  <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#e8a87c]/70 mb-4">
                    Good to Know
                  </p>
                  <div className="space-y-3">
                    {content.warnings.map((w, i) => (
                      <p key={i} className="font-sans text-sm text-[#f4ecd8]/65 leading-relaxed">
                        ⚠ {w}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}

              
              {/* Best time to visit */}
              {content.keyFacts && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-20 p-8 md:p-10 border border-[#0d2d1e]"
                >
                  <p
                    className="mb-5 font-sans text-[9px] tracking-[0.38em] uppercase"
                    style={{ color: accent }}
                  >
                    Quick Reference
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {content.keyFacts.map((fact, i) => (
                      <div key={i}>
                        <p className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/30 mb-2">
                          {fact.label}
                        </p>
                        <p className="font-serif text-[#f4ecd8]/80 leading-snug">{fact.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          RELATED REALMS
         ══════════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 px-8 md:px-16 border-t border-[#0d2d1e]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-end justify-between"
            >
              <div>
                <p
                  className="mb-2 font-sans text-[9px] tracking-[0.38em] uppercase"
                  style={{ color: accent }}
                >
                  Continue exploring
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-[#f4ecd8]">
                  Related Realms
                </h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((s, i) => {
                const a = accentMap[s.id] ?? '#3a9e6e';
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link
                      href={`${base}/realm/${s.id}`}
                      className="group relative block overflow-hidden aspect-[3/4] bg-[#0d2d1e]"
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-[1.05] transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/95 via-[#020d08]/30 to-transparent" />
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                        style={{ backgroundColor: a }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-1.5" style={{ color: a }}>
                          {categoryLabel[s.id] ?? ''}
                        </p>
                        <h3 className="font-serif text-[#f4ecd8] text-base md:text-lg leading-tight">
                          {s.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PREV / NEXT
         ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 border-t border-[#0d2d1e]">
        <Link
          href={`${base}/realm/${prev.id}`}
          className="group relative overflow-hidden flex items-center gap-5 px-8 md:px-14 py-10 border-r border-[#0d2d1e] hover:bg-[#0d2d1e]/40 transition-colors duration-400"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-[#f4ecd8]/25 group-hover:text-[#f4ecd8]/65 transition-colors shrink-0">
            <path d="M22 8H2M9 1L2 8l7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/22 mb-1">Previous</p>
            <p className="font-serif text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">
              {prev.title}
            </p>
          </div>
        </Link>
        <Link
          href={`${base}/realm/${next.id}`}
          className="group relative overflow-hidden flex items-center justify-end gap-5 px-8 md:px-14 py-10 hover:bg-[#0d2d1e]/40 transition-colors duration-400"
        >
          <div className="text-right">
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/22 mb-1">Next</p>
            <p className="font-serif text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">
              {next.title}
            </p>
          </div>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-[#f4ecd8]/25 group-hover:text-[#f4ecd8]/65 transition-colors shrink-0">
            <path d="M0 8h20M13 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
