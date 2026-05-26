import React, { useState } from 'react';
import { CartItem, BookingDetails } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Wrench, 
  Calendar, 
  Clock, 
  Truck, 
  Tag, 
  CheckCircle2, 
  MapPin, 
  CreditCard,
  CreditCardIcon, 
  Info 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, val: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'booking' | 'payment' | 'completed'>('cart');
  
  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in dollars
  const [couponFeedback, setCouponFeedback] = useState('');

  // Booking states
  const [bookingType, setBookingType] = useState<'shop' | 'mobile'>('mobile');
  const [bookingDate, setBookingDate] = useState('2026-05-25');
  const [bookingTime, setBookingTime] = useState('10:00 AM - 12:00 PM');
  const [localStore, setLocalStore] = useState('Downtown Speed Shop & alignment (Certified)');
  const [mobileAddress, setMobileAddress] = useState('Caddebostan Mah. No:15 D:4 İstanbul');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'cc' | 'affirm'>('cc');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8490');
  const [affirmMonths, setAffirmMonths] = useState(6); // 6 months financing

  // Form errors
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Math subtotal
  const tiresTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const installationTotal = cartItems.reduce(
    (acc, item) => acc + (item.withInstallation ? item.installationCost * item.qty : 0),
    0
  );
  const stateEcoTax = cartItems.reduce((acc, item) => acc + 4.25 * item.qty, 0); // $4.25 tyre disposal eco fee
  const subtotal = tiresTotal + installationTotal + stateEcoTax;
  const grandTotal = Math.max(0, subtotal - appliedDiscount);

  // Affirm calculations
  const monthlyFinanceAmount = grandTotal / affirmMonths;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'PERFORMANCE50') {
      setAppliedDiscount(50);
      setCouponFeedback('✓ PERFORMANCE50 uygulandı! 50.00$ indirim kazandınız!');
    } else if (cleanCode === 'TIRE10') {
      setAppliedDiscount(Math.round(tiresTotal * 0.1));
      setCouponFeedback('✓ TIRE10 uygulandı! %10 sepet indirimi hesabınıza yansıtıldı!');
    } else {
      setCouponFeedback('✗ Geçersiz kupon kodu. 50$ indirim için "PERFORMANCE50" kodunu deneyin!');
    }
  };

  const handleNextToBooking = () => {
    if (cartItems.length === 0) return;
    setStep('booking');
  };

  const handleNextToPayment = () => {
    if (!driverName || !driverPhone || (bookingType === 'mobile' && !mobileAddress)) {
      setFormError('Lütfen tüm montaj planı ve iletişim bilgilerini eksiksiz doldurun.');
      return;
    }
    setFormError('');
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    setStep('completed');
  };

  const triggerClose = () => {
    if (step === 'completed') {
      onClearCart();
      setStep('cart');
      setAppliedDiscount(0);
      setCouponCode('');
      setCouponFeedback('');
      setDriverName('');
      setDriverPhone('');
      setLicensePlate('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Outer Click dismisser */}
      <div className="absolute inset-0" onClick={triggerClose} />

      {/* Main Slide-out Container */}
      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-lg bg-[#0F0F10] border-l border-[#262629] text-white flex flex-col shadow-2xl relative">
          
          {/* Top Decorative glowing band */}
          <div className="h-1 bg-gradient-to-r from-[#FF6A00] to-yellow-500 w-full" />

          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#262629] flex items-center justify-between">
            <div>
              <h3 className="font-display font-black text-lg tracking-tight uppercase flex items-center gap-2">
                📂 Garaj Sepetiniz
              </h3>
              <p className="text-[10px] text-gray-400 font-mono tracking-wider">
                {step === 'cart' && 'AŞAMA 1: ÜRÜN ÖZETLERİ VE FATURA'}
                {step === 'booking' && 'AŞAMA 2: RANDEVU VE MOBİL MONTAJ AYARI'}
                {step === 'payment' && 'AŞAMA 3: GÜVENLİ ÖDEME ADIMI'}
                {step === 'completed' && 'AŞAMA 4: SİPARİŞ BAŞARIYLA TAMAMLANDI'}
              </p>
            </div>
            
            <button
              onClick={triggerClose}
              className="p-1 text-gray-400 hover:text-white rounded-md border border-[#262629] hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar col-gap">
            
            {/* Step: Cart */}
            {step === 'cart' && (
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#1B1B1D] flex items-center justify-center border border-[#262629]">
                      <X className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base">Sepetiniz Boş</h4>
                      <p className="text-xs text-gray-400 mt-1 max-w-xs font-mono">
                        Bileşen özelliklerini, hız sınıflandırmalarını ve montaj uyumluluklarını hesaplamak için sepetinize yüksek performanslı lastikler ekleyin.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cartItems.map((item, idx) => (
                        <div 
                          key={`${item.product.id}-${idx}`}
                          className="bg-[#1B1B1D] border border-[#262629] p-4 rounded-lg flex gap-4 items-start relative group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 bg-[#101012] p-2 rounded border border-[#262629] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.model}
                              className="h-14 w-auto object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] font-mono tracking-wider text-gray-400 block uppercase">
                              {item.product.brand} &bull; {item.product.type === 'Summer' ? 'YAZ' : item.product.type === 'Winter' ? 'KIŞ' : item.product.type === 'All-Season' ? '4 MEVSİM' : 'PERFORMANS'}
                            </span>
                            <h5 className="font-display font-extrabold text-xs text-white uppercase truncate">
                              {item.product.brand} {item.product.model}
                            </h5>
                            <span className="text-[10px] font-mono font-bold text-[#FF6A00] block mt-0.5">
                              Seçilen Ebat: {item.selectedSize}
                            </span>

                            {/* Qty & Price Row */}
                            <div className="flex items-center justify-between mt-3 font-mono">
                              <div className="flex items-center bg-[#101012] border border-[#262629] rounded overflow-hidden">
                                <button
                                  onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-3 text-xs text-white font-bold">{item.qty}</span>
                                <button
                                  onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs text-white font-bold">
                                ${(item.product.price * item.qty).toFixed(2)}
                              </span>
                            </div>

                            {/* Balanced Valve Stem Badge toggle */}
                            {item.withInstallation && (
                              <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded w-fit border border-emerald-500/10">
                                <Wrench className="w-3 h-3 text-emerald-400" />
                                + Supap Değişimi &amp; Balans Montajı Dahil
                              </div>
                            )}
                          </div>

                          {/* Trash indicator */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-500 hover:text-red-500 p-1 rounded-md border border-transparent hover:border-[#262629] h-8 w-8 flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo code form */}
                    <form onSubmit={handleApplyCoupon} className="border-t border-[#262629] pt-4 mt-6">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Promosyon / Kupon Kodu</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="PERFORMANCE50 veya TIRE10 yazın"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 bg-[#1B1B1D] text-xs text-white px-3 py-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                          />
                          <button
                            type="submit"
                            className="bg-[#1B1B1D] hover:bg-[#FF6A00] text-gray-300 hover:text-black border border-[#262629] hover:border-[#FF6A00] px-4 py-2 text-xs font-display font-bold uppercase rounded transition-colors"
                          >
                            Uygula
                          </button>
                        </div>
                        {couponFeedback && (
                          <span className={`text-[10px] font-mono ${couponFeedback.includes('✓') ? 'text-emerald-400' : 'text-red-400'}`}>
                            {couponFeedback}
                          </span>
                        )}
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

            {/* Step: Booking */}
            {step === 'booking' && (
              <div className="space-y-6">
                <div className="p-4 bg-orange-500/10 border border-[#FF6A00]/20 rounded text-xs text-gray-300 leading-relaxed font-mono">
                  <strong>İPUCU:</strong> 4 adet ve üzeri lastik alımında **Kapıda Mobil Montaj** ayrıcalığı kazanırsınız. Mobil araç garajımız direkt kapınıza gelerek montajı gerçekleştirsin!
                </div>

                {/* Switcher Option */}
                <div className="flex gap-3 bg-[#101012] p-1.5 rounded-lg border border-[#262629]">
                  <button
                    onClick={() => setBookingType('mobile')}
                    className={`flex-1 flex flex-col items-center py-2.5 px-3 rounded text-center transition-all ${
                      bookingType === 'mobile'
                        ? 'bg-[#FF6A00] text-black font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 mb-1" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider">Mobil Kapıda Montaj</span>
                  </button>
                  <button
                    onClick={() => setBookingType('shop')}
                    className={`flex-1 flex flex-col items-center py-2.5 px-3 rounded text-center transition-all ${
                      bookingType === 'shop'
                        ? 'bg-[#FF6A00] text-black font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Wrench className="w-4 h-4 mb-1" />
                    <span className="text-[11px] font-display font-bold uppercase tracking-wider">Anlaşmalı İstasyon</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Location Address */}
                  {bookingType === 'mobile' ? (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Mobil Montaj Teslimat Adresi</label>
                      <input
                        type="text"
                        required
                        value={mobileAddress}
                        onChange={(e) => setMobileAddress(e.target.value)}
                        placeholder="Örn: Caddebostan Mah. No:15 İstanbul"
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Sertifikalı İstasyon Seçin</label>
                      <select
                        value={localStore}
                        onChange={(e) => setLocalStore(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      >
                        <option value="Merkez Lastik & Rot Balans Hizmetleri (Sertifikalı)">Merkez Lastik Performans Rot Balans Hizmetleri</option>
                        <option value="Westside Tire Pros (Certified)">Göztepe Lastik Dünyası (Sertifikalı)</option>
                        <option value="Tire City Track Garage (Official Store)">Lastik Şehri Merkez Servis (Resmi İstasyon Peron #3)</option>
                      </select>
                    </div>
                  )}

                  {/* Date Picker */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Randevu Tarihi</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Saat Dilimi Aralığı</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      >
                        <option value="08:00 AM - 10:00 AM">08:00 - 10:00</option>
                        <option value="10:00 AM - 12:00 PM">10:00 - 12:00</option>
                        <option value="12:00 PM - 03:00 PM">12:00 - 15:00</option>
                        <option value="03:00 PM - 06:00 PM">15:00 - 18:00</option>
                      </select>
                    </div>
                  </div>

                  {/* Driver Contact details */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Sürücü Adı Soyadı</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ahmet Yılmaz"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Telefon Numarası</label>
                      <input
                        type="tel"
                        required
                        placeholder="Örn: 0555 123 45 67"
                        value={driverPhone}
                        onChange={(e) => setDriverPhone(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Araç Marka / Plaka (Opsiyonel)</label>
                      <input
                        type="text"
                        placeholder="Örn: 34 ABC 123"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="w-full bg-[#1B1B1D] text-xs text-white px-3 py-2.5 border border-[#262629] focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                      />
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-red-400 font-mono mt-2 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-red-400" />
                    {formError}
                  </p>
                )}
              </div>
            )}

            {/* Step: Payment */}
            {step === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase mb-3">
                    💳 GÜVENLİ ÖDEME SEÇENEKLERİ
                  </h4>
                  
                  {/* Switching */}
                  <div className="grid grid-cols-2 gap-3 bg-[#101012] p-1.5 rounded-lg border border-[#262629]">
                    <button
                      onClick={() => setPaymentMethod('cc')}
                      className={`py-3.5 rounded text-center transition-all flex flex-col items-center justify-center font-display font-bold text-xs ${
                        paymentMethod === 'cc'
                          ? 'bg-[#FF6A00] text-black font-extrabold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <CreditCardIcon className="w-4 h-4 mb-1" />
                      KREDİ / BANKA KARTI
                    </button>
                    <button
                      onClick={() => setPaymentMethod('affirm')}
                      className={`py-3.5 rounded text-center transition-all flex flex-col items-center justify-center font-display font-bold text-xs ${
                        paymentMethod === 'affirm'
                          ? 'bg-[#FF6A00] text-black font-extrabold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Tag className="w-4 h-4 mb-1" />
                      TAKSİTLİ ÖDEME (AFFIRM)
                    </button>
                  </div>
                </div>

                {paymentMethod === 'cc' ? (
                  <div className="space-y-4">
                    {/* Simulated CC detail mock */}
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xs font-mono text-gray-400 uppercase">TIRE CITY GÜVENLİ ÖDEME</span>
                        <span className="text-xs bg-emerald-500 font-bold text-black px-2 py-0.5 rounded">PCI-DSS UYUMLU</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Kredi Kartı Numarası (Simülasyon)</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black text-xs text-white px-3 py-2 border border-zinc-800 focus:outline-none focus:border-[#FF6A00] rounded font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">SKT</span>
                          <span className="text-xs text-white font-mono">08/2030</span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase">CVV</span>
                          <span className="text-xs text-white font-mono">312</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Affirm simulated financing calculator */}
                    <div className="p-5 bg-gradient-to-r from-blue-900/10 to-blue-900/20 border border-blue-500/20 rounded-lg">
                      <h5 className="font-display font-bold text-sm text-[#FF6A00] flex items-center gap-1.5 uppercase">
                        Affirm %0 Faiz Hesaplayıcı
                      </h5>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed font-sans">
                        Lastik ve montaj bütçenizi hiçbir ek gizli ücret olmadan kolay aylık taksitlere bölün.
                      </p>

                      {/* Slider months */}
                      <div className="mt-5">
                        <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                          <span>Taksit Süresi Seçenekleri</span>
                          <span className="text-[#FF6A00] font-bold">{affirmMonths} Ay Taksit</span>
                        </div>

                        <div className="flex gap-2">
                          {[3, 6, 12].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setAffirmMonths(m)}
                              className={`flex-1 py-2 rounded text-xs font-mono font-bold border transition-colors ${
                                affirmMonths === m
                                  ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                                  : 'border-[#262629] hover:border-gray-500'
                              }`}
                            >
                              {m} Taksit
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Affirm dynamic amount */}
                      <div className="border-t border-dashed border-[#262629] pt-4 mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-gray-500 block font-mono">AYLIK ÖDEME TUTARINIZ</span>
                          <span className="text-2xl font-mono font-black text-white">
                            ${monthlyFinanceAmount.toFixed(2)}
                            <span className="text-xs font-normal text-gray-400"> /ay</span>
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded">
                          %0 Faiz Avantajı
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step: Completed */}
            {step === 'completed' && (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center border-4 border-emerald-900 mx-auto glow-orange-lg animate-bounce">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="font-display font-black text-xl text-white tracking-tight uppercase">
                    SİPARİŞ BAŞARIYLA TAMAMLANDI!
                  </h4>
                  <p className="text-xs font-mono text-gray-400 mt-2">
                    Sipariş / Fiş Numarası: <strong className="text-emerald-400">#TC-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </p>
                </div>

                <div className="bg-[#1B1B1D] border border-[#262629] p-5 rounded-lg text-left text-xs space-y-3 font-mono">
                  <span className="text-cyan-400 uppercase font-bold border-b border-[#262629] pb-1.5 block">
                    🔧 Montaj Rezervasyon Özeti
                  </span>
                  <div>
                    <span className="text-gray-500 block">Montaj Türü:</span>
                    <span className="text-white font-bold uppercase">{bookingType === 'mobile' ? '🚚 Kendi Kapınızda Mobil Servis' : '⚙ Anlaşmalı Sertifikalı Garaj İstasyonu'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Tarih &amp; Saat Aralığı:</span>
                    <span className="text-white font-bold">{bookingDate} @ {bookingTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Sürücü İletişim Bilgisi:</span>
                    <span className="text-white font-bold truncate block">{driverName} ({driverPhone})</span>
                  </div>
                  {bookingType === 'mobile' ? (
                    <div>
                      <span className="text-gray-500 block">Mobil Servis Adresi:</span>
                      <span className="text-white font-bold">{mobileAddress}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-gray-500 block">Anlaşmalı İstasyon Adresi:</span>
                      <span className="text-white font-bold">{localStore}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Randevu onay bildirimi ve montaj takip şifreleri güvenlik protokollerimiz kapsamında <strong>{driverPhone}</strong> numarasına SMS olarak iletilmiştir.
                </p>
              </div>
            )}

          </div>

          {/* Drawer Footer billing section */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#262629] bg-[#101012] space-y-4">
              {/* Receipt Breakdowns */}
              {step !== 'completed' && (
                <div className="space-y-1.5 font-mono text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Lastik Taban Bedeli:</span>
                    <span className="text-white font-bold">${tiresTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profesyonel Balans &amp; Montaj Hizmeti:</span>
                    <span className="text-white">
                      {installationTotal > 0 ? `$${installationTotal.toFixed(2)}` : 'Kendim Monte Edeceğim ($0)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lastik Geri Dönüşüm &amp; Çevre Katkı Payı:</span>
                    <span className="text-white">${stateEcoTax.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Uygulanan Kupon İndirimi:</span>
                      <span>-${appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Divider */}
                  <div className="border-t border-[#262629]/60 my-2" />

                  <div className="flex justify-between text-sm">
                    <span className="font-display font-medium text-white uppercase font-bold">Tahmini Genel Toplam:</span>
                    <span className="text-[#FF6A00] font-extrabold text-lg">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Step Navigation buttons */}
              <div className="flex gap-3">
                {step === 'cart' && (
                  <button
                    onClick={handleNextToBooking}
                    disabled={cartItems.length === 0}
                    className="w-full py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] disabled:opacity-40 transition-colors glow-orange"
                  >
                    RANDEVU VE MONTAJ ADIMINA GEÇ
                  </button>
                )}

                {step === 'booking' && (
                  <>
                    <button
                      onClick={() => setStep('cart')}
                      className="px-4 py-4 bg-transparent border border-[#262629] text-gray-400 hover:text-white rounded font-display font-bold text-xs uppercase transition-colors"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleNextToPayment}
                      className="flex-1 py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] transition-colors glow-orange"
                    >
                      GÜVENLİ ÖDEMEYE GEÇ ({paymentMethod === 'affirm' ? `Ayda $${monthlyFinanceAmount.toFixed(0)}` : `$${grandTotal.toFixed(2)}`})
                    </button>
                  </>
                )}

                {step === 'payment' && (
                  <>
                    <button
                      onClick={() => setStep('booking')}
                      className="px-4 py-4 bg-transparent border border-[#262629] text-gray-400 hover:text-white rounded font-display font-bold text-xs uppercase transition-colors"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      className="flex-1 py-4 bg-[#FF6A00] text-black font-display font-black tracking-widest text-xs uppercase rounded hover:bg-[#FF8533] transition-colors glow-orange"
                    >
                      {paymentMethod === 'affirm' ? 'AFFIRM TIKLA & ONAYLA' : 'SİPARİŞİ TAMAMLA VE KAYDET'}
                    </button>
                  </>
                )}

                {step === 'completed' && (
                  <button
                    onClick={triggerClose}
                    className="w-full py-4 bg-neutral-800 hover:bg-[#FF6A00] text-white hover:text-black font-display font-black tracking-widest text-xs uppercase rounded transition-colors"
                  >
                    KAPAT VE SEPETİ SIFIRLA
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
