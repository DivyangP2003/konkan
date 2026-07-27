// Supabase helpers for saved itineraries
import { supabase } from './supabase';

export interface SavedItinerary {
  id: string;
  user_id: string;
  title: string;
  duration_days: number;
  trip_type: 'budget' | 'premium' | 'monsoon' | 'custom';
  budget_min?: number;
  budget_max?: number;
  destinations: string[];
  days: ItineraryDay[];
  notes?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  stay?: string;
  destination?: string;
}

export const itineraryHelpers = {
  list: async (userId: string) => {
    if (!supabase) return { data: [], error: null };
    const { data, error } = await supabase
      .from('saved_itineraries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data: (data ?? []) as SavedItinerary[], error };
  },

  save: async (
    userId: string,
    itinerary: Omit<SavedItinerary, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
  ) => {
    if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase
      .from('saved_itineraries')
      .insert({ ...itinerary, user_id: userId })
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, userId: string, updates: Partial<SavedItinerary>) => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { error } = await supabase
      .from('saved_itineraries')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .match({ id, user_id: userId });
    return { error };
  },

  delete: async (id: string, userId: string) => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { error } = await supabase
      .from('saved_itineraries')
      .delete()
      .match({ id, user_id: userId });
    return { error };
  },
};
