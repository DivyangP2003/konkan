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
    era: 'c. 2500 BCE onward',
    origin: 'Warli tribal belt of Palghar & Thane',
    description:
      "One of India's oldest continuous art traditions, Warli painting uses only circles, triangles, and squares — drawn from the sun, mountains, and trees the Warli people live among — to depict weddings, harvests, hunts, and the sacred Tarpa dance. Painted in white rice paste on a base of mud, cow dung, and red ochre, the art was traditionally made only by women, on the walls of homes, before weddings and harvest festivals as an act of ritual rather than decoration.",
    elements: ['Geometric forms', 'White rice-paste on ochre mud', 'Chauk (sacred wedding square)', 'Tarpa dance motif', 'Palghar & Dahanu clusters'],
    significance: 'A GI-tagged, still-practiced art form documented since the 10th century, kept alive today by Warli artist families around Ganjad and Dahanu.',
    color: '#c17f3a',
  },
  {
    id: 'dashavatar',
    title: 'Dashavatar',
    subtitle: 'All-Night Theatre of the Ten Avatars',
    image: '/assets/folk-dance.jpg',
    era: 'Brought to Konkan c. 1728 CE',
    origin: 'Ratnagiri & Sindhudurg, spreading to Raigad, Thane & Palghar',
    description:
      "Dashavatar is Konkan's own night-long theatre — part play, part prayer. A Sutradhar narrator opens every performance with the invocation 'Kalebua, Dashavtaras chala!', honouring Shyamji Naik Kale, the artist credited with carrying this Yakshagana-derived form from coastal Karnataka into Maharashtra. Actors in hand-painted wooden masks enact the ten avatars of Vishnu — beginning with Matsya rescuing the stolen Vedas from the demon Shankhasur — through drumbeats, improvised dialogue, and acrobatics that can run from midnight to sunrise.",
    elements: ['Ten Vishnu avatars', 'Hand-painted wooden masks', 'Sutradhar narrator', 'Performed by the Devali community', 'Sambal & dholki drums', 'Dashavatari Kala as prasad at dawn'],
    significance: "Traditionally performed by the Devali caste as a ritual duty to the village Gramdevata, timed around the winter rice cycle so farmers could double as artists in the off-season.",
    color: '#d45f2a',
  },
  {
    id: 'jakhadi',
    title: 'Jakhadi (Balya) Dance',
    subtitle: 'Circle Dance of the Monsoon Season',
    image: '/assets/folk-dance.jpg',
    era: 'Seasonal folk tradition',
    origin: 'Ratnagiri, known as Balya or Cheuli dance elsewhere in Konkan',
    description:
      "From the month of Shravan until Holi, Konkan's evenings fill with the beat of the dholki calling dancers into a circle. Musicians and singers sit at the centre while dancers — chall anklets tied to the right leg — move around them chanting 'Gana Dhav Re, Mala Paav Re,' often taking on the roles of Shiva and other deities. Known as Jakhadi in Ratnagiri, the same dance is called Balya or Cheuli in other parts of the Konkan coast.",
    elements: ['Circular formation around musicians', 'Dholki, jhanjh & mrudanga', 'Chall ankle bells', 'Call-and-response singing', 'Shravan to Holi season'],
    significance: 'A living seasonal ritual that turns ordinary village evenings into community gatherings, bridging monsoon devotion and the approach of Shimga.',
    color: '#3a9e6e',
  },
  {
    id: 'ganjifa',
    title: 'Sawantwadi Ganjifa',
    subtitle: 'Hand-Painted Round Playing Cards',
    image: '/assets/handicrafts.jpg',
    era: '350 years old, GI-tagged 2024',
    origin: 'Sawantwadi, Sindhudurg',
    description:
      "Ganjifa arrived in Sawantwadi with the Bhonsle royal family fleeing Portuguese Goa, and the Chitari community of artists who came with them turned it into a distinct regional craft. Each hand-painted circular card — built up from tamarind-glued paper, mud, and Arabic gum, then finished with watercolour and gold leaf — belongs to a suit depicting one of the ten avatars of Vishnu. A full Dashavatar deck runs to 120 cards, once used to teach mythology through play in royal courts and villages alike.",
    elements: ['120-card Dashavatar deck', 'Tamarind-paste & mud paper base', 'Chitari community artists', 'Hand-painted wooden storage boxes', 'GI tag granted January 2024'],
    significance: 'Nearly extinct four decades ago, the craft was revived by the Sawantwadi royal family and today survives through a handful of artisan families — the first Ganjifa tradition in India to receive a Geographical Indication tag.',
    color: '#c17f3a',
  },
  {
    id: 'gondhal',
    title: 'Gondhal',
    subtitle: 'Devotional Narrative Performance',
    image: '/assets/religious-mosaic.jpg',
    era: 'Medieval devotional tradition',
    origin: 'Villages across the Konkan coast',
    description:
      "Gondhal is performed to invoke the family's kuldevi — most often Renuka, Amba, or Tuljabhavani — usually after a wedding, a wish fulfilled, or a new home. A Gondhali performer, sanchi bells strapped to his ankles and a one-stringed tuntune in hand, sings the goddess's origin stories through the night while the family and neighbours gather to listen. It closes a household's ritual calendar the way Dashavatar closes a village's.",
    elements: ['Kuldevi invocation', 'Tuntune (one-string instrument)', 'Sambal drum accompaniment', 'Storytelling in verse', 'Household & temple performances'],
    significance: 'A household-level counterpart to village Dashavatar performances — devotion carried from door to door by hereditary performing families.',
    color: '#d45f2a',
  },
  {
    id: 'chitrakathi',
    title: 'Chitrakathi',
    subtitle: 'Picture-Story Narration',
    image: '/assets/folk-dance.jpg',
    era: 'Centuries-old, recently revived',
    origin: 'Pinguli village, Sindhudurg',
    description:
      "Chitrakathi artists tell epics — the Ramayana, Mahabharata, and regional legends — through sequences of hand-painted picture cards, narrated in verse and song as each card is revealed to the audience. The Thakar community of Pinguli has preserved this storytelling art alongside a related shadow-puppetry tradition, both nearly lost to time until dedicated revival efforts brought them back into public performance.",
    elements: ['Sequential hand-painted cards', 'Sung narration', 'Thakar community artists', 'Related shadow-puppet tradition', 'Pinguli Kalagram museum'],
    significance: "A rare surviving picture-narrative form of Konkan, recognised nationally and central to keeping the Thakar community's inherited craft alive.",
    color: '#3a9e6e',
  },
  {
    id: 'khele-kirtan',
    title: 'Khele & Kirtan',
    subtitle: 'Coastal Musical Theatre',
    image: '/assets/weddings-rituals.jpg',
    era: 'Medieval period to present',
    origin: 'Coastal villages of Konkan',
    description:
      "Khele is an umbrella term for the region's open-air performance traditions — devotional Kirtan storytelling, satirical village theatre, and seasonal deity worship — that vary from district to district but share the same coastal texture of call-and-response singing and community participation. Kirtankars weave scripture, humour, and local commentary into a single evening's performance, often resolving village disputes as much as entertaining.",
    elements: ['Call-and-response singing', 'Satirical social commentary', 'Kirtankar narrator-performer', 'Seasonal village calendar', 'Open-air temple courtyards'],
    significance: 'A social glue for coastal villages — these performances mark harvests, honour local gods, and give communities a shared, informal public square.',
    color: '#3a9e6e',
  },
  {
    id: 'tarpa-koli-songs',
    title: 'Tarpa & Koli Sea Songs',
    subtitle: 'Music of the Tribal & Fishing Belts',
    image: '/assets/fishing-traditions.jpg',
    era: 'Living oral tradition',
    origin: 'Warli hamlets & Koli fishing villages',
    description:
      "Two distinct musical worlds meet along the Konkan coast. Inland, the Warli community's gourd-and-bamboo tarpa wind instrument leads dancers in a slow, coiling circle at harvest time — the dance that Warli paintings themselves most often depict. On the shoreline, Koli fisherfolk sing raw, rhythmic sea shanties timed to net-hauling and boat launches, their lyrics about tides, catches, and courtship passed down entirely by ear.",
    elements: ['Tarpa wind instrument', 'Coiling circular dance', 'Koli boat-launch songs', 'Call-and-response net-hauling chants', 'Entirely oral transmission'],
    significance: "Two of Konkan's oldest living soundscapes — one tied to the paddy harvest, the other to the tide — both still performed without written notation.",
    color: '#2a8fb5',
  },
  {
    id: 'lacquerware',
    title: 'Sawantwadi Lacquerware & Wooden Toys',
    subtitle: 'The Craft Town of the Sahyadris',
    image: '/assets/handicrafts.jpg',
    era: 'Royal-patronage craft, still active',
    origin: 'Sawantwadi, Sindhudurg',
    description:
      'Sawantwadi has been Konkan\'s craft capital for generations, its lacquerware workshops turning local wood into vividly coloured toys, fruit sets, ganjifa boxes, and the famous "Sawantwadi ganjifa peti" — all finished with the same lac-based lacquering technique that gives the wood its glassy, saturated colour. The craft grew under royal patronage alongside Ganjifa painting and remains a family trade passed down through the town\'s artisan lanes.',
    elements: ['Lac-based lacquer finishing', 'Hand-turned wooden toys', 'Ganjifa storage boxes', 'Fruit & vegetable replica sets', 'Family workshop lineages'],
    significance: "A craft cluster that has kept Sawantwadi's artisan identity alive for over three centuries, still run out of the same old-town workshops.",
    color: '#c17f3a',
  },
  {
    id: 'powada',
    title: 'Powada',
    subtitle: 'Ballads of the Warrior Kings',
    image: '/assets/forts-of-konkan.jpg',
    era: '17th century onward',
    origin: 'Performed at forts across Sindhudurg, Raigad & Ratnagiri',
    description:
      "A Powada is a heroic ballad, sung standing, at full volume, to a single dholki beat — built to carry across a fort courtyard to a crowd that already knows the story of Shivaji's campaigns by heart. Shahirs (balladeer-poets) compose and recite these verses at Shiv Jayanti and other historical commemorations, treating each fort not as a ruin but as a stage their ancestors once stood on.",
    elements: ['Shahir balladeer tradition', 'Single-dholki accompaniment', 'Standing, full-voice recitation', 'Historical fort venues', 'Shivaji-era heroic verse'],
    significance: "Konkan's oral history in performance form — verses that have kept Maratha military history alive in public memory for over three centuries.",
    color: '#d45f2a',
  },
  {
    id: 'bhajani-mandal',
    title: 'Bhajani Mandal',
    subtitle: 'Devotional Singing Circles',
    image: '/assets/religious-mosaic.jpg',
    era: 'Ongoing community tradition',
    origin: 'Every Konkan village and temple courtyard',
    description:
      "Almost every Konkan village keeps a Bhajani Mandal — an informal group of devotional singers who gather at the local temple through Chaturmas, Ganeshotsav, and Ashadhi Ekadashi, singing abhangs and bhajans to cymbals and a single mridang. Membership passes through families for generations, and an all-night bhajan session, called jagran, remains one of the most common ways a Konkan village marks an important occasion.",
    elements: ['Abhang & bhajan repertoire', 'Taal (cymbals) and mridang', 'Jagran all-night sessions', 'Temple courtyard gatherings', 'Multi-generational membership'],
    significance: "The most everyday of Konkan's performing traditions — informal, communal, and repeated weekly in villages that may see Dashavatar only once a year.",
    color: '#2a8fb5',
  },
  {
    id: 'bharud',
    title: 'Bharud',
    subtitle: 'Satirical Devotional Song-Drama',
    image: '/assets/folk-dance.jpg',
    era: 'Saint-poet tradition, 16th century onward',
    origin: 'Performed across rural Konkan temple fairs',
    description:
      'Bharud disguises serious spiritual teaching inside comic performance — a single singer-actor takes on multiple characters, using humour, riddles, and everyday village situations to smuggle in philosophy from saint-poets like Eknath. At temple fairs it draws the biggest, loudest crowd of the evening, precisely because it never feels like a sermon.',
    elements: ['Single performer, multiple characters', 'Saint-poet verse (Eknath tradition)', 'Comic riddle format', 'Temple fair performances', 'Spiritual teaching through satire'],
    significance: 'Proof that devotion in Konkan rarely stays solemn for long — even its philosophy arrives with a punchline.',
    color: '#3a9e6e',
  },
];

// ── Festivals ─────────────────────────────────────────────────────────────────

export const festivals: Festival[] = [
  {
    id: 'ganeshotsav',
    title: 'Ganeshotsav',
    subtitle: 'Gauri-Ganpati of the Konkan Home',
    months: 'August – September',
    duration: '5–11 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "The Konkan coast pulses with an intimacy urban Ganeshotsav rarely has. Families return from Mumbai and Pune to install the same clay idol their household has welcomed for generations, in the very hall where their grandparents did. Gauri arrives alongside Ganpati in many homes — invited in as sisters, fed a lavish feast, and sent off days apart — while immersion processions wind through paddy fields and coastal roads down to the sea, fishing boats flanking the route.",
    highlights: ['Eco-friendly clay idols', 'Gauri-Ganpati home rituals', 'Multi-generational family idols', 'Sea & river immersion processions', 'All-night bhajans and aarti'],
    districts: ['Ratnagiri', 'Sindhudurg', 'Raigad', 'Thane', 'Palghar'],
    color: '#c17f3a',
  },
  {
    id: 'shimga',
    title: 'Shimga',
    subtitle: "Konkan's Own Holi",
    months: 'February – March',
    duration: '5–9 days',
    image: '/assets/folk-dance.jpg',
    description:
      "Shimga begins on Phalgun Purnima with the Holika Dahan bonfire, known locally as Shimga Jatra, where villagers offer coconut and grain while singing Shimga Geete. What follows is unique to Konkan: the village deity is carried house to house in a Palkhi so every family can seek its blessing, Dashavatar and Koli dance troupes perform through the night, and Rang Panchami — the actual colour-play — arrives days after the bonfire rather than on it, marking the end of the harvest season and the turn to spring.",
    highlights: ['Holika Dahan / Shimga Jatra bonfire', 'Palkhi house-to-house procession', 'Dashavatar & Koli Nrutya performances', 'Rang Panchami colour play', 'Village jatra folk theatre'],
    districts: ['Ratnagiri', 'Sindhudurg', 'Raigad', 'Thane'],
    color: '#2a8fb5',
  },
  {
    id: 'shivjayanti',
    title: 'Shiv Jayanti',
    subtitle: 'Birthday of the Warrior King',
    months: 'February – March',
    duration: '3 days',
    image: '/assets/forts-of-konkan.jpg',
    description:
      "Celebrated at Shivaji's own coastal forts — Sindhudurg, Vijaydurg, Raigad — Shiv Jayanti here is a living history lesson rather than a calendar holiday. Sword processions and dawn flag-hoisting ceremonies unfold on ramparts built for exactly this kind of defence, while Powada balladeers recite centuries-old verses of his campaigns to crowds who already know every line.",
    highlights: ['Fort-based reenactments', 'Powada ballad recitals', 'Sword processions', 'Dawn flag-hoisting at sea forts'],
    districts: ['Sindhudurg', 'Raigad', 'Ratnagiri'],
    color: '#d45f2a',
  },
  {
    id: 'narali-purnima',
    title: 'Narali Purnima',
    subtitle: "The Koli Fisherfolk's New Year",
    months: 'August (Shravan full moon)',
    duration: '1 day',
    image: '/assets/fishing-traditions.jpg',
    description:
      "For weeks before Narali Purnima, Koli families repair nets, repaint boats, and abstain from fishing as the monsoon sea stays too rough to sail. On the full moon, dressed in nauvari saris and gold jewellery, they carry decorated boats and a coconut-topped kalasha to the shore, cast coconuts into the waves as an offering to Varuna and Samudra Devata, and sail out on the season's first short trip before returning to a feast of narali bhaat.",
    highlights: ['Coconut offerings to the sea', 'Decorated boat processions', 'Purna kalasha ritual pot', 'First sail of the fishing season', 'Narali bhaat (coconut rice) feast'],
    districts: ['Mumbai', 'Thane', 'Raigad', 'Ratnagiri', 'Sindhudurg'],
    color: '#2a8fb5',
  },
  {
    id: 'velas-turtle-festival',
    title: 'Velas Turtle Festival',
    subtitle: 'Kasav Jatra — Olive Ridley Conservation',
    months: 'February – April',
    duration: 'Season-long (peak March)',
    image: '/assets/fishing-traditions.jpg',
    description:
      "In the quiet village of Velas, villagers and the NGO Sahyadri Nisarg Mitra run one of India's most quietly moving conservation efforts: guarding Olive Ridley turtle nests through the winter and releasing thousands of hatchlings to the sea each spring. Unlike a typical fair, the Kasav Jatra has no stage or spectacle — visitors sit on the sand at dawn or dusk to watch hatchlings make their short, determined crawl into the Arabian Sea.",
    highlights: ['Olive Ridley hatchling releases', 'Sahyadri Nisarg Mitra conservation walks', 'Village homestay hospitality', 'Bankot Fort & Harihareshwar nearby', 'Community-run, non-commercial festival'],
    districts: ['Ratnagiri (Velas, Anjarle, Kelshi)'],
    color: '#3a9e6e',
  },
  {
    id: 'gudi-padwa',
    title: 'Gudi Padwa',
    subtitle: 'The Konkani New Year',
    months: 'March – April',
    duration: '1 day',
    image: '/assets/religious-mosaic.jpg',
    description:
      "At dawn on Chaitra Shukla Pratipada, a gudi — a bright silk cloth atop a bamboo pole, crowned with neem leaves, marigold garlands, and an upturned copper kalash — is raised outside Konkani homes to mark the new year. Families begin the day with a bitter-sweet bite of neem and jaggery, said to prepare the body for the year ahead, followed by rangoli, sweets, and the first mango and cashew harvests of the season being shared between neighbours.",
    highlights: ['Gudi pole raised at dawn', 'Neem-jaggery ritual tasting', 'Rangoli & doorstep decoration', 'Puran poli and shrikhand feasts', 'First-of-season mango sharing'],
    districts: ['All Konkan districts'],
    color: '#c17f3a',
  },
  {
    id: 'ashadhi-ekadashi',
    title: 'Ashadhi Ekadashi',
    subtitle: 'Wari Pilgrimage Season',
    months: 'June – July',
    duration: '1 day (weeks of pilgrimage)',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Thousands of Konkan's Varkari devotees join the Wari, walking for weeks toward Pandharpur behind palanquins bearing the padukas of saint-poets, singing abhangs the entire way. In Konkan villages that don't send full palkhis, the day is still marked with an unbroken 24-hour fast, all-night kirtans, and community bhajans at the local Vitthal-Rakhumai temple.",
    highlights: ['Wari palanquin pilgrimage', 'Abhang devotional singing', '24-hour fasting', 'All-night kirtan sessions', 'Vitthal-Rakhumai temple worship'],
    districts: ['Ratnagiri', 'Sindhudurg', 'Raigad'],
    color: '#2a8fb5',
  },
  {
    id: 'nag-panchami',
    title: 'Nag Panchami',
    subtitle: 'Reverence for the Snake',
    months: 'July – August',
    duration: '1 day',
    image: '/assets/religious-mosaic.jpg',
    description:
      "On this Shravan festival, Konkan households avoid digging, ploughing, or frying food, out of respect for snakes and the earth they live in. Women draw snake images at the doorstep and offer milk at anthills believed to house cobras, while village fairs sometimes feature snake charmers displaying — and then respectfully releasing — cobras for public darshan.",
    highlights: ['Milk offerings at anthills', 'No-plough, no-fry day', 'Doorstep snake iconography', 'Snake charmer village fairs'],
    districts: ['All Konkan districts'],
    color: '#3a9e6e',
  },
  {
    id: 'makar-sankranti',
    title: 'Makar Sankranti',
    subtitle: "Til-Gul & the Sun's Turn",
    months: 'January',
    duration: '1–3 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "As the sun begins its northward journey, Konkani households exchange til-gul (sesame-jaggery sweets) with the line 'til gul ghya, god god bola' — take this sweet, speak sweetly. Coastal villages fly kites off rooftops and open fields, married women exchange haldi-kunku and small gifts at gatherings called Sankranti Haldi Kunku, and the day marks a quiet renewal of neighbourly ties before the harvest season closes.",
    highlights: ['Til-gul sweet exchange', "Haldi-kunku women's gatherings", 'Kite flying', 'Harvest-season closing rituals'],
    districts: ['All Konkan districts'],
    color: '#d45f2a',
  },
  {
    id: 'diwali',
    title: 'Diwali in Konkan',
    subtitle: 'Vasubaras to Bhaubeej',
    months: 'October – November',
    duration: '5 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Konkan's Diwali opens a day earlier than most of India, with Vasubaras — a ritual worship of cows and calves that reflects the region's agrarian roots. Homes are freshly limewashed, akashkandils (paper star lanterns) are strung along verandahs facing the road, and Narak Chaturdashi's pre-dawn oil bath is followed four days later by Bhaubeej, when sisters mark their brothers' foreheads and pray for their long life.",
    highlights: ['Vasubaras cattle worship', 'Akashkandil paper lanterns', 'Pre-dawn Narak Chaturdashi oil bath', 'Bhaubeej brother-sister ritual', 'Lakshmi Puja & fresh-limewashed homes'],
    districts: ['All Konkan districts'],
    color: '#c17f3a',
  },
  {
    id: 'gokulashtami',
    title: 'Gokulashtami',
    subtitle: 'Dahi Handi on the Coast',
    months: 'August – September',
    duration: '1–2 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Marking Krishna's birth, coastal towns form human pyramids to break a curd-filled handi strung high above the street — a tradition that in fishing communities doubles as a display of the same balance and teamwork used to haul nets. Temples stay open past midnight for Krishna Janmashtami darshan, with cradle-rocking ceremonies for the infant deity and devotional singing until dawn.",
    highlights: ['Dahi Handi human pyramids', 'Midnight Janmashtami darshan', 'Krishna cradle-rocking ritual', 'Community govinda troupes'],
    districts: ['Thane', 'Raigad', 'Ratnagiri'],
    color: '#2a8fb5',
  },
  {
    id: 'vat-purnima',
    title: 'Vat Purnima',
    subtitle: "Savitri's Vow Under the Banyan",
    months: 'May – June',
    duration: '1 day',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Married women fast and gather beneath a banyan tree, circling its trunk with cotton thread while praying for their husbands' long life — re-enacting the legend of Savitri, who is said to have won her husband Satyavan back from Yama at the foot of a vat tree. Village banyans on this day fill with women in fresh nauvari saris, turning an ordinary roadside tree into the day's most important shrine.",
    highlights: ['Banyan tree circumambulation with thread', 'Savitri-Satyavan legend retelling', 'Day-long fast by married women', 'Community gathering at village banyans'],
    districts: ['All Konkan districts'],
    color: '#3a9e6e',
  },
  {
    id: 'champa-shashthi',
    title: 'Champa Shashthi',
    subtitle: "Khandoba's Six-Day Vow",
    months: 'December',
    duration: '6 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Devotees of Khandoba, the warrior form of Shiva especially revered by shepherd and farming communities, observe a six-day fast broken with a distinctive non-vegetarian offering called Khandoba's Naivedya, followed by turmeric-yellow rice, vangi bharit (roasted brinjal), and bhakri shared communally. Village Khandoba temples hold night-long jagran vigils on the final day, Champa Shashthi itself.",
    highlights: ["Six-day fast for Khandoba", "Turmeric-yellow ritual rice", 'Vangi bharit & bhakri feast', 'Night-long jagran vigil'],
    districts: ['Ratnagiri', 'Sindhudurg', 'Raigad'],
    color: '#d45f2a',
  },
  {
    id: 'marleshwar-yatra',
    title: 'Marleshwar Yatra',
    subtitle: 'Mahashivratri at the Waterfall Cave Temple',
    months: 'February – March',
    duration: '1–2 days',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Thousands climb the stepped path along the Dhamnadi waterfall to the cave shrine of Marleshwar, a self-formed Shiva lingam in a natural rock cavern near Sangameshwar, for the annual Mahashivratri yatra. Pilgrims fast through the night, offer bel leaves and milk, and share in a langar-style community meal cooked on-site by volunteer village groups.",
    highlights: ['Waterfall-side stepped pilgrimage', 'Cave lingam shrine darshan', 'Overnight Mahashivratri fast', 'Community-cooked langar meal'],
    districts: ['Ratnagiri (Sangameshwar)'],
    color: '#2a8fb5',
  },
];

// ── Local Customs ─────────────────────────────────────────────────────────────

export const localCustoms: LocalCustom[] = [
  {
    id: 'weddings',
    title: 'Konkani Wedding Rituals',
    subtitle: '3–5 Day Ceremony Across Two Homes',
    image: '/assets/weddings-rituals.jpg',
    description:
      "A traditional Konkani wedding unfolds over three to five days, moving between both families' homes long before the couple ever reaches the mandap. It opens with the Sakhar Puda engagement, where sugar and a sari are exchanged, and closes with rituals that are as much about binding two households as two people — a maternal uncle carrying the bride to the altar, a silk Antarpat lowered to reveal the couple to each other for the first time, and an entire village invited to the Kelvan feast.",
    practices: [
      { name: 'Sakhar Puda', desc: 'Sugar and sari exchange marking engagement' },
      { name: 'Halad Chadavane', desc: 'Turmeric paste applied to bride and groom at dawn' },
      { name: 'Simant Puja', desc: "Bride's family washes the groom's feet on arrival" },
      { name: 'Antarpat', desc: 'Silk shawl lowered as couple see each other for the first time' },
      { name: 'Chuda', desc: 'Maternal uncle gifts the bride her wedding bangles' },
      { name: 'Kelvan', desc: 'Community feast preceded by a family deity puja' },
    ],
    color: '#c17f3a',
  },
  {
    id: 'fishing',
    title: 'Koli Fishing Traditions',
    subtitle: 'Life Governed by the Tide',
    image: '/assets/fishing-traditions.jpg',
    description:
      "The Koli community has worked the Konkan coast for millennia, and nearly every custom in a Koli household still answers to the sea. Boats are treated as family — blessed before every season, repainted by hand, never named carelessly. Marriage traditionally avoids the same totemic clan, and no family sends its men to sea on Narali Purnima before its women have tied rakhi, an order of ritual precedence still observed in older households.",
    practices: [
      { name: 'Boat blessing', desc: 'Annual puja before boats return to open water' },
      { name: 'Net weaving', desc: 'Hand-repaired nets, a skill passed within families' },
      { name: 'Clan exogamy', desc: 'Marriage prohibited within the same totemic clan' },
      { name: 'Dawn fish auction', desc: 'Daily open-air auction the moment boats dock' },
      { name: 'Koli sea songs', desc: 'Work chants sung while hauling nets and launching boats' },
    ],
    color: '#2a8fb5',
  },
  {
    id: 'gramdevata',
    title: 'Gramdevata & Village Jatra',
    subtitle: 'The Deity That Belongs to the Whole Village',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Nearly every Konkan village has a Gramdevata — a guardian deity whose temple sits at the heart of communal life, not just religious life. Once a year the deity's palanquin is carried in a jatra through every lane and field of the village so no household is left unvisited, accompanied by Dashavatar troupes, Gondhal singers, and Bhandara (turmeric powder) thrown skyward in celebration. Disputes are sometimes still settled before the deity, in the presence of village elders.",
    practices: [
      { name: 'Palkhi jatra', desc: "Deity's palanquin carried through every part of the village" },
      { name: 'Bhandara', desc: 'Turmeric powder thrown in celebration and blessing' },
      { name: 'Devak', desc: 'Family deity invoked before any major household ritual' },
      { name: 'Naivedya offerings', desc: 'Seasonal harvest offered to the Gramdevata first' },
      { name: 'Village panchayat by the shrine', desc: 'Community matters historically resolved near the temple' },
    ],
    color: '#d45f2a',
  },
  {
    id: 'harvest',
    title: 'Rice Harvest & Farming Customs',
    subtitle: 'Rituals of the Monsoon Paddy Cycle',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Konkan's single-crop rice farming is tied to a full ritual calendar of its own. Sowing begins only after Akshay Tritiya prayers for a good monsoon, transplantation is done to the rhythm of women's field songs called ovi, and the first grain of the new harvest is offered to the Gramdevata before any household eats from it. Bail Pola in Shravan sees farmers wash, decorate, and rest their bullocks for a full day in gratitude for a season of ploughing.",
    practices: [
      { name: 'Akshay Tritiya sowing', desc: 'Monsoon sowing begins with prayers for rainfall' },
      { name: 'Ovi field songs', desc: 'Women sing while transplanting rice saplings' },
      { name: 'Bail Pola', desc: 'Bullocks bathed, decorated and rested in gratitude' },
      { name: 'First-grain offering', desc: 'New harvest offered to the deity before household use' },
      { name: 'Toddy & coconut tapping', desc: 'Seasonal harvesting rituals for palm and coconut groves' },
    ],
    color: '#3a9e6e',
  },
  {
    id: 'homes',
    title: 'The Konkani Wada & Joint Family Life',
    subtitle: 'Homes Built for Generations',
    image: '/assets/forts-of-konkan.jpg',
    description:
      "The traditional Konkani home, or wada, is built low and long with laterite-stone (chirebandi) walls, a red Mangalore-tiled sloping roof to shed monsoon rain, and a wide open verandah — the osari — where most of daily life actually happens. Multiple generations often share one wada around a central courtyard with a tulsi vrindavan at its centre, and even newer homes in Konkan villages keep this footprint: deep eaves, a puja room facing east, and a working well or nearby stepwell.",
    practices: [
      { name: 'Chirebandi construction', desc: 'Load-bearing laterite stone walls suited to the coastal climate' },
      { name: 'Osari verandah', desc: 'Open porch used for guests, meals, and daily gathering' },
      { name: 'Tulsi Vrindavan', desc: 'Sacred basil plant kept at the courtyard centre' },
      { name: 'Kaul roof tiles', desc: 'Curved terracotta tiles engineered for heavy monsoon rain' },
      { name: 'Joint family courtyards', desc: 'Multiple generations sharing one ancestral home' },
    ],
    color: '#c17f3a',
  },
  {
    id: 'folk-belief',
    title: 'Folk Healing & Village Belief',
    subtitle: 'The Bhagat and Local Guardian Spirits',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Alongside temple worship, many Konkan villages still turn to a Bhagat — a traditional folk healer and spirit-medium — for matters modern medicine or formal religion doesn't fully address: unexplained illness, a difficult harvest, or a household believed troubled by a restless spirit. Local guardian figures like Vetal and Bapdev are worshipped at small roadside or forest shrines, often predating the arrival of any formal temple, and remain protectors of specific fields, wells, or stretches of coast.",
    practices: [
      { name: 'Bhagat consultation', desc: 'Folk healer sought for illness or misfortune' },
      { name: 'Roadside shrine worship', desc: 'Small shrines to local guardian spirits like Vetal' },
      { name: 'Angat Yene', desc: "Ritual trance possession believed to carry a deity's voice" },
      { name: 'Forest & field guardians', desc: 'Specific spirits believed to protect land and water sources' },
    ],
    color: '#2a8fb5',
  },
  {
    id: 'ancestor-rites',
    title: 'Ancestor & Remembrance Rituals',
    subtitle: 'Honouring Those Who Came Before',
    image: '/assets/religious-mosaic.jpg',
    description:
      "During Pitru Paksha, the fortnight before Navratri, Konkani families perform Shraddha — offering food, water, and prayers to departed ancestors, often feeding a crow first as a symbolic messenger before the family itself eats. Death anniversaries (tithi) are observed quietly each year with a simple home ritual, and elders are consulted on auspicious dates for every major family occasion, keeping ancestral memory an active, everyday part of Konkani life rather than a once-a-year formality.",
    practices: [
      { name: 'Shraddha offerings', desc: 'Food and water offered to ancestors during Pitru Paksha' },
      { name: 'Kaak-bali', desc: 'Symbolic food offering left for a crow before the family eats' },
      { name: 'Tithi observance', desc: "Annual quiet home ritual on a family member's death anniversary" },
      { name: 'Elder consultation', desc: 'Family elders consulted for auspicious dates before major rituals' },
    ],
    color: '#d45f2a',
  },
];

// ── Crafts & Livelihoods ────────────────────────────────────────────────────

export const craftsAndLivelihoods: ArtForm[] = [
  {
    id: 'alphonso-mango',
    title: 'Hapus Mango Cultivation',
    subtitle: 'The King of Fruits, Grown by Hand',
    image: '/assets/handicrafts.jpg',
    era: 'GI-tagged: Ratnagiri (2018), Devgad (2020)',
    origin: 'Ratnagiri, Devgad & Sindhudurg orchards',
    description:
      "Grown on laterite hillsides within reach of the Arabian Sea breeze, the Ratnagiri and Devgad Alphonso — locally called Hapus — is farmed the same patient way it always has been: hand-pollinated flowering watched over from December to February, fruit picked at exact maturity rather than early for transport, and ripened naturally on beds of rice straw instead of with chemical carbide. Whole villages organise around the March–May harvest, with grading, packing, and hay-bed ripening still done largely by hand in family orchards.",
    elements: ['Laterite hillside orchards', 'Hand-graded by size and aroma', 'Rice-straw natural ripening', 'December–February flowering watch', 'March–May harvest season'],
    significance: 'The only mango in India with region-specific GI protection — Ratnagiri Alphonso in 2018 and Devgad Alphonso in 2020 — legally distinguishing genuine Konkan-grown fruit from imitations sold under the same name.',
    color: '#d45f2a',
  },
  {
    id: 'cashew-kokum',
    title: 'Cashew & Kokum Processing',
    subtitle: "The Orchard Crops Behind Konkan's Pantry",
    image: '/assets/konkani-thali.jpg',
    era: 'Introduced by the Portuguese, 16th–17th century',
    origin: 'Sindhudurg & Ratnagiri backyards and orchards',
    description:
      "Every Konkani home with a bit of land grows a cashew tree or a kokum tree, or both. Cashews are hand-roasted over open flame to crack their toxic shell safely, then shelled and dried entirely by hand before reaching market — a slow, skilled process still largely done by women in small household units. Kokum fruit is sun-dried into dark, tangy amsul used in sol kadhi and fish curries, or pressed into kokum agal syrup, a monsoon-season cooling drink found in almost every Konkan kitchen.",
    elements: ['Open-flame cashew roasting', 'Hand-shelling & sun-drying', 'Amsul (dried kokum rind)', 'Kokum agal syrup pressing', 'Household-scale processing'],
    significance: 'A livelihood woven into the household economy — most families process cashew and kokum from their own trees rather than buying either at market.',
    color: '#c17f3a',
  },
  {
    id: 'coir-craft',
    title: 'Coir & Rope Making',
    subtitle: 'Coconut Husk Turned to Cord',
    image: '/assets/fishing-traditions.jpg',
    era: 'Generations-old coastal craft',
    origin: 'Coconut-growing villages along the entire coastline',
    description:
      "With coconut groves lining nearly every Konkan village, coir rope-making grew naturally out of what would otherwise be waste — husks are soaked, beaten, and hand-twisted into rope used for everything from boat rigging and fishing nets to cots and door mats. Older artisans still work the twisting wheel by hand in courtyards, a slow rhythmic craft increasingly rare as machine-made rope takes over.",
    elements: ['Husk retting & beating', 'Hand-twisted rope wheel', 'Boat rigging & net cord', 'Household mats & cots', 'Courtyard-based craft work'],
    significance: "A quietly disappearing craft that once supplied Konkan's fishing fleet with every rope it needed — now kept alive by a shrinking number of artisan households.",
    color: '#2a8fb5',
  },
  {
    id: 'boat-building',
    title: 'Traditional Boat Building',
    subtitle: 'The Machwa & Hodi of the Konkan Coast',
    image: '/assets/fishing-traditions.jpg',
    era: 'Generations-old maritime craft',
    origin: 'Boatyards at Harnai, Ratnagiri, Malvan & Vengurla',
    description:
      "Long before fibreglass trawlers, Konkan's coastline was built on wooden machwa and smaller hodi canoes, shaped plank by plank by boatwrights who measure by eye and experience rather than blueprint. A single boat can take weeks of hand-adzing, plank-fitting, and caulking with natural fibre before it ever touches water, and coastal boatyards still repair and build wooden vessels alongside the newer motorised fleet.",
    elements: ['Hand-adzed wooden planking', 'Natural-fibre seam caulking', 'Machwa (larger fishing boat)', 'Hodi (dugout-style canoe)', 'Harnai & Malvan boatyards'],
    significance: "A shipwright's craft passed down without formal schooling, still practiced in a handful of working boatyards that supply and repair Konkan's fishing fleet.",
    color: '#3a9e6e',
  },
  {
    id: 'bamboo-cane',
    title: 'Bamboo & Cane Craft',
    subtitle: 'Baskets, Mats & Everyday Tools',
    image: '/assets/handicrafts.jpg',
    era: 'Living household craft',
    origin: 'Forest-edge villages of the Sahyadri foothills',
    description:
      "In villages closer to the Sahyadri hills, bamboo and cane are worked into the tools of daily Konkan life — fish traps, harvest baskets, sieves, and the karvi grass-and-bamboo roofing panels still used on older homes. Woven entirely by hand without machinery, each piece is shaped for a specific job, from a tightly-woven rice-winnowing sup to a loosely-woven fish basket meant to drain water on the walk home from the shore.",
    elements: ['Hand-split bamboo strips', 'Woven fish traps & baskets', 'Rice-winnowing sup', 'Karvi grass roofing panels', 'Sahyadri foothill villages'],
    significance: "A functional, unglamorous craft that keeps Konkan's older farming and fishing tool-kit alive alongside modern plastic equivalents.",
    color: '#c17f3a',
  },
  {
    id: 'toddy-neera',
    title: 'Toddy & Neera Tapping',
    subtitle: 'The Coconut Palm as a Daily Livelihood',
    image: '/assets/konkani-thali.jpg',
    era: 'Traditional pre-dawn craft',
    origin: 'Coconut groves across the coastal belt',
    description:
      "Before sunrise, toddy tappers — traditionally from the Bhandari community — climb coconut palms freehand, without harness, to collect the sap of the flower spathe as sweet neera, which turns to fermented toddy (sur) within hours in the coastal heat. The climb itself is a specialised, physically demanding skill practiced daily, often by the same families for generations, and neera is prized locally as a refreshing, unfermented morning drink straight from the tree.",
    elements: ['Freehand pre-dawn palm climbing', 'Fresh neera vs. fermented toddy (sur)', 'Bhandari community tappers', 'Daily sunrise-to-morning harvest', 'Palm sap tapping tools'],
    significance: "A physically demanding, hereditary livelihood tied directly to the coconut economy that shapes much of Konkan's coastline.",
    color: '#d45f2a',
  },
  {
    id: 'fish-drying',
    title: 'Fish Drying & Bombil Curing',
    subtitle: 'The Sun-Dried Catch of the Konkan Coast',
    image: '/assets/fishing-traditions.jpg',
    era: 'Daily coastal livelihood',
    origin: 'Every fishing village from Palghar to Vengurla',
    description:
      "Not every catch reaches market fresh — bombil (Bombay duck), mackerel, and prawns too small or too plentiful for the day's auction are salted and laid out on bamboo racks along the shore to dry in direct sun and sea wind. Entirely women-run in most villages, sukat (dried fish) and dried bombil become pantry staples that carry the coast's flavour through the monsoon months when boats can't sail at all.",
    elements: ['Bamboo drying racks', 'Salt-curing by hand', 'Sukat (dried small fish/prawns)', 'Sun & sea-wind drying', 'Women-run village enterprise'],
    significance: 'A monsoon insurance system built entirely on skill and weather-reading — dried fish sustains coastal households through months when the sea itself is off-limits.',
    color: '#2a8fb5',
  },
  {
    id: 'shadu-idols',
    title: 'Clay Ganpati Idol Making',
    subtitle: "The Murtikars Behind Every Home's Idol",
    image: '/assets/religious-mosaic.jpg',
    era: 'Seasonal craft, months-long preparation',
    origin: 'Workshops across every Konkan town, active year-round',
    description:
      "Months before Ganeshotsav, murtikars (idol-makers) begin shaping shadu clay — a fine, eco-friendly river clay — into the idols that will fill Konkan homes by August. Many families still commission the same murtikar their household has used for generations, describing the exact posture and size passed down from their grandparents' idol, turning what looks like a craft transaction into another thread of ancestral continuity.",
    elements: ['Shadu (eco-friendly river clay)', 'Months-long seasonal preparation', 'Hand-modelled posture & detailing', 'Natural pigment finishing', 'Generational family commissions'],
    significance: "A craft economy timed entirely to one festival, yet central to how Konkan households experience continuity with their own family history.",
    color: '#c17f3a',
  },
];

// ── Language & Oral Heritage ────────────────────────────────────────────────

export const oralHeritage: LocalCustom[] = [
  {
    id: 'malvani-dialect',
    title: 'Malvani',
    subtitle: 'The Spoken Voice of Southern Konkan',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Spoken across Malvan, Devgad, Kudal, Kankavli, Sawantwadi and Vengurla, Malvani is a Konkani dialect carrying heavy Marathi influence, distinctive for softened consonants and a switch from 'la' to 'ka' in its pronouns. It has no script of its own and is written in Devanagari, but it has a real cultural presence — Malvani is the working language of Dashavatar performances and gives regional newspapers their sharpest, most affectionately mocking satire columns.",
    practices: [
      { name: 'Core Sindhudurg dialect', desc: 'Spoken natively across Malvan, Devgad, Kudal & Sawantwadi' },
      { name: 'Language of Dashavatar', desc: 'The performance language of Konkan folk theatre' },
      { name: 'Satirical press tradition', desc: 'Used for humour columns and local stage comedy' },
      { name: 'La-to-ka pronoun shift', desc: 'A defining grammatical marker distinguishing it from standard Marathi' },
    ],
    color: '#2a8fb5',
  },
  {
    id: 'konkani-mosaic',
    title: 'The Konkani-Marathi Linguistic Mosaic',
    subtitle: 'A Coast of Many Tongues',
    image: '/assets/religious-mosaic.jpg',
    description:
      "Travel the length of the Konkan coast and the language changes almost village by village. Chitpavani is spoken by Ratnagiri's Chitpavan Brahmin families, Koli and Aagri dialects belong to Thane and Palghar's fishing and farming communities, and Kudali marks the far south near Sindhudurg. All sit within the wider Marathi-Konkani language family, close enough to be mutually understood but distinct enough that a listener can usually place a speaker's home taluka within a sentence or two.",
    practices: [
      { name: 'Chitpavani', desc: 'Spoken among Chitpavan Brahmin families of Ratnagiri' },
      { name: 'Koli & Aagri', desc: 'Fishing and farming community dialects of Thane & Palghar' },
      { name: 'Kudali', desc: 'Southern dialect near the Sindhudurg-Goa border' },
      { name: 'Devanagari script', desc: 'Shared writing system across all regional dialects' },
    ],
    color: '#3a9e6e',
  },
  {
    id: 'mhani-opari',
    title: 'Mhani & Opari',
    subtitle: "Konkan's Proverbs & Riddles",
    image: '/assets/religious-mosaic.jpg',
    description:
      "Konkani households season everyday speech with mhani (proverbs) and opari (riddles) — short, often funny lines built from farm life, the sea, and household routine that carry generations of practical wisdom in a single sentence. Elders still correct or console with a well-timed proverb rather than a lecture, and entire local dictionaries have been compiled just to keep the wordplay from fading with each generation.",
    practices: [
      { name: 'Mhani (proverbs)', desc: 'Short wisdom-sayings drawn from farm, sea and home life' },
      { name: 'Opari (riddles)', desc: 'Traditional riddle games passed between generations' },
      { name: 'Elder correction through proverb', desc: 'Proverbs used in place of direct advice or scolding' },
      { name: 'Local proverb compilations', desc: 'Community efforts to document dialect-specific sayings' },
    ],
    color: '#c17f3a',
  },
  {
    id: 'kanni-lokved',
    title: 'Kanni & Lokved',
    subtitle: "Konkan's Oral Folk-Tale Tradition",
    image: '/assets/folk-dance.jpg',
    description:
      "Long before anything was written down, Konkani communities preserved their own body of knowledge as Lokved — literally 'people's lore' — an oral archive of Kanni (folk tales) passed from grandparent to grandchild on verandahs after dinner. These stories mix real village geography with spirits, clever animals, and moral lessons, and though a written Konkani literary tradition remains comparatively small, the oral one has never stopped growing.",
    practices: [
      { name: 'Kanni storytelling', desc: 'Folk tales told aloud, usually by grandparents to children' },
      { name: 'Lokved oral archive', desc: "The community's own term for its people's-lore tradition" },
      { name: 'Village-geography legends', desc: 'Stories anchored to real local wells, trees and shrines' },
      { name: 'Verandah evening custom', desc: 'Storytelling as a nightly, informal household ritual' },
    ],
    color: '#d45f2a',
  },
  {
    id: 'naming-nicknames',
    title: 'Village Names & Nicknames',
    subtitle: 'What Konkan Calls Its Own',
    image: '/assets/weddings-rituals.jpg',
    description:
      "A child's formal naming ceremony, Barsa, happens on the twelfth day after birth, when the family deity and household elders bless a name chosen partly by tradition and partly by horoscope. But almost every Konkani village runs on a second, informal naming system entirely its own — affectionate nicknames tied to a family house, a trade, or an ancestor's quirk, often used far more than the person's actual name for their entire life.",
    practices: [
      { name: 'Barsa naming ceremony', desc: "Twelfth-day ritual naming a newborn, guided by family elders" },
      { name: 'House-based nicknames', desc: "Informal names tied to a family's ancestral home or trade" },
      { name: 'Horoscope-guided naming', desc: 'First-letter naming conventions drawn from birth charts' },
      { name: 'Generational nickname inheritance', desc: 'Village nicknames often outliving the person who earned them' },
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
    { value: '46', label: 'Living traditions documented here' },
    { value: '4', label: 'GI-tagged Konkan crafts & produce' },
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
    crafts: "Behind every Konkan meal, home, and festival idol is a hand-made economy — orchards, boatyards, and household workshops that have supplied the coast for generations.",
    language: "Konkan speaks in layers — a dialect can shift within a few kilometres, and its oral tradition of proverbs, riddles, and folk tales still outpaces anything written down.",
  },
};
