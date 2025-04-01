import { motion } from "framer-motion";
import GlassCard from "./ui/glass-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "How can AMIX International Group help my business enter the ASEAN market?",
    answer: "We provide comprehensive market entry services including market research, partner identification, regulatory compliance assistance, and business strategy development. Our local expertise and established networks help streamline your entry into the ASEAN region, particularly Vietnam."
  },
  {
    question: "What types of businesses do you typically work with?",
    answer: "We work with businesses of all sizes across various industries. From startups looking to establish their first international presence to established companies seeking to expand their operations in the ASEAN region, our services are tailored to meet the specific needs of each client."
  },
  {
    question: "Do you offer services for specific industries?",
    answer: "Yes, we have specialized expertise in several key industries including technology, construction materials, manufacturing, consumer goods, and real estate. However, our services can be adapted to most business sectors looking to enter or expand in the ASEAN markets."
  },
  {
    question: "What is the typical timeframe for establishing business operations in Vietnam?",
    answer: "The timeframe varies depending on the nature and scale of your business. Simple market entry strategies can be implemented within 2-3 months, while more complex operations involving manufacturing or significant investments may take 6-12 months. We work with you to establish realistic timelines based on your specific requirements."
  },
  {
    question: "How do your exhibition services work?",
    answer: "Our exhibition services include securing premium booth spaces at major trade shows like Vietbuild, designing and setting up your exhibition presence, arranging logistics, providing translators and local staff, and facilitating business matchmaking during the event. We handle the entire exhibition process so you can focus on making valuable business connections."
  }
];

export default function FAQSection() {
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our services and operations
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
              {faqs.map((faq, index) => (
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
