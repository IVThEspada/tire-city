import React, { useState, useRef, useEffect } from 'react';
import { TireProduct, CartItem, TireType } from './types';
import { PRODUCTS, IMAGE_HERO_TIRES, IMAGE_TREAD_BG } from './data';

// Component imports
import Header from './components/Header';
import TireFinder from './components/TireFinder';
import BrandStrip from './components/BrandStrip';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import TireCompare from './components/TireCompare';
import PromoCampaigns from './components/PromoCampaigns';
import HeroSlider from './components/HeroSlider';

// Newly added visual checkout, profile and sidebar pages
import UserProfile from './components/UserProfile';
import DedicatedCart from './components/DedicatedCart';
import TireCheckout from './components/TireCheckout';
import ShopSidebar from './components/ShopSidebar';
import AdminPanel from './components/AdminPanel';

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
  const [allProducts, setAllProducts] = useState<TireProduct[]>(PRODUCTS);
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
        alert('You can compare a maximum of 3 performance tires side-by-side.');
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

  if (activeTab === 'admin') {
    return (
      <AdminPanel
        products={allProducts}
        onUpdateProducts={(newProducts) => {
          setAllProducts(newProducts);
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
    );
  }

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
                <section className="bg-gradient-to-r from-[#101012] via-[#1B1B1D] to-[#101012] py-8 border-y border-[#262629]/50 shadow-md">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BrandStrip
                      onBrandSelect={(brand) => {
                        setSearchFilter((prev) => ({ ...prev, brand: prev.brand === brand ? undefined : brand }));
                        const element = document.getElementById('featured-grid-anchor');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
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
                        {searchFilter.compatibleProductIds ? '⚡ VEHICLE SPECIFIC RECOMMENDATIONS' : '🏁 Featured tire catalog'}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-wider">
                        SHOWING {filteredProducts.length} PREMIUM PERFORMANCE OPTIONS
                      </p>
                    </div>

                    {/* Interactive state clear pill if filtering active */}
                    {Object.keys(searchFilter).length > 0 && (
                      <button
                        onClick={() => setSearchFilter({})}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Clear Active Filters &bull; Show All
                      </button>
                    )}
                  </div>

                  {/* Active customized vehicle banner feedback or width size verification banner */}
                  {searchFilter.vehicleLabel && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg mb-8 flex items-center justify-between gap-4 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
                        <span className="text-xs text-white leading-relaxed font-mono">
                          <strong className="text-emerald-400 uppercase">FITMENT GUARANTEED:</strong> Fits{' '}
                          <span className="underline font-bold text-white">{searchFilter.vehicleLabel}</span>. Our alignment calculations verify these tire listings match your setup perfectly.
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => setSearchFilter({})}
                        className="text-white hover:text-[#FF6A00] text-xs font-mono font-bold underline whitespace-nowrap"
                      >
                        Change Selection
                      </button>
                    </div>
                  )}

                  {/* Renders products grids */}
                  {filteredProducts.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-[#262629] rounded-xl bg-[#1B1B1D]/20">
                      <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <h4 className="font-display font-bold text-base text-white">No Matching Tires Found</h4>
                      <p className="text-xs text-gray-400 font-mono max-w-sm mx-auto mt-2 leading-relaxed">
                        We currently don&rsquo;t stock compounds under this width ratio constraint. Try clicking &ldquo;Clear Active Filters&rdquo; above to browse universal models.
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
                       <div className="lg:col-span-6 bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-[#262629] max-w-xl">
                         <h4 className="text-xs font-mono font-bold tracking-widest text-[#FF6A00] uppercase mb-2">
                           ⚡ HIGH ALTITUDE SPEED &amp; SAFETY RATING
                         </h4>
                         <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none mb-6">
                           ABOUT TIRE CITY &bull; EST. 2012
                         </h2>
                         
                         <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                           At Tire City, our mission transcends mere e-commerce. We build secure automotive safety configurations with performance-validated rubber compound layouts. By pairing advanced Swedish studio renderings with real-time DOT alignment calculators, we ensure your high-horsepower sedan or off-road Jeep rides on certified offsets.
                         </p>

                         <p className="text-gray-400 text-xs leading-relaxed mb-8">
                           Our state-of-the-art mobile installation fleet carries digital laser balancers directly to your workspace, saving you valuable track hours. Experience what premium tyre distribution feels like.
                         </p>

                         <div className="grid grid-cols-2 gap-6 font-mono border-t border-[#262629] pt-6">
                           <div>
                             <span className="text-emerald-400 block font-bold">12-MONTH</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Road Hazard Protection</span>
                           </div>
                           <div>
                             <span className="text-white block font-bold">CERTIFIED</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Master Garage Mechanics</span>
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-[#262629] pb-6 mb-8">
                  <div>
                    <h2 className="font-display font-black text-3xl text-white dark:text-white light:text-slate-900 tracking-tight uppercase">
                      Tire City Storehouse
                    </h2>
                    <p className="text-xs font-mono text-gray-400">
                      Explore track-focused summer tires, compound winter grip systems, and heavy offroad AT casing profiles.
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
                  AUTHORIZED MANUFACTURER BLUEPRINTS
                </h2>
                
                <div className="p-8 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] mb-12">
                  <BrandStrip
                    onBrandSelect={(bName) => {
                      setSearchFilter({ brand: bName });
                      setActiveTab('shop');
                    }}
                    selectedBrand={undefined}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-emerald-400 font-bold block mb-1">MICHELIN TECHNOLOGY</span>
                    <p className="text-gray-400 leading-normal">
                      Pioneers of multi-rubber compounds and dynamic bio-mechanic siping matrices designed to support heavy track payloads.
                    </p>
                  </div>
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-orange-400 font-bold block mb-1">CONTINENTAL CASINGS</span>
                    <p className="text-gray-400 leading-normal">
                      German precision design standards. Specializes in Road-Force compliance and interior noise cancelation layers.
                    </p>
                  </div>
                  <div className="p-5 bg-[#1B1B1D]/20 border border-[#262629] rounded-lg">
                    <span className="text-red-400 font-bold block mb-1">PIRELLI MOTORS</span>
                    <p className="text-gray-400 leading-normal">
                      Formula 1 official original equipment supplier. Formulated for ultra-high speed ratings and severe curve G-Loads.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: About Detail Page */}
            {activeTab === 'about' && (
              <div className="max-w-4xl mx-auto px-4 py-16 animate-fadeIn font-mono text-xs text-gray-400 space-y-8">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8 font-sans">
                  TIRE CITY ORIGINAL SPECS
                </h2>

                <div className="space-y-4 font-sans text-sm text-gray-300 leading-relaxed">
                  <p>
                    Established over a decade ago in response to generic, unguided tire distribution networks, Tire City has grown into a master class platform with over 10,000 satisfied fittings completed nationwide.
                  </p>
                  <p>
                    By merging professional CAD sizing blueprints, certified mechanical validation indices, and highly calibrated DOT database checks, we ensure every driver enjoys safe, optimized performance limits.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Laser Road force Balancing</span>
                      <span className="text-[11px] block">Every local garage selection features laser balancing to counter micro vibrations.</span>
                    </div>
                  </div>
                  
                  <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
                    <Truck className="w-5 h-5 text-[#FF6A00] flex-shrink-0" />
                    <div>
                      <span className="text-white font-bold block mb-1 uppercase text-xs">Driveway Mobile Mounting</span>
                      <span className="text-[11px] block">Don&rsquo;t waste weekend track hours in simple waiting lobbies. Our dynamic hydraulic vans arrive straight to your garage door.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Contact Support Page */}
            {activeTab === 'contact' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
                <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
                  DRIVER SUPPORT &amp; DISPATCH CHANNELS
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Info */}
                  <div className="lg:col-span-5 space-y-6">
                    <p className="text-gray-400 text-xs font-mono leading-relaxed">
                      Questions regarding rim load caps, specialized winter speed indexes, or fleet booking calendars? Connect with our master technicians directly:
                    </p>

                    <div className="space-y-4 font-mono text-xs">
                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">SUPPORT DESK</span>
                          <span className="text-white font-bold text-sm">+1 (800) 555-TIRE</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">TECH DISPATCH EMAIL</span>
                          <span className="text-white font-bold text-sm">support@tirecityperformance.com</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#FF6A00]" />
                        <div>
                          <span className="text-gray-500 block">HEADQUARTERS</span>
                          <span className="text-white font-bold">100 Track Way, Speedway CA 90412</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-[#FF6A00]/10 border border-[#FF6A00]/20 rounded text-xs font-mono text-gray-300">
                      <strong>GARAGE OPEN HOURS (HOURS EST):</strong>
                      <br />Mon - Fri: 07:00 AM &mdash; 08:00 PM
                      <br />Sat - Sun: 08:00 AM &mdash; 05:00 PM (Track Support Priority)
                    </div>
                  </div>

                  {/* Submission form */}
                  <div className="lg:col-span-7 bg-[#1B1B1D]/40 border border-[#262629] rounded-xl p-6 sm:p-8">
                     <h4 className="font-display font-black text-sm text-white uppercase tracking-wider mb-6">
                       DISPATCH TICKET REQUEST
                     </h4>

                     <form onSubmit={(e) => { e.preventDefault(); alert('Tech dispatch ticket created successfully! We will text you shortly.'); }} className="space-y-4 font-mono text-xs">
                       <div className="grid grid-cols-2 gap-4">
                         <div className="flex flex-col gap-1.5">
                           <span className="text-zinc-500">Full Name</span>
                           <input type="text" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                         </div>
                         <div className="flex flex-col gap-1.5">
                           <span className="text-zinc-500">Contact Email</span>
                           <input type="email" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                         </div>
                       </div>
                       
                       <div className="flex flex-col gap-1.5">
                         <span className="text-zinc-500">Active Vehicle Model</span>
                         <input type="text" placeholder="e.g. BMW M4 Coupe" className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
                       </div>

                       <div className="flex flex-col gap-1.5">
                         <span className="text-zinc-500">Message details</span>
                         <textarea rows={4} required placeholder="State your sizing concerns, offset queries, or specific performance goals here..." className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white"></textarea>
                       </div>

                       <button type="submit" className="w-full py-3.5 bg-[#FF6A00] text-black font-display font-black tracking-wider uppercase rounded hover:bg-[#FF8533] transition-colors">
                         Submit Ticket Request
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
              authorized distributor of premier high-performance tires and track compounds. Pair custom sizes with certified mobile garage fitting trucks directly to your doors. Complete safety validation guaranteed.
            </p>
          </div>

          {/* Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display">QUICK ACCESS</span>
            <ul className="space-y-1.5">
              <li><button onClick={() => { setActiveTab('shop'); setActiveProduct(null); }} className="hover:text-white transition-colors">Browse Catalog</button></li>
              <li><button onClick={() => { setActiveTab('brands'); setActiveProduct(null); }} className="hover:text-white transition-colors">Brands Blueprint</button></li>
              <li><button onClick={() => { setActiveTab('about'); setActiveProduct(null); }} className="hover:text-white transition-colors">About Story</button></li>
              <li><button onClick={scrollToFinder} className="hover:text-white transition-colors">Interactive Finder</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display">DRIVER TERMS</span>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Road Hazard Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile install Scope</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Affirm 0% Financing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DOT Warranty Claims</a></li>
            </ul>
          </div>

          {/* Col 4 (Newsletter subscribe) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider font-display block">JOIN THE STAGE NEWSLETTER</span>
            <p className="text-[11px] text-gray-400 font-sans">
              Subscribe to obtain immediate notification vectors for Continental rebates, Goodyear coupon drops, and track day specs.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to performance newsletters!'); }} className="flex gap-1.5 mt-2">
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
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Brand credit statement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono">
          <span>&copy; {new Date().getFullYear()} TIRE CITY INC. TRACK ROAD SENSORS AND LOGS REMAIN SECURE. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-white">PRIVACY</a>
            <span>&bull;</span>
            <a href="#" className="hover:underline hover:text-white">DOT STANDARDS</a>
            <span>&bull;</span>
            <a href="#" className="hover:underline hover:text-white">CREDITS</a>
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
