import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Hotel, Utensils, Compass, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { sampleDestinations } from '@/data/destinations';
import { sampleAccommodations } from '@/data/accommodations';
import { sampleBusinesses } from '@/data/businesses';
import { cn } from '@/lib/utils';

type ResultKind = 'destination' | 'stay' | 'business' | 'page';

interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  accent?: string;
}

const PAGE_LINKS: SearchResult[] = [
  { id: 'p-destinations', kind: 'page', title: 'Destinations', subtitle: 'Explore all Konkan places', href: '/destinations', accent: '#3a9e6e' },
  { id: 'p-stay', kind: 'page', title: 'Stay', subtitle: 'Homestays, resorts & more', href: '/stay', accent: '#c17f3a' },
  { id: 'p-food', kind: 'page', title: 'Food', subtitle: 'Authentic Konkan cuisine', href: '/food', accent: '#d45f2a' },
  { id: 'p-activities', kind: 'page', title: 'Activities', subtitle: 'Things to do', href: '/activities', accent: '#2a8fb5' },
  { id: 'p-adventure', kind: 'page', title: 'Adventure', subtitle: 'Treks, water sports & more', href: '/adventure', accent: '#3a9e6e' },
  { id: 'p-plan', kind: 'page', title: 'Plan Your Trip', subtitle: 'Build your Konkan itinerary', href: '/plan', accent: '#c17f3a' },
  { id: 'p-booking', kind: 'page', title: 'Book Transport', subtitle: 'Trains, buses, ferries & cabs', href: '/booking', accent: '#2a8fb5' },
  { id: 'p-businesses', kind: 'page', title: 'Local Businesses', subtitle: 'Guides, eateries, artisans', href: '/businesses', accent: '#3a9e6e' },
  { id: 'p-culture', kind: 'page', title: 'Culture', subtitle: 'Art, music & traditions', href: '/culture', accent: '#c17f3a' },
  { id: 'p-heritage', kind: 'page', title: 'Heritage', subtitle: 'Forts, temples & history', href: '/heritage', accent: '#8b5e3a' },
  { id: 'p-spiritual', kind: 'page', title: 'Spiritual', subtitle: 'Sacred temples & pilgrimages', href: '/spiritual', accent: '#d45f2a' },
  { id: 'p-seasonal', kind: 'page', title: 'Seasonal Guide', subtitle: 'Best time to visit', href: '/seasonal', accent: '#3a9e6e' },
];

const KIND_META: Record<ResultKind, { label: string; icon: typeof Search; color: string }> = {
  destination: { label: 'Destination', icon: MapPin,  color: '#3a9e6e' },
  stay:        { label: 'Stay',        icon: Hotel,   color: '#c17f3a' },
  business:    { label: 'Business',   icon: Compass, color: '#2a8fb5' },
  page:        { label: 'Page',        icon: ArrowRight, color: '#f4ecd8' },
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [...PAGE_LINKS];

  sampleDestinations.forEach((d) => {
    results.push({
      id: `dest-${d.id}`,
      kind: 'destination',
      title: d.name,
      subtitle: `${d.type} · ${d.region} Konkan · ${d.distanceFromMumbai ?? '?'} km from Mumbai`,
      href: `/destinations`,
      image: d.images[0],
      accent: '#3a9e6e',
    });
  });

  sampleAccommodations.slice(0, 10).forEach((a) => {
    results.push({
      id: `stay-${a.id}`,
      kind: 'stay',
      title: a.name,
      subtitle: `${a.type} · ${a.destinationName ?? ''} · ${a.priceRange}`,
      href: `/stay`,
      image: a.images[0],
      accent: '#c17f3a',
    });
  });

  sampleBusinesses.forEach((b) => {
    results.push({
      id: `biz-${b.id}`,
      kind: 'business',
      title: b.name,
      subtitle: `${b.category} · ${b.destinationName}`,
      href: `/businesses`,
      image: b.images[0],
      accent: '#2a8fb5',
    });
  });

  return results;
}

const SEARCH_INDEX = buildIndex();

const POPULAR = ['Alibaug', 'Tarkarli', 'Malvan', 'Ganpatipule', 'Plan your trip', 'Book transport'];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSelect(href: string) {
    const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';
    navigate(href);
    onClose();
  }

  function handlePopular(label: string) {
    setQuery(label);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#020d08]/85 backdrop-blur-md z-[200]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-[#0a1f14] border border-[#1a4a30] shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0d2d1e]">
                <Search className="w-4 h-4 text-[#3a9e6e] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, stays, activities…"
                  className="flex-1 bg-transparent text-[#f4ecd8] placeholder-[#f4ecd8]/30 font-sans text-sm outline-none"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30 border border-[#0d2d1e] px-2 py-1 hover:text-[#f4ecd8]/60 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              {results.length > 0 ? (
                <ul className="max-h-[55vh] overflow-y-auto divide-y divide-[#0d2d1e]">
                  {results.map((r) => {
                    const KMeta = KIND_META[r.kind];
                    return (
                      <li key={r.id}>
                        <button
                          onClick={() => handleSelect(r.href)}
                          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#0d2d1e]/70 transition-colors text-left group"
                        >
                          {r.image ? (
                            <img
                              src={r.image}
                              alt={r.title}
                              className="w-9 h-9 object-cover shrink-0"
                            />
                          ) : (
                            <div
                              className="w-9 h-9 flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${KMeta.color}18` }}
                            >
                              <KMeta.icon className="w-3.5 h-3.5" style={{ color: KMeta.color }} />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm text-[#f4ecd8] group-hover:text-white transition-colors truncate">
                              {r.title}
                            </p>
                            <p className="text-[10px] font-sans text-[#f4ecd8]/40 truncate">{r.subtitle}</p>
                          </div>

                          <span
                            className="text-[7px] tracking-[0.2em] uppercase font-sans px-1.5 py-0.5 shrink-0"
                            style={{ color: KMeta.color, backgroundColor: `${KMeta.color}18`, border: `1px solid ${KMeta.color}30` }}
                          >
                            {KMeta.label}
                          </span>

                          <ArrowRight className="w-3 h-3 text-[#f4ecd8]/20 group-hover:text-[#f4ecd8]/50 transition-colors shrink-0" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : query ? (
                <div className="py-12 text-center">
                  <p className="font-sans text-sm text-[#f4ecd8]/30">No results for "{query}"</p>
                  <p className="text-[10px] font-sans text-[#f4ecd8]/20 mt-1">Try a destination name, activity, or page</p>
                </div>
              ) : (
                /* Default state — popular searches */
                <div className="p-5">
                  <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePopular(p)}
                        className="text-[10px] font-sans text-[#f4ecd8]/50 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/80 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#0d2d1e]">
                    <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">Quick Links</p>
                    <div className="grid grid-cols-2 gap-1">
                      {PAGE_LINKS.slice(0, 6).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSelect(p.href)}
                          className="flex items-center gap-2 p-2.5 text-left hover:bg-[#0d2d1e]/70 transition-colors group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.accent }} />
                          <span className="text-[10px] font-sans text-[#f4ecd8]/60 group-hover:text-[#f4ecd8]/80">
                            {p.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-[#0d2d1e] bg-[#020d08]/40 flex items-center gap-4">
                <span className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/20">
                  ↑↓ navigate · Enter select · Esc close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
