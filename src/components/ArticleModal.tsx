import { useEffect } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { type BlogArticle } from '../config/siteConfig';
import { ImageWithFallback } from './ImageWithFallback';
import { ActionButton } from './ui/ActionButton';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onBookConsultation: () => void;
}

export function ArticleModal({
  article,
  onClose,
  onBookConsultation,
}: ArticleModalProps) {
  useEffect(() => {
    if (!article) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-[#111215] border border-neutral-200 rounded-[4px] shadow-2xl">
        <button
          type="button"
          aria-label="Close article reader"
          onClick={onClose}
          className="sticky top-4 float-right mr-4 mt-4 z-10 w-10 h-10 bg-white/95 backdrop-blur-sm border border-neutral-200 hover:border-[#111215] hover:bg-[#111215] hover:text-white rounded-[4px] flex items-center justify-center text-[#111215] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>

        <div className="aspect-[16/8] bg-neutral-100 overflow-hidden">
          <ImageWithFallback
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
          </div>

          <h3
            id="article-modal-title"
            className="mt-3 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]"
          >
            {article.title}
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500">By {article.author}</p>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
            {article.content.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="mt-8 bg-[#F5F5F3] border border-neutral-200 rounded-[4px] p-5">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-neutral-500 mb-3">
              KEY TAKEAWAYS
            </p>
            <ul className="space-y-2">
              {article.keyTakeaways.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[#111215]">
                  <Check
                    className="w-4 h-4 text-[#A8751E] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
            <ActionButton
              variant="dark"
              size="md"
              onClick={() => {
                onClose();
                onBookConsultation();
              }}
            >
              <span>Apply This With a Coach</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </ActionButton>

            <ActionButton
              variant="outlineLight"
              size="md"
              onClick={onClose}
            >
              Back to Journal
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
