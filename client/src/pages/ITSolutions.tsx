import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, AlertTriangle, Clock, TrendingUp, Package, User, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/glass-card';

export default function ITSolutions() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const painPoints = [
    { icon: TrendingUp, title: t('itSolutions.pain1Title'), text: t('itSolutions.pain1Text') },
    { icon: AlertTriangle, title: t('itSolutions.pain2Title'), text: t('itSolutions.pain2Text') },
    { icon: Clock, title: t('itSolutions.pain3Title'), text: t('itSolutions.pain3Text') },
  ];

  const features = [
    { icon: TrendingUp, title: t('itSolutions.feat1Title'), text: t('itSolutions.feat1Text') },
    { icon: Package, title: t('itSolutions.feat2Title'), text: t('itSolutions.feat2Text') },
    { icon: User, title: t('itSolutions.feat3Title'), text: t('itSolutions.feat3Text') },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/it-solutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  const scrollToForm = () => {
    document.getElementById('it-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>IT-решения для оптовиков — AMIX International Group</title>
        <meta name="description" content="Запустите собственную B2B-платформу за 14 дней. Живые цены, умная логистика, личный кабинет для байеров." />
      </Helmet>

      <Navbar isScrolled={isScrolled} />

      <main className="pt-24 pb-16">

        {/* Hero */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium text-accent mb-4 uppercase tracking-widest">
              {t('itSolutions.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 leading-tight title-shadow">
              {t('itSolutions.title')}
            </h1>
            <p className="text-xl text-slate-300 mb-10">
              {t('itSolutions.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://amix.pro/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-montserrat text-center"
              >
                {t('itSolutions.ctaDemo')}
              </a>
              <button onClick={scrollToForm} className="btn-secondary font-montserrat">
                {t('itSolutions.ctaDiscuss')}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Pain Points */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-montserrat font-bold mb-10 title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('itSolutions.painTitle')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full p-6">
                  <item.icon className="text-red-400 mb-4" size={28} />
                  <h3 className="font-montserrat font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Solution */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-montserrat font-bold mb-10 title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('itSolutions.solutionTitle')}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full p-6">
                  <item.icon className="text-accent mb-4" size={28} />
                  <h3 className="font-montserrat font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Speed Block */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-4">
                <Zap className="text-accent shrink-0 mt-1" size={32} />
                <h2 className="text-3xl font-montserrat font-bold title-shadow">
                  {t('itSolutions.speedTitle')}
                </h2>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl">
                {t('itSolutions.speedText')}
              </p>
            </GlassCard>
          </motion.div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-montserrat font-bold mb-3 title-shadow">{t('itSolutions.pricingTitle')}</h2>
            <p className="text-slate-300">{t('itSolutions.pricingSubtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['starter', 'pro', 'marketplace', 'enterprise'].map((plan, i) => (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className={`p-6 h-full flex flex-col ${plan === 'starter' ? 'border-2 border-accent' : ''}`}>
                  <h3 className="text-xl font-montserrat font-bold mb-2">{t(`itSolutions.${plan}.name`)}</h3>
                  <p className="text-sm text-slate-400 mb-4">{t(`itSolutions.${plan}.desc`)}</p>
                  
                  <ul className="space-y-2 mb-6 flex-grow">
                    {[1, 2, 3, 4, 5, 6, 7].map(num => {
                      const key = `itSolutions.${plan}.feat${num}`;
                      const text = t(key);
                      if (text === key) return null;
                      return (
                        <li key={num} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="text-accent shrink-0 mt-0.5" size={16} />
                          <span className="text-slate-300">{text}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-t border-white/10 pt-4">
                    {plan === 'starter' && t('itSolutions.starter.promo') && (
                      <p className="text-xs text-accent font-bold mb-2">{t('itSolutions.starter.promo')}</p>
                    )}
                    <p className="text-2xl font-bold text-accent mb-1">{t(`itSolutions.${plan}.price`)}</p>
                    <p className="text-xs text-slate-400 mb-2">{t(`itSolutions.${plan}.priceDesc`)}</p>
                    <p className="text-sm font-medium">{t(`itSolutions.${plan}.monthly`)}</p>
                    {plan === 'starter' && t('itSolutions.starter.monthlyDesc') && (
                      <p className="text-xs text-slate-400">{t('itSolutions.starter.monthlyDesc')}</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA + Form */}
        <section id="it-contact" className="container mx-auto px-6 py-16">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-3 title-shadow text-center">
              {t('itSolutions.formTitle')}
            </h2>
            <p className="text-slate-300 text-center mb-8">
              {t('itSolutions.formSubtitle')}
            </p>

            {submitted ? (
              <GlassCard className="p-8 text-center">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={40} />
                <p className="text-xl font-montserrat font-bold mb-2">{t('itSolutions.successTitle')}</p>
                <p className="text-slate-300">{t('itSolutions.successText')}</p>
              </GlassCard>
            ) : (
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">{t('itSolutions.fieldName')} *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder={t('itSolutions.fieldName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">{t('itSolutions.fieldCompany')} *</label>
                    <input
                      required
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder={t('itSolutions.fieldCompany')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">{t('itSolutions.fieldPhone')} *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder="+7 900 000 00 00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">{t('itSolutions.fieldComment')}</label>
                    <textarea
                      rows={3}
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent resize-none"
                      placeholder={t('itSolutions.fieldCommentPlaceholder')}
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary font-montserrat">
                    {t('itSolutions.submit')}
                  </button>
                </form>
              </GlassCard>
            )}
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
