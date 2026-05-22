import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, ArrowUpDown, Tag, Percent, Star } from 'lucide-react';
import { TireType, TireProduct } from '../types';

interface ShopSidebarProps {
  searchFilter: {
    brand?: string;
    type?: TireType;
    width?: number;
    ratio?: number;
    diameter?: number;
    query?: string;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  products: TireProduct[];
  sortBy: string;
  onSortByChange: (sortVal: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function ShopSidebar({
  searchFilter,
  onFilterChange,
  onReset,
  products,
  sortBy,
  onSortByChange,
  priceRange,
  onPriceRangeChange,
}: ShopSidebarProps) {
  // Extract unique brands, types, diameters, widths, and ratios from catalog dynamically
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const types: TireType[] = ['Summer', 'Winter', 'All-Season', 'All-Terrain', 'Track/Racing'];
  const diameters = Array.from(new Set(products.map((p) => p.diameter))).sort((a, b) => a - b);
  const widths = Array.from(new Set(products.map((p) => p.width))).sort((a, b) => a - b);
  const ratios = Array.from(new Set(products.map((p) => p.ratio))).sort((a, b) => a - b);

  // Compute counts for visual feedback
  const getBrandCount = (brandName: string) => {
    return products.filter((p) => p.brand === brandName).length;
  };

  const getTypeCount = (typeName: TireType) => {
    return products.filter((p) => p.type === typeName).length;
  };

  const handleBrandSelect = (brandName: string) => {
    onFilterChange({
      ...searchFilter,
      brand: searchFilter.brand === brandName ? undefined : brandName,
    });
  };

  const handleTypeSelect = (typeName: TireType) => {
    onFilterChange({
      ...searchFilter,
      type: searchFilter.type === typeName ? undefined : typeName,
    });
  };

  const handleDiameterSelect = (dia: number) => {
    onFilterChange({
      ...searchFilter,
      diameter: searchFilter.diameter === dia ? undefined : dia,
    });
  };

  return (
    <aside className="w-full lg:w-72 bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm space-y-6 flex-shrink-0">
      
      {/* Sidebar Header Section */}
      <div className="flex items-center justify-between border-b border-[#262629]/60 dark:border-[#262629]/60 light:border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#FF6A00]" />
          <h3 className="font-display font-extrabold text-[#EAEAEA] dark:text-[#EAEAEA] light:text-slate-800 text-sm uppercase tracking-wider">
            FİLTRE SEÇENEKLERİ
          </h3>
        </div>
        
        {(Object.keys(searchFilter).length > 0 || sortBy !== 'recommended' || priceRange[0] > 50 || priceRange[1] < 600) && (
          <button
            onClick={() => {
              onReset();
              onSortByChange('recommended');
              onPriceRangeChange([50, 600]);
            }}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#FF6A00] hover:underline"
            title="Tüm filtreleri sıfırla"
          >
            <RotateCcw className="w-3 h-3" />
            TEMİZLE
          </button>
        )}
      </div>

      {/* Sorting Method */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#FF6A00]" />
          Sonuçları Sırala
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs px-3 py-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 text-white dark:text-white light:text-slate-800 focus:outline-none focus:border-[#FF6A00]"
        >
          <option value="recommended">Önerilen Seçimler</option>
          <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
          <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
          <option value="rating">Puan: En Yüksekten Başla</option>
          <option value="popular">Popüler Olanlar Önce</option>
        </select>
      </div>

      {/* Elastic Keyword Core Search */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
          Kelimeyle Filtrele
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="örn. Pilot, Sport, Winter..."
            value={searchFilter.query || ''}
            onChange={(e) => onFilterChange({ ...searchFilter, query: e.target.value || undefined })}
            className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs pl-8 pr-3 py-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 text-white dark:text-white light:text-slate-700 placeholder-gray-500 focus:outline-none focus:border-[#FF6A00] font-mono"
          />
          <Search className="absolute left-2.5 top-3 w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>

      {/* Tire Brand Multi-select Radio Deck */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
          Yetkili Markalar
        </label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {brands.map((brandName) => {
            const isSelected = searchFilter.brand === brandName;
            const count = getBrandCount(brandName);
            return (
              <button
                key={brandName}
                onClick={() => handleBrandSelect(brandName)}
                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#FF6A00]/10 text-[#FF6A00] font-bold border border-[#FF6A00]/30'
                    : 'text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-[#101012] dark:hover:bg-[#101012] light:hover:bg-slate-50'
                }`}
              >
                <span className="font-sans">{brandName}</span>
                <span className="text-[10px] font-mono text-gray-500 font-bold bg-[#101012] dark:bg-[#101012] light:bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compound Types Radio Deck */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
          Lastik Yol Tipi
        </label>
        <div className="space-y-1.5">
          {types.map((typeName) => {
            const isSelected = searchFilter.type === typeName;
            const count = getTypeCount(typeName);
            const typeLabels: Record<string, string> = {
              'Summer': 'Yaz Lastikleri',
              'Winter': 'Kış Lastikleri',
              'All-Season': 'Dört Mevsim',
              'All-Terrain': 'Arazi / AT',
              'Track/Racing': 'Pist / Performans'
            };
            return (
              <button
                key={typeName}
                onClick={() => handleTypeSelect(typeName)}
                className={`w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-[#FF6A00]/10 text-[#FF6A00] font-bold border border-[#FF6A00]/30'
                    : 'text-gray-300 dark:text-gray-300 light:text-slate-700 hover:bg-[#101012] dark:hover:bg-[#101012] light:hover:bg-slate-50'
                }`}
              >
                <span>{typeLabels[typeName] || typeName}</span>
                <span className="text-[10px] font-mono text-gray-500 font-bold bg-[#101012] dark:bg-[#101012] light:bg-[#F1F5F9] px-1.5 py-0.5 rounded">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wheel Diameter Size Filters */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
          Jant Çapı
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {diameters.map((dia) => {
            const isSelected = searchFilter.diameter === dia;
            return (
              <button
                key={dia}
                onClick={() => handleDiameterSelect(dia)}
                className={`py-1.5 text-center font-mono font-black text-xs rounded border transition-all ${
                  isSelected
                    ? 'bg-[#FF6A00] text-black border-[#FF6A00]'
                    : 'bg-transparent text-gray-400 dark:text-gray-400 light:text-slate-500 border-[#262629] dark:border-[#262629] light:border-slate-200 hover:border-gray-500 dark:hover:border-gray-500 light:hover:border-slate-300'
                }`}
              >
                {dia}&rdquo;
              </button>
            );
          })}
        </div>
      </div>

      {/* Width and aspect ratio selectors dropdown combo */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1.5">
          <label className="text-[9px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
            Genişlik
          </label>
          <select
            value={searchFilter.width || ''}
            onChange={(e) => onFilterChange({ ...searchFilter, width: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs px-2 py-1.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 text-white dark:text-white light:text-slate-700"
          >
            <option value="">Tümü</option>
            {widths.map((w) => (
              <option key={w} value={w}>{w} mm</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest block">
            Yanak Kesiti
          </label>
          <select
            value={searchFilter.ratio || ''}
            onChange={(e) => onFilterChange({ ...searchFilter, ratio: e.target.value ? parseInt(e.target.value) : undefined })}
            className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs px-2 py-1.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 text-white dark:text-white light:text-slate-700"
          >
            <option value="">Tümü</option>
            {ratios.map((r) => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dynamic Price Range limit slider */}
      <div className="space-y-2 border-t border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pt-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-400 dark:text-gray-400 light:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Fiyat Bütçe Sınırı</span>
          <span className="text-[#FF6A00] font-bold">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        
        <input
          type="range"
          min="50"
          max="600"
          step="10"
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-1.5 bg-[#101012] rounded-lg appearance-none cursor-pointer accent-[#FF6A00] border border-[#262629]/60"
        />
        <div className="flex justify-between text-[9px] text-gray-500 font-mono">
          <span>Min: $50</span>
          <span>Max: $600</span>
        </div>
      </div>

      {/* Additional Visual Promotions / Support Badges */}
      <div className="bg-[#101012] dark:bg-[#101012] light:bg-slate-50 border border-[#262629]/60 dark:border-[#262629]/60 light:border-slate-150 p-3 rounded-lg text-[10px] space-y-1.5 text-gray-400 dark:text-gray-400 light:text-slate-600 font-mono">
        <div className="flex items-center gap-1.5 text-white dark:text-white light:text-slate-800 font-bold">
          <Percent className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>BAHAR KAMPANYASI</span>
        </div>
        <p className="leading-relaxed text-[9px]">
          4 adet lastik alımında kapıda ücretsiz balans ve montaj ayarı! Hızlı teslimat güvencesi.
        </p>
      </div>

    </aside>
  );
}
