import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '@/data/sections';

// ── Realm categories for mega menu ─────────────────────────────────────────
const megaCategories = [
  {
    label: 'Heritage & Culture',
    color: '#c17f3a',
    ids: [
      'history', 'culture', 'art', 'music', 'festivals', 'local-festivals', 'personalities',
      'language-dialects', 'religious-mosaic', 'weddings-rituals', 'handicrafts',
      'freedom-struggle', 'maritime-history', 'textiles-costume', 'forts-of-konkan', 'literature-poets',
    ],
  },
  {
    label: 'Nature & Ecology',
    color: '#3a9e6e',
    ids: [
      'geography', 'ecology', 'flora-fauna', 'beaches',
      'monsoon', 'geology-coastline', 'sacred-groves', 'wildlife-sanctuaries',
    ],
  },
  {
    label: 'Life & Sustenance',
    color: '#d45f2a',
    ids: ['cuisine', 'village', 'agriculture', 'fishing-traditions'],
  },
  {
    label: 'Travel & Discovery',
    color: '#2a8fb5',
    ids: [
      'tourism', 'ecotourism', 'hidden-gems', 'adventure',
      'konkan-railway', 'water-sports', 'homestays', 'diaspora',
    ],
  },
];

const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]));

// ── Primary nav items ───────────────────────────────────────────────────────
const primaryLinks = [
  { label: 'Story',   href: '/#discover' },
  { label: 'Map',     href: '/#map'      },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [megaOpen, setMegaOpen]   = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCat, setDrawerCat] = useState<number | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [location]);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────────── */}
      <nav
        ref={megaRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled || megaOpen
            ? 'bg-[#f7f2eb]/95 backdrop-blur-xl border-b border-[#d8c8bb] shadow-[0_4px_60px_rgba(0,0,0,0.12)]'
            : 'bg-gradient-to-b from-black/45 via-black/20 to-transparent'
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-14 py-4 md:py-5">

          {/* Logo */}
          <Link
            href={`${base}/`}
            className={cn(
              'text-[28px] font-serif tracking-[0.18em] font-light select-none shrink-0 z-10 transition-colors duration-500',
              scrolled || megaOpen
                ? 'text-[#800020]'
                : 'text-[#f4ecd8]'
            )}
          >
            K.
          </Link>

          {/* Desktop centre links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Explore mega trigger */}
            <button
              onClick={() => setMegaOpen(o => !o)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 text-[11px] tracking-[0.22em] uppercase font-sans transition-all duration-300 group relative',
                scrolled || megaOpen
                  ? 'text-[#800020]'
                  : 'text-[#f4ecd8]/85 hover:text-white'
              )}
            >
              Explore
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={11} strokeWidth={2} />
              </motion.span>
              {megaOpen && (
                <span 
                  className={cn(
                  "absolute bottom-0 left-4 right-4 h-[1px]",
                  scrolled || megaOpen
                    ? "bg-[#800020]"
                    : "bg-[#f4ecd8]"
                )}
                  />
              )}
            </button>

            {primaryLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMegaOpen(false)}
                className={cn(
                  'relative px-4 py-2.5 text-[11px] tracking-[0.22em] uppercase font-sans transition-colors duration-300 group',
                  scrolled || megaOpen
                    ? 'text-[#800020]'
                    : 'text-[#f4ecd8]/85 hover:text-white'
                )}
              >
                {label}
            
                <span
                  className={cn(
                    'absolute bottom-0 left-4 right-4 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left',
                    scrolled || megaOpen
                      ? 'bg-[#800020]'
                      : 'bg-[#f4ecd8]'
                  )}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="/#carousel"
            onClick={() => setMegaOpen(false)}
            className="hidden lg:flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase font-sans text-[#f7f2eb] bg-[#7B1E3A] hover:bg-[#65162F] px-5 py-2.5 transition-colors duration-300 shrink-0"
          >
            Begin Journey
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#f4ecd8]/80 hover:text-[#f4ecd8] p-1.5 transition-colors"
            onClick={() => setDrawerOpen(o => !o)}
            aria-label="Menu"
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Mega dropdown ─────────────────────────────────────────── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="border-t border-[#0d2d1e]/60 bg-[#020d08]/98 backdrop-blur-2xl"
            >
              <div className="max-w-[1400px] mx-auto px-8 md:px-14 py-10 pb-12">
                {/* Top label */}
                <p className="text-[9px] tracking-[0.5em] uppercase font-sans text-[#f4ecd8]/25 mb-8">
                  {sections.length} realms of the konkan coast
                </p>

                {/* Category columns */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
                  {megaCategories.map(cat => (
                    <div key={cat.label}>
                      {/* Category header */}
                      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#0d2d1e]">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <span
                          className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium"
                          style={{ color: cat.color }}
                        >
                          {cat.label}
                        </span>
                      </div>

                      {/* Realm links */}
                      <div className="flex flex-col gap-1">
                        {cat.ids.map(id => {
                          const s = sectionMap[id];
                          if (!s) return null;
                          return (
                            <Link
                              key={id}
                              href={`${base}/realm/${id}`}
                              onClick={() => setMegaOpen(false)}
                              className="group flex items-center gap-3 py-2 px-1 rounded transition-all duration-200 hover:bg-[#0d2d1e]/60"
                            >
                              <div
                                className="w-[2px] h-4 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ backgroundColor: cat.color }}
                              />
                              <span className="text-[13px] font-sans text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors duration-200 leading-tight">
                                {s.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-[#0d2d1e] flex items-center justify-between">
                  <p className="text-[10px] text-[#f4ecd8]/25 font-sans tracking-[0.2em] uppercase">
                    Explore all facets of the Konkan coast
                  </p>
                  <a
                    href="/#realms"
                    onClick={() => setMegaOpen(false)}
                    className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#3a9e6e] hover:text-[#4ab57e] transition-colors duration-200 flex items-center gap-2"
                  >
                    View all realms
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Mobile full-screen drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020d08]/98 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="min-h-full px-6 pb-16 pt-24">

              {/* Primary links */}
              <div className="flex flex-col gap-1 mb-8">
                {primaryLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>

              <div className="h-[1px] bg-[#0d2d1e] mb-8" />

              {/* Realm categories accordion */}
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#f4ecd8]/25 mb-6">
                Explore Realms
              </p>

              <div className="flex flex-col gap-2">
                {megaCategories.map((cat, ci) => (
                  <div key={cat.label}>
                    <button
                      onClick={() => setDrawerCat(drawerCat === ci ? null : ci)}
                      className="w-full flex items-center justify-between py-3 border-b border-[#0d2d1e]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span
                          className="text-sm font-sans tracking-[0.15em] uppercase"
                          style={{ color: cat.color }}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: drawerCat === ci ? 180 : 0 }}>
                        <ChevronDown size={14} className="text-[#f4ecd8]/30" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {drawerCat === ci && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="py-3 pl-5 flex flex-col gap-1">
                            {cat.ids.map(id => {
                              const s = sectionMap[id];
                              if (!s) return null;
                              return (
                                <Link
                                  key={id}
                                  href={`${base}/realm/${id}`}
                                  onClick={() => setDrawerOpen(false)}
                                  className="font-serif text-xl text-[#f4ecd8]/60 hover:text-[#f4ecd8] py-1.5 transition-colors"
                                >
                                  {s.title}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/#carousel"
                onClick={() => setDrawerOpen(false)}
                className="mt-10 w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.28em] uppercase font-sans text-[#f7f2eb] bg-[#7B1E3A] hover:bg-[#65162F] py-4 transition-colors"
              >
                Begin Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
