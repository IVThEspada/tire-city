import React, { useState } from 'react';
import { 
  User, 
  Car, 
  History, 
  CreditCard, 
  ChevronRight, 
  Award, 
  Plus, 
  Trash2, 
  Heart, 
  BadgeCheck, 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShoppingBag, 
  Edit3, 
  Check, 
  Compass, 
  Settings 
} from 'lucide-react';
import { TireProduct } from '../types';

interface UserProfileProps {
  wishlist: TireProduct[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: TireProduct) => void;
  onSelectProduct: (product: TireProduct) => void;
  onNavigateTab: (tab: string) => void;
}

export default function UserProfile({
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigateTab,
}: UserProfileProps) {
  // Client personal profile details
  const [profile, setProfile] = useState({
    name: 'Melih Demir',
    email: 'melih.demir@performance.com',
    phone: '+90 (532) 993-8822',
    address: 'Vişnezade Mah. Prof. Dr. Alaeddin Yavaşça Sk. No:24, Beşiktaş / İstanbul',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    memberSince: 'Ekim 2022',
    tier: 'Gold Racer Üye',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  // Registered Vehicles (Garajım)
  const [fleet, setFleet] = useState([
    { id: 'f-1', year: '2021', make: 'BMW', model: 'M4 Coupe', trim: 'Competition 3.0T', tireSize: '275/35R19' },
    { id: 'f-2', year: '2022', make: 'Porsche', model: '911 Carrera S', trim: 'Cabriolet', tireSize: '295/35R20' },
  ]);

  const [newCar, setNewCar] = useState({ year: '', make: '', model: '', trim: '', size: '' });
  const [showAddCar, setShowAddCar] = useState(false);

  // Active Live Order Tracker State and Past Orders list
  // Tracking Steps: 1: Ödeme Onaylandı, 2: Hazırlanıyor, 3: Yolda / Montaj Ekibi Dağıtımda, 4: Başarıyla Kuruldu
  const [activeOrder, setActiveOrder] = useState({
    id: 'TC-10492',
    date: '21 May 2026',
    estimatedDelivery: '22 May 2026, 14:00 - 16:00',
    currentStep: 2, // preparing
    installationType: 'Adrese Mobil Montaj Hizmeti',
    address: 'Vişnezade Mah. Prof. Dr. Alaeddin Yavaşça Sk. No:24, Beşiktaş / İstanbul',
    item: {
      brand: 'Michelin',
      model: 'Pilot Sport 5 S',
      qty: 4,
      size: '275/35R19',
      price: 249,
    },
    total: 1046.00 // includes mobile fee
  });

  const [pastOrders, setPastOrders] = useState([
    {
      id: 'TC-99482',
      date: '10 Mart 2026',
      total: 1099.96,
      status: 'Teslim Edildi & Montaj Yapıldı',
      installationType: 'Ofis Otoparkında Mobil Montaj',
      item: {
        brand: 'Michelin',
        model: 'Pilot Sport 4S',
        qty: 4,
        size: '275/35ZR19',
      },
    },
    {
      id: 'TC-98521',
      date: '04 Kasım 2025',
      total: 820.00,
      status: 'Arşivlendi (Tamamlandı)',
      installationType: 'Mağazadan Teslim Alma',
      item: {
        brand: 'Continental',
        model: 'ExtremeContact DWS06 Plus',
        qty: 4,
        size: '225/40ZR18',
      },
    },
  ]);

  const [activeProfileTab, setActiveProfileTab] = useState<'orders' | 'garage' | 'info' | 'favorites'>('orders');

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    orderTracker: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditingProfile(false);
  };

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.make || !newCar.model || !newCar.size) return;
    setFleet((prev) => [
      ...prev,
      {
        id: `f-gen-${Date.now()}`,
        year: newCar.year || '2023',
        make: newCar.make,
        model: newCar.model,
        trim: newCar.trim || 'Standart Paket',
        tireSize: newCar.size,
      },
    ]);
    setNewCar({ year: '', make: '', model: '', trim: '', size: '' });
    setShowAddCar(false);
  };

  const handleDeleteCar = (id: string) => {
    setFleet((prev) => prev.filter((c) => c.id !== id));
  };

  // Helper renderer for active order stages
  const orderSteps = [
    { title: 'Sipariş Alındı', desc: 'Ödemeniz doğrulandı', icon: CreditCard },
    { title: 'Hazırlanıyor', desc: 'Lastikler depodan çıkarıldı', icon: Package },
    { title: 'Yola Çıktı', desc: 'Mobil montaj minibüsü hareket etti', icon: Truck },
    { title: 'Teslim Edildi', desc: 'Siparişiniz başarıyla ulaştırıldı ve tamamlandı', icon: BadgeCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      
      {/* Banner / Header containing Customer Avatar & Core Stats */}
      <div className="relative profile-banner border border-[#262629] rounded-2xl p-6 sm:p-8 mb-10 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full border-2 border-[#FF6A00] object-cover ring-4 ring-[#FF6A00]/10"
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-[#FF6A00] text-black p-1 rounded-full text-[9px] font-mono font-extrabold flex items-center justify-center">
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                <h2 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center gap-1 bg-[#FF6A00]/10 border border-[#FF6A00]/20 text-[#FF6A00] text-[9px] font-mono font-extrabold px-2 py-0.5 rounded uppercase">
                  {profile.tier}
                </span>
              </div>
              <p className="text-gray-400 text-xs font-mono">
                ÜYELİK BAŞLANGICI: {profile.memberSince} &bull; MÜŞTERİ NO: TC-3019482
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-[#262629] md:border-t-0 pt-4 md:pt-0 w-full md:w-auto justify-center">
            <div className="text-center font-mono">
              <span className="text-xl font-bold block text-white">{pastOrders.length + 1}</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Sipariş Sayısı</span>
            </div>
            <div className="h-10 w-[1px] bg-[#262629]" />
            <div className="text-center font-mono">
              <span className="text-xl font-bold block text-[#FF6A00]">{wishlist.length}</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Favorilerim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs Bar */}
      <div className="flex border-b border-[#262629] overflow-x-auto no-scrollbar mb-8 gap-2 pb-px">
        <button
          onClick={() => setActiveProfileTab('orders')}
          className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-display text-xs sm:text-sm font-black tracking-wider transition-all uppercase whitespace-nowrap ${
            activeProfileTab === 'orders'
              ? 'border-[#FF6A00] text-white bg-[#1B1B1D]/40'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#FF6A00]" />
          SİPARİŞLERİM
          <span className="ml-1 px-2 py-0.5 text-[9.5px] font-mono font-black bg-[#262629] text-gray-300 rounded-full">
            {pastOrders.length + 1}
          </span>
        </button>

        <button
          onClick={() => setActiveProfileTab('info')}
          className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-display text-xs sm:text-sm font-black tracking-wider transition-all uppercase whitespace-nowrap ${
            activeProfileTab === 'info'
              ? 'border-[#FF6A00] text-white bg-[#1B1B1D]/40'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <User className="w-4 h-4 text-[#FF6A00]" />
          PROFİL BİLGİLERİ
        </button>

        <button
          onClick={() => setActiveProfileTab('favorites')}
          className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-display text-xs sm:text-sm font-black tracking-wider transition-all uppercase whitespace-nowrap ${
            activeProfileTab === 'favorites'
              ? 'border-[#FF6A00] text-white bg-[#1B1B1D]/40'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          FAVORİLERİM
          <span className="ml-1 px-2 py-0.5 text-[9.5px] font-mono font-black bg-[#262629] text-gray-300 rounded-full">
            {wishlist.length}
          </span>
        </button>
      </div>

      {/* Dynamic Tab Panes */}
      <div className="min-h-[400px]">
        {/* TAB 1: ORDERS */}
        {activeProfileTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left side: Active tracker */}
            <div className="lg:col-span-7 space-y-6">
              {/* DYNAMIC SELLER / ORDER LIVE TRACKER PANEL */}
              <div className="bg-[#1B1B1D] border border-[#262629] rounded-2xl p-6 shadow-lg text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#262629] pb-4 mb-6 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#FF6A00]/10 rounded-lg text-[#FF6A00]">
                      <Compass className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-black text-white text-base uppercase tracking-tight">
                          Aktif Sipariş Takibiniz
                        </h3>
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-xs text-gray-400 font-mono uppercase mt-0.5">
                        Sipariş No: #{activeOrder.id} &bull; Tutar: ${activeOrder.total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 self-start sm:self-center">
                    <button 
                      onClick={() => setActiveOrder(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 4) }))}
                      className="text-[10px] bg-[#262629] hover:bg-[#FF6A00] hover:text-black hover:border-[#FF6A00] text-gray-300 font-mono font-bold px-2.5 py-1.5 rounded transition-all border border-[#262629] uppercase"
                      disabled={activeOrder.currentStep === 4}
                      title="Sipariş adımını simüle et"
                    >
                      Adım İlerlet (Demo)
                    </button>
                    <button 
                      onClick={() => setActiveOrder(prev => ({ ...prev, currentStep: 1 }))}
                      className="text-[10px] bg-transparent hover:bg-slate-800 text-gray-500 font-mono px-2 py-1.5 rounded transition-all uppercase"
                    >
                      Sıfırla
                    </button>
                  </div>
                </div>

                {/* PROGRESS Tracker Stepper Visuals */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mb-8">
                  <div className="absolute top-6 left-[12%] right-[12%] h-[2px] bg-[#262629] hidden md:block z-0">
                    <div 
                      className="h-full bg-[#FF6A00] transition-all duration-500" 
                      style={{ width: `${((activeOrder.currentStep - 1) / 3) * 100}%` }}
                    />
                  </div>

                  {orderSteps.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = stepNum < activeOrder.currentStep;
                    const isActive = stepNum === activeOrder.currentStep;
                    const StepIcon = step.icon;

                    return (
                      <div key={idx} className="flex md:flex-col items-center gap-4 md:text-center relative z-10">
                        <div 
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-[#FF6A00] border-[#FF6A00] text-black shadow-[0_0_15px_rgba(255,106,0,0.3)]'
                              : isActive
                                ? 'bg-[#1B1B1D] border-[#FF6A00] text-[#FF6A00] shadow-[0_0_15px_rgba(255,106,0,0.15)] ring-4 ring-[#FF6A00]/10'
                                : 'bg-[#101012] border-[#262629] text-gray-500'
                          }`}
                        >
                          {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <StepIcon className="w-5 h-5" />}
                        </div>

                        <div className="text-left md:text-center">
                          <h4 className={`text-xs font-bold leading-tight uppercase ${isActive ? 'text-[#FF6A00]' : isCompleted ? 'text-white' : 'text-gray-500'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10.5px] text-gray-400 mt-0.5 leading-snug max-w-[150px] mx-auto font-sans">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-[#101012] dark:bg-[#101012] light:bg-slate-50 border border-[#262629] dark:border-[#262629] light:border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 light:text-slate-500 uppercase font-bold block">
                      TESLİMAT &amp; MONTAJ EKİBİ DETAYI
                    </span>
                    <p className="text-white dark:text-white light:text-slate-800 font-bold">{activeOrder.installationType}</p>
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-400 light:text-slate-600">
                      <Clock className="w-4 h-4 text-[#FF6A00]" />
                      <span>Tahmini Varış: <strong className="text-white dark:text-white light:text-slate-900">{activeOrder.estimatedDelivery}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-[#262629] dark:border-[#262629] light:border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 light:text-slate-500 uppercase font-bold block">
                      SATIN ALINAN LASTİK TAKIMI
                    </span>
                    <p className="text-white dark:text-white light:text-slate-800 font-bold uppercase">
                      {activeOrder.item.brand} {activeOrder.item.model}
                    </p>
                    <p className="text-gray-400 dark:text-gray-400 light:text-slate-500 font-mono text-[11px]">
                      Boyut: {activeOrder.item.size} &bull; Adet: {activeOrder.item.qty} adet
                    </p>
                  </div>
                </div>

                {/* DETAILED ACTIVE ORDER DETAILS PANEL */}
                <div className="mt-5 p-5 bg-[#101012]/50 dark:bg-[#101012]/50 light:bg-slate-50/50 border border-[#262629]/70 dark:border-[#262629]/70 light:border-slate-200/80 rounded-xl font-sans text-xs text-left space-y-4">
                  <div className="border-b border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-200/50 pb-3 flex items-center justify-between font-mono">
                    <span className="text-[11px] font-bold text-[#FF6A00] uppercase tracking-wider">
                      Detaylı Sipariş &amp; Ödeme Bilgileri
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                      E-FATURA ONAYLI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 leading-relaxed">
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 light:text-slate-400 uppercase font-bold block">Teslimat &amp; Fatura Adresi</span>
                        <div className="flex items-start gap-1.5 mt-1 text-gray-300 dark:text-gray-300 light:text-slate-700">
                          <MapPin className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                          <span>{activeOrder.address}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 light:text-slate-400 uppercase font-bold block">Ödeme Türü</span>
                          <span className="text-white dark:text-white light:text-slate-800 font-semibold block mt-0.5">Kredi Kartı (**** 8822)</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 light:text-slate-400 uppercase font-bold block">Sipariş Tarihi</span>
                          <span className="text-white dark:text-white light:text-slate-800 font-mono block mt-0.5">{activeOrder.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-[#262629]/60 dark:border-[#262629]/60 light:border-slate-200/70 pt-3 sm:pt-0 sm:pl-5 text-gray-400 dark:text-gray-400 light:text-slate-600 font-mono">
                      <div className="flex justify-between">
                        <span className="font-sans">Ürün Toplamı ({activeOrder.item.qty} Adet):</span>
                        <span className="text-white dark:text-white light:text-slate-800 font-bold">${(activeOrder.item.price * activeOrder.item.qty).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans">Kurulum &amp; Hizmet Bedeli:</span>
                        <span className="text-white dark:text-white light:text-slate-800">$50.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-sans">KDV Dahil Oran (%20):</span>
                        <span className="text-gray-500 dark:text-gray-500 light:text-slate-400">${(activeOrder.total * 0.1666).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#262629]/50 dark:border-[#262629]/50 light:border-slate-200/80 pt-2.5 mt-2.5">
                        <span className="text-[#FF6A00] font-bold uppercase tracking-wider font-sans">Toplam Ödenen:</span>
                        <span className="text-[#FF6A00] font-extrabold text-sm">${activeOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Past orders list */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 border-b border-[#262629] pb-4 mb-6">
                  <History className="w-5 h-5 text-[#FF6A00]" />
                  <h3 className="font-display font-black text-white text-sm tracking-wide uppercase">
                    Geçmiş Siparişlerim &amp; Faturalarım
                  </h3>
                </div>

                <div className="space-y-4">
                  {pastOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 bg-[#101012] border border-[#262629]/60 rounded-lg flex flex-col justify-between gap-4 transition-colors hover:border-[#FF6A00]/15 text-left"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-white">Sipariş ID: #{ord.id}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                            <BadgeCheck className="w-3.5 h-3.5" />
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-sans">
                          Tarih: <span className="font-mono">{ord.date}</span> &bull; {ord.installationType}
                        </p>
                        <p className="text-xs font-bold text-white uppercase mt-2 font-display">
                          {ord.item.brand} &bull; {ord.item.model} ({ord.item.qty} adet)
                        </p>
                        <p className="text-[10px] font-mono text-gray-500 uppercase">
                          Lastik Ebatı: {ord.item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#262629] pt-3">
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase block font-mono">Ödenen Tutar</span>
                          <span className="text-sm font-bold font-mono text-[#FF6A00]">${ord.total.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => alert(`Faturanız (${ord.id}) PDF olarak hazırlanıyor. Cihazınıza otomatik indirilecektir.`)}
                          className="text-[10px] font-mono font-extrabold text-[#FF6A00] hover:underline uppercase flex items-center gap-0.5"
                        >
                          Faturayı İndir
                          <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROFİL VE ADRES BİLGİLERİ */}
        {activeProfileTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn text-left">
            <div className="lg:col-span-7">
              {/* Profile card */}
              <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#262629] pb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#FF6A00]" />
                    <h4 className="font-display font-black text-white text-sm uppercase tracking-wider">
                      Müşteri &amp; İletişim Bilgileriniz
                    </h4>
                  </div>
                  {!isEditingProfile && (
                    <button 
                      onClick={() => {
                        setEditForm({ ...profile });
                        setIsEditingProfile(true);
                      }}
                      className="text-gray-400 hover:text-[#FF6A00] transition-colors border border-[#262629] hover:border-[#FF6A00]/40 px-3 py-1 rounded text-xs font-mono uppercase flex items-center gap-1"
                      title="Bilgileri Düzenle"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      DÜZENLE
                    </button>
                  )}
                </div>
                
                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Ad Soyad</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-[#101012] text-xs text-white p-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-black">E-posta Adresi</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full bg-[#101012] text-xs text-white p-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Telefon Numarası</label>
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-[#101012] text-xs text-white p-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 uppercase font-black">Mobil Montaj / Sevkiyat Adresi</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        rows={4}
                        className="w-full bg-[#101012] text-xs text-white p-2.5 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00]"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-3 text-[11px] pt-1.5 font-mono">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1.5 border border-[#262629] text-gray-400 hover:text-white rounded uppercase font-bold"
                      >
                        Vazgeç
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#FF6A00] text-black font-extrabold uppercase rounded shadow-md"
                      >
                        Bilgileri Kaydet
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-5 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#262629]/40 pb-4">
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px] font-black">Müşteri İsmi</span>
                        <span className="font-bold text-white text-sm leading-relaxed block mt-0.5">{profile.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px] font-black">Üyelik Modeli</span>
                        <span className="font-bold text-[#FF6A00] leading-relaxed block mt-0.5">{profile.tier}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-[#262629]/40 pb-4">
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px] font-black">E-posta Adresi</span>
                        <span className="font-bold text-white leading-relaxed block mt-0.5">{profile.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase text-[10px] font-black">Telefon Numarası</span>
                        <span className="font-bold text-white leading-relaxed block mt-0.5">{profile.phone}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500 block uppercase text-[10px] font-black">Mobil Kurulum &amp; Gönderim Adresi</span>
                      <span className="font-sans font-medium text-gray-300 leading-relaxed block mt-1.5">{profile.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Notification Preferences */}
              <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#262629] pb-3">
                  <Settings className="w-4 h-4 text-[#FF6A00]" />
                  <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    BİLDİRİM VE TERCİHLER
                  </h5>
                </div>
                <div className="space-y-3 font-sans text-xs">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="accent-[#FF6A00] mt-0.5 rounded"
                      checked={notifications.emailAlerts}
                      onChange={(e) => setNotifications(prev => ({ ...prev, emailAlerts: e.target.checked }))}
                    />
                    <div>
                      <p className="text-white font-bold group-hover:text-[#FF6A00] transition-colors uppercase text-[10.5px]">E-Posta Fatura Bildirimleri</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">Faturalar ve sipariş özetleri anında e-postanıza gönderilir.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group pt-2">
                    <input 
                      type="checkbox" 
                      className="accent-[#FF6A00] mt-0.5 rounded"
                      checked={notifications.smsAlerts}
                      onChange={(e) => setNotifications(prev => ({ ...prev, smsAlerts: e.target.checked }))}
                    />
                    <div>
                      <p className="text-white font-bold group-hover:text-[#FF6A00] transition-colors uppercase text-[10.5px]">SMS ve Mobil Takip Bildirimleri</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">Hizmet aracımız adresinize yaklaştığında otomatik SMS alırsınız.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Gold Racer Member Benefits Box */}
              <div className="p-5 profile-gold-card border border-indigo-500/20 rounded-xl space-y-2">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-mono font-black px-2.5 py-0.5 rounded w-fit block uppercase">
                  GOLD RACER AVANTAJI AKTİF
                </span>
                <p className="text-xs text-white font-black font-display uppercase tracking-tight">
                  Sınırsız Yol Yardım &amp; Hasar Koruması
                </p>
                <p className="text-[10.5px] text-gray-400 leading-relaxed font-sans">
                  Gold Racer üyeliğiniz sayesinde satın aldığınız tüm lastikler 12 ay boyunca yarılma, balon yapma ve çivi batmalarına karşı ücretsiz sigortalanır. Montaj sonrasında da desteğimiz sürer.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAVORİLER */}
        {activeProfileTab === 'favorites' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn text-left">
            <div className="lg:col-span-8">
              {/* Saved Wishlist Items */}
              <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-[#262629] pb-4">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                  <h4 className="text-sm font-display font-black text-white uppercase tracking-wider block grow">
                    Favoriye Eklediğiniz Lastikler ({wishlist.length})
                  </h4>
                </div>

                {wishlist.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 font-mono text-[11px] border border-dashed border-[#262629] rounded-lg">
                    Favorilerinizde lastik bulunmuyor. Katalogdan dilediğiniz lastiğe kalp bırakarak buraya ekleyebilirsiniz.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-4 bg-[#101012] border border-[#262629] rounded-lg flex flex-col justify-between gap-4 group"
                      >
                        <div className="text-left cursor-pointer" onClick={() => onSelectProduct(prod)}>
                          <span className="text-[10px] text-gray-500 uppercase font-mono font-bold block">{prod.brand}</span>
                          <h5 className="font-bold text-sm text-white leading-snug block uppercase mt-0.5 hover:text-[#FF6A00] transition-colors">
                            {prod.model}
                          </h5>
                          <p className="text-gray-400 text-xs font-mono mt-1 uppercase">{prod.size}</p>
                          <span className="text-sm font-bold text-[#FF6A00] font-mono block mt-2">${prod.price}</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#262629]/50 pt-3">
                          <button
                            onClick={() => onRemoveWishlist(prod.id)}
                            className="text-xs font-mono text-gray-500 hover:text-red-500 uppercase flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            KALDIR
                          </button>
                          
                          <button
                            onClick={() => onAddToCart(prod)}
                            className="px-3.5 py-1.5 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-mono font-black text-[10px] uppercase rounded shadow mr-1 mb-1"
                          >
                            SEPETE AT
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-5 profile-gradient-card border border-[#262629] rounded-xl space-y-3">
                <span className="text-[9px] bg-[#FF6A00]/10 text-[#FF6A00] font-mono font-black px-2 py-0.5 rounded w-fit block uppercase">
                  Kampanyalı Alışveriş
                </span>
                <p className="text-xs text-white font-black font-display uppercase tracking-wider">
                  Favorilerinle Kombin Yap indirimleri Yakala
                </p>
                <p className="text-[10.5px] text-gray-400 leading-relaxed font-sans">
                  Listendeki herhangi bir 4\'lü set lastik alımında Gold Racer sigorta paketine ek olarak anında sepette mobil usta montaj hizmeti entegre edilir!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
