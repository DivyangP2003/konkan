export interface Activity {
  id: string;
  slug: string;
  name: string;
  nameTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  category: 'adventure' | 'cultural' | 'nature' | 'wellness' | 'leisure';
  subcategory?: string;
  destinationId?: string;
  destinationName?: string;
  description: string;
  descriptionTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  duration: string;
  difficulty: 'easy' | 'moderate' | 'difficult';
  price?: number;
  season: string[];
  safetyGuidelines?: string[];
  equipmentNeeded?: string[];
  images: string[];
  bookingRequired: boolean;
  contactInfo?: string;
  featured?: boolean;
  familyFriendly?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export const sampleActivities: Activity[] = [
  {
    id: '1',
    slug: 'scuba-diving-tarkarli',
    name: 'Scuba Diving at Tarkarli',
    nameTranslations: {
      mr: 'तारकर्ली येथे स्कूबा डायव्हिंग',
    },
    category: 'adventure',
    subcategory: 'water_sports',
    destinationId: '3',
    destinationName: 'Tarkarli',
    description: 'Explore the crystal-clear waters of Tarkarli with certified instructors. See coral reefs, colorful fish, and underwater marine life.',
    duration: '2-3 hours',
    difficulty: 'moderate',
    price: 2500,
    season: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    safetyGuidelines: [
      'Must know basic swimming',
      'No heart or respiratory conditions',
      'Follow instructor guidelines',
      'Minimum age 10 years',
    ],
    equipmentNeeded: ['Provided by operator (wetsuit, tank, mask)'],
    images: ['/assets/water-sports.jpg', '/assets/tarkarli-backwaters.jpg'],
    bookingRequired: true,
    contactInfo: '+91-98765-00001',
    featured: true,
    familyFriendly: false,
    averageRating: 4.9,
    reviewCount: 456,
  },
  {
    id: '2',
    slug: 'janjira-fort-tour',
    name: 'Janjira Fort Boat Tour',
    nameTranslations: {
      mr: 'जंजिरा किल्ला बोट टूर',
    },
    category: 'cultural',
    subcategory: 'history_tour',
    destinationId: '4',
    destinationName: 'Murud-Janjira',
    description: 'Take a boat ride to the historic unconquered Janjira Fort. Learn about Maratha naval history and explore the fort ruins.',
    duration: '2 hours',
    difficulty: 'easy',
    price: 300,
    season: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    safetyGuidelines: [
      'Wear comfortable footwear',
      'Carry water bottle',
      'Follow guide instructions',
    ],
    equipmentNeeded: ['None'],
    images: ['/assets/murud-janjira-fort.jpg', '/assets/forts-of-konkan.jpg'],
    bookingRequired: false,
    contactInfo: 'Available at Murud Jetty',
    featured: true,
    familyFriendly: true,
    averageRating: 4.7,
    reviewCount: 342,
  },
  {
    id: '3',
    slug: 'waterfall-trek-monsoon',
    name: 'Monsoon Waterfall Trek',
    nameTranslations: {
      mr: 'पावसाळ्यातील धबधब्याची ट्रेकिंग',
    },
    category: 'nature',
    subcategory: 'trekking',
    destinationId: '1',
    destinationName: 'Alibaug',
    description: 'Trek through lush green forests to discover hidden waterfalls during monsoon. Experience the raw beauty of Konkan nature.',
    duration: 'Full day (6-7 hours)',
    difficulty: 'moderate',
    price: 1200,
    season: ['June', 'July', 'August', 'September'],
    safetyGuidelines: [
      'Wear trekking shoes with grip',
      'Carry rain gear',
      'Stay with the group',
      'Inform about medical conditions',
    ],
    equipmentNeeded: ['Trekking shoes', 'Backpack', 'Rain jacket', 'Water bottle'],
    images: ['/assets/waterfall-forest.jpg', '/assets/monsoon.jpg'],
    bookingRequired: true,
    contactInfo: '+91-98765-00002',
    featured: true,
    familyFriendly: false,
    averageRating: 4.8,
    reviewCount: 234,
  },
  {
    id: '4',
    slug: 'yoga-retreat-beach',
    name: 'Beach Yoga & Wellness Retreat',
    nameTranslations: {
      mr: 'समुद्रकिनारी योग आणि निरोगीपणा शिबिर',
    },
    category: 'wellness',
    subcategory: 'yoga',
    destinationId: '2',
    destinationName: 'Ganpatipule',
    description: 'Morning yoga sessions on the beach followed by meditation and healthy breakfast. Rejuvenate your mind and body.',
    duration: '3 hours (morning)',
    difficulty: 'easy',
    price: 800,
    season: ['All year'],
    safetyGuidelines: [
      'Wear comfortable yoga attire',
      'Come on empty stomach',
      'Inform about injuries',
    ],
    equipmentNeeded: ['Yoga mat provided', 'Comfortable clothing'],
    images: ['/assets/coastal-landscape.jpg', '/assets/ganpatipule-temple.jpg'],
    bookingRequired: true,
    contactInfo: '+91-98765-00003',
    featured: false,
    familyFriendly: true,
    averageRating: 4.6,
    reviewCount: 156,
  },
  {
    id: '5',
    slug: 'konkan-village-tour',
    name: 'Traditional Konkan Village Tour',
    nameTranslations: {
      mr: 'पारंपरिक कोंकण गाव टूर',
    },
    category: 'cultural',
    subcategory: 'village_tour',
    destinationId: '5',
    destinationName: 'Diveagar',
    description: 'Experience authentic village life, visit local temples, interact with fishermen, and enjoy home-cooked Konkani meal.',
    duration: 'Half day (4-5 hours)',
    difficulty: 'easy',
    price: 600,
    season: ['All year'],
    safetyGuidelines: [
      'Respect local customs',
      'Dress modestly for temple visits',
      'Follow guide instructions',
    ],
    equipmentNeeded: ['Camera', 'Comfortable walking shoes'],
    images: ['/assets/fishing-village.jpg', '/assets/homestays.jpg'],
    bookingRequired: true,
    contactInfo: '+91-98765-00004',
    featured: true,
    familyFriendly: true,
    averageRating: 4.9,
    reviewCount: 289,
  },
];

export const activityCategoryOptions = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'nature', label: 'Nature' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'leisure', label: 'Leisure' },
];

export const activityDifficultyOptions = [
  { value: 'easy', label: 'Easy - All ages' },
  { value: 'moderate', label: 'Moderate - Requires fitness' },
  { value: 'difficult', label: 'Difficult - Advanced' },
];