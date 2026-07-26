import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Sun, Route, ScrollText, MapPin, Star, Flame } from 'lucide-react';
import {
  majorTemples,
  additionalTemples,
  pilgrimageRoutes,
  rituals,
  spiritualMeta,
  type Temple,
  type PilgrimageRoute,
  type Ritual,
  type RitualIconKey,
} from '@/data/spiritual';

type Tab = 'temples' | 'routes' | 'rituals';

// Map icon key strings (stored in data file) → actual Lucide components
const ritualIconMap: Record<RitualIconKey, React.ReactNode> = {
  Sun: <Sun className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  ScrollText: <ScrollText className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
};

// ── Temple Card ───────────────────────────────────────────────────────────────
function TempleCard({ temple, idx }: { temple: Temple; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-6">
        <img src={temple.image} alt={temple.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1" style={{ backgroundColor: temple.color, color: '#020d08' }}>
            {temple.deity}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#f4ecd8]/40" />
          <span className="text-[9px] font-sans text-[#f4ecd8]/50">{temple.location}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: temple.color }}>{temple.subtitle}</p>
          <h3 className="font-serif text-3xl text-[#f4ecd8]">{temple.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {open ? temple.description : temple.description.slice(0, 180) + '…'}
        </p>

        <button onClick={() => setOpen(!open)} className="text-[9px] tracking-[0.28em] uppercase font-sans transition-colors" style={{ color: temple.color }}>
          {open ? 'Less ↑' : 'Full details ↓'}
        </button>

        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5 pt-2">
            <div className="space-y-2">
              <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Daily Rituals</p>
              {temple.rituals.map((r) => (
                <div key={r.name} className="flex items-start gap-3">
                  <div className="shrink-0 text-[8.5px] font-sans text-[#f4ecd8]/30 w-16 pt-0.5">{r.time}</div>
                  <div>
                    <span className="font-sans text-xs text-[#f4ecd8]/80 font-medium">{r.name}</span>
                    <p className="font-sans text-[10px] text-[#f4ecd8]/40 mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${temple.color}60` }}>
              <p className="text-[8.5px] tracking-[0.22em] uppercase font-sans mb-1" style={{ color: temple.color }}>Legend</p>
              <p className="font-sans text-xs text-[#f4ecd8]/50 italic">{temple.legend}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0d2d1e]/60 p-3 space-y-1">
                <p className="text-[8px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e]">Prasad</p>
                <p className="font-sans text-xs text-[#f4ecd8]/60">{temple.prasad}</p>
              </div>
              <div className="bg-[#0d2d1e]/60 p-3 space-y-1">
                <p className="text-[8px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e]">Best Time</p>
                <p className="font-sans text-xs text-[#f4ecd8]/60">{temple.bestTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" style={{ color: temple.color }} />
              <span className="font-sans text-xs text-[#f4ecd8]/40">{temple.distanceFromMumbai} from Mumbai</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Route Card ────────────────────────────────────────────────────────────────
function RouteCard({ route, idx }: { route: PilgrimageRoute; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
    >
      <div className={`relative overflow-hidden aspect-[4/3] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <img src={route.image} alt={route.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
          <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2 py-1 bg-[#f4ecd8]/10 text-[#f4ecd8]/70">
            {route.duration}
          </span>
          <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2 py-1" style={{ backgroundColor: route.color, color: '#020d08' }}>
            {route.distance}
          </span>
        </div>
      </div>

      <div className={`space-y-5 py-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-2" style={{ color: route.color }}>Pilgrimage Route</p>
          <h3 className="font-serif text-3xl text-[#f4ecd8] leading-tight">{route.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <Route className="w-3.5 h-3.5 text-[#f4ecd8]/30" />
          <span className="font-sans text-xs text-[#f4ecd8]/40">Starts and ends: {route.startEnd}</span>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{route.description}</p>

        <div className="space-y-2 pt-1">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Temples on the Route</p>
          {route.temples.map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: route.color }} />
              <span className="font-sans text-xs text-[#f4ecd8]/60">{t}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#0d2d1e]/60 p-4 border-l-2" style={{ borderColor: route.color }}>
          <p className="font-sans text-xs text-[#f4ecd8]/50 italic">{route.significance}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Ritual Card ───────────────────────────────────────────────────────────────
function RitualCard({ ritual, idx }: { ritual: Ritual; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="p-8 border border-[#0d2d1e] bg-[#0d2d1e]/20 hover:bg-[#0d2d1e]/40 transition-colors"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="p-3" style={{ backgroundColor: `${ritual.color}20` }}>
          <div style={{ color: ritual.color }}>{ritualIconMap[ritual.iconKey]}</div>
        </div>
        <div>
          <h3 className="font-serif text-2xl text-[#f4ecd8]">{ritual.title}</h3>
        </div>
      </div>
      <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed mb-5">{ritual.description}</p>
      <div className="space-y-2">
        <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Key Practices</p>
        {ritual.practices.map((p) => (
          <div key={p} className="flex items-start gap-2.5">
            <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: ritual.color }} />
            <span className="font-sans text-xs text-[#f4ecd8]/55">{p}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SpiritualPage() {
  const [activeTab, setActiveTab] = useState<Tab>('temples');
  const { hero, stats, pullQuote, exploreLinks, tabDescriptions } = spiritualMeta;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'temples', label: 'Major Temples', icon: <Sun className="w-4 h-4" /> },
    { id: 'routes', label: 'Pilgrimage Routes', icon: <Route className="w-4 h-4" /> },
    { id: 'rituals', label: 'Rituals & Scriptures', icon: <ScrollText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img src={hero.image} alt="Spiritual Konkan" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/10 to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans mb-4" style={{ color: hero.accentColor }}>
                {hero.eyebrow}
              </p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                {hero.titleLine1}<br />
                <em className="italic" style={{ color: hero.accentColor }}>{hero.titleLine2}</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">{hero.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-3 divide-x divide-[#0d2d1e]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-6">
              <p className="font-serif text-3xl mb-1" style={{ color: hero.accentColor }}>{s.value}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-4">
        <div className="flex gap-0 border-b border-[#0d2d1e]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.22em] uppercase font-sans transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-[#d45f2a] text-[#f4ecd8]'
                  : 'border-transparent text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'temples' && (
          <motion.section key="temples" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-12">{tabDescriptions.temples}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
              {majorTemples.map((temple, idx) => <TempleCard key={temple.id} temple={temple} idx={idx} />)}
            </div>

            <div className="mt-20 p-8 border border-[#0d2d1e] bg-[#0d2d1e]/20">
              <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#d45f2a] mb-4">Also Worth Visiting</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {additionalTemples.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Sun className="w-3 h-3 text-[#d45f2a]/60 shrink-0" />
                    <span className="font-sans text-xs text-[#f4ecd8]/50">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'routes' && (
          <motion.section key="routes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-16">{tabDescriptions.routes}</p>
            <div className="space-y-24">
              {pilgrimageRoutes.map((route, idx) => <RouteCard key={route.id} route={route} idx={idx} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'rituals' && (
          <motion.section key="rituals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-12">{tabDescriptions.rituals}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rituals.map((ritual, idx) => <RitualCard key={ritual.id} ritual={ritual} idx={idx} />)}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Pull quote ── */}
      <section className="border-y border-[#0d2d1e] my-8">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 text-center">
          <p className="font-serif text-3xl md:text-5xl text-[#f4ecd8]/80 italic leading-tight">
            {pullQuote.text}
          </p>
          <p className="mt-6 text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/30">
            {pullQuote.attribution}
          </p>
        </div>
      </section>

      {/* ── Related links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {exploreLinks.map((link) => (
            <a key={link.href} href={link.href} className="group relative overflow-hidden aspect-[16/7] block">
              <img src={link.img} alt={link.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#020d08]/60 group-hover:bg-[#020d08]/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-xl text-[#f4ecd8] group-hover:text-white transition-colors">
                  {link.label} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
