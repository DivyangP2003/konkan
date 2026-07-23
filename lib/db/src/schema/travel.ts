import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table (for authentication and user management)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  avatar: text('avatar'),
  role: varchar('role', { length: 50 }).notNull().default('user'), // 'user', 'admin'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Destinations table
export const destinations = pgTable('destinations', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  nameKn: varchar('name_kn', { length: 255 }), // Konkani
  nameMr: varchar('name_mr', { length: 255 }), // Marathi
  nameHi: varchar('name_hi', { length: 255 }), // Hindi
  region: varchar('region', { length: 50 }).notNull(), // 'north', 'central', 'south'
  type: varchar('type', { length: 50 }).notNull(), // 'beach', 'fort', 'temple', 'hill', 'village', 'city'
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  description: text('description').notNull(),
  descriptionKn: text('description_kn'),
  descriptionMr: text('description_mr'),
  descriptionHi: text('description_hi'),
  highlights: jsonb('highlights').notNull(), // Array of strings
  bestTime: jsonb('best_time').notNull(), // Array of months
  activities: jsonb('activities').notNull(), // Array of activity IDs
  images: jsonb('images').notNull(), // Array of image URLs
  featured: boolean('featured').default(false),
  trending: boolean('trending').default(false),
  hidden: boolean('hidden').default(false),
  difficulty: varchar('difficulty', { length: 20 }), // 'easy', 'moderate', 'difficult'
  distanceFromMumbai: integer('distance_from_mumbai'), // in km
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Accommodations table
export const accommodations = pgTable('accommodations', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  nameKn: varchar('name_kn', { length: 255 }),
  nameMr: varchar('name_mr', { length: 255 }),
  nameHi: varchar('name_hi', { length: 255 }),
  type: varchar('type', { length: 50 }).notNull(), // 'hotel', 'resort', 'homestay', 'beach_shack', 'heritage', 'eco_lodge'
  destinationId: uuid('destination_id').references(() => destinations.id),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  description: text('description').notNull(),
  descriptionKn: text('description_kn'),
  descriptionMr: text('description_mr'),
  descriptionHi: text('description_hi'),
  priceRange: varchar('price_range', { length: 20 }).notNull(), // 'budget', 'mid', 'luxury'
  priceMin: integer('price_min'), // in INR
  priceMax: integer('price_max'), // in INR
  amenities: jsonb('amenities').notNull(), // Array of amenity strings
  images: jsonb('images').notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  website: text('website'),
  bookingUrl: text('booking_url'),
  featured: boolean('featured').default(false),
  petFriendly: boolean('pet_friendly').default(false),
  familyFriendly: boolean('family_friendly').default(false),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Restaurants table
export const restaurants = pgTable('restaurants', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  nameKn: varchar('name_kn', { length: 255 }),
  nameMr: varchar('name_mr', { length: 255 }),
  nameHi: varchar('name_hi', { length: 255 }),
  cuisineType: varchar('cuisine_type', { length: 50 }).notNull(), // 'seafood', 'vegetarian', 'traditional', 'fusion'
  destinationId: uuid('destination_id').references(() => destinations.id),
  latitude: decimal('latitude', { precision: 10, scale: 7 }).notNull(),
  longitude: decimal('longitude', { precision: 10, scale: 7 }).notNull(),
  description: text('description').notNull(),
  descriptionKn: text('description_kn'),
  descriptionMr: text('description_mr'),
  descriptionHi: text('description_hi'),
  priceRange: varchar('price_range', { length: 20 }).notNull(), // 'budget', 'mid', 'expensive'
  specialties: jsonb('specialties').notNull(), // Array of dish names
  images: jsonb('images').notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  openingHours: jsonb('opening_hours'), // { day: "hours" }
  featured: boolean('featured').default(false),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Activities table
export const activities = pgTable('activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  nameKn: varchar('name_kn', { length: 255 }),
  nameMr: varchar('name_mr', { length: 255 }),
  nameHi: varchar('name_hi', { length: 255 }),
  category: varchar('category', { length: 50 }).notNull(), // 'adventure', 'cultural', 'nature', 'wellness', 'leisure'
  subcategory: varchar('subcategory', { length: 50 }), // 'trekking', 'water_sports', etc.
  destinationId: uuid('destination_id').references(() => destinations.id),
  description: text('description').notNull(),
  descriptionKn: text('description_kn'),
  descriptionMr: text('description_mr'),
  descriptionHi: text('description_hi'),
  duration: varchar('duration', { length: 100 }), // "2-3 hours", "Full day"
  difficulty: varchar('difficulty', { length: 20 }), // 'easy', 'moderate', 'difficult'
  price: integer('price'), // in INR
  season: jsonb('season'), // Array of suitable months
  safetyGuidelines: jsonb('safety_guidelines'),
  equipmentNeeded: jsonb('equipment_needed'),
  images: jsonb('images').notNull(),
  bookingRequired: boolean('booking_required').default(false),
  contactInfo: text('contact_info'),
  featured: boolean('featured').default(false),
  familyFriendly: boolean('family_friendly').default(false),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }).default('0'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Reviews table (for all entities)
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // 'destination', 'accommodation', 'restaurant', 'activity'
  entityId: uuid('entity_id').notNull(),
  rating: integer('rating').notNull(), // 1-5
  comment: text('comment'),
  images: jsonb('images'), // Optional photos from users
  verified: boolean('verified').default(false),
  helpful: integer('helpful').default(0), // Count of helpful votes
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Saved trips table
export const savedTrips = pgTable('saved_trips', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  tripData: jsonb('trip_data').notNull(), // Full trip object
  shareToken: varchar('share_token', { length: 100 }).unique(),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Bookmarks table
export const bookmarks = pgTable('bookmarks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  savedTrips: many(savedTrips),
  bookmarks: many(bookmarks),
}));

export const destinationsRelations = relations(destinations, ({ many }) => ({
  accommodations: many(accommodations),
  restaurants: many(restaurants),
  activities: many(activities),
}));

export const accommodationsRelations = relations(accommodations, ({ one }) => ({
  destination: one(destinations, {
    fields: [accommodations.destinationId],
    references: [destinations.id],
  }),
}));

export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  destination: one(destinations, {
    fields: [restaurants.destinationId],
    references: [destinations.id],
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  destination: one(destinations, {
    fields: [activities.destinationId],
    references: [destinations.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));
