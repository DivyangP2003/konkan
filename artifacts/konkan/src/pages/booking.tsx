import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Bus, Anchor, Car, ExternalLink, ChevronDown, ChevronUp, Clock, MapPin, Info, Calendar, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AlertBanner } from '@/components/alert-banner';
import { cn } from '@/lib/utils';
import {
  trainRoutes,
  busRoutes,
  ferryRoutes,
  cabProviders,
  modeConfig,
  type TransportMode,
  type TransportRoute,
} from '@/data/transport';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';

// ── Mode Tab ──────────────────────────────────────────────────────────────────
const MODES: { mode: TransportMode; icon: typeof Train; routes: TransportRoute[] }[] = [
  { mode: 'train', icon: Train,  routes: trainRoutes  },
  { mode: 'bus',   icon: Bus,    routes: busRoutes    },
  { mode: 'ferry', icon: Anchor, routes: ferryRoutes  },
  { mode: 'cab',   icon: Car,    routes: []           },
];

// ── Booking Form ──────────────────────────────────────────────────────────────
interface BookingFormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  passengers: number;
  seatClass: string;
  notes: string;
}

function BookingModal({
  route,
  mode,
  onClose,
}: {
  route: TransportRoute;
  mode: TransportMode;
  onClose: () => void;
}) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const cfg = modeConfig[mode];

  const [form, setForm] = useState<BookingFormState>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: '',
    date: '',
    passengers: 1,
    seatClass: mode === 'train' ? 'sleeper' : '',
    notes: '',
  });

  const set = (k: keyof BookingFormState, v: string | number) =>
    setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) return;

    setSubmitting(true);
    try {
      if (supabase) {
        await supabase.from('bookings').insert({
          user_id: user?.id ?? null,
          mode,
          route_id: route.id,
          route_name: route.name,
          from_location: route.from,
          to_location: route.to,
          travel_date: form.date,
          num_passengers: form.passengers,
          seat_class: form.seatClass || null,
          passenger_name: form.name,
          passenger_email: form.email,
          passenger_phone: form.phone || null,
          notes: form.notes || null,
          status: 'enquiry',
        });
      }
      setDone(true);
    } catch {
      toast({ title: 'Error', description: 'Could not save your enquiry. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const seatOptions =
    mode === 'train'
      ? ['sleeper', '3ac', '2ac', '1ac', 'chair_car']
      : mode === 'bus'
      ? ['general', 'sleeper', 'ac_sleeper']
      : [];

  if (done) {
    return (
      <div className="p-8 text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: cfg.color }} />
        <h3 className="font-serif text-2xl text-[#f4ecd8] mb-2">Enquiry Received</h3>
        <p className="text-sm font-sans text-[#f4ecd8]/60 mb-6">
          Your travel enquiry for <span className="text-[#f4ecd8]/80">{route.name}</span> has been saved.
          {route.bookingUrl && ' We recommend also booking on the official platform below.'}
        </p>
        {route.bookingUrl && (
          <a
            href={route.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans px-6 py-3"
            style={{ backgroundColor: cfg.color, color: '#020d08' }}
          >
            Book on Official Site <ExternalLink className="w-3 h-3" />
          </a>
        )}
        <button
          onClick={onClose}
          className="block mt-4 mx-auto text-[10px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <p className="text-[9px] tracking-[0.24em] uppercase font-sans mb-1" style={{ color: cfg.color }}>
          {cfg.icon} Booking Enquiry
        </p>
        <h3 className="font-serif text-xl text-[#f4ecd8]">{route.name}</h3>
        <p className="text-xs font-sans text-[#f4ecd8]/40 mt-0.5">
          {route.from} → {route.to} · {route.duration}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Full Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50 transition-colors"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Travel Date *</label>
          <input
            required
            type="date"
            value={form.date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => set('date', e.target.value)}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50"
          />
        </div>
        <div>
          <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Passengers</label>
          <input
            type="number"
            min={1}
            max={9}
            value={form.passengers}
            onChange={(e) => set('passengers', parseInt(e.target.value))}
            className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50"
          />
        </div>
        {seatOptions.length > 0 && (
          <div>
            <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Class</label>
            <select
              value={form.seatClass}
              onChange={(e) => set('seatClass', e.target.value)}
              className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50"
            >
              {seatOptions.map((o) => (
                <option key={o} value={o}>{o.replace('_', ' ').toUpperCase()}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className="block text-[8px] tracking-[0.2em] uppercase font-sans text-[#f4ecd8]/40 mb-1">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={2}
          className="w-full bg-[#020d08] border border-[#0d2d1e] text-[#f4ecd8] text-xs font-sans px-3 py-2 outline-none focus:border-[#3a9e6e]/50 resize-none"
          placeholder="Special requirements, seat preferences…"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 py-3 text-[10px] tracking-[0.2em] uppercase font-sans transition-opacity disabled:opacity-50"
          style={{ backgroundColor: cfg.color, color: '#020d08' }}
        >
          {submitting ? 'Saving…' : 'Save Enquiry'}
        </button>
        {route.bookingUrl && (
          <a
            href={route.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-3 px-4 text-[10px] tracking-[0.2em] uppercase font-sans border transition-colors"
            style={{ borderColor: cfg.color + '40', color: cfg.color }}
          >
            Official Site <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </form>
  );
}

// ── Route Card ────────────────────────────────────────────────────────────────
function RouteCard({
  route,
  mode,
  onBook,
}: {
  route: TransportRoute;
  mode: TransportMode;
  onBook: (r: TransportRoute) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cfg = modeConfig[mode];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-300"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2 py-0.5"
                style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                {cfg.label}
              </span>
              <span className="text-[8px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30">
                {route.frequency}
              </span>
            </div>
            <h3 className="font-serif text-xl text-[#f4ecd8] leading-tight mb-1">{route.name}</h3>
            <div className="flex items-center gap-2 text-xs font-sans text-[#f4ecd8]/50">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{route.from}</span>
              <ArrowRight className="w-3 h-3 shrink-0 text-[#f4ecd8]/30" />
              <span className="truncate">{route.to}</span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 justify-end mb-1">
              <Clock className="w-3 h-3 text-[#f4ecd8]/30" />
              <span className="text-sm font-sans text-[#f4ecd8]/70">{route.duration}</span>
            </div>
            <p className="text-xs font-sans" style={{ color: cfg.color }}>{route.priceRange}</p>
          </div>
        </div>

        {/* Schedule peek */}
        {route.schedule && route.schedule.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {route.schedule.slice(0, 3).map((s, i) => (
              <div key={i} className="text-[9px] font-sans bg-[#020d08]/60 px-2.5 py-1.5 border border-[#0d2d1e]">
                <span className="text-[#f4ecd8]/70">{s.departure}</span>
                <span className="text-[#f4ecd8]/30 mx-1">→</span>
                <span className="text-[#f4ecd8]/50">{s.arrival}</span>
                <span className="text-[#f4ecd8]/25 ml-2">· {s.days}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-[#0d2d1e]">
              {route.highlights && route.highlights.length > 0 && (
                <div className="pt-4">
                  <p className="text-[8px] tracking-[0.24em] uppercase font-sans text-[#f4ecd8]/30 mb-2">Highlights</p>
                  <ul className="space-y-1.5">
                    {route.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-[#f4ecd8]/60">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: cfg.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {route.notes && (
                <div className="flex items-start gap-2 bg-[#0d2d1e]/50 p-3">
                  <Info className="w-3 h-3 mt-0.5 shrink-0 text-[#f4ecd8]/30" />
                  <p className="text-[10px] font-sans text-[#f4ecd8]/50 leading-relaxed">{route.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer actions */}
      <div className="px-5 py-3 border-t border-[#0d2d1e] flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans text-[#f4ecd8]/30 hover:text-[#f4ecd8]/60 transition-colors"
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Less' : 'Details'}
        </button>
        <div className="flex items-center gap-2">
          {route.bookingUrl && (
            <a
              href={route.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase font-sans px-3 py-1.5 border transition-colors"
              style={{ borderColor: cfg.color + '40', color: cfg.color }}
            >
              Official Site <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
          <button
            onClick={() => onBook(route)}
            className="text-[9px] tracking-[0.2em] uppercase font-sans px-4 py-1.5 transition-opacity hover:opacity-80"
            style={{ backgroundColor: cfg.color, color: '#020d08' }}
          >
            Enquire / Book
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Cab Section ───────────────────────────────────────────────────────────────
function CabSection() {
  const cfg = modeConfig['cab'];
  return (
    <div className="space-y-4">
      <div className="bg-[#0d2d1e]/40 border border-[#0d2d1e] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-3.5 h-3.5 text-[#c17f3a]" />
          <p className="text-[9px] tracking-[0.22em] uppercase font-sans text-[#c17f3a]">
            About Konkan Cab Travel
          </p>
        </div>
        <p className="text-sm font-sans text-[#f4ecd8]/60 leading-relaxed">
          Cabs are the most flexible way to explore Konkan's back roads, hidden beaches, and villages.
          Local cab drivers often double as informal guides — many know routes that don't appear on any map.
          Rates: ₹15–20/km. Day-trip packages: ₹2,000–3,500 for 150–200 km.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cabProviders.map((cab) => (
          <div key={cab.id} className="border border-[#0d2d1e] p-5 hover:border-[#1a4a30] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[8px] tracking-[0.22em] uppercase font-sans px-2 py-0.5"
                style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                {cab.type === 'ola' ? 'App-Based' : cab.type === 'uber' ? 'App-Based' : 'Local'}
              </span>
            </div>
            <h3 className="font-serif text-lg text-[#f4ecd8] mb-1">{cab.name}</h3>
            <p className="text-[10px] font-sans text-[#f4ecd8]/40 mb-2">
              Coverage: {cab.coverage.join(', ')}
            </p>
            <p className="text-xs font-sans text-[#f4ecd8]/55 leading-relaxed">{cab.notes}</p>
            {cab.url && (
              <a
                href={cab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[9px] tracking-[0.18em] uppercase font-sans px-3 py-1.5 border transition-colors"
                style={{ borderColor: cfg.color + '40', color: cfg.color }}
              >
                Open App / Site <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BookingPage() {
  const [activeMode, setActiveMode] = useState<TransportMode>('train');
  const [bookingRoute, setBookingRoute] = useState<TransportRoute | null>(null);
  const currentMode = MODES.find((m) => m.mode === activeMode)!;
  const cfg = modeConfig[activeMode];

  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8]">
      <AlertBanner />
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="pt-40 md:pt-48 pb-16 px-8 md:px-16 border-b border-[#0d2d1e] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/konkan-railway.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-[9px] tracking-[0.36em] uppercase font-sans text-[#3a9e6e] mb-4">
            Multi-Modal Transport
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-none mb-4">
            Book Your
            <br />
            <span style={{ color: cfg.color }}>Konkan Journey</span>
          </h1>
          <p className="font-sans text-sm text-[#f4ecd8]/50 max-w-lg leading-relaxed">
            Trains, buses, ferries, and cabs — plan and book every leg of your Konkan trip from one place.
            We link to official booking platforms and save your travel enquiries.
          </p>
        </div>
      </div>

      {/* ── Mode Tabs ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#020d08] border-b border-[#0d2d1e] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex">
            {MODES.map(({ mode, icon: Icon }) => {
              const c = modeConfig[mode];
              const isActive = activeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-4 text-[9px] tracking-[0.2em] uppercase font-sans transition-all duration-300 border-b-2',
                    isActive ? 'border-current' : 'border-transparent text-[#f4ecd8]/40 hover:text-[#f4ecd8]/70',
                  )}
                  style={isActive ? { color: c.color } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeMode === 'cab' ? (
              <CabSection />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl text-[#f4ecd8]">
                      {cfg.label} Routes
                    </h2>
                    <p className="text-xs font-sans text-[#f4ecd8]/40 mt-0.5">
                      {currentMode.routes.length} routes · Click to expand details & schedule
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] font-sans text-[#f4ecd8]/30 border border-[#0d2d1e] px-3 py-1.5">
                    <Calendar className="w-3 h-3" />
                    Schedules are indicative — verify before travel
                  </div>
                </div>
                {currentMode.routes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    mode={activeMode}
                    onBook={setBookingRoute}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Train,
              title: 'Konkan Railway Tip',
              desc: 'Book train tickets 60 days in advance, especially for weekends and festival seasons. Use the Tatkal quota if you\'re flexible on class.',
              color: '#c17f3a',
            },
            {
              icon: Info,
              title: 'Monsoon Travel',
              desc: 'During June–September, verify ferry and coastal bus services. Some routes are suspended. The train is the most reliable mode in monsoon.',
              color: '#2a8fb5',
            },
            {
              icon: Car,
              title: 'Local Cabs',
              desc: 'Ask your homestay for their trusted cab driver contacts. Fixed-rate day trips (₹2,000–3,500) are often more economical than per-km metered rides.',
              color: '#3a9e6e',
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-[#0d2d1e]/40 border border-[#0d2d1e] p-5">
              <Icon className="w-4 h-4 mb-3" style={{ color }} />
              <h4 className="font-serif text-base text-[#f4ecd8] mb-1.5">{title}</h4>
              <p className="text-xs font-sans text-[#f4ecd8]/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Booking Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {bookingRoute && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020d08]/80 backdrop-blur-sm z-[100]"
              onClick={() => setBookingRoute(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg top-1/2 -translate-y-1/2 bg-[#0a1f14] border border-[#1a4a30] z-[101] max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#0d2d1e]">
                <p className="text-[8px] tracking-[0.24em] uppercase font-sans text-[#f4ecd8]/40">
                  Transport Enquiry
                </p>
                <button
                  onClick={() => setBookingRoute(null)}
                  className="text-[#f4ecd8]/30 hover:text-[#f4ecd8]/70 transition-colors text-xs font-sans tracking-[0.15em] uppercase"
                >
                  ✕ Close
                </button>
              </div>
              <BookingModal
                route={bookingRoute}
                mode={activeMode}
                onClose={() => setBookingRoute(null)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
