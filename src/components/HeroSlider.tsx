import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Compass, Wrench, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Truck, ShieldCheck } from 'lucide-react';
import { IMAGE_HERO_TIRES, IMAGE_PRODUCT_TIRE } from '../data';

interface HeroSliderProps {
  onFindTiresClick: () => void;
  onBrowseCatalogClick: () => void;
  onFilterTypeClick: (type: string) => void;
}

export default function HeroSlider({
  onFindTiresClick,
  onBrowseCatalogClick,
  onFilterTypeClick,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: 'performance',
      tagIcon: <Flame className="w-3.5 h-3.5 stroke-[2.5]" />,
      tagText: 'Yarış Hamuru ve Yol Hakimiyeti',
      title: 'LASTİKTE',
      titleGradient: 'DÖNÜŞÜM',
      description: 'Mutlak hız limitlerinde hassas kontrolü deneyimleyin. Tire City olarak, dünya standartlarında güvenlik şampiyonları tarafından tasarlanmış, pistte test edilmiş orijinal lastikler sunuyoruz. Yol tutuşunuzu artırın, aracınızın uyumluluğunu kontrol edin ve öncelikli teslimat planlayın.',
      primaryBtnText: 'Hemen Lastik Bul',
      primaryAction: onFindTiresClick,
      secondaryBtnText: 'Kataloğa Göz At',
      secondaryAction: onBrowseCatalogClick,
      image: IMAGE_HERO_TIRES,
      imageClass: 'drop-shadow-[0_20px_50px_rgba(255,106,0,0.18)] duration-500 hover:scale-102',
      badgeIcon: <Wrench className="w-5 h-5 text-[#FF6A00]" />,
      badgeLabel: 'MOBİL MONTAJ HİZMETİ',
      badgeValue: 'Kapınızın Önünde',
      bgGlowColor: 'bg-[#FF6A00]/15',
      stats: [
        { label: 'Tamamlanan Montaj', value: '10B+' },
        { label: 'DOT Onaylı', value: '100%' },
        { label: 'Taksit Seçeneği', value: '0 Faiz', highlight: true }
      ]
    },
    {
      id: 'all-terrain',
      tagIcon: <Compass className="w-3.5 h-3.5 stroke-[2.5]" />,
      tagText: 'Zorlu Yol Koşulları İçin Arazi Lastikleri',
      title: 'HER ENGELLİ',
      titleGradient: 'RUTAYI FETHET',
      description: 'Ağır iş kamyonları, Jeep\'ler ve dinamik off-road maceraları için tasarlanmış yüksek çekiş gücü. Derin çamur, zorlu kayalıklar ve kış fırtınalarına dayanacak şekilde tasarlanmış kademeli oluklar ve 3D kanyon kanalları.',
      primaryBtnText: 'Arazi Lastikleri',
      primaryAction: () => onFilterTypeClick('All-Terrain'),
      secondaryBtnText: 'Ebat Bulucu',
      secondaryAction: onFindTiresClick,
      image: IMAGE_PRODUCT_TIRE,
      imageClass: 'drop-shadow-[0_25px_50px_rgba(34,197,94,0.15)] hover:rotate-6 transition-all duration-700',
      badgeIcon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      badgeLabel: 'GARANTİ GÜVENCESİ',
      badgeValue: '100.000 KM\'ye Kadar',
      bgGlowColor: 'bg-emerald-500/10',
      stats: [
        { label: 'Aşınma Puanı', value: '660 UTQG' },
        { label: 'Kar Sınıfı', value: '3PMSF' },
        { label: 'Patlamaya Dayanıklı', value: '10 Katlı', highlight: true }
      ]
    },
    {
      id: 'installation',
      tagIcon: <Truck className="w-3.5 h-3.5 stroke-[2.5]" />,
      tagText: 'Ayrıcalıklı Mobil Montaj Çözümleri',
      title: 'KAPINIZDA',
      titleGradient: 'LASTİK MONTAJI',
      description: 'Sanayideki kirli bekleme odalarını unutun. Sertifikalı montaj mühendislerimiz, son teknoloji hidrolik balans ekipmanlarını doğrudan evinize veya ofisinizin park yerine getiriyor. 45 dakikadan kısa sürede komple lastik değişimi.',
      primaryBtnText: 'Montaj Randevusu',
      primaryAction: onFindTiresClick,
      secondaryBtnText: 'Nasıl Çalışır?',
      secondaryAction: onBrowseCatalogClick,
      image: IMAGE_HERO_TIRES,
      imageClass: 'drop-shadow-[0_20px_50px_rgba(59,130,246,0.15)] scale-x-[-1]',
      badgeIcon: <Truck className="w-5 h-5 text-blue-400" />,
      badgeLabel: 'AYNI GÜN SEVKİYAT',
      badgeValue: 'Ücretsiz Kargo',
      bgGlowColor: 'bg-blue-500/10',
      stats: [
        { label: 'Ort. Değişim Süresi', value: '45 Dk' },
        { label: 'Hizmet Kapsamı', value: 'Tüm Şehir' },
        { label: 'Mobil Yol Ücreti', value: '0 TL', highlight: true }
      ]
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay effect
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slide = slides[current];

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <section 
      id="hero-slider"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#101012] to-[#0F0F10] dark:from-[#101012] dark:to-[#0F0F10] light:from-white light:to-[#F5F7FA] border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-200/80 py-12 sm:py-20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Ambient Blur Glow behind the current slide */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] ${slide.bgGlowColor} blur-[120px] rounded-full pointer-events-none transition-all duration-700`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[500px]"
          >
            {/* Left Column Slide Information */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              {/* Pulsing Tag Category */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] text-[10px] font-mono font-bold tracking-widest uppercase mb-6 w-fit animate-pulse">
                {slide.tagIcon}
                {slide.tagText}
              </div>

              {/* Slider Main Heading */}
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white dark:text-white light:text-slate-900 leading-[0.95] uppercase tracking-tighter">
                {slide.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#FF6A00] dark:from-white dark:via-white dark:to-[#FF6A00] light:from-slate-900 light:via-slate-800 light:to-[#FF6A00]">
                  {slide.titleGradient}
                </span>
              </h1>
              
              {/* Color Block Line Accent */}
              <div className="h-1.5 w-24 bg-[#FF6A00] my-6" />

              {/* Dynamic Description Text block */}
              <p className="text-gray-300 dark:text-gray-300 light:text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                {slide.description}
              </p>

              {/* Action buttons CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={slide.primaryAction}
                  className="px-6 py-3.5 bg-[#FF6A00] text-black font-display font-black text-xs uppercase tracking-widest rounded hover:bg-[#FF8533] transition-all glow-orange hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  {slide.primaryBtnText}
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
                <button
                  onClick={slide.secondaryAction}
                  className="px-6 py-3.5 bg-transparent text-white border border-gray-600 hover:border-white rounded font-display font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-colors dark:text-white dark:border-gray-600 dark:hover:border-white light:text-slate-800 light:border-slate-300 light:hover:bg-slate-100"
                >
                  {slide.secondaryBtnText}
                </button>
              </div>

              {/* Micro Inline Stats details Grid */}
              <div className="grid grid-cols-3 gap-6 border-t border-[#262629]/60 dark:border-[#262629]/60 light:border-slate-200 pt-6 mt-8 font-mono">
                {slide.stats.map((stat, idx) => (
                  <div key={idx}>
                    <span className={`text-lg font-bold block ${stat.highlight ? 'text-[#FF6A00]' : 'text-white dark:text-white light:text-slate-900'}`}>{stat.value}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-500 light:text-slate-400 uppercase tracking-wider block mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Custom Display Interactive Graphic */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[500px] aspect-video sm:aspect-square bg-[#0c0c0e] dark:bg-[#0c0c0e] light:bg-[#FFFFFF] rounded-2xl border border-[#262629] dark:border-[#262629] light:border-slate-200/80 overflow-hidden shadow-2xl p-6 shadow-[#FF6A00]/5 flex items-center justify-center">
                
                {/* Embedded Spinning tech compass background decoration */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  {slide.id === 'all-terrain' ? (
                    <Compass className="w-80 h-80 animate-[spin_50s_linear_infinite]" />
                  ) : (
                    <div className="w-80 h-80 rounded-full border border-dashed border-[#262629] animate-[spin_60s_linear_infinite]" />
                  )}
                </div>

                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={slide.image}
                    className={`max-h-[300px] sm:max-h-[380px] w-auto object-contain transition-all filter ${slide.imageClass}`}
                    alt={`${slide.title} Display Composition`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating graphic overlay info tag card */}
                <div className="absolute bottom-6 right-6 bg-black/95 dark:bg-black/95 light:bg-white/95 border border-[#262629]/80 dark:border-[#262629]/80 light:border-slate-200/90 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg">
                  <div className="p-1 bg-[#FF6A00]/10 rounded">
                    {slide.badgeIcon}
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-gray-400 dark:text-gray-400 light:text-slate-500 font-mono block tracking-wider uppercase">{slide.badgeLabel}</span>
                    <span className="text-xs font-bold text-white dark:text-white light:text-slate-800 block uppercase tracking-tight">{slide.badgeValue}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Manual Slide Carousel Action Trigger Controls and Dots indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-10 gap-4 border-t border-[#262629]/40 dark:border-[#262629]/40 light:border-slate-200/60 pt-6">
          {/* Slider Pagination Dot Identifiers */}
          <div className="flex items-center gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'w-8 bg-[#FF6A00]' 
                    : 'w-2.5 bg-gray-600 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-500 light:bg-slate-300 light:hover:bg-slate-400'
                }`}
                title={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          {/* Left / Right Arrows navigation button deck */}
          <div className="flex gap-2.5">
            <button
              onClick={handlePrev}
              className="p-2.5 bg-[#1B1B1D] hover:bg-[#262629]/85 text-gray-300 hover:text-white border border-[#262629] rounded-md transition-all active:scale-90 dark:bg-[#1B1B1D] dark:hover:bg-[#262629]/85 dark:text-gray-300 light:bg-white light:border-slate-200 light:text-slate-600 light:hover:bg-slate-100 light:hover:text-slate-900"
              title="Previous Slide"
              type="button"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 bg-[#1B1B1D] hover:bg-[#262629]/85 text-gray-300 hover:text-white border border-[#262629] rounded-md transition-all active:scale-90 dark:bg-[#1B1B1D] dark:hover:bg-[#262629]/85 dark:text-gray-300 light:bg-white light:border-slate-200 light:text-slate-600 light:hover:bg-slate-100 light:hover:text-slate-900"
              title="Next Slide"
              type="button"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
