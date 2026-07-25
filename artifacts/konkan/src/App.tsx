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

  // Keep wishlist in sync with auth state
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
