import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, AlertTriangle, Clock, TrendingUp, Package, User, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/glass-card';

const painPoints = [
  {
    icon: TrendingUp,
    title: 'Ценовой хаос',
    text: 'Цены меняются в 1С, но клиент узнает об этом только при выставлении счета. Потеря маржи на каждом звонке.',
  },
  {
    icon: AlertTriangle,
    title: 'Человеческий фактор',
    text: 'Ошибки в артикулах, потерянные заказы в чатах и «забывчивые» менеджеры стоят вам лояльности байеров.',
  },
  {
    icon: Clock,
    title: 'Нет доступа 24/7',
    text: 'Клиент хочет заказать товар в субботу вечером, но вынужден ждать понедельника. Вы отдаёте заказы конкурентам.',
  },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Живые цены',
    text: 'Прямая синхронизация с остатками. Изменили цену — она тут же обновилась у всех байеров.',
  },
  {
    icon: Package,
    title: 'Умная логистика',
    text: 'Автоматический расчёт стоимости доставки в зависимости от веса, объёма и региона.',
  },
  {
    icon: User,
    title: 'Личный кабинет',
    text: 'История заказов, акты сверки и индивидуальные скидки доступны 24/7 без звонков.',
  },
];

export default function ITSolutions() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

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
              B2B Revolution 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 leading-tight title-shadow">
              Запустите собственную B2B-платформу за 14 дней и 700$
            </h1>
            <p className="text-xl text-slate-300 mb-10">
              Ваша прибыль больше не зависит от скорости ответа в WhatsApp. Клиенты видят актуальные остатки и покупают в один клик, пока конкуренты копируют цены из Excel и теряют сделки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="http://оптбазар.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-montserrat text-center"
              >
                Посмотреть демо-платформу
              </a>
              <button onClick={scrollToForm} className="btn-secondary font-montserrat">
                Обсудить проект
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
            Устали от «ценового хаоса»?
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
            Весь ваш склад в кармане клиента
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
                  Запуск за 14 дней — это не метафора
                </h2>
              </div>
              <p className="text-slate-300 text-lg max-w-2xl">
                Мы используем готовое ядро <strong className="text-white">Amix Engine</strong>, которое адаптируем под вашу специфику. Вы получаете работающий инструмент быстрее, чем конкуренты успеют обновить прайс-листы.
              </p>
            </GlassCard>
          </motion.div>
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
              Записаться на аудит процессов
            </h2>
            <p className="text-slate-300 text-center mb-8">
              Перестаньте работать «почтальоном» между Excel и клиентом. Начните масштабировать продажи прямо сейчас.
            </p>

            {submitted ? (
              <GlassCard className="p-8 text-center">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={40} />
                <p className="text-xl font-montserrat font-bold mb-2">Заявка отправлена!</p>
                <p className="text-slate-300">Свяжемся с вами в течение 1 рабочего дня.</p>
              </GlassCard>
            ) : (
              <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Ваше имя *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Компания *</label>
                    <input
                      required
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder="ООО Ромашка"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Телефон / Telegram *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent"
                      placeholder="+7 900 000 00 00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1">Комментарий</label>
                    <textarea
                      rows={3}
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-accent resize-none"
                      placeholder="Расскажите о вашем бизнесе..."
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary font-montserrat">
                    Отправить заявку
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
