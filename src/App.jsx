import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './components/ui/card'
import Button from './components/ui/button'

const BRAND = {
  name: 'SaveAndStore',
  phone: '+374 55 123 456',
  email: 'sales@saveandstore.am',
  address: 'Երևան, Հայաստան / Yerevan, Armenia',
}

const dict = {
  hy: {
    nav: { pricing: 'Տարրિફներ', contact: 'Կոնտակտներ' },
    hero: {
      title: 'Սերվերների և IT ծառայությունների վարձույթ Երևանում',
      desc: 'SaveAndStore — տեղական ընկերություն՝ սեփական հզորություններով Երևանում։ Վստահելի սերվերային վարձույթ, IT աջակցություն և DDoS պաշտպանություն Հայաստանի բիզնեսների համար։',
      cta: 'Ստանալ առաջարկ'
    },
    localStrip: 'Տեղական ընկերություն Երևանում․ սեփական սերվերային հզորություններ և 24/7 աջակցություն',
    aboutH: 'Մեր տվյալային հզորությունները Երևանում',
    aboutP: 'Ապահովում ենք ցածր ուշացում (in‑country), տեղական հաշիվներ AMD‑ով և արագ ինժեներական արձագանք։',
    aboutList: [
      'Սեփական ռեքեր և գծեր տվյալակենտրոնում Երևանում',
      'Էլեկտրամատակարարում N+1 և գեներատորային պահուստ',
      'DDoS պաշտպանություն և մշտական մոնիթորինգ',
      'Անհատական SLA և օն-քոլ 24/7 (hy/ru/en)',
      'Հաշվարկներ ՀՀ դրամով (AMD)'
    ],
    testimonialsH: 'Հաճախորդների կարծիքներ',
    testimonials: [
      { quote: 'Սերվերները Երևանում ապահովում են կայուն ցանց և ցածր ուշացում մեր հաճախորդների համար Երևանում և մարզերում։ Աջակցությունը արագ է և մասնագիտացված։', author: 'Արթուր Մ.', role: 'ՏՏ ղեկավար', company: 'ArmRetail LLC' },
      { quote: 'Անհատական վարձույթ + backup-ը մեզ օգնեցին ապահովել GDPR համապատասխանություն եվրոպական գործընկերների համար։', author: 'Մարիամ Ս.', role: 'Operations Manager', company: 'FinAM' },
      { quote: 'Մեր Kubernetes կլաստերը տեղափոխեցինք SaveAndStore. Մոնիթորինգը և on‑call-ը 24/7 իրականում աշխատում են։', author: 'Հակոբ Ք.', role: 'DevOps Engineer', company: 'SaaS Armenia' }
    ],
    contact: 'Կապ մեզ հետ',
    address: 'Հասցե',
    hours: 'Աշխատանքային ժամեր',
    payments: 'Վճարման եղանակներ',
  },
  ru: {
    nav: { pricing: 'Тарифы', contact: 'Контакты' },
    hero: {
      title: 'Аренда серверов и IT‑услуги в Ереване',
      desc: 'SaveAndStore — локальная компания со своими мощностями в Ереване. Надёжный хостинг, IT‑поддержка и DDoS‑защита для бизнеса Армении.',
      cta: 'Получить предложение'
    },
    localStrip: 'Локальная компания в Ереване: свои мощности и поддержка 24/7',
    aboutH: 'Наши мощности в Ереване',
    aboutP: 'Низкая задержка по стране, локальные счета в AMD и быстрый инженерный ответ.',
    aboutList: [
      'Собственные стойки и магистрали в ДЦ Еревана',
      'Электропитание N+1 и генераторы',
      'DDoS‑защита и постоянный мониторинг',
      'Индивидуальные SLA и on‑call 24/7 (hy/ru/en)',
      'Выставление счетов в AMD'
    ],
    testimonialsH: 'Отзывы клиентов',
    testimonials: [
      { quote: 'Серверы в Ереване дают стабильную сеть и низкую задержку для наших пользователей по стране. Поддержка — быстрая и по делу.', author: 'Артур М.', role: 'Руководитель ИТ', company: 'ArmRetail LLC' },
      { quote: 'Выделенный сервер + резервные копии помогли нам закрыть требования партнеров по GDPR.', author: 'Мариам С.', role: 'Операционный менеджер', company: 'FinAM' },
      { quote: 'Перенесли Kubernetes в SaveAndStore. Мониторинг и on‑call действительно 24/7.', author: 'Акоп К.', role: 'DevOps инженер', company: 'SaaS Armenia' }
    ],
    contact: 'Связаться с нами',
    address: 'Адрес',
    hours: 'Часы работы',
    payments: 'Способы оплаты',
  },
  en: {
    nav: { pricing: 'Pricing', contact: 'Contact' },
    hero: {
      title: 'Server rental and IT services in Yerevan',
      desc: 'SaveAndStore is a local company with its own capacity in Yerevan. Reliable hosting, IT support and DDoS protection for Armenian businesses.',
      cta: 'Get a quote'
    },
    localStrip: 'Local company in Yerevan: own infrastructure & 24/7 support',
    aboutH: 'Our capacity in Yerevan',
    aboutP: 'Low in‑country latency, local invoicing in AMD and rapid engineer response.',
    aboutList: [
      'Own racks and uplinks in a Yerevan DC',
      'N+1 power and generator backup',
      'DDoS protection and continuous monitoring',
      'Custom SLAs and 24/7 on‑call (hy/ru/en)',
      'Local invoicing in AMD'
    ],
    testimonialsH: 'What customers say',
    testimonials: [
      { quote: 'Yerevan‑hosted servers give us stable connectivity and low latency for users across Armenia. Support is fast and expert.', author: 'Arthur M.', role: 'Head of IT', company: 'ArmRetail LLC' },
      { quote: 'A dedicated server plus backups helped us meet GDPR expectations for EU partners.', author: 'Mariam S.', role: 'Operations Manager', company: 'FinAM' },
      { quote: 'We migrated our Kubernetes to SaveAndStore. Monitoring and on‑call are truly 24/7.', author: 'Hakob K.', role: 'DevOps Engineer', company: 'SaaS Armenia' }
    ],
    contact: 'Contact us',
    address: 'Address',
    hours: 'Working hours',
    payments: 'Payment methods',
  }
}

export default function App() {
  const [lang, setLang] = useState('hy')
  const t = dict[lang]

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between min-w-0">
          <div className="font-bold">{BRAND.name}</div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#pricing" className="hover:text-black">{t.nav.pricing}</a>
            <a href="#contact" className="hover:text-black">{t.nav.contact}</a>
          </nav>
          <div className="flex gap-2">
            <button aria-label="Հայերեն" onClick={() => setLang('hy')}>🇦🇲</button>
            <button aria-label="Русский" onClick={() => setLang('ru')}>🇷🇺</button>
            <button aria-label="English" onClick={() => setLang('en')}>🇬🇧</button>
          </div>
        </div>
      </header>

      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">{t.localStrip}</div>
      </div>

      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            {t.hero.title}
          </motion.h1>
          <p className="mt-4 text-slate-600 hyp">{t.hero.desc}</p>
          <div className="mt-6"><a href="#contact"><Button>{t.hero.cta}</Button></a></div>
        </div>
      </section>

      <section id="about" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{t.aboutH}</h2>
              <p className="mt-3 text-slate-600 hyp">{t.aboutP}</p>
              <ul className="mt-4 space-y-2 text-sm hyp">
                {t.aboutList.map((item, i) => (<li key={i} className="flex items-start gap-2">• {item}</li>))}
              </ul>
            </div>
            <div>
              <Card className="p-5 text-sm text-slate-700">
                <div className="flex items-center justify-between py-1"><span>Latency in Armenia</span><span>&lt; 5 ms</span></div>
                <div className="flex items-center justify-between py-1"><span>Power redundancy</span><span>N+1</span></div>
                <div className="flex items-center justify-between py-1"><span>Support</span><span>24/7 on‑call</span></div>
                <div className="flex items-center justify-between py-1"><span>Invoicing</span><span>AMD</span></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">{t.testimonialsH}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.testimonials.map((item, i) => (
              <div key={i} className="border rounded-2xl p-6 bg-slate-50 h-full flex flex-col">
                <p className="text-slate-700 hyp flex-1">“{item.quote}”</p>
                <div className="mt-4 text-sm text-slate-600">
                  <div className="font-semibold">{item.author}</div>
                  <div className="opacity-80">{item.role} • {item.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold">Pricing</h2>
          <p className="mt-2 text-slate-600">Request a tailored quote — per‑project and monthly plans available.</p>
        </div>
      </section>

      <section id="contact" className="p-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-semibold mb-2">{dict[lang].contact}</h3>
          <p>{dict[lang].address}: {BRAND.address}</p>
          <p>Tel: {BRAND.phone}</p>
          <p>Email: {BRAND.email}</p>
          <p>{dict[lang].hours}: 09:00–21:00</p>
          <p>{dict[lang].payments}: Idram / Telcell / AMD Bank Transfer</p>
        </div>
        <div className="flex-1">
          <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=44.48,40.16,44.6,40.22&layer=mapnik" className="w-full h-64 border" />
        </div>
      </section>

      <footer className="mt-auto bg-gray-100 p-4 text-center text-sm safe-bottom">
        © {new Date().getFullYear()} {BRAND.name}. Yerevan, Armenia
      </footer>
    </div>
  )
}
