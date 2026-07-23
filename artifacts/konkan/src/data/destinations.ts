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
  type: 'beach' | 'fort' | 'temple' | 'hill' | 'village' | 'city';
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
  activities: string[];
  images: string[];
  featured?: boolean;
  trending?: boolean;
  hidden?: boolean;
  difficulty?: 'easy' | 'moderate' | 'difficult';
  distanceFromMumbai?: number; // in km
  averageRating?: number;
  reviewCount?: number;
}

// Sample destinations data (You'll expand this)
export const sampleDestinations: Destination[] = [
  {
    id: '1',
    slug: 'alibaug',
    name: 'Alibaug',
    nameTranslations: {
      mr: 'अलिबाग',
      hi: 'अलीबाग',
    },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.6414, lng: 72.8722 },
    description: 'A popular beach town known for its clean beaches, historic forts, and proximity to Mumbai. Perfect for weekend getaways.',
    highlights: [
      'Pristine beaches with water sports',
      'Historic Kolaba Fort accessible during low tide',
      'Fresh seafood and Konkani cuisine',
      'Magnetic Observatory',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    activities: ['beach', 'water_sports', 'fort_visit', 'food_tour'],
    images: [
      '/assets/alibaug-kulaba-fort.jpg',
      '/assets/coastal-landscape.jpg',
    ],
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
    nameTranslations: {
      mr: 'गणपतीपुळे',
      hi: 'गणपतिपुले',
    },
    region: 'central',
    type: 'temple',
    coordinates: { lat: 17.1507, lng: 73.2667 },
    description: 'A coastal town famous for the Swayambhu Ganpati temple and pristine beach. A perfect blend of spirituality and natural beauty.',
    highlights: [
      '400-year-old Ganpati temple',
      'Clean and serene beach',
      'Beach activities and camel rides',
      'Ratnadurg Fort nearby',
    ],
    bestTime: ['September', 'October', 'November', 'December', 'January', 'February'],
    activities: ['temple_visit', 'beach', 'photography', 'pilgrimage'],
    images: [
      '/assets/ganpatipule-temple.jpg',
      '/assets/coastal-landscape.jpg',
    ],
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
    nameTranslations: {
      mr: 'तारकर्ली',
      hi: 'तारकर्ली',
    },
    region: 'south',
    type: 'beach',
    coordinates: { lat: 16.0167, lng: 73.4667 },
    description: 'Famous for crystal-clear waters, scuba diving, and water sports. One of the best beaches in Maharashtra.',
    highlights: [
      'Crystal clear blue waters',
      'Scuba diving and snorkeling',
      'Sindhudurg Fort boat ride',
      'Backwater cruises',
      'Malvani cuisine',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    activities: ['scuba_diving', 'snorkeling', 'water_sports', 'boat_ride', 'food_tour'],
    images: [
      '/assets/tarkarli-backwaters.jpg',
      '/assets/water-sports.jpg',
    ],
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
    nameTranslations: {
      mr: 'मुरुड-जंजिरा',
      hi: 'मुरुड-जंजीरा',
    },
    region: 'north',
    type: 'fort',
    coordinates: { lat: 18.2962, lng: 72.9607 },
    description: 'Home to the majestic Janjira Fort - an unconquered sea fort standing proud in the Arabian Sea.',
    highlights: [
      'Unconquered Janjira Fort in the sea',
      'Historical architecture',
      'Boat ride to the fort',
      'Murud beach',
      'Local Siddi culture',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    activities: ['fort_visit', 'boat_ride', 'history_tour', 'beach', 'photography'],
    images: [
      '/assets/murud-janjira-fort.jpg',
      '/assets/forts-of-konkan.jpg',
    ],
    featured: true,
    hidden: false,
    difficulty: 'moderate',
    distanceFromMumbai: 165,
    averageRating: 4.6,
    reviewCount: 345,
  },
  {
    id: '5',
    slug: 'diveagar',
    name: 'Diveagar',
    nameTranslations: {
      mr: 'दिवेआगर',
      hi: 'दिवेआगर',
    },
    region: 'north',
    type: 'beach',
    coordinates: { lat: 18.1667, lng: 73.0 },
    description: 'A serene and less crowded beach destination, perfect for those seeking peace and tranquility.',
    highlights: [
      'Long stretch of pristine beach',
      'Suvarna Ganesh temple',
      'Peaceful environment',
      'Authentic village experience',
      'Fresh coconut water and seafood',
    ],
    bestTime: ['October', 'November', 'December', 'January', 'February', 'March'],
    activities: ['beach', 'temple_visit', 'village_tour', 'relaxation'],
    images: [
      '/assets/diveagar-beach.jpg',
      '/assets/coastal-landscape.jpg',
    ],
    hidden: true,
    difficulty: 'easy',
    distanceFromMumbai: 170,
    averageRating: 4.4,
    reviewCount: 156,
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
];

export const monthOptions = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
