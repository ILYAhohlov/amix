import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ServiceType } from "../data/serviceData";
import { useTranslation } from "react-i18next";

interface ServiceDetailProps {
  service: ServiceType;
  onClose: () => void;
}

export default function ServiceDetail({ service, onClose }: ServiceDetailProps) {
  const { t } = useTranslation();
  
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  // Получаем список функций из переводов или используем оригинальные данные
  const getFeatures = () => {
    try {
      const translatedFeatures = t(`services.items.${service.id}.features`, { returnObjects: true });
      return Array.isArray(translatedFeatures) ? translatedFeatures : service.features;
    } catch (error) {
      return service.features;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary bg-opacity-90 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Helmet>
        <title>{`${t(`services.items.${service.id}.title`, service.title)} - AMIX International Group`}</title>
        <meta name="description" content={`${t(`services.items.${service.id}.subtitle`, service.subtitle)}. ${t(`services.items.${service.id}.shortDescription`, service.shortDescription)}`} />
      </Helmet>
      
      <motion.div
        className="gradient-marine glass rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={handleContentClick}
      >
        <div className="relative p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                src={service.imageUrl}
                alt={`${t(`services.items.${service.id}.title`, service.title)} - ${t(`services.items.${service.id}.subtitle`, service.subtitle)} | AMIX International Group`}
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-montserrat font-bold mb-3">{t(`services.items.${service.id}.title`, service.title)}</h3>
              <h4 className="text-accent text-lg mb-4">{t(`services.items.${service.id}.subtitle`, service.subtitle)}</h4>
              <p className="text-slate-300 mb-4">{t(`services.items.${service.id}.description`, service.description)}</p>
              <ul className="text-slate-300 mb-6 space-y-2">
                {getFeatures().map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-accent mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="bg-accent hover:bg-opacity-90 text-white py-2 px-5 rounded-md font-medium transition-all"
                >
                  {t('serviceDetail.back', 'Back')}
                </button>
                <button
                  onClick={scrollToContact}
                  className="glass text-white py-2 px-5 rounded-md font-medium inline-block text-center hover:bg-white hover:bg-opacity-20 transition-all"
                >
                  {t('serviceDetail.contactUs', 'Contact Us')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
