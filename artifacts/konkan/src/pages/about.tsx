import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  Heart, Users, Handshake, Upload, MapPin, Camera, Feather, Send, CheckCircle
} from 'lucide-react';

// ── Team Members ──────────────────────────────────────────────────────────────
const teamMembers = [
  { name: 'Divyang Patil', role: 'Founder & Editor-in-Chief', location: 'Mumbai', speciality: 'Cultural Heritage & Digital Storytelling', initial: 'D' },
  { name: 'Rukmini Naik', role: 'Lead Photographer', location: 'Ratnagiri', speciality: 'Coastal Landscape & People Photography', initial: 'R' },
  { name: 'Aditya Sawant', role: 'Heritage Researcher', location: 'Malvan', speciality: 'Fort History & Maratha Maritime', initial: 'A' },
  { name: 'Meena Kulkarni', role: 'Food & Culture Writer', location: 'Pune', speciality: 'Malvani Cuisine & Oral Traditions', initial: 'M' },
  { name: 'Suresh Dalvi', role: 'Local Correspondent', location: 'Alibag', speciality: 'Fishing Communities & Coastal Ecology', initial: 'S' },
  { name: 'Priya Govekar', role: 'Community Liaison', location: 'Vengurla', speciality: 'Artisans, Guides & Homestay Networks', initial: 'P' },
];

const contributors = [
  { name: 'Anand Bhalekar', contribution: 'Fort survey & historical content', location: 'Ratnagiri' },
  { name: 'Sulochana Sawant', contribution: 'Malvani cuisine documentation', location: 'Vengurla' },
  { name: 'Dr. V. Prabhu', contribution: 'Temple traditions & oral history', location: 'Ganpatipule' },
  { name: 'Ramkrishna Dalvi', contribution: 'Fishing community interviews', location: 'Malvan' },
  { name: 'Maharashtra Tourism', contribution: 'Destination data & images', location: 'Mumbai' },
  { name: 'Bombay Natural History Society', contribution: 'Wildlife & ecology content', location: 'Mumbai' },
];

// ── Values ────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: '🌊',
    title: 'Community First',
    description: 'Every story we tell centres the people who live on this coast — their knowledge, their voices, their futures. We do not extract; we collaborate.',
    color: '#2a8fb5',
  },
  {
    icon: '🏛️',
    title: 'Cultural Accuracy',
    description: 'All content is reviewed by local experts, community members, and heritage scholars. We hold ourselves to the standards of documentary journalism, not travel marketing.',
    color: '#c17f3a',
  },
  {
    icon: '🌱',
    title: 'Ecological Sensitivity',
    description: 'The Konkan coast is a biodiversity hotspot. We do not promote destinations that cannot absorb tourist pressure, and we actively amplify conservation initiatives.',
    color: '#3a9e6e',
  },
  {
    icon: '📚',
    title: 'Open Knowledge',
    description: 'All our research content is freely accessible. We believe knowledge of the Konkan belongs to everyone — especially the Konkan communities themselves.',
    color: '#800020',
  },
];

// ── Partner Form State ────────────────────────────────────────────────────────
type PartnerType = 'artisan' | 'guide' | 'homestay' | 'researcher' | 'other';

interface PartnerFormData {
  name: string;
  email: string;
  phone: string;
  type: PartnerType | '';
  location: string;
  description: string;
}

function PartnerForm() {
  const [form, setForm] = useState<PartnerFormData>({
    name: '', email: '', phone: '', type: '', location: '', description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const partnerTypes: { id: PartnerType; label: string; description: string; color: string }[] = [
    { id: 'artisan', label: 'Local Artisan', description: 'Lacquerware, textiles, pottery, or traditional crafts', color: '#c17f3a' },
    { id: 'guide', label: 'Certified Guide', description: 'Nature trails, heritage walks, village tours', color: '#3a9e6e' },
    { id: 'homestay', label: 'Homestay Owner', description: 'Traditional or eco-friendly accommodation', color: '#2a8fb5' },
    { id: 'researcher', label: 'Researcher', description: 'Academics, historians, ecologists, or journalists', color: '#800020' },
    { id: 'other', label: 'Other', description: 'Restaurants, boat operators, NGOs, local businesses', color: '#d45f2a' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16 text-center"
      >
        <div className="w-12 h-12 bg-[#3a9e6e]/15 border border-[#3a9e6e]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-6 h-6 text-[#3a9e6e]" />
        </div>
        <h4 className="font-serif text-3xl text-[#f4ecd8] mb-3">Inquiry Received</h4>
        <p className="font-sans text-sm text-[#f4ecd8]/50 max-w-md mx-auto">
          Thank you for reaching out. We will review your inquiry and get back to you within 3–5 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Partner type selection */}
      <div>
        <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-3">
          I am a / an *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {partnerTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: type.id }))}
              className="text-left p-4 border transition-all duration-200"
              style={{
                borderColor: form.type === type.id ? type.color : 'rgba(244,236,216,0.12)',
                backgroundColor: form.type === type.id ? `${type.color}12` : 'transparent',
              }}
            >
              <p className="font-sans text-sm font-medium text-[#f4ecd8]/80 mb-1">{type.label}</p>
              <p className="font-sans text-[10px] text-[#f4ecd8]/35">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Full name *</label>
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
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Email address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Phone number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="+91 00000 00000"
          />
        </div>
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Your location *</label>
          <input
            type="text"
            required
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="Village / District"
          />
        </div>
      </div>

      <div>
        <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">
          Tell us about your work *
        </label>
        <textarea
          required
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={4}
          className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#3a9e6e] transition-colors resize-none placeholder:text-[#f4ecd8]/20"
          placeholder="Describe your craft, tours, accommodation, or research..."
        />
      </div>

      <button
        type="submit"
        className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-sans text-[#020d08] bg-[#3a9e6e] hover:bg-[#4ab57e] px-8 py-3.5 transition-colors duration-300"
      >
        Submit inquiry
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}

// ── UGC Submission Form ────────────────────────────────────────────────────────
type UGCType = 'photo' | 'story' | 'tip';

function UGCForm() {
  const [type, setType] = useState<UGCType>('story');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', title: '', content: '' });

  const ugcTypes: { id: UGCType; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'photo', label: 'Photo', icon: <Camera className="w-4 h-4" />, description: 'A photograph from the Konkan coast' },
    { id: 'story', label: 'Story', icon: <Feather className="w-4 h-4" />, description: 'A personal travel account or memory' },
    { id: 'tip', label: 'Travel Tip', icon: <MapPin className="w-4 h-4" />, description: 'A local recommendation or hidden gem' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 text-center"
      >
        <div className="w-12 h-12 bg-[#c17f3a]/15 border border-[#c17f3a]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-6 h-6 text-[#c17f3a]" />
        </div>
        <h4 className="font-serif text-3xl text-[#f4ecd8] mb-3">Submission Received</h4>
        <p className="font-sans text-sm text-[#f4ecd8]/50 max-w-md mx-auto">
          Thank you for contributing to the Konkan archive. We review all submissions carefully and will publish with proper credit.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type selection */}
      <div className="flex gap-3">
        {ugcTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id)}
            className="flex-1 flex flex-col items-center gap-2 py-4 border transition-all duration-200"
            style={{
              borderColor: type === t.id ? '#c17f3a' : 'rgba(244,236,216,0.12)',
              color: type === t.id ? '#c17f3a' : 'rgba(244,236,216,0.4)',
              backgroundColor: type === t.id ? 'rgba(193,127,58,0.08)' : 'transparent',
            }}
          >
            {t.icon}
            <span className="text-[9px] tracking-[0.22em] uppercase font-sans">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Your name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#c17f3a] transition-colors placeholder:text-[#f4ecd8]/20"
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
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#c17f3a] transition-colors placeholder:text-[#f4ecd8]/20"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Title / Subject *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#c17f3a] transition-colors placeholder:text-[#f4ecd8]/20"
          placeholder={type === 'photo' ? 'Where was this taken?' : type === 'story' ? 'What is your story about?' : 'Your tip in a sentence'}
        />
      </div>

      {type === 'photo' ? (
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">Upload photo</label>
          <div className="border-2 border-dashed border-[#0d2d1e] hover:border-[#c17f3a]/40 transition-colors p-10 text-center">
            <Upload className="w-6 h-6 text-[#f4ecd8]/20 mx-auto mb-3" />
            <p className="font-sans text-sm text-[#f4ecd8]/35">Drag and drop or click to upload</p>
            <p className="font-sans text-[10px] text-[#f4ecd8]/20 mt-1">JPG, PNG up to 20MB</p>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-[9px] tracking-[0.3em] uppercase font-sans text-[#f4ecd8]/40 mb-2">
            {type === 'story' ? 'Your story *' : 'Your tip *'}
          </label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={5}
            className="w-full bg-transparent border border-[#0d2d1e] text-[#f4ecd8] font-sans text-sm px-4 py-3 focus:outline-none focus:border-[#c17f3a] transition-colors resize-none placeholder:text-[#f4ecd8]/20"
            placeholder={type === 'story' ? 'Tell us about your experience on the Konkan coast...' : 'Share a local secret, practical tip, or hidden gem...'}
          />
        </div>
      )}

      <button
        type="submit"
        className="flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-sans text-[#020d08] bg-[#c17f3a] hover:bg-[#d48f4a] px-8 py-3.5 transition-colors duration-300"
      >
        Submit {type}
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <img src="/assets/coastal-landscape.jpg" alt="Konkan Coast" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/50 via-[#020d08]/20 to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans text-[#3a9e6e] mb-4">About Konkan</p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                Who We Are &<br />
                <em className="italic text-[#c17f3a]">Why This Exists</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">
                An independent cultural and travel platform dedicated to documenting the Konkan coast — its people, places, history, and future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-4">Our mission</p>
            <h2 className="font-serif text-5xl md:text-6xl text-[#f4ecd8] leading-none mb-8">
              A living archive<br />
              <em className="italic text-[#c17f3a]">for a living coast.</em>
            </h2>
            <div className="space-y-5 font-sans text-sm text-[#f4ecd8]/65 leading-relaxed">
              <p>
                The Konkan coast — 720 kilometres of coastline stretching from Daman in the north to Karwar in the south — is one of the most historically rich, ecologically diverse, and culturally complex regions in India. It is also one of the least documented.
              </p>
              <p>
                This platform was created to change that. Not as a tourism promotional tool, but as a genuine cultural and educational archive: accurate, deep, community-centred, and built to last.
              </p>
              <p>
                We believe the Konkan deserves what the coast of Tuscany has, what the Scottish Highlands have — a comprehensive, beautiful, and honest record of what this place is, who lives here, what they know, and why it matters.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#c17f3a] mb-4">This platform is for</p>
            {[
              { icon: '🌊', text: 'Travellers who want more than a highlights reel — who want to understand the Konkan before they arrive, and document it honestly after they leave.' },
              { icon: '📚', text: 'Students and researchers looking for structured, accurate information on Konkan history, ecology, cuisine, and language.' },
              { icon: '🏘️', text: 'Diaspora Konkanis — the tens of millions of people of Konkan heritage who live outside the coast — who want to maintain a connection to a homeland they may rarely visit.' },
              { icon: '🌱', text: 'Local communities — artisans, fishermen, homestay owners, guides — who deserve a platform that represents them accurately and amplifies their work.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 border border-[#0d2d1e]">
                <span className="text-xl shrink-0">{item.icon}</span>
                <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-y border-[#0d2d1e] bg-[#020a08]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-20">
          <div className="text-center mb-14">
            <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">Principles</p>
            <h2 className="font-serif text-5xl text-[#f4ecd8]">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 border border-[#0d2d1e] hover:border-[#1a4d30] transition-colors duration-300"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl text-[#f4ecd8] mb-3">{value.title}</h3>
                <p className="font-sans text-xs text-[#f4ecd8]/50 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="mb-14">
          <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">The people behind this</p>
          <h2 className="font-serif text-5xl text-[#f4ecd8] mb-4">Meet the Team</h2>
          <p className="font-sans text-sm text-[#f4ecd8]/45 max-w-xl leading-relaxed">
            A small, distributed team of writers, photographers, researchers, and local correspondents — all deeply connected to the Konkan coast.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-16">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-[#0d2d1e] border border-[#1a4d30] group-hover:border-[#3a9e6e] transition-colors duration-300 flex items-center justify-center">
                <span className="font-serif text-2xl text-[#3a9e6e]/70 group-hover:text-[#3a9e6e] transition-colors duration-300">
                  {member.initial}
                </span>
              </div>
              <h4 className="font-sans text-xs font-medium text-[#f4ecd8]/80 mb-0.5">{member.name}</h4>
              <p className="font-sans text-[9px] text-[#f4ecd8]/35 leading-tight">{member.role}</p>
              <p className="font-sans text-[8px] text-[#3a9e6e]/50 mt-1">{member.location}</p>
            </motion.div>
          ))}
        </div>

        {/* Contributors */}
        <div className="border-t border-[#0d2d1e] pt-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-4 h-4 text-[#c17f3a]" />
            <p className="text-[9px] tracking-[0.32em] uppercase font-sans text-[#c17f3a]">Contributors & Collaborators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contributors.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex items-center gap-3 p-3 border border-[#0d2d1e]/60"
              >
                <div className="w-7 h-7 bg-[#0d2d1e] flex items-center justify-center shrink-0">
                  <span className="font-serif text-sm text-[#c17f3a]/60">{c.name[0]}</span>
                </div>
                <div>
                  <p className="font-sans text-xs text-[#f4ecd8]/70">{c.name}</p>
                  <p className="font-sans text-[9px] text-[#f4ecd8]/30">{c.contribution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner with Us ── */}
      <section className="border-y border-[#0d2d1e] bg-[#020a08]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="w-10 h-10 border border-[#3a9e6e]/40 flex items-center justify-center mb-6">
                <Handshake className="w-5 h-5 text-[#3a9e6e]" />
              </div>
              <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">Collaborate</p>
              <h2 className="font-serif text-5xl text-[#f4ecd8] leading-none mb-6">
                Partner<br />
                <em className="italic text-[#c17f3a]">With Us</em>
              </h2>
              <div className="space-y-4 font-sans text-sm text-[#f4ecd8]/55 leading-relaxed mb-8">
                <p>
                  If you are a local artisan, certified guide, homestay owner, researcher, or community organisation working on or around the Konkan coast, we want to hear from you.
                </p>
                <p>
                  We offer: a dedicated listing on our platform, editorial features in our stories section, co-produced content that accurately represents your work, and connection to our growing community of discerning travellers who want to experience the Konkan responsibly.
                </p>
                <p>
                  We do not charge for listings. We do not accept advertising from entities whose values conflict with responsible tourism or community wellbeing.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Artisans', detail: 'Sawantwadi lacquerware, Warli art, cane & bamboo, pottery' },
                  { label: 'Nature Guides', detail: 'Forest treks, bird watching, marine life tours, village walks' },
                  { label: 'Homestays', detail: 'Traditional Konkan homes, eco-lodges, farm stays' },
                  { label: 'Boat Operators', detail: 'Dolphin tours, fort visits, backwater cruises, fishing experiences' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3a9e6e] mt-1.5 shrink-0" />
                    <div>
                      <span className="font-sans font-medium text-[#f4ecd8]/70">{item.label}</span>
                      <span className="font-sans text-[#f4ecd8]/35 ml-2">— {item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── UGC Submission ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <div className="w-10 h-10 border border-[#c17f3a]/40 flex items-center justify-center mb-6">
              <Upload className="w-5 h-5 text-[#c17f3a]" />
            </div>
            <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#c17f3a] mb-3">Community archive</p>
            <h2 className="font-serif text-5xl text-[#f4ecd8] leading-none mb-6">
              Share Your<br />
              <em className="italic text-[#c17f3a]">Konkan</em>
            </h2>
            <div className="space-y-4 font-sans text-sm text-[#f4ecd8]/55 leading-relaxed">
              <p>
                Have you travelled the Konkan coast? Have you lived here, worked here, grown up here? The archive is richer for every honest account — the monsoon delay at Chiplun station, the meal at the widow's house, the fort you found by accident.
              </p>
              <p>
                Submit a photograph, a travel account, or a local tip. All submissions are reviewed before publication and credited to you. We never publish personal contact information without explicit permission.
              </p>
            </div>
          </div>

          <div>
            <UGCForm />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-[#0d2d1e] bg-[#020a08]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0d2d1e]">
          {[
            { value: '720 km', label: 'Of coast documented' },
            { value: '40+', label: 'Local contributors' },
            { value: '200+', label: 'Articles & stories' },
            { value: '6', label: 'Districts covered' },
          ].map((s) => (
            <div key={s.label} className="text-center px-6 py-2">
              <p className="font-serif text-3xl text-[#c17f3a] mb-1">{s.value}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
