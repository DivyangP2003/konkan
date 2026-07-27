// Konkan Transport Data — curated schedules and booking links
// Train data based on Konkan Railway public timetable
// Bus/ferry data curated from MSRTC/KSRTC official sources

export type TransportMode = 'train' | 'bus' | 'ferry' | 'cab';

export interface TransportRoute {
  id: string;
  mode: TransportMode;
  name: string;
  from: string;
  to: string;
  duration: string;
  frequency: string;
  priceRange: string;
  bookingUrl?: string;
  notes?: string;
  highlights?: string[];
  schedule?: { departure: string; arrival: string; days: string }[];
}

export interface CabProvider {
  id: string;
  name: string;
  type: 'ola' | 'uber' | 'local';
  coverage: string[];
  url?: string;
  phone?: string;
  notes?: string;
}

// ── Train Routes ─────────────────────────────────────────────────────────────
export const trainRoutes: TransportRoute[] = [
  {
    id: 'tr1',
    mode: 'train',
    name: 'Mumbai–Goa Express (Konkan Railway)',
    from: 'Mumbai (CST/Dadar)',
    to: 'Madgaon (Goa)',
    duration: '11–13 hrs',
    frequency: 'Multiple daily',
    priceRange: '₹350–₹2,800 (Sleeper to 2AC)',
    bookingUrl: 'https://www.irctc.co.in',
    highlights: [
      'Crosses 2,000+ bridges & 91 tunnels',
      'Scenic Western Ghats & Konkan coast',
      'Stops: Panvel, Pen, Mangaon, Khed, Chiplun, Ratnagiri, Sindhudurg',
      'Book 60 days in advance for best availability',
    ],
    schedule: [
      { departure: '06:05', arrival: '19:30', days: 'Daily' },
      { departure: '11:05', arrival: '23:45', days: 'Daily' },
      { departure: '22:25', arrival: '11:15', days: 'Daily' },
    ],
    notes: 'Pre-book 60 days ahead, especially for weekends & festivals.',
  },
  {
    id: 'tr2',
    mode: 'train',
    name: 'Jan Shatabdi — Mumbai–Ratnagiri',
    from: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    to: 'Ratnagiri',
    duration: '6–7 hrs',
    frequency: 'Daily except Tuesday',
    priceRange: '₹400–₹1,000',
    bookingUrl: 'https://www.irctc.co.in',
    highlights: [
      'Day train — panoramic coastal views',
      'AC Chair Car comfortable for day travel',
      'Returns same day from Ratnagiri',
    ],
    schedule: [
      { departure: '05:25', arrival: '12:20', days: 'Daily (exc. Tue)' },
    ],
    notes: 'Best daytime Konkan Railway experience.',
  },
  {
    id: 'tr3',
    mode: 'train',
    name: 'Mumbai–Sawantwadi Road (Konkan Railway)',
    from: 'Mumbai (Dadar/Panvel)',
    to: 'Sawantwadi Road (for Malvan/Vengurla)',
    duration: '9–11 hrs',
    frequency: 'Multiple daily',
    priceRange: '₹300–₹2,400',
    bookingUrl: 'https://www.irctc.co.in',
    highlights: [
      'Gateway to southern Konkan',
      'Alight here for Malvan, Tarkarli, Vengurla',
      'Local cabs/buses to beach destinations from station',
    ],
    schedule: [
      { departure: '22:25', arrival: '08:45', days: 'Daily' },
      { departure: '11:05', arrival: '21:30', days: 'Daily' },
    ],
  },
  {
    id: 'tr4',
    mode: 'train',
    name: 'Mandovi Express — Mumbai–Madgaon',
    from: 'Lokmanya Tilak Terminus (LTT)',
    to: 'Madgaon',
    duration: '12 hrs',
    frequency: '5 days/week',
    priceRange: '₹320–₹2,600',
    bookingUrl: 'https://www.irctc.co.in',
    highlights: [
      'Overnight train — departs evening, arrives morning',
      'Good for Goa + south Konkan combo trips',
    ],
    schedule: [
      { departure: '07:10', arrival: '19:50', days: 'Mon, Wed, Thu, Fri, Sun' },
    ],
  },
];

// ── Bus Routes ──────────────────────────────────────────────────────────────
export const busRoutes: TransportRoute[] = [
  {
    id: 'bus1',
    mode: 'bus',
    name: 'Mumbai–Alibaug (MSRTC)',
    from: 'Mumbai (CST / Thane)',
    to: 'Alibaug Bus Stand',
    duration: '3.5–4.5 hrs',
    frequency: 'Every 30–60 min',
    priceRange: '₹120–₹200',
    bookingUrl: 'https://msrtcprs.in',
    highlights: [
      'Via NH66 highway',
      'Alternative: ferry to Mandwa + local cab/auto to Alibaug (faster, scenic)',
    ],
    schedule: [
      { departure: '06:00', arrival: '10:00', days: 'Daily' },
      { departure: '08:00', arrival: '12:30', days: 'Daily' },
      { departure: '16:00', arrival: '20:00', days: 'Daily' },
    ],
  },
  {
    id: 'bus2',
    mode: 'bus',
    name: 'Mumbai–Ganpatipule (MSRTC Shivshahi)',
    from: 'Mumbai (Borivali / Dadar)',
    to: 'Ganpatipule',
    duration: '7–9 hrs',
    frequency: 'Daily',
    priceRange: '₹350–₹650',
    bookingUrl: 'https://msrtcprs.in',
    highlights: [
      'Shivshahi semi-sleeper available',
      'Night bus — departs Dadar ~10pm, arrives early morning',
    ],
    schedule: [
      { departure: '22:00', arrival: '06:30', days: 'Daily' },
    ],
  },
  {
    id: 'bus3',
    mode: 'bus',
    name: 'Mumbai–Ratnagiri (MSRTC / Private)',
    from: 'Mumbai (Borivali / Dadar)',
    to: 'Ratnagiri Bus Stand',
    duration: '7–8 hrs',
    frequency: 'Multiple daily',
    priceRange: '₹350–₹900',
    bookingUrl: 'https://www.redbus.in',
    highlights: [
      'Private Neeta / Paulo Travels have AC options',
      'Book via Redbus for best availability',
    ],
    schedule: [
      { departure: '21:30', arrival: '05:30', days: 'Daily' },
      { departure: '23:00', arrival: '07:00', days: 'Daily' },
    ],
  },
  {
    id: 'bus4',
    mode: 'bus',
    name: 'Mumbai–Malvan (Private Sleeper)',
    from: 'Mumbai (Borivali / CST)',
    to: 'Malvan Bus Stand',
    duration: '10–12 hrs',
    frequency: 'Daily',
    priceRange: '₹550–₹1,200',
    bookingUrl: 'https://www.redbus.in',
    highlights: [
      'Overnight sleeper — most comfortable option',
      'Operators: Neeta, Paulo, Orange Travels',
    ],
    schedule: [
      { departure: '20:00', arrival: '08:00', days: 'Daily' },
      { departure: '22:00', arrival: '10:00', days: 'Daily' },
    ],
  },
  {
    id: 'bus5',
    mode: 'bus',
    name: 'Pune–Ratnagiri / Chiplun (MSRTC)',
    from: 'Pune (Swargate / Shivajinagar)',
    to: 'Ratnagiri / Chiplun',
    duration: '4.5–6 hrs',
    frequency: 'Multiple daily',
    priceRange: '₹280–₹500',
    bookingUrl: 'https://msrtcprs.in',
    highlights: [
      'Via Tamhini Ghat — scenic monsoon route',
      'Good option from Pune for central Konkan',
    ],
    schedule: [
      { departure: '06:30', arrival: '12:00', days: 'Daily' },
      { departure: '14:00', arrival: '19:30', days: 'Daily' },
    ],
  },
];

// ── Ferry Routes ─────────────────────────────────────────────────────────────
export const ferryRoutes: TransportRoute[] = [
  {
    id: 'f1',
    mode: 'ferry',
    name: 'Gateway of India → Mandwa Ferry',
    from: 'Gateway of India, Mumbai',
    to: 'Mandwa Jetty (Alibaug)',
    duration: '1 hr',
    frequency: 'Every 30–60 min, 6am–6pm',
    priceRange: '₹160–₹200 (one way)',
    bookingUrl: 'https://www.mahablipra.gov.in',
    highlights: [
      'Scenic sea crossing',
      'Views of Mumbai skyline & Elephanta Island',
      'From Mandwa: local ST bus or auto to Alibaug (30 min)',
      'Avoid weekends — very crowded; book advance ticket',
    ],
    schedule: [
      { departure: '06:00', arrival: '07:00', days: 'Daily' },
      { departure: '08:00', arrival: '09:00', days: 'Daily' },
      { departure: '10:00', arrival: '11:00', days: 'Daily' },
      { departure: '14:00', arrival: '15:00', days: 'Daily' },
      { departure: '16:30', arrival: '17:30', days: 'Daily' },
    ],
    notes: 'Service may be suspended in rough monsoon seas. Check MAHABL PRA site.',
  },
  {
    id: 'f2',
    mode: 'ferry',
    name: 'Mandwa → Gateway of India (Return)',
    from: 'Mandwa Jetty',
    to: 'Gateway of India, Mumbai',
    duration: '1 hr',
    frequency: 'Every 30–60 min, 7am–7pm',
    priceRange: '₹160–₹200',
    bookingUrl: 'https://www.mahablipra.gov.in',
    highlights: ['Same route in reverse', 'Last ferry 6:30pm from Mandwa'],
    schedule: [
      { departure: '07:30', arrival: '08:30', days: 'Daily' },
      { departure: '12:00', arrival: '13:00', days: 'Daily' },
      { departure: '17:00', arrival: '18:00', days: 'Daily' },
    ],
    notes: 'Last ferry from Mandwa typically at 6:30pm.',
  },
  {
    id: 'f3',
    mode: 'ferry',
    name: 'Janjira Fort Boat (Murud)',
    from: 'Rajapuri Jetty, Murud',
    to: 'Janjira Fort (Island)',
    duration: '30 min',
    frequency: 'On demand, 7am–5pm',
    priceRange: '₹30–₹50/person (shared boat)',
    highlights: [
      'Shared wooden rowboats only — no motorboats allowed',
      'Fort open 7am to 5:30pm',
      'Last return boat at 5pm — don\'t miss it',
    ],
    schedule: [
      { departure: 'On demand', arrival: '~30 min crossing', days: 'Daily (weather permitting)' },
    ],
    notes: 'Fort closed during heavy monsoon rains. No boat in rough seas.',
  },
  {
    id: 'f4',
    mode: 'ferry',
    name: 'Sindhudurg Fort Boat (Malvan)',
    from: 'Malvan Jetty',
    to: 'Sindhudurg Fort (Island)',
    duration: '10 min',
    frequency: 'Every 30 min, 8am–6pm',
    priceRange: '₹20–₹40/person',
    bookingUrl: 'https://sindhudurg.nic.in',
    highlights: [
      'One of the most accessible sea forts',
      'Boat + fort entry included in combined ticket',
    ],
    schedule: [
      { departure: '08:00–18:00', arrival: '10 min crossing', days: 'Daily' },
    ],
  },
  {
    id: 'f5',
    mode: 'ferry',
    name: 'Karwar–Malvan Coastal Ferry (Seasonal)',
    from: 'Karwar Port, Karnataka',
    to: 'Malvan',
    duration: '2.5 hrs',
    frequency: 'Seasonal (Oct–Apr), 3x/week',
    priceRange: '₹200–₹400',
    highlights: [
      'Scenic coastal route — best in calm winter seas',
      'Not operational June–September',
      'Check local schedules before planning',
    ],
    schedule: [
      { departure: '08:00', arrival: '10:30', days: 'Mon, Wed, Fri (Oct–Apr)' },
    ],
    notes: 'Seasonal service. Verify with Malvan Port Authority before travel.',
  },
];

// ── Cab Providers ──────────────────────────────────────────────────────────
export const cabProviders: CabProvider[] = [
  {
    id: 'cab1',
    name: 'Ola Cabs',
    type: 'ola',
    coverage: ['Alibaug', 'Ratnagiri', 'Malvan', 'Sindhudurg', 'Chiplun', 'Khed'],
    url: 'https://www.olacabs.com',
    notes: 'Available in major Konkan towns. Download app in advance.',
  },
  {
    id: 'cab2',
    name: 'Uber',
    type: 'uber',
    coverage: ['Alibaug', 'Ratnagiri', 'Malvan'],
    url: 'https://www.uber.com',
    notes: 'Limited availability in remote areas.',
  },
  {
    id: 'cab3',
    name: 'Local Konkan Cab Network',
    type: 'local',
    coverage: ['All Konkan'],
    phone: 'Ask your homestay for local cab contacts',
    notes: 'Strongly recommended for inter-town travel. Rates: ₹15–20/km. Negotiate fixed rates for day trips. Most homestays have trusted cab contacts.',
  },
  {
    id: 'cab4',
    name: 'Auto Rickshaws',
    type: 'local',
    coverage: ['Within towns'],
    notes: 'Available within all Konkan towns. Meter or negotiated fare. ₹30–150 for short trips.',
  },
];

export const modeConfig: Record<TransportMode, { label: string; icon: string; color: string; bg: string }> = {
  train: { label: 'Train',   icon: '🚂', color: '#c17f3a', bg: '#c17f3a15' },
  bus:   { label: 'Bus',     icon: '🚌', color: '#3a9e6e', bg: '#3a9e6e15' },
  ferry: { label: 'Ferry',   icon: '⛴️', color: '#2a8fb5', bg: '#2a8fb515' },
  cab:   { label: 'Cab',     icon: '🚗', color: '#d45f2a', bg: '#d45f2a15' },
};
