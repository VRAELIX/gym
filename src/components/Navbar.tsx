import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ActionButton } from './ui/ActionButton';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
] as const;

interface NavbarProps {
  onBookNowClick: () => void;
  onNavigateSection?: (href: string) => void;
}

export function Navbar({ onBookNowClick, onNavigateSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (onNavigateSection) {
      onNavigateSection(href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-[#0B0C0E]/92 backdrop-blur-md border-b border-white/10 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.85)]'
          : 'bg-[#0B0C0E]/75 backdrop-blur-sm border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 md:h-[74px] flex items-center justify-between gap-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38] rounded-[4px]"
        >
          {siteConfig.businessName}
          <span className="text-[#D49B38]">.</span>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.02em] text-neutral-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="whitespace-nowrap shrink-0 py-1.5 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#D49B38] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38] rounded-[2px]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <ActionButton
              variant="accent"
              size="sm"
              onClick={() => {
                setIsOpen(false);
                onBookNowClick();
              }}
            >
              <span>Book Now</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </ActionButton>
          </div>

          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/35 rounded-[4px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D49B38]"
          >
            {isOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#0B0C0E]/98 backdrop-blur-md border-t border-white/10 px-5 py-6 flex flex-col gap-1"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="py-3.5 px-2 text-base font-medium text-neutral-200 hover:text-white border-b border-white/[0.07] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <ActionButton
            variant="accent"
            size="md"
            onClick={() => {
              setIsOpen(false);
              onBookNowClick();
            }}
            className="mt-5 w-full"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </ActionButton>
        </nav>
      )}
    </header>
  );
}
