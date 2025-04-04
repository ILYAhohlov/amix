import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import PartnersSection from "../components/PartnersSection";
import AboutSection from "../components/AboutSection";
import SocialMediaSection from "../components/SocialMediaSection";
import ExhibitionsSection from "../components/ExhibitionsSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

interface HomePageProps {
  isScrolled: boolean;
  handleServiceClick: (id: string) => void;
}

export default function HomePage({ isScrolled, handleServiceClick }: HomePageProps) {
  return (
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
      <HeroSection />
      <section id="services">
        <ServicesSection onServiceClick={handleServiceClick} />
      </section>
      <section id="partners">
        <PartnersSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="social-media">
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
      <Footer />
    </div>
  );
} 