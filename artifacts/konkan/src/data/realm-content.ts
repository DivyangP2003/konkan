/** Rich per-realm content used by the Realm page */

export interface RealmContent {
  subtitle: string;
  body: string[];
  quote?: { text: string; attribution?: string };
  keyFacts?: Array<{ label: string; value: string }>;
  highlights?: Array<{ title: string; desc: string }>;
  gallery?: string[]; // paths relative to /assets/
  thingsToDo?: string[];
}

export const realmContent: Record<string, RealmContent> = {

  /* ── History ─────────────────────────────────────────────────────────── */
  history: {
    subtitle: 'The Living Memory of a Coastal Civilization',
    body: [
      'The Konkan coast is one of India\'s oldest continuously inhabited shores — a cradle of Saraswat Brahmin culture, Maratha sea power, and ancient trade routes reaching Arabia, East Africa, and even Rome. Ashoka\'s edicts mention the Aparantas, the people of this western coastal strip, nearly 2,300 years ago.',
      'The Silhara dynasty, ruling from the ninth to the thirteenth centuries, carved rock-cut temples and irrigated terraced fields overlooking the sea. Their inscriptions — in Sanskrit and early Konkani — survive on laterite pillars in obscure village shrines, still garlanded by local families every new moon.',
      'Shivaji Maharaj transformed the politics of the sea. His legendary naval forts — Sindhudurg at Malvan, Vijaydurg on the Wagad coast, Suvarnadurg near Harnai — were built not by land but by sea, constructed on rocky islands and financed by taxing coastal trade. None was ever taken by force.',
      'Portuguese colonization, lasting four and a half centuries in parts of the coast, left behind baroque churches in red laterite, Indo-Portuguese villas with tiled courtyards, and a culinary vocabulary still embedded in Konkani kitchens. Vinegar entered the fish curry. The cashew arrived in the garden.',
      'The Peshwa era refashioned the hinterland — irrigation tanks, temple endowments, and the patronage of Brahmin scholarship — but the coast remained its own world: maritime, multilingual, and not easily governed from Pune. The villages remember this independence in the way they still settle disputes: quietly, among themselves, without courts.',
    ],
    quote: {
      text: 'This coastline has seen empires come and go, and remained itself. That is its greatest historical achievement.',
      attribution: 'Konkan Heritage Trust, 2019',
    },
    keyFacts: [
      { label: 'Settled history', value: '2,300+ years' },
      { label: 'Named sea forts', value: '300+' },
      { label: 'Portuguese presence', value: '450 years' },
      { label: 'Dynasties recorded', value: 'Silhara, Kadamba, Shirke, Maratha, Scindia' },
    ],
    highlights: [
      { title: 'Sindhudurg Fort', desc: 'Shivaji\'s masterpiece — 48 acres of sea-fort built on a rocky island, with walls so thick they survive 350 years of ocean battering.' },
      { title: 'Murud-Janjira', desc: 'The only fort the Marathas never captured — an island fortress that repelled Shivaji, the British, and the Marathas alike for 350 years.' },
      { title: 'Chaul Ruins', desc: 'A ghost city of Portuguese-era warehouses, Arab trade houses, and early British forts near the Kundalika estuary, half-swallowed by jungle.' },
      { title: 'Goa\'s Old Viceroy Quarter', desc: 'The Latin Quarter of Panaji (Fontainhas) preserves the Indo-Portuguese urban form — coloured plaster, wrought-iron balconies, azulejo tiles — intact.' },
    ],
    gallery: [
      'murud-janjira-fort.jpg',
      'sindhudurg-fort-walls.jpg',
      'vasai-fort.jpg',
      'alibaug-kulaba-fort.jpg',
      'maritime-history.jpg',
    ],
    thingsToDo: [
      'Explore Sindhudurg Fort by boat from Malvan jetty',
      'Visit Murud-Janjira at low tide when the sea passages are partly exposed',
      'Walk the laterite ruins of Chaul near Alibag',
      'Trace the Portuguese Quarter in Panaji (Fontainhas)',
      'Visit the Rajmachi and Lohagad forts in the hinterland beyond the coast',
    ],
  },

  /* ── Geography ───────────────────────────────────────────────────────── */
  geography: {
    subtitle: 'Where Mountains Meet the Sea in One Dramatic Gesture',
    body: [
      'Konkan is a narrow coastal plain — on average just 50 kilometres wide — pinched between the dramatic escarpment of the Western Ghats and the Arabian Sea. It stretches 720 kilometres from Dahanu in the north to Karwar in the south, spanning parts of Maharashtra, Goa, and Karnataka.',
      'The Ghats here do not slope gently. They fall off the Deccan plateau in a series of dramatic scarps and ravines, dropping 1,200 metres in less than 20 kilometres. Waterfalls cascade directly into tidal estuaries. Rivers born in the Ghats tumble over laterite shelves before spreading into wide, calm estuaries lined with mangroves.',
      'The soil is laterite — a deep red-orange substrate formed from ancient Deccan Trap lava that has been leached by millions of monsoons. Rich in iron and aluminium, poor in nutrients for grain but ideal for cashew, mango, coconut, and areca nut. The land tells you what to grow.',
      'Six major river systems drain westward through the Konkan: the Ulhas, Savitri, Vashishti, Jagbudi, Gad, and Terekhol. Each estuary is a world of its own — wide tidal flats, mangrove corridors, still backwaters, and fishing villages perched at the river-mouth. Each also carves the terrain into distinct micro-regions with their own dialects and customs.',
      'The coastline itself shifts personality every few kilometres. Black basalt headlands give way to white sand beaches, then tawny laterite cliffs, then muddy mangrove-fringed coves. There are no two consecutive kilometres of coast that look the same.',
    ],
    quote: {
      text: 'The geography of Konkan is not scenery. It is the reason for everything — the food, the language, the gods, the temperament of the people.',
    },
    keyFacts: [
      { label: 'Coastline length', value: '720 km' },
      { label: 'Average width', value: '50 km' },
      { label: 'Ghat escarpment drop', value: '1,200 m in 20 km' },
      { label: 'Major river systems', value: '6' },
    ],
    highlights: [
      { title: 'The Western Ghat Escarpment', desc: 'One of the world\'s great topographic drops — the Sahyadri falls from the Deccan plateau directly to the coastal strip with almost no transition zone.' },
      { title: 'Tarkarli Backwaters', desc: 'Where the Karli river meets the sea, the water is clear enough to read through. Dolphin pods visit the estuary at dawn.' },
      { title: 'Harihareshwar Cliffs', desc: 'Dramatic laterite cliffs rising 60 metres from the sea, carved by the Savitri river\'s ancient course. The temple perches at the very edge.' },
      { title: 'Malvan Marine Sanctuary', desc: 'A protected reef system with over 200 species of coral and 300+ fish species in crystalline inshore waters.' },
    ],
    gallery: [
      'coastal-landscape.jpg',
      'harihareshwar-cliffs.jpg',
      'tarkarli-backwaters.jpg',
      'karwar-kali-estuary.jpg',
      'ocean-cliffs.jpg',
    ],
    thingsToDo: [
      'Kayak the Karli backwaters at dawn for dolphin sightings',
      'Trek the Tamhini or Bhor Ghats before or during early monsoon',
      'Take the Harihareshwar coastal trail along the cliff edge',
      'Cross the Terekhol river into Goa by ferry (5-minute crossing)',
      'Visit the Phansad Wildlife Sanctuary in the Western Ghat foothills',
    ],
  },

  /* ── Culture ─────────────────────────────────────────────────────────── */
  culture: {
    subtitle: 'A Syncretism Born at the Intersection of Sea and Stone',
    body: [
      'Konkan culture is a living mosaic assembled over two millennia — Gaud Saraswat Brahmins, Koli fishermen, Christian communities shaped by the Portuguese encounter, Muslim traders descended from Arab merchants, and dozens of artisan communities each with their own language, rituals, and aesthetic tradition.',
      'The Konkani language is the clearest evidence of this blending. It carries Sanskrit morphology, Dravidian phonology, Portuguese loanwords in the kitchen and the calendar, and Arabic commercial vocabulary. To speak Malvani Konkani fluently is to hold a whole ocean of history in your mouth.',
      'The culture values restraint and depth over spectacle. It shows in the whitewashed houses with terracotta roofs, the spare geometry of temple gopurams, the economy of a Malvani proverb. Hospitality is assumed, not performed. The guest eats before the host. The host does not tell you so.',
      'Music and ritual are not entertainment here — they are the architecture of time. The Dashavatar theatre form has been performed continuously for 2,000 years, dramatizing the ten incarnations of Vishnu through masks, make-up, and overnight performance that the whole village attends. The coconut leaf mandap at a wedding is raised by caste-specific craftsmen following rules nobody wrote down.',
      'Caste communities that might live in tension elsewhere in India share festivals, fishing grounds, and market days here. The coexistence is not always frictionless, but it is old and practiced. The coast has seen enough of the world to know that diversity is simply the way things are.',
    ],
    quote: {
      text: 'Come here, eat rice and kokum curry, and consider this your own home.',
      attribution: 'Malvani saying — the full translation of the Marathi tagline',
    },
    keyFacts: [
      { label: 'Major communities', value: 'Malvani, GSB, Koli, CKP, Christian, Siddhi, Muslim' },
      { label: 'Dashavatar tradition', value: '2,000+ years' },
      { label: 'Konkani dialects', value: '12+' },
      { label: 'UNESCO recognition', value: 'Western Ghats (2012)' },
    ],
    highlights: [
      { title: 'Dashavatar Folk Theatre', desc: 'A full-night performance tradition — masked actors playing gods on a village ground, with an audience that has attended since childhood.' },
      { title: 'The GSB Kitchen', desc: 'Gaud Saraswat Brahmin cuisine is a distinct culinary world: no onion, no garlic, but extraordinary depth from kokum, teppal, and coconut milk.' },
      { title: 'Koli Fishing Culture', desc: 'The Koli community predates every other group on this coast. Their songs, their boats, and their method of landing fish follow rules older than writing.' },
      { title: 'Village Deva Shrines', desc: 'Every village has a deva — a local spirit deity with their own priest, calendar, and architectural tradition. No two devchars look quite alike.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'temple-carvings.jpg',
      'religious-mosaic.jpg',
      'weddings-rituals.jpg',
    ],
    thingsToDo: [
      'Attend a Dashavatar performance (December–March in coastal villages)',
      'Visit the Malvan Saturday market where all communities trade',
      'Stay in a GSB household for a traditional Konkani thali meal',
      'Witness the Shigmo festival procession in a Goan village (March)',
      'Visit the Kunkeshwar temple complex at dawn before the crowds arrive',
    ],
  },

  /* ── Art & Craft ─────────────────────────────────────────────────────── */
  art: {
    subtitle: 'Craft Traditions Born from the Earth and the Sea',
    body: [
      'The craft traditions of Konkan are as geographically specific as the terrain. Sawantwadi\'s lacquerware toys — painted wooden fruits, animals, and chess sets — are made by the Chitrakathi community, using techniques that have been documented since the 17th century. They received Geographical Indication status in 2011.',
      'The woodcarving tradition along the temple walls of the coast is a distinct school — not the ornate excess of some South Indian traditions, but a confident, muscular carving style that gives gods weight and presence. Vishnu with his conch. Lakshmi attended by elephants. The horses of the naval commander. Every panel tells a story the carver\'s grandfather knew.',
      'Shell craft at Alibag and along the Ratnagiri coast uses cowrie shells, spiral shells, and sea glass in combinations that have evolved locally over two centuries. Fishermen\'s wives made jewellery from the sea — practical and beautiful in equal measure.',
      'Warli painting, though associated with the tribal communities of the Palghar hinterland, has deep roots in the northern Konkan. The geometric figures — human, animal, and cosmic — rendered in white rice paste on mud walls narrate the agriculture cycle with the economy of a mathematician.',
      'Terracotta work at Bankot and Rajapur produces temple horses, votive elephants, and water storage vessels in forms unchanged since the medieval period. The clay is the same red laterite the landscape is built from — the craft is a conversation with the ground.',
    ],
    quote: {
      text: 'The craftsman does not put his name on his work. The work carries the name of the village.',
    },
    keyFacts: [
      { label: 'GI-tagged crafts', value: 'Sawantwadi lacquerware, Kolhapuri chappal' },
      { label: 'Chitrakathi lineage', value: '400+ years' },
      { label: 'Annual craft output', value: '50,000+ pieces (Sawantwadi alone)' },
      { label: 'Temple carving schools', value: 'Malvan, Vengurla, Ratnagiri' },
    ],
    highlights: [
      { title: 'Sawantwadi Royal Crafts', desc: 'The Sawantwadi palace still hosts the lacquerware workshop. Watch craftsmen turn lathe-spun wood into painted toys using the same palette and technique as four centuries ago.' },
      { title: 'Temple Woodcarving', desc: 'The Deurh and Nandkeshwar temples near Malvan have some of the finest coastal carving — figures emerging from the wood with the assurance of absolute mastery.' },
      { title: 'Warli Art Villages', desc: 'Jawhar and Mokhada in the northern Konkan hinterland are Warli painting country — the geometric tradition that influenced the global craft movement.' },
      { title: 'Ratnagiri Terracotta', desc: 'The potters of Ratnagiri district still fire votive horses for temple offerings — a practice mentioned in 12th-century inscriptions.' },
    ],
    gallery: [
      'handicrafts.jpg',
      'sawantwadi-palace-crafts.jpg',
      'temple-carvings.jpg',
    ],
    thingsToDo: [
      'Visit the Sawantwadi Palace craft workshop on weekday mornings',
      'Take a Warli painting workshop in Jawhar (Palghar district)',
      'Browse the handicrafts mela at Kala Academy, Panaji (winter)',
      'Commission a carved wooden ganesha directly from a temple carver in Malvan',
    ],
  },

  /* ── Folk Music ──────────────────────────────────────────────────────── */
  music: {
    subtitle: 'Songs That Carry the Weight of the Sea and the Seasons',
    body: [
      'The folk music of Konkan is not a museum tradition — it is the living soundtrack of agricultural labour, fishing boats, weddings, and the long monsoon nights when the coast turns inward. The tarpa, a wind instrument made from a gourd, is the defining sound of the north Konkan\'s tribal communities — a drone that seems to come from the ground itself.',
      'Fishermen\'s songs — ovye, sung by women waiting for the boats to return — are some of the oldest unrecorded music on the coast. Short, repetitive, and shot through with anxiety and longing, they encode tidal knowledge, seasonal fishing patterns, and the specific geography of a hundred fishing grounds.',
      'The Dashavatar performance is not only theatre — it is music in the most demanding sense. The mridangam (double-headed drum) and the bhimpalasi raga underpin the all-night recitation of divine stories in sung verse, with the lead performer improvising elaborations around the narrative spine for an audience that knows the text as well as the performer does.',
      'Lavani, the vigorous dance-song tradition of Maharashtra, has a coastal variant — earthier, more tied to the fishing village economy, less courtly than the inland form. Women performers in coastal lavani sing of the sea, the mango season, and the particular loneliness of a fisherman\'s wife.',
      'In Goa, the mando — a slow, melismatic song form in Konkani and Portuguese — is the music of mixed heritage: Catholic community celebrations, Indo-Portuguese drawing rooms, and the long evenings of a culture that absorbed two civilizations and made something third from them.',
    ],
    quote: {
      text: 'In Konkan, you don\'t just hear the music. The music tells you what time of year it is, what the weather will be, and whether the boats are in.',
    },
    keyFacts: [
      { label: 'Folk instruments', value: 'Tarpa, Mridangam, Ghumat, Shehnai, Dholki' },
      { label: 'Dashavatar tradition', value: '2,000+ years continuous' },
      { label: 'Mando performances', value: 'Goa — active year-round' },
      { label: 'Recorded folk forms', value: 'Ovye, Lavani, Gondhal, Kirtan, Bhajanik' },
    ],
    highlights: [
      { title: 'Tarpa Music', desc: 'The gourd flute of the Warli and Katkari communities — played at harvest, at weddings, and at funerals. The sound carries a mile across flat coastal ground.' },
      { title: 'Dashavatar Night Performances', desc: 'December to March, whole villages gather for overnight recitations of the ten incarnations, sung and danced by performers who have trained for decades.' },
      { title: 'The Mando of Goa', desc: 'Slow, emotional, sung in Konkani-Portuguese hybrid verse — the mando is the sound of a coastline that was colonial for four centuries and found its own voice anyway.' },
      { title: 'Lavani Performances', desc: 'The Malvani variant of this energetic song-dance form is performed at village fairs and weddings throughout the winter season.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'fishing-village.jpg',
    ],
    thingsToDo: [
      'Attend a Dashavatar night performance in a coastal village (December–March)',
      'Visit the International Folk Music Festival in Panaji (January)',
      'Watch a tarpa procession during harvest festivals in northern Konkan',
      'Attend a mando performance at the Goa Kala Academy',
    ],
  },

  /* ── Cuisine ─────────────────────────────────────────────────────────── */
  cuisine: {
    subtitle: 'Fire, Kokum, Coconut — and the Freshest Catch on Earth',
    body: [
      'Konkani cuisine is built on three pillars: the coconut, the kokum, and the day\'s catch. Everything else — the spice blends, the souring agents, the cooking techniques — revolves around these three ingredients and their daily availability.',
      'Tirphal, a berry related to Sichuan pepper, delivers a numbing, citrusy warmth that no other spice produces. Raw mango provides depth in summer. Kokum — the dried rind of the purple Garcinia indica fruit — gives the fish curries their signature sour-sweet note and a colour that turns broth into something that looks like sunset.',
      'Malvani cuisine is the coast\'s most distinctive strand — built on dried red Malvani chilli, fresh coconut milk, and fish that was alive two hours ago. Malvani fish curry served on banana leaf with white rice, a glass of sol kadhi (kokum-coconut milk) alongside — this is the canonical Konkani meal. There is no improving it.',
      'The GSB (Gaud Saraswat Brahmin) kitchen is a world apart — no onion, no garlic, but extraordinary complexity from coconut, teppal, raw mango, and yogurt. The GSB saraswat thali can have fifteen elements, each speaking to the others. It is vegetarian food that has forgotten nothing about how food should taste.',
      'Goan cuisine diverges in key ways — vinegar enters the pork dishes (vindaloo, sorpotel). Bebinca, a layered coconut-and-egg pudding baked over hours, is the architecture of patience. Feni — distilled from cashew apple or toddy palm — is the spirit of a coast that learned distillation from the Portuguese and immediately improved on the lesson.',
    ],
    quote: {
      text: 'The Konkani cook does not measure. She knows. The coconut tells her when it is ready. The fish tells her when it is done.',
    },
    keyFacts: [
      { label: 'Signature souring agent', value: 'Kokum (Garcinia indica)' },
      { label: 'Key spice', value: 'Tirphal (Zanthoxylum rhetsa)' },
      { label: 'Staple fish', value: 'Bangda (mackerel), Bombil (Bombay duck), Surmai, Pomfret' },
      { label: 'Feni varieties', value: 'Cashew feni, Coconut toddy feni' },
    ],
    highlights: [
      { title: 'Malvani Fish Curry', desc: 'The definitive Konkan dish — dried chilli, coconut milk, tirphal, the morning\'s catch. Served on a banana leaf with rice. Nothing else is needed.' },
      { title: 'Sol Kadhi', desc: 'Kokum and coconut milk beaten together with garlic and cumin. Pink, cooling, slightly sour. The Konkani equivalent of a digestif and a welcome drink simultaneously.' },
      { title: 'Modak & Puranpoli', desc: 'The festive sweets of the coast — steamed rice-flour dumplings stuffed with jaggery and coconut, and flatbreads filled with sweet lentil paste. Made for Ganesh Chaturthi and Diwali.' },
      { title: 'Bebinca (Goa)', desc: 'Sixteen layers of coconut-egg batter, each baked separately before the next is poured. A single bebinca takes four hours. No shortcuts exist.' },
    ],
    gallery: [
      'konkani-thali.jpg',
      'spice-plantation.jpg',
      'fishing-village.jpg',
    ],
    thingsToDo: [
      'Eat at a local Malvani dhaba in Malvan town (avoid hotel restaurants)',
      'Take a Konkani cooking class at a Ratnagiri homestay',
      'Visit the Tarkarli beach shacks for fresh tiger prawns at sunset',
      'Try feni at a Goan toddy shop (ururak feni, cashew-season only: April–June)',
      'Attend the Kadle-Pohe breakfast culture in any village market',
    ],
  },

  /* ── Village Life ────────────────────────────────────────────────────── */
  village: {
    subtitle: 'Time at the Pace of Tides, Coconuts, and the Evening Call to Prayer',
    body: [
      'The Konkani village is an organism — it breathes with the tide, grows with the monsoon, and rests in the post-harvest heat of April. A wada (the traditional multi-family compound) faces west toward the sea or east toward the orchard. Guava trees overhang the well. The communal well itself is still the morning gathering point.',
      'The village year is punctuated not by a solar or fiscal calendar but by a liturgical and agricultural one. Fishing season opens and closes by ritual. The mango harvest begins when the village head says it begins. Weddings happen in specific lunar months. The school term reorganizes around the cashew season and the monsoon when the roads flood.',
      'The architecture is laterite — blocks of red stone quarried from the local plateau, lime-plastered and roofed with Mangalore terracotta tiles or, in older houses, with coconut-thatch. The cool interior smells of earth and coconut oil. The veranda faces the courtyard. The kitchen is at the back, near the well.',
      'Each village has its deul (local shrine), its wells, its market day (usually Thursday or Sunday), its fish landing ground, and its network of ancestral paths connecting it to the next village and the nearest town. These paths — some of them older than the roads — are still the preferred route for the morning walk.',
      'Village governance in Konkan has always been more horizontal than the caste structures of the interior suggest. The gram sabha resolves disputes by precedent and consensus. Ancestral custom is cited like case law. The village elder\'s memory is the archive.',
    ],
    quote: {
      text: 'In Konkan, the village knows what the city has forgotten — that the land is not yours. You are the land\'s.',
    },
    keyFacts: [
      { label: 'Typical village size', value: '200–800 households' },
      { label: 'Village institution', value: 'Gram panchayat + traditional gram sabha' },
      { label: 'Building material', value: 'Laterite block, lime plaster, Mangalore tile' },
      { label: 'Key annual events', value: 'Holi, Ganesh Chaturthi, Shimga, Harvest festival' },
    ],
    highlights: [
      { title: 'The Traditional Wada', desc: 'A multi-generation family compound with a central courtyard, a well, a tulsi plant at the entrance, and a kitchen designed around wood fire and cast iron.' },
      { title: 'Village Markets', desc: 'Thursday and Sunday bazaars where fish, vegetables, and gossip circulate with equal speed. The coconut-jaggery section is always the most crowded corner.' },
      { title: 'The Evening Temple Round', desc: 'Every Konkani village has its evening round — men and women walking from home to temple to neighbor\'s veranda. The same route, the same conversations, forever.' },
      { title: 'Kohl Fishing Villages', desc: 'Koli fishing settlements at river mouths — boats, nets, and drying fish creating a sensory landscape that has looked this way for a thousand years.' },
    ],
    gallery: [
      'fishing-village.jpg',
      'homestays.jpg',
      'spice-plantation.jpg',
    ],
    thingsToDo: [
      'Stay in a traditional wada homestay (Dapoli or Ratnagiri district)',
      'Wake up before 5 AM to witness a coastal fish auction',
      'Attend a village gram sabha meeting (many are open to visitors)',
      'Walk an ancestral path between two coastal villages',
      'Join a coconut harvest activity at an agrotourism farm',
    ],
  },

  /* ── Festivals ───────────────────────────────────────────────────────── */
  festivals: {
    subtitle: 'The Burning Year — When the Coast Becomes a Stage',
    body: [
      'The Konkani festival calendar is relentless — there is not a single month without a celebration significant enough to warrant its own costume, its own food, and its own music. From the massive Ganesh Chaturthi of August to the quiet village mango-blossoming ceremony of February, the year is a continuous liturgy.',
      'Ganesh Chaturthi on the coast is different from the urban spectacle of Mumbai. In Konkan villages, the celebration is private, intimate, and 10 days long. The Ganapati idol — hand-made from clay by a hereditary craftsman — sits in the main hall. The whole extended family arrives. The idol is made from red earth; it returns to red earth when it is immersed.',
      'Shimga (the Konkani Holi) is the coast\'s most exuberant festival — bonfires of old furniture and dry coconut palm fronds are lit five days before the colour festival, marking the end of winter and the beginning of the mango season. The bonfires burn from village to village along the coast like a relay of fire.',
      'The annual village yatra (fair) is the most locally specific celebration — each village\'s deity has its own date, its own procession, its own sequence of rituals that can last three to five days. The yatra brings the diaspora back: those who moved to Mumbai, Dubai, or Pune return for this one weekend, year after year.',
      'Christmas in Goa and the Christian communities of the southern Konkan is coastal Christmas — the church lit with lanterns made from dried fish-bladder (historically), the crib elaborate and competitive between families, the carol singers going house to house through the night, the bebinca waiting on every table.',
    ],
    quote: {
      text: 'The Ganesh Chaturthi celebration in a Konkan village is not a festival. It is a family reunion that happens to include a god.',
    },
    keyFacts: [
      { label: 'Major festivals', value: '12+ per year' },
      { label: 'Ganesh Chaturthi duration', value: '10 days (some villages: 5 days)' },
      { label: 'Shimga (Holi)', value: 'February–March (5-day celebration)' },
      { label: 'Village yatra season', value: 'November–March' },
    ],
    highlights: [
      { title: 'Ganesh Chaturthi', desc: 'The largest festival on the coast — ten days of family, food, music, and immersion. The village becomes a different place.' },
      { title: 'Shimga Bonfires', desc: 'Visible from the sea on clear nights — the chain of bonfires from Ratnagiri to Malvan marking the end of the cold season.' },
      { title: 'Village Yatras', desc: 'Every village deity has an annual fair — three to five days of procession, music, theatre, and food. The dates are held sacred across generations of diaspora.' },
      { title: 'Narial Purnima', desc: 'The coconut-offering to the sea on the full moon of Shravan — the official opening of the fishing season, still observed by all fishing communities.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'religious-mosaic.jpg',
      'weddings-rituals.jpg',
    ],
    thingsToDo: [
      'Book a homestay in a Konkan village for Ganesh Chaturthi (August/September)',
      'Attend Shimga bonfires in Malvan district (February)',
      'Witness Narial Purnima at any coastal fishing village (July/August)',
      'Join a village yatra procession in the winter fair season',
    ],
  },

  /* ── Local Festivals ─────────────────────────────────────────────────── */
  'local-festivals': {
    subtitle: 'Sacred Cycles and the Intimate Occasions Only Locals Know',
    body: [
      'Beyond the major festivals, Konkan\'s villages observe a dense calendar of hyper-local ceremonies — occasions specific to a single village, a single deity, or a single community — that rarely appear in any tourist guide but constitute the actual texture of coastal life.',
      'The fishing ban during Shravan (July–August) is observed strictly by Koli communities — no fish is caught for the monsoon month to let the sea recover and the fish spawn. The period is marked by vegetarian cooking, coconut offerings at the shore, and the singing of fishing songs that name every species that will return.',
      'The mango blossoming ceremony in February — when the first amba (mango) flowers appear on the Ratnagiri trees — is a family ritual, not a public celebration. The gardener goes to the orchard at dawn, performs a small puja at the oldest tree, and the family eats together. The Alphonso season is announced by this quiet act.',
      'Shigmo in Goa is not Holi — it is a fifteen-day spring festival specific to the Hindu communities of the state. Each village\'s Shigmo has its own local deity\'s procession, its own traditional folk performances (ghode modni, romta mell), and its own sequence of village rituals that have not changed in living memory.',
      'The village samaj (community meals) that follow the yatra are the most egalitarian moments in Konkani life — every family brings a dish, every person eats the same meal, every dispute is suspended for the day. The samaj still happens in most villages, still run by the same three or four families who have done it for a century.',
    ],
    quote: {
      text: 'Ask any Konkan person where they are from and they will tell you the name of a festival before they tell you the name of a city.',
    },
    keyFacts: [
      { label: 'Monsoon fishing ban', value: '1 month (Shravan)' },
      { label: 'Shigmo duration', value: '15 days' },
      { label: 'Village yatras', value: 'Every village has its own, November–March' },
      { label: 'Konkani almanac', value: 'Panchang — still widely used' },
    ],
    highlights: [
      { title: 'Shravan Fishing Ban', desc: 'The sea rests for a month. The coast turns inward. Vegetarian food, devotional music, and the quiet preparation of boats for the season ahead.' },
      { title: 'Shigmo (Goa)', desc: 'The spring festival that fills Goa\'s villages with processions, drum music, and elaborate folk performances across fifteen days.' },
      { title: 'Village Samaj Meals', desc: 'Community feasts following the annual yatra — egalitarian, elaborate, and delicious. The best Konkani food you will ever eat.' },
      { title: 'Mango Blossoming Puja', desc: 'A quiet, family ceremony at the orchard\'s oldest tree in February. The beginning of the Alphonso countdown.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'konkani-thali.jpg',
    ],
    thingsToDo: [
      'Attend Shigmo at a Goa village (March)',
      'Stay through the monsoon to experience Shravan observances',
      'Ask your homestay host about the local village yatra date',
      'Witness a coastal samaj meal during the yatra season',
    ],
  },

  /* ── Tourism ─────────────────────────────────────────────────────────── */
  tourism: {
    subtitle: 'Journeys Beyond the Beaten Path on India\'s Most Beautiful Coast',
    body: [
      'Konkan tourism is still in the process of discovering itself. Unlike Goa, which has been commodified for international tourism since the 1970s, most of the Konkan coast — particularly in Maharashtra — remains genuinely off the circuit. You can find beaches that require a forty-five-minute walk to reach, fishing villages that have never hosted a tour group, and forests where the trail is just a memory of cattle movement.',
      'The travel infrastructure is improving rapidly. The Konkan Railway connects the coast from Mumbai to Mangalore in 13 hours, passing through some of the most dramatic railway scenery in the world — 91 tunnels, 2,000 bridges, and the Ghats presenting themselves as a series of green revelations. Villages 10 minutes from a station are still discovering that they can host travellers.',
      'Accommodation now ranges from beach shacks to high-quality eco-resorts to traditional wada homestays where you sleep in a room that was a grandmother\'s bedroom, eat what the family eats, and leave with a recipe you didn\'t expect. The homestay circuit in Ratnagiri and Sindhudurg districts is one of India\'s best-kept travel secrets.',
      'The best time to visit depends entirely on what you want. December to February is peak season — cool, dry, perfect for beaches and forts. The pre-monsoon heat of April and May is mango season — the Alphonso orchards of Ratnagiri and Devgad are the destination. And June to September, the monsoon itself, turns the coast into something surreal — swollen rivers, roaring waterfalls, empty beaches, and a green so intense it seems artificial.',
      'The unwritten rule of Konkan travel: go slow. The coast rewards the person who stays in one place for a week over the person who covers five beaches in two days. Boredom here gives way, very quickly, to attention — and attention, even more quickly, to love.',
    ],
    quote: {
      text: 'Every Konkan beach has a name. Every name has a story. Go slow enough and you\'ll hear both.',
    },
    keyFacts: [
      { label: 'Peak season', value: 'November – February' },
      { label: 'Mango season', value: 'April – June' },
      { label: 'Monsoon season', value: 'June – September' },
      { label: 'Nearest airport', value: 'Mumbai, Goa (Dabolim), Sindhudurg (Chipi)' },
    ],
    highlights: [
      { title: 'Konkan Railway Journey', desc: 'Board a Mumbai–Mangalore train and let the Ghats unfold through the window. The 13-hour journey is a destination in itself.' },
      { title: 'Wada Homestays', desc: 'Traditional Konkani homes converted into guest accommodation — coconut lassi on the veranda, home-cooked meals, firefly nights.' },
      { title: 'Hidden Beach Walks', desc: 'A 45-minute forest path from Vengurla brings you to Redi beach — black sand, iron ore cliffs, absolute solitude.' },
      { title: 'Mango Orchard Stays', desc: 'April–June in Ratnagiri district: wake up in an orchard, eat Alphonso directly off the tree, sleep with the windows open to the sea breeze.' },
    ],
    gallery: [
      'diveagar-beach.jpg',
      'guhagar-beach.jpg',
      'homestays.jpg',
      'konkan-railway.jpg',
      'ratnagiri-mango-fort.jpg',
    ],
    thingsToDo: [
      'Take the Konkan Railway from Mumbai to Ratnagiri (one-way journey)',
      'Stay at an Agrotourism/homestay in Ratnagiri for at least 3 nights',
      'Walk the beach from Tarkarli to Devbagh (accessible only at low tide)',
      'Book mango orchard stays in Devgad for April',
      'Take a day trip to Devbagh by local boat from Malvan',
    ],
  },

  /* ── Agriculture ─────────────────────────────────────────────────────── */
  agriculture: {
    subtitle: 'The Red Earth and Its Gifts — Mangoes, Cashews, and the Slow Harvest',
    body: [
      'Konkan agriculture is not farming — it is custodianship. The red laterite soil is too iron-rich and acidic for rice in most upland areas, but it is profoundly suited to cashew, mango, coconut, and areca nut. These are not cash crops in the industrial sense — they are long-term relationships between families and trees that began two, three, sometimes five generations ago.',
      'The Alphonso mango of Ratnagiri and Devgad is the most prized mango in the world — a GI-tagged variety that grows only in a specific band of laterite coastal soil, with a specific sea-breeze microclimate, ripening to a saffron yellow with a perfume that hits you three feet from the fruit. There is no adequate substitute.',
      'Cashew is Konkan\'s most democratic crop. Every household has a cashew tree or ten. The harvest season in April is a community event — families go to the orchard together, collect the fallen cashew apples, extract the nuts, and press the apple into the juice that becomes feni. Nothing is wasted.',
      'Rice cultivation in the coastal valley floors follows a two-season calendar — the kharif rice that uses the monsoon rain, and the rabi winter crop in irrigated paddies. Konkani rice varieties like Wada Kolam and Indrayani are treasured for their fragrance and texture. They are increasingly rare as farmers shift to higher-yield hybrids.',
      'The coconut grove is the most complete agricultural ecosystem on the coast. The tree provides food, oil, coir, building material, and the toddy that becomes feni. The frond becomes thatch, the husk becomes fibre, the shell becomes fuel. Konkan agriculture is a circular economy that preceded the concept by centuries.',
    ],
    quote: {
      text: 'The Alphonso mango does not grow in Konkan. It grows in a specific family\'s orchard, on a specific tree, in the third week of April. Everything else is approximation.',
    },
    keyFacts: [
      { label: 'GI-tagged variety', value: 'Devgad Alphonso Mango, Ratnagiri Alphonso' },
      { label: 'Annual mango output', value: '~1 lakh MT (Maharashtra coast)' },
      { label: 'Cashew season', value: 'March–May' },
      { label: 'Key crops', value: 'Mango, Cashew, Coconut, Areca nut, Jackfruit, Kokum' },
    ],
    highlights: [
      { title: 'Alphonso Orchards', desc: 'Ratnagiri and Devgad district in April: 500-year-old mango trees bearing fruit, the perfume hitting you before the colour.' },
      { title: 'Kokum Cultivation', desc: 'Garcinia indica grows wild and cultivated along the coast. The harvested rind is dried in the sun and becomes the kokum that defines Konkani cooking.' },
      { title: 'Cashew Apple Season', desc: 'The cashew apple is sweeter than the nut. In April, local markets fill with the bright red-yellow fruit pressed into urrak (the first distillate) and feni.' },
      { title: 'Spice Plantations', desc: 'Cardamom, pepper, turmeric, and chilli grow in the Ghat foothills — the raw ingredient source for Konkani cuisine\'s legendary complexity.' },
    ],
    gallery: [
      'spice-plantation.jpg',
      'devgad-orchards.jpg',
      'dahanu-chikoo-orchards.jpg',
    ],
    thingsToDo: [
      'Visit a Devgad or Ratnagiri mango orchard in April–May',
      'Attend the mango grading and packing at a GI-certified orchard',
      'Watch cashew feni distillation in Goa (April–June)',
      'Buy kokum direct from a farmer at the Malvan market',
      'Take an agrotourism plantation walk near Sindhudurg',
    ],
  },

  /* ── Ecology ─────────────────────────────────────────────────────────── */
  ecology: {
    subtitle: 'A Biodiversity Hotspot at the Edge of Two Incomparable Worlds',
    body: [
      'The Konkan coast sits at the western edge of the Western Ghats — one of the world\'s eight biodiversity hotspots, recognised by UNESCO as a World Heritage Site. The Ghats behind the coast harbour an extraordinary concentration of endemic species: plants, insects, amphibians, and birds found nowhere else on Earth.',
      'The transition zone between the marine and terrestrial ecosystems creates exceptional density of life. Mangrove forests along the estuaries are nurseries for fish, crabs, prawns, and birds — the ecological productivity of a Konkan estuary is among the highest of any coastal ecosystem in Asia.',
      'Leopards still move through the forests behind the coastal towns. Sloth bears are occasionally sighted in the cashew orchards. The Indian python and the king cobra are present in significant numbers in the Sindhudurg forests. Birding here — particularly in the pre-monsoon season — is extraordinary: the Malabar hornbill, the Malabar pied hornbill, and the Indian paradise flycatcher are all resident.',
      'The marine ecology is equally remarkable. Malvan Marine Sanctuary protects a reef system with over 200 coral species and 300+ fish species. Olive ridley sea turtles nest on Velas beach in February–March every year, a tradition documented for over 200 years. Humpback dolphins and common dolphins are regular visitors to the Sindhudurg coast.',
      'The ecology is under pressure — from sand mining, coastal construction, invasive species (particularly Lantana), and the long-term effects of the monsoon becoming more erratic. But the tradition of sacred groves, the fishing community\'s self-imposed seasonal bans, and the growth of ecotourism are all acting as conservation forces in ways that formal policy often fails to achieve.',
    ],
    quote: {
      text: 'The Western Ghats are older than the Himalayas. The biodiversity they hold is a library we have barely begun to read.',
    },
    keyFacts: [
      { label: 'UNESCO recognition', value: 'Western Ghats World Heritage Site (2012)' },
      { label: 'Known fish species (Malvan)', value: '300+' },
      { label: 'Coral species (Malvan)', value: '200+' },
      { label: 'Turtle nesting sites', value: 'Velas, Anjarle, Kelshi, Murud' },
    ],
    highlights: [
      { title: 'Malvan Marine Sanctuary', desc: 'Protected reef ecosystem with extraordinary coral diversity. Snorkelling and scuba from Tarkarli.' },
      { title: 'Velas Turtle Festival', desc: 'February–March: Olive ridley sea turtles nest on Velas beach as they have for 200+ years. Conservation volunteers escort hatchlings to the sea.' },
      { title: 'Mangrove Estuaries', desc: 'The Karli, Gad, and Vagad estuaries are mangrove nurseries for the whole marine food chain of the southern Konkan coast.' },
      { title: 'Chandoli–Koyana Buffer', desc: 'The Ghat forest belt behind the coast connects to Chandoli National Park — a tiger and leopard corridor that keeps the coast wild.' },
    ],
    gallery: [
      'waterfall-forest.jpg',
      'malvan-marine-sanctuary.jpg',
      'sacred-groves.jpg',
      'wildlife-sanctuaries.jpg',
    ],
    thingsToDo: [
      'Snorkel or scuba at the Malvan Marine Sanctuary (October–May)',
      'Attend the Velas Turtle Festival (February–March)',
      'Birdwatching at the Phansad Wildlife Sanctuary (December–March)',
      'Walk a mangrove trail at the Karli estuary near Tarkarli',
      'Night safari at Radhanagari Wildlife Sanctuary (behind Kolhapur)',
    ],
  },

  /* ── Ecotourism ──────────────────────────────────────────────────────── */
  ecotourism: {
    subtitle: 'Slow Travel in the Living Forest, Farm, and Estuary',
    body: [
      'Ecotourism in Konkan is not a category — it is the default mode of being here. The terrain does not accommodate mass tourism comfortably. The roads are narrow, the beaches are accessed on foot, and the forest paths require a guide. This inconvenience is, from a conservation perspective, a gift.',
      'The agrotourism model pioneered by farms in Ratnagiri and Sindhudurg districts has proven that travellers will pay to slow down — to wake at dawn, to go to the orchard, to watch how a coconut is harvested, to eat what the farm produced that morning. Many of these agrotourism stays are also the most comfortable and interesting accommodation on the coast.',
      'Community-run ecotourism initiatives protect the resources they depend on. The Velas Turtle Conservation project — a community effort started by local fishermen — has protected Olive ridley turtles while generating income for families that previously depended on egg collection. It is one of India\'s best wildlife tourism success stories.',
      'The Konkan Railway\'s slow trains stop at village stations that are perfect bases for ecotourism — Khed, Chiplun, Ratnagiri, Sawantwadi — each within easy access of forests, rivers, and beaches that most travellers pass through without stopping. The village station is the right entry point for ecotourism; the highway approach misses everything.',
      'Responsible ecotourism here means: buy from local producers, stay in locally-run accommodation, don\'t touch coral when snorkelling, don\'t litter on beaches, ask before photographing people, observe the monsoon fishing ban\'s spirit even as a visitor, and leave slower than you arrived.',
    ],
    quote: {
      text: 'The best ecotourism leaves the forest unchanged and the traveller changed.',
    },
    keyFacts: [
      { label: 'Agrotourism farms', value: '200+ registered (Ratnagiri & Sindhudurg)' },
      { label: 'Turtle conservation sites', value: '5+ active (Velas, Anjarle, Kelshi, Hedvi, Murud)' },
      { label: 'Marine sanctuary area', value: '29 sq km (Malvan)' },
      { label: 'Best ecotourism months', value: 'October–February (dry season)' },
    ],
    highlights: [
      { title: 'Agrotourism Stays', desc: 'Spend a week in a working farm in Ratnagiri — go to the orchard, process the cashew, learn to climb a coconut tree, eat from the garden.' },
      { title: 'Velas Turtle Nesting', desc: 'Watch Olive ridley hatchlings emerge and walk to the sea at dawn. One of India\'s most moving wildlife encounters.' },
      { title: 'Kayaking Mangroves', desc: 'Paddle a kayak through the Karli or Gad estuary mangrove channels at dawn — a cathedral of roots and bird calls.' },
      { title: 'Village Forest Walks', desc: 'Guided walks in the Sawantwadi or Sindhudurg forest fringes, with a local naturalist who knows every bird call and medicinal plant.' },
    ],
    gallery: [
      'spice-plantation.jpg',
      'waterfall-forest.jpg',
      'tarkarli-backwaters.jpg',
    ],
    thingsToDo: [
      'Book a 3-night agrotourism stay in Devgad, Ratnagiri district',
      'Join the Velas Turtle Festival (February–March, prior registration)',
      'Kayak the Karli estuary at dawn from Tarkarli',
      'Take a guided birdwatching walk in Phansad Wildlife Sanctuary',
      'Cycle between villages in Dapoli district on back roads',
    ],
  },

  /* ── Hidden Gems ─────────────────────────────────────────────────────── */
  'hidden-gems': {
    subtitle: 'The Konkan That Nobody Talks About — Yet',
    body: [
      'For every Tarkarli there are five beaches with no name on any tourist map. For every homestay with a website there are twenty households that will feed you and house you if you knock on the right door. Konkan\'s hidden gems are not secret because they are remote — they are secret because the people who know them are not the kind who write travel blogs.',
      'Redi beach, reached by a forty-five-minute forest walk from Vengurla, has black volcanic sand, iron ore cliffs, and a small fort on the headland that nobody visits. The beach is empty on weekdays because there is no road to it. That is the whole secret.',
      'Velas is an ordinary coastal village that becomes, for three weeks in February and March, the most extraordinary wildlife encounter in Maharashtra. The Olive ridley turtle nesting here was almost destroyed by egg collection; the village community decided, in 2002, to protect it instead. Now they guide visitors to witness the hatchlings\' walk to the sea at dawn.',
      'The Kunkeshwar temple, accessible by a dirt road off the Sindhudurg coastal highway, sits directly on the ocean cliffs with waves breaking below the courtyard. At high tide, the spray reaches the outer corridor of the temple. There are no crowds, no facilities, and no signs pointing to it.',
      'Devbagh, at the confluence of the Karli river and the sea, is a sand spit accessible only by boat from Malvan or Tarkarli. It is 20 minutes by water from the nearest road. The accommodation there is a handful of government bungalows and a basic resort. The sunrise there — over still water on both sides — is one of the finest in the country.',
    ],
    quote: {
      text: 'The best beaches in Konkan have no road. They are protected by inconvenience, which is the most effective conservation policy there is.',
    },
    keyFacts: [
      { label: 'Unnamed beaches', value: 'Dozens along the Sindhudurg & Ratnagiri coastline' },
      { label: 'Devbagh access', value: 'Boat only (20 min from Malvan)' },
      { label: 'Redi beach access', value: 'Forest walk (45 min from Vengurla)' },
      { label: 'Velas turtle season', value: 'February–March' },
    ],
    highlights: [
      { title: 'Redi Beach', desc: 'Black volcanic sand, iron ore cliffs, a Portuguese-era fort on the headland, and perfect solitude. A 45-minute forest walk from the highway.' },
      { title: 'Devbagh Sandspit', desc: 'A thin sand spit between the Karli river and the sea. Access by boat only. Dawn there is extraordinary — calm water on both sides.' },
      { title: 'Kunkeshwar Clifftop Temple', desc: 'A Shiva temple on the ocean cliffs with waves breaking below. At high tide, the spray enters the outer corridor. No crowds, no signs.' },
      { title: 'Dapoli Highlands', desc: 'A hill station at 400 metres altitude in Ratnagiri district — cooler than the coast, with superb views of the Ghats and the sea simultaneously.' },
    ],
    gallery: [
      'redi-beach.jpg',
      'kunkeshwar-temple.jpg',
      'dapoli-highlands.jpg',
      'velas-turtle-beach.jpg',
    ],
    thingsToDo: [
      'Walk to Redi beach from Vengurla (early morning, bring water)',
      'Take the boat to Devbagh and spend the day',
      'Drive to Kunkeshwar at high tide for the wave spray experience',
      'Stay in Dapoli for a hill-coast combination',
      'Register for the Velas Turtle Festival in February',
    ],
  },

  /* ── Adventure ───────────────────────────────────────────────────────── */
  adventure: {
    subtitle: 'Edge and Exhilaration on a Wild, Uncompromising Coast',
    body: [
      'Konkan adventure is not the manufactured kind — there are no zip lines above manicured forests or theme parks claiming to simulate nature. The terrain provides its own challenges: cliff paths without railings, rivers that require wading in the monsoon, ocean surf that demands respect, and forest trails where the only guidance is the position of the sun.',
      'Rock climbing is emerging on the laterite sea cliffs near Harihareshwar and the Ghats escarpment behind Chiplun. The volcanic basalt columns near Murud provide extraordinary face routes. This is not a developed climbing destination — you need to know what you are doing and bring your own gear.',
      'Kayaking in the Konkan is river kayaking in the monsoon (fast, technical, exhilarating) or estuary kayaking in the dry season (peaceful, bird-rich, suitable for beginners). The Amba, Savitri, and Vashishti rivers all have rapids in the monsoon that kayakers travel specifically to run.',
      'Scuba diving at the Malvan Marine Sanctuary is the coast\'s most developed adventure activity — operators are certified, equipment is maintained, visibility is good from October to May. The reef at Sarjekot and the wreck of the British vessel at Malvan are the most popular dive sites.',
      'Long-distance treks on the Sahyadri ridge — the crest of the Western Ghats directly behind the coast — are among India\'s finest multi-day walks. The route from Kolad to Bhimashankar follows river valleys, forest paths, and Ghat passes with vertiginous views of the coast 1,200 metres below.',
    ],
    quote: {
      text: 'The Konkan coast does not offer managed adventure. It offers the real thing — wild water, steep rock, and honest uncertainty.',
    },
    keyFacts: [
      { label: 'Scuba season', value: 'October–May (Malvan)' },
      { label: 'Monsoon kayaking rivers', value: 'Amba, Vashishti, Savitri' },
      { label: 'Best diving depths', value: '5–25 metres (reef), 12 m (wreck)' },
      { label: 'Trek difficulty', value: 'Sahyadri ridge: moderate to strenuous' },
    ],
    highlights: [
      { title: 'Scuba at Malvan Sanctuary', desc: 'Certified operators, 300+ fish species, coral gardens, and a British wreck. The best diving in Maharashtra.' },
      { title: 'Monsoon River Kayaking', desc: 'The Vashishti and Amba rivers run white in the monsoon. Guided expeditions operate from Chiplun.' },
      { title: 'Sahyadri Ridge Trek', desc: 'Multi-day hike along the Ghat ridge with views of both the coast and the Deccan plateau. Maximum solitude, maximum elevation.' },
      { title: 'Sea Kayaking (Tarkarli)', desc: 'Calm estuary and open sea kayaking, with dolphin encounters in the early morning and coral snorkelling en route.' },
    ],
    gallery: [
      'water-sports.jpg',
      'ocean-cliffs.jpg',
      'tarkarli-backwaters.jpg',
      'malvan-marine-sanctuary.jpg',
    ],
    thingsToDo: [
      'Scuba dive at Malvan Marine Sanctuary (Oct–May)',
      'Book a monsoon kayaking trip on the Vashishti (July–August)',
      'Trek the Kalsubai peak — Maharashtra\'s highest point, above the Konkan',
      'Cliff walk at Harihareshwar (no railings, real cliffs)',
      'Overnight camping on the Sahyadri ridge near Mahabaleshwar',
    ],
  },

  /* ── Flora & Fauna ───────────────────────────────────────────────────── */
  'flora-fauna': {
    subtitle: 'The Thick Green World That Connects Sea Floor to Ghat Summit',
    body: [
      'The Western Ghats behind the Konkan coast harbour one of the highest concentrations of endemic species on Earth. Nearly 1,600 plant species are found here that grow nowhere else — including 16 species of wild banana, 84 orchid species, and over 300 species of fern. The monsoon transforms the Ghats into a greenhouse with no ceiling.',
      'The Malabar hornbill — a bird of extraordinary appearance, with a casqued beak and a raucous call — is the signature species of the coastal forest zone. It nests in old-growth forest only, making its presence an indicator of forest health. Spotting one on the Malvan-Sawantwadi forest road is a traveller\'s privilege.',
      'The mangroves of the coastal estuaries are marine forests — nurseries for the entire food chain of the adjacent sea. A healthy Konkan estuary mangrove supports oysters, mud crabs, juvenile fish, painted storks, sea eagles, mugger crocodiles, and, occasionally, otters. The productivity is extraordinary.',
      'In the marine environment, the coral reefs of the Malvan Marine Sanctuary support over 300 fish species — from tiny neon gobies to large Napoleon wrasse, from sea horses clinging to coral branches to schooling barracuda at the reef edge. The biodiversity here is comparable to far more celebrated reef systems.',
      'The sacred groves (devrais) of Konkan are ancient biodiversity refugia — patches of old-growth forest preserved by religious prohibition alone. Many are the last remnant of the original coastal forest. They harbour species no longer found anywhere else in the region: particular orchids, rare ferns, medicinal plants referenced in Ayurvedic texts.',
    ],
    quote: {
      text: 'The Western Ghats did not become a biodiversity hotspot. They always were one. We just started paying attention.',
    },
    keyFacts: [
      { label: 'Endemic plant species (Ghats)', value: '1,600+' },
      { label: 'Endemic vertebrate species', value: '500+' },
      { label: 'Orchid species (Ghats)', value: '84+' },
      { label: 'Bird species (coastal zone)', value: '400+' },
    ],
    highlights: [
      { title: 'Malabar Hornbill', desc: 'The signature bird of the coastal forest — found only in old-growth habitat, loud, spectacular, and increasingly rare outside the sanctuary forests.' },
      { title: 'Mangrove Ecosystems', desc: 'The Karli, Gad, and Vagad estuary mangroves are some of the healthiest on the west coast — nursery to the fish that sustain Konkani cuisine.' },
      { title: 'Devrais (Sacred Groves)', desc: 'Ancient forest remnants preserved by belief — often the last old-growth patches in a landscape that has been farmed for 2,000 years.' },
      { title: 'Sea Turtle Nesting', desc: 'Olive ridley turtles nest on five beaches in Sindhudurg and Ratnagiri — the community conservation effort is a model for all of India.' },
    ],
    gallery: [
      'waterfall-forest.jpg',
      'sacred-groves.jpg',
      'wildlife-sanctuaries.jpg',
      'malvan-marine-sanctuary.jpg',
    ],
    thingsToDo: [
      'Birdwatch at Phansad Wildlife Sanctuary (best: December–March)',
      'Snorkel at the Malvan reef to see the coral and fish diversity',
      'Visit a devrai sacred grove with a local guide',
      'Night walk in the Sawantwadi forest for fireflies (June–July)',
      'Otters in the Karli estuary — best at dawn, by kayak',
    ],
  },

  /* ── Beaches ─────────────────────────────────────────────────────────── */
  beaches: {
    subtitle: 'Seven Hundred Kilometres of Shore — Each One a Different World',
    body: [
      'No two consecutive kilometres of the Konkan coastline look alike. Black volcanic rock gives way to white quartz sand, then to laterite cliffs of deep orange, then to mangrove-fringed mudflats, then, suddenly, to a perfect crescent of pale gold sand with a river mouth at one end and a forest at the other. This is not hyperbole — it is geography.',
      'The beaches of the northern Konkan (Alibaug, Diveagar, Shrivardhan, Harihareshwar) are accessible from Mumbai and are busier. Further south, the Ratnagiri coast (Ganpatipule, Guhagar, Anjarle, Hedvi) is where the beaches begin to show their true character: wide, clean, and backed by coconut groves and red laterite bluffs.',
      'The southernmost stretch — the Sindhudurg coast — is Konkan\'s finest. Tarkarli\'s beach has water so clear you can count the fish. Devbagh is a sand spit between the river and the sea accessible only by boat. Redi beach is volcanic black sand under iron ore cliffs, reached by a forest path. Vengurla beach faces the Lighthouse island at sunset in a way that makes every photograph look like a painting.',
      'The sea itself changes character through the year. In winter (December to February), the Arabian Sea is calm, blue, and warm — perfect for swimming, snorkelling, and diving. In the pre-monsoon (April–May), it turns grey-green and choppy. And in the monsoon (June to September), it becomes elemental — grey-green walls of surf, the thunder of breakers, and an ocean that commands rather than invites.',
      'A note on swimming safety: many Konkan beaches have strong undertows and rip currents, particularly in the monsoon. Local knowledge is essential. Ask before entering the water. The fishing community will tell you exactly which beaches are safe and which are not — their lives depend on understanding the sea\'s moods.',
    ],
    quote: {
      text: 'To know Konkan beaches, you must accept that the best ones have no road to them. The walk is part of the beach.',
    },
    keyFacts: [
      { label: 'Coastline', value: '720 km (Dahanu to Karwar)' },
      { label: 'Swimming season', value: 'October–May' },
      { label: 'Best snorkelling', value: 'Malvan / Tarkarli (Oct–May)' },
      { label: 'Turtle nesting beaches', value: 'Velas, Anjarle, Kelshi, Murud' },
    ],
    highlights: [
      { title: 'Tarkarli', desc: 'Crystal-clear water at the Karli river mouth — the best natural snorkelling location in Maharashtra.' },
      { title: 'Ganpatipule', desc: 'A sacred beach town with a swayambhu Ganesh temple directly on the shore — arrive at dawn before the crowds.' },
      { title: 'Redi (Vengurla)', desc: 'Black volcanic sand beach under iron ore cliffs, accessible only by a 45-minute forest walk. Perfect solitude.' },
      { title: 'Diveagar', desc: 'A wide, clean beach on the north Konkan coast with a turtle nesting zone at the southern end. Quiet even in peak season.' },
    ],
    gallery: [
      'coastal-landscape.jpg',
      'guhagar-beach.jpg',
      'diveagar-beach.jpg',
      'shrivardhan-beach.jpg',
      'redi-beach.jpg',
      'tarkarli-backwaters.jpg',
    ],
    thingsToDo: [
      'Sunrise at Ganpatipule beach (reach by 5:30 AM)',
      'Snorkel at Tarkarli reef (bring your own mask)',
      'Walk from Tarkarli beach to Devbagh at low tide',
      'Sunset at Vengurla lighthouse island (by boat from Vengurla)',
      'Night sky at Diveagar beach (no light pollution, December–February)',
    ],
  },

  /* ── Personalities ───────────────────────────────────────────────────── */
  personalities: {
    subtitle: 'The Minds, Artists, and Leaders That Konkan Made',
    body: [
      'The Konkan coast has produced a disproportionate number of India\'s most consequential figures — in politics, literature, mathematics, and the arts. Whether this is a matter of the terrain (independent, isolating, self-reliant) or the culture (educated, maritimely connected, politically aware) is a question that historians debate and Konkani people simply assume.',
      'Lokmanya Bal Gangadhar Tilak was born in Ratnagiri district. His declaration — "Swaraj is my birthright and I shall have it" — was framed in the assertive, direct voice of a Konkan Brahmin who had absorbed both Sanskrit scholarship and modern political philosophy without finding any contradiction between them. He remains the most consequential pre-Gandhi figure in Indian independence.',
      'Vinayak Damodar Savarkar, another Ratnagiri son, is the most contested figure the coast produced — revolutionary, political philosopher, Hindu nationalist ideologue, and prisoner of the British Empire for eleven years in the Andaman Cellular Jail. His legacy divides India; his cell in Ratnagiri Fort is still a site of pilgrimage and argument simultaneously.',
      'The poet Keshavsuta — considered the father of modern Marathi poetry — was born in Malgund, a village near Ratnagiri. His poetry broke from the ornate Sanskrit-inflected verse of the 19th century and addressed common life in Marathi that felt new, immediate, and coastal: the monsoon, the fishing net, the smell of the sea before a storm.',
      'Ramanujan — not Konkan, but a man who worked in the same mathematical tradition — is mentioned only to note that the Gaud Saraswat Brahmin community of Konkan produced several mathematicians of the first rank, including scholars at the Bhandarkar Oriental Research Institute in Pune who worked on Sanskrit astronomical texts that anticipated later European developments.',
    ],
    quote: {
      text: '"Swaraj is my birthright and I shall have it." — Lokmanya Tilak, born in Ratnagiri, Konkan.',
    },
    keyFacts: [
      { label: 'Notable birthplace', value: 'Ratnagiri (Tilak, Savarkar, Keshavsuta)' },
      { label: 'Field', value: 'Politics, literature, mathematics, arts' },
      { label: 'Tagore in Konkan', value: 'Lived in Karwar; the sea shaped his Nobel work' },
      { label: 'Savarkar imprisonment', value: '11 years, Andaman Cellular Jail' },
    ],
    highlights: [
      { title: 'Tilak\'s Birthplace', desc: 'Chikhalgaon village, Ratnagiri district — a modest stone house that produced the most electric voice of India\'s freedom movement.' },
      { title: 'Savarkar Memorial', desc: 'The Patit Pavan temple in Ratnagiri, built at Savarkar\'s insistence to allow untouchable caste members to pray — a decade before Gandhi\'s similar campaigns.' },
      { title: 'Tagore in Karwar', desc: 'Rabindranath Tagore lived in Karwar (south Konkan) in the 1880s. The sea here shaped the imagery of his early poetry that won the Nobel Prize.' },
      { title: 'Keshavsuta\'s Malgund', desc: 'The village of Malgund, 20 km from Ratnagiri, has a small museum to the poet who invented modern Marathi verse.' },
    ],
    gallery: [
      'maritime-history.jpg',
      'ratnagiri-mango-fort.jpg',
      'literature-poets.jpg',
    ],
    thingsToDo: [
      'Visit Tilak\'s birthplace in Chikhalgaon (Ratnagiri)',
      'See Savarkar\'s cell in Ratnagiri Fort',
      'Visit the Malgund village Keshavsuta memorial',
      'Explore the Tagore Sarai in Karwar (Karnataka side)',
      'Visit the Bhandarkar Oriental Research Institute in Pune for manuscript collections',
    ],
  },

  /* ── Konkan Railway ──────────────────────────────────────────────────── */
  'konkan-railway': {
    subtitle: 'The Iron Thread That Stitched an Impossible Coast Together',
    body: [
      'The Konkan Railway was called impossible for 50 years. The terrain — 91 tunnels, 2,000 bridges, 740 kilometres of track through the Western Ghats escarpment — was considered too expensive, too difficult, and too geologically unstable. The first survey reports dated from colonial times had simply recommended that no railway be built here.',
      'E. Sreedharan, later known as the Metro Man, oversaw the project from 1990 to 1998. He completed it on time and under budget — a record in Indian infrastructure — by building one of the most complex railway lines ever constructed in Asia. The Panval Nadi viaduct, at 64 metres, was India\'s highest railway bridge at the time of construction.',
      'The train journey itself is extraordinary. Mumbai to Mangalore in 13 hours — through 91 tunnels (some over 6 km long), across 2,000 bridges, along cliff edges with the Arabian Sea 600 metres below, through valleys so narrow that the train creates its own wind. The Ghats present themselves as a series of green theatrical revelations, each one grander than the last.',
      'The villages along the Konkan Railway have been transformed. What took a full day by road now takes minutes by train. Agricultural produce reaches Mumbai markets the same day. Children from coastal villages attend college in cities they could not previously reach within a day. The railway did not just connect the coast — it changed the economy and the aspiration of its people.',
      'The railway also created new travel rituals. The Mumbai–Konkan overnight train is a specific kind of experience — packed with families returning home for festivals, Konkani food (vada pav, solkadhi in thermoses, mangoes in season) shared across seats, and the moment at dawn when the tunnel gives way to the coast and the sea appears suddenly, perfectly.',
    ],
    quote: {
      text: 'When the train emerges from the last tunnel and the sea appears — the whole compartment goes silent. Every time.',
    },
    keyFacts: [
      { label: 'Total length', value: '740 km (Mumbai to Mangalore)' },
      { label: 'Tunnels', value: '91 (longest: 6.5 km)' },
      { label: 'Bridges', value: '2,000+' },
      { label: 'Completion year', value: '1998 (inaugurated by PM Vajpayee)' },
    ],
    highlights: [
      { title: 'Panval Nadi Viaduct', desc: 'The highest railway bridge at completion (64 m) — a white arc over a green valley with the sea barely visible at the horizon.' },
      { title: 'Mumbai–Mangalore Overnight Journey', desc: 'The definitive Konkan experience: leave Mumbai in the evening, wake up to the sea, arrive in Mangalore at night having passed through a hundred worlds.' },
      { title: 'Village Station Stops', desc: 'Ratnagiri, Kankavli, Sindhudurg, Sawantwadi — stations that are gateways to a coast most of India has not yet visited.' },
      { title: 'Monsoon Rail Drama', desc: 'During the monsoon, waterfalls pour directly onto the train through open windows. Passengers close nothing and let the rain in. It is the best moment of the journey.' },
    ],
    gallery: [
      'konkan-railway.jpg',
      'waterfall-forest.jpg',
      'coastal-landscape.jpg',
    ],
    thingsToDo: [
      'Take the Mandovi Express or Jan Shatabdi from Mumbai to Karmali (Goa)',
      'Board the Netravati Express for the full Mumbai–Mangalore experience',
      'Alight at Chiplun and spend a day before continuing south',
      'Book the monsoon journey specifically for waterfall windows',
      'Sit in an unreserved compartment — the conversations are part of the journey',
    ],
  },

  /* ── Language & Dialects ─────────────────────────────────────────────── */
  'language-dialects': {
    subtitle: 'A Coast of Tongues — Twelve Ways to Say the Same Sea',
    body: [
      'The Konkan coast speaks in a dozen voices. Konkani is the base — a language as old as Sanskrit\'s arrival on the coast, absorbed by communities from Ratnagiri to Karwar over two millennia. But the Konkani of a Malvani fisherman is not the same as the Konkani of a Goa GSB household, which is not the same as the Konkani of a Mangalorean Catholic family. They are all Konkani; they are all distinct.',
      'Malvani — the dialect of Malvan, Kudal, and Sindhudurg — is the most widely recognized Konkani variant in Maharashtra. It has become synonymous with the coast\'s food, humour, and hospitality. The Malvani talkari (tone — tilted, warm, slightly ironic) is considered one of the most expressive in Marathi-speaking India. The dialect has appeared in Bollywood films for 30 years to signal authenticity.',
      'The Portuguese encounter left a linguistic residue that is still visible in Goan Konkani — palavras (words) like rassa (sauce, from rasa, blended with Portuguese), sol kadhi (from Portuguese sol, salt), and the specifically Goan counting system that mixes Sanskrit numbers with Portuguese ones. This is not code-switching — it is a creole of lived experience.',
      'Marathi and Konkani co-exist on the coast in a relationship that is sometimes competitive and sometimes generative. The Malvani dialect of Konkani is so saturated with Marathi vocabulary that linguists debate whether it is a Konkani dialect or a Marathi dialect with Konkani grammar. The coast does not find this debate interesting — it simply speaks.',
      'The endangered dialects are in the tribal communities: Katkari, Kokna, Warli. These languages, related to Dravidian and Munda families rather than to Sanskrit, predate Aryan settlement on the coast and encode ecological knowledge — plant names, seasonal calendars, weather patterns — that is not available anywhere else. They are being lost faster than they are being documented.',
    ],
    quote: {
      text: 'Language on the Konkan coast is a sediment record. You can read the history of who lived here in the words for "rain" and "fish" and "come in".',
    },
    keyFacts: [
      { label: 'Konkani dialects', value: '12+ (Malvani, GSB, Goan, Mangalorean, Chitpavan…)' },
      { label: 'Scheduled language', value: 'Konkani (8th Schedule, Constitution of India)' },
      { label: 'Script', value: 'Devanagari (primary), also Roman, Kannada, Malayalam' },
      { label: 'Portuguese loanwords in Goan Konkani', value: '200+' },
    ],
    highlights: [
      { title: 'Malvani Dialect', desc: 'The warmest, most expressive Konkani variant — spoken in Sindhudurg and Ratnagiri districts, instantly recognizable by its rising intonation and fish-market directness.' },
      { title: 'Goan Konkani', desc: 'The official language of Goa — written in multiple scripts, inflected by 450 years of Portuguese contact, the sound of bebinca and mando music.' },
      { title: 'Warli Language', desc: 'A pre-Aryan language of the northern Konkan interior — being documented by tribal language activists before the last speakers pass on.' },
      { title: 'Konkani Literature', desc: 'A living literary tradition with poetry (Malgund school), novels, and a dedicated Sahitya Akademi award since 1978.' },
    ],
    gallery: [
      'language-dialects.jpg',
      'fishing-village.jpg',
      'folk-dance.jpg',
    ],
    thingsToDo: [
      'Pick up basic Malvani phrases from your homestay host',
      'Visit the Goa Konkani Institute in Panaji',
      'Read Narayan Surve\'s Konkani poetry (translated)',
      'Attend a Konkani drama performance in Margao (Goa)',
    ],
  },

  /* ── Maritime History ────────────────────────────────────────────────── */
  'maritime-history': {
    subtitle: 'Ports, Sailors, and Sea Power — India\'s Atlantic Facing Coast',
    body: [
      'The Konkan coast was the node in a network of trade routes that connected the Mediterranean, the Arabian Peninsula, East Africa, and Southeast Asia for at least 2,500 years. Pepper, cotton, teak, and iron left these ports on Arab dhows. Glass, gold, horses, and dates arrived in return. The ancient port of Chaul (near present-day Alibag) is mentioned in Roman trade records as a source of Indian pepper.',
      'The arrival of Vasco da Gama at Calicut in 1498 — guided by an Arab navigator from Malindi, across the Indian Ocean on the summer monsoon — changed the economics of this trade permanently. Within two decades, the Portuguese had established fortified trading posts at Goa, Daman, and Diu, and were taxing or sinking every Arab and Indian ship they encountered.',
      'Shivaji Maharaj understood before anyone else in India that sea power was as important as land power. His Maratha navy — commanded by the Koli admiral Kanhoji Angre and later his sons — controlled much of the Konkan coast for nearly a century. The British East India Company paid tribute to the Angre family rather than risk its ships. This is not a footnote — it is one of the most remarkable chapters in Indian maritime history.',
      'The dhow building tradition of the Konkan coast — using teak from the Ghat forests, caulked with fish oil and coconut fibre — is now extinct as a working industry but survives in documentary records and in the form of the small fishing boats (hodi) still built by the Koli community using traditional joinery methods.',
      'The ports of the modern Konkan are Mumbai (the world\'s busiest in the colonial era), Ratnagiri, Jaigad, and the Goa ports. The maritime tradition lives on in the fishing fleet — hundreds of boats leaving the harbours at dusk and returning at dawn, navigating by a combination of GPS and the knowledge of generations of fishermen who memorised every rock and current on the coast.',
    ],
    quote: {
      text: 'Kanhoji Angre made the British East India Company pay toll on waters they considered theirs. He is the most forgotten great admiral in Indian history.',
    },
    keyFacts: [
      { label: 'Ancient port', value: 'Chaul (mentioned in Roman Periplus, 1st century CE)' },
      { label: 'Portuguese presence', value: 'Goa: 1510–1961 (451 years)' },
      { label: 'Maratha navy peak', value: 'Under Kanhoji Angre, 1698–1729' },
      { label: 'Trade commodities (ancient)', value: 'Pepper, teak, cotton, ivory, iron' },
    ],
    highlights: [
      { title: 'Chaul Ruins', desc: 'The ghost of one of the ancient world\'s great ports — Arab warehouses, Portuguese churches, and early British fortifications all within a square kilometre.' },
      { title: 'Kanhoji Angre\'s Legacy', desc: 'The Colaba area of Mumbai Bay was the Angre family headquarters — the Marathas who made the British pay for passage on their own ocean.' },
      { title: 'Goa\'s Old Port', desc: 'Old Goa\'s Viceroy\'s Arch and the churches that once served a fleet connecting Lisbon to Macao — still standing, now UNESCO-listed.' },
      { title: 'Daman & Diu Fortifications', desc: 'Portuguese sea fortifications at the northern edge of the Konkan coast — some of the most intact colonial military architecture in Asia.' },
    ],
    gallery: [
      'maritime-history.jpg',
      'murud-janjira-fort.jpg',
      'sindhudurg-fort-walls.jpg',
      'vasai-fort.jpg',
    ],
    thingsToDo: [
      'Walk the Chaul fort ruins near Alibag (ask a local guide)',
      'Visit the Vijaydurg fort on the Vagad coast (the oldest Maratha sea fort)',
      'Explore the Portuguese Quarter (Fontainhas) in Panaji',
      'Take a boat tour around Sindhudurg to understand its sea-fort design',
      'Read "The Sea-Hawks of the Konkan" for Maratha naval history',
    ],
  },

  /* ── Religious Mosaic ────────────────────────────────────────────────── */
  'religious-mosaic': {
    subtitle: 'Temples, Dargahs, Churches, and Synagogues Within a Single View',
    body: [
      'The Konkan coast is one of the most religiously diverse stretches of coastline in Asia. Hindu temples, Sufi shrines, Portuguese-era Catholic churches, a Sikh gurudwara, and — in Alibag — an active synagogue have stood within a few kilometres of each other for centuries. This coexistence is not a recent policy achievement; it is an old fact of maritime life.',
      'The temples of the Konkan are not the ornate towers of South India or the cave complexity of Ellora. They are laterite stone structures, white-plastered, roofed with Mangalore tile or shikhara gopurams, facing east and the rising sun. Each temple has its own hereditary priest, its own calendar, its own founding story that is the specific property of the village.',
      'The Sufi dargahs of the coast — particularly at Haji Ali (visible from Mumbai), Hazrat Sayyed Shah Hamid Bukharis (Murud), and the smaller shrines along the trade coast — are not minority institutions. They are loved and visited by Hindu, Muslim, and Christian fishermen alike, because the sea does not respect religious boundaries and the fishermen know this.',
      'The Catholic communities of Goa and the southern Konkan inhabit a remarkable hybrid tradition — the mass is said in Konkani and Latin simultaneously in some churches; the feast day food is identical to the Hindu festival meal with pork added; the village church committee and the village temple committee are often run by the same families.',
      'The Jewish community of Alibag — the Bene Israel Jews who have lived on the Konkan coast for 2,000 years by their own tradition — maintained the Sha\'ar Harahamim synagogue in Alibag through the 19th and 20th centuries. Most have emigrated to Israel since 1948; the synagogue is still maintained by the three families who remain.',
    ],
    quote: {
      text: 'The sea does not care which god you pray to before you launch your boat. The coast learned this long ago.',
    },
    keyFacts: [
      { label: 'Hindu temples (named)', value: '10,000+ along the Konkan coast' },
      { label: 'Portuguese churches', value: '200+ (Goa alone: 72)' },
      { label: 'Synagogue in Alibag', value: 'Sha\'ar Harahamim — 2,000-year-old community' },
      { label: 'Notable Sufi shrine', value: 'Haji Ali Dargah (Mumbai), Murud Dargah' },
    ],
    highlights: [
      { title: 'Kunkeshwar Shiva Temple', desc: 'On the ocean cliffs of Sindhudurg — waves break at the foot of the temple at high tide. One of the most dramatically situated temples in India.' },
      { title: 'Basilica of Bom Jesus (Goa)', desc: 'UNESCO World Heritage — the remains of St. Francis Xavier lie in a silver casket. The most visited Christian site in South Asia.' },
      { title: 'Alibag Synagogue', desc: 'One of the oldest synagogues in Asia — maintained by the last Bene Israel families on the coast. Visits by arrangement.' },
      { title: 'Ganpatipule Swayambhu Temple', desc: 'A self-manifested Ganesh idol on the beach at Ganpatipule — the rock it emerged from is still the central idol, surrounded by the sea at high tide.' },
    ],
    gallery: [
      'religious-mosaic.jpg',
      'kunkeshwar-temple.jpg',
      'ganpatipule-temple.jpg',
      'panaji-fontainhas.jpg',
    ],
    thingsToDo: [
      'Visit Kunkeshwar temple at high tide',
      'Walk the Fontainhas Latin Quarter in Panaji (guided walking tour)',
      'Visit the Alibag synagogue (arrange in advance)',
      'Attend the mango-season puja at the Ganpatipule temple (dawn)',
      'Visit a coastal dargah festival (Murud or Alibag)',
    ],
  },

  /* ── Monsoon ─────────────────────────────────────────────────────────── */
  monsoon: {
    subtitle: 'When Konkan Transforms — Four Months of the Most Beautiful Rain on Earth',
    body: [
      'The monsoon is not a season in Konkan — it is an event. It arrives between June 5 and June 15 (the local community can predict it to within three days by the colour of the sea and the flight of coastal birds), and when it arrives, the landscape changes within 48 hours. Waterfalls appear on hillsides that were dry stone two days before. Rivers that were calf-deep become waist-deep. The green goes from tired to electric.',
      'Konkan receives between 2,000 and 4,000 millimetres of rain annually — one of the highest rainfall zones in India. The Ghats receive the brunt of it; the coastal strip gets 2,500 mm on average. Rainfall here is not drizzle but architectural — visible walls of water crossing the sea and hitting the coast with an audible impact.',
      'The monsoon months (June–September) are when most of India\'s tourism industry tells you not to visit Konkan. This is the best-kept secret of the coast. The beaches are empty, the waterfalls are at maximum flow, the rice paddies are the deepest green you have ever seen, the air smells of wet earth and flowers, and every hotel charges off-season rates.',
      'The sea is not safe for swimming in the monsoon — the surf is powerful and the currents are unpredictable. But the visual drama of the monsoon ocean is unmatched. Standing on the Harihareshwar cliffs in July, watching the grey-green ocean building and breaking against the laterite below, you understand why this coast generated a literature of longing.',
      'The post-monsoon (October) transformation is as dramatic as the arrival. Within a week, the sky clears to a deep blue that has been absent since May. The waterfalls slow to their dry-season trickle. The fish return in enormous schools. The fishing boats go back out. The season begins again.',
    ],
    quote: {
      text: 'When the monsoon breaks on the Konkan coast, it doesn\'t rain. The ocean climbs the sky and then falls back again.',
    },
    keyFacts: [
      { label: 'Annual rainfall', value: '2,000–4,000 mm' },
      { label: 'Monsoon duration', value: 'June–September' },
      { label: 'Arrival window', value: 'June 5–15 (remarkably consistent)' },
      { label: 'Waterfall count', value: '100+ named, many more unnamed' },
    ],
    highlights: [
      { title: 'Dudhsagar Waterfall', desc: 'The iconic white cascade on the Goa–Karnataka border — best visited by jeep in the monsoon when the four tiers are fully charged.' },
      { title: 'Amboli Ghat', desc: 'A cloud forest in the Western Ghats above Sindhudurg — the mist hangs in the trees for weeks during the monsoon. Extraordinary biodiversity.' },
      { title: 'Monsoon Waterfalls', desc: 'Unnamed waterfalls appear everywhere along the Ghat escarpment from June to September — some accessible by short forest walks, others visible only from the sea.' },
      { title: 'Empty Beaches', desc: 'Every Konkan beach is empty in the monsoon. The surf is powerful and the sea unsafe for swimming — but for watching, there is nothing more dramatic.' },
    ],
    gallery: [
      'monsoon.jpg',
      'waterfall-forest.jpg',
      'ocean-cliffs.jpg',
      'coastal-landscape.jpg',
    ],
    thingsToDo: [
      'Visit Dudhsagar in July or August (jeep from Mollem)',
      'Walk the Amboli forest trails in July (bring rain gear)',
      'Stay on the coast for a week in the monsoon — the cheapest and most dramatic time',
      'Watch monsoon seafood (surmai, rawa, bangda) at the wet market in Malvan',
      'Photograph the nameless waterfalls from the Konkan Railway',
    ],
  },

  /* ── Weddings & Rituals ──────────────────────────────────────────────── */
  'weddings-rituals': {
    subtitle: 'Ceremonies Tied to the Tides, the Harvest, and the Ancestral Memory',
    body: [
      'A Konkani wedding is not an event. It is a series of events spread across three to five days, each with its own ritual sequence, its own permitted food, and its own obligatory clothing — and most of the instructions are in the body knowledge of the women of the family, not written down anywhere.',
      'The haldi ceremony — turmeric paste applied to the bride and groom — happens simultaneously in the two families\' homes, with music and rice-flour designs (rangoli) specific to the community and the season. The turmeric used is from the family\'s own orchard if possible, dried the previous year and preserved specifically for this purpose.',
      'The wedding mandap is built from living coconut fronds, areca nut sheaves, and marigold garlands by craftsmen from specific communities who have performed this function for generations. The construction is a ritual itself — the direction the mandap faces, the number of pillars, the placement of the central fire — all determined by the position of the moon at the time of the wedding.',
      'The wedding feast is the most elaborate expression of Konkani cuisine — fifteen to twenty-five elements for a traditional GSB wedding, each in precise sequence. The amti (lentil soup) with kokum, the dry prawn chutney, the rice flour pancake (ghavan), the sweet shrikhand — the menu is a negotiation between families, communities, and centuries of accumulated taste.',
      'Birth and death rituals on the coast are equally elaborate. The sixth-day ceremony after birth (shatthee) is a specific community observance — the midwife who attended the birth returns, the mother is ritually purified, and the child is named in a ceremony that involves the family\'s ancestral deity. Death is followed by thirteen days of prescribed observances, specific foods forbidden and permitted, that the whole community participates in.',
    ],
    quote: {
      text: 'At a Konkan wedding, the food is the ritual. The ritual is the food. You cannot separate them.',
    },
    keyFacts: [
      { label: 'Wedding duration', value: '3–5 days (traditional)' },
      { label: 'Wedding month', value: 'Vaishakh and Kartik (lunar calendar)' },
      { label: 'Community-specific rituals', value: '12+ distinct community traditions' },
      { label: 'Wedding feast dishes', value: '15–25 (traditional GSB wedding)' },
    ],
    highlights: [
      { title: 'The Coconut Frond Mandap', desc: 'Built by hereditary craftsmen from living fronds — the construction follows rules not written in any book, passed from grandfather to grandson.' },
      { title: 'The Haldi Ceremony', desc: 'Turmeric from the family orchard, music specific to the community, and rice-flour designs drawn by the eldest woman in the household.' },
      { title: 'GSB Wedding Thali', desc: 'Twenty-five elements in precise sequence — the most complex and delicious meal you will eat at any social occasion in India.' },
      { title: 'Shatthee (Sixth-Day Ceremony)', desc: 'The naming ceremony after birth — the whole community attends, the ancestral deity is invoked, and the child enters the village\'s record.' },
    ],
    gallery: [
      'weddings-rituals.jpg',
      'folk-dance.jpg',
      'konkani-thali.jpg',
    ],
    thingsToDo: [
      'Attend a Konkan village wedding (requires personal introduction, worth the effort)',
      'Ask your homestay host about the ritual calendar for the month you visit',
      'Witness the Shatthee ceremony if you are in a village when a birth occurs',
      'Eat at a wedding feast thali in a Konkani community hall — often open to guests',
    ],
  },

  /* ── Handicrafts ─────────────────────────────────────────────────────── */
  handicrafts: {
    subtitle: 'The Makers of the Coast — Lacquer, Wood, Shell, and the Living Craft',
    body: [
      'The craft traditions of the Konkan coast are not a heritage industry maintained for tourism. Most of them — the lacquerware toys, the temple woodcarving, the coir weaving, the pottery — are active, daily practices sustained by markets that have valued them for centuries and practitioners who cannot imagine doing anything else.',
      'Sawantwadi\'s lacquerware is the most visible Konkan craft internationally — wooden toys, fruit sculptures, and games (including chess sets) decorated with intricate lac painting by the Chitrakathi community of the Sawantwadi princely state. The royal palace still hosts the workshop. The craft received Geographical Indication status in 2011.',
      'Temple woodcarving along the Malvan-Vengurla coast is a distinct school with its own aesthetic vocabulary — muscular gods with confident expressions, narratives compressed into single panels, and a preference for dense composition over open space. The carvers work in Indian rosewood (sheesham) and teak from the Ghat forests. Each workshop is also a school; the apprenticeship system is intact.',
      'Coir products — ropes, mats, brushes, and furniture from coconut fibre — are manufactured in cottage industries throughout the coastal villages. The coir is processed by women working in their homes, using the same water-retting technique that has been used since the coconut palm arrived on the coast 3,000 years ago.',
      'Shell craft along the Ratnagiri coast is distinctive for its use of locally harvested cowrie, turban, and spiral shells combined with sea glass in jewellery, decorative objects, and wall hangings. The tradition began among fishing communities as a way to use what the sea offered. It now produces work of considerable aesthetic sophistication.',
    ],
    quote: {
      text: 'The Sawantwadi lacquerware mango looks so real that crows try to eat it. That is the standard the craftsmen work to.',
    },
    keyFacts: [
      { label: 'GI-tagged craft', value: 'Sawantwadi Wooden Toys (2011)' },
      { label: 'Chitrakathi tradition', value: '400+ years at Sawantwadi palace' },
      { label: 'Active craft workshops', value: 'Sawantwadi, Malvan, Ratnagiri, Vengurla' },
      { label: 'Annual output (Sawantwadi)', value: '50,000+ pieces' },
    ],
    highlights: [
      { title: 'Sawantwadi Palace Workshop', desc: 'Watch craftsmen paint lacquerware in the palace workshop — the same techniques, the same palace, the same craft for four centuries.' },
      { title: 'Malvan Temple Carvers', desc: 'The woodcarving school of the Malvan coast — find the workshops adjacent to the major temples, where the master carver teaches three or four apprentices.' },
      { title: 'Ratnagiri Shell Art', desc: 'Shell and sea glass craft from the Ratnagiri coast — increasingly sophisticated, sold at the Ratnagiri craft fair each January.' },
      { title: 'Coir Weaving Villages', desc: 'Cottage-industry coir production in coastal villages — the smell of water-retted coconut fibre is the smell of Konkan industry.' },
    ],
    gallery: [
      'handicrafts.jpg',
      'sawantwadi-palace-crafts.jpg',
      'temple-carvings.jpg',
    ],
    thingsToDo: [
      'Visit the Sawantwadi Palace craft workshop (open Tuesday–Sunday, 10 AM–5 PM)',
      'Commission a carving directly from a Malvan temple woodcarver',
      'Attend the Ratnagiri craft fair (January)',
      'Buy coir products directly from village producers (avoid middlemen)',
    ],
  },

  /* ── Freedom Struggle ────────────────────────────────────────────────── */
  'freedom-struggle': {
    subtitle: 'Echoes of Resistance — A Coast That Made the Empire Uncomfortable',
    body: [
      'The Konkan coast produced more per capita significant figures in India\'s independence movement than almost any other region of comparable size. Ratnagiri alone gave India Lokmanya Tilak, Vinayak Damodar Savarkar, and a dozen lesser-known but significant revolutionary organisers. The explanation may lie in the culture — educated, maritime, skeptical of external authority, and possessed of a deep ancestral memory of Maratha resistance.',
      'Lokmanya Bal Gangadhar Tilak (1856–1920) transformed Indian nationalism from an elite petition movement into a mass political campaign. His revival of Ganesh Chaturthi as a public political festival in 1893 turned a domestic Hindu observance into a forum for anti-colonial organisation — and the coast where he was born still celebrates Ganesh Chaturthi with the most political fervour.',
      'Savarkar was a revolutionary before he became an ideologue. His armed resistance networks in London and Nashik, his translation of Giuseppe Mazzini\'s writings for Indian audiences, and his planning of the 1909 assassination of a British official led to his trial for conspiracy, a double life sentence, and eleven years in the Andaman Cellular Jail under conditions that were, by any measure, torture.',
      'The salt satyagrahas along the Konkan coast in 1930–1931 were among the most sustained anywhere in India — fishing communities who had long supplemented their income with coastal salt-making were natural participants. The Dharasana salt satyagraha, just north of Valsad at the Konkan\'s northern edge, was reported by Webb Miller and became the most widely read American newspaper account of the independence movement.',
      'The Goa liberation movement (1961) — often presented as an afterthought to 1947 — was in fact a forty-year organised resistance to Portuguese colonial rule that involved strikes, underground newspapers, and several prison terms. The liberation of Goa in December 1961 was, from the perspective of Goa\'s own people, the completion of a project that began in the 1920s.',
    ],
    quote: {
      text: '"Swaraj is my birthright and I shall have it." This sentence, spoken by a Konkani Brahmin, changed the language of Indian politics forever.',
    },
    keyFacts: [
      { label: 'Notable figures born', value: 'Tilak (1856), Savarkar (1883), Keshavsuta (1866)' },
      { label: 'Savarkar\'s imprisonment', value: '11 years, Andaman Cellular Jail' },
      { label: 'Goa liberation', value: 'December 19, 1961 (Operation Vijay)' },
      { label: 'Tilak\'s Ganesh revival', value: '1893 — still the model for the festival today' },
    ],
    highlights: [
      { title: 'Ratnagiri Fort — Savarkar\'s Cell', desc: 'The cell where Savarkar was kept under house arrest after release from the Andamans — preserved as a memorial and site of ongoing political debate.' },
      { title: 'Tilak\'s Birthplace (Chikhalgaon)', desc: 'A modest house in Ratnagiri district — the origin point of the voice that redefined Indian nationalism.' },
      { title: 'Dharasana Salt Fields', desc: 'The site of the 1930 salt satyagraha — now a modest monument north of Valsad, rarely visited but historically significant.' },
      { title: 'Goa Liberation War Memorial', desc: 'The memorial at Panaji marking December 19, 1961 — the day Goa ended 451 years of Portuguese colonial rule.' },
    ],
    gallery: [
      'freedom-struggle.jpg',
      'ratnagiri-mango-fort.jpg',
      'maritime-history.jpg',
    ],
    thingsToDo: [
      'Visit Ratnagiri Fort and Savarkar\'s cell',
      'Drive to Chikhalgaon village and Tilak\'s ancestral home',
      'Visit the Goa Liberation War Memorial in Panaji (December 19)',
      'Read "Echoes of Freedom" (Marathi) at the Ratnagiri library',
    ],
  },

  /* ── Water Sports ────────────────────────────────────────────────────── */
  'water-sports': {
    subtitle: 'Scuba, Surf, Kayak, and the Wild Water of the Konkan Shore',
    body: [
      'The water sports scene in Konkan is still developing but already remarkable — particularly at Tarkarli and Malvan, where the clarity of the Arabian Sea and the protected reef of the Malvan Marine Sanctuary have created a dive destination that specialists rank alongside far more celebrated sites in the Lakshadweep and Andaman Islands.',
      'Scuba diving at Malvan is conducted year-round by about a dozen operators, with the best visibility (15–25 metres) from October to May. The reef at Sarjekot, the natural arch at Coral Garden, and the wreck of a 1905 British vessel are the signature dive sites. The fish diversity — Napoleon wrasse, giant grouper, schools of barracuda, sea turtles — is exceptional for a continental shelf location.',
      'Kayaking in the Konkan is bifurcated between the monsoon rivers (fast, technical, demanding) and the estuary paddling (calm, bird-rich, suitable for beginners). The Vashishti river at Chiplun has Grade II–III rapids in July and August; operators run guided kayak expeditions that camp on the riverbank overnight.',
      'Stand-up paddleboarding (SUP) in the Tarkarli estuary has become popular since 2018. The backwaters are calm, the visibility is extraordinary (you paddle over clearly visible coral patches), and dolphin encounters are not uncommon. SUP equipment is available from several Tarkarli operators by the hour.',
      'Surfing is nascent on the Konkan coast. The best breaks are near Harihareshwar and Velas, where the southwest monsoon swell creates consistent 1.5–2 metre waves in June and July. There are no surf schools yet, but the breaks are uncrowded, and the water temperature (27–29°C) makes it the most physically comfortable surfing in India.',
    ],
    quote: {
      text: 'The Malvan reef is India\'s best-kept underwater secret. Give it five more years before it isn\'t a secret anymore.',
    },
    keyFacts: [
      { label: 'Dive visibility (Malvan)', value: '15–25 m (October–May)' },
      { label: 'Dive sites', value: 'Sarjekot reef, Coral Garden, British wreck' },
      { label: 'Kayak rivers', value: 'Vashishti (Grade II–III), Amba, Savitri' },
      { label: 'SUP season', value: 'October–May (Tarkarli)' },
    ],
    highlights: [
      { title: 'Malvan Scuba', desc: 'The best diving in mainland Maharashtra — Napoleon wrasse, grouper, turtles, and a 1905 wreck on the sandy bottom at 12 metres.' },
      { title: 'Tarkarli SUP', desc: 'Paddleboard over crystal-clear estuary water with coral patches visible below — dolphin encounters included.' },
      { title: 'Vashishti Kayak Expedition', desc: 'Grade II–III whitewater in the monsoon, with overnight camps on the riverbank. Best July–August.' },
      { title: 'Surfing at Velas', desc: 'Nascent surf scene at one of the most beautiful and uncrowded beaches in Maharashtra — best June–July.' },
    ],
    gallery: [
      'water-sports.jpg',
      'tarkarli-backwaters.jpg',
      'malvan-marine-sanctuary.jpg',
    ],
    thingsToDo: [
      'Book a scuba dive at Malvan (PADI certification available at local schools)',
      'Kayak the Vashishti river in July (guided expedition)',
      'SUP in the Tarkarli backwaters at dawn (dolphin spotting)',
      'Try surfing at Velas in June (bring or rent a board from Harihareshwar)',
    ],
  },

  /* ── Homestays ───────────────────────────────────────────────────────── */
  homestays: {
    subtitle: 'The Wada Experience — Sleep Where the Family Slept, Eat What the Orchard Grows',
    body: [
      'The Konkan homestay movement is one of India\'s most authentic travel developments of the last decade — not a manufactured hospitality industry but actual families opening rooms in actual ancestral homes to actual travellers, with actual food from the actual orchard.',
      'The traditional Konkan wada is a multi-room, multi-generation compound built from laterite block around a central courtyard. Many wadas in Ratnagiri, Dapoli, and Sindhudurg districts are 100–200 years old, with polished red oxide floors, carved wooden doors, and verandas that face the orchard or the sea. Sleeping in these rooms is sleeping in the history of the family that built them.',
      'The food at a homestay bears no resemblance to what the tourist restaurants serve. The morning begins with kokum sarbat (cold drink) or coconut milk tea. Breakfast is poli (thin flatbread) or ghavan (rice pancake) with coconut chutney and a fish preparation from the morning\'s catch. Lunch is rice, fish curry, bhaji, sol kadhi, and a sweet. Dinner is lighter. Everything grows within five kilometres of where you sit.',
      'The best homestay hosts are also the best guides — they know which beach is safe in which season, which forest path reaches the waterfall, which day the village market runs, and which fisherman will take you out at dawn if you ask. The knowledge they carry was acquired over generations of living with this specific piece of coast.',
      'There is a spectrum of homestay quality, from basic guestrooms with shared bathrooms to beautifully restored wadas with modern bathrooms and curated experiences. The most important quality in any homestay host is not the room quality — it is whether they are actually from there. Ask where the family is from. Ask how long they have had the orchard. If the answers are good, the stay will be good.',
    ],
    quote: {
      text: 'The coconut lassi on the veranda at sunset. The smell of the orchard at dawn. The host\'s grandmother\'s recipe for sol kadhi. That is what Konkan hospitality means.',
    },
    keyFacts: [
      { label: 'Registered homestays', value: '200+ (Ratnagiri & Sindhudurg)' },
      { label: 'Average wada age', value: '80–200 years' },
      { label: 'Price range', value: '₹1,200–6,000/night (with meals)' },
      { label: 'Best districts', value: 'Dapoli, Ratnagiri, Devgad, Sawantwadi' },
    ],
    highlights: [
      { title: 'Heritage Wada Stays', desc: 'Sleep in a 150-year-old laterite-and-tile wada with original carved doors, coconut-oil-polished floors, and an orchard breakfast.' },
      { title: 'Farm Stays', desc: 'Working farms in Devgad and Ratnagiri that take guests through the mango harvest, cashew processing, and coconut climbing.' },
      { title: 'Fishing Village Stays', desc: 'Basic but extraordinary — stay in a Koli fishing village, wake at 4 AM for the auction, eat the fish that didn\'t sell.' },
      { title: 'Dapoli Hill Homestays', desc: 'The hill stations above the coast offer cooler temperatures, Ghat views, and some of the best-run heritage homestays in Maharashtra.' },
    ],
    gallery: [
      'homestays.jpg',
      'dapoli-highlands.jpg',
      'spice-plantation.jpg',
    ],
    thingsToDo: [
      'Book a 4-night minimum at a Ratnagiri district homestay',
      'Ask to join the morning fish market run',
      'Take a cooking lesson from the host\'s family',
      'Request a tour of the orchard at dawn',
      'Ask about the family\'s ancestral story — every wada has one',
    ],
  },

  /* ── Geology ─────────────────────────────────────────────────────────── */
  'geology-coastline': {
    subtitle: 'Written in Rock — What the Cliffs and the Laterite Tell About Deep Time',
    body: [
      'The rocks of the Konkan coast are an open textbook of geological history. The black volcanic basalt of the beaches and headlands is Deccan Trap lava — erupted in one of the largest volcanic events in Earth\'s history, 65 million years ago, around the same time as the Chicxulub impact that killed the dinosaurs. The lava flows are visible in horizontal layers on the sea cliffs, each layer representing a single eruption event.',
      'The laterite that covers most of the plateau surfaces is a deeply weathered crust formed over millions of years of monsoon leaching of the basalt below. Iron and aluminium compounds concentrate in the laterite while silica washes away — the result is a red-orange substrate that is nearly impervious to water but rich in mineral micronutrients that certain crops, particularly mango and cashew, exploit brilliantly.',
      'The coastline itself is an active geological system. Sea caves carved by wave action in the basalt headlands are measurably growing. The laterite cliffs at Harihareshwar, Velas, and Redi are retreating at a rate of centimetres per year. The estuaries are constantly reshaped by monsoon sedimentation and tidal action. The coast you see today is not the coast of 1,000 years ago and will not be the coast of 1,000 years hence.',
      'The Western Ghats escarpment — the defining topographic feature of Konkan\'s geography — is a passive continental margin, the remnant rift edge of the ancient Gondwana supercontinent. When India separated from Madagascar, Antarctica, and Africa 90 million years ago and began its northward drift, the western edge of the Indian plate was exposed. The Ghats are that edge — eroded but still dramatic.',
      'For the traveller: the geology is visible everywhere. The red boulders in the farm field are laterite blocks quarried from the same plateau the field sits on. The black beach sand is basalt, ground fine by wave action. The stepped terracing of the hillside orchards follows the natural layering of the lava flows beneath. The land and its people have always worked with the grain of the rock.',
    ],
    quote: {
      text: 'When Konkan\'s basalt was formed, there were no humans on Earth. The rock has been patient.',
    },
    keyFacts: [
      { label: 'Basalt age', value: '65 million years (Deccan Trap eruptions)' },
      { label: 'Laterite formation', value: 'Post-Eocene, 30–50 million years of weathering' },
      { label: 'Ghat formation', value: 'Passive continental margin, ~90 million years' },
      { label: 'Cliff retreat rate', value: '1–5 cm/year (active erosion)' },
    ],
    highlights: [
      { title: 'Harihareshwar Laterite Cliffs', desc: 'Sixty-metre columns of orange laterite and black basalt, with the Savitri river cutting through the base. Geologically spectacular.' },
      { title: 'Deccan Trap Lava Flows', desc: 'Visible as horizontal black stripes in the sea cliffs anywhere along the coast — each layer is one volcanic event from 65 million years ago.' },
      { title: 'Sea Caves at Murud', desc: 'Wave-cut caves in the Murud basalt headlands, some accessible at low tide. The sound inside them at high tide is architectural.' },
      { title: 'Vengurla Iron Ore Cliffs', desc: 'The distinctive red-black iron ore deposits at Redi beach are visible from the sea — a Goa Iron Ore company remnant with dramatic geology.' },
    ],
    gallery: [
      'geology-coastline.jpg',
      'harihareshwar-cliffs.jpg',
      'ocean-cliffs.jpg',
    ],
    thingsToDo: [
      'Walk the Harihareshwar cliff path at low tide to see the basalt-laterite contact',
      'Examine the Deccan Trap layers in the sea cliffs at any headland',
      'Enter the Murud sea caves at low tide',
      'View the iron ore cliffs at Redi from the sea (by local boat)',
    ],
  },

  /* ── Diaspora ────────────────────────────────────────────────────────── */
  diaspora: {
    subtitle: 'Konkan Across the World — What the Emigrants Carried and What They Left Behind',
    body: [
      'The Konkan diaspora is enormous relative to the coast\'s population. From the 19th century onward, Konkani families — GSB merchants, Koli sailors, educated professionals from Ratnagiri — moved to Mumbai, to the Gulf states, to East Africa (particularly Uganda and Kenya), to Southeast Asia, and eventually to every continent. The curry-and-rice cooking of Konkan went everywhere they went.',
      'The Mumbai connection is the oldest and most important. Mumbai was essentially a Konkani city in the 19th century — Koli fishing communities had lived at Mahim and Worli since before the Portuguese arrived; Pathare Prabhu and CKP communities from the northern Konkan built much of the city\'s early commercial infrastructure. The Konkan cook who migrated to Mumbai in 1905 is the grandmother of the Mumbai food culture.',
      'The Gulf diaspora — enormous from the 1970s oil boom — sent remittances back to the Konkan coast that transformed the built environment. Ratnagiri and Sindhudurg districts have some of the most unusually elaborate private houses in rural Maharashtra — concrete villas with decorative columns and tiled courtyards, funded by fifteen years of labour in Dubai or Abu Dhabi. The houses often stand empty for ten months a year, waiting for the owner\'s annual return.',
      'The East African Konkani community — primarily GSB and Khatri families who moved to Uganda, Kenya, and Tanzania in the colonial era — maintained their cuisine, their language, and their festival calendar in extraordinary detail for two to three generations before Idi Amin\'s 1972 expulsion of Asians from Uganda dispersed them further to the United Kingdom, Canada, and beyond.',
      'The connection to the home coast is maintained by festival travel, by the annual mango shipment (Devgad Alphonso boxes airfreighted to the Gulf, to the UK, to the United States in April and May), by WhatsApp groups of village associations, and by the persistent Konkani spoken at family gatherings on four continents.',
    ],
    quote: {
      text: 'Every Konkani family in Dubai orders the Devgad Alphonso mango box in April. The mango is the home.',
    },
    keyFacts: [
      { label: 'Gulf diaspora size', value: '300,000+ (estimated)' },
      { label: 'UK Konkani community', value: 'Significant in Leicester, London' },
      { label: 'East Africa connection', value: '3 generations, 1890s–1970s' },
      { label: 'Mango export', value: 'Devgad Alphonso airfreighted to 30+ countries' },
    ],
    highlights: [
      { title: 'Mumbai as First Diaspora', desc: 'Mumbai was built in part by Konkani migrants — the Koli fishermen, the Pathare Prabhu traders, the GSB merchant families of Matunga and Dadar.' },
      { title: 'Gulf Remittance Architecture', desc: 'The concrete villas of Ratnagiri district — each one funded by a decade in Dubai, standing as monuments to the decision to leave and the love for home.' },
      { title: 'East Africa GSB Communities', desc: 'Ugandan, Kenyan, and Tanzanian families who maintained Konkani culture intact across three generations and two continents.' },
      { title: 'Annual Mango Migration', desc: 'The April Alphonso season triggers a reverse migration — diaspora returning to the coast, and Devgad mango boxes flying out to five continents.' },
    ],
    gallery: [
      'diaspora.jpg',
      'devgad-orchards.jpg',
      'fishing-village.jpg',
    ],
    thingsToDo: [
      'Visit the Ratnagiri area in April for the mango packing and shipping ritual',
      'Eat at a GSB community restaurant in Matunga, Mumbai (Prakash, Guru Kripa)',
      'Attend the Konkan Foundation cultural events in UAE (annual)',
      'Read "Roots and Routes" — essays on the Konkani diaspora identity',
    ],
  },

  /* ── Wildlife Sanctuaries ────────────────────────────────────────────── */
  'wildlife-sanctuaries': {
    subtitle: 'Tiger Corridors, Hornbill Valleys, and the Last Wild Corners of the Ghats',
    body: [
      'The Western Ghats behind the Konkan coast are managed as a series of protected areas — national parks, wildlife sanctuaries, and tiger reserves — that collectively form one of the most significant wildlife conservation zones in South Asia. The corridor connects the Ghats continuously from Dangs in Gujarat to the Nilgiris in Tamil Nadu.',
      'Phansad Wildlife Sanctuary, near Murud-Janjira, is the most accessible Konkan sanctuary. It protects 7,000 hectares of dry and semi-evergreen coastal forest, harbouring leopard, sloth bear, four-horned antelope, giant squirrel, and an extraordinary variety of birds including the crested serpent eagle, the Malabar pied hornbill, and breeding pairs of the changeable hawk-eagle.',
      'Chandoli National Park, in the Ghat forests above Kolhapur and Sangli, is a tiger reserve that overlaps the Konkan watershed. Tigers, leopards, gaur (Indian bison), sambar, and wild dogs (dholes) are all documented here. The park receives very few visitors compared to the more famous reserves of central India, which makes encounters more likely when they do occur.',
      'The Cotigao Wildlife Sanctuary in Goa is the coast\'s best-maintained bird sanctuary — a dense evergreen forest with a network of trails and machans (observation platforms) for wildlife viewing. The bird list exceeds 250 species; the great hornbill is reliably sighted in the October–March season.',
      'The Radhanagari Wildlife Sanctuary in the Sahyadri foothills above Kolhapur is famous for its gaur (Indian bison) population — one of the most accessible gaur herds in India, viewable in the early morning from the sanctuary\'s forest roads. Leopard sightings are also common for a sanctuary this close to a major city.',
    ],
    quote: {
      text: 'The tiger does not read sanctuary boundaries. Neither does the monsoon. The wildlife of the Ghats is healthier than the policy documents suggest.',
    },
    keyFacts: [
      { label: 'Key sanctuaries', value: 'Phansad, Chandoli, Radhanagari, Cotigao, Tillari' },
      { label: 'Tiger reserve', value: 'Chandoli (part of Sahyadri Tiger Reserve)' },
      { label: 'Best birdwatching', value: 'Cotigao (Goa), Phansad (Maharashtra)' },
      { label: 'Gaur viewing', value: 'Radhanagari (morning forest roads)' },
    ],
    highlights: [
      { title: 'Phansad Sanctuary', desc: '7,000 hectares of coastal forest with leopard, sloth bear, hornbills, and a spectacular monsoon waterfall accessible from Murud.' },
      { title: 'Chandoli Tiger Reserve', desc: 'Tigers and gaur in the Ghat forests above the Konkan coast — one of the least-visited tiger reserves in India.' },
      { title: 'Cotigao Bird Forest', desc: '250+ species in a dense Goa forest — great hornbill, Malabar trogon, and Nilgiri wood pigeon all resident.' },
      { title: 'Radhanagari Gaur Herds', desc: 'The most accessible Indian bison population in the Western Ghats — reliable morning sightings from the forest roads.' },
    ],
    gallery: [
      'wildlife-sanctuaries.jpg',
      'waterfall-forest.jpg',
      'sacred-groves.jpg',
    ],
    thingsToDo: [
      'Dawn safari at Phansad Wildlife Sanctuary (permit from DFO Murud)',
      'Forest walk in Cotigao Sanctuary, Goa (October–March)',
      'Gaur morning walk at Radhanagari Sanctuary (Kolhapur)',
      'Night owl safari in the Amboli Ghat forests (June–September)',
      'Birding walk at the Karnala Bird Sanctuary, near Panvel (northern Konkan)',
    ],
  },

  /* ── Forts of Konkan ─────────────────────────────────────────────────── */
  'forts-of-konkan': {
    subtitle: 'Over Three Hundred Forts — Sea Citadels, Hill Strongholds, River Outposts',
    body: [
      'The Konkan coastline was among the most fortified in the world during the 16th–18th centuries. Over three hundred forts — sea forts, river forts, hill forts, and estuary outposts — were built by successive powers (the Silhara dynasty, the Bahmanids, the Vijayanagar empire, the Bijapur Sultanate, Shivaji\'s Maratha navy, and the Portuguese, British, and Dutch) along 720 kilometres of coast and its immediate hinterland.',
      'Shivaji Maharaj\'s naval programme was unprecedented in India — the construction of a purpose-built fleet and a series of island fortresses designed specifically for sea warfare. Sindhudurg (built 1664–1667) on an island at Malvan was the masterpiece: 48 acres, walls 10 metres thick at the base, with freshwater wells inside the sea fort, a temple to Shivaji himself, and an imprint of the founder\'s hand in the fort wall that is still visible.',
      'Murud-Janjira, an island fort 22 kilometres south of Alibag, is perhaps the most remarkable military structure on the coast. It was built on a 22-acre island by the Siddhi (descendants of Habshi/Ethiopian) governors of the Bijapur Sultanate. It was besieged by Shivaji, by Chimaji Appa (his brother), by the British, and by the Maratha Peshwas — and never surrendered. It remained continuously occupied until Indian independence in 1947.',
      'The Portuguese fortification system at Goa, Daman, and Diu represented a completely different military philosophy — the design was European, the execution was by Indian craftsmen using local laterite and lime, and the purpose was control of sea trade rather than territorial expansion. The Chapora fort and the fort at Aguada (still visible from the Goa beaches) survive in remarkable condition.',
      'For the traveller, the forts are the most accessible historical experience on the coast — most can be reached by boat or short walk, most are managed by the Archaeological Survey of India, and none have queues. The contrast between a fort visited at 7 AM (empty, the sea below, the light early) and the same fort at 11 AM (a school trip, guides shouting) is so extreme as to constitute two different experiences.',
    ],
    quote: {
      text: 'Murud-Janjira repelled every power that tried to take it for 350 years. It stands today exactly as it was built. The sea is the ultimate preservative.',
    },
    keyFacts: [
      { label: 'Total forts (coast)', value: '300+' },
      { label: 'Sindhudurg area', value: '48 acres (island sea-fort)' },
      { label: 'Murud-Janjira', desc: 'Never surrendered in 350+ years of sieges' },
      { label: 'Fort builder eras', value: 'Maratha, Portuguese, Bijapur, British, Siddhi' },
    ],
    highlights: [
      { title: 'Sindhudurg', desc: '48-acre sea fort at Malvan — Shivaji\'s masterpiece, with its freshwater wells, temples, and the imprint of the founder\'s hand in the wall.' },
      { title: 'Murud-Janjira', desc: 'The impregnable island fort of the Siddhi governors — never taken by force in 350 years. Accessible by boat from Murud beach.' },
      { title: 'Vijaydurg', desc: 'The oldest Maratha sea fort, on the Wagad coast — the headquarters of Kanhoji Angre, the admiral who made the British pay toll.' },
      { title: 'Vasai Fort', desc: 'The largest Portuguese fort on the Maharashtra coast — vast, ruined, overgrown, and almost entirely unvisited except by local teenagers.' },
    ],
    gallery: [
      'forts-of-konkan.jpg',
      'sindhudurg-fort-walls.jpg',
      'murud-janjira-fort.jpg',
      'alibaug-kulaba-fort.jpg',
      'vasai-fort.jpg',
    ],
    thingsToDo: [
      'Take the boat to Sindhudurg from Malvan jetty (30 min)',
      'Take the boat to Murud-Janjira from Murud beach (15 min)',
      'Drive the Ratnagiri-Vijaydurg coastal road to find Vijaydurg fort',
      'Walk the Vasai fort ruins (morning only — hot by afternoon)',
      'Camp overnight on the beach at Jaigad fort',
    ],
  },

  /* ── Textiles & Costume ──────────────────────────────────────────────── */
  'textiles-costume': {
    subtitle: 'Dressed for the Coast — The Fabrics and Forms That Define Konkani Life',
    body: [
      'The traditional dress of Konkan is functional — it makes sense in a climate of intense heat, high humidity, monsoon downpours, and salt spray. The nine-yard Maharashtrian sari, worn in the distinctive nauvari style (the pallu draped forward over the head like a cape), manages heat and modest simultaneously. The Koli fisherwoman\'s sari, knotted at the knee for wading, is perhaps the most ergonomically intelligent garment ever developed for manual coastal labour.',
      'The male tradition in coastal villages is simpler: dhoti and kurta for formal occasions, a lungi or two-metre cloth for work. The Mangalsutra, the kumkum, and the green glass bangles of a married Maharashtrian woman are the same on the coast as they are in the interior — but the coastal equivalent is worn with more pragmatism about getting wet.',
      'The handloom tradition of the Konkan coast is concentrated in specific weaving communities in Ratnagiri, Sindhudurg, and Goa. The Chanderi and Ilkal sarees worn by coastal women for festivals are not local production (they come from Madhya Pradesh and Karnataka respectively) but the coastal paithani from Paithan near Aurangabad — a silk saree with gold-thread zari — is deeply associated with the Konkani Hindu wedding.',
      'Goan Catholic costume tradition is distinct — the pano bhaju (a specific cut of blouse worn with the sari, modified by Portuguese encounter) and the distinctive wedding garments of the Goan Christian communities are documented in museum collections in Panaji. The influence of Portuguese textiles — particularly lace-making, introduced by the wives of Portuguese traders — is still visible in the church festival wear of Goa\'s coastal villages.',
      'The craft of natural dyeing in the Konkan hinterland — using mangosteen rind, jackfruit wood, and coconut husk — is practiced by a shrinking number of weavers in Sindhudurg and Ratnagiri districts. The resulting textiles — in earthy tones of brown, ochre, and deep red — have become sought-after among slow-fashion advocates and are now sold through craft cooperatives at a significant premium.',
    ],
    quote: {
      text: 'The Koli woman\'s sari knot is a piece of engineering. It allows her to haul a net, wade through surf, and walk home from the market in the same garment.',
    },
    keyFacts: [
      { label: 'Traditional women\'s wear', value: 'Nauvari 9-yard sari (Maharashtrian), Pano bhaju (Goan)' },
      { label: 'Festival sari', value: 'Paithani (silk, gold zari) for Hindu weddings' },
      { label: 'Natural dye tradition', value: 'Active in Sindhudurg and Ratnagiri' },
      { label: 'Portuguese textile influence', value: 'Lace-making, specific blouse cuts (Goa)' },
    ],
    highlights: [
      { title: 'Koli Fishing Sari', desc: 'A garment of pure function — the distinctive front-knot style that allows net hauling, wading, and market walking in one outfit.' },
      { title: 'Nauvari Sari Style', desc: 'The nine-yard Maharashtrian sari worn with the pallu over the head — an ancient coastal garment adapted over two millennia of coastal living.' },
      { title: 'Natural Dye Textiles', desc: 'Konkan hinterland weavers using mangosteen, jackfruit, and coconut to produce earthy, extraordinary textiles now sold nationally.' },
      { title: 'Goan Pano Bhaju', desc: 'The specific blouse style of Catholic Goan women — a Portuguese-influenced cut that created a distinct regional costume tradition.' },
    ],
    gallery: [
      'textiles-costume.jpg',
      'folk-dance.jpg',
      'weddings-rituals.jpg',
    ],
    thingsToDo: [
      'Visit a natural dye weaving cooperative in Sindhudurg district',
      'See the costume collection at the Goa State Museum, Panaji',
      'Attend a coastal wedding to see the nauvari and paithani in use',
      'Shop for naturally-dyed fabric at the Malvan craft market (Saturday)',
    ],
  },

  /* ── Fishing Traditions ──────────────────────────────────────────────── */
  'fishing-traditions': {
    subtitle: 'The Dawn Trade — Governed by Tide, Moon, and Knowledge Older Than Writing',
    body: [
      'Fishing on the Konkan coast is not an industry — it is a civilization. The Koli community, the coast\'s original maritime inhabitants, have fished these waters for at least 4,000 years. Their knowledge of the sea — the fish migration patterns, the tidal rhythms, the weather signs, the specific reefs and channels where specific species are found in specific seasons — constitutes one of the most complex ecological datasets ever accumulated by human communities.',
      'The fishing day begins before dawn — sometimes at 2 AM for the boats going furthest out. The return is timed to the tide and the light. The fish auction at the landing beach is over by 7 AM. By 8 AM the first fish is at the market in the nearest town. By 10 AM the same fish is being cooked in a kitchen 50 kilometres away. The chain from sea to plate on the Konkan coast is the shortest in India.',
      'Traditional fishing boats (hodi, rampon, makkar) are still built using joinery techniques inherited from Arab shipbuilding traditions — the curved planks fitted together without metal fastening, held in place by the geometry of the construction itself. Modern fibreglass boats have replaced most of these traditional hulls in active use, but the knowledge of building the traditional form survives in a handful of workshops.',
      'The monsoon fishing ban (June–September) has been observed by Koli communities for centuries — the sea is too dangerous, and the fish need to spawn. The season reopens on Narali Purnima (coconut full moon) with a ritual offering to the sea — a coconut thrown into the waves from the bow of the first boat to launch. The whole village watches from the shore.',
      'Industrial trawling from the larger ports (Ratnagiri, Malvan, Karwar) has created severe pressure on traditional fishermen who use smaller nets and fish sustainably. The conflict between the two fishing models is the most significant social tension on the coast, with traditional communities documenting the decline in catch and organising politically to protect their marine resource base.',
    ],
    quote: {
      text: 'A Koli fisherman can predict tomorrow\'s catch from the colour of today\'s sky, the direction of the breeze, and the way the dolphins are moving at sunset. No instrument competes.',
    },
    keyFacts: [
      { label: 'Koli settlement age', value: '4,000+ years on the Konkan coast' },
      { label: 'Fish auction time', value: 'Before 7 AM' },
      { label: 'Monsoon fishing ban', value: 'June–September (traditional Shravan ban)' },
      { label: 'Season opening', value: 'Narali Purnima — coconut full moon ritual' },
    ],
    highlights: [
      { title: 'Pre-Dawn Fish Auction', desc: 'The landing beach at 5 AM — fish arrived from the sea, auctioned by the basketful, loaded onto ice trucks, all before the town is awake.' },
      { title: 'Traditional Boat Building', desc: 'The last few workshops still building hodi and rampon in the traditional joinery style — in Malvan, Velas, and Karwar.' },
      { title: 'Narali Purnima', desc: 'The coconut-offering ceremony to the sea — the ritual opening of the fishing season watched by the entire village from the shore.' },
      { title: 'Overnight Fishing Trip', desc: 'Some Koli families take guests on overnight small-boat trips — a 9 PM departure, a 4 AM return, and the experience of fishing by moonlight.' },
    ],
    gallery: [
      'fishing-traditions.jpg',
      'fishing-village.jpg',
      'karwar-kali-estuary.jpg',
    ],
    thingsToDo: [
      'Wake before 5 AM to witness a fish auction on the landing beach',
      'Ask a Koli family to take you overnight fishing (requires personal connection)',
      'Watch the Narali Purnima ceremony at any fishing village (July/August)',
      'Visit the traditional boat-building workshop in Malvan',
      'Eat at a fisherman\'s home — the fish that didn\'t sell goes on the family table',
    ],
  },

  /* ── Sacred Groves ───────────────────────────────────────────────────── */
  'sacred-groves': {
    subtitle: 'The Protected Wild — Forests That Have Never Been Cut Because the God Forbids It',
    body: [
      'The sacred groves of Konkan — called devrais (god\'s forests) in Marathi — are patches of old-growth forest preserved entirely by religious prohibition. No tree may be cut, no animal may be hunted, no plant may be harvested without the deity\'s permission. This protection, maintained by belief rather than law, has created some of the most biodiverse forest remnants in the Western Ghats.',
      'A typical devrai is one to fifty hectares — larger than most people expect when they first encounter the concept. It is surrounded by agricultural land and human settlement on all sides. Step through the boundary marker (usually a stone with the deity\'s symbol) and the air changes immediately. The temperature drops. The bird calls multiply. The undergrowth is dense in a way that cultivated forest never achieves.',
      'The ecological value of devrais is now recognised by the scientific community — they are refugia for species that disappeared from the surrounding landscape centuries ago. Studies have documented plant species in devrais that are not found anywhere else within 50 kilometres. The local deity\'s prohibition is, from an ecological perspective, the most effective conservation policy ever implemented in the region.',
      'The spiritual life of the devrai is not a tourist attraction — it is an active religious institution. The gram devata (village deity) lives in the grove. Offerings are made at specific seasonal intervals. The grove is the site of the annual yatra. Access by outsiders is permitted in most cases but requires sensitivity to what the space is — not a forest walk, but a temple that happens to have trees.',
      'Climate change and population pressure are threatening the devrais from two directions simultaneously — the prohibition is weakening as traditional authority declines, and the edge effects of surrounding land use are degrading the grove interiors. Several NGOs are working with village communities to legally protect devrais alongside their traditional protection, creating a dual system that may prove more durable than either alone.',
    ],
    quote: {
      text: 'The devrai is the oldest conservation programme in India. It was never designed as conservation. It was designed as devotion. The result is the same.',
    },
    keyFacts: [
      { label: 'Devrais documented', value: '1,500+ in Maharashtra Konkan zone' },
      { label: 'Typical size', value: '1–50 hectares' },
      { label: 'Conservation status', value: 'Unprotected legally — protected by belief' },
      { label: 'Key documentation', value: 'Foundation for Ecological Research, Advocacy & Learning (FERAL)' },
    ],
    highlights: [
      { title: 'Aarey Colony Devrai (Mumbai)', desc: 'The last significant old-growth patch in Mumbai — a devrai that has survived urban development precisely because of its sacred status.' },
      { title: 'Sindhudurg District Groves', desc: 'Some of the largest and best-preserved devrais in Maharashtra — accessible by rural paths from most coastal villages in the district.' },
      { title: 'Botanical Rarities', desc: 'Devrais frequently contain plant species not found anywhere in the surrounding region — including orchids, rare ferns, and Ayurvedic plants cited in medieval texts.' },
      { title: 'Annual Grove Rituals', desc: 'Each devrai has its own seasonal ritual calendar — the specific ceremonies vary by community but always involve the whole village.' },
    ],
    gallery: [
      'sacred-groves.jpg',
      'waterfall-forest.jpg',
      'wildlife-sanctuaries.jpg',
    ],
    thingsToDo: [
      'Visit a devrai with a local guide who can introduce you to the gram devata tradition',
      'Join a devrai conservation project (volunteers welcome)',
      'Attend the annual devrai puja (ask your homestay host for the local date)',
      'Walk the boundary of the devrai to understand its relationship to the surrounding farmland',
    ],
  },

  /* ── Literature & Poets ──────────────────────────────────────────────── */
  'literature-poets': {
    subtitle: 'Voices from the Shore — A Written Tradition as Old as the Temples That Inspired It',
    body: [
      'The Konkan coast has an extraordinary literary tradition — not just as a subject of writing but as a place that made writers. The combination of a highly literate Brahmin community (the GSB and Chitpavan Brahmin traditions both had Sanskrit scholarship as their core practice), a maritime culture that valued record-keeping, and a landscape so dramatic it demanded language, produced a literary output far exceeding what the coast\'s small population would suggest.',
      'Keshavsuta (1866–1905) — born Krishnaji Keshavsuta Damle in Malgund village near Ratnagiri — is considered the father of modern Marathi poetry. He broke from the ornate, Sanskrit-inflected verse of the 19th century and wrote directly in common Marathi about common experience — the monsoon, the fishing boat, the smell of the earth after rain, the specific loneliness of a coastal village in winter. His revolution was in the diction, which was alive rather than literary.',
      'Rabindranath Tagore, though Bengali by birth, lived in Karwar (the south Konkan\'s northernmost town) in the 1880s as a young man while his brother was the district collector. The sea at Karwar shaped the imagery of his early poetry — the specific grey-green of the pre-monsoon Arabian Sea, the mangrove estuaries, the fishing village at dawn. The poems he wrote in Karwar were included in Gitanjali, for which he received the Nobel Prize in 1913.',
      'Narayan Surve (1926–2010), born in Ratnagiri to a fisherwoman mother, became one of Maharashtra\'s finest working-class poets — his verse spoke of the dockworker, the fisherman\'s wife, the migrant in the Mumbai chawl. His work connects the coast to the city in both biography and imagination.',
      'The contemporary Konkan literary scene is active in Goa — the Goa State Literary Festival (held annually at the Kala Academy) is one of India\'s best-curated literary events, bringing together writers in Konkani, Marathi, English, and Portuguese in a setting where the conversations themselves are bilingual and multilingual by default.',
    ],
    quote: {
      text: 'Keshavsuta wrote about the monsoon rain on the Konkan soil. It rains differently in Malgund after you have read him.',
    },
    keyFacts: [
      { label: 'Keshavsuta birth', value: 'Malgund village, Ratnagiri (1866)' },
      { label: 'Tagore in Konkan', value: 'Karwar, 1880s — shaped his Nobel work' },
      { label: 'Konkani literature award', value: 'Sahitya Akademi prize since 1978' },
      { label: 'Active literary festival', value: 'Goa State Literary Festival (annual, Kala Academy)' },
    ],
    highlights: [
      { title: 'Malgund (Keshavsuta\'s Village)', desc: 'A small village 20 km from Ratnagiri with a literary museum to the poet who invented modern Marathi verse — still largely unvisited.' },
      { title: 'Tagore Sarai, Karwar', desc: 'The house in Karwar where Tagore stayed — preserved as a memorial, with the sea view that shaped his Nobel-winning poetry.' },
      { title: 'Goa State Literary Festival', desc: 'One of India\'s best-curated literary festivals — multilingual, multigenre, and positioned at the most beautiful end of the coast.' },
      { title: 'Bhandarkar Oriental Research Institute', desc: 'In Pune but sustained by Konkan scholars — the institution that transcribed, translated, and preserved Sanskrit manuscripts including the critical edition of the Mahabharata.' },
    ],
    gallery: [
      'literature-poets.jpg',
      'ocean-cliffs.jpg',
      'coastal-landscape.jpg',
    ],
    thingsToDo: [
      'Visit Malgund village and the Keshavsuta memorial',
      'Find the Tagore Sarai in Karwar and sit on the veranda',
      'Attend the Goa State Literary Festival (January)',
      'Read Keshavsuta in Marathi (or in English translation by Vilas Sarang)',
      'Visit the Ratnagiri library\'s local history collection',
    ],
  },
};
