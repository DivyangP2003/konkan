import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Sun, Route, ScrollText, MapPin, Clock, Star } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const majorTemples = [
  {
    id: 'ganpatipule',
    title: 'Ganpatipule Temple',
    subtitle: 'Swayambhu Lord of the West',
    location: 'Ganpatipule, Ratnagiri district',
    deity: 'Lord Ganesha (Swayambhu)',
    period: 'Ancient; present form 400+ years',
    image: '/assets/ganpatipule-temple.jpg',
    description:
      'The Swayambhu (self-manifested) Ganpati idol at Ganpatipule is believed to have appeared from the earth — not carved or installed. The temple faces west, uniquely looking toward the sea, and the idol is said to guard the entire western coast of India. On Ganesh Chaturthi, over 100,000 devotees descend on this tiny coastal town.',
    rituals: [
      { name: 'Kakad Aarti', time: '5:00 AM', desc: 'Dawn awakening of the deity' },
      { name: 'Panchamrut Abhishek', time: '6:30 AM', desc: 'Sacred five-substance bathing' },
      { name: 'Madhyan Aarti', time: '12:00 PM', desc: 'Noon offering' },
      { name: 'Sanjeevan Aarti', time: '7:00 PM', desc: 'Evening lamp ceremony' },
      { name: 'Shejarti', time: '10:00 PM', desc: 'Night rest of the deity' },
    ],
    legend: 'Legend holds that a brahmin named Ramchandra Mama found the idol self-emerged from the earth here 400 years ago, after a divine dream.',
    prasad: 'Modak (steamed sweet dumpling)',
    bestTime: 'Ganesh Chaturthi (Aug–Sept) or weekdays for quiet darshan',
    color: '#d45f2a',
    distanceFromMumbai: '375 km',
  },
  {
    id: 'marleshwar',
    title: 'Marleshwar Temple',
    subtitle: 'Shiva in the Monsoon Waterfall',
    location: 'Marleshwar, Sangameshwar, Ratnagiri',
    deity: 'Lord Shiva (Marleshwar Mahadev)',
    period: 'Ancient — referenced in Skanda Purana',
    image: '/assets/waterfall-forest.jpg',
    description:
      'Marleshwar is one of India\'s most unusual and dramatic Shiva temples — the sanctum is inside a cave behind a monsoon waterfall. During the rainy season, devotees wade through knee-deep water along a forested path, then pass through the waterfall curtain itself to reach the Shivalinga. In peak monsoon, the waterfall literally covers the temple entrance.',
    rituals: [
      { name: 'Abhishek', time: 'Morning', desc: 'Water offering to Shivalinga — nature itself provides the water via the falls' },
      { name: 'Bilva Puja', time: 'Daily', desc: 'Sacred bael leaf offering' },
      { name: 'Mahashivratri', time: 'Annual', desc: '24-hour night vigil with thousands of pilgrims' },
      { name: 'Shravana Somvar', time: 'Monsoon Mondays', desc: 'Peak pilgrimage — 40,000+ devotees' },
    ],
    legend: 'The Marleshwar Shivalinga is said to be one of the five Panchalingas of the Konkan — each representing an element. Marleshwar represents water.',
    prasad: 'Bael patra and coconut',
    bestTime: 'Monsoon (July–August) for waterfall effect; or Mahashivratri',
    color: '#2a8fb5',
    distanceFromMumbai: '360 km',
  },
  {
    id: 'kunkeshwar',
    title: 'Kunkeshwar Temple',
    subtitle: 'Ancient Shiva on the Cliff\'s Edge',
    location: 'Kunkeshwar, Devgad, Sindhudurg',
    deity: 'Lord Shiva (Kunkeshwar Mahadev)',
    period: '12th century CE (Hemadpanthi architecture)',
    image: '/assets/kunkeshwar-temple.jpg',
    description:
      'Perched dramatically on a cliff above the Arabian Sea, Kunkeshwar is a 12th-century Hemadpanthi-style temple of extraordinary precision and beauty. The temple faces east, catches the first light, and the sound of waves breaking against the cliff below accompanies every prayer. The Shivalinga here is said to be immovable — all attempts to relocate it during Muslim invasions allegedly failed miraculously.',
    rituals: [
      { name: 'Surya Aarti', time: '6:00 AM', desc: 'Sun worship as it rises over the sea behind the temple' },
      { name: 'Abhishek', time: 'Morning', desc: 'With seawater carried from the cliff base by priests' },
      { name: 'Rudraabhishek', time: 'Mondays', desc: 'Extended Shiva worship with 108 offerings' },
      { name: 'Mahashivratri Yatra', time: 'Annual', desc: 'Three-day fair with sea-bathing ritual at dawn' },
    ],
    legend: 'Local tradition holds that Lord Parashurama, having created the Konkan by throwing his axe into the sea, established Kunkeshwar as the guardian deity of the entire Sindhudurg coast.',
    prasad: 'Shrikhand (sweetened strained yoghurt)',
    bestTime: 'Monsoon for dramatic cliff views; October–March for calm sea',
    color: '#c17f3a',
    distanceFromMumbai: '510 km',
  },
];

const pilgrimageRoutes = [
  {
    id: 'ashtavinayak',
    title: 'Ashtavinayak — Eight Sacred Ganeshas',
    duration: '3–5 days',
    distance: '~480 km circular route',
    startEnd: 'Pune',
    image: '/assets/religious-mosaic.jpg',
    description:
      'The Ashtavinayak pilgrimage covers eight ancient Ganesha temples arranged in a sacred circuit around Pune — three of which fall within the Konkan hinterland. The route passes through the Sahyadri ranges and descends to the coast, offering both spiritual depth and extraordinary natural beauty.',
    temples: ['Morgaon (Moreshwar)', 'Siddhatek', 'Pali (Ballaleshwar)', 'Mahad (Varadavinayak)', 'Theur', 'Lenyadri', 'Ozar', 'Ranjangaon'],
    significance: 'Completing the circuit once is said to yield the blessings equivalent of a lifetime of worship.',
    color: '#d45f2a',
  },
  {
    id: 'jyotirlinga',
    title: 'Bhimashankar to Parli — Jyotirlinga Yatra',
    duration: '4–7 days',
    distance: '600 km',
    startEnd: 'Mumbai / Pune',
    image: '/assets/sacred-groves.jpg',
    description:
      'Maharashtra holds five of the twelve Jyotirlingas — the most sacred Shiva shrines in India. The Konkan pilgrimage connects three of them: Bhimashankar (in the Sahyadri forests above the coast), Tryambakeshwar (near Nashik), and Ghrishneshwar (Aurangabad). The route weaves between the Ghats and the coast.',
    temples: ['Bhimashankar (Sahyadri)', 'Tryambakeshwar (Nashik)', 'Ghrishneshwar (Aurangabad)', 'Parli Vaijnath (Beed)'],
    significance: 'Each Jyotirlinga represents one of the twelve cosmic manifestations of Shiva\'s eternal flame.',
    color: '#2a8fb5',
  },
  {
    id: 'coastal-temples',
    title: 'Coastal Goddess Trail',
    duration: '5–7 days',
    distance: '720 km along coast',
    startEnd: 'Mumbai to Goa border',
    image: '/assets/fishing-traditions.jpg',
    description:
      'A lesser-known but deeply moving pilgrimage — driving the entire Konkan coast from north to south, stopping at the major goddess temples: Ekvira (Karla), Mahalaxmi (Kolhapur), Bhagavati (Sawantwadi), Sateri (Malvan), and ending at the Shantadurga of Goa. The route traces the same path ancient sailors took to seek blessings before crossing the monsoon sea.',
    temples: ['Ekvira Devi (Karla)', 'Jivdani Mata (Virar)', 'Bhagavati Devi (Sawantwadi)', 'Sateri Devi (Malvan)', 'Shantadurga (Goa)'],
    significance: 'Known locally as the "Shakti Path" — the path of feminine divine power along the coast.',
    color: '#3a9e6e',
  },
];

const rituals = [
  {
    id: 'aarti',
    title: 'Aarti & Temple Protocols',
    icon: <Sun className="w-5 h-5" />,
    description: 'Every Konkan temple follows a strict daily schedule of five to seven aartis (lamp ceremonies). The Kakad Aarti at dawn is the most sacred — the deity is "awakened" with a small flame, incense, and the conch. Devotees must arrive fasted for this ceremony. Evening aartis are communal — hundreds gather as the entire temple courtyard fills with the smell of camphor and the sound of bells.',
    practices: [
      'Shoes removed before the temple gate, not the entrance',
      'Clockwise circumambulation (pradakshina) — specific number per deity',
      'Coconut offered whole — priest breaks it for prasad',
      'Women in nine-yard saris for major festivals',
      'Silence maintained during abhishek (ritual bathing)',
    ],
    color: '#d45f2a',
  },
  {
    id: 'festivals-sacred',
    title: 'Sacred Calendar of the Coast',
    icon: <Star className="w-5 h-5" />,
    description: 'The Konkan sacred calendar is governed not by the solar year but by the lunar tide — every major ritual is timed to the moon phase, the monsoon, or the fishing season. The year begins with Gudhi Padwa (the Marathi New Year), when new sacred threads are installed on idols. The monsoon months are considered particularly sacred — Lord Vishnu is said to sleep (Devshayani Ekadashi) while Shiva reigns over the earth.',
    practices: [
      'Gudhi Padwa (New Year): Sacred flag raised at every home',
      'Devshayani Ekadashi: Vishnu "sleeps" — only Shiva worship for 4 months',
      'Navratri: Nine nights of goddess worship along the entire coast',
      'Tripuri Pournima: Kartik full moon — lamps floated on the sea',
      'Makar Sankranti: Sesame and jaggery shared, sea bathing at dawn',
    ],
    color: '#c17f3a',
  },
  {
    id: 'scriptures',
    title: 'Living Scriptures',
    icon: <ScrollText className="w-5 h-5" />,
    description: 'Konkani Brahmin households often maintain manuscript copies of the Rigveda, passed down through generations. The tradition of Ghanapath (a rigorous chanting method requiring 12 years of training) is still practiced in Konkan, with some families that have maintained unbroken chanting lineages for 600 years. The Konkani Ramayana, composed in the coastal Karhadi dialect, is still recited in full over seven evenings during certain temple festivals.',
    practices: [
      'Ghanapath recitation lineages — 600+ years unbroken',
      'Konkani Ramayana in Karhadi dialect — seven-evening recitation',
      'Manuscript preservation — birch bark and copper plate texts',
      'Kirtan tradition: Musical scripture narration, 4–6 hours long',
      'Pravachan: Discourses by scholars tied to the festival calendar',
    ],
    color: '#3a9e6e',
  },
];

type Tab = 'temples' | 'routes' | 'rituals';

// ── Temple Card ───────────────────────────────────────────────────────────────
function TempleCard({ temple, idx }: { temple: typeof majorTemples[0]; idx: number }) {
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
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: temple.color }}>
            {temple.subtitle}
          </p>
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
            {/* Rituals */}
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

            {/* Legend */}
            <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${temple.color}60` }}>
              <p className="text-[8.5px] tracking-[0.22em] uppercase font-sans mb-1" style={{ color: temple.color }}>Legend</p>
              <p className="font-sans text-xs text-[#f4ecd8]/50 italic">{temple.legend}</p>
            </div>

            {/* Practical */}
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
function RouteCard({ route, idx }: { route: typeof pilgrimageRoutes[0]; idx: number }) {
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
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-2" style={{ color: route.color }}>
            Pilgrimage Route
          </p>
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
function RitualCard({ ritual, idx }: { ritual: typeof rituals[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="p-8 border border-[#0d2d1e] bg-[#0d2d1e]/20 hover:bg-[#0d2d1e]/40 transition-colors"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="p-3" style={{ backgroundColor: `${ritual.color}20` }}>
          <div style={{ color: ritual.color }}>{ritual.icon}</div>
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
        <img src="/assets/ganpatipule-temple.jpg" alt="Spiritual Konkan" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/10 to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#d45f2a] mb-4">
                Spiritual & Sacred
              </p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                Where the<br />
                <em className="italic text-[#d45f2a]">Divine Dwells</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">
                The Konkan coast has been a pilgrimage destination for two millennia — its temples
                rising from cliffside, jungle, and sea with equal force of devotion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-3 divide-x divide-[#0d2d1e]">
          {[
            { value: '200+', label: 'Ancient temples on the coast' },
            { value: '3', label: 'Major pilgrimage circuits' },
            { value: '5', label: 'Jyotirlingas in Maharashtra' },
          ].map((s) => (
            <div key={s.label} className="text-center px-6">
              <p className="font-serif text-3xl text-[#d45f2a] mb-1">{s.value}</p>
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
          <motion.section
            key="temples"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-12">
              These are not tourist attractions. Each temple is a living centre of faith —
              daily rituals unchanged for centuries, priests whose families have served the same deity
              for thirty generations, and devotees who walk days to be here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
              {majorTemples.map((temple, idx) => (
                <TempleCard key={temple.id} temple={temple} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'routes' && (
          <motion.section
            key="routes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-16">
              Pilgrimage in Konkan is not just about the destination — it is about the journey through
              the landscape. The routes pass through forest, river, and coast with a logic that feels
              both sacred and geographic at once.
            </p>
            <div className="space-y-24">
              {pilgrimageRoutes.map((route, idx) => (
                <RouteCard key={route.id} route={route} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'rituals' && (
          <motion.section
            key="rituals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-12">
              The spiritual life of Konkan is carried in sound — the conch, the bell, the chant — 
              and in practices so old they predate recorded history. These are the living scriptures of the coast.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rituals.map((ritual, idx) => (
                <RitualCard key={ritual.id} ritual={ritual} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Pull quote ── */}
      <section className="border-y border-[#0d2d1e] my-8">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 text-center">
          <p className="font-serif text-3xl md:text-5xl text-[#f4ecd8]/80 italic leading-tight">
            "The sacred and the sea are not two things here.<br className="hidden md:block" />
            They are the same threshold."
          </p>
          <p className="mt-6 text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/30">
            — Konkani Coastal Saying
          </p>
        </div>
      </section>

      {/* ── Related links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { href: '/culture', label: 'Culture & Customs', img: '/assets/folk-dance.jpg' },
            { href: '/heritage', label: 'Heritage & Monuments', img: '/assets/sindhudurg-fort-walls.jpg' },
            { href: '/activities', label: 'Activities', img: '/assets/water-sports.jpg' },
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
