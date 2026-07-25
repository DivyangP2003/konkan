-- Konkan Tourism: Wishlist table for saved destinations/stays/food/activities
-- Run this in the Supabase SQL Editor (https://app.supabase.com → SQL Editor)

create table if not exists public.wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  item_type text not null check (item_type in ('destination', 'stay', 'food', 'activity')),
  item_id text not null,
  item_name text not null,
  item_image text,
  created_at timestamptz default now() not null,
  unique (user_id, item_type, item_id)
);

create index if not exists wishlists_user_id_idx on public.wishlists (user_id);
create index if not exists wishlists_lookup_idx on public.wishlists (user_id, item_type, created_at desc);

alter table public.wishlists enable row level security;

drop policy if exists "Users manage own wishlist" on public.wishlists;
create policy "Users manage own wishlist" on public.wishlists
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
