import { useState, useMemo } from 'react';
import { Search, Star, Phone, Clock, ArrowRight, UtensilsCrossed, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  sampleRestaurants,
  cuisineTypeOptions,
  restaurantPriceRangeOptions,
  type Restaurant,
} from '../data/restaurants';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { cn } from '../lib/utils';

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
];

const cuisineColors: Record<string, string> = {
  seafood: '#2a8fb5',
  vegetarian: '#3a9e6e',
  traditional: '#c17f3a',
  fusion: '#8b5e9e',
  street_food: '#d45f2a',
};

const priceColors: Record<string, string> = {
  budget: '#3a9e6e',
  mid: '#c17f3a',
  expensive: '#d4af37',
};

const priceSymbols: Record<string, string> = {
  budget: '₹',
  mid: '₹₹',
  expensive: '₹₹₹',
};

const mustTryDishDetails = [
  { name: 'Fish Curry Rice', desc: 'The soul of every Konkani meal — tangy, coconut-based curry with fresh catch of the day', region: 'All of Konkan', icon: '🐟' },
  { name: 'Sol Kadhi', desc: 'A digestive cooler made from kokum and coconut milk, the perfect end to a heavy meal', region: 'All of Konkan', icon: '🥥' },
  { name: 'Bombil Fry', desc: 'Bombay duck — thin, crispy fried fish with turmeric and chili. Street food staple', region: 'North Konkan', icon: '🍳' },
  { name: 'Malvani Chicken', desc: 'Fiery, dry-roasted Malvani masala transforms chicken into something extraordinary', region: 'South Konkan', icon: '🌶️' },
  { name: 'Modak', desc: 'Steamed rice dumplings filled with jaggery and coconut. Lord Ganesha\'s favourite', region: 'All of Konkan', icon: '🍡' },
  { name: 'Vada Pav', desc: 'Maharashtra\'s beloved street sandwich — spiced potato fritter in a soft bun', region: 'North Konkan', icon: '🫓' },
  { name: 'Puran Poli', desc: 'Sweet flatbread filled with chana dal and jaggery, cooked on a hot tawa with ghee', region: 'Central Konkan', icon: '🫓' },
  { name: 'Crab Masala', desc: 'Fresh blue crab slow-cooked in a fiery coconut masala. Best eaten with your hands', region: 'South Konkan', icon: '🦀' },
  { name: 'Prawns Koliwada', desc: 'Crispy fried prawns with a signature spice coating, named after the fishing communities', region: 'All of Konkan', icon: '🦐' },
];

function RestCard({ restaurant }: { restaurant: Restaurant }) {
  const accent = cuisineColors[restaurant.cuisineType] ?? '#3a9e6e';
  const priceColor = priceColors[restaurant.priceRange] ?? '#3a9e6e';
  const image = restaurant.images[0] ?? '/assets/konkani-thali.jpg';
  const cuisineLabel = cuisineTypeOptions.find(c => c.value === restaurant.cuisineType)?.label ?? restaurant.cuisineType;
  const priceSymbol = priceSymbols[restaurant.priceRange] ?? '₹';
  const hours = restaurant.openingHours?.['Mon-Sun'] ?? Object.values(restaurant.openingHours ?? {})[0];

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
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/25 to-transparent" />

        {/* Cuisine badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: accent, color: '#020d08' }}
          >
            {cuisineLabel}
          </span>
        </div>

        {/* Rating */}
        {restaurant.averageRating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#020d08]/80 backdrop-blur-sm px-2.5 py-1">
            <Star className="w-3 h-3 fill-[#c17f3a] text-[#c17f3a]" />
            <span className="text-[11px] font-sans text-[#f4ecd8]">
              {restaurant.averageRating} ({restaurant.reviewCount})
            </span>
          </div>
        )}

        {/* Left accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Content */}
      <div className="p-5 border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-[2px] h-3.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            <span className="text-[8.5px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/45">
              {restaurant.destinationName}
            </span>
          </div>
          <span className="font-serif text-base" style={{ color: priceColor }}>
            {priceSymbol}
          </span>
        </div>

        <h3 className="font-serif text-lg text-[#f4ecd8] mb-2 leading-tight">
          {restaurant.name}
        </h3>

        <p className="font-sans text-[13px] text-[#f4ecd8]/50 leading-relaxed line-clamp-2 mb-4">
          {restaurant.description}
        </p>

        {/* Must try */}
        <div className="mb-4">
          <p className="text-[8px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/25 mb-2 flex items-center gap-1">
            <UtensilsCrossed className="w-2.5 h-2.5" /> Must Try
          </p>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.specialties.slice(0, 3).map(s => (
              <span key={s} className="text-[9px] font-sans tracking-[0.08em] px-2 py-0.5 border border-[#0d2d1e] text-[#f4ecd8]/40">
                {s}
              </span>
            ))}
            {restaurant.specialties.length > 3 && (
              <span className="text-[9px] font-sans text-[#f4ecd8]/25 px-1 py-0.5">+{restaurant.specialties.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Hours */}
        {hours && (
          <div className="flex items-center gap-1.5 text-[#f4ecd8]/30 mb-4">
            <Clock className="w-3 h-3" />
            <span className="text-[11px] font-sans">{hours}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-[#0d2d1e]">
          {restaurant.contactPhone && (
            <a
              href={`tel:${restaurant.contactPhone}`}
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans border border-[#0d2d1e] hover:border-[#3a9e6e]/40 text-[#f4ecd8]/45 hover:text-[#3a9e6e] py-2.5 transition-all duration-300"
            >
              <Phone className="w-3 h-3" /> Call
            </a>
          )}
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans py-2.5 transition-all duration-300 group-hover:gap-2.5"
            style={{ backgroundColor: accent, color: '#020d08' }}
          >
            View Menu <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FoodPage() {
  
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);

  const toggleFilter = (value: string, list: string[], setter: (l: string[]) => void) =>
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const filteredRestaurants = useMemo(() => {
    let results = [...sampleRestaurants];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.destinationName?.toLowerCase().includes(q) ||
        r.specialties.some(s => s.toLowerCase().includes(q))
      );
    }
    if (selectedCuisines.length > 0) results = results.filter(r => selectedCuisines.includes(r.cuisineType));
    if (selectedPriceRanges.length > 0) results = results.filter(r => selectedPriceRanges.includes(r.priceRange));
    if (showFeatured) results = results.filter(r => r.featured);

    switch (sortBy) {
      case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)); break;
    }
    return results;
  }, [searchQuery, selectedCuisines, selectedPriceRanges, showFeatured, sortBy]);

  const clearFilters = () => {
    setSelectedCuisines([]);
    setSelectedPriceRanges([]);
    setShowFeatured(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/konkani-thali.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#020d08]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/15 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/80 via-[#020d08]/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d45f2a] via-[#d45f2a]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pb-20 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9.5px] tracking-[0.5em] uppercase font-sans text-[#d45f2a] mb-5"
          >
            Culinary Guide
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] text-[#f4ecd8] leading-none mb-6"
          >
            The Konkan<br />
            <span className="italic text-[#c17f3a]">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-sans text-base text-[#f4ecd8]/55 max-w-lg leading-relaxed"
          >
            Fresh from the sea, tempered with coconut and Malvani spices, served on banana leaf — Konkani cuisine is an act of love as much as nourishment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-8"
          >
            {[
              { value: 'Seafood', label: 'Fresh Daily Catch' },
              { value: 'Coconut', label: 'In Every Curry' },
              { value: 'Malvani', label: 'Signature Spice Blend' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="font-serif text-xl text-[#d45f2a]">{stat.value}</p>
                <p className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/35 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ TAB BAR ═══════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 z-30 bg-[#020d08]/96 backdrop-blur-md border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center gap-0 pt-3">
            {[
              { key: 'restaurants', label: 'Restaurants' },
              { key: 'dishes', label: 'Must-Try Dishes' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'restaurants' | 'dishes')}
                className={cn(
                  'pb-3 px-1 mr-8 text-[10px] tracking-[0.25em] uppercase font-sans border-b-2 transition-all duration-300',
                  activeTab === tab.key
                    ? 'border-[#d45f2a] text-[#d45f2a]'
                    : 'border-transparent text-[#f4ecd8]/35 hover:text-[#f4ecd8]/65'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'restaurants' && (
            <div className="py-3 flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f4ecd8]/25" />
                <input
                  type="text"
                  placeholder="Search restaurants or dishes…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-[#0d2d1e] focus:border-[#d45f2a]/40 outline-none pl-10 pr-4 py-2.5 text-sm font-sans text-[#f4ecd8]/85 placeholder:text-[#f4ecd8]/22 transition-colors duration-300"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-transparent border-[#0d2d1e] text-[#f4ecd8]/60 text-sm focus:border-[#d45f2a]/40">
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
              <div className="pb-1 text-[10px] font-sans text-[#f4ecd8]/22 tracking-[0.12em]">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ RESTAURANTS TAB ════════════════════════════════════════════════════ */}
      {activeTab === 'restaurants' && (
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 border-r border-[#0d2d1e]">
            <div className="sticky top-[105px] p-8 overflow-y-auto max-h-[calc(100vh-105px)] space-y-6">
              <h2 className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#f4ecd8]/30">Filters</h2>

              {/* Featured */}
              <div>
                <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Quick Filters</p>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    className={cn(
                      'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                      showFeatured ? 'border-[#d45f2a] bg-[#d45f2a]' : 'border-[#0d2d1e] group-hover:border-[#d45f2a]/50'
                    )}
                    onClick={() => setShowFeatured(v => !v)}
                  >
                    {showFeatured && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                  </div>
                  <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">Featured Only</span>
                </label>
              </div>

              <div className="h-[1px] bg-[#0d2d1e]" />

              {/* Cuisine Type */}
              <div>
                <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Cuisine Type</p>
                <div className="space-y-2.5">
                  {cuisineTypeOptions.map(o => (
                    <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={cn(
                          'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                          selectedCuisines.includes(o.value) ? 'border-[#d45f2a] bg-[#d45f2a]' : 'border-[#0d2d1e] group-hover:border-[#d45f2a]/50'
                        )}
                        onClick={() => toggleFilter(o.value, selectedCuisines, setSelectedCuisines)}
                      >
                        {selectedCuisines.includes(o.value) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cuisineColors[o.value] }} />
                        <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{o.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-[#0d2d1e]" />

              {/* Price Range */}
              <div>
                <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Price Range</p>
                <div className="space-y-2.5">
                  {restaurantPriceRangeOptions.map(o => (
                    <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={cn(
                          'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                          selectedPriceRanges.includes(o.value) ? 'border-[#d45f2a] bg-[#d45f2a]' : 'border-[#0d2d1e] group-hover:border-[#d45f2a]/50'
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

              {(selectedCuisines.length > 0 || selectedPriceRanges.length > 0 || showFeatured) && (
                <button onClick={clearFilters} className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#d45f2a] hover:text-[#e07040] transition-colors">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Restaurant Grid */}
          <main className="flex-1 px-6 md:px-10 py-10">
            {filteredRestaurants.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRestaurants.map(rest => (
                    <RestCard key={rest.id} restaurant={rest} />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="text-center py-32">
                <p className="font-serif text-2xl text-[#f4ecd8]/25 italic mb-6">No restaurants found.</p>
                <button onClick={clearFilters} className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] hover:text-[#e07040] transition-colors">
                  Clear all filters →
                </button>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ══ DISHES TAB ══════════════════════════════════════════════════════════ */}
      {activeTab === 'dishes' && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#d45f2a] mb-4">The Essential Plates</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f4ecd8] mb-4 leading-tight">
              Must-Try Konkani Dishes
            </h2>
            <p className="font-sans text-base text-[#f4ecd8]/45 max-w-xl leading-relaxed mb-14">
              Dishes that have nourished generations of Konkani families — from the fishing villages of Murud to the ghats of Goa.
            </p>
          </motion.div>

          {/* Dishes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {mustTryDishDetails.map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative overflow-hidden border border-[#0d2d1e] hover:border-[#1a4a30] transition-all duration-300 p-6"
              >
                {/* Number */}
                <div className="absolute top-4 right-4 font-serif text-5xl text-[#0d2d1e] group-hover:text-[#122a1e] transition-colors leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="text-3xl mb-4">{dish.icon}</div>

                <h3 className="font-serif text-xl text-[#f4ecd8] mb-2 leading-tight pr-10">
                  {dish.name}
                </h3>

                <p className="font-sans text-[13px] text-[#f4ecd8]/45 leading-relaxed mb-4">
                  {dish.desc}
                </p>

                <div className="flex items-center gap-1.5 text-[#f4ecd8]/25">
                  <div className="w-3 h-[1px] bg-[#d45f2a]" />
                  <span className="text-[9px] tracking-[0.2em] uppercase font-sans text-[#d45f2a]/70">{dish.region}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Food culture section */}
          <div className="border-t border-[#0d2d1e] pt-16">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#2a8fb5] mb-4">The Sea</p>
                <h3 className="font-serif text-3xl text-[#f4ecd8] mb-5 leading-tight">Fresh from the Arabian Sea</h3>
                <p className="font-sans text-sm text-[#f4ecd8]/50 leading-relaxed mb-5">
                  Being a coastal region, seafood dominates Konkan cuisine. Fresh catch of the day, traditional fishing methods,
                  and age-old recipes create an unforgettable culinary experience.
                </p>
                <ul className="space-y-3 font-sans text-sm text-[#f4ecd8]/45">
                  {['Pomfret, Surmai, Bangda & Prawns are most prized', 'Coconut-based gravies and Sol Kadhi for digestion', 'Malvani masala — the signature spice blend'].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#2a8fb5] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#c17f3a] mb-4">The Seasons</p>
                <h3 className="font-serif text-3xl text-[#f4ecd8] mb-5 leading-tight">A Year-Round Culinary Calendar</h3>
                <p className="font-sans text-sm text-[#f4ecd8]/50 leading-relaxed mb-5">
                  Konkan cuisine celebrates seasons with special dishes. Alphonso mangoes in summer, monsoon delicacies,
                  and festival foods create a rhythm of flavour throughout the year.
                </p>
                <ul className="space-y-3 font-sans text-sm text-[#f4ecd8]/45">
                  {['Alphonso Mango season (April–May)', 'Monsoon: Bhajis, pakodas, and masala chai', 'Festivals: Modak, Puran Poli, Ukdiche Modak'].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-[#c17f3a] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
