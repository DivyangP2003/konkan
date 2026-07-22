import { useParams, useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { locations, categoryColors, type Location } from '@/data/locations';
import { sections } from '@/data/sections';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

/* ── Category → label ────────────────────────────────────────────────── */
const catLabel: Record<Location['category'], string> = {
  heritage: 'Heritage', nature: 'Nature', beach: 'Beach',
  culture: 'Culture', adventure: 'Adventure',
};

/* ── Category → related realm ids (cross-links into the Realms content) ─
   Lets a place page point at the topical realms that explain the "why"
   behind what's on the ground here.                                     */
const categoryRealmIds: Record<Location['category'], string[]> = {
  heritage:  ['forts-of-konkan', 'history', 'maritime-history', 'personalities'],
  nature:    ['ecology', 'flora-fauna', 'wildlife-sanctuaries', 'geography'],
  beach:     ['beaches', 'water-sports', 'tourism', 'hidden-gems'],
  culture:   ['culture', 'cuisine', 'handicrafts', 'festivals'],
  adventure: ['adventure', 'water-sports', 'ecotourism', 'hidden-gems'],
};

const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]));

/* ────────────────────────────────────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────────────────────────────────── */
export default function PlacePage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const base  = import.meta.env.BASE_URL.replace(/\/$/, '');
  const id    = params.id ?? '';
  const place = locations.find(l => l.id === id);

  if (!place) {
    navigate(`${base}/`);
    return null;
  }

  const accent = categoryColors[place.category];
  const label  = catLabel[place.category];

  /* Related places: same category first, then fill with same region, excluding self */
  const sameCategory = locations.filter(l => l.id !== id && l.category === place.category);
  const sameRegion    = locations.filter(l => l.id !== id && l.region === place.region && l.category !== place.category);
  const relatedPlaces = [...sameCategory, ...sameRegion].slice(0, 4);

  /* Related realms based on category */
  const relatedRealms = (categoryRealmIds[place.category] ?? [])
    .map(rid => sectionMap[rid])
    .filter(Boolean) as typeof sections;

  const currentIndex = locations.findIndex(l => l.id === id);
  const prev = locations[(currentIndex - 1 + locations.length) % locations.length];
  const next = locations[(currentIndex + 1) % locations.length];

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: '92vh', minHeight: 520 }}>
        <motion.img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(1.15)' }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/60 via-transparent to-transparent" />

        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(to right, ${accent}, transparent 60%)` }}
        />

        {/* Back link */}
        <motion.a
          href={`${base}/#map`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-28 left-8 md:left-16 flex items-center gap-2.5 text-[9px] tracking-[0.32em] uppercase font-sans text-[#f4ecd8]/45 hover:text-[#f4ecd8] transition-colors duration-300"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M14 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          The Konkan Shore
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
            {label} · {place.region}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-5 max-w-3xl"
          >
            {place.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="font-serif italic text-lg md:text-xl text-[#f4ecd8]/65 max-w-xl leading-snug"
          >
            "{place.tagline}"
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          QUICK FACTS BAR
         ══════════════════════════════════════════════════════════════ */}
      <div className="border-y border-[#0d2d1e] bg-[#020d08]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3">
          <div className="px-8 md:px-10 py-6 md:py-7 border-r border-[#0d2d1e]">
            <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/30 mb-2">Region</p>
            <p className="font-serif text-sm md:text-base text-[#f4ecd8]/90 leading-snug">{place.region}</p>
          </div>
          <div className="px-8 md:px-10 py-6 md:py-7 md:border-r border-[#0d2d1e]">
            <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/30 mb-2">Character</p>
            <p className="font-serif text-sm md:text-base text-[#f4ecd8]/90 leading-snug" style={{ color: accent }}>{label}</p>
          </div>
          <div className="hidden md:block px-8 md:px-10 py-6 md:py-7">
            <p className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/30 mb-2">Known For</p>
            <p className="font-serif text-sm md:text-base text-[#f4ecd8]/90 leading-snug">{place.highlights[0]}</p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BODY
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Description */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="text-base md:text-lg text-[#f4ecd8]/75 font-sans leading-[1.85]"
            >
              {place.description}
            </motion.p>
          </div>

          {/* Highlights sidebar */}
          <div>
            <p className="mb-5 font-sans text-[9px] tracking-[0.38em] uppercase" style={{ color: accent }}>
              What Not to Miss
            </p>
            <div className="space-y-px bg-[#0d2d1e]">
              {place.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#020d08] flex items-start gap-4 px-5 py-4 group hover:bg-[#0d2d1e]/50 transition-colors duration-300"
                >
                  <span className="font-serif italic text-lg shrink-0" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-sans text-sm text-[#f4ecd8]/75 leading-relaxed pt-0.5">{h}</p>
                </motion.div>
              ))}
            </div>

            <a
              href={`${base}/#map`}
              className="mt-6 inline-flex items-center gap-2 text-[9px] font-sans tracking-[0.28em] uppercase transition-all duration-300 hover:gap-3"
              style={{ color: accent }}
            >
              View on the full coast map
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          RELATED REALMS — the topics this place connects to
         ══════════════════════════════════════════════════════════════ */}
      {relatedRealms.length > 0 && (
        <section className="py-16 md:py-24 px-8 md:px-16 border-t border-[#0d2d1e]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="mb-2 font-sans text-[9px] tracking-[0.38em] uppercase" style={{ color: accent }}>
                Go deeper
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f4ecd8]">
                Realms behind {place.name}
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {relatedRealms.map((s, i) => (
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <h3 className="font-serif text-[#f4ecd8] text-base md:text-lg leading-tight">
                        {s.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          NEARBY / RELATED PLACES
         ══════════════════════════════════════════════════════════════ */}
      {relatedPlaces.length > 0 && (
        <section className="py-16 md:py-24 px-8 md:px-16 border-t border-[#0d2d1e]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="mb-2 font-sans text-[9px] tracking-[0.38em] uppercase" style={{ color: accent }}>
                Continue along the coast
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-[#f4ecd8]">
                Nearby & Related Places
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {relatedPlaces.map((l, i) => {
                const a = categoryColors[l.category];
                return (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link
                      href={`${base}/place/${l.id}`}
                      className="group relative block overflow-hidden aspect-[3/4] bg-[#0d2d1e]"
                    >
                      <img
                        src={l.image}
                        alt={l.name}
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
                          {catLabel[l.category]}
                        </p>
                        <h3 className="font-serif text-[#f4ecd8] text-base md:text-lg leading-tight">
                          {l.name}
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
          href={`${base}/place/${prev.id}`}
          className="group relative overflow-hidden flex items-center gap-5 px-8 md:px-14 py-10 border-r border-[#0d2d1e] hover:bg-[#0d2d1e]/40 transition-colors duration-400"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-[#f4ecd8]/25 group-hover:text-[#f4ecd8]/65 transition-colors shrink-0">
            <path d="M22 8H2M9 1L2 8l7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/22 mb-1">Previous</p>
            <p className="font-serif text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">
              {prev.name}
            </p>
          </div>
        </Link>
        <Link
          href={`${base}/place/${next.id}`}
          className="group relative overflow-hidden flex items-center justify-end gap-5 px-8 md:px-14 py-10 hover:bg-[#0d2d1e]/40 transition-colors duration-400"
        >
          <div className="text-right">
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/22 mb-1">Next</p>
            <p className="font-serif text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">
              {next.name}
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
