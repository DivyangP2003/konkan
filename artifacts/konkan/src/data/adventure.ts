// ── Adventure Page Data ───────────────────────────────────────────────────────

export const adventureMeta = {
  hero: {
    image: '/assets/water-sports.jpg',
    eyebrow: 'Beyond the Ordinary',
    titleLine1: 'Adventures of',
    titleLine2: 'the Konkan Coast',
    subtitle:
      'From the sea floor of Malvan to the misty peaks of the Western Ghats — the Konkan is a playground sculpted by ancient rivers, volcanic cliffs, and the restless Arabian Sea.',
    accentColor: '#2a8fb5',
  },
  stats: [
    { value: '720 km', label: 'Coastline' },
    { value: '30+', label: 'Dive Sites' },
    { value: '4,000 m', label: 'Sahyadri Peaks' },
  ],
  pullQuote: {
    text: '"To adventure here is to move between worlds — from the coral labyrinth beneath the sea to the falcon-haunted ridges above the clouds."',
    attribution: '— Konkan Nature Trail Society',
  },
};

// ── Water Sports ──────────────────────────────────────────────────────────────
export interface WaterActivity {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  details: string[];
  operators?: string[];
  season: string;
  priceFrom?: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  image: string;
  color: string;
  tip?: string;
}

export const waterActivities: WaterActivity[] = [
  {
    id: 'scuba',
    title: 'Scuba Diving & Snorkeling',
    subtitle: 'Malvan Marine Sanctuary',
    location: 'Malvan, Sindhudurg',
    description:
      'The Malvan Marine Sanctuary harbours one of the richest coral ecosystems on the west coast of India. Crystal-clear waters with 8–12 m visibility reveal vividly coloured reef fish, sea turtles, octopus, and the haunting remains of a Portuguese-era anchor chain near Sindhudurg Fort.',
    details: [
      'Best dive sites: Rock Garden, Coral Garden, The Boulders, and the Sindhudurg Fort moat',
      'Snorkeling possible for non-swimmers at designated shallow zones',
      'Marine sanctuary entry requires a permit — operators handle this',
      'Average water temperature: 27–30°C (Oct–May); visibility peaks Feb–Apr',
      'Night dives available with licensed guides from select operators',
    ],
    operators: [
      'Sindhudurg Scuba (certified PADI centre)',
      'Malvan Dive Co.',
      'Aqua Adventures Tarkarli',
    ],
    season: 'October – May (best: Dec–March)',
    priceFrom: '₹1,800',
    difficulty: 'Easy',
    image: '/assets/malvan-marine-sanctuary.jpg',
    color: '#2a8fb5',
    tip: 'Book at least 48 hours in advance; early morning slots (7 am) have the calmest water and best light.',
  },
  {
    id: 'parasailing',
    title: 'Parasailing & Jet Skiing',
    subtitle: 'Tarkarli & Alibaug',
    location: 'Tarkarli & Alibaug',
    description:
      'Soar 100 metres above Tarkarli's turquoise lagoon on a parasail while the entire Sindhudurg coastline unfolds below — Devbag beach, the mangrove backwaters, and the fort silhouette. At Alibaug, jet skis rip across Revdanda Creek with the ruined Kolaba Fort as backdrop.',
    details: [
      'Parasailing: 5–8 minute flights, tandem options available for first-timers',
      'Jet Ski: 10 and 20-minute circuits; speedboat rides also available',
      'Life jackets provided; no prior experience needed',
      'Alibaug beach operators run through Oct–May during beach season',
      'Tarkarli MTDC water sports complex is the most organised hub',
    ],
    season: 'October – May',
    priceFrom: '₹600',
    difficulty: 'Easy',
    image: '/assets/tarkarli-backwaters.jpg',
    color: '#3a9e6e',
    tip: 'Visit on weekdays to avoid weekend crowds; haggle politely for package deals combining parasailing + jet ski.',
  },
  {
    id: 'rafting',
    title: 'River Rafting & Kayaking',
    subtitle: 'Savitri River & Backwater Routes',
    location: 'Mahad & Tarkarli Backwaters',
    description:
      'The Savitri River in Raigad district swells ferociously during monsoon, offering Grade III–IV rapids through dense riverine forest. Post-monsoon, the same river mellows into a kayaker's paradise: palm-shaded banks, kingfisher sightings, and tidal creeks merging with the sea at Bankot.',
    details: [
      'Monsoon rafting (Jun–Sep): Grade III–IV stretches, guide mandatory',
      'Savitri estuary kayaking: 2–3 hr guided paddles available Oct–May',
      'Tarkarli backwaters: stand-up paddleboard (SUP) and sit-on-top kayaks for rent',
      'Karli River kayak tour: mangrove tunnels, bird watching, dolphin spotting',
      'Life jackets, helmets, and safety brief included in all guided tours',
    ],
    season: 'Rafting: Jun–Sep | Kayaking: Oct–May',
    priceFrom: '₹1,200',
    difficulty: 'Moderate',
    image: '/assets/waterfall-forest.jpg',
    color: '#d45f2a',
    tip: 'For monsoon rafting, check water levels with operators the day before — Savitri can flood rapidly after heavy rain.',
  },
];

// ── Treks ─────────────────────────────────────────────────────────────────────
export interface Trek {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  howToReach: string;
  season: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  image: string;
  color: string;
  tip?: string;
}

export const treks: Trek[] = [
  {
    id: 'western-ghats',
    title: 'Western Ghats High Hikes',
    subtitle: 'Harishchandragad · Rajmachi · Kalsubai',
    location: 'Northern Sahyadri Range',
    description:
      'The northern Sahyadri ridgeline that frames the Konkan's eastern horizon hosts Maharashtra's most iconic summit treks. Kalsubai at 1,646 m is the highest peak in the state — its iron-rung final section and 360° panorama of the Konkan plains are unforgettable. Harishchandragad's Kokan Kada cliff-face drops 200 m straight into the monsoon mist.',
    stats: [
      { label: 'Highest point', value: '1,646 m' },
      { label: 'Trail length', value: '12–18 km' },
      { label: 'Best season', value: 'Oct–Feb' },
    ],
    highlights: [
      'Kalsubai: step-ladder scramble at the summit; sunrise panorama of the Deccan plateau',
      'Harishchandragad: Kokan Kada overhang — one of India's most dramatic cliff viewpoints',
      'Rajmachi Fort: twin bastions of Shrivardhan and Manaranjan, ancient Peshwa watchtowers',
      'Route passes through Sahyadri tiger reserve buffer zone — leopard and sloth bear country',
      'Cave shelters (natural & manmade) for overnight camping near all three peaks',
    ],
    howToReach: 'Base villages (Bari for Kalsubai, Khireshwar for Harishchandragad) accessible by ST bus from Igatpuri/Ahmednagar. Rajmachi: Lonavala base, 20 km trail.',
    season: 'October – February (Monsoon: Jul–Sep for Harishchandragad waterfalls, not recommended for beginners)',
    difficulty: 'Challenging',
    image: '/assets/ocean-cliffs.jpg',
    color: '#3a9e6e',
    tip: 'Start Kalsubai before 5 am for the sunrise; the summit gets crowded and hazy by 9 am.',
  },
  {
    id: 'coastal-cliffs',
    title: 'Coastal Cliff Walks',
    subtitle: 'Harihareshwar Clifftop · Devgad Lighthouse',
    location: 'Raigad & Sindhudurg Districts',
    description:
      'South of the Ghats, the Konkan coast offers a completely different breed of walk: clifftop trails where the basalt meets the sea, ancient trees gnarled by salt winds, and fishing villages perched impossibly at the edge of 50 m drops. The Harihareshwar to Shrivardhan trail follows the cliff crown above Srivardhan Bay — arguably the most cinematic easy-walk on the Maharashtra coast.',
    stats: [
      { label: 'Trail length', value: '7–14 km' },
      { label: 'Max elevation', value: '120 m cliff' },
      { label: 'Duration', value: '2–5 hrs' },
    ],
    highlights: [
      'Harihareshwar to Shrivardhan: 14 km clifftop track, coastal forest, and bay views',
      'Devgad Lighthouse walk: 3 km trail through cashew groves to a working 19th-century lighthouse',
      'Vengurla Rocks offshore view from Shiroda headland — rare offshore rock formation',
      'Bankot Fort headland walk: estuary views where the Savitri meets the sea',
      'Tidal pools at Anjarle Point — accessible only at low tide',
    ],
    howToReach: 'Harihareshwar: ST buses from Mumbai (Asiad Depot); shared taxis from Shrivardhan. Devgad: buses from Kankavli on Konkan Railway.',
    season: 'October – March (monsoon brings dangerous cliff edges; avoid Jun–Sep)',
    difficulty: 'Easy',
    image: '/assets/harihareshwar-cliffs.jpg',
    color: '#2a8fb5',
    tip: 'The Devgad lighthouse opens to visitors at dusk — arrive at sunset for the lantern-lighting ceremony.',
  },
  {
    id: 'waterfall-treks',
    title: 'Waterfall Treks',
    subtitle: 'Thoseghar · Amboli · Vajrai Falls',
    location: 'Satara & Sindhudurg Ghats',
    description:
      'Monsoon on the Konkan ghats is a cascading, rumbling spectacle. Thoseghar, near Satara, plunges in a series of seven falls across 500 m of cliff face — the tallest ribbon waterfall complex in Maharashtra. Amboli in Sindhudurg becomes a haunting fog-world where waterfalls emerge from cloud-forest mist. Vajrai, discovered only in 2020, now ranks among the tallest in India at 853 m.',
    stats: [
      { label: 'Tallest fall', value: '853 m (Vajrai)' },
      { label: 'Season', value: 'Jul – Sep' },
      { label: 'Base camps', value: '3 major hubs' },
    ],
    highlights: [
      'Thoseghar: 7-cascade system; viewpoints accessible by road; full trail for experienced walkers',
      'Amboli waterfall + Hiranyakeshi river source: combined 4-hr trek through evergreen forest',
      'Vajrai (Bamnoli, Satara): Maharashtra's tallest single-drop waterfall; boat + trail combo',
      'Devkund Waterfall (Bhira): 80 m plunge pool, emerald water; 4 km forest trail from Bhira village',
      'Savitri Falls at Daivat Kanda: hidden gem accessible only during early monsoon',
    ],
    howToReach: 'Thoseghar: Satara city (30 km) connected by rail. Amboli: Sawantwadi (25 km) on Konkan Railway. Vajrai: Wai → Bamnoli by road, then boat.',
    season: 'July – September (peak Jul–Aug for maximum water volume)',
    difficulty: 'Moderate',
    image: '/assets/waterfall-forest.jpg',
    color: '#c17f3a',
    tip: 'Thoseghar entry is free but gets crowded on weekends. Visit on a Tuesday or Wednesday morning for solitude.',
  },
];

// ── Wildlife & Nature ─────────────────────────────────────────────────────────
export interface NatureExperience {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  highlights: string[];
  bestFor: string[];
  season: string;
  image: string;
  color: string;
  entry?: string;
}

export const natureExperiences: NatureExperience[] = [
  {
    id: 'birdwatching',
    title: 'Birdwatching Spots',
    subtitle: 'Tillari · Phansad · Karnala',
    location: 'Across Konkan Districts',
    description:
      'The Konkan belt sits along one of South Asia's most active bird migration corridors. In winter, Siberian ducks, flamingos, and terns flood the estuaries, while the Sahyadri forests host endemic and rare resident species year-round — including the Malabar pied hornbill, the Indian paradise flycatcher, and elusive Sri Lanka frogmouth.',
    highlights: [
      'Karnala Bird Sanctuary: 37 km from Mumbai; 228 species recorded; iconic rocky pinnacle backdrop',
      'Phansad Wildlife Sanctuary: remote and undervisited; gaur, leopard, and over 170 bird species',
      'Tillari Reservoir: winter congregation of migratory ducks, herons, kingfishers',
      'Terekhol estuary: nesting terns and spectacular dawn flight of egrets over the mangroves',
      'Bhimashankar Sanctuary (edge of Konkan ghats): Malabar Giant Squirrel and mixed flocks in monsoon',
    ],
    bestFor: ['Photography', 'Guided dawn walks', 'Winter migratory species', 'Beginners with binoculars'],
    season: 'October – March for migrants; year-round for residents',
    image: '/assets/wildlife-sanctuaries.jpg',
    color: '#3a9e6e',
    entry: 'Karnala: ₹30 (Indian), ₹200 (foreign). Phansad: forest entry permit from range office.',
  },
  {
    id: 'backwater-cruises',
    title: 'Backwater Cruises',
    subtitle: 'Tarkarli · Karli River · Achra Creek',
    location: 'Sindhudurg & Ratnagiri',
    description:
      'The Konkan backwaters are a world apart from Kerala — more solitary, more wild, punctuated by fishing villages that appear unchanged for centuries. A sunset cruise on the Karli River estuary at Tarkarli drifts between mangrove tunnels, past crab-fishing boats with their lanterns, into open sea where dolphins often escort the vessel.',
    highlights: [
      'Tarkarli backwaters: MTDC houseboats + private kayak tours; dolphin spotting at creek mouth',
      'Karli River estuary cruise: 2 hr sunset boat trip; nesting herons and egret colonies',
      'Achra-Ratnagiri creek: historic fishing village boat tour; traditional dugout canoes',
      'Dabhol Creek (Ratnagiri): wide estuary famed for Irrawaddy dolphins spotted year-round',
      'Vijaydurg Creek: mangrove forest entry by rowboat; 17th-century sea fort at the mouth',
    ],
    bestFor: ['Families', 'Dolphin spotting', 'Sunset photography', 'Birdwatching from water'],
    season: 'Year-round; best Oct–Apr for calm water',
    image: '/assets/tarkarli-backwaters.jpg',
    color: '#2a8fb5',
    entry: 'MTDC boat rides: ₹500–800 per person. Private kayak hire: ₹400–600/hr.',
  },
  {
    id: 'eco-lodges',
    title: 'Eco-Lodges & Wildlife Sanctuaries',
    subtitle: 'Radhanagari · Tillari · Phansad',
    location: 'Kolhapur, Sindhudurg, Raigad',
    description:
      'Radhanagari is Maharashtra's oldest wildlife sanctuary and home to a significant population of the Indian bison (gaur). Stay in a forest-edge eco-lodge and take pre-dawn jeep safaris through the teak and bamboo canopy. Tillari, straddling the Goa border, is wilder and almost tourist-free — guides here are former poachers turned conservationists.',
    highlights: [
      'Radhanagari: jeep safaris (book at FD office, Kolhapur); gaur, leopard, marsh crocodiles',
      'Tillari dam backwaters: bird-rich shores; eco-lodge run by tribal self-help group',
      'Phansad: walk-in only; self-guided trails through dense semi-evergreen forest',
      'Sawantwadi eco-stays: cultural immersion + forest access in one base',
      'Velas Turtle Festival (Mar): mass olive ridley hatching on Velas beach, community-led',
    ],
    bestFor: ['Wildlife photography', 'Responsible tourism', 'Overnight forest stays', 'Turtle nesting (seasonal)'],
    season: 'Oct – May for safaris; Turtle Festival: March',
    image: '/assets/wildlife-sanctuaries.jpg',
    color: '#c17f3a',
    entry: 'Radhanagari safari: ₹2,500–3,500 (jeep + guide). Entry permits required for all sanctuaries.',
  },
];
