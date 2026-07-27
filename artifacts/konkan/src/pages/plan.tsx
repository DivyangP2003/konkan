import { useEffect, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Clock3,
  Compass,
  GitCompare,
  Hotel,
  Info,
  Lightbulb,
  Map,
  MapPin,
  Minus,
  PenLine,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Train,
  Trash2,
  Utensils,
  Wallet,
  Waves,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AlertBanner } from '@/components/alert-banner';
import {
  planMeta,
  itineraries,
  transportModes,
  accommodationTypes,
  practicalSections,
  type Itinerary,
  type TransportMode,
  type AccommodationType,
  type PracticalSection,
} from '@/data/plan';
import { itineraryHelpers, type SavedItinerary } from '@/lib/itinerary-helpers';
import { useAuthStore } from '@/stores/auth-store';
import { useToast } from '@/hooks/use-toast';

type PlanTab = 'workspace' | 'routes' | 'compare' | 'intelligence' | 'transport' | 'stay' | 'practical';
type TripStyle = 'budget' | 'premium' | 'monsoon' | 'custom';
type Interest = 'heritage' | 'food' | 'water' | 'monsoon' | 'slow';

interface DraftDay {
  day: number;
  title: string;
  activities: string[];
  stay?: string;
}

const colors = {
  ink: '#020d08',
  panel: '#071b11',
  line: '#173b28',
  cream: '#f4ecd8',
  green: '#3a9e6e',
  blue: '#2a8fb5',
  clay: '#c17f3a',
  rust: '#d45f2a',
  wine: '#800020',
};

const interests: { id: Interest; label: string; icon: ReactNode; color: string }[] = [
  { id: 'heritage', label: 'Forts & history', icon: <Compass className="h-3.5 w-3.5" />, color: colors.clay },
  { id: 'food', label: 'Local food', icon: <Utensils className="h-3.5 w-3.5" />, color: colors.rust },
  { id: 'water', label: 'Sea & water', icon: <Waves className="h-3.5 w-3.5" />, color: colors.blue },
  { id: 'monsoon', label: 'Monsoon nature', icon: <MapPin className="h-3.5 w-3.5" />, color: colors.green },
  { id: 'slow', label: 'Slow villages', icon: <Hotel className="h-3.5 w-3.5" />, color: colors.clay },
];

const styleOptions: { id: TripStyle; label: string; description: string; color: string }[] = [
  { id: 'budget', label: 'Essential', description: 'Simple stays, public transport', color: colors.green },
  { id: 'premium', label: 'Considered', description: 'Comfort, flexibility, depth', color: colors.clay },
  { id: 'monsoon', label: 'Monsoon', description: 'Waterfalls, mist, wet earth', color: colors.blue },
  { id: 'custom', label: 'Open brief', description: 'A route shaped around you', color: colors.rust },
];

function currency(value: number) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

function getMatchingRoute(style: TripStyle, selected: Interest[]) {
  if (style === 'monsoon' || selected.includes('monsoon')) return itineraries.find((item) => item.id === 'monsoon-special') ?? itineraries[2];
  if (style === 'premium' || selected.includes('heritage')) return itineraries.find((item) => item.id === 'heritage-tour') ?? itineraries[1];
  return itineraries.find((item) => item.id === 'coastal-getaway') ?? itineraries[0];
}

function toDraftDays(route: Itinerary): DraftDay[] {
  return route.days.map((day, index) => ({
    day: index + 1,
    title: String(day.title),
    activities: day.activities.length ? [...day.activities] : [''],
    stay: day.stay,
  }));
}

function SectionHeading({
  eyebrow,
  title,
  description,
  accent = colors.green,
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 font-sans text-[9px] uppercase tracking-[0.4em]" style={{ color: accent }} data-testid={`text-eyebrow-${eyebrow.toLowerCase().replace(/\s/g, '-')}`}>
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-none text-[#f4ecd8] md:text-5xl">{title}</h2>
      <p className="mt-4 font-sans text-sm leading-relaxed text-[#f4ecd8]/48">{description}</p>
    </div>
  );
}

function RouteCard({
  route,
  selected,
  onSelect,
  onUse,
}: {
  route: Itinerary;
  selected: boolean;
  onSelect: () => void;
  onUse: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout className={`overflow-hidden border transition-colors ${selected ? 'border-[#3a9e6e]' : 'border-[#173b28] hover:border-[#2d6245]'}`} data-testid={`card-route-${route.id}`}>
      <div className="relative aspect-[16/7] overflow-hidden">
        <img src={route.image} alt={route.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 font-sans text-[8px] uppercase tracking-[0.2em]" style={{ color: colors.ink, backgroundColor: route.color }}>{route.badge}</span>
          <span className="border border-[#f4ecd8]/25 bg-[#020d08]/45 px-2.5 py-1 font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/75">{route.duration}</span>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <p className="font-sans text-[8px] uppercase tracking-[0.28em]" style={{ color: route.color }}>{route.subtitle}</p>
          <h3 className="mt-1 font-serif text-3xl leading-none text-[#f4ecd8]">{route.title}</h3>
        </div>
      </div>
      <div className="space-y-5 p-5 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="max-w-xl font-sans text-sm leading-relaxed text-[#f4ecd8]/58">{route.description}</p>
          <div className="shrink-0 text-right">
            <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/32">Guide estimate</p>
            <p className="mt-1 font-serif text-lg" style={{ color: route.color }}>{route.budget.split('|')[0]}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-[#173b28] pt-4">
          <button onClick={onUse} className="flex items-center gap-2 bg-[#3a9e6e] px-4 py-2.5 font-sans text-[9px] uppercase tracking-[0.18em] text-[#020d08] transition-opacity hover:opacity-85" data-testid={`button-use-route-${route.id}`}>
            Use this route <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button onClick={onSelect} className={`flex items-center gap-2 border px-4 py-2.5 font-sans text-[9px] uppercase tracking-[0.18em] transition-colors ${selected ? 'border-[#3a9e6e] text-[#3a9e6e]' : 'border-[#173b28] text-[#f4ecd8]/50 hover:text-[#f4ecd8]'}`} data-testid={`button-compare-route-${route.id}`}>
            {selected ? <Check className="h-3.5 w-3.5" /> : <GitCompare className="h-3.5 w-3.5" />}
            {selected ? 'In comparison' : 'Compare route'}
          </button>
          <button onClick={() => setOpen((value) => !value)} className="ml-auto flex items-center gap-1.5 font-sans text-[9px] uppercase tracking-[0.18em] text-[#f4ecd8]/38 hover:text-[#f4ecd8]" data-testid={`button-expand-route-${route.id}`}>
            {open ? 'Hide days' : 'See days'} {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden border-t border-[#173b28] pt-4">
              {route.days.map((day, index) => (
                <div key={`${route.id}-${index}`} className="grid grid-cols-[34px_1fr] gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border font-serif text-sm" style={{ borderColor: `${route.color}70`, color: route.color }}>{index + 1}</span>
                  <div>
                    <p className="font-serif text-lg text-[#f4ecd8]">{day.title}</p>
                    <p className="mt-1 font-sans text-xs leading-relaxed text-[#f4ecd8]/45">{day.activities.slice(0, 2).join(' · ')}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function BudgetPanel({ days, min, max, accent }: { days: number; min: number; max: number; accent: string }) {
  const totalMin = min * days;
  const totalMax = max * days;
  const mid = (totalMin + totalMax) / 2;
  const parts = [
    { label: 'Stay', value: 0.42, color: colors.clay },
    { label: 'Getting there', value: 0.16, color: colors.blue },
    { label: 'Food', value: 0.23, color: colors.rust },
    { label: 'Experiences', value: 0.12, color: colors.green },
    { label: 'Flex buffer', value: 0.07, color: '#8b9d80' },
  ];
  return (
    <div className="border border-[#173b28] bg-[#071b11]/70 p-5 md:p-7" data-testid="panel-budget">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#f4ecd8]/35">Budget clarity</p>
          <h3 className="mt-2 font-serif text-3xl text-[#f4ecd8]">{currency(totalMin)} <span className="text-[#f4ecd8]/35">—</span> {currency(totalMax)}</h3>
          <p className="mt-1 font-sans text-[10px] text-[#f4ecd8]/38">working range for {days} day{days === 1 ? '' : 's'}, per traveller</p>
        </div>
        <CircleDollarSign className="h-5 w-5" style={{ color: accent }} />
      </div>
      <div className="mt-6 space-y-3">
        {parts.map((part) => (
          <div key={part.label}>
            <div className="mb-1.5 flex justify-between font-sans text-[10px]">
              <span className="text-[#f4ecd8]/55">{part.label}</span>
              <span style={{ color: part.color }}>{currency(mid * part.value)}</span>
            </div>
            <div className="h-1.5 bg-[#173b28]"><div className="h-full" style={{ width: `${part.value * 100}%`, backgroundColor: part.color }} /></div>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-[#173b28] pt-4 font-sans text-[10px] leading-relaxed text-[#f4ecd8]/35">
        A planning range, not a booking quote. Add a little more for peak weekends, ferry tickets, and last-minute room changes.
      </p>
    </div>
  );
}

function IntelligencePanel({ route, days }: { route: Itinerary; days: number }) {
  const tips = [
    { icon: <Clock3 className="h-4 w-4" />, label: 'Route rhythm', text: days > 5 ? 'Keep one unscheduled half-day. Coastal roads reward pauses more than extra check-ins.' : 'Two bases will keep this trip unhurried; avoid changing stays every night.' },
    { icon: <CalendarDays className="h-4 w-4" />, label: 'Booking window', text: route.type === 'monsoon' ? 'Road conditions can change quickly. Confirm transfers and stays 48 hours before departure.' : 'Reserve the first and last night early. Leave village stays flexible when possible.' },
    { icon: <Lightbulb className="h-4 w-4" />, label: 'Local read', text: route.tips[0] ?? 'Carry cash beyond the main market and ask your host before taking a beach road after dark.' },
  ];
  return (
    <div className="border border-[#173b28] bg-[#071b11] p-5 md:p-7" data-testid="panel-intelligence">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center border border-[#c17f3a]/40 text-[#c17f3a]"><Sparkles className="h-4 w-4" /></div>
        <div><p className="font-sans text-[8px] uppercase tracking-[0.27em] text-[#c17f3a]">Trip intelligence</p><p className="font-sans text-xs text-[#f4ecd8]/45">A few things your route should know</p></div>
      </div>
      <div className="space-y-5">
        {tips.map((tip) => (
          <div key={tip.label} className="flex gap-3">
            <span className="mt-0.5 text-[#c17f3a]">{tip.icon}</span>
            <div><p className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#f4ecd8]/60">{tip.label}</p><p className="mt-1 font-sans text-xs leading-relaxed text-[#f4ecd8]/45">{tip.text}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerWorkspace({ initialRoute }: { initialRoute?: Itinerary }) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [title, setTitle] = useState('A considered Konkan journey');
  const [daysCount, setDaysCount] = useState(4);
  const [style, setStyle] = useState<TripStyle>('budget');
  const [budgetMin, setBudgetMin] = useState(1800);
  const [budgetMax, setBudgetMax] = useState(3600);
  const [origin, setOrigin] = useState('Mumbai');
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(['heritage', 'food']);
  const [route, setRoute] = useState<Itinerary>(initialRoute ?? itineraries[0]);
  const [draftDays, setDraftDays] = useState<DraftDay[]>(toDraftDays(initialRoute ?? itineraries[0]));
  const [savedList, setSavedList] = useState<SavedItinerary[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [askingAi, setAskingAi] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (!initialRoute) return;
    setRoute(initialRoute);
    setDaysCount(initialRoute.days.length);
    setStyle(initialRoute.type);
    setDraftDays(toDraftDays(initialRoute));
    setSavedId(null);
  }, [initialRoute]);

  useEffect(() => {
    let cancelled = false;
    if (!user) { setSavedList([]); return () => { cancelled = true; }; }
    itineraryHelpers.list(user.id).then(({ data }) => { if (!cancelled) setSavedList(data ?? []); });
    return () => { cancelled = true; };
  }, [user]);

  const accent = styleOptions.find((item) => item.id === style)?.color ?? colors.green;
  const estimatedDays = Math.max(1, daysCount);
  const visibleDays = draftDays.slice(0, estimatedDays);

  function toggleInterest(id: Interest) {
    setSelectedInterests((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function generatePlan() {
    setGenerating(true);
    window.setTimeout(() => {
      const nextRoute = getMatchingRoute(style, selectedInterests);
      setRoute(nextRoute);
      setDraftDays(toDraftDays(nextRoute).slice(0, estimatedDays));
      if (toDraftDays(nextRoute).length < estimatedDays) {
        setDraftDays((current) => [...current, ...Array.from({ length: estimatedDays - current.length }, (_, index) => ({
          day: current.length + index + 1,
          title: `Day ${current.length + index + 1}`,
          activities: ['Leave space for a local recommendation'],
          stay: '',
        }))]);
      }
      setSavedId(null);
      setGenerating(false);
      toast({ title: 'A route has been drafted', description: `${nextRoute.title} is now ready for your edits.` });
    }, 420);
  }

  async function askKonkanAi() {
    setAskingAi(true);
    setAiError('');
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          days: estimatedDays,
          style,
          interests: selectedInterests,
          budgetMin,
          budgetMax,
          route: route.title,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error ?? 'Konkan AI is unavailable right now.');
      setAiAnswer(payload.answer ?? '');
      toast({ title: 'Konkan AI has a read for your route', description: 'Use the note as a starting point, then shape the days below.' });
    } catch (error) {
      setAiError(error instanceof Error ? error.message : 'Konkan AI is unavailable right now.');
    } finally {
      setAskingAi(false);
    }
  }

  function useRoute(nextRoute: Itinerary) {
    setRoute(nextRoute);
    setStyle(nextRoute.type);
    setDaysCount(nextRoute.days.length);
    setDraftDays(toDraftDays(nextRoute));
    setSavedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({ title: 'Route loaded into your workspace', description: 'Make it yours by editing any day below.' });
  }

  function updateDay(dayIndex: number, changes: Partial<DraftDay>) {
    setDraftDays((current) => current.map((day, index) => index === dayIndex ? { ...day, ...changes } : day));
  }

  function updateActivity(dayIndex: number, activityIndex: number, value: string) {
    const day = draftDays[dayIndex];
    updateDay(dayIndex, { activities: day.activities.map((activity, index) => index === activityIndex ? value : activity) });
  }

  function addDay() {
    const nextDay = draftDays.length + 1;
    setDaysCount(nextDay);
    setDraftDays((current) => [...current, { day: nextDay, title: `Day ${nextDay}`, activities: [''], stay: '' }]);
  }

  function removeDay(index: number) {
    if (draftDays.length === 1) return;
    const nextDays = draftDays.filter((_, dayIndex) => dayIndex !== index).map((day, dayIndex) => ({ ...day, day: dayIndex + 1 }));
    setDraftDays(nextDays);
    setDaysCount(nextDays.length);
  }

  async function savePlan() {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Sign in to keep this plan in your account.' });
      return;
    }
    setSaving(true);
    const payload = {
      title: title.trim() || 'My Konkan journey',
      duration_days: draftDays.length,
      trip_type: style,
      budget_min: budgetMin,
      budget_max: budgetMax,
      destinations: [route.subtitle],
      days: draftDays.map((day) => ({ ...day, activities: day.activities.filter(Boolean) })),
      is_public: false,
    };
    const { data, error } = await itineraryHelpers.save(user.id, payload);
    setSaving(false);
    if (error) {
      toast({ title: 'Could not save this plan', description: (error as { message?: string }).message ?? 'Please try again.' });
      return;
    }
    setSavedId(data?.id ?? 'saved');
    const refreshed = await itineraryHelpers.list(user.id);
    setSavedList(refreshed.data ?? []);
    toast({ title: 'Plan saved', description: 'Your itinerary is ready whenever you are.' });
  }

  async function deleteSaved(id: string) {
    if (!user) return;
    const confirmed = window.confirm('Remove this saved itinerary?');
    if (!confirmed) return;
    const { error } = await itineraryHelpers.delete(id, user.id);
    if (error) { toast({ title: 'Could not remove itinerary', description: 'Please try again.' }); return; }
    setSavedList((current) => current.filter((item) => item.id !== id));
    toast({ title: 'Itinerary removed', description: 'The saved plan is no longer in your list.' });
  }

  function loadSaved(item: SavedItinerary) {
    setTitle(item.title);
    setStyle(item.trip_type);
    setDaysCount(item.duration_days);
    setBudgetMin(item.budget_min ?? 1800);
    setBudgetMax(item.budget_max ?? 3600);
    setDraftDays(item.days.map((day, index) => ({ day: index + 1, title: day.title, activities: day.activities, stay: day.stay })));
    setSavedId(item.id);
    toast({ title: 'Saved itinerary opened', description: 'You can keep refining this version.' });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.5fr]">
        <div className="border border-[#173b28] bg-[#071b11] p-5 md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><p className="font-sans text-[8px] uppercase tracking-[0.3em]" style={{ color: accent }}>Your planning brief</p><h2 className="mt-2 font-serif text-3xl leading-none text-[#f4ecd8]">Start with a feeling.</h2></div>
            <div className="border border-[#3a9e6e]/30 px-2 py-1 font-sans text-[8px] uppercase tracking-[0.14em] text-[#3a9e6e]">Local preview</div>
          </div>
          <p className="mt-4 font-sans text-xs leading-relaxed text-[#f4ecd8]/45">Tell us how you want the coast to unfold. Start with the guide's local routes, then ask Konkan AI for a second opinion on pace, trade-offs, and what to protect in the plan.</p>
          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/38" htmlFor="plan-title">Working title</label>
              <input id="plan-title" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full border border-[#173b28] bg-[#020d08] px-3 py-2.5 font-serif text-lg text-[#f4ecd8] outline-none transition-colors focus:border-[#3a9e6e]" data-testid="input-plan-title" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/38" htmlFor="plan-origin">Starting from</label><input id="plan-origin" value={origin} onChange={(event) => setOrigin(event.target.value)} className="w-full border border-[#173b28] bg-[#020d08] px-3 py-2.5 font-sans text-xs text-[#f4ecd8]/75 outline-none focus:border-[#3a9e6e]" data-testid="input-plan-origin" /></div>
              <div><label className="mb-2 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/38" htmlFor="plan-days">Days</label><div className="flex items-center border border-[#173b28] bg-[#020d08]"><button onClick={() => setDaysCount((value) => Math.max(1, value - 1))} className="px-3 py-2.5 text-[#f4ecd8]/50 hover:text-[#f4ecd8]" data-testid="button-decrease-days"><Minus className="h-3.5 w-3.5" /></button><input id="plan-days" type="number" min={1} max={21} value={daysCount} onChange={(event) => setDaysCount(Math.min(21, Math.max(1, Number(event.target.value) || 1)))} className="w-full bg-transparent text-center font-sans text-xs text-[#f4ecd8] outline-none" data-testid="input-plan-days" /><button onClick={() => setDaysCount((value) => Math.min(21, value + 1))} className="px-3 py-2.5 text-[#f4ecd8]/50 hover:text-[#f4ecd8]" data-testid="button-increase-days"><Plus className="h-3.5 w-3.5" /></button></div></div>
            </div>
            <div><p className="mb-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/38">What should lead?</p><div className="flex flex-wrap gap-2">{interests.map((interest) => { const active = selectedInterests.includes(interest.id); return <button key={interest.id} onClick={() => toggleInterest(interest.id)} className={`flex items-center gap-2 border px-2.5 py-2 font-sans text-[9px] transition-colors ${active ? 'border-[#3a9e6e] bg-[#3a9e6e]/10 text-[#f4ecd8]' : 'border-[#173b28] text-[#f4ecd8]/45 hover:text-[#f4ecd8]'}`} data-testid={`button-interest-${interest.id}`}>{interest.icon}{interest.label}</button>; })}</div></div>
            <div><p className="mb-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/38">Travel posture</p><div className="grid grid-cols-2 gap-2">{styleOptions.map((option) => <button key={option.id} onClick={() => setStyle(option.id)} className={`border p-2.5 text-left transition-colors ${style === option.id ? 'border-[#f4ecd8]/55 bg-[#f4ecd8]/5' : 'border-[#173b28] hover:border-[#2d6245]'}`} data-testid={`button-style-${option.id}`}><span className="block font-sans text-[9px] uppercase tracking-[0.16em]" style={{ color: option.color }}>{option.label}</span><span className="mt-1 block font-sans text-[9px] leading-relaxed text-[#f4ecd8]/35">{option.description}</span></button>)}</div></div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button onClick={generatePlan} disabled={generating} className="flex w-full items-center justify-center gap-2 bg-[#3a9e6e] px-4 py-3 font-sans text-[9px] uppercase tracking-[0.22em] text-[#020d08] transition-opacity hover:opacity-85 disabled:opacity-50" data-testid="button-generate-plan"><Sparkles className={`h-3.5 w-3.5 ${generating ? 'animate-pulse' : ''}`} />{generating ? 'Drafting your route' : 'Draft my route'}<ArrowRight className="h-3.5 w-3.5" /></button>
              <button onClick={askKonkanAi} disabled={askingAi} className="flex w-full items-center justify-center gap-2 border border-[#c17f3a]/50 px-4 py-3 font-sans text-[9px] uppercase tracking-[0.22em] text-[#c17f3a] transition-colors hover:bg-[#c17f3a]/10 disabled:opacity-50" data-testid="button-ask-konkan-ai"><Sparkles className={`h-3.5 w-3.5 ${askingAi ? 'animate-pulse' : ''}`} />{askingAi ? 'Reading your brief' : 'Ask Konkan AI'}</button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="border border-[#173b28] bg-[#071b11] p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#3a9e6e]">Working route</p><h2 className="mt-2 font-serif text-3xl text-[#f4ecd8]" data-testid="text-working-route">{route.title}</h2><p className="mt-1 font-sans text-xs text-[#f4ecd8]/40">{origin} · {route.duration} · {selectedInterests.length} interests in focus</p></div>
              <div className="flex items-center gap-2 border border-[#173b28] px-2.5 py-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/45"><MapPin className="h-3.5 w-3.5 text-[#3a9e6e]" /> Route signal: strong</div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-y border-[#173b28] py-4">
              <div><p className="font-serif text-xl text-[#f4ecd8]">{visibleDays.length}</p><p className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Days shaped</p></div>
              <div><p className="font-serif text-xl text-[#f4ecd8]">{route.days.length}</p><p className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Route days</p></div>
              <div><p className="font-serif text-xl text-[#f4ecd8]">{route.type === 'monsoon' ? 'Wet season' : 'Year-round'}</p><p className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Best read</p></div>
            </div>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-[#f4ecd8]/55">{route.tagline} <span className="text-[#f4ecd8]/32">The route is a starting point, not a script.</span></p>
          </div>
          <BudgetPanel days={visibleDays.length} min={budgetMin} max={budgetMax} accent={accent} />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="border border-[#173b28] bg-[#071b11]/45">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#173b28] p-5 md:p-7"><div><p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#3a9e6e]">Edit the rhythm</p><h3 className="mt-2 font-serif text-3xl text-[#f4ecd8]">Your day-by-day plan</h3></div><button onClick={addDay} className="flex items-center gap-2 border border-[#3a9e6e]/50 px-3 py-2 font-sans text-[9px] uppercase tracking-[0.17em] text-[#3a9e6e] hover:bg-[#3a9e6e]/10" data-testid="button-add-day"><Plus className="h-3.5 w-3.5" /> Add day</button></div>
          <div className="divide-y divide-[#173b28]">
            {visibleDays.map((day, index) => (
              <motion.div layout key={`${day.day}-${index}`} className="p-5 md:p-7">
                <div className="flex items-start gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center border font-serif text-lg" style={{ borderColor: `${accent}80`, color: accent }}>{day.day}</span><div className="min-w-0 flex-1"><input value={day.title} onChange={(event) => updateDay(index, { title: event.target.value })} className="w-full border-b border-transparent bg-transparent font-serif text-xl text-[#f4ecd8] outline-none transition-colors focus:border-[#3a9e6e]" data-testid={`input-day-title-${index + 1}`} /><p className="mt-1 font-sans text-[9px] uppercase tracking-[0.16em] text-[#f4ecd8]/25">Day {day.day} · shape the details</p></div>{visibleDays.length > 1 && <button onClick={() => removeDay(index)} className="text-[#f4ecd8]/25 hover:text-[#d45f2a]" aria-label={`Remove day ${day.day}`} data-testid={`button-remove-day-${index + 1}`}><Trash2 className="h-4 w-4" /></button>}</div>
                <div className="mt-5 space-y-2 pl-0 md:pl-[52px]">{day.activities.map((activity, activityIndex) => <div key={`${index}-${activityIndex}`} className="flex items-center gap-2"><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} /><input value={activity} onChange={(event) => updateActivity(index, activityIndex, event.target.value)} className="w-full border-b border-[#173b28] bg-transparent py-1.5 font-sans text-xs text-[#f4ecd8]/65 outline-none focus:border-[#3a9e6e]" data-testid={`input-activity-${index + 1}-${activityIndex + 1}`} /></div>)}<button onClick={() => updateDay(index, { activities: [...day.activities, ''] })} className="mt-2 flex items-center gap-1.5 font-sans text-[9px] uppercase tracking-[0.16em] text-[#3a9e6e]/70 hover:text-[#3a9e6e]" data-testid={`button-add-activity-${index + 1}`}><Plus className="h-3 w-3" /> Add a detail</button></div>
                <div className="mt-5 border-t border-[#173b28] pt-4 pl-0 md:pl-[52px]"><label className="mb-1.5 block font-sans text-[8px] uppercase tracking-[0.2em] text-[#f4ecd8]/25" htmlFor={`stay-${index}`}>Stay / base</label><input id={`stay-${index}`} value={day.stay ?? ''} onChange={(event) => updateDay(index, { stay: event.target.value })} placeholder="Add a place to sleep or leave open" className="w-full bg-transparent font-sans text-xs text-[#f4ecd8]/55 outline-none placeholder:text-[#f4ecd8]/20" data-testid={`input-stay-${index + 1}`} /></div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#173b28] p-5 md:p-7"><div className="flex items-center gap-2 font-sans text-[10px] text-[#f4ecd8]/35">{savedId ? <><CheckCircle2 className="h-4 w-4 text-[#3a9e6e]" /> Saved to your account</> : <><Info className="h-4 w-4 text-[#c17f3a]" /> Changes stay local until you save</>}</div><button onClick={savePlan} disabled={saving} className="flex items-center gap-2 bg-[#c17f3a] px-5 py-3 font-sans text-[9px] uppercase tracking-[0.2em] text-[#020d08] hover:opacity-85 disabled:opacity-50" data-testid="button-save-plan"><Save className="h-3.5 w-3.5" />{saving ? 'Saving' : user ? 'Save itinerary' : 'Sign in to save'}</button></div>
        </div>
        <div className="space-y-5">
          <IntelligencePanel route={route} days={visibleDays.length} />
           <div className="border border-[#c17f3a]/35 bg-[#c17f3a]/[0.04] p-5 md:p-7" data-testid="panel-konkan-ai">
             <div className="flex items-start justify-between gap-4">
               <div>
                 <p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#c17f3a]">Konkan AI</p>
                 <h3 className="mt-2 font-serif text-2xl text-[#f4ecd8]">A second pair of eyes.</h3>
               </div>
               <Sparkles className="h-5 w-5 text-[#c17f3a]" />
             </div>
             {aiAnswer ? <p className="mt-4 whitespace-pre-line font-sans text-xs leading-relaxed text-[#f4ecd8]/58">{aiAnswer}</p> : <p className="mt-3 font-sans text-xs leading-relaxed text-[#f4ecd8]/40">Ask for a locally aware read on route rhythm, seasonal trade-offs, budget pressure, or the one thing worth leaving unscheduled.</p>}
             {aiError && <p className="mt-4 border-t border-[#c17f3a]/20 pt-3 font-sans text-[10px] leading-relaxed text-[#d45f2a]">{aiError}</p>}
             <button onClick={askKonkanAi} disabled={askingAi} className="mt-5 flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#c17f3a] hover:text-[#f4ecd8] disabled:opacity-50" data-testid="button-ask-konkan-ai-panel">{askingAi ? 'Thinking' : aiAnswer ? 'Ask again' : 'Get a route read'} <ArrowRight className="h-3.5 w-3.5" /></button>
           </div>
          <div className="border border-[#173b28] p-5 md:p-7"><div className="flex items-center justify-between gap-3"><div><p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#f4ecd8]/35">Travellers' note</p><p className="mt-2 font-serif text-2xl text-[#f4ecd8]">Leave room for the coast.</p></div><Waves className="h-5 w-5 text-[#2a8fb5]" /></div><p className="mt-3 font-sans text-xs leading-relaxed text-[#f4ecd8]/43">The most useful Konkan plans have one anchor each day and enough margin for a ferry queue, a market conversation, or a beach that was not on the map.</p></div>
        </div>
      </div>

      {user && <div className="border-t border-[#173b28] pt-8" data-testid="section-saved-itineraries"><div className="mb-4 flex items-center justify-between"><div><p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#f4ecd8]/30">Your shelf</p><h3 className="mt-1 font-serif text-2xl text-[#f4ecd8]">Saved itineraries</h3></div><button onClick={() => itineraryHelpers.list(user.id).then(({ data }) => setSavedList(data ?? []))} className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#3a9e6e] hover:text-[#f4ecd8]" data-testid="button-refresh-saved"><RefreshCw className="h-3.5 w-3.5" /> Refresh</button></div>{savedList.length === 0 ? <div className="border border-dashed border-[#173b28] p-6 font-sans text-xs text-[#f4ecd8]/35">Your saved plans will appear here after you sign in and save one.</div> : <div className="grid gap-3 md:grid-cols-2">{savedList.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 border border-[#173b28] p-4"><button onClick={() => loadSaved(item)} className="text-left" data-testid={`button-open-saved-${item.id}`}><p className="font-serif text-xl text-[#f4ecd8]">{item.title}</p><p className="mt-1 font-sans text-[9px] uppercase tracking-[0.14em] text-[#f4ecd8]/32">{item.duration_days} days · {item.trip_type}</p></button><button onClick={() => deleteSaved(item.id)} className="p-1 text-[#f4ecd8]/25 hover:text-[#d45f2a]" aria-label={`Delete ${item.title}`} data-testid={`button-delete-saved-${item.id}`}><Trash2 className="h-3.5 w-3.5" /></button></div>)}</div>}</div>}
    </div>
  );
}

function CompareRoutes({ onUse }: { onUse: (route: Itinerary) => void }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([itineraries[0].id, itineraries[1].id]);
  const selected = itineraries.filter((route) => selectedIds.includes(route.id));
  function toggle(id: string) { setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current); }
  const rows = [
    { label: 'Shape', values: selected.map((route) => route.duration) },
    { label: 'Route feel', values: selected.map((route) => route.tagline) },
    { label: 'Budget guide', values: selected.map((route) => route.budget.split('|')[0]) },
    { label: 'Best for', values: selected.map((route) => route.type === 'monsoon' ? 'Waterfalls and mist' : route.type === 'premium' ? 'History with depth' : 'A clean long weekend') },
  ];
  return <div><SectionHeading eyebrow="Make the trade-off visible" title="Compare routes before you commit." description="Select up to three curated routes and compare the time, texture, and budget they ask of you. When one feels right, bring it into the workspace." accent={colors.blue} /><div className="mb-6 flex flex-wrap gap-2">{itineraries.map((route) => <button key={route.id} onClick={() => toggle(route.id)} className={`flex items-center gap-2 border px-3 py-2 font-sans text-[9px] uppercase tracking-[0.16em] ${selectedIds.includes(route.id) ? 'border-[#2a8fb5] text-[#2a8fb5]' : 'border-[#173b28] text-[#f4ecd8]/40 hover:text-[#f4ecd8]'}`} data-testid={`button-select-compare-${route.id}`}>{selectedIds.includes(route.id) ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}{route.title}</button>)}</div><div className="overflow-x-auto border border-[#173b28]"><div className="min-w-[720px]">{rows.map((row) => <div key={row.label} className="grid border-b border-[#173b28] last:border-0" style={{ gridTemplateColumns: `150px repeat(${Math.max(selected.length, 1)}, minmax(190px, 1fr))` }}><div className="p-5 font-sans text-[9px] uppercase tracking-[0.18em] text-[#f4ecd8]/30">{row.label}</div>{row.values.map((value, index) => <div key={`${row.label}-${index}`} className="border-l border-[#173b28] p-5 font-sans text-xs leading-relaxed text-[#f4ecd8]/62">{value}</div>)}</div>)}<div className="grid" style={{ gridTemplateColumns: `150px repeat(${Math.max(selected.length, 1)}, minmax(190px, 1fr))` }}><div className="p-5" />{selected.map((route) => <div key={route.id} className="border-l border-[#173b28] p-5"><button onClick={() => onUse(route)} className="flex items-center gap-2 bg-[#2a8fb5] px-3 py-2 font-sans text-[8px] uppercase tracking-[0.15em] text-[#020d08] hover:opacity-85" data-testid={`button-use-compare-${route.id}`}>Use route <ArrowRight className="h-3.5 w-3.5" /></button></div>)}</div></div></div></div>;
}

function InfoCard({ item, index, type }: { item: TransportMode | AccommodationType | PracticalSection; index: number; type: 'transport' | 'stay' | 'practical' }) {
  const [open, setOpen] = useState(false);
  const color = type === 'transport' ? (item as TransportMode).color : type === 'stay' ? (item as AccommodationType).color : (item as PracticalSection).color;
  const title = item.title;
  const subtitle = item.subtitle;
  const description = type === 'transport'
    ? (item as TransportMode).description
    : type === 'stay'
      ? (item as AccommodationType).description
      : (item as PracticalSection).subtitle;
  const details = type === 'transport' ? (item as TransportMode).details : type === 'stay' ? (item as AccommodationType).options.map((option) => ({ heading: option.name, content: `${option.location}. ${option.highlight} · ${option.priceRange}` })) : (item as PracticalSection).items;
  return <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="border border-[#173b28] bg-[#071b11]/55 p-5 md:p-7" data-testid={`card-info-${type}-${item.id}`}><div className="flex items-start justify-between gap-4"><div><p className="font-sans text-[8px] uppercase tracking-[0.25em]" style={{ color }}>{subtitle}</p><h3 className="mt-2 font-serif text-3xl leading-none text-[#f4ecd8]">{title}</h3></div><div className="flex h-9 w-9 shrink-0 items-center justify-center border" style={{ borderColor: `${color}50`, color }}><Info className="h-4 w-4" /></div></div><p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-[#f4ecd8]/52">{description}</p><button onClick={() => setOpen((value) => !value)} className="mt-5 flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em]" style={{ color }} data-testid={`button-expand-info-${type}-${item.id}`}>{open ? 'Hide field notes' : 'Open field notes'}{open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}</button><AnimatePresence initial={false}>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-5 space-y-4 overflow-hidden border-t border-[#173b28] pt-5">{details.map((detail) => <div key={detail.heading}><p className="font-sans text-[9px] uppercase tracking-[0.18em]" style={{ color }}>{detail.heading}</p><p className="mt-1 font-sans text-xs leading-relaxed text-[#f4ecd8]/48">{detail.content}</p></div>)}</motion.div>}</AnimatePresence></motion.article>;
}

function IntelligencePage() {
  const route = itineraries[1];
  const insights = [
    { title: 'Plan around daylight', text: 'Fort boats, waterfalls, and village roads have their own clocks. Keep the most time-sensitive stop before lunch.', icon: <Clock3 /> },
    { title: 'Mix a spine with a detour', text: 'Use Konkan Railway or NH66 for the long transfer, then spend your attention on one local road each day.', icon: <GitCompare /> },
    { title: 'Keep cash in the plan', text: 'The main towns have ATMs, but beach areas and remote ghats can lose both signal and access. Carry a modest reserve.', icon: <Wallet /> },
    { title: 'Monsoon is a different trip', text: 'Swimming and some boat crossings are not substitutes for a rainy-season plan. Shift the focus to waterfalls, food, and forest edges.', icon: <AlertTriangle /> },
  ];
  return <div><SectionHeading eyebrow="The useful layer" title="Trip intelligence, without the noise." description="A planning workspace should not only show places. It should explain the decisions between them: when to move, where to leave margin, and what the coast will ask you to carry." accent={colors.clay} /><div className="grid gap-4 md:grid-cols-2">{insights.map((insight, index) => <motion.div key={insight.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="border border-[#173b28] p-6"><div className="mb-5 flex h-9 w-9 items-center justify-center border border-[#c17f3a]/35 text-[#c17f3a]">{insight.icon}</div><h3 className="font-serif text-2xl text-[#f4ecd8]">{insight.title}</h3><p className="mt-2 font-sans text-sm leading-relaxed text-[#f4ecd8]/48">{insight.text}</p></motion.div>)}</div><div className="mt-5 grid gap-5 lg:grid-cols-2"><BudgetPanel days={route.days.length} min={1800} max={3600} accent={colors.clay} /><div className="border border-[#173b28] p-6"><p className="font-sans text-[8px] uppercase tracking-[0.28em] text-[#3a9e6e]">A field note from this route</p><p className="mt-3 font-serif text-3xl text-[#f4ecd8]">{route.tips[1]}</p><p className="mt-4 font-sans text-xs leading-relaxed text-[#f4ecd8]/40">These are guide notes, not live availability or safety alerts. Confirm conditions locally before you set out.</p></div></div></div>;
}

export default function PlanPage() {
  const [activeTab, setActiveTab] = useState<PlanTab>('workspace');
  const [compareSelection, setCompareSelection] = useState<string[]>([itineraries[0].id, itineraries[1].id]);
  const [workspaceRoute, setWorkspaceRoute] = useState<Itinerary | undefined>(undefined);
  const tabs: { id: PlanTab; label: string; icon: ReactNode }[] = [
    { id: 'workspace', label: 'Plan workspace', icon: <PenLine className="h-4 w-4" /> },
    { id: 'routes', label: 'Curated routes', icon: <Map className="h-4 w-4" /> },
    { id: 'compare', label: 'Compare', icon: <GitCompare className="h-4 w-4" /> },
    { id: 'intelligence', label: 'Trip intelligence', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'transport', label: 'Transport', icon: <Train className="h-4 w-4" /> },
    { id: 'stay', label: 'Where to sleep', icon: <Hotel className="h-4 w-4" /> },
    { id: 'practical', label: 'Field notes', icon: <Info className="h-4 w-4" /> },
  ];
  const useRouteFromTab = (route: Itinerary) => {
    setWorkspaceRoute(route);
    setActiveTab('workspace');
    window.setTimeout(() => window.scrollTo({ top: 320, behavior: 'smooth' }), 40);
  };
  return (
    <div className="min-h-screen bg-[#020d08] text-[#f4ecd8] selection:bg-[#3a9e6e]/30">
      <AlertBanner />
      <Navbar />
      <section className="relative overflow-hidden border-b border-[#173b28] pt-28">
        <div className="absolute inset-0 opacity-25"><img src={planMeta.hero.image} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#020d08] via-[#020d08]/90 to-[#020d08]" /></div>
        <div className="relative mx-auto max-w-[1500px] px-5 pb-10 md:px-10 md:pb-14 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-4xl"><p className="font-sans text-[9px] uppercase tracking-[0.45em] text-[#3a9e6e]">The Konkan planning room</p><h1 className="mt-4 font-serif text-5xl leading-[0.88] text-[#f4ecd8] md:text-7xl">Make a plan<br /><em className="text-[#3a9e6e]">with some tide in it.</em></h1><p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#f4ecd8]/52">A confident starting point for a deeply local journey. Shape the route, see the trade-offs, and leave enough room for the coast to surprise you.</p></div>
            <div className="grid w-full max-w-md grid-cols-3 border border-[#173b28] bg-[#071b11]/70"><div className="p-3 md:p-4"><p className="font-serif text-xl text-[#3a9e6e]">3–7</p><p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Good days</p></div><div className="border-l border-[#173b28] p-3 md:p-4"><p className="font-serif text-xl text-[#c17f3a]">₹3k</p><p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Mid-range / day</p></div><div className="border-l border-[#173b28] p-3 md:p-4"><p className="font-serif text-xl text-[#2a8fb5]">720</p><p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">Coastal km</p></div></div>
          </div>
          <div className="mt-10 flex gap-1 overflow-x-auto border-b border-[#173b28] pb-px">{tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 font-sans text-[9px] uppercase tracking-[0.18em] transition-colors ${activeTab === tab.id ? 'border-[#3a9e6e] text-[#f4ecd8]' : 'border-transparent text-[#f4ecd8]/38 hover:text-[#f4ecd8]'}`} data-testid={`button-tab-${tab.id}`}>{tab.icon}{tab.label}</button>)}</div>
        </div>
      </section>
      <main className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 md:py-16 lg:px-16">
        <AnimatePresence mode="wait">
          {activeTab === 'workspace' && <motion.div key="workspace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><SectionHeading eyebrow="Build, compare, adjust" title="Your trip, in working order." description="Start with a route signal, then make the small decisions that turn a generic holiday into your Konkan journey." /><PlannerWorkspace initialRoute={workspaceRoute} /></motion.div>}
          {activeTab === 'routes' && <motion.div key="routes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><SectionHeading eyebrow="Curated routes" title="Three ways into the coast." description="These are not package tours. They are tested rhythms: a clean long weekend, a full heritage run, and a rainy-season route through the green interior." /> <div className="space-y-8">{itineraries.map((route) => <RouteCard key={route.id} route={route} selected={compareSelection.includes(route.id)} onSelect={() => setCompareSelection((current) => current.includes(route.id) ? current.filter((id) => id !== route.id) : current.length < 3 ? [...current, route.id] : current)} onUse={() => useRouteFromTab(route)} />)}</div></motion.div>}
          {activeTab === 'compare' && <motion.div key="compare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><CompareRoutes onUse={(route) => useRouteFromTab(route)} /></motion.div>}
          {activeTab === 'intelligence' && <motion.div key="intelligence" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><IntelligencePage /></motion.div>}
          {activeTab === 'transport' && <motion.div key="transport" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><SectionHeading eyebrow="Getting there and around" title="Choose the right kind of movement." description="Train for the long view, road for the hidden turn, boat for the forts and creeks. The best Konkan itineraries mix all three." accent={colors.clay} /><div className="space-y-5">{transportModes.map((item, index) => <InfoCard key={item.id} item={item} index={index} type="transport" />)}</div></motion.div>}
          {activeTab === 'stay' && <motion.div key="stay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><SectionHeading eyebrow="Where to sleep" title="Let the base shape the day." description="A homestay, a beach resort, and a tent each reveal a different Konkan. Pick the kind of morning you want before you pick the room." accent={colors.blue} /><div className="space-y-5">{accommodationTypes.map((item, index) => <InfoCard key={item.id} item={item} index={index} type="stay" />)}</div></motion.div>}
          {activeTab === 'practical' && <motion.div key="practical" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><SectionHeading eyebrow="Field notes" title="The details that keep a good trip good." description="Permits, safety, signal, cash, and the small constraints worth knowing before you leave the main road." accent={colors.rust} /><div className="grid gap-5 lg:grid-cols-3">{practicalSections.map((item, index) => <InfoCard key={item.id} item={item} index={index} type="practical" />)}</div><div className="mt-8 border border-[#d45f2a]/35 p-6"><div className="flex items-center gap-3 text-[#d45f2a]"><AlertTriangle className="h-4 w-4" /><p className="font-sans text-[9px] uppercase tracking-[0.25em]">Emergency numbers</p></div><div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">{[{ label: 'Police', value: '100' }, { label: 'Ambulance', value: '108' }, { label: 'Coast Guard', value: '1554' }, { label: 'Tourist helpline', value: '1800-111-363' }].map((item) => <div key={item.label}><p className="font-serif text-2xl text-[#f4ecd8]">{item.value}</p><p className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#f4ecd8]/35">{item.label}</p></div>)}</div></div></motion.div>}
        </AnimatePresence>
      </main>
      <section className="mx-auto max-w-[1500px] px-5 pb-16 md:px-10 lg:px-16"><div className="border-t border-[#173b28] pt-10"><div className="mb-6 flex items-center justify-between"><p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#f4ecd8]/30">Keep exploring</p><Link href="/map" className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#3a9e6e] hover:text-[#f4ecd8]" data-testid="link-plan-map">Open the map <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="grid gap-1 md:grid-cols-3">{[{ href: '/adventure', label: 'Adventures', img: '/assets/water-sports.jpg' }, { href: '/stay', label: 'Where to stay', img: '/assets/homestays.jpg' }, { href: '/food', label: 'Food guide', img: '/assets/konkani-thali.jpg' }].map((item) => <Link key={item.href} href={item.href} className="group relative block aspect-[16/6] overflow-hidden" data-testid={`link-continue-${item.label.toLowerCase().replace(/\s/g, '-')}`}><img src={item.img} alt={item.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-[#020d08]/60 transition-colors group-hover:bg-[#020d08]/35" /><span className="absolute inset-0 flex items-center justify-center font-serif text-2xl text-[#f4ecd8]">{item.label}<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>
      <Footer />
    </div>
  );
}