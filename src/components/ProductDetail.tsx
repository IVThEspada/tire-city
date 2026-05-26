import React, { useState } from 'react';
import { TireProduct, Review } from '../types';
import { 
  Star, 
  ChevronLeft, 
  Wrench, 
  ShieldAlert, 
  Droplet, 
  Gauge, 
  Volume2, 
  Flame, 
  ThumbsUp, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Send 
} from 'lucide-react';

interface ProductDetailProps {
  product: TireProduct;
  onBack: () => void;
  onAddToCart: (product: TireProduct, quantity: number, size: string, withInstallation: boolean) => void;
  onProductClick: (product: TireProduct) => void;
  relatedProducts: TireProduct[];
  onAddReview: (productId: string, newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
  activeCompareIds: string[];
  onToggleCompare: (product: TireProduct) => void;
}

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
  onProductClick,
  relatedProducts,
  onAddReview,
  activeCompareIds,
  onToggleCompare,
}: ProductDetailProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(4); // default to a set of 4 tires
  const [selectedSize, setSelectedSize] = useState(product.size);
  const [includeInstallation, setIncludeInstallation] = useState(true);

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittedReviewSuccess, setSubmittedReviewSuccess] = useState(false);

  // Tire sizes available for selection
  const alternateSizes = [
    product.size,
    `${product.width}/${product.ratio + 5}R${product.diameter}`,
    `${product.width - 10}/${product.ratio + 5}R${product.diameter - 1}`,
  ];

  const handleQtyChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewTitle || !reviewComment) return;

    onAddReview(product.id, {
      user: reviewName,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verified: true,
    });

    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setSubmittedReviewSuccess(true);
    setTimeout(() => setSubmittedReviewSuccess(false), 3500);
  };

  // Math for purchase options
  const unitPrice = product.price;
  const installationFeePerTire = 19.99;
  const itemTotal = unitPrice * quantity;
  const installationTotal = includeInstallation ? installationFeePerTire * quantity : 0;
  const grandTotal = itemTotal + installationTotal;

  // Wet grip mapping to color/grade descriptions
  const getPerformanceRatingColor = (grade: string) => {
    if (grade === 'A' || grade === 'AA') return 'bg-emerald-500';
    if (grade === 'B') return 'bg-amber-400';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Back to Results header button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#1B1B1D] text-gray-300 hover:text-white rounded-md border border-[#262629] mb-8 font-display font-bold text-xs uppercase tracking-wider transition-performance group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kataloğa / Mağazaya Dön
      </button>

      {/* Main product showcase row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#1B1B1D]/40 border border-[#262629]/60 rounded-xl p-6 md:p-10 shadow-xl overflow-hidden mb-12">
        
        {/* Gallery column (Left side) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-[#101012] border border-[#262629] rounded-xl flex items-center justify-center p-12 relative h-96 sm:h-[450px] overflow-hidden group">
            <span className="absolute top-4 left-4 bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-[#FF6A00] text-[10px] font-mono font-black tracking-widest px-3 py-1.5 rounded uppercase">
              DEPO STÜDYO GÖRÜNTÜSÜ
            </span>
            
            <img
              src={product.images[activeImageIdx]}
              alt={`${product.brand} ${product.model}`}
              className="h-72 sm:h-80 w-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnail preview carousel selection */}
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`flex-1 aspect-square bg-[#101012] hover:bg-[#1B1B1D] border rounded-lg p-3 flex items-center justify-center transition-all ${
                  activeImageIdx === idx
                    ? 'border-[#FF6A00] bg-[#FF6A00]/5 scale-102 shadow-md'
                    : 'border-[#262629]'
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail angle"
                  className="h-12 w-auto object-contain opacity-85 hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Warranty card */}
          <div className="bg-orange-500/5 dark:bg-[#1B1B1D]/60 border border-orange-500/20 dark:border-[#FF6A00]/25 rounded-lg p-5 flex items-start gap-4">
            <div className="p-3 bg-[#FF6A00] text-black rounded-md font-sans font-black flex flex-col items-center justify-center shrink-0">
              <span className="text-xl leading-none font-extrabold text-black">
                {product.specs.warranty.split(' ')[0]}
              </span>
              <span className="text-[9px] font-mono leading-none tracking-wider mt-1 uppercase text-black">
                {product.specs.warranty.split(' ').slice(1).join(' ')}
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                DİŞ AŞINMASI KM KORUMA GARANTİSİ
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">
                {product.brand} markasının ulusal aşınma koruması programı kapsamında desteklenmektedir. Ücretsiz yol yardımı ve gelişmiş balans ayarı doğrulamasından yararlanın.
              </p>
            </div>
          </div>
        </div>

        {/* Configurations Column (Right side) */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Stock indicator row */}
            <div className="flex items-center justify-between border-b border-[#262629]/80 pb-3 mb-4">
              <span className="text-xs font-mono font-bold text-[#FF6A00] tracking-widest uppercase flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                {product.type === 'Summer' ? 'YAZ LASTİĞİ' : product.type === 'Winter' ? 'KIŞ LASTİĞİ' : product.type === 'All-Season' ? '4 MEVSİM' : product.type === 'All-Terrain' ? 'ARAZİ / AT' : 'PİST/YARIŞ'} / Yarışa Hazır Bileşen
              </span>

              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                Stokta Var &bull; 24 Saat İçinde Kargoda
              </span>
            </div>

            {/* Brand Title and Model */}
            <span className="text-sm font-mono tracking-[4px] text-gray-400 block uppercase">
              {product.brand} PERFORMANS SERİSİ
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none mt-2 uppercase">
              {product.brand} {product.model}
            </h2>

            {/* Sizes profile */}
            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-gray-400">
              <span className="bg-[#262629] px-2.5 py-1 text-white rounded font-bold">{product.size}</span>
              <span>&bull;</span>
              <span>Hız Endeksi {product.speedRating}</span>
              <span>&bull;</span>
              <span>Yük Sınırı {product.loadIndex}</span>
            </div>

            {/* Review ratings */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex text-[#FF6A00]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#FF6A00]' : 'text-[#262629]'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-mono">{product.rating}</span>
              <span className="text-xs text-gray-400 font-mono">({product.reviewCount} müşteri yorumu)</span>
            </div>

            {/* Price section */}
            <div className="mt-6 p-4 bg-[#0F0F10] border border-[#262629] rounded-lg">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-widest">Lastik Başına Fiyat</span>
                  <span className="text-3xl font-mono font-extrabold text-white">
                    ${unitPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#FF6A00] block uppercase font-mono tracking-wide font-extrabold animate-pulse">
                    ⚡ Hesaplanan Toplam ({quantity} adet)
                  </span>
                  <span className="text-3xl font-mono font-extrabold text-[#FF6A00]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Dynamic discount notice */}
              {quantity >= 4 && (
                <div className="mt-2.5 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 font-bold uppercase rounded font-mono">KUPON GEÇERLİ</span>
                  <span className="text-[11px] text-emerald-400 font-mono">4'lü ve üzeri set alımlarında profesyonel kapıda mobil montaj hizmeti!</span>
                </div>
              )}
            </div>

            {/* Interactive Selectors (Size, Installs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Sizing dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-extrabold">Farklı Ebat Seçin</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-[#101012] text-xs text-white px-4 py-3 border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono rounded"
                >
                  {alternateSizes.map((sz) => (
                    <option key={sz} value={sz}>{sz} (Alternatif uyum)</option>
                  ))}
                </select>
              </div>

              {/* Quantity Changer */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase font-extrabold">Lastik Sayısı</label>
                <div className="flex bg-[#101012] border border-[#262629] rounded overflow-hidden">
                  <button
                    onClick={() => handleQtyChange(quantity - 1)}
                    className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-mono font-bold text-sm text-white flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(quantity + 1)}
                    className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Professional Local Installation Switcher */}
            <div className="mt-5 border border-[#262629] rounded-lg bg-[#101012] p-4 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-[#FF6A00]/10 rounded border border-[#FF6A00]/20 text-[#FF6A00] mt-0.5">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="text-xs font-display font-black text-white uppercase tracking-wide flex items-center gap-1.5">
                    PROFESYONEL SUBAP VE BALANS MONTAJI
                  </h6>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                    Sertifikalı lastik balans ayarı, yeni çinko supap kitleri, eski lastik bertaraf bedeli ve kapıda mobil montaj veya anlaşmalı garaj seçeneğini içerir.
                  </p>
                  <span className="text-[10px] font-mono text-gray-500 block mt-1">
                    Sadece adet başı ${installationFeePerTire} (Toplamda ${installationTotal.toFixed(2)}) &bull; İstediğiniz zaman iptal edin
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIncludeInstallation(!includeInstallation)}
                className={`px-3 py-1.5 rounded font-display font-extrabold text-[10px] tracking-wider uppercase transition-all ${
                  includeInstallation
                    ? 'bg-[#FF6A00] text-black hover:bg-[#FF8533]'
                    : 'bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400'
                }`}
              >
                {includeInstallation ? 'Dahil' : 'Ekle'}
              </button>
            </div>
          </div>

          {/* Checkout Action Button triggers */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onAddToCart(product, quantity, selectedSize, includeInstallation)}
              className="flex-1 py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] transition-all glow-orange hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              SEPETE EKLE (${grandTotal.toFixed(2)})
            </button>
            
            <button
              onClick={() => onToggleCompare(product)}
              className={`px-6 py-4 rounded font-display font-bold text-xs uppercase tracking-wider transition-all border ${
                activeCompareIds.includes(product.id)
                  ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                  : 'border-[#262629] hover:border-gray-500 text-gray-300 hover:text-white'
              }`}
            >
              {activeCompareIds.includes(product.id) ? '✓ Karşılaştırılıyor' : 'Karşılaştır'}
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Dashboard & Performance gauges section */}
      <section className="mb-12">
        <h3 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider border-l-4 border-[#FF6A00] pl-3">
          Lastik Özellikleri &amp; Performans Endeksleri
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Right index ratings */}
          <div className="md:col-span-5 bg-[#1B1B1D]/40 border border-[#262629]/60 rounded-xl p-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-6">
              📊 TEKNİK PROFİL METRİKLERİ
            </h4>
            
            <div className="space-y-4">
              {/* Metric 1 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Droplet className="w-4 h-4 text-cyan-400" /> Islak Zeminde Yol Tutuş ve Frenleme
                  </span>
                  <span className="text-[#FF6A00] font-bold">Derece {product.specs.wetGrip}</span>
                </div>
                <div className="h-2 bg-[#0F0F10] rounded overflow-hidden">
                  <div 
                    className={`h-full ${getPerformanceRatingColor(product.specs.wetGrip)}`} 
                    style={{ width: product.specs.wetGrip === 'A' ? '95%' : product.specs.wetGrip === 'B' ? '75%' : '50%' }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Gauge className="w-4 h-4 text-yellow-500" /> Yakıt Verimliliği / Yuvarlanma Direnci
                  </span>
                  <span className="text-amber-400 font-bold">Derece {product.specs.fuelEfficiency}</span>
                </div>
                <div className="h-2 bg-[#0F0F10] rounded overflow-hidden">
                  <div 
                    className={`h-full ${getPerformanceRatingColor(product.specs.fuelEfficiency)}`} 
                    style={{ width: product.specs.fuelEfficiency === 'B' ? '80%' : product.specs.fuelEfficiency === 'C' ? '60%' : '40%' }}
                  />
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Volume2 className="w-4 h-4 text-emerald-400" /> Dış Sürüş Gürültüsü / Konfor
                  </span>
                  <span className="text-white font-bold">{product.specs.noiseLevel} dB (Mükemmel yalıtım)</span>
                </div>
                <div className="h-2 bg-[#0F0F10] rounded overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400" 
                    style={{ width: `${100 - (product.specs.noiseLevel - 60) * 4}%` }}
                  />
                </div>
              </div>

              {/* Metric 4 */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Flame className="w-4 h-4 text-orange-500" /> Kuru Asfalt Aşınma Tutunma Endeksi
                  </span>
                  <span className="text-white font-bold">UTQG {product.specs.treadwear}</span>
                </div>
                <div className="h-2 bg-[#0F0F10] rounded overflow-hidden">
                  <div 
                    className="h-full bg-red-500" 
                    style={{ width: `${(product.specs.treadwear / 700) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-[#0F0F10] p-3 rounded border border-[#262629] flex items-center gap-2 mt-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] text-gray-400 font-mono">
                Ulaştırma Bakanlığı (DOT) resmi test standartları tarafından doğrulanmış ve onaylanmıştır.
              </span>
            </div>
          </div>

          {/* Grid Spec */}
          <div className="md:col-span-7 bg-[#1B1B1D]/40 border border-[#262629]/60 rounded-xl p-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-4">
              📐 DETAYLI MONTAJ VE COUPOUND YAPILANDIRMASI
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: 'Çekiş Gücü Sınıfı', val: product.specs.traction },
                { title: 'Sıcaklık Sınıfı', val: product.specs.temperature },
                { title: 'Diş Derinliği', val: product.specs.treadDepth },
                { title: 'UTQG Aşınma Puanı', val: product.specs.treadwear },
                { title: 'Runflat Özelliği', val: product.specs.runflat ? 'EVET (Güçlendirilmiş karkas)' : 'Hayır (Standart karkas)' },
                { title: 'Hız Endeksi', val: `${product.speedRating} (300 km/s hıza kadar)` },
                { title: 'Yük Endeksi Sınırı', val: `${product.loadIndex} (${(parseInt(product.loadIndex) * 18).toFixed(0)} lbs)` },
                { title: 'Yanak Kesit Oranı', val: `%${product.ratio}` },
                { title: 'Diş Ömrü Garantisi', val: product.specs.warranty },
              ].map((spec, i) => (
                <div key={i} className="bg-[#101012] p-3 rounded border border-[#262629]/60">
                  <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">{spec.title}</span>
                  <span className="text-xs font-bold text-white font-mono break-words">{spec.val}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              <strong>Profesyonel Güvenlik Uyarısı:</strong> Jant lastik ofsetlerini ve araç yük kapasitelerini her zaman resmi standartlarla uyumlu hale getirin. Lastik ölçülerini varsayılan fabrika özelliklerinin ötesine taşırken, araç stabilite sistemi hesaplamalarını korumak için kalifiye bir teknisyene danışın.
            </p>
          </div>
        </div>
      </section>

      {/* Customer review portal with submission form */}
      <section className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Review list (Left 7 cols) */}
        <div className="lg:col-span-7">
          <h3 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider">
            Doğrulanmış Müşteri Yorumları ({product.reviews.length})
          </h3>

          <div className="space-y-6">
            {product.reviews.length === 0 ? (
              <div className="bg-[#1B1B1D]/20 border border-dashed border-[#262629] rounded p-12 text-center text-gray-500 font-mono text-sm">
                Henüz doğrulanmış kullanıcı yorumu bulunmamaktadır. İlk kuran ve yorumlayan siz olun!
              </div>
            ) : (
              product.reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-[#1B1B1D]/40 border border-[#262629]/50 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-sm text-white">
                        {rev.user}
                      </span>
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-2.5 h-2.5" /> DOĞRULANMIŞ UYUM
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{rev.date}</span>
                  </div>

                  {/* Rating stars of review */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <div className="flex text-[#FF6A00]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#FF6A00]' : 'text-[#262629]'}`}
                        />
                      ))}
                    </div>
                    <span className="font-display font-extrabold text-xs text-white uppercase ml-2">
                      &ldquo;{rev.title}&rdquo;
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 mt-3 leading-relaxed font-sans">
                    {rev.comment}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#262629]/30 pt-3">
                    <button className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 hover:text-white transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5 text-gray-500 hover:text-[#FF6A00]" />
                      Bu yorum yardımcı oldu mu? ({rev.helpfulCount})
                    </button>
                    
                    <span className="text-[9px] text-gray-500 font-mono uppercase cursor-pointer hover:underline">
                      Kötüye kullanım bildir
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Review Form (Right 5 cols) */}
        <div className="lg:col-span-5 bg-[#1B1B1D]/50 border border-[#262629] p-6 rounded-xl h-fit">
          <h4 className="font-display font-black text-sm text-white uppercase tracking-wide mb-1 flex items-center gap-2">
            Ürün Hakkında Yorum Yazın
          </h4>
          <p className="text-xs text-gray-400 mb-6 font-mono">
            {product.brand} bileşeninin aracınızdaki yol tutuş ve sürüş hissi nasıl?
          </p>

          {submittedReviewSuccess ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded text-center text-emerald-400 font-mono text-xs animate-pulse font-bold">
              ✓ YORUMUNUZ BAŞARIYLA GÖNDERİLDİ!
              <br />
              Teşekkür ederiz! Sistemimiz yaptığınız değerlendirmeyi onaylayarak anında yayına almıştır.
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Review Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-extrabold">Sürücü Adınız</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Melih D."
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full bg-[#101012] text-xs text-white px-4 py-3 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                />
              </div>

              {/* Rating Star Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-extrabold">Bileşen Değerlendirmesi</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => setReviewRating(stars)}
                      className="p-1 hover:scale-110 transition-transform group"
                    >
                      <Star
                        className={`w-6 h-6 stroke-2 ${
                          stars <= reviewRating ? 'text-[#FF6A00] fill-[#FF6A00]' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-extrabold">Yorum Başlığı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Olağanüstü kuru zemin yol tutuşu"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-[#101012] text-xs text-white px-4 py-3 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded"
                />
              </div>

              {/* Review comment */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-extrabold">Detaylı Deneyiminiz</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Diğer sürücülere yol ve diş gürültüsü, viraj kararlılığı, ıslak zemin kanal frenleme tepkileri hakkında bilgi verin..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#101012] text-xs text-white px-4 py-3 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white hover:bg-[#FF6A00] text-black hover:text-black font-display font-extrabold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Yorumu Gönder
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Recommended related products slider */}
      <section className="mb-8 border-t border-[#262629] pt-12">
        <h3 className="font-display font-black text-xl text-white uppercase tracking-tight mb-8">
          Benzer Lastikler &amp; Performans Alternatifleri
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onProductClick(rel)}
              className="bg-[#1B1B1D]/40 border border-[#262629] rounded-xl overflow-hidden cursor-pointer group hover:border-[#FF6A00]/60 transition-performance"
            >
              <div className="bg-[#101012] p-8 aspect-square flex items-center justify-center relative">
                <img
                  src={rel.images[0]}
                  alt={rel.model}
                  className="h-28 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-[#1B1B1D]/60 border-t border-[#262629]/50">
                <span className="text-[9px] font-mono text-[#FF6A00] tracking-wider uppercase font-extrabold block">{rel.brand}</span>
                <span className="font-display font-extrabold text-xs text-white block mt-0.5 line-clamp-1">{rel.brand} {rel.model}</span>
                <div className="flex items-center justify-between mt-3 font-mono text-[11px]">
                  <span className="text-gray-400">{rel.size}</span>
                  <span className="text-[#FF6A00] font-extrabold">${rel.price.toFixed(0)}/adet</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
