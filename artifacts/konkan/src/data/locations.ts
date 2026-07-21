export interface Location {
  id: string;
  name: string;
  region: string;
  tagline: string;
  coords: { x: number; y: number }; // SVG coordinates in 380×760 viewBox (matches KonkanSVGMap)
  image: string;
  description: string;
  highlights: string[];
  category: 'heritage' | 'nature' | 'beach' | 'culture' | 'adventure';
}

export const locations: Location[] = [
  {
    id: 'dahanu',
    name: 'Dahanu',
    region: 'North Konkan, Maharashtra',
    tagline: 'The Chikoo Capital & Gateway of the North',
    coords: { x: 52, y: 45 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'Dahanu is the quiet northern threshold of Konkan — where endless chikoo orchards perfume the breeze and the Bohri community has kept its ancient sea-trading traditions intact. The white sands of Bordi Beach stretch uninterrupted, watched over by century-old fishing hamlets.',
    highlights: ['Bordi Beach', 'Chikoo orchards', 'Bohri Muslim heritage'],
    category: 'culture',
  },
  {
    id: 'vasai',
    name: 'Vasai',
    region: 'Palghar, Maharashtra',
    tagline: 'Ruins of the Portuguese North',
    coords: { x: 56, y: 95 },
    image: '/src/assets/temple-carvings.jpg',
    description:
      'Long before Bombay rose to prominence, Vasai (Bassein) was the Portuguese Empire\'s crown jewel on this coast — a fortified city of churches, convents, and grand houses. Today its massive fort walls stand reclaimed by banyan roots and silence, a ruin still telling of the empire that once ruled from here.',
    highlights: ['Vasai Fort ruins', 'Portuguese-era churches', 'Banyan-choked ramparts'],
    category: 'heritage',
  },
  {
    id: 'alibaug',
    name: 'Alibaug',
    region: 'Raigad, Maharashtra',
    tagline: 'Sea Forts & Coconut Shores',
    coords: { x: 60, y: 148 },
    image: '/src/assets/fishing-village.jpg',
    description:
      'Alibaug wears its history like a crown — the formidable Kulaba Fort rises directly from the sea, accessible only at low tide. A weekend retreat for Mumbaikars who forget it entirely once they arrive. The backwaters of Murud Creek shimmer in the late afternoon light.',
    highlights: ['Kulaba Sea Fort', 'Murud Creek', 'Varsoli Beach'],
    category: 'heritage',
  },
  {
    id: 'murud',
    name: 'Murud-Janjira',
    region: 'Raigad, Maharashtra',
    tagline: 'The Unconquered Island Fort',
    coords: { x: 66, y: 190 },
    image: '/src/assets/temple-carvings.jpg',
    description:
      'Murud-Janjira is the stuff of legend — an island fortress that never fell, not to the Marathas, not to the Portuguese, not to the British. Built by the Siddis of Janjira in the 17th century, it sits in the sea like a ghost ship of stone. No army ever breached its walls.',
    highlights: ['Janjira Island Fort', 'Siddi heritage', 'Rajapuri Caves'],
    category: 'heritage',
  },
  {
    id: 'harihareshwar',
    name: 'Harihareshwar',
    region: 'Raigad, Maharashtra',
    tagline: 'The Kashi of the South',
    coords: { x: 76, y: 238 },
    image: '/src/assets/ocean-cliffs.jpg',
    description:
      'Where the holy river Savitri meets the Arabian Sea, Harihareshwar sits at the confluence of the divine and the elemental. Black volcanic cliffs plunge into thundering surf. The ancient Harihareshwar temple, cut into the clifftop, is known as the Kashi of the South.',
    highlights: ['Harihareshwar Temple', 'Black rock cliffs', 'Shrivardhan Beach'],
    category: 'heritage',
  },
  {
    id: 'shrivardhan',
    name: 'Shrivardhan',
    region: 'Raigad, Maharashtra',
    tagline: 'Peshwa Roots by the Sea',
    coords: { x: 78, y: 248 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'Birthplace of the first Peshwa, Balaji Vishwanath, Shrivardhan pairs a quiet historical weight with one of the most laid-back beaches on the northern Konkan coast. Casuarina trees line the shore, and the town moves at the pace of the tide rather than the clock.',
    highlights: ['Shrivardhan Beach', 'Peshwa heritage', 'Casuarina groves'],
    category: 'beach',
  },
  {
    id: 'diveagar',
    name: 'Diveagar',
    region: 'Raigad, Maharashtra',
    tagline: 'Golden Sands & Buried Gold',
    coords: { x: 82, y: 262 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'Diveagar\'s wide, golden beach became briefly famous when a farmer unearthed a hoard of gold coins in his backyard — but its real treasure is the hush of its coconut groves and a shoreline that still sees olive ridley turtles nest each winter.',
    highlights: ['Diveagar Beach', 'Suvarna Ganesh Temple', 'Turtle nesting site'],
    category: 'nature',
  },
  {
    id: 'dapoli',
    name: 'Dapoli',
    region: 'Ratnagiri, Maharashtra',
    tagline: 'The Cool Highlands of the Coast',
    coords: { x: 90, y: 290 },
    image: '/src/assets/waterfall-forest.jpg',
    description:
      'Perched at 400 metres and overlooking the sea, Dapoli earns its nickname "Mahabaleshwar of Konkan." Waterfalls cascade from the Ghats into the sea, cashew and coconut groves tumble down hillsides, and the beaches of Keshavraj and Dabhol sit utterly pristine.',
    highlights: ['Keshavraj Beach', 'Ladghar Beach', 'Suvarnadurg Fort'],
    category: 'nature',
  },
  {
    id: 'velas',
    name: 'Velas',
    region: 'Ratnagiri, Maharashtra',
    tagline: 'Where Olive Ridleys Come to Birth',
    coords: { x: 88, y: 316 },
    image: '/src/assets/waterfall-forest.jpg',
    description:
      'Every February and March, Velas beach transforms into a nursery. Hundreds of olive ridley sea turtles haul themselves up the moonlit shore to nest. Villagers have become the fiercest protectors of these ancient travelers. To watch a clutch of hatchlings scramble toward the surf at dawn is to witness something irreplaceable.',
    highlights: ['Olive Ridley nesting', 'Velas Turtle Festival', 'Bankot Fort'],
    category: 'nature',
  },
  {
    id: 'guhagar',
    name: 'Guhagar',
    region: 'Ratnagiri, Maharashtra',
    tagline: 'A Beach Untouched by Time',
    coords: { x: 96, y: 342 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'Guhagar is what beaches are supposed to be — deserted, clean, and dramatic. Miles of pale sand backed by coconut palms with no hotels, no crowds. The Velneshwar temple stands just north, directly on the shoreline, where priests perform aarti as the sea spray rolls in.',
    highlights: ['Guhagar Beach', 'Velneshwar Temple', 'Anjarle Beach'],
    category: 'beach',
  },
  {
    id: 'ganpatipule',
    name: 'Ganpatipule',
    region: 'Ratnagiri, Maharashtra',
    tagline: 'The Swayambhu by the Sea',
    coords: { x: 104, y: 378 },
    image: '/src/assets/temple-carvings.jpg',
    description:
      'The swayambhu Ganesh idol at Ganpatipule faces west — the only one in Maharashtra. Ancient myth says Parashurama himself consecrated this ground. The beach wraps around the temple headland in a perfect horseshoe, and the sunrise seen from the rocky point is unlike any other.',
    highlights: ['Swayambhu Ganesh Temple', 'Ganpatipule Beach', 'Malgund poet village'],
    category: 'heritage',
  },
  {
    id: 'ratnagiri',
    name: 'Ratnagiri',
    region: 'Ratnagiri, Maharashtra',
    tagline: 'Alphonso Country',
    coords: { x: 110, y: 418 },
    image: '/src/assets/spice-plantation.jpg',
    description:
      'Ratnagiri is the capital of Hapus — the Alphonso mango, liquid gold in fruit form, that the world knows as the finest of its kind. The town also holds the last residence of Bahadur Shah Zafar\'s exile-companion Thibaw, a palace now converted to a poignant museum on a headland overlooking the sea.',
    highlights: ['Alphonso mango estates', 'Thibaw Palace', 'Ratnadurg Fort'],
    category: 'culture',
  },
  {
    id: 'devgad',
    name: 'Devgad',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'The Other Alphonso Coast',
    coords: { x: 116, y: 442 },
    image: '/src/assets/spice-plantation.jpg',
    description:
      'Devgad mangoes are quietly considered by connoisseurs to rival — some say surpass — the Ratnagiri Alphonso, grown on hillsides that catch the sea breeze at just the right angle. A 17th-century fort and lighthouse watch over the harbour below.',
    highlights: ['Devgad Alphonso orchards', 'Devgad Fort', 'Lighthouse point'],
    category: 'culture',
  },
  {
    id: 'kunkeshwar',
    name: 'Kunkeshwar',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'The Somnath of the Konkan',
    coords: { x: 120, y: 452 },
    image: '/src/assets/temple-carvings.jpg',
    description:
      'An ancient Shiva temple stands almost at the water\'s edge here, its stone shikhara catching the last light of the day as waves break just metres from the sanctum. Pilgrims and travelers alike come as much for the setting as the deity.',
    highlights: ['Kunkeshwar Temple', 'Beachfront sanctum', 'Quiet pilgrim town'],
    category: 'heritage',
  },
  {
    id: 'malvan',
    name: 'Malvan',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'Scuba Capital of India',
    coords: { x: 128, y: 470 },
    image: '/src/assets/ocean-cliffs.jpg',
    description:
      'Malvan\'s waters are crystalline — clear enough to follow a sea turtle down 15 metres. The Malvan Marine Sanctuary is India\'s finest scuba destination. Above water, the food is even more astonishing: Malvani cuisine, with its coconut-heavy curries and freshly caught fish, is one of India\'s great undiscovered culinary traditions.',
    highlights: ['Malvan Marine Sanctuary', 'Malvani cuisine', 'Rock Garden Beach'],
    category: 'adventure',
  },
  {
    id: 'sindhudurg',
    name: 'Sindhudurg Fort',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'Shivaji\'s Island Citadel',
    coords: { x: 124, y: 492 },
    image: '/src/assets/temple-carvings.jpg',
    description:
      'Built by Chhatrapati Shivaji Maharaj in 1664 on a rocky island, Sindhudurg is perhaps the most ambitious coastal fortress ever constructed on the Konkan. Its walls follow the natural contours of the rock across 48 acres. A temple inside holds the handprints and footprints of Shivaji himself, cast in plaster centuries ago.',
    highlights: ['Shivaji Maharaj handprints', '48-acre island fort', 'Lighthouse views'],
    category: 'heritage',
  },
  {
    id: 'tarkarli',
    name: 'Tarkarli',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'Backwaters & Crystal Sea',
    coords: { x: 134, y: 482 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'Where the Karli river meets the Arabian Sea, Tarkarli creates a rare phenomenon: a stretch of water that is simultaneously a calm, transparent backwater and a crashing sea beach. Houseboats drift here like floating dreams. The water is clear enough to read the bottom.',
    highlights: ['Karli backwaters', 'Houseboats', 'Snorkelling on Chivla Beach'],
    category: 'beach',
  },
  {
    id: 'vengurla',
    name: 'Vengurla',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'The Lighthouse Town',
    coords: { x: 144, y: 516 },
    image: '/src/assets/ocean-cliffs.jpg',
    description:
      'Vengurla is one of Konkan\'s most beautiful secrets. Its lighthouse is among the tallest on the western coast, its beaches are pristine and isolated, and its cashew distilleries produce a fiery local spirit with the character of the land itself. The town is utterly unhurried.',
    highlights: ['Vengurla Lighthouse', 'Sagareshwar Beach', 'Cashew feni distilleries'],
    category: 'beach',
  },
  {
    id: 'redi',
    name: 'Redi',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'The Coast\'s Quiet Last Word',
    coords: { x: 152, y: 528 },
    image: '/src/assets/ocean-cliffs.jpg',
    description:
      'Redi marks the last stretch of Maharashtra\'s coast before Goa begins — a sleepy beach town with a striking white Ganesh temple on a headland and the ruins of a small hill fort behind it. Iron-ore red earth gives the town its name and its distinctive soil colour.',
    highlights: ['Redi Beach', 'Yashwantgad Fort', 'White Ganesh temple'],
    category: 'beach',
  },
  {
    id: 'sawantwadi',
    name: 'Sawantwadi',
    region: 'Sindhudurg, Maharashtra',
    tagline: 'Royal Craft Town',
    coords: { x: 163, y: 506 },
    image: '/src/assets/folk-dance.jpg',
    description:
      'The last royal seat of the Bhosale dynasty before the Goa border, Sawantwadi is renowned across India for its lacquerware wooden toys — intricate, hand-painted pieces that have earned GI status. The palace complex stands at the edge of a shimmering lake. The royal family still lives here.',
    highlights: ['Sawantwadi Palace', 'Lacquerware toy-making', 'Moti Talav lake'],
    category: 'culture',
  },
  {
    id: 'panaji',
    name: 'Panaji',
    region: 'Goa',
    tagline: 'The Portuguese Soul of the South',
    coords: { x: 175, y: 542 },
    image: '/src/assets/fishing-village.jpg',
    description:
      'Panaji — or Panjim — is the smallest state capital in India and one of its most beautiful. Portuguese-era houses line the Fontainhas Latin Quarter in shades of ochre, terracotta, and canary yellow. The Mandovi River flows past at a pace that matches the city\'s tempo: unhurried, gilded, always about to pause.',
    highlights: ['Fontainhas Latin Quarter', 'Mandovi River Cruise', 'Church of Our Lady of Immaculate Conception'],
    category: 'heritage',
  },
  {
    id: 'karwar',
    name: 'Karwar',
    region: 'Uttara Kannada, Karnataka',
    tagline: 'Where Tagore Found His Muse',
    coords: { x: 195, y: 596 },
    image: '/src/assets/coastal-landscape.jpg',
    description:
      'At the southern tip of the Konkan stretch, Karwar is where Rabindranath Tagore spent formative months that would shape his creative voice. The Kali river enters the sea here through a dramatic estuary. The Devbagh beach cluster, reachable only by boat, may be the most beautiful beach in India that you have never seen.',
    highlights: ['Devbagh Beach cluster', 'Kali River estuary', 'Rabindranath Tagore connection'],
    category: 'beach',
  },
];

export const categoryColors: Record<Location['category'], string> = {
  heritage: '#c17f3a',
  nature:   '#3a9e6e',
  beach:    '#2a8fb5',
  culture:  '#a04e7a',
  adventure:'#d45f2a',
};
