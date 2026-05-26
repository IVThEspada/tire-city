import React from 'react';
import { TireProduct, TireType, BrandLogo, CustomSlide, FeaturedCatalog, SafetyRatingConfig } from '../types';
import { IMAGE_TREAD_BG } from '../data';
import HeroSlider from './HeroSlider';
import TireFinder from './TireFinder';
import BrandStrip from './BrandStrip';
import ProductCard from './ProductCard';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface HomeViewProps {
  onFindTiresClick: () => void;
  onBrowseCatalogClick: () => void;
  onFilterTypeClick: (type: string) => void;
  searchFilter: {
    brand?: string;
    type?: TireType;
    width?: number;
    ratio?: number;
    diameter?: number;
    compatibleProductIds?: string[];
    vehicleLabel?: string;
    query?: string;
  };
  setSearchFilter: React.Dispatch<React.SetStateAction<{
    brand?: string;
    type?: TireType;
    width?: number;
    ratio?: number;
    diameter?: number;
    compatibleProductIds?: string[];
    vehicleLabel?: string;
    query?: string;
  }>>;
  filteredProducts: TireProduct[];
  setActiveProduct: (p: TireProduct | null) => void;
  onAddToCart: (product: TireProduct, quantity?: number, size?: string, withInstallation?: boolean) => void;
  onToggleCompare: (product: TireProduct) => void;
  compareProducts: TireProduct[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  finderRef: React.RefObject<HTMLDivElement | null>;
  brandsList?: BrandLogo[];
  slidesList?: CustomSlide[];
  catalogsList?: FeaturedCatalog[];
  safetyConfig?: SafetyRatingConfig;
}

export default function HomeView({
  onFindTiresClick,
  onBrowseCatalogClick,
  onFilterTypeClick,
  searchFilter,
  setSearchFilter,
  filteredProducts,
  setActiveProduct,
  onAddToCart,
  onToggleCompare,
  compareProducts,
  wishlist,
  onToggleWishlist,
  finderRef,
  brandsList,
  slidesList,
  catalogsList = [],
  safetyConfig,
}: HomeViewProps) {
  return (
    <div className="animate-fadeIn">
      {/* 1. HERO SLIDESHOW MODULE */}
      <HeroSlider
        onFindTiresClick={onFindTiresClick}
        onBrowseCatalogClick={onBrowseCatalogClick}
        onFilterTypeClick={onFilterTypeClick}
        slidesList={slidesList}
      />

      {/* 2. TABBED FINDER CONTAINER MODULE */}
      <div ref={finderRef} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-8 sm:-mt-12 relative z-20">
        <TireFinder
          onFilterChange={(filters) => {
            setSearchFilter(filters);
            onBrowseCatalogClick();
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onReset={() => setSearchFilter({})}
        />
      </section>

      {/* 3. BRAND STRIP WITH DYNAMIC HOVERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] shadow-md">
          <BrandStrip
            onBrandSelect={(brand) => {
              setSearchFilter({ brand });
              onBrowseCatalogClick();
            }}
            selectedBrand={searchFilter.brand}
            brandsList={brandsList}
          />
        </div>
      </section>

      {/* 4. ACTIVE FILTER / COMPATIBILITY REPORT RIBBON & FEATURED PRODUCTS GRID */}
      {(() => {
        const isFiltering = Object.keys(searchFilter).length > 0;
        const hasCatalogs = catalogsList && catalogsList.length > 0;

        // If user is searching/filtering or there are NO custom catalogs, show the standard single search/product grid
        if (isFiltering || !hasCatalogs) {
          return (
            <section id="featured-grid-anchor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
              {/* Title & configuration filters tag */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#262629] pb-6 mb-8 gap-4 text-left">
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
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-lg mb-8 flex items-center justify-between gap-4 animate-fadeIn text-left">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onProductClick={(p) => {
                        setActiveProduct(p);
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      onAddToCart={(p, sz) => onAddToCart(p, 4, sz, true)}
                      onToggleCompare={onToggleCompare}
                      isComparing={compareProducts.some((el) => el.id === prod.id)}
                      isWishlisted={wishlist.includes(prod.id)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        }

        // If NO current filters are active, render the MULTIPLE customized featured catalogs on the home screen!
        return (
          <div id="featured-grid-anchor" className="space-y-6">
            {catalogsList.map((cat) => {
              // Find matching products that belong to this catalog
              const catProducts = filteredProducts.filter((p) => cat.productIds.includes(p.id));
              
              // Skip empty catalogs on home page to keep look pristine
              if (catProducts.length === 0) return null;

              return (
                <section
                  key={cat.id}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-24 border-b border-[#262629]/40 last:border-none"
                >
                  <div className="flex flex-col border-b border-[#262629] pb-5 mb-8 text-left">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase flex items-center gap-2">
                      🏁 {cat.title}
                    </h3>
                    {cat.subtitle && (
                      <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-wider">
                        {cat.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left animate-fadeIn">
                    {catProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onProductClick={(p) => {
                          setActiveProduct(p);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        onAddToCart={(p, sz) => onAddToCart(p, 4, sz, true)}
                        onToggleCompare={onToggleCompare}
                        isComparing={compareProducts.some((el) => el.id === prod.id)}
                        isWishlisted={wishlist.includes(prod.id)}
                        onToggleWishlist={onToggleWishlist}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        );
      })()}

      {/* 6. ABOUT SECTION WITH GENERATED INDUSTRIAL TEXTURE BG */}
      <section className="relative overflow-hidden bg-black border-t border-[#262629]/70 py-16 sm:py-24 text-left">
        {/* Floating abstract right layer backdropped using generator texture */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-35 lg:opacity-65 mix-blend-luminosity">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
          <img
            src={safetyConfig?.bgUrl || IMAGE_TREAD_BG}
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
                {safetyConfig?.badgeText || '⚡ YÜKSEK HIZ VE GÜVENLİK DERECELENDİRMESİ'}
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-100 tracking-tight leading-none mb-6">
                {safetyConfig?.title || 'TIRE CITY HAKKINDA • KURULUŞ 2012'}
              </div>

              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                {safetyConfig?.desc1 || "Tire City'de misyonumuz sadece e-ticaretin ötesine geçer. Performansı doğrulanmış kauçuk bileşen şablonlarıyla güvenli otomotiv güvenlik konfigürasyonları oluşturuyoruz. Gelişmiş İsveç stüdyo renderlarını gerçek zamanlı DOT hizalama hesaplayıcıları ile birleştirerek, yüksek beygir gücündeki sedanınızın veya arazi Jeep'inizin sertifikalı ofsetlerde sürüş yapmasını sağlıyoruz."}
              </p>

              {(safetyConfig?.desc2 || "").trim() !== "" && (
                <p className="text-slate-300 text-xs leading-relaxed mb-8">
                  {safetyConfig.desc2}
                </p>
              )}

              <div className="grid grid-cols-2 gap-6 font-mono border-t border-[#262629] pt-6">
                <div>
                  <span className="text-emerald-400 block font-bold">{safetyConfig?.badge1Label || '12 AYLIK'}</span>
                  <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block">{safetyConfig?.badge1Sub || 'Yol Hasarı Koruması'}</span>
                </div>
                <div>
                  <span className="text-white block font-bold font-black">{safetyConfig?.badge2Label || 'SERTİFİKALI'}</span>
                  <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block">{safetyConfig?.badge2Sub || 'Usta Garaj Teknisyenleri'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
