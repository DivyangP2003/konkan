// ── Plan Your Trip Page Data ──────────────────────────────────────────────────

export const planMeta = {
  hero: {
    image: '/assets/konkan-railway.jpg',
    eyebrow: 'Your Konkan Journey',
    titleLine1: 'Plan Your',
    titleLine2: 'Perfect Trip',
    subtitle:
      'Whether you have three days or three weeks — whether you chase monsoon waterfalls or winter reefs — the Konkan rewards every itinerary with unforgettable moments.',
    accentColor: '#3a9e6e',
  },
  stats: [
    { value: '3–7 days', label: 'Ideal Duration' },
    { value: '5 hrs', label: 'Mumbai to Malvan (train)' },
    { value: '₹3,000', label: 'Budget/day (mid-range)' },
  ],
};

// ── Itineraries ───────────────────────────────────────────────────────────────
export interface ItineraryDay {
  day: number | string;
  title: string;
  activities: string[];
  stay?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  type: 'budget' | 'premium' | 'monsoon';
  tagline: string;
  description: string;
  days: ItineraryDay[];
  tips: string[];
  budget: string;
  image: string;
  color: string;
  badge: string;
}

export const itineraries: Itinerary[] = [
  {
    id: 'coastal-getaway',
    title: '3-Day Coastal Getaway',
    subtitle: 'Mumbai → Alibaug → Murud → Back',
    duration: '3 Days / 2 Nights',
    type: 'budget',
    tagline: 'The perfect long-weekend escape from the city.',
    description:
      'This compact circuit covers two of the most accessible Konkan beaches — Alibaug\'s Kolaba Fort backdrop and Murud\'s Janjira sea-fortress drama — without requiring a flight or an obscene road trip. Best done Thursday to Sunday.',
    days: [
      {
        day: 1,
        title: 'Mumbai → Alibaug (Ferry or Road)',
        activities: [
          'Mandwa Ferry from Gateway of India (1 hr); or drive via NH66 → Rewas ferry',
          'Check-in at Alibaug homestay or beachside resort',
          'Evening walk along Alibaug Beach; Kolaba Fort accessible on foot at low tide',
          'Dinner: Coconut-prawn curry at local seafood shack near the fort',
        ],
        stay: 'Alibaug (homestay: ₹2,000–3,500 | resort: ₹6,000–10,000)',
      },
      {
        day: 2,
        title: 'Alibaug → Murud',
        activities: [
          'Morning: Hire a boat to Kolaba Fort for the full island experience',
          'Drive 1.5 hrs south to Murud; lunch at Murud\'s beachside dhaba',
          'Afternoon: Boat to Janjira Sea Fort (30-min crossing; mandatory)',
          'Sunset on Murud Beach; Alphonso mango ice cream from the famous Murud stalls',
        ],
        stay: 'Murud (guesthouse: ₹1,800–4,000 | heritage bungalow: ₹8,000+)',
      },
      {
        day: 3,
        title: 'Murud → Shrivardhan → Mumbai',
        activities: [
          'Sunrise walk on Murud Beach (5:30 am)',
          'Drive 25 km to Shrivardhan — cleaner, quieter beach; dip in the surf',
          'Optional: 30-min detour to Harihareshwar Temple on the cliff above the sea',
          'Return to Mumbai via NH66 or Dighi–JNPT ferry; arrive by evening',
        ],
      },
    ],
    tips: [
      'Weekend Mandwa ferry fills up fast — book tickets online via RISC Ro-Ro Services app',
      'Murud Janjira Fort boats stop at 5 pm; plan to be at the ghat by 4 pm',
      'Budget option: travel by ST bus Murud → Mumbai (₹220); takes 5 hrs but very scenic',
      'Premium option: rent an entire beach villa through AirBnb in Alibaug for all 3 nights',
    ],
    budget: '₹8,000–15,000 per person (budget) | ₹25,000–45,000 (premium)',
    image: '/assets/murud-janjira-fort.jpg',
    color: '#2a8fb5',
    badge: 'Weekend Escape',
  },
  {
    id: 'heritage-tour',
    title: 'Week-Long Heritage Tour',
    subtitle: 'Mumbai → Raigad → Ganpatipule → Ratnagiri → Sindhudurg → Goa Border',
    duration: '7 Days / 6 Nights',
    type: 'premium',
    tagline: 'Seven centuries of Maratha, Portuguese, and Sultanate history in seven days.',
    description:
      'The full-length Konkan run from Mumbai\'s southern shore to the Goa border, threading through forts, temples, mango orchards, and coastal towns that shaped Maharashtra\'s soul. Best done by rental car + Konkan Railway combination for maximum flexibility.',
    days: [
      {
        day: 1,
        title: 'Mumbai → Raigad Fort',
        activities: [
          'Drive to Mahad (3.5 hrs); take the ropeway up to Raigad Fort',
          'Spend 2–3 hrs exploring Shivaji Maharaj\'s Maratha capital ruins',
          'Overnight at Mahad; dinner of traditional Malvani thali',
        ],
        stay: 'Mahad guesthouse',
      },
      {
        day: 2,
        title: 'Raigad → Murud → Ganpatipule',
        activities: [
          'Morning: Murud-Janjira Fort boat trip',
          'Continue south on NH66; reach Ganpatipule by evening',
          'Sunset at Ganpatipule Temple (Swayambhu Ganapati on the beachfront)',
        ],
        stay: 'Ganpatipule MTDC Resort or private homestay',
      },
      {
        day: 3,
        title: 'Ratnagiri Day',
        activities: [
          'Thiba Palace (Burmese king exile site) and Ratnagiri Fort',
          'Mandavi Beach walk; Ratnadurga Fort viewpoint',
          'Tilak Ali Museum — Bal Gangadhar Tilak\'s childhood home',
          'Devgad mango farm visit if in season (Apr–Jun)',
        ],
        stay: 'Ratnagiri',
      },
      {
        day: '4–5',
        title: 'Sindhudurg District',
        activities: [
          'Sindhudurg Fort: boat + entry (the sea-fort Shivaji built with his own hands)',
          'Tarkarli: scuba/snorkel in the morning; backwater cruise at sunset',
          'Sawantwadi Palace crafts market and wooden toy workshop',
          'Rock Garden dive site (experienced divers; book in advance)',
        ],
        stay: 'Tarkarli or Malvan',
      },
      {
        day: '6–7',
        title: 'Amboli & Return',
        activities: [
          'Day trip to Amboli Ghat: waterfalls, viewpoints, herpetofauna spotting',
          'Hiranayakeshi River source trek (2 hrs)',
          'Return via Konkan Railway from Sawantwadi to Mumbai (departs evening)',
          'Or extend: cross into Goa via Patradevi check-post for a final beach evening',
        ],
      },
    ],
    tips: [
      'Book Konkan Railway return tickets 2–3 months ahead for peak season (Nov–Jan)',
      'Raigad ropeway is closed on Tuesdays for maintenance',
      'Sindhudurg Fort permits: ₹50 per person; MTDC boat ₹40 return',
      'Mango season (April–June) is spectacular in Ratnagiri and Devgad — plan accordingly',
    ],
    budget: '₹20,000–35,000 per person (mid-range) | ₹60,000+ (premium)',
    image: '/assets/sindhudurg-fort-walls.jpg',
    color: '#c17f3a',
    badge: 'Full Circuit',
  },
  {
    id: 'monsoon-special',
    title: 'Monsoon Special',
    subtitle: 'Malvan + Marleshwar + Thoseghar + Amboli',
    duration: '4 Days / 3 Nights',
    type: 'monsoon',
    tagline: 'Chase waterfalls and monsoon mist through Sindhudurg and Satara.',
    description:
      'Monsoon transforms the Konkan into a luminous green world — swollen rivers, silver waterfalls against basalt cliffs, mist-wrapped peaks, and the intoxicating smell of wet laterite earth. Beach activities are off-limits, but this is the season\'s true soul.',
    days: [
      {
        day: 1,
        title: 'Mumbai → Malvan (Konkan Railway)',
        activities: [
          'Board the Jan Shatabdi or Tejas Express at Dadar (departs 5:30–7 am)',
          'Arrive Kudal/Sawantwadi by afternoon; taxi to Malvan',
          'Malvan town: Old Market fish bazaar; evening Malvani seafood dinner',
          'Walk the fort moat path around Sindhudurg (no boat in monsoon swell)',
        ],
        stay: 'Malvan guesthouse or heritage homestay',
      },
      {
        day: 2,
        title: 'Marleshwar Gorge',
        activities: [
          'Drive 1.5 hrs to Marleshwar Temple in Rajapur',
          'Trek through the sacred gorge — sheer basalt cliffs, hanging cobras (harmless tree snakes), waterfalls on every face',
          'Marleshwar Shiva temple: ancient cave shrine accessible by wading through a stream',
          'Return to Malvan by evening',
        ],
        stay: 'Malvan (or Kudal for more options)',
      },
      {
        day: 3,
        title: 'Thoseghar Waterfalls',
        activities: [
          'Drive 3 hrs north to Thoseghar (near Satara)',
          'Thoseghar cascade system: 7 falls on a single cliff face; observation deck walk',
          'Lunch in Satara town; optional Kaas Plateau visit (UNESCO World Natural Heritage) for wildflower meadows (Aug–Sep only)',
          'Return toward Amboli or stay in Satara',
        ],
        stay: 'Amboli or Sawantwadi',
      },
      {
        day: 4,
        title: 'Amboli Ghat & Return',
        activities: [
          'Amboli: Hiranyakeshi waterfall, Nagatta Point viewpoint in the mist',
          'Amboli is a herpetologist\'s paradise in monsoon — Malabar pit viper, flying snakes, endemic frogs',
          'Return to Mumbai via Konkan Railway from Sawantwadi or Kudal',
        ],
      },
    ],
    tips: [
      'Monsoon floods can block roads without warning — always check NH66 conditions before driving',
      'Carry full rain gear (not just an umbrella); waterfalls spray everything in a 20-metre radius',
      'Marleshwar gorge requires wading; wear non-slip shoes, not sandals',
      'Kaas Plateau: entry permit required (₹100); visitor numbers capped daily — book online at forest dept website',
    ],
    budget: '₹12,000–20,000 per person (mid-range)',
    image: '/assets/monsoon.jpg',
    color: '#3a9e6e',
    badge: 'Monsoon Magic',
  },
];

// ── Transportation ────────────────────────────────────────────────────────────
export interface TransportMode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: { heading: string; content: string }[];
  proTips: string[];
  image: string;
  color: string;
  icon: string;
}

export const transportModes: TransportMode[] = [
  {
    id: 'konkan-railway',
    title: 'Konkan Railway',
    subtitle: 'The Backbone of Coastal Travel',
    description:
      'The Konkan Railway is one of the great engineering marvels of modern India — 760 km of track through 2,000 bridges, 92 tunnels, and the edge of the Western Ghats. The scenic section between Ratnagiri and Kudal, where the train runs through tunnels and emerges on cliff viaducts above the sea, is routinely called one of the world\'s most beautiful train journeys.',
    details: [
      {
        heading: 'Key Stations',
        content: 'Panvel → Roha → Mangaon → Khed → Chiplun → Sangameshwar → Ratnagiri → Kankavli → Kudal → Sawantwadi → Thivim (Goa)',
      },
      {
        heading: 'Scenic Sections',
        content: 'Ratnagiri to Kudal (80 km): tunnels, ghats, sea viaducts. Khed to Chiplun: river estuary crossings. Panvel to Roha: mangrove country.',
      },
      {
        heading: 'Recommended Trains',
        content: 'Tejas Express (fastest; fully AC; Mumbai–Madgaon in 9 hrs). Jan Shatabdi (economy; great windows). Mandovi Express (overnight; budget option). Netravati Express (Mumbai–Thiruvananthapuram; stops at all major stations).',
      },
      {
        heading: 'Booking Tips',
        content: 'Tatkal quota opens 1 day before departure. Tourist quota available at major stations. Premium Tatkal: for last-minute urgent travel. Book 60–90 days ahead for Nov–Jan; 30 days ahead is often sufficient for monsoon season.',
      },
    ],
    proTips: [
      'For the best views, sit on the left side (facing the engine) Mumbai → Goa; right side on the return',
      'Download the IRCTC Air app or use RailYatri for real-time train tracking on the Konkan route',
      'Konkan Kanya Express (evening departure from Mumbai) is the most "local" experience — travelling alongside fishing families and farmers',
    ],
    image: '/assets/konkan-railway.jpg',
    color: '#c17f3a',
    icon: '🚆',
  },
  {
    id: 'road-routes',
    title: 'Road Routes & Driving',
    subtitle: 'NH66, Coastal Roads & Ferry Crossings',
    description:
      'NH66 (Mumbai–Goa National Highway) is the primary spine — upgraded and excellent in most sections, though it misses the coast. The real Konkan reveals itself on state roads and district tracks: winding through coconut groves, dropping suddenly to a beach, crossing creek bridges with no railing and spectacular views.',
    details: [
      {
        heading: 'NH66 vs Coastal Road',
        content: 'NH66 (faster; Mumbai to Goa in ~10 hrs): suitable for time-limited trips. Old NH17 / coastal route (slower; 14+ hrs to Goa): through fishing villages, gharapuri, harihareshwar. Combine: drive NH66 south, return via coastal route or vice versa.',
      },
      {
        heading: 'Ferry Crossings',
        content: 'Mandwa–Gateway of India (Mumbai): Ro-Pax ferry or speedboat. Rewas–Mandwa: car ferry; 30 min; avoids NH66 South Mumbai traffic. Dighi–JNPT: seasonal car ferry. Velas–Bankot: small boat ferry (bikes & peds only; magical sunrise crossing).',
      },
      {
        heading: 'Parking Notes',
        content: 'Alibaug: paid lots near beach. Murud: street parking, crowded weekends. Ganpatipule, Tarkarli: MTDC parking compounds. Sindhudurg Fort: park at Malvan Jetty (free) and take the fort boat.',
      },
      {
        heading: 'Road Conditions',
        content: 'Pre-monsoon (Apr–May): patchy road surfaces. Monsoon (Jun–Sep): landslides possible on ghat sections; always check NH updates. Winter (Oct–Mar): roads at their best.',
      },
    ],
    proTips: [
      'Keep Google Maps on satellite view when driving coastal roads — it reveals ferry crossings and beach tracks not marked on standard maps',
      'Carry cash for ferry tolls and local parking; UPI rarely works at remote ghats',
      'Night driving on NH66 after Kolad (south of Pune) involves significant truck traffic — plan to arrive at your first stop before dark',
    ],
    image: '/assets/coastal-landscape.jpg',
    color: '#2a8fb5',
    icon: '🚗',
  },
  {
    id: 'local-ferries',
    title: 'Local Ferries & Boats',
    subtitle: 'Inter-Creek & Coastal Water Transport',
    description:
      'The Konkan\'s network of creeks, estuaries, and harbours has been served by boats for centuries — and for many coastal villages, boats remain the only practical connection to the outside world. For the traveller, these crossings are among the most memorable experiences on the coast: small wooden vessels, fishermen heading to sea, and views no road can provide.',
    details: [
      {
        heading: 'Mumbai–Alibaug Catamaran',
        content: 'Gateway of India → Mandwa: 1 hr fast catamaran (₹250–350); multiple operators. Gateway → Alibaug: Ro-Pax service with car capacity (₹900 car + ₹300 person). Book via Maharashtra Tourism or operator websites. Runs 6 am–6 pm.',
      },
      {
        heading: 'Malvan–Sindhudurg Fort',
        content: 'Only way to reach Sindhudurg Fort; 10-minute crossing from Malvan Jetty. ₹40 return; boats run 7 am–5:30 pm. In monsoon swell, services may be suspended — call ahead.',
      },
      {
        heading: 'Inter-Creek Ferries',
        content: 'Dabhol Creek (Ratnagiri): small wooden ferries between Dabhol and Velneshwar villages. Vijaydurg Creek: rowboat entry to Vijaydurg Fort and mangrove forest. Velas–Bankot: morning boat for the mangrove turtle reserve. Terekhol River: Goa border river crossing to Fort Tiracol; free state ferry.',
      },
    ],
    proTips: [
      'The Velas–Bankot morning boat runs only once at 6:30 am; returning boats at 8 am and 4 pm',
      'Sindhudurg Fort boats are shared, not chartered — you\'ll wait until the boat is full (5–15 min usually)',
      'For the Mumbai–Mandwa catamaran, front deck seats offer the best views and sea spray experience',
    ],
    image: '/assets/fishing-village.jpg',
    color: '#3a9e6e',
    icon: '⛵',
  },
];

// ── Accommodation ─────────────────────────────────────────────────────────────
export interface AccommodationType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  options: {
    name: string;
    location: string;
    highlight: string;
    priceRange: string;
    contact?: string;
  }[];
  bookingAdvice: string;
  season: string;
  image: string;
  color: string;
}

export const accommodationTypes: AccommodationType[] = [
  {
    id: 'beach-resorts',
    title: 'Beach Resorts & Hotels',
    subtitle: 'MTDC Properties · Boutique Resorts',
    description:
      'MTDC (Maharashtra Tourism Development Corporation) operates resorts at most major beaches — reliably clean, reasonably priced, and often with the best beachfront positions. Boutique resorts have grown rapidly since 2018, offering architect-designed villas and curated Konkan cuisine.',
    options: [
      {
        name: 'MTDC Tarkarli Resort',
        location: 'Tarkarli, Sindhudurg',
        highlight: 'Directly on Tarkarli Beach; beachside cottages; MTDC water sports centre on-site',
        priceRange: '₹2,500–5,500/night',
        contact: 'mtdcresorts.com',
      },
      {
        name: 'CASUARINA Resort',
        location: 'Harihareshwar, Raigad',
        highlight: 'Clifftop gardens; sea-facing rooms; temple complex within walking distance',
        priceRange: '₹4,500–9,000/night',
        contact: 'mtdcresorts.com',
      },
      {
        name: 'The Mango Tree Konkan',
        location: 'Diveagar',
        highlight: 'Boutique property in a mango grove; Gokarna-style open-air dining; 5-min walk to beach',
        priceRange: '₹6,000–12,000/night',
      },
      {
        name: 'SindhudurgKatta',
        location: 'Malvan',
        highlight: 'Heritage-style property with Malvani seafood kitchen; fort view from rooftop',
        priceRange: '₹3,500–7,000/night',
      },
    ],
    bookingAdvice: 'MTDC resorts must be booked through their official website or Kolkata House in Mumbai. Boutique properties book fast for November–January — reserve 2–3 months in advance for peak season.',
    season: 'Open year-round; beach resorts operate reduced services in monsoon (Jun–Sep)',
    image: '/assets/diveagar-beach.jpg',
    color: '#2a8fb5',
  },
  {
    id: 'homestays',
    title: 'Homestays & Eco-Lodges',
    subtitle: 'Authentic Konkan Living',
    description:
      'The Konkan homestay culture is genuine and deeply rewarding. You sleep in the family home, eat meals cooked in a wood-fire kitchen by the homeowner\'s mother, and wake to coconut trees and birdsong. The best homestays are not found on any app — they\'re passed around by word of mouth, or listed on Maharashtra Tourism\'s portal.',
    options: [
      {
        name: 'Atithi Bamboo Homestay',
        location: 'Malvan, Sindhudurg',
        highlight: 'Bamboo-constructed eco-rooms in a cashew plantation; traditional Malvani meals; walking distance to beach',
        priceRange: '₹1,800–3,200/night (includes meals)',
        contact: '+91 94220 XXXXX (Maharashtra Tourism directory)',
      },
      {
        name: 'Konkan Heritage House',
        location: 'Ratnagiri town',
        highlight: '130-year-old wada; four-poster beds, courtyard breakfast, alphonso mango farm tour',
        priceRange: '₹4,500–7,000/night',
      },
      {
        name: 'Radhanagari Forest Lodge',
        location: 'Radhanagari, Kolhapur',
        highlight: 'Adjacent to sanctuary; gaur sightings from the verandah; guided morning walks included',
        priceRange: '₹3,000–5,500/night (includes safari)',
      },
      {
        name: 'Velas Turtle Watch Camp',
        location: 'Velas Village, Raigad',
        highlight: 'Community-run during turtle nesting season; morning beach patrols; village meals',
        priceRange: '₹1,200–2,500/night (seasonal: Feb–Apr)',
      },
    ],
    bookingAdvice: 'Maharashtra Tourism (maharashtratourism.gov.in) lists certified homestays by district. Google "Malvan homestay" or "Konkan farmstay" for independent operators — always call to confirm before paying.',
    season: 'Best Oct–May; some homestays close during heavy monsoon (Jul–Aug)',
    image: '/assets/homestays.jpg',
    color: '#c17f3a',
  },
  {
    id: 'camping',
    title: 'Camping & Glamping',
    subtitle: 'Beachside Tents · Clifftop Camps',
    description:
      'Beach camping in the Konkan exists in a wide spectrum — from bare-bones tent-and-sleeping-bag setups to glamping pods with electricity, attached baths, and private bonfire pits. Several operators run seasonal camps at beaches closed to vehicle access, ensuring genuine isolation.',
    options: [
      {
        name: 'Diveagar Beach Camp',
        location: 'Diveagar, Raigad',
        highlight: 'Swiss tent glamping on the beach; bonfire, BBQ seafood dinner, sunrise yoga; 200 m from sea',
        priceRange: '₹3,500–5,000/night per tent (couple)',
      },
      {
        name: 'Velas Beachside Tent Stay',
        location: 'Velas, Raigad',
        highlight: 'Budget camp on an uncrowded turtle-nesting beach; stargazing on moonless nights is extraordinary',
        priceRange: '₹1,500–2,200/night',
      },
      {
        name: 'Mandarmani Clifftop Camp',
        location: 'Near Harihareshwar',
        highlight: 'Clifftop tents above the sea; no electricity (solar lanterns); wild swimming below',
        priceRange: '₹2,800–4,500/night',
      },
    ],
    bookingAdvice: 'Beach camping permits are required in some areas — reputable operators handle this. Avoid operators who cannot show a forest/revenue department no-objection certificate.',
    season: 'October – May; monsoon camping is unsafe and most operators are closed Jun–Sep',
    image: '/assets/velas-turtle-beach.jpg',
    color: '#3a9e6e',
  },
];

// ── Practical Information ─────────────────────────────────────────────────────
export interface PracticalSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  items: { heading: string; content: string }[];
  color: string;
}

export const practicalSections: PracticalSection[] = [
  {
    id: 'permits',
    title: 'Permits & Entry Fees',
    subtitle: 'What You\'ll Need & What It Costs',
    icon: '📋',
    color: '#c17f3a',
    items: [
      {
        heading: 'Sindhudurg Fort',
        content: 'MTDC boat: ₹40 return per person. Fort entry: ₹50 per person (Indian), ₹200 (foreign nationals). Archaeological Survey permit not required — fort is maintained by Sindhudurg district heritage committee.',
      },
      {
        heading: 'Malvan Marine Sanctuary',
        content: 'Marine sanctuary permit: ₹1,000 per person per day (collected by operators). Scuba/snorkel operators build this into their package price. Photography with underwater camera requires an additional ₹500 permit.',
      },
      {
        heading: 'Forest Permits',
        content: 'Radhanagari Safari: ₹2,500 per jeep (4–6 pax) + ₹600 guide fee. Phansad: ₹50 entry + ₹150 camera fee. Karnala: ₹30 per Indian, ₹200 per foreign visitor. Permits purchased at the range office on site.',
      },
      {
        heading: 'Kaas Plateau (UNESCO)',
        content: 'Online permit mandatory; ₹100 per person. Maximum 3,000 visitors per day. Book at: kaaspathar.maharashtra.gov.in. Season: August–October (wildflower bloom).',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Health Tips',
    subtitle: 'Sea, Monsoon & Jungle Precautions',
    icon: '🏥',
    color: '#d45f2a',
    items: [
      {
        heading: 'Monsoon Sea Swimming',
        content: 'Swimming is dangerous at all Konkan beaches during monsoon (Jun–Sep) due to rip currents and swell. Red flags = no swimming, no exceptions. Even experienced swimmers drown each year in the Konkan surf.',
      },
      {
        heading: 'Snake & Insect Awareness',
        content: 'The Konkan is genuinely snake-rich, particularly in monsoon. Common species: Malabar pit viper (venomous; nocturnal), Indian cobra, Russell\'s viper. Wear closed shoes on jungle paths. If bitten: immobilise the limb, go immediately to nearest government hospital (antivenin is available). Do not tourniquet or suck the wound.',
      },
      {
        heading: 'Hospitals by District',
        content: 'Alibaug: Civil Hospital (+91 2141 222256). Ratnagiri: District Hospital (+91 2352 222366). Malvan: GHATI Hospital, Sawantwadi. Sindhudurg: District Hospital, Oras. Kolhapur (nearest large city for Radhanagari): CPR Kolhapur Medical College.',
      },
      {
        heading: 'Water & Food Safety',
        content: 'Stick to bottled or filtered water outside towns. Raw oysters and shellfish at beach stalls carry cholera risk, particularly in monsoon. Freshly cooked fish and prawn in any established restaurant is safe. Carry ORS sachets for heat dehydration.',
      },
    ],
  },
  {
    id: 'connectivity',
    title: 'Currency & Connectivity',
    subtitle: 'ATMs, Mobile Coverage & Offline Essentials',
    icon: '📶',
    color: '#3a9e6e',
    items: [
      {
        heading: 'ATM Availability by District',
        content: 'Raigad (Alibaug, Murud): SBI, HDFC ATMs at main market. Reliable. Ratnagiri: full urban banking infrastructure. Sindhudurg (Malvan, Sawantwadi): SBI and Bank of Maharashtra in town; carry cash for Tarkarli beach area. Remote areas (Velas, Aare-Ware, Amboli): carry sufficient cash from the last major town.',
      },
      {
        heading: 'Mobile Coverage Gaps',
        content: 'Jio has the best Konkan coverage overall. BSNL is the fallback in remote villages. Expect 0–2 bars in: Amboli (monsoon cloud cover kills signal), Phansad and Radhanagari forests, Velas village (spotty 4G), isolated beach camps. Download offline maps (Google Maps or Maps.me) before leaving towns.',
      },
      {
        heading: 'Offline Maps Recommendation',
        content: 'Google Maps works well with offline downloads in most of Konkan. Maps.me (HERE maps) has better coverage of forest tracks and coastal paths. Download the Konkan Coastal stretch before departure. Komoot is best for trekking GPS tracks on Sahyadri routes.',
      },
      {
        heading: 'Essential Apps',
        content: 'IRCTC Rail Connect (train booking). MSRTC (ST bus tickets online). Mandwa Ferry (Ro-Pax booking). mtdcresorts.com (MTDC resort booking). Kaas Pathar permit portal. Google Translate (Marathi / Konkani for village interactions).',
      },
    ],
  },
];
