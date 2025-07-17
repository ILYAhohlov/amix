import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import { Helmet } from "react-helmet-async";

import { useParams, Link, useNavigate } from "react-router-dom";

import { Mail } from "lucide-react";

import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import blogPosts from "../data/blogPosts.json";

import "./BlogPost.css"; // Добавляем CSS



type BlogPostParams = {

  slug: string;

};



interface BlogPostData {

  id: string;

  title: string;

  subtitle: string;

  slug: string;

  publishDate: string;

  excerpt: string;

  content: string[];

  contactEmail: string;

  imageUrl: string;

  author: string;

  keywords: string[];

}



export default function BlogPost() {

  const [isScrolled, setIsScrolled] = useState(false);

  const { t } = useTranslation();

  const { slug } = useParams<BlogPostParams>();

  const navigate = useNavigate();

  

  const post = blogPosts.find((post: BlogPostData) => post.slug === slug);



  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  

  useEffect(() => {

    if (!post) {

      navigate("/blog");

    }

  }, [post, navigate]);



  useEffect(() => {

    const handleScroll = () => {

      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > 50);

    };



    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);



  if (!post) {

    return <div className="min-h-screen bg-primary"></div>;

  }



  const blogUrl = `https://amix.pro/blog/${post.slug}`;

  const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {

    year: 'numeric',

    month: 'long',

    day: 'numeric'

  });



  return (

    <div className="relative min-h-screen overflow-x-hidden font-inter">

      <Helmet>

        <title>{post.title} - AMIX International Group</title>

        <meta name="description" content={post.excerpt} />

        <meta name="keywords" content={post.keywords.join(', ')} />

        <link rel="canonical" href={blogUrl} />

        <meta property="og:type" content="article" />

        <meta property="og:title" content={post.title} />

        <meta property="og:description" content={post.excerpt} />

        <meta property="og:url" content={blogUrl} />

        <meta property="og:site_name" content="AMIX International Group" />

        <meta property="article:published_time" content={post.publishDate} />

        <meta property="og:image" content={`https://amix.pro${post.imageUrl}`} />

        <meta property="og:image:width" content="1200" />

        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={post.title} />

        <meta name="twitter:description" content={post.excerpt} />

        <meta name="twitter:image" content={`https://amix.pro${post.imageUrl}`} />

        <script type="application/ld+json">

          {JSON.stringify({

            "@context": "https://schema.org",

            "@type": "BlogPosting",

            "headline": `${post.title} - ${post.subtitle}`,

            "description": post.excerpt,

            "image": `https://amix.pro${post.imageUrl}`,

            "datePublished": post.publishDate,

            "author": {

              "@type": "Organization",

              "name": post.author,

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

            "keywords": post.keywords.join(', ')

          })}

        </script>

      </Helmet>



      <Navbar isScrolled={isScrolled} />



      <main className="pt-24 pb-16">

        <div className="container mx-auto px-6">

          <div className="text-sm mb-8 text-slate-400">

            <Link to="/" className="hover:text-accent transition-colors">Home</Link>

            <span className="mx-2">/</span>

            <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>

            <span className="mx-2">/</span>

            <span>{post.title}</span>

          </div>



          <motion.article

            className="max-w-4xl mx-auto"

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6 }}

          >

            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-8 title-shadow">

              {post.title}

            </h1>

            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold mb-6 text-accent">

              {post.subtitle}

            </h2>

            

            <div className="prose prose-invert max-w-none article-content">

              {post.content.map((paragraph, index) => (

                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />

              ))}

            </div>



            {post.contactEmail && (

              <div className="flex items-center space-x-2 text-accent mb-10">

                <Mail className="h-5 w-5" />

                <a href={`mailto:${post.contactEmail}`} className="hover:underline">

                  {post.contactEmail}

                </a>

              </div>

            )}



            {post.imageUrl && (

              <img src={post.imageUrl} alt={post.title} className="mt-8 max-w-full h-auto" />

            )}



            <div className="border-t border-slate-700 pt-6 mt-10 text-sm text-slate-400">

              <div className="flex items-center justify-between flex-wrap gap-4">

                <div>

                  Published: <time dateTime={post.publishDate}>{publishDate}</time>

                </div>

                <div className="flex gap-4">

                  <a 

                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(post.title)}`} 

                    target="_blank"

                    rel="noopener noreferrer"

                    className="hover:text-accent transition-colors"

                  >

                    Share on Twitter

                  </a>

                  <a 

                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}

                    target="_blank"

                    rel="noopener noreferrer" 

                    className="hover:text-accent transition-colors"

                  >

                    Share on LinkedIn

                  </a>

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
