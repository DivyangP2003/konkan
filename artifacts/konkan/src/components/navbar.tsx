import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Search, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '@/data/sections';
import { UserMenu } from './user-menu';
import { AuthDialog } from './auth-dialog';
import { SearchOverlay } from './search-overlay';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const megaCategories = [
  {
    label: 'Heritage & Culture',
    color: '#c17f3a',
    ids: [
      'history', 'culture', 'art', 'music', 'festivals', 'local-festivals', 'personalities',
      'language-dialects', 'religious-mosaic', 'weddings-rituals', 'handicrafts',
      'freedom-struggle', 'maritime-history', 'textiles-costume', 'forts-of-konkan', 'literature-poets',
    ],
  },
  {
    label: 'Nature & Ecology',
    color: '#3a9e6e',
    ids: [
      'geography', 'ecology', 'flora-fauna', 'beaches',
      'monsoon', 'geology-coastline', 'sacred-groves', 'wildlife-sanctuaries',
    ],
  },
  {
    label: 'Life & Sustenance',
    color: '#d45f2a',
    ids: ['cuisine', 'village', 'agriculture', 'fishing-traditions'],
  },
  {
    label: 'Travel & Discovery',
    color: '#2a8fb5',
    ids: [
      'tourism', 'ecotourism', 'hidden-gems', 'adventure',
      'konkan-railway', 'water-sports', 'homestays', 'diaspora',
    ],
  },
];

const sectionMap = Object.fromEntries(sections.map((s) => [s.id, s]));

const primaryLinks = [
  { label: 'Story', href: '/#discover' },
  { label: 'Map',   href: '/map'      },
];

const siteLinks = [
  { label: 'Culture',    href: '/culture' },
  { label: 'Heritage',   href: '/heritage' },
  { label: 'Spiritual',  href: '/spiritual' },
  { label: 'Stay',       href: '/stay' },
  { label: 'Food',       href: '/food' },
  { label: 'Activities', href: '/activities' },
  { label: 'Adventure',  href: '/adventure' },
  { label: 'Plan',       href: '/plan' },
  { label: 'Book',       href: '/booking' },
  { label: 'Businesses', href: '/businesses' },
  { label: 'Stories',    href: '/stories' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
];

const moreLinks = [
  { label: 'Culture', href: '/culture', description: 'Art, music & traditions' },
  { label: 'Heritage', href: '/heritage', description: 'Forts, temples & history' },
  { label: 'Spiritual', href: '/spiritual', description: 'Sacred temples & pilgrimages' },
  { label: 'Stay', href: '/stay', description: 'Homestays, resorts & more' },
  { label: 'Food', href: '/food', description: 'Authentic Konkan cuisine' },
  { label: 'Activities', href: '/activities', description: 'Things to do along the coast' },
  { label: 'Adventure', href: '/adventure', description: 'Treks, water sports & more' },
  { label: 'Plan', href: '/plan', description: 'Build your Konkan itinerary' },
  { label: 'Book', href: '/booking', description: 'Trains, buses, ferries & cabs' },
  { label: 'Businesses', href: '/businesses', description: 'Guides, eateries & artisans' },
  { label: 'Stories', href: '/stories', description: 'Voices and field notes' },
  { label: 'About', href: '/about', description: 'Why Konkan exists' },
  { label: 'Contact', href: '/contact', description: 'Questions, ideas & partnerships' },
];

interface NavbarProps {
  onAuthRequired?: () => void;
}

export function Navbar({ onAuthRequired }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCat, setDrawerCat] = useState<number | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const [location, navigate] = useLocation();
  const { user, signOut } = useAuthStore();

  const handleSignInClick = () => {
    if (onAuthRequired) {
      onAuthRequired();
    } else {
      setAuthOpen(true);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMoreOpen(false);
    setDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const isLight = scrolled || megaOpen || moreOpen;

  const navLinkClass = (extra?: string) =>
    cn(
      'relative px-3 py-2.5 text-[10.5px] tracking-[0.2em] uppercase font-sans transition-colors duration-300 group whitespace-nowrap',
      isLight ? 'text-[#800020]' : 'text-[#f4ecd8]/85 hover:text-white',
      extra
    );

  const navUnderlineClass = cn(
    'absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left',
    isLight ? 'bg-[#800020]' : 'bg-[#f4ecd8]'
  );

  return (
    <>
      <nav
        ref={megaRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isLight
            ? 'bg-[#f7f2eb]/95 backdrop-blur-xl border-b border-[#d8c8bb] shadow-[0_4px_60px_rgba(0,0,0,0.12)]'
            : 'bg-gradient-to-b from-black/45 via-black/20 to-transparent'
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3.5 md:px-8 md:py-4">

          <Link
            href="/"
            className={cn(
              'flex shrink-0 select-none items-center gap-2.5 font-serif text-[25px] font-light tracking-[0.16em] transition-colors duration-500 z-10',
              isLight ? 'text-[#800020]' : 'text-[#f4ecd8]'
            )}
          >
            K.
            <span className={cn(
              'hidden border-l pl-2.5 font-sans text-[8px] font-medium uppercase tracking-[0.3em] sm:inline',
              isLight ? 'border-[#800020]/20 text-[#800020]/55' : 'border-[#f4ecd8]/20 text-[#f4ecd8]/50'
            )}>
              Konkan
            </span>
          </Link>

          <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-1">
            <button
              onClick={() => setMegaOpen((o) => !o)}
              className={navLinkClass('flex items-center gap-1.5 relative')}
              aria-expanded={megaOpen}
            >
              Explore
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown size={11} strokeWidth={2} />
              </motion.span>
              {megaOpen && (
                <span className={cn('absolute bottom-0 left-3 right-3 h-[1px]', isLight ? 'bg-[#800020]' : 'bg-[#f4ecd8]')} />
              )}
            </button>

            <Link href="/destinations" onClick={() => setMegaOpen(false)} className={navLinkClass()}>
              Destinations
              <span className={navUnderlineClass} />
            </Link>

            {primaryLinks.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMegaOpen(false)} className={navLinkClass()}>
                {label}
                <span className={navUnderlineClass} />
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className={navLinkClass('flex items-center gap-1.5 relative')}
                aria-expanded={moreOpen}
              >
                More
                <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={11} strokeWidth={2} />
                </motion.span>
                {moreOpen && (
                  <span className={cn('absolute bottom-0 left-3 right-3 h-[1px]', isLight ? 'bg-[#800020]' : 'bg-[#f4ecd8]')} />
                )}
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full mt-4 w-[360px] -translate-x-1/2 border border-[#1c4b31] bg-[#06150d]/98 p-3 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {moreLinks.map(({ label, href, description }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMoreOpen(false)}
                          className="group rounded-sm px-3 py-2.5 transition-colors hover:bg-[#0d2d1e]/70"
                        >
                          <span className="flex items-center justify-between text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-[#f4ecd8]/80 group-hover:text-[#f4ecd8]">
                            {label}
                            <ArrowUpRight className="h-3 w-3 text-[#3a9e6e]/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                          <span className="mt-1 block font-sans text-[9px] leading-relaxed text-[#f4ecd8]/35">{description}</span>
                        </Link>
                      ))}
                      {user?.role === 'admin' && (
                        <Link href="/admin" onClick={() => setMoreOpen(false)} className="rounded-sm px-3 py-2.5 transition-colors hover:bg-[#0d2d1e]/70">
                          <span className="text-[10px] font-sans font-medium uppercase tracking-[0.16em] text-[#c17f3a]">Admin</span>
                          <span className="mt-1 block font-sans text-[9px] text-[#f4ecd8]/35">Manage the platform</span>
                        </Link>
                      )}
                    </div>
                    <Link href="/explore" onClick={() => setMoreOpen(false)} className="mt-2 flex items-center justify-between border-t border-[#0d2d1e] px-3 pt-3 text-[9px] font-sans uppercase tracking-[0.22em] text-[#3a9e6e] hover:text-[#4ab57e]">
                      Browse all realms
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex shrink-0 items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-2 text-[9px] tracking-[0.16em] uppercase font-sans transition-colors duration-300 border',
                isLight
                  ? 'border-[#800020]/20 text-[#800020]/70 hover:text-[#800020] hover:border-[#800020]/40'
                  : 'border-[#f4ecd8]/15 text-[#f4ecd8]/50 hover:text-[#f4ecd8]/80 hover:border-[#f4ecd8]/30',
              )}
              title="Search (⌘K)"
            >
              <Search size={12} />
              <span className="hidden xl:inline">Search</span>
              <span className="hidden xl:inline text-[7px] opacity-50 ml-1">⌘K</span>
            </button>

            <UserMenu onSignInClick={handleSignInClick} />

            <a
              href="/#carousel"
              onClick={() => setMegaOpen(false)}
              className="flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase font-sans text-[#f7f2eb] bg-[#7B1E3A] hover:bg-[#65162F] px-5 py-2.5 transition-colors duration-300 shrink-0"
            >
              Begin Journey
            </a>
          </div>

          <button
            className={cn(
              'lg:hidden p-1.5 transition-colors shrink-0',
              isLight ? 'text-[#800020]/80 hover:text-[#800020]' : 'text-[#f4ecd8]/80 hover:text-[#f4ecd8]'
            )}
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label="Menu"
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="border-t border-[#0d2d1e]/60 bg-[#020d08]/98 backdrop-blur-2xl"
            >
              <div className="max-w-[1400px] mx-auto px-8 md:px-14 py-10 pb-12">
                <p className="text-[9px] tracking-[0.5em] uppercase font-sans text-[#f4ecd8]/25 mb-8">
                  {sections.length} realms of the konkan coast
                </p>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
                  {megaCategories.map((cat) => (
                    <div key={cat.label}>
                      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#0d2d1e]">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium" style={{ color: cat.color }}>
                          {cat.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        {cat.ids.map((id) => {
                          const s = sectionMap[id];
                          if (!s) return null;
                          return (
                            <Link
                              key={id}
                              href={`${base}/realm/${id}`}
                              onClick={() => setMegaOpen(false)}
                              className="group flex items-center gap-3 py-2 px-1 rounded transition-all duration-200 hover:bg-[#0d2d1e]/60"
                            >
                              <div className="w-[2px] h-4 rounded-full shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ backgroundColor: cat.color }} />
                              <span className="text-[13px] font-sans text-[#f4ecd8]/60 group-hover:text-[#f4ecd8] transition-colors duration-200 leading-tight">
                                {s.title}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-[#0d2d1e] flex items-center justify-between">
                  <p className="text-[10px] text-[#f4ecd8]/25 font-sans tracking-[0.2em] uppercase">
                    Explore all facets of the Konkan coast
                  </p>
                  <Link
                    href="/explore"
                    onClick={() => setMegaOpen(false)}
                    className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#3a9e6e] hover:text-[#4ab57e] transition-colors duration-200 flex items-center gap-2"
                  >
                    View all realms
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020d08]/98 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="min-h-full px-6 pb-16 pt-24">

              <div className="flex flex-col gap-1 mb-8">
                <Link href="/explore" onClick={() => setDrawerOpen(false)} className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors">
                  All Realms
                </Link>
                {primaryLinks.map(({ label, href }) => (
                  <Link key={href} href={href} onClick={() => setDrawerOpen(false)} className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors">
                    {label}
                  </Link>
                ))}
                <Link href="/destinations" onClick={() => setDrawerOpen(false)} className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors">
                  Destinations
                </Link>
                {siteLinks.map(({ label, href }) => (
                  <Link key={href} href={href} onClick={() => setDrawerOpen(false)} className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors">
                    {label}
                  </Link>
                ))}
                {user && user.role === 'admin' && (
                  <Link href="/admin" onClick={() => setDrawerOpen(false)} className="font-serif text-2xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 transition-colors">
                    Admin
                  </Link>
                )}
              </div>

              <div className="h-[1px] bg-[#0d2d1e] mb-8" />

              <p className="text-[9px] tracking-[0.4em] uppercase text-[#f4ecd8]/25 mb-6">Explore Realms</p>

              <div className="flex flex-col gap-2 mb-8">
                {megaCategories.map((cat, ci) => (
                  <div key={cat.label}>
                    <button
                      onClick={() => setDrawerCat(drawerCat === ci ? null : ci)}
                      className="w-full flex items-center justify-between py-3 border-b border-[#0d2d1e]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm font-sans tracking-[0.15em] uppercase" style={{ color: cat.color }}>
                          {cat.label}
                        </span>
                      </div>
                      <motion.div animate={{ rotate: drawerCat === ci ? 180 : 0 }}>
                        <ChevronDown size={14} className="text-[#f4ecd8]/30" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {drawerCat === ci && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="py-3 pl-5 flex flex-col gap-1">
                            {cat.ids.map((id) => {
                              const s = sectionMap[id];
                              if (!s) return null;
                              return (
                                <Link key={id} href={`${base}/realm/${id}`} onClick={() => setDrawerOpen(false)} className="font-serif text-xl text-[#f4ecd8]/60 hover:text-[#f4ecd8] py-1.5 transition-colors">
                                  {s.title}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-[#0d2d1e] mb-8" />

              <div className="flex items-center justify-between mb-8">
                <UserMenu onSignInClick={() => { handleSignInClick(); setDrawerOpen(false); }} />

                {user ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { signOut(); setDrawerOpen(false); }}
                  >
                    Sign out
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { handleSignInClick(); setDrawerOpen(false); }}
                  >
                    Sign in
                  </Button>
                )}
              </div>

              {user && (
                <button
                  onClick={() => { navigate('/wishlist'); setDrawerOpen(false); }}
                  className="font-serif text-xl text-[#f4ecd8]/70 hover:text-[#f4ecd8] py-2 mb-6 block text-left w-full"
                >
                  My wishlist
                </button>
              )}

              <a
                href="/#carousel"
                onClick={() => setDrawerOpen(false)}
                className="mt-2 w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.28em] uppercase font-sans text-[#f7f2eb] bg-[#7B1E3A] hover:bg-[#65162F] py-4 transition-colors"
              >
                Begin Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
