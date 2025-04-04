import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import blogPosts from "../data/blogPosts.json";

export default function BlogHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const blogUrl = "https://amix.pro/blog";

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
        <title>Blog - AMIX International Group</title>
        <meta name="description" content="Latest insights and articles from AMIX International Group about global trade, ASEAN opportunities, and supply chain strategies." />
        <meta name="keywords" content="Vietnam, China+1, CPTPP, RCEP, trade, supply chain, ASEAN, blog" />
        <link rel="canonical" href={blogUrl} />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog - AMIX International Group" />
        <meta property="og:description" content="Latest insights and articles from AMIX International Group about global trade, ASEAN opportunities, and supply chain strategies." />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:site_name" content="AMIX International Group" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AMIX International Group Blog",
            "description": "Latest insights and articles from AMIX International Group about global trade, ASEAN opportunities, and supply chain strategies.",
            "url": blogUrl,
            "publisher": {
              "@type": "Organization",
              "name": "AMIX International Group",
              "logo": {
                "@type": "ImageObject",
                "url": "https://amix.pro/logo.png"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar isScrolled={isScrolled} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="text-sm mb-8 text-slate-400">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-8 title-shadow">
                Blog
              </h1>
              <p className="text-xl text-slate-300 mb-12">
                Latest insights and articles from AMIX International Group
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-10">
              {blogPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  className="glass p-8 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group">
                    <h2 className="text-2xl md:text-3xl font-montserrat font-semibold mb-4 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <h3 className="text-xl font-montserrat text-accent mb-4">
                      {post.subtitle}
                    </h3>
                    <p className="text-slate-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-slate-400">
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="text-accent group-hover:underline">Read more</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 