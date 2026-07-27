const DEFAULT_MODEL = 'gemini-2.5-flash';

interface PlanRequest {
  origin?: string;
  days?: number;
  style?: string;
  interests?: string[];
  budgetMin?: number;
  budgetMax?: number;
  route?: string;
}

function cleanText(value: unknown, fallback: string, maxLength: number) {
  return typeof value === 'string' && value.trim()
    ? value.trim().slice(0, maxLength)
    : fallback;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'Konkan AI is not configured yet. Add GEMINI_API_KEY in Vercel.' });
    return;
  }

  const body = (req.body ?? {}) as PlanRequest;
  const origin = cleanText(body.origin, 'Mumbai', 80);
  const route = cleanText(body.route, 'a Konkan coastal route', 120);
  const style = cleanText(body.style, 'custom', 40);
  const days = Math.min(21, Math.max(1, Number(body.days) || 4));
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((item): item is string => typeof item === 'string').slice(0, 5).join(', ')
    : 'a balanced mix of coast, food, and local culture';
  const budgetMin = Math.max(0, Number(body.budgetMin) || 1800);
  const budgetMax = Math.max(budgetMin, Number(body.budgetMax) || 3600);

  const prompt = `You are Konkan AI, a thoughtful local trip editor for the Konkan coast of Maharashtra, India.
Give a concise, useful route read for a traveller planning ${days} days from ${origin}.
Their travel posture is ${style}; their interests are ${interests}; their working daily budget is ₹${budgetMin}–₹${budgetMax} per person.
The current guide route is "${route}".

Respond in plain text, under 180 words, with:
1. A one-sentence verdict on the route.
2. Three short bullets labelled "Keep", "Watch", and "Leave room for".
3. One practical next step.

Use grounded, non-generic advice about Konkan travel. Do not invent live availability, exact weather, or bookings. If conditions can change, say to confirm locally.`;

  try {
    const model = cleanText(process.env.GEMINI_MODEL, DEFAULT_MODEL, 80);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.55, maxOutputTokens: 8192 },
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      res.status(502).json({ error: 'Gemini could not read this route right now.' });
      return;
    }

    const answer = payload?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? '')
      .join('')
      .trim();

    if (!answer) {
      res.status(502).json({ error: 'Gemini returned an empty route read.' });
      return;
    }

    res.status(200).json({ answer, model });
  } catch {
    res.status(502).json({ error: 'Konkan AI is temporarily unavailable. Your local route draft is still ready.' });
  }
}