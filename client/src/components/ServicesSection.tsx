import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";
import { services } from "../data/serviceData";
import { ArrowRight, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ServicesSectionProps {
  onServiceClick: (id: string) => void;
}

export default function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
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

        {/* Featured Service - Business Tours */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard 
            hoverEffect={true} 
            className="p-8 cursor-pointer"
            onClick={() => navigate('/business-tours')}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-accent bg-opacity-20 p-6 rounded-full" aria-hidden="true">
                <Plane className="text-white w-12 h-12" aria-label="Business Tours icon" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-montserrat font-semibold mb-4">Business Tours</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  Discover Vietnam's business potential with AMIX Business Tours. Join us for a 7-day journey to Vietbuild, 
                  the gateway to the ASEAN market. Connect with suppliers, explore trade opportunities, and gain expert insights 
                  into Vietnam's economy. Choose from Basic, Standard, or Premium packages tailored to your needs.
                </p>
                <span className="text-accent text-sm uppercase tracking-wider flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Other Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => onServiceClick(service.id)}
            >
              <GlassCard hoverEffect={true} className="p-6 cursor-pointer">
                <div className="bg-accent bg-opacity-20 p-3 rounded-full w-fit mb-4">
                  <service.icon className="text-white w-6 h-6" aria-label={`${t(`services.items.${service.id}.title`, service.title)} icon`} />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{t(`services.items.${service.id}.title`, service.title)}</h3>
                <p className="text-slate-300 mb-4">{t(`services.items.${service.id}.shortDescription`, service.shortDescription)}</p>
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
