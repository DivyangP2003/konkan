import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Palette, Music, Users, Calendar, Heart, Star } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const artsAndFolk = [
  {
    id: 'warli',
    title: 'Warli Painting',
    subtitle: 'Ancient Tribal Art',
    image: '/assets/handicrafts.jpg',
    era: '2500 BCE',
    origin: 'Tribal communities of Palghar & Thane',
    description:
      'One of India\'s oldest art traditions, Warli painting uses simple geometric forms — circles, triangles, and squares — to depict the daily life of tribal communities. These paintings served as ritual acts before marriages and harvests, drawn in white rice paste on mud walls.',
    elements: ['Geometric forms', 'White on earthen red', 'Rice paste medium', 'Ritual purpose', 'Tarpa dance depictions'],
    significance: 'A living UNESCO-recognised art tradition practiced by the Warli tribe for over 2,500 years.',
    color: '#c17f3a',
  },
  {
    id: 'dashavatar',
    title: 'Dashavatar',
    subtitle: 'Divine Drama of Ten Avatars',
    image: '/assets/folk-dance.jpg',
    era: '9th–10th century CE',
    origin: 'Sindhudurg & Ratnagiri districts',
    description:
      'Dashavatar is a classical folk theatre form depicting the ten avatars of Lord Vishnu. Performers don elaborate masks and costumes, enacting cosmic narratives through the night with powerful drumbeats, divine dialogue, and acrobatic feats that can last 12 or more hours.',
    elements: ['Ten Vishnu avatars', 'Wooden masks', 'Night-long performances', 'Sutradhara narrator', 'Sambal drums'],
    significance: 'Recognized as an Important Intangible Cultural Heritage of Maharashtra.',
    color: '#d45f2a',
  },
  {
    id: 'khele',
    title: 'Khele Performances',
    subtitle: 'Coastal Musical Theatre',
    image: '/assets/weddings-rituals.jpg',
    era: 'Medieval period',
    origin: 'Coastal villages of Konkan',
    description:
      'Khele refers to a group of traditional folk performance forms unique to the Konkan coast — combining music, satire, devotion, and storytelling. Forms like Gondhal, Kirtan, and Bajirao Khele vary by district, each carrying unique coastal flavour and local deity worship.',
    elements: ['Call-and-response singing', 'Satirical commentary', 'Village deity worship', 'Seasonal calendar', 'Open-air stages'],
    significance: 'A social glue — these performances resolve disputes, celebrate harvests, and honor village gods.',
    color: '#3a9e6e',
  },
];

const festivals = [
  {
    id: 'ganeshotsav',
    title: 'Ganeshotsav',
    subtitle: 'Grand Festival of Ganesh',
    months: 'August – September',
    duration: '10 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      'The Konkan coast pulses with extraordinary devotion during Ganeshotsav. Unlike urban celebrations, coastal Ganeshotsav is intimate and ancestral — the same idol installed in a family for generations, processions through paddy fields at dusk, and immersion into the sea as fishing boats flank the route.',
    highlights: ['Eco-friendly clay idols', 'Sea immersion processions', '200-year-old family traditions', 'All-night bhajans'],
    districts: ['Ratnagiri', 'Sindhudurg', 'Raigad', 'Thane'],
    color: '#c17f3a',
  },
  {
    id: 'shivjayanti',
    title: 'Shiv Jayanti',
    subtitle: 'Birthday of the Warrior King',
    months: 'February – March',
    duration: '3 days',
    image: '/assets/forts-of-konkan.jpg',
    description:
      'Celebrated with historical reenactments at Shivaji\'s own coastal forts — Sindhudurg, Vijaydurg, Raigad — Shiv Jayanti on the Konkan coast is a living history lesson. Sword processions, Powada recitals (ballads of Shivaji\'s campaigns), and dawn flag-hoisting ceremonies at sea forts create an experience found nowhere else.',
    highlights: ['Fort-based reenactments', 'Powada ballad singing', 'Sword processions', 'Midnight torch parades'],
    districts: ['Sindhudurg', 'Raigad', 'Ratnagiri'],
    color: '#d45f2a',
  },
  {
    id: 'holi',
    title: 'Rang Panchami',
    subtitle: 'Konkan Holi — Five Days of Color',
    months: 'March',
    duration: '5 days',
    image: '/assets/folk-dance.jpg',
    description:
      'Konkan celebrates Rang Panchami — the fifth day of Holi — with particular ferocity and joy. The coastal tradition includes Shimga (a week-long ritual before Holi) where effigies representing evil are burned on beaches, and entire fishing communities emerge in colour, dance, and the raucous music of Tarapa flutes.',
    highlights: ['Shimga bonfire rituals', 'Beach colour celebrations', 'Tarapa flute music', 'Fisher community dances'],
    districts: ['All coastal districts'],
    color: '#2a8fb5',
  },
];

const localCustoms = [
  {
    id: 'weddings',
    title: 'Konkani Wedding Rituals',
    subtitle: '3–5 Day Ceremony',
    image: '/assets/weddings-rituals.jpg',
    description:
      'A traditional Konkani wedding unfolds over three to five days across both families\' homes. Rituals include Haldi (turmeric ceremony by the well), Antarpat (the sacred curtain moment), and Kelvan (feast for all relatives). The bride wears a Nauvari sari in the Paithani style, and the feast includes every variety of Malvani fish preparation.',
    practices: [
      { name: 'Sakhar Puda', desc: 'Sugar exchange ceremony' },
      { name: 'Haldi', desc: 'Turmeric bath at dawn' },
      { name: 'Antarpat', desc: 'Sacred curtain ritual' },
      { name: 'Kelvan', desc: 'Community feast' },
      { name: 'Mangalsutra', desc: 'Sacred thread ceremony' },
    ],
    color: '#c17f3a',
  },
  {
    id: 'fishing',
    title: 'Fishing Community Traditions',
    subtitle: 'Koli & Bhandari Heritage',
    image: '/assets/fishing-traditions.jpg',
    description:
      'The Koli fishing communities have governed the Konkan coast for millennia. Their traditions are tied entirely to the sea — Narali Purnima (Coconut Full Moon) marks the reopening of the sea after monsoon, when decorated boats are launched with coconut offerings. Fish are never wasted, every catch has a buyer before the boat returns to shore.',
    practices: [
      { name: 'Narali Purnima', desc: 'Sea-opening ceremony' },
      { name: 'Boat blessing', desc: 'Annual worship of vessels' },
      { name: 'Net weaving', desc: 'Community craft tradition' },
      { name: 'Fish auction', desc: 'Dawn market rituals' },
      { name: 'Koli songs', desc: 'Sea shanties of the coast' },
    ],
    color: '#2a8fb5',
  },
];

// ── Tab type ──────────────────────────────────────────────────────────────────
type Tab = 'arts' | 'festivals' | 'customs';

// ── Components ────────────────────────────────────────────────────────────────

function ArtCard({ art, idx }: { art: typeof artsAndFolk[0]; idx: number }) {
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

function FestivalCard({ festival, idx }: { festival: typeof festivals[0]; idx: number }) {
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

function CustomCard({ custom, idx }: { custom: typeof localCustoms[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
    >
      <div className={`relative overflow-hidden aspect-[4/3] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <img
          src={custom.image}
          alt={custom.title}
          className="w-full h-full object-cover"
        />
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
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: custom.color }}
              />
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

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'arts', label: 'Arts & Folk', icon: <Palette className="w-4 h-4" />, count: artsAndFolk.length },
    { id: 'festivals', label: 'Festivals & Fairs', icon: <Calendar className="w-4 h-4" />, count: festivals.length },
    { id: 'customs', label: 'Local Customs', icon: <Users className="w-4 h-4" />, count: localCustoms.length },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img
          src="/assets/folk-dance.jpg"
          alt="Konkan Culture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/30 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#c17f3a] mb-4">
                Culture & Customs
              </p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                Living<br />
                <em className="italic text-[#c17f3a]">Traditions</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">
                Centuries of coastal life shaped a culture unlike any other — where the sea, the monsoon,
                and the land interweave in art, ritual, and celebration.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-3 divide-x divide-[#0d2d1e]">
          {[
            { value: '2,500+', label: 'Years of art tradition' },
            { value: '40+', label: 'Folk performance forms' },
            { value: '3', label: 'UNESCO-recognised traditions' },
          ].map((s) => (
            <div key={s.label} className="text-center px-6">
              <p className="font-serif text-3xl text-[#c17f3a] mb-1">{s.value}</p>
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
          <motion.section
            key="arts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">
                The Konkan coast gave birth to some of India's oldest and most distinctive art forms —
                each rooted in devotion, community, and the rhythms of coastal life.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {artsAndFolk.map((art, idx) => (
                <ArtCard key={art.id} art={art} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'festivals' && (
          <motion.section
            key="festivals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-12">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">
                The Konkan calendar is a continuous procession of celebration — monsoon, harvest,
                sea-opening, deity birthdays, and warrior-king anniversaries each demanding their own ceremony.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {festivals.map((festival, idx) => (
                <FestivalCard key={festival.id} festival={festival} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'customs' && (
          <motion.section
            key="customs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-16">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">
                Local customs in Konkan are not performed for tourists — they are lived. Each ritual
                marks a transition: a wedding, a season, a launch into the sea.
              </p>
            </div>
            <div className="space-y-24">
              {localCustoms.map((custom, idx) => (
                <CustomCard key={custom.id} custom={custom} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Pull quote ── */}
      <section className="border-y border-[#0d2d1e] my-8">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 text-center">
          <p className="font-serif text-3xl md:text-5xl text-[#f4ecd8]/80 italic leading-tight">
            "Culture is not what Konkan has. It is what Konkan is."
          </p>
          <p className="mt-6 text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/30">
            — Coastal Proverb
          </p>
        </div>
      </section>

      {/* ── Related links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { href: '/heritage', label: 'Heritage & Monuments', color: '#c17f3a', img: '/assets/sindhudurg-fort-walls.jpg' },
            { href: '/spiritual', label: 'Spiritual & Sacred', color: '#d45f2a', img: '/assets/ganpatipule-temple.jpg' },
            { href: '/food', label: 'Cuisine & Food', color: '#3a9e6e', img: '/assets/konkani-thali.jpg' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden aspect-[16/7] block"
            >
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
