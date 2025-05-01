import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation();
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      window.scrollTo({
        top: servicesSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToBlog = () => {
    const blogSection = document.getElementById("blog");
    if (blogSection) {
      window.scrollTo({
        top: blogSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen pt-24 flex items-center relative">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 leading-tight title-shadow">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Link 
              to="/blog/why-vietnam" 
              className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-montserrat font-medium transition-colors"
            >
              Why Vietnam
            </Link>
            <button 
              onClick={scrollToServices}
              className="w-full sm:w-auto btn-primary font-montserrat"
            >
              {t('hero.cta')}
            </button>
            <button 
              onClick={scrollToContact}
              className="w-full sm:w-auto btn-secondary font-montserrat"
            >
              {t('about.cta')}
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2 
        }}
      >
        <button onClick={scrollToServices} className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <ChevronDown className="h-8 w-8" />
        </button>
      </motion.div>
    </section>
  );
}
