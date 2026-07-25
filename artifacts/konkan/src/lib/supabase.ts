import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Auth ────────────────────────────────────────────────────────────────────
export const authHelpers = {
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    return { data, error };
  },
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
  onAuthStateChange: (callback: (user: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  },
};

// ── Wishlist ────────────────────────────────────────────────────────────────
export type WishlistItemType = 'destination' | 'stay' | 'food' | 'activity';

export interface WishlistRow {
  id: string;
  user_id: string;
  item_type: WishlistItemType;
  item_id: string;
  item_name: string;
  item_image: string | null;
  created_at: string;
}

const WISHLIST_TABLE = 'wishlists';

export const wishlistHelpers = {
  list: async (userId: string) => {
    const { data, error } = await supabase
      .from(WISHLIST_TABLE)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return { data: null, error };

    const normalised = (data as WishlistRow[] | null)?.map((r) => ({
      itemType: r.item_type,
      itemId: r.item_id,
      itemName: r.item_name,
      itemImage: r.item_image,
      createdAt: r.created_at,
    }));
    return { data: normalised, error: null };
  },

  add: async (
    userId: string,
    itemType: WishlistItemType,
    itemId: string,
    itemName: string,
    itemImage?: string
  ) => {
    const { error } = await supabase
      .from(WISHLIST_TABLE)
      .upsert(
        {
          user_id: userId,
          item_type: itemType,
          item_id: itemId,
          item_name: itemName,
          item_image: itemImage || null,
        },
        { onConflict: 'user_id,item_type,item_id' }
      );
    return { error };
  },

  remove: async (userId: string, itemType: WishlistItemType, itemId: string) => {
    const { error } = await supabase
      .from(WISHLIST_TABLE)
      .delete()
      .match({ user_id: userId, item_type: itemType, item_id: itemId });
    return { error };
  },
};
