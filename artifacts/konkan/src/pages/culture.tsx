import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Palette, Users, Calendar, Hammer, Languages } from 'lucide-react';
import {
  artsAndFolk,
  festivals,
  localCustoms,
  craftsAndLivelihoods,
  oralHeritage,
  cultureMeta,
  type ArtForm,
  type Festival,
  type LocalCustom,
} from '@/data/culture';

type Tab = 'arts' | 'festivals' | 'customs' | 'crafts' | 'language';

// ── Components ────────────────────────────────────────────────────────────────

function ArtCard({ art, idx }: { art: ArtForm; idx: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[16/9] mb-6">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div
          className="absolute top-4 left-4 text-[8px] tracking-[0.28em] uppercase font-sans px-3 py-1.5"
          style={{ backgroundColor: art.color, color: '#020d08' }}
        >
          {art.era}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: art.color }}>
            {art.subtitle}
          </p>
          <h3 className="font-serif text-3xl text-[#f4ecd8]">{art.title}</h3>
        </div>

        <p className="text-[11px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/40">
          Origin: {art.origin}
        </p>

        <p className="font-sans text-sm text-[#f4ecd8]/65 leading-relaxed">
          {expanded ? art.description : art.description.slice(0, 180) + '…'}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: art.color }}
        >
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-2 pt-2">
              {art.elements.map((el) => (
                <span
                  key={el}
                  className="text-[9px] tracking-[0.18em] uppercase font-sans px-2.5 py-1 border"
                  style={{ borderColor: `${art.color}40`, color: art.color }}
                >
                  {el}
                </span>
              ))}
            </div>
            <div className="bg-[#0d2d1e]/50 p-4 border-l-2" style={{ borderColor: art.color }}>
              <p className="text-[11px] font-sans text-[#f4ecd8]/55 leading-relaxed italic">
                {art.significance}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function FestivalCard({ festival, idx }: { festival: Festival; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative"
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-6">
        <img
          src={festival.image}
          alt={festival.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2">
            <span
              className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
              style={{ backgroundColor: festival.color, color: '#020d08' }}
            >
              {festival.months}
            </span>
            <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1 bg-[#f4ecd8]/10 text-[#f4ecd8]/80">
              {festival.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: festival.color }}>
            {festival.subtitle}
          </p>
          <h3 className="font-serif text-3xl text-[#f4ecd8]">{festival.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {festival.description}
        </p>

        <div className="pt-2 space-y-2">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Highlights</p>
          <div className="flex flex-wrap gap-1.5">
            {festival.highlights.map((h) => (
              <span key={h} className="text-[9px] font-sans text-[#f4ecd8]/55 bg-[#0d2d1e]/60 px-2.5 py-1">
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35 mb-1.5">Best experienced in</p>
          <p className="font-sans text-xs text-[#f4ecd8]/55">{festival.districts.join(' · ')}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CustomCard({ custom, idx }: { custom: LocalCustom; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
    >
      <div className={`relative overflow-hidden aspect-[4/3] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <img src={custom.image} alt={custom.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/60 to-transparent" />
      </div>

      <div className={`space-y-5 py-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-2" style={{ color: custom.color }}>
            {custom.subtitle}
          </p>
          <h3 className="font-serif text-4xl text-[#f4ecd8] leading-tight">{custom.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {custom.description}
        </p>

        <div className="space-y-2.5 pt-2">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Key Practices</p>
          {custom.practices.map((p) => (
            <div key={p.name} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: custom.color }} />
              <div>
                <span className="font-sans text-xs text-[#f4ecd8]/80 font-medium">{p.name}</span>
                <span className="font-sans text-xs text-[#f4ecd8]/40 ml-2">— {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CulturePage() {
  const [activeTab, setActiveTab] = useState<Tab>('arts');
  const { hero, stats, pullQuote, exploreLinks, tabDescriptions } = cultureMeta;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'arts', label: 'Arts & Folk', icon: <Palette className="w-4 h-4" />, count: artsAndFolk.length },
    { id: 'festivals', label: 'Festivals & Fairs', icon: <Calendar className="w-4 h-4" />, count: festivals.length },
    { id: 'customs', label: 'Local Customs', icon: <Users className="w-4 h-4" />, count: localCustoms.length },
    { id: 'crafts', label: 'Crafts & Livelihoods', icon: <Hammer className="w-4 h-4" />, count: craftsAndLivelihoods.length },
    { id: 'language', label: 'Language & Oral Heritage', icon: <Languages className="w-4 h-4" />, count: oralHeritage.length },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img src={hero.image} alt="Konkan Culture" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/30 via-transparent to-[#020d08]" />
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
              <p className="font-serif text-3xl text-[#c17f3a] mb-1">{s.value}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-4">
        <div className="flex flex-wrap gap-0 border-b border-[#0d2d1e]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-[10px] tracking-[0.22em] uppercase font-sans transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-[#c17f3a] text-[#f4ecd8]'
                  : 'border-transparent text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span
                className={`text-[8px] px-1.5 py-0.5 rounded-sm ${
                  activeTab === tab.id ? 'bg-[#c17f3a] text-[#020d08]' : 'bg-[#0d2d1e] text-[#f4ecd8]/40'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'arts' && (
          <motion.section key="arts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <div className="mb-12">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">{tabDescriptions.arts}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {artsAndFolk.map((art, idx) => <ArtCard key={art.id} art={art} idx={idx} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'festivals' && (
          <motion.section key="festivals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <div className="mb-12">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">{tabDescriptions.festivals}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {festivals.map((festival, idx) => <FestivalCard key={festival.id} festival={festival} idx={idx} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'customs' && (
          <motion.section key="customs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <div className="mb-16">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">{tabDescriptions.customs}</p>
            </div>
            <div className="space-y-24">
              {localCustoms.map((custom, idx) => <CustomCard key={custom.id} custom={custom} idx={idx} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'crafts' && (
          <motion.section key="crafts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <div className="mb-12">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">{tabDescriptions.crafts}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {craftsAndLivelihoods.map((craft, idx) => <ArtCard key={craft.id} art={craft} idx={idx} />)}
            </div>
          </motion.section>
        )}

        {activeTab === 'language' && (
          <motion.section key="language" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-8 md:px-16 py-16">
            <div className="mb-16">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">{tabDescriptions.language}</p>
            </div>
            <div className="space-y-24">
              {oralHeritage.map((item, idx) => <CustomCard key={item.id} custom={item} idx={idx} />)}
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
