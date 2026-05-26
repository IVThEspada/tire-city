import React from 'react';
import BrandStrip from './BrandStrip';
import { BrandLogo } from '../types';

interface BrandsViewProps {
  onBrandSelect: (brand: string) => void;
  brandsList?: BrandLogo[];
}

export default function BrandsView({ onBrandSelect, brandsList }: BrandsViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn text-left">
      <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
        YETKİLİ ÜRETİCİ TASARIMLARI
      </h2>
      
      <div className="p-8 bg-[#1B1B1D]/40 rounded-xl border border-[#262629] mb-12">
        <BrandStrip
          onBrandSelect={onBrandSelect}
          selectedBrand={undefined}
          brandsList={brandsList}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
        {brandsList && brandsList.length > 0 ? (
          brandsList.map((brand) => {
            // Determine a visual color accent based on brand id / name
            let accentColor = 'text-emerald-400';
            let bgAccent = 'hover:border-emerald-500/40';
            if (brand.id.includes('michelin')) {
              accentColor = 'text-blue-400';
              bgAccent = 'hover:border-blue-500/40';
            } else if (brand.id.includes('continental')) {
              accentColor = 'text-orange-400';
              bgAccent = 'hover:border-orange-500/40';
            } else if (brand.id.includes('pirelli')) {
              accentColor = 'text-red-400';
              bgAccent = 'hover:border-red-500/40';
            } else if (brand.id.includes('goodyear')) {
              accentColor = 'text-amber-400';
              bgAccent = 'hover:border-amber-500/40';
            } else if (brand.id.includes('bridgestone')) {
              accentColor = 'text-[#FF6A00]';
              bgAccent = 'hover:border-[#FF6A00]/40';
            } else if (brand.id.includes('falken')) {
              accentColor = 'text-cyan-400';
              bgAccent = 'hover:border-cyan-500/40';
            } else if (brand.id.includes('yokohama')) {
              accentColor = 'text-yellow-400';
              bgAccent = 'hover:border-yellow-500/40';
            }

            return (
              <div 
                key={brand.id} 
                className={`p-6 bg-[#1B1B1D]/40 border border-[#262629] rounded-xl flex flex-col justify-between hover:bg-[#1B1B1D]/60 transition-all duration-300 ${bgAccent}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`${accentColor} font-bold text-xs uppercase tracking-widest`}>
                      {brand.textLogo || brand.name} TEKNOLOJİSİ
                    </span>
                    {brand.logoUrl && (
                      <div className="h-5 w-12 flex items-center justify-end bg-white/5 rounded px-1">
                        <img src={brand.logoUrl} alt={brand.name} className="max-h-4 max-w-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                  
                  <span className="text-[10px] text-zinc-500 block mb-2 uppercase font-mono italic">
                    {brand.subText}
                  </span>

                  <p className="text-gray-350 leading-relaxed text-[11px] font-sans">
                    {brand.description || `${brand.name} üstün performanslı kauçuk alaşımları ve yüksek güvenlik indeksleri ile otomotiv mühendisliğini zirveye taşır.`}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/60 flex justify-between items-center">
                  <button 
                    onClick={() => onBrandSelect(brand.name)}
                    className="text-[10px] uppercase font-bold text-[#FF6A00] hover:text-[#FF8533] transition-colors flex items-center gap-1"
                  >
                    Modelleri Keşfet &rarr;
                  </button>
                  <span className="text-[9px] font-mono text-zinc-650 uppercase">
                    KOD: {brand.id.substring(0, 8)}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center col-span-full border border-[#262629] rounded-lg text-zinc-500 font-mono italic">
            Kayıtlı marka bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}
