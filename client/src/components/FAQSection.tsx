import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export default function FAQSection() {
  const { t } = useTranslation();
  
  return (
    <section id="faq" className="py-20 bg-primary bg-opacity-30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("faq.title")}
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("faq.subtitle")}
          </motion.p>
        </div>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {t('faq.questions', { returnObjects: true }).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-white border-opacity-10">
                  <AccordionTrigger className="text-left font-montserrat text-lg py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 py-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
