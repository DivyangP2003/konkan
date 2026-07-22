import { Link, useLocation } from 'wouter';
import { sections } from '@/data/sections';

const navGroups = [
  {
    label: 'Heritage & Culture',
    color: '#c17f3a',
    ids: ['history', 'culture', 'art', 'music', 'festivals', 'personalities', 'language-dialects', 'freedom-struggle', 'literature-poets'],
  },
  {
    label: 'Nature & Ecology',
    color: '#3a9e6e',
    ids: ['geography', 'ecology', 'flora-fauna', 'beaches', 'monsoon', 'sacred-groves', 'wildlife-sanctuaries', 'geology-coastline'],
  },
  {
    label: 'Life & Sustenance',
    color: '#d45f2a',
    ids: ['cuisine', 'village', 'agriculture', 'fishing-traditions', 'weddings-rituals', 'textiles-costume', 'handicrafts'],
  },
  {
    label: 'Travel & Discovery',
    color: '#2a8fb5',
    ids: ['tourism', 'ecotourism', 'hidden-gems', 'adventure', 'konkan-railway', 'water-sports', 'homestays', 'diaspora'],
  },
];

const sectionMap = Object.fromEntries(sections.map(s => [s.id, s]));

export function Footer() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <footer className="bg-[#020a08] border-t border-[#0d2d1e]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href={`${base}/`} className="font-serif text-[32px] tracking-[0.18em] text-[#800020] hover:text-[#a02040] transition-colors">
            K.
          </Link>
          <p className="mt-4 font-sans text-xs text-[#f4ecd8]/35 leading-relaxed max-w-xs">
            A journey through the richness of India's Konkan coast — 720 km of history, nature, cuisine, and culture.
          </p>
          <p className="mt-6 font-serif italic text-sm text-[#f4ecd8]/30">
            येवा , ताक-भात खावा , अन् आपलोच घर समजा!
          </p>
        </div>

        {/* Realm groups */}
        {navGroups.map(group => (
          <div key={group.label} className="lg:col-span-1">
            <p
              className="mb-5 font-sans text-[9px] tracking-[0.35em] uppercase"
              style={{ color: group.color }}
            >
              {group.label}
            </p>
            <ul className="space-y-2.5">
              {group.ids.map(id => {
                const s = sectionMap[id];
                if (!s) return null;
                return (
                  <li key={id}>
                    <Link
                      href={`${base}/realm/${id}`}
                      className="font-sans text-xs text-[#f4ecd8]/40 hover:text-[#f4ecd8]/80 transition-colors"
                    >
                      {s.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0d2d1e] px-8 md:px-16 py-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#f4ecd8]/22">
          KONKAN — Blessed with Nature's Richest Treasures
        </p>
        <div className="flex items-center gap-6 text-[10px] tracking-[0.22em] uppercase font-sans text-[#f4ecd8]/22">
          <a href={`${base}/#discover`} className="hover:text-[#f4ecd8]/55 transition-colors">Story</a>
          <a href={`${base}/#map`} className="hover:text-[#f4ecd8]/55 transition-colors">Map</a>
          <Link href={`${base}/explore`} className="hover:text-[#f4ecd8]/55 transition-colors">Browse All Realms</Link>
        </div>
      </div>
    </footer>
  );
}
