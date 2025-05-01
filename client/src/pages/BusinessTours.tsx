import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import GlassCard from '@/components/ui/glass-card';
import BusinessTourForm from '../components/BusinessTourForm';
import { useTranslation } from "react-i18next";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type PackageType = 'basic' | 'standard' | 'premium';

export default function BusinessTours() {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookNow = (packageType: PackageType) => {
    setSelectedPackage(packageType);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Business Tours - AMIX International Group</title>
        <meta name="description" content="Discover Vietnam's business potential with AMIX Business Tours. Join us for a 7-day journey to explore trade opportunities and gain expert insights into Vietnam's economy." />
      </Helmet>

      <Navbar isScrolled={isScrolled} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 title-shadow">
              AMIX Business Tours: Unlock Vietnam & ASEAN Markets
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join our 7-day business discovery tour to Vietnam. Experience Vietbuild, meet potential partners,
              and explore one of Asia's most dynamic markets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlassCard className="h-full p-6">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-montserrat font-bold mb-2">Basic Package</h3>
                  <p className="text-xl font-semibold text-accent mb-4">$3,000</p>
                  <p className="text-slate-300 mb-4">Perfect for startups and small businesses.</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    <li>✓ Vietbuild access</li>
                    <li>✓ 5 B2B meetings</li>
                    <li>✓ Lectures</li>
                    <li>✓ Group transfers</li>
                    <li>✓ Walking tours</li>
                    <li>✓ Networking</li>
                    <li>✓ Hotel/restaurant recommendations</li>
                  </ul>
                  <button
                    onClick={() => handleBookNow('basic')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Standard Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlassCard className="h-full p-6">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-montserrat font-bold mb-2">Standard Package</h3>
                  <p className="text-xl font-semibold text-accent mb-4">$5,000</p>
                  <p className="text-slate-300 mb-4">Ideal for growing businesses.</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    <li>✓ Vietbuild access</li>
                    <li>✓ 8 B2B meetings</li>
                    <li>✓ Translator</li>
                    <li>✓ Guest speakers</li>
                    <li>✓ Comfortable transfers</li>
                    <li>✓ Guided excursions</li>
                    <li>✓ Exclusive networking</li>
                    <li>✓ Hotel/restaurant support</li>
                  </ul>
                  <button
                    onClick={() => handleBookNow('standard')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <GlassCard className="h-full p-6">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-montserrat font-bold mb-2">Premium Package</h3>
                  <p className="text-xl font-semibold text-accent mb-4">$8,000</p>
                  <p className="text-slate-300 mb-4">Designed for industry leaders.</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    <li>✓ VIP Vietbuild access</li>
                    <li>✓ 10 B2B meetings</li>
                    <li>✓ Personal translator</li>
                    <li>✓ Top experts</li>
                    <li>✓ Luxury transfers</li>
                    <li>✓ Private excursions</li>
                    <li>✓ VIP networking</li>
                    <li>✓ Full concierge service</li>
                  </ul>
                  <button
                    onClick={() => handleBookNow('premium')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 title-shadow">
                Estimated Total Budget
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                Plan Your Investment with AMIX Business Tours
              </p>
              <p className="text-slate-300 max-w-4xl mx-auto mb-12">
                Our tour packages (Basic, Standard, Premium) cover all essential business activities, 
                while accommodation and dining are tailored to your preferences. Below is an estimated 
                total budget for a 7-day tour for a delegation of 2–3 people, including additional expenses. 
                These are approximate costs, and we'll assist you in selecting options that fit your needs and budget.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Basic Package Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <GlassCard className="h-full p-6">
                  <h3 className="text-2xl font-montserrat font-bold mb-4">Basic Package Budget</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>Tour Cost:</span>
                      <span className="font-semibold">$3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation (3* hotel):</span>
                      <span>~$630</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dining (budget):</span>
                      <span>~$630</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flights (round-trip):</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visa:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal Expenses:</span>
                      <span>~$150</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total Estimated Budget:</span>
                        <span className="text-accent">$6,885</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($2,295/person for 3 people)
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Standard Package Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <GlassCard className="h-full p-6">
                  <h3 className="text-2xl font-montserrat font-bold mb-4">Standard Package Budget</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>Tour Cost:</span>
                      <span className="font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation (4* hotel):</span>
                      <span>~$1,260</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dining (mid-range):</span>
                      <span>~$1,260</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flights (round-trip):</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visa:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal Expenses:</span>
                      <span>~$300</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total Estimated Budget:</span>
                        <span className="text-accent">$10,295</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($3,432/person for 3 people)
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Premium Package Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <GlassCard className="h-full p-6">
                  <h3 className="text-2xl font-montserrat font-bold mb-4">Premium Package Budget</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>Tour Cost:</span>
                      <span className="font-semibold">$8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation (5* hotel):</span>
                      <span>~$3,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dining (premium):</span>
                      <span>~$3,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flights (round-trip):</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visa:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Personal Expenses:</span>
                      <span>~$600</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total Estimated Budget:</span>
                        <span className="text-accent">$17,375</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($5,792/person for 3 people)
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-slate-300 text-center mt-8 max-w-4xl mx-auto"
            >
              <p className="italic">
                Note: Costs for accommodation, dining, flights, and personal expenses are estimates based on typical choices. 
                Prices may vary depending on your preferences, season, and flight availability. AMIX offers complimentary 
                assistance in selecting hotels and restaurants to match your budget. Contact us at{' '}
                <a href="mailto:office@amix.pro" className="text-accent hover:underline">
                  office@amix.pro
                </a>{' '}
                for a personalized plan!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <BusinessTourForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}