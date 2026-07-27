export interface Destination {
  id: string;
  slug: string;
  name: string;
  nameTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  region: 'north' | 'central' | 'south';
  type: 'beach' | 'fort' | 'temple' | 'hill' | 'village' | 'city' | 'island';
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  descriptionTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  highlights: string[];
  bestTime: string[]; // Array of months or seasons
  bestSeason?: 'monsoon' | 'winter' | 'summer' | 'all';
  activities: string[];
  images: string[];
  featured?: boolean;
  trending?: boolean;
  hidden?: boolean;
  islandGetaway?: boolean;
  difficulty?: 'easy' | 'moderate' | 'difficult';
  distanceFromMumbai?: number; // in km
  averageRating?: number;
  reviewCount?: number;
}

export const sampleDestinations: Destination[] = [
  // ── Existing Featured ───────────────────────────────────────────────────────
  {
    id: '1',
    slug: 'alibaug',
    name: 'Alibaug',
    nameTranslations: { mr: 'अलिबाग', hi: 'अलीबाग' },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.6414, lng: 72.8722 },
    description:
      'The quintessential Konkan weekend escape. Alibaug pairs pristine beaches with a magnificent sea fort, fresh seafood, and lush mango orchards — all within 2 hours of Mumbai.',
    highlights: [
      'Kolaba Fort — walks from Alibaug beach at low tide',
      'Water sports: jet-ski, parasailing, banana boat',
      'Fresh seafood at Rewas jetty restaurants',
      'Magnetic Observatory — a colonial-era landmark',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'water_sports', 'fort_visit', 'food_tour'],
    images: ['/assets/alibaug-kulaba-fort.jpg', '/assets/coastal-landscape.jpg'],
    featured: true,
    trending: true,
    difficulty: 'easy',
    distanceFromMumbai: 95,
    averageRating: 4.5,
    reviewCount: 234,
  },
  {
    id: '2',
    slug: 'ganpatipule',
    name: 'Ganpatipule',
    nameTranslations: { mr: 'गणपतीपुळे', hi: 'गणपतिपुले' },
    region: 'central',
    type: 'temple',
    coordinates: { lat: 17.1507, lng: 73.2667 },
    description:
      'Where the sacred meets the sea. The 400-year-old Swayambhu Ganpati temple sits directly on one of Maharashtra\'s cleanest beaches, drawing pilgrims and beach lovers in equal measure.',
    highlights: [
      'Swayambhu Ganpati temple — self-manifested idol facing the sea',
      'Spotless beach with camel and horse rides',
      'Ratnadurg Fort with panoramic coastal views',
      'MTDC beach resort and water sports',
    ],
    bestTime: ['September', 'October', 'November', 'December', 'January', 'February'],
    bestSeason: 'winter',
    activities: ['temple_visit', 'beach', 'photography', 'pilgrimage'],
    images: ['/assets/ganpatipule-temple.jpg', '/assets/coastal-landscape.jpg'],
    featured: true,
    difficulty: 'easy',
    distanceFromMumbai: 375,
    averageRating: 4.7,
    reviewCount: 456,
  },
  {
    id: '3',
    slug: 'tarkarli',
    name: 'Tarkarli',
    nameTranslations: { mr: 'तारकर्ली', hi: 'तारकर्ली' },
    region: 'south',
    type: 'beach',
    coordinates: { lat: 16.0167, lng: 73.4667 },
    description:
      'Maharashtra\'s most celebrated beach for scuba diving. Tarkarli\'s crystal waters reveal a world of coral, fish, and colour — above the water, backwater kayaking and Malvani cuisine complete the experience.',
    highlights: [
      'Scuba diving with 15m+ visibility in Malvan Marine Sanctuary',
      'Sindhudurg Fort boat excursion',
      'Karli River kayaking and backwater cruises',
      'Authentic Malvani fish curry and solkadhi',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['scuba_diving', 'snorkeling', 'water_sports', 'boat_ride', 'food_tour'],
    images: ['/assets/tarkarli-backwaters.jpg', '/assets/water-sports.jpg'],
    featured: true,
    trending: true,
    difficulty: 'moderate',
    distanceFromMumbai: 540,
    averageRating: 4.8,
    reviewCount: 687,
  },
  {
    id: '4',
    slug: 'murud-janjira',
    name: 'Murud-Janjira',
    nameTranslations: { mr: 'मुरुड-जंजिरा', hi: 'मुरुड-जंजीरा' },
    region: 'north',
    type: 'fort',
    coordinates: { lat: 18.298, lng: 72.955 },
    description:
      'The unconquered sea fort — Janjira was never breached by the Mughals, Marathas, or the British. Rising from the Arabian Sea on a 22-acre island, it remains the most dramatic fort on the Konkan coast.',
    highlights: [
      'Only sea fort on the Indian west coast never conquered',
      'Boat ride from Rajapuri jetty to the fort island',
      'Freshwater tanks inside the fort — still functional',
      'Murud beach and Dattatreya temple nearby',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['fort_visit', 'boat_ride', 'history_tour', 'photography'],
    images: ['/assets/murud-janjira-fort.jpg', '/assets/maritime-history.jpg'],
    featured: true,
    trending: true,
    difficulty: 'easy',
    distanceFromMumbai: 165,
    averageRating: 4.6,
    reviewCount: 389,
  },
  {
    id: '5',
    slug: 'diveagar',
    name: 'Diveagar',
    nameTranslations: { mr: 'दिवेआगर', hi: 'दिवेआगर' },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.1833, lng: 72.9833 },
    description:
      'The beach that time forgot. Diveagar\'s 7km of undeveloped shoreline, the fossilised whale skeleton in its Suvarna Ganesh temple, and the Turtle Festival at nearby Velas make it a truly singular destination.',
    highlights: [
      'Uninterrupted 7km beach with no commercial development',
      'Rare fossilised whale skeleton in Suvarna Ganesh temple',
      'Velas Turtle Festival (February–March) nearby',
      'Harihareshwar day trip — 8km along the coast',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'photography', 'temple_visit', 'village_tour'],
    images: ['/assets/diveagar-beach.jpg', '/assets/velas-turtle-beach.jpg'],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 170,
    averageRating: 4.4,
    reviewCount: 156,
  },

  // ── Hidden Gems ─────────────────────────────────────────────────────────────
  {
    id: '6',
    slug: 'vengurla',
    name: 'Vengurla',
    nameTranslations: { mr: 'वेंगुर्ला', hi: 'वेंगुर्ला' },
    region: 'south',
    type: 'beach',
    coordinates: { lat: 15.8667, lng: 73.6333 },
    description:
      'Sindhudurg\'s last secret. Vengurla sits at the very southern tip of the Konkan — a fishermen\'s town of Portuguese-era laterite churches, a lighthouse that pierces the night sky, and beaches so remote they still belong to the egrets.',
    highlights: [
      'Vengurla Lighthouse — oldest operational lighthouse in Maharashtra',
      'Sagareshwar Beach — pristine, rarely visited',
      'Portuguese-era fort ruins and laterite church',
      'Cashew and kokum orchards for seasonal tasting',
      'Redi Beach day trip with ancient Ganesh temple',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February'],
    bestSeason: 'winter',
    activities: ['beach', 'photography', 'history_tour', 'village_tour', 'food_tour'],
    images: ['/assets/vengurla-lighthouse.jpg', '/assets/redi-beach.jpg'],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 600,
    averageRating: 4.5,
    reviewCount: 89,
  },
  {
    id: '7',
    slug: 'kashid',
    name: 'Kashid',
    nameTranslations: { mr: 'काशीद', hi: 'काशीद' },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.4333, lng: 72.9167 },
    description:
      'The whitest sand beach in North Konkan. Kashid\'s 3km crescent of powdery white sand, backed by forested hills, makes it look more like the Maldives than Maharashtra — yet it remains blissfully under-visited.',
    highlights: [
      'Brilliant white-sand beach — unique on the Konkan coast',
      'Pine-like casuarina forests backing the beach',
      'Water sports and para-gliding at the beachfront',
      'Birla Mandir temple nearby',
      'Clean, swimmable waters with gentle waves',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'water_sports', 'photography'],
    images: ['/assets/coastal-landscape.jpg', '/assets/ocean-cliffs.jpg'],
    hidden: true,
    trending: true,
    difficulty: 'easy',
    distanceFromMumbai: 132,
    averageRating: 4.3,
    reviewCount: 201,
  },
  {
    id: '8',
    slug: 'murud',
    name: 'Murud Beach',
    nameTranslations: { mr: 'मुरुड', hi: 'मुरुड' },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.3333, lng: 72.9667 },
    description:
      'The old Nawab\'s coastline. Murud\'s broad beach faces the unconquered Janjira fort across the water. The Nawab of Janjira\'s palace still graces the shoreline, and the town\'s Portuguese and Siddi heritage gives it a layered, quietly cosmopolitan atmosphere.',
    highlights: [
      'Direct view of Murud-Janjira Fort from the beach',
      'Nawab of Janjira\'s seaside palace (exterior)',
      'Siddi cultural heritage and Portuguese-era churches',
      'Less-crowded alternative to Alibaug',
      'Local seafood and fruit markets',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'history_tour', 'photography', 'food_tour'],
    images: ['/assets/murud-janjira-fort.jpg', '/assets/coastal-landscape.jpg'],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 165,
    averageRating: 4.2,
    reviewCount: 143,
  },
  {
    id: '9',
    slug: 'shrivardhan',
    name: 'Shrivardhan',
    nameTranslations: { mr: 'श्रीवर्धन', hi: 'श्रीवर्धन' },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.038, lng: 73.019 },
    description:
      'Birthplace of the Peshwa dynasty and home to arguably the most beautiful beach in the northern Konkan. Shrivardhan\'s 8km arc of sand is backed by cashew trees, with the Hareshwar temple perched on a sea-facing headland.',
    highlights: [
      'Peshwa-era history: birthplace of Balaji Vishwanath',
      'Hareshwar temple on dramatic coastal cliff',
      'Harihareshwar — 4km south, "Dakshina Kashi" pilgrimage site',
      'Cashew and mango orchards for summer tasting',
      '8km of clean, uncrowded beach',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'temple_visit', 'history_tour', 'photography'],
    images: ['/assets/shrivardhan-beach.jpg', '/assets/harihareshwar-cliffs.jpg'],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 200,
    averageRating: 4.4,
    reviewCount: 112,
  },

  // ── Island Getaways ──────────────────────────────────────────────────────────
  {
    id: '10',
    slug: 'tarkarli-island',
    name: 'Tarkarli Island',
    nameTranslations: { mr: 'तारकर्ली बेट', hi: 'तारकर्ली द्वीप' },
    region: 'south',
    type: 'island',
    coordinates: { lat: 16.032, lng: 73.468 },
    description:
      'MTDC\'s floating resort sits on a barge in the middle of the Karli River, offering the unique experience of sleeping on the water surrounded by mangroves. Combine with beach camping on the sandbar that separates the river from the sea.',
    highlights: [
      'MTDC floating resort — unique overnight experience',
      'Karli River sandbar beach — secluded and pristine',
      'Mangrove kayaking at dawn',
      'Boat access only — 15 min from Tarkarli',
      'Snorkeling and scuba diving day trips',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['boat_ride', 'snorkeling', 'scuba_diving', 'photography', 'beach'],
    images: ['/assets/tarkarli-backwaters.jpg', '/assets/water-sports.jpg'],
    islandGetaway: true,
    featured: true,
    difficulty: 'easy',
    distanceFromMumbai: 542,
    averageRating: 4.7,
    reviewCount: 198,
  },
  {
    id: '11',
    slug: 'khanderi',
    name: 'Khanderi Island',
    nameTranslations: { mr: 'खांदेरी बेट', hi: 'खांदेरी द्वीप' },
    region: 'north',
    type: 'island',
    coordinates: { lat: 18.6, lng: 72.75 },
    description:
      'Shivaji Maharaj built Khanderi Fort to control the sea lanes outside Mumbai harbour. A day-trip by boat from Alibaug, the island is home to the fort ruins, a colonial lighthouse, and a significant nesting colony of seabirds.',
    highlights: [
      'Maratha sea fort built by Shivaji Maharaj (1679)',
      'Colonial lighthouse with 360° sea views',
      'Seabird nesting colony — terns and boobies',
      'No overnight accommodation — day-trip only',
      'Boat from Alibaug jetty (45 min)',
    ],
    bestTime: ['November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['boat_ride', 'fort_visit', 'history_tour', 'photography'],
    images: ['/assets/maritime-history.jpg', '/assets/forts-of-konkan.jpg'],
    islandGetaway: true,
    difficulty: 'moderate',
    distanceFromMumbai: 110,
    averageRating: 4.4,
    reviewCount: 87,
  },
  {
    id: '12',
    slug: 'underi',
    name: 'Underi Island',
    nameTranslations: { mr: 'उंदेरी बेट', hi: 'उंदेरी द्वीप' },
    region: 'north',
    type: 'island',
    coordinates: { lat: 18.61, lng: 72.72 },
    description:
      'Khanderi\'s quieter sister island. Underi (or Undri) was a Portuguese outpost, and its crumbling fort walls now host colonies of sea birds. Accessed by boat from Revdanda, it offers solitude, birdwatching, and the romance of genuine ruin.',
    highlights: [
      'Portuguese fort ruins — atmospheric and rarely visited',
      'No tourists — raw, unspoiled island experience',
      'Seabird and wader colony on the tidal flats',
      'Boat trip from Revdanda village (30 min)',
      'Combine with Alibaug and Kolaba Fort',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February'],
    bestSeason: 'winter',
    activities: ['boat_ride', 'fort_visit', 'photography', 'history_tour'],
    images: ['/assets/vasai-fort.jpg', '/assets/ocean-cliffs.jpg'],
    islandGetaway: true,
    hidden: true,
    difficulty: 'moderate',
    distanceFromMumbai: 120,
    averageRating: 4.3,
    reviewCount: 54,
  },

  // ── More Destinations ────────────────────────────────────────────────────────
  {
    id: '13',
    slug: 'amboli',
    name: 'Amboli',
    nameTranslations: { mr: 'आंबोली', hi: 'अंबोली' },
    region: 'south',
    type: 'hill',
    coordinates: { lat: 15.9667, lng: 74.0 },
    description:
      'Maharashtra\'s best-kept monsoon secret. Amboli receives over 700cm of annual rainfall, making it one of the wettest places in India. In monsoon, it transforms into a cloud-wrapped paradise of cascading waterfalls and luminous forest.',
    highlights: [
      'Amboli Waterfall — peaks at 690m; dramatic monsoon cascade',
      'Mahadevgad Fort ruins surrounded by mist',
      'Endangered Amboli bush frog — found nowhere else on earth',
      'Star-gazing site: no light pollution for 50km',
      'Gateway to Bhagwan Mahavir and Dandeli wildlife zones',
    ],
    bestTime: ['June', 'July', 'August', 'September', 'October'],
    bestSeason: 'monsoon',
    activities: ['trekking', 'photography', 'village_tour'],
    images: ['/assets/waterfall-forest.jpg', '/assets/wildlife-sanctuaries.jpg'],
    featured: true,
    trending: true,
    difficulty: 'moderate',
    distanceFromMumbai: 520,
    averageRating: 4.6,
    reviewCount: 312,
  },
  {
    id: '14',
    slug: 'malvan',
    name: 'Malvan',
    nameTranslations: { mr: 'मालवण', hi: 'मालवण' },
    region: 'south',
    type: 'village',
    coordinates: { lat: 16.0634, lng: 73.4671 },
    description:
      'The gastronomic capital of the Konkan. Malvan is where Malvani cuisine was born — the prawn curries, crab masalas, and kokum-laced solkadhi that define coastal Maharashtra. Add Sindhudurg Fort across the harbour and a Marine Sanctuary offshore.',
    highlights: [
      'Sindhudurg Fort (1664) — Shivaji\'s sea fort on an island',
      'Malvan Marine Sanctuary — coral reefs and tropical fish',
      'Malvan Fish Market — dawn auction begins at 5:30am',
      'Authentic Malvani thali with 15+ preparations',
      'Scuba diving, snorkeling, and glass-bottom boat tours',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['food_tour', 'scuba_diving', 'fort_visit', 'boat_ride', 'history_tour'],
    images: ['/assets/malvan-marine-sanctuary.jpg', '/assets/sindhudurg-fort-walls.jpg'],
    featured: true,
    trending: true,
    difficulty: 'easy',
    distanceFromMumbai: 535,
    averageRating: 4.7,
    reviewCount: 543,
  },
  {
    id: '15',
    slug: 'ratnagiri',
    name: 'Ratnagiri',
    nameTranslations: { mr: 'रत्नागिरी', hi: 'रत्नागिरी' },
    region: 'central',
    type: 'city',
    coordinates: { lat: 16.9833, lng: 73.3 },
    description:
      'Where Alphonso mangoes and colonial history meet the sea. Ratnagiri\'s hilltop Ratnadurg Fort, the Bal Gangadhar Tilak birthplace museum, and proximity to Devgad Alphonso orchards make it the most historically layered town on the coast.',
    highlights: [
      'Ratnadurg Fort — dramatic hilltop fort with lighthouse',
      'Tilak birthplace and memorial museum',
      'Alphonso mango orchards (April–May season)',
      'Bhatye Beach and Mandavi Beach',
      'Jaigad Fort across the Shastri River',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    bestSeason: 'all',
    activities: ['history_tour', 'fort_visit', 'food_tour', 'beach', 'photography'],
    images: ['/assets/ratnagiri-mango-fort.jpg', '/assets/freedom-struggle.jpg'],
    featured: true,
    difficulty: 'easy',
    distanceFromMumbai: 345,
    averageRating: 4.5,
    reviewCount: 287,
  },
  {
    id: '16',
    slug: 'guhagar',
    name: 'Guhagar',
    nameTranslations: { mr: 'गुहागर', hi: 'गुहागर' },
    region: 'central',
    type: 'beach',
    coordinates: { lat: 17.5167, lng: 73.2 },
    description:
      'The beach that development forgot. Guhagar\'s 4km crescent of red-gold laterite sand and turquoise water feels like the Konkan coast of 30 years ago. No beach-shack commercialisation — just sand, sea, and the sound of fishing nets.',
    highlights: [
      'Pristine 4km beach with no commercial development',
      'Vyadeshwar temple — serene and beautifully maintained',
      'Ancient laterite rock formations at the shoreline',
      'Village home stays and authentic Konkani cooking',
      'Dolphin sightings offshore in the morning',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    bestSeason: 'winter',
    activities: ['beach', 'temple_visit', 'village_tour', 'photography'],
    images: ['/assets/guhagar-beach.jpg', '/assets/fishing-village.jpg'],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 290,
    averageRating: 4.6,
    reviewCount: 134,
  },
];

// Filters and categories
export const regionOptions = [
  { value: 'north', label: 'North Konkan' },
  { value: 'central', label: 'Central Konkan' },
  { value: 'south', label: 'South Konkan' },
];

export const typeOptions = [
  { value: 'beach', label: 'Beach' },
  { value: 'fort', label: 'Fort' },
  { value: 'temple', label: 'Temple' },
  { value: 'hill', label: 'Hill Station' },
  { value: 'village', label: 'Village' },
  { value: 'city', label: 'City' },
  { value: 'island', label: 'Island' },
];

export const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'difficult', label: 'Difficult' },
];

export const activityOptions = [
  { value: 'beach', label: 'Beach Activities' },
  { value: 'water_sports', label: 'Water Sports' },
  { value: 'scuba_diving', label: 'Scuba Diving' },
  { value: 'snorkeling', label: 'Snorkeling' },
  { value: 'fort_visit', label: 'Fort Exploration' },
  { value: 'temple_visit', label: 'Temple Visits' },
  { value: 'trekking', label: 'Trekking' },
  { value: 'photography', label: 'Photography' },
  { value: 'food_tour', label: 'Food Tours' },
  { value: 'village_tour', label: 'Village Tours' },
  { value: 'boat_ride', label: 'Boat Rides' },
  { value: 'history_tour', label: 'Historical Tours' },
  { value: 'pilgrimage', label: 'Pilgrimage' },
];

export const seasonOptions = [
  { value: 'monsoon', label: 'Monsoon (Jun–Sep)' },
  { value: 'winter', label: 'Winter (Oct–Mar)' },
  { value: 'summer', label: 'Summer (Apr–May)' },
  { value: 'all', label: 'Year Round' },
];

export const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
