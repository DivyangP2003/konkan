// ── Heritage page data ────────────────────────────────────────────────────────
// Edit this file to add, remove, or update content shown on the /heritage page.
// Content researched from historical & archaeological sources on the Konkan coast
// (Sindhudurg, Vijaydurg, Raigad, Murud-Janjira, Vasai forts; UNESCO's tentative-list
// Konkan geoglyphs; Panhale Kaji, Kuda & Sopara Buddhist sites; Parashurama legend).

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
// Six flagship forts get the full treatment; dozens more live in `additionalForts` below.

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
  {
    id: 'murud-janjira',
    title: 'Murud-Janjira Fort',
    subtitle: 'The Unconquered Island Citadel',
    location: 'Murud, Raigad district',
    built: 'Late 15th century (rebuilt in stone, early 17th century)',
    builder: 'Siddis of Janjira (Abyssinian naval rulers)',
    image: '/assets/murud-janjira-fort.jpg',
    description:
      "Rising straight out of the Arabian Sea, Janjira takes its name from the Arabic 'Jazeera' — island. What began as a wooden stockade of a local Koli chieftain was seized and rebuilt in solid stone by the Siddis, an Abyssinian dynasty who arrived in India as sailors, soldiers and traders. For over 350 years no power — not Shivaji, not Sambhaji, not the Portuguese, not the British — managed to conquer it by force, earning it the title 'Akhtyarabad', the unconquerable.",
    features: [
      '19 rounded bastions built to deflect cannon fire',
      'Once mounted 572 cannons; a handful still remain',
      'Darya Darwaza — a sea-facing gate opening straight onto the water',
      'Two freshwater lakes inside a fort surrounded by sea',
      "Failed Maratha sieges led Sambhaji to build a rival fort, Padmadurg, just offshore",
    ],
    bestTime: 'October to March; reached by sailboat from Rajapuri jetty, sea calmest in the mornings',
    color: '#2a8fb5',
    distanceFromMumbai: '165 km',
  },
  {
    id: 'vasai',
    title: 'Vasai Fort',
    subtitle: "Portugal's Lost Capital of the North",
    location: 'Vasai, Palghar district',
    built: '1536 CE (citadel); 1590 CE (full fort)',
    builder: 'Portuguese Empire',
    image: '/assets/forts-of-konkan.jpg',
    description:
      "For two centuries Vasai — the Portuguese 'Baçaim' — was the administrative and religious capital of their northern territories, so grand it was nicknamed 'the Court of the North'. Behind its 4.5-km wall stood churches, convents and noble mansions rivalling Goa itself. In 1739, Peshwa Bajirao's brother Chimaji Appa laid siege for weeks with an army of nearly 100,000, finally breaching the walls — the bells of Vasai's churches were carried off in victory and still ring today in temples like Jejuri's Khandoba and Osmanabad's Tuljabhavani.",
    features: [
      '110-acre fortified township with 11 bastions',
      'Sea on three sides, a moat cut on the landward side',
      'Ruins of Portuguese churches, convents and a citadel (Bale Killa)',
      'Site of the 1739 Battle of Vasai, one of the largest Maratha sieges',
      'Later the site of the 1802 Treaty of Bassein',
    ],
    bestTime: 'October to February; explore early morning before the ruins get overgrown-hot',
    color: '#3a9e6e',
    distanceFromMumbai: '60 km',
  },
  {
    id: 'suvarnadurg',
    title: 'Suvarnadurg Fort',
    subtitle: 'The Golden Fort of the Angres',
    location: 'Harnai, Ratnagiri district',
    built: 'Pre-1600s (rebuilt and expanded by Shivaji, 1660)',
    builder: 'Adilshahi rulers; rebuilt by Chhatrapati Shivaji Maharaj',
    image: '/assets/forts-of-konkan.jpg',
    description:
      "A sea fort surrounded on all sides by water, Suvarnadurg was fortified by Shivaji in 1660 to guard the Harnai coast and later became the principal naval headquarters of Kanhoji Angre, the Maratha admiral who kept the Arabian Sea free of European fleets for decades. Three satellite forts — Kanakdurg, Goa Killa and Fategad — ring the main island, forming a single defensive cluster rarely seen elsewhere on the coast.",
    features: [
      'A cluster of four linked forts guarding one harbour',
      'Base of admiral Kanhoji Angre\'s Maratha navy',
      'Massive stone bastions still standing in the tidal shallows',
      'Reachable only by fishing boat from Harnai jetty',
      'Freshwater cisterns cut directly into the rock',
    ],
    bestTime: 'November to February, at low tide',
    color: '#c17f3a',
    distanceFromMumbai: '260 km',
  },
];

// ── Also Worth Visiting (secondary forts list) ────────────────────────────────
// Real forts spread across the Konkan coast — sea citadels, hill forts and river forts,
// each with its own local legend at the village level.

export const additionalForts: string[] = [
  'Kolaba Fort (Alibaug)',
  'Khanderi Fort',
  'Underi Fort',
  'Korlai Fort',
  'Arnala Fort',
  'Padmadurg (Kasa Fort)',
  'Jaigad Fort',
  'Bhagwati Fort (Ratnagiri)',
  'Sarjekot',
  'Purnagad',
  'Yashwantgad (Redi Fort)',
  'Bankot Fort (Himmatgad)',
  'Gopalgad (Anjanvel)',
  'Devgad Fort',
  'Sagargad',
  'Avchitgad',
  'Gowalkot (Govindagad)',
  'Fort Manoranjan',
  'Kharepatan Fort',
  'Songad (Wada)',
];

// ── Archaeological Sites ───────────────────────────────────────────────────────

export const archaeological: ArchSite[] = [
  {
    id: 'petroglyphs',
    title: 'Konkan Geoglyphs & Petroglyphs',
    subtitle: "South Asia's Oldest Rock Art",
    location: 'Ratnagiri & Sindhudurg districts — Kasheli, Barsu, Rundhe Tali, Devache Gothane, Devi Hasol, Jambharun, Ukshi, Kudopi',
    period: 'c. 12,000 – 20,000 years ago (Mesolithic to early historic)',
    image: '/assets/temple-carvings.jpg',
    description:
      'Locally called "katal shilpa," these carvings were made not by chiselling upright rock but by incising, picking and abrading flat laterite plateaus (sada) — a rare form of ground art known as geoglyphs. Over 1,500 figures across 70+ sites in Ratnagiri alone depict animals no longer native to the region, including rhinoceros, hippopotamus and shark, hinting at a very different Konkan climate millennia ago. Nine of these sites — eight in Maharashtra plus Goa\'s Pansaimol cluster — now sit on UNESCO\'s tentative World Heritage list.',
    details: [
      "Kasheli's elephant geoglyph — 18×13 metres, with 70–80 smaller animal figures carved inside its outline",
      'Barsu-Solgaon site drew national attention when a proposed refinery threatened it',
      'Figures include tiger, monkey, boar, stingray, turtle and abstract geometric forms',
      'Discovered and documented largely through grassroots efforts by local ornithologist Sudhir Risbud and Nisarga Yatri Sanstha',
      'Best viewed at dawn or dusk when low sunlight throws the shallow carvings into relief',
    ],
    howToVisit: 'Start at the Konkan Geoglyphs & Heritage Research Centre in Ratnagiri town; local guides at Ukshi and Barsu villages are essential — sites are unmarked and on private farmland.',
    color: '#c17f3a',
    distanceFromMumbai: '340 km',
  },
  {
    id: 'kuda-caves',
    title: 'Kuda Caves',
    subtitle: 'Buddhist Monastic Architecture on the Silk Route of the Sea',
    location: 'Kuda village, near Murud, Raigad district',
    period: '1st century BCE – 2nd century CE',
    image: '/assets/ocean-cliffs.jpg',
    description:
      'A row of 26 cave chambers cut into a laterite hillside overlooking the Rajpuri creek, Kuda was carved by Buddhist monks as monsoon retreats (viharas) for sanghas travelling the ancient maritime trade route linking the Konkan ports to the Deccan. Several caves carry donor inscriptions in early Brahmi script, naming the merchants and guilds who funded the work.',
    details: [
      '26 cave chambers, several with carved stone water cisterns',
      'Brahmi inscriptions recording merchant and guild donations',
      'A stupa-shrine (chaitya) among the residential cells (viharas)',
      'Later adapted by local Hindu and Jain worshippers',
      'Overlooks the same creek used by boats crossing to Janjira Fort',
    ],
    howToVisit: 'About 12 km from Murud town via Rajpuri; combine with a Janjira Fort boat trip.',
    color: '#2a8fb5',
    distanceFromMumbai: '165 km',
  },
  {
    id: 'panhale-kaji',
    title: 'Panhale Kaji Caves',
    subtitle: 'Where Buddhism, Shaivism and the Nath Sect Overlap',
    location: 'Panhale Kaji village, Dapoli taluka, Ratnagiri district',
    period: '3rd – 14th century CE',
    image: '/assets/temple-carvings.jpg',
    description:
      "One of the most layered cave sites on the coast, Panhale Kaji's 29 caves along the Kotjai river were begun by Hinayana Buddhist monks in the 3rd century CE, reworked by Tantric Vajrayana practitioners around the 10th–11th centuries, and finally taken over in the 13th century by the Nath sect, who renamed the largest chamber Gaura Lena. A single cave complex thus preserves nearly a thousand years of shifting faith on the same rock face.",
    details: [
      '29 rock-cut caves along the confluence of the Kotjai and Dhakti rivers',
      'Cave 10 holds a rare image of Maha-Chandaroshana, linking Konkan to Buddhist Odisha',
      'Cave 29 (Gaura Lena) carries 85 sculpted figures of Nath siddhas',
      'Inscriptions in both Brahmi and Devanagari script',
      'Copper plates unearthed by a local farmer in 1970 helped date the site',
    ],
    howToVisit: 'Remote — reached via Dapoli–Dabhol road through Terewayangani; the last stretch has poor roads and no network coverage, so start early.',
    color: '#800020',
    distanceFromMumbai: '260 km',
  },
  {
    id: 'sopara',
    title: 'Sopara (Shurparaka)',
    subtitle: "The Konkan's Ancient Port to the World",
    location: 'Nalasopara, Palghar district',
    period: '6th century BCE – 13th century CE',
    image: '/assets/coastal-landscape.jpg',
    description:
      "Long before Mumbai existed, Sopara — Shurparaka in Sanskrit texts, Ophir in some Biblical scholarship — was the Konkan's great harbour, trading spices, cotton and pearls with Rome, Arabia and Southeast Asia. Emperor Ashoka planted one of his rock edicts here in the 3rd century BCE, and a monumental brick stupa once stood at its heart before silting rivers pushed the coastline away and Sopara faded into a quiet suburb.",
    details: [
      'Site of Ashoka\'s Sopara Rock Edict, now preserved at Mumbai\'s Asiatic Society',
      'Excavated brick stupa remains and a relic casket now at the CSMVS Museum, Mumbai',
      'Mentioned in ancient Buddhist Jataka tales as a departure point for sea voyages',
      'Believed by some scholars to be the biblical port of Ophir',
      'A modern Buddha statue and small ASI-protected mound mark the ancient stupa site today',
    ],
    howToVisit: 'Nalasopara railway station on the Western line; the stupa mound and relic-casket replica are a short auto ride away.',
    color: '#3a9e6e',
    distanceFromMumbai: '65 km',
  },
];

// ── Epic Connections ──────────────────────────────────────────────────────────

export const epicConnections: EpicConnection[] = [
  {
    id: 'parashurama',
    title: "Parashurama's Konkan",
    subtitle: 'The Land Reclaimed From the Sea',
    image: '/assets/coastal-landscape.jpg',
    description:
      "The founding myth of the entire Konkan coast: Vishnu's sixth avatar, Parashurama — 'Rama with the axe' — is said to have stood on Mahendragiri hill near Chiplun and hurled his axe into the Arabian Sea. The waters retreated to where it landed, exposing the strip of land that stretches all the way to Kerala. It's why the Konkan's oldest Brahmin community still calls itself Chitpavan, and why Parashurama is worshipped here as the region's presiding deity.",
    sites: [
      { name: 'Parshuram Temple, Chiplun', desc: 'Built on Mahendragiri, his believed permanent abode; over 500 stone steps to the shrine' },
      { name: 'Bandganga Lake, Parshuram village', desc: 'Said to have sprung up where his five arrows struck the ground' },
      { name: 'Renuka Devi Shrine', desc: "A temple to Parashurama's mother, just behind the main sanctum" },
      { name: 'Chiplun town', desc: 'Name traditionally read as "the abode of Parshuram"' },
    ],
    color: '#c17f3a',
  },
  {
    id: 'ramayana',
    title: 'Ramayana Sites',
    subtitle: 'Where Rama Walked the Shore',
    image: '/assets/ganpatipule-temple.jpg',
    description:
      "Local tradition holds that Lord Rama crossed the Konkan coast during his southward journey to Lanka — and multiple sites claim their connection. Harihareshwar, where the Savitri and Kali rivers meet the sea, is associated with Ram's temporary camp. The caves at Velas are said to mark where Ram sought divine counsel before building the bridge to Lanka.",
    sites: [
      { name: 'Harihareshwar', desc: "Ram's coastal rest point, at the Savitri-sea confluence" },
      { name: 'Velas Beach', desc: 'Site of divine counsel, ancient cave shrines' },
      { name: 'Devgad', desc: 'Mentioned in local lore as "Deva-grama"' },
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
      'The Pandavas are said to have travelled through the Konkan during their years of exile (Vanavasa). Several sacred groves — Deool-rai forests — are explicitly protected because the Pandavas rested under them. The Bhimashankar temple in the Sahyadris, though in the hinterland, is said to have been established by Bhima himself.',
    sites: [
      { name: 'Bhimashankar', desc: 'Jyotirlinga established by Bhima, according to legend' },
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
    { value: '12,000+', label: 'Years of human presence' },
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
      'The Konkan coast once bristled with over 300 forts — sea citadels, hill strongholds, and river outposts that guarded the coast from the Portuguese, the Mughals, and the British. Six stand above all others.',
    archaeological:
      "Beneath the beaches and behind the waterfalls, the Konkan coast preserves some of humanity's earliest marks — prehistoric geoglyphs and Buddhist cave-monasteries that rewrote India's archaeological timeline.",
    epics:
      "The Konkan coast appears, directly and through local tradition, in the region's own founding myth and both of India's great epics. These connections are not mythologized footnotes — they are the living faith of communities who have worshipped at these spots for two thousand years.",
  },
};
