import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Shield, Landmark, BookOpen, MapPin, Clock } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const archaeological = [
  {
    id: 'petroglyphs',
    title: 'Prehistoric Petroglyphs',
    subtitle: 'Earliest Human Art in South Asia',
    location: 'Ratnagiri district — Ukshi, Barsu, Devache Gothane',
    period: '10,000 – 3,000 BCE',
    image: '/assets/temple-carvings.jpg',
    description:
      'Discovered in 2018 and still being catalogued, the Konkan petroglyphs are among the most significant archaeological finds in modern India. Over 1,500 carvings of animals, humans, and geometric symbols are spread across 52+ sites carved into laterite plateaus — a record of prehistoric human cognition visible only from above.',
    details: [
      '1,500+ carvings identified across 52 sites',
      'Figures include rhinoceros, hippo, shark, and elephant',
      'Geometric patterns suggesting early astronomy',
      'Best viewed at dawn or dusk when shadows give depth',
      'Accessible by guided walks only — fragile surface',
    ],
    howToVisit: 'Drive from Ratnagiri via Lanja Road; local guides at Ukshi village are essential.',
    color: '#c17f3a',
    distanceFromMumbai: '340 km',
  },
  {
    id: 'caves',
    title: 'Rock-cut Caves',
    subtitle: 'Buddhist Monastic Architecture',
    location: 'Kuda Caves (Murud), Mandapeshwar (Borivali), Elephanta',
    period: '3rd century BCE – 12th century CE',
    image: '/assets/ocean-cliffs.jpg',
    description:
      'The Konkan coast is dotted with rock-cut caves carved by Buddhist monks and later adapted by Hindu communities. The Kuda Caves at Murud — 26 cave chambers cut into a laterite hill — date to the early 1st millennium CE and served as monsoon retreats for Buddhist sanghas traveling the ancient maritime silk route.',
    details: [
      '26 cave chambers at Kuda alone',
      'Inscriptions in early Brahmi script',
      'Water cisterns showing advanced hydraulics',
      'Later adaptation by Hindu and Jain communities',
      'Accessible year-round; monsoon adds cascading streams',
    ],
    howToVisit: 'Kuda Caves: 12 km from Murud town via ferry to Kashid, then road.',
    color: '#2a8fb5',
    distanceFromMumbai: '165 km',
  },
];

const forts = [
  {
    id: 'sindhudurg',
    title: 'Sindhudurg Fort',
    subtitle: 'The Sea Diamond of Shivaji',
    location: 'Malvan, Sindhudurg district',
    built: '1664–1667 CE',
    builder: 'Chhatrapati Shivaji Maharaj',
    image: '/assets/sindhudurg-fort-walls.jpg',
    description:
      'Built on a 48-acre island in the Arabian Sea using 4,000 tonnes of lead to bind its foundations to the sea rock, Sindhudurg is Shivaji\'s naval masterstroke. It houses a temple with the only known life-cast impression of Shivaji\'s hand and foot — made from actual plaster cast of the king himself.',
    features: [
      'Built on 3 rocky islands merged with mortar',
      'Walls 3 km long, 9–12 metres high',
      'Temple with Shivaji\'s hand & foot impressions',
      'Three freshwater wells (miraculous, as the fort sits in the sea)',
      'Secret passages and ramparts facing 5 directions',
    ],
    bestTime: 'November to March (boat accessible, sea calm)',
    color: '#c17f3a',
    distanceFromMumbai: '490 km',
  },
  {
    id: 'vijaydurg',
    title: 'Vijaydurg Fort',
    subtitle: 'The Gibraltar of the East',
    location: 'Vijaydurg, Sindhudurg district',
    built: '9th century CE (expanded 17th century)',
    builder: 'Shilaharas; expanded by Shivaji',
    image: '/assets/forts-of-konkan.jpg',
    description:
      'The oldest fort on the Konkan coast — over 1,200 years old — Vijaydurg sits at the mouth of the Wagad River where it meets the sea. Known as the "Gibraltar of the East," it controlled all maritime trade on the Konkan. Shivaji\'s admiral Kanhoji Angre made this his naval base in the 18th century, defeating British and Portuguese navies from here.',
    features: [
      '17 bastions surrounding the perimeter',
      'Three enclosures, each more fortified inward',
      'Docks for warships carved into the cliff face',
      'A 13th bastion built as a decoy to confuse enemies',
      'Submerged outer walls visible at low tide',
    ],
    bestTime: 'October to February; submerged walls visible November–January low tides',
    color: '#d45f2a',
    distanceFromMumbai: '480 km',
  },
  {
    id: 'raigad',
    title: 'Raigad Fort',
    subtitle: 'Capital of the Maratha Empire',
    location: 'Mahad, Raigad district',
    built: '1030 CE (reconstructed 1656–1664 CE)',
    builder: 'Chhatrapati Shivaji Maharaj (rebuilt)',
    image: '/assets/murud-janjira-fort.jpg',
    description:
      'Perched 820 metres above sea level on an isolated mesa, Raigad was the capital where Shivaji Maharaj was crowned King of the Marathas on June 6, 1674. The fort contains over 300 structures including Shivaji\'s throne room, audience halls, market streets, and his samadhi (memorial). A ropeway connects the base village to the summit.',
    features: [
      'Ropeway from base to 820m summit',
      'Shivaji\'s coronation throne — Sinhasana',
      'Market street with 22 shops still visible',
      '2,700 steps carved from base to summit (still climbable)',
      'Samadhi of Shivaji Maharaj — sacred and serene',
    ],
    bestTime: 'November to February; avoid monsoon (fog and landslide risk)',
    color: '#800020',
    distanceFromMumbai: '220 km',
  },
];

const epicConnections = [
  {
    id: 'ramayana',
    title: 'Ramayana Sites',
    subtitle: 'Where Rama Walked the Shore',
    image: '/assets/ganpatipule-temple.jpg',
    description:
      'Local tradition holds that Lord Rama crossed the Konkan coast during his southward journey to Lanka — and multiple sites claim their connection. Harihareshwar, where the Savitri and Kali rivers meet the sea, is associated with Ram\'s temporary camp. The caves at Velas are said to mark where Ram sought divine counsel before building the bridge to Lanka.',
    sites: [
      { name: 'Harihareshwar', desc: "Ram's coastal rest point" },
      { name: 'Velas Beach', desc: 'Site of divine counsel, ancient cave shrines' },
      { name: 'Devgad', desc: 'Mentioned in Ramayana as "Deva-grama"' },
      { name: 'Kunkeshwar Temple', desc: 'Consecrated, local tradition claims, by Rama himself' },
    ],
    color: '#d45f2a',
  },
  {
    id: 'mahabharata',
    title: 'Mahabharata Connections',
    subtitle: 'The Pandavas on the Konkan Coast',
    image: '/assets/sacred-groves.jpg',
    description:
      'The Pandavas are said to have traveled through the Konkan during their years of exile (Vanavasa). Several sacred groves — Deool-rai forests — are explicitly protected because the Pandavas rested under them. The Bhimashankar temple in the Sahyadris, though in the hinterland, is said to have been established by Bhima himself.',
    sites: [
      { name: 'Bhimashankar', desc: "Jyotirlinga established by Bhima" },
      { name: 'Pandav Caves, Nashik', desc: 'Residence of the Pandavas during exile' },
      { name: 'Sacred Groves', desc: 'Protected by Pandava rest-stories across Konkan' },
      { name: 'Karna Sagar (Chiplun)', desc: 'Karna said to have donated here' },
    ],
    color: '#3a9e6e',
  },
];

type Tab = 'archaeological' | 'forts' | 'epics';

// ── Fort Card ─────────────────────────────────────────────────────────────────
function FortCard({ fort, idx }: { fort: typeof forts[0]; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[16/9] mb-6">
        <img
          src={fort.image}
          alt={fort.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/20 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-1.5">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: fort.color, color: '#020d08' }}
          >
            {fort.built}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#f4ecd8]/50" />
          <span className="text-[9px] font-sans text-[#f4ecd8]/50">{fort.location}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-1" style={{ color: fort.color }}>
            {fort.subtitle}
          </p>
          <h3 className="font-serif text-3xl text-[#f4ecd8]">{fort.title}</h3>
        </div>

        <div className="flex items-center gap-4 text-[9px] font-sans text-[#f4ecd8]/40">
          <span>Built by {fort.builder}</span>
          <span className="w-1 h-1 rounded-full bg-[#f4ecd8]/20" />
          <span>{fort.distanceFromMumbai} from Mumbai</span>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {open ? fort.description : fort.description.slice(0, 200) + '…'}
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="text-[9px] tracking-[0.28em] uppercase font-sans transition-colors"
          style={{ color: fort.color }}
        >
          {open ? 'Less ↑' : 'Full story ↓'}
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 pt-2"
          >
            <div className="space-y-2">
              <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Notable Features</p>
              {fort.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Shield className="w-3 h-3 mt-0.5 shrink-0" style={{ color: fort.color }} />
                  <span className="font-sans text-xs text-[#f4ecd8]/60">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#0d2d1e]/60 p-3 flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 mt-0.5 text-[#3a9e6e] shrink-0" />
              <div>
                <p className="text-[8.5px] tracking-[0.22em] uppercase font-sans text-[#3a9e6e] mb-0.5">Best Time</p>
                <p className="text-[11px] font-sans text-[#f4ecd8]/50">{fort.bestTime}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Arch Card ─────────────────────────────────────────────────────────────────
function ArchCard({ site, idx }: { site: typeof archaeological[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
    >
      <div className={`relative overflow-hidden aspect-[4/3] ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <img src={site.image} alt={site.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span
            className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1"
            style={{ backgroundColor: site.color, color: '#020d08' }}
          >
            {site.period}
          </span>
        </div>
      </div>

      <div className={`space-y-5 py-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p className="text-[9px] tracking-[0.32em] uppercase font-sans mb-2" style={{ color: site.color }}>
            {site.subtitle}
          </p>
          <h3 className="font-serif text-4xl text-[#f4ecd8] leading-tight">{site.title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#f4ecd8]/30" />
          <span className="font-sans text-xs text-[#f4ecd8]/40">{site.location}</span>
        </div>

        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{site.description}</p>

        <div className="space-y-2 pt-1">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Key Facts</p>
          {site.details.map((d, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: site.color }} />
              <span className="font-sans text-xs text-[#f4ecd8]/60">{d}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#0d2d1e]/60 p-4 space-y-1">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#3a9e6e]">How to Visit</p>
          <p className="font-sans text-xs text-[#f4ecd8]/50">{site.howToVisit}</p>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3" style={{ color: site.color }} />
          <span className="font-sans text-xs text-[#f4ecd8]/40">{site.distanceFromMumbai} from Mumbai</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Epic Card ─────────────────────────────────────────────────────────────────
function EpicCard({ epic, idx }: { epic: typeof epicConnections[0]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[16/9] mb-6">
        <img src={epic.image} alt={epic.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div
          className="absolute top-4 left-4 text-[8px] tracking-[0.28em] uppercase font-sans px-3 py-1.5"
          style={{ backgroundColor: epic.color, color: '#020d08' }}
        >
          {epic.subtitle}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-3xl text-[#f4ecd8]">{epic.title}</h3>
        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{epic.description}</p>
        <div className="space-y-2 pt-2">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/35">Associated Sites</p>
          {epic.sites.map((site) => (
            <div key={site.name} className="flex items-start gap-2.5">
              <BookOpen className="w-3 h-3 mt-0.5 shrink-0" style={{ color: epic.color }} />
              <div>
                <span className="font-sans text-xs text-[#f4ecd8]/80 font-medium">{site.name}</span>
                <span className="font-sans text-xs text-[#f4ecd8]/40 ml-2">— {site.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HeritagePage() {
  const [activeTab, setActiveTab] = useState<Tab>('forts');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'forts', label: 'Forts & Monuments', icon: <Shield className="w-4 h-4" /> },
    { id: 'archaeological', label: 'Archaeological Sites', icon: <Landmark className="w-4 h-4" /> },
    { id: 'epics', label: 'Epic Connections', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img
          src="/assets/sindhudurg-fort-walls.jpg"
          alt="Heritage of Konkan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/40 via-[#020d08]/20 to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#c17f3a] mb-4">
                Heritage & Monuments
              </p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                Stones of<br />
                <em className="italic text-[#c17f3a]">Centuries</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">
                From prehistoric rock carvings to Shivaji's sea-born citadels — every stone
                on the Konkan coast holds a thousand years of story.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-3 divide-x divide-[#0d2d1e]">
          {[
            { value: '300+', label: 'Forts along the coast' },
            { value: '1,500+', label: 'Prehistoric rock carvings' },
            { value: '10,000', label: 'Years of human presence' },
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
            </button>
          ))}
        </div>
      </section>

      {/* ── Content ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'forts' && (
          <motion.section
            key="forts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-12">
              The Konkan coast once bristled with over 300 forts — sea citadels, hill strongholds, and river outposts
              that guarded the coast from the Portuguese, the Mughals, and the British. Three stand above all others.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-10">
              {forts.map((fort, idx) => (
                <FortCard key={fort.id} fort={fort} idx={idx} />
              ))}
            </div>

            {/* Additional forts mention */}
            <div className="mt-20 p-8 border border-[#0d2d1e] bg-[#0d2d1e]/20">
              <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#c17f3a] mb-4">Also Worth Visiting</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Murud Janjira', 'Vasai Fort', 'Suvarnadurg', 'Khanderi Island Fort', 'Kolaba Fort', 'Raigarh', 'Gheria', 'Devgad'].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-[#c17f3a]/60 shrink-0" />
                    <span className="font-sans text-xs text-[#f4ecd8]/50">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'archaeological' && (
          <motion.section
            key="arch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl mb-16">
              Beneath the beaches and behind the waterfalls, the Konkan coast preserves some of humanity's
              earliest marks — prehistoric carvings and Buddhist caves that rewrote India's archaeological timeline.
            </p>
            <div className="space-y-24">
              {archaeological.map((site, idx) => (
                <ArchCard key={site.id} site={site} idx={idx} />
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === 'epics' && (
          <motion.section
            key="epics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto px-8 md:px-16 py-16"
          >
            <div className="mb-16">
              <p className="font-sans text-xs text-[#f4ecd8]/40 leading-relaxed max-w-2xl">
                The Konkan coast appears, directly and through local tradition, in both of India's great epics.
                These connections are not mythologized footnotes — they are the living faith of communities
                who have worshipped at these spots for two thousand years.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {epicConnections.map((epic, idx) => (
                <EpicCard key={epic.id} epic={epic} idx={idx} />
              ))}
            </div>

            <div className="mt-20 border-l-4 border-[#c17f3a]/40 pl-8 py-4">
              <p className="font-serif text-2xl text-[#f4ecd8]/60 italic leading-relaxed">
                "The sacred geography of the Konkan is not separate from its natural geography.
                The river, the cliff, the cave — these are where the divine and the human have always met."
              </p>
              <p className="mt-4 text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">
                — Dr. Anand Patil, Archaeologist, Ratnagiri
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Pull quote ── */}
      <section className="border-y border-[#0d2d1e] my-8">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-20 text-center">
          <p className="font-serif text-3xl md:text-5xl text-[#f4ecd8]/80 italic leading-tight">
            "Every fort was built not just of stone,<br className="hidden md:block" />
            but of the sea, the tide, and the will of its people."
          </p>
          <p className="mt-6 text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/30">
            — Konkan Maritime History
          </p>
        </div>
      </section>

      {/* ── Related links ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/35 mb-8">Continue Exploring</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[
            { href: '/culture', label: 'Culture & Customs', img: '/assets/folk-dance.jpg' },
            { href: '/spiritual', label: 'Spiritual & Sacred', img: '/assets/ganpatipule-temple.jpg' },
            { href: '/destinations', label: 'All Destinations', img: '/assets/coastal-landscape.jpg' },
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
