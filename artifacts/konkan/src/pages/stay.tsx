import { useState, useMemo } from 'react';
import { Search, Map as MapIcon, Grid3X3, Star, MapPin, Phone, ArrowRight, Wifi, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { DestinationMap } from '../components/destination-map';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import {
  sampleAccommodations,
  accommodationTypeOptions,
  priceRangeOptions,
  amenitiesOptions,
  type Accommodation,
} from '../data/accommodations';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { cn } from '../lib/utils';

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
];

const typeColors: Record<string, string> = {
  hotel: '#2a8fb5',
  resort: '#c17f3a',
  homestay: '#3a9e6e',
  beach_shack: '#d45f2a',
  heritage: '#8b5e3a',
  eco_lodge: '#5a8b3a',
};

const priceRangeDisplay: Record<string, { symbol: string; color: string }> = {
  budget: { symbol: '₹', color: '#3a9e6e' },
  mid: { symbol: '₹₹', color: '#c17f3a' },
  luxury: { symbol: '₹₹₹', color: '#d4af37' },
};

function AccomCard({ accommodation, onContact }: { accommodation: Accommodation; onContact: () => void }) {
  const accent = typeColors[accommodation.type] ?? '#3a9e6e';
  const priceDisplay = priceRangeDisplay[accommodation.priceRange] ?? { symbol: '₹', color: '#3a9e6e' };
  const image = accommodation.images[0] ?? '/assets/homestays.jpg';
  const typeLabel = accommodationTypeOptions.find(t => t.value === accommodation.type)?.label ?? accommodation.type;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={image}
          alt={accommodation.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-4 left-4 flex gap-1.5">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: accent, color: '#020d08' }}
          >
            {typeLabel}
          </span>
          {accommodation.featured && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#f4ecd8]/90 text-[#020d08] px-2.5 py-1">
              Featured
            </span>
          )}
        </div>

        {/* Rating */}
        {accommodation.averageRating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#020d08]/80 backdrop-blur-sm px-2.5 py-1">
            <Star className="w-3 h-3 fill-[#c17f3a] text-[#c17f3a]" />
            <span className="text-[11px] font-sans text-[#f4ecd8]">
              {accommodation.averageRating} ({accommodation.reviewCount})
            </span>
          </div>
        )}

        {/* Price overlay bottom */}
        <div className="absolute bottom-4 left-4">
          <span className="font-serif text-2xl" style={{ color: priceDisplay.color }}>
            {accommodation.priceMin ? `₹${accommodation.priceMin.toLocaleString()}` : priceDisplay.symbol}
          </span>
          {accommodation.priceMin && (
            <span className="font-sans text-xs text-[#f4ecd8]/45 ml-1">per night</span>
          )}
        </div>

        {/* Left accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Text content */}
      <div className="p-5 border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-[2px] h-3.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
          <span className="text-[8.5px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/45">
            {accommodation.destinationName}
            {' · '}
            <span style={{ color: priceDisplay.color }}>{priceDisplay.symbol}</span>
          </span>
        </div>

        <h3 className="font-serif text-lg text-[#f4ecd8] mb-2 leading-tight">
          {accommodation.name}
        </h3>

        <p className="font-sans text-[13px] text-[#f4ecd8]/50 leading-relaxed line-clamp-2 mb-4">
          {accommodation.description}
        </p>

        {/* Amenity pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {accommodation.amenities.slice(0, 4).map(a => (
            <span key={a} className="text-[9px] font-sans tracking-[0.1em] px-2 py-0.5 border border-[#0d2d1e] text-[#f4ecd8]/40">
              {a}
            </span>
          ))}
          {accommodation.amenities.length > 4 && (
            <span className="text-[9px] font-sans tracking-[0.1em] px-2 py-0.5 text-[#f4ecd8]/30">
              +{accommodation.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4 text-[10px] font-sans text-[#f4ecd8]/30">
          {accommodation.familyFriendly && <span>Family Friendly</span>}
          {accommodation.petFriendly && <span>· Pet Friendly</span>}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-[#0d2d1e]">
          {accommodation.contactPhone && (
            <a
              href={`tel:${accommodation.contactPhone}`}
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans border border-[#0d2d1e] hover:border-[#3a9e6e]/40 text-[#f4ecd8]/45 hover:text-[#3a9e6e] py-2.5 transition-all duration-300"
            >
              <Phone className="w-3 h-3" /> Contact
            </a>
          )}
          {accommodation.bookingUrl ? (
            <a
              href={accommodation.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans py-2.5 transition-all duration-300"
              style={{ backgroundColor: accent, color: '#020d08' }}
            >
              Book Now <ArrowRight className="w-3 h-3" />
            </a>
          ) : (
            <button
              className="flex-1 flex items-center justify-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans py-2.5 transition-all duration-300 group-hover:gap-2.5"
              style={{ backgroundColor: accent, color: '#020d08' }}
            >
              View Details <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StayPage() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showPetFriendly, setShowPetFriendly] = useState(false);
  const [showFamilyFriendly, setShowFamilyFriendly] = useState(false);

  const toggleFilter = (value: string, list: string[], setter: (l: string[]) => void) =>
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const filteredAccommodations = useMemo(() => {
    let results = [...sampleAccommodations];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.destinationName?.toLowerCase().includes(q)
      );
    }
    if (selectedTypes.length > 0) results = results.filter(a => selectedTypes.includes(a.type));
    if (selectedPriceRanges.length > 0) results = results.filter(a => selectedPriceRanges.includes(a.priceRange));
    if (selectedAmenities.length > 0) results = results.filter(a => selectedAmenities.every(am => a.amenities.includes(am)));
    if (showFeatured) results = results.filter(a => a.featured);
    if (showPetFriendly) results = results.filter(a => a.petFriendly);
    if (showFamilyFriendly) results = results.filter(a => a.familyFriendly);

    switch (sortBy) {
      case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)); break;
      case 'price_low': results.sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0)); break;
      case 'price_high': results.sort((a, b) => (b.priceMax || 0) - (a.priceMax || 0)); break;
    }
    return results;
  }, [searchQuery, selectedTypes, selectedPriceRanges, selectedAmenities, showFeatured, showPetFriendly, showFamilyFriendly, sortBy]);

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/homestays.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#020d08]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/15 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/75 via-[#020d08]/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c17f3a] via-[#c17f3a]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pb-20 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9.5px] tracking-[0.5em] uppercase font-sans text-[#c17f3a] mb-5"
          >
            Where to Rest
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] text-[#f4ecd8] leading-none mb-6"
          >
            Stay in Konkan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-sans text-base text-[#f4ecd8]/55 max-w-lg leading-relaxed"
          >
            From luxury beachfront resorts to intimate Konkani homestays where the host is family and every meal is cooked with love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { value: 'Homestays', label: 'Authentic & Personal' },
              { value: 'Resorts', label: 'Beachfront Luxury' },
              { value: 'Eco Lodges', label: 'Nature & Solitude' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-xl text-[#c17f3a]">{stat.value}</p>
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
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/25" />
              <input
                type="text"
                placeholder="Search accommodations…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-[#0d2d1e] focus:border-[#c17f3a]/40 outline-none pl-10 pr-4 py-2.5 text-sm font-sans text-[#f4ecd8]/85 placeholder:text-[#f4ecd8]/22 transition-colors duration-300"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-transparent border-[#0d2d1e] text-[#f4ecd8]/60 text-sm focus:border-[#c17f3a]/40">
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

            <button
              onClick={() => setShowMap(v => !v)}
              className={cn(
                'flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase font-sans px-4 py-2.5 border transition-all duration-300',
                showMap
                  ? 'border-[#c17f3a] text-[#c17f3a] bg-[#c17f3a]/10'
                  : 'border-[#0d2d1e] text-[#f4ecd8]/35 hover:border-[#c17f3a]/35 hover:text-[#f4ecd8]/65'
              )}
            >
              {showMap ? <Grid3X3 className="w-3.5 h-3.5" /> : <MapIcon className="w-3.5 h-3.5" />}
              {showMap ? 'Grid View' : 'Map View'}
            </button>
          </div>

          <div className="pb-3 text-[10px] font-sans text-[#f4ecd8]/22 tracking-[0.12em]">
            {filteredAccommodations.length} accommodation{filteredAccommodations.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-[#0d2d1e]">
          <div className="sticky top-[105px] p-8 overflow-y-auto max-h-[calc(100vh-105px)] space-y-6">
            <h2 className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#f4ecd8]/30">Filters</h2>

            {/* Quick */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#c17f3a] mb-3">Quick Filters</p>
              <div className="space-y-2.5">
                {[
                  { id: 'featured', label: 'Featured', checked: showFeatured, set: () => setShowFeatured(v => !v) },
                  { id: 'pet', label: 'Pet Friendly', checked: showPetFriendly, set: () => setShowPetFriendly(v => !v) },
                  { id: 'family', label: 'Family Friendly', checked: showFamilyFriendly, set: () => setShowFamilyFriendly(v => !v) },
                ].map(f => (
                  <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                        f.checked ? 'border-[#c17f3a] bg-[#c17f3a]' : 'border-[#0d2d1e] group-hover:border-[#c17f3a]/50'
                      )}
                      onClick={f.set}
                    >
                      {f.checked && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                    </div>
                    <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{f.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#0d2d1e]" />

            {/* Type */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#c17f3a] mb-3">Accommodation Type</p>
              <div className="space-y-2.5">
                {accommodationTypeOptions.map(o => (
                  <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                        selectedTypes.includes(o.value) ? 'border-[#c17f3a] bg-[#c17f3a]' : 'border-[#0d2d1e] group-hover:border-[#c17f3a]/50'
                      )}
                      onClick={() => toggleFilter(o.value, selectedTypes, setSelectedTypes)}
                    >
                      {selectedTypes.includes(o.value) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                    </div>
                    <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{o.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#0d2d1e]" />

            {/* Price */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#c17f3a] mb-3">Price Range</p>
              <div className="space-y-2.5">
                {priceRangeOptions.map(o => (
                  <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                        selectedPriceRanges.includes(o.value) ? 'border-[#c17f3a] bg-[#c17f3a]' : 'border-[#0d2d1e] group-hover:border-[#c17f3a]/50'
                      )}
                      onClick={() => toggleFilter(o.value, selectedPriceRanges, setSelectedPriceRanges)}
                    >
                      {selectedPriceRanges.includes(o.value) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                    </div>
                    <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{o.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-[#0d2d1e]" />

            {/* Amenities */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#c17f3a] mb-3">Amenities</p>
              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {amenitiesOptions.map(am => (
                  <label key={am} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                        selectedAmenities.includes(am) ? 'border-[#c17f3a] bg-[#c17f3a]' : 'border-[#0d2d1e] group-hover:border-[#c17f3a]/50'
                      )}
                      onClick={() => toggleFilter(am, selectedAmenities, setSelectedAmenities)}
                    >
                      {selectedAmenities.includes(am) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                    </div>
                    <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{am}</span>
                  </label>
                ))}
              </div>
            </div>

            {(selectedTypes.length > 0 || selectedPriceRanges.length > 0 || selectedAmenities.length > 0 || showFeatured || showPetFriendly || showFamilyFriendly) && (
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedPriceRanges([]);
                  setSelectedAmenities([]);
                  setShowFeatured(false);
                  setShowPetFriendly(false);
                  setShowFamilyFriendly(false);
                }}
                className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#d45f2a] hover:text-[#e07040] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Grid / Map */}
        <main className="flex-1 px-6 md:px-10 py-10">
          {showMap ? (
            <DestinationMap
              destinations={filteredAccommodations.map(acc => ({
                id: acc.id,
                slug: acc.slug,
                name: acc.name,
                region: 'central' as const,
                type: 'city' as const,
                coordinates: acc.coordinates,
                description: acc.description,
                highlights: acc.amenities,
                bestTime: [],
                activities: [],
                images: acc.images,
              }))}
              height="calc(100vh - 280px)"
            />
          ) : filteredAccommodations.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAccommodations.map(acc => (
                  <AccomCard
                    key={acc.id}
                    accommodation={acc}
                    onContact={() => acc.contactPhone && window.open(`tel:${acc.contactPhone}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-32">
              <p className="font-serif text-2xl text-[#f4ecd8]/25 italic mb-6">
                No accommodations match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedPriceRanges([]);
                  setSelectedAmenities([]);
                  setShowFeatured(false);
                  setShowPetFriendly(false);
                  setShowFamilyFriendly(false);
                }}
                className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#c17f3a] hover:text-[#d49050] transition-colors"
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
