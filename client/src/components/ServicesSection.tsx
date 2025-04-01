import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card"; // Изменяем на дефолтный импорт
import { services } from "../data/serviceData";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServicesSectionProps {
  onServiceClick: (id: string) => void;
}

export default function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  const { t } = useTranslation();
  
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
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <GlassCard 
                hoverEffect={true} 
                className="p-6 cursor-pointer"
                onClick={() => onServiceClick(service.id)}
              >
                <div className="bg-accent bg-opacity-20 p-4 rounded-full inline-block mb-4" aria-hidden="true">
                  <service.icon className="text-white w-6 h-6" aria-label={`${service.title} icon`} />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{service.title}</h3>
                <p className="text-slate-300 mb-4">{service.shortDescription}</p>
                <span className="text-accent text-sm uppercase tracking-wider flex items-center">
                  {t('services.learnMore')} <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
