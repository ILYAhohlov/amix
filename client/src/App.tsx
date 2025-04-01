import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ServiceDetail from "./components/ServiceDetail";
import PartnersSection from "./components/PartnersSection";
import AboutSection from "./components/AboutSection";
import SocialMediaSection from "./components/SocialMediaSection";
import ExhibitionsSection from "./components/ExhibitionsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { services } from "./data/serviceData";

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
    document.body.style.overflow = "";
  };

  const currentService = services.find(
    (service) => service.id === selectedService
  );

  return (
    <HelmetProvider>
      <div className="relative min-h-screen overflow-x-hidden font-inter">
        <Helmet>
          <title>AMIX International Group - Your Gateway to ASEAN Opportunities</title>
          <meta name="description" content="AMIX International Group connects global businesses with opportunities across ASEAN countries, specializing in import/export, IT solutions, real estate, and strategic partnerships." />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AMIX International Group",
              "url": "https://amixgroup.com",
              "description": "AMIX International Group connects global businesses with opportunities across ASEAN countries, specializing in import/export, IT solutions, real estate, and strategic partnerships.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hanoi",
                "addressCountry": "Vietnam"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@amixgroup.com"
              }
            })}
          </script>
        </Helmet>
        
        <Navbar isScrolled={isScrolled} />
        <HeroSection /> {/* Hero обычно не требует id, так как это верх страницы */}
        <section id="services">
          <ServicesSection onServiceClick={handleServiceClick} />
        </section>
        <section id="partners">
          <PartnersSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="social-media"> {/* Нет в Navbar, но добавлен для порядка */}
          <SocialMediaSection />
        </section>
        <section id="exhibitions">
          <ExhibitionsSection />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
        <Footer /> {/* Footer обычно не требует id */}
        
        <AnimatePresence>
          {selectedService && currentService && (
            <ServiceDetail
              service={currentService}
              onClose={handleCloseDetail}
            />
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}

export default App;
