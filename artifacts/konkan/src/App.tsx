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
import './lib/i18n';
import DestinationsPage from './pages/destinations';


const queryClient = new QueryClient();



function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/realm/:id" component={RealmPage} />
      <Route path="/place/:id" component={PlacePage} />
      <Route path="/destinations" component={DestinationsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { initialize, initialized } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);
  
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
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
