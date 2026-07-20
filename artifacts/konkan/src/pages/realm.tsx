import { useParams, useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { sections } from '@/data/sections';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const accentMap: Record<string, string> = {
  history: '#c17f3a', geography: '#3a9e6e', culture: '#a04e7a',
  art: '#c17f3a', music: '#a04e7a', cuisine: '#d45f2a',
  village: '#3a9e6e', festivals: '#a04e7a', 'local-festivals': '#a04e7a',
  tourism: '#2a8fb5', agriculture: '#3a9e6e', ecology: '#3a9e6e',
  ecotourism: '#3a9e6e', 'hidden-gems': '#2a8fb5', adventure: '#d45f2a',
  'flora-fauna': '#3a9e6e', beaches: '#2a8fb5', personalities: '#c17f3a',
};

const categoryLabel: Record<string, string> = {
  history: 'Heritage', geography: 'Landscape', culture: 'Culture',
  art: 'Craft & Art', music: 'Folk Arts', cuisine: 'Cuisine',
  village: 'Village Life', festivals: 'Celebration', 'local-festivals': 'Local Occasions',
  tourism: 'Travel', agriculture: 'Farming', ecology: 'Ecology',
  ecotourism: 'Ecotourism', 'hidden-gems': 'Hidden Gems', adventure: 'Adventure',
  'flora-fauna': 'Flora & Fauna', beaches: 'Ocean', personalities: 'Legacies',
};

// Placeholder rich content per realm
const richContent: Record<string, { subtitle: string; body: string[] }> = {
  history:         { subtitle: 'The Living Memory of a Coastal Civilization',     body: ['The Konkan coast is one of India\'s oldest inhabited shores — a cradle of Saraswat Brahmin culture, Maratha sea power, and ancient trade routes with Arabia and East Africa.', 'Ashoka\'s edicts reference this coastline. The Silhara dynasty built rock-cut caves overlooking the sea. Shivaji Maharaj\'s legendary naval forts — Sindhudurg, Vijaydurg, Suvarnadurg — are still standing.', 'Portuguese colonization left behind baroque churches and Indo-Portuguese villas, while the Peshwa era shaped the bhasha, the cuisine, and the annual calendar of the village.'] },
  geography:       { subtitle: 'Where Mountains Meet the Sea',                    body: ['Konkan is a narrow coastal plain — on average just 50 km wide — pinched between the dramatic escarpment of the Western Ghats and the Arabian Sea.', 'Hundreds of small, fast rivers rush west off the Ghats, carving deep estuaries as they reach the sea. The monsoon transforms these rivers into torrents; in summer they slow to a whisper.', 'Laterite plateaux, dense rainforest, mangrove creeks, volcanic basalt cliffs — the landscape shifts every few kilometres.'] },
  culture:         { subtitle: 'A Syncretism Born of the Shore',                  body: ['Konkan culture is a living mosaic — Malvani, Gaud Saraswat Brahmin, Koli fishermen, Christian communities from the Portuguese period, and Muslim traders have all shaped this coast.', 'The Konkani language itself is a testament to this blending: Sanskrit roots, Dravidian phonology, Portuguese loanwords, and Arab merchant terms all coexist in one tongue.', 'The culture values restraint and depth over spectacle. It shows in the whitewashed houses, the spare ornamentation of temple gopurams, and the economy of words in a Malvani proverb.'] },
  cuisine:         { subtitle: 'Fire, Kokum, and the Freshest Catch',             body: ['Konkani cuisine is built on three pillars: the coconut, the kokum, and the day\'s catch. Everything else revolves around them.', 'Tirphal (Sichuan pepper\'s cousin) delivers a numbing warmth. Raw mango souring gives depth. Fish curries are cooked with a single-mindedness that borders on devotional.', 'Malvani cuisine is the most well-known strand — with its dried red chilli heat and fish curries that turn rice into something sacred. Goan cuisine overlaps but diverges: vinegar-spiked pork, bebinca, and feni mark it apart.'] },
  music:           { subtitle: 'Rhythms Older Than Memory',                       body: ['The Dashavatar theatre tradition is one of Maharashtra\'s oldest performing arts — all-night plays depicting the ten avatars of Vishnu, performed in village courtyards to torch-lit crowds.', 'Tarapa flute music of the Koli fishing communities uses a bamboo flute with a gourd resonator. It is the sound of the sea itself.', 'Gondhal, Kirtan, and Bhajan traditions bind the village calendar. Every major agricultural and fishing milestone has its musical marker.'] },
  art:             { subtitle: 'The Art Carved Into Stone and Wood',               body: ['Konkan wood carving — found in temple pillars, doorways, and furniture — is possibly the finest in peninsular India. The Saraswat Brahmin households of Goa and Malvan still commission master carvers for weddings and temple work.', 'Shell craft along the beaches turns the debris of the sea into jewellery and ritual objects. Terracotta art, especially ritual masks for the Gaondevi puja, is still fired in wood-burning kilns.', 'The walls of the Amboli and Ajara temples carry sculptures that rival Ellora in their vitality.'] },
  festivals:       { subtitle: 'The Coast That Never Stops Celebrating',           body: ['The Konkan festival calendar has no slow season. Ganesh Chaturthi here predates Mumbai\'s famous version — villages like Sawantwadi have been celebrating for over 400 years.', 'Narkasur effigies burned on Goa\'s Diwali eve reach three storeys. The Shigmo procession in Goa fills streets with folk art. The Holi of Ratnagiri\'s fishing villages involves night-long boat processions lit with torches.', 'Every village also has its own jatra — a temple festival timed to the lunar calendar and specific to its patron deity.'] },
  'local-festivals': { subtitle: 'The Intimate Rhythms of Village Time',          body: ['Beyond the grand festivals lies a deeper calendar of small, local occasions that most outsiders never witness.', 'The Nariyal Pournima marks the end of the monsoon fishing ban. Thousands of coconuts are floated into the sea as an offering to Varuna — the god of waters — asking permission to fish again.', 'Bhondla is a women-only harvest circle dance performed in the evenings of Ashwin month. No outsiders. No spectacle. Just the women of the village, a lamp, and a song.'] },
  tourism:         { subtitle: 'Unhurried, Untrammelled, Unmissable',              body: ['Konkan tourism remains blessedly underdeveloped compared to Goa. There are no beach shacks every hundred metres, no DJ-lit beach clubs. The infrastructure is honest and spare.', 'The Konkan Railway, opened in 1998, made the coast accessible without destroying it. Trains run along the cliff edge, crossing rivers on towering viaducts — the journey itself is one of India\'s great rides.', 'Homestays run by farming and fishing families are the best accommodation. The hosts cook for you, take you out on their boats, and treat you like a guest of the house.'] },
  agriculture:     { subtitle: 'Mangoes, Cashews, and the Art of the Land',       body: ['The Alphonso mango from Devgad and Ratnagiri is the most celebrated in India — its limited geography, the laterite soil, and the specific sea breeze produce a fruit that cannot be replicated elsewhere.', 'Cashew orchards cover the laterite plateaux, their fruit distilled into feni or eaten raw. Kokum trees line the edge of the forests, their dried rinds used in cooking across Maharashtra.', 'Rice cultivation in the low-lying paddy fields is still done by hand in most villages. The paddy varieties here — red-grained, hardy, flood-tolerant — are found nowhere else in India.'] },
  ecology:         { subtitle: 'The Last Intact Western Ghats Corridor',           body: ['The forests of the northern and central Konkan are part of the Western Ghats biodiversity hotspot — one of only eight in the world.', 'Leopards, giant Malabar squirrels, hornbills, and rare orchids live in the forests above the escarpment. Below, the mangrove creeks shelter mudskippers, fiddler crabs, and nesting waterbirds.', 'The ecology is fragile and under pressure from real estate development, sand mining, and road building. Several NGOs from the Konkan are fighting to protect it.'] },
  ecotourism:      { subtitle: 'Travel That Leaves No Scar',                       body: ['The ecotourism movement in Konkan began with a handful of naturalist guides and forest homestays in the 1990s. It has grown steadily without the disasters of scale that afflicted Goa.', 'Turtle-watching at Velas, bird-watching at Tansa and Bhimashankar, night treks in the Sahyadri — all are now organized through community-run initiatives that return revenue directly to the village.', 'Agrotourism is the newer wave: farmstays where visitors participate in mango harvesting, rice planting, or cashew pressing. It connects urban visitors to the real work of the land.'] },
  'hidden-gems':   { subtitle: 'The Places That Protect Themselves by Staying Secret', body: ['Konkan\'s hidden gems are not hidden by accident. Many are inaccessible by road. Some are known only by a single family who has farmed or fished there for generations.', 'The fort of Yashwantgad sits completely alone on a sea cliff near Ratnagiri, with no tourist infrastructure, no signage, and no crowds.', 'Achara Beach, Mithmumbri Beach, the waterfall at Vajrai near Satara — these places exist at the edge of what ordinary tourism reaches. They require curiosity, a willingness to ask, and the ability to navigate roads that are not on any app.'] },
  adventure:       { subtitle: 'Wild by Design',                                   body: ['The Konkan offers adventure in a register that the Himalayas cannot. Sea kayaking through mangrove tunnels at dawn. Cliff jumping into the deep green sea at Malvan. Rock climbing on the basalt columns of the Ghats escarpment.', 'Scuba diving at Malvan Marine Sanctuary reveals a reef system with visibility up to 15 metres in the right season, inhabited by seahorses, moray eels, and octopi.', 'White-water rafting on the Ulhas river in monsoon season is still not on most adventure tourism itineraries — which means you might have the river entirely to yourself.'] },
  'flora-fauna':   { subtitle: 'A Census Impossible to Complete',                  body: ['The Western Ghats forest of the Konkan contains over 5,000 species of flowering plants, 139 mammal species, 508 bird species, and 179 amphibian species — most found nowhere else on Earth.', 'The Indian Giant Squirrel — flame-red and the size of a large cat — lives in the canopy. Malabar pit vipers coil on monsoon-wet rocks. The Chorao island in Goa hosts one of India\'s most important egret colonies.', 'The olive ridley sea turtle nests at Velas, Anjarle, and several other beaches. Conservation programmes now protect over 15,000 nests per season.'] },
  beaches:         { subtitle: 'Shores That Have Not Yet Forgotten Themselves',    body: ['The beaches of Konkan are nothing like Goa\'s beach culture exports. Most are empty most of the time. Some can only be reached by walking through a village paddy field.', 'Harihareshwar has black volcanic sand. Ganpatipule has white sand so fine it squeaks. Tarkarli\'s water is clear enough to snorkel in without any equipment.', 'The beach fishing tradition — hauling nets at dawn with the entire village, the catch divided by ancient rule — is still practiced at dozens of beaches. You can watch, and sometimes help.'] },
  personalities:   { subtitle: 'Minds Shaped by the Sea',                          body: ['Konkan has produced a disproportionate number of India\'s thinkers, artists, and reformers. Perhaps the sea and the mountains pressing together create a particular kind of consciousness.', 'Lokmanya Bal Gangadhar Tilak, the father of political Hinduism, was from Ratnagiri. So was Vinayak Damodar Savarkar. Lata Mangeshkar\'s family roots are in the Konkan.', 'The Gaud Saraswat Brahmin diaspora — from Konkan — has had an outsized influence on Bollywood, classical music, literature, and the Indian civil service.'] },
  village:         { subtitle: 'Life at the Pace of the Tides',                   body: ['The Konkan village is organized around the jatra, the well, and the sea. The agricultural and fishing rhythms dictate everything else — when to sleep, when to wake, when to celebrate.', 'A typical Malvani village has its rows of whitewashed laterite houses with red-tiled roofs, a central gaondevi temple, a cluster of mango and coconut trees, and a path that leads inevitably to water.', 'The village economy is still largely gift-based within the community. A fisherman who catches more than he can sell distributes it to the village. A farmer\'s harvest is celebrated collectively.'] },
};

const relatedIds: Record<string, string[]> = {
  history:       ['culture', 'art', 'personalities'],
  geography:     ['ecology', 'beaches', 'adventure'],
  culture:       ['music', 'festivals', 'art'],
  art:           ['culture', 'history', 'music'],
  music:         ['culture', 'festivals', 'village'],
  cuisine:       ['village', 'agriculture', 'culture'],
  village:       ['cuisine', 'festivals', 'agriculture'],
  festivals:     ['culture', 'music', 'village'],
  'local-festivals': ['festivals', 'village', 'culture'],
  tourism:       ['hidden-gems', 'adventure', 'ecotourism'],
  agriculture:   ['cuisine', 'ecology', 'village'],
  ecology:       ['flora-fauna', 'ecotourism', 'geography'],
  ecotourism:    ['ecology', 'tourism', 'adventure'],
  'hidden-gems': ['adventure', 'tourism', 'beaches'],
  adventure:     ['hidden-gems', 'beaches', 'ecology'],
  'flora-fauna': ['ecology', 'ecotourism', 'geography'],
  beaches:       ['adventure', 'tourism', 'hidden-gems'],
  personalities: ['history', 'culture', 'art'],
};

export default function RealmPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const id = params.id ?? '';
  const section = sections.find(s => s.id === id);

  if (!section) {
    navigate(`${base}/`);
    return null;
  }

  const accent = accentMap[id] ?? '#3a9e6e';
  const label  = categoryLabel[id] ?? '';
  const content = richContent[id] ?? { subtitle: section.desc, body: [section.desc] };
  const related = (relatedIds[id] ?? []).map(rid => sections.find(s => s.id === rid)).filter(Boolean) as typeof sections;

  const currentIndex = sections.findIndex(s => s.id === id);
  const prev = sections[(currentIndex - 1 + sections.length) % sections.length];
  const next = sections[(currentIndex + 1) % sections.length];

  return (
    <div className="min-h-screen bg-[#020d08]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: '85vh', minHeight: 480 }}>
        <motion.img
          src={section.image}
          alt={section.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5) saturate(1.1)' }}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020d08]/50 via-transparent to-transparent" />

        {/* Back link */}
        <motion.a
          href={`${base}/`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-28 left-8 md:left-16 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/50 hover:text-[#f4ecd8] transition-colors duration-300"
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M14 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Konkan
        </motion.a>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-14 md:pb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-5"
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span
              className="text-[10px] font-sans tracking-[0.4em] uppercase font-medium"
              style={{ color: accent }}
            >
              {label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-[#f4ecd8] leading-none mb-4"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
          >
            {section.title}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="h-[1px] w-24 origin-left mb-5"
            style={{ backgroundColor: accent }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-serif italic text-[#f4ecd8]/60 text-lg md:text-2xl leading-relaxed max-w-xl"
          >
            {content.subtitle}
          </motion.p>
        </div>
      </div>

      {/* ── Content body ────────────────────────────────────────────── */}
      <article className="max-w-[780px] mx-auto px-6 md:px-8 py-20 md:py-28">
        {content.body.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className={`font-sans text-[#f4ecd8]/75 leading-[1.9] mb-7 ${i === 0 ? 'text-lg md:text-xl' : 'text-base md:text-[1.05rem]'}`}
          >
            {i === 0 && (
              <span
                className="float-left font-serif text-6xl leading-[0.85] mr-3 mt-1"
                style={{ color: accent }}
              >
                {para[0]}
              </span>
            )}
            {i === 0 ? para.slice(1) : para}
          </motion.p>
        ))}
      </article>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="max-w-[780px] mx-auto px-6 flex items-center gap-6">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#0d2d1e]" />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#0d2d1e]" />
      </div>

      {/* ── Related realms ───────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-20 md:py-24 px-6 md:px-14 border-t border-[#0d2d1e] mt-10">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-[10px] tracking-[0.45em] uppercase font-sans mb-10" style={{ color: accent }}>
              Related Realms
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((s, i) => {
                const a = accentMap[s.id] ?? '#3a9e6e';
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <Link
                      href={`${base}/realm/${s.id}`}
                      className="group block relative overflow-hidden h-52"
                    >
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ filter: 'brightness(0.55) saturate(1.1)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/90 via-[#020d08]/20 to-transparent" />
                      <motion.div
                        animate={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom"
                        style={{ backgroundColor: a }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p className="text-[9px] tracking-[0.3em] uppercase font-sans mb-1.5" style={{ color: a }}>
                          {categoryLabel[s.id]}
                        </p>
                        <h3 className="font-serif text-[#f4ecd8] text-lg leading-tight">{s.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ───────────────────────────────────── */}
      <div className="grid grid-cols-2 border-t border-[#0d2d1e]">
        <Link
          href={`${base}/realm/${prev.id}`}
          className="group relative overflow-hidden flex items-center gap-5 px-8 md:px-14 py-10 border-r border-[#0d2d1e] hover:bg-[#0d2d1e]/30 transition-colors duration-300"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-[#f4ecd8]/30 group-hover:text-[#f4ecd8]/70 transition-colors shrink-0">
            <path d="M22 8H2M9 1L2 8l7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/25 mb-1">Previous</p>
            <p className="font-serif text-[#f4ecd8]/65 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">{prev.title}</p>
          </div>
        </Link>
        <Link
          href={`${base}/realm/${next.id}`}
          className="group relative overflow-hidden flex items-center justify-end gap-5 px-8 md:px-14 py-10 hover:bg-[#0d2d1e]/30 transition-colors duration-300"
        >
          <div className="text-right">
            <p className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#f4ecd8]/25 mb-1">Next</p>
            <p className="font-serif text-[#f4ecd8]/65 group-hover:text-[#f4ecd8] transition-colors text-sm md:text-base leading-tight">{next.title}</p>
          </div>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className="text-[#f4ecd8]/30 group-hover:text-[#f4ecd8]/70 transition-colors shrink-0">
            <path d="M0 8h20M13 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
