import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'accent'
  | 'dark'
  | 'ghostDark'
  | 'outlineLight'
  | 'subtleLight';

export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE_CLASSES =
  'group inline-flex items-center justify-center gap-2.5 font-display font-semibold tracking-[0.08em] uppercase leading-none rounded-[4px] border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-55 disabled:pointer-events-none';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[11px]',
  md: 'h-11 px-5 text-xs',
  lg: 'h-[52px] px-7 text-xs sm:text-[13px]',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  accent:
    'bg-[#D49B38] hover:bg-[#E1AA48] text-[#0B0C0E] border-[#D49B38] hover:border-[#E1AA48] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] hover:shadow-[0_10px_28px_-8px_rgba(212,155,56,0.42)]',
  dark:
    'bg-[#111215] hover:bg-[#22252C] text-white border-[#111215] hover:border-[#22252C] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_10px_24px_-10px_rgba(17,18,21,0.55)]',
  ghostDark:
    'bg-white/[0.04] hover:bg-white/[0.10] text-white border-white/20 hover:border-white/50 backdrop-blur-sm',
  outlineLight:
    'bg-white hover:bg-[#111215] text-[#141517] hover:text-white border-neutral-300 hover:border-[#111215]',
  subtleLight:
    'bg-[#F4F4F1] hover:bg-[#111215] text-[#141517] hover:text-white border-neutral-300/80 hover:border-[#111215]',
};

export function getButtonClassName(
  variant: ButtonVariant = 'dark',
  size: ButtonSize = 'md',
  className = ''
): string {
  return `${BASE_CLASSES} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`.trim();
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ActionButton({
  variant = 'dark',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ActionLink({
  variant = 'outlineLight',
  size = 'md',
  className = '',
  children,
  ...props
}: ActionLinkProps) {
  return (
    <a className={getButtonClassName(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
