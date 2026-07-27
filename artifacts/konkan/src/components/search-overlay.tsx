import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, MapPin, Hotel, Compass, ArrowRight, Clock,
  ChevronRight, TrendingUp, Star, Zap,
} from 'lucide-react';
import { useLocation } from 'wouter';
import { sampleDestinations } from '@/data/destinations';
import { sampleAccommodations } from '@/data/accommodations';
import { sampleBusinesses } from '@/data/businesses';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ResultKind = 'destination' | 'stay' | 'business' | 'page';

interface SearchResult {
  id:        string;
  kind:      ResultKind;
  title:     string;
  subtitle:  string;
  href:      string;
  image?:    string;
  accent?:   string;
  matchTag?: string; // why this result matched
  score?:    number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const KIND_META: Record<ResultKind, { label: string; icon: typeof Search; color: string }> = {
  destination: { label: 'Destination', icon: MapPin,     color: '#3a9e6e' },
  stay:        { label: 'Stay',        icon: Hotel,      color: '#c17f3a' },
  business:    { label: 'Business',    icon: Compass,    color: '#2a8fb5' },
  page:        { label: 'Page',        icon: ArrowRight, color: '#a0a0a0' },
};

const PAGE_LINKS: SearchResult[] = [
  { id: 'p-destinations', kind: 'page', title: 'Destinations',     subtitle: 'Explore all Konkan places',     href: '/destinations', accent: '#3a9e6e' },
  { id: 'p-stay',         kind: 'page', title: 'Stay',             subtitle: 'Homestays, resorts & more',     href: '/stay',         accent: '#c17f3a' },
  { id: 'p-food',         kind: 'page', title: 'Food',             subtitle: 'Authentic Konkan cuisine',      href: '/food',         accent: '#d45f2a' },
  { id: 'p-activities',   kind: 'page', title: 'Activities',       subtitle: 'Things to do',                  href: '/activities',   accent: '#2a8fb5' },
  { id: 'p-adventure',    kind: 'page', title: 'Adventure',        subtitle: 'Treks, water sports & more',    href: '/adventure',    accent: '#3a9e6e' },
  { id: 'p-plan',         kind: 'page', title: 'Plan Your Trip',   subtitle: 'Build your Konkan itinerary',   href: '/plan',         accent: '#c17f3a' },
  { id: 'p-booking',      kind: 'page', title: 'Book Transport',   subtitle: 'Trains, buses, ferries & cabs', href: '/booking',      accent: '#2a8fb5' },
  { id: 'p-businesses',   kind: 'page', title: 'Local Businesses', subtitle: 'Guides, eateries, artisans',    href: '/businesses',   accent: '#3a9e6e' },
  { id: 'p-culture',      kind: 'page', title: 'Culture',          subtitle: 'Art, music & traditions',       href: '/culture',      accent: '#c17f3a' },
  { id: 'p-heritage',     kind: 'page', title: 'Heritage',         subtitle: 'Forts, temples & history',      href: '/heritage',     accent: '#8b5e3a' },
  { id: 'p-spiritual',    kind: 'page', title: 'Spiritual',        subtitle: 'Sacred temples & pilgrimages',  href: '/spiritual',    accent: '#d45f2a' },
  { id: 'p-seasonal',     kind: 'page', title: 'Seasonal Guide',   subtitle: 'Best time to visit',            href: '/seasonal',     accent: '#3a9e6e' },
];

const POPULAR_QUERIES = [
  'Alibaug', 'Tarkarli', 'Malvan', 'Ganpatipule',
  'Scuba diving', 'Budget beach', 'Winter forts', 'Monsoon treks',
];

// ─────────────────────────────────────────────────────────────────────────────
// NLP helpers
// ─────────────────────────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a','an','the','in','at','of','to','for','and','or','is','are','was',
  'be','do','go','me','my','we','us','i','it','its','on','by','as','up',
  'with','near','visit','best','place','places','things','thing','find',
  'show','get','see',
]);

function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2 && !STOP_WORDS.has(t));
}

// ─────────────────────────────────────────────────────────────────────────────
// Alias / synonym dictionary (no fuzzy — just clean lookups)
// ─────────────────────────────────────────────────────────────────────────────

const ALIASES: Record<string, string[]> = {
  // Activities
  beach:       ['coastal', 'shore', 'sand', 'sandy', 'seaside', 'swimming'],
  fort:        ['fortress', 'maratha', 'castle', 'citadel', 'historical', 'fort_visit'],
  temple:      ['shrine', 'mandir', 'pilgrimage', 'spiritual', 'sacred', 'devata', 'temple_visit'],
  dive:        ['scuba', 'scuba_diving', 'snorkeling', 'underwater', 'diving', 'coral'],
  scuba:       ['diving', 'scuba_diving', 'snorkeling', 'underwater', 'coral', 'malvan'],
  snorkeling:  ['scuba', 'underwater', 'coral', 'marine'],
  trek:        ['trekking', 'hiking', 'hike', 'trail', 'walk', 'coastal_trail'],
  trekking:    ['trek', 'hike', 'trail', 'adventure', 'cliff'],
  kayak:       ['kayaking', 'backwater', 'river', 'canoe'],
  boat:        ['boat_ride', 'ferry', 'cruise', 'boating'],
  fish:        ['fishing', 'fishermen', 'seafood', 'catch'],
  // Food & stay
  food:        ['cuisine', 'eatery', 'restaurant', 'malvani', 'seafood', 'konkani', 'thali'],
  seafood:     ['fish', 'prawn', 'crab', 'malvani', 'konkani'],
  homestay:    ['home_stay', 'bed_breakfast', 'guesthouse', 'family', 'local', 'traditional'],
  resort:      ['hotel', 'accommodation', 'lodge', 'luxury'],
  camping:     ['campsite', 'beach_camp', 'cliff_camp', 'tent', 'bonfire'],
  // Nature
  waterfall:   ['falls', 'cascade', 'monsoon', 'water'],
  wildlife:    ['sanctuary', 'forest', 'nature', 'birds', 'animals'],
  bird:        ['birding', 'birdwatching', 'wildlife', 'nature', 'ornithology'],
  mangrove:    ['backwater', 'estuary', 'wetland', 'kayak'],
  // Seasons
  monsoon:     ['rain', 'july', 'august', 'green', 'lush', 'waterfall', 'rainy'],
  winter:      ['december', 'january', 'february', 'november', 'cool', 'best_time'],
  summer:      ['april', 'may', 'march', 'hot', 'mango', 'alphonso'],
  // Produce
  mango:       ['alphonso', 'devgad', 'ratnagiri', 'hapus', 'orchard', 'summer'],
  alphonso:    ['mango', 'hapus', 'devgad', 'ratnagiri'],
  coconut:     ['konkani', 'coastal', 'traditional'],
  // History
  heritage:    ['history', 'historical', 'ancient', 'monument', 'fort', 'colonial'],
  maratha:     ['shivaji', 'peshwa', 'fort', 'historical', 'warrior'],
  // Budget
  budget:      ['cheap', 'affordable', 'low_cost', 'backpacker', 'value'],
  luxury:      ['premium', 'high_end', 'expensive', 'five_star', 'deluxe'],
  // Locations
  malvan:      ['malvani', 'sindhudurg', 'tarkarli', 'south_konkan'],
  ratnagiri:   ['ratnadurg', 'ganpatipule', 'central_konkan'],
  alibaug:     ['alibag', 'north_konkan', 'kulaba'],
  // Other
  lighthouse:  ['vengurla', 'coast', 'historical'],
  guide:       ['tour_guide', 'local_guide', 'certified', 'tour'],
  family:      ['kids', 'children', 'family_friendly', 'safe'],
  adventure:   ['adrenaline', 'extreme', 'water_sports', 'trekking', 'rappelling'],
  island:      ['islandgetaway', 'boat', 'isolated', 'remote'],
};

function expandTokens(tokens: string[]): string[] {
  const set = new Set(tokens);
  for (const t of tokens) {
    (ALIASES[t] ?? []).forEach(a => set.add(a));
  }
  return Array.from(set);
}

// ─────────────────────────────────────────────────────────────────────────────
// Intent detection — understands what kind of query the user is making
// ─────────────────────────────────────────────────────────────────────────────

interface QueryIntent {
  priceSignal?:    'budget' | 'mid' | 'luxury';
  seasonSignal?:   'monsoon' | 'winter' | 'summer' | 'all';
  regionSignal?:   'north' | 'central' | 'south';
  sortByRating?:   boolean;
  sortByDistance?: boolean;
  familyFriendly?: boolean;
  hiddenGem?:      boolean;
  featured?:       boolean;
}

function detectIntent(tokens: string[]): QueryIntent {
  const s = new Set(tokens);
  const intent: QueryIntent = {};

  if (s.has('budget') || s.has('cheap') || s.has('affordable') || s.has('backpacker'))
    intent.priceSignal = 'budget';
  else if (s.has('luxury') || s.has('premium') || s.has('expensive') || s.has('five_star'))
    intent.priceSignal = 'luxury';

  if (s.has('monsoon') || s.has('rain') || s.has('july') || s.has('august') || s.has('rainy'))
    intent.seasonSignal = 'monsoon';
  else if (s.has('winter') || s.has('december') || s.has('january') || s.has('february'))
    intent.seasonSignal = 'winter';
  else if (s.has('summer') || s.has('mango') || s.has('alphonso') || s.has('april') || s.has('may'))
    intent.seasonSignal = 'summer';

  if (s.has('north') || s.has('mumbai') || s.has('alibaug') || s.has('alibag'))
    intent.regionSignal = 'north';
  else if (s.has('south') || s.has('malvan') || s.has('sindhudurg') || s.has('tarkarli'))
    intent.regionSignal = 'south';
  else if (s.has('central') || s.has('ratnagiri') || s.has('ganpatipule'))
    intent.regionSignal = 'central';

  if (s.has('best') || s.has('top') || s.has('popular') || s.has('rated') || s.has('famous'))
    intent.sortByRating = true;

  if (s.has('family') || s.has('kids') || s.has('children') || s.has('safe'))
    intent.familyFriendly = true;

  if (s.has('hidden') || s.has('offbeat') || s.has('secret') || s.has('unexplored'))
    intent.hiddenGem = true;

  if (s.has('featured') || s.has('trending') || s.has('popular'))
    intent.featured = true;

  return intent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Field scoring — the core relevance algorithm
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Score how well a single `token` matches `fieldText`.
 * Returns a normalised score 0–1, then multiplied by fieldWeight outside.
 *
 * Match tiers (descending):
 *   1. Exact full-field match           → 1.00
 *   2. Field starts with token          → 0.85
 *   3. A word in the field equals token → 0.75
 *   4. A word in the field starts with  → 0.55
 *   5. Token is anywhere in field       → 0.35
 *   6. Field contains token as fragment → 0.20
 */
function scoreTokenOnField(token: string, fieldText: string): number {
  if (!fieldText || !token) return 0;
  const f = fieldText.toLowerCase();
  const t = token.toLowerCase();

  if (f === t)                                          return 1.00;
  if (f.startsWith(t + ' ') || f.startsWith(t + '_')) return 0.85;
  const words = f.split(/[\s_,·\-\/]+/);
  if (words.some(w => w === t))                        return 0.75;
  if (words.some(w => w.startsWith(t)))                return 0.55;
  if (f.includes(' ' + t + ' '))                       return 0.40;
  if (f.includes(t))                                   return 0.20;
  return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Index — one entry per searchable item
// ─────────────────────────────────────────────────────────────────────────────

interface Field {
  text:        string;
  weight:      number;
  matchLabel?: string; // shown as matchTag when this field drives the match
}

interface IndexEntry {
  result:      SearchResult;
  fields:      Field[];
  // Structured metadata for intent-based boosting
  meta: {
    priceRange?:     string;
    bestSeason?:     string;
    bestTime?:       string[];
    region?:         string;
    rating?:         number;
    reviewCount?:    number;
    featured?:       boolean;
    trending?:       boolean;
    hidden?:         boolean;
    familyFriendly?: boolean;
    distanceKm?:     number;
  };
}

// IDF-like: how many items contain this token (computed after index build).
const _df: Map<string, number> = new Map();

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  // Pages
  PAGE_LINKS.forEach(p => {
    entries.push({
      result: p,
      fields: [
        { text: p.title,    weight: 10, matchLabel: 'Page' },
        { text: p.subtitle, weight: 4  },
      ],
      meta: {},
    });
  });

  // Destinations
  sampleDestinations.forEach(d => {
    entries.push({
      result: {
        id:      `dest-${d.id}`,
        kind:    'destination',
        title:   d.name,
        subtitle:`${d.type} · ${d.region} Konkan${d.distanceFromMumbai ? ' · ' + d.distanceFromMumbai + ' km from Mumbai' : ''}`,
        href:    '/destinations',
        image:   d.images?.[0],
        accent:  '#3a9e6e',
      },
      fields: [
        { text: d.name,                              weight: 10, matchLabel: 'Destination' },
        { text: d.slug,                              weight: 8  },
        { text: d.nameTranslations?.mr ?? '',        weight: 9,  matchLabel: 'Marathi name' },
        { text: d.nameTranslations?.hi ?? '',        weight: 9,  matchLabel: 'Hindi name'  },
        { text: d.nameTranslations?.kn ?? '',        weight: 7,  matchLabel: 'Kannada name'},
        { text: d.type,                              weight: 7,  matchLabel: 'Type'        },
        { text: d.region + ' konkan',                weight: 5,  matchLabel: 'Region'      },
        { text: d.description,                       weight: 4,  matchLabel: 'Description' },
        { text: d.highlights.join(' | '),            weight: 6,  matchLabel: 'Highlight'   },
        { text: d.activities.join(' '),              weight: 6,  matchLabel: 'Activity'    },
        { text: (d.bestTime ?? []).join(' '),        weight: 4,  matchLabel: 'Best time'   },
        { text: d.bestSeason ?? '',                  weight: 4,  matchLabel: 'Season'      },
      ],
      meta: {
        priceRange:  undefined,
        bestSeason:  d.bestSeason,
        bestTime:    d.bestTime,
        region:      d.region,
        rating:      d.averageRating,
        reviewCount: d.reviewCount,
        featured:    d.featured,
        trending:    d.trending,
        hidden:      d.hidden,
        distanceKm:  d.distanceFromMumbai,
      },
    });
  });

  // Accommodations
  sampleAccommodations.forEach(a => {
    entries.push({
      result: {
        id:      `stay-${a.id}`,
        kind:    'stay',
        title:   a.name,
        subtitle:`${a.type.replace('_', ' ')} · ${a.destinationName ?? ''} · ${a.priceRange}`,
        href:    '/stay',
        image:   a.images?.[0],
        accent:  '#c17f3a',
      },
      fields: [
        { text: a.name,                              weight: 10, matchLabel: 'Stay'         },
        { text: a.slug,                              weight: 7  },
        { text: a.nameTranslations?.mr ?? '',        weight: 7,  matchLabel: 'Marathi name' },
        { text: a.type.replace('_', ' '),            weight: 6,  matchLabel: 'Type'         },
        { text: a.destinationName ?? '',             weight: 7,  matchLabel: 'Location'     },
        { text: a.description,                       weight: 4,  matchLabel: 'Description'  },
        { text: a.amenities.join(' '),               weight: 5,  matchLabel: 'Amenity'      },
        { text: a.priceRange,                        weight: 4,  matchLabel: 'Price range'  },
      ],
      meta: {
        priceRange:    a.priceRange,
        rating:        a.averageRating,
        reviewCount:   a.reviewCount,
        featured:      a.featured,
        familyFriendly:a.familyFriendly,
      },
    });
  });

  // Businesses
  sampleBusinesses.forEach(b => {
    entries.push({
      result: {
        id:      `biz-${b.id}`,
        kind:    'business',
        title:   b.name,
        subtitle:`${b.category} · ${b.destinationName}`,
        href:    '/businesses',
        image:   b.images?.[0],
        accent:  '#2a8fb5',
      },
      fields: [
        { text: b.name,                    weight: 10, matchLabel: 'Business'    },
        { text: b.category,                weight: 6,  matchLabel: 'Category'   },
        { text: b.destinationName,         weight: 7,  matchLabel: 'Location'   },
        { text: b.description,             weight: 4,  matchLabel: 'Description'},
        { text: b.speciality,              weight: 7,  matchLabel: 'Speciality' },
        { text: b.tags.join(' '),          weight: 6,  matchLabel: 'Tag'        },
        { text: b.languages.join(' '),     weight: 2                            },
        { text: b.priceRange,              weight: 3,  matchLabel: 'Price range'},
      ],
      meta: {
        priceRange:  b.priceRange,
        rating:      b.rating,
        reviewCount: b.reviewCount,
        featured:    b.featured,
      },
    });
  });

  // Compute document-frequency for IDF weighting
  for (const entry of entries) {
    const seen = new Set<string>();
    for (const f of entry.fields) {
      for (const tok of tokenise(f.text)) {
        if (!seen.has(tok)) {
          seen.add(tok);
          _df.set(tok, (_df.get(tok) ?? 0) + 1);
        }
      }
    }
  }

  return entries;
}

const INDEX = buildIndex();
const TOTAL_DOCS = INDEX.length;

// IDF: log( N / df(t) ) — tokens that match fewer docs are rarer and more valuable
function idf(token: string): number {
  const df = _df.get(token) ?? 0;
  if (df === 0) return 0;
  return Math.log((TOTAL_DOCS + 1) / (df + 1)) + 1;
}

// ─────────────────────────────────────────────────────────────────────────────
// Score one entry against the parsed query
// ─────────────────────────────────────────────────────────────────────────────

interface ScoredEntry {
  entry:    IndexEntry;
  score:    number;
  matchTag: string;
}

function scoreEntry(entry: IndexEntry, originalTokens: string[], expandedTokens: string[]): ScoredEntry | null {
  // --- Pass 1: AND check on original tokens ---
  // Every original (non-alias) token must contribute at least some signal.
  // If it doesn't, we drop to OR mode (partial match) with a heavy penalty.
  let andMode = true;
  for (const tok of originalTokens) {
    const contributed = entry.fields.some(f => scoreTokenOnField(tok, f.text) > 0);
    if (!contributed) { andMode = false; break; }
  }

  // --- Pass 2: Accumulate TF-IDF-weighted score over ALL (expanded) tokens ---
  let totalScore  = 0;
  let bestLabel   = '';
  let bestLabelScore = 0;

  for (const tok of expandedTokens) {
    const isOriginal = originalTokens.includes(tok);
    const tokenIdf   = idf(tok);

    let bestForToken = 0;
    let bestLabelForToken = '';

    for (const field of entry.fields) {
      const raw = scoreTokenOnField(tok, field.text);
      if (raw === 0) continue;

      const fieldScore = raw * field.weight * (isOriginal ? 1.0 : 0.4) * tokenIdf;
      if (fieldScore > bestForToken) {
        bestForToken         = fieldScore;
        bestLabelForToken    = field.matchLabel ?? '';
      }
    }

    totalScore += bestForToken;
    if (bestForToken > bestLabelScore) {
      bestLabelScore = bestForToken;
      bestLabel      = bestLabelForToken;
    }
  }

  if (totalScore === 0) return null;

  // --- Pass 3: Query completeness bonus ---
  // AND mode: all tokens matched — big bonus
  // OR mode: only some matched — smaller base score
  const completenessMultiplier = andMode
    ? (originalTokens.length > 1 ? 1.6 : 1.0)
    : 0.45;

  totalScore *= completenessMultiplier;

  // --- Pass 4: Item quality boost ---
  // Reward popular, featured, trending, highly-rated items
  const m = entry.meta;
  let qualityBoost = 1.0;
  if (m.featured)                       qualityBoost += 0.25;
  if (m.trending)                       qualityBoost += 0.15;
  if (m.rating    && m.rating >= 4.7)   qualityBoost += 0.15;
  if (m.rating    && m.rating >= 4.5)   qualityBoost += 0.08;
  if (m.reviewCount && m.reviewCount > 300) qualityBoost += 0.10;
  if (m.reviewCount && m.reviewCount > 100) qualityBoost += 0.05;

  totalScore *= qualityBoost;

  return { entry, score: totalScore, matchTag: bestLabel };
}

// ─────────────────────────────────────────────────────────────────────────────
// Intent-based post-filter & re-sort
// ─────────────────────────────────────────────────────────────────────────────

function applyIntent(entries: ScoredEntry[], intent: QueryIntent): ScoredEntry[] {
  return entries.map(e => {
    let boost = 1.0;
    const m = e.entry.meta;

    if (intent.priceSignal && m.priceRange === intent.priceSignal)   boost += 0.4;
    if (intent.seasonSignal && m.bestSeason === intent.seasonSignal) boost += 0.35;
    if (intent.seasonSignal && m.bestTime?.some(t =>
      t.toLowerCase().includes(intent.seasonSignal!)))               boost += 0.2;
    if (intent.regionSignal && m.region === intent.regionSignal)     boost += 0.3;
    if (intent.familyFriendly && m.familyFriendly)                   boost += 0.3;
    if (intent.hiddenGem && m.hidden)                                boost += 0.5;
    if (intent.featured && (m.featured || m.trending))               boost += 0.2;

    return { ...e, score: e.score * boost };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main search function
// ─────────────────────────────────────────────────────────────────────────────

interface GroupedResults {
  destinations: SearchResult[];
  stays:        SearchResult[];
  businesses:   SearchResult[];
  pages:        SearchResult[];
  total:        number;
}

const MAX_PER_KIND: Record<ResultKind, number> = {
  destination: 5,
  stay:        4,
  business:    4,
  page:        3,
};

function runSearch(query: string): GroupedResults {
  const originalTokens = tokenise(query);
  if (!originalTokens.length) return { destinations: [], stays: [], businesses: [], pages: [], total: 0 };

  const expandedTokens = expandTokens(originalTokens);
  const intent         = detectIntent(expandedTokens);

  let scored = INDEX
    .map(entry => scoreEntry(entry, originalTokens, expandedTokens))
    .filter((e): e is ScoredEntry => e !== null);

  scored = applyIntent(scored, intent);
  scored.sort((a, b) => b.score - a.score);

  const buckets: Record<ResultKind, SearchResult[]> = {
    destination: [], stay: [], business: [], page: [],
  };

  for (const { entry, score, matchTag } of scored) {
    const kind = entry.result.kind;
    if (buckets[kind].length < MAX_PER_KIND[kind]) {
      buckets[kind].push({ ...entry.result, score, matchTag });
    }
  }

  // Sort-by-intent overrides
  if (intent.sortByRating) {
    const sortByRating = (a: SearchResult, b: SearchResult) => {
      const ra = INDEX.find(e => e.result.id === a.id)?.meta.rating ?? 0;
      const rb = INDEX.find(e => e.result.id === b.id)?.meta.rating ?? 0;
      return rb - ra;
    };
    buckets.destination.sort(sortByRating);
    buckets.stay.sort(sortByRating);
    buckets.business.sort(sortByRating);
  }

  return {
    destinations: buckets.destination,
    stays:        buckets.stay,
    businesses:   buckets.business,
    pages:        buckets.page,
    total: buckets.destination.length + buckets.stay.length +
           buckets.business.length + buckets.page.length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Highlight matched terms
// ─────────────────────────────────────────────────────────────────────────────

function highlight(text: string, query: string): React.ReactNode {
  const terms = tokenise(query).filter(t => t.length >= 2);
  if (!terms.length) return text;
  const esc     = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex   = new RegExp(`(${esc.join('|')})`, 'gi');
  const parts   = text.split(regex);
  if (parts.length <= 1) return text;
  return (
    <>
      {parts.map((p, i) =>
        regex.test(p)
          ? <mark key={i} className="bg-transparent text-[#3a9e6e] font-semibold not-italic">{p}</mark>
          : p
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Recent searches (localStorage)
// ─────────────────────────────────────────────────────────────────────────────

const RECENT_KEY = 'konkan_search_recent';

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); } catch { return []; }
}
function pushRecent(q: string) {
  const trimmed = q.trim();
  if (trimmed.length < 2) return;
  const prev    = getRecent().filter(r => r.toLowerCase() !== trimmed.toLowerCase());
  localStorage.setItem(RECENT_KEY, JSON.stringify([trimmed, ...prev].slice(0, 7)));
}
function clearRecent() { localStorage.removeItem(RECENT_KEY); }

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface SearchOverlayProps {
  open:    boolean;
  onClose: () => void;
}

type FilterKind = 'all' | ResultKind;

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query,       setQuery]       = useState('');
  const [filter,      setFilter]      = useState<FilterKind>('all');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [recent,      setRecent]      = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);
  const [, navigate] = useLocation();

  // ── Computed ──────────────────────────────────────────────────────────────

  const grouped = useMemo(
    (): GroupedResults | null => (query.trim() ? runSearch(query) : null),
    [query],
  );

  const flatResults = useMemo((): SearchResult[] => {
    if (!grouped) return [];
    if (filter === 'all')
      return [...grouped.destinations, ...grouped.stays, ...grouped.businesses, ...grouped.pages];
    const key = `${filter}s` as keyof GroupedResults;
    return (grouped[key] as SearchResult[]) ?? [];
  }, [grouped, filter]);

  // Detected intent label (shown in footer)
  const intentLabel = useMemo(() => {
    if (!query.trim()) return '';
    const tokens = tokenise(query);
    const intent = detectIntent(expandTokens(tokens));
    const parts: string[] = [];
    if (intent.priceSignal)    parts.push(intent.priceSignal);
    if (intent.seasonSignal)   parts.push(intent.seasonSignal);
    if (intent.regionSignal)   parts.push(intent.regionSignal + ' Konkan');
    if (intent.familyFriendly) parts.push('family');
    if (intent.hiddenGem)      parts.push('offbeat');
    if (intent.sortByRating)   parts.push('top-rated');
    return parts.length ? parts.join(' · ') : '';
  }, [query]);

  // ── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (open) {
      setQuery('');
      setFilter('all');
      setSelectedIdx(-1);
      setRecent(getRecent());
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => { setSelectedIdx(-1); }, [query, filter]);

  useEffect(() => {
    if (selectedIdx >= 0 && listRef.current) {
      listRef.current
        .querySelector<HTMLElement>(`[data-idx="${selectedIdx}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx(i => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx(i => {
          if (i <= 0) { inputRef.current?.focus(); return -1; }
          return i - 1;
        });
      } else if (e.key === 'Enter' && selectedIdx >= 0) {
        e.preventDefault();
        const r = flatResults[selectedIdx];
        if (r) handleSelect(r);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, flatResults, selectedIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleSelect(r: SearchResult) {
    pushRecent(r.title);
    setRecent(getRecent());
    navigate(r.href);
    onClose();
  }

  function handleSuggestion(label: string) {
    setQuery(label);
    setFilter('all');
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // ── Derived booleans ──────────────────────────────────────────────────────

  const hasResults = !!(grouped && grouped.total > 0);
  const noResults  = !!(grouped && grouped.total === 0);

  const FILTER_TABS: Array<{ kind: FilterKind; label: string; count: number }> = [
    { kind: 'all',         label: 'All',          count: grouped?.total                ?? 0 },
    { kind: 'destination', label: 'Destinations', count: grouped?.destinations.length  ?? 0 },
    { kind: 'stay',        label: 'Stays',        count: grouped?.stays.length         ?? 0 },
    { kind: 'business',    label: 'Businesses',   count: grouped?.businesses.length    ?? 0 },
    { kind: 'page',        label: 'Pages',        count: grouped?.pages.length         ?? 0 },
  ].filter(t => t.kind === 'all' || t.count > 0);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#020d08]/85 backdrop-blur-md z-[200]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-[#0a1f14] border border-[#1a4a30] shadow-2xl overflow-hidden">

              {/* ── Input ── */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0d2d1e]">
                <Search className="w-4 h-4 text-[#3a9e6e] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search destinations, stays, activities, seasons…"
                  className="flex-1 bg-transparent text-[#f4ecd8] placeholder-[#f4ecd8]/30 font-sans text-sm outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    className="text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors"
                    aria-label="Clear"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30 border border-[#0d2d1e] px-2 py-1 hover:text-[#f4ecd8]/60 transition-colors shrink-0"
                >
                  ESC
                </button>
              </div>

              {/* ── Filter tabs ── */}
              {hasResults && FILTER_TABS.length > 2 && (
                <div
                  className="flex items-center px-3 border-b border-[#0d2d1e] overflow-x-auto"
                  style={{ scrollbarWidth: 'none' }}
                >
                  {FILTER_TABS.map(tab => (
                    <button
                      key={tab.kind}
                      onClick={() => setFilter(tab.kind)}
                      className={cn(
                        'shrink-0 text-[9px] tracking-[0.16em] uppercase font-sans px-3 py-2.5 border-b-2 transition-colors',
                        filter === tab.kind
                          ? 'border-[#3a9e6e] text-[#3a9e6e]'
                          : 'border-transparent text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60',
                      )}
                    >
                      {tab.label}
                      {tab.kind !== 'all' && (
                        <span className="ml-1 opacity-50">({tab.count})</span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* ── Result list ── */}
              {hasResults ? (
                <ul
                  ref={listRef}
                  className="max-h-[55vh] overflow-y-auto divide-y divide-[#0d2d1e]"
                  role="listbox"
                >
                  {flatResults.map((r, idx) => {
                    const km   = KIND_META[r.kind];
                    const sel  = idx === selectedIdx;
                    return (
                      <li key={r.id} role="option" aria-selected={sel}>
                        <button
                          data-idx={idx}
                          onMouseEnter={() => setSelectedIdx(idx)}
                          onClick={() => handleSelect(r)}
                          className={cn(
                            'w-full flex items-center gap-3 px-5 py-3.5 transition-colors text-left group',
                            sel ? 'bg-[#0d2d1e]' : 'hover:bg-[#0d2d1e]/70',
                          )}
                        >
                          {/* Thumbnail */}
                          {r.image ? (
                            <img src={r.image} alt="" className="w-9 h-9 object-cover shrink-0 opacity-90" />
                          ) : (
                            <div
                              className="w-9 h-9 flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${km.color}18` }}
                            >
                              <km.icon className="w-3.5 h-3.5" style={{ color: km.color }} />
                            </div>
                          )}

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm text-[#f4ecd8] group-hover:text-white transition-colors truncate">
                              {highlight(r.title, query)}
                            </p>
                            <p className="text-[10px] font-sans text-[#f4ecd8]/40 truncate">
                              {r.subtitle}
                            </p>
                          </div>

                          {/* Match tag (why it matched) */}
                          {r.matchTag && (
                            <span className="text-[7px] tracking-[0.16em] uppercase font-sans px-1.5 py-0.5 shrink-0 hidden sm:block"
                              style={{ color: '#3a9e6e', backgroundColor: '#3a9e6e18', border: '1px solid #3a9e6e30' }}>
                              {r.matchTag}
                            </span>
                          )}

                          {/* Kind badge */}
                          <span
                            className="text-[7px] tracking-[0.2em] uppercase font-sans px-1.5 py-0.5 shrink-0"
                            style={{ color: km.color, backgroundColor: `${km.color}18`, border: `1px solid ${km.color}30` }}
                          >
                            {km.label}
                          </span>

                          <ChevronRight className={cn(
                            'w-3 h-3 transition-colors shrink-0',
                            sel ? 'text-[#3a9e6e]' : 'text-[#f4ecd8]/20 group-hover:text-[#f4ecd8]/50',
                          )} />
                        </button>
                      </li>
                    );
                  })}
                </ul>

              ) : noResults ? (
                /* ── No results ── */
                <div className="py-10 text-center px-6">
                  <p className="font-sans text-sm text-[#f4ecd8]/30">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[10px] font-sans text-[#f4ecd8]/20 mt-1">
                    Try a destination, beach, fort, activity, season, or budget
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-5">
                    {POPULAR_QUERIES.slice(0, 4).map(p => (
                      <button key={p} onClick={() => handleSuggestion(p)}
                        className="text-[10px] font-sans text-[#f4ecd8]/40 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/70 transition-colors">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

              ) : (
                /* ── Empty query / default state ── */
                <div className="p-5">
                  {/* Recent searches */}
                  {recent.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">Recent</p>
                        <button onClick={() => { clearRecent(); setRecent([]); }}
                          className="text-[8px] font-sans text-[#f4ecd8]/20 hover:text-[#f4ecd8]/50 transition-colors">
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recent.map(r => (
                          <button key={r} onClick={() => handleSuggestion(r)}
                            className="flex items-center gap-1.5 text-[10px] font-sans text-[#f4ecd8]/50 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/80 transition-colors">
                            <Clock className="w-2.5 h-2.5 opacity-50" />
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular */}
                  <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {POPULAR_QUERIES.map(p => (
                      <button key={p} onClick={() => handleSuggestion(p)}
                        className="text-[10px] font-sans text-[#f4ecd8]/50 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/80 transition-colors">
                        {p}
                      </button>
                    ))}
                  </div>

                  {/* Quick links */}
                  <div className="pt-4 border-t border-[#0d2d1e]">
                    <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">Quick Links</p>
                    <div className="grid grid-cols-2 gap-1">
                      {PAGE_LINKS.slice(0, 6).map(p => (
                        <button key={p.id} onClick={() => handleSelect(p)}
                          className="flex items-center gap-2 p-2.5 text-left hover:bg-[#0d2d1e]/70 transition-colors group">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.accent }} />
                          <span className="text-[10px] font-sans text-[#f4ecd8]/60 group-hover:text-[#f4ecd8]/80">
                            {p.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Footer ── */}
              <div className="px-5 py-2.5 border-t border-[#0d2d1e] bg-[#020d08]/40 flex items-center justify-between gap-4">
                <span className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/20">
                  ↑↓ navigate · Enter select · Esc close
                </span>
                <div className="flex items-center gap-3">
                  {intentLabel && (
                    <span className="flex items-center gap-1 text-[8px] font-sans text-[#3a9e6e]/60">
                      <Zap className="w-2.5 h-2.5" />
                      {intentLabel}
                    </span>
                  )}
                  {grouped && grouped.total > 0 && (
                    <span className="text-[8px] font-sans text-[#f4ecd8]/20">
                      {grouped.total} result{grouped.total !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
