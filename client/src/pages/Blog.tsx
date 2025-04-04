import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blog() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const blogUrl = "https://amix.pro/blog";
  const pageTitle = "Why Vietnam? - AMIX International Group";
  const pageDescription = "Vietnam: A Strategic Partner for Global Trade. Despite recent US tariff changes (46% on Vietnamese imports), Vietnam remains a strong choice for diversifying your supply chain with CPTPP and RCEP benefits.";
  const publishDate = "2025-04-04T10:00:00+07:00"; // Current date

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-inter">
      <Helmet>
        {/* Basic meta tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Vietnam, China+1, CPTPP, RCEP, trade, tariffs, supply chain, ASEAN, import, export, sourcing, logistics" />
        <link rel="canonical" href={blogUrl} />

        {/* Open Graph meta tags for social sharing */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:site_name" content="AMIX International Group" />
        <meta property="article:published_time" content={publishDate} />
        <meta property="og:image" content="https://amix.pro/assets/vietnam-trade.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://amix.pro/assets/vietnam-trade.jpg" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Why Vietnam? Vietnam: A Strategic Partner for Global Trade",
            "description": pageDescription,
            "image": "https://amix.pro/assets/vietnam-trade.jpg",
            "datePublished": publishDate,
            "author": {
              "@type": "Organization",
              "name": "AMIX International Group",
              "url": "https://amix.pro"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AMIX International Group",
              "logo": {
                "@type": "ImageObject",
                "url": "https://amix.pro/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": blogUrl
            },
            "keywords": "Vietnam, China+1, CPTPP, RCEP, trade, tariffs, supply chain, ASEAN"
          })}
        </script>
      </Helmet>

      <Navbar isScrolled={isScrolled} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="text-sm mb-8 text-slate-400">
            <a href="/" className="hover:text-accent transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </div>

          <motion.article
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-8 title-shadow">
              Why Vietnam?
            </h1>
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold mb-6 text-accent">
              Vietnam: A Strategic Partner for Global Trade
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 mb-6 leading-relaxed">
                Despite recent US tariff changes (46% on Vietnamese imports as of April 2025), Vietnam remains a strong choice for diversifying your supply chain. As a member of CPTPP and RCEP, Vietnam offers competitive access to markets like Canada, Australia, and the UK with low or no tariffs.
              </p>
              <p className="text-slate-300 mb-6 leading-relaxed">
                AMIX International Group leverages our expertise in sourcing (with a dedicated China team) and logistics to help you navigate global trade challenges. We also assist US clients in exploring tariff mitigation strategies, such as re-exporting through third countries.
              </p>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Contact us to start importing from Vietnam!
              </p>
            </div>

            <div className="flex items-center space-x-2 text-accent mb-10">
              <Mail className="h-5 w-5" />
              <a href="mailto:amixint@gmail.com" className="hover:underline">
                amixint@gmail.com
              </a>
            </div>

            {/* Article metadata */}
            <div className="border-t border-slate-700 pt-6 mt-10 text-sm text-slate-400">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  Published: <time dateTime={publishDate}>April 4, 2025</time>
                </div>
                <div className="flex gap-4">
                  <a href="https://twitter.com/intent/tweet?url=https://amix.pro/blog" className="hover:text-accent transition-colors">Share on Twitter</a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://amix.pro/blog" className="hover:text-accent transition-colors">Share on LinkedIn</a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
} 