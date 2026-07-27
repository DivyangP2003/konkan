import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  BookOpen, Image as ImageIcon, Mic, FileText, X, ChevronRight, ExternalLink, PenLine
} from 'lucide-react';
import {
  blogPosts,
  galleryImages,
  oralHistories,
  researchArticles,
  storiesMeta,
  type GalleryImage,
  type OralHistory,
} from '@/data/stories';

type Tab = 'blogs' | 'gallery' | 'interviews' | 'research';
type GalleryTheme = 'all' | GalleryImage['theme'];

// ── Blog Card ─────────────────────────────────────────────────────────────────
function BlogCard({ post, idx, onExpand }: {
  post: typeof blogPosts[number];
  idx: number;
  onExpand: (id: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onExpand(post.id)}
    >
      <div className="relative overflow-hidden aspect-[16/9] mb-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020d08] via-[#020d08]/30 to-transparent" />
        <div
          className="absolute top-4 left-4 text-[8px] tracking-[0.28em] uppercase font-sans px-3 py-1.5"
          style={{ backgroundColor: post.categoryColor, color: '#020d08' }}
        >
          {post.categoryLabel}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3 text-[9px] font-sans text-[#f4ecd8]/50">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#f4ecd8]/30" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-[26px] text-[#f4ecd8] leading-tight group-hover:text-[#c17f3a] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-sans text-xs text-[#f4ecd8]/40 tracking-[0.1em]">
          By {post.author}
        </p>
        <p className="font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
          {post.excerpt}
        </p>
        <button
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans transition-colors mt-2"
          style={{ color: post.categoryColor }}
        >
          Read the story
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.article>
  );
}

// ── Blog Modal ─────────────────────────────────────────────────────────────────
function BlogModal({ post, onClose }: { post: typeof blogPosts[number]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#020d08]/96 backdrop-blur-2xl overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40 hover:text-[#f4ecd8] transition-colors mb-12"
        >
          <X className="w-3.5 h-3.5" />
          Close
        </button>

        <div className="mb-4">
          <span
            className="text-[8px] tracking-[0.28em] uppercase font-sans px-3 py-1.5"
            style={{ backgroundColor: post.categoryColor, color: '#020d08' }}
          >
            {post.categoryLabel}
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-[#f4ecd8] leading-tight mb-4">
          {post.title}
        </h1>
        <p className="font-serif italic text-xl text-[#f4ecd8]/50 mb-8">{post.subtitle}</p>

        <div className="flex items-center gap-6 text-[9px] font-sans text-[#f4ecd8]/40 mb-8 pb-8 border-b border-[#0d2d1e]">
          <span className="tracking-[0.15em] uppercase">By {post.author}</span>
          <span className="w-1 h-1 rounded-full bg-[#f4ecd8]/20" />
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#f4ecd8]/20" />
          <span>{post.readTime}</span>
        </div>

        <div className="relative overflow-hidden aspect-[16/9] mb-10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-5 font-sans text-[#f4ecd8]/70 text-[15px] leading-[1.85]">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-[#0d2d1e]">
          <p className="text-[8.5px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/30 mb-3">About the author</p>
          <p className="font-sans text-sm text-[#f4ecd8]/50">{post.authorBio}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.15em] uppercase font-sans px-2.5 py-1 border"
              style={{ borderColor: `${post.categoryColor}40`, color: post.categoryColor }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
const galleryThemes: { id: GalleryTheme; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: '#f4ecd8' },
  { id: 'beaches', label: 'Beaches', color: '#2a8fb5' },
  { id: 'forts', label: 'Forts', color: '#c17f3a' },
  { id: 'temples', label: 'Temples', color: '#800020' },
  { id: 'food', label: 'Food', color: '#d45f2a' },
  { id: 'people', label: 'People', color: '#3a9e6e' },
  { id: 'monsoon', label: 'Monsoon', color: '#2a6fa8' },
  { id: 'wildlife', label: 'Wildlife', color: '#5a8a4a' },
];

function GalleryTab() {
  const [activeTheme, setActiveTheme] = useState<GalleryTheme>('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryImage | null>(null);

  const filtered = activeTheme === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.theme === activeTheme);

  return (
    <div>
      {/* Theme filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {galleryThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setActiveTheme(theme.id)}
            className="text-[9px] tracking-[0.22em] uppercase font-sans px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: activeTheme === theme.id ? theme.color : 'rgba(244,236,216,0.15)',
              color: activeTheme === theme.id ? theme.color : 'rgba(244,236,216,0.45)',
              backgroundColor: activeTheme === theme.id ? `${theme.color}15` : 'transparent',
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.03 }}
            className="break-inside-avoid group relative cursor-pointer overflow-hidden"
            onClick={() => setLightboxImg(img)}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: idx % 3 === 0 ? '220px' : '160px' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-serif text-base text-[#f4ecd8]">{img.title}</p>
              <p className="font-sans text-[9px] text-[#f4ecd8]/60 mt-0.5">{img.location}</p>
            </div>
            <div
              className="absolute top-2 left-2 text-[7px] tracking-[0.2em] uppercase font-sans px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: img.themeColor, color: '#020d08' }}
            >
              {img.themeLabel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-[#f4ecd8]/60 hover:text-[#f4ecd8] transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  className="w-full max-h-[70vh] object-contain"
                />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl text-[#f4ecd8]">{lightboxImg.title}</h3>
                    <p className="font-sans text-sm text-[#f4ecd8]/50 mt-1">{lightboxImg.caption}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#f4ecd8]/35">{lightboxImg.location}</p>
                    <span
                      className="inline-block mt-1 text-[7px] tracking-[0.2em] uppercase font-sans px-2 py-1"
                      style={{ backgroundColor: lightboxImg.themeColor, color: '#020d08' }}
                    >
                      {lightboxImg.themeLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Oral History Card ─────────────────────────────────────────────────────────
function OralHistoryCard({ history, idx }: { history: OralHistory; idx: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start border-b border-[#0d2d1e] pb-16 last:border-none last:pb-0"
    >
      {/* Image side */}
      <div className={`relative overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={history.image}
            alt={history.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/70 via-transparent to-transparent" />
        </div>

        {/* Pull quote overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 border-l-4"
          style={{ borderColor: history.accentColor }}
        >
          <p className="font-serif text-xl italic text-[#f4ecd8] leading-relaxed">
            &ldquo;{history.pullQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Text side */}
      <div className={`space-y-5 py-2 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div>
          <p
            className="text-[9px] tracking-[0.32em] uppercase font-sans mb-2"
            style={{ color: history.accentColor }}
          >
            {history.role}
          </p>
          <h3 className="font-serif text-4xl text-[#f4ecd8] leading-tight">{history.name}</h3>
          <p className="font-sans text-xs text-[#f4ecd8]/35 mt-2 tracking-[0.15em] uppercase">
            {history.location}
          </p>
        </div>

        <div
          className="h-[1px] w-12"
          style={{ backgroundColor: history.accentColor }}
        />

        <p className="font-sans text-sm text-[#f4ecd8]/65 leading-relaxed">
          {history.bio}
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-4 font-sans text-sm text-[#f4ecd8]/60 leading-relaxed">
                {history.fullStory.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[9px] tracking-[0.28em] uppercase font-sans transition-colors flex items-center gap-2"
          style={{ color: history.accentColor }}
        >
          {expanded ? 'Show less ↑' : 'Read full account ↓'}
        </button>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {history.themes.map((t) => (
            <span
              key={t}
              className="text-[8px] tracking-[0.15em] uppercase font-sans px-2.5 py-1 border"
              style={{ borderColor: `${history.accentColor}30`, color: history.accentColor }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Research Article Card ──────────────────────────────────────────────────────
function ResearchCard({ article, idx }: { article: typeof researchArticles[number]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="group border border-[#0d2d1e] hover:border-[#1a4d30] p-6 transition-all duration-300 hover:bg-[#0d2d1e]/30"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <span
          className="text-[8px] tracking-[0.22em] uppercase font-sans px-2.5 py-1 shrink-0"
          style={{ backgroundColor: `${article.categoryColor}25`, color: article.categoryColor }}
        >
          {article.category}
        </span>
        <span className="font-sans text-[10px] text-[#f4ecd8]/30">{article.year}</span>
      </div>

      <h3 className="font-serif text-2xl text-[#f4ecd8] leading-tight mb-2 group-hover:text-[#c17f3a] transition-colors duration-300">
        {article.title}
      </h3>

      <p className="font-sans text-[10px] text-[#f4ecd8]/35 mb-4 tracking-[0.1em]">
        {article.authors} — {article.publisher}
      </p>

      <p className="font-sans text-sm text-[#f4ecd8]/55 leading-relaxed mb-5">
        {article.description}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[8px] tracking-[0.12em] uppercase font-sans px-2 py-0.5 bg-[#0d2d1e]/80 text-[#f4ecd8]/40"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-sans transition-colors shrink-0"
          style={{ color: article.categoryColor }}
          onClick={(e) => e.stopPropagation()}
        >
          Source
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Write for Us CTA ─────────────────────────────────────────────────────────
function WriteForUsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 border border-[#3a9e6e]/30 bg-[#0d2d1e]/20 p-8 md:p-12 text-center"
    >
      <div className="w-10 h-10 border border-[#3a9e6e]/40 flex items-center justify-center mx-auto mb-5">
        <PenLine className="w-4.5 h-4.5 text-[#3a9e6e]" />
      </div>
      <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-3">Contribute</p>
      <h3 className="font-serif text-4xl text-[#f4ecd8] mb-4">Write for Us</h3>
      <p className="font-sans text-sm text-[#f4ecd8]/55 leading-relaxed max-w-lg mx-auto mb-8">
        Have you travelled the Konkan coast and want to share your experience? We welcome first-person accounts,
        photography essays, interviews with local communities, and cultural observations. All stories are published
        with proper attribution and reviewed for cultural accuracy.
      </p>
      <a
        href="/contact"
        className="inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-sans text-[#020d08] bg-[#3a9e6e] hover:bg-[#4ab57e] px-8 py-3.5 transition-colors duration-300"
      >
        Submit your story
        <ChevronRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('blogs');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const { hero, stats } = storiesMeta;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'blogs', label: 'Traveler Blogs & Vlogs', icon: <BookOpen className="w-4 h-4" />, count: blogPosts.length },
    { id: 'gallery', label: 'Photo Galleries', icon: <ImageIcon className="w-4 h-4" />, count: galleryImages.length },
    { id: 'interviews', label: 'Oral Histories', icon: <Mic className="w-4 h-4" />, count: oralHistories.length },
    { id: 'research', label: 'Research & Articles', icon: <FileText className="w-4 h-4" />, count: researchArticles.length },
  ];

  const expandedPostData = blogPosts.find((p) => p.id === expandedPost);

  return (
    <div className="min-h-screen bg-[#020d08] selection:bg-[#3a9e6e]/30 selection:text-[#f4ecd8]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <img src={hero.image} alt="Stories & Insights" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020d08]/40 via-transparent to-[#020d08]" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-8 md:px-16 pb-20 w-full">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[10px] tracking-[0.45em] uppercase font-sans mb-4" style={{ color: hero.accentColor }}>
                {hero.eyebrow}
              </p>
              <h1 className="font-serif text-6xl md:text-8xl text-[#f4ecd8] leading-none mb-6">
                {hero.titleLine1}<br />
                <em className="italic" style={{ color: hero.accentColor }}>{hero.titleLine2}</em>
              </h1>
              <p className="font-sans text-sm text-[#f4ecd8]/60 max-w-xl leading-relaxed">{hero.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0d2d1e]">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-6 py-2">
              <p className="font-serif text-3xl text-[#c17f3a] mb-1">{s.value}</p>
              <p className="text-[9px] tracking-[0.28em] uppercase font-sans text-[#f4ecd8]/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="sticky top-[65px] z-30 bg-[#020d08]/95 backdrop-blur-xl border-b border-[#0d2d1e]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-4 text-[10px] tracking-[0.2em] uppercase font-sans whitespace-nowrap
                  border-b-2 transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-[#f4ecd8] border-[#3a9e6e]'
                    : 'text-[#f4ecd8]/35 border-transparent hover:text-[#f4ecd8]/60'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                <span
                  className={`text-[8px] px-1.5 py-0.5 rounded-full font-sans ${activeTab === tab.id ? 'bg-[#3a9e6e]/20 text-[#3a9e6e]' : 'bg-[#f4ecd8]/8 text-[#f4ecd8]/30'}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-8 md:px-16 py-20">
        <AnimatePresence mode="wait">
          {/* Blogs */}
          {activeTab === 'blogs' && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-2">First-person accounts</p>
                <h2 className="font-serif text-4xl text-[#f4ecd8]">Traveler Blogs & Vlogs</h2>
                <p className="mt-3 font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                  Stories written by travellers who have spent time on the Konkan coast — not the curated highlights, but the real encounters, the monsoon detours, the meals that changed everything.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {blogPosts.map((post, idx) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    idx={idx}
                    onExpand={(id) => setExpandedPost(id)}
                  />
                ))}
              </div>

              <WriteForUsCTA />
            </motion.div>
          )}

          {/* Gallery */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-2">Visual archive</p>
                <h2 className="font-serif text-4xl text-[#f4ecd8]">Photo Galleries</h2>
                <p className="mt-3 font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                  Curated images from across the Konkan coast — beaches, forts, temples, food, people, monsoon, and wildlife. Click any image for a full-screen view.
                </p>
              </div>
              <GalleryTab />
            </motion.div>
          )}

          {/* Oral Histories */}
          {activeTab === 'interviews' && (
            <motion.div
              key="interviews"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-16">
                <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-2">Living voices</p>
                <h2 className="font-serif text-4xl text-[#f4ecd8]">Local Interviews & Oral Histories</h2>
                <p className="mt-3 font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                  The Konkan coast is not an abstraction — it is a community of people whose lives are shaped by the sea, the monsoon, and a thousand years of living in one place. These are their accounts.
                </p>
              </div>

              <div className="space-y-20">
                {oralHistories.map((history, idx) => (
                  <OralHistoryCard key={history.id} history={history} idx={idx} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Research */}
          {activeTab === 'research' && (
            <motion.div
              key="research"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <p className="text-[9px] tracking-[0.38em] uppercase font-sans text-[#3a9e6e] mb-2">Scholarly reading</p>
                <h2 className="font-serif text-4xl text-[#f4ecd8]">Research & Articles</h2>
                <p className="mt-3 font-sans text-sm text-[#f4ecd8]/45 max-w-2xl leading-relaxed">
                  For those who want to go deeper — peer-reviewed research, government reports, and scholarly books on Konkan archaeology, history, ecology, and cuisine.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {researchArticles.map((article, idx) => (
                  <ResearchCard key={article.id} article={article} idx={idx} />
                ))}
              </div>

              <div className="mt-12 bg-[#0d2d1e]/30 border border-[#0d2d1e] p-8">
                <div className="flex items-start gap-4">
                  <ExternalLink className="w-5 h-5 text-[#c17f3a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-xl text-[#f4ecd8] mb-2">External Research Archives</h4>
                    <p className="font-sans text-sm text-[#f4ecd8]/50 leading-relaxed mb-4">
                      For comprehensive archival research on the Konkan coast, visit the Archaeological Survey of India's digital library, the Bombay Natural History Society archive, and the Maharashtra State Archives in Pune.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['ASI Digital Library', 'BNHS Archive', 'Maharashtra State Archives'].map((link) => (
                        <span
                          key={link}
                          className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#c17f3a] border border-[#c17f3a]/30 px-3 py-1.5"
                        >
                          {link}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Blog modal */}
      <AnimatePresence>
        {expandedPostData && (
          <BlogModal post={expandedPostData} onClose={() => setExpandedPost(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
