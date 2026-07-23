export interface Accommodation {
  id: string;
  slug: string;
  name: string;
  nameTranslations?: {
    kn?: string;
    mr?: string;
    hi?: string;
  };
  type: 'hotel' | 'resort' | 'homestay' | 'beach_shack' | 'heritage' | 'eco_lodge';
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
  priceRange: 'budget' | 'mid' | 'luxury';
  priceMin?: number; // in INR
  priceMax?: number;
  amenities: string[];
  images: string[];
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  bookingUrl?: string;
  featured?: boolean;
  petFriendly?: boolean;
  familyFriendly?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

// Sample accommodations
export const sampleAccommodations: Accommodation[] = [
  {
    id: '1',
    slug: 'radisson-blu-alibaug',
    name: 'Radisson Blu Resort & Spa Alibaug',
    nameTranslations: {
      mr: 'रॅडिसन ब्लू रिसॉर्ट अलिबाग',
    },
    type: 'resort',
    destinationId: '1',
    destinationName: 'Alibaug',
    coordinates: { lat: 18.6494, lng: 72.8789 },
    description: 'Luxurious beachfront resort with world-class amenities, spa, multiple dining options, and stunning sea views.',
    priceRange: 'luxury',
    priceMin: 8000,
    priceMax: 25000,
    amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Beach Access', 'WiFi', 'Gym', 'Kids Play Area', 'Room Service'],
    images: ['/assets/homestays.jpg', '/assets/coastal-landscape.jpg'],
    contactPhone: '+91-22-67173000',
    website: 'https://www.radissonhotels.com',
    featured: true,
    petFriendly: false,
    familyFriendly: true,
    averageRating: 4.5,
    reviewCount: 342,
  },
  {
    id: '2',
    slug: 'mango-beach-house',
    name: 'Mango Beach House',
    nameTranslations: {
      mr: 'मँगो बीच हाऊस',
    },
    type: 'homestay',
    destinationId: '5',
    destinationName: 'Diveagar',
    coordinates: { lat: 18.1720, lng: 73.0050 },
    description: 'Authentic Konkani homestay experience with home-cooked meals, traditional hospitality, and direct beach access.',
    priceRange: 'budget',
    priceMin: 1500,
    priceMax: 3000,
    amenities: ['Home-cooked Meals', 'Beach Access', 'WiFi', 'Parking', 'Garden', 'Traditional Decor'],
    images: ['/assets/homestays.jpg', '/assets/fishing-village.jpg'],
    contactPhone: '+91-98765-43210',
    featured: true,
    petFriendly: true,
    familyFriendly: true,
    averageRating: 4.8,
    reviewCount: 156,
  },
  {
    id: '3',
    slug: 'konkan-blue-resort',
    name: 'Konkan Blue Resort',
    nameTranslations: {
      mr: 'कोंकण ब्लू रिसॉर्ट',
    },
    type: 'resort',
    destinationId: '3',
    destinationName: 'Tarkarli',
    coordinates: { lat: 16.0200, lng: 73.4700 },
    description: 'Beachfront resort perfect for water sports enthusiasts, offering scuba diving packages and beachside dining.',
    priceRange: 'mid',
    priceMin: 4000,
    priceMax: 8000,
    amenities: ['Water Sports', 'Restaurant', 'Beach Access', 'WiFi', 'Scuba Diving', 'Parking', 'AC Rooms'],
    images: ['/assets/tarkarli-backwaters.jpg', '/assets/water-sports.jpg'],
    contactPhone: '+91-98765-12345',
    website: 'https://konkanblueresort.com',
    featured: true,
    petFriendly: false,
    familyFriendly: true,
    averageRating: 4.6,
    reviewCount: 289,
  },
  {
    id: '4',
    slug: 'atithi-parinay-homestay',
    name: 'Atithi Parinay Homestay',
    nameTranslations: {
      mr: 'अतिथी परिणय होमस्टे',
    },
    type: 'homestay',
    destinationId: '2',
    destinationName: 'Ganpatipule',
    coordinates: { lat: 17.1520, lng: 73.2680 },
    description: 'Traditional homestay near Ganpati temple, offering authentic Konkani cuisine and peaceful village atmosphere.',
    priceRange: 'budget',
    priceMin: 1200,
    priceMax: 2500,
    amenities: ['Home-cooked Meals', 'WiFi', 'Parking', 'Garden', 'Temple Tours', 'Bicycle Rental'],
    images: ['/assets/homestays.jpg', '/assets/ganpatipule-temple.jpg'],
    contactPhone: '+91-98234-56789',
    featured: false,
    petFriendly: false,
    familyFriendly: true,
    averageRating: 4.7,
    reviewCount: 98,
  },
  {
    id: '5',
    slug: 'sagar-sawali-beach-resort',
    name: 'Sagar Sawali Beach Resort',
    nameTranslations: {
      mr: 'सागर सावळी बीच रिसॉर्ट',
    },
    type: 'beach_shack',
    destinationId: '3',
    destinationName: 'Tarkarli',
    coordinates: { lat: 16.0150, lng: 73.4650 },
    description: 'Rustic beach shacks with modern amenities, perfect for backpackers and budget travelers seeking beach vibes.',
    priceRange: 'budget',
    priceMin: 800,
    priceMax: 1800,
    amenities: ['Beach Access', 'Restaurant', 'Shared Kitchen', 'Bonfire', 'Hammocks', 'Basic WiFi'],
    images: ['/assets/coastal-landscape.jpg', '/assets/diveagar-beach.jpg'],
    contactPhone: '+91-97654-32109',
    featured: false,
    petFriendly: true,
    familyFriendly: false,
    averageRating: 4.3,
    reviewCount: 67,
  },
];

export const accommodationTypeOptions = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'resort', label: 'Resort' },
  { value: 'homestay', label: 'Homestay' },
  { value: 'beach_shack', label: 'Beach Shack' },
  { value: 'heritage', label: 'Heritage Stay' },
  { value: 'eco_lodge', label: 'Eco Lodge' },
];

export const priceRangeOptions = [
  { value: 'budget', label: 'Budget (₹500-₹2000)', min: 500, max: 2000 },
  { value: 'mid', label: 'Mid-range (₹2000-₹6000)', min: 2000, max: 6000 },
  { value: 'luxury', label: 'Luxury (₹6000+)', min: 6000, max: 50000 },
];

export const amenitiesOptions = [
  'Swimming Pool',
  'Spa',
  'Restaurant',
  'Beach Access',
  'WiFi',
  'Gym',
  'Parking',
  'Room Service',
  'AC Rooms',
  'Home-cooked Meals',
  'Garden',
  'Kids Play Area',
  'Pet Friendly',
  'Water Sports',
  'Scuba Diving',
  'Bicycle Rental',
  'Temple Tours',
  'Bonfire',
  'Shared Kitchen',
];