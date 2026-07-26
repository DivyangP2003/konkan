// ── Heritage page data ────────────────────────────────────────────────────────
// Edit this file to add, remove, or update content shown on the /heritage page.

export interface Fort {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  built: string;
  builder: string;
  image: string;
  description: string;
  features: string[];
  bestTime: string;
  color: string;
  distanceFromMumbai: string;
}

export interface ArchSite {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  period: string;
  image: string;
  description: string;
  details: string[];
  howToVisit: string;
  color: string;
  distanceFromMumbai: string;
}

export interface EpicSite {
  name: string;
  desc: string;
}

export interface EpicConnection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  sites: EpicSite[];
  color: string;
}

// ── Forts ─────────────────────────────────────────────────────────────────────

export const forts: Fort[] = [
  {
    id: 'sindhudurg',
    title: 'Sindhudurg Fort',
    subtitle: 'The Sea Diamond of Shivaji',
    location: 'Malvan, Sindhudurg district',
    built: '1664–1667 CE',
    builder: 'Chhatrapati Shivaji Maharaj',
    image: '/assets/sindhudurg-fort-walls.jpg',
    description:
      "Built on a 48-acre island in the Arabian Sea using 4,000 tonnes of lead to bind its foundations to the sea rock, Sindhudurg is Shivaji's naval masterstroke. It houses a temple with the only known life-cast impression of Shivaji's hand and foot — made from actual plaster cast of the king himself.",
    features: [
      'Built on 3 rocky islands merged with mortar',
      'Walls 3 km long, 9–12 metres high',
      "Temple with Shivaji's hand & foot impressions",
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
      "The oldest fort on the Konkan coast — over 1,200 years old — Vijaydurg sits at the mouth of the Wagad River where it meets the sea. Known as the \"Gibraltar of the East,\" it controlled all maritime trade on the Konkan. Shivaji's admiral Kanhoji Angre made this his naval base in the 18th century, defeating British and Portuguese navies from here.",
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
      "Perched 820 metres above sea level on an isolated mesa, Raigad was the capital where Shivaji Maharaj was crowned King of the Marathas on June 6, 1674. The fort contains over 300 structures including Shivaji's throne room, audience halls, market streets, and his samadhi (memorial). A ropeway connects the base village to the summit.",
    features: [
      'Ropeway from base to 820m summit',
      "Shivaji's coronation throne — Sinhasana",
      'Market street with 22 shops still visible',
      '2,700 steps carved from base to summit (still climbable)',
      'Samadhi of Shivaji Maharaj — sacred and serene',
    ],
    bestTime: 'November to February; avoid monsoon (fog and landslide risk)',
    color: '#800020',
    distanceFromMumbai: '220 km',
  },
];

// ── Also Worth Visiting (secondary forts list) ────────────────────────────────

export const additionalForts: string[] = [
  'Murud Janjira',
  'Vasai Fort',
  'Suvarnadurg',
  'Khanderi Island Fort',
  'Kolaba Fort',
  'Raigarh',
  'Gheria',
  'Devgad',
];

// ── Archaeological Sites ───────────────────────────────────────────────────────

export const archaeological: ArchSite[] = [
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

// ── Epic Connections ──────────────────────────────────────────────────────────

export const epicConnections: EpicConnection[] = [
  {
    id: 'ramayana',
    title: 'Ramayana Sites',
    subtitle: 'Where Rama Walked the Shore',
    image: '/assets/ganpatipule-temple.jpg',
    description:
      "Local tradition holds that Lord Rama crossed the Konkan coast during his southward journey to Lanka — and multiple sites claim their connection. Harihareshwar, where the Savitri and Kali rivers meet the sea, is associated with Ram's temporary camp. The caves at Velas are said to mark where Ram sought divine counsel before building the bridge to Lanka.",
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
      { name: 'Bhimashankar', desc: 'Jyotirlinga established by Bhima' },
      { name: 'Pandav Caves, Nashik', desc: 'Residence of the Pandavas during exile' },
      { name: 'Sacred Groves', desc: 'Protected by Pandava rest-stories across Konkan' },
      { name: 'Karna Sagar (Chiplun)', desc: 'Karna said to have donated here' },
    ],
    color: '#3a9e6e',
  },
];

// ── Page meta (hero, stats, quotes) ──────────────────────────────────────────
// Edit these to update the hero section, stats bar, pull quote, and explore links.

export const heritageMeta = {
  hero: {
    eyebrow: 'Heritage & Monuments',
    titleLine1: 'Stones of',
    titleLine2: 'Centuries',
    subtitle:
      "From prehistoric rock carvings to Shivaji's sea-born citadels — every stone on the Konkan coast holds a thousand years of story.",
    image: '/assets/sindhudurg-fort-walls.jpg',
    accentColor: '#c17f3a',
  },
  stats: [
    { value: '300+', label: 'Forts along the coast' },
    { value: '1,500+', label: 'Prehistoric rock carvings' },
    { value: '10,000', label: 'Years of human presence' },
  ],
  pullQuote: {
    text: '"Every fort was built not just of stone, but of the sea, the tide, and the will of its people."',
    attribution: '— Konkan Maritime History',
  },
  epicsQuote: {
    text: '"The sacred geography of the Konkan is not separate from its natural geography. The river, the cliff, the cave — these are where the divine and the human have always met."',
    attribution: '— Dr. Anand Patil, Archaeologist, Ratnagiri',
  },
  exploreLinks: [
    { href: '/culture', label: 'Culture & Customs', img: '/assets/folk-dance.jpg' },
    { href: '/spiritual', label: 'Spiritual & Sacred', img: '/assets/ganpatipule-temple.jpg' },
    { href: '/destinations', label: 'All Destinations', img: '/assets/coastal-landscape.jpg' },
  ],
  tabDescriptions: {
    forts:
      'The Konkan coast once bristled with over 300 forts — sea citadels, hill strongholds, and river outposts that guarded the coast from the Portuguese, the Mughals, and the British. Three stand above all others.',
    archaeological:
      "Beneath the beaches and behind the waterfalls, the Konkan coast preserves some of humanity's earliest marks — prehistoric carvings and Buddhist caves that rewrote India's archaeological timeline.",
    epics:
      "The Konkan coast appears, directly and through local tradition, in both of India's great epics. These connections are not mythologized footnotes — they are the living faith of communities who have worshipped at these spots for two thousand years.",
  },
};
