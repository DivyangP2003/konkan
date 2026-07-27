import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  CloudRain, Sun, Waves, AlertTriangle, ChevronRight,
  Thermometer, Fish, Turtle, Leaf, Wind, MapPin, Clock, Camera
} from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { useLocation } from 'wouter';

// ── Season definitions ────────────────────────────────────────────────────────

const seasons = [
  {
    id: 'monsoon',
    label: 'Monsoon Magic',
    subtitle: 'June – September',
    icon: CloudRain,
    accentColor: '#2a8fb5',
    bgGradient: 'from-[#041d29] via-[#020d08] to-[#020d08]',
    heroImage: '/assets/monsoon.jpg',
    tagline: 'When the Ghats Drink the Sky',
    description:
      'The southwest monsoon transforms Konkan into a landscape of almost surreal verdure. Waterfalls erupt from clifftops, rice paddies mirror the storm-grey sky, and the beaches belong only to the herons. This is the coast at its most intimate — stripped of tourist crowds, returned to itself.',
    stats: [
      { value: '400 cm+', label: 'Annual Rainfall' },
      { value: '28°C', label: 'Avg Temperature' },
      { value: '3x', label: 'More Waterfalls' },
      { value: '80%', label: 'Fewer Crowds' },
    ],
    sections: [
      {
        title: 'What to Expect',
        icon: Wind,
        content: [
          'Dramatic 400cm+ seasonal rainfall — heaviest July through August',
          'Waterfalls at their absolute peak: Thoseghar, Vajrai, Amboli',
          'Western Ghats draped in 40 shades of green',
          'Empty beaches with powerful, dramatic surf',
          'Fog-wrapped villages and firefly evenings',
          'Laterite cliffs streaked ochre-red from rain',
        ],
      },
      {
        title: 'Best Monsoon Destinations',
        icon: MapPin,
        content: [
          'Amboli — misty hill station with waterfalls and cloud forests',
          'Malvan — rain-washed Sindhudurg Fort and empty fishing villages',
          'Marleshwar — ancient temple amid 600-ft waterfall gorge',
          'Thoseghar — 500m cascade series, Maharashtra\'s highest waterfall cluster',
          'Dapoli — green highland plateau above the Arabian Sea',
          'Guhagar Beach — deserted sands backed by swaying palms',
        ],
      },
      {
        title: 'Unique Monsoon Activities',
        icon: Leaf,
        content: [
          'Rice field walks through flooded paddies with local farmers',
          'Waterfall trekking (Amboli, Thoseghar, Devkund)',
          'Shimga festival celebrations in coastal villages',
          'Firefly watching in forest clearings after 9pm',
          'Konkani home cooking with freshly harvested monsoon greens',
          'Konkan Railway scenic journey through tunnels and viaducts',
        ],
      },
      {
        title: 'Safety & Tips',
        icon: AlertTriangle,
        content: [
          'Avoid beach swimming — rip currents and high surf are dangerous',
          'Check weather forecasts; some roads wash out in heavy rainfall',
          'Carry waterproof gear — light rain is constant, heavy bursts are sudden',
          'Leeches are common on forest trails — wear full trousers and salt packets',
          'Book homestays in advance — options are limited but exceptional',
          'Best visited in late June or early September for moderate conditions',
        ],
      },
    ],
  },
  {
    id: 'winter',
    label: 'Winter Beaches',
    subtitle: 'October – March',
    icon: Waves,
    accentColor: '#c17f3a',
    bgGradient: 'from-[#1a0d02] via-[#020d08] to-[#020d08]',
    heroImage: '/assets/coastal-landscape.jpg',
    tagline: 'The Coast at Its Finest Hour',
    description:
      'Peak season on the Konkan coast: warm dry air, calm turquoise seas, and the entire natural and cultural calendar at full bloom. Olive ridley turtles nest at Velas, water sports fill the bays at Tarkarli, whale pods pass offshore, and every fort and temple shines under unobscured winter sun.',
    stats: [
      { value: '28–32°C', label: 'Perfect Temp' },
      { value: '6 months', label: 'Peak Season' },
      { value: 'Feb–Mar', label: 'Turtle Festival' },
      { value: '100+', label: 'Water Sport Spots' },
    ],
    sections: [
      {
        title: 'Peak Season Highlights',
        icon: Sun,
        content: [
          'Ideal weather: sunny, dry, 28–32°C with low humidity',
          'Calm Arabian Sea — perfect for water sports and snorkeling',
          'All beaches accessible; most resort properties open',
          'Olive ridley sea turtle nesting season (November–February)',
          'Humpback and blue whale sightings offshore (November–January)',
          'All heritage sites, forts, and temples in optimal visiting condition',
        ],
      },
      {
        title: 'Best Beaches by Region',
        icon: MapPin,
        content: [
          'North — Alibaug, Murud, Kashid, Shrivardhan (easy from Mumbai)',
          'Central — Diveagar, Harihareshwar, Ganapatipule, Guhagar',
          'South — Tarkarli, Vengurla, Redi Beach (remote and stunning)',
          'Island — Tarkarli Island MTDC camp, Khanderi day-trip',
          'Hidden — Velas for turtle nesting, Anjarle for seclusion',
          'Adventure — Scuba at Malvan Marine Sanctuary (best visibility)',
        ],
      },
      {
        title: 'Velas Turtle Festival — Complete Guide',
        icon: Turtle,
        content: [
          'When: Late February through March (exact dates vary with nesting)',
          'Where: Velas village, Ratnagiri district — accessible from Diveagar',
          'What: Olive ridley hatchlings emerge at dawn; village-led releases',
          'Organised by: Sahyadri Nisarga Mitra — book their homestay packages',
          'What to bring: Torch (red-lens only), warm layer for pre-dawn vigils',
          'Photography: No flash permitted during hatching or release',
        ],
      },
      {
        title: 'Water Sports Hub — Tarkarli',
        icon: Fish,
        content: [
          'Scuba diving in the Marine Sanctuary — visibility 15–20m in winter',
          'Snorkeling at Rock Garden, Tsunami Island, Chivla Beach',
          'Kayaking through Karli River backwaters at sunrise',
          'Parasailing, jet-skiing, banana boats at Malvan beach',
          'Glass-bottom boat tours over coral reefs',
          'MTDC water sports complex open daily 9am–6pm',
        ],
      },
    ],
  },
  {
    id: 'summer',
    label: 'Summer Retreats',
    subtitle: 'April – May',
    icon: Sun,
    accentColor: '#3a9e6e',
    bgGradient: 'from-[#031a10] via-[#020d08] to-[#020d08]',
    heroImage: '/assets/devgad-orchards.jpg',
    tagline: 'Mango Season & the Off-Peak Escape',
    description:
      'Summer on the Konkan is a secret the locals keep. The Alphonso mango harvest turns the air fragrant from Ratnagiri to Devgad, cashew groves drip with fruit, and the beaches — still flowing with late-season waterfalls — are nearly empty. Off-season rates drop dramatically; the coast becomes intimate again.',
    stats: [
      { value: 'Apr–May', label: 'Mango Season' },
      { value: '40%', label: 'Off-season Discount' },
      { value: '100+', label: 'Mango Varieties' },
      { value: '35°C', label: 'Coastal Temp' },
    ],
    sections: [
      {
        title: 'Alphonso Mango Season',
        icon: Leaf,
        content: [
          'Season runs March through May — peak in April',
          'Devgad and Ratnagiri GI-certified Alphonso — best in the world',
          'Plantation visits: walk the orchard, pick direct from the tree',
          'Buy direct from farmers at roadside stalls — no middlemen',
          'Mango-based foods: aamras, amba poli, mango pickle, raw mango curry',
          'Ratnagiri Mango Festival (April) — tastings, auctions, cultural programs',
        ],
      },
      {
        title: 'Cashew & Feni Trail',
        icon: Fish,
        content: [
          'Cashew apple harvest: February through April in Sindhudurg',
          'Feni distilleries welcome visitors in Vengurla and Sawantwadi',
          'Watch traditional clay-pot distillation — ancient technique unchanged',
          'Tasting sessions of single-distilled (urrak) and double-distilled feni',
          'Buy directly from licensed distilleries — no retail markup',
          'Kokum sherbet and kokum agal available fresh at village homes',
        ],
      },
      {
        title: 'Waterfalls & Hill Stations',
        icon: Waves,
        content: [
          'Some waterfalls still flowing from late monsoon runoff (April)',
          'Amboli — Maharashtra\'s wettest hill station, cooler than the coast',
          'Thoseghar waterfalls accessible year-round though best in monsoon',
          'Fewer trekking crowds; forest trails quieter and wilder',
          'Wildlife sanctuaries: Dajipur for bison, Phansad for deer',
          'Coastal wildlife: whale sightings taper but dolphins still active',
        ],
      },
      {
        title: 'Heat Tips & Smart Travel',
        icon: AlertTriangle,
        content: [
          'Coastal temperatures reach 35–38°C; humidity rises through May',
          'Amboli (700m) is 6–8°C cooler — ideal summer base',
          'Beach swimming is good but start early — before 8am or after 4pm',
          'Book accommodation early: off-season discounts are real (40–50% off)',
          'Most heritage sites cooler to visit: stone forts stay 3°C below ambient',
          'Carry ORS, wear sun protection, schedule midday rest at your stay',
        ],
      },
    ],
  },
] as const;

// ── Animated calendar bar ────────────────────────────────────────────────────

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthSeasons: Record<string, string> = {
  Jan: 'winter', Feb: 'winter', Mar: 'winter',
  Apr: 'summer', May: 'summer',
  Jun: 'monsoon', Jul: 'monsoon', Aug: 'monsoon', Sep: 'monsoon',
  Oct: 'winter', Nov: 'winter', Dec: 'winter',
};
const seasonColors: Record<string, string> = {
  monsoon: '#2a8fb5',
  winter: '#c17f3a',
  summer: '#3a9e6e',
};

function SeasonCalendar({ activeSeason, onSelect }: { activeSeason: string; onSelect: (s: string) => void }) {
  return (
    <div className="flex gap-1 items-end justify-center flex-wrap">
      {months.map(m => {
        const s = monthSeasons[m];
        const isActive = s === activeSeason;
        return (
          <button
            key={m}
            onClick={() => onSelect(s)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className="w-8 h-10 md:w-10 md:h-14 transition-all duration-300 rounded-sm"
              style={{
                backgroundColor: isActive ? seasonColors[s] : `${seasonColors[s]}40`,
                transform: isActive ? 'scaleY(1.2)' : 'scaleY(1)',
              }}
            />
            <span
              className="text-[9px] tracking-wider uppercase font-sans transition-colors duration-300"
              style={{ color: isActive ? seasonColors[s] : '#f4ecd8' + '60' }}
            >
              {m}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Section card ────────────────────────────────────────────────────────────

function SectionCard({
  section,
  accentColor,
  index,
}: {
  section: { title: string; icon: React.ComponentType<{ className?: string }>; content: string[] };
  accentColor: string;
  index: number;
}) {
  const Icon = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="border border-[#0d2d1e] p-8 relative group hover:border-[#1a4a30] transition-colors duration-500"
    >
      {/* accent corner */}
      <div
        className="absolute top-0 left-0 w-8 h-1"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <h3 className="font-serif text-lg text-[#f4ecd8]">{section.title}</h3>
      </div>
      <ul className="space-y-3">
        {section.content.map((item, i) => (
          <li key={i} className="flex gap-3 font-sans text-sm text-[#f4ecd8]/70 leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function SeasonalPage() {
  const [activeSeason, setActiveSeason] = useState<string>('monsoon');
  const [, navigate] = useLocation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const season = seasons.find(s => s.id === activeSeason) ?? seasons[0];
  const Icon = season.icon;

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={season.heroImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ y: heroY }}
          >
            <img
              src={season.heroImage}
              alt={season.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/60 via-[#020d08]/40 to-[#020d08]" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="h-px w-16 bg-[#3a9e6e]/60" />
            <span className="text-[11px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e]">
              Seasonal Guide
            </span>
            <div className="h-px w-16 bg-[#3a9e6e]/60" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f4ecd8] leading-none mb-4">
                {season.label}
              </h1>
              <p
                className="font-serif text-xl md:text-2xl italic mb-4"
                style={{ color: season.accentColor }}
              >
                {season.tagline}
              </p>
              <p className="font-sans text-[#f4ecd8]/65 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {season.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Season selector tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 justify-center mt-12 flex-wrap"
          >
            {seasons.map(s => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSeason(s.id)}
                  className="flex items-center gap-2 px-5 py-2.5 border text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300"
                  style={{
                    borderColor: activeSeason === s.id ? s.accentColor : '#0d2d1e',
                    color: activeSeason === s.id ? s.accentColor : '#f4ecd8' + '60',
                    backgroundColor: activeSeason === s.id ? `${s.accentColor}15` : 'transparent',
                  }}
                >
                  <SIcon className="w-3 h-3" />
                  {s.label}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/40">Explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#f4ecd8]/40 to-transparent" />
        </motion.div>
      </div>

      {/* ── SEASON STATS ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`stats-${activeSeason}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border-y border-[#0d2d1e] py-14 px-6"
        >
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {season.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="font-serif text-3xl md:text-4xl font-light mb-1"
                  style={{ color: season.accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#f4ecd8]/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── CALENDAR BAR ──────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#0d2d1e]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/40 text-center mb-8">
            When to visit — click a month to switch season
          </p>
          <SeasonCalendar activeSeason={activeSeason} onSelect={setActiveSeason} />
          <div className="flex gap-6 justify-center mt-6 flex-wrap">
            {seasons.map(s => (
              <div key={s.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: seasonColors[s.id] }} />
                <span className="text-[10px] tracking-widest uppercase font-sans" style={{ color: seasonColors[s.id] }}>
                  {s.label.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASON DETAIL SECTIONS ────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={`sections-${activeSeason}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-[#0d2d1e]" />
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{ backgroundColor: `${season.accentColor}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: season.accentColor }} />
              </div>
              <div className="h-px flex-1 bg-[#0d2d1e]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#f4ecd8] text-center mb-3">
              {season.label}
            </h2>
            <p
              className="text-center font-sans text-sm tracking-widest uppercase mb-16"
              style={{ color: season.accentColor }}
            >
              {season.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {season.sections.map((section, i) => (
                <SectionCard
                  key={section.title}
                  section={section}
                  accentColor={season.accentColor}
                  index={i}
                />
              ))}
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ── QUICK SWITCH NAVIGATOR ────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-[#0d2d1e] bg-[#040f08]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/40 text-center mb-10">
            Explore All Seasons
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {seasons.map(s => {
              const SIcon = s.icon;
              const isActive = s.id === activeSeason;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSeason(s.id)}
                  className="relative overflow-hidden border p-8 text-left group transition-all duration-500"
                  style={{
                    borderColor: isActive ? s.accentColor : '#0d2d1e',
                    backgroundColor: isActive ? `${s.accentColor}10` : 'transparent',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 transition-transform duration-500 origin-left"
                    style={{
                      backgroundColor: s.accentColor,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  <SIcon className="w-5 h-5 mb-4" style={{ color: s.accentColor }} />
                  <div className="font-serif text-xl text-[#f4ecd8] mb-1">{s.label}</div>
                  <div
                    className="text-[10px] tracking-widest uppercase font-sans mb-3"
                    style={{ color: s.accentColor }}
                  >
                    {s.subtitle}
                  </div>
                  <p className="text-xs font-sans text-[#f4ecd8]/50 leading-relaxed line-clamp-3">
                    {s.description.slice(0, 120)}…
                  </p>
                  <div
                    className="flex items-center gap-1 mt-4 text-[10px] tracking-widest uppercase font-sans"
                    style={{ color: s.accentColor }}
                  >
                    Explore <ChevronRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PLAN CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[#0d2d1e] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('/assets/waterfall-forest.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Camera className="w-4 h-4 text-[#3a9e6e]" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e]">
              Ready to explore?
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f4ecd8] mb-6 leading-tight">
            Plan Your Konkan Journey
          </h2>
          <p className="font-sans text-[#f4ecd8]/60 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
            Every season reveals a different face of the coast. Use our trip planner to
            build your perfect itinerary — from mango orchards to monsoon waterfalls.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/plan')}
              className="px-8 py-3 bg-[#3a9e6e] text-[#020d08] text-[11px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-[#4ab57e] transition-colors duration-300"
            >
              Build Your Itinerary
            </button>
            <button
              onClick={() => navigate('/destinations')}
              className="px-8 py-3 border border-[#0d2d1e] text-[#f4ecd8]/70 text-[11px] tracking-[0.25em] uppercase font-sans hover:border-[#3a9e6e] hover:text-[#3a9e6e] transition-colors duration-300"
            >
              Browse Destinations
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
