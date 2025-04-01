import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaComments } from "react-icons/fa";

export default function SocialMediaSection() {
  const socialLinks = [
    { id: "twitter", icon: Twitter, url: "https://twitter.com/AMIXVietnam", label: "Twitter" },
    { id: "telegram", icon: FaTelegram, url: "https://t.me/amix_vn", label: "Telegram" },
    { id: "whatsapp", icon: FaWhatsapp, url: "https://wa.me/+84866769601", label: "WhatsApp" },
    { id: "zalo", icon: FaComments, url: "https://zalo.me/+84866769601", label: "Zalo" },
    { id: "linkedin", icon: Linkedin, url: "https://linkedin.com/groups/10072185", label: "LinkedIn" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="social" className="py-16 bg-primary bg-opacity-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Connect with Us
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Follow us on social media to stay updated with our latest news and opportunities.
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-full hover:bg-white hover:bg-opacity-10 transition-all"
              aria-label={social.label}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="h-6 w-6 text-white" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
