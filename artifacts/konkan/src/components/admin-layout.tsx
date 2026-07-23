import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuthStore } from '../stores/auth-store';
import {
  Home,
  MapPin,
  Hotel,
  UtensilsCrossed,
  Activity,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Accommodations', href: '/admin/accommodations', icon: Hotel },
  { name: 'Restaurants', href: '/admin/restaurants', icon: UtensilsCrossed },
  { name: 'Activities', href: '/admin/activities', icon: Activity },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

function Sidebar() {
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Konkan Admin</h2>
        <p className="text-sm text-muted-foreground">Content Management</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAuthStore();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium">{user.name || user.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-card h-[calc(100vh-57px)] sticky top-[57px]">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}