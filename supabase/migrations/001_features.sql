-- ═══════════════════════════════════════════════════════════════════════════
-- Konkan: Feature Tables Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Bookings ────────────────────────────────────────────────────────────
-- Stores transport booking requests (train, bus, ferry, cab)
CREATE TABLE IF NOT EXISTS bookings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Transport details
  mode         TEXT NOT NULL CHECK (mode IN ('train', 'bus', 'ferry', 'cab')),
  route_id     TEXT,             -- matches id in transport.ts
  route_name   TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location  TEXT NOT NULL,

  -- Journey details
  travel_date  DATE NOT NULL,
  num_passengers INTEGER NOT NULL DEFAULT 1,
  seat_class   TEXT,             -- sleeper, 2ac, 3ac, chair etc.

  -- Passenger info
  passenger_name TEXT NOT NULL,
  passenger_email TEXT NOT NULL,
  passenger_phone TEXT,

  -- Status
  status       TEXT NOT NULL DEFAULT 'enquiry' CHECK (status IN ('enquiry', 'confirmed', 'cancelled')),
  notes        TEXT,

  -- External booking reference (if user went to IRCTC/Redbus etc.)
  external_ref TEXT,

  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- ── 2. Saved Itineraries ───────────────────────────────────────────────────
-- User-built custom itineraries
CREATE TABLE IF NOT EXISTS saved_itineraries (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  title        TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  trip_type    TEXT CHECK (trip_type IN ('budget', 'premium', 'monsoon', 'custom')),
  budget_min   INTEGER,          -- INR
  budget_max   INTEGER,          -- INR

  -- Array of destination IDs (order matters)
  destinations JSONB NOT NULL DEFAULT '[]',

  -- Days array: [{day, title, activities: [], stay}]
  days         JSONB NOT NULL DEFAULT '[]',

  -- Misc
  notes        TEXT,
  is_public    BOOLEAN NOT NULL DEFAULT FALSE,

  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE saved_itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own itineraries" ON saved_itineraries
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users create itineraries" ON saved_itineraries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own itineraries" ON saved_itineraries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete own itineraries" ON saved_itineraries
  FOR DELETE USING (auth.uid() = user_id);

-- ── 3. Local Businesses ────────────────────────────────────────────────────
-- Local business listings (can be user-submitted or admin-added)
CREATE TABLE IF NOT EXISTS local_businesses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name          TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
                  'homestay', 'guide', 'eatery', 'artisan',
                  'experience', 'fishermen', 'rental'
                )),
  destination_id TEXT,            -- matches destination slug
  destination_name TEXT,

  description   TEXT NOT NULL,
  speciality    TEXT,
  price_range   TEXT CHECK (price_range IN ('budget', 'mid', 'premium')),
  price_label   TEXT,

  phone         TEXT,
  email         TEXT,
  website       TEXT,
  languages     JSONB DEFAULT '[]',

  images        JSONB NOT NULL DEFAULT '[]',
  tags          JSONB DEFAULT '[]',

  is_certified  BOOLEAN DEFAULT FALSE,
  is_featured   BOOLEAN DEFAULT FALSE,
  is_approved   BOOLEAN DEFAULT FALSE,  -- admin must approve submissions

  -- Community rating (computed from reviews)
  rating        DECIMAL(3, 2) DEFAULT 0,
  review_count  INTEGER DEFAULT 0,

  -- Submitted by (optional — for user submissions)
  submitted_by  UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE local_businesses ENABLE ROW LEVEL SECURITY;

-- Approved businesses are publicly readable
CREATE POLICY "Public can read approved businesses" ON local_businesses
  FOR SELECT USING (is_approved = TRUE);

-- Anyone can submit (insert); approval requires admin
CREATE POLICY "Anyone can submit a business" ON local_businesses
  FOR INSERT WITH CHECK (TRUE);

-- ── 4. Business Reviews ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS business_reviews (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  UUID NOT NULL REFERENCES local_businesses(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name  TEXT NOT NULL,
  rating       SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE business_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read reviews" ON business_reviews FOR SELECT USING (TRUE);
CREATE POLICY "Auth users can post reviews" ON business_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ── 5. Helper function: update business rating ─────────────────────────────
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE local_businesses
  SET
    rating = (SELECT AVG(rating) FROM business_reviews WHERE business_id = NEW.business_id),
    review_count = (SELECT COUNT(*) FROM business_reviews WHERE business_id = NEW.business_id),
    updated_at = NOW()
  WHERE id = NEW.business_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_business_review_insert
AFTER INSERT ON business_reviews
FOR EACH ROW EXECUTE FUNCTION update_business_rating();

-- ── 6. Wishlists (ensure exists) ───────────────────────────────────────────
-- Already used by the app; create if not exists
CREATE TABLE IF NOT EXISTS wishlists (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type    TEXT NOT NULL CHECK (item_type IN ('destination', 'stay', 'food', 'activity')),
  item_id      TEXT NOT NULL,
  item_name    TEXT NOT NULL,
  item_image   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, item_type, item_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users add to wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users remove from wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Done! Run this in Supabase SQL editor.
-- Tables: bookings, saved_itineraries, local_businesses, business_reviews, wishlists
-- ─────────────────────────────────────────────────────────────────────────────
