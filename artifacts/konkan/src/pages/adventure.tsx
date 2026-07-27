import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Waves, Mountain, TreePine, MapPin, Clock, ChevronDown, ChevronUp,
  Thermometer, Calendar, Users, Zap, Info,
} from 'lucide-react';
import {
  adventureMeta,
  waterActivities,
  treks,
  natureExperiences,
  type WaterActivity,
  type Trek,
  type NatureExperience,
} from '@/data/adventure';

type Tab = 'water' | 'treks' | 'wildlife';

const difficultyConfig = {
  Easy:       { color: '#3a9e6e', bg: '#3a9e6e18', border: '#3a9e6e40' },
  Moderate:   { color: '#c17f3a', bg: '#c17f3a18', border: '#c17f3a40' },
  Challenging:{ color: '#d45f2a', bg: '#d45f2a18', border: '#d45f2a40' },
};

// ── Water Activity Card ────────────────────────────────────────────────────────
function WaterCard({ activity, idx }: { activity: WaterActivity; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[activity.difficulty];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9] mb-0">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />

        {/* Difficulty badge */}
        <div
          className="absolute top-4 left-4 text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
          style={{ color: diff.color, backgroundColor: diff.bg, border: `1px solid ${diff.border}` }}
        >
          {activity.difficulty}
        </div>

        {/* Season */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#020d08]/70 backdrop-blur-sm px-2.5 py-1">
          <Calendar className="w-3 h-3 text-[#f4ecd8]/50" />
          <span className="text-[9px] font-sans text-[#f4ecd8]/60">{activity.season.split(';')[0]}</span>
        </div>

        {/* Price */}
        {activity.priceFrom && (
          <div className="absolute bottom-4 left-4">
            <span className="font-serif text-2xl text-[#f4ecd8]">{activity.priceFrom}</span>
            <span className="font-sans text-xs text-[#f4ecd8]/45 ml-1">per person</span>
          </div>
        )}

        {/* Colour accent bar on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: activity.color }}
        />
      </div>

      {/* Content */}
      <div className="border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-6 space-y-4">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: activity.color }}>
            {activity.subtitle}
          </p>
          <h3 className="font-serif text-2xl text-[#f4ecd8] leading-tight">{activity.title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" style={{ color: activity.color }} />
          <span className="font-sans text-xs text-[#f4ecd8]/40">{activity.location}</span>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {activity.description}
        </p>

        {/* Details toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: activity.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'Full details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-5"
            >
              {/* Detail bullets */}
              <div className="space-y-2.5 pt-1">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">What to Know</p>
                {activity.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: activity.color }} />
                    <span className="font-sans text-xs text-[#f4ecd8]/60">{d}</span>
                  </div>
                ))}
              </div>

              {/* Operators */}
              {activity.operators && (
                <div className="space-y-1.5">
                  <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Operators</p>
                  {activity.operators.map((op) => (
                    <div key={op} className="flex items-center gap-2">
                      <Users className="w-3 h-3" style={{ color: activity.color }} />
                      <span className="font-sans text-xs text-[#f4ecd8]/55">{op}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pro tip */}
              {activity.tip && (
                <div className="flex items-start gap-2.5 bg-[#0d2d1e]/60 p-4">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: activity.color }} />
                  <div>
                    <p className="text-[8px] tracking-[0.22em] uppercase font-sans mb-0.5" style={{ color: activity.color }}>Pro Tip</p>
                    <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{activity.tip}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Trek Card ──────────────────────────────────────────────────────────────────
function TrekCard({ trek, idx }: { trek: Trek; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[trek.difficulty];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: idx * 0.12 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 group"
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px]">
          <img
            src={trek.image}
            alt={trek.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/80 via-[#020d08]/10 to-transparent" />

          {/* Difficulty */}
          <div
            className="absolute top-4 left-4 text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ color: diff.color, backgroundColor: diff.bg, border: `1px solid ${diff.border}` }}
          >
            {trek.difficulty}
          </div>

          {/* Stats row */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-4">
            {trek.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-base text-[#f4ecd8]">{stat.value}</p>
                <p className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`border border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-8 space-y-5 flex flex-col ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1.5" style={{ color: trek.color }}>
            {trek.subtitle}
          </p>
          <h3 className="font-serif text-3xl text-[#f4ecd8] leading-tight mb-2">{trek.title}</h3>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#f4ecd8]/30" />
            <span className="font-sans text-xs text-[#f4ecd8]/35">{trek.location}</span>
          </div>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed flex-1">{trek.description}</p>

        {/* Season */}
        <div className="flex items-start gap-2.5 text-[11px] font-sans text-[#f4ecd8]/40">
          <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#f4ecd8]/25" />
          <span>{trek.season}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors self-start"
          style={{ color: trek.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'Trail details'}
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
              <div className="space-y-2.5">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Trail Highlights</p>
                {trek.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Mountain className="w-3 h-3 mt-0.5 shrink-0" style={{ color: trek.color }} />
                    <span className="font-sans text-xs text-[#f4ecd8]/60">{h}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#0d2d1e]/60 p-4 space-y-1">
                <p className="text-[8px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e]">How to Reach</p>
                <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{trek.howToReach}</p>
              </div>

              {trek.tip && (
                <div className="flex items-start gap-2.5 border border-[#0d2d1e] p-4">
                  <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: trek.color }} />
                  <div>
                    <p className="text-[8px] tracking-[0.22em] uppercase font-sans mb-0.5" style={{ color: trek.color }}>Pro Tip</p>
                    <p className="font-sans text-xs text-[#f4ecd8]/50">{trek.tip}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Nature Card ────────────────────────────────────────────────────────────────
function NatureCard({ exp, idx }: { exp: NatureExperience; idx: number }) {
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
          src={exp.image}
          alt={exp.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1" style={{ backgroundColor: exp.color, color: '#020d08' }}>
            {exp.subtitle.split('·')[0].trim()}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#f4ecd8]/50" />
          <span className="text-[9px] font-sans text-[#f4ecd8]/50">{exp.location}</span>
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
          style={{ backgroundColor: exp.color }}
        />
      </div>

      {/* Content */}
      <div className="border border-t-0 border-[#0d2d1e] group-hover:border-[#1a4a30] transition-colors duration-300 p-6 space-y-4">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: exp.color }}>
            {exp.subtitle}
          </p>
          <h3 className="font-serif text-2xl text-[#f4ecd8]">{exp.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{exp.description}</p>

        {/* Best for pills */}
        <div className="flex flex-wrap gap-1.5">
          {exp.bestFor.map((bf) => (
            <span
              key={bf}
              className="text-[8px] tracking-[0.16em] uppercase font-sans px-2 py-1 border"
              style={{ borderColor: `${exp.color}35`, color: `${exp.color}cc` }}
            >
              {bf}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-sans text-[#f4ecd8]/40">
          <Thermometer className="w-3 h-3" />
          <span>{exp.season}</span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: exp.color }}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'Explore more'}
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
              <div className="space-y-2.5 pt-1">
                <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Key Highlights</p>
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <TreePine className="w-3 h-3 mt-0.5 shrink-0" style={{ color: exp.color }} />
                    <span className="font-sans text-xs text-[#f4ecd8]/60">{h}</span>
                  </div>
                ))}
              </div>

              {exp.entry && (
                <div className="bg-[#0d2d1e]/60 p-4 space-y-1">
                  <p className="text-[8px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e]">Entry & Fees</p>
                  <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{exp.entry}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function AdventurePage() {
  const [activeTab, setActiveTab] = useState<Tab>('water');
  const { hero, stats, pullQuote } = adventureMeta;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'water',    label: 'Water Sports', icon: <Waves className="w-4 h-4" />,    count: waterActivities.length },
    { id: 'treks',   label: 'Treks & Trails', icon: <Mountain className="w-4 h-4" />,  count: treks.length },
    { id: 'wildlife',label: 'Wildlife & Nature', icon: <TreePine className="w-4 h-4" />, count: natureExperiences.length },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#2a8fb5]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden">
        <img
          src={hero.image}
          alt="Adventure in Konkan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/15 to-[#020d08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/70 via-[#020d08]/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2a8fb5] via-[#3a9e6e]/30 to-transparent" />

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

            {/* Tab pills on hero */}
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
                  <span className="opacity-60">({tab.count})</span>
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
              <p className="font-serif text-3xl text-[#2a8fb5] mb-1">{s.value}</p>
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
                  ? 'border-[#2a8fb5] text-[#f4ecd8]'
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
        {activeTab === 'water' && (
          <motion.section
            key="water"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#2a8fb5] mb-3">Water Sports</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                The Arabian Sea and Konkan's tidal rivers offer everything from coral-reef dives to monsoon white water — one of India's most varied aquatic playgrounds.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {waterActivities.map((a, i) => <WaterCard key={a.id} activity={a} idx={i} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'treks' && (
          <motion.section
            key="treks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#3a9e6e] mb-3">Treks & Trails</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                From the fog-wrapped summits of the Sahyadri to sea-level cliff paths above the Arabian surf — the Konkan offers trekkers a rare vertical spectrum in a single region.
              </p>
            </div>
            <div className="space-y-16">
              {treks.map((t, i) => <TrekCard key={t.id} trek={t} idx={i} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'wildlife' && (
          <motion.section
            key="wildlife"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="text-[9px] tracking-[0.4em] uppercase font-sans text-[#3a9e6e] mb-3">Wildlife & Nature</p>
              <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                The Konkan is one of India's most biodiverse corridors — where the Western Ghats UNESCO World Heritage zone meets the Arabian Sea. Rare birds, backwater dolphins, nesting turtles, and ancient sacred forests await.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {natureExperiences.map((e, i) => <NatureCard key={e.id} exp={e} idx={i} />)}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Pull Quote ── */}
      <section className="border-y border-[#0d2d1e] my-8">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 text-center">
          <p className="font-serif text-3xl md:text-5xl text-[#f4ecd8]/75 italic leading-tight">
            {pullQuote.text}
          </p>
          <p className="mt-6 text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/30">
            {pullQuote.attribution}
          </p>
        </div>
      </section>

      {/* ── Related Links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { href: '/plan', label: 'Plan Your Trip', img: '/assets/konkan-railway.jpg' },
            { href: '/stay', label: 'Where to Stay', img: '/assets/homestays.jpg' },
            { href: '/destinations', label: 'Destinations', img: '/assets/diveagar-beach.jpg' },
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
