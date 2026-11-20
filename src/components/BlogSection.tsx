import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig, type BlogArticle } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';

interface BlogSectionProps {
  onReadArticle: (article: BlogArticle) => void;
}

export function BlogSection({ onReadArticle }: BlogSectionProps) {
  return (
    <section id="blog" className="bg-white py-20 sm:py-28 border-b border-neutral-200">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-neutral-500">
              05 · THE JOURNAL
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141517] leading-[1.05] text-balance">
              A LITTLE KNOWLEDGE.
              <br />
              A STRONGER YOU.
            </h2>
            <span aria-hidden="true" className="block w-12 h-[3px] bg-[#E59A1A] mt-5" />
          </div>

          <button
            type="button"
            onClick={() => onReadArticle(siteConfig.blogArticles[0])}
            className="self-start sm:self-end inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#141517] hover:text-[#2D5580] border-b border-[#141517] hover:border-[#2D5580] pb-1 transition-colors cursor-pointer"
          >
            <span>Read latest guide</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.blogArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden bg-neutral-100 aspect-[16/10]">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <button
                    type="button"
                    aria-label={`Open article: ${article.title}`}
                    onClick={() => onReadArticle(article)}
                    className="absolute bottom-3 right-3 w-9 h-9 bg-white text-[#141517] hover:bg-[#E59A1A] flex items-center justify-center border border-neutral-200 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Unboxed metadata per zero-pill discipline */}
                <div className="mt-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="mt-2.5 font-display text-xl sm:text-2xl font-bold text-[#141517] tracking-tight leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => onReadArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-[#141517] hover:text-[#2D5580] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
                >
                  <span>Read More</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
