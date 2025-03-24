import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
    <div className="relative min-h-screen overflow-x-hidden font-inter">
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
      <ServicesSection onServiceClick={handleServiceClick} />
      <PartnersSection />
      <AboutSection />
      <SocialMediaSection />
      <ExhibitionsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      
      <AnimatePresence>
        {selectedService && currentService && (
          <ServiceDetail
            service={currentService}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
