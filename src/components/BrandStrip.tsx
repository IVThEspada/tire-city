import { BRANDS } from '../data';

interface BrandStripProps {
  onBrandSelect: (brandName: string) => void;
  selectedBrand?: string;
}

export default function BrandStrip({ onBrandSelect, selectedBrand }: BrandStripProps) {
  // Brand color/styling mapper to make them look authentic
  const getBrandLogoStyle = (id: string) => {
    switch (id) {
      case 'michelin':
        return {
          textColor: 'text-blue-800',
          accent: 'border-l-4 border-yellow-400 pl-1',
          font: 'font-extrabold italic tracking-tight',
        };
      case 'continental':
        return {
          textColor: 'text-orange-500',
          accent: 'font-display',
          font: 'font-black tracking-normal uppercase',
        };
      case 'pirelli':
        return {
          textColor: 'text-red-700 font-display',
          accent: 'border-b-2 border-red-700 pb-0.5',
          font: 'font-extrabold tracking-widest uppercase italic',
        };
      case 'goodyear':
        return {
          textColor: 'text-blue-900',
          accent: 'border-r-2 border-yellow-500 pr-1',
          font: 'font-black tracking-wider uppercase',
        };
      case 'bridgestone':
        return {
          textColor: 'text-black',
          accent: 'border-l-4 border-red-600 pl-1',
          font: 'font-black tracking-tighter uppercase',
        };
      case 'yokohama':
        return {
          textColor: 'text-neutral-900',
          accent: 'border-b-4 border-black',
          font: 'font-black tracking-[3px] uppercase italic',
        };
      case 'falken':
        return {
          textColor: 'text-cyan-800',
          accent: 'border-r-4 border-cyan-500 pr-1',
          font: 'font-extrabold tracking-normal uppercase italic',
        };
      default:
        return {
          textColor: 'text-black',
          accent: '',
          font: 'font-bold uppercase',
        };
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-mono tracking-widest text-[#FF6A00] uppercase font-bold text-center">
          ⚡ AUTHORIZED HIGH-PERFORMANCE ORIGINAL EQUIPMENT DISTRIBUTOR
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {BRANDS.map((brand) => {
            const style = getBrandLogoStyle(brand.id);
            const isSelected = selectedBrand === brand.name;
            
            return (
              <div
                key={brand.id}
                onClick={() => onBrandSelect(brand.name)}
                className={`bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 shadow-sm border ${
                  isSelected 
                    ? 'ring-4 ring-[#FF6A00] scale-105 border-transparent bg-orange-50'
                    : 'border-gray-200 hover:scale-[1.04] hover:shadow-lg hover:border-[#FF6A00]'
                }`}
              >
                <div className="flex items-center justify-center h-8">
                  <span className={`${style.textColor} ${style.font} ${style.accent} text-sm md:text-base`}>
                    {brand.textLogo}
                  </span>
                </div>
                
                <span className="text-[8px] font-mono tracking-wider text-gray-500 mt-1 uppercase text-center truncate w-full">
                  {brand.subText}
                </span>

                {isSelected && (
                  <span className="mt-1 text-[8px] font-bold text-[#FF6A00] uppercase tracking-wider font-mono">
                    ✓ Selected Filter
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
