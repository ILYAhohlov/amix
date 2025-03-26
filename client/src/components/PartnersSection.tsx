import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";

const partners = [
  "VietBuild Corp",
  "TechViet",
  "ASEAN Trade",
  "Global Logistics",
  "Hanoi Developers",
];

// Варианты анимации для искр
const sparkVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "-70%", opacity: [0, 1, 0], transition: { duration: 0.8, ease: "easeOut" } },
};

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="w-full relative group" // Добавили group для hover-эффектов
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className="rounded-xl p-4 flex items-center justify-center h-24 w-full relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_5px_rgba(12,74,110,0.7)] group-active:shadow-[0_0_30px_10px_rgba(12,74,110,0.9)]"
              >
                <span className="text-white font-montserrat font-medium text-lg z-10">
                  {partner}
                </span>

                {/* Искры */}
                <motion.div
                  className="absolute bottom-0 left-1/4 w-1 h-1 bg-accent rounded-full"
                  variants={sparkVariants}
                  initial="initial"
                  whileHover="animate"
                  whileTap="animate"
                />
                <motion.div
                  className="absolute bottom-0 left-1/2 w-1 h-1 bg-accent rounded-full"
                  variants={sparkVariants}
                  initial="initial"
                  whileHover="animate"
                  whileTap="animate"
                  transition={{ delay: 0.1 }}
                />
                <motion.div
                  className="absolute bottom-0 right-1/4 w-1 h-1 bg-accent rounded-full"
                  variants={sparkVariants}
                  initial="initial"
                  whileHover="animate"
                  whileTap="animate"
                  transition={{ delay: 0.2 }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
