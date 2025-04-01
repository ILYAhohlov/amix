import { Twitter, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaZhihu } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Company Info */}
          <div>
            <a href="#" className="text-xl font-montserrat font-bold text-white">
              AMIX International Group
            </a>
            <p className="text-slate-300 mt-2 mb-4">Your Gateway to ASEAN Opportunities</p>
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
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <FaZhihu className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Get in Touch */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="text-accent mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-slate-300">Vietnam. Hanoi City. Office A-303, 35 Cu Loc street. Thanh Xuan district.</span>
              </li>
              <li className="flex">
                <Mail className="text-accent mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-slate-300">amix@gmail.com</span>
              </li>
              <li className="flex">
                <Phone className="text-accent mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-slate-300">+84 8 66769601</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-slate-300 hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#exhibitions" className="text-slate-300 hover:text-white transition-colors">Events & Exhibitions</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-300 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Office Hours */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">Office Hours</h3>
            <ul className="space-y-2">
              <li className="text-slate-300">Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li className="text-slate-300">Saturday: 9:00 AM - 12:00 PM</li>
              <li className="text-slate-300">Sunday: Closed</li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row justify-between"
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
