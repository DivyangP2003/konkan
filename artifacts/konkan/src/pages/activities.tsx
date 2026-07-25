import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Star, Clock, Users, Calendar, ArrowRight, Zap, Leaf, Mountain, Waves, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  sampleActivities,
  activityCategoryOptions,
  activityDifficultyOptions,
  type Activity,
} from '../data/activities';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { cn } from '../lib/utils';

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'difficulty', label: 'Easiest First' },
];

const categoryMeta: Record<string, { color: string; icon: React.ReactNode; vibe: string }> = {
  adventure: { color: '#d45f2a', icon: <Zap className="w-4 h-4" />, vibe: 'For the Bold' },
  cultural: { color: '#c17f3a', icon: <Compass className="w-4 h-4" />, vibe: 'Discover Heritage' },
  nature: { color: '#3a9e6e', icon: <Leaf className="w-4 h-4" />, vibe: 'Into the Wild' },
  wellness: { color: '#2a8fb5', icon: <Waves className="w-4 h-4" />, vibe: 'Rest & Restore' },
  leisure: { color: '#8b5e9e', icon: <Mountain className="w-4 h-4" />, vibe: 'Easy Explorations' },
};

const difficultyMeta: Record<string, { color: string; label: string }> = {
  easy: { color: '#3a9e6e', label: 'EASY' },
  moderate: { color: '#c17f3a', label: 'MODERATE' },
  difficult: { color: '#d45f2a', label: 'DIFFICULT' },
};

function ActivityCard({ activity }: { activity: Activity }) {
  const cat = categoryMeta[activity.category] ?? categoryMeta.leisure;
  const diff = difficultyMeta[activity.difficulty] ?? difficultyMeta.easy;
  const image = activity.images[0] ?? '/assets/waterfall-forest.jpg';

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
          alt={activity.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/25 to-transparent" />

        {/* Category + Featured */}
        <div className="absolute top-4 left-4 flex gap-1.5">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1 flex items-center gap-1"
            style={{ backgroundColor: cat.color, color: '#020d08' }}
          >
            {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
          </span>
          {activity.featured && (
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans bg-[#f4ecd8]/90 text-[#020d08] px-2.5 py-1">
              Featured
            </span>
          )}
        </div>

        {/* Rating */}
        {activity.averageRating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#020d08]/80 backdrop-blur-sm px-2.5 py-1">
            <Star className="w-3 h-3 fill-[#c17f3a] text-[#c17f3a]" />
            <span className="text-[11px] font-sans text-[#f4ecd8]">
              {activity.averageRating} ({activity.reviewCount})
            </span>
          </div>
        )}

        {/* Difficulty bottom-right */}
        <div
          className="absolute bottom-4 right-4 text-[8px] tracking-[0.22em] uppercase font-sans px-2 py-0.5"
          style={{ color: diff.color, backgroundColor: `${diff.color}18`, border: `1px solid ${diff.color}40` }}
        >
          {diff.label}
        </div>

        {/* Price */}
        {activity.price && (
          <div className="absolute bottom-4 left-4">
            <span className="font-serif text-2xl text-[#f4ecd8]">
              ₹{activity.price.toLocaleString()}
            </span>
            <span className="font-sans text-xs text-[#f4ecd8]/45 ml-1">per person</span>
          </div>
        )}

        {/* Left accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: cat.color }}
        />
      </div>

      {/* Content */}
      <div className="p-5 border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-[2px] h-3.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
          <span className="text-[8.5px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/45">
            {activity.destinationName}
          </span>
        </div>

        <h3 className="font-serif text-lg text-[#f4ecd8] mb-2 leading-tight">
          {activity.name}
        </h3>

        <p className="font-sans text-[13px] text-[#f4ecd8]/50 leading-relaxed line-clamp-2 mb-4">
          {activity.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mb-4 text-[#f4ecd8]/35">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span className="text-[11px] font-sans">{activity.duration}</span>
          </div>
          {activity.familyFriendly && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              <span className="text-[11px] font-sans">Family Friendly</span>
            </div>
          )}
          {activity.bookingRequired && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              <span className="text-[11px] font-sans">Booking Required</span>
            </div>
          )}
        </div>

        {/* Best season */}
        {activity.season.length > 0 && activity.season[0] !== 'All year' && (
          <div className="mb-4">
            <span className="text-[9px] font-sans text-[#f4ecd8]/25">Best: </span>
            <span className="text-[11px] font-sans text-[#f4ecd8]/40">
              {activity.season.slice(0, 3).join(', ')}{activity.season.length > 3 ? ` +${activity.season.length - 3}` : ''}
            </span>
          </div>
        )}

        {/* CTA */}
        <div className="pt-3 border-t border-[#0d2d1e]">
          <button
            className="w-full flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans py-2.5 transition-all duration-300 group-hover:gap-3"
            style={{ backgroundColor: cat.color, color: '#020d08' }}
          >
            View Details <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ActivitiesPage() {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showFamilyFriendly, setShowFamilyFriendly] = useState(false);
  const [showBookingRequired, setShowBookingRequired] = useState(false);

  const toggleFilter = (value: string, list: string[], setter: (l: string[]) => void) =>
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);

  const filteredActivities = useMemo(() => {
    let results = [...sampleActivities];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.destinationName?.toLowerCase().includes(q)
      );
    }
    if (selectedCategories.length > 0) results = results.filter(a => selectedCategories.includes(a.category));
    if (selectedDifficulties.length > 0) results = results.filter(a => selectedDifficulties.includes(a.difficulty));
    if (showFeatured) results = results.filter(a => a.featured);
    if (showFamilyFriendly) results = results.filter(a => a.familyFriendly);
    if (showBookingRequired) results = results.filter(a => a.bookingRequired);

    switch (sortBy) {
      case 'name': results.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'rating': results.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)); break;
      case 'price_low': results.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'difficulty': {
        const order = { easy: 0, moderate: 1, difficult: 2 };
        results.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
        break;
      }
    }
    return results;
  }, [searchQuery, selectedCategories, selectedDifficulties, showFeatured, showFamilyFriendly, showBookingRequired, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() =>
    activityCategoryOptions.map(cat => ({
      ...cat,
      count: sampleActivities.filter(a => a.category === cat.value).length,
      meta: categoryMeta[cat.value] ?? categoryMeta.leisure,
    }))
  , []);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setShowFeatured(false);
    setShowFamilyFriendly(false);
    setShowBookingRequired(false);
  };

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[62vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/assets/waterfall-forest.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#020d08]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/10 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/80 via-[#020d08]/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d45f2a] via-[#c17f3a]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full pb-20 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[9.5px] tracking-[0.5em] uppercase font-sans text-[#d45f2a] mb-5"
          >
            Things to Do
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="font-serif text-6xl md:text-8xl lg:text-[6.5rem] text-[#f4ecd8] leading-none mb-6"
          >
            Experiences<br />
            <span className="italic text-[#c17f3a]">That Stay With You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-sans text-base text-[#f4ecd8]/55 max-w-lg leading-relaxed"
          >
            Dive beneath crystal waters, trek through monsoon forests, sail to unconquered sea forts, or find stillness in a dawn yoga session on the beach.
          </motion.p>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {categoryCounts.map(cat => {
              const isActive = selectedCategories.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => toggleFilter(cat.value, selectedCategories, setSelectedCategories)}
                  className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans px-3.5 py-2 border transition-all duration-300"
                  style={{
                    borderColor: isActive ? cat.meta.color : `${cat.meta.color}40`,
                    color: isActive ? '#020d08' : `${cat.meta.color}cc`,
                    backgroundColor: isActive ? cat.meta.color : 'transparent',
                  }}
                >
                  {cat.label} ({cat.count})
                </button>
              );
            })}
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
                placeholder="Search activities…"
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
            <div className="text-[10px] font-sans text-[#f4ecd8]/22 tracking-[0.12em]">
              {filteredActivities.length} activit{filteredActivities.length !== 1 ? 'ies' : 'y'} found
            </div>
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-[#0d2d1e]">
          <div className="sticky top-[93px] p-8 overflow-y-auto max-h-[calc(100vh-93px)] space-y-6">
            <h2 className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#f4ecd8]/30">Filters</h2>

            {/* Quick */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Quick Filters</p>
              <div className="space-y-2.5">
                {[
                  { id: 'featured', label: 'Featured', checked: showFeatured, set: () => setShowFeatured(v => !v) },
                  { id: 'family', label: 'Family Friendly', checked: showFamilyFriendly, set: () => setShowFamilyFriendly(v => !v) },
                  { id: 'booking', label: 'Booking Required', checked: showBookingRequired, set: () => setShowBookingRequired(v => !v) },
                ].map(f => (
                  <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      className={cn(
                        'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                        f.checked ? 'border-[#d45f2a] bg-[#d45f2a]' : 'border-[#0d2d1e] group-hover:border-[#d45f2a]/50'
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

            {/* Category */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Category</p>
              <div className="space-y-2.5">
                {activityCategoryOptions.map(o => {
                  const meta = categoryMeta[o.value] ?? categoryMeta.leisure;
                  return (
                    <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={cn(
                          'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                          selectedCategories.includes(o.value) ? 'bg-current border-current' : 'border-[#0d2d1e] group-hover:border-current'
                        )}
                        style={{
                          borderColor: selectedCategories.includes(o.value) ? meta.color : undefined,
                          backgroundColor: selectedCategories.includes(o.value) ? meta.color : undefined,
                          color: meta.color,
                        }}
                        onClick={() => toggleFilter(o.value, selectedCategories, setSelectedCategories)}
                      >
                        {selectedCategories.includes(o.value) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                        <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{o.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] bg-[#0d2d1e]" />

            {/* Difficulty */}
            <div>
              <p className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] mb-3">Difficulty Level</p>
              <div className="space-y-2.5">
                {activityDifficultyOptions.map(o => {
                  const diff = difficultyMeta[o.value] ?? difficultyMeta.easy;
                  return (
                    <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={cn(
                          'w-3.5 h-3.5 border transition-all duration-200 flex items-center justify-center shrink-0',
                          selectedDifficulties.includes(o.value) ? 'border-current bg-current' : 'border-[#0d2d1e]'
                        )}
                        style={{
                          borderColor: selectedDifficulties.includes(o.value) ? diff.color : undefined,
                          backgroundColor: selectedDifficulties.includes(o.value) ? diff.color : undefined,
                        }}
                        onClick={() => toggleFilter(o.value, selectedDifficulties, setSelectedDifficulties)}
                      >
                        {selectedDifficulties.includes(o.value) && <div className="w-2 h-1.5 border-b border-l border-[#020d08] -rotate-45 mb-0.5" />}
                      </div>
                      <span className="text-sm font-sans text-[#f4ecd8]/55 group-hover:text-[#f4ecd8]/80 transition-colors">{o.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Seasonal tip */}
            <div className="bg-[#0d2d1e]/60 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#3a9e6e]" />
                <span className="text-[8.5px] tracking-[0.3em] uppercase font-sans text-[#3a9e6e]">Best Season</span>
              </div>
              <p className="text-[11px] font-sans text-[#f4ecd8]/35 leading-relaxed">
                Most activities run year-round. Water sports: Oct–Apr. Monsoon treks: Jun–Sep.
              </p>
            </div>

            {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || showFeatured || showFamilyFriendly || showBookingRequired) && (
              <button onClick={clearFilters} className="text-[9px] tracking-[0.25em] uppercase font-sans text-[#d45f2a] hover:text-[#e07040] transition-colors">
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-1 px-6 md:px-10 py-10">
          {filteredActivities.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-32">
              <p className="font-serif text-2xl text-[#f4ecd8]/25 italic mb-6">
                No activities match your search.
              </p>
              <button onClick={clearFilters} className="text-[10px] tracking-[0.3em] uppercase font-sans text-[#d45f2a] hover:text-[#e07040] transition-colors">
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
