import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import ServiceDetail from "./components/ServiceDetail";
import HomePage from "./pages/HomePage";
import BlogHome from "./pages/BlogHome";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/not-found";
import BusinessTours from "./pages/BusinessTours";
import { services } from "./data/serviceData";

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentService = selectedService
    ? services.find((s) => s.id === selectedService)
    : null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServiceClick = (id: string) => {
    setSelectedService(id);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
    document.body.style.overflow = "";
  };

  return (
    <HelmetProvider>
      <div className="relative min-h-screen overflow-x-hidden font-inter">
        <Routes>
          <Route path="/" element={<HomePage 
            isScrolled={isScrolled} 
            handleServiceClick={handleServiceClick} 
          />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/business-tours" element={<BusinessTours />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
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
