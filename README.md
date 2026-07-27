# Konkan Tourism Platform

A multi-featured React + Vite tourism website for the Konkan coast of Maharashtra, India.

## Quick Start

```bash
pnpm install
pnpm --filter @workspace/konkan run dev
```

## Required Supabase Setup

Before saved itineraries, bookings, business submissions, and wishlists will work, **run the migration in your Supabase SQL Editor**:

```sql
-- Open supabase/migrations/001_features.sql in this repo and run it entirely in
-- Supabase Dashboard → SQL Editor → New query → paste → Run
```

This creates the following tables:
- `bookings` — transport booking enquiries
- `saved_itineraries` — user-built custom itineraries
- `local_businesses` — local business listings (with admin approval flag)
- `business_reviews` — community reviews
- `wishlists` — saved destinations/stays/food/activities

Also configure these environment variables in Vercel / Supabase:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON=your-anon-public-key
```

## Features

- `/` — Landing page with realms, hero, map, and stories
- `/destinations` — Filterable destination explorer
- `/plan` — Curated itineraries, transport info, accommodation, and **custom itinerary builder**
- `/booking` — Multi-modal transport booking (train, bus, ferry, cab) with enquiry form
- `/businesses` — Local business directory with submission form
- Smart search overlay (`⌘K` / `Ctrl+K`)
- Live weather widget (Open-Meteo, free, no API key)
- Seasonal alert banners

## Deploy

Push to GitHub and deploy with Vercel. The build command is:

```bash
pnpm --filter @workspace/konkan run build
```

## Tech Stack

React 18, Vite, Wouter, Framer Motion, Tailwind CSS, Zustand, Supabase, Recharts, Lucide icons.
