import { Twitter, Linkedin } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-xl font-montserrat font-bold text-white">
              AMIX International Group
            </a>
            <p className="text-slate-300 mt-2">Your Gateway to ASEAN Opportunities</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <FaTelegram className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-white border-opacity-10 mt-8 pt-8 flex flex-col md:flex-row justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-slate-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} AMIX International Group. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-300 text-sm hover:text-white transition-colors">Sitemap</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
