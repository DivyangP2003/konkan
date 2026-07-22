/**
 * realm-content.ts
 *
 * Defines the RealmContent interface and re-exports the full data
 * from realm-data.ts. To add or edit realm content, edit realm-data.ts.
 *
 * File location: src/data/realm-content.ts
 */

export interface RealmContent {
  /** One-line poetic subtitle shown below the realm title */
  subtitle: string;

  /** 6–8 paragraphs of rich descriptive body text */
  body: string[];

  /** Pull-quote or proverb */
  quote?: { text: string; attribution?: string };

  /** 5–6 concise stat/fact pairs */
  keyFacts?: Array<{ label: string; value: string }>;

  /** 5–6 named highlights with short descriptions */
  highlights?: Array<{ title: string; desc: string }>;

  /** Image filenames, relative to /assets/ */
  gallery?: string[];

  /** 6–8 actionable things to do */
  thingsToDo?: string[];

  /** Best time to visit / experience this realm */
  bestTime?: string;

  /** 2–4 surprising "did you know" facts */
  didYouKnow?: string[];

  /** One insider tip from a local perspective */
  localTip?: string;

  /** Safety or etiquette warnings for visitors */
  warnings?: string[];
}

export { realmContent } from './realm-data';
