import React, { useState } from 'react';
import { TireProduct, BrandLogo, TireType, CustomSlide, FeaturedCatalog, SafetyRatingConfig } from '../types';
import { IMAGE_HERO_TIRES, IMAGE_PRODUCT_TIRE } from '../data';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Settings, 
  Check, 
  RotateCcw, 
  FileText, 
  HelpCircle, 
  Tag, 
  FolderPlus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AdminCustomizeViewProps {
  products: TireProduct[];
  setProducts: React.Dispatch<React.SetStateAction<TireProduct[]>>;
  brands: BrandLogo[];
  setBrands: React.Dispatch<React.SetStateAction<BrandLogo[]>>;
  aboutText: string;
  setAboutText: (text: string) => void;
  contactPhone: string;
  setContactPhone: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  contactAddress: string;
  setContactAddress: (val: string) => void;
  workingHours: string;
  setWorkingHours: (val: string) => void;
  slides: CustomSlide[];
  setSlides: React.Dispatch<React.SetStateAction<CustomSlide[]>>;
  catalogs: FeaturedCatalog[];
  setCatalogs: React.Dispatch<React.SetStateAction<FeaturedCatalog[]>>;
  safetyConfig: SafetyRatingConfig;
  setSafetyConfig: React.Dispatch<React.SetStateAction<SafetyRatingConfig>>;
}

export default function AdminCustomizeView({
  products,
  setProducts,
  brands,
  setBrands,
  aboutText,
  setAboutText,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  contactAddress,
  setContactAddress,
  workingHours,
  setWorkingHours,
  slides,
  setSlides,
  catalogs,
  setCatalogs,
  safetyConfig,
  setSafetyConfig,
}: AdminCustomizeViewProps) {
  // Active customizer tab: 'tires' | 'brands' | 'content' | 'slides' | 'catalogs'
  const [adminTab, setAdminTab] = useState<'tires' | 'brands' | 'content' | 'slides' | 'catalogs'>('tires');



  // Search inside admin table
  const [productQuery, setProductQuery] = useState('');
  
  // Forms edit state triggers
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Tire Form States
  const [brand, setBrand] = useState('Continental');
  const [model, setModel] = useState('');
  const [type, setType] = useState<TireType>('Summer');
  const [width, setWidth] = useState('275');
  const [ratio, setRatio] = useState('35');
  const [diameter, setDiameter] = useState('19');
  const [price, setPrice] = useState('249.99');
  const [originalPrice, setOriginalPrice] = useState('');
  const [speedRating, setSpeedRating] = useState('Y');
  const [loadIndex, setLoadIndex] = useState('100');
  const [description, setDescription] = useState('');
  const [isPopular, setIsPopular] = useState(false);
  
  // Tire specs
  const [warranty, setWarranty] = useState('80.000 KM');
  const [wetGrip, setWetGrip] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [fuelEfficiency, setFuelEfficiency] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [noiseLevel, setNoiseLevel] = useState('70');
  const [treadwear, setTreadwear] = useState('560');
  const [traction, setTraction] = useState<'AA' | 'A' | 'B' | 'C'>('AA');
  const [temperature, setTemperature] = useState<'A' | 'B' | 'C'>('A');
  const [treadDepth, setTreadDepth] = useState('10/32"');
  const [runflat, setRunflat] = useState(false);
  
  // Brands Form States
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brandTextLogo, setBrandTextLogo] = useState('');
  const [brandSubText, setBrandSubText] = useState('');
  const [brandLogoUrl, setBrandLogoUrl] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

  // Slides Form States
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [showSlideForm, setShowSlideForm] = useState(false);
  
  const [slideTagText, setSlideTagText] = useState('');
  const [slideTitle, setSlideTitle] = useState('');
  const [slideTitleGradient, setSlideTitleGradient] = useState('');
  const [slideDescription, setSlideDescription] = useState('');
  const [slidePrimaryBtnText, setSlidePrimaryBtnText] = useState('');
  const [slidePrimaryActionType, setSlidePrimaryActionType] = useState<'find_tires' | 'browse_catalog' | 'filter_all_terrain'>('find_tires');
  const [slideSecondaryBtnText, setSlideSecondaryBtnText] = useState('');
  const [slideSecondaryActionType, setSlideSecondaryActionType] = useState<'find_tires' | 'browse_catalog' | 'filter_all_terrain'>('browse_catalog');
  
  const [slideImage, setSlideImage] = useState('hero_tires');
  const [slideCustomImageUrl, setSlideCustomImageUrl] = useState('');
  
  const [slideBadgeLabel, setSlideBadgeLabel] = useState('');
  const [slideBadgeValue, setSlideBadgeValue] = useState('');
  const [slideBgGlowColor, setSlideBgGlowColor] = useState('bg-[#FF6A00]/15');
  
  const [stat1Label, setStat1Label] = useState('');
  const [stat1Value, setStat1Value] = useState('');
  const [stat1Highlight, setStat1Highlight] = useState(false);

  const [stat2Label, setStat2Label] = useState('');
  const [stat2Value, setStat2Value] = useState('');
  const [stat2Highlight, setStat2Highlight] = useState(false);

  const [stat3Label, setStat3Label] = useState('');
  const [stat3Value, setStat3Value] = useState('');
  const [stat3Highlight, setStat3Highlight] = useState(false);

  const handleStartEditSlide = (slide: CustomSlide) => {
    setEditingSlideId(slide.id);
    setSlideTagText(slide.tagText);
    setSlideTitle(slide.title);
    setSlideTitleGradient(slide.titleGradient);
    setSlideDescription(slide.description);
    setSlidePrimaryBtnText(slide.primaryBtnText);
    setSlidePrimaryActionType(slide.primaryActionType);
    setSlideSecondaryBtnText(slide.secondaryBtnText);
    setSlideSecondaryActionType(slide.secondaryActionType);
    
    if (slide.image === IMAGE_HERO_TIRES) {
      setSlideImage('hero_tires');
      setSlideCustomImageUrl('');
    } else if (slide.image === IMAGE_PRODUCT_TIRE) {
      setSlideImage('product_tire');
      setSlideCustomImageUrl('');
    } else {
      setSlideImage('custom');
      setSlideCustomImageUrl(slide.image);
    }
    
    setSlideBadgeLabel(slide.badgeLabel);
    setSlideBadgeValue(slide.badgeValue);
    setSlideBgGlowColor(slide.bgGlowColor || 'bg-[#FF6A00]/15');
    
    // Stats loading safely
    const s1 = slide.stats?.[0] || { label: '', value: '', highlight: false };
    const s2 = slide.stats?.[1] || { label: '', value: '', highlight: false };
    const s3 = slide.stats?.[2] || { label: '', value: '', highlight: false };
    
    setStat1Label(s1.label);
    setStat1Value(s1.value);
    setStat1Highlight(!!s1.highlight);

    setStat2Label(s2.label);
    setStat2Value(s2.value);
    setStat2Highlight(!!s2.highlight);

    setStat3Label(s3.label);
    setStat3Value(s3.value);
    setStat3Highlight(!!s3.highlight);
    
    setShowSlideForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetSlideForm = () => {
    setEditingSlideId(null);
    setSlideTagText('');
    setSlideTitle('');
    setSlideTitleGradient('');
    setSlideDescription('');
    setSlidePrimaryBtnText('');
    setSlidePrimaryActionType('find_tires');
    setSlideSecondaryBtnText('');
    setSlideSecondaryActionType('browse_catalog');
    setSlideImage('hero_tires');
    setSlideCustomImageUrl('');
    setSlideBadgeLabel('');
    setSlideBadgeValue('');
    setSlideBgGlowColor('bg-[#FF6A00]/15');
    
    setStat1Label('');
    setStat1Value('');
    setStat1Highlight(false);
    
    setStat2Label('');
    setStat2Value('');
    setStat2Highlight(false);
    
    setStat3Label('');
    setStat3Value('');
    setStat3Highlight(false);
    
    setShowSlideForm(false);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideTitle.trim() || !slideDescription.trim()) {
      alert('Lütfen en azından bir Başlık ve Açıklama giriniz.');
      return;
    }
    
    const imgUrl = slideImage === 'hero_tires' 
      ? IMAGE_HERO_TIRES 
      : slideImage === 'product_tire' 
        ? IMAGE_PRODUCT_TIRE 
        : (slideCustomImageUrl || IMAGE_HERO_TIRES);

    const statsArray = [
      { label: stat1Label || 'Müşteri Desteği', value: stat1Value || '7/24', highlight: stat1Highlight },
      { label: stat2Label || 'Gönderim', value: stat2Value || 'Ücretsiz', highlight: stat2Highlight },
      { label: stat3Label || 'Garanti', value: stat3Value || '2 Yıl', highlight: stat3Highlight },
    ];
    
    if (editingSlideId) {
      setSlides(prev => prev.map(s => s.id === editingSlideId ? {
        ...s,
        tagText: slideTagText || 'SLIDER Kampanya',
        title: slideTitle,
        titleGradient: slideTitleGradient,
        description: slideDescription,
        primaryBtnText: slidePrimaryBtnText || 'Keşfet',
        primaryActionType: slidePrimaryActionType,
        secondaryBtnText: slideSecondaryBtnText || 'Detaylar',
        secondaryActionType: slideSecondaryActionType,
        image: imgUrl,
        badgeLabel: slideBadgeLabel || 'TIRE CITY',
        badgeValue: slideBadgeValue || 'Premium Hizmet',
        bgGlowColor: slideBgGlowColor,
        stats: statsArray
      } : s));
      showToast('Karusel slaytı başarıyla güncellendi!');
    } else {
      const newSlide: CustomSlide = {
        id: 'slide-' + Date.now(),
        tagText: slideTagText || 'SLIDER Kampanya',
        title: slideTitle,
        titleGradient: slideTitleGradient,
        description: slideDescription,
        primaryBtnText: slidePrimaryBtnText || 'Keşfet',
        primaryActionType: slidePrimaryActionType,
        secondaryBtnText: slideSecondaryBtnText || 'Detaylar',
        secondaryActionType: slideSecondaryActionType,
        image: imgUrl,
        badgeLabel: slideBadgeLabel || 'TIRE CITY',
        badgeValue: slideBadgeValue || 'Premium Hizmet',
        bgGlowColor: slideBgGlowColor,
        stats: statsArray
      };
      setSlides(prev => [...prev, newSlide]);
      showToast('Yeni Slider Slaytı başarıyla eklendi!');
    }
    
    handleResetSlideForm();
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm('Bu slider görselini ve slaytını tamamen silmek istediğinize emin misiniz?')) {
      setSlides(prev => prev.filter(s => s.id !== id));
      showToast('Slayt başarıyla kaldırıldı.');
    }
  };

  // Bulk action notices
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Catalog Form States
  const [editingCatalogId, setEditingCatalogId] = useState<string | null>(null);
  const [showCatalogForm, setShowCatalogForm] = useState(false);
  const [catalogTitle, setCatalogTitle] = useState('');
  const [catalogSubtitle, setCatalogSubtitle] = useState('');
  const [catalogProductIds, setCatalogProductIds] = useState<string[]>([]);
  const [catalogSearchQuery, setCatalogSearchQuery] = useState('');

  const handleStartEditCatalog = (cat: FeaturedCatalog) => {
    setEditingCatalogId(cat.id);
    setCatalogTitle(cat.title);
    setCatalogSubtitle(cat.subtitle || '');
    setCatalogProductIds(cat.productIds || []);
    setShowCatalogForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetCatalogForm = () => {
    setEditingCatalogId(null);
    setCatalogTitle('');
    setCatalogSubtitle('');
    setCatalogProductIds([]);
    setCatalogSearchQuery('');
    setShowCatalogForm(false);
  };

  const handleSaveCatalog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogTitle.trim()) {
      alert('Lütfen katalog başlığı giriniz.');
      return;
    }

    if (editingCatalogId) {
      setCatalogs(prev => prev.map(c => c.id === editingCatalogId ? {
        ...c,
        title: catalogTitle,
        subtitle: catalogSubtitle,
        productIds: catalogProductIds
      } : c));
      showToast('Katalog başarıyla güncellendi!');
    } else {
      const newCatalog: FeaturedCatalog = {
        id: 'catalog-' + Date.now(),
        title: catalogTitle,
        subtitle: catalogSubtitle,
        productIds: catalogProductIds
      };
      setCatalogs(prev => [...prev, newCatalog]);
      showToast('Yeni öne çıkan katalog başarıyla eklendi!');
    }

    handleResetCatalogForm();
  };

  const handleDeleteCatalog = (id: string) => {
    if (confirm('Bu kataloğu tamamen silmek istediğinizden emin misiniz?')) {
      setCatalogs(prev => prev.filter(c => c.id !== id));
      showToast('Katalog silindi.');
    }
  };

  const handleAddProductToCatalog = (productId: string) => {
    if (catalogProductIds.includes(productId)) {
      return;
    }
    setCatalogProductIds(prev => [...prev, productId]);
    showToast('Lastik kataloğa eklendi!');
  };

  const handleRemoveProductFromCatalog = (productId: string) => {
    setCatalogProductIds(prev => prev.filter(id => id !== productId));
    showToast('Lastik katalogdan kaldırıldı.');
  };


  // Pre-load tire form for editing
  const handleStartEditProduct = (prod: TireProduct) => {
    setEditingProductId(prod.id);
    setBrand(prod.brand);
    setModel(prod.model);
    setType(prod.type);
    setWidth(prod.width.toString());
    setRatio(prod.ratio.toString());
    setDiameter(prod.diameter.toString());
    setPrice(prod.price.toString());
    setOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : '');
    setSpeedRating(prod.speedRating);
    setLoadIndex(prod.loadIndex);
    setDescription(prod.description);
    setIsPopular(prod.isPopular);
    
    setWarranty(prod.specs.warranty);
    setWetGrip(prod.specs.wetGrip);
    setFuelEfficiency(prod.specs.fuelEfficiency);
    setNoiseLevel(prod.specs.noiseLevel.toString());
    setTreadwear(prod.specs.treadwear.toString());
    setTraction(prod.specs.traction);
    setTemperature(prod.specs.temperature);
    setTreadDepth(prod.specs.treadDepth);
    setRunflat(prod.specs.runflat);

    setShowProductForm(true);
    // Scroll form into view
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetProductForm = () => {
    setEditingProductId(null);
    setModel('');
    setDescription('');
    setOriginalPrice('');
    setPrice('249.99');
    setIsPopular(false);
    setShowProductForm(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim()) {
      alert('Model alanı boş bırakılamaz.');
      return;
    }

    const calculatedSize = `${width}/${ratio}ZR${diameter}`;
    const formattedPrice = parseFloat(price) || 199.99;
    
    const productData: TireProduct = {
      id: editingProductId || `prod-gen-${Date.now()}`,
      brand,
      model,
      type,
      size: calculatedSize,
      width: parseInt(width) || 245,
      ratio: parseInt(ratio) || 45,
      diameter: parseInt(diameter) || 18,
      price: formattedPrice,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      rating: editingProductId ? (products.find(p => p.id === editingProductId)?.rating || 4.7) : 5.0,
      reviewCount: editingProductId ? (products.find(p => p.id === editingProductId)?.reviewCount || 0) : 0,
      images: ['/src/assets/images/product_tire_wheel_1779310993264.png'], // Standard fallback
      isPopular,
      speedRating,
      loadIndex,
      specs: {
        warranty,
        wetGrip,
        fuelEfficiency,
        noiseLevel: parseInt(noiseLevel) || 70,
        treadwear: parseInt(treadwear) || 400,
        traction,
        temperature,
        treadDepth,
        runflat,
      },
      description,
      reviews: editingProductId ? (products.find(p => p.id === editingProductId)?.reviews || []) : [],
    };

    if (editingProductId) {
      setProducts(prev => prev.map(p => p.id === editingProductId ? productData : p));
      showToast(`"${brand} ${model}" lastiği başarıyla güncellendi!`);
    } else {
      setProducts(prev => [productData, ...prev]);
      showToast(`Yeni "${brand} ${model}" lastiği kataloğa eklendi!`);
    }

    handleResetProductForm();
  };

  // Delete tire
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`"${name}" lastiğini katalogdan tamamen silmek istediğinize emin misiniz?`)) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Lastik katalogdan başarıyla kaldırıldı.');
    }
  };

  // Preload brand form for editing
  const handleStartEditBrand = (br: BrandLogo) => {
    setEditingBrandId(br.id);
    setBrandName(br.name);
    setBrandTextLogo(br.textLogo);
    setBrandSubText(br.subText);
    setBrandLogoUrl(br.logoUrl || '');
    setBrandDescription(br.description || '');
    setShowBrandForm(true);
  };

  const handleResetBrandForm = () => {
    setEditingBrandId(null);
    setBrandName('');
    setBrandTextLogo('');
    setBrandSubText('');
    setBrandLogoUrl('');
    setBrandDescription('');
    setShowBrandForm(false);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !brandTextLogo.trim()) {
      alert('Lütfen Marka Adı ve Logo Metni alanlarını doldurun.');
      return;
    }

    const brandData: BrandLogo = {
      id: editingBrandId || brandName.toLowerCase().replace(/\s+/g, '-'),
      name: brandName,
      textLogo: brandTextLogo.toUpperCase(),
      subText: brandSubText,
      description: brandDescription.trim() || undefined,
      logoUrl: brandLogoUrl.trim() || undefined,
    };

    if (editingBrandId) {
      setBrands(prev => prev.map(b => b.id === editingBrandId ? brandData : b));
      showToast(`"${brandName}" markası başarıyla güncellendi!`);
    } else {
      setBrands(prev => [...prev, brandData]);
      showToast(`Yeni "${brandName}" yetkili markası sisteme eklendi!`);
    }

    handleResetBrandForm();
  };

  const handleDeleteBrand = (id: string, name: string) => {
    if (confirm(`"${name}" yetkili markasını ve tüm visual imaj kancalarını silmek istediğinize emin misiniz?`)) {
      setBrands(prev => prev.filter(b => b.id !== id));
      showToast('Marka başarıyla kaldırıldı.');
    }
  };

  // Filters inside admin panel
  const filteredProductsAdmin = products.filter(p => {
    const q = productQuery.toLowerCase();
    return (
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn text-left">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#262629]/95 pb-6 mb-8">
        <div>
          <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#FF6A00] animate-spin-slow" />
            ÖZELLEŞTİRME VE İÇERİK YÖNETİMİ
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Sitenizdeki tüm lastik modellerini, yetkili üretici logolarını, hakkımızda metinlerini ve iletişim destek kanallarını anında güncelleyin.
          </p>
        </div>

        {/* Outer restore buttons */}
        <button
          onClick={() => {
            if (confirm('Tüm ürünleri ve markaları orijinal fabrika ayarlarına sıfırlamak istiyor musunuz? Yerel değişiklikleriniz silinecektir.')) {
              localStorage.removeItem('tire-city-products');
              localStorage.removeItem('tire-city-brands');
              localStorage.removeItem('tire-city-aboutText');
              localStorage.removeItem('tire-city-contactPhone');
              localStorage.removeItem('tire-city-contactEmail');
              localStorage.removeItem('tire-city-contactAddress');
              localStorage.removeItem('tire-city-workingHours');
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-transparent text-xs font-mono border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/10 rounded transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Fabrika Verilerine Sıfırla
        </button>
      </div>

      {/* Success alert message toaster */}
      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-lg flex items-center gap-3 animate-fadeIn text-emerald-400 text-xs font-mono">
          <Check className="w-5 h-5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Navigation Admin Tabs */}
      <div className="flex border-b border-[#262629] mb-8 gap-2">
        <button
          onClick={() => setAdminTab('tires')}
          className={`px-5 py-3 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
            adminTab === 'tires'
              ? 'text-[#FF6A00] border-[#FF6A00] bg-[#FF6A00]/5'
              : 'text-zinc-400 border-transparent hover:text-white'
          }`}
        >
          🚗 LASTİKLERİ YÖNET ({products.length})
        </button>
        <button
          onClick={() => setAdminTab('brands')}
          className={`px-5 py-3 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
            adminTab === 'brands'
              ? 'text-[#FF6A00] border-[#FF6A00] bg-[#FF6A00]/5'
              : 'text-zinc-400 border-transparent hover:text-white'
          }`}
        >
          🏆 MARKALARI YÖNET ({brands.length})
        </button>
        <button
          onClick={() => setAdminTab('content')}
          className={`px-5 py-3 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
            adminTab === 'content'
              ? 'text-[#FF6A00] border-[#FF6A00] bg-[#FF6A00]/5'
              : 'text-zinc-400 border-transparent hover:text-white'
          }`}
        >
          📝 SAYFA METİN VE İLETİŞİM İÇERİKLERİ
        </button>
        <button
          onClick={() => setAdminTab('slides')}
          className={`px-5 py-3 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
            adminTab === 'slides'
              ? 'text-[#FF6A00] border-[#FF6A00] bg-[#FF6A00]/5'
              : 'text-zinc-400 border-transparent hover:text-white'
          }`}
        >
          🖼️ SLIDER YÖNETİMİ ({slides.length})
        </button>
        <button
          onClick={() => setAdminTab('catalogs')}
          className={`px-5 py-3 font-display font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
            adminTab === 'catalogs'
              ? 'text-[#FF6A00] border-[#FF6A00] bg-[#FF6A00]/5'
              : 'text-zinc-400 border-transparent hover:text-white'
          }`}
        >
          🏁 KATALOGLARI ÖZELLEŞTİR ({catalogs.length})
        </button>
      </div>

      {/* ==================== TAB 1: TIRES MANAGEMENT ==================== */}
      {adminTab === 'tires' && (
        <div className="space-y-8">
          
          {/* Header Actions for Tires */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Lastik adı, ebatı veya tipi filtrele..."
                value={productQuery}
                onChange={(e) => setProductQuery(e.target.value)}
                className="w-full bg-[#1B1B1D] border border-[#262629] text-xs px-4 py-3 pl-10 rounded text-white focus:outline-none focus:border-[#FF6A00] font-mono"
              />
              <span className="absolute left-3.5 top-3 text-zinc-500 font-mono text-xs">🔍</span>
            </div>

            <button
              onClick={() => {
                handleResetProductForm();
                setShowProductForm(true);
              }}
              className="px-6 py-3 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-display font-black text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 glow-orange"
            >
              <Plus className="w-4 h-4" />
              YENİ LASTİK EKLE
            </button>
          </div>

          {/* New / Edit Product Form Canvas */}
          {showProductForm && (
            <div className="p-6 bg-[#161617] border border-[#FF6A00]/30 rounded-xl relative animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#262629] pb-4 mb-6">
                <span className="font-display font-black text-xs text-white uppercase tracking-widest flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-[#FF6A00]" />
                  {editingProductId ? 'LASTİK DETAYLARINI DÜZENLE' : 'YENİ PERFORMANS LASTİĞİ TANIMLA'}
                </span>
                <button 
                  onClick={handleResetProductForm}
                  className="p-1 px-2.5 bg-[#262629] text-zinc-400 hover:text-white rounded text-[10px] font-mono"
                >
                  Kapat ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 font-mono text-xs">
                {/* Visual grid fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Üretici Marka</span>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                    >
                      {brands.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                      ))}
                      {!brands.some(b => b.name === brand) && <option value={brand}>{brand}</option>}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <span className="text-zinc-500">Model / Tasarım Adı</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: ExtremeContact, Pilot Sport 4S"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Lastik İklim/Yol Tipi</span>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as TireType)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                    >
                      <option value="Summer">Summer (Yaz Lastiği)</option>
                      <option value="Winter">Winter (Kış Lastiği)</option>
                      <option value="All-Season">All-Season (4 Mevsim)</option>
                      <option value="All-Terrain">All-Terrain (Arazi Çekişli)</option>
                      <option value="Track/Racing">Track/Racing (Yarış Pist)</option>
                    </select>
                  </div>

                </div>

                {/* Sizing options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-black/30 rounded-lg border border-[#262629]/50">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Genislik (Taban mm)</span>
                    <select
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    >
                      {['245', '255', '265', '275', '285', '305', '315'].map(w => (
                        <option key={w} value={w}>{w} mm</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Yanak Oranı (Profil %)</span>
                    <select
                      value={ratio}
                      onChange={(e) => setRatio(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    >
                      {['30', '35', '40', '45', '50', '55', '60', '65', '70'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Jant Ölçüsü (Çap inç)</span>
                    <select
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    >
                      {['15', '16', '17', '18', '19', '20', '21', '22'].map(d => (
                        <option key={d} value={d}>{d} İnç</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing indices */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Uygulanan Fiyat ($)</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="249.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Orijinal Fiyat ($) <span className="text-[10px] text-zinc-600">(İndirimsiz hal)</span></span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Örn: 289.99"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Hız Endeksi Sınıfı</span>
                    <input
                      type="text"
                      placeholder="Y, W, H, V"
                      value={speedRating}
                      onChange={(e) => setSpeedRating(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white uppercase focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Yük Endeks Sınıfı</span>
                    <input
                      type="text"
                      placeholder="100, 104, 115"
                      value={loadIndex}
                      onChange={(e) => setLoadIndex(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                {/* Performance Specs Grid Accordion */}
                <div className="p-5 border border-zinc-800 bg-[#121213] rounded-lg">
                  <span className="font-display font-extrabold text-[#FF6A00] block mb-4 uppercase text-[10px] tracking-wider">
                    🏎️ AB ENERJİ ETİKETİ VE KALİFİYE STANDARTLARI
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Kilometre Ömür Garantisi</span>
                      <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Islak Zemin Tutuş (A-D)</span>
                      <select value={wetGrip} onChange={(e) => setWetGrip(e.target.value as any)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white">
                        <option value="A">A Seviye</option>
                        <option value="B">B Seviye</option>
                        <option value="C">C Seviye</option>
                        <option value="D">D Seviye</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Yakıt Tasarrufu (A-D)</span>
                      <select value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value as any)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white">
                        <option value="A">A Seviye</option>
                        <option value="B">B Seviye</option>
                        <option value="C">C Seviye</option>
                        <option value="D">D Seviye</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Gürültü Seviyesi (dB)</span>
                      <input type="number" value={noiseLevel} onChange={(e) => setNoiseLevel(e.target.value)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Aşınma Direnci (Treadwear)</span>
                      <input type="number" value={treadwear} onChange={(e) => setTreadwear(e.target.value)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Çekiş Endeksi (Traction)</span>
                      <select value={traction} onChange={(e) => setTraction(e.target.value as any)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white">
                        <option value="AA">AA Sınıfı</option>
                        <option value="A">A Sınıfı</option>
                        <option value="B">B Sınıfı</option>
                        <option value="C">C Sınıfı</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Sıcaklık Endeksi (Temp)</span>
                      <select value={temperature} onChange={(e) => setTemperature(e.target.value as any)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white">
                        <option value="A">A Sınıfı</option>
                        <option value="B">B Sınıfı</option>
                        <option value="C">C Sınıfı</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500">Diş Derinliği</span>
                      <input type="text" value={treadDepth} onChange={(e) => setTreadDepth(e.target.value)} className="bg-black border border-[#262629] rounded px-2.5 py-2 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-zinc-800">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={runflat}
                        onChange={(e) => setRunflat(e.target.checked)}
                        className="w-4 h-4 accent-[#FF6A00]"
                      />
                      <span className="text-zinc-300 font-bold">Runflat (Patlasa da Giden Destekli Hücre)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isPopular}
                        onChange={(e) => setIsPopular(e.target.checked)}
                        className="w-4 h-4 accent-[#FF6A00]"
                      />
                      <span className="text-[#FF6A00] font-bold">Popüler Ürün (Ana Sayfada Öne Çıkar)</span>
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-500">Detaylı Ürün Açıklaması (Turkish)</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Bu performans lastiğinin mühendislik detaylarını, ıslak ve kuru zemindeki kullanım parametrelerini buraya ekleyin..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:outline-none focus:border-[#FF6A00]"
                  ></textarea>
                </div>

                {/* Submit actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262629]/50">
                  <button
                    type="button"
                    onClick={handleResetProductForm}
                    className="px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700/80 transition-all"
                  >
                    Vazgeç
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-display font-bold uppercase transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Kaydet ve Yayınla
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Admin Table of Products */}
          <div className="bg-[#1B1B1D]/40 border border-[#262629] rounded-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#262629] bg-[#0F0F10] text-[#FF6A00] font-bold">
                    <th className="p-4 uppercase tracking-wider">İmaj</th>
                    <th className="p-4 uppercase tracking-wider">Marka & Model</th>
                    <th className="p-4 uppercase tracking-wider">Tip</th>
                    <th className="p-4 uppercase tracking-wider text-center">Ebatlar</th>
                    <th className="p-4 uppercase tracking-wider text-right">Fiyat</th>
                    <th className="p-4 uppercase tracking-wider text-center">Özellikler</th>
                    <th className="p-4 uppercase tracking-wider text-center">Eylemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262629]/40">
                  {filteredProductsAdmin.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-zinc-500 font-mono">
                        Aranan kriterlere uyan lastik bulunamadı.
                      </td>
                    </tr>
                  ) : (
                    filteredProductsAdmin.map((prod) => (
                      <tr key={prod.id} className="hover:bg-white/5 transition-all text-zinc-300">
                        <td className="p-4">
                          <img 
                            src={prod.images[0]} 
                            alt={prod.model} 
                            className="w-10 h-10 object-contain bg-black/40 rounded p-1 border border-zinc-800" 
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-sans font-bold text-white text-sm">{prod.brand}</span>
                            <span className="text-zinc-400 font-mono">{prod.model}</span>
                            {prod.isPopular && (
                              <span className="text-[10px] text-[#FF6A00] font-bold block mt-0.5">🔥 Popüler</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            prod.type === 'Summer' ? 'bg-amber-500/10 text-amber-500' :
                            prod.type === 'Winter' ? 'bg-blue-500/10 text-blue-500' :
                            prod.type === 'All-Season' ? 'bg-teal-500/10 text-teal-500' :
                            'bg-purple-500/10 text-purple-500'
                          }`}>
                            {prod.type}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-white">
                          {prod.size}
                          <div className="text-[9px] text-zinc-650 font-normal">
                            ({prod.width}/{prod.ratio}R{prod.diameter})
                          </div>
                        </td>
                        <td className="p-4 text-right font-black text-emerald-400 text-sm">
                          ${prod.price.toFixed(2)}
                          {prod.originalPrice && (
                            <div className="text-[10px] text-zinc-500 line-through">
                              ${prod.originalPrice.toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-wrap gap-1 justify-center max-w-[180px] mx-auto text-[9px]">
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">GP: {prod.specs.wetGrip}</span>
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded">FE: {prod.specs.fuelEfficiency}</span>
                            {prod.specs.runflat && <span className="bg-[#FF6A00]/20 text-[#FF6A00] px-1 rounded">RFT</span>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleStartEditProduct(prod)}
                              className="p-2 bg-[#262629]/50 hover:bg-[#FF6A00]/10 hover:text-[#FF6A00] text-zinc-300 rounded transition-all"
                              title="Tire Düzenle (Edit)"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, `${prod.brand} ${prod.model}`)}
                              className="p-2 bg-[#262629]/50 hover:bg-red-500/10 hover:text-red-500 text-zinc-300 rounded transition-all"
                              title="Katalogtan Kaldır (Delete)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#0F0F10] border-t border-[#262629] text-[10px] text-zinc-500 text-center font-mono">
              Toplam kayıt sayısı: {filteredProductsAdmin.length} lastik ürünü. Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 2: BRANDS MANAGEMENT ==================== */}
      {adminTab === 'brands' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-zinc-400 font-mono text-xs">YETKİLİ ORİJİNAL EKİPMAN DİSTRİBÜTÖRÜ MARKALARI</h3>
            <button
              onClick={() => {
                handleResetBrandForm();
                setShowBrandForm(true);
              }}
              className="px-5 py-2.5 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-display font-black text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              YENİ MARKA EKLE
            </button>
          </div>

          {/* New / Edit Brand Logo form */}
          {showBrandForm && (
            <div className="p-6 bg-[#161617] border border-[#FF6A00]/30 rounded-xl relative animate-fadeIn max-w-2xl">
              <div className="flex items-center justify-between border-b border-[#262629] pb-3 mb-5">
                <span className="font-display font-black text-xs text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#FF6A00]" />
                  {editingBrandId ? 'MARKA DETAYINI DÜZENLE' : 'YENİ MARKA HESABI TANIMLA'}
                </span>
                <button onClick={handleResetBrandForm} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSaveBrand} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Marka Adı</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Michelin, Falken"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Logo Yazı Stili (Görsel olmadığında gösterilir)</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: MICHELIN, GOODEAYER"
                      value={brandTextLogo}
                      onChange={(e) => setBrandTextLogo(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:border-[#FF6A00] uppercase font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-500">Marka Sloganı / Alt Başlık</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Yolculuğunuz İçin En İyi Çözümler"
                      value={brandSubText}
                      onChange={(e) => setBrandSubText(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#FF6A00] font-bold">Özel Logo Resim Linki (Opsiyonel URL)</span>
                    <input
                      type="text"
                      placeholder="Örn: https://logodownload.org/... veya boş bırakın"
                      value={brandLogoUrl}
                      onChange={(e) => setBrandLogoUrl(e.target.value)}
                      className="bg-[#0F0F10] border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#FF6A00] text-[11px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Marka Detaylı Açıklaması (Markalar sayfasındaki kartta gösterilir)</span>
                  <textarea
                    rows={3}
                    placeholder="Örn: Gelişmiş aşınma mukavemetli silika bileşenleri ve spor sürüş indeksleri ile premium Alman mühendisliği."
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    className="w-full bg-[#0F0F10] border border-[#262629] rounded p-3 text-white focus:border-[#FF6A00] leading-relaxed"
                  />
                </div>

                {brandLogoUrl && (
                  <div className="p-3 bg-black/40 border border-[#262629] rounded-lg">
                    <span className="text-[10px] text-zinc-500 block mb-1">GÖRSEL LOGO ÖNİZLEME:</span>
                    <div className="h-10 flex items-center justify-start bg-white/5 rounded px-3 py-1">
                      <img src={brandLogoUrl} alt="Logo Önizleme" className="max-h-8 max-w-full object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} referrerPolicy="no-referrer" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button type="button" onClick={handleResetBrandForm} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700">
                    Vazgeç
                  </button>
                  <button type="submit" className="px-6 py-2 bg-[#FF6A00] text-black font-display font-black hover:bg-[#FF8533] rounded uppercase">
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Brands list grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((br) => (
              <div 
                key={br.id}
                className="p-5 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] text-left flex flex-col justify-between hover:border-[#FF6A00]/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-[#FF6A00]/10 text-[#FF6A00] rounded text-[10px] font-bold font-mono tracking-widest">
                      ID: {br.id}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStartEditBrand(br)}
                        className="p-1.5 bg-[#262629] text-zinc-400 hover:text-[#FF6A00] rounded"
                        title="Düzenle"
                      >
                        <Edit3 className="w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteBrand(br.id, br.name)}
                        className="p-1.5 bg-[#262629] text-zinc-400 hover:text-red-500 rounded"
                        title="Sil"
                      >
                        <Trash2 className="w-3" />
                      </button>
                    </div>
                  </div>

                  {br.logoUrl ? (
                    <div className="h-12 w-full bg-white/5 rounded-lg border border-zinc-800 p-2 mb-3 flex items-center justify-start">
                      <img src={br.logoUrl} alt={br.name} className="max-h-8 max-w-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ) : (
                    <div className="h-12 w-full bg-[#161617] rounded-lg border border-zinc-900 p-2 mb-3 flex items-center justify-start text-xs text-zinc-450 italic font-mono uppercase bg-stripes">
                      Yazı Tipi Logo Sınıfı
                    </div>
                  )}

                  <span className="text-xl font-display font-black text-white block uppercase tracking-tight">
                    {br.name}
                  </span>
                  
                  <span className="text-[12px] font-mono font-bold text-gray-500 block mt-1 uppercase tracking-wider">
                    Logo Metni: "{br.textLogo}"
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#262629]/40 text-[11px] font-mono text-zinc-400">
                  {br.subText || '(Slogan Yazılmamış)'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: STATIC CONTENT MANAGEMENT ==================== */}
      {adminTab === 'content' && (
        <div className="p-6 bg-[#161617] border border-[#262629] rounded-xl space-y-8 animate-fadeIn max-w-4xl">
          <div className="border-b border-[#262629] pb-4">
            <h3 className="font-display font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF6A00]" />
              SAYFA STATİK METİNLERİ VE DESTEK BİLGİLERİ REZERVASYONU
            </h3>
            <p className="text-[11px] font-mono text-zinc-500 mt-1">
              "Tire City Orijinal Özellikleri" kutusundaki metinleri, destek telefon hattınızı ve e-posta adreslerinizi buradan güncelleyerek sitedeki tüm footer alanlarını ve yardım sayfalarını dinamik kılabilirsiniz.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); showToast('Sayfa içerikleri ve destek verisi başarıyla güncellendi!'); }} className="space-y-6 font-mono text-xs">
            
            {/* About text segment */}
            <div className="flex flex-col gap-1.5">
              <span className="text-white font-bold block mb-1 text-sm">Hakkımızda Detay Metni ("AboutView" & Footer Bölümü)</span>
              <textarea
                rows={5}
                required
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                className="w-full bg-[#0F0F10] border border-[#262629] rounded p-4 text-xs text-white focus:outline-none focus:border-[#FF6A00] leading-relaxed"
                placeholder="Şirket geçmişini ve sertifikalı mobil kurulum kancalarını giren kurumsal bildiri..."
              />
            </div>

            {/* Support contact info block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-400">Teknik Destek Telefon Hattı</span>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-400">Mekanik İletişim E-Postası</span>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-400">Garaj ve Şirket Merkez Adresi</span>
                <input
                  type="text"
                  required
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-400">Garaj Çalışma Saatleri (Özet)</span>
                <input
                  type="text"
                  required
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2.5 text-white focus:border-[#FF6A00]"
                />
              </div>

            </div>

            {/* Safety & High Speed rating banner section configuration */}
            <div className="border-t border-[#262629]/50 pt-6 space-y-6">
              <h4 className="text-xs font-display font-black text-[#FF6A00] uppercase tracking-wider flex items-center gap-2">
                ⚡ GÜVENLİK DERECELENDİRMESİ VE HAKKIMIZDA ŞERİDİ ÖZELLEŞTİRME
              </h4>
              <p className="text-[11px] font-mono text-zinc-500">
                Ana sayfadaki güvence/hakkımızda şeridinin arkaplanını, başlıklarını, açıklamalarını ve yeşil/beyaz rozet sayılarını/yazılarını düzenleyin:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Küçük Turuncu Kategori Etiketi</span>
                  <input
                    type="text"
                    required
                    value={safetyConfig.badgeText}
                    onChange={(e) => setSafetyConfig(prev => ({ ...prev, badgeText: e.target.value }))}
                    className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:border-[#FF6A00]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Ana Başlık (Kuruluş Yılı Dahil)</span>
                  <input
                    type="text"
                    required
                    value={safetyConfig.title}
                    onChange={(e) => setSafetyConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:border-[#FF6A00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Özel Paragraf 1 (Hakkımızda Detay - "Hakkımızda Detay Metni" ile eşitlenir)</span>
                  <textarea
                    rows={4}
                    required
                    value={safetyConfig.desc1}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSafetyConfig(prev => ({ ...prev, desc1: val }));
                      setAboutText(val); // Sync to aboutText as well!
                    }}
                    className="w-full bg-[#0F0F10] border border-[#262629] rounded p-3 text-white focus:border-[#FF6A00] leading-relaxed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Özel Paragraf 2 (Detay Mobil Hizmet vb.)</span>
                  <textarea
                    rows={4}
                    value={safetyConfig.desc2}
                    onChange={(e) => setSafetyConfig(prev => ({ ...prev, desc2: e.target.value }))}
                    className="w-full bg-[#0F0F10] border border-[#262629] rounded p-3 text-white focus:border-[#FF6A00] leading-relaxed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#FF6A00] font-bold">Arka Plan Görsel Linki (URL veya boş bırakın)</span>
                  <input
                    type="text"
                    placeholder="Örn: https://images.unsplash.com/... (Boşsa varsayılan lastik sırtı görseli kullanılır)"
                    value={safetyConfig.bgUrl}
                    onChange={(e) => setSafetyConfig(prev => ({ ...prev, bgUrl: e.target.value }))}
                    className="bg-[#0F0F10] border border-zinc-800 rounded px-3 py-2 text-white focus:border-[#FF6A00] text-[11px]"
                  />
                </div>

                <div className="p-3 bg-black/40 border border-[#262629] rounded-lg flex flex-col justify-center">
                  <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider font-bold">GÖRSEL ARKA PLAN ÖNİZLEME:</span>
                  <div className="h-10 flex items-center justify-start rounded px-3 py-1 overflow-hidden bg-zinc-950">
                    {safetyConfig.bgUrl ? (
                      <img src={safetyConfig.bgUrl} alt="Bg preview" className="max-h-8 max-w-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-[10px] text-zinc-500 italic font-mono">Varsayılan Lastik Sırtı Arkaplanı Aktif</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Badges metrics modification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-[#121214] border border-[#262629] rounded-xl">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-mono text-emerald-400 font-extrabold uppercase tracking-wider">📊 ÖZELLİK GRUBU 1 (YEŞİL ETİKETLİ)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[10px] uppercase">Değer/Sayı</span>
                      <input
                        type="text"
                        required
                        value={safetyConfig.badge1Label}
                        onChange={(e) => setSafetyConfig(prev => ({ ...prev, badge1Label: e.target.value }))}
                        className="bg-[#0F0F10] border border-[#262629] rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[10px] uppercase">Alt Metin</span>
                      <input
                        type="text"
                        required
                        value={safetyConfig.badge1Sub}
                        onChange={(e) => setSafetyConfig(prev => ({ ...prev, badge1Sub: e.target.value }))}
                        className="bg-[#0F0F10] border border-[#262629] rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:border-l md:border-zinc-800 md:pl-6">
                  <h5 className="text-[10px] font-mono text-zinc-400 font-extrabold uppercase tracking-wider">📊 ÖZELLİK GRUBU 2 (BEYAZ ETİKETLİ)</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[10px] uppercase">Değer/Sayı</span>
                      <input
                        type="text"
                        required
                        value={safetyConfig.badge2Label}
                        onChange={(e) => setSafetyConfig(prev => ({ ...prev, badge2Label: e.target.value }))}
                        className="bg-[#0F0F10] border border-[#262629] rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[10px] uppercase">Alt Metin</span>
                      <input
                        type="text"
                        required
                        value={safetyConfig.badge2Sub}
                        onChange={(e) => setSafetyConfig(prev => ({ ...prev, badge2Sub: e.target.value }))}
                        className="bg-[#0F0F10] border border-[#262629] rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-zinc-900/40 rounded-lg border border-zinc-800 flex items-start gap-2.5 text-zinc-400 text-[11px] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>
                "Statik Metinleri Kaydet" butonuna tıkladığınızda verileriniz tarayıcınızın yerel hafızasına yazılır ve sitedeki tüm Yardım, Hakkımızda ile footer alanları anlık olarak bu verilerle değiştirilir.
              </span>
            </div>

            {/* Trigger submission block */}
            <div className="pt-4 border-t border-[#262629]/50 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#FF6A00] text-black font-display font-extrabold uppercase rounded shadow-lg transition-all glow-orange hover:scale-[1.02]"
              >
                Statik Metinleri Kaydet
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ==================== TAB 4: SLIDESHOW CAROUSEL MANAGEMENT ==================== */}
      {adminTab === 'slides' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF6A00]" />
                ANA SAYFA SLIDER GÖRSEL VE METİN YÖNETİMİ
              </h3>
              <p className="text-[11px] font-mono text-zinc-500 mt-1">
                Ana sayfadaki devasa karusel afişlerini (başlık, açıklama, buton linkleri, arka plan ışıltıları, ürün resimleri ve teknik sayaçları) buradan özelleştirebilirsiniz.
              </p>
            </div>

            {!showSlideForm && (
              <button
                onClick={() => {
                  handleResetSlideForm();
                  setShowSlideForm(true);
                }}
                className="px-5 py-2.5 bg-[#FF6A00] text-black font-display font-extrabold uppercase rounded shadow-lg text-xs tracking-wider hover:bg-[#FF8533] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                YENİ SLAYT EKLE
              </button>
            )}
          </div>

          {/* ADD / EDIT SLIDE FORM MODULE */}
          {showSlideForm && (
            <div className="p-6 bg-[#161617] border border-[#262629] rounded-xl space-y-6">
              <div className="border-b border-[#262629] pb-3">
                <h4 className="font-display font-black text-sm text-[#FF6A00] uppercase tracking-wide">
                  {editingSlideId ? '✏️ SLAYT GÖRSELİNİ DÜZENLE' : '✨ YENİ ANASAYFA SLAYTI TASARLA'}
                </h4>
                <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  Her slayt estetik görseller, etiketler ve dinamik yönlendirici CTA butonları içerebilir.
                </p>
              </div>

              <form onSubmit={handleSaveSlide} className="space-y-6 text-zinc-300 font-mono text-xs">
                {/* 1. Header category tag & Image selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Küçük Kategori Etiketi Metni</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Yarış Hamuru ve Yol Hakimiyeti"
                      value={slideTagText}
                      onChange={(e) => setSlideTagText(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Arka Plan Işıltı Rengi (Glow)</span>
                    <select
                      value={slideBgGlowColor}
                      onChange={(e) => setSlideBgGlowColor(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    >
                      <option value="bg-[#FF6A00]/15">Turuncu Hüzme (bg-[#FF6A00]/15)</option>
                      <option value="bg-emerald-500/10">Yeşil Güvence Hüzmesi (bg-emerald-500/10)</option>
                      <option value="bg-blue-500/10">Mavi Hızlı Kargo Hüzmesi (bg-blue-500/10)</option>
                      <option value="bg-purple-500/10">Mor Hüzme (bg-purple-500/10)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Ürün Fotoğrafı Şablonu</span>
                    <select
                      value={slideImage}
                      onChange={(e) => setSlideImage(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    >
                      <option value="hero_tires">Ana Sayfa İkili Lastik Seti (Önerilen)</option>
                      <option value="product_tire">Tekli Jantlı Spor Lastik</option>
                      <option value="custom">Özel İnternet Linki (Aşağıya Yazın)</option>
                    </select>
                  </div>
                </div>

                {/* If custom image selected, show input */}
                {slideImage === 'custom' && (
                  <div className="flex flex-col gap-1.5 animate-fadeIn">
                    <span className="text-[#FF6A00]">Özel Slayt Görsel Linki (URL)</span>
                    <input
                      type="text"
                      required
                      placeholder="https://images.unsplash.com/... formatında link yapıştırın"
                      value={slideCustomImageUrl}
                      onChange={(e) => setSlideCustomImageUrl(e.target.value)}
                      className="bg-[#0F0F10] border border-[#FF6A00]/30 rounded px-3 py-2 text-white text-[11px]"
                    />
                  </div>
                )}

                {/* 2. Titles block */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-zinc-400">Ana Başlık (İlk Bölüm - Beyaz Metin)</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: LASTİKTE VEYA KAMPANYADA"
                      value={slideTitle}
                      onChange={(e) => setSlideTitle(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white uppercase text-sm font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[#FF6A00] font-bold">Vurgulu Başlık Bölümü (Turuncu Renkli)</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: FIRSAT GÜNLERİ VEYA DÖNÜŞÜM"
                      value={slideTitleGradient}
                      onChange={(e) => setSlideTitleGradient(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white uppercase text-sm font-bold"
                    />
                  </div>
                </div>

                {/* 3. Description text */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-400">Detaylı Slayt Açıklaması (Turkish)</span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Slaytta gösterilecek olan 2-3 cümlelik göz alıcı kampanya veya hizmet tanıtımı metnini girin..."
                    value={slideDescription}
                    onChange={(e) => setSlideDescription(e.target.value)}
                    className="w-full bg-[#0F0F10] border border-[#262629] rounded p-3 text-white leading-relaxed"
                  />
                </div>

                {/* 4. Action buttons mapping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-zinc-900 bg-black/35 rounded-lg">
                  <div className="space-y-4">
                    <span className="text-white font-black block text-xs border-b border-zinc-800 pb-1.5">🥇 BİRİNCİL AKSİYON BUTONU</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-500">Buton Metni</span>
                        <input
                          type="text"
                          required
                          placeholder="Hemen Lastik Bul"
                          value={slidePrimaryBtnText}
                          onChange={(e) => setSlidePrimaryBtnText(e.target.value)}
                          className="bg-black border border-zinc-800 rounded px-2.5 py-2 text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-500">Butonun Yapacağı İş</span>
                        <select
                          value={slidePrimaryActionType}
                          onChange={(e) => setSlidePrimaryActionType(e.target.value as any)}
                          className="bg-black border border-zinc-800 rounded px-2.5 py-2 text-white"
                        >
                          <option value="find_tires">Lastik Arama Sihirbazını Aç</option>
                          <option value="browse_catalog">Alışveriş / Ürün Kataloğunu Aç</option>
                          <option value="filter_all_terrain">All-Terrain / Arazi Filtresi Uygula</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-white font-black block text-xs border-b border-zinc-800 pb-1.5">🥈 İKİNCİL AKSİYON BUTONU</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-500">Buton Metni</span>
                        <input
                          type="text"
                          required
                          placeholder="Kataloğa Göz At"
                          value={slideSecondaryBtnText}
                          onChange={(e) => setSlideSecondaryBtnText(e.target.value)}
                          className="bg-black border border-zinc-800 rounded px-2.5 py-2 text-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-500">Butonun Yapacağı İş</span>
                        <select
                          value={slideSecondaryActionType}
                          onChange={(e) => setSlideSecondaryActionType(e.target.value as any)}
                          className="bg-black border border-zinc-800 rounded px-2.5 py-2 text-white"
                        >
                          <option value="browse_catalog">Alışveriş / Ürün Kataloğunu Aç</option>
                          <option value="find_tires">Lastik Arama Sihirbazını Aç</option>
                          <option value="filter_all_terrain">All-Terrain / Arazi Filtresi Uygula</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Floating badge parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border border-zinc-900 bg-black/20 rounded-lg">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-white font-bold font-mono">Sağ Alttaki Küçük Kart Başlığı (Badge)</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: MOBİL MONTAJ HİZMETİ"
                      value={slideBadgeLabel}
                      onChange={(e) => setSlideBadgeLabel(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-white font-bold font-mono">Küçük Kart Değeri / Alt Metni</span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Kapınızın Önünde"
                      value={slideBadgeValue}
                      onChange={(e) => setSlideBadgeValue(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* 6. Technical Stats 3 grid points */}
                <div className="space-y-4">
                  <span className="text-white font-extrabold text-[10px] tracking-widest text-[#FF6A00] block uppercase">
                    ⭐️ SLAYT ALTINDA BULUNAN 3 LİSTELİ KAMPANYA DETAY SAYAÇLARI (STATS GRIDS)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat 1 */}
                    <div className="p-4 bg-zinc-900/40 rounded border border-zinc-800 space-y-3 font-mono">
                      <span className="text-white font-bold text-xs uppercase block border-b border-zinc-800 pb-1">Sayaç 1</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Değer (Örn: 10B+ veya 100%)</span>
                        <input type="text" value={stat1Value} onChange={(e) => setStat1Value(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="10B+" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Etiket (Örn: Tamamlanan Montaj)</span>
                        <input type="text" value={stat1Label} onChange={(e) => setStat1Label(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="Tamamlanan Montaj" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] text-zinc-400">
                        <input type="checkbox" checked={stat1Highlight} onChange={(e) => setStat1Highlight(e.target.checked)} className="w-3.5 h-3.5 accent-[#FF6A00]" />
                        Turuncu ile Vurgula
                      </label>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-4 bg-zinc-900/40 rounded border border-zinc-800 space-y-3 font-mono">
                      <span className="text-white font-bold text-xs uppercase block border-b border-zinc-800 pb-1">Sayaç 2</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Değer (Örn: 10 Kat veya %100)</span>
                        <input type="text" value={stat2Value} onChange={(e) => setStat2Value(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="%100" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Etiket (Örn: DOT Onaylı)</span>
                        <input type="text" value={stat2Label} onChange={(e) => setStat2Label(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="DOT Onaylı" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] text-zinc-400">
                        <input type="checkbox" checked={stat2Highlight} onChange={(e) => setStat2Highlight(e.target.checked)} className="w-3.5 h-3.5 accent-[#FF6A00]" />
                        Turuncu ile Vurgula
                      </label>
                    </div>

                    {/* Stat 3 */}
                    <div className="p-4 bg-zinc-900/40 rounded border border-zinc-800 space-y-3 font-mono">
                      <span className="text-white font-bold text-xs uppercase block border-b border-zinc-800 pb-1">Sayaç 3</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Değer (Örn: 0 Faiz veya Ücretsiz)</span>
                        <input type="text" value={stat3Value} onChange={(e) => setStat3Value(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="0 Faiz" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-zinc-500">Etiket (Örn: Taksit Seçeneği)</span>
                        <input type="text" value={stat3Label} onChange={(e) => setStat3Label(e.target.value)} className="bg-[#0f0f10] border border-zinc-800 rounded px-2.5 py-1.5 text-white" required placeholder="Taksit Seçeneği" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] text-zinc-400">
                        <input type="checkbox" checked={stat3Highlight} onChange={(e) => setStat3Highlight(e.target.checked)} className="w-3.5 h-3.5 accent-[#FF6A00]" />
                        Turuncu ile Vurgula
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262629]/50">
                  <button
                    type="button"
                    onClick={handleResetSlideForm}
                    className="px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 transition-all font-bold"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-display font-extrabold uppercase transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    {editingSlideId ? 'GÜNCELLEMEYİ KAYDET' : 'SLAYT EKLE VE YAYINLA'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* LIST OF CURRENT SLIDES */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-sm text-zinc-400 uppercase tracking-widest text-left font-mono">
              Mevcut Yayındaki Skaytlar ({slides.length})
            </h4>

            {slides.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-[#262629] rounded-xl bg-[#1B1B1D]/20">
                <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400">Hiçbir slider slaytı bulunamadı. Yeni slayt tasarlayarak başlayın!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {slides.map((slip, i) => (
                  <div
                    key={slip.id}
                    className="p-5 bg-black/40 border border-[#262629] rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-zinc-800 transition-all text-left"
                  >
                    <div className="flex items-start md:items-center gap-5 flex-1">
                      {/* Slayt badge icon sequence */}
                      <div className="h-10 w-10 shrink-0 bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] rounded-lg flex items-center justify-center font-mono font-bold text-sm">
                        {i + 1}
                      </div>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-[10px] text-zinc-400 font-mono uppercase">
                            {slip.tagText}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            ID: {slip.id}
                          </span>
                        </div>

                        <h5 className="text-white font-display font-black text-sm uppercase leading-tight tracking-tight">
                          {slip.title} <span className="text-[#FF6A00]">{slip.titleGradient}</span>
                        </h5>

                        <p className="text-zinc-400 text-[11px] leading-relaxed max-w-2xl font-mono">
                          {slip.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
                          <span>🎯 Buton 1: <strong className="text-zinc-300">{slip.primaryBtnText}</strong> ({slip.primaryActionType})</span>
                          <span>🎯 Buton 2: <strong className="text-zinc-300">{slip.secondaryBtnText}</strong> ({slip.secondaryActionType})</span>
                          <span>🏷️ Küçük Kart: <strong className="text-zinc-300">{slip.badgeLabel} &bull; {slip.badgeValue}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Slide Photo preview & actions */}
                    <div className="flex md:flex-col lg:flex-row items-center gap-4 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t border-zinc-900 md:border-none">
                      <div className="h-12 w-20 bg-zinc-900 rounded border border-zinc-800 overflow-hidden flex items-center justify-center p-1 shrink-0">
                        <img
                          src={slip.image}
                          className="max-h-10 w-auto object-contain"
                          alt="Slayt Önizleme"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => handleStartEditSlide(slip)}
                          className="p-2 bg-zinc-800 text-zinc-300 hover:text-white rounded hover:bg-zinc-700 transition-all font-mono"
                          title="Düzenle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSlide(slip.id)}
                          className="p-2 bg-red-500/10 text-red-400 hover:text-white hover:bg-red-500 rounded transition-all font-mono"
                          title="Slaytı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: FEATURED CATALOGS MANAGEMENT ==================== */}
      {adminTab === 'catalogs' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Action Block */}
          <div className="flex items-center justify-between border-b border-[#262629]/80 pb-4">
            <div>
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                🏁 Öne Çıkan Katalogları Özelleştir
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-1 uppercase tracking-wider">
                Anasayfada sergilenen özel lastik serilerini ve başlıklarını tasarlayın
              </p>
            </div>

            {!showCatalogForm && (
              <button
                onClick={() => {
                  handleResetCatalogForm();
                  setShowCatalogForm(true);
                }}
                className="bg-[#FF6A00] text-black font-display font-black text-xs uppercase px-5 py-2.5 rounded hover:bg-[#FF8533] transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                YENİ KATALOG EKLE
              </button>
            )}
          </div>

          {/* CATALOG EDIT / CREATE FORM */}
          {showCatalogForm && (
            <div className="bg-[#121214] border border-[#262629] rounded-xl p-6 space-y-6 antialiased text-left">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <h4 className="font-display font-black text-sm text-[#FF6A00] uppercase tracking-wider">
                  {editingCatalogId ? '📝 KATALOG BİLGİLERİNİ GÜNCELLE' : '✨ YENİ ÖNE ÇIKAN KATALOG OLUŞTUR'}
                </h4>
                <button
                  type="button"
                  onClick={handleResetCatalogForm}
                  className="text-zinc-500 hover:text-white font-mono text-xs uppercase"
                >
                  [ Kapat ]
                </button>
              </div>

              <form onSubmit={handleSaveCatalog} className="space-y-6">
                
                {/* 1. Meta Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-white font-extrabold text-xs font-mono uppercase text-zinc-300">
                      Katalog Başlığı <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Örn: 🏎️ Hız ve Pist Tutkunları Özel Serisi"
                      value={catalogTitle}
                      onChange={(e) => setCatalogTitle(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-white font-extrabold text-xs font-mono uppercase text-zinc-300">
                      Katalog Alt Başlığı (Açıklama / Slogan)
                    </span>
                    <input
                      type="text"
                      placeholder="Örn: Maksimum kuru yol tutuşu ve yüksek viraj limiti sağlayan şampiyon lastikler"
                      value={catalogSubtitle}
                      onChange={(e) => setCatalogSubtitle(e.target.value)}
                      className="bg-[#0F0F10] border border-[#262629] rounded px-3 py-2 text-white focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>
                </div>

                {/* 2. CHOSEN PRODUCTS IN THIS CATALOG (İçindekileri Seç / Sil) */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-[#FF6A00] uppercase tracking-wider block">
                    ⭐️ KATALOG İÇİNDEKİ LASTİKLER ({catalogProductIds.length}) &bull; İSTEDİĞİNİZİ SEÇİP SİLEBİLİRSİNİZ
                  </span>

                  {catalogProductIds.length === 0 ? (
                    <div className="py-8 text-center border border-dashed border-[#262629] rounded-lg bg-black/30">
                      <p className="text-xs text-zinc-500 font-mono">
                        Seçilmiş lastik bulunamadı. Aşağıdan &ldquo;Kataloğa Ekle&rdquo; butonunu kullanarak lastik seçin.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                      {catalogProductIds.map(pId => {
                        const targetProduct = products.find(p => p.id === pId);
                        if (!targetProduct) return null;
                        return (
                          <div
                            key={pId}
                            className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-lg flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono uppercase">
                                {targetProduct.type}
                              </span>
                              <div>
                                <strong className="text-white block uppercase">{targetProduct.brand} {targetProduct.model}</strong>
                                <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">
                                  {targetProduct.size} &bull; {targetProduct.price} TL
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveProductFromCatalog(pId)}
                              className="text-red-400 hover:text-white px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500 text-[10px] font-mono font-bold uppercase transition-all"
                              title="Tekerleği katalogdan kaldır"
                            >
                              Katalogdan Sil
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. STORE INVENTORY FINDER (Kataloğa Ekleme için Seçim) */}
                <div className="p-4 bg-black/30 border border-zinc-900 rounded-lg space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div>
                      <span className="text-xs font-mono font-bold text-white uppercase block">
                        ⚙️ MAĞAZA KATALOĞUNDAN LASTİK EKLEYİN
                      </span>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">
                        Aşağıdaki listeden dilediğiniz lastiğin yanındaki butona tıklayarak kataloğa ekleyebilirsiniz
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Örn: Pilot Sport, 275/35..."
                        value={catalogSearchQuery}
                        onChange={(e) => setCatalogSearchQuery(e.target.value)}
                        className="w-full bg-[#1B1B1D] border border-[#262629] text-[11px] px-3 py-1.5 pl-8 rounded text-white focus:outline-none focus:border-[#FF6A00] font-mono"
                      />
                      <span className="absolute left-2.5 top-2 text-zinc-500 text-[11px]">🔍</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {products
                      .filter(prod => {
                        if (!catalogSearchQuery) return true;
                        const s = catalogSearchQuery.toLowerCase();
                        return prod.brand.toLowerCase().includes(s) ||
                          prod.model.toLowerCase().includes(s) ||
                          prod.size.toLowerCase().includes(s) ||
                          prod.type.toLowerCase().includes(s);
                      })
                      .map(prod => {
                        const isAdded = catalogProductIds.includes(prod.id);
                        return (
                          <div
                            key={prod.id}
                            className="p-2.5 bg-[#161618] border border-zinc-850 rounded flex items-center justify-between gap-3 text-[11px]"
                          >
                            <div>
                              <strong className="text-zinc-300 block">{prod.brand} &bull; {prod.model}</strong>
                              <span className="text-[10px] text-zinc-500 font-mono">{prod.size} &bull; {prod.price} TL</span>
                            </div>

                            {isAdded ? (
                              <button
                                type="button"
                                onClick={() => handleRemoveProductFromCatalog(prod.id)}
                                className="px-2 py-1 rounded bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black font-mono font-bold uppercase text-[9px] transition-all"
                              >
                                &bull; Ekli (Sil)
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAddProductToCatalog(prod.id)}
                                className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono font-bold uppercase text-[9px] transition-all"
                              >
                                + Kataloğa Ekle
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#262629]/50">
                  <button
                    type="button"
                    onClick={handleResetCatalogForm}
                    className="px-5 py-2.5 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700 transition-all font-bold text-xs"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#FF6A00] text-black font-display font-black hover:bg-[#FF8533] rounded uppercase transition-all flex items-center gap-2 text-xs"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    {editingCatalogId ? 'GÜNCELLEMEYİ KAYDET' : 'KATALOĞU OLUŞTUR VE YAYINLA'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* LIST OF CURRENTLY SAVED CATALOGS */}
          <div className="space-y-4 text-left">
            <h4 className="font-display font-extrabold text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Aktif Yayındaki Özel Kataloglar ({catalogs.length})
            </h4>

            {catalogs.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-[#262629] rounded-xl bg-[#1B1B1D]/20">
                <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <p className="text-xs text-zinc-400 font-mono">Hiçbir öne çıkan katalog bulunamadı. Yeni bir tane ekleyerek anasayfayı canlandırın!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {catalogs.map((cat, i) => (
                  <div
                    key={cat.id}
                    className="p-5 bg-black/40 border border-[#262629] rounded-xl flex flex-col justify-between hover:border-zinc-800 transition-all space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] px-2 py-0.5 rounded uppercase font-bold">
                          Katalog #{i + 1}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleStartEditCatalog(cat)}
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded hover:text-white transition-all"
                            title="Düzenle / Ekle / Sil"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCatalog(cat.id)}
                            className="p-1.5 bg-red-900/20 hover:bg-red-600 text-red-400 hover:text-white rounded transition-all"
                            title="Kataloğu Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-white font-display font-black text-base uppercase leading-snug">
                          {cat.title}
                        </h5>
                        <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                          {cat.subtitle || 'Bu katalog için bir açıklama girilmedi.'}
                        </p>
                      </div>

                      {/* Mini visual summary of products inside */}
                      <div className="border-t border-zinc-900 pt-3">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase block mb-2">
                          İçerik ({cat.productIds.length} Lastik):
                        </span>

                        {cat.productIds.length === 0 ? (
                          <span className="text-[10px] text-zinc-500 italic font-mono uppercase">Boş Katalog</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {cat.productIds.map(pId => {
                              const matchP = products.find(p => p.id === pId);
                              if (!matchP) return null;
                              return (
                                <span
                                  key={pId}
                                  className="text-[9px] bg-zinc-900 text-zinc-300 border border-zinc-800/80 px-2 py-0.5 rounded font-mono uppercase flex items-center gap-1"
                                >
                                  {matchP.brand} &bull; {matchP.model}
                                  <button
                                    onClick={() => {
                                      if (confirm(`${matchP.brand} lastiğini bu katalogdan kaldırmak istediğinize emin misiniz?`)) {
                                        setCatalogs(prev => prev.map(c => c.id === cat.id ? {
                                          ...c,
                                          productIds: c.productIds.filter(id => id !== pId)
                                        } : c));
                                        showToast('Lastik katalogdan kaldırıldı.');
                                      }
                                    }}
                                    className="text-red-500 hover:text-red-400 font-bold ml-1 text-[11px] leading-none"
                                    title="Katalogdan Çıkar"
                                  >
                                    &times;
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

