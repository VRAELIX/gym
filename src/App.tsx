import { useState } from 'react';
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
import { ProgramModal } from './components/ProgramModal';
import { ServicesSection } from './components/ServicesSection';
import { TransformationsSection } from './components/TransformationsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState<string>(
    siteConfig.services[0].title
  );
  const [activeServiceModal, setActiveServiceModal] =
    useState<ServiceProgram | null>(null);
  const [activeArticleModal, setActiveArticleModal] =
    useState<BlogArticle | null>(null);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookProgram = (programTitle: string) => {
    setSelectedProgram(programTitle);
    scrollToSection('#booking');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-[#141517]">
        <Navbar onBookNowClick={() => scrollToSection('#booking')} />

        <main>
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

        <FloatingWhatsApp />

        <ProgramModal
          service={activeServiceModal}
          onClose={() => setActiveServiceModal(null)}
          onBookProgram={handleBookProgram}
        />

        <ArticleModal
          article={activeArticleModal}
          onClose={() => setActiveArticleModal(null)}
          onBookConsultation={() => scrollToSection('#booking')}
        />
      </div>
    </MotionConfig>
  );
}
