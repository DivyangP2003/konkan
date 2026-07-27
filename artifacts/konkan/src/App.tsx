import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import RealmPage from '@/pages/realm';
import ExplorePage from '@/pages/explore';
import PlacePage from '@/pages/place';
import { CustomCursor } from '@/components/custom-cursor';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth-store';
import { useWishlistStore } from './stores/wishlist-store';
import DestinationsPage from './pages/destinations';
import StayPage from './pages/stay';
import FoodPage from './pages/food';
import ActivitiesPage from './pages/activities';
import AdminDashboard from './pages/admin/dashboard';
import WishlistPage from './pages/wishlist';
import CulturePage from './pages/culture';
import HeritagePage from './pages/heritage';
import SpiritualPage from './pages/spiritual';
import AdventurePage from './pages/adventure';
import PlanPage from './pages/plan';
import StoriesPage from './pages/stories';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import SeasonalPage from './pages/seasonal';
import BookingPage from './pages/booking';
import BusinessesPage from './pages/businesses';
import MapPage from './pages/map';
import SearchPage from './pages/search';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/realm/:id" component={RealmPage} />
      <Route path="/place/:id" component={PlacePage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route path="/stay" component={StayPage} />
      <Route path="/food" component={FoodPage} />
      <Route path="/activities" component={ActivitiesPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/admin" component={AdminDashboard} />
      {/* Phase 2 — Culture, Heritage & Spiritual */}
      <Route path="/culture" component={CulturePage} />
      <Route path="/heritage" component={HeritagePage} />
      <Route path="/spiritual" component={SpiritualPage} />
      {/* Phase 3 — Adventure & Plan Your Trip */}
      <Route path="/adventure" component={AdventurePage} />
      <Route path="/plan" component={PlanPage} />
      {/* Phase 4 — Stories, Community & Contact */}
      <Route path="/stories" component={StoriesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      {/* Phase 5 — Seasonal Guides & Home Enhancement */}
      <Route path="/seasonal" component={SeasonalPage} />
      {/* Phase 6 — Booking, Businesses & Smart Search */}
      <Route path="/booking" component={BookingPage} />
      <Route path="/businesses" component={BusinessesPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/search" component={SearchPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { initialize, initialized, user } = useAuthStore();
  const loadWishlist = useWishlistStore((s) => s.loadForUser);
  const clearWishlist = useWishlistStore((s) => s.clear);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (user) loadWishlist(user.id);
    else clearWishlist();
  }, [user, loadWishlist, clearWishlist]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020d08]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a9e6e] mx-auto mb-4" />
          <p className="text-[#f4ecd8]/60 text-sm tracking-[0.3em] uppercase">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
        <CustomCursor />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
