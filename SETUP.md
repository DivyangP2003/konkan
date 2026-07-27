# Konkan Platform — Supabase Setup Guide

This is a one-time setup. After this, deployments are automatic.

## 1. Get your Supabase credentials

- In Supabase Dashboard → Project Settings → API, copy:
  - `URL` → set as `VITE_SUPABASE_URL`
  - `anon public` key → set as `VITE_SUPABASE_ANON`

## 2. Run the database migration

Go to **Supabase Dashboard → SQL Editor** and create a **New query**. Then paste the entire contents of:

```
supabase/migrations/001_features.sql
```

Click **Run**. This creates:
- `bookings`
- `saved_itineraries`
- `local_businesses`
- `business_reviews`
- `wishlists`

## 3. Set environment variables in Vercel

In Vercel Dashboard → Project → Settings → Environment Variables, add:

| Variable | Value | Environments |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON` | `your-anon-public-key` | Production, Preview, Development |

## 4. Redeploy

After adding the environment variables and running the migration, redeploy the project in Vercel.

## 5. Test

- Sign up / sign in on the site.
- Go to `/plan` → **Build My Trip** tab.
- Create an itinerary and click **Save Itinerary**. It should save successfully.
- Check `/businesses` and submit a test listing.
- Go to `/booking` and submit a test booking enquiry.

If you see an error like `Could not find the table 'public.saved_itineraries' in the schema cache`, it means the migration in step 2 hasn't been run yet.

## Optional: Enable email confirmations

Supabase Auth is set up with email confirmation. For local testing, you can disable email confirmation in **Supabase Dashboard → Authentication → Providers → Email**. For production, keep it enabled.
