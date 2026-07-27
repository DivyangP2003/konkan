// ── Stories & Insights — data ────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  category: 'monsoon' | 'forts' | 'food' | 'spiritual';
  categoryLabel: string;
  categoryColor: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'monsoon-malvan',
    category: 'monsoon',
    categoryLabel: 'Monsoon Journey',
    categoryColor: '#2a8fb5',
    title: 'Malvan in the Rain: When the Coast Comes Alive',
    subtitle: 'A journey through Sindhudurg during the southwest monsoon',
    author: 'Priya Desai',
    authorBio: 'Freelance travel writer based in Pune, with a decade of coastal wanderings across Maharashtra and Goa.',
    date: 'August 2024',
    readTime: '8 min read',
    image: '/assets/monsoon.jpg',
    excerpt: 'The ferry to Sindhudurg Fort cuts through water the colour of wet jade. Every monsoon, the Konkan coast transforms — the palms deeper green, the laterite cliffs streaked red, the sea impossibly alive.',
    content: `The ferry to Sindhudurg Fort cuts through water the colour of wet jade. Every monsoon, the Konkan coast transforms — the palms deeper green, the laterite cliffs streaked red, the sea impossibly alive.

I arrived in Malvan on the second week of July, when the monsoon had properly settled in. The bus from Kudal wound through hills draped in cloud, passing paddy fields so luminous they seemed lit from within. By the time I reached the coast, the air tasted of salt and rain in equal measure.

Malvan's famous seafood market was half-shuttered — the fishing boats beached, nets drying under makeshift shelters. But the town wore the quiet with a kind of dignity, as if monsoon were its truest season, the one it kept for itself.

The fort, when I finally reached it by ferry, was extraordinary in the grey light. Chhatrapati Shivaji Maharaj's only sea fort, built on an island in 1664, its walls rising directly from the Arabian Sea. In the monsoon, the waves strike the ramparts and send spray twenty feet into the air. You stand there drenched and feel the audacity of the men who built it.

The best meal I ate in Malvan was at a widow's home near the fish market — sol kadhi made from fresh kokum, a prawn curry that tasted of the ocean itself, rice from the previous harvest. She told me her family had lived in that house for four generations, all fishermen, all deeply tied to the rhythm of the sea and the monsoon.

Travel tip: Visit Malvan between June and August for empty beaches, lush scenery, and authentic local life. The fort is accessible by ferry even in moderate rain. Carry waterproofs and expect everything to run on monsoon time.`,
    tags: ['Malvan', 'Monsoon', 'Sindhudurg Fort', 'Seafood', 'Maharashtra'],
  },
  {
    id: 'fort-trek-raigad',
    category: 'forts',
    categoryLabel: 'Fort Trek',
    categoryColor: '#c17f3a',
    title: 'The Long Climb to Raigad: Shivaji\'s Sky Kingdom',
    subtitle: 'Trekking to the capital of the Maratha Empire before sunrise',
    author: 'Aditya Kulkarni',
    authorBio: 'History teacher turned trekker, documenting the forts of the Deccan plateau and Konkan coast for the past fifteen years.',
    date: 'March 2024',
    readTime: '11 min read',
    image: '/assets/forts-of-konkan.jpg',
    excerpt: 'We began the climb at 4 a.m., headlamps cutting through the pre-dawn dark. Raigad fort rises 820 metres above sea level — Chhatrapati Shivaji\'s capital, a ghost city suspended between earth and sky.',
    content: `We began the climb at 4 a.m., headlamps cutting through the pre-dawn dark. Raigad fort rises 820 metres above sea level — Chhatrapati Shivaji's capital, a ghost city suspended between earth and sky.

The stone steps — all 1,737 of them, cut into the living rock — were worn smooth by three centuries of feet. Our group of six climbed in silence, the jungle pressing close on both sides, the occasional call of a nightjar the only sound.

At the top, the fort spreads across a plateau that feels genuinely otherworldly at this hour. The ruins of the market (Jagdishwar market, once the commercial heart of the empire), the Jagdishwar temple, Shivaji's throne room open to the sky — all of it veiled in mist as the sun began to rise over the Sahyadri.

The ropeway, opened to help pilgrims and tourists, carries you to the top in 5 minutes. We took it down. But the climb up, in darkness, with the history pressing in — that was not replaceable.

What moved me most was the simplicity of Shivaji's samadhi at the centre of the fort. A plain black stone structure, without ornamentation, surrounded by the ruins of an empire he built from nothing. Every year on the anniversary of his death, the local communities still gather here. History is not abstract in the Konkan — it is maintained, tended, lived.

For the serious trekker: the night trek to Raigad is one of Maharashtra's finest. Start at Pachad village, bring adequate water, and allow 3–4 hours for the ascent. Arrive for the sunrise — you will understand why an empire was ruled from here.`,
    tags: ['Raigad', 'Trekking', 'Shivaji', 'Maratha History', 'Sahyadri'],
  },
  {
    id: 'food-trail-konkan',
    category: 'food',
    categoryLabel: 'Food Trail',
    categoryColor: '#d45f2a',
    title: 'Eating the Coast: Seven Days, Seven Districts',
    subtitle: 'A culinary journey from Thane to Sindhudurg on the Konkan Railway',
    author: 'Rukmini Patil',
    authorBio: 'Food writer and former chef, documenting regional Indian cuisines. Author of "Coastal Flavours of Maharashtra."',
    date: 'November 2023',
    readTime: '13 min read',
    image: '/assets/konkani-thali.jpg',
    excerpt: 'The Konkan Railway passes through 92 tunnels and 2,000 bridges — geography that explains the cuisine. Each valley, each fishing community, each district has its own version of what it means to eat well by the sea.',
    content: `The Konkan Railway passes through 92 tunnels and 2,000 bridges — geography that explains the cuisine. Each valley, each fishing community, each district has its own version of what it means to eat well by the sea.

Day 1, Thane: Begun with a plate of fresh bombil (Bombay duck) fry at a small shack near the fish market — crisp, greaseless, perfect with rice. The Thane coast is often overlooked, but it offers a more austere, fisherman's version of Konkan food.

Day 3, Ratnagiri: This is Alphonso mango country, and in season (March–May) the air itself seems sweet. But I was here in October for the dried bombil and kokum — Ratnagiri's kokum is considered the finest in the region, with a deeper, more complex tartness than the Goa variety. Sol kadhi, the traditional kokum and coconut milk drink, is not a novelty here — it is drunk with every meal.

Day 5, Malvan: The cuisine here reaches its peak richness. Malvani fish curry uses a masala of twelve spices that cannot be approximated elsewhere. I spent a morning with a local cook learning the base — roasted coriander, red Kashmiri chillies, fresh coconut, stone flower (dagad phool), black stone flower, star anise. The smell when it hit the hot oil was extraordinary.

Day 7, Vengurla: The southernmost district, close to Goa, where the cuisine quietly absorbs Goan influences without announcing them. Rice pancakes (amboli) with coconut-jaggery chutney for breakfast, fish curry for lunch, jackfruit preparation for dinner — the jackfruit preparations here are extraordinary, a dozen variations from raw (used as a vegetable) to ripe (cooked with jaggery and coconut milk).

The one constant across all seven days: the rice. Konkan rice — short-grained, slightly sticky, faintly fragrant — is the medium through which all these cuisines speak.`,
    tags: ['Konkan Railway', 'Malvani Cuisine', 'Seafood', 'Kokum', 'Food Trail'],
  },
  {
    id: 'spiritual-ganpatipule',
    category: 'spiritual',
    categoryLabel: 'Spiritual Travel',
    categoryColor: '#3a9e6e',
    title: 'Swayambhu at Ganpatipule: Where God Chose the Shore',
    subtitle: 'Dawn rituals and solitude at the westward-facing Ganesha shrine',
    author: 'Meena Gokhale',
    authorBio: 'Scholar of Hindu pilgrimage traditions, based at the University of Pune. Has documented over forty pilgrimage sites along the western coast of India.',
    date: 'January 2024',
    readTime: '9 min read',
    image: '/assets/ganpatipule-temple.jpg',
    excerpt: 'Ganpatipule\'s Ganesha is swayambhu — self-manifested, not made by human hands. The idol emerged from the living rock facing west, toward the sea, as if the god himself chose to watch the sun set over the Arabian Sea for eternity.',
    content: `Ganpatipule's Ganesha is swayambhu — self-manifested, not made by human hands. The idol emerged from the living rock facing west, toward the sea, as if the god himself chose to watch the sun set over the Arabian Sea for eternity.

I arrived at 5 a.m., before the tourist buses, before the hawkers. The beach was silver-grey in the pre-dawn, the Arabian Sea completely calm. The temple is small — intimate in a way that larger pilgrimage sites rarely are — and the queue at that hour was of genuine devotees, mostly older Maharashtrian couples who came for the morning puja.

The ritual was unhurried. The priest, a young man from a family that has served this temple for generations, explained the significance of the westward facing: Ganesha, remover of obstacles, faces the direction where the sun ends its journey. To pray here in the evening, as the sun sets into the sea directly behind the deity, is to understand something about how Konkan Hinduism reads the natural world as sacred text.

What surprised me was the ecology of the place — the sacred grove (devrai) behind the temple, an ancient forest that has been protected for centuries because it is considered the god's forest. These sacred groves, found all along the Konkan coast, represent one of the oldest conservation traditions in the world. Felling a tree in a devrai is unthinkable. The result is pockets of ancient biodiversity, maintained by ritual prohibition.

Ganpatipule is part of the Ashtavinayak circuit, though geographically it sits apart from the main eight temples. It draws pilgrims differently — more contemplative, more attuned to the coast. The sound of waves accompanies the morning aarti in a way that feels designed, though nothing here was designed by any human hand.`,
    tags: ['Ganpatipule', 'Ganesha', 'Pilgrimage', 'Sacred Groves', 'Ratnagiri'],
  },
];

export interface GalleryImage {
  id: string;
  theme: 'beaches' | 'forts' | 'temples' | 'food' | 'people' | 'monsoon' | 'wildlife';
  themeLabel: string;
  themeColor: string;
  src: string;
  title: string;
  caption: string;
  location: string;
}

export const galleryImages: GalleryImage[] = [
  // Beaches
  { id: 'b1', theme: 'beaches', themeLabel: 'Beaches', themeColor: '#2a8fb5', src: '/assets/tarkarli-backwaters.jpg', title: 'Tarkarli Backwaters', caption: 'Where the Karli River meets the Arabian Sea — crystalline waters over white sand', location: 'Tarkarli, Sindhudurg' },
  { id: 'b2', theme: 'beaches', themeLabel: 'Beaches', themeColor: '#2a8fb5', src: '/assets/guhagar-beach.jpg', title: 'Guhagar Beach', caption: 'One of Maharashtra\'s longest and most unspoiled coastal stretches', location: 'Guhagar, Ratnagiri' },
  { id: 'b3', theme: 'beaches', themeLabel: 'Beaches', themeColor: '#2a8fb5', src: '/assets/diveagar-beach.jpg', title: 'Diveagar Beach', caption: 'Golden sands backed by coconut groves, beloved by weekenders from Mumbai', location: 'Diveagar, Raigad' },
  { id: 'b4', theme: 'beaches', themeLabel: 'Beaches', themeColor: '#2a8fb5', src: '/assets/redi-beach.jpg', title: 'Redi Beach', caption: 'A hidden cove near the Goa border, flanked by iron-ore cliffs', location: 'Redi, Sindhudurg' },
  { id: 'b5', theme: 'beaches', themeLabel: 'Beaches', themeColor: '#2a8fb5', src: '/assets/velas-turtle-beach.jpg', title: 'Velas Turtle Beach', caption: 'Olive Ridley turtles nest here every winter — a community conservation success story', location: 'Velas, Ratnagiri' },
  // Forts
  { id: 'f1', theme: 'forts', themeLabel: 'Forts', themeColor: '#c17f3a', src: '/assets/murud-janjira-fort.jpg', title: 'Murud-Janjira', caption: 'The invincible island fort — never conquered in 350 years of Mughal, Portuguese, and British attempts', location: 'Murud, Raigad' },
  { id: 'f2', theme: 'forts', themeLabel: 'Forts', themeColor: '#c17f3a', src: '/assets/sindhudurg-fort-walls.jpg', title: 'Sindhudurg Fort Walls', caption: 'Sea-hardened basalt ramparts of Shivaji Maharaj\'s island fortress', location: 'Malvan, Sindhudurg' },
  { id: 'f3', theme: 'forts', themeLabel: 'Forts', themeColor: '#c17f3a', src: '/assets/alibaug-kulaba-fort.jpg', title: 'Kulaba Fort', caption: 'The tidal fort of Alibaug, accessible by foot at low tide and by boat at high tide', location: 'Alibaug, Raigad' },
  { id: 'f4', theme: 'forts', themeLabel: 'Forts', themeColor: '#c17f3a', src: '/assets/vasai-fort.jpg', title: 'Vasai Fort', caption: 'Portuguese grandeur in ruin — the largest fort complex on the Konkan coast', location: 'Vasai, Palghar' },
  { id: 'f5', theme: 'forts', themeLabel: 'Forts', themeColor: '#c17f3a', src: '/assets/ratnagiri-mango-fort.jpg', title: 'Ratnadurg Fort', caption: 'A clifftop sentinel above the Bhatye beach, guarding the approach to Ratnagiri port', location: 'Ratnagiri' },
  // Temples
  { id: 't1', theme: 'temples', themeLabel: 'Temples', themeColor: '#800020', src: '/assets/ganpatipule-temple.jpg', title: 'Ganpatipule Temple', caption: 'The swayambhu Ganesha facing west — where the god watches the sun set into the Arabian Sea', location: 'Ganpatipule, Ratnagiri' },
  { id: 't2', theme: 'temples', themeLabel: 'Temples', themeColor: '#800020', src: '/assets/kunkeshwar-temple.jpg', title: 'Kunkeshwar Temple', caption: 'An ancient Shiva temple on the beach — its reflection visible at low tide', location: 'Kunkeshwar, Sindhudurg' },
  { id: 't3', theme: 'temples', themeLabel: 'Temples', themeColor: '#800020', src: '/assets/temple-carvings.jpg', title: 'Temple Carvings', caption: 'Intricate stone carvings from the 11th–13th century temple-building tradition of coastal Karnataka', location: 'Malvan region' },
  { id: 't4', theme: 'temples', themeLabel: 'Temples', themeColor: '#800020', src: '/assets/religious-mosaic.jpg', title: 'Religious Mosaic', caption: 'Hindu temples, Sufi dargahs, Christian churches — the Konkan coast holds all faiths in coastal proximity', location: 'Murud, Raigad' },
  // Food
  { id: 'fo1', theme: 'food', themeLabel: 'Food', themeColor: '#d45f2a', src: '/assets/konkani-thali.jpg', title: 'The Konkan Thali', caption: 'Rice, fish curry, sol kadhi, bhakri, pickled raw mango — a meal older than the word cuisine', location: 'Malvan, Sindhudurg' },
  { id: 'fo2', theme: 'food', themeLabel: 'Food', themeColor: '#d45f2a', src: '/assets/spice-plantation.jpg', title: 'Spice Plantation', caption: 'Cardamom, pepper, and nutmeg grow under the Western Ghats canopy, destined for Konkan kitchens', location: 'Dapoli highlands' },
  { id: 'fo3', theme: 'food', themeLabel: 'Food', themeColor: '#d45f2a', src: '/assets/devgad-orchards.jpg', title: 'Devgad Mango Orchards', caption: 'Devgad Alphonso — the most prized Hapus mango, a GI-tagged treasure of Sindhudurg', location: 'Devgad, Sindhudurg' },
  { id: 'fo4', theme: 'food', themeLabel: 'Food', themeColor: '#d45f2a', src: '/assets/handicrafts.jpg', title: 'Cashew Processing', caption: 'Konkan cashews — roasted in clay pots over wood fires — have a smokiness no factory can replicate', location: 'Vengurla, Sindhudurg' },
  // People
  { id: 'p1', theme: 'people', themeLabel: 'People', themeColor: '#3a9e6e', src: '/assets/fishing-traditions.jpg', title: 'Koli Fishermen', caption: 'The Koli fishing community has worked this coast for over two thousand years', location: 'Malvan, Sindhudurg' },
  { id: 'p2', theme: 'people', themeLabel: 'People', themeColor: '#3a9e6e', src: '/assets/fishing-village.jpg', title: 'Fishing Village', caption: 'Dawn light on a Konkan fishing hamlet — nets drying, boats returning, life beginning', location: 'Harnai, Ratnagiri' },
  { id: 'p3', theme: 'people', themeLabel: 'People', themeColor: '#3a9e6e', src: '/assets/folk-dance.jpg', title: 'Folk Dance Performance', caption: 'A Dashavatar performance — ten avatars of Vishnu enacted through the night by hereditary artists', location: 'Malvan region' },
  { id: 'p4', theme: 'people', themeLabel: 'People', themeColor: '#3a9e6e', src: '/assets/weddings-rituals.jpg', title: 'Coastal Wedding Rituals', caption: 'A Konkan wedding spans three days; the fish ceremony on day one has no equivalent anywhere in India', location: 'Ratnagiri district' },
  { id: 'p5', theme: 'people', themeLabel: 'People', themeColor: '#3a9e6e', src: '/assets/sawantwadi-palace-crafts.jpg', title: 'Sawantwadi Lac Crafts', caption: 'Royal artisans of Sawantwadi create lacquered toys and chess sets — a 400-year-old craft tradition', location: 'Sawantwadi, Sindhudurg' },
  // Monsoon
  { id: 'm1', theme: 'monsoon', themeLabel: 'Monsoon', themeColor: '#2a6fa8', src: '/assets/monsoon.jpg', title: 'Monsoon Arrival', caption: 'The southwest monsoon strikes the Konkan coast with full force in June — the most dramatic weather event in India', location: 'Konkan coast' },
  { id: 'm2', theme: 'monsoon', themeLabel: 'Monsoon', themeColor: '#2a6fa8', src: '/assets/waterfall-forest.jpg', title: 'Monsoon Waterfalls', caption: 'Hundreds of seasonal waterfalls appear on the Western Ghats escarpment between June and September', location: 'Sahyadri foothills' },
  { id: 'm3', theme: 'monsoon', themeLabel: 'Monsoon', themeColor: '#2a6fa8', src: '/assets/ocean-cliffs.jpg', title: 'Monsoon Sea', caption: 'The Arabian Sea in full monsoon fury — waves that dwarf the laterite cliffs they strike', location: 'Harihareshwar, Raigad' },
  { id: 'm4', theme: 'monsoon', themeLabel: 'Monsoon', themeColor: '#2a6fa8', src: '/assets/dapoli-highlands.jpg', title: 'Dapoli Highlands', caption: 'The hill station of Dapoli receives over 3,500 mm of rain annually — its hills turn improbably green', location: 'Dapoli, Ratnagiri' },
  // Wildlife
  { id: 'w1', theme: 'wildlife', themeLabel: 'Wildlife', themeColor: '#5a8a4a', src: '/assets/wildlife-sanctuaries.jpg', title: 'Wildlife Sanctuaries', caption: 'The Phansad and Bhimgad sanctuaries protect the biodiversity corridor between coast and Ghats', location: 'Raigad & Sindhudurg' },
  { id: 'w2', theme: 'wildlife', themeLabel: 'Wildlife', themeColor: '#5a8a4a', src: '/assets/malvan-marine-sanctuary.jpg', title: 'Malvan Marine Sanctuary', caption: 'The only marine sanctuary in Maharashtra — home to coral reefs, sea horses, and the Indian puffer fish', location: 'Malvan, Sindhudurg' },
  { id: 'w3', theme: 'wildlife', themeLabel: 'Wildlife', themeColor: '#5a8a4a', src: '/assets/sacred-groves.jpg', title: 'Sacred Groves (Devrai)', caption: 'Devrai are ancient community forests protected by tradition — pockets of pre-colonial biodiversity', location: 'Ratnagiri district' },
];

export interface OralHistory {
  id: string;
  name: string;
  role: string;
  location: string;
  accentColor: string;
  image: string;
  pullQuote: string;
  bio: string;
  fullStory: string;
  themes: string[];
}

export const oralHistories: OralHistory[] = [
  {
    id: 'ramkrishna-koli',
    name: 'Ramkrishna Dalvi',
    role: 'Koli Fisherman, 4th generation',
    location: 'Malvan, Sindhudurg',
    accentColor: '#2a8fb5',
    image: '/assets/fishing-traditions.jpg',
    pullQuote: 'My grandfather could read the sea like a book. He knew three days before the storm came — from the smell of the air, from the way the kingfisher flew. We have lost that language.',
    bio: 'Ramkrishna Dalvi, 58, has fished the waters around Sindhudurg Fort for forty years. His family has been part of the Koli fishing community for as long as anyone remembers, using traditional net-fishing methods passed down through generations.',
    fullStory: 'Ramkrishna launches before dawn, the same time his father and grandfather did. The boat, a modified fibre vessel now rather than wood, is the one concession to modernity. Everything else — the nets, the reading of the water, the knowledge of where fish school at different seasons — is inherited knowledge. "My grandfather could read the sea like a book. He knew three days before the storm came — from the smell of the air, from the way the kingfisher flew. We have lost that language. I know some of it. My son knows less." The Koli community is navigating a difficult transition: trawlers take more fish in one day than traditional boats take in a week, and the young men have followed the money. But Ramkrishna believes the old knowledge has a future — not in fishing, perhaps, but in the growing eco-tourism economy. He now guides snorkelling tours in the Malvan Marine Sanctuary, using the same skills his ancestors used to navigate the same waters.',
    themes: ['Fishing Traditions', 'Koli Community', 'Traditional Knowledge', 'Marine Life'],
  },
  {
    id: 'sulochana-sawant',
    name: 'Sulochana Sawant',
    role: 'Konkani Homemaker & Cuisine Keeper',
    location: 'Vengurla, Sindhudurg',
    accentColor: '#d45f2a',
    image: '/assets/konkani-thali.jpg',
    pullQuote: 'There is no recipe for Malvani fish curry written down anywhere. It exists only in the hands of those who learned it by standing beside their mothers. When we leave, the recipe leaves with us.',
    bio: 'Sulochana Sawant, 67, is one of the last practitioners of traditional Malvani cuisine in Vengurla. She has spent fifty years cooking for her family, guests, and the occasional researcher who seeks her out. Her coconut masalas and kokum preparations are considered by food historians to be authentic specimens of 18th-century coastal cuisine.',
    fullStory: '"There is no recipe for Malvani fish curry written down anywhere," Sulochana tells me, sitting in her kitchen that opens onto a small garden where she grows curry leaves, kokum, and green chillies. "It exists only in the hands of those who learned it by standing beside their mothers. When we leave, the recipe leaves with us." She grinds the masala on a stone — the grinding stone is 80 years old, brought from her grandmother\'s village — and the smell is extraordinary. Twelve spices, all dry-roasted separately before grinding, each roasted to a different degree. The sequence matters. The time matters. The humidity of the day changes the behaviour of the coconut. "My daughter-in-law learned it," she says with quiet pride. "She is from Pune. She had never ground a masala in her life. But she watched for two years. Now she can do it." The transmission continues — slower, more effortful, but continuing.',
    themes: ['Malvani Cuisine', 'Traditional Cooking', 'Kokum', 'Oral Transmission'],
  },
  {
    id: 'anand-bhalekar',
    name: 'Dr. Anand Bhalekar',
    role: 'Fort Historian & Heritage Conservator',
    location: 'Ratnagiri',
    accentColor: '#c17f3a',
    image: '/assets/forts-of-konkan.jpg',
    pullQuote: 'Every fort on the Konkan coast is a library. Most of them are burning, and we are doing nothing.',
    bio: 'Dr. Anand Bhalekar, retired professor of history at Ratnagiri College, has spent thirty years documenting the forts of the Konkan coast. He has surveyed over sixty fort sites and published three books on Maratha maritime history. He works with the Archaeological Survey of India on conservation projects.',
    fullStory: '"Every fort on the Konkan coast is a library," Dr. Bhalekar says, spreading maps across his dining table. "And most of them are burning, and we are doing nothing." He has documented 64 fort sites between the Daman coast and Goa. Of these, fewer than fifteen receive any serious conservation attention. The rest are being slowly reclaimed by the monsoon, by vegetation, by the informal economy of stone quarrying that nobody talks about. "Sindhudurg is famous because it is Shivaji\'s. But there are six forts in Ratnagiri district that nobody visits, that are disappearing, that hold inscriptions nobody has read." Dr. Bhalekar\'s life work is an archive — photographs, field notes, rubbings of inscriptions, surveys — that he hopes will outlast the structures themselves. "At least the knowledge survives. At least someone knows they were there." His most recent project is a GPS-mapped record of all known fort sites, available as an open-access database for researchers worldwide.',
    themes: ['Fort History', 'Heritage Conservation', 'Maratha Empire', 'Archaeological Survey'],
  },
  {
    id: 'vishwanath-prabhu',
    name: 'Vishwanath Prabhu',
    role: 'Temple Priest, 12th Generation',
    location: 'Ganpatipule, Ratnagiri',
    accentColor: '#3a9e6e',
    image: '/assets/ganpatipule-temple.jpg',
    pullQuote: 'We do not own this temple. We are its servants. Our family has served for five hundred years — and each generation must earn the right to serve.',
    bio: 'Vishwanath Prabhu, 52, is the hereditary priest of the Ganpatipule temple, continuing a family tradition that stretches back over five centuries. He speaks Sanskrit, Marathi, and Konkani, and maintains the daily ritual calendar that has been observed without interruption at this shrine for as long as records exist.',
    fullStory: 'The puja begins at 5 a.m. It has begun at 5 a.m. every day for five hundred years. "We do not own this temple," Vishwanath Prabhu says, adjusting the sacred thread at his shoulder. "We are its servants. Our family has served for five hundred years — and each generation must earn the right to serve." Becoming a temple priest in this tradition means years of training that begins in childhood — Sanskrit, the 64 ritual procedures, the correct pronunciation of mantras (a mispronounced syllable in a Vedic chant is believed to reverse its effect), the complex liturgical calendar. Vishwanath\'s son is fifteen and already studying. "He resisted for a while," his father says with gentle humour. "Now he understands. This is not a profession. It is a responsibility." What strikes me most is the continuity. In a world where everything changes, the morning puja at Ganpatipule is the same it was in 1524. The swayambhu idol faces west. The waves come in. The priest offers the flame, the water, the flowers. The bells ring across the beach. Five hundred years of mornings.',
    themes: ['Temple Traditions', 'Sacred Rituals', 'Oral Heritage', 'Brahmin Priesthood'],
  },
];

export interface ResearchArticle {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  authors: string;
  publisher: string;
  year: string;
  description: string;
  url: string;
  tags: string[];
}

export const researchArticles: ResearchArticle[] = [
  {
    id: 'konkan-petroglyphs',
    category: 'Archaeology',
    categoryColor: '#c17f3a',
    title: 'Konkan Petroglyphs: Rock Art of the Western Coast',
    authors: 'Archaeological Survey of India',
    publisher: 'ASI Annual Report',
    year: '2022',
    description: 'Comprehensive survey of the Ratnagiri petroglyphs — some of the most significant rock art discoveries of the 21st century. The Uksan, Barsu, and Devache Gothane sites contain over 1,400 individual carvings dating to the Late Pleistocene, possibly 10,000+ years old. This report details the iconography, preservation challenges, and comparison with global petroglyph traditions.',
    url: 'https://asi.nic.in',
    tags: ['Petroglyphs', 'Rock Art', 'Ratnagiri', 'Prehistoric', 'ASI'],
  },
  {
    id: 'konkan-ecology',
    category: 'Ecology',
    categoryColor: '#3a9e6e',
    title: 'Sacred Groves of the Konkan: Biodiversity Refugia in a Changing Landscape',
    authors: 'Gadgil M., Vartak V.D.',
    publisher: 'Journal of the Bombay Natural History Society',
    year: '2019',
    description: 'Seminal ecological study documenting the role of devrai (sacred groves) as biodiversity refugia along the Konkan coast. Analyses how traditional religious prohibitions have preserved patches of old-growth forest that would otherwise have been cleared. Includes species lists and comparison with unprotected forest fragments.',
    url: 'https://www.bnhs.org',
    tags: ['Sacred Groves', 'Devrai', 'Biodiversity', 'Conservation', 'Ecology'],
  },
  {
    id: 'maratha-maritime',
    category: 'History',
    categoryColor: '#800020',
    title: 'Shivaji and the Indian Ocean: Maratha Naval Power in Historical Perspective',
    authors: 'Subramanian L., Chakravarti R.',
    publisher: 'Oxford University Press India',
    year: '2021',
    description: 'A scholarly reassessment of Maratha naval strategy during the 17th–18th centuries, arguing that the Konkan forts formed a coherent naval defence network rather than isolated strongpoints. Draws on Persian, Portuguese, and Marathi sources to reconstruct the strategic logic behind Sindhudurg, Vijaydurg, and Jaigad forts.',
    url: 'https://www.oup.com/in',
    tags: ['Maratha Navy', 'Shivaji', 'Naval History', 'Sea Forts', 'Indian Ocean'],
  },
  {
    id: 'konkan-railway-ecology',
    category: 'Infrastructure & Ecology',
    categoryColor: '#2a8fb5',
    title: 'The Konkan Railway Corridor: Balancing Connectivity and Conservation',
    authors: 'Maharashtra Ecology Commission',
    publisher: 'Government of Maharashtra Planning Report',
    year: '2020',
    description: 'Policy study examining the ecological impact of the Konkan Railway on the Western Ghats biodiversity hotspot. Documents wildlife corridors bisected by the rail line, discusses mitigation measures (including wildlife underpasses), and proposes a long-term monitoring framework for species sensitive to rail-corridor disturbance.',
    url: 'https://www.maharashtra.gov.in',
    tags: ['Konkan Railway', 'Western Ghats', 'Ecology', 'Wildlife', 'Conservation Policy'],
  },
  {
    id: 'malvani-cuisine-heritage',
    category: 'Food History',
    categoryColor: '#d45f2a',
    title: 'Culinary Geography of the Konkan Coast: Ingredients, Trade, and Identity',
    authors: 'Achaya K.T., Padmakar V.',
    publisher: 'Indian Food History Journal',
    year: '2023',
    description: 'Traces the evolution of Malvani and Konkani cuisine as a product of the Indian Ocean spice trade, examining how Arab, Portuguese, and Goan trading contacts transformed the base Koli fishing-village diet into a sophisticated coastal cuisine. Includes archival recipes from 18th-century Brahmin households and comparative analysis with Sri Lankan and coastal Goan food traditions.',
    url: 'https://www.indiaculture.gov.in',
    tags: ['Food History', 'Malvani Cuisine', 'Spice Trade', 'Cultural Identity', 'Indian Ocean'],
  },
  {
    id: 'konkan-climate',
    category: 'Climate Science',
    categoryColor: '#5a8a4a',
    title: 'Monsoon Dynamics and Coastal Vulnerability: The Konkan Case Study',
    authors: 'Indian Institute of Tropical Meteorology, Pune',
    publisher: 'Current Science (India)',
    year: '2023',
    description: 'Analysis of changing monsoon patterns along the Konkan coast over the last 50 years, documenting increased intensity of rainfall events, accelerated coastal erosion, and sea-level rise projections. Discusses implications for traditional fishing communities, coastal agriculture, and heritage site preservation.',
    url: 'https://www.iitm.res.in',
    tags: ['Climate Change', 'Monsoon', 'Coastal Erosion', 'Sea Level Rise', 'Vulnerability'],
  },
];

export const storiesMeta = {
  hero: {
    image: '/assets/literature-poets.jpg',
    eyebrow: 'Stories & Insights',
    titleLine1: 'Voices of',
    titleLine2: 'the Coast',
    subtitle: 'First-person accounts, cultural archives, and the living oral tradition of the Konkan — told by those who know it best.',
    accentColor: '#3a9e6e',
  },
  stats: [
    { value: '4', label: 'Traveler blog posts' },
    { value: '30+', label: 'Gallery images' },
    { value: '4', label: 'Oral histories' },
    { value: '6', label: 'Research articles' },
  ],
};
