import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.destinations': 'Destinations',
      'nav.stay': 'Stay',
      'nav.food': 'Food',
      'nav.activities': 'Activities',
      'nav.itineraries': 'Itineraries',
      'nav.experiences': 'Experiences',
      'nav.travelGuide': 'Travel Guide',
      'nav.blog': 'Blog',
      'nav.signIn': 'Sign In',
      'nav.signOut': 'Sign Out',
      'nav.myTrips': 'My Trips',
      
      // Destinations page
      'destinations.title': 'Explore Konkan Destinations',
      'destinations.subtitle': 'Discover the beauty and diversity of Konkan region',
      'destinations.search': 'Search destinations...',
      'destinations.filter': 'Filter',
      'destinations.sort': 'Sort by',
      'destinations.showMap': 'Show Map',
      'destinations.hideMap': 'Hide Map',
      'destinations.noResults': 'No destinations found',
      'destinations.featured': 'Featured',
      'destinations.trending': 'Trending',
      'destinations.hidden': 'Hidden Gems',
      
      // Filters
      'filter.region': 'Region',
      'filter.type': 'Type',
      'filter.difficulty': 'Difficulty',
      'filter.activities': 'Activities',
      'filter.bestTime': 'Best Time',
      'filter.reset': 'Reset Filters',
      'filter.apply': 'Apply',
      
      // Regions
      'region.north': 'North Konkan',
      'region.central': 'Central Konkan',
      'region.south': 'South Konkan',
      
      // Types
      'type.beach': 'Beach',
      'type.fort': 'Fort',
      'type.temple': 'Temple',
      'type.hill': 'Hill Station',
      'type.village': 'Village',
      'type.city': 'City',
      
      // Difficulty
      'difficulty.easy': 'Easy',
      'difficulty.moderate': 'Moderate',
      'difficulty.difficult': 'Difficult',
      
      // Common
      'common.viewDetails': 'View Details',
      'common.learnMore': 'Learn More',
      'common.bookNow': 'Book Now',
      'common.readMore': 'Read More',
      'common.showLess': 'Show Less',
      'common.loading': 'Loading...',
      'common.error': 'Something went wrong',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.create': 'Create',
      'common.update': 'Update',
    },
  },
  kn: {
    translation: {
      // Navigation (Konkani - Add proper translations)
      'nav.home': 'घर',
      'nav.destinations': 'गंतव्य',
      'nav.stay': 'राहणे',
      'nav.food': 'खाण्याचे',
      'nav.activities': 'क्रियाकलाप',
      'nav.itineraries': 'प्रवास योजना',
      'nav.experiences': 'अनुभव',
      'nav.travelGuide': 'प्रवास मार्गदर्शक',
      'nav.blog': 'ब्लॉग',
      'nav.signIn': 'साइन इन',
      'nav.signOut': 'साइन आउट',
      'nav.myTrips': 'माझे प्रवास',
      
      // Add more Konkani translations
      'destinations.title': 'कोंकण गंतव्य शोधा',
      'destinations.subtitle': 'कोंकण प्रदेशाचे सौंदर्य आणि विविधता शोधा',
    },
  },
  mr: {
    translation: {
      // Navigation (Marathi)
      'nav.home': 'मुख्यपृष्ठ',
      'nav.destinations': 'गंतव्ये',
      'nav.stay': 'राहण्याची सोय',
      'nav.food': 'खाणे',
      'nav.activities': 'क्रियाकलाप',
      'nav.itineraries': 'प्रवास योजना',
      'nav.experiences': 'अनुभव',
      'nav.travelGuide': 'प्रवास मार्गदर्शक',
      'nav.blog': 'ब्लॉग',
      'nav.signIn': 'साइन इन करा',
      'nav.signOut': 'साइन आउट करा',
      'nav.myTrips': 'माझे प्रवास',
      
      'destinations.title': 'कोंकण गंतव्ये एक्सप्लोर करा',
      'destinations.subtitle': 'कोंकण प्रदेशाचे सौंदर्य आणि विविधता शोधा',
    },
  },
  hi: {
    translation: {
      // Navigation (Hindi)
      'nav.home': 'होम',
      'nav.destinations': 'गंतव्य',
      'nav.stay': 'ठहरना',
      'nav.food': 'भोजन',
      'nav.activities': 'गतिविधियाँ',
      'nav.itineraries': 'यात्रा योजना',
      'nav.experiences': 'अनुभव',
      'nav.travelGuide': 'यात्रा गाइड',
      'nav.blog': 'ब्लॉग',
      'nav.signIn': 'साइन इन करें',
      'nav.signOut': 'साइन आउट करें',
      'nav.myTrips': 'मेरी यात्राएँ',
      
      'destinations.title': 'कोंकण गंतव्यों का अन्वेषण करें',
      'destinations.subtitle': 'कोंकण क्षेत्र की सुंदरता और विविधता की खोज करें',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
