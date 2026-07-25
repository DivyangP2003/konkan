import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWishlistStore, type WishlistItemType } from '@/stores/wishlist-store';
import { useAuthStore } from '@/stores/auth-store';

interface SaveButtonProps {
  itemType: WishlistItemType;
  itemId: string;
  itemName: string;
  itemImage?: string;
  onAuthRequired?: () => void;
  className?: string;
}

export function SaveButton({
  itemType, itemId, itemName, itemImage, onAuthRequired, className,
}: SaveButtonProps) {
  const user = useAuthStore((s) => s.user);
  const saved = useWishlistStore((s) => s.isSaved(itemType, itemId));
  const toggle = useWishlistStore((s) => s.toggle);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      onAuthRequired?.();
      return;
    }
    toggle(itemType, itemId, itemName, itemImage);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? `Remove ${itemName} from wishlist` : `Save ${itemName} to wishlist`}
      aria-pressed={saved}
      className={cn(
        'p-2 rounded-full backdrop-blur-sm border transition-all duration-300',
        saved
          ? 'bg-[#c17f3a]/30 border-[#c17f3a]/60 hover:bg-[#c17f3a]/45'
          : 'bg-black/40 border-white/10 hover:bg-black/60 hover:border-white/30',
        className
      )}
    >
      <Heart
        className={cn(
          'w-4 h-4 transition-all',
          saved ? 'fill-[#c17f3a] text-[#c17f3a]' : 'text-white/85'
        )}
      />
    </button>
  );
}
