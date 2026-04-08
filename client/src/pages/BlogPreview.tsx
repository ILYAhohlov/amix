import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Post = {
  title: string;
  subtitle: string;
  slug: string;
  publishDate: string;
  excerpt: string;
  content: string[];
  contactEmail?: string;
  imageUrl?: string;
  author: string;
  keywords: string[];
};

export default function BlogPreview() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setPost(decoded);
      } catch (error) {
        console.error("Failed to parse preview data:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-slate-400">
        No preview data
      </div>
    );
  }

  const publishDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden font-inter">
      <div className="bg-yellow-900 text-yellow-200 text-center py-2 text-sm font-medium">
        ⚠️ PREVIEW MODE - This post is not published yet
      </div>

      <Navbar isScrolled={isScrolled} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-sm mb-8 text-slate-400">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
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

            <div className="prose prose-invert max-w-none">
              {post.content.map((paragraph, index) => (
                <div
                  key={index}
                  className="text-slate-300 mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
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
                  <span className="text-gray-500">Share on Twitter</span>
                  <span className="text-gray-500">Share on LinkedIn</span>
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
