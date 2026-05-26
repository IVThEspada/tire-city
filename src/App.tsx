import React, { useState, useRef, useEffect } from 'react';
import { TireProduct, CartItem, TireType, BrandLogo, CustomSlide, FeaturedCatalog, SafetyRatingConfig } from './types';
import { PRODUCTS, BRANDS, IMAGE_HERO_TIRES, IMAGE_TREAD_BG } from './data';

// Component imports
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import TireCompare from './components/TireCompare';
import HeroSlider, { DEFAULT_SLIDES } from './components/HeroSlider';
import TireFinder from './components/TireFinder';
import BrandStrip from './components/BrandStrip';
import ProductCard from './components/ProductCard';
import ShopSidebar from './components/ShopSidebar';
import AdminCustomizeView from './components/AdminCustomizeView';

// Page Views
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import BrandsView from './components/BrandsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import UserProfile from './components/UserProfile';
import DedicatedCart from './components/DedicatedCart';
import TireCheckout from './components/TireCheckout';

// Direct Lucide icons imports for descriptive grids
import { 
  Flame, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Navigation, 
  CheckCircle2, 
  Wrench, 
  Truck, 
  Compass, 
  ArrowUpRight, 
  AlertCircle,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  X,
  Sun,
  Moon
} from 'lucide-react';

export const DEFAULT_CATALOGS: FeaturedCatalog[] = [
  {
    id: 'cat-pist',
    title: '🏎️ HIZ VE PİST TUTKUNLARI ÖZEL SEÇİMİ',
    subtitle: 'Maksimum kuru yol tutuşu ve yüksek viraj kontrolü sunan ultra yüksek performanslı lastikler',
    productIds: ['prod-mich-pilot', 'prod-yoko-advan']
  },
  {
    id: 'cat-kis',
    title: '❄️ ZORLU HAVA KOŞULLARI ŞAMPİYONLARI',
    subtitle: 'Kar, yağmur ve dondurucu soğuklarda üst düzey yol tutuş ve fren güvenliği sağlayan seriler',
    productIds: ['prod-pirelli-zero', 'prod-conti-sport']
  }
];

export const DEFAULT_SAFETY_CONFIG: SafetyRatingConfig = {
  badgeText: '⚡ YÜKSEK HIZ VE GÜVENLİK DERECELENDİRMESİ',
  title: 'TIRE CITY HAKKINDA • KURULUŞ 2012',
  desc1: "Tire City'de misyonumuz sadece e-ticaretin ötesine geçer. Performansı doğrulanmış kauçuk bileşen şablonlarıyla güvenli otomotiv güvenlik konfigürasyonları oluşturuyoruz. Gelişmiş İsveç stüdyo renderlarını gerçek zamanlı DOT hizalama hesaplayıcıları ile birleştirerek, yüksek beygir gücündeki sedanınızın veya arazi Jeep'inizin sertifikalı ofsetlerde sürüş yapmasını sağlıyoruz.",
  desc2: 'Son teknoloji mobil montaj filomuz, dijital lazer dengeleyicileri doğrudan çalışma alanınıza getirerek sizi değerli pist saatlerinden tasarruf ettirir. Premium lastik dağıtımının nasıl bir his olduğunu deneyimleyin.',
  bgUrl: '',
  badge1Label: '12 AYLIK',
  badge1Sub: 'Yol Hasarı Koruması',
  badge2Label: 'SERTİFİKALI',
  badge2Sub: 'Usta Garaj Teknisyenleri'
};

export default function App() {
  // Theme state: defaults to 'dark' or retrieves from local history if present
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('tire-city-theme') as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tire-city-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Routing & detailed components states
  const [activeTab, setActiveTab] = useState('home');
  const [allProducts, setAllProducts] = useState<TireProduct[]>(() => {
    const saved = localStorage.getItem('tire-city-products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [brands, setBrands] = useState<BrandLogo[]>(() => {
    const saved = localStorage.getItem('tire-city-brands');
    return saved ? JSON.parse(saved) : BRANDS;
  });

  const [slides, setSlides] = useState<CustomSlide[]>(() => {
    const saved = localStorage.getItem('tire-city-slides');
    return saved ? JSON.parse(saved) : DEFAULT_SLIDES;
  });

  const [catalogs, setCatalogs] = useState<FeaturedCatalog[]>(() => {
    const saved = localStorage.getItem('tire-city-catalogs');
    return saved ? JSON.parse(saved) : DEFAULT_CATALOGS;
  });

  const [aboutText, setAboutText] = useState<string>(() => {
    return localStorage.getItem('tire-city-aboutText') || 
      `On yılı aşkın bir süre önce, sıradan ve rehberliği olmayan lastik dağıtım ağlarına tepki olarak kurulan Tire City, ülke çapında tamamlanan 10.000'den fazla memnun montaj ile sektöründe fark yaratmıştır.\n\nProfesyonel CAD boyutlandırma planlarını, onaylı mekanik doğrulama indekslerini ve yüksek düzeyde kalibre edilmiş DOT veri tabanı kontrollerini birleştirerek, her sürücünün güvenli ve optimize edilmiş performans limitlerinin keyfini çıkarmasını sağlıyoruz.`;
  });

  const [contactPhone, setContactPhone] = useState<string>(() => {
    return localStorage.getItem('tire-city-contactPhone') || '+1 (800) 555-TIRE';
  });

  const [contactEmail, setContactEmail] = useState<string>(() => {
    return localStorage.getItem('tire-city-contactEmail') || 'support@tirecityperformance.com';
  });

  const [contactAddress, setContactAddress] = useState<string>(() => {
    return localStorage.getItem('tire-city-contactAddress') || '100 Track Way, Speedway CA 90412';
  });

  const [workingHours, setWorkingHours] = useState<string>(() => {
    return localStorage.getItem('tire-city-workingHours') || 'Hafta İçi: 07:00 — 20:00\nHafta Sonu: 08:00 — 17:00 (Pist Desteği Öncelikli)';
  });

  const [safetyConfig, setSafetyConfig] = useState<SafetyRatingConfig>(() => {
    const saved = localStorage.getItem('tire-city-safety-config');
    return saved ? JSON.parse(saved) : DEFAULT_SAFETY_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('tire-city-products', JSON.stringify(allProducts));
  }, [allProducts]);

  useEffect(() => {
    localStorage.setItem('tire-city-brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('tire-city-slides', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem('tire-city-catalogs', JSON.stringify(catalogs));
  }, [catalogs]);

  useEffect(() => {
    localStorage.setItem('tire-city-aboutText', aboutText);
  }, [aboutText]);

  useEffect(() => {
    localStorage.setItem('tire-city-contactPhone', contactPhone);
  }, [contactPhone]);

  useEffect(() => {
    localStorage.setItem('tire-city-contactEmail', contactEmail);
  }, [contactEmail]);

  useEffect(() => {
    localStorage.setItem('tire-city-contactAddress', contactAddress);
  }, [contactAddress]);

  useEffect(() => {
    localStorage.setItem('tire-city-workingHours', workingHours);
  }, [workingHours]);

  useEffect(() => {
    localStorage.setItem('tire-city-safety-config', JSON.stringify(safetyConfig));
    setAboutText(safetyConfig.desc1);
  }, [safetyConfig]);

  const [activeProduct, setActiveProduct] = useState<TireProduct | null>(null);

  // Cart list
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Comparatives lists
  const [compareProducts, setCompareProducts] = useState<TireProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Driver favorites (wishlist) list
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Sorting and Price range filters
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 600]);

  // Search filter configuration state
  const [searchFilter, setSearchFilter] = useState<{
    brand?: string;
    type?: TireType;
    width?: number;
    ratio?: number;
    diameter?: number;
    compatibleProductIds?: string[];
    vehicleLabel?: string;
    query?: string;
  }>({});

  // Layout Scroll Reference for CTA action binds
  const finderRef = useRef<HTMLDivElement>(null);

  const scrollToFinder = () => {
    setActiveTab('home');
    setActiveProduct(null);
    setTimeout(() => {
      finderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Synchronize detailed product changes with core catalog updates
  const activeProductSync = activeProduct 
    ? allProducts.find(p => p.id === activeProduct.id) || activeProduct
    : null;

  // Add to cart action Handler
  const handleAddToCart = (product: TireProduct, quantity = 4, size = product.size, withInstallation = true) => {
    setCartItems((prev) => {
      const existsIdx = prev.findIndex((item) => item.product.id === product.id && item.selectedSize === size);
      if (existsIdx > -1) {
        const updated = [...prev];
        updated[existsIdx].qty += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          qty: quantity,
          selectedSize: size,
          withInstallation,
          installationCost: 19.99, // flat installation rate
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, val: number) => {
    if (val < 1) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty: val } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Compare toggler
  const handleToggleCompare = (product: TireProduct) => {
    setCompareProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        // limit comparison to max 3 tires
        alert('En fazla 3 adet performans lastiğini yan yana karşılaştırabilirsiniz.');
        return prev;
      }
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  const handleRemoveCompare = (product: TireProduct) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Submitting dynamic customer review
  const handleAddReview = (productId: string, newReview: Omit<TireProduct['reviews'][0], 'id' | 'date' | 'helpfulCount'>) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId) {
          const formattedReview = {
            ...newReview,
            id: `rev-gen-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            helpfulCount: 0,
          };
          return {
            ...p,
            reviews: [formattedReview, ...p.reviews],
            reviewCount: p.reviewCount + 1,
            // Recalculate slightly adjusted rating
            rating: parseFloat(((p.rating * p.reviewCount + newReview.rating) / (p.reviewCount + 1)).toFixed(1)),
          };
        }
        return p;
      })
    );
  };

  // Searching logic based on active filters and pricing sliders
  const filteredProducts = allProducts.filter((product) => {
    // 1. Text Query
    if (searchFilter.query) {
      const q = searchFilter.query.toLowerCase();
      const matchBrandOrModel =
        product.brand.toLowerCase().includes(q) ||
        product.model.toLowerCase().includes(q) ||
        product.size.toLowerCase().includes(q) ||
        product.type.toLowerCase().includes(q);
      if (!matchBrandOrModel) return false;
    }

    // 2. Compatibility selection checks override
    if (searchFilter.compatibleProductIds && searchFilter.compatibleProductIds.length > 0) {
      return searchFilter.compatibleProductIds.includes(product.id);
    }

    // 3. Dimensional sizing filters
    if (searchFilter.width && product.width !== searchFilter.width) return false;
    if (searchFilter.ratio && product.ratio !== searchFilter.ratio) return false;
    if (searchFilter.diameter && product.diameter !== searchFilter.diameter) return false;

    // 4. Brand filters
    if (searchFilter.brand && product.brand !== searchFilter.brand) return false;

    // 5. Compound category filters
    if (searchFilter.type && product.type !== searchFilter.type) return false;

    // 6. Sliding Pricing budget filters
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'popular') {
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
    return 0; // default is recommended orders
  });

  return (
    <div className="min-h-screen bg-[#0F0F10] dark:bg-[#0F0F10] light:bg-[#F5F7FA] text-[#EAEAEA] dark:text-[#EAEAEA] light:text-[#334155] flex flex-col antialiased transition-colors">
      
      {/* Navigation Headers */}
      <Header
        activeTab={activeTab}
        onTabSelect={(tab) => {
          setActiveTab(tab);
          setActiveProduct(null); // return to lists when navigating top bars
          if (tab === 'shop') setSearchFilter({}); // clear filters to browse all wheels
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.qty, 0)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        compareCount={compareProducts.length}
        onCompareToggle={() => setIsCompareOpen(!isCompareOpen)}
        onSearch={(q) => setSearchFilter({ query: q })}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />

      {/* Main Container Stage */}
      <main className="flex-1">
        
        {/* If viewing single detailed product detail page */}
        {activeProductSync ? (
          <ProductDetail
            product={activeProductSync}
            onBack={() => {
              setActiveProduct(null);
              // scroll lock back top
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onAddToCart={(prod, qty, size, withIns) => handleAddToCart(prod, qty, size, withIns)}
            onProductClick={(p) => {
              setActiveProduct(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            relatedProducts={allProducts.filter((p) => p.brand === activeProductSync.brand && p.id !== activeProductSync.id)}
            onAddReview={(pId, r) => handleAddReview(pId, r)}
            activeCompareIds={compareProducts.map((p) => p.id)}
            onToggleCompare={handleToggleCompare}
          />
        ) : (
          <>
            {/* TAB: Home Layout */}
            {activeTab === 'home' && (
              <HomeView
                onFindTiresClick={scrollToFinder}
                onBrowseCatalogClick={() => {
                  setActiveTab('shop');
                  setSearchFilter({});
                }}
                onFilterTypeClick={(type) => {
                  setSearchFilter({ type: type as any });
                  // Scroll automatically to catalogue list to view results
                  setTimeout(() => {
                    const element = document.getElementById('featured-grid-anchor');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                filteredProducts={filteredProducts}
                setActiveProduct={setActiveProduct}
                onAddToCart={(p, q, sz, withIns) => handleAddToCart(p, q, sz, withIns)}
                onToggleCompare={handleToggleCompare}
                compareProducts={compareProducts}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                finderRef={finderRef}
                brandsList={brands}
                slidesList={slides}
                catalogsList={catalogs}
                safetyConfig={safetyConfig}
              />
            )}

            {activeTab === 'home-disabled' && (
              <div>
                
                {/* 1. HERO SLIDESHOW MODULE */}
                <HeroSlider
                  onFindTiresClick={scrollToFinder}
                  onBrowseCatalogClick={() => {
                    setActiveTab('shop');
                    setSearchFilter({});
                  }}
                  onFilterTypeClick={(type) => {
                    setSearchFilter({ type: type as any });
                    // Scroll automatically to catalogue list to view results
                    setTimeout(() => {
                      const element = document.getElementById('featured-grid-anchor');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                />

                {/* 2. TABBED FINDER CONTAINER MODULE */}
                <span ref={finderRef} />
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 sm:-mt-12 relative z-20">
                  <TireFinder
                    onFilterChange={(filters) => {
                      setSearchFilter(filters);
                      // Scroll automatically to catalogue list to view results
                      const element = document.getElementById('featured-grid-anchor');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    onReset={() => setSearchFilter({})}
                  />
                </section>

                {/* 3. BRAND STRIP WITH DYNAMIC HOVERS */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="p-8 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] shadow-md animate-fadeIn">
                    <BrandStrip
                      onBrandSelect={(brand) => {
                        setSearchFilter({ brand });
                        setActiveTab('shop');
                      }}
                      selectedBrand={searchFilter.brand}
                    />
                  </div>
                </section>

                {/* 4. ACTIVE FILTER / COMPATIBILITY REPORT RIBBON & FEATURED PRODUCTS GRID */}
                <section id="featured-grid-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
                  
                  {/* Title & configuration filters tag */}
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#262629] pb-6 mb-8 gap-4">
                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                        {searchFilter.compatibleProductIds ? '⚡ ARACINIZA ÖZEL TAVSİYELER' : '🏁 Öne Çıkan Lastik Kataloğu'}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-wider">
                        {filteredProducts.length} PREMİUM PERFORMANS SEÇENEĞİ GÖSTERİLİYOR
                      </p>
                    </div>

                    {/* Interactive state clear pill if filtering active */}
                    {Object.keys(searchFilter).length > 0 && (
                      <button
                        onClick={() => setSearchFilter({})}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Aktif Filtreleri Temizle &bull; Hepsini Göster
                      </button>
                    )}
                  </div>

                  {/* Active customized vehicle banner feedback or width size verification banner */}
                  {searchFilter.vehicleLabel && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg mb-8 flex items-center justify-between gap-4 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                        <span className="text-xs text-white leading-relaxed font-mono">
                          <strong className="text-emerald-400 uppercase">UYUM GARANTİLİ:</strong>{' '}
                          <span className="underline font-bold text-white">{searchFilter.vehicleLabel}</span> ile uyumlu. Aks hizalama hesaplamalarımız bu lastiklerin aracınızla mükemmel eşleştiğini doğrulamaktadır.
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => setSearchFilter({})}
                        className="text-white hover:text-[#FF6A00] text-xs font-mono font-bold underline whitespace-nowrap"
                      >
                        Seçimi Değiştir
                      </button>
                    </div>
                  )}

                  {/* Renders products grids */}
                  {filteredProducts.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-[#262629] rounded-xl bg-[#1B1B1D]/20">
                      <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <h4 className="font-display font-bold text-base text-white">Eşleşen Lastik Bulunamadı</h4>
                      <p className="text-xs text-gray-400 font-mono max-w-sm mx-auto mt-2 leading-relaxed">
                        Bu genişlik ve oran kriterlerinde stokta ürünümüz bulunmamaktadır. Tüm evrensel modelleri listelemek için yukarıdaki &ldquo;Filtreleri Temizle&rdquo; butonuna tıklayabilirsiniz.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((prod) => (
                        <ProductCard
                          key={prod.id}
                          product={prod}
                          onProductClick={(p) => {
                            setActiveProduct(p);
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          onAddToCart={(p, sz) => handleAddToCart(p, 4, sz, true)}
                          onToggleCompare={handleToggleCompare}
                          isComparing={compareProducts.some((el) => el.id === prod.id)}
                          isWishlisted={wishlist.includes(prod.id)}
                          onToggleWishlist={handleToggleWishlist}
                        />
                      ))}
                    </div>
                  )}
                </section>
                {/* 6. ABOUT SECTION WITH GENERATED INDUSTRIAL TEXTURE BG */}
                <section className="relative overflow-hidden bg-black border-t border-[#262629]/70 py-16 sm:py-24">
                  {/* Floating abstract right layer backdropped using generator texture */}
                  <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-35 lg:opacity-65 mix-blend-luminosity">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
                    <img
                      src={IMAGE_TREAD_BG}
                      className="h-full w-full object-cover"
                      alt="Tire City industrial backdrop"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       {/* Left side info */}
                       <div className="lg:col-span-6 bg-black/80 fallback-dark-box backdrop-blur-md p-8 md:p-12 rounded-xl border border-[#262629] max-w-xl">
                         <div className="text-xs font-mono font-bold tracking-widest text-[#FF6A00] uppercase mb-2">
                           ⚡ YÜKSEK HIZ VE GÜVENLİK DERECELENDİRMESİ
                         </div>
                         <div className="font-display font-black text-3xl sm:text-4xl text-slate-100 tracking-tight leading-none mb-6">
                           TIRE CITY HAKKINDA &bull; KURULUŞ 2012
                         </div>
                         
                         <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                           Tire City'de misyonumuz sadece e-ticaretin ötesine geçer. Performansı doğrulanmış kauçuk bileşen şablonlarıyla güvenli otomotiv güvenlik konfigürasyonları oluşturuyoruz. Gelişmiş İsveç stüdyo renderlarını gerçek zamanlı DOT hizalama hesaplayıcıları ile birleştirerek, yüksek beygir gücündeki sedanınızın veya arazi Jeep'inizin sertifikalı ofsetlerde sürüş yapmasını sağlıyoruz.
                         </p>

                         <p className="text-slate-300 text-xs leading-relaxed mb-8">
                           Son teknoloji mobil montaj filomuz, dijital lazer dengeleyicileri doğrudan çalışma alanınıza getirerek sizi değerli pist saatlerinden tasarruf ettirir. Premium lastik dağıtımının nasıl bir his olduğunu deneyimleyin.
                         </p>

                         <div className="grid grid-cols-2 gap-6 font-mono border-t border-[#262629] pt-6">
                           <div>
                             <span className="text-emerald-400 block font-bold">12 AYLIK</span>
                             <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block">Yol Hasarı Koruması</span>
                           </div>
                           <div>
                             <span className="text-white block font-bold font-black">SERTİFİKALI</span>
                             <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block">Usta Garaj Teknisyenleri</span>
                           </div>
                         </div>
                       </div>
                     </div>
                  </div>
                </section>

              </div>
            )}

            {/* TAB: Shop Catalog Layout Directly */}
            {activeTab === 'shop' && (
              <ShopView
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                allProducts={allProducts}
                filteredProducts={filteredProducts}
                sortBy={sortBy}
                setSortBy={setSortBy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setActiveProduct={setActiveProduct}
                onAddToCart={handleAddToCart}
                onToggleCompare={handleToggleCompare}
                compareProducts={compareProducts}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {activeTab === 'shop-disabled' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-[#262629] pb-6 mb-8">
                  <div>
                    <h2 className="font-display font-black text-3xl text-white dark:text-white light:text-slate-900 tracking-tight uppercase">
                      Tire City Deposu
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      Piste odaklı yaz lastiklerini, kışlık yol tutuş sistemlerini ve ağır hizmet arazi AT lastik profillerini keşfedin.
                    </p>
                  </div>
                </div>

                <div className="mb-10 lg:mb-12">
                  <TireFinder
                    onFilterChange={(filters) => setSearchFilter(filters)}
                    onReset={() => setSearchFilter({})}
                  />
                </div>

                {/* Left Sidebar + Right Products Grid Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  
                  {/* Shop Sidebar module */}
                  <ShopSidebar
                    searchFilter={searchFilter}
                    onFilterChange={setSearchFilter}
                    onReset={() => {
                      setSearchFilter({});
                      setPriceRange([50, 600]);
                      setSortBy('recommended');
                    }}
                    products={allProducts}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                  />

                  {/* Grid Listing View */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between border-b border-[#262629]/50 pb-3 mb-6">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        {filteredProducts.length} Premium Sonuç Bulundu
                      </span>
                      {(Object.keys(searchFilter).length > 0 || sortBy !== 'recommended' || priceRange[0] > 50 || priceRange[1] < 600) && (
                        <button
                          onClick={() => {
                            setSearchFilter({});
                            setPriceRange([50, 600]);
                            setSortBy('recommended');
                          }}
                          className="text-[10px] font-mono font-bold text-[#FF6A00] uppercase hover:underline animate-fadeIn"
                        >
                          Filtreleri Temizle
                        </button>
                      )}
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="py-24 text-center border border-dashed border-[#262629] rounded bg-[#1B1B1D]/10">
                        <span className="text-xs text-gray-400 font-mono block">Arama kriterlerine uygun ebatta lastik bulunamadı.</span>
                        <span className="text-[10.5px] text-gray-500 mt-2 block font-sans">Maksimum bütçe limitini artırmayı veya yukarıdan &ldquo;Filtreleri Temizle&rdquo; seçeneğini deneyebilirsiniz.</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        {filteredProducts.map((prod) => (
                          <ProductCard
                            key={prod.id}
                            product={prod}
                            onProductClick={(p) => {
                              setActiveProduct(p);
                              window.scrollTo({ top: 0, behavior: 'instant' });
                            }}
                            onAddToCart={(p, sz) => handleAddToCart(p, 4, sz, true)}
                            onToggleCompare={handleToggleCompare}
                            isComparing={compareProducts.some((el) => el.id === prod.id)}
                            isWishlisted={wishlist.includes(prod.id)}
                            onToggleWishlist={handleToggleWishlist}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB: Brands Detail View directly */}
            {activeTab === 'brands' && (
              <BrandsView
                onBrandSelect={(bName) => {
                  setSearchFilter({ brand: bName });
                  setActiveTab('shop');
                }}
                brandsList={brands}
              />
            )}

            {activeTab === 'brands-disabled' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
                  YETKİLİ ÜRETİCİ TASARIMLARI
                </h2>
                
                <div className="p-8 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] mb-12">
                  <BrandStrip
                    onBrandSelect={(bName) => {
                      setSearchFilter({ brand: bName });
                      setActiveTab('shop');
                    }}
                    selectedBrand={undefined}
                    brandsList={brands}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-emerald-400 font-bold block mb-1">MICHELIN TEKNOLOJİSİ</span>
                    <p className="text-gray-400 leading-normal">
                      Ağır pist yüklerini desteklemek için tasarlanmış çoklu kauçuk bileşenlerin ve dinamik biyomekanik filtrelerin öncüleri.
                    </p>
                  </div>
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-orange-400 font-bold block mb-1">CONTINENTAL KARKASLARI</span>
                    <p className="text-gray-400 leading-normal">
                      Alman hassas tasarım standartları. Yol Gücü uyumluluğu ve iç gürültü engelleme katmanlarında uzmanlaşmıştır.
                    </p>
                  </div>
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-red-400 font-bold block mb-1">PIRELLI MOTOR SPORLARI</span>
                    <p className="text-gray-400 leading-normal">
                      Formula 1 resmi orijinal ekipman tedarikçisi. Ultra yüksek hız dereceleri ve zorlu viraj G Kuvvetleri için formüle edilmiştir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: About Detail Page */}
            {activeTab === 'about' && (
              <AboutView customAboutText={aboutText} />
            )}

            {activeTab === 'about-disabled' && (
              <div className="max-w-4xl mx-auto px-4 py-16 animate-fadeIn font-mono text-xs text-gray-400 space-y-8">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8 font-sans">
                  TIRE CITY ORİJİNAL ÖZELLİKLERİ
                </h2>

                <div className="space-y-4 font-sans text-sm text-gray-300 leading-relaxed">
                  <p>
                    On yılı aşkın bir süre önce, sıradan ve rehberliği olmayan lastik dağıtım ağlarına tepki olarak kurulan Tire City, ülke çapında tamamlanan 10.000'den fazla memnun montaj ile sektöründe fark yaratmıştır.
                  </p>
                  <p>
                    Profesyonel CAD boyutlandırma planlarını, onaylı mekanik doğrulama indekslerini ve yüksek düzeyde kalibre edilmiş DOT veri tabanı kontrollerini birleştirerek, her sürücünün güvenli ve optimize edilmiş performans limitlerinin keyfini çıkarmasını sağlıyoruz.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Lazer Yol Kuvveti Balansı</span>
                      <span className="text-[11px] block">Her yerel garaj seçiminde mikro titreşimleri önlemek için lazer balans ayarı bulunur.</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
                    <Truck className="w-5 h-5 text-[#FF6A00] flex-shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Kapıda Mobil Montaj</span>
                      <span className="text-[11px] block">Hafta sonu pist saatlerinizi bekleme salonlarında harcamayın. Dinamik hidrolik vanlarımız doğrudan garaj kapınıza gelsin.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Contact Support Page */}
            {activeTab === 'contact' && (
              <ContactView
                phone={contactPhone}
                email={contactEmail}
                address={contactAddress}
                workingHours={workingHours}
              />
            )}

            {/* TAB: Admin Customize Page */}
            {activeTab === 'admin' && (
              <AdminCustomizeView
                products={allProducts}
                setProducts={setAllProducts}
                brands={brands}
                setBrands={setBrands}
                aboutText={aboutText}
                setAboutText={setAboutText}
                contactPhone={contactPhone}
                setContactPhone={setContactPhone}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                contactAddress={contactAddress}
                setContactAddress={setContactAddress}
                workingHours={workingHours}
                setWorkingHours={setWorkingHours}
                slides={slides}
                setSlides={setSlides}
                catalogs={catalogs}
                setCatalogs={setCatalogs}
                safetyConfig={safetyConfig}
                setSafetyConfig={setSafetyConfig}
              />
            )}

            {activeTab === 'contact-disabled' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
                  SÜRÜCÜ DESTEK VE SEVK KANALLARI
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Info */}
                  <div className="lg:col-span-5 space-y-6">
                    <p className="text-gray-400 text-xs font-mono leading-relaxed">
                      Jant yük sınırları, özel kış hız indeksleri veya filo rezervasyon takvimleri ile ilgili sorularınız mı var? Doğrudan usta teknisyenlerimizle iletişime geçin:
                    </p>

                    <div className="space-y-4 font-mono text-xs">
                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">DESTEK HATTI</span>
                          <span className="text-white font-bold text-sm">+1 (800) 555-TIRE</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">TEKNİK DESTEK E-POSTASI</span>
                          <span className="text-white font-bold text-sm">support@tirecityperformance.com</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">GENEL MERKEZ</span>
                          <span className="text-white font-bold">100 Track Way, Speedway CA 90412</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FF6A00]/10 border border-[#FF6A00]/20 rounded text-xs font-mono text-gray-300">
                      <strong>GARAJ ÇALIŞMA SAATLERİ (EST):</strong>
                      <br />Hafta İçi: 07:00 &mdash; 20:00
                      <br />Hafta Sonu: 08:00 &mdash; 17:00 (Pist Desteği Öncelikli)
                    </div>
                  </div>

                  {/* Submission form */}
                  <div className="lg:col-span-7 bg-[#1B1B1D]/40 border border-[#262629] rounded-xl p-6 sm:p-8">
                     <h4 className="font-display font-black text-sm text-white uppercase tracking-wider mb-6">
                       DESTEK TALEBİ GÖNDER
                     </h4>

                     <form onSubmit={(e) => { e.preventDefault(); alert('Teknik destek talebi başarıyla oluşturuldu! Sizinle en kısa sürede iletişime geçeceğiz.'); }} className="space-y-4 font-mono text-xs">
                       <div className="grid grid-cols-2 gap-4">
                         <div className="flex flex-col gap-1.5">
                           <span className="text-zinc-500">Ad Soyad</span>
                           <input type="text" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                         </div>
                         <div className="flex flex-col gap-1.5">
                           <span className="text-zinc-500">E-posta Adresi</span>
                           <input type="email" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                         </div>
                       </div>
                       
                       <div className="flex flex-col gap-1.5">
                         <span className="text-zinc-500">Mevcut Araç Modeli</span>
                         <input type="text" placeholder="Örn: BMW M4 Coupe" className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                       </div>

                       <div className="flex flex-col gap-1.5">
                         <span className="text-zinc-500">Mesaj Detayları</span>
                         <textarea rows={4} required placeholder="Boyutlandırma endişelerinizi, ofset sorgularınızı veya özel performans hedeflerinizi buraya yazın..." className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white"></textarea>
                       </div>

                       <button type="submit" className="w-full py-3.5 bg-[#FF6A00] text-black font-display font-black tracking-wider uppercase rounded hover:bg-[#FF8533] transition-colors">
                         Destek Talebi Gönder
                       </button>
                     </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

             {/* TAB: Driver Profile Page */}
             {activeTab === 'profile' && (
               <UserProfile
                 wishlist={allProducts.filter((p) => wishlist.includes(p.id))}
                 onRemoveWishlist={handleToggleWishlist}
                 onAddToCart={(p) => handleAddToCart(p, 4, p.size, true)}
                 onSelectProduct={(p) => {
                   setActiveProduct(p);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
                 onNavigateTab={(tab) => {
                   setActiveTab(tab);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
               />
             )}

             {/* TAB: Dedicated Cart View Page */}
             {activeTab === 'cart' && (
               <DedicatedCart
                 cartItems={cartItems}
                 onUpdateQty={handleUpdateQty}
                 onRemoveItem={handleRemoveItem}
                 onClearCart={handleClearCart}
                 onSelectProduct={(p) => {
                   setActiveProduct(p);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
                 onNavigateTab={(tab) => {
                   setActiveTab(tab);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
               />
             )}

             {/* TAB: Payment Checkout Page */}
             {activeTab === 'checkout' && (
               <TireCheckout
                 cartItems={cartItems}
                 onClearCart={handleClearCart}
                 onNavigateTab={(tab) => {
                   setActiveTab(tab);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
               />
             )}


      </main>

      {/* FOOTER AREA */}
      <footer className="bg-[#101012] border-t border-[#262629] pt-16 pb-8 text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#262629]/50">
          
          {/* Col 1 */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-[#FF6A00]">
                <Flame className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                TIRE<span className="text-[#FF6A00]">CITY</span>
              </span>
            </div>
            
            <p className="text-[11px] text-gray-400 font-normal font-sans leading-relaxed mt-1">
              Birinci sınıf yüksek performanslı lastiklerin ve pist bileşenlerinin yetkili distribütörü. Özel boyutları, doğrudan kapınıza gelen sertifikalı mobil garaj montaj araçlarıyla birleştirin. Tam güvenlik onayı garantilidir.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display">HIZLI ERİŞİM</span>
            <ul className="space-y-1.5">
              <li><button onClick={() => { setActiveTab('shop'); setActiveProduct(null); }} className="hover:text-white hover:underline transition-colors cursor-pointer text-left">Kataloğa Göz At</button></li>
              <li><button onClick={() => { setActiveTab('brands'); setActiveProduct(null); }} className="hover:text-white hover:underline transition-colors cursor-pointer text-left">Markalar</button></li>
              <li><button onClick={() => { setActiveTab('about'); setActiveProduct(null); }} className="hover:text-white hover:underline transition-colors cursor-pointer text-left">Hakkımızda</button></li>
              <li><button onClick={scrollToFinder} className="hover:text-white hover:underline transition-colors cursor-pointer text-left">İnteraktif Arama</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display">SÜRÜCÜ KOŞULLARI</span>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white hover:underline transition-colors cursor-pointer">Yol Hasarı Koşulları</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors cursor-pointer">Mobil Montaj Kapsamı</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors cursor-pointer">Finansman Seçenekleri</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors cursor-pointer">Garanti Talepleri</a></li>
            </ul>
          </div>

          {/* Col 4 (Newsletter subscribe) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display block">E-BÜLTENİMİZE KATILIN</span>
            <p className="text-[11px] text-gray-400 font-sans">
              Continental indirimleri, Goodyear kuponları ve pist günü güncellemeleri hakkında anında bildirim almak için e-bültene kaydolun.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Bültene başarıyla abone olundu!'); }} className="flex gap-1.5 mt-2">
              <input
                type="email"
                required
                placeholder="driver@speeddeck.com"
                className="flex-1 bg-black text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-[#FF6A00] border border-[#262629]"
              />
              <button
                type="submit"
                className="bg-[#FF6A00] hover:bg-[#FF8533] text-black font-display font-black text-[10px] tracking-wider uppercase px-4 rounded transition-colors"
              >
                Katıl
              </button>
            </form>
          </div>

        </div>

        {/* Brand credit statement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono">
          <span>&copy; {new Date().getFullYear()} TIRE CITY INC. SENSÖR VE PİST SİSTEMLERİ GÜVENDE. TÜM HAKLARI SAKLIDIR.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-white cursor-pointer">GİZLİLİK</a>
            <span>&bull;</span>
            <a href="#" className="hover:underline hover:text-white cursor-pointer">DOT STANDARTLARI</a>
            <span>&bull;</span>
            <a href="#" className="hover:underline hover:text-white cursor-pointer">KAYNAKLAR</a>
          </div>
        </div>
      </footer>

      {/* COMPARISON TIRE SPEC PANEL (Shows if comparison is activated) */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 md:p-12 overflow-y-auto flex items-center justify-center animate-fadeIn">
          <div className="w-full max-w-5xl bg-[#1B1B1D] rounded-xl overflow-hidden border border-[#262629] shadow-2xl relative">
            <button
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black text-gray-400 hover:text-white hover:border-gray-500 rounded border border-[#262629] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-1">
              <TireCompare
                compareProducts={compareProducts}
                onRemove={handleRemoveCompare}
                onAddToCart={(p) => {
                  handleAddToCart(p, 4, p.size, true);
                  setIsCompareOpen(false);
                }}
                onViewProduct={(p) => {
                  setActiveProduct(p);
                  setIsCompareOpen(false);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                onClose={() => setIsCompareOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER PANEL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* FLOATING THEME BALLOON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-center w-12 h-12 rounded-full shadow-2xl border transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#FF6A00] bg-white text-slate-800 border-slate-200 hover:bg-slate-50 dark:bg-[#1B1B1D]/90 dark:text-gray-300 dark:border-[#262629] dark:hover:bg-[#262629] dark:hover:text-white backdrop-blur-sm"
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

    </div>
  );
}
