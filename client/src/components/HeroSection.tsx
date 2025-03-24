import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
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
            Your Gateway to <span className="text-accent">ASEAN</span> Opportunities
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
            AMIX International Group Vietnam LLC connects global businesses with ASEAN opportunities.
            We specialize in import/export, IT solutions, Real Estate and strategic partnerships,
            including Vietbuild Corp. collaborations. Based in Hanoi, we're your gateway to the Vietnamese market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={scrollToServices}
              className="btn-primary font-montserrat"
            >
              Our Services
            </button>
            <button 
              onClick={scrollToContact}
              className="btn-secondary font-montserrat"
            >
              Get in Touch
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
