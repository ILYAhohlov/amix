import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import GlassCard from '@/components/ui/glass-card';
import BusinessTourForm from '../components/BusinessTourForm';
import { useTranslation } from "react-i18next";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type PackageType = 'basic' | 'standard' | 'premium';

export default function BusinessTours() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  const handleBookNow = (packageType: PackageType) => {
    setSelectedPackage(packageType);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('businessTours.title')} - AMIX International Group</title>
        <meta name="description" content={t('businessTours.subtitle')} />
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
              {t('businessTours.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {t('businessTours.subtitle')}
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
                  <h3 className="text-2xl font-montserrat font-bold mb-2">{t('businessTours.packages.basic.title')}</h3>
                  <p className="text-xl font-semibold text-accent mb-4">{t('businessTours.packages.basic.price')}</p>
                  <p className="text-slate-300 mb-4">{t('businessTours.packages.basic.description')}</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    {(t('businessTours.packages.basic.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBookNow('basic')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    {t('businessTours.bookNow')}
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
                  <h3 className="text-2xl font-montserrat font-bold mb-2">{t('businessTours.packages.standard.title')}</h3>
                  <p className="text-xl font-semibold text-accent mb-4">{t('businessTours.packages.standard.price')}</p>
                  <p className="text-slate-300 mb-4">{t('businessTours.packages.standard.description')}</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    {(t('businessTours.packages.standard.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBookNow('standard')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    {t('businessTours.bookNow')}
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
                  <h3 className="text-2xl font-montserrat font-bold mb-2">{t('businessTours.packages.premium.title')}</h3>
                  <p className="text-xl font-semibold text-accent mb-4">{t('businessTours.packages.premium.price')}</p>
                  <p className="text-slate-300 mb-4">{t('businessTours.packages.premium.description')}</p>
                  <ul className="text-slate-300 space-y-2 mb-8 flex-grow">
                    {(t('businessTours.packages.premium.features', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleBookNow('premium')}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-md font-medium transition-all"
                  >
                    {t('businessTours.bookNow')}
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
                {t('businessTours.budget.title')}
              </h2>
              <p className="text-xl text-slate-300 mb-6">
                {t('businessTours.budget.subtitle')}
              </p>
              <p className="text-slate-300 max-w-4xl mx-auto mb-12">
                {t('businessTours.budget.description')}
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
                  <h3 className="text-2xl font-montserrat font-bold mb-4">{t('businessTours.budget.packages.basic')}</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.tourCost')}:</span>
                      <span className="font-semibold">$3,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.accommodation.3star')}:</span>
                      <span>~$630</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.dining.budget')}:</span>
                      <span>~$630</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.flights')}:</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.visa')}:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.personalExpenses')}:</span>
                      <span>~$150</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>{t('businessTours.budget.totalBudget')}:</span>
                        <span className="text-accent">$6,885</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($2,295/{t('businessTours.budget.perPerson')})
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
                  <h3 className="text-2xl font-montserrat font-bold mb-4">{t('businessTours.budget.packages.standard')}</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.tourCost')}:</span>
                      <span className="font-semibold">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.accommodation.4star')}:</span>
                      <span>~$1,260</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.dining.midRange')}:</span>
                      <span>~$1,260</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.flights')}:</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.visa')}:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.personalExpenses')}:</span>
                      <span>~$300</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>{t('businessTours.budget.totalBudget')}:</span>
                        <span className="text-accent">$10,295</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($3,432/{t('businessTours.budget.perPerson')})
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
                  <h3 className="text-2xl font-montserrat font-bold mb-4">{t('businessTours.budget.packages.premium')}</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.tourCost')}:</span>
                      <span className="font-semibold">$8,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.accommodation.5star')}:</span>
                      <span>~$3,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.dining.premium')}:</span>
                      <span>~$3,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.flights')}:</span>
                      <span>~$2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.visa')}:</span>
                      <span>~$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('businessTours.budget.personalExpenses')}:</span>
                      <span>~$600</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>{t('businessTours.budget.totalBudget')}:</span>
                        <span className="text-accent">$17,375</span>
                      </div>
                      <div className="text-sm text-slate-400 text-right mt-1">
                        ($5,792/{t('businessTours.budget.perPerson')})
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
                {t('businessTours.budget.note')}{' '}
                <a href="mailto:office@amix.pro" className="text-accent hover:underline">
                  office@amix.pro
                </a>{' '}
                {t('businessTours.budget.contactUs')}
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