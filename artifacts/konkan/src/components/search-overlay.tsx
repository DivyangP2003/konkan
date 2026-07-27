import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Hotel, Compass, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { sampleDestinations } from '@/data/destinations';
import { sampleAccommodations } from '@/data/accommodations';
import { sampleBusinesses } from '@/data/businesses';
import { cn } from '@/lib/utils';

// ── Types ──────────────────────────────────────────────────────────────────────

type ResultKind = 'destination' | 'stay' | 'business' | 'page';

interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  accent?: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const KIND_META: Record<ResultKind, { label: string; icon: typeof Search; color: string }> = {
  destination: { label: 'Destination', icon: MapPin,     color: '#3a9e6e' },
  stay:        { label: 'Stay',        icon: Hotel,      color: '#c17f3a' },
  business:    { label: 'Business',    icon: Compass,    color: '#2a8fb5' },
  page:        { label: 'Page',        icon: ArrowRight, color: '#f4ecd8' },
};

const PAGE_LINKS: SearchResult[] = [
  { id: 'p-destinations', kind: 'page', title: 'Destinations',    subtitle: 'Explore all Konkan places',        href: '/destinations', accent: '#3a9e6e' },
  { id: 'p-stay',         kind: 'page', title: 'Stay',            subtitle: 'Homestays, resorts & more',        href: '/stay',         accent: '#c17f3a' },
  { id: 'p-food',         kind: 'page', title: 'Food',            subtitle: 'Authentic Konkan cuisine',         href: '/food',         accent: '#d45f2a' },
  { id: 'p-activities',   kind: 'page', title: 'Activities',      subtitle: 'Things to do',                     href: '/activities',   accent: '#2a8fb5' },
  { id: 'p-adventure',    kind: 'page', title: 'Adventure',       subtitle: 'Treks, water sports & more',       href: '/adventure',    accent: '#3a9e6e' },
  { id: 'p-plan',         kind: 'page', title: 'Plan Your Trip',  subtitle: 'Build your Konkan itinerary',      href: '/plan',         accent: '#c17f3a' },
  { id: 'p-booking',      kind: 'page', title: 'Book Transport',  subtitle: 'Trains, buses, ferries & cabs',    href: '/booking',      accent: '#2a8fb5' },
  { id: 'p-businesses',   kind: 'page', title: 'Local Businesses',subtitle: 'Guides, eateries, artisans',       href: '/businesses',   accent: '#3a9e6e' },
  { id: 'p-culture',      kind: 'page', title: 'Culture',         subtitle: 'Art, music & traditions',          href: '/culture',      accent: '#c17f3a' },
  { id: 'p-heritage',     kind: 'page', title: 'Heritage',        subtitle: 'Forts, temples & history',         href: '/heritage',     accent: '#8b5e3a' },
  { id: 'p-spiritual',    kind: 'page', title: 'Spiritual',       subtitle: 'Sacred temples & pilgrimages',     href: '/spiritual',    accent: '#d45f2a' },
  { id: 'p-seasonal',     kind: 'page', title: 'Seasonal Guide',  subtitle: 'Best time to visit',               href: '/seasonal',     accent: '#3a9e6e' },
];

const POPULAR = [
  'Alibaug', 'Tarkarli', 'Malvan', 'Ganpatipule',
  'Scuba diving', 'Beach camping', 'Forts', 'Monsoon treks',
];

// Synonyms: query word → extra tokens to search alongside it.
const SYNONYMS: Record<string, string[]> = {
  beach:     ['coastal', 'shore', 'sand', 'seaside'],
  fort:      ['fortress', 'maratha', 'heritage', 'historical', 'castle'],
  dive:      ['scuba', 'snorkeling', 'underwater', 'diving'],
  scuba:     ['diving', 'snorkeling', 'underwater', 'coral'],
  trek:      ['trekking', 'hike', 'hiking', 'trail', 'walk'],
  trekking:  ['trail', 'hike', 'adventure', 'cliff'],
  food:      ['cuisine', 'restaurant', 'eatery', 'malvani', 'seafood', 'fish'],
  fish:      ['fishing', 'seafood', 'fishermen'],
  fishing:   ['fishermen', 'fish', 'boat'],
  temple:    ['spiritual', 'pilgrimage', 'sacred', 'shrine'],
  island:    ['boat', 'backwater', 'river'],
  hotel:     ['resort', 'accommodation', 'lodge'],
  resort:    ['hotel', 'accommodation'],
  homestay:  ['family', 'local', 'authentic', 'traditional'],
  waterfall: ['monsoon', 'falls', 'water'],
  wildlife:  ['sanctuary', 'forest', 'nature', 'bird'],
  bird:      ['birding', 'wildlife', 'nature', 'sanctuary'],
  birding:   ['bird', 'wildlife', 'nature'],
  heritage:  ['history', 'historical', 'fort', 'monument', 'ancient'],
  adventure: ['trekking', 'water_sports', 'paragliding', 'rappelling'],
  water:     ['water_sports', 'beach', 'river', 'kayak', 'backwater'],
  monsoon:   ['rain', 'waterfall', 'green', 'july', 'august'],
  summer:    ['march', 'april', 'may', 'mango', 'alphonso'],
  mango:     ['alphonso', 'devgad', 'ratnagiri', 'summer', 'orchard'],
  lighthouse:[  'vengurla', 'historical', 'coast'],
  guide:     ['tour', 'local', 'certified'],
  kayak:     ['kayaking', 'backwater', 'river', 'water'],
  camping:   ['campsite', 'beach', 'cliff', 'outdoor'],
  boat:      ['boat_ride', 'ferry', 'cruise', 'backwater'],
  ferry:     ['boat', 'cruise', 'transport'],
  food_tour: ['cuisine', 'malvani', 'seafood', 'eatery'],
};

// ── Levenshtein (capped at short strings for performance) ─────────────────────

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length > 20 || b.length > 20) return Math.abs(a.length - b.length) + 5;
  const m = a.length, n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

// ── Field-scoring ─────────────────────────────────────────────────────────────

/**
 * Returns a score for how well `term` matches `fieldText`.
 * Higher = better match. 0 = no match.
 */
function scoreTermAgainstField(term: string, fieldText: string, weight: number): number {
  if (!fieldText) return 0;
  const f = fieldText.toLowerCase();

  if (f === term)                                     return weight * 10;
  if (f.startsWith(term + ' ') || f === term)        return weight * 8;
  if (f.split(/[\s_]+/).some(w => w === term))       return weight * 7;
  if (f.split(/[\s_]+/).some(w => w.startsWith(term))) return weight * 5;
  if (f.includes(term))                              return weight * 3;

  // Fuzzy: only for terms ≥ 4 chars
  if (term.length >= 4) {
    const words = f.split(/[\s_,·]+/);
    const maxDist = term.length >= 7 ? 2 : 1;
    for (const w of words) {
      if (Math.abs(w.length - term.length) <= maxDist + 1) {
        const dist = levenshtein(term, w);
        if (dist <= maxDist) return weight * (maxDist === 1 ? 2 : 1.5);
        // Prefix fuzzy: term almost matches start of word
        if (w.length > term.length && levenshtein(term, w.slice(0, term.length)) <= 1)
          return weight * 1.2;
      }
    }
  }

  return 0;
}

// ── Index item structure ──────────────────────────────────────────────────────

interface IndexedItem {
  result: SearchResult;
  fields: Array<{ text: string; weight: number }>;
}

// ── Build index (runs once at module load) ────────────────────────────────────

function buildIndex(): IndexedItem[] {
  const items: IndexedItem[] = [];

  // Pages
  PAGE_LINKS.forEach((p) => {
    items.push({
      result: p,
      fields: [
        { text: p.title,    weight: 10 },
        { text: p.subtitle, weight: 5  },
      ],
    });
  });

  // Destinations — full field indexing
  sampleDestinations.forEach((d) => {
    items.push({
      result: {
        id:       `dest-${d.id}`,
        kind:     'destination',
        title:    d.name,
        subtitle: `${d.type} · ${d.region} Konkan · ${d.distanceFromMumbai ?? '?'} km from Mumbai`,
        href:     `/destinations`,
        image:    d.images[0],
        accent:   '#3a9e6e',
      },
      fields: [
        { text: d.name,                            weight: 10 },
        { text: d.slug,                            weight: 8  },
        { text: d.nameTranslations?.mr ?? '',      weight: 9  },
        { text: d.nameTranslations?.hi ?? '',      weight: 9  },
        { text: d.nameTranslations?.kn ?? '',      weight: 7  },
        { text: d.type,                            weight: 6  },
        { text: d.region,                          weight: 4  },
        { text: d.description,                     weight: 4  },
        { text: d.highlights.join(' '),            weight: 5  },
        { text: d.activities.join(' '),            weight: 5  },
        { text: (d.bestTime ?? []).join(' '),      weight: 3  },
        { text: d.bestSeason ?? '',                weight: 3  },
      ],
    });
  });

  // Accommodations — ALL (no slice limit)
  sampleAccommodations.forEach((a) => {
    items.push({
      result: {
        id:       `stay-${a.id}`,
        kind:     'stay',
        title:    a.name,
        subtitle: `${a.type} · ${a.destinationName ?? ''} · ${a.priceRange}`,
        href:     `/stay`,
        image:    a.images[0],
        accent:   '#c17f3a',
      },
      fields: [
        { text: a.name,                       weight: 10 },
        { text: a.slug,                       weight: 7  },
        { text: a.nameTranslations?.mr ?? '', weight: 7  },
        { text: a.type,                       weight: 5  },
        { text: a.destinationName ?? '',      weight: 6  },
        { text: a.description,                weight: 4  },
        { text: a.amenities.join(' '),        weight: 4  },
        { text: a.priceRange,                 weight: 3  },
      ],
    });
  });

  // Businesses — ALL
  sampleBusinesses.forEach((b) => {
    items.push({
      result: {
        id:       `biz-${b.id}`,
        kind:     'business',
        title:    b.name,
        subtitle: `${b.category} · ${b.destinationName}`,
        href:     `/businesses`,
        image:    b.images[0],
        accent:   '#2a8fb5',
      },
      fields: [
        { text: b.name,                 weight: 10 },
        { text: b.category,             weight: 6  },
        { text: b.destinationName,      weight: 6  },
        { text: b.description,          weight: 4  },
        { text: b.speciality,           weight: 6  },
        { text: b.tags.join(' '),       weight: 5  },
        { text: b.languages.join(' '),  weight: 2  },
      ],
    });
  });

  return items;
}

const SEARCH_INDEX = buildIndex();

// ── Expand query with synonyms ────────────────────────────────────────────────

function expandTerms(terms: string[]): Array<{ term: string; isSynonym: boolean }> {
  const map = new Map<string, boolean>();
  for (const t of terms) {
    map.set(t, false);
    const syns = SYNONYMS[t] ?? [];
    for (const s of syns) {
      if (!map.has(s)) map.set(s, true);
    }
  }
  return Array.from(map.entries()).map(([term, isSynonym]) => ({ term, isSynonym }));
}

// ── Score one item against a parsed query ─────────────────────────────────────

function scoreItem(item: IndexedItem, terms: string[]): number {
  if (terms.length === 0) return 0;
  const expanded = expandTerms(terms);
  let total = 0;

  for (const { term, isSynonym } of expanded) {
    let bestForTerm = 0;
    for (const { text, weight } of item.fields) {
      const s = scoreTermAgainstField(term, text, weight);
      if (s > bestForTerm) bestForTerm = s;
    }
    total += isSynonym ? bestForTerm * 0.45 : bestForTerm;
  }

  // Bonus when every original term contributed a match
  if (terms.length > 1) {
    const allMatch = terms.every(t =>
      item.fields.some(({ text, weight }) => scoreTermAgainstField(t, text, weight) > 0)
    );
    if (allMatch) total *= 1.5;
  }

  return total;
}

// ── Grouped result type ───────────────────────────────────────────────────────

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
  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(t => t.length >= 1);

  if (terms.length === 0) return { destinations: [], stays: [], businesses: [], pages: [], total: 0 };

  const scored = SEARCH_INDEX
    .map(item => ({ item, score: scoreItem(item, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const buckets: Record<ResultKind, SearchResult[]> = {
    destination: [], stay: [], business: [], page: [],
  };

  for (const { item } of scored) {
    const kind = item.result.kind;
    if (buckets[kind].length < MAX_PER_KIND[kind]) {
      buckets[kind].push(item.result);
    }
  }

  return {
    destinations: buckets.destination,
    stays:        buckets.stay,
    businesses:   buckets.business,
    pages:        buckets.page,
    total:        buckets.destination.length + buckets.stay.length +
                  buckets.business.length   + buckets.page.length,
  };
}

// ── Highlight matching terms in text ─────────────────────────────────────────

function highlightMatch(text: string, query: string): React.ReactNode {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length >= 2);
  if (!terms.length) return text;

  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex   = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts   = text.split(regex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-transparent text-[#3a9e6e] font-semibold not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ── Recent searches (localStorage) ───────────────────────────────────────────

const RECENT_KEY = 'konkan_recent_searches';
const MAX_RECENT = 6;

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); }
  catch { return []; }
}

function pushRecent(q: string) {
  const trimmed = q.trim();
  if (!trimmed || trimmed.length < 2) return;
  const prev    = getRecent().filter(r => r.toLowerCase() !== trimmed.toLowerCase());
  localStorage.setItem(RECENT_KEY, JSON.stringify([trimmed, ...prev].slice(0, MAX_RECENT)));
}

function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}

// ── Component ─────────────────────────────────────────────────────────────────

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

  // ── Derived data ──────────────────────────────────────────────────────────

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

  // Reset keyboard selection when results change
  useEffect(() => { setSelectedIdx(-1); }, [query, filter]);

  // Scroll selected row into view
  useEffect(() => {
    if (selectedIdx >= 0 && listRef.current) {
      listRef.current
        .querySelector<HTMLElement>(`[data-idx="${selectedIdx}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  // Keyboard navigation
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

  function handlePopular(label: string) {
    setQuery(label);
    setFilter('all');
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // ── Render helpers ────────────────────────────────────────────────────────

  const hasResults = grouped && grouped.total > 0;
  const noResults  = grouped && grouped.total === 0;

  const FILTER_TABS: Array<{ kind: FilterKind; label: string; count: number }> = [
    { kind: 'all',         label: 'All',          count: grouped?.total                ?? 0 },
    { kind: 'destination', label: 'Destinations', count: grouped?.destinations.length  ?? 0 },
    { kind: 'stay',        label: 'Stays',        count: grouped?.stays.length         ?? 0 },
    { kind: 'business',    label: 'Businesses',   count: grouped?.businesses.length    ?? 0 },
    { kind: 'page',        label: 'Pages',        count: grouped?.pages.length         ?? 0 },
  ].filter(t => t.kind === 'all' || t.count > 0);

  // ── JSX ───────────────────────────────────────────────────────────────────

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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4"
          >
            <div className="bg-[#0a1f14] border border-[#1a4a30] shadow-2xl overflow-hidden">

              {/* ── Search input ── */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0d2d1e]">
                <Search className="w-4 h-4 text-[#3a9e6e] shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, stays, activities…"
                  className="flex-1 bg-transparent text-[#f4ecd8] placeholder-[#f4ecd8]/30 font-sans text-sm outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    className="text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30 border border-[#0d2d1e] px-2 py-1 hover:text-[#f4ecd8]/60 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* ── Category filter tabs (visible only when results exist) ── */}
              {hasResults && FILTER_TABS.length > 2 && (
                <div className="flex items-center px-3 border-b border-[#0d2d1e] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
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

              {/* ── Results list ── */}
              {hasResults ? (
                <ul
                  ref={listRef}
                  className="max-h-[55vh] overflow-y-auto divide-y divide-[#0d2d1e]"
                  role="listbox"
                >
                  {flatResults.map((r, idx) => {
                    const KMeta    = KIND_META[r.kind];
                    const selected = idx === selectedIdx;
                    return (
                      <li key={r.id} role="option" aria-selected={selected}>
                        <button
                          data-idx={idx}
                          onMouseEnter={() => setSelectedIdx(idx)}
                          onClick={() => handleSelect(r)}
                          className={cn(
                            'w-full flex items-center gap-3 px-5 py-3.5 transition-colors text-left group',
                            selected ? 'bg-[#0d2d1e]' : 'hover:bg-[#0d2d1e]/70',
                          )}
                        >
                          {/* Thumbnail or icon */}
                          {r.image ? (
                            <img
                              src={r.image}
                              alt={r.title}
                              className="w-9 h-9 object-cover shrink-0 opacity-90"
                            />
                          ) : (
                            <div
                              className="w-9 h-9 flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${KMeta.color}18` }}
                            >
                              <KMeta.icon className="w-3.5 h-3.5" style={{ color: KMeta.color }} />
                            </div>
                          )}

                          {/* Title + subtitle */}
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm text-[#f4ecd8] group-hover:text-white transition-colors truncate">
                              {highlightMatch(r.title, query)}
                            </p>
                            <p className="text-[10px] font-sans text-[#f4ecd8]/40 truncate">
                              {r.subtitle}
                            </p>
                          </div>

                          {/* Kind badge */}
                          <span
                            className="text-[7px] tracking-[0.2em] uppercase font-sans px-1.5 py-0.5 shrink-0"
                            style={{
                              color:           KMeta.color,
                              backgroundColor: `${KMeta.color}18`,
                              border:          `1px solid ${KMeta.color}30`,
                            }}
                          >
                            {KMeta.label}
                          </span>

                          {/* Arrow */}
                          <ChevronRight
                            className={cn(
                              'w-3 h-3 transition-colors shrink-0',
                              selected
                                ? 'text-[#3a9e6e]'
                                : 'text-[#f4ecd8]/20 group-hover:text-[#f4ecd8]/50',
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>

              ) : noResults ? (
                /* ── Zero results state ── */
                <div className="py-12 text-center px-6">
                  <p className="font-sans text-sm text-[#f4ecd8]/30">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-[10px] font-sans text-[#f4ecd8]/20 mt-1">
                    Try a destination, beach, fort, activity, or season
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-5">
                    {POPULAR.slice(0, 4).map(p => (
                      <button
                        key={p}
                        onClick={() => handlePopular(p)}
                        className="text-[10px] font-sans text-[#f4ecd8]/40 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/70 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

              ) : (
                /* ── Default / empty query state ── */
                <div className="p-5">
                  {/* Recent searches */}
                  {recent.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2.5">
                        <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30">
                          Recent
                        </p>
                        <button
                          onClick={() => { clearRecent(); setRecent([]); }}
                          className="text-[8px] font-sans text-[#f4ecd8]/20 hover:text-[#f4ecd8]/50 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recent.map(r => (
                          <button
                            key={r}
                            onClick={() => handlePopular(r)}
                            className="flex items-center gap-1.5 text-[10px] font-sans text-[#f4ecd8]/50 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/80 transition-colors"
                          >
                            <Clock className="w-2.5 h-2.5 opacity-50" />
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular */}
                  <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">
                    Popular
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map(p => (
                      <button
                        key={p}
                        onClick={() => handlePopular(p)}
                        className="text-[10px] font-sans text-[#f4ecd8]/50 border border-[#0d2d1e] px-3 py-1.5 hover:border-[#3a9e6e]/40 hover:text-[#f4ecd8]/80 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  {/* Quick links */}
                  <div className="mt-5 pt-4 border-t border-[#0d2d1e]">
                    <p className="text-[8px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">
                      Quick Links
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {PAGE_LINKS.slice(0, 6).map(p => (
                        <button
                          key={p.id}
                          onClick={() => handleSelect(p)}
                          className="flex items-center gap-2 p-2.5 text-left hover:bg-[#0d2d1e]/70 transition-colors group"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: p.accent }}
                          />
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
                {grouped && grouped.total > 0 && (
                  <span className="text-[8px] font-sans text-[#f4ecd8]/20">
                    {grouped.total} result{grouped.total !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
