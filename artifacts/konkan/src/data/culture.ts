// ── Culture page data ─────────────────────────────────────────────────────────
// Edit this file to add, remove, or update content shown on the /culture page.

export interface ArtForm {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  era: string;
  origin: string;
  description: string;
  elements: string[];
  significance: string;
  color: string;
}

export interface Festival {
  id: string;
  title: string;
  subtitle: string;
  months: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
  districts: string[];
  color: string;
}

export interface Practice {
  name: string;
  desc: string;
}

export interface LocalCustom {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  practices: Practice[];
  color: string;
}

// ── Arts & Folk ───────────────────────────────────────────────────────────────

export const artsAndFolk: ArtForm[] = [
  {
    id: 'warli',
    title: 'Warli Painting',
    subtitle: 'Ancient Tribal Art',
    image: '/assets/handicrafts.jpg',
    era: '2500 BCE',
    origin: 'Tribal communities of Palghar & Thane',
    description:
      "One of India's oldest art traditions, Warli painting uses simple geometric forms — circles, triangles, and squares — to depict the daily life of tribal communities. These paintings served as ritual acts before marriages and harvests, drawn in white rice paste on mud walls.",
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

// ── Festivals ─────────────────────────────────────────────────────────────────

export const festivals: Festival[] = [
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
      "Celebrated with historical reenactments at Shivaji's own coastal forts — Sindhudurg, Vijaydurg, Raigad — Shiv Jayanti on the Konkan coast is a living history lesson. Sword processions, Powada recitals (ballads of Shivaji's campaigns), and dawn flag-hoisting ceremonies at sea forts create an experience found nowhere else.",
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

// ── Local Customs ─────────────────────────────────────────────────────────────

export const localCustoms: LocalCustom[] = [
  {
    id: 'weddings',
    title: 'Konkani Wedding Rituals',
    subtitle: '3–5 Day Ceremony',
    image: '/assets/weddings-rituals.jpg',
    description:
      "A traditional Konkani wedding unfolds over three to five days across both families' homes. Rituals include Haldi (turmeric ceremony by the well), Antarpat (the sacred curtain moment), and Kelvan (feast for all relatives). The bride wears a Nauvari sari in the Paithani style, and the feast includes every variety of Malvani fish preparation.",
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

// ── Page meta (hero, stats, quotes) ──────────────────────────────────────────
// Edit these to update the hero section, stats bar, pull quote, and explore links.

export const cultureMeta = {
  hero: {
    eyebrow: 'Culture & Customs',
    titleLine1: 'Living',
    titleLine2: 'Traditions',
    subtitle:
      'Centuries of coastal life shaped a culture unlike any other — where the sea, the monsoon, and the land interweave in art, ritual, and celebration.',
    image: '/assets/folk-dance.jpg',
    accentColor: '#c17f3a',
  },
  stats: [
    { value: '2,500+', label: 'Years of art tradition' },
    { value: '40+', label: 'Folk performance forms' },
    { value: '3', label: 'UNESCO-recognised traditions' },
  ],
  pullQuote: {
    text: '"Culture is not what Konkan has. It is what Konkan is."',
    attribution: '— Coastal Proverb',
  },
  exploreLinks: [
    { href: '/heritage', label: 'Heritage & Monuments', img: '/assets/sindhudurg-fort-walls.jpg' },
    { href: '/spiritual', label: 'Spiritual & Sacred', img: '/assets/ganpatipule-temple.jpg' },
    { href: '/food', label: 'Cuisine & Food', img: '/assets/konkani-thali.jpg' },
  ],
  tabDescriptions: {
    arts: "The Konkan coast gave birth to some of India's oldest and most distinctive art forms — each rooted in devotion, community, and the rhythms of coastal life.",
    festivals: 'The Konkan calendar is a continuous procession of celebration — monsoon, harvest, sea-opening, deity birthdays, and warrior-king anniversaries each demanding their own ceremony.',
    customs: 'Local customs in Konkan are not performed for tourists — they are lived. Each ritual marks a transition: a wedding, a season, a launch into the sea.',
  },
};
