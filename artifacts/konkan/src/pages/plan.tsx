import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Map, Train, Hotel, Info, ChevronDown, ChevronUp,
  MapPin, Clock, Wallet, Calendar, CheckCircle2, AlertTriangle, Wifi,
} from 'lucide-react';
import {
  planMeta,
  itineraries,
  transportModes,
  accommodationTypes,
  practicalSections,
  type Itinerary,
  type TransportMode,
  type AccommodationType,
  type PracticalSection,
} from '@/data/plan';

type Tab = 'itineraries' | 'transport' | 'accommodation' | 'practical';

const typeConfig = {
  budget:  { label: 'Budget Friendly', color: '#3a9e6e' },
  premium: { label: 'Premium Circuit', color: '#c17f3a' },
  monsoon: { label: 'Monsoon Special', color: '#2a8fb5' },
};

// ── Itinerary Card ─────────────────────────────────────────────────────────────
function ItineraryCard({ itin, idx }: { itin: Itinerary; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const typeMeta = typeConfig[itin.type];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="group"
    >
      {/* Hero Image */}
      <div className="relative overflow-hidden aspect-[21/9]">
        <img
          src={itin.image}
          alt={itin.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/70 via-[#020d08]/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: itin.color, color: '#020d08' }}
          >
            {itin.badge}
          </span>
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ color: typeMeta.color, backgroundColor: `${typeMeta.color}18`, border: `1px solid ${typeMeta.color}40` }}
          >
            {typeMeta.label}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#020d08]/70 backdrop-blur-sm px-2.5 py-1.5">
          <Clock className="w-3 h-3 text-[#f4ecd8]/50" />
          <span className="text-[9px] font-sans text-[#f4ecd8]/70">{itin.duration}</span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1.5" style={{ color: itin.color }}>
            {itin.subtitle}
          </p>
          <h3 className="font-serif text-4xl text-[#f4ecd8] leading-none">{itin.title}</h3>
          <p className="mt-2 font-sans text-sm text-[#f4ecd8]/50 italic">{itin.tagline}</p>
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-[4px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: itin.color }}
        />
      </div>

      {/* Content */}
      <div className="border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-8 space-y-6">
        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{itin.description}</p>

        {/* Budget */}
        <div className="flex items-start gap-2.5 bg-[#0d2d1e]/50 p-4">
          <Wallet className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: itin.color }} />
          <div>
            <p className="text-[8px] tracking-[0.22em] uppercase font-sans mb-0.5" style={{ color: itin.color }}>Estimated Budget</p>
            <p className="font-sans text-xs text-[#f4ecd8]/60">{itin.budget}</p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: itin.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Hide itinerary' : 'View day-by-day itinerary'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden space-y-6"
            >
              {/* Day selector */}
              <div className="flex gap-1.5 flex-wrap pt-2">
                {itin.days.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className="text-[8.5px] tracking-[0.18em] uppercase font-sans px-3 py-1.5 border transition-all duration-200"
                    style={{
                      borderColor: activeDay === i ? itin.color : `${itin.color}30`,
                      color: activeDay === i ? '#020d08' : `${itin.color}99`,
                      backgroundColor: activeDay === i ? itin.color : 'transparent',
                    }}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Active Day */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <p className="font-serif text-lg text-[#f4ecd8]">{itin.days[activeDay].title}</p>
                    {itin.days[activeDay].stay && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <Hotel className="w-3 h-3 text-[#f4ecd8]/30" />
                        <span className="text-[9px] font-sans text-[#f4ecd8]/35">{itin.days[activeDay].stay}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {itin.days[activeDay].activities.map((act, ai) => (
                      <div key={ai} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-sans font-medium"
                          style={{ borderColor: `${itin.color}50`, color: itin.color }}
                        >
                          {ai + 1}
                        </div>
                        <span className="font-sans text-sm text-[#f4ecd8]/65 leading-relaxed">{act}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Tips */}
              <div className="space-y-3 pt-2 border-t border-[#0d2d1e]">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Planning Tips</p>
                {itin.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: itin.color }} />
                    <span className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Transport Card ─────────────────────────────────────────────────────────────
function TransportCard({ mode, idx }: { mode: TransportMode; idx: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-0"
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]">
          <img
            src={mode.image}
            alt={mode.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/80 via-[#020d08]/10 to-transparent" />

          {/* Icon */}
          <div className="absolute top-4 left-4 text-3xl">{mode.icon}</div>

          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
            style={{ backgroundColor: mode.color }}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`border border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-8 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1.5" style={{ color: mode.color }}>
            {mode.subtitle}
          </p>
          <h3 className="font-serif text-3xl text-[#f4ecd8] leading-tight">{mode.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{mode.description}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: mode.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'Full guide'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-4"
            >
              {mode.details.map((d) => (
                <div key={d.heading} className="space-y-1.5">
                  <p className="text-[8.5px] tracking-[0.25em] uppercase font-sans" style={{ color: mode.color }}>
                    {d.heading}
                  </p>
                  <p className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed">{d.content}</p>
                </div>
              ))}

              <div className="space-y-2.5 pt-2 border-t border-[#0d2d1e]">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Pro Tips</p>
                {mode.proTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: mode.color }} />
                    <span className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Accommodation Card ─────────────────────────────────────────────────────────
function AccomCard({ type, idx }: { type: AccommodationType; idx: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={type.image}
          alt={type.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: type.color, color: '#020d08' }}
          >
            {type.subtitle.split('·')[0].trim()}
          </span>
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: type.color }}
        />
      </div>

      {/* Content */}
      <div className="border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-6 space-y-4">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: type.color }}>
            {type.subtitle}
          </p>
          <h3 className="font-serif text-2xl text-[#f4ecd8]">{type.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{type.description}</p>

        <div className="flex items-center gap-2 text-[11px] font-sans text-[#f4ecd8]/40">
          <Calendar className="w-3 h-3" />
          <span>{type.season}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: type.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'View options'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-4"
            >
              {/* Property list */}
              <div className="space-y-3 pt-1">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Where to Stay</p>
                {type.options.map((opt) => (
                  <div key={opt.name} className="border border-[#0d2d1e] p-4 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-sans text-sm font-medium text-[#f4ecd8]/85">{opt.name}</h4>
                      <span
                        className="text-[9px] font-sans shrink-0"
                        style={{ color: type.color }}
                      >
                        {opt.priceRange}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#f4ecd8]/25" />
                      <span className="text-[10px] font-sans text-[#f4ecd8]/35">{opt.location}</span>
                    </div>
                    <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{opt.highlight}</p>
                    {opt.contact && (
                      <p className="text-[9px] font-sans text-[#f4ecd8]/30">→ {opt.contact}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Booking advice */}
              <div className="bg-[#0d2d1e]/60 p-4 space-y-1">
                <p className="text-[8px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e]">Booking Advice</p>
                <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{type.bookingAdvice}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Practical Section Card ─────────────────────────────────────────────────────
const practicalIcons: Record<string, React.ReactNode> = {
  permits:     <CheckCircle2 className="w-5 h-5" />,
  safety:      <AlertTriangle className="w-5 h-5" />,
  connectivity:<Wifi className="w-5 h-5" />,
};

function PracticalCard({ section, idx }: { section: PracticalSection; idx: number }) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 flex items-center justify-center border shrink-0"
          style={{ borderColor: `${section.color}50`, color: section.color }}
        >
          {practicalIcons[section.id] ?? <Info className="w-5 h-5" />}
        </div>
        <div>
          <h3 className="font-serif text-2xl text-[#f4ecd8]">{section.title}</h3>
          <p className="font-sans text-xs text-[#f4ecd8]/40 mt-0.5">{section.subtitle}</p>
        </div>
      </div>

      {/* Accordion items */}
      <div className="border border-[#0d2d1e] divide-y divide-[#0d2d1e]">
        {section.items.map((item, i) => (
          <div key={item.heading}>
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left group hover:bg-[#0d2d1e]/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: section.color }} />
                <span className="font-sans text-sm text-[#f4ecd8]/75 group-hover:text-[#f4ecd8] transition-colors">{item.heading}</span>
              </div>
              <motion.div animate={{ rotate: openItem === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 text-[#f4ecd8]/25" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openItem === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 pt-1 font-sans text-sm text-[#f4ecd8]/55 leading-relaxed border-t border-[#0d2d1e]/60">
                    {item.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>('itineraries');
  const { hero, stats } = planMeta;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'itineraries',   label: 'Itineraries',       icon: <Map className="w-4 h-4" /> },
    { id: 'transport',     label: 'Transportation',     icon: <Train className="w-4 h-4" /> },
    { id: 'accommodation', label: 'Accommodation',      icon: <Hotel className="w-4 h-4" /> },
    { id: 'practical',     label: 'Practical Info',     icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img
          src={hero.image}
          alt="Plan your Konkan trip"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/15 to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/70 via-[#020d08]/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3a9e6e] via-[#2a8fb5]/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-24 w-full">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
              <p className="text-[10px] tracking-[0.5em] uppercase font-sans mb-5" style={{ color: hero.accentColor }}>
                {hero.eyebrow}
              </p>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[6rem] text-[#f4ecd8] leading-none mb-6">
                {hero.titleLine1}<br />
                <em className="italic" style={{ color: hero.accentColor }}>{hero.titleLine2}</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/55 max-w-2xl leading-relaxed">{hero.subtitle}</p>
            </motion.div>

            {/* Quick nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-2.5"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-sans px-4 py-2.5 border transition-all duration-300"
                  style={{
                    borderColor: activeTab === tab.id ? hero.accentColor : `${hero.accentColor}40`,
                    color: activeTab === tab.id ? '#020d08' : `${hero.accentColor}cc`,
                    backgroundColor: activeTab === tab.id ? hero.accentColor : 'transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-3 divide-x divide-[#0d2d1e]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-6">
              <p className="font-serif text-3xl text-[#3a9e6e] mb-1">{s.value}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tab Bar ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 pt-14 pb-2">
        <div className="flex gap-0 border-b border-[#0d2d1e] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.22em] uppercase font-sans transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#3a9e6e] text-[#f4ecd8]'
                  : 'border-transparent text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'itineraries' && (
          <motion.section
            key="itineraries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#3a9e6e] mb-3">Curated Itineraries</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                Three carefully crafted routes — from a quick coastal escape to a week-long heritage odyssey. Each includes day-by-day plans, honest budgets, and the kind of insider tips that only come from time spent on the coast.
              </p>
            </div>
            <div className="space-y-16">
              {itineraries.map((itin, i) => <ItineraryCard key={itin.id} itin={itin} idx={i} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'transport' && (
          <motion.section
            key="transport"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#c17f3a] mb-3">Getting Around</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                The Konkan rewards the traveller who mixes modes — train to get here, car to explore the backroads, boat to reach the forts. Here&apos;s how each works.
              </p>
            </div>
            <div className="space-y-16">
              {transportModes.map((m, i) => <TransportCard key={m.id} mode={m} idx={i} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'accommodation' && (
          <motion.section
            key="accommodation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#2a8fb5] mb-3">Where to Sleep</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                From MTDC beachfront resorts to family-run coconut-grove homestays and clifftop glamping — the Konkan has accommodation for every kind of traveller and every kind of budget.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {accommodationTypes.map((a, i) => <AccomCard key={a.id} type={a} idx={i} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'practical' && (
          <motion.section
            key="practical"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#d45f2a] mb-3">Practical Information</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                Permits, safety briefings, hospital contacts, ATM coverage, and connectivity gaps — the essential logistics for a worry-free Konkan journey.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {practicalSections.map((s, i) => <PracticalCard key={s.id} section={s} idx={i} />)}
            </div>

            {/* Emergency contacts block */}
            <div className="mt-16 border border-[#d45f2a]/30 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-[#d45f2a]" />
                <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#d45f2a]">Emergency Numbers</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Police', number: '100' },
                  { label: 'Ambulance', number: '108' },
                  { label: 'Coast Guard', number: '1554' },
                  { label: 'Tourist Helpline', number: '1800-111-363' },
                ].map((e) => (
                  <div key={e.label} className="text-center">
                    <p className="font-serif text-2xl text-[#f4ecd8]">{e.number}</p>
                    <p className="text-[9px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/35 mt-0.5">{e.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Related Links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { href: '/adventure', label: 'Adventures', img: '/assets/water-sports.jpg' },
            { href: '/stay',      label: 'Where to Stay', img: '/assets/homestays.jpg' },
            { href: '/food',      label: 'Food Guide',  img: '/assets/konkani-thali.jpg' },
          ].map((link) => (
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
