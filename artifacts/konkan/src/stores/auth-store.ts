import { create } from 'zustand';
import { authHelpers } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  setUser: (user) => set({ user }),

  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await authHelpers.signIn(email, password);
    
    if (!error && data.user) {
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar,
          role: data.user.user_metadata?.role || 'user',
        },
        loading: false,
      });
    } else {
      set({ loading: false });
    }
    
    return { error };
  },

  signUp: async (email, password, name) => {
    set({ loading: true });
    const { data, error } = await authHelpers.signUp(email, password, name);
    
    if (!error && data.user) {
      set({ 
        user: {
          id: data.user.id,
          email: data.user.email!,
          name,
          role: 'user',
        },
        loading: false,
      });
    } else {
      set({ loading: false });
    }
    
    return { error };
  },

  signOut: async () => {
    set({ loading: true });
    await authHelpers.signOut();
    set({ user: null, loading: false });
  },

  initialize: async () => {
    const { user } = await authHelpers.getCurrentUser();
    
    if (user) {
      set({ 
        user: {
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name,
          avatar: user.user_metadata?.avatar,
          role: user.user_metadata?.role || 'user',
        },
        initialized: true,
      });
    } else {
      set({ initialized: true });
    }

    // Listen for auth changes
    authHelpers.onAuthStateChange((user) => {
      if (user) {
        set({ 
          user: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name,
            avatar: user.user_metadata?.avatar,
            role: user.user_metadata?.role || 'user',
          },
        });
      } else {
        set({ user: null });
      }
    });
  },
}));
