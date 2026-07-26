// ── Spiritual page data ───────────────────────────────────────────────────────
// Edit this file to add, remove, or update content shown on the /spiritual page.

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

// 'Sun' | 'Star' | 'ScrollText' maps to Lucide icon names — resolved in the component.
export type RitualIconKey = 'Sun' | 'Star' | 'ScrollText';

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
    { value: '3', label: 'Major pilgrimage circuits' },
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
      'The spiritual life of Konkan is carried in sound — the conch, the bell, the chant — and in practices so old they predate recorded history. These are the living scriptures of the coast.',
  },
};
