import { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { resolveAssetUrl } from '../utils/routing';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveAssetUrl(src, import.meta.env.BASE_URL);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#1A1C20] text-[#9CA3AF] p-6 text-center ${className}`}
      >
        <Dumbbell className="w-8 h-8 mb-3 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide uppercase">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
