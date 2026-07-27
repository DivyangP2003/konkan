import { useState, useMemo } from 'react';
import { Search, Map as MapIcon, Grid3X3, Star, MapPin, ArrowRight, Waves, CloudRain, Sun } from 'lucide-react';
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
  island: '#2a7fb5',
};

// Season tabs
const seasonTabs = [
  { value: 'all', label: 'All Seasons', icon: null },
  { value: 'monsoon', label: 'Monsoon', subtitle: 'Jun–Sep', icon: CloudRain, color: '#2a8fb5' },
  { value: 'winter', label: 'Winter', subtitle: 'Oct–Mar', icon: Waves, color: '#c17f3a' },
  { value: 'summer', label: 'Summer', subtitle: 'Apr–May', icon: Sun, color: '#3a9e6e' },
] as const;

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
          {destination.islandGetaway && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#2a7fb5]/90 text-[#f4ecd8] px-2 py-0.5">
              Island
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
          <span
            className="text-[8px] tracking-[0.25em] uppercase font-sans"
            style={{ color: accent }}
          >
            {destination.type}
          </span>
          <span className="text-[#0d2d1e]">·</span>
          <span className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40">
            {destination.region} konkan
          </span>
        </div>
        <h3 className="font-serif text-xl text-[#f4ecd8] mb-2 group-hover:text-[#c17f3a] transition-colors duration-300">
          {destination.name}
        </h3>
        <p className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed mb-4 line-clamp-2">
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          {destination.distanceFromMumbai && (
            <div className="flex items-center gap-1 text-[10px] font-sans text-[#f4ecd8]/40">
              <MapPin className="w-2.5 h-2.5" />
              {destination.distanceFromMumbai} km
            </div>
          )}
          <div
            className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase font-sans ml-auto"
            style={{ color: accent }}
          >
            Explore <ArrowRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Section header component for special sections
function SectionHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="h-px flex-1" style={{ backgroundColor: `${accent}30` }} />
      <div className="text-center">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans mb-1" style={{ color: accent }}>
          {subtitle}
        </p>
        <h2 className="font-serif text-2xl text-[#f4ecd8]">{title}</h2>
      </div>
      <div className="h-px flex-1" style={{ backgroundColor: `${accent}30` }} />
    </div>
  );
}

// Island card — wider format for island getaways
function IslandCard({ destination, onClick }: { destination: Destination; onClick: () => void }) {
  const image = destination.images[0] ?? '/assets/coastal-landscape.jpg';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer relative flex border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-500 overflow-hidden"
      onClick={onClick}
    >
      <div className="relative w-48 shrink-0 overflow-hidden">
        <img
          src={image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020d08]/60" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2a7fb5] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#2a7fb5]">
              Island Getaway
            </span>
            {destination.averageRating && (
              <>
                <span className="text-[#0d2d1e]">·</span>
                <div className="flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-[#c17f3a] text-[#c17f3a]" />
                  <span className="text-[10px] font-sans text-[#f4ecd8]/60">
                    {destination.averageRating}
                  </span>
                </div>
              </>
            )}
          </div>
          <h3 className="font-serif text-lg text-[#f4ecd8] mb-2 group-hover:text-[#2a7fb5] transition-colors duration-300">
            {destination.name}
          </h3>
          <p className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed line-clamp-2">
            {destination.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1 flex-wrap">
            {destination.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                className="text-[8px] tracking-wider uppercase font-sans px-2 py-0.5 border border-[#0d2d1e] text-[#f4ecd8]/40"
              >
                {h.length > 30 ? h.slice(0, 28) + '…' : h}
              </span>
            ))}
          </div>
          <ArrowRight className="w-4 h-4 text-[#2a7fb5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 ml-2" />
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationsPage() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showMap, setShowMap] = useState(false);
  const [activeSeason, setActiveSeason] = useState<'all' | 'monsoon' | 'winter' | 'summer'>('all');
  const [filters, setFilters] = useState<DestinationFilters>({
    regions: [],
    types: [],
    difficulties: [],
    activities: [],
    featured: false,
    trending: false,
    hidden: false,
  });

  const resetFilters = () => {
    setFilters({ regions: [], types: [], difficulties: [], activities: [], featured: false, trending: false, hidden: false });
    setActiveSeason('all');
  };

  // Helper to check if a destination fits a season
  const monthToSeason = (month: string): string => {
    const monsoonMonths = ['June', 'July', 'August', 'September'];
    const summerMonths = ['April', 'May'];
    if (monsoonMonths.includes(month)) return 'monsoon';
    if (summerMonths.includes(month)) return 'summer';
    return 'winter';
  };

  const filteredDestinations = useMemo(() => {
    let results = [...sampleDestinations];

    // Season filter
    if (activeSeason !== 'all') {
      results = results.filter(d => {
        if (d.bestSeason === 'all') return true;
        if (d.bestSeason === activeSeason) return true;
        // derive from bestTime months
        return d.bestTime.some(m => monthToSeason(m) === activeSeason);
      });
    }

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
  }, [searchQuery, filters, sortBy, activeSeason]);

  // Separate special categories (only when no active filters)
  const hasActiveFilters = filters.regions.length > 0 || filters.types.length > 0 ||
    filters.difficulties.length > 0 || filters.activities.length > 0 ||
    filters.featured || filters.trending || filters.hidden || searchQuery.length > 0;

  const hiddenGems = useMemo(
    () => sampleDestinations.filter(d => d.hidden && !d.islandGetaway),
    []
  );
  const islandGetaways = useMemo(
    () => sampleDestinations.filter(d => d.islandGetaway),
    []
  );
  const mainDestinations = useMemo(
    () => sampleDestinations.filter(d => !d.hidden && !d.islandGetaway),
    []
  );

  // When filtering, show a flat grid; when not filtering, show sections
  const showSections = !hasActiveFilters && activeSeason === 'all';

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/coastal-landscape.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/80 via-transparent to-transparent" />

        <div className="relative z-10 px-10 md:px-16 pb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] uppercase font-sans text-[#3a9e6e] mb-4"
          >
            Discover Konkan
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-[#f4ecd8] leading-none mb-6"
          >
            Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-[#f4ecd8]/65 text-base leading-relaxed mb-10 max-w-xl"
          >
            From ancient sea forts rising from the Arabian Sea to hidden jungle
            beaches draped in monsoon mist — every corner of the Konkan
            coast holds a different story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex gap-12 flex-wrap"
          >
            {[
              { value: '720 km', label: 'Of Coastline' },
              { value: '3 Regions', label: 'North · Central · South' },
              { value: `${sampleDestinations.length}+`, label: 'Destinations' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-serif text-2xl md:text-3xl text-[#3a9e6e]">{stat.value}</div>
                <div className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/45 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ SEASON TABS ═══════════════════════════════════════════════════════ */}
      <div className="border-b border-[#0d2d1e] px-6 md:px-10 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {seasonTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSeason === tab.value;
            const color = 'color' in tab ? tab.color : '#f4ecd8';
            return (
              <button
                key={tab.value}
                onClick={() => setActiveSeason(tab.value)}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap',
                  isActive ? 'border-current' : 'border-transparent'
                )}
                style={{ color: isActive ? color : '#f4ecd8' + '50', borderColor: isActive ? color : 'transparent' }}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span className="text-[11px] tracking-[0.2em] uppercase font-sans">{tab.label}</span>
                {'subtitle' in tab && (
                  <span
                    className="text-[9px] tracking-wide font-sans opacity-60 hidden sm:inline"
                    style={{ color: isActive ? color : undefined }}
                  >
                    {tab.subtitle}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ SEARCH + CONTROLS ══════════════════════════════════════════════════ */}
      <div className="border-b border-[#0d2d1e] px-6 md:px-10 py-5 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/30" />
          <input
            type="search"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-[#0d2d1e] pl-10 pr-4 py-2.5 text-sm font-sans text-[#f4ecd8] placeholder:text-[#f4ecd8]/30 focus:outline-none focus:border-[#3a9e6e] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <DestinationFiltersMobile filters={filters} onChange={setFilters} onReset={resetFilters} />

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44 bg-transparent border-[#0d2d1e] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={() => setShowMap(!showMap)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 border text-[11px] tracking-[0.15em] uppercase font-sans transition-colors duration-300',
              showMap
                ? 'border-[#3a9e6e] text-[#3a9e6e] bg-[#3a9e6e]/10'
                : 'border-[#0d2d1e] text-[#f4ecd8]/50 hover:border-[#3a9e6e] hover:text-[#3a9e6e]'
            )}
          >
            <MapIcon className="w-4 h-4" />
            Map View
          </button>
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
          ) : showSections ? (
            // ── Sectioned view (no active filters) ──────────────────────────
            <div className="space-y-20">
              {/* Main destinations */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e] mb-1">
                      Explore Konkan
                    </p>
                    <h2 className="font-serif text-2xl text-[#f4ecd8]">Featured Destinations</h2>
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-sans text-[#f4ecd8]/30">
                    {mainDestinations.length} places
                  </span>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mainDestinations.map(dest => (
                      <DestCard
                        key={dest.id}
                        destination={dest}
                        onClick={() => navigate(`/place/${dest.slug}`)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Hidden Gems section */}
              <div>
                <SectionHeader
                  title="Hidden Gems"
                  subtitle="Off the Beaten Path"
                  accent="#d45f2a"
                />
                <p className="font-sans text-sm text-[#f4ecd8]/55 mb-8 max-w-xl">
                  The places the crowds haven't found yet. Quieter, wilder, and often
                  more rewarding — these are the Konkan destinations the locals love.
                </p>
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {hiddenGems.map(dest => (
                      <DestCard
                        key={dest.id}
                        destination={dest}
                        onClick={() => navigate(`/place/${dest.slug}`)}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Island Getaways section */}
              <div>
                <SectionHeader
                  title="Island Getaways"
                  subtitle="Surrounded by Sea"
                  accent="#2a7fb5"
                />
                <p className="font-sans text-sm text-[#f4ecd8]/55 mb-8 max-w-xl">
                  The Konkan coast is studded with islands — some holding ancient forts,
                  others offering nothing but sea, sky, and silence. All require a boat.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {islandGetaways.map(dest => (
                    <IslandCard
                      key={dest.id}
                      destination={dest}
                      onClick={() => navigate(`/place/${dest.slug}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : filteredDestinations.length > 0 ? (
            // ── Filtered flat grid ───────────────────────────────────────────
            <div>
              <p className="text-[10px] tracking-widest uppercase font-sans text-[#f4ecd8]/40 mb-8">
                {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
              </p>
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
            </div>
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
