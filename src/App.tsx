import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  siteConfig,
  type BlogArticle,
  type ServiceProgram,
} from './config/siteConfig';
import { AboutSection } from './components/AboutSection';
import { ArticleModal } from './components/ArticleModal';
import { BlogSection } from './components/BlogSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NotFoundPage } from './components/NotFoundPage';
import { ProgramModal } from './components/ProgramModal';
import { ServicesSection } from './components/ServicesSection';
import { TransformationsSection } from './components/TransformationsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { isHomePath, normalizeBasePath, normalizePathname } from './utils/routing';

const APP_BASE = normalizeBasePath(import.meta.env.BASE_URL);

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePathname(window.location.pathname, APP_BASE)
  );
  const [selectedProgram, setSelectedProgram] = useState<string>(
    siteConfig.services[0].title
  );
  const [activeServiceModal, setActiveServiceModal] =
    useState<ServiceProgram | null>(null);
  const [activeArticleModal, setActiveArticleModal] =
    useState<BlogArticle | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname, APP_BASE));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const scrollToSection = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navigateToHome = useCallback(
    (sectionHash?: string) => {
      if (!isHomePath(currentPath, APP_BASE)) {
        window.history.pushState({}, '', APP_BASE);
        setCurrentPath('/');
        if (sectionHash) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              scrollToSection(sectionHash);
            });
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      if (sectionHash) {
        scrollToSection(sectionHash);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPath, scrollToSection]
  );

  const handleBookProgram = useCallback(
    (programTitle: string) => {
      setSelectedProgram(programTitle);
      navigateToHome('#booking');
    },
    [navigateToHome]
  );

  const showHomePage = isHomePath(currentPath, APP_BASE);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0B0C0E] text-[#111215]">
        <Navbar
          onBookNowClick={() => navigateToHome('#booking')}
          onNavigateSection={(href) => navigateToHome(href)}
        />

        {showHomePage ? (
          <>
            <main className="bg-white">
              <HeroSection
                onExploreClick={() => scrollToSection('#programs')}
                onBookClick={() => scrollToSection('#booking')}
              />

              <ServicesSection
                onSelectProgramToBook={handleBookProgram}
                onLearnMore={(service) => setActiveServiceModal(service)}
              />

              <AboutSection onBookClick={() => scrollToSection('#booking')} />

              <TransformationsSection />

              <WhyChooseUsSection />

              <BlogSection onReadArticle={(article) => setActiveArticleModal(article)} />

              <BookingSection selectedProgram={selectedProgram} />

              <ContactSection />

              <FaqSection />
            </main>

            <Footer
              onBookNowClick={() => scrollToSection('#booking')}
              onSelectProgramToBook={handleBookProgram}
            />
          </>
        ) : (
          <main>
            <NotFoundPage
              missingPath={currentPath}
              onReturnHome={navigateToHome}
            />
          </main>
        )}

        <FloatingWhatsApp />

        <ProgramModal
          service={activeServiceModal}
          onClose={() => setActiveServiceModal(null)}
          onBookProgram={handleBookProgram}
        />

        <ArticleModal
          article={activeArticleModal}
          onClose={() => setActiveArticleModal(null)}
          onBookConsultation={() => navigateToHome('#booking')}
        />
      </div>
    </MotionConfig>
  );
}
