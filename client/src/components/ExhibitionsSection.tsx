import { motion } from "framer-motion";
import { GlassCard } from "./ui/glass-card";
import { Briefcase, Building } from "lucide-react";
import { businessMissions, vietbuildExhibitions } from "../data/exhibitionData";

export default function ExhibitionsSection() {
  return (
    <section id="exhibitions" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Business Events & Exhibitions
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join us at upcoming business missions and the Vietbuild Exhibition.
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Business Missions Schedule */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <h3 className="text-2xl font-montserrat font-semibold mb-6 flex items-center">
                <Briefcase className="mr-3 text-accent h-6 w-6" /> Business Mission Schedule
              </h3>
              
              <div className="space-y-6">
                {businessMissions.map((mission, index) => (
                  <div 
                    key={mission.id} 
                    className={`${index < businessMissions.length - 1 ? 'border-b border-white border-opacity-10 pb-6' : 'pb-2'}`}
                  >
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h4 className="font-montserrat font-medium text-lg">{mission.title}</h4>
                      <span className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm">
                        {mission.date}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4">{mission.location} - {mission.description}</p>
                    <button className="text-accent text-sm uppercase tracking-wider flex items-center hover:underline">
                      Register Interest <span className="ml-2">→</span>
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Vietbuild Exhibition Schedule */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <h3 className="text-2xl font-montserrat font-semibold mb-6 flex items-center">
                <Building className="mr-3 text-accent h-6 w-6" /> Vietbuild Exhibition Schedule
              </h3>
              
              <div className="space-y-6">
                {vietbuildExhibitions.map((exhibition, index) => (
                  <div 
                    key={exhibition.id} 
                    className={`${index < vietbuildExhibitions.length - 1 ? 'border-b border-white border-opacity-10 pb-6' : 'pb-2'}`}
                  >
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h4 className="font-montserrat font-medium text-lg">{exhibition.title}</h4>
                      <span className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm">
                        {exhibition.date}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4">{exhibition.location} - {exhibition.description}</p>
                    <div className="flex space-x-4">
                      <button className="text-white bg-accent hover:bg-opacity-90 px-4 py-2 rounded-md text-sm transition-all">
                        Visit
                      </button>
                      <button className="glass hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md text-sm transition-all">
                        Participate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
