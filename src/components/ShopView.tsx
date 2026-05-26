import React from 'react';
import { TireProduct, TireType } from '../types';
import ShopSidebar from './ShopSidebar';
import ProductCard from './ProductCard';

interface ShopViewProps {
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
  allProducts: TireProduct[];
  filteredProducts: TireProduct[];
  sortBy: string;
  setSortBy: (val: string) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  setActiveProduct: (p: TireProduct | null) => void;
  onAddToCart: (product: TireProduct, quantity?: number, size?: string, withInstallation?: boolean) => void;
  onToggleCompare: (product: TireProduct) => void;
  compareProducts: TireProduct[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export default function ShopView({
  searchFilter,
  setSearchFilter,
  allProducts,
  filteredProducts,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  setActiveProduct,
  onAddToCart,
  onToggleCompare,
  compareProducts,
  wishlist,
  onToggleWishlist,
}: ShopViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn text-left">
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-[#262629] pb-6 mb-8">
        <div>
          <h2 className="font-display font-black text-3xl text-white dark:text-white light:text-slate-900 tracking-tight uppercase">
            TÜM ÜRÜNLER
          </h2>
        </div>
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
                  onAddToCart={(p, sz) => onAddToCart(p, 4, sz, true)}
                  onToggleCompare={onToggleCompare}
                  isComparing={compareProducts.some((el) => el.id === prod.id)}
                  isWishlisted={wishlist.includes(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
