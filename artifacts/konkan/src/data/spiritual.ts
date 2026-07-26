// ── Spiritual page data ───────────────────────────────────────────────────────
// Edit this file to add, remove, or update content shown on the /spiritual page.
// Content researched from temple trusts, gazetteers and coastal oral tradition —
// Ganpatipule, Marleshwar, Kunkeshwar, Harihareshwar (Dakshin Kashi), the Suvarna
// Ganesh of Diveagar, Vyadeshwar of Guhagar, and the grassroots ritual calendar
// of Konkan's fishing and farming villages.

export interface TempleRitual {
  name: string;
  time: string;
  desc: string;
}

export interface Temple {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  deity: string;
  period: string;
  image: string;
  description: string;
  rituals: TempleRitual[];
  legend: string;
  prasad: string;
  bestTime: string;
  color: string;
  distanceFromMumbai: string;
}

export interface PilgrimageRoute {
  id: string;
  title: string;
  duration: string;
  distance: string;
  startEnd: string;
  image: string;
  description: string;
  temples: string[];
  significance: string;
  color: string;
}

// 'Sun' | 'Star' | 'ScrollText' | 'Flame' maps to Lucide icon names — resolved in the component.
export type RitualIconKey = 'Sun' | 'Star' | 'ScrollText' | 'Flame';

export interface Ritual {
  id: string;
  title: string;
  iconKey: RitualIconKey;
  description: string;
  practices: string[];
  color: string;
}

// ── Major Temples ─────────────────────────────────────────────────────────────

export const majorTemples: Temple[] = [
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
    legend:
      'Legend holds that a brahmin named Ramchandra Mama found the idol self-emerged from the earth here 400 years ago, after a divine dream.',
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
      "Marleshwar is one of India's most unusual and dramatic Shiva temples — the sanctum is inside a cave behind a monsoon waterfall. During the rainy season, devotees wade through knee-deep water along a forested path, then pass through the waterfall curtain itself to reach the Shivalinga. In peak monsoon, the waterfall literally covers the temple entrance.",
    rituals: [
      { name: 'Abhishek', time: 'Morning', desc: 'Water offering to Shivalinga — nature itself provides the water via the falls' },
      { name: 'Bilva Puja', time: 'Daily', desc: 'Sacred bael leaf offering' },
      { name: 'Mahashivratri', time: 'Annual', desc: '24-hour night vigil with thousands of pilgrims' },
      { name: 'Shravana Somvar', time: 'Monsoon Mondays', desc: 'Peak pilgrimage — 40,000+ devotees' },
    ],
    legend:
      'The Marleshwar Shivalinga is said to be one of the five Panchalingas of the Konkan — each representing an element. Marleshwar represents water.',
    prasad: 'Bael patra and coconut',
    bestTime: 'Monsoon (July–August) for waterfall effect; or Mahashivratri',
    color: '#2a8fb5',
    distanceFromMumbai: '360 km',
  },
  {
    id: 'kunkeshwar',
    title: 'Kunkeshwar Temple',
    subtitle: "Ancient Shiva on the Cliff's Edge",
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
    legend:
      'Local tradition holds that Lord Parashurama, having created the Konkan by throwing his axe into the sea, established Kunkeshwar as the guardian deity of the entire Sindhudurg coast.',
    prasad: 'Shrikhand (sweetened strained yoghurt)',
    bestTime: 'Monsoon for dramatic cliff views; October–March for calm sea',
    color: '#c17f3a',
    distanceFromMumbai: '510 km',
  },
  {
    id: 'harihareshwar',
    title: 'Harihareshwar Temple',
    subtitle: 'The Dakshin Kashi of the Konkan',
    location: 'Harihareshwar, Raigad district',
    deity: 'Trimurti — Brahma, Vishnu, Mahesh (with Parvati), in linga form',
    period: 'Medieval; substantially rebuilt in 1723 by Peshwa Bajirao I',
    image: '/assets/ocean-cliffs.jpg',
    description:
      "Called 'Dakshin Kashi' — the Kashi of the South — Harihareshwar sits where the Savitri river meets the Arabian Sea at the Bankot creek, ringed by four sacred hills named for Vishnu, Brahma, Shiva and Parvati. As at Varanasi, pilgrims follow a set order: Kalbhairav first, then Ganesh, Garuda and Nandi, and only then the sanctum, where Brahma, Vishnu and Shiva share a single triple linga. It served as the kuladevata (family deity) shrine for the Peshwas themselves.",
    rituals: [
      { name: 'Kalbhairav Darshan', time: 'First, always', desc: 'Guardian deity worshipped before the main sanctum, as in Varanasi' },
      { name: 'Pradakshina', time: 'Any time', desc: 'Full circumambulation path around the temple, built by Chandrarao More' },
      { name: 'Shravan Somvar Abhishek', time: 'Monsoon Mondays', desc: 'Weekly Shiva abhishek through the sacred month' },
      { name: 'Mahashivratri Utsav', time: 'Annual', desc: 'The temple\'s largest gathering, with special aartis through the night' },
    ],
    legend:
      "Sage Agastya's penance is said to have caused Shiva to appear here in linga form as a boon; Chhatrapati Shivaji Maharaj himself is recorded to have visited in 1674, and Peshwa queen Ramabai came here to pray for her ailing husband's health.",
    prasad: 'Coconut and betel leaf (vida)',
    bestTime: 'October to February; Shravan (Aug) for the Monday abhishek crowds',
    color: '#800020',
    distanceFromMumbai: '215 km',
  },
  {
    id: 'suvarna-ganesh',
    title: 'Suvarna Ganesh Temple',
    subtitle: 'The Golden Ganesh of Diveagar',
    location: 'Diveagar, Raigad district',
    deity: 'Lord Ganesha (solid gold idol)',
    period: 'Idol dated 300–1,000+ years; temple built 1997 onward',
    image: '/assets/religious-mosaic.jpg',
    description:
      "On Sankashti Chaturthi in November 1997, a farmer ploughing his field in the sleepy fishing village of Diveagar struck a buried copper box shaped like a coconut. Inside was a solid gold Ganesha idol with gold ornaments, alongside an old copper plate (tamrapatra) linking the find to the Shilahara dynasty. The village built a temple around it and it became one of the Konkan's most visited shrines — even surviving a 2012 armed robbery, after which the original gold was recast into a new idol and reinstated in 2021.",
    rituals: [
      { name: 'Morning Aarti', time: '7:00 AM', desc: 'Idol displayed briefly to devotees under armed watch' },
      { name: 'Angarki Chaturthi', time: 'Monthly (Tuesdays)', desc: 'The most auspicious Sankashti day, largest crowds' },
      { name: 'Ganesh Chaturthi', time: 'Annual', desc: 'Ten-day festival with the whole village hosting pilgrims' },
    ],
    legend:
      'Villagers hold that the idol was hidden underground by the Shilaharas for safekeeping over a thousand years ago and chose to "reveal" itself only when the village was ready to protect it.',
    prasad: 'Coconut laddoo',
    bestTime: 'Angarki Chaturthi or Ganesh Chaturthi (Aug–Sept)',
    color: '#c17f3a',
    distanceFromMumbai: '175 km',
  },
  {
    id: 'vyadeshwar',
    title: 'Vyadeshwar Temple',
    subtitle: "The Chitpavans' Guardian Shiva",
    location: 'Guhagar, Ratnagiri district',
    deity: 'Lord Shiva (Vyadeshwar Mahadev)',
    period: 'Ancient; associated with the Parashurama legend',
    image: '/assets/temple-carvings.jpg',
    description:
      "Vyadeshwar is the kuladevata — family deity — of a great many Chitpavan Brahmin households across Maharashtra, who trace their community's origin to this stretch of coast. Tradition holds that Parashurama, the sage who is said to have reclaimed the Konkan from the sea, was himself a devotee of this Shiva. The temple sits a short walk from Guhagar's quiet, uncommercialised beach, its tall stone deepmaal (lamp towers) a signature of authentic Konkan temple architecture.",
    rituals: [
      { name: 'Kakad Aarti', time: 'Dawn', desc: 'Opening ceremony of the sanctum' },
      { name: 'Shravan Somvar', time: 'Monsoon Mondays', desc: 'Special abhishek for the Chitpavan diaspora who travel back for it' },
      { name: 'Mahashivratri', time: 'Annual', desc: 'Large gathering of families tracing lineage to Guhagar' },
    ],
    legend:
      "As per local tradition, Parashurama — after pushing back the sea with his arrow to create the Konkan — worshipped Shiva here, which is why the deity is still treated as guardian of the families descended from that founding moment.",
    prasad: 'Coconut and jaggery',
    bestTime: 'October to March; Shravan for the ancestral pilgrimage crowds',
    color: '#2a8fb5',
    distanceFromMumbai: '345 km',
  },
];

// ── Also Worth Visiting (secondary temples list) ───────────────────────────────
// Real village and small-town shrines across the Konkan coast — the temples that
// anchor local festival calendars even if they never make a tourist itinerary.

export const additionalTemples: string[] = [
  'Velneshwar Shiva Temple',
  'Kadyavarcha Ganpati (Chiplun)',
  'Aadimaya Devi Temple (Aare-Ware)',
  'Bharadi Devi Temple (Malvan)',
  'Sateri Devi Temple (Malvan)',
  'Mahakali Temple (Adivare)',
  'Rameshwar Temple (Malvan)',
  'Ganesh Gad Temple (Redi)',
  'Purnagad Ganpati',
  'Jivdani Mata Temple (Virar)',
  'Ekvira Devi Temple (Karla)',
  'Bhagavati Devi Temple (Sawantwadi)',
  'Vetoba Temple (Malvan)',
  'Kalbhairav Temple (Harihareshwar)',
  'Yogeshwari Devi Temple (Harihareshwar)',
  'Bankavali Ganpati Temple',
  'Aptare Ganpati Temple (Rajapur)',
  'Athavale Devrai Grove Shrine',
  'Karha Devi Temple (Deogad)',
  'Kelshi Mahalaxmi Temple',
];

// ── Pilgrimage Routes ─────────────────────────────────────────────────────────

export const pilgrimageRoutes: PilgrimageRoute[] = [
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
      "Maharashtra holds five of the twelve Jyotirlingas — the most sacred Shiva shrines in India. The Konkan pilgrimage connects three of them: Bhimashankar (in the Sahyadri forests above the coast), Tryambakeshwar (near Nashik), and Ghrishneshwar (Aurangabad). The route weaves between the Ghats and the coast.",
    temples: ['Bhimashankar (Sahyadri)', 'Tryambakeshwar (Nashik)', 'Ghrishneshwar (Aurangabad)', 'Parli Vaijnath (Beed)'],
    significance: "Each Jyotirlinga represents one of the twelve cosmic manifestations of Shiva's eternal flame.",
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
  {
    id: 'kuladevata',
    title: 'The Kuladevata Circuit — Family Deity Pilgrimage',
    duration: '2–4 days',
    distance: 'Varies by lineage, typically 200–400 km',
    startEnd: 'Mumbai / Pune to ancestral village',
    image: '/assets/folk-dance.jpg',
    description:
      "Not a fixed route but a living one, repeated by thousands of Konkan families every year. Chitpavan, CKP, Agri, Koli and Bhandari households across Maharashtra each hold a kuladevata — a specific family deity tied to their ancestral coastal village — and return to report every major life event to it: a thread ceremony, a wedding, a child's first haircut. Vyadeshwar of Guhagar and the Kalbhairav of Harihareshwar are among the most common family deities for Konkan-origin households.",
    temples: ['Vyadeshwar (Guhagar)', 'Kunkeshwar Mahadev', 'Kalbhairav (Harihareshwar)', 'Ganpatipule', 'Village gramadevata shrine'],
    significance: 'No wedding invitation in a Konkan-origin household is considered complete until the family has "informed" the kuladevata in person.',
    color: '#800020',
  },
];

// ── Rituals & Scriptures ──────────────────────────────────────────────────────

export const rituals: Ritual[] = [
  {
    id: 'aarti',
    title: 'Aarti & Temple Protocols',
    iconKey: 'Sun',
    description:
      'Every Konkan temple follows a strict daily schedule of five to seven aartis (lamp ceremonies). The Kakad Aarti at dawn is the most sacred — the deity is "awakened" with a small flame, incense, and the conch. Devotees must arrive fasted for this ceremony. Evening aartis are communal — hundreds gather as the entire temple courtyard fills with the smell of camphor and the sound of bells.',
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
    iconKey: 'Star',
    description:
      'The Konkan sacred calendar is governed not by the solar year but by the lunar tide — every major ritual is timed to the moon phase, the monsoon, or the fishing season. The year begins with Gudhi Padwa (the Marathi New Year), when new sacred threads are installed on idols. The monsoon months are considered particularly sacred — Lord Vishnu is said to sleep (Devshayani Ekadashi) while Shiva reigns over the earth.',
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
    iconKey: 'ScrollText',
    description:
      'Konkani Brahmin households often maintain manuscript copies of the Rigveda, passed down through generations. The tradition of Ghanapath (a rigorous chanting method requiring 12 years of training) is still practiced in Konkan, with some families that have maintained unbroken chanting lineages for 600 years. The Konkani Ramayana, composed in the coastal Karhadi dialect, is still recited in full over seven evenings during certain temple festivals.',
    practices: [
      'Ghanapath recitation lineages — 600+ years unbroken',
      'Konkani Ramayana in Karhadi dialect — seven-evening recitation',
      'Manuscript preservation — birch bark and copper plate texts',
      'Kirtan tradition: Musical scripture narration, 4–6 hours long',
      'Pravachan: Discourses by scholars tied to the festival calendar',
    ],
    color: '#3a9e6e',
  },
  {
    id: 'village-worship',
    title: 'Village & Grassroots Worship',
    iconKey: 'Flame',
    description:
      "Beyond the famous temples, the deepest spiritual life of the Konkan happens at the village level — in the worship of the gramadevata (village guardian deity), whose annual jatra (fair) is the biggest social event on a village calendar, complete with a palanquin (palkhi) carried through every lane. Fisherfolk villages add their own layer: Narali Purnima, when coconuts are ceremonially offered to the sea to mark the end of the monsoon fishing ban, is as central to coastal life as any temple festival.",
    practices: [
      'Gramadevata Jatra: annual village fair with a palanquin procession through every lane',
      'Holi/Shimga: bonfires, Dashavatar folk theatre, and door-to-door Dhakti/Gauri troupes',
      "Narali Purnima: coconuts offered to the sea, marking the fishing fleet's return to open water",
      'Devak: a sacred branch or plant installed at the start of every wedding ceremony',
      'Gaurai-Ganpati: household worship linking the harvest, ancestors, and the Ganesh festival',
    ],
    color: '#800020',
  },
];

// ── Page meta (hero, stats, quotes) ──────────────────────────────────────────
// Edit these to update the hero section, stats bar, pull quote, and explore links.

export const spiritualMeta = {
  hero: {
    eyebrow: 'Spiritual & Sacred',
    titleLine1: 'Where the',
    titleLine2: 'Divine Dwells',
    subtitle:
      'The Konkan coast has been a pilgrimage destination for two millennia — its temples rising from cliffside, jungle, and sea with equal force of devotion.',
    image: '/assets/ganpatipule-temple.jpg',
    accentColor: '#d45f2a',
  },
  stats: [
    { value: '200+', label: 'Ancient temples on the coast' },
    { value: '4', label: 'Major pilgrimage circuits' },
    { value: '5', label: 'Jyotirlingas in Maharashtra' },
  ],
  pullQuote: {
    text: '"The sacred and the sea are not two things here. They are the same threshold."',
    attribution: '— Konkani Coastal Saying',
  },
  exploreLinks: [
    { href: '/culture', label: 'Culture & Customs', img: '/assets/folk-dance.jpg' },
    { href: '/heritage', label: 'Heritage & Monuments', img: '/assets/sindhudurg-fort-walls.jpg' },
    { href: '/activities', label: 'Activities', img: '/assets/water-sports.jpg' },
  ],
  tabDescriptions: {
    temples:
      'These are not tourist attractions. Each temple is a living centre of faith — daily rituals unchanged for centuries, priests whose families have served the same deity for thirty generations, and devotees who walk days to be here.',
    routes:
      'Pilgrimage in Konkan is not just about the destination — it is about the journey through the landscape. The routes pass through forest, river, and coast with a logic that feels both sacred and geographic at once.',
    rituals:
      'The spiritual life of Konkan is carried in sound — the conch, the bell, the chant — and in practices so old they predate recorded history, from grand temple aartis down to the smallest village jatra. These are the living scriptures of the coast.',
  },
};
