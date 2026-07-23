export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  nameTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  cuisineType: 'seafood' | 'vegetarian' | 'traditional' | 'fusion' | 'street_food';
  destinationId?: string;
  destinationName?: string;
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
  priceRange: 'budget' | 'mid' | 'expensive';
  specialties: string[];
  images: string[];
  contactPhone?: string;
  openingHours?: {
    [key: string]: string;
  };
  featured?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

export const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'patil-khanaval',
    name: 'Patil Khanaval',
    nameTranslations: {
      mr: 'पाटील खानावळ',
    },
    cuisineType: 'traditional',
    destinationId: '1',
    destinationName: 'Alibaug',
    coordinates: { lat: 18.6420, lng: 72.8750 },
    description: 'Authentic Konkani thali restaurant serving traditional home-style meals on banana leaf. Famous for sol kadhi and fish curry.',
    priceRange: 'budget',
    specialties: ['Konkani Fish Thali', 'Sol Kadhi', 'Bombil Fry', 'Modak', 'Ukdiche Modak'],
    images: ['/assets/konkani-thali.jpg', '/assets/fishing-traditions.jpg'],
    contactPhone: '+91-98234-11111',
    openingHours: {
      'Mon-Sun': '11:00 AM - 10:00 PM',
    },
    featured: true,
    averageRating: 4.7,
    reviewCount: 523,
  },
  {
    id: '2',
    slug: 'malvani-aswad',
    name: 'Malvani Aswad',
    nameTranslations: {
      mr: 'मालवणी आस्वाद',
    },
    cuisineType: 'seafood',
    destinationId: '3',
    destinationName: 'Tarkarli',
    coordinates: { lat: 16.0180, lng: 73.4680 },
    description: 'Specialty Malvani seafood restaurant known for fiery curries and fresh catch. Must-try Malvani chicken and surmai fry.',
    priceRange: 'mid',
    specialties: ['Malvani Chicken', 'Surmai Fry', 'Crab Masala', 'Prawns Koliwada', 'Solachi Kadi'],
    images: ['/assets/konkani-thali.jpg', '/assets/fishing-traditions.jpg'],
    contactPhone: '+91-98765-22222',
    openingHours: {
      'Mon-Sun': '12:00 PM - 11:00 PM',
    },
    featured: true,
    averageRating: 4.8,
    reviewCount: 687,
  },
  {
    id: '3',
    slug: 'coconut-grove',
    name: 'Coconut Grove',
    cuisineType: 'vegetarian',
    destinationId: '2',
    destinationName: 'Ganpatipule',
    coordinates: { lat: 17.1500, lng: 73.2650 },
    description: 'Pure vegetarian restaurant offering satvik meals near the temple. Specializes in South Indian and Maharashtrian cuisine.',
    priceRange: 'budget',
    specialties: ['Masala Dosa', 'Sabudana Khichdi', 'Puran Poli', 'Zunka Bhakar', 'Filter Coffee'],
    images: ['/assets/spice-plantation.jpg', '/assets/ganpatipule-temple.jpg'],
    contactPhone: '+91-98234-33333',
    openingHours: {
      'Mon-Sun': '7:00 AM - 10:00 PM',
    },
    featured: false,
    averageRating: 4.5,
    reviewCount: 234,
  },
  {
    id: '4',
    slug: 'beach-shack-cafe',
    name: 'Beach Shack Cafe',
    cuisineType: 'fusion',
    destinationId: '5',
    destinationName: 'Diveagar',
    coordinates: { lat: 18.1680, lng: 73.0020 },
    description: 'Beachside cafe offering fusion dishes, fresh juices, and seafood BBQ. Perfect sunset dining spot.',
    priceRange: 'mid',
    specialties: ['Grilled Fish', 'Seafood Platter', 'Coconut Water', 'Fruit Smoothies', 'Tandoori Prawns'],
    images: ['/assets/coastal-landscape.jpg', '/assets/diveagar-beach.jpg'],
    contactPhone: '+91-98765-44444',
    openingHours: {
      'Mon-Sun': '10:00 AM - 10:00 PM',
    },
    featured: false,
    averageRating: 4.4,
    reviewCount: 156,
  },
  {
    id: '5',
    slug: 'fort-view-dhaba',
    name: 'Fort View Dhaba',
    nameTranslations: {
      mr: 'किल्ला व्ह्यू ढाबा',
    },
    cuisineType: 'street_food',
    destinationId: '4',
    destinationName: 'Murud-Janjira',
    coordinates: { lat: 18.2970, lng: 72.9620 },
    description: 'Local dhaba serving quick bites and street food near Janjira Fort. Famous for vada pav and misal pav.',
    priceRange: 'budget',
    specialties: ['Vada Pav', 'Misal Pav', 'Pav Bhaji', 'Bhel Puri', 'Cutting Chai'],
    images: ['/assets/murud-janjira-fort.jpg', '/assets/forts-of-konkan.jpg'],
    contactPhone: '+91-98234-55555',
    openingHours: {
      'Mon-Sun': '8:00 AM - 8:00 PM',
    },
    featured: false,
    averageRating: 4.2,
    reviewCount: 89,
  },
];

export const cuisineTypeOptions = [
  { value: 'seafood', label: 'Seafood' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'traditional', label: 'Traditional Konkani' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'street_food', label: 'Street Food' },
];

export const restaurantPriceRangeOptions = [
  { value: 'budget', label: 'Budget (₹100-₹300)', min: 100, max: 300 },
  { value: 'mid', label: 'Mid-range (₹300-₹800)', min: 300, max: 800 },
  { value: 'expensive', label: 'Fine Dining (₹800+)', min: 800, max: 5000 },
];