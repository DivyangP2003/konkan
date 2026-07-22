import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '@/data/sections';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

/* ── Category groups — mirrors the navbar mega-menu grouping ───────────
   Kept as a single source of truth would be ideal (see notes), but is
   duplicated here in the same pattern the rest of the codebase already
   uses (navbar.tsx / footer.tsx / portal-grid.tsx each keep their own
   copy) so this file is safe to drop in without touching existing ones. */
const categories = [
  {
    id: 'heritage-culture',
    label: 'Heritage & Culture',
    color: '#c17f3a',
    ids: [
      'history', 'culture', 'art', 'music', 'festivals', 'local-festivals', 'personalities',
      'language-dialects', 'religious-mosaic', 'weddings-rituals', 'handicrafts',
      'freedom-struggle', 'maritime-history', 'textiles-costume', 'forts-of-konkan', 'literature-poets',
    ],
  },
  {
    id: 'nature-ecology',
    label: 'Nature & Ecology',
    color: '#3a9e6e',
    ids: [
      'geography', 'ecology', 'flora-fauna', 'beaches',
      'monsoon', 'geology-coastline', 'sacred-groves', 'wildlife-sanctuaries',
    ],
  },
  {
    id: 'life-sustenance',
    label: 'Life & Sustenance',
    color: '#d45f2a',
    ids: ['cuisine', 'village', 'agriculture', 'fishing-traditions'],
  },
  {
    id: 'travel-discovery',
    label: 'Travel & Discovery',
    color: '#2a8fb5',
    ids: [
      'tourism', 'ecotourism', 'hidden-gems', 'adventure',
      'konkan-railway', 'water-sports', 'homestays', 'diaspora',
    ],
  },
];

const accentMap: Record<string, string> = {};
const categoryOfId: Record<string, (typeof categories)[0]> = {};
categories.forEach(cat => cat.ids.forEach(id => {
  accentMap[id] = cat.color;
  categoryOfId[id] = cat;
}));

export default function ExplorePage() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const [activeCat, setActiveCat] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return sections.filter(s => {
      const inCat = activeCat === 'all' || categoryOfId[s.id]?.id === activeCat;
      const inQuery = query.trim() === '' ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.desc.toLowerCase().includes(query.toLowerCase());
      return inCat && inQuery;
    });
  }, [activeCat, query]);

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          HEADER
         ══════════════════════════════════════════════════════════════ */}
      <div className="pt-40 md:pt-48 pb-16 md:pb-20 px-8 md:px-16 border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-sans text-[10px] tracking-[0.4em] uppercase text-[#3a9e6e]"
          >
            Browse All Realms
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-none mb-6"
          >
            {sections.length} facets of<br />
            <span className="italic text-[#3a9e6e]">one extraordinary coast.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#f4ecd8]/45 max-w-xl leading-relaxed"
          >
            Every realm is a different lens on Konkan — history, food, ecology, faith,
            adventure. Filter by world, or search for what you're curious about.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FILTER BAR
         ══════════════════════════════════════════════════════════════ */}
      <div className="sticky top-[64px] z-30 bg-[#020d08]/95 backdrop-blur-md border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat('all')}
              className="px-4 py-2 text-[9px] font-sans tracking-[0.22em] uppercase border transition-colors duration-300"
              style={
                activeCat === 'all'
                  ? { borderColor: '#f4ecd8', color: '#020d08', backgroundColor: '#f4ecd8' }
                  : { borderColor: 'rgba(244,236,216,0.18)', color: 'rgba(244,236,216,0.55)' }
              }
            >
              All ({sections.length})
            </button>
            {categories.map(cat => {
              const count = sections.filter(s => categoryOfId[s.id]?.id === cat.id).length;
              const isActive = activeCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className="px-4 py-2 text-[9px] font-sans tracking-[0.22em] uppercase border transition-colors duration-300"
                  style={
                    isActive
                      ? { borderColor: cat.color, color: '#020d08', backgroundColor: cat.color }
                      : { borderColor: `${cat.color}40`, color: `${cat.color}cc` }
                  }
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative md:ml-auto md:w-64">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search realms…"
              className="w-full bg-transparent border border-[#0d2d1e] focus:border-[#3a9e6e]/50 outline-none px-4 py-2 text-sm font-sans text-[#f4ecd8]/85 placeholder:text-[#f4ecd8]/25 transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          GRID
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-xl text-[#f4ecd8]/40 italic">
                No realms match "{query}".
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((s, i) => {
                  const accent = accentMap[s.id] ?? '#3a9e6e';
                  const cat = categoryOfId[s.id];
                  return (
                    <motion.div
                      layout
                      key={s.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: i * 0.02 }}
                    >
                      <Link
                        href={`${base}/realm/${s.id}`}
                        className="group relative block overflow-hidden aspect-[3/4] bg-[#0d2d1e]"
                      >
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.06] transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/95 via-[#020d08]/35 to-transparent" />
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                          style={{ backgroundColor: accent }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                          <p className="text-[8px] tracking-[0.3em] uppercase font-sans mb-1.5" style={{ color: accent }}>
                            {cat?.label ?? ''}
                          </p>
                          <h3 className="font-serif text-[#f4ecd8] text-base md:text-lg leading-tight mb-1.5">
                            {s.title}
                          </h3>
                          <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                            {s.desc}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
