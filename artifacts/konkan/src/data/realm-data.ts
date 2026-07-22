/**
 * realm-data.ts
 *
 * SOURCE OF TRUTH for all per-realm content on the Konkan website.
 * Edit this file directly on GitHub to add, update, or expand realm data.
 *
 * File location: src/data/realm-data.ts
 * Imported by:  src/data/realm-content.ts  (do not edit that file for content)
 *
 * ─── HOW TO EDIT ────────────────────────────────────────────────────────────
 * Each key matches a realm ID from src/data/sections.ts.
 * Fields:
 *   subtitle    — one poetic line shown beneath the title
 *   body        — 6–8 paragraphs (strings in an array)
 *   quote       — { text, attribution? }
 *   keyFacts    — [{ label, value }] — 5–6 items
 *   highlights  — [{ title, desc }] — 5–6 named places/things
 *   gallery     — image filenames in /public/assets/
 *   thingsToDo  — 6–8 actionable items
 *   bestTime    — plain string, e.g. "October – February"
 *   didYouKnow  — 2–4 surprising facts (strings)
 *   localTip    — one insider sentence
 *   warnings    — safety / etiquette notes (strings)
 * ────────────────────────────────────────────────────────────────────────────
 */

import type { RealmContent } from './realm-content';

export const realmContent: Record<string, RealmContent> = {

  /* ═══════════════════════════════════════════════════════════════════════════
     HISTORY
  ═══════════════════════════════════════════════════════════════════════════ */
  history: {
    subtitle: 'The Living Memory of a Coastal Civilization',
    body: [
      'The Konkan coast is one of India\'s oldest continuously inhabited shores — a cradle of Saraswat Brahmin culture, Maratha sea power, and ancient trade routes that reached Arabia, East Africa, and even Rome. Ashoka\'s edicts refer to the Aparantas — the people of this western coastal strip — nearly 2,300 years ago, making this among the earliest documented coastal communities in Asia.',
      'The Silhara dynasty, ruling from the ninth to the thirteenth centuries, carved rock-cut temples, commissioned Sanskrit inscriptions, and built the first systematic irrigation of the terraced hillside fields that still define the landscape. Their stone pillars — lime-white with early Konkani lettering — survive in obscure village shrines, still garlanded every new moon by families who cannot read the inscriptions but know they belong to them.',
      'Shivaji Maharaj transformed the meaning of sea power in India. His naval forts — Sindhudurg at Malvan, Vijaydurg on the Wagad coast, Suvarnadurg near Harnai, Jaigad at the Shastri river mouth — were not built on land but on rocky islands and estuarine headlands, constructed specifically to control maritime trade. None was ever taken by force. The architectural genius of Sindhudurg alone — 48 acres, walls 10 metres thick at the base, freshwater wells within a sea fort, the founder\'s handprint embedded in the wall — places it among the great military structures of the pre-modern world.',
      'Portuguese colonization, lasting four-and-a-half centuries in Goa and parts of the northern Konkan, left a legacy far more complex than conquest. Baroque churches in deep red laterite, Indo-Portuguese villas with tiled inner courtyards, an entire vocabulary of food — vinegar in the fish curry, the cashew in every garden, bebinca on the festival table — and the creolised Konkani language spoken by coastal Catholics today. The Portuguese encounter was violent and coercive at its onset, but what survived is a civilization that absorbed and transformed its colonial encounter into something it owns.',
      'The Peshwa era remade the hinterland — irrigation tanks, temple endowments, the patronage of Brahmin scholarship in Pune and Satara — but the coast remained stubbornly itself: maritime, multilingual, governed more by tide and trade than by any distant court. When the Peshwas attempted to tax the Konkan fishermen in the 18th century, the fishing communities simply rerouted their catch through channels the tax collectors couldn\'t reach. The coast has always known how to be ungovernable.',
      'The British administration that followed the Peshwas in 1818 brought the survey, the railway survey, and eventually the Konkan Railway — but also inadvertently nurtured, in Ratnagiri district, the intellectual ferment that would produce Tilak, Savarkar, and the literary revolution of Keshavsuta. The colonial encounter here generated, almost by inverse reaction, some of India\'s most forceful political thinking.',
      'Independence in 1947 did not end the colonial chapter for all of Konkan. Goa remained under Portuguese rule until December 19, 1961, when Operation Vijay — a 36-hour military action — ended 451 years of colonial presence. The liberation of Goa is remembered on the coast with a mixture of pride and sadness: pride at its restoration, sadness at how little the rest of India paid attention for forty years.',
    ],
    quote: {
      text: 'This coastline has seen empires come and go, and remained itself. That is its greatest historical achievement.',
      attribution: 'Konkan Heritage Trust, 2019',
    },
    keyFacts: [
      { label: 'Settled history', value: '2,300+ years (Ashokan reference)' },
      { label: 'Named sea forts', value: '300+ (coast-wide)' },
      { label: 'Portuguese presence', value: '451 years in Goa (1510–1961)' },
      { label: 'Dynasties recorded', value: 'Silhara, Kadamba, Maratha, Bijapur, Portuguese, British' },
      { label: 'Goa liberation', value: 'December 19, 1961 (Operation Vijay)' },
      { label: 'Sindhudurg built', value: '1664–1667 by Shivaji Maharaj' },
    ],
    highlights: [
      { title: 'Sindhudurg Fort', desc: 'Shivaji\'s 48-acre sea masterpiece at Malvan — walls 10 m thick, internal freshwater wells, a Shivaji temple, and the founder\'s handprint cast in the fort wall.' },
      { title: 'Murud-Janjira', desc: 'The only fort the Marathas, British, and Portuguese collectively failed to take by force over 350 years — an island stronghold of the Siddhi governors of the Bijapur Sultanate.' },
      { title: 'Vijaydurg (Gheria)', desc: 'The oldest Maratha sea fort, headquarters of Admiral Kanhoji Angre — who extracted tribute from the British East India Company for thirty years.' },
      { title: 'Chaul Ruins', desc: 'A ghost city near present Alibag — Arab warehouses, Portuguese churches, and British fortifications within a single kilometre, slowly returning to jungle.' },
      { title: 'Old Goa (UNESCO)', desc: 'The Baroque capital of Portuguese Asia — the Basilica of Bom Jesus (housing St Francis Xavier\'s remains), Se Cathedral, and the Church of St Cajetan, all intact after 500 years.' },
      { title: 'Vasai Fort', desc: 'The largest Portuguese military structure in Maharashtra — vast laterite ramparts stretching a kilometre, mostly ruined, almost entirely unvisited.' },
    ],
    gallery: [
      'murud-janjira-fort.jpg',
      'sindhudurg-fort-walls.jpg',
      'vasai-fort.jpg',
      'alibaug-kulaba-fort.jpg',
      'maritime-history.jpg',
      'forts-of-konkan.jpg',
    ],
    thingsToDo: [
      'Take the boat to Sindhudurg Fort from Malvan jetty at 7 AM before heat builds',
      'Visit Murud-Janjira at low tide when the causeway is partially exposed',
      'Drive the Ratnagiri–Vijaydurg road to find Vijaydurg at sunset',
      'Walk the laterite ruins of Chaul near Alibag with a local guide',
      'Explore the Fontainhas Latin Quarter in Panaji (guided walking tour)',
      'Visit the Archaeological Museum in Old Goa for Konkan maritime history',
      'Find the Silhara inscriptions at the Parashurama temple near Chiplun',
    ],
    bestTime: 'October – March (dry season; forts accessible, sea calm for boat trips)',
    didYouKnow: [
      'The foundation stone of Sindhudurg was laid by Shivaji himself — and lime mortar mixed with lead was used in the walls to make them impenetrable to cannon fire.',
      'Murud-Janjira has never been conquered in recorded history — not by Shivaji, his son Sambhaji, Chimaji Appa, the British, or the Dutch.',
      'The ancient port of Chaul is mentioned in the 1st-century CE Roman trade manual Periplus of the Erythraean Sea as "Suppara" — one of the first written references to a West Indian port.',
    ],
    localTip: 'For Sindhudurg, hire the local government boat early (₹50 per person) rather than private operators — it runs on the exact same schedule and the boatman usually doubles as an excellent informal guide.',
    warnings: [
      'Sea forts are accessible by boat only — check tide times before visiting, and avoid rough-sea months (June–September).',
      'At Murud-Janjira, negotiate the boat fare before boarding; fix a return time with the boatman.',
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     GEOGRAPHY
  ═══════════════════════════════════════════════════════════════════════════ */
  geography: {
    subtitle: 'Where Mountains Fold into the Sea in One Dramatic Gesture',
    body: [
      'Konkan is a narrow coastal plain — averaging just 50 kilometres in width — pinched between the near-vertical escarpment of the Western Ghats and the Arabian Sea. It stretches 720 kilometres from Dahanu creek in the north (Maharashtra) to Karwar in the south (Karnataka), encompassing most of Maharashtra\'s coastline, the entire coast of Goa, and a slice of coastal Karnataka. It is, in terms of landscape drama per kilometre, one of the most compressed terrains on Earth.',
      'The Ghats here are not a gradual slope. They drop from the Deccan plateau in a series of vertical scarps, ravines, and sheer rock faces — falling 1,200 metres in less than 20 horizontal kilometres. Rivers born in the high Ghats tumble through these scarps, often as free-fall waterfalls in the monsoon, before spreading into wide, calm estuaries lined with mangroves at the coast. The result is a landscape where you can stand on a beach and look directly up at a forest at 1,000 metres elevation — and the two worlds are separated by a 15-minute drive.',
      'The soil is laterite — a deep red-orange substrate formed from ancient Deccan Trap basalt leached by sixty million monsoons. Rich in iron and aluminium but poor in silica, it drains quickly and supports a specific suite of trees: cashew, mango, coconut, jackfruit, and areca nut. The red laterite road cutting through a green cashew grove is the most characteristic colour combination in the Konkan landscape.',
      'Six major river systems drain westward through the Konkan: the Ulhas (feeding Thane Creek), the Savitri (entering the sea at Bankot), the Vashishti (at Jaigad), the Jagbudi (at Anjarle), the Gad (at Bankot-south), and the Terekhol (the Goa–Maharashtra border). Each estuary is a distinct micro-world — wide tidal flats, mangrove corridors, still backwaters in the dry season, and a fish ecosystem of extraordinary richness.',
      'The coastline itself has no consistent personality. Black volcanic basalt headlands alternate with white quartz-sand beaches, then warm red laterite cliffs, then mangrove-fringed mudflat coves, then rocky inlets with boulders the size of houses. There are no two consecutive kilometres of Konkan coast that look identical.',
      'The climate is shaped entirely by the monsoon. The Western Ghats act as a massive barrier to the southwest monsoon winds — forcing moisture-laden air up the escarpment where it cools and releases torrential rain. Konkan receives 2,000–4,000 mm annually; the Ghats immediately behind can receive 6,000–7,000 mm. The result is that the coast is one of the wettest places on Earth during June–September, and then bone-dry from November to May.',
      'Sea surface temperatures along the Konkan coast range from 26°C in winter to 30°C at the height of summer. The pre-monsoon (April–May) generates visible upwelling events — cold, nutrient-rich bottom water rises to the surface, fuelling enormous plankton blooms that in turn drive the post-monsoon fish abundance that sustains the entire fishing economy of the coast.',
    ],
    quote: {
      text: 'The geography of Konkan is not scenery. It is the reason for everything — the food, the language, the gods, the temperament of the people.',
    },
    keyFacts: [
      { label: 'Coastline length', value: '720 km (Dahanu to Karwar)' },
      { label: 'Average coastal width', value: '50 km' },
      { label: 'Ghat escarpment drop', value: '1,200 m in under 20 km' },
      { label: 'Annual rainfall', value: '2,000–4,000 mm (coast); 6,000+ mm (Ghats)' },
      { label: 'Major river systems', value: '6 (Ulhas, Savitri, Vashishti, Jagbudi, Gad, Terekhol)' },
      { label: 'Sea temperature range', value: '26–30°C (year-round swimmable Oct–May)' },
    ],
    highlights: [
      { title: 'The Ghat Escarpment', desc: 'One of Earth\'s great topographic edges — the Sahyadri drops 1,200 m to the coast in under 20 km, creating waterfalls, canyon rivers, and a dramatic climate gradient.' },
      { title: 'Tarkarli Backwaters', desc: 'The Karli river meets the sea at Tarkarli in water clear enough to read a page through — coral patches visible from the surface, dolphin pods at dawn.' },
      { title: 'Harihareshwar Cliffs', desc: 'Laterite and basalt cliffs, 60 metres above the sea, at the Savitri river mouth — a temple on the very edge, waves breaking below.' },
      { title: 'Malvan Marine Sanctuary', desc: '29 sq km of protected reef with 200+ coral species and 300+ fish species — the most biodiverse marine zone on the Maharashtra coast.' },
      { title: 'Phansad Plateau', desc: 'A dry laterite plateau rising behind Murud, dotted with four-horned antelope and rare dry-forest birds — a landscape unlike any other on the coast.' },
      { title: 'Terekhol Estuary', desc: 'The river that marks the Maharashtra–Goa border, crossed by a 5-minute ferry — one of the most beautiful estuarine crossings in India.' },
    ],
    gallery: [
      'coastal-landscape.jpg',
      'harihareshwar-cliffs.jpg',
      'tarkarli-backwaters.jpg',
      'karwar-kali-estuary.jpg',
      'ocean-cliffs.jpg',
      'waterfall-forest.jpg',
    ],
    thingsToDo: [
      'Kayak the Karli backwaters at dawn for dolphin encounters and underwater coral viewing',
      'Trek the Tamhini Ghat in early monsoon when waterfalls cascade across the road',
      'Take the cliff walk at Harihareshwar at high tide for wave-spray drama',
      'Cross the Terekhol river by the 5-minute village ferry into Goa',
      'Drive the NH-66 coastal highway at night to understand the terrain\'s scale',
      'Visit Phansad plateau at dawn for four-horned antelope and open laterite landscape',
      'Swim in a Ghat river pool near Amboli before the monsoon swells them dangerous',
    ],
    bestTime: 'December – February (perfect coast weather); June – August (waterfall season, dramatic but wet)',
    didYouKnow: [
      'The Western Ghats are geologically older than the Himalayas — formed when India split from Gondwana 90 million years ago. The Himalayas were formed by India\'s collision with Asia 50 million years later.',
      'The Konkan coast\'s laterite is so porous that rainwater disappears almost immediately — which is why, despite receiving some of India\'s heaviest rains, the coast relies on wells and rivers, not surface water.',
      'The pre-monsoon coastal upwelling visible as a green colour change in the sea is caused by cold bottom water rising — the same process that makes the Konkan one of the most fish-rich coasts in Asia.',
    ],
    localTip: 'The best view of the Ghat escarpment from the coast is from any boat in the Vashishti or Savitri estuary at dawn — the wall of mountains behind the mangroves is a sight very few tourists ever see.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     CULTURE
  ═══════════════════════════════════════════════════════════════════════════ */
  culture: {
    subtitle: 'A Syncretism Born at the Intersection of Sea, Stone, and Centuries',
    body: [
      'Konkan culture is a living mosaic assembled over two millennia — Gaud Saraswat Brahmins who trace their origins to the Saraswati river valley; Koli fishermen who pre-date every other community on the coast by thousands of years; Christian communities shaped by four centuries of Portuguese encounter; Muslim traders descended from Arab merchants who sailed the monsoon winds; Siddhi communities descended from East African slaves of the Bijapur Sultanate; and dozens of artisan communities each with their own language, ritual sequence, and aesthetic tradition.',
      'The Konkani language is the clearest evidence of this civilizational blending. It carries Sanskrit morphological structure, Dravidian phonological tendencies, Portuguese loanwords embedded in the kitchen and the calendar, Arabic commercial vocabulary in the market, and Marathi administrative vocabulary absorbed over three centuries of Peshwa and later British rule. To speak Malvani Konkani fluently is to carry an ocean of history in your mouth without knowing it.',
      'Konkani culture prizes restraint over spectacle and depth over display. The temples are low-plastered laterite structures, not towering gopurams. The proverbs are compact and salt-bitten. Hospitality is assumed, never performed — the guest eats before the host, and the host does not tell you so. This aesthetic of understatement runs through the architecture, the cuisine, and the manner of conversation.',
      'The Dashavatar theatre tradition has been performed continuously for over 2,000 years — dramatizing the ten incarnations of Vishnu through elaborate makeup, masks, and all-night recitation in sung verse, before an audience that has attended since childhood and knows every line. It is not entertainment; it is the architecture of the community\'s time. The distinction matters on the Konkan coast, where ritual and art are not separate categories.',
      'Caste communities that might live in tension elsewhere in India share festival grounds, fishing access, and market days on the Konkan coast. The Koli fisherman and the GSB Brahmin trade at the same Thursday market; the Muslim trader and the Hindu farmer share the same riverbank. This coexistence is not post-modern pluralism — it is the pragmatic outcome of communities who have shared a narrow coastal strip for two thousand years and know that the sea is indifferent to caste.',
      'The architecture of the traditional Konkan home — laterite-block walls, Mangalore-tile roof, carved wooden doorway, inner courtyard, back kitchen — is a complete cultural manifesto. The cool, dim interior smells of coconut oil and earth. The veranda faces the orchard, not the road. The tulsi plant in the central courtyard is the household deity\'s address. Every spatial decision embeds a value.',
      'The GSB (Gaud Saraswat Brahmin) kitchen is a self-contained cultural world. No onion, no garlic, but extraordinary complexity from kokum, teppal (a local spice related to Sichuan pepper), raw mango, yogurt, and coconut milk used in a dozen different ways. The GSB saraswat thali — fifteen to twenty elements in precise sequence — is among the most sophisticated vegetarian meal systems in the world, and it is entirely specific to this coast.',
    ],
    quote: {
      text: 'येवा, ताक-भात खावा, अन् आपलोच घर समजा! — Come, eat rice and buttermilk curry, and consider this your own home.',
      attribution: 'Traditional Malvani Konkani greeting',
    },
    keyFacts: [
      { label: 'Major communities', value: 'Malvani, GSB, Koli, CKP, Christian, Siddhi, Muslim, Warli, Katkari' },
      { label: 'Dashavatar tradition', value: '2,000+ years continuous' },
      { label: 'Konkani dialects', value: '12+ distinct variants' },
      { label: 'GSB wedding feast', value: '15–25 dishes in prescribed sequence' },
      { label: 'UNESCO recognition', value: 'Western Ghats World Heritage Site (2012)' },
      { label: 'Koli settlement age', value: '4,000+ years on this coast' },
    ],
    highlights: [
      { title: 'Dashavatar Folk Theatre', desc: 'Full-night masked performance tradition — gods, demons, and devotion on a village ground, with an audience three generations deep.' },
      { title: 'The GSB Kitchen', desc: 'Vegetarian cuisine of extraordinary complexity — no onion, no garlic, but kokum, teppal, and coconut milk producing flavours no other cuisine reaches.' },
      { title: 'Koli Fishing Culture', desc: 'The coast\'s original community — 4,000 years of ecological knowledge embedded in their boats, their songs, and their fish-landing rituals.' },
      { title: 'The Village Devchar', desc: 'Every Konkan village has a deva — a local deity with their own priest, feast calendar, and architectural tradition. No two are identical.' },
      { title: 'Siddhi Music', desc: 'The Siddhi community, descended from East African sailors, preserved African percussion and call-and-response traditions intact for 400 years in coastal villages.' },
      { title: 'Goan Catholic Synthesis', desc: 'Where the Latin Mass meets Konkani verse, where the feast-day food is identical to the Hindu festival meal with pork added, and where the same family runs the temple committee and the church committee.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'temple-carvings.jpg',
      'religious-mosaic.jpg',
      'weddings-rituals.jpg',
      'fishing-village.jpg',
    ],
    thingsToDo: [
      'Attend a Dashavatar night performance in a Sindhudurg coastal village (December–March)',
      'Visit the Malvan Saturday market where all communities trade side by side',
      'Stay in a GSB household in Malvan or Karwar for a traditional Saraswat thali',
      'Witness Shigmo processions in a Goa village (March)',
      'Visit the Siddhi community in Murud to hear their African-origin music (Dhammal)',
      'Attend a Narial Purnima ceremony at a Koli fishing village (July/August)',
      'Find a village devchar by walking the rural paths between coastal settlements',
    ],
    bestTime: 'November – March (festival season, most cultural events, best weather)',
    didYouKnow: [
      'The Siddhi community of the Konkan coast are descended from East African Bantu-speaking sailors and soldiers who came to India with the Bijapur Sultanate in the 16th century — and have maintained distinctly African musical traditions in coastal Maharashtra for over 400 years.',
      'The Bene Israel Jewish community of Alibag claims to have arrived on the Konkan coast after a shipwreck 2,000 years ago — making them one of the oldest Jewish diasporic communities in the world, predating the destruction of the Second Temple.',
    ],
    localTip: 'For the most authentic Dashavatar experience, don\'t look for advertised performances — ask your homestay host which village is holding a "natak" in the coming days. The unadvertised village performances are the real thing.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     ART
  ═══════════════════════════════════════════════════════════════════════════ */
  art: {
    subtitle: 'Craft Traditions Born from Laterite, Teak, Shell, and an Eye for What Lasts',
    body: [
      'The art and craft traditions of the Konkan coast are as geographically specific as the terrain they emerged from. They use what the land provides — laterite block for temple foundations, teak from the Ghat forests for door frames and deity panels, coconut shell for utensils and instruments, cowrie and spiral shells for jewellery, and the red-orange earth itself for terracotta votive offerings. Nothing comes from far away; everything is a conversation with the immediate environment.',
      'Sawantwadi\'s lacquerware is the most internationally recognized Konkani craft tradition — wooden toys, fruit sculptures, chess sets, and decorative panels decorated with intricate lac painting by the Chitrakathi community of the former Sawantwadi princely state. The royal palace in Sawantwadi still hosts the working workshop. The craft received Geographical Indication status in 2011, protecting its name from imitation. The painted wooden mango looks real enough that crows attempt to eat it.',
      'Temple woodcarving along the Malvan-Vengurla-Ratnagiri coast is a distinct school of Indian carving — confident, muscular, narrative, and specific to this coastline. The figures emerge from the wood fully formed, not excavated — the carver\'s art is one of reduction, not addition. Vishnu with his conch, Lakshmi attended by elephants, the horses of the naval commander, the sea-facing Ganesha — each panel narrates a mythology the carver\'s grandfather knew.',
      'Warli painting, though associated with the tribal communities of the Palghar and Thane districts to the north, has its deepest roots in northern Konkan. The geometric figures rendered in white rice paste on red-mud walls encode the agricultural calendar, the cosmic order, and the genealogy of the human family in a visual language so abstract it took modern art historians decades to decode. It has since influenced graphic designers worldwide — without attribution, typically.',
      'Terracotta work at Bankot, Rajapur, and the temple-serving communities of Ratnagiri district produces votive horses, elephants, and deity figures in forms unchanged since the early medieval period. The clay is the same red laterite substrate the landscape is built from. The firing is done in a pit in the orchard. The making is a ritual as much as a craft — the potter prays before beginning, and the form that emerges is considered as much found as made.',
      'Shell craft along the Ratnagiri and Sindhudurg coasts uses cowrie, turban, spiral, and cone shells combined with sea glass, driftwood, and local beads. It began as a cottage occupation for fishing families — making use of what the sea offered in its off-hours. The best contemporary shell artists of Ratnagiri are now exhibited in craft galleries in Mumbai and exported to Europe — maintaining the same formal vocabulary in a new economic register.',
      'The Goa tradition of azulejo (decorative tile) painting, inherited from Portuguese tile-making practice and then adapted by Goan artists into their own vocabulary, is finding a second life. Young Goan artists are reviving hand-painted tile work for architectural installation — and the results combine Portuguese geometry with Konkani flora-fauna imagery in ways that feel entirely contemporary.',
    ],
    quote: {
      text: 'The craftsman does not put his name on his work. The work carries the name of the village.',
    },
    keyFacts: [
      { label: 'GI-tagged craft', value: 'Sawantwadi lacquerware (2011)' },
      { label: 'Chitrakathi tradition', value: '400+ years, Sawantwadi palace' },
      { label: 'Warli GI recognition', value: 'Warli Painting (Maharashtra, 2011)' },
      { label: 'Active carving schools', value: 'Malvan, Vengurla, Ratnagiri district' },
      { label: 'Annual Sawantwadi output', value: '50,000+ lacquerware pieces' },
      { label: 'Shell craft markets', value: 'Ratnagiri craft fair (January), Ganpatipule' },
    ],
    highlights: [
      { title: 'Sawantwadi Palace Workshop', desc: 'The live lacquerware atelier in the Sawantwadi royal palace — craftsmen turning lathe-spun wood and natural lac into painted fruit, animals, and chess sets.' },
      { title: 'Temple Woodcarving (Malvan)', desc: 'The workshop-schools adjacent to major Malvan temples, where master carvers teach apprentices the same narrative vocabulary used for 600 years.' },
      { title: 'Warli Art Villages', desc: 'Jawhar and Mokhada in the northern Konkan hinterland — the originating communities of the geometric white-on-red painting tradition that influenced global design.' },
      { title: 'Ratnagiri Terracotta', desc: 'Pit-fired votive horses and deity figures from Ratnagiri district — mentioned in 12th-century temple inscriptions, still made to the same proportions.' },
      { title: 'Goa Azulejo Revival', desc: 'Young Goan artists hand-painting decorative tiles in a synthesis of Portuguese geometry and Konkani imagery — sold at studios in Panjim and Mapusa.' },
      { title: 'Shell Art of Sindhudurg', desc: 'Ratnagiri and Malvan coast shell craft — from fishermen\'s cottage industry to exhibited contemporary craft, using the same vocabulary of form and colour.' },
    ],
    gallery: [
      'handicrafts.jpg',
      'sawantwadi-palace-crafts.jpg',
      'temple-carvings.jpg',
      'warli-art.jpg',
    ],
    thingsToDo: [
      'Visit the Sawantwadi Palace craft workshop on a weekday morning (open Tuesday–Sunday, 10 AM–5 PM)',
      'Take a Warli painting workshop in Jawhar, Palghar district (arranged at the tribal museum)',
      'Commission a carved wooden panel directly from a temple carver in Malvan',
      'Browse the Ratnagiri craft fair in January for the full range of coastal craft',
      'Visit the contemporary Goa tile studios in Fontainhas, Panaji',
      'Find shell art jewellery at the beach stalls near Ganpatipule temple',
      'Attend the Kala Academy craft exhibition in Panaji (winter season)',
    ],
    bestTime: 'October – February (craft fairs season, workshops most active)',
    didYouKnow: [
      'Warli painting was "discovered" by the western art world only in the 1970s — but the tradition was already at least 2,500 years old, documented in references to similar geometric wall painting in ancient Sanskrit texts.',
      'The lacquerware fruits of Sawantwadi use a technique involving natural lac (from lac insects), not synthetic varnish — producing a depth and translucency that synthetic alternatives cannot replicate.',
    ],
    localTip: 'Buy lacquerware directly at the Sawantwadi palace workshop, not from the shops near the bus stand — the palace sells at fixed prices and the quality is guaranteed authentic.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     MUSIC
  ═══════════════════════════════════════════════════════════════════════════ */
  music: {
    subtitle: 'Songs That Know the Weight of the Sea and the Length of the Monsoon Night',
    body: [
      'The folk music of the Konkan coast is a working music — not performed for audiences but performed for the labour it accompanies. The ovye (fisherwomen\'s waiting songs), the bharud (devotional performance poetry), the gondhal (nocturnal ritual music), the tarpa (the gourd flute of the tribal communities) — each is tied to a specific time of year, a specific social function, and a specific understanding of what music is for.',
      'The tarpa is the most distinctive sound of the northern Konkan tribal landscape. Made from a gourd with a bamboo mouthpiece and a tin horn attached, it produces a continuous drone that sounds like it comes from the ground rather than a human breath. It is played at harvest time, at weddings, at funerals — by Warli, Katkari, and Kokna musicians in the northern coastal hinterland. The sound carries a kilometre across flat coastal terrain on a still evening.',
      'The ovye — fisherwomen\'s songs sung while waiting for the boats to return — are some of the oldest unwritten music on the coast. Short, repetitive, built on two or three notes, they encode tidal knowledge, seasonal fishing patterns, and the specific geography of a hundred named fishing grounds. The women who sing them do not think of them as music — they think of them as the correct way to wait.',
      'The Dashavatar performance is the coast\'s most complete musical tradition — the mridangam (two-headed drum), the taal (cymbals), and the harmonium underpin an all-night recitation of divine stories in sung verse, with the lead performer improvising elaborations around the narrative spine for an audience that knows the text as well as the singer. The improvisations — called tarangas — can last forty-five minutes on a single phrase.',
      'In Goa, the mando is the music of mixed heritage: a slow, melismatic song form in Konkani and Portuguese, developed by the Catholic communities of Goa in the 19th century for drawing-room performance. The mando is to Goa what the fado is to Portugal — emotionally specific, formally distinct, and completely impossible to perform convincingly if you did not grow up hearing it.',
      'The Lavani tradition of Maharashtra has a Malvani coastal variant that is earthier and more rhythmically wild than the inland form. The coastal lavani is tied to the fish-market economy and the agricultural calendar — women performers sing of the sea, the mango season, the particular loneliness of a fisherman\'s wife during the monsoon ban. The best Malvani lavani performers are local celebrities in Sindhudurg district.',
      'Contemporary music from the Konkan coast includes a remarkable body of Konkani pop and film music — particularly from the Goan Catholic tradition — that blends Mando sentiment with Western chord progressions, and from Mangalorean musicians who have developed a Konkani gospel tradition that combines Dravidian rhythm structures with Protestant harmonic forms. The coast continues to make new music from old ingredients.',
    ],
    quote: {
      text: 'In Konkan, you don\'t just hear the music. The music tells you what time of year it is, what the weather will be, and whether the boats are in.',
    },
    keyFacts: [
      { label: 'Key folk instruments', value: 'Tarpa, Ghumat, Mridangam, Dholki, Sambal, Taal, Shehnai' },
      { label: 'Dashavatar tradition', value: '2,000+ years (December–March season)' },
      { label: 'Mando — Goa', value: 'Recognized by Sangeet Natak Akademi' },
      { label: 'Ovye performers', value: 'Koli women, all coastal districts' },
      { label: 'Ghumat', value: 'Goa\'s clay drum — made from earthen pot, used in Shigmo' },
      { label: 'Tarpa players', value: 'Warli, Katkari, Kokna communities — northern Konkan' },
    ],
    highlights: [
      { title: 'Tarpa Music', desc: 'The gourd-and-tin wind instrument of the Warli and Katkari communities — a continuous drone that has accompanied harvest, wedding, and death for at least 2,500 years.' },
      { title: 'Dashavatar Night Performance', desc: 'December to March: whole villages gather for an overnight sung recitation of the ten Vishnu incarnations. The lead performer improvises; the audience corrects errors.' },
      { title: 'The Mando of Goa', desc: 'Slow, melismatic, bilingual in Konkani and Portuguese — the mando is the sound of 450 years of cultural encounter distilled into a drawing-room song.' },
      { title: 'Ghumat Drumming', desc: 'Goa\'s clay pot drum — struck with bare hands in a specific rhythm pattern unique to Shigmo and Ganesh celebrations in coastal Catholic and Hindu villages alike.' },
      { title: 'Ovye Singers', desc: 'Koli fisherwomen singing waiting songs at the shore — two-note, repetitive, loaded with tidal knowledge and the specific loneliness of a maritime life.' },
      { title: 'Konkani Pop (Goa)', desc: 'A living contemporary tradition blending Mando sentiment with Western pop — performed at weddings, fiestas, and increasingly on streaming platforms.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'fishing-village.jpg',
      'religious-mosaic.jpg',
    ],
    thingsToDo: [
      'Attend a Dashavatar night performance in a Sindhudurg village (December–March)',
      'Watch a tarpa procession during the harvest festivals in Palghar or Thane district (October)',
      'Attend a mando performance at Goa Kala Academy (winter season)',
      'Visit the International Folk Music Festival in Panaji (January)',
      'Listen to live Malvani lavani at a Sindhudurg village fair (winter)',
      'Find a fishing village with an active ovye tradition — ask your homestay host',
    ],
    bestTime: 'December – March (Dashavatar and festival music season)',
    didYouKnow: [
      'The Ghumat drum of Goa is made from a broken clay pot — specifically an earthen water pot with the bottom broken off, with a monitor lizard skin stretched over the opening. No metal is used in its construction.',
      'The Mando was developed by Goan Catholics in the 19th century partly as a way to perform at social occasions without using instruments associated with either Hindu temple music or Portuguese church music — creating a third, distinctly Goan social music.',
    ],
    localTip: 'For Dashavatar, arrive by 9 PM to get a good position — the performance often starts late but the pre-performance setup and makeup ritual, visible to the audience, is as fascinating as the show itself.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     CUISINE
  ═══════════════════════════════════════════════════════════════════════════ */
  cuisine: {
    subtitle: 'Fire, Kokum, Coconut — and the Freshest Catch on the Subcontinent',
    body: [
      'Konkani cuisine is built on three pillars: the coconut, the kokum, and the catch. Everything else — the chilli blends, the souring agents, the slow-cooked gravies — orbits these three ingredients and their daily availability. The coconut provides fat, sweetness, and body. The kokum (dried Garcinia indica rind) provides the sour-sweet note and a colour that turns broth the colour of sunset. The fish — cut hours ago, cooked within the hour — provides the reason for the other two.',
      'Tirphal (Zanthoxylum rhetsa, a berry related to Sichuan pepper) is the spice that most identifies Konkani food to anyone who has eaten it before. It produces a numbing, citrusy warmth that is entirely unlike any other spice in the Indian repertoire. A Malvani fish curry without tirphal is technically possible but socially unacceptable.',
      'Malvani cuisine is the coast\'s most distinctive strand — built on dried Malvani red chilli, freshly extracted coconut milk, and fish that was alive two hours ago. The canonical Malvani meal is fish curry with white rice on a banana leaf, a glass of sol kadhi (kokum beaten with coconut milk, garlic, and cumin) on the side, and a sliver of raw onion. There is no improving this. Attempts to do so are a failure of imagination.',
      'The GSB (Gaud Saraswat Brahmin) kitchen is a vegetarian world of extraordinary complexity — no onion, no garlic, but fifteen ways to use coconut, five ways to use kokum, and a familiarity with raw mango, jackfruit, colocasia, and drumstick leaves that produces a thali of twenty elements, each speaking to the others. The GSB saraswat thali is the most sophisticated vegetarian meal in Maharashtra and arguably in India.',
      'Goan cuisine diverges in ways that reflect four centuries of Portuguese encounter. Vinegar entered the pork dishes (vindaloo from vinho d\'alhos; sorpotel from sarapatel). The bebinca — a sixteen-layer coconut-and-egg pudding baked one layer at a time — is the architecture of patience. Feni, distilled from cashew apple or coconut toddy, is the spirit of a coast that learned distillation from the Portuguese and immediately improved on the lesson by using local raw material.',
      'The fish itself deserves a taxonomy. Bombil (Bombay duck) is dried and fried to a brittle crisp eaten as a condiment. Bangda (Indian mackerel) is the everyday fish — grilled over charcoal, curried with coconut milk, pickled with tamarind. Surmai (kingfish) is the celebratory fish — large, firm-fleshed, cooked in a thicker gravy with groundnut. Pomfret — silver, flat, and expensive — is the prestige fish of the GSB kitchen. Kolambi (tiger prawns) from the Tarkarli backwaters are the most expensive item on any Konkan menu and worth every rupee.',
      'The sweets of the coast are architectural: modak (steamed rice-flour dumplings filled with jaggery and coconut), puranpoli (flatbread filled with sweet lentil paste and ghee), and karanji (fried pastries filled with coconut-and-sugar mixture). Kokum sharbat — cold, magenta, simultaneously sweet and sour — is the coast\'s summer drink, its digestif, and its welcome.',
    ],
    quote: {
      text: 'The Konkani cook does not measure. She knows. The coconut tells her when it is ready. The fish tells her when it is done.',
    },
    keyFacts: [
      { label: 'Signature souring agent', value: 'Kokum (Garcinia indica) — only grows on this coast' },
      { label: 'Defining spice', value: 'Tirphal (Zanthoxylum rhetsa) — unique to Konkan cuisine' },
      { label: 'Staple fish', value: 'Bangda, Bombil, Surmai, Pomfret, Kolambi (prawns)' },
      { label: 'Feni types', value: 'Cashew feni (Apr–Jun); coconut toddy feni (year-round)' },
      { label: 'GSB thali elements', value: '15–25 dishes in prescribed sequence' },
      { label: 'Sol kadhi', value: 'Kokum + coconut milk — digestif, welcome drink, and pink pleasure' },
    ],
    highlights: [
      { title: 'Malvani Fish Curry', desc: 'Dried Malvani chilli, coconut milk, tirphal, and the morning\'s catch — served on a banana leaf with white rice. The canonical Konkani meal.' },
      { title: 'Sol Kadhi', desc: 'Pink, cooling, simultaneously sour and creamy — kokum and coconut milk beaten with garlic and cumin. Drink it with the meal or after.' },
      { title: 'Bebinca (Goa)', desc: 'Sixteen layers of coconut-and-egg batter, each baked separately before the next is poured. One bebinca takes four hours. No shortcuts have ever worked.' },
      { title: 'Kolambi Masala', desc: 'Tarkarli tiger prawns in a dark coconut-and-chilli masala — the most expensive and most memorable dish on the Sindhudurg coast.' },
      { title: 'GSB Saraswat Thali', desc: 'Twenty-element vegetarian meal in precise sequence — the most sophisticated thali in Maharashtra, eaten sitting cross-legged on the floor with the whole family.' },
      { title: 'Feni & Cashew Culture', desc: 'April–June in Goa: the cashew apple is pressed, the first distillate (urrak) drunk fresh, the second (feni) aged. The whole coastal economy smells of it.' },
    ],
    gallery: [
      'konkani-thali.jpg',
      'spice-plantation.jpg',
      'fishing-village.jpg',
    ],
    thingsToDo: [
      'Eat at a local Malvani dhaba in Malvan town (not hotel restaurants — ask for the one near the market)',
      'Take a Konkani cooking class at a Ratnagiri or Dapoli homestay',
      'Try fresh tiger prawns at sunset at the Tarkarli beach shacks',
      'Drink sol kadhi as a digestif after a fish curry meal — always before the sweet',
      'Try ururak (first-distillate cashew feni) in Goa only during April–June',
      'Eat at a GSB community restaurant in Matunga, Mumbai (Prakash or Guru Kripa)',
      'Buy kokum directly from a farmer at the Malvan Saturday market',
    ],
    bestTime: 'October – May (sea fish season; avoid monsoon months when fishing is banned)',
    didYouKnow: [
      'Kokum grows only in the specific coastal-Ghat transition zone — it has never been successfully cultivated outside this region. The Garcinia indica tree requires the specific laterite soil and the specific monsoon-to-dry-season cycle of the Konkan coast.',
      'Bombay duck (bombil) is not a duck. It is a fish — Harpadon nehereus — so named by British sailors who found its dried form smelled like the Bombay Mail railway carriage in which it was transported.',
      'Vindaloo has nothing to do with "vin" or wine in its Indian form — it comes from the Portuguese "carne vinha d\'alhos" (meat in garlic wine), transformed by Goan cooks who replaced the wine with palm vinegar and the pork lard with coconut oil.',
    ],
    localTip: 'The best fish in any coastal town is not in the restaurants — it is on the home tables of the fishing families. The fish that didn\'t sell at the 5 AM auction goes on the family table. If you have made friends with a Koli family, this is your best meal.',
    warnings: [
      'Avoid raw shellfish in the monsoon months (June–September) — bacterial contamination is higher in warmer, more turbid water.',
      'Feni is more potent than it tastes — the distillation proof varies batch by batch and the cashew apple sweetness masks the alcohol. Pace yourself.',
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     VILLAGE
  ═══════════════════════════════════════════════════════════════════════════ */
  village: {
    subtitle: 'Time at the Pace of Tides, Coconuts, and the Evening Walk to the Well',
    body: [
      'The Konkani village is an organism — it breathes with the tide, grows with the monsoon, and rests in the post-harvest heat of April. A wada (the traditional multi-family compound) faces west toward the sea or east toward the orchard, almost never toward the road. The guava tree overhangs the well. The communal well is the morning gathering point — not for water, which is piped now in most places, but for the conversation that has happened there every morning for two hundred years.',
      'The village year is not organised by a solar or fiscal calendar but by a liturgical and agricultural one. The fishing season opens and closes by ritual. The mango harvest begins when the village head says it begins — on a date that depends on the lunar calendar, the condition of the trees, and consensus among the elders, not on a fixed date. Weddings happen in specific lunar months. The school term reorganises around the cashew season and the monsoon when the roads flood.',
      'The architecture is laterite block — quarried from the plateau directly beneath the village, lime-plastered and roofed with Mangalore terracotta tiles. In older houses, the roof is coconut thatch. The interior smells of earth, coconut oil, and the specific cool of a thick-walled room. The kitchen is at the back, near the well. The main hall faces east. The veranda faces the courtyard where the children play and the grandmother sits.',
      'Each village has its deul (local shrine), its wells, its market day (usually Thursday or Sunday), its fish landing ground, and its network of ancestral paths connecting it to the next village and the nearest town. These paths — some worn centuries before the first road — are still the preferred route for the morning walk, the evening promenade, and the livestock return. The GPS-visible road bypasses everything that matters.',
      'Village governance has always been more horizontal than the caste structures of the interior suggest. The gram sabha resolves disputes by precedent and consensus, citing ancestral custom like case law. The elder\'s memory is the archive. The panchayat notionally manages things, but the real decision-making happens in the devchar courtyard, after the puja, in the conversation that starts when the priest goes home.',
      'The seasonal rhythms of a coastal village are so precise that you can tell the month without a calendar: the coconut harvest smell in October, the mango blossom in February, the cashew crimson in March, the mud-and-leaf smell of the first monsoon breaking in June, the quiet of the fishing-ban July, the post-monsoon fish abundance of October that starts the cycle again.',
    ],
    quote: {
      text: 'In Konkan, the village knows what the city has forgotten — that the land is not yours. You are the land\'s.',
    },
    keyFacts: [
      { label: 'Typical village size', value: '200–800 households' },
      { label: 'Building material', value: 'Laterite block, lime plaster, Mangalore tile' },
      { label: 'Market day', value: 'Thursday and/or Sunday (varies by village)' },
      { label: 'Governance', value: 'Gram panchayat + traditional gram sabha' },
      { label: 'Key village institution', value: 'The devchar (village deity shrine)' },
      { label: 'Ancestral paths', value: 'Pre-road walking routes still used daily' },
    ],
    highlights: [
      { title: 'The Traditional Wada', desc: 'A multi-generation laterite compound with a central courtyard, a tulsi plant at the entrance, a wood-fire kitchen, and rooms that smell of 200 years of coconut oil.' },
      { title: 'Thursday Village Markets', desc: 'Weekly bazaars where fish, vegetables, coconut products, and gossip circulate with equal speed. The coconut-jaggery section is always the most crowded corner.' },
      { title: 'The Evening Temple Round', desc: 'Every Konkani village has its evening walk — from home to devchar to neighbour\'s veranda and back. The same route, the same conversations, every evening forever.' },
      { title: 'Koli Fishing Settlements', desc: 'The fishing settlements at river mouths — boats, nets, drying fish, the pre-dawn auction — a sensory world that has looked this way for a thousand years.' },
      { title: 'Ancestral Path Networks', desc: 'The web of walking paths between villages, predating all roads — narrow, shaded, passing through orchards and devrai patches, impossible to find on any map.' },
      { title: 'The Gram Sabha', desc: 'The village assembly — disputes resolved by precedent, custom cited like case law, decisions made by consensus in the devchar courtyard. More effective than any court.' },
    ],
    gallery: [
      'fishing-village.jpg',
      'homestays.jpg',
      'spice-plantation.jpg',
    ],
    thingsToDo: [
      'Stay in a traditional wada homestay in Dapoli or Ratnagiri district for at least 3 nights',
      'Wake before 5 AM to watch a coastal fish auction at the landing beach',
      'Walk an ancestral path between two coastal villages — ask your host which one',
      'Attend a village Thursday market (look for the coconut-jaggery and fish sections)',
      'Join a coconut harvest at an agrotourism farm',
      'Sit in the devchar courtyard in the evening when the village gathers',
    ],
    bestTime: 'November – February (ideal weather, most festivals, mango blossom in February)',
    didYouKnow: [
      'The laterite blocks used to build traditional Konkan homes are cut from the ground wet (laterite is soft when wet) and harden on exposure to air over weeks — a construction material that requires no firing, no transportation, and no additives. The house literally grows from the land it sits on.',
    ],
    localTip: 'If you want to experience a real village market, go before 8 AM — by 9 AM the fish is sold out, the best produce is gone, and the market becomes a slower, tourist-friendly version of itself.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     FESTIVALS
  ═══════════════════════════════════════════════════════════════════════════ */
  festivals: {
    subtitle: 'The Burning Year — When the Entire Coast Becomes a Stage',
    body: [
      'The Konkani festival calendar is relentless — there is not a single month without a celebration significant enough to warrant its own costume, its own food, and its own music. From the city-scale Ganesh Chaturthi of August to the quiet family mango-blossom puja of February, the year is a continuous liturgy. The coast does not celebrate festivals; it performs its own existence through them.',
      'Ganesh Chaturthi on the coast is profoundly different from the urban spectacle of Mumbai. In Konkan villages, the celebration is domestic, intimate, and ten days long. The Ganapati idol — hand-made from red local clay by a hereditary craftsman, never from imported white plaster of Paris — sits in the main hall of the ancestral home. The extended family arrives from Mumbai, Pune, the Gulf. The idol is made from the earth; it returns to the earth when immersed.',
      'Shimga (the Konkani spring festival, related to but distinct from Holi) is the coast\'s most exuberant collective event. Bonfires of old furniture, dry palm fronds, and symbolic objects are lit five days before the colour festival, village by village from Ratnagiri to Malvan, creating a visible chain of fire along the coast. On the evening of the main Shimga, the entire village — including the elders who haven\'t danced in a decade — circles the bonfire.',
      'The annual village yatra (territorial fair) is the most locally specific celebration on the coast — each village\'s deity has its own date, its own procession sequence, its own specific ritual that can last three to five days. The yatra is the occasion that brings the diaspora home: those who moved to Mumbai in 1985, Dubai in 1992, or Melbourne in 2003 return for this one weekend, every year, as long as they live.',
      'Narial Purnima (coconut full moon) — the ritual opening of the fishing season on the full moon of Shravan (July/August) — is one of the most visually spectacular ceremonies on the coast. Every Koli fishing community throws a coconut into the sea from the bow of the first boat. The act signals permission — the monsoon ban is lifted, the boats may go out, the fish may be caught. The whole village watches from the shore.',
      'Christmas in the Catholic communities of the southern Konkan and Goa is a coastal Christmas — the church lit with lanterns made from fish-bladder paper (historically) or today\'s coloured cellophane, the crib competition between families ferociously contested, carol singers going house to house from midnight to dawn, and the bebinca waiting on every table. The festivity is specifically Konkani — neither Indian nor European but entirely its own thing.',
    ],
    quote: {
      text: 'The Ganesh Chaturthi celebration in a Konkan village is not a festival. It is a family reunion that happens to include a god.',
    },
    keyFacts: [
      { label: 'Ganesh Chaturthi duration', value: '10 days (some villages: 5)' },
      { label: 'Shimga', value: 'February–March; 5-day celebration with bonfires' },
      { label: 'Village yatras', value: 'Every village has its own date, November–March' },
      { label: 'Narial Purnima', value: 'July/August full moon — fishing season opening' },
      { label: 'Major festivals count', value: '14+ distinct celebrations per annual cycle' },
      { label: 'Idol material', value: 'Red local clay (traditional), never plaster of Paris' },
    ],
    highlights: [
      { title: 'Ganesh Chaturthi', desc: 'Ten days of family, food, and music in every home — the village becomes a temple, the street becomes a stage, the clay idol breathes for ten days.' },
      { title: 'Shimga Bonfires', desc: 'A chain of bonfires from Ratnagiri to Malvan visible from the sea on clear nights — the coast lighting itself up to mark the end of winter.' },
      { title: 'Village Yatras', desc: 'Three to five days of procession, music, theatre, and food, specific to one village and one deity — and the occasion that brings the global diaspora home.' },
      { title: 'Narial Purnima', desc: 'The coconut thrown into the sea from the first boat\'s bow — the moment an entire coast gives itself permission to fish again after four months of abstention.' },
      { title: 'Shigmo (Goa)', desc: 'Fifteen-day spring festival specific to Goa\'s Hindu communities — processions, folk dances (ghode modni, romta mell), and village-specific rituals.' },
      { title: 'Goan Christmas', desc: 'Coastal Christmas — crib competitions, midnight carols through the lanes, bebinca at every table, and a festivity that is entirely Konkani in character.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'religious-mosaic.jpg',
      'weddings-rituals.jpg',
    ],
    thingsToDo: [
      'Book a village homestay for Ganesh Chaturthi (August/September) 3 months in advance',
      'Attend Shimga bonfires in Malvan district (February)',
      'Witness Narial Purnima at any coastal Koli fishing village (July/August)',
      'Join a village yatra procession in the winter fair season — ask your host for the date',
      'Attend Shigmo processions in a Goa village (March, usually 2 days after Holi)',
      'Spend Christmas Eve in Goa or Malvan for the midnight carol tradition',
    ],
    bestTime: 'August–September (Ganesh Chaturthi); November–March (village yatras and Shimga)',
    didYouKnow: [
      'The practice of making Ganesh idols from natural clay and immersing them in water after ten days was specifically revived by Lokmanya Tilak in 1893 to replace the private household puja with a public political gathering — making Ganesh Chaturthi a forum for anti-colonial organising.',
      'The Shimga bonfire custom has a specific ecological function: the burning of old coconut palm fronds and agricultural waste was the traditional method of fertilising the laterite soil with ash before the first monsoon rains.',
    ],
    localTip: 'For the best Ganesh Chaturthi experience, ask your homestay host to introduce you to the family whose idol is being hosted — going inside the home for darshan (viewing) is a privilege not available to tourists who simply watch the public processions.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     LOCAL FESTIVALS
  ═══════════════════════════════════════════════════════════════════════════ */
  'local-festivals': {
    subtitle: 'Sacred Cycles and the Intimate Occasions Only Villagers Know by Name',
    body: [
      'Beyond the major festivals, Konkan\'s villages observe a dense calendar of hyper-local ceremonies — occasions specific to a single village, a single deity, a single caste community, or a single ecological moment — that rarely appear in any tourist guide but constitute the actual texture of coastal life. These are not minor festivals. They are the festivals that actually matter to the people who live here.',
      'The Shravan fishing ban (July–August) is observed with its own ritual calendar. During the month when the sea is too rough to fish and the fish are spawning, the Koli communities cook entirely vegetarian, gather at the shore to sing fishing songs that name every species that will return, and perform the Samudra Puja (sea worship) at the water\'s edge on specific lunar days.',
      'The mango blossoming ceremony of February — when the first amba (mango) flowers appear on the Ratnagiri orchards — is a family ritual, not a public celebration. The orchard\'s senior member goes to the oldest tree at dawn, ties a small cotton thread to the first flower cluster, and performs a brief puja. The family then eats together from the previous season\'s mango pickle. The Alphonso countdown has begun.',
      'Shigmo in Goa is not Holi — it is a fifteen-day spring festival specific to Goa\'s Hindu communities. Each village\'s Shigmo involves its local deity\'s procession, traditional folk performances (ghode modni, romta mell, fugdi), and rituals that have not visibly changed in living memory. The state government\'s official Shigmo parade in Panaji is spectacular; the village Shigmo is real.',
      'The village samaj (community meal) that follows every annual yatra is one of the most egalitarian moments in Konkani social life. Every family brings a dish in a prescribed quantity, every person eats the same meal regardless of caste, every dispute is suspended for the day. The samaj is still managed by the same three or four families in most villages, as it has been for a century.',
      'Chaitra Purnima (full moon of the month of Chaitra, April) is the occasion for the Holi-Pola ceremony in some northern Konkan districts — the agricultural bullock is bathed, decorated with marigolds, and led in procession through the village as recognition of its year of labour. The bullock wears his garlands with great dignity.',
    ],
    quote: {
      text: 'Ask any Konkan person where they are from and they will tell you the name of a festival before they tell you the name of a city.',
    },
    keyFacts: [
      { label: 'Shravan fishing ban', value: '1 month (July–August)' },
      { label: 'Shigmo duration', value: '15 days (Goa)' },
      { label: 'Village yatra density', value: 'Every village has its own date, November–March' },
      { label: 'Almanac used', value: 'Panchang (lunar-solar calendar) — still widely consulted' },
      { label: 'Samaj meal occasion', value: 'Post-yatra community feast — open to all' },
      { label: 'Mango puja', value: 'February — family ritual at the oldest tree in the orchard' },
    ],
    highlights: [
      { title: 'Shravan Fishing Ritual', desc: 'The sea rests for a month — Samudra Puja at the shore, vegetarian cooking, fishing songs naming the species that will return.' },
      { title: 'Mango Blossom Puja', desc: 'A quiet February dawn ceremony at the family orchard — thread on the first flower, a brief puja, the Alphonso countdown officially begun.' },
      { title: 'Village Shigmo (Goa)', desc: 'The real Shigmo — not the state parade in Panaji, but the village procession with the local deity, the traditional dances, and the rituals no visitor ever sees.' },
      { title: 'Post-Yatra Samaj', desc: 'The community meal that follows the annual fair — egalitarian, elaborate, and the best Konkani food you will eat at any social occasion.' },
      { title: 'Pola (Bullock Festival)', desc: 'The decorated working bullock led in procession through the village in recognition of a year\'s labour — agricultural gratitude made ceremonial.' },
      { title: 'Coconut Full Moon Ceremonies', desc: 'Multiple lunar-cycle ceremonies tied specifically to the coconut and the sea — the most intimate of the Koli community\'s ritual calendar.' },
    ],
    gallery: [
      'folk-dance.jpg',
      'konkani-thali.jpg',
    ],
    thingsToDo: [
      'Attend Shigmo at a Goa village — not the state parade (March)',
      'Stay through the monsoon to experience Shravan observances',
      'Ask your homestay host about the local village yatra date and get a personal introduction',
      'Witness the post-yatra samaj if one coincides with your visit',
      'Find the February mango blossom puja by staying on an orchard homestay',
    ],
    bestTime: 'February–March (mango blossom, Shigmo); November–January (yatra season)',
    didYouKnow: [
      'In most Konkan villages, the yatra date is determined by a combination of the lunar calendar and the specific deity\'s mythology — no two villages in the same district share the same yatra date, which means the diaspora return is staggered across the entire winter season.',
    ],
    localTip: 'The samaj meal that follows a village yatra is technically open to everyone in the village — and usually, genuinely, to respectful visitors introduced by a village member. It is always the best and most honest Konkani meal available.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     TOURISM
  ═══════════════════════════════════════════════════════════════════════════ */
  tourism: {
    subtitle: 'Journeys Beyond the Circuit, Into India\'s Most Beautiful and Least Crowded Coast',
    body: [
      'Konkan tourism is still in the process of discovering itself. Unlike Goa, which has been commodified for international tourism since the 1970s, most of the Konkan coast — particularly in Maharashtra — remains genuinely off the tourist circuit. You can find beaches that require a forty-five-minute forest walk to reach, fishing villages that have never hosted a tour group, and forests where the only trail is a memory of cattle movement.',
      'The travel infrastructure has improved dramatically in the last decade. The Konkan Railway connects the coast from Mumbai to Mangalore in 13 hours through some of the most dramatic railway scenery in Asia — 91 tunnels, 2,000 bridges, and a series of green revelations as the Ghats present themselves through the window. Villages ten minutes from a station are still discovering that they can host travellers.',
      'The accommodation spectrum is now wide: beach shacks and tented camps at the budget end; high-quality eco-resorts in the mid-range; beautifully restored traditional wadas at the premium end, where you sleep in a room that was a grandmother\'s bedroom, eat what the family eats, and leave with a recipe you didn\'t expect to want. The homestay circuit in Ratnagiri and Sindhudurg is one of India\'s best-kept travel secrets.',
      'The timing question depends entirely on what you are here for. December to February is peak season — cool, dry, perfect for beaches, fort visits, and hiking. April and May is mango season — the Alphonso orchards of Ratnagiri and Devgad are the destination, the fruit so good it constitutes its own argument for visiting. June to September, the monsoon, turns the coast into something surreal: roaring waterfalls, empty beaches, deep green, and a quiet that the rest of the year does not offer.',
      'The coast is increasingly well-served by the Chipi Airport in Sindhudurg (opened 2021), which cuts the travel time from Mumbai from 6 hours by road to 45 minutes by air. This has made the deeper parts of the southern Konkan — Malvan, Tarkarli, Vengurla — accessible as weekend destinations from Mumbai without the Sunday-evening traffic catastrophe.',
      'The unwritten rule of Konkan travel: go slow. The coast rewards the person who stays in one place for a week over the person who covers five beaches in two days. Boredom here gives way, very quickly, to attention — and attention, even more quickly, to love.',
    ],
    quote: {
      text: 'Every Konkan beach has a name. Every name has a story. Go slow enough and you\'ll hear both.',
    },
    keyFacts: [
      { label: 'Peak season', value: 'November – February (cool and dry)' },
      { label: 'Mango season', value: 'April – May (Alphonso orchards)' },
      { label: 'Monsoon season', value: 'June – September (dramatic, cheapest)' },
      { label: 'Nearest airports', value: 'Mumbai, Goa (Dabolim/Mopa), Sindhudurg (Chipi)' },
      { label: 'Konkan Railway', value: 'Mumbai to Mangalore: 13 hrs, 91 tunnels, 2,000 bridges' },
      { label: 'Homestays registered', value: '200+ (Ratnagiri & Sindhudurg districts)' },
    ],
    highlights: [
      { title: 'Konkan Railway Journey', desc: 'The Mumbai–Mangalore slow train — a 13-hour journey through tunnel and viaduct and waterfall, a destination in itself.' },
      { title: 'Wada Homestays', desc: 'Traditional Konkani ancestral homes opened to guests — coconut lassi on the veranda, home-cooked meals, firefly nights.' },
      { title: 'Tarkarli–Malvan Circuit', desc: 'Three days in Tarkarli (beach, kayak, coral snorkel), Sindhudurg Fort, and Malvan fish market — the essential southern Konkan experience.' },
      { title: 'Mango Orchard Stays', desc: 'April–May in Devgad or Ratnagiri — wake in an orchard, eat Alphonso directly from the tree, sleep with the windows open to the sea breeze.' },
      { title: 'Chipi Airport to Malvan', desc: 'Fly Mumbai to Sindhudurg in 45 minutes, reach Malvan beach in 30 minutes more — the coast is now a genuine weekend destination from any metro city.' },
      { title: 'Monsoon Konkan', desc: 'The coast in June–September: empty beaches, thundering waterfalls, the cheapest accommodation, and a green so intense it seems computer-generated.' },
    ],
    gallery: [
      'diveagar-beach.jpg',
      'guhagar-beach.jpg',
      'homestays.jpg',
      'konkan-railway.jpg',
      'ratnagiri-mango-fort.jpg',
    ],
    thingsToDo: [
      'Take the Konkan Railway from Mumbai to Ratnagiri — sit on the sea side of the train',
      'Stay at a wada homestay in Dapoli or Devgad for at least 4 nights',
      'Walk from Tarkarli beach to Devbagh spit at low tide',
      'Book a mango orchard stay in Devgad for April',
      'Take a day trip to Devbagh by local boat from Malvan jetty',
      'Fly Mumbai–Chipi for a Sindhudurg weekend (book 6 weeks ahead)',
    ],
    bestTime: 'November – February (peak); April – May (mangoes); June – August (monsoon drama)',
    didYouKnow: [
      'The Chipi Airport in Sindhudurg district was built on a 350-acre site in the Western Ghat foothills — it required the relocation of a village, the negotiation of forest clearance, and twelve years of planning before its 2021 inauguration.',
    ],
    localTip: 'The best value accommodation on the coast is a village homestay during the monsoon (June–September) — rates drop by 40–60%, the beaches are empty, and the landscape is at its most dramatic. The only trade-off is that sea-swimming is unsafe.',
    warnings: [
      'The Konkan coast has no direct highway that runs its entire length — travel between districts requires patience with winding roads, and Google Maps often underestimates driving times by 30–40%.',
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     AGRICULTURE
  ═══════════════════════════════════════════════════════════════════════════ */
  agriculture: {
    subtitle: 'The Red Earth and Its Gifts — Mangoes, Cashews, Coconuts, and the Long Harvest',
    body: [
      'Konkan agriculture is not farming in the industrial sense — it is custodianship. The red laterite soil is too iron-rich for most grain crops, but it is profoundly hospitable to cashew, mango, coconut, and areca nut. These are not cash crops in the modern register — they are long-term relationships between families and trees that began two, three, sometimes five generations ago. The oldest Alphonso mango tree in a Devgad orchard is a family member.',
      'The Alphonso mango of Ratnagiri and Devgad is, by any objective measure, the most prized mango in the world — not by reputation alone but by the specific biochemistry of a fruit grown only in a narrow band of coastal laterite soil with a specific sea-breeze microclimate and a specific rainfall-to-dry-season ratio. The Devgad Alphonso and the Ratnagiri Alphonso both carry Geographical Indication status. Nothing grown elsewhere is the same fruit.',
      'Cashew is Konkan\'s most democratic crop. Every household has a cashew tree or ten. The harvest season in March–April is a community event — families go to the orchard together, collect the fallen cashew apples (the fruit turns from green to vivid red-orange when ripe and ready), extract the nuts for drying, and press the apple for juice that becomes the urrak and feni distillates. Nothing is wasted. The process involves the whole family.',
      'Rice cultivation in the coastal valley floors follows a two-season calendar — the kharif (monsoon-rain) crop from June to November, and in some areas the rabi (winter) crop in irrigated paddies. Heritage Konkani rice varieties — Wada Kolam, Indrayani, Vada Kolam — are treasured for their fragrance and their specific stickiness when cooked. They are increasingly rare as farmers shift to higher-yield hybrid varieties. Several Ratnagiri NGOs are working to preserve the heritage strains.',
      'Kokum (Garcinia indica) is perhaps the most underappreciated crop of the coast — a deep purple-red tree fruit whose dried rind gives Konkani cuisine its signature sour note and whose seed oil (kokum butter) is used in Ayurvedic medicine, cosmetics, and increasingly in high-end food manufacturing. The tree grows only in the specific Konkan laterite-and-monsoon environment and cannot be cultivated outside this zone.',
      'Jackfruit — the largest tree-borne fruit in the world — grows abundantly in the Konkan forest margins and village orchards. The raw jackfruit is cooked as a vegetable (it is the Konkani cook\'s answer to meat, with a fibrous texture and the ability to absorb spice); the ripe fruit is eaten fresh or made into jam; the seeds are roasted and eaten as a snack; the wood is used for musical instruments and furniture. Nothing is wasted.',
      'The coconut grove is the most complete agricultural ecosystem on the coast — the tree provides food (coconut meat, coconut water, coconut milk), oil (pressed from the copra), coir (from the husk), building material (the shell, the trunk, the frond), and the toddy that becomes feni. The coconut palm is not a crop; it is a civilization in tree form.',
    ],
    quote: {
      text: 'The Alphonso mango does not grow in Konkan. It grows in a specific family\'s orchard, on a specific tree, in the third week of April. Everything else is approximation.',
    },
    keyFacts: [
      { label: 'GI-tagged varieties', value: 'Devgad Alphonso, Ratnagiri Alphonso, Sindhudurg cashew' },
      { label: 'Annual mango output', value: '~1 lakh MT (Maharashtra Konkan coast)' },
      { label: 'Cashew harvest season', value: 'March – May' },
      { label: 'Key crops', value: 'Mango, Cashew, Coconut, Areca nut, Jackfruit, Kokum, Rice' },
      { label: 'Kokum habitat', value: 'Endemic to Konkan laterite-monsoon zone only' },
      { label: 'Heritage rice varieties', value: 'Wada Kolam, Indrayani, Vada Kolam' },
    ],
    highlights: [
      { title: 'Alphonso Orchards (April)', desc: 'Ratnagiri and Devgad district in April — 500-year-old mango trees bearing fruit, the perfume arriving before the colour is visible.' },
      { title: 'Kokum Harvest', desc: 'Garcinia indica — a coast-endemic fruit whose dried rind defines Konkani cuisine; harvested in May and dried in the sun on every village rooftop.' },
      { title: 'Cashew Apple Season', desc: 'March–April: the cashew apple turns vivid red-orange, the village orchards smell of fermenting fruit, and the feni distillation begins.' },
      { title: 'Spice Plantation Walks', desc: 'Cardamom, black pepper, turmeric, and chilli growing in the Ghat foothills — the ingredient source for Konkani cuisine\'s legendary complexity.' },
      { title: 'Rice Heritage Farms', desc: 'The valley floor paddies of Ratnagiri growing heritage Kolam varieties — the most fragrant and expensive rice in Maharashtra, increasingly rare.' },
      { title: 'Jackfruit Villages', desc: 'Every coastal village has jackfruit trees that are not managed — they simply produce, in abundance, every summer, and the village distributes the fruit informally.' },
    ],
    gallery: [
      'spice-plantation.jpg',
      'devgad-orchards.jpg',
      'dahanu-chikoo-orchards.jpg',
    ],
    thingsToDo: [
      'Visit a Devgad or Ratnagiri mango orchard in April — taste fruit directly from the tree',
      'Attend the mango grading and packing at a GI-certified orchard (April–May)',
      'Watch cashew feni distillation at a Goa toddy shop (April–June)',
      'Buy kokum directly from a farmer at the Malvan Saturday market',
      'Take an agrotourism plantation walk near Sawantwadi or Kankavli',
      'Visit the jackfruit village market in Ratnagiri in June',
    ],
    bestTime: 'April – May (mango and cashew harvest); October (post-monsoon, coconut harvest)',
    didYouKnow: [
      'The Alphonso mango was named after Afonso de Albuquerque, the Portuguese viceroy who captured Goa in 1510 — the Portuguese introduced grafting techniques that transformed what was a wild coastal fruit into the supremely consistent and perfumed variety we know today.',
      'Kokum butter (extracted from the kokum seed) is used in high-end chocolate-making as a cocoa butter substitute, and has been used in Ayurvedic skin preparations for over 2,000 years. It is more stable than most vegetable butters at tropical temperatures.',
    ],
    localTip: 'Book a mango orchard stay in Devgad for mid-April — the orchard owner will pick the fruit directly from the tree for you at breakfast. Never buy Alphonso from a Mumbai supermarket after tasting one this way.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     ECOLOGY
  ═══════════════════════════════════════════════════════════════════════════ */
  ecology: {
    subtitle: 'A Biodiversity Hotspot at the Living Edge of Two Incomparable Worlds',
    body: [
      'The Konkan coast sits at the western edge of the Western Ghats — one of the world\'s eight biodiversity hotspots, recognized by UNESCO as a World Heritage Site in 2012. The Ghats harbour the highest concentration of endemic species on the Indian subcontinent: plants, insects, amphibians, reptiles, and birds found nowhere else on Earth. The coastal strip and its forest hinterland sit within the hotspot\'s core zone.',
      'The transition between marine and terrestrial ecosystems at the coastal margin creates exceptional biodiversity density. Mangrove forests along the estuaries are ecological nurseries — the production in a healthy Konkan mangrove estuary (fish, crabs, prawns, molluscs, birds) is among the highest of any coastal ecosystem in Asia. Remove the mangrove and the fish population in the adjacent sea crashes within two years.',
      'The Malvan Marine Sanctuary (29 sq km, established 1987) protects a reef system of extraordinary diversity — over 200 coral species, 300+ fish species, resident sea turtles, schooling barracuda, and pelagic visitors including whale sharks during the post-monsoon plankton bloom. This reef is comparable in diversity to far more celebrated sites in Southeast Asia and the Lakshadweep.',
      'Olive ridley sea turtles nest on at least five beaches in Sindhudurg and Ratnagiri districts — Velas, Anjarle, Kelshi, Hedvi, and Murud — in a nesting tradition documented for over 200 years. The nesting season runs February–April; hatching typically occurs 45–60 days later. Each nest contains 80–120 eggs. Community conservation groups at each beach have transformed what was an egg-collection economy into a wildlife tourism model.',
      'Leopards, sloth bears, Indian pythons, and king cobras are present in significant numbers in the forest patches behind the coastal towns — a fact that surprises most visitors but is matter-of-fact to the villagers who share the landscape with them. The biodiversity corridor connecting the coastal forests to Chandoli National Park and Radhanagari Wildlife Sanctuary keeps large mammals in the landscape despite the coastal development pressure.',
      'The ecological pressures on the coast are real and accelerating: sand mining from estuaries (destroying turtle nesting sites and fish nurseries), coastal construction violating the Coastal Regulation Zone, invasive species (Lantana camara covering the forest understorey), and the increasing intensity of cyclones driven by warming Arabian Sea temperatures. The sacred grove tradition and the self-imposed fishing bans are, paradoxically, more effective conservation than most policy interventions.',
    ],
    quote: {
      text: 'The Western Ghats are older than the Himalayas. The biodiversity they hold is a library we have barely begun to read.',
    },
    keyFacts: [
      { label: 'UNESCO recognition', value: 'Western Ghats World Heritage Site (2012)' },
      { label: 'Malvan reef area', value: '29 sq km marine sanctuary' },
      { label: 'Known fish species (Malvan)', value: '300+' },
      { label: 'Coral species (Malvan)', value: '200+' },
      { label: 'Turtle nesting beaches', value: 'Velas, Anjarle, Kelshi, Hedvi, Murud' },
      { label: 'Large mammal species', value: 'Leopard, sloth bear, gaur, wild dog (Ghat forests)' },
    ],
    highlights: [
      { title: 'Malvan Marine Sanctuary', desc: 'Protected reef with 300+ fish species and 200+ corals — the most biodiverse marine zone on the Maharashtra coast, comparable to Southeast Asian reef systems.' },
      { title: 'Velas Turtle Nesting', desc: 'Olive ridleys nesting on Velas beach (February–March) — one of India\'s most successful community-run wildlife conservation projects.' },
      { title: 'Mangrove Estuaries', desc: 'The Karli, Gad, and Vagad estuaries — some of the healthiest mangrove systems on India\'s west coast, nurseries for the entire food chain.' },
      { title: 'Chandoli–Koyana Wildlife Corridor', desc: 'The Ghat forest belt behind the coast connecting to Chandoli National Park — a tiger and leopard corridor that keeps the coast wild.' },
      { title: 'Sacred Grove Refugia', desc: 'The 1,500+ devrais (sacred groves) of the Konkan are the last old-growth forest patches in a landscape farmed for 2,000 years — holding endemic species found nowhere else.' },
      { title: 'Post-Monsoon Plankton Bloom', desc: 'The October upwelling event brings cold, nutrient-rich water to the surface — the plankton bloom that attracts whale sharks, manta rays, and the enormous fish abundance that drives the fishing economy.' },
    ],
    gallery: [
      'waterfall-forest.jpg',
      'malvan-marine-sanctuary.jpg',
      'sacred-groves.jpg',
      'wildlife-sanctuaries.jpg',
    ],
    thingsToDo: [
      'Snorkel or scuba dive at Malvan Marine Sanctuary (October–May)',
      'Attend the Velas Turtle Festival and watch hatchlings walk to the sea (February–March)',
      'Kayak through the Karli estuary mangroves at dawn',
      'Birdwatching at Phansad Wildlife Sanctuary (December–March)',
      'Night safari at Radhanagari Wildlife Sanctuary behind Kolhapur (September–March)',
      'Visit a devrai sacred grove with a local guide who knows the resident deity tradition',
    ],
    bestTime: 'October – May (reef visibility, turtle nesting February–March, bird season December–March)',
    didYouKnow: [
      'The Western Ghats are estimated to have more endemic species per square kilometre than the Amazon rainforest — including over 500 species of endemic trees and 16 species of wild banana found nowhere else on Earth.',
      'The Olive ridley sea turtle (Lepidochelys olivacea) returns to the same beach where it hatched to lay its own eggs — guided by a geomagnetic map it generates as a hatchling that it can navigate by 20–30 years later.',
    ],
    localTip: 'The Velas Turtle Festival registration fills up months in advance — book through the Sahyadri Nisarga Mitra conservation group directly, not through travel agents who overcharge and underdeliver.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     ECOTOURISM
  ═══════════════════════════════════════════════════════════════════════════ */
  ecotourism: {
    subtitle: 'Slow Travel in the Living Forest, Farm, and Tidal Estuary',
    body: [
      'Ecotourism in Konkan is not a marketing category — it is the default mode of being here. The terrain resists mass tourism: the roads are narrow, the best beaches require walking, and the forest paths require a guide who knows them. This productive inconvenience is, from a conservation perspective, an enormous advantage.',
      'The agrotourism model pioneered by farms in Ratnagiri and Sindhudurg has proven that travellers will pay to slow down — to wake at dawn in a mango orchard, to watch how a coconut is harvested with a sickle-bladed climbing tool, to process cashew apples and taste the fresh pressed juice before it ferments, to eat what the farm produced that morning on the table where the farm family eats. The best agrotourism stays are also the most comfortable accommodation on the coast.',
      'Community-run ecotourism protects the resources it depends on. The Velas Turtle Conservation project — begun by Sahyadri Nisarga Mitra, a conservation NGO, in collaboration with the fishing families who had previously collected turtle eggs for food — has turned a destructive practice into an economic model. The families who protect the nests now earn more from turtle tourism than they did from egg collection, and the turtle population has measurably recovered.',
      'The Konkan Railway\'s village station stops are perfect ecotourism entry points — Khed, Chiplun, Ratnagiri, Kankavli, Sawantwadi — each station a gateway to coastal forests, rivers, and beaches that most travellers pass through without stopping. The village 10 minutes from the station is where the real Konkan is.',
      'Mangrove kayaking, offered by a growing number of operators in Tarkarli, Malvan, and Chapora (Goa), is one of the coast\'s most ecologically intimate experiences. The paddler enters a tidal forest of arching roots and calling birds, with water clear enough to see the crabs on the bottom, at human pace, in near-silence.',
      'The principles of responsible ecotourism on the Konkan coast: buy from local producers, stay in locally-owned accommodation, do not touch coral when snorkelling, respect the monsoon fishing ban spirit even as a visitor, do not litter on beaches, ask before photographing people, and leave slower than you arrived. The last one matters most.',
    ],
    quote: {
      text: 'The best ecotourism leaves the forest unchanged and the traveller changed.',
    },
    keyFacts: [
      { label: 'Registered agrotourism farms', value: '200+ (Ratnagiri & Sindhudurg)' },
      { label: 'Turtle conservation sites', value: '5+ active (Velas, Anjarle, Kelshi, Hedvi, Murud)' },
      { label: 'Marine sanctuary area', value: '29 sq km (Malvan)' },
      { label: 'Best ecotourism months', value: 'October – February (dry season)' },
      { label: 'Mangrove kayak operators', value: 'Tarkarli, Malvan, Chapora (Goa)' },
      { label: 'Velas turtle nesting', value: 'February – April; hatching 45–60 days later' },
    ],
    highlights: [
      { title: 'Agrotourism Farm Stays', desc: 'A week on a working Ratnagiri farm — orchard work, cashew processing, coconut climbing, garden-to-table meals. The most restorative travel on the coast.' },
      { title: 'Velas Hatchling Walk', desc: 'Watch Olive ridley hatchlings emerge from the sand and walk to the sea at dawn. One of India\'s most moving wildlife encounters, now a fully organized conservation event.' },
      { title: 'Mangrove Kayaking', desc: 'A kayak through the Karli or Gad estuary at dawn — a cathedral of arching roots, bird calls, and water so clear you can see the substrate.' },
      { title: 'Village Forest Walks', desc: 'Guided walks in the Sawantwadi or Sindhudurg forest fringes with a local naturalist who knows every bird call, every medicinal plant, and the history of every devrai patch.' },
      { title: 'Devgad Mango Orchards', desc: 'The definitive agrotourism experience — book April in Devgad, eat Alphonso off the tree, attend the grading and packing, meet the family whose grandfather planted the oldest tree.' },
      { title: 'Community Scuba (Malvan)', desc: 'PADI-certified dive operators run by local families from Malvan — the money goes directly to reef conservation and community income, not to outside operators.' },
    ],
    gallery: [
      'spice-plantation.jpg',
      'waterfall-forest.jpg',
      'tarkarli-backwaters.jpg',
    ],
    thingsToDo: [
      'Book a 3-night agrotourism stay in Devgad or Ratnagiri district (minimum 3 nights)',
      'Register for Velas Turtle Festival (February–March) 2 months in advance',
      'Kayak the Karli estuary at dawn from Tarkarli',
      'Take a guided birdwatching walk in Phansad Wildlife Sanctuary',
      'Cycle between villages in Dapoli district on village back roads',
      'Join a mangrove clean-up walk at the Chapora estuary (Goa, organised periodically)',
    ],
    bestTime: 'October – February; February – March specifically for turtle nesting',
    localTip: 'The best agrotourism hosts are families who farm the land themselves — ask specifically whether the host family lives on the property year-round, or whether they just manage it for tourism income. The difference in experience is total.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     HIDDEN GEMS
  ═══════════════════════════════════════════════════════════════════════════ */
  'hidden-gems': {
    subtitle: 'The Konkan That Nobody Talks About — Yet',
    body: [
      'For every Tarkarli there are five beaches with no name on any tourist map. For every homestay with a website there are twenty households that will feed you and house you if you knock on the right door with the right introduction. The hidden Konkan is not hidden because it is remote — it is hidden because the people who know it are not the kind who write travel blogs.',
      'Redi beach, south of Vengurla, requires a forty-five-minute walk through a forested headland to reach. The beach has black volcanic sand, dramatic iron ore cliffs rising from the sea, and a small Portuguese-era fort on the headland that nobody visits. The beach is empty on weekdays not because it is unknown locally but because there is no road to it. That is the entire secret.',
      'Velas is an ordinary coastal village that becomes, for three weeks in February and March, one of the most extraordinary wildlife encounters in Maharashtra. The Olive ridley turtle nesting here was nearly destroyed by egg collection; the village community — guided by the Sahyadri Nisarga Mitra NGO — decided in 2002 to protect it instead. Now they escort visitors to the pre-dawn hatchling emergence. The festival is intimate, limited to 50 visitors per night, and books out months ahead.',
      'Dapoli is a small hill station at 400 metres elevation in Ratnagiri district — cooler than the coast, with views of both the Ghats and the sea simultaneously, a weekly market that sells Alphonso mangoes at a third of Mumbai prices, and some of the best-run heritage homestays on the coast. Almost no one from outside the Konkan diaspora knows it exists.',
      'The Kunkeshwar temple, accessible by a dirt road off the main highway in southern Sindhudurg, sits directly on the ocean cliffs. At high tide, waves break below the outer corridor of the temple and spray enters the stone mandap. There is no crowd, no facility, no sign pointing to it. The priest is available in the morning.',
      'Devbagh, at the precise confluence of the Karli river and the Arabian Sea, is a sand spit accessible only by boat from Malvan or Tarkarli. It is 20 minutes by water from the nearest road. The accommodation there is a handful of state government bungalows and one basic resort. The sunrise at Devbagh — still water on both sides of a thin sand spit — is one of the finest in western India.',
      'Goa\'s interior — the villages of Quepem, Sanguem, and the Cotigao forest south of Palolem — is a Goa that the beach traveller never sees: old family houses with Portuguese tile floors, village churches with handmade wooden pews, spice plantations where cardamom grows in the forest shadow, and a quietness that the coastal strip has entirely lost.',
    ],
    quote: {
      text: 'The best beaches in Konkan have no road to them. They are protected by inconvenience, which is the most effective conservation policy there is.',
    },
    keyFacts: [
      { label: 'Redi beach access', value: '45-min forest walk from Vengurla (no road)' },
      { label: 'Devbagh access', value: 'Boat only — 20 min from Malvan or Tarkarli jetty' },
      { label: 'Dapoli elevation', value: '400 m above sea level (hill station)' },
      { label: 'Velas turtle visitors', value: 'Max 50 per night (book 2+ months ahead)' },
      { label: 'Kunkeshwar access', value: 'Dirt road off NH-66 in Sindhudurg; no tourist facilities' },
      { label: 'Goa interior villages', value: 'Quepem, Sanguem, Cotigao — almost no tourist infrastructure' },
    ],
    highlights: [
      { title: 'Redi Beach', desc: 'Black volcanic sand, iron ore cliffs, a Portuguese fort on the headland, and perfect solitude. A 45-minute forest walk from the Vengurla highway.' },
      { title: 'Devbagh Sandspit', desc: 'A thin strip of sand between the Karli river and the sea, accessible only by boat. The sunrise here is something to plan around.' },
      { title: 'Kunkeshwar Clifftop Temple', desc: 'Shiva temple on the ocean cliffs — waves below at high tide, spray in the outer corridor. No signage. No queue. An active, unmediated place of worship.' },
      { title: 'Dapoli Hill Station', desc: 'Hill station with sea AND Ghat views, Alphonso orchards at farmgate prices, and heritage wada homestays that the Konkan diaspora has kept for themselves.' },
      { title: 'Goa\'s Quepem Interior', desc: 'Old Portuguese tile houses, village churches, Cotigao forest — the Goa that exists 20 km inland from the beach hotels, unchanged by tourism.' },
      { title: 'Anjarle Beach', desc: 'A turtle nesting beach with a river, a coconut grove, and a small community-run conservation project — accessible but consistently passed over by tourists heading for Diveagar.' },
    ],
    gallery: [
      'redi-beach.jpg',
      'kunkeshwar-temple.jpg',
      'dapoli-highlands.jpg',
      'velas-turtle-beach.jpg',
    ],
    thingsToDo: [
      'Walk to Redi beach from the Vengurla highway (start before 8 AM, bring water)',
      'Take the boat to Devbagh — spend the full day, watch the sunset from the spit',
      'Drive to Kunkeshwar at high tide and enter the temple when the waves spray the corridor',
      'Stay in Dapoli for 3 nights: Ghat views, orchard walks, and empty beaches 30 min away',
      'Register for Velas Turtle Festival (February–March) through Sahyadri Nisarga Mitra',
      'Rent a motorcycle in Goa and spend a full day in the Quepem interior',
    ],
    bestTime: 'November – February (dry, clear, all beaches accessible); February–March (turtle season)',
    didYouKnow: [
      'Redi beach gets its black sand from volcanic basalt — the same Deccan Trap eruption material visible in sea cliffs all along the coast. The black sand absorbs heat more than white quartz sand, which is why the beach is always slightly cooler near the waterline where the tide keeps the sand damp.',
    ],
    localTip: 'Devbagh\'s state government guesthouses are booked through the MTDC office in Malvan — they cost ₹1,200–1,800 per night, include a basic kitchen, and are the best-positioned accommodation on the entire coast for watching both sunrise and sunset from the same room.',
  },

  /* ═══════════════════════════════════════════════════════════════════════════
     ADVENTURE
  ═══════════════════════════════════════════════════════════════════════════ */
  adventure: {
    subtitle: 'Edge and Exhilaration on a Wild, Unmediated Coast',
    body: [
      'Konkan adventure is not the manufactured kind — there are no zip lines above manicured forests or theme parks claiming to simulate wilderness. The terrain provides its own challenges: cliff paths without railings, rivers that require wading in the monsoon, ocean surf that demands respect, and forest trails where the only guidance is the sun and the knowledge of the person leading you.',
      'Scuba diving at the Malvan Marine Sanctuary is the coast\'s most developed adventure activity. About a dozen PADI-certified operators run dive programmes in the sanctuary year-round (best: October–May). The reef at Sarjekot, the natural arch at Coral Garden, and a 1905 British merchant vessel wreck at 12 metres depth are the signature sites. Fish density and diversity rivals far more celebrated dive destinations.',
      'Kayaking divides between monsoon river kayaking (technical, fast, requiring experience) and dry-season estuary kayaking (calm, suitable for beginners). The Vashishti river at Chiplun has Grade II–III rapids in July–August; guided overnight expeditions camp on the riverbank under the Ghat cliffs. The Amba river at Kolad has become the most popular whitewater destination from Mumbai — 14 km of Grade II rapids on a day trip.',
      'Rock climbing is nascent but growing on the Konkan\'s basalt and laterite formations. The volcanic columns at Murud-Janjira headland, the laterite cliffs at Harihareshwar, and the Ghat-face rock walls near Tamhini and Bhor offer routes for all grades. There are no established climbing gyms or guide infrastructure — you need to bring equipment and local knowledge.',
      'Long-distance trekking on the Sahyadri ridge — the Ghat crest directly above the coast — is among India\'s finest multi-day walking. The route from Kolad to Bhimashankar follows river valleys, forest paths, and Ghat passes with vertiginous views of the coast 1,200 metres below. The Harishchandragad plateau offers the most dramatic ridge camping in Maharashtra.',
      'Stand-up paddleboarding (SUP) in the Tarkarli estuary has become popular since 2018 — the backwater clarity allows the paddler to see coral patches directly below the board, and dolphin encounters are common at dawn. Windsurfing is practiced at a handful of beaches (Bogmalo in Goa; Murud in Maharashtra) with seasonal operators, and surfing is nascent at Velas and Harihareshwar.',
    ],
    quote: {
      text: 'The Konkan coast does not offer managed adventure. It offers the real thing — wild water, steep rock, and honest uncertainty.',
    },
    keyFacts: [
      { label: 'Scuba season', value: 'October – May (Malvan, 15–25 m visibility)' },
      { label: 'Monsoon kayaking', value: 'Kolad Amba river (Grade II); Chiplun Vashishti (Grade II–III)' },
      { label: 'Dive sites', value: 'Sarjekot reef, Coral Garden arch, 1905 British wreck' },
      { label: 'Sahyadri ridge trek', value: 'Kolad to Bhimashankar — 3–5 days, moderate to strenuous' },
      { label: 'SUP season', value: 'October – May (Tarkarli backwaters)' },
      { label: 'Surf spots', value: 'Velas, Harihareshwar (best June–July, monsoon swell)' },
    ],
    highlights: [
      { title: 'Scuba at Malvan Sanctuary', desc: 'PADI-certified operators, 300+ fish species, 200+ coral species, and a 1905 wreck on the sandy bottom at 12 m — the best diving in mainland India.' },
      { title: 'Kolad Whitewater Kayaking', desc: 'The Amba river at Kolad — 14 km of Grade II rapids on a day trip from Mumbai. The most accessible whitewater in Maharashtra.' },
      { title: 'Sahyadri Ridge Trek', desc: 'Multi-day hike along the Ghat crest with views of both the coast and the Deccan — maximum solitude, maximum elevation, minimum tourist infrastructure.' },
      { title: 'Sea Kayaking (Tarkarli)', desc: 'Estuary and open sea kayaking with dolphin encounters at dawn, coral viewed through the water surface, and the Sindhudurg fort visible on the horizon.' },
      { title: 'Harishchandragad Camping', desc: 'The most dramatic plateau camping in Maharashtra — a 3-day round trip from the Konkan base, with a 1,200 m cliff edge visible from the tent doorway.' },
      { title: 'Monsoon Vashishti Kayak Expedition', desc: 'Overnight kayak expedition on the Vashishti river in July–August — Grade II–III water, forest camp, and the Ghat cliffs above the river at full monsoon flow.' },
    ],
    gallery: [
      'water-sports.jpg',
      'ocean-cliffs.jpg',
      'tarkarli-backwaters.jpg',
      'malvan-marine-sanctuary.jpg',
    ],
    thingsToDo: [
      'Scuba dive at Malvan
