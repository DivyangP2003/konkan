import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { useLocation } from 'wouter';
import { blogPosts } from '../data/stories';

export function RecentBlogPosts() {
  const [, navigate] = useLocation();
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 px-6 border-t border-[#0d2d1e]">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#3a9e6e]/60" />
              <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#3a9e6e]">
                From the Field
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f4ecd8] leading-tight">
              Stories from the{' '}
              <span className="italic text-[#c17f3a]">Coast</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/stories')}
            className="self-start md:self-auto flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-sans text-[#3a9e6e] hover:text-[#4ab57e] transition-colors duration-300 border border-[#0d2d1e] px-5 py-2.5 hover:border-[#3a9e6e]"
          >
            All Stories <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.button
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onClick={() => navigate('/stories')}
              className="group text-left w-full border border-[#0d2d1e] hover:border-[#1a4a30] transition-colors duration-500"
            >
              {/* image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020d08]/80 to-transparent" />
                <div
                  className="absolute top-4 left-4 text-[8px] tracking-[0.25em] uppercase font-sans px-2.5 py-1"
                  style={{ backgroundColor: post.categoryColor, color: '#020d08' }}
                >
                  {post.categoryLabel}
                </div>
              </div>

              {/* content */}
              <div className="p-6">
                <h3 className="font-serif text-lg text-[#f4ecd8] leading-snug mb-2 group-hover:text-[#c17f3a] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-sans text-xs text-[#f4ecd8]/55 leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-sans text-[11px] text-[#f4ecd8]/70">{post.author}</div>
                    <div className="font-sans text-[10px] text-[#f4ecd8]/40">{post.date}</div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-sans text-[#f4ecd8]/40">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
