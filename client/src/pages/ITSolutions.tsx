import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, User, BarChart2, Truck, CheckCircle, Code2, Database, Cpu, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/glass-card';

const problems = [
  {
    problem: 'Цены в прайсе устаревают за час',
    solution: 'Онлайн-подтверждение цены продавцом перед оплатой — клиент всегда видит актуальную стоимость',
  },
  {
    problem: 'Логистика считается вручную в мессенджерах',
    solution: 'Менеджер рассчитывает доставку прямо в чеке — вручную или автоматически',
  },
  {
    problem: 'Заявки теряются в WhatsApp и Excel',
    solution: 'Весь цикл сделки от заказа до курьера — в одном окне, с прозрачным трекингом статусов',
  },
];

const roles = [
  {
    icon: ShoppingCart,
    title: 'Покупатель',
    features: ['Каталог с актуальными ценами', 'Оформление заказа онлайн', 'Трекинг статуса доставки', 'История заказов'],
  },
  {
    icon: User,
    title: 'Продавец',
    features: ['Подтверждение цены перед оплатой', 'Управление каталогом и остатками', 'Уведомления о новых заказах', 'Аналитика продаж'],
  },
  {
    icon: BarChart2,
    title: 'Менеджер',
    features: ['Расчёт стоимости доставки в чеке', 'Управление всеми заказами', 'Назначение курьеров', 'Отчёты и дашборд'],
  },
  {
    icon: Truck,
    title: 'Курьер',
    features: ['Список заданий на день', 'Навигация к адресу', 'Подтверждение доставки', 'История выполненных заказов'],
  },
];

const stack = [
  { icon: Code2, name: 'React', desc: 'Быстрый и адаптивный интерфейс' },
  { icon: Database, name: 'Node.js + PostgreSQL', desc: 'Надёжный бэкенд и хранение данных' },
  { icon: Cpu, name: 'AI-разработка', desc: 'Высокая скорость кастомизации под ваш бизнес' },
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
        body: JSON.stringify({ ...form, type: 'it-solutions' }),
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
        <meta name="description" content="B2B-платформа для оптовиков с живым управлением ценами и логистикой. Переносим продажи из Excel в онлайн за 14 дней." />
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
              IT-решения для B2B
            </span>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 leading-tight title-shadow">
              B2B-платформа для оптовиков с живым управлением ценами и логистикой
            </h1>
            <p className="text-xl text-slate-300 mb-4">
              Переносим ваши продажи из Excel и WhatsApp в онлайн за <strong className="text-white">14 дней</strong>.
              Идеально для рынков с высокой волатильностью цен.
            </p>
            <p className="text-slate-400 mb-10">
              Забудьте о WhatsApp-заявках: весь цикл сделки от заказа до курьера — в одном окне.
            </p>
            <button onClick={scrollToForm} className="btn-primary font-montserrat">
              Записаться на демо
            </button>
          </motion.div>
        </section>

        {/* Problem — Solution */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-montserrat font-bold mb-10 title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Проблемы, которые мы решаем
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full p-6">
                  <p className="text-slate-400 text-sm mb-3 line-through">❌ {item.problem}</p>
                  <p className="text-white flex gap-2"><CheckCircle className="text-green-400 shrink-0 mt-0.5" size={18} />{item.solution}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-montserrat font-bold mb-10 title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Роли и дашборды
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full p-6">
                  <role.icon className="text-accent mb-3" size={28} />
                  <h3 className="text-lg font-montserrat font-bold mb-3">{role.title}</h3>
                  <ul className="space-y-2">
                    {role.features.map((f, j) => (
                      <li key={j} className="text-slate-300 text-sm flex gap-2">
                        <span className="text-accent">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-montserrat font-bold mb-10 title-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Технологический стек
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stack.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 flex gap-4 items-start">
                  <item.icon className="text-accent shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-montserrat font-bold">{item.name}</p>
                    <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Case */}
        <section className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 md:p-12">
              <span className="text-sm text-accent uppercase tracking-widest font-medium">Кейс</span>
              <h2 className="text-3xl font-montserrat font-bold mt-3 mb-4 title-shadow">
                оптбазар.рф — работающий маркетплейс
              </h2>
              <p className="text-slate-300 mb-4 max-w-2xl">
                Платформа для оптовой торговли с подтверждением цен, расчётом доставки и ролевыми дашбордами для покупателей, продавцов, менеджеров и курьеров. Запущена и работает в production.
              </p>
              <ul className="text-slate-300 space-y-2 mb-6">
                <li className="flex gap-2"><span className="text-accent">✓</span>Живое управление ценами без перезагрузки прайса</li>
                <li className="flex gap-2"><span className="text-accent">✓</span>Прозрачный трекинг статусов для клиента</li>
                <li className="flex gap-2"><span className="text-accent">✓</span>Полный цикл сделки в одном интерфейсе</li>
              </ul>
              <a
                href="http://оптбазар.рф"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
              >
                Открыть оптбазар.рф <ExternalLink size={16} />
              </a>
            </GlassCard>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section id="it-contact" className="container mx-auto px-6 py-16">
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-montserrat font-bold mb-2 title-shadow text-center">
              Рассчитать стоимость внедрения
            </h2>
            <p className="text-slate-300 text-center mb-8">Оставьте заявку — свяжемся в течение 1 рабочего дня</p>

            {submitted ? (
              <GlassCard className="p-8 text-center">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={40} />
                <p className="text-xl font-montserrat font-bold mb-2">Заявка отправлена!</p>
                <p className="text-slate-300">Мы свяжемся с вами в ближайшее время.</p>
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
