import React, { useState } from 'react';
import { ShoppingCart, Trash2, Wrench, ChevronRight, ArrowLeft, Percent, ShieldCheck, HelpCircle } from 'lucide-react';
import { CartItem, TireProduct } from '../types';

interface DedicatedCartProps {
  cartItems: CartItem[];
  onUpdateQty: (productId: string, val: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSelectProduct: (product: TireProduct) => void;
  onNavigateTab: (tab: string) => void;
}

export default function DedicatedCart({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onSelectProduct,
  onNavigateTab,
}: DedicatedCartProps) {
  // Coupon Promotion codes
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<number>(0); // percentage e.g., 10 for 10%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    const codeClean = promoCode.trim().toUpperCase();
    if (codeClean === 'TIRECITY10') {
      setActiveDiscount(10);
      setPromoSuccess('Kupon TIRECITY10 uygulandı! %10 sepet indirimi yansıtıldı.');
    } else if (codeClean === 'FREEINSTALL') {
      setActiveDiscount(5); // mock alternative
      setPromoSuccess('Kupon FREEINSTALL uygulandı! Özel indirim eklendi.');
    } else {
      setPromoError('Geçersiz kupon kodu. TIRECITY10 yazarak şansınızı deneyin.');
    }
  };

  // Math totals calculation
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const tiresSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const discountAmount = tiresSubtotal * (activeDiscount / 100);
  
  // Total Installation Fees
  const installationSubtotal = cartItems.reduce((acc, item) => {
    if (item.withInstallation) {
      return acc + (item.installationCost * item.qty);
    }
    return acc;
  }, 0);

  // Environmental tire disposal fee (standard US state regulation)
  const disposalFees = totalItemsCount * 3.5; 
  const stateTaxes = (tiresSubtotal - discountAmount + installationSubtotal) * 0.08; // 8% avg state sales tax

  const finalCartTotal = tiresSubtotal - discountAmount + installationSubtotal + disposalFees + stateTaxes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#262629] pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-display font-black text-3xl text-white dark:text-white light:text-slate-900 tracking-tight uppercase flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-[#FF6A00]" />
            Alışveriş Sepetiniz
          </h2>
          <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">
            Montaj ve randevu öncesi sepetinizde {totalItemsCount} adet kapıda kurulum uyumlu lastik bulunuyor
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono uppercase rounded hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            Sepeti Temizle
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-[#262629] rounded-xl bg-[#1B1B1D]/20 max-w-2xl mx-auto my-8">
          <ShoppingCart className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-white">Sepetiniz Şu Anda Boş</h3>
          <p className="text-xs text-gray-400 font-mono mt-2 max-w-sm mx-auto leading-relaxed">
            Sürüş tarzınıza ve aracınıza uygun bir lastik yapılandırması henüz sepetinizde yok. İhtiyacınız olan ürünleri seçmek için mağaza kataloğuna gözatın.
          </p>
          <button
            onClick={() => onNavigateTab('shop')}
            className="mt-6 px-6 py-3 bg-[#FF6A00] text-black font-display font-black text-xs uppercase tracking-widest rounded hover:bg-[#FF8533] transition-all hover:scale-105"
          >
            LASTİK KATALOĞUNA GÖZAT
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Detailed list of items with installation parameters */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemTotal = item.product.price * item.qty;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm space-y-4 text-left"
                  >
                    {/* Item row details */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      {/* Left: Interactive Details pointer */}
                      <div className="flex gap-4 items-center cursor-pointer grow" onClick={() => onSelectProduct(item.product)}>
                        <div className="w-16 h-16 bg-[#101012] dark:bg-[#101012] light:bg-slate-100 rounded-lg border border-[#262629] dark:border-[#262629]/40 light:border-slate-150 p-2 flex items-center justify-center">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.model}
                            className="w-12 h-12 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 font-mono tracking-wider block font-bold uppercase">
                            {item.product.brand} Detayları
                          </span>
                          <h4 className="font-display font-extrabold text-white dark:text-white light:text-slate-900 text-sm uppercase leading-tight mt-0.5">
                            {item.product.model}
                          </h4>
                          <span className="text-[10.5px] font-mono text-gray-500 block mt-1 uppercase">
                            Seçilen Çap / Ebat: <span className="text-white dark:text-white light:text-slate-800 font-bold font-sans">{item.selectedSize}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Quantity modifiers + Item Total */}
                      <div className="flex items-center gap-6 justify-between w-full sm:w-auto border-t sm:border-t-0 border-[#262629]/60 dark:border-[#262629]/40 light:border-slate-100 pt-3 sm:pt-0">
                        {/* Quantity picker dials */}
                        <div className="flex items-center border border-[#262629]/85 dark:border-[#262629]/70 light:border-slate-200 rounded overflow-hidden">
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                            className="px-2.5 py-1.5 bg-[#101012] hover:bg-[#262629]/50 text-gray-400 dark:bg-[#101012] light:bg-slate-50 light:hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="px-3.5 py-1.5 font-mono text-xs text-white dark:text-white light:text-slate-800 font-bold bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                            className="px-2.5 py-1.5 bg-[#101012] hover:bg-[#262629]/50 text-gray-400 dark:bg-[#101012] light:bg-slate-50 light:hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
 
                        {/* Flat pricing total */}
                        <div className="text-right">
                          <span className="text-[10px] text-gray-500 font-mono block">LASTİK BEDELİ</span>
                          <span className="text-sm font-bold font-mono text-white dark:text-white light:text-slate-800">${itemTotal.toFixed(2)}</span>
                          <span className="text-[10px] block text-gray-500 mt-0.5">Adet Fiyatı: ${item.product.price}</span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                          title="Lastiği sepetten çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Driveway Installation setup checklist toggle details */}
                    <div className="bg-[#101012] dark:bg-[#101012] light:bg-slate-50/70 border border-[#262629]/80 dark:border-[#262629]/50 light:border-slate-150 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-2.5 text-left">
                        <Wrench className="w-5 h-5 text-[#FF6A00] flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-xs text-white dark:text-white light:text-slate-900 font-sans uppercase">
                            Kapıda Mobil Montaj ve Kurulum Hizmeti
                          </h5>
                          <p className="text-[11px] text-gray-400 leading-normal font-sans mt-0.5">
                            Özel kalibrasyonlu mobil montaj araçlarımız adresinize gelerek lastik montajını gerçekleştirir. Balans ayarı, yeni çinko alaşım supap değişimleri fiyata dahildir.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between border-t sm:border-t-0 border-[#262629]/50 dark:border-[#262629]/40 light:border-slate-100 pt-2 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[9px] text-gray-500 font-mono block">MONTAJ BEDELİ</span>
                          <span className="text-xs font-bold font-mono text-emerald-400">
                            ${(item.installationCost * item.qty).toFixed(2)}
                          </span>
                          <span className="text-[9px] text-gray-500 block font-mono">(${item.installationCost} / adet)</span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.withInstallation}
                            onChange={(e) => {
                              // toggle installation state on this specific item through cart updates
                              item.withInstallation = e.target.checked;
                              onUpdateQty(item.product.id, item.qty); // trigger state refresh
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700 peer-checked:bg-[#FF6A00]" />
                        </label>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Back action */}
            <button
              onClick={() => onNavigateTab('shop')}
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6A00] hover:underline"
            >
              <ArrowLeft className="w-4 h-4 animate-swipeLeft" />
              LASTİK KATALOĞUNDA ARAMAYA DEVAM ET
            </button>

          </div>

          {/* Right Column - Coupon promotions & price balance breakdown panels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code claimer form */}
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-[#262629]/40 dark:border-[#262629]/40 light:border-slate-100 pb-2">
                <Percent className="w-4 h-4 text-[#FF6A00]" />
                Kupon Kodu Uygula
              </h4>

              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kupon Girin (Örn: TIRECITY10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#101012] text-xs text-white p-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#262629] hover:bg-[#FF6A00] hover:text-black font-mono font-bold text-xs uppercase rounded text-white transition-colors border border-[#262629]"
                >
                  Uygula
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] font-mono text-red-400 bg-red-500/5 p-2 rounded border border-red-500/10">
                  {promoError}
                </p>
              )}

              {promoSuccess && (
                <p className="text-[11px] font-mono text-emerald-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
                  {promoSuccess}
                </p>
              )}

              <p className="text-[9.5px] text-gray-500 font-mono text-left">
                💡 İPUCU: Lastiklerde anında %10 indirim almak için <strong className="text-white">TIRECITY10</strong> kuponunu yazın.
              </p>
            </div>

            {/* Price sheet container */}
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pb-2">
                Fatura Özeti
              </h4>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lastik Toplam Tutarı</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${tiresSubtotal.toFixed(2)}</span>
                </div>

                {activeDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Kupon İndirimi (-%{activeDiscount})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Mobil Kapıda Kurulum Hizmeti</span>
                  {installationSubtotal > 0 ? (
                    <span className="text-white dark:text-white light:text-slate-800 font-bold">${installationSubtotal.toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-500 uppercase">Yalnızca Teslimat ($0.00)</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Lastik Geri Dönüşüm Katılım Payı (GEKAP)</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${disposalFees.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3.5 border-b border-[#262629]/50 dark:border-[#262629]/40 light:border-slate-100">
                  <span className="text-gray-500">KDV / Kasa Vergisi (%8)</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${stateTaxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base items-baseline pt-1">
                  <span className="text-white dark:text-white light:text-slate-900 font-bold font-sans">Genel Toplam</span>
                  <span className="text-xl font-bold text-[#FF6A00] font-mono">${finalCartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action checkout desk check button triggers */}
              <button
                onClick={() => onNavigateTab('checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF6A00] text-black font-display font-black text-xs uppercase tracking-widest rounded hover:bg-[#FF8533] hover:scale-103 active:scale-97 transition-all glow-orange"
              >
                Ödeme Ekranına İlerle
                <ChevronRight className="w-4 h-4 stroke-[3.5]" />
              </button>

              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-2 pt-2 border-t border-[#262629]/40 dark:border-[#262629]/40 light:border-slate-100 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL Secured &bull; 256-bit Güvenli Ödeme Altyapısı</span>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
