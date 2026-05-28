"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, Truck, ClipboardCheck, TrendingDown, PackageCheck, Megaphone, Handshake, Building2, Award, Users, ShoppingCart, Percent, CalendarClock, BookOpen, FileText, Smartphone, BarChart3, Bell, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// === ИМПОРТ КОНТЕНТА (редактируй файлы в папке content/) ===
// Чтобы добавить новый продукт или поменять текст — иди в папку content/
// Подробная инструкция лежит в content/README.md
import { products } from '@/content/products';
import { siteTexts } from '@/content/site-texts';
import NewsSection from '@/components/NewsSection';
import { type NewsItem } from '@/content/news';

export default function KonsungRus() {
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', message: ''
  });
  const [consent, setConsent] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Заполните обязательные поля");
      return;
    }

    if (!consent) {
      toast.error("Необходимо дать согласие на обработку персональных данных");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Закрываем форму контактов
        setIsContactModalOpen(false);
        
        // Сбрасываем форму
        setFormData({ name: '', company: '', phone: '', email: '', message: '' });
        setConsent(false);
        
        // Показываем модальное окно с благодарностью
        setIsSuccessModalOpen(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Не удалось отправить заявку. Попробуйте позже.");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Ошибка соединения. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    setConsent(false); // reset consent when opening
  };

  // Real photos from your folder assigned to kit items
  const kitItems = [
    { img: "/images/products/2.JPG", title: "Глюкометр Sejoy BG-701", desc: "Точный прибор с результатом за 5 секунд" },
    { img: "/images/products/IMG_9427.JPG", title: "Футляр", desc: "Удобный защитный кейс для хранения" },
    { img: "/images/products/1.JPG", title: "Прокалыватель", desc: "Эргономичное устройство для забора крови" },
    { img: "/images/products/3.JPG", title: "Ланцеты", desc: "Стерильные одноразовые ланцеты" },
    { img: "/images/products/5.JPG", title: "Тест-полоски Sejoy", desc: "Высокоточные полоски (50 шт.)" },
    { img: "/images/products/4.JPG", title: "Батарейка CR2032", desc: "Долговечное питание" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar - clean like gmate */}
      <nav className="border-b bg-white md:sticky md:top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img src="/images/logo.webp" alt="Консунг Рус" className="h-11 sm:h-14 md:h-16" />
          </Link>
          <div className="hidden md:flex items-center gap-4 text-[13px] font-semibold whitespace-nowrap">
            <a href="#system" className="px-3 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">Система</a>
            <a href="#strips" className="px-3 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">Тест-полоски</a>
            <a href="#company" className="px-3 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">О компании</a>
            <a href="#buy" className="px-3 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">Где купить</a>
            <a href="#partners" className="px-3 py-1.5 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">Для дистрибьюторов</a>
            <div className="relative" onMouseLeave={() => setDocsOpen(false)}>
              <button
                onClick={() => setDocsOpen(!docsOpen)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1 hover:bg-slate-100 hover:text-[var(--primary)] transition-all ${docsOpen ? 'bg-slate-100 text-[var(--primary)]' : ''}`}
                aria-expanded={docsOpen}
              >
                Документы <span className="text-[9px] mt-0.5">▾</span>
              </button>
              {docsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 text-[14px]">
                  <a 
                    href="/pdfs/sejoy-glucometer-instruction.pdf" 
                    target="_blank"
                    className="block px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-[#013CC6] rounded-xl mx-1"
                    onClick={() => setDocsOpen(false)}
                  >
                    📄 Инструкция глюкометры Sejoy BG-710 / BG-710b
                  </a>
                  <a 
                    href="/pdfs/sejoy-test-strips-instruction.pdf" 
                    target="_blank"
                    className="block px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-[#013CC6] rounded-xl mx-1"
                    onClick={() => setDocsOpen(false)}
                  >
                    📄 Инструкция тест-полосок Sejoy
                  </a>
                  <div className="border-t my-1 mx-2"></div>
                  <a 
                    href="#documents" 
                    className="block px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-[#013CC6] font-semibold rounded-xl mx-1"
                    onClick={() => setDocsOpen(false)}
                  >
                    Все документы →
                  </a>
                </div>
              )}
            </div>
            <a href="#contacts" className="px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-[var(--primary)] transition-all">Контакты</a>
          </div>
          <button 
            onClick={openContactModal}
            className="btn-primary px-6 py-2.5 rounded-2xl text-sm font-medium"
          >
            Связаться с нами
          </button>
        </div>
      </nav>

      {/* Mobile Sticky Section Navigation - fixed at the very top on mobile */}
      <div className="md:hidden sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="overflow-x-auto no-scrollbar px-4 py-2.5">
          <div className="flex gap-2 text-sm font-medium whitespace-nowrap">
            <a 
              href="#system" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              Система
            </a>
            <a 
              href="#strips" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              Тест-полоски
            </a>
            <a 
              href="#company" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              О компании
            </a>
            <a 
              href="#partners" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              Дистрибьюторы
            </a>
            <a 
              href="#documents" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              Документы
            </a>
            <a 
              href="#contacts" 
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-[#013CC6] active:text-white transition-colors text-slate-700"
            >
              Контакты
            </a>
          </div>
        </div>
      </div>

      {/* Hero - strong gradient background + gmate-style layout */}
      <section className="bg-gradient-hero text-white pt-[108px] pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-[34px] leading-[1.05] sm:text-5xl md:text-[56px] font-semibold tracking-tighter mb-5 sm:mb-6">
              <span className="flowing-gradient block">{siteTexts.hero.titleLine1}</span>
              <span className="flowing-gradient block">{siteTexts.hero.titleLine2}</span>
              <span className="flowing-gradient block mt-0.5 sm:mt-1 md:mt-1.5">{siteTexts.hero.titleLine3}</span>
            </h1>
            <p className="text-[15px] sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-md">
              {siteTexts.hero.subtitle}
            </p>
            <a href="#system" className="btn-gradient inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg">
              {siteTexts.hero.cta} <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </a>
            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/70">{siteTexts.hero.disclaimer}</p>
          </div>
          <div className="relative">
            <Image 
              src="/images/hero-main.png" 
              alt="Консунг Рус — титульное фото" 
              width={1200}
              height={520}
              className="hero-pulse w-full h-[420px] md:h-[520px] object-cover rounded-3xl shadow-2xl ring-1 ring-white/20" 
              priority
            />
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 hidden md:flex border border-slate-200">
              <img 
                src="/images/logos/rzn.png" 
                alt="Росздравнадзор" 
                className="h-5 w-auto" 
              />
              <span className="text-xs font-medium text-slate-700 tracking-wide">
                Зарегистрировано в Росздравнадзоре
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Система + Комплектация - the most important block like in gmate */}
      <section id="system" className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16 bg-gradient-light-soft border-t">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-4 sm:mb-8">{siteTexts.systems.title}</h2>
          <p className="mt-2 sm:mt-3 text-[15px] sm:text-lg text-slate-600">{siteTexts.systems.subtitle}</p>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-center mb-8">Модели глюкометров</h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Динамические карточки продуктов (глюкометры) */}
          {products
            .filter((p) => p.category === 'glucometer' && p.isFeatured)
            .map((product) => (
              <div key={product.id} className="kit-item border rounded-3xl overflow-hidden bg-white group">
                <div className="aspect-[16/10] bg-slate-100 relative">
                  <img 
                    src={`/images/${product.image}`} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="font-semibold text-2xl sm:text-3xl tracking-tight mb-1.5 sm:mb-2">{product.name}</div>
                  {product.model && (
                    <div className="text-[#013CC6] font-medium mb-3 sm:mb-4 text-sm sm:text-base">{product.model}</div>
                  )}
                  <div className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-[14px] sm:text-[15px]">
                    {product.description}
                  </div>
                  {product.shortFeatures && product.shortFeatures.length > 0 && (
                    <div className="text-xs sm:text-sm text-slate-500">
                      {product.shortFeatures.join(" • ")}
                    </div>
                  )}
                  {product.pdf && (
                    <a 
                      href={`/pdfs/${product.pdf}`} 
                      target="_blank"
                      className="mt-4 inline-flex items-center text-sm font-medium text-[#013CC6] hover:underline"
                    >
                      📄 Скачать инструкцию (PDF)
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Общие технические характеристики двух моделей */}
        <div className="mt-10 sm:mt-16">
          <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-center mb-6 sm:mb-8">Общие технические характеристики</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { label: "Метод измерения", value: "Электрохимический (глюкозодегидрогеназа FAD)" },
              { label: "Время измерения", value: "5 секунд" },
              { label: "Объём образца", value: "0,6 мкл" },
              { label: "Диапазон измерения", value: "0,5 – 33,3 ммоль/л (20 – 600 мг/дл)" },
              { label: "Память", value: "1000 измерений" },
              { label: "Точность", value: "Соответствует ISO 15197:2013" },
              { label: "Кодирование", value: "Не требуется" },
              { label: "Гематокрит", value: "0 – 70%" },
              { label: "Цветовой индикатор", value: "Есть" },
              { label: "Маркер еды", value: "Есть" },
              { label: "Калибровка", value: "По плазме крови" },
              { label: "Питание", value: "х2 ААА" },
            ].map((spec, i) => (
              <div key={i} className="spec-card bg-white border rounded-2xl p-4 sm:p-6">
                <div className="text-sm text-slate-500">{spec.label}</div>
                <div className="font-semibold text-lg mt-1 leading-tight">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Интеграция с GlycoJoy (только для BG-710b) */}
        <div className="mt-8">
          <div className="text-center mb-4">
            <img 
              src="/images/logos/glycojoy.png" 
              alt="GlycoJoy" 
              className="h-24 w-auto mx-auto mb-3" 
            />
            <h4 className="text-2xl font-semibold tracking-tight text-center mb-6">Интеграция с приложением GlycoJoy</h4>
          </div>

          <p className="text-slate-600 text-[15px] mb-5 max-w-3xl">
            Модель <strong>BG-710b</strong> с Bluetooth поддерживает подключение к мобильному приложению <strong>GlycoJoy</strong> для отслеживания динамики, построения графиков и обмена данными с врачом.
          </p>

          <div className="grid md:grid-cols-3 gap-3 text-sm">
            {[
              { num: "1", text: "Скачайте приложение GlycoJoy из App Store или Google Play" },
              { num: "2", text: "Включите Bluetooth и откройте приложение на телефоне" },
              { num: "3", text: "Создайте аккаунт или войдите в существующий" },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-2 bg-white border rounded-xl p-3">
                <div className="w-5 h-5 rounded-full bg-[#013CC6] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.num}
                </div>
                <span className="text-slate-700 leading-snug">{step.text}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Функция доступна только для модели BG-710b</p>
        </div>

      </section>

      {/* Тест-полоски section */}
      <section id="strips" className="bg-gradient-light-soft border-y">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left column: title + description + all specs */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Тест-полоски Sejoy</h2>
              <p className="text-lg text-slate-600 mb-8">
                Высокоточные тест-полоски с технологией GDH-FAD. Совместимы с глюкометрами Sejoy BG-710 и BG-710b.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Метод измерения", value: "Электрохимический (FAD-GDH)" },
                  { label: "Объём образца крови", value: "0,6 мкл" },
                  { label: "Время измерения", value: "5 секунд" },
                  { label: "Диапазон измерения", value: "0,5 – 33,3 ммоль/л" },
                  { label: "Гематокрит", value: "0 – 70%" },
                  { label: "Точность", value: "Соответствует ISO 15197:2013" },
                  { label: "Кодирование", value: "Не требуется" },
                  { label: "Срок годности", value: "24 месяца" },
                  { label: "Условия хранения", value: "+4…+30°C (< 85% влажность)" },
                  { label: "Упаковка", value: "50 полосок в тубусе" },
                ].map((spec, i) => (
                  <div key={i} className="spec-card bg-white border rounded-2xl px-4 py-3">
                    <div className="text-xs text-slate-500">{spec.label}</div>
                    <div className="font-semibold text-base mt-0.5 leading-tight text-slate-900">{spec.value}</div>
                  </div>
                ))}
              </div>

              <a 
                href="/pdfs/sejoy-test-strips-instruction.pdf" 
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:border-[#013CC6] hover:text-[#013CC6] rounded-2xl text-sm font-medium transition-colors"
              >
                📄 Скачать инструкцию по тест-полоскам (PDF)
              </a>
            </div>

            {/* Right column: photo */}
            <div>
              <img 
                src="/images/test-poloski.png" 
                alt="Тест-полоски Sejoy" 
                className="rounded-3xl shadow-lg w-full" 
              />
            </div>
          </div>
        </div>
      </section>



      {/* О компании */}
      <section id="company" className="bg-gradient-light-soft py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-12 gap-x-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">О компании</h2>
            <div className="space-y-5 text-[15px] text-slate-600 leading-relaxed">
              <p>
                ООО «Консунг Рус» — эксклюзивный дистрибьютор в Российской Федерации медицинских изделий 
                бренда <strong>Sejoy</strong> (Sejoy Biomedical Co., Ltd., Китай), а также других ведущих 
                производителей диагностического оборудования.
              </p>
              <p>
                Компания основана в 2020 году. За короткое время мы прошли путь от поставок экспресс-тестов 
                на COVID-19 до комплексных решений премиум-класса для мониторинга здоровья.
              </p>
              <p>
                Мы работаем исключительно с юридическими лицами. Среди наших клиентов — Сбер, Газпром, 
                Московская биржа, РУСАЛ и сотни государственных и частных медицинских организаций по всей России.
              </p>
            </div>
          </div>
          <div className="md:col-span-7 mt-10 md:mt-0 grid sm:grid-cols-2 gap-4">
            {[
              { Icon: Building2, text: "Работаем только с юридическими лицами" },
              { Icon: Truck, text: "Доставка по всей России" },
              { Icon: Award, text: "Более 170 исполненных госконтрактов" },
              { Icon: Users, text: "Клиенты: Сбер, Газпром, Московская биржа" },
            ].map((item, i) => {
              const IconComponent = item.Icon;
              return (
                <div key={i} className="border rounded-2xl p-4 flex items-start gap-3 bg-white hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F4FF] flex-shrink-0 flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-[#013CC6]" strokeWidth={2.25} />
                  </div>
                  <div className="text-base leading-snug text-slate-800 font-semibold pt-0.5">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </section>

      {/* Новости компании */}
      <NewsSection />

      {/* Где купить */}
      <section id="buy" className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16 border-b">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-center mb-6 sm:mb-8">Где купить</h2>

        <div className="text-[15px] sm:text-lg text-slate-600 mb-6 sm:mb-8">
          Мы работаем с аптечными сетями, дистрибьюторами и медицинскими учреждениями по всей России.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
          {/* Wildberries Logo */}
          <a 
            href="https://www.wildberries.ru/catalog/1047876563/detail.aspx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all hover:shadow-md"
          >
            <img 
              src="/images/logos/wildberries.svg" 
              alt="Wildberries" 
              className="h-12 md:h-14 w-auto" 
            />
          </a>

          {/* Ozon Logo */}
          <a 
            href="https://www.ozon.ru/seller/konsung-rus/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl transition-all hover:shadow-md"
          >
            <img 
              src="/images/logos/ozon.jpg" 
              alt="Ozon" 
              className="h-12 md:h-14 w-auto" 
            />
          </a>
        </div>

        <button 
          onClick={openContactModal}
          className="mt-4 btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium text-sm transition-all shadow-sm hover:shadow-md"
        >
          Стать партнёром <ArrowRight size={18} />
        </button>
      </section>

      {/* Для дистрибьюторов */}
      <section id="partners" className="bg-gradient-light border-b py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Для дистрибьюторов</h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Станьте официальным партнёром эксклюзивного дистрибьютора бренда Sejoy в России. 
            Прямые поставки, выгодные условия и полная поддержка вашего бизнеса.
          </p>
        </div>

        {/* Преимущества */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {[
            { Icon: Truck, title: "Прямые поставки", desc: "Эксклюзивный импорт напрямую от производителя Sejoy без посредников" },
            { Icon: ClipboardCheck, title: "Полная регистрация", desc: "Все изделия зарегистрированы в Росздравнадзоре, готовы к продаже в аптеках и участия в тендерах" },
            { Icon: TrendingDown, title: "Выгодные цены", desc: "Конкурентные оптовые цены и гибкая система скидок до 30% в зависимости от объёма" },
            { Icon: PackageCheck, title: "Стабильные поставки", desc: "Постоянный складской запас в Санкт-Петербурге и гарантированные сроки отгрузки" },
            { Icon: Megaphone, title: "Маркетинговая поддержка", desc: "Бесплатные POS-материалы, презентации, обучающие видео и помощь в продвижении" },
            { Icon: Handshake, title: "Персональный сервис", desc: "Закреплённый менеджер, приоритетная обработка заказов и помощь в тендерах" },
          ].map((item, i) => {
            const IconComponent = item.Icon;
            return (
              <div key={i} className="bg-white border rounded-3xl p-5 sm:p-6 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#E8F4FF] flex items-center justify-center mb-4 shadow-sm">
                  <IconComponent className="w-8 h-8 text-[#013CC6]" strokeWidth={2.25} />
                </div>
                <div className="font-semibold text-xl tracking-tight mb-2">{item.title}</div>
                <div className="text-slate-600 leading-relaxed text-[15px]">{item.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Условия сотрудничества */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold tracking-tight text-center mb-6">Условия сотрудничества</h3>
            <p className="text-slate-600 mt-2">Прозрачные и взаимовыгодные условия для серьёзных партнёров</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { Icon: ShoppingCart, title: "Минимальный заказ", value: "от 15 000 ₽ (первый заказ)" },
              { Icon: Percent, title: "Система скидок", value: "до 30% в зависимости от объёма закупки" },
              { Icon: CalendarClock, title: "Отсрочка платежа", value: "Индивидуальное согласование по отсрочке платежа для постоянных клиентов." },
              { Icon: Truck, title: "Доставка", value: "по всей России. Бесплатно при заказе от 250 000 ₽" },
              { Icon: BookOpen, title: "Обучение и поддержка", value: "бесплатно: вебинары, материалы, выезды специалиста" },
              { Icon: FileText, title: "Тендерное сопровождение", value: "полный пакет документов + помощь в подготовке заявок" },
            ].map((cond, i) => {
              const IconComponent = cond.Icon;
              return (
                <div key={i} className="flex gap-4 bg-white border rounded-2xl p-5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F4FF] flex-shrink-0 flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-[#013CC6]" strokeWidth={2.25} />
                  </div>
                  <div>
                    <div className="font-semibold text-lg tracking-tight">{cond.title}</div>
                    <div className="text-slate-600 mt-0.5 leading-snug">{cond.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            Работаем только с юридическими лицами. Индивидуальные условия обсуждаются персонально.
          </div>
        </div>

        <div className="text-center mt-10">
          <button 
            type="button"
            onClick={openContactModal}
            className="btn-gradient inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg cursor-pointer"
          >
            Стать дистрибьютором Sejoy <ArrowRight size={20} />
          </button>
          <p className="mt-3 text-xs text-slate-500">Свяжитесь с нами — обсудим условия под ваш регион и объёмы</p>
        </div>
        </div>
      </section>

      {/* Документы */}
      <section id="documents" className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16 border-b">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Документы</h2>
          <p className="mt-2 text-slate-600">Официальные инструкции по эксплуатации</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a 
            href="/pdfs/sejoy-glucometer-instruction.pdf" 
            target="_blank"
            className="flex items-center gap-4 p-6 border border-slate-200 rounded-2xl hover:border-[var(--primary)] hover:bg-slate-50 transition-all group"
          >
            <div className="text-3xl">📄</div>
            <div>
              <div className="font-semibold group-hover:text-[var(--primary)]">Инструкция по глюкометрам Sejoy BG-710 / BG-710b</div>
              <div className="text-sm text-slate-500">PDF • Полная версия</div>
            </div>
          </a>

          <a 
            href="/pdfs/sejoy-test-strips-instruction.pdf" 
            target="_blank"
            className="flex items-center gap-4 p-6 border border-slate-200 rounded-2xl hover:border-[var(--primary)] hover:bg-slate-50 transition-all group"
          >
            <div className="text-3xl">📄</div>
            <div>
              <div className="font-semibold group-hover:text-[var(--primary)]">Инструкция по тест-полоскам Sejoy</div>
              <div className="text-sm text-slate-500">PDF • Полная версия</div>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Частые вопросы</h2>
        <div className="space-y-6 text-[15px]">
          <div>
            <strong>Сколько времени занимает измерение?</strong><br />
            Результат появляется через 5 секунд.
          </div>
          <div>
            <strong>Почему результаты могут отличаться от лабораторных?</strong><br />
            На показания влияют многие факторы: время забора крови, стресс, физическая нагрузка, приём пищи, лекарства. Для точного сравнения измеряйте в одно и то же время суток.
          </div>
          <div>
            <strong>Сколько можно хранить открытый тубус с полосками?</strong><br />
            После открытия тубуса полоски рекомендуется использовать в течение 3 месяцев (при правильном хранении).
          </div>
          <div>
            <strong>Нужно ли кодировать глюкометр?</strong><br />
            Нет. Глюкометры Sejoy BG-710 и BG-710b используют автоматическое кодирование.
          </div>
          <div>
            <strong>При каких условиях нужно хранить тест-полоски?</strong><br />
            При температуре от +4°C до +30°C и влажности не более 85%. Не храните в холодильнике и не допускайте попадания прямых солнечных лучей.
          </div>
          <div>
            <strong>Работаете ли вы с физическими лицами?</strong><br />
            Нет, мы работаем только с юридическими лицами (аптеки, дистрибьюторы, медицинские учреждения).
          </div>
        </div>
      </section>

      {/* Contact form + footer */}
      {/* Контакты */}
      <section id="contacts" className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Левая колонка — контакты и реквизиты */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-8">Контакты</h2>

              <div className="space-y-6 text-[15px]">
                <div>
                  <div className="text-slate-500 text-sm mb-1">Телефон</div>
                  <a href="tel:+78003331923" className="text-2xl font-semibold tracking-tight hover:text-[var(--primary)]">
                    8 800 333-19-23
                  </a>
                  <div className="text-sm text-slate-500">Бесплатно по России • Пн–Пт 9:30–18:00 (МСК)</div>
                </div>

                <div>
                  <div className="text-slate-500 text-sm mb-1">Email</div>
                  <a href="mailto:info@konsungrus.ru" className="text-xl font-semibold hover:text-[var(--primary)]">
                    info@konsungrus.ru
                  </a>
                </div>

                <div>
                  <div className="text-slate-500 text-sm mb-1">Юридический и фактический адрес</div>
                  <div className="font-medium">
                    190005, г. Санкт-Петербург,<br />
                    наб. Обводного канала, д. 118А, литера Х, офис 306
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-slate-500 text-sm mb-2">Реквизиты компании</div>
                  <div className="space-y-1 text-sm leading-relaxed">
                    <div><strong>Полное наименование:</strong> ООО «Консунг Рус»</div>
                    <div><strong>ИНН:</strong> 7839134720 &nbsp;&nbsp; <strong>КПП:</strong> 783901001</div>
                    <div><strong>ОГРН:</strong> 1207800168564</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка — Яндекс.Карта */}
            <div className="rounded-3xl overflow-hidden border shadow-sm">
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=Санкт-Петербург%2C%20наб.%20Обводного%20канала%2C%20118А&z=17"
                width="100%"
                height="420"
                frameBorder="0"
                allowFullScreen
                title="Карта — наб. Обводного канала, 118А, Санкт-Петербург"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-10 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-y-4">
          <div>
            © {new Date().getFullYear()} ООО «Консунг Рус». Все права защищены.<br />
            ИНН 7839134720 • ОГРН 1207800168564
          </div>
          <div className="md:text-right space-x-4 text-sm">
            <a href="/privacy" className="hover:text-slate-900">Политика конфиденциальности</a>
            <a href="/legal" className="hover:text-slate-900">Пользовательское соглашение</a>
            <a href="#contacts" className="hover:text-slate-900">Контакты</a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-lg max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-5 sm:px-6 py-4 sm:py-5 border-b flex-shrink-0">
              <div className="pr-4">
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Связаться с нами</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Оставьте заявку — мы свяжемся с вами в течение рабочего дня</p>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-2 -mr-2 -mt-1 text-2xl leading-none flex-shrink-0"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            {/* Form - scrollable on mobile */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ФИО */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    ФИО <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#013CC6] transition-colors"
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>

                {/* Компания */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Компания <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#013CC6] transition-colors"
                    placeholder="ООО «Аптека Здоровья»"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Телефон */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#013CC6] transition-colors"
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#013CC6] transition-colors"
                    placeholder="info@company.ru"
                    required
                  />
                </div>
              </div>

              {/* Сообщение (опционально) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Сообщение
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#013CC6] transition-colors resize-y"
                  placeholder="Укажите интересующий товар, регион или вопрос..."
                />
              </div>

              {/* Согласие на обработку ПД (152-ФЗ) */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#013CC6] flex-shrink-0"
                    required
                  />
                  <span className="text-xs leading-snug text-slate-600">
                    Я даю своё согласие на обработку моих персональных данных в соответствии с 
                    Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» 
                    с целью связи и предоставления информации о продукции ООО «Консунг Рус». 
                    С <a href="/privacy" target="_blank" className="underline hover:text-[#013CC6]">Политикой конфиденциальности</a> ознакомлен(а).
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!consent || isSubmitting}
                className="w-full btn-gradient mt-1 sm:mt-2 py-3.5 sm:py-4 rounded-2xl font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </button>

              <p className="text-[10px] text-center text-slate-500 -mt-1 pb-1">
                Мы свяжемся с вами в течение 1 рабочего дня
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно успешной отправки */}
      {isSuccessModalOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight mb-3">Спасибо за обращение!</h3>
              
              <p className="text-slate-600 leading-relaxed">
                В ближайшее время с вами свяжется наш специалист.
              </p>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="mt-7 w-full btn-gradient py-3.5 rounded-2xl font-semibold text-base"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
