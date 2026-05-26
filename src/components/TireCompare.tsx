import { TireProduct } from '../types';
import { X, ShoppingCart, GitCompare, Landmark, Trash2, HelpCircle } from 'lucide-react';

interface TireCompareProps {
  compareProducts: TireProduct[];
  onRemove: (product: TireProduct) => void;
  onAddToCart: (product: TireProduct) => void;
  onViewProduct: (product: TireProduct) => void;
  onClose: () => void;
}

export default function TireCompare({
  compareProducts,
  onRemove,
  onAddToCart,
  onViewProduct,
  onClose,
}: TireCompareProps) {

  // Return background grade for visualization
  const getGradeColor = (grade: string) => {
    if (grade === 'A' || grade === 'AA') return 'text-emerald-400 font-bold';
    if (grade === 'B') return 'text-amber-400 font-bold';
    return 'text-red-400 font-bold';
  };

  return (
    <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl p-6 md:p-8 shadow-2xl relative scrollbar overflow-x-auto">
      {/* Decorative top header */}
      <div className="flex items-center justify-between border-b border-[#262629] pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <GitCompare className="w-5 h-5 text-[#FF6A00]" />
          <div>
            <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
              Lastik Özellikleri Karşılaştırma Tablosu
            </h3>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider">
              LASTİK BİLEŞENLERİNİ, YOL TUTUŞ SINIFLARINI VE SES DESİBELLERİNİ KARŞILAŞTIRIN
            </p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="p-1 px-3 text-gray-400 hover:text-white rounded border border-[#262629] hover:bg-white/5 font-display font-medium text-xs uppercase"
        >
          Karşılaştırmayı Kapat
        </button>
      </div>

      {compareProducts.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-[#262629] rounded-lg">
          <GitCompare className="w-12 h-12 text-gray-600 mx-auto mb-3 animate-pulse" />
          <h4 className="font-display font-bold text-sm text-white">Karşılaştırılacak Ürün Seçilmedi</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 font-mono">
            Ayrıntılı karşılaştırma yapmak için ürün kartları üzerindeki karşılaştırma ikonuna tıklayarak lastikleri bu tabloya ekleyin.
          </p>
        </div>
      ) : (
        <div className="min-w-[650px]">
          <table className="w-full text-left border-collapse font-mono text-xs text-gray-300">
            <thead>
              <tr className="border-b border-[#262629]">
                <th className="py-4 w-1/4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lastik Özellikleri</th>
                {compareProducts.map((p) => (
                  <th key={p.id} className="py-4 px-4 w-1/4 relative align-top">
                    <button
                      onClick={() => onRemove(p)}
                      className="absolute top-1.5 right-1.5 p-1 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      title="Karşılaştırmadan çıkar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="bg-[#101012] aspect-square w-16 h-16 rounded border border-[#262629] flex items-center justify-center p-2 mb-2">
                      <img
                        src={p.images[0]}
                        alt={p.model}
                        className="h-12 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <span className="text-[9px] text-[#FF6A00] uppercase font-neutral tracking-widest block font-bold">
                      {p.brand}
                    </span>
                    <span 
                      onClick={() => onViewProduct(p)}
                      className="font-display font-black text-sm text-white block uppercase tracking-tight hover:text-[#FF6A00] transition-colors cursor-pointer line-clamp-1"
                    >
                      {p.model}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {/* Row: Sizing */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Üretim Profil Ölçüsü</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white font-bold">{p.size}</td>
                ))}
              </tr>

              {/* Row: Price */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Birim Adet Fiyatı</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-[#FF6A00] font-black text-[14px]">
                    ${p.price.toFixed(2)}
                    <span className="text-[10px] text-gray-500 font-normal"> /adet</span>
                  </td>
                ))}
              </tr>

              {/* Row: Wet Grip */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400 font-sans">Islak Zemin Yol Tutuşu</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <span className={getGradeColor(p.specs.wetGrip)}>Sınıf {p.specs.wetGrip}</span>
                  </td>
                ))}
              </tr>

              {/* Row: Fuel */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Yakıt Yuvarlanma Direnci</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <span className={getGradeColor(p.specs.fuelEfficiency)}>Sınıf {p.specs.fuelEfficiency}</span>
                  </td>
                ))}
              </tr>

              {/* Row: Noise Level */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Desen Rezonans Gürültüsü</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-neutral-200">{p.specs.noiseLevel} dB (Dış Gürültü)</td>
                ))}
              </tr>

              {/* Row: Treadwear */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">UTQG Aşınma Ömrü Endeksi</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-white font-bold">{p.specs.treadwear} Endeks</td>
                ))}
              </tr>

              {/* Row: Warranty */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Kullanım Kilometre Ömrü</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-amber-500 font-bold">{p.specs.warranty}</td>
                ))}
              </tr>

              {/* Row: Traction index */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Çekiş / Isı Dağılımı</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-neutral-300">
                    {p.specs.traction} / {p.specs.temperature}
                  </td>
                ))}
              </tr>

              {/* Row: Runflat casing */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Runflat Teknolojisi</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-neutral-300">
                    {p.specs.runflat ? '✅ Evet' : 'Hayır (Standart Gövde)'}
                  </td>
                ))}
              </tr>

              {/* Row: Tread depth */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Orijinal Diş Derinliği</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4 text-neutral-300">{p.specs.treadDepth}</td>
                ))}
              </tr>

              {/* Row: Rating */}
              <tr className="border-b border-[#262629]/60 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-gray-400">Kullanıcı Memnuniyet Puanı</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    <span className="text-white font-bold mr-1">{p.rating} / 5</span>
                    <span className="text-gray-500">({p.reviewCount} kullanıcı yorumu)</span>
                  </td>
                ))}
              </tr>

              {/* Row: CTA actions */}
              <tr>
                <td className="py-4"></td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onViewProduct(p)}
                        className="w-full py-2 bg-[#262629] text-gray-300 hover:text-white rounded border border-[#262629] font-display font-medium text-[10px] tracking-wider uppercase transition-colors"
                      >
                        İncele
                      </button>
                      
                      <button
                        onClick={() => onAddToCart(p)}
                        className="w-full py-2 bg-[#FF6A00] hover:bg-[#FF8533] text-black rounded font-display font-black text-[10px] tracking-widest uppercase transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> Sepete Ekle
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
