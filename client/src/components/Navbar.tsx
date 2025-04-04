import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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

  return (
    <motion.nav
      className={`glass fixed w-full z-50 transition-all duration-300 pointer-events-auto ${
        isScrolled ? "bg-primary shadow-lg" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-montserrat font-bold text-white">
            AMIX International Group
          </Link>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-6">
              <Link to="/blog" className="font-montserrat text-white hover:text-accent transition-colors">
                Blog
              </Link>
              <a href="#services" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.services")}
              </a>
              <a href="#partners" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.partners")}
              </a>
              <a href="#about" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.about")}
              </a>
              <a href="#exhibitions" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.exhibitions")}
              </a>
              <a href="#faq" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.faq")}
              </a>
              <a href="#contact" className="font-montserrat text-white hover:text-accent transition-colors">
                {t("navbar.contact")}
              </a>
            </div>
            <LanguageSelector />
          </div>
        </div>

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
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  Blog
                </Link>
                <a
                  href="#services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.services")}
                </a>
                <a
                  href="#partners"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.partners")}
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.about")}
                </a>
                <a
                  href="#exhibitions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.exhibitions")}
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.faq")}
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-montserrat text-white hover:text-accent transition-colors text-left py-2"
                >
                  {t("navbar.contact")}
                </a>
                <div className="pt-2">
                  <LanguageSelector />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
