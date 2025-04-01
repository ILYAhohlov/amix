import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="bg-accent rounded-lg absolute -top-4 -left-4 w-full h-full -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="AMIX International Group Headquarters in Hanoi - Your Gateway to ASEAN Business Opportunities" 
                className="rounded-lg w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 title-shadow">{t('about.title')}</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {t('about.paragraph1')}
            </p>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {t('about.paragraph2')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">10+</div>
                <p className="text-slate-300">{t('about.stats.years')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">200+</div>
                <p className="text-slate-300">Successful Projects</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">50+</div>
                <p className="text-slate-300">Global Partners</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="text-accent text-3xl font-montserrat font-bold mb-2">5</div>
                <p className="text-slate-300">ASEAN Countries</p>
              </motion.div>
            </div>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="btn-primary font-montserrat"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
