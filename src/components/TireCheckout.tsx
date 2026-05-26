import React, { useState } from 'react';
import { CreditCard, Calendar, Truck, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Loader2, Landmark } from 'lucide-react';
import { CartItem } from '../types';

interface TireCheckoutProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function TireCheckout({
  cartItems,
  onClearCart,
  onNavigateTab,
}: TireCheckoutProps) {
  
  // Tab/Step Controls within Checkout
  const [shippingMethod, setShippingMethod] = useState<'mobile' | 'store'>('mobile');
  
  // Shipping Form State
  const [address, setAddress] = useState({
    fullName: 'Melih Demir',
    phone: '0532 993 88 22',
    street: 'Caddebostan Mah. No:15 D:4, Kadıköy',
    city: 'İstanbul',
    zipCode: '34728',
    date: '2026-05-24',
    timeSlot: '12:00 - 15:00',
  });

  // Credit Card Form State
  const [card, setCard] = useState({
    number: '',
    name: 'MELIH DEMIR',
    expiry: '',
    cvv: '',
  });

  // Flow State
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [receiptNumber, setReceiptNumber] = useState('');

  // Math totals calculation (same logic as Cart)
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const tiresSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  
  // Total Installation Fees
  const installationSubtotal = cartItems.reduce((acc, item) => {
    if (item.withInstallation && shippingMethod === 'mobile') {
      return acc + (item.installationCost * item.qty);
    }
    return acc;
  }, 0);

  const disposalFees = totalItemsCount * 3.5; 
  const stateTaxes = (tiresSubtotal + installationSubtotal) * 0.08;
  const finalTotalAmount = tiresSubtotal + installationSubtotal + disposalFees + stateTaxes;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // format to clean 4-4-4-4 card spacing layout
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += value[i];
    }
    setCard({ ...card, number: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length > 0) {
      formatted = value.substring(0, 2);
      if (value.length > 2) {
        formatted += '/' + value.substring(2, 4);
      }
    }
    setCard({ ...card, expiry: formatted });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCard({ ...card, cvv: value });
  };

  const handleSecureCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);

    // Mock network transmission, security verification and database storage sequence
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setReceiptNumber(`TC-${Math.floor(100000 + Math.random() * 900000)}`);
      onClearCart(); // clean cart list state on order completion
    }, 2800);
  };

  const timeSlots = [
    '09:00 - 12:00',
    '12:00 - 15:00',
    '15:00 - 18:00',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {isProcessing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center">
          <div className="relative p-8 bg-[#1B1B1D] border border-[#262629] rounded-2xl max-w-sm space-y-6 animate-pulse">
            <Loader2 className="w-12 h-12 text-[#FF6A00] animate-spin mx-auto" />
            <div className="space-y-2">
              <h3 className="font-display font-black text-white text-lg tracking-tight uppercase">
                SİPARİŞ YAPILANDIRILIYOR
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-mono">
                Uçtan uca güvenli ödeme bilgileri iletiliyor. Mobil servis ve rot balans randevusu teknik koordinasyon merkezine kaydediliyor. Lütfen bekleyin.
              </p>
            </div>
            
            <div className="border-t border-[#262629] pt-4 font-mono text-[9px] text-[#FF6A00] flex justify-between uppercase">
              <span>GÜVENLİK: SSL SECURE</span>
              <span>TLS 1.3 Aktif</span>
            </div>
          </div>
        </div>
      )}

      {step === 'success' ? (
        <div className="max-w-xl mx-auto text-center bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Dynamic watermark animation backdrop */}
          <div className="absolute top-0 right-0 opacity-5">
            <Sparkles className="w-64 h-64 text-[#FF6A00]" />
          </div>

          <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-black px-2.5 py-1 rounded w-fit uppercase mx-auto block mb-3">
            SİPARİŞ GEÇİŞİ ONAYLANDI
          </span>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-900 tracking-tight uppercase leading-none">
            Sipariş Faturası Onaylandı
          </h2>

          <div className="my-6 p-4 bg-[#101012] dark:bg-[#101012] light:bg-slate-50 border border-[#262629]/60 dark:border-[#262629]/50 light:border-slate-150 rounded-lg space-y-3 font-mono text-xs text-left">
            <div className="flex justify-between border-b border-[#262629]/60 pb-2">
              <span className="text-gray-500">Sipariş / Fiş Numarası</span>
              <span className="text-white dark:text-white light:text-slate-800 font-bold">{receiptNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#262629]/60 pb-2">
              <span className="text-gray-500">Hizmet Türü</span>
              <span className="text-[#FF6A00] font-bold">
                {shippingMethod === 'mobile' ? 'Adreste Mobil Montaj Hizmeti' : 'Anlaşmalı Servis Noktasından Teslim Al'}
              </span>
            </div>

            {shippingMethod === 'mobile' && (
              <>
                <div className="flex justify-between border-b border-[#262629]/60 pb-2">
                  <span className="text-gray-500">Randevu Tarihi</span>
                  <span className="text-white dark:text-white light:text-slate-800">{address.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#262629]/60 pb-2">
                  <span className="text-gray-500">Randevu Saat Aralığı</span>
                  <span className="text-white dark:text-white light:text-slate-800">{address.timeSlot}</span>
                </div>
              </>
            )}

            <div className="flex justify-between pt-2">
              <span className="text-gray-500 uppercase">Kayıtlı Adres</span>
              <span className="text-gray-300 dark:text-gray-300 light:text-slate-700 font-sans text-[11px] text-right truncate max-w-[200px]">{address.street}, {address.city}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg leading-relaxed text-left max-w-sm mx-auto mb-8 font-sans">
            🚚 <strong className="text-orange-500 dark:text-[#FF6A00]">Mobil Koordinasyon Bildirimi:</strong> Sertifikalı balans ve montaj aracımız randevu saatinizden 30 dakika önce sizi telefonla arayarak montaj işlemleri için hazırlık aşamasını başlatacaktır.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigateTab('profile')}
              className="flex-1 py-3 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-display font-black text-xs uppercase tracking-widest rounded transition-colors"
            >
              Hizmet Takibi &amp; Profilim
            </button>
            <button
              onClick={() => onNavigateTab('shop')}
              className="flex-1 py-3 bg-[#262629] text-white hover:bg-slate-800 border border-gray-700 hover:border-gray-500 text-xs font-display font-medium rounded transition-colors"
            >
              Kataloğa Gözat
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSecureCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input parameters */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Delivery choice toggle */}
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-4">
              <h3 className="font-display font-black text-white dark:text-white light:text-slate-800 text-sm tracking-wide uppercase border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pb-3">
                1. MONTAJ YÖNTEMİNİ SEÇİN
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShippingMethod('mobile')}
                  className={`p-4 border rounded-lg text-left flex items-start gap-3.5 transition-all ${
                    shippingMethod === 'mobile'
                      ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00]'
                      : 'border-[#262629] bg-[#101012] text-gray-400 hover:text-white dark:bg-[#101012] light:bg-slate-50 light:border-slate-200'
                  }`}
                >
                  <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black block uppercase font-display">KAPIDA MOBİL MONTAJ</span>
                    <span className="text-[10.5px] text-gray-400 leading-normal block mt-1 font-sans">
                      Özel hidrolik lastik sökme-takma ve hassas lazer balans araçlarımızı direkt evinize veya ofisinize gönderelim.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('store')}
                  className={`p-4 border rounded-lg text-left flex items-start gap-3.5 transition-all ${
                    shippingMethod === 'store'
                      ? 'border-[#FF6A00] bg-[#FF6A00]/5 text-[#FF6A00]'
                      : 'border-[#262629] bg-[#101012] text-gray-400 hover:text-white dark:bg-[#101012] light:bg-slate-50 light:border-slate-200'
                  }`}
                >
                  <Landmark className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black block uppercase font-display">İSTASYONDA MONTAH HİZMETİ</span>
                    <span className="text-[10.5px] text-gray-400 leading-normal block mt-1 font-sans">
                      Lastikleri en yakın bölge servis istasyonumuzdan teslim alın ve profesyonel mekanik ekipmanlarımızdan yararlanın.
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Address Form */}
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-4">
              <h3 className="font-display font-black text-white dark:text-white light:text-slate-800 text-sm tracking-wide uppercase border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pb-3">
                {shippingMethod === 'mobile' ? '2. ADRESTE MONTAJ ADRESİ VE SAATİ' : '2. FATURA BİLGİLERİNİ GİRİN'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Adı Soyadı</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">İrtibat Telefonu</label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                    required
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">
                    {shippingMethod === 'mobile' ? 'Mobil Montaj Adresi (Sokak / No)' : 'Fatura Adresi'}
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Şehir / İlçe</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Posta Kodu</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                    required
                  />
                </div>

                {shippingMethod === 'mobile' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6A00]" />
                        Montaj Randevu Günü
                      </label>
                      <input
                        type="date"
                        value={address.date}
                        min="2026-05-22"
                        onChange={(e) => setAddress({ ...address, date: e.target.value })}
                        className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Saat Dilimi Rezervasyonu</label>
                      <select
                        value={address.timeSlot}
                        onChange={(e) => setAddress({ ...address, timeSlot: e.target.value })}
                        className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Credit Card Details Form Frame */}
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-6">
              <h3 className="font-display font-black text-white dark:text-white light:text-slate-800 text-sm tracking-wide uppercase border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pb-3">
                3. GÜVENLİ ÖDEME GEÇİDİ (SSL SECURE)
              </h3>

              {/* Dynamic visual credit card interface */}
              <div className="relative w-full max-w-[360px] aspect-[1.586/1] bg-gradient-to-br from-[#FF6A00]/90 to-amber-600 rounded-2xl p-5 text-black flex flex-col justify-between shadow-xl shadow-[#FF6A00]/20 font-mono select-none mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-black/5 rounded-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-black/60 block">GÜVENLİ KART PROTOKOLÜ</span>
                    <span className="text-[11px] font-bold text-white block mt-0.5">LASTİK ŞEHRİ PLATINUM</span>
                  </div>
                  <Landmark className="w-6 h-6 text-black/80" />
                </div>

                <div className="text-center">
                  <span className="text-base sm:text-lg font-bold text-black font-mono tracking-[3px] block">
                    {card.number || '•••• •••• •••• ••••'}
                  </span>
                </div>

                <div className="flex justify-between items-end text-left text-black/70">
                  <div>
                    <span className="text-[8px] uppercase block">Kart Sahibi</span>
                    <span className="text-xs font-bold text-black uppercase block max-w-[190px] truncate">{card.name || 'AD SOYAD'}</span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                       <span className="text-[8px] uppercase block">SKT</span>
                      <span className="text-xs font-bold text-black block">{card.expiry || 'AA/YY'}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase block">CVV</span>
                      <span className="text-xs font-bold text-black block">{card.cvv || '•••'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input forms for the credit card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Kredi Kartı Numarası</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={card.number}
                      onChange={handleCardNumberChange}
                      className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 pl-10 pr-3 py-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00] font-mono"
                      required
                    />
                    <CreditCard className="absolute left-3 top-3 w-4.5 h-4.5 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Son Kullanma Tarihi (Ay/Yıl)</label>
                  <input
                    type="text"
                    placeholder="AA/YY"
                    value={card.expiry}
                    onChange={handleExpiryChange}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00] font-mono text-center"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Güvenlik Kodu (CVV)</label>
                  <input
                    type="password"
                    placeholder="123"
                    value={card.cvv}
                    onChange={handleCvvChange}
                    className="w-full bg-[#101012] dark:bg-[#101012] light:bg-slate-50 text-xs text-white dark:text-white light:text-slate-800 p-2.5 rounded border border-[#262629] dark:border-[#262629] light:border-slate-200 focus:outline-none focus:border-[#FF6A00] font-mono text-center"
                    required
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Checkout Breakdown */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#1B1B1D] dark:bg-[#1B1B1D] light:bg-[#FFFFFF] border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl p-5 shadow-sm text-left space-y-4">
              <h4 className="text-xs font-mono font-bold text-gray-400 dark:text-gray-400 light:text-slate-500 uppercase tracking-widest border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-100 pb-2">
                Sepetteki Lastikler
              </h4>

              <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-xs items-center gap-3">
                    <div className="grow">
                      <span className="font-bold text-white dark:text-white light:text-slate-800 uppercase block font-sans truncate max-w-[160px]">
                        {item.product.model}
                      </span>
                      <span className="text-[9.5px] text-gray-500 font-mono block">
                        {item.qty} Adet &bull; {item.selectedSize}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white dark:text-white light:text-slate-700">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#262629]/50 dark:border-[#262629]/40 light:border-slate-100 pt-4 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Lastik Tutarı</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${tiresSubtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobil Montaj Bedeli</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${installationSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Geri Kazanım Katkı Payı (GEKAP)</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${disposalFees.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pb-3.5 border-b border-[#262629]/40 dark:border-[#262629]/40 light:border-slate-100">
                  <span className="text-gray-500">KDV Dahil (%8 Kasa Vergisi)</span>
                  <span className="text-white dark:text-white light:text-slate-800 font-bold">${stateTaxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base items-baseline pt-1">
                  <span className="text-white dark:text-white light:text-slate-900 font-bold font-sans">Genel Toplam</span>
                  <span className="text-xl font-black text-[#FF6A00]">${finalTotalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Main Submit Action */}
              <button
                type="submit"
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-[#FF6A00] text-black font-display font-black text-xs uppercase tracking-widest rounded hover:bg-[#FF8533] hover:scale-103 active:scale-97 transition-all glow-orange disabled:opacity-50 disabled:pointer-events-none"
              >
                SİPARİŞİ TAMAMLA VE KAYDET
              </button>

              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono justify-center pt-2 border-t border-[#262629]/40 dark:border-[#262629]/40 light:border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PCI-DSS SSL Güvenli Koruma Protokolü</span>
              </div>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
