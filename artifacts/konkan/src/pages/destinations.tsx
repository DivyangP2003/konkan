import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Map as MapIcon, Grid3X3, Star, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { DestinationMap } from '../components/destination-map';
import {
  DestinationFiltersSidebar,
  DestinationFiltersMobile,
  type DestinationFilters,
} from '../components/destination-filters';
import { sampleDestinations, type Destination } from '../data/destinations';
import { useLocation } from 'wouter';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { cn } from '../lib/utils';

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'distance', label: 'Nearest to Mumbai' },
  { value: 'trending', label: 'Trending' },
];

const typeColors: Record<string, string> = {
  beach: '#2a8fb5',
  fort: '#c17f3a',
  temple: '#d45f2a',
  village: '#3a9e6e',
  hill: '#8b7355',
  city: '#6b5a8e',
};

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  difficult: 'Difficult',
};

function DestCard({ destination, onClick }: { destination: Destination; onClick: () => void }) {
  const accent = typeColors[destination.type] ?? '#3a9e6e';
  const image = destination.images[0] ?? '/assets/coastal-landscape.jpg';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer relative"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/40 to-transparent" />

        {/* Badges top-left */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {destination.featured && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#c17f3a] text-[#020d08] px-2 py-0.5">
              Featured
            </span>
          )}
          {destination.trending && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#3a9e6e] text-[#020d08] px-2 py-0.5">
              Trending
            </span>
          )}
          {destination.hidden && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#d45f2a]/90 text-[#f4ecd8] px-2 py-0.5">
              Hidden Gem
            </span>
          )}
        </div>

        {/* Rating top-right */}
        {destination.averageRating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#020d08]/75 backdrop-blur-sm px-2.5 py-1">
            <Star className="w-3 h-3 fill-[#c17f3a] text-[#c17f3a]" />
            <span className="text-[11px] font-sans text-[#f4ecd8]">
              {destination.averageRating} ({destination.reviewCount})
            </span>
          </div>
        )}

        {/* Left accent bar on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Text content */}
      <div className="p-5 border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-[2px] h-3.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
          <span className="text-[8.5px] tracking-[0.28em] uppercase font-sans" style={{ color: accent }}>
            {destination.type} · {destination.region === 'north' ? 'North' : destination.region === 'central' ? 'Central' : 'South'} Konkan
          </span>
        </div>

        <h3 className="font-serif text-xl text-[#f4ecd8] mb-2 leading-tight">
          {destination.name}
        </h3>

        <p className="font-sans text-[13px] text-[#f4ecd8]/50 leading-relaxed line-clamp-2 mb-4">
          {destination.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[#0d2d1e]">
          {destination.distanceFromMumbai ? (
            <div className="flex items-center gap-1.5 text-[#f4ecd8]/30">
              <MapPin className="w-3 h-3" />
              <span className="text-[11px] font-sans">{destination.distanceFromMumbai} km from Mumbai</span>
            </div>
          ) : <div />}

          <div
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-[0.18em] uppercase transition-all duration-300 group-hover:gap-3"
            style={{ color: accent }}
          >
            Explore <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationsPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  const [filters, setFilters] = useState<DestinationFilters>({
    regions: [],
    types: [],
    difficulties: [],
    activities: [],
    featured: false,
    trending: false,
    hidden: false,
  });

  const resetFilters = () =>
    setFilters({ regions: [], types: [], difficulties: [], activities: [], featured: false, trending: false, hidden: false });

  const filteredDestinations = useMemo(() => {
    let results = [...sampleDestinations];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.highlights.some(h => h.toLowerCase().includes(q))
      );
    }
    if (filters.regions.length > 0) results = results.filter(d => filters.regions.includes(d.region));
    if (filters.types.length > 0) results = results.filter(d => filters.types.includes(d.type));
    if (filters.difficulties.length > 0) results = results.filter(d => d.difficulty && filters.difficulties.includes(d.difficulty));
    if (filters.activities.length > 0) results = results.filter(d => filters.activities.some(a => d.activities.includes(a)));
    if (filters.featured) results = results.filter(d => d.featured);
    if (filters.trending) results = results.filter(d => d.trending);
    if (filters.hidden) results = results.filter(d => d.hidden);

    switch (sortBy) {
      case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)); break;
      case 'distance': results.sort((a, b) => (a.distanceFromMumbai || 999) - (b.distanceFromMumbai || 999)); break;
      case 'trending': results.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return (b.averageRating || 0) - (a.averageRating || 0);
      }); break;
    }
    return results;
  }, [searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/coastal-landscape.jpg')` }}
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-[#020d08]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/20 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/70 via-[#020d08]/20 to-transparent" />

        {/* Top color accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3a9e6e] via-[#3a9e6e]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pb-20 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9.5px] tracking-[0.5em] uppercase font-sans text-[#3a9e6e] mb-5"
          >
            Discover Konkan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] text-[#f4ecd8] leading-none mb-6"
          >
            Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-sans text-base text-[#f4ecd8]/55 max-w-lg leading-relaxed"
          >
            From ancient sea forts rising from the Arabian Sea to hidden jungle beaches draped in monsoon mist — every corner of the Konkan coast holds a different story.
          </motion.p>

          {/* Stat row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { value: '720 km', label: 'Of Coastline' },
              { value: '3 Regions', label: 'North · Central · South' },
              { value: '5+ Types', label: 'Beach, Fort, Temple…' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-2xl text-[#c17f3a]">{stat.value}</p>
                <p className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/35 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ STICKY CONTROLS ═══════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-[#020d08]/96 backdrop-blur-md border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="py-4 flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/25" />
              <input
                type="text"
                placeholder="Search destinations…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-[#0d2d1e] focus:border-[#3a9e6e]/40 outline-none pl-10 pr-4 py-2.5 text-sm font-sans text-[#f4ecd8]/85 placeholder:text-[#f4ecd8]/22 transition-colors duration-300"
              />
            </div>

            {/* Mobile filter */}
            <DestinationFiltersMobile filters={filters} onChange={setFilters} onReset={resetFilters} />

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 bg-transparent border-[#0d2d1e] text-[#f4ecd8]/60 text-sm focus:border-[#3a9e6e]/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#020d08] border-[#0d2d1e] text-[#f4ecd8]">
                {sortOptions.map(o => (
                  <SelectItem key={o.value} value={o.value} className="focus:bg-[#0d2d1e] focus:text-[#f4ecd8]">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Map toggle */}
            <button
              onClick={() => setShowMap(v => !v)}
              className={cn(
                'flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase font-sans px-4 py-2.5 border transition-all duration-300',
                showMap
                  ? 'border-[#3a9e6e] text-[#3a9e6e] bg-[#3a9e6e]/10'
                  : 'border-[#0d2d1e] text-[#f4ecd8]/35 hover:border-[#3a9e6e]/35 hover:text-[#f4ecd8]/65'
              )}
            >
              {showMap ? <Grid3X3 className="w-3.5 h-3.5" /> : <MapIcon className="w-3.5 h-3.5" />}
              {showMap ? 'Grid View' : 'Map View'}
            </button>
          </div>

          {/* Result count */}
          <div className="pb-3 text-[10px] font-sans text-[#f4ecd8]/22 tracking-[0.12em]">
            {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-[#0d2d1e]">
          <div className="sticky top-[105px] p-8 overflow-y-auto max-h-[calc(100vh-105px)]">
            <DestinationFiltersSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
          </div>
        </aside>

        {/* Grid / Map */}
        <main className="flex-1 px-6 md:px-10 py-10">
          {showMap ? (
            <DestinationMap
              destinations={filteredDestinations}
              height="calc(100vh - 280px)"
              onMarkerClick={d => navigate(`/place/${d.slug}`)}
            />
          ) : filteredDestinations.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map(dest => (
                  <DestCard
                    key={dest.id}
                    destination={dest}
                    onClick={() => navigate(`/place/${dest.slug}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-32">
              <p className="font-serif text-2xl text-[#f4ecd8]/25 italic mb-6">
                No destinations match your search.
              </p>
              <button
                onClick={resetFilters}
                className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#3a9e6e] hover:text-[#4ab57e] transition-colors"
              >
                Clear all filters →
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
