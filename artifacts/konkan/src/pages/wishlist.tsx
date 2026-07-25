import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Compass, BedDouble, UtensilsCrossed, Sparkles,
  Trash2, ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthDialog } from '@/components/auth-dialog';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useWishlistStore, type WishlistItemType, type WishlistItem } from '@/stores/wishlist-store';
import { cn } from '@/lib/utils';

const TYPE_META: Record<WishlistItemType, {
  label: string; icon: typeof Compass; accent: string; pill: string; route: string;
}> = {
  destination: {
    label: 'Destinations', icon: Compass, accent: '#3a9e6e',
    pill: 'bg-[#3a9e6e]/15 border-[#3a9e6e]/40 text-[#3a9e6e]',
    route: '/destinations',
  },
  stay: {
    label: 'Stays', icon: BedDouble, accent: '#c17f3a',
    pill: 'bg-[#c17f3a]/15 border-[#c17f3a]/40 text-[#c17f3a]',
    route: '/stay',
  },
  food: {
    label: 'Food', icon: UtensilsCrossed, accent: '#d45f2a',
    pill: 'bg-[#d45f2a]/15 border-[#d45f2a]/40 text-[#d45f2a]',
    route: '/food',
  },
  activity: {
    label: 'Activities', icon: Sparkles, accent: '#2a8fb5',
    pill: 'bg-[#2a8fb5]/15 border-[#2a8fb5]/40 text-[#2a8fb5]',
    route: '/activities',
  },
};

type Filter = 'all' | WishlistItemType;

export default function Wishlist() {
  const user = useAuthStore((s) => s.user);
  const items = useWishlistStore((s) => s.items);
  const ready = useWishlistStore((s) => s.ready);
  const toggle = useWishlistStore((s) => s.toggle);
  const loadForUser = useWishlistStore((s) => s.loadForUser);

  const [, navigate] = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (user && !ready) loadForUser(user.id);
  }, [user, ready, loadForUser]);

  const grouped = useMemo(() => {
    const g: Record<WishlistItemType, WishlistItem[]> = {
      destination: [], stay: [], food: [], activity: [],
    };
    for (const i of items) g[i.itemType].push(i);
    return g;
  }, [items]);

  const visible = filter === 'all' ? items : grouped[filter];
  const userFirstName = (user?.name || '').split(' ')[0];

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <Navbar onAuthRequired={() => setAuthOpen(true)} />

      <section className="relative pt-32 pb-16 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(193,127,58,0.18),_transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c17f3a] mb-4">Your collection</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f4ecd8] leading-[0.95]">
            {user
              ? <>{userFirstName ? `${userFirstName}'s` : 'Your'} Wishlist</>
              : 'Your Wishlist'}
          </h1>
          <p className="mt-5 max-w-xl text-[#f4ecd8]/70 text-lg">
            Every place you'd like to return to, kept in one place.
            {!user && ' Sign in to keep it synced.'}
          </p>
        </motion.div>
      </section>

      <section className="px-6 lg:px-12 pb-24 max-w-7xl mx-auto">
        {!user && <SignedOut onSignIn={() => setAuthOpen(true)} />}

        {user && !ready && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {user && ready && items.length === 0 && (
          <EmptyState onDiscover={() => navigate('/destinations')} />
        )}

        {user && ready && items.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 mb-10">
              <FilterPill
                label={`All (${items.length})`}
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              />
              {(Object.keys(TYPE_META) as WishlistItemType[]).map((t) =>
                grouped[t].length > 0 ? (
                  <FilterPill
                    key={t}
                    label={`${TYPE_META[t].label} (${grouped[t].length})`}
                    active={filter === t}
                    onClick={() => setFilter(t)}
                    accent={TYPE_META[t].accent}
                  />
                ) : null
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visible.map((item) => {
                  const meta = TYPE_META[item.itemType];
                  const Icon = meta.icon;
                  return (
                    <motion.article
                      key={`${item.itemType}:${item.itemId}`}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35 }}
                      className="group relative bg-[#0a1e15] border border-[#0d2d1e] rounded-2xl overflow-hidden hover:border-[#3a9e6e]/40 transition-all"
                    >
                      <div className="relative h-48 overflow-hidden bg-[#020d08]">
                        {item.itemImage ? (
                          <img
                            src={item.itemImage}
                            alt={item.itemName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_rgba(58,158,110,0.15),_transparent_70%)]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-transparent to-transparent" />
                        <span className={cn(
                          'absolute top-3 left-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-full border',
                          meta.pill
                        )}>
                          <Icon className="w-3 h-3" />
                          {meta.label}
                        </span>
                        <button
                          onClick={() => toggle(item.itemType, item.itemId, item.itemName, item.itemImage || undefined)}
                          aria-label={`Remove ${item.itemName}`}
                          className="absolute top-3 right-3 p-2 rounded-full bg-[#c17f3a]/25 hover:bg-[#c17f3a]/45 border border-[#c17f3a]/50 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#c17f3a]" />
                        </button>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-xl text-[#f4ecd8] line-clamp-2">
                          {item.itemName}
                        </h3>
                        <p className="text-xs text-[#f4ecd8]/55 mt-2">
                          Saved {new Date(item.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </p>
                        <button
                          onClick={() => navigate(meta.route)}
                          className="mt-4 text-sm font-medium text-[#3a9e6e] hover:text-[#c17f3a] transition-colors inline-flex items-center gap-1.5"
                        >
                          Explore more <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      <Footer />

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}

function FilterPill({ label, active, onClick, accent }: {
  label: string; active: boolean; onClick: () => void; accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-1.5 rounded-full text-sm transition-all border',
        active
          ? 'bg-[#f4ecd8] text-[#020d08] border-[#f4ecd8]'
          : 'border-[#0d2d1e] text-[#f4ecd8]/70 hover:border-[#3a9e6e]/40'
      )}
      style={(!active && accent) ? { borderColor: `${accent}30` } : undefined}
    >
      {label}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#0a1e15] border border-[#0d2d1e] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-[#0d2d1e]" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-[#0d2d1e] rounded w-3/4" />
        <div className="h-3 bg-[#0d2d1e] rounded w-1/2" />
      </div>
    </div>
  );
}

function EmptyState({ onDiscover }: { onDiscover: () => void }) {
  return (
    <div className="text-center max-w-lg mx-auto py-16">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#c17f3a]/15 border border-[#c17f3a]/30 mb-6">
        <Heart className="w-6 h-6 text-[#c17f3a]" />
      </div>
      <h2 className="font-serif text-3xl text-[#f4ecd8] mb-3">Nothing saved yet</h2>
      <p className="text-[#f4ecd8]/65 mb-7">
        Tap the heart on any destination, stay, dish, or activity to start collecting.
      </p>
      <Button onClick={onDiscover} className="bg-[#3a9e6e] hover:bg-[#3a9e6e]/90 text-[#f4ecd8]">
        Discover destinations <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

function SignedOut({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="text-center max-w-lg mx-auto py-12">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3a9e6e]/15 border border-[#3a9e6e]/30 mb-6">
        <Heart className="w-6 h-6 text-[#3a9e6e]" />
      </div>
      <h2 className="font-serif text-3xl text-[#f4ecd8] mb-3">Sign in to keep your list</h2>
      <p className="text-[#f4ecd8]/65 mb-7">
        Your wishlist lives in Supabase — sign in once and it's there whenever you return, on any device.
      </p>
      <Button onClick={onSignIn} className="bg-[#3a9e6e] hover:bg-[#3a9e6e]/90 text-[#f4ecd8]">
        Sign in to continue
      </Button>
    </div>
  );
}
