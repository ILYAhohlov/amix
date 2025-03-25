import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`glass fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-montserrat font-bold text-white">
            AMIX International Group
          </a>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6">
              <button
                onClick={() => handleNavClick("about")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.about')}
              </button>
              <button
                onClick={() => handleNavClick("services")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.services')}
              </button>
              <button
                onClick={() => handleNavClick("partners")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.partners')}
              </button>
              <button
                onClick={() => handleNavClick("exhibitions")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.exhibitions')}
              </button>
              <button
                onClick={() => handleNavClick("faq")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.faq')}
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="font-montserrat text-white hover:text-accent transition-colors"
              >
                {t('navbar.contact')}
              </button>
            </div>
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden pt-4 pb-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleNavClick("about")}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  About
                </button>
                <button
                  onClick={() => handleNavClick("services")}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  Services
                </button>
                <button
                  onClick={() => handleNavClick("partners")}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  Partners
                </button>
                <button
                  onClick={() => handleNavClick("exhibitions")}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  Exhibitions
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
