import { create } from 'zustand';
import { wishlistHelpers } from '@/lib/supabase';
import { useAuthStore } from './auth-store';

export type WishlistItemType = 'destination' | 'stay' | 'food' | 'activity';

export interface WishlistItem {
  itemType: WishlistItemType;
  itemId: string;
  itemName: string;
  itemImage: string | null;
  createdAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  ready: boolean;
  loadForUser: (userId: string) => Promise<void>;
  clear: () => void;
  isSaved: (itemType: WishlistItemType, itemId: string) => boolean;
  toggle: (
    itemType: WishlistItemType,
    itemId: string,
    itemName: string,
    itemImage?: string
  ) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  loading: false,
  ready: false,

  loadForUser: async (userId) => {
    set({ loading: true });
    const { data, error } = await wishlistHelpers.list(userId);
    if (!error && data) {
      set({ items: data, ready: true, loading: false });
    } else {
      set({ ready: true, loading: false });
    }
  },

  clear: () => set({ items: [], ready: false }),

  isSaved: (itemType, itemId) =>
    get().items.some((i) => i.itemType === itemType && i.itemId === itemId),

  toggle: async (itemType, itemId, itemName, itemImage) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const wasSaved = get().items.some(
      (i) => i.itemType === itemType && i.itemId === itemId
    );

    if (wasSaved) {
      const snapshot = get().items;
      set({
        items: snapshot.filter(
          (i) => !(i.itemType === itemType && i.itemId === itemId)
        ),
      });
      const { error } = await wishlistHelpers.remove(user.id, itemType, itemId);
      if (error) set({ items: snapshot });
    } else {
      const snapshot = get().items;
      const newItem: WishlistItem = {
        itemType,
        itemId,
        itemName,
        itemImage: itemImage ?? null,
        createdAt: new Date().toISOString(),
      };
      set({ items: [newItem, ...snapshot] });
      const { error } = await wishlistHelpers.add(
        user.id,
        itemType,
        itemId,
        itemName,
        itemImage
      );
      if (error) set({ items: snapshot });
    }
  },
}));
