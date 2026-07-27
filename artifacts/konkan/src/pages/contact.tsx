import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  ChevronDown, Send, Instagram, Youtube, Mail,
  CheckCircle, MessageSquare, Phone, Clock, Bell
} from 'lucide-react';

// ── FAQs ──────────────────────────────────────────────────────────────────────
interface FAQ {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQ[] = [
  // Best time & seasons
  {
    category: 'Seasons & Weather',
    q: 'What is the best time to visit the Konkan coast?',
    a: 'October through February is the ideal window — the monsoon has retreated, temperatures are pleasant (22–30°C), the sea is calm, and the landscape retains its post-monsoon lushness. March–May is also good, especially for mangoes, though it can be hot. June–September is the monsoon season: the coast is dramatically beautiful but many beaches close, some roads flood, and ferry services to the sea forts are suspended.',
  },
  {
    category: 'Seasons & Weather',
    q: 'Is it worth visiting during the monsoon?',
    a: 'Yes, if you know what to expect. The Konkan monsoon (June–September) transforms the coast — waterfalls appear on every hillside, the paddy fields turn electric green, and the laterite cliffs stream with rainwater. It is the most photogenic season. However: beaches are closed for swimming, the sea is rough and ferry services are suspended (meaning sea fort visits are impossible), and some interior roads can flood. Monsoon is ideal for nature lovers and photographers; not recommended for first-time visitors who want beaches and watersports.',
  },
  {
    category: 'Seasons & Weather',
    q: 'When is turtle nesting season at Velas?',
    a: 'Olive Ridley turtle nesting at Velas Beach (Ratnagiri) typically occurs between February and April. The Sahyadri Nisarga Mitra conservation group organises the Velas Turtle Festival during this period — a celebrated community-led conservation event where visitors can witness hatchlings entering the sea. Book accommodation well in advance as it sells out quickly. Contact the local village gram panchayat or SNM directly for current season dates.',
  },
  // Transport & Access
  {
    category: 'Getting There',
    q: 'How do I travel the Konkan coast?',
    a: 'The Konkan Railway is the backbone of coastal travel — connecting Mumbai to Mangalore via Ratnagiri, Kankavali, and Kudal. It passes through some of the most spectacular scenery in India (92 tunnels, 2,000 bridges). For internal travel within districts, state buses (MSRTC) are reliable but slow. Renting a two-wheeler or car is the best way to explore backroads and reach hidden beaches. Hiring a local auto-rickshaw driver as a guide for a day is excellent value and directly benefits the community.',
  },
  {
    category: 'Getting There',
    q: 'Which are the nearest airports to the Konkan coast?',
    a: 'Chhatrapati Shivaji Maharaj International Airport (Mumbai) serves the northern Konkan (Raigad, Palghar, Thane). Chipi Airport (Sindhudurg) now has regular flights from Mumbai and is the gateway to the southern Konkan. Dabolim/Goa International Airport serves the Karnataka Konkan (Karwar, Ankola). For Ratnagiri, the nearest airport is Ratnagiri Airport (limited connectivity) or Mumbai.',
  },
  {
    category: 'Getting There',
    q: 'Can I visit Sindhudurg Fort without a boat?',
    a: 'No — Sindhudurg Fort is an island fortress and can only be reached by ferry from Malvan jetty. The crossing takes approximately 10–15 minutes. Ferries run regularly from early morning and the service is suspended during rough seas (typically monsoon season). Entry fees and ferry charges are separate. There are also boat tours around the fort that do not land on the island, offering a different perspective of the sea walls.',
  },
  // Permits & Rules
  {
    category: 'Permits & Regulations',
    q: 'Do any Konkan destinations require special permits?',
    a: 'Most of the Konkan coast is freely accessible without permits. Exceptions: (1) The Malvan Marine Sanctuary requires a diving/snorkelling permit available at the sanctuary office — entry with marine equipment is regulated. (2) Some forest areas within the Phansad Wildlife Sanctuary require permission from the Forest Department. (3) Photography within certain temples and private fort properties may require specific permission. Foreign nationals should carry their passport and visa documents when visiting border districts near Goa and Karnataka.',
  },
  {
    category: 'Permits & Regulations',
    q: 'Are there any restrictions on beach camping?',
    a: 'Beach camping regulations vary by district. In Maharashtra, overnight beach camping is generally not permitted on public beaches without prior permission from the local gram panchayat. Some resort operators and homestay owners organise permitted beach camping experiences. The Konkan coast has active turtle nesting sites (Velas, Kelshi, Anjarle) where any night-time activity near the high-tide line is strictly prohibited during nesting season (November–April). Always check local rules before camping.',
  },
  // Accommodation
  {
    category: 'Accommodation',
    q: 'What types of accommodation are available?',
    a: 'The Konkan coast has excellent homestay options at all budget levels. Traditional Konkan homes (often beautiful laterite or wood structures with tiled roofs) offer authentic hospitality and home-cooked Malvani meals. Eco-resorts and nature camps are well-established, especially near Tarkarli, Alibaug, and Dapoli. Beach resorts exist but are fewer than on the Goa coast — which is part of the Konkan\'s appeal. Budget travellers can find good options through MTDC (Maharashtra Tourism Development Corporation) who operate resorts at several key destinations.',
  },
  {
    category: 'Accommodation',
    q: 'How far in advance should I book?',
    a: 'For the peak season (October–February), book at least 4–6 weeks in advance for popular destinations like Tarkarli, Diveagar, and Ganpatipule. For the Velas Turtle Festival (February–April), 2–3 months in advance. For the monsoon season, advance booking is less critical as tourist volume is lower — but verify that your chosen accommodation is operational during monsoon, as some coastal properties close.',
  },
  // Food
  {
    category: 'Food & Cuisine',
    q: 'What dishes should I absolutely try in the Konkan?',
    a: 'The essential Konkan food experience: (1) Malvani fish curry — made with the 12-spice masala unique to the Sindhudurg region. (2) Sol kadhi — kokum and coconut milk drink, cooling and delicious. (3) Fresh bombil (Bombay duck) fry — crisp, delicate, unlike anything elsewhere. (4) Devgad Alphonso mango (in season, March–May) — the finest Hapus mango in India. (5) Amboli — Konkan rice pancakes served with coconut chutney. (6) Modak — especially at Ganpatipule during festivals. (7) Any home-cooked thali from a local homestay — this will be the best meal of your trip.',
  },
  {
    category: 'Food & Cuisine',
    q: 'Are there good options for vegetarians?',
    a: 'Yes — Konkan cuisine has a strong vegetarian tradition alongside its famous seafood. Brahmin Konkan cooking (practiced by the Saraswat Brahmin community) is almost entirely vegetarian and is considered one of the finest vegetarian traditions in Maharashtra. Dishes include: raw mango curry, jackfruit preparations (kadgi chakko, panas ambat), coconut-based chutneys, bhakri (rice flatbread), and various lentil dishes. Most restaurants in the region offer vegetarian options, and homestays will generally accommodate dietary requirements if informed in advance.',
  },
  // Safety & Practical
  {
    category: 'Safety & Practical',
    q: 'Is the Konkan coast safe for solo travellers?',
    a: 'Yes — the Konkan is one of the safer regions in India for solo travel, including solo women travellers, largely due to the close-knit community structure of coastal villages. Standard precautions apply: do not swim at unmarked beaches without checking local conditions, avoid beaches at night, carry sufficient cash (ATMs are sparse in rural areas), and download offline maps before entering areas with limited mobile connectivity. The Konkan Railway corridor is generally safe and well-connected.',
  },
  {
    category: 'Safety & Practical',
    q: 'What should I know about water safety and swimming?',
    a: 'Konkan beaches are subject to strong currents and rip tides, especially during and after the monsoon. Always swim at designated beaches with lifeguard presence. Do not swim at isolated beaches without local knowledge. The beaches at Tarkarli, Diveagar, Ganapatipule, and Harihareshwar have better facilities. Avoid swimming at dusk or night. Jellyfish are present seasonally — ask locals before entering the water. The Malvan Marine Sanctuary has clear guidelines for snorkelling that should be followed to protect the reef.',
  },
  {
    category: 'Safety & Practical',
    q: 'Is there good mobile and internet connectivity?',
    a: 'Mobile coverage (Jio and Airtel are the most reliable) is good along the Konkan Railway corridor and in town centres. However, coverage drops significantly in rural areas, hillside villages, and forest zones. Plan accordingly: download offline maps (Maps.me or Google Maps offline), save important contact numbers locally, and do not rely on real-time navigation in remote areas. Wi-Fi is available at most hotels and homestays in tourist centres but may be slow.',
  },
];

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
            className="text-[9px] tracking-[0.2em] uppercase font-sans px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: activeCategory === cat ? '#3a9e6e' : 'rgba(244,236,216,0.15)',
              color: activeCategory === cat ? '#3a9e6e' : 'rgba(244,236,216,0.45)',
              backgroundColor: activeCategory === cat ? 'rgba(58,158,110,0.08)' : 'transparent',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-0">
        {filtered.map((faq, idx) => (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="border-b border-[#0d2d1e]"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-start justify-between gap-6 py-5 text-left group"
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-[8px] tracking-[0.18em] uppercase font-sans px-2 py-0.5 shrink-0 mt-0.5"
                  style={{ backgroundColor: 'rgba(58,158,110,0.12)', color: '#3a9e6e' }}
                >
                  {faq.category}
                </span>
                <span className="font-sans text-sm text-[#f4ecd8]/80 group-hover:text-[#f4ecd8] transition-colors leading-relaxed">
                  {faq.q}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openIdx === idx ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 mt-0.5"
              >
                <ChevronDown className="w-4 h-4 text-[#f4ecd8]/30 group-hover:text-[#f4ecd8]/50 transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-0 md:pl-[8rem]">
                    <p className="font-sans text-sm text-[#f4ecd8]/55 leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Feedback Form ─────────────────────────────────────────────────────────────
function FeedbackForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16 text-center border border-[#0d2d1e]"
      >
        <div className="w-12 h-12 bg-[#3a9e6e]/15 border border-[#3a9e6e]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-6 h-6 text-[#3a9e6e]" />
        </div>
        <h4 className="font-serif text-3xl text-[#f4ecd8] mb-3">Message Sent</h4>
        <p className="font-sans text-sm text-[#f4ecd8]/50">We read every piece of feedback. Thank you for helping us improve.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Subject *</label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
          placeholder="What is your message about?"
        />
      </div>
      <div>
        <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Message *</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          rows={5}
          className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors resize-none placeholder:text-[#f4ecd8]/20"
          placeholder="Your feedback, suggestions, error reports, or kind words..."
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-sans text-[#020d08] bg-[#3a9e6e] hover:bg-[#4ab57e] px-8 py-3.5 transition-colors duration-300"
      >
        Send message
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}

// ── Newsletter Form ───────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-3 py-4"
      >
        <CheckCircle className="w-5 h-5 text-[#3a9e6e]" />
        <p className="font-sans text-sm text-[#f4ecd8]/60">
          You&apos;re subscribed. Welcome to the Konkan community.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-transparent border border-[#0d2d1e] border-r-0 text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
      />
      <button
        type="submit"
        className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-sans text-[#020d08] bg-[#3a9e6e] hover:bg-[#4ab57e] px-6 py-3 transition-colors duration-300 whitespace-nowrap"
      >
        <Bell className="w-3.5 h-3.5" />
        Subscribe
      </button>
    </form>
  );
}

// ── Social Links ──────────────────────────────────────────────────────────────
const socialLinks = [
  {
    platform: 'Instagram',
    handle: '@konkan.coast',
    description: 'Daily images from the coast — beaches, forts, food, and people. Our most active channel.',
    icon: <Instagram className="w-5 h-5" />,
    color: '#c17f3a',
    url: 'https://www.instagram.com',
    followers: '24.5K',
  },
  {
    platform: 'YouTube',
    handle: 'Konkan — The Living Coast',
    description: 'Documentary-style videos: oral history interviews, fort trek footage, monsoon journey vlogs.',
    icon: <Youtube className="w-5 h-5" />,
    color: '#800020',
    url: 'https://www.youtube.com',
    followers: '8.2K',
  },
  {
    platform: 'Email Newsletter',
    handle: 'Quarterly dispatch',
    description: 'A curated seasonal letter — new stories, upcoming events, conservation updates, and travel tips.',
    icon: <Mail className="w-5 h-5" />,
    color: '#3a9e6e',
    url: 'mailto:hello@konkan.in',
    followers: '5.1K',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src="/assets/konkan-railway.jpg" alt="Contact Konkan" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/30 to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-16 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#3a9e6e] mb-4">Contact & Support</p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-4">
                Get in Touch
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/55 max-w-xl leading-relaxed">
                Questions, feedback, partnership inquiries, or just wanting to connect — we are here.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="mb-12">
          <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">Before you write</p>
          <h2 className="font-serif text-5xl text-[#f4ecd8] mb-4">Help Center & FAQs</h2>
          <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
            We have answered the questions we receive most often. If your question is not here, use the contact form below.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* ── Feedback & Social side by side ── */}
      <section className="border-t border-[#0d2d1e] bg-[#020a08]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Feedback form */}
            <div>
              <div className="w-10 h-10 border border-[#3a9e6e]/40 flex items-center justify-center mb-6">
                <MessageSquare className="w-5 h-5 text-[#3a9e6e]" />
              </div>
              <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">Reach us directly</p>
              <h2 className="font-serif text-4xl text-[#f4ecd8] mb-2">Feedback &</h2>
              <h2 className="font-serif text-4xl italic text-[#c17f3a] mb-8">Suggestions</h2>
              <p className="font-sans text-sm text-[#f4ecd8]/45 leading-relaxed mb-8">
                Found an error? Have a suggestion? Want to report a cultural inaccuracy? Every message is read by a human. We take factual and cultural accuracy very seriously — if something on this platform is wrong, please tell us.
              </p>
              <FeedbackForm />
            </div>

            {/* Social & Newsletter */}
            <div>
              <div className="w-10 h-10 border border-[#c17f3a]/40 flex items-center justify-center mb-6">
                <Bell className="w-5 h-5 text-[#c17f3a]" />
              </div>
              <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#c17f3a] mb-3">Stay connected</p>
              <h2 className="font-serif text-4xl text-[#f4ecd8] mb-2">Social Media &</h2>
              <h2 className="font-serif text-4xl italic text-[#c17f3a] mb-8">Newsletter</h2>

              <div className="space-y-4 mb-10">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 border border-[#0d2d1e] hover:border-[#1a4d30] group transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0 border transition-colors duration-300"
                      style={{
                        borderColor: `${social.color}40`,
                        color: social.color,
                      }}
                    >
                      {social.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-sans text-sm font-medium text-[#f4ecd8]/80 group-hover:text-[#f4ecd8] transition-colors">
                          {social.platform}
                        </p>
                        <span className="font-sans text-[9px] text-[#f4ecd8]/30 shrink-0">{social.followers} followers</span>
                      </div>
                      <p className="font-sans text-[10px] tracking-[0.1em]" style={{ color: social.color }}>
                        {social.handle}
                      </p>
                      <p className="font-sans text-xs text-[#f4ecd8]/40 mt-1 leading-relaxed">{social.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter signup */}
              <div className="border border-[#0d2d1e] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-[#3a9e6e]" />
                  <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#3a9e6e]">Email Newsletter</p>
                </div>
                <p className="font-sans text-sm text-[#f4ecd8]/55 leading-relaxed mb-4">
                  Quarterly dispatches from the coast — new stories, upcoming events, conservation updates, seasonal travel guides.
                </p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Chat / Helpline (Static Placeholder) ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="border border-[#0d2d1e] bg-[#0d2d1e]/15 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f4ecd8]/20 relative">
                  <span className="absolute inset-0 rounded-full bg-[#f4ecd8]/15 animate-ping" />
                </div>
                <p className="text-[9px] tracking-[0.32em] uppercase font-sans text-[#f4ecd8]/35">Coming soon</p>
              </div>
              <h2 className="font-serif text-4xl text-[#f4ecd8] mb-4">
                Live Chat &<br />
                <em className="italic text-[#c17f3a]">Travel Helpline</em>
              </h2>
              <p className="font-sans text-sm text-[#f4ecd8]/50 leading-relaxed mb-6">
                We are building a real-time support channel staffed by people who know the Konkan intimately — local guides, former tourism professionals, and community experts. This will be available in our next update.
              </p>
              <div className="space-y-3">
                {[
                  { icon: <MessageSquare className="w-3.5 h-3.5" />, label: 'Live chat', detail: 'Available 9 AM–6 PM IST', color: '#3a9e6e' },
                  { icon: <Phone className="w-3.5 h-3.5" />, label: 'Travel helpline', detail: '+91 XXXX XXXXXX (launching Q2 2025)', color: '#c17f3a' },
                  { icon: <Clock className="w-3.5 h-3.5" />, label: 'Response time', detail: 'Typically under 2 hours during business hours', color: '#2a8fb5' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 opacity-50">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <div>
                      <span className="font-sans text-xs font-medium text-[#f4ecd8]/70">{item.label}</span>
                      <span className="font-sans text-xs text-[#f4ecd8]/35 ml-2">— {item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] tracking-[0.32em] uppercase font-sans text-[#f4ecd8]/30 mb-4">
                In the meantime, these resources help
              </p>
              {[
                { title: 'Maharashtra Tourism (MTDC)', url: 'https://www.maharashtratourism.gov.in', detail: 'Official tourism board with accommodation and permit information' },
                { title: 'Konkan Railway Corporation', url: 'https://www.konkanrailway.com', detail: 'Timetables, reservations, and route information' },
                { title: 'Archaeological Survey of India', url: 'https://asi.nic.in', detail: 'Heritage site information and visiting hours' },
                { title: 'Sahyadri Nisarga Mitra', url: '#', detail: 'Turtle conservation and eco-tourism contact for the Velas coast' },
              ].map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-[#0d2d1e] hover:border-[#1a4d30] transition-colors group"
                >
                  <p className="font-sans text-sm text-[#f4ecd8]/70 group-hover:text-[#f4ecd8] transition-colors mb-0.5">
                    {link.title}
                  </p>
                  <p className="font-sans text-[10px] text-[#f4ecd8]/30">{link.detail}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
