import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";

const partners = [
  { name: "Vietbuild Corp", logo: "/images/partners/vietbuild-corp.png" },
  { name: "Viettel Post", logo: "/images/partners/viettel-post.png" },
  { name: "Vietnam Post", logo: "/images/partners/vietnam-post.png" },
  { name: "ThangLongCity", logo: "/images/partners/thanglongcity.png" },
  { name: "XUAN MAI", logo: "/images/partners/xuan-mai.png" },
];

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
              className="w-full relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard
                className="rounded-xl p-4 flex items-center justify-start h-24 w-full relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(12,74,110,0.7)] active:shadow-[0_0_30px_10px_rgba(12,74,110,0.9)]"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-12 h-12 rounded-full object-contain mr-4"
                />
                <span className="text-white font-montserrat font-medium text-lg z-10">
                  {partner.name}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
