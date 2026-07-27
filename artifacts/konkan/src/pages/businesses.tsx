import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Phone, Mail, Globe, MapPin, ExternalLink, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AlertBanner } from '@/components/alert-banner';
import { cn } from '@/lib/utils';
import {
  sampleBusinesses,
  businessCategories,
  priceFilters,
  type LocalBusiness,
  type BusinessCategory,
} from '@/data/businesses';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';

const ratingStars = (r: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(r) ? 'text-[#c17f3a]' : 'text-[#f4ecd8]/15'}>★</span>
  ));

function BusinessCard({ biz }: { biz: LocalBusiness }) {
  const [expanded, setExpanded] = useState(false);
  const cat = businessCategories.find((c) => c.value === biz.category);
  const price = priceFilters.find((p) => p.value === biz.priceRange);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="group border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={biz.images[0] ?? '/assets/coastal-landscape.jpg'}
          alt={biz.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {cat && (
            <span
              className="text-[8px] tracking-[0.2em] uppercase font-sans px-2 py-0.5"
              style={{ backgroundColor: cat.color, color: '#020d08' }}
            >
              {cat.icon} {cat.label}
            </span>
          )}
          {biz.certified && (
            <span className="flex items-center gap-1 text-[8px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 bg-[#3a9e6e] text-[#020d08]">
              <CheckCircle2 className="w-2.5 h-2.5" /> Certified
            </span>
          )}
          {biz.featured && (
            <span className="text-[8px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 bg-[#c17f3a] text-[#020d08]">
              Featured
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className="text-[8px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 bg-[#020d08]/70 text-[#f4ecd8]/70 border border-[#0d2d1e]">
            {price?.label ?? biz.priceRange}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#020d08]/70 backdrop-blur-sm px-2 py-1">
          <div className="flex text-[10px]">{ratingStars(biz.rating)}</div>
          <span className="text-[9px] font-sans text-[#f4ecd8]/60">{biz.rating.toFixed(1)} ({biz.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-serif text-xl text-[#f4ecd8] leading-tight">{biz.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#f4ecd8]/30" />
              <span className="text-[9px] font-sans text-[#f4ecd8]/40">{biz.destinationName}</span>
            </div>
          </div>
        </div>

        {/* Speciality */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className="w-0.5 h-3 shrink-0" style={{ backgroundColor: cat?.color ?? '#3a9e6e' }} />
          <p className="text-[10px] font-sans italic text-[#f4ecd8]/50">{biz.speciality}</p>
        </div>

        <p className="text-xs font-sans text-[#f4ecd8]/55 leading-relaxed line-clamp-3">{biz.description}</p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {biz.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[7px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 border border-[#0d2d1e] text-[#f4ecd8]/35">
              {tag}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[8px] font-sans text-[#f4ecd8]/25 uppercase tracking-widest">Speaks:</span>
          <span className="text-[9px] font-sans text-[#f4ecd8]/45">{biz.languages.join(', ')}</span>
        </div>

        {/* Expand/Collapse */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[#0d2d1e] space-y-3">
                <p className="text-xs font-sans text-[#f4ecd8]/60 leading-relaxed">{biz.description}</p>

                <div className="bg-[#0d2d1e]/50 p-3">
                  <p className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/30 mb-1">Price</p>
                  <p className="text-sm font-sans text-[#f4ecd8]/80">{biz.priceLabel}</p>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  {biz.phone && (
                    <a href={`tel:${biz.phone}`} className="flex items-center gap-2 text-xs font-sans text-[#f4ecd8]/50 hover:text-[#3a9e6e] transition-colors">
                      <Phone className="w-3 h-3" /> {biz.phone}
                    </a>
                  )}
                  {biz.email && (
                    <a href={`mailto:${biz.email}`} className="flex items-center gap-2 text-xs font-sans text-[#f4ecd8]/50 hover:text-[#3a9e6e] transition-colors">
                      <Mail className="w-3 h-3" /> {biz.email}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#0d2d1e]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[9px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors flex items-center gap-1"
          >
            {expanded ? 'Less' : 'Details + Contact'}
            <ArrowRight className={cn('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
          </button>
          {(biz.phone || biz.email) && (
            <div className="flex items-center gap-2">
              {biz.phone && (
                <a
                  href={`tel:${biz.phone}`}
                  className="flex items-center gap-1 text-[8px] tracking-[0.15em] uppercase font-sans px-3 py-1.5 border border-[#3a9e6e]/40 text-[#3a9e6e] hover:bg-[#3a9e6e]/10 transition-colors"
                >
                  <Phone className="w-2.5 h-2.5" /> Call
                </a>
              )}
              {biz.email && (
                <a
                  href={`mailto:${biz.email}`}
                  className="flex items-center gap-1 text-[8px] tracking-[0.15em] uppercase font-sans px-3 py-1.5 bg-[#3a9e6e] text-[#020d08]"
                >
                  <Mail className="w-2.5 h-2.5" /> Email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ── Business Submission Form ─────────────────────────────────────────────────
function SubmitModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'homestay' as BusinessCategory,
    destination_name: '',
    description: '',
    speciality: '',
    price_label: '',
    phone: '',
    email: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (supabase) {
        await supabase.from('local_businesses').insert({
          ...form,
          price_range: 'mid',
          images: [],
          tags: [],
          languages: [],
          submitted_by: user?.id ?? null,
          is_approved: false,
        });
      }
      setDone(true);
    } catch {
      toast({ title: 'Error', description: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (done) {
    return (
      <div className="p-8 text-center">
        <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-[#3a9e6e]" />
        <h3 className="font-serif text-xl text-[#f4ecd8] mb-2">Submitted!</h3>
        <p className="text-sm font-sans text-[#f4ecd8]/50">Your listing will be reviewed and published within 2–3 days.</p>
        <button onClick={onClose} className="mt-4 text-[9px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <h3 className="font-serif text-xl text-[#f4ecd8] mb-0.5">List Your Business</h3>
        <p className="text-[10px] font-sans text-[#f4ecd8]/40">All submissions are reviewed before publishing.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Business Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50"
            placeholder="Your business name" />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Category *</label>
          <select required value={form.category} onChange={(e) => set('category', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none">
            {businessCategories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Location (Destination) *</label>
          <input required value={form.destination_name} onChange={(e) => set('destination_name', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none"
            placeholder="e.g. Malvan, Tarkarli" />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Phone</label>
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} type="tel"
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none"
            placeholder="+91 98..." />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Email</label>
          <input value={form.email} onChange={(e) => set('email', e.target.value)} type="email"
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none"
            placeholder="contact@yourbusiness.com" />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Speciality</label>
          <input value={form.speciality} onChange={(e) => set('speciality', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none"
            placeholder="e.g. Traditional Konkani meals" />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Price Range</label>
          <input value={form.price_label} onChange={(e) => set('price_label', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none"
            placeholder="e.g. ₹1,500–3,000 / night" />
        </div>
        <div className="col-span-2">
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Description *</label>
          <textarea required value={form.description} onChange={(e) => set('description', e.target.value)} rows={3}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none resize-none"
            placeholder="Describe your business, what makes it special, and what guests can expect…" />
        </div>
      </div>

      <button type="submit" disabled={submitting}
        className="w-full py-3 text-[10px] tracking-[0.2em] uppercase font-sans bg-[#3a9e6e] text-[#020d08] hover:opacity-90 transition-opacity disabled:opacity-50">
        {submitting ? 'Submitting…' : 'Submit for Review'}
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BusinessesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | BusinessCategory>('all');
  const [activePrice, setActivePrice] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return sampleBusinesses.filter((b) => {
      const inCat = activeCategory === 'all' || b.category === activeCategory;
      const inPrice = activePrice === 'all' || b.priceRange === activePrice;
      const inQuery =
        !query.trim() ||
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.destinationName.toLowerCase().includes(query.toLowerCase()) ||
        b.speciality.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.includes(query.toLowerCase()));
      return inCat && inPrice && inQuery;
    });
  }, [activeCategory, activePrice, query]);

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <AlertBanner />
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="pt-40 md:pt-48 pb-16 px-8 md:px-16 border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[9px] tracking-[0.36em] uppercase font-sans text-[#3a9e6e] mb-4">
              Konkan Community
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-none mb-4">
              Local
              <br />
              <span className="text-[#3a9e6e]">Businesses</span>
            </h1>
            <p className="font-sans text-sm text-[#f4ecd8]/50 max-w-lg leading-relaxed">
              Homestays, certified guides, fishing families, artisans, and authentic eateries.
              Every listing is a real person whose livelihood is tied to Konkan's richness.
              Travel with intention — support the community.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: `${sampleBusinesses.length}+`, label: 'Listings' },
                { value: `${businessCategories.length}`, label: 'Categories' },
                { value: '10+', label: 'Destinations' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl text-[#3a9e6e]">{value}</p>
                  <p className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/30">{label}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSubmit(true)}
              className="text-[9px] tracking-[0.2em] uppercase font-sans px-5 py-2.5 border border-[#3a9e6e]/40 text-[#3a9e6e] hover:bg-[#3a9e6e]/10 transition-colors"
            >
              + List Your Business
            </button>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ─────────────────────────────────────────────────── */}
      <div className="border-b border-[#0d2d1e] sticky top-0 z-30 bg-[#020d08] backdrop-blur-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex gap-1 py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'px-4 py-3 text-[9px] tracking-[0.18em] uppercase font-sans whitespace-nowrap transition-colors',
                activeCategory === 'all' ? 'text-[#3a9e6e] border-b-2 border-[#3a9e6e]' : 'text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70',
              )}
            >
              All ({sampleBusinesses.length})
            </button>
            {businessCategories.map((cat) => {
              const count = sampleBusinesses.filter((b) => b.category === cat.value).length;
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    'px-4 py-3 text-[9px] tracking-[0.18em] uppercase font-sans whitespace-nowrap transition-colors border-b-2',
                    isActive ? 'border-current' : 'border-transparent text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70',
                  )}
                  style={isActive ? { color: cat.color } : {}}
                >
                  {cat.icon} {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Filters & Search ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#f4ecd8]/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, destination, or activity…"
              className="w-full bg-[#0d2d1e]/50 border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans pl-9 pr-4 py-2.5 outline-none focus:border-[#3a9e6e]/50 placeholder-[#f4ecd8]/25"
            />
          </div>
          <div className="flex gap-2">
            {priceFilters.map((pf) => (
              <button
                key={pf.value}
                onClick={() => setActivePrice(pf.value)}
                className={cn(
                  'px-3 py-2 text-[8px] tracking-[0.18em] uppercase font-sans border transition-colors',
                  activePrice === pf.value
                    ? 'border-[#3a9e6e] text-[#3a9e6e] bg-[#3a9e6e]/10'
                    : 'border-[#0d2d1e] text-[#f4ecd8]/40 hover:border-[#1a4a30]',
                )}
              >
                {pf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[9px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/30">
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
            {query && ` for "${query}"`}
          </p>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="font-serif text-3xl text-[#f4ecd8]/20 mb-2">No results</p>
              <p className="text-sm font-sans text-[#f4ecd8]/30">Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Community CTA */}
        <div className="mt-16 border border-[#0d2d1e] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/fishing-village.jpg')] bg-cover bg-center opacity-5" />
          <div className="relative">
            <p className="text-[9px] tracking-[0.32em] uppercase font-sans text-[#3a9e6e] mb-3">Grow With Konkan</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f4ecd8] mb-3">
              Are you a local business?
            </h2>
            <p className="text-sm font-sans text-[#f4ecd8]/50 max-w-lg mx-auto mb-6 leading-relaxed">
              Homestay owners, local guides, artisans, fishermen, eateries — list your business for free
              and reach travellers who want authentic Konkan experiences.
            </p>
            <button
              onClick={() => setShowSubmit(true)}
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans px-8 py-3.5 bg-[#3a9e6e] text-[#020d08] hover:opacity-90 transition-opacity"
            >
              List Your Business Free <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Submit Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSubmit && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020d08]/80 backdrop-blur-sm z-[100]"
              onClick={() => setShowSubmit(false)} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg top-1/2 -translate-y-1/2 bg-[#0a1f14] border border-[#1a4a30] z-[101] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#0d2d1e]">
                <p className="text-[8px] tracking-[0.24em] uppercase font-sans text-[#f4ecd8]/40">Business Listing</p>
                <button onClick={() => setShowSubmit(false)}
                  className="text-[#f4ecd8]/30 hover:text-[#f4ecd8]/70 transition-colors text-xs uppercase tracking-widest">
                  ✕
                </button>
              </div>
              <SubmitModal onClose={() => setShowSubmit(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
