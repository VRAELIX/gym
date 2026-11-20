import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

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
}

export function Navbar({ onBookNowClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled || isOpen
          ? 'bg-[#121316]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#121316]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A] rounded-sm"
        >
          {siteConfig.businessName}
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-neutral-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="whitespace-nowrap shrink-0 py-1 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#E59A1A] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A] rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onBookNowClick();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#121316] bg-[#E59A1A] hover:bg-[#F0A72B] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E59A1A]"
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
          className="lg:hidden bg-[#121316] border-t border-white/10 px-5 py-6 flex flex-col gap-2"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="py-3 px-2 text-base font-medium text-neutral-200 hover:text-white border-b border-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onBookNowClick();
            }}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#121316] bg-[#E59A1A] hover:bg-[#F0A72B] rounded-sm transition-colors cursor-pointer"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </header>
  );
}
