export interface Location {
  id: string;
  name: string;
  region: string;
  tagline: string;
  coords: { x: number; y: number }; // SVG coordinates in 320×620 viewBox
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
