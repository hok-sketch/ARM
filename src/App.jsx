import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Cpu, Shield, Headphones as HeadphonesIcon, Globe, Server, Rocket } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// --- Brand (Armenia) ---
const BRAND = {
  name: 'NovaHost IT', // TODO: replace with your company name
  phone: '+374 55 123 456', // Armenia dialing code
  email: 'sales@novahost.am', // your domain
  address: 'Երևան, Հայաստան / Yerevan, Armenia',
}

// --- Language switcher config ---
const LANGS = [
  { code: 'hy', label: '🇦🇲', aria: 'Հայերեն' }, // default
  { code: 'ru', label: '🇷🇺', aria: 'Русский' },
  { code: 'en', label: '🇬🇧', aria: 'English' },
]

// --- Translations ---
const dict = {
  hy: {
    nav: { features: 'Հատկություններ', plans: 'Փաթեթներ', managed: 'Կառավարվող IT', contact: 'Կապ' },
    hero: {
      h1_a: 'Բարձր կատարման սերվերներ.',
      h1_b: 'Մասնագիտական կառավարում.',
      p: 'Վարձեք նվիրված կամ վիրտուալ սերվերներ պրեմիում ցանցում, իսկ մեր ինժեներները կպահեն ամեն ինչ արագ, անվտանգ և հասանելի։',
      cta_primary: 'Դիտել փաթեթները',
      cta_secondary: 'Խոսել ինժեների հետ',
      badges: { latency: 'Ուշացում', ddos: 'DDoS', bw: 'Գծային թողունակություն' },
      badgeVals: { latency: '< 1 ms DC', ddos: 'Ակտիվ', bw: '1–10 Gbps' },
      sla: 'SLA',
      support: 'Աջակցություն',
      locations: 'Տեղակայումներ',
      slaVal: '99.95%',
      supportVal: '24/7',
      locationsVal: 'ԵՄ/ԱՄՆ/ՄԵ'
    },
    features: [
      { title: 'Նվիրված և VPS', text: 'Ժամանակակից AMD/Intel, NVMe պահեստ, KVM/IPMI։', icon: 'cpu' },
      { title: 'Անվտանգություն նախ', text: 'DDoS պաշտպանություն, firewall‑ներ, 24/7 மոնித்தորինգ։'.replace('ம','մ') },
      { title: 'Գլոբալ ցանց', text: 'Tier‑1 պրովայդերներ, IPv4/IPv6, 99.95% SLA։', icon: 'globe' },
      { title: 'Կառավարվող աջակցություն', text: 'Պրոակտիվ սպասարկում, պահուստավորում և on‑call ինժեներներ։', icon: 'headset' },
    ],
    plansH: 'Սերվերի փաթեթներ',
    plansSub: 'Թափանցիկ գներ․ ցանկացած պահի թարմացրեք',
    plans: [
      { name: 'VPS Start', specs: ['2 vCPU', '4 GB RAM', '60 GB NVMe', '2 TB Traffic'], ribbon: 'Հանրաճանաչ', price: 12, unit: '/ամիս' },
      { name: 'VPS Pro', specs: ['4 vCPU', '8 GB RAM', '120 GB NVMe', '5 TB Traffic'], ribbon: 'Լավագույն գին', price: 24, unit: '/ամիս' },
      { name: 'Dedicated R7', specs: ['Ryzen 7 5700X', '64 GB RAM', '2×1 TB NVMe', '1 Gbps unmetered'], ribbon: 'Նոր', price: 119, unit: '/ամիս' },
      { name: 'Dedicated EPYC', specs: ['AMD EPYC 7402P', '128 GB RAM', '2×3.84 TB NVMe', '10 Gbps option'], ribbon: null, price: 219, unit: '/ամիս' },
    ],
    plansNote: 'Գները օրինակների համար են․ վերջնական գինը կախված է տվյալատան կենտրոնից և պայմանագրից։',
    managedH: 'Կառավարվող IT և DevOps',
    managedP: 'Թողեք, որ մենք վարենք ենթակառուցվածքը, մինչ դուք կենտրոնանում եք բիզնեսի վրա։',
    managedList: [
      '24/7 մոնիթորինգ և ինսիդենտների արձագանք',
      'ՕՀ թարմացումներ և փաթչինգ',
      'Պահուստավորում և վթարային վերականգնում',
      'Կոնտեյներներ և Kubernetes',
      'CI/CD և IaC',
      'Անվտանգության խստացում և համապատասխանություն',
    ],
    slaCard: { title: 'Տիպային SLA', uptime: 'Անխափանություն', response: 'Արձագանք', backup: 'Պահուստավորում', change: 'Փոփոխությունների պատուհան', uptimeV: '99.95% ամսական', responseV: '15 ր․ (P1)', backupV: 'Ամենօրյա + շաբաթական offsite', changeV: '00:00–06:00 տեղական' },
    contactH: 'Ստանալ անհատական առաջարկ',
    contactP: 'Նկարագրեք ձեր ծանրաբեռնվածությունը և տեղակայումը․ կպատասխանենք մեկ աշխատանքային օրվա ընթացքում։',
    placeholders: { name: 'Ձեր անունը', email: 'Էլ. փոստ', message: 'Ինչ է հարկավոր (CPU/RAM/Storage, թողունակություն, տեղակայումներ, կառավարում, բյուջե)' },
    send: 'Ուղարկել',
    footer: { terms: 'Պայմաններ', privacy: 'Գաղտնիություն', support: 'Աջակցություն' }
  },
  ru: {
    nav: { features: 'Возможности', plans: 'Тарифы', managed: 'Управляемый IT', contact: 'Контакты' },
    hero: {
      h1_a: 'Высокопроизводительные серверы.',
      h1_b: 'Профессиональное сопровождение.',
      p: 'Арендуйте выделенные или виртуальные серверы в премиальной сети, а наши инженеры обеспечат скорость, безопасность и доступность.',
      cta_primary: 'Тарифы',
      cta_secondary: 'Поговорить с инженером',
      badges: { latency: 'Задержка', ddos: 'DDoS', bw: 'Полоса' },
      badgeVals: { latency: '< 1 ms DC', ddos: 'Всегда‑вкл.', bw: '1–10 Gbps' },
      sla: 'SLA',
      support: 'Поддержка',
      locations: 'Локации',
      slaVal: '99.95%',
      supportVal: '24/7',
      locationsVal: 'ЕС/США/БВ'
    },
    features: [
      { title: 'Выделенные и VPS', text: 'Современные AMD/Intel, NVMe, KVM/IPMI.', icon: 'cpu' },
      { title: 'Безопасность', text: 'DDoS‑защита, файрволы, 24/7 мониторинг.', icon: 'shield' },
      { title: 'Глобальная сеть', text: 'Tier‑1, IPv4/IPv6, 99.95% SLA.', icon: 'globe' },
      { title: 'Управляемая поддержка', text: 'Проактивное обслуживание, бэкапы, on‑call.', icon: 'headset' },
    ],
    plansH: 'Тарифы на серверы',
    plansSub: 'Прозрачные цены. Обновление в любой момент',
    plans: [
      { name: 'VPS Start', specs: ['2 vCPU', '4 GB RAM', '60 GB NVMe', '2 TB Traffic'], ribbon: 'Популярно', price: 12, unit: '/мес' },
      { name: 'VPS Pro', specs: ['4 vCPU', '8 GB RAM', '120 GB NVMe', '5 TB Traffic'], ribbon: 'Лучшая цена', price: 24, unit: '/мес' },
      { name: 'Dedicated R7', specs: ['Ryzen 7 5700X', '64 GB RAM', '2×1 TB NVMe', '1 Gbps unmetered'], ribbon: 'Новинка', price: 119, unit: '/мес' },
      { name: 'Dedicated EPYC', specs: ['AMD EPYC 7402P', '128 GB RAM', '2×3.84 TB NVMe', '10 Gbps option'], ribbon: null, price: 219, unit: '/мес' },
    ],
    plansNote: 'Цены примерные. Итог зависит от ДЦ и условий.',
    managedH: 'Управляемый IT и DevOps',
    managedP: 'Мы ведём инфраструктуру, вы — продукт.',
    managedList: [
      '24/7 мониторинг и инциденты',
      'Жизненный цикл ОС и патчи',
      'Резервное копирование и DR',
      'Контейнеры и Kubernetes',
      'CI/CD и IaC',
      'Хардненинг и соответствие',
    ],
    slaCard: { title: 'Типовой SLA', uptime: 'Доступность', response: 'Реакция', backup: 'Бэкапы', change: 'Окно изменений', uptimeV: '99.95% в мес.', responseV: '15 мин (P1)', backupV: 'Ежедневно + weekly offsite', changeV: '00:00–06:00 местн.' },
    contactH: 'Получить индивидуальное предложение',
    contactP: 'Опишите нагрузку и локацию — ответим в течение 1 рабочего дня.',
    placeholders: { name: 'Ваше имя', email: 'Email', message: 'Что нужно (CPU/RAM/Storage, трафик, локации, управление, бюджет)' },
    send: 'Отправить',
    footer: { terms: 'Условия', privacy: 'Конфиденциальность', support: 'Поддержка' }
  },
  en: {
    nav: { features: 'Features', plans: 'Plans', managed: 'Managed IT', contact: 'Contact' },
    hero: {
      h1_a: 'High‑performance servers.',
      h1_b: 'Expertly managed.',
      p: 'Rent dedicated or virtual servers on a premium network. Our engineers keep everything fast, secure and available.',
      cta_primary: 'Browse plans',
      cta_secondary: 'Talk to an engineer',
      badges: { latency: 'Latency', ddos: 'DDoS', bw: 'Bandwidth' },
      badgeVals: { latency: '< 1 ms DC', ddos: 'Always‑on', bw: '1–10 Gbps' },
      sla: 'SLA',
      support: 'Support',
      locations: 'Locations',
      slaVal: '99.95%',
      supportVal: '24/7',
      locationsVal: 'EU/US/ME'
    },
    features: [
      { title: 'Dedicated & VPS', text: 'Modern AMD/Intel, NVMe storage, KVM/IPMI.', icon: 'cpu' },
      { title: 'Security First', text: 'DDoS mitigation, firewalls, 24/7 monitoring.', icon: 'shield' },
      { title: 'Global Network', text: 'Tier‑1 carriers, IPv4/IPv6, 99.95% SLA.', icon: 'globe' },
      { title: 'Managed Support', text: 'Proactive maintenance, backups, on‑call engineers.', icon: 'headset' },
    ],
    plansH: 'Server Plans',
    plansSub: 'Transparent pricing. Upgrade anytime.',
    plans: [
      { name: 'VPS Start', specs: ['2 vCPU', '4 GB RAM', '60 GB NVMe', '2 TB Traffic'], ribbon: 'Popular', price: 12, unit: '/mo' },
      { name: 'VPS Pro', specs: ['4 vCPU', '8 GB RAM', '120 GB NVMe', '5 TB Traffic'], ribbon: 'Best value', price: 24, unit: '/mo' },
      { name: 'Dedicated R7', specs: ['Ryzen 7 5700X', '64 GB RAM', '2×1 TB NVMe', '1 Gbps unmetered'], ribbon: 'New', price: 119, unit: '/mo' },
      { name: 'Dedicated EPYC', specs: ['AMD EPYC 7402P', '128 GB RAM', '2×3.84 TB NVMe', '10 Gbps option'], ribbon: null, price: 219, unit: '/mo' },
    ],
    plansNote: 'Prices are examples. Final quotes depend on DC and term.',
    managedH: 'Managed IT & DevOps',
    managedP: 'We run the stack while you focus on your product.',
    managedList: [
      '24/7 monitoring & incident response',
      'OS lifecycle & patch management',
      'Backup & disaster recovery',
      'Containers & Kubernetes',
      'CI/CD & Infrastructure as Code',
      'Security hardening & compliance',
    ],
    slaCard: { title: 'Typical SLA', uptime: 'Uptime', response: 'Response', backup: 'Backup', change: 'Change window', uptimeV: '99.95% monthly', responseV: '15 min (P1)', backupV: 'Daily + weekly offsite', changeV: '00:00–06:00 local' },
    contactH: 'Get a custom quote',
    contactP: "Tell us about your workload and desired location; we'll reply within one business day.",
    placeholders: { name: 'Your name', email: 'Email', message: 'What do you need? (CPU/RAM/Storage, bandwidth, locations, managed services, budget)' },
    send: 'Send',
    footer: { terms: 'Terms', privacy: 'Privacy', support: 'Support' }
  }
}

function IconSel({ kind }) {
  if (kind === 'cpu') return <Cpu className='w-6 h-6' />
  if (kind === 'shield') return <Shield className='w-6 h-6' />
  if (kind === 'globe') return <Globe className='w-6 h-6' />
  return <HeadphonesIcon className='w-6 h-6' />
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div className='flex items-center gap-1'>
      {LANGS.map((l) => (
        <button
          key={l.code}
          aria-label={l.aria}
          onClick={() => setLang(l.code)}
          className={`w-8 h-6 flex items-center justify-center rounded-md border text-lg ${lang === l.code ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'}`}
        >
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('site.lang')
      if (saved) return saved
    }
    return 'hy' // default Armenian
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang)
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('site.lang', String(lang))
    }
  }, [lang])

  const t = dict[lang]

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '')
    const email = String(formData.get('email') || '')
    const message = String(formData.get('message') || '')
    const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent('Quote request from ' + name)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`
    window.location.href = mailto
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800'>
      {/* Header */}
      <header className='sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Server className='w-6 h-6' />
            <span className='font-bold text-lg'>{BRAND.name}</span>
          </div>
          <nav className='hidden md:flex items-center gap-6 text-sm'>
            <a href='#features' className='hover:underline'>{t.nav.features}</a>
            <a href='#plans' className='hover:underline'>{t.nav.plans}</a>
            <a href='#managed' className='hover:underline'>{t.nav.managed}</a>
            <a href='#contact' className='hover:underline'>{t.nav.contact}</a>
          </nav>
          <div className='flex items-center gap-2'>
            <LangSwitcher lang={lang} setLang={setLang} />
            <a href={`tel:${BRAND.phone}`} className='text-sm hidden sm:block'>{BRAND.phone}</a>
            <Button asChild className='rounded-2xl'>
              <a href='#contact'>{t.nav.contact}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-5xl font-extrabold tracking-tight'
            >
              {t.hero.h1_a} <span className='text-slate-500'>{t.hero.h1_b}</span>
            </motion.h1>
            <p className='mt-4 text-slate-600 max-w-prose'>
              {t.hero.p}
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Button asChild size='lg' className='rounded-2xl'>
                <a href='#plans'><Rocket className='w-4 h-4 mr-2'/>{t.hero.cta_primary}</a>
              </Button>
              <Button asChild variant='outline' size='lg' className='rounded-2xl'>
                <a href='#contact'>{t.hero.cta_secondary}</a>
              </Button>
            </div>
            <div className='mt-6 text-xs text-slate-500'>
              <span className='font-medium'>{t.hero.sla}:</span> {t.hero.slaVal} • <span className='font-medium'>{t.hero.support}:</span> {t.hero.supportVal} • <span className='font-medium'>{t.hero.locations}:</span> {t.hero.locationsVal}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='relative'
          >
            <div className='rounded-3xl shadow-xl border bg-white p-6'>
              <div className='grid grid-cols-3 gap-4 text-center'>
                {[
                  { label: t.hero.badges.latency, value: t.hero.badgeVals.latency },
                  { label: t.hero.badges.ddos, value: t.hero.badgeVals.ddos },
                  { label: t.hero.badges.bw, value: t.hero.badgeVals.bw },
                ].map((item, i) => (
                  <div key={i} className='p-4 rounded-2xl bg-slate-50'>
                    <div className='text-2xl font-bold'>{item.value}</div>
                    <div className='text-xs text-slate-500'>{item.label}</div>
                  </div>
                ))}
              </div>
              <div className='mt-6 text-xs text-slate-500'>
                * Specs depend on plan & location. Ask us for tailored options.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id='features' className='py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-4 gap-6'>
            {t.features.map((f, i) => (
              <Card key={i} className='rounded-3xl'>
                <CardHeader>
                  <div className='w-10 h-10 rounded-xl bg-slate-100 grid place-items-center mb-3'><IconSel kind={f.icon} /></div>
                  <CardTitle className='text-lg'>{f.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-sm text-slate-600'>{f.text}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id='plans' className='py-12 md:py-16 bg-slate-50 border-y'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 text-center'>
            <h2 className='text-3xl font-bold'>{t.plansH}</h2>
            <p className='text-slate-600'>{t.plansSub}</p>
          </div>
          <div className='grid md:grid-cols-4 gap-6'>
            {t.plans.map((p, i) => (
              <Card key={i} className='rounded-3xl flex flex-col'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>{p.name}</CardTitle>
                    {p.ribbon && (
                      <span className='text-[10px] px-2 py-1 rounded-full bg-slate-800 text-white'>
                        {p.ribbon}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className='flex-1 flex flex-col'>
                  <div className='text-3xl font-extrabold'>${p.price}<span className='text-base font-medium text-slate-500'>{p.unit}</span></div>
                  <ul className='mt-4 space-y-2 text-sm'>
                    {p.specs.map((s, idx) => (
                      <li key={idx} className='flex items-start gap-2'><Check className='w-4 h-4 mt-0.5' /> {s}</li>
                    ))}
                  </ul>
                  <Button asChild className='mt-6 rounded-2xl'>
                    <a href='#contact'>{t.nav.contact}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className='text-xs text-slate-500 mt-4'>{t.plansNote}</p>
        </div>
      </section>

      {/* Managed Services */}
      <section id='managed' className='py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-2'>{t.managedH}</h2>
              <p className='text-slate-600'>{t.managedP}</p>
              <ul className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm'>
                {t.managedList.map((m, i) => (
                  <li key={i} className='flex items-start gap-2'><Check className='w-4 h-4 mt-0.5' />{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <Card className='rounded-3xl'>
                <CardHeader>
                  <CardTitle>{t.slaCard.title}</CardTitle>
                </CardHeader>
                <CardContent className='text-sm text-slate-600 space-y-2'>
                  <div className='flex items-center justify-between'><span>{t.slaCard.uptime}</span><span>{t.slaCard.uptimeV}</span></div>
                  <div className='flex items-center justify-between'><span>{t.slaCard.response}</span><span>{t.slaCard.responseV}</span></div>
                  <div className='flex items-center justify-between'><span>{t.slaCard.backup}</span><span>{t.slaCard.backupV}</span></div>
                  <div className='flex items-center justify-between'><span>{t.slaCard.change}</span><span>{t.slaCard.changeV}</span></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id='contact' className='py-12 md:py-16 bg-slate-50 border-t'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold'>{t.contactH}</h2>
            <p className='text-slate-600'>{t.contactP}</p>
          </div>

          <form onSubmit={handleSubmit} className='grid gap-4'>
            <div className='grid md:grid-cols-2 gap-4'>
              <Input required name='name' placeholder={t.placeholders.name} className='rounded-2xl' />
              <Input required type='email' name='email' placeholder={t.placeholders.email} className='rounded-2xl' />
            </div>
            <Textarea required rows={6} name='message' placeholder={t.placeholders.message} className='rounded-2xl' />
            <div className='flex items-center justify-between text-sm text-slate-600'>
              <div>
                <div>{BRAND.email}</div>
                <div>{BRAND.phone}</div>
              </div>
              <Button type='submit' size='lg' className='rounded-2xl'>{t.send}</Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-10 text-center text-xs text-slate-500'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2'>
              <Server className='w-4 h-4' />
              <span>{BRAND.name} © {new Date().getFullYear()}</span>
            </div>
            <div className='flex items-center gap-4'>
              <a href='#' className='hover:underline'>{t.footer.terms}</a>
              <a href='#' className='hover:underline'>{t.footer.privacy}</a>
              <a href='#contact' className='hover:underline'>{t.footer.support}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}