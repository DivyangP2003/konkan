import { Heart, LogOut, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useState } from 'react';
import { useLocation } from 'wouter';

interface UserMenuProps {
  onSignInClick: () => void;
}

export function UserMenu({ onSignInClick }: UserMenuProps) {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [, navigate] = useLocation();
  const [signingOut, setSigningOut] = useState(false);

  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onSignInClick}
        className={cn(
          'gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
          'text-[#f4ecd8]/85 hover:text-[#f4ecd8]',
          'border border-[#f4ecd8]/15 hover:border-[#f4ecd8]/35 hover:bg-transparent'
        )}
      >
        Sign in
      </Button>
    );
  }

  const initial = (user.name || user.email || '?').trim().charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Account menu"
          className={cn(
            'flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full border transition-all',
            'border-[#f4ecd8]/15 hover:border-[#f4ecd8]/35 bg-transparent hover:bg-[#f4ecd8]/5'
          )}
        >
          <span className="w-7 h-7 rounded-full bg-[#3a9e6e] text-[#f4ecd8] flex items-center justify-center text-sm font-medium">
            {initial}
          </span>
          <span className="hidden sm:inline text-sm text-[#f4ecd8]/85 max-w-[140px] truncate">
            {user.name || user.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#020d08] border-[#0d2d1e] text-[#f4ecd8] min-w-[240px]">
        <div className="px-3 py-2.5 border-b border-[#0d2d1e]">
          <p className="text-sm font-medium text-[#f4ecd8] truncate">{user.name || 'Traveler'}</p>
          <p className="text-xs text-[#f4ecd8]/55 truncate">{user.email}</p>
        </div>
        <DropdownMenuItem
          onClick={() => navigate('/wishlist')}
          className="cursor-pointer focus:bg-[#0d2d1e]/60 focus:text-[#f4ecd8]"
        >
          <Heart className="w-4 h-4 mr-2 text-[#c17f3a]" />
          My wishlist
          <span className="ml-auto text-xs text-[#f4ecd8]/55 tabular-nums">{wishlistCount}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#0d2d1e]" />
        <DropdownMenuItem
          disabled={signingOut}
          onClick={async () => {
            setSigningOut(true);
            await signOut();
            setSigningOut(false);
          }}
          className="cursor-pointer focus:bg-[#0d2d1e]/60 focus:text-[#f4ecd8]"
        >
          {signingOut
            ? <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            : <LogOut className="w-4 h-4 mr-2" />}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
