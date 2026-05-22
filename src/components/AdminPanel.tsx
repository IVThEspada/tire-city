import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Users, 
  Sliders, 
  ShoppingBag, 
  FileText, 
  Mail, 
  CreditCard, 
  Cpu, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  Search, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  ChevronRight, 
  AlertCircle,
  Home,
  ShieldAlert,
  Sun,
  Moon,
  DollarSign,
  Activity,
  Truck,
  Check
} from 'lucide-react';
import { TireProduct, TireType } from '../types';

interface AdminPanelProps {
  products: TireProduct[];
  onUpdateProducts?: (newProducts: TireProduct[]) => void;
  onNavigateTab: (tab: string) => void;
  theme?: 'dark' | 'light';
  onThemeToggle?: () => void;
}

export default function AdminPanel({
  products,
  onUpdateProducts,
  onNavigateTab,
  theme = 'dark',
  onThemeToggle
}: AdminPanelProps) {
  // Active module tab in the panel
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'marketing' | 'payments' | 'blog' | 'plugins'>('overview');

  // Search filter query selectors
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Local state modifiers for tires catalog
  const [adminProducts, setAdminProducts] = useState<TireProduct[]>(products);
  const [activeEditingProduct, setActiveEditingProduct] = useState<TireProduct | null>(null);

  // Home slider elements mock state
  const [sliders, setSliders] = useState([
    { id: 1, title: 'LASTİKTE DÖNÜŞÜM', subtitle: 'Yarış Hamuru ve Yol Hakimiyeti', location: 'Mobil Servis Kapınızda' },
    { id: 2, title: 'SIFIR PEŞİNAT TAVSİYESİ', subtitle: 'Faizsiz Taksit Seçenekleriyle Yol Tutuşunu Artırın', location: 'Tüm Lastik Tiplerinde' },
    { id: 3, title: '24 SAATTE KAPIDA DEĞİŞİM', subtitle: 'Mobil Balans Aracı Ofisinizde veya Evinizde', location: 'Hızlı Teslimat Güvencesi' }
  ]);

  // Brand configurations mock state
  const [brands, setBrands] = useState([
    { id: 'b1', name: 'Michelin', count: 12, status: 'Yetkili Distribütör' },
    { id: 'b2', name: 'Continental', count: 8, status: 'Yetkili Distribütör' },
    { id: 'b3', name: 'Pirelli', count: 6, status: 'Resmi Yarış Partneri' },
    { id: 'b4', name: 'Bridgestone', count: 5, status: 'Yetkili Distribütör' },
    { id: 'b5', name: 'Yokohama', count: 4, status: 'İthalatçı Partner' }
  ]);

  // Orders and invoices state table
  const [orders, setOrders] = useState([
    { id: 'ORD-9024', customer: 'Ahmet Yılmaz', total: 1140.00, items: 'Michelin Pilot Sport (4 Adet)', date: '22.05.2026', status: 'Hazırlanıyor', payment: 'Kredi Kartı (3D Secure)' },
    { id: 'ORD-8911', customer: 'Can Berk', total: 720.50, items: 'Continental Extreme (4 Adet)', date: '21.05.2026', status: 'Sevk Edildi', payment: 'Finanse Edildi' },
    { id: 'ORD-8452', customer: 'Selin Şen', total: 1480.00, items: 'Pirelli P Zero (4 Adet)', date: '20.05.2026', status: 'Tamamlandı', payment: 'Banka Havalesi/EFT' }
  ]);

  // SMS & E-Posta marketing campaigns state
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', name: 'Bahar Dönemi Kampanyası %10 İndirim Fırsatı', type: 'E-Posta', sentTo: 1450, opened: 920, status: 'Tamamlandı' },
    { id: 'c2', name: 'Mobil Montaj Aracı Beşiktaş İlçesinde Aktif Duyurusu', type: 'SMS', sentTo: 450, opened: 410, status: 'Gönderildi' },
    { id: 'c3', name: 'Bridgestone Haftası Özel Lansman Daveti', type: 'E-Posta', sentTo: 1800, opened: 0, status: 'Planlandı / Taslak' }
  ]);

  const [newCampaign, setNewCampaign] = useState({ name: '', type: 'E-Posta' as 'E-Posta' | 'SMS', recipientGroup: 'Tüm Sürücüler' });

  // Payment gateways security state
  const [paymentGates, setPaymentGates] = useState([
    { id: 'g1', name: 'Stripe Global SSL Geçidi API', mode: 'Canlı Mod', keyStatus: 'Doğrulandı/Aktif', active: true },
    { id: 'g2', name: 'PayTR Ortak Ödeme Terminali API', mode: 'Canlı Mod', keyStatus: 'Doğrulandı/Aktif', active: true },
    { id: 'g3', name: 'Havale/EFT Protokolü (IBAN)', mode: 'Manuel', keyStatus: 'Aktif', active: true }
  ]);

  // System extensions, optimizer cores and server cache configurations
  const [plugins, setPlugins] = useState([
    { id: 'p1', name: 'Hızlı Önbellek Kütüphanesi (Varnish)', category: 'Core Optimizasyon', description: 'Görselleri ve katalog verilerini ara belleğe alarak 40ms yüklenme hızı sunar.', active: true },
    { id: 'p2', name: 'Google Analytics v4 Dönüşüm İzleyici', category: 'Analitik Veri', description: 'Ziyaretçi trafiğini ve filtreleme tercihlerini analiz ederek rapor oluşturur.', active: true },
    { id: 'p3', name: 'Meta Pixel Reklam Kodu Entegrasyonu', category: 'Sosyal Medya', description: 'Sepet ve ürün inceleme verilerini reklam yönetim panellerine iletir.', active: false },
    { id: 'p4', name: 'Edge SSL Saldırı Önleme Kalkanı (Cloudflare)', category: 'Güvenlik Duvarı', description: 'Bot saldırılarını engeller ve veri akışını şifreler.', active: true },
  ]);

  // System blog articles state
  const [blogArticles, setBlogArticles] = useState([
    { id: 'art-1', title: 'Hassas Lazer Balan Ayarı Neden Önemlidir?', author: 'Dr. Kauçuk', views: 890, date: '14 Mayıs 2026' },
    { id: 'art-2', title: '4x4 Off-Road Lastiklerinde Diş Derinliği Seçimi', author: 'Tire City Uzmanı', views: 1220, date: '28 Nisan 2026' }
  ]);

  // Customers database
  const [customers, setCustomers] = useState([
    { id: 'cust-1', name: 'Ahmet Yılmaz', email: 'ahmet@yilmaz.com', phone: '+90 532 111 2233', location: 'Beşiktaş, İstanbul', tier: 'Performans Sürücüsü' },
    { id: 'cust-2', name: 'Can Berk', email: 'can.berk@porsche-tr.org', phone: '+90 541 333 4455', location: 'Kadıköy, İstanbul', tier: 'Pist Üyesi' },
    { id: 'cust-3', name: 'Selin Şen', email: 'selin.sen@motorspor.tr', phone: '+90 533 999 0088', location: 'Çankaya, Ankara', tier: 'Filo Müşterisi' }
  ]);

  // System logs visual simulator
  const [logs, setLogs] = useState([
    { id: 'l1', time: '18:35:10', message: 'Katalog fiyat güncellemesi uygulandı: ID prod-1', level: 'BILGI' },
    { id: 'l2', time: '18:34:02', message: 'Bahar Kampanyası SMS bülteni yayına alındı', level: 'GÖNDERI' },
    { id: 'l3', time: '18:22:15', message: 'Stripe API bağlantısı başarıyla kuruldu', level: 'BAŞARILI' },
    { id: 'l4', time: '18:05:44', message: 'Varnish Edge önbelleği temizlendi', level: 'SİSTEM' }
  ]);

  // Add new product action
  const handleAddNewProductMocker = () => {
    const freshId = `prod-custom-${Date.now()}`;
    const freshProduct: TireProduct = {
      id: freshId,
      brand: 'Michelin',
      model: 'Pilot Sport 5 Evo',
      price: 199,
      rating: 4.8,
      reviewCount: 1,
      images: ['https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=350'],
      type: 'Summer',
      size: '225/45R17',
      diameter: 17,
      width: 225,
      ratio: 45,
      speedRating: 'Y',
      loadIndex: '94',
      description: 'Yüksek sıcaklıklarda üst düzey kavramaya sahip bionik kanallı performans lastiği.',
      isPopular: true,
      specs: {
        warranty: '80.000 KM',
        wetGrip: 'A',
        fuelEfficiency: 'C',
        noiseLevel: 69,
        treadwear: 320,
        traction: 'AA',
        temperature: 'A',
        treadDepth: '8/32"',
        runflat: false
      },
      reviews: []
    };

    const newProdList = [freshProduct, ...adminProducts];
    setAdminProducts(newProdList);
    if (onUpdateProducts) {
      onUpdateProducts(newProdList);
    }
    alert('Yeni performans lastiği sisteme başarıyla kaydedildi!');
  };

  const handleEditProductClick = (p: TireProduct) => {
    setActiveEditingProduct({ ...p });
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditingProduct) return;

    const newList = adminProducts.map((p) => {
      if (p.id === activeEditingProduct.id) {
        return activeEditingProduct;
      }
      return p;
    });

    setAdminProducts(newList);
    if (onUpdateProducts) {
      onUpdateProducts(newList);
    }
    setActiveEditingProduct(null);
    alert('Lastik özellikleri başarıyla güncellendi.');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Seçilen lastik modelini katalogdan kaldırmak istediğinize emin misiniz?')) {
      const newList = adminProducts.filter((p) => p.id !== id);
      setAdminProducts(newList);
      if (onUpdateProducts) {
        onUpdateProducts(newList);
      }
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.name) return;

    setCampaigns([
      {
        id: `c-${Date.now()}`,
        name: newCampaign.name,
        type: newCampaign.type,
        sentTo: Math.floor(500 + Math.random() * 2000),
        opened: 0,
        status: 'Planlandı / Taslak'
      },
      ...campaigns
    ]);
    setNewCampaign({ name: '', type: 'E-Posta', recipientGroup: 'Tüm Sürücüler' });
    alert('Yeni gönderi bülteni oluşturuldu.');
  };

  // Generate database export
  const handleExportAllData = () => {
    const bigDoc = {
      sliders,
      brands,
      products: adminProducts,
      orders,
      campaigns,
      paymentGates,
      plugins,
      blogArticles,
      customers,
      timestamp: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bigDoc, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tire_city_guncel_veritabani_yedek.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0A0A0B] text-gray-200 antialiased font-sans">
      
      {/* LEFT SIDEBAR PANEL */}
      <aside className="w-full md:w-64 bg-[#0F0F10] border-r border-[#1F1F22] flex flex-col justify-between shrink-0">
        <div className="p-6">
          {/* Dashboard Header Brand logo */}
          <div className="flex items-center gap-3 pb-8 border-b border-[#1F1F22] mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-[#FF6A00]">
              <Settings className="w-4 h-4 text-black stroke-[2.5] animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm tracking-widest text-white uppercase block leading-none">
                TIRE<span className="text-[#FF6A00]">CITY</span>
              </span>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mt-1">Yönetim Paneli</span>
            </div>
          </div>

          {/* Navigational Links */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Müstakil Özet', icon: Activity },
              { id: 'products', label: 'Lastik Kataloğu', icon: ShoppingBag },
              { id: 'orders', label: 'Siparişler & Montaj', icon: FileText },
              { id: 'customers', label: 'Kayıtlı Sürücüler', icon: Users },
              { id: 'marketing', label: 'Kampanyalar & SMS', icon: Mail },
              { id: 'payments', label: 'Ödeme Altyapısı', icon: CreditCard },
              { id: 'blog', label: 'Blog Paylaşımları', icon: BookOpen },
              { id: 'plugins', label: 'Eklentiler & Önbellek', icon: Cpu },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs transition-all text-left uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#FF6A00] text-black font-extrabold shadow-lg shadow-orange-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit & Website Returns Binds */}
        <div className="p-6 border-t border-[#1F1F22] space-y-3 bg-[#0C0C0D]">
          <div className="p-3 bg-black rounded border border-[#1F1F22] text-[10px] space-y-1 font-mono text-gray-500">
            <div className="flex items-center justify-between">
              <span>SUNUCU MODU</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                AKTİF
              </span>
            </div>
            <p className="truncate">Yükleyici: burakalis5</p>
          </div>

          <button
            onClick={() => onNavigateTab('home')}
            className="w-full py-2.5 bg-transparent border border-gray-700 hover:border-[#FF6A00] text-gray-300 hover:text-white text-xs font-bold rounded uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-mono"
          >
            <Home className="w-3.5 h-3.5 text-[#FF6A00]" />
            Ön Sayfaya Dön
          </button>
        </div>
      </aside>

      {/* CORE FRAMEWORK BOARD STAGE */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEAD REGISTRY BAR */}
        <header className="h-16 border-b border-[#1F1F22] bg-[#0F0F10] px-6 sm:px-8 flex items-center justify-between shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold uppercase py-1 px-2.5 bg-[#FF6A00]/10 text-[#FF6A00] rounded border border-[#FF6A00]/20 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block animate-pulse" />
              Sistem Durumu: Çevrimiçi (24ms Gecikme)
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-gray-500">
              Yedekleme Sürümü: v14.2
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Active Username email holder */}
            <div className="text-right hidden sm:block">
              <span className="text-xs text-white font-bold block">{products.length > 0 ? 'Burak Alış' : 'Sistem Yöneticisi'}</span>
              <span className="text-[10px] text-gray-500 font-mono">burakalis5@gmail.com</span>
            </div>

            {/* Quick theme toggler for internal workspace styling comfort */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className="p-2 border border-[#1F1F22] hover:border-[#FF6A00] rounded text-gray-400 hover:text-white text-xs transition-colors bg-black"
                title="Aydınlık / Karanlık Tema Tweak"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>
            )}
          </div>
        </header>

        {/* ACTIVE CONSOLE VIEWPORTS */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: MÜSTAKİL ÖZET (SYSTEM OVERVIEW DASHBOARD) */}
          {activeSubTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn text-left">
              
              {/* Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F22] pb-6">
                <div>
                  <h2 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    Masaüstü Durum Raporu
                  </h2>
                  <p className="text-xs font-mono text-gray-400 block mt-1">
                    Aktif tekerlek lastik montaj veritabanı, satışlar, ciro limitleri ve bülten durum raporları
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleExportAllData}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-mono font-bold text-xs uppercase rounded transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Veritabanı Yedekle (JSON)
                  </button>
                </div>
              </div>

              {/* BENTO STATS GRIDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl relative overflow-hidden group hover:border-[#FF6A00]/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 font-bold block">Toplam Aylık Ciro</span>
                    <DollarSign className="w-4 h-4 text-[#FF6A00]" />
                  </div>
                  <h3 className="text-2xl font-mono font-black text-white">$14,840.00</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400 font-mono">
                    <span>▲ +12.4% Artış</span>
                    <span className="text-gray-500">(Geçen aya göre)</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>

                {/* Metric 2 */}
                <div className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl relative overflow-hidden group hover:border-[#FF6A00]/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 font-bold block">Sipariş / Montaj Bekleyen</span>
                    <Truck className="w-4 h-4 text-[#FF6A00]" />
                  </div>
                  <h3 className="text-2xl font-mono font-black text-white">{orders.filter(o => o.status !== 'Tamamlandı').length} Sipariş</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-amber-400 font-mono">
                    <span>● 3 Filo Atandı</span>
                    <span className="text-gray-500">(Zamanında teslimat %100)</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>

                {/* Metric 3 */}
                <div className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl relative overflow-hidden group hover:border-[#FF6A00]/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 font-bold block font-bold">Aktif Kataloğu Türü</span>
                    <ShoppingBag className="w-4 h-4 text-[#FF6A00]" />
                  </div>
                  <h3 className="text-2xl font-mono font-black text-white">{adminProducts.length} Premium</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-[#FF6A00] font-mono">
                    <span>★ Ortalama Puan: 4.8</span>
                    <span className="text-gray-500">(15 Marka Deseni)</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>

                {/* Metric 4 */}
                <div className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl relative overflow-hidden group hover:border-[#FF6A00]/40 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-gray-500 font-bold block">Aktif Kampanya Seviyesi</span>
                    <Mail className="w-4 h-4 text-[#FF6A00]" />
                  </div>
                  <h3 className="text-2xl font-mono font-black text-white">3 Aktif Gönderi</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-blue-400 font-mono">
                    <span>💬 SMS/E-Posta</span>
                    <span className="text-gray-500">(1750 driver hedefli)</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF6A00] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>

              </div>

              {/* GRAPHS AND AUDITS LOGS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Markalara Göre Ciro Analizi (CSS Grid Bar chart in orange) */}
                <div className="lg:col-span-7 bg-[#0F0F10] border border-[#1F1F22] rounded-xl p-5 space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white uppercase">Markalara Göre Dağılım Kataloğu</h4>
                    <p className="text-[10.5px] font-mono text-gray-500">Stokta yer alan lastiklerin markalara göre ağırlığı</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { brand: 'Michelin', percent: 85, count: 12, color: 'bg-emerald-500' },
                      { brand: 'Continental', percent: 60, count: 8, color: 'bg-orange-500' },
                      { brand: 'Pirelli', percent: 45, count: 6, color: 'bg-red-500' },
                      { brand: 'Bridgestone', percent: 35, count: 5, color: 'bg-blue-500' },
                      { brand: 'Diğer Hamurlar', percent: 25, count: 3, color: 'bg-gray-500' }
                    ].map((b, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-mono text-[11px] text-gray-400">
                          <span className="font-bold text-white uppercase">{b.brand}</span>
                          <span>{b.count} Desen ({b.percent}%)</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-[#1F1F22]">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${b.color}`} 
                            style={{ width: `${b.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Son Sistem Günlükleri / Logs Terminal style */}
                <div className="lg:col-span-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl p-5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-white uppercase flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-[#FF6A00]" />
                        Sistem Günlükleri
                      </h4>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-[10.5px] font-mono text-gray-500">Node JS gerçek zamanlı API telemetry çıktıları</p>
                  </div>

                  <div className="bg-black/80 rounded border border-[#1F1F22] p-3.5 font-mono text-[10.5px] space-y-2 mt-4 text-left grow">
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-2">
                        <span className="text-gray-500">[{log.time}]</span>
                        <span className="text-[#FF6A00]">[{log.level}]</span>
                        <span className="text-gray-300 truncate leading-tight grow">{log.message}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setLogs([
                        { id: `l-${Date.now()}`, time: new Date().toTimeString().split(' ')[0], message: 'Yeni yönetici oturum logları başarıyla derlendi', level: 'BAĞLANTI' },
                        ...logs
                      ]);
                    }}
                    className="mt-4 w-full py-2 bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800 text-gray-400 hover:text-white text-[10.5px] font-mono font-bold uppercase rounded tracking-wider"
                  >
                    Simüle Log Akışı Yenile
                  </button>
                </div>

              </div>

              {/* ANA SAYFA SLIDER VE GÖRSEL BAŞLIK AYARLARI */}
              <div className="bg-[#0F0F10] border border-[#1F1F22] p-6 rounded-xl space-y-6">
                <div>
                  <h4 className="font-display font-black text-white text-base uppercase">Yol Bulucu Ana Manşet Ayarları</h4>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    Web sayfasında dönen ana slider manşetlerini ve buton yönlendirme mesajlarını anında güncelleyin.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sliders.map((slid, sIdx) => (
                    <div key={slid.id} className="p-4 bg-black/40 border border-[#1F1F22] rounded-lg text-left space-y-3">
                      <span className="text-[9px] bg-neutral-800 border border-gray-700 text-gray-400 font-mono px-2 py-0.5 rounded uppercase font-bold">
                        Manşet Sürgüsü #{slid.id}
                      </span>
                      
                      <div className="space-y-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-mono">Ana Başlık</label>
                          <input 
                            type="text" 
                            value={slid.title}
                            onChange={(e) => {
                              const updated = sliders.map(s => s.id === slid.id ? { ...s, title: e.target.value } : s);
                              setSliders(updated);
                            }}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded font-bold uppercase p-2 focus:border-[#FF6A00] text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 uppercase font-mono">Alt Açıklama Spotu</label>
                          <textarea 
                            rows={2}
                            value={slid.subtitle}
                            onChange={(e) => {
                              const updated = sliders.map(s => s.id === slid.id ? { ...s, subtitle: e.target.value } : s);
                              setSliders(updated);
                            }}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded text-gray-400 p-2 focus:border-[#FF6A00]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2 border-t border-[#1F1F22]">
                  <button 
                    onClick={() => alert('Manşet güncellemeleri ön sayfaya başarıyla yansıtıldı!')}
                    className="px-5 py-2.5 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-mono font-bold text-xs uppercase rounded"
                  >
                    Tüm Sürgü Değişikliklerini Kaydet
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LASTİK KATALOĞU (TIRE PRODUCTS CATALOG MATRIX) */}
          {activeSubTab === 'products' && (
            <div className="space-y-6 animate-fadeIn text-left">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F22] pb-6">
                <div>
                  <h3 className="font-display font-black text-xl text-white uppercase">
                    Lastik Kataloğu ({adminProducts.length} Aktif Model)
                  </h3>
                  <p className="text-xs text-gray-400 block mt-1">
                    Aktif tekerlek desenlerini filtreleyin, fiyat ve ebat bilgilerini güncelleyin veya yeni hamur tanımlayın.
                  </p>
                </div>

                <button
                  onClick={handleAddNewProductMocker}
                  className="px-4 py-2 bg-[#FF6A00] text-black font-display font-black text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4.5 h-4.5" />
                  YENİ PERFORMANS LASTİĞİ EKLE
                </button>
              </div>

              {/* Edit Form Model overlay widget */}
              {activeEditingProduct && (
                <form onSubmit={handleSaveProductEdit} className="p-6 bg-[#0F0F10] border border-[#FF6A00]/40 rounded-xl space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b border-[#1F1F22] pb-2">
                    <h4 className="text-xs font-mono font-bold text-[#FF6A00] uppercase">Lastik Parametre Özelliklerini Düzenle</h4>
                    <button
                      type="button"
                      onClick={() => setActiveEditingProduct(null)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Değişikliği İptal Et
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Marka</label>
                      <input
                        type="text"
                        value={activeEditingProduct.brand}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, brand: e.target.value })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Model / Seri Adı</label>
                      <input
                        type="text"
                        value={activeEditingProduct.model}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, model: e.target.value })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Fiyat ($)</label>
                      <input
                        type="number"
                        value={activeEditingProduct.price}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, price: parseInt(e.target.value) || 0 })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Lastik Ebadı</label>
                      <input
                        type="text"
                        value={activeEditingProduct.size}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, size: e.target.value })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Jant Çapı (İnç)</label>
                      <input
                        type="number"
                        value={activeEditingProduct.diameter}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, diameter: parseInt(e.target.value) || 0 })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Taban Genişliği (mm)</label>
                      <input
                        type="number"
                        value={activeEditingProduct.width}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, width: parseInt(e.target.value) || 0 })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Yanak Kesiti (%)</label>
                      <input
                        type="number"
                        value={activeEditingProduct.ratio}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, ratio: parseInt(e.target.value) || 0 })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500 uppercase font-mono block">Lastik Yol Tipi</label>
                      <select
                        value={activeEditingProduct.type}
                        onChange={(e) => setActiveEditingProduct({ ...activeEditingProduct, type: e.target.value as TireType })}
                        className="bg-black text-xs text-white p-2.5 rounded border border-[#1F1F22] w-full"
                      >
                        <option value="Summer">Yaz Lastiği</option>
                        <option value="Winter">Kış Lastiği</option>
                        <option value="All-Season">Dört Mevsim</option>
                        <option value="All-Terrain">Arazi / AT</option>
                        <option value="Track/Racing">Pist / Performans</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#FF6A00] text-black font-extrabold uppercase rounded font-mono"
                    >
                      Değişikliği Veritabanına Yaz
                    </button>
                  </div>
                </form>
              )}

              {/* Dynamic catalog listing filter */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Aktif lastik katalog modellerini filtreleyin (örn. Pilot, Sport, Continental)..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-[#0F0F10] text-xs text-white pl-9 pr-3 py-3 rounded border border-[#1F1F22] placeholder-gray-500 focus:outline-none focus:border-[#FF6A00]"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              </div>

              {/* Tires Matrix List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {adminProducts
                  .filter((p) => p.model.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase()))
                  .map((p) => (
                    <div key={p.id} className="p-4 bg-[#0F0F10] border border-[#1F1F22] rounded-lg flex items-center justify-between gap-4 hover:border-neutral-800 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black border border-[#1F1F22] rounded p-1.5 flex items-center justify-center">
                          <img src={p.images[0]} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">{p.brand}</span>
                            <span className="text-[9px] bg-[#FF6A00]/10 text-[#FF6A00] font-mono px-1.5 py-0.2 rounded uppercase">
                              {p.type === 'Summer' ? 'Yaz' : p.type === 'Winter' ? 'Kış' : p.type === 'All-Season' ? '4 Mevsim' : p.type === 'All-Terrain' ? 'Arazi' : 'Pist'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white uppercase mt-0.5">{p.model}</h4>
                          <span className="text-[10px] text-gray-500 font-mono block">
                            Ebat Oranları: {p.size} &bull; Jant: {p.diameter}" R &bull; Yük Sınıfı: {p.loadIndex}{p.speedRating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-mono font-bold text-white">${p.price}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEditProductClick(p)}
                            className="p-2 border border-neutral-800 hover:border-[#FF6A00] hover:text-[#FF6A00] text-gray-400 rounded transition-colors"
                            title="Lastik özelliklerini düzenle"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 border border-neutral-800 hover:border-red-500 hover:text-red-500 text-gray-400 rounded transition-colors"
                            title="Modeli katalogdan kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* TAB 3: SİPARİŞLER (SALES AND DISPATCH INVOICES MANAGEMENT) */}
          {activeSubTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  Sipariş ve Montaj Takip Sistemi
                </h3>
                <p className="text-xs text-gray-400 block mt-1">
                  Aracı kapısına montaj siparişi veren müşteriler, ödeme yöntemleri ve dispatch durumları.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">Sipariş No: #{ord.id}</span>
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded font-mono uppercase ${
                          ord.status === 'Tamamlandı' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-gray-500">Tarih: {ord.date}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 block uppercase text-[9px] font-mono font-bold">Müşteri / Alıcı</span>
                        <span className="font-bold text-white text-sm">{ord.customer}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase text-[9px] font-mono font-bold">Seçilen Lastik</span>
                        <span className="text-gray-300 font-medium">{ord.items}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase text-[9px] font-mono font-bold">Ödeme Türü</span>
                        <span className="text-gray-400">{ord.payment}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[9px] text-gray-500 uppercase block font-mono">Toplam Bedel</span>
                        <span className="text-sm font-bold font-mono text-[#FF6A00]">${ord.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-1.5 pt-3 border-t border-neutral-900 text-xs">
                      {ord.status !== 'Tamamlandı' && (
                        <button
                          onClick={() => {
                            setOrders(orders.map((o) => o.id === ord.id ? { ...o, status: 'Tamamlandı' } : o));
                            alert(`${ord.id} numaralı sipariş başarıyla montajlandı ve tamamlandı olarak işaretlendi.`);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-500 text-black rounded font-mono font-bold uppercase transition-colors text-[10.5px]"
                        >
                          Montajı Onayla ve Kapat
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Fatura Bilgisi: Ahmet Yılmaz - Michelin Sürüm Barcode - Verifikasyon Doğrulandı.`)}
                        className="px-3.5 py-1.5 bg-[#1C1C1E] text-white rounded font-mono font-bold uppercase hover:bg-[#FF6A00] hover:text-black transition-all text-[10.5px]"
                      >
                        Fatura Bilgilerini İncele
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MÜŞTERİLER (REGISTERED CUSTOMERS) */}
          {activeSubTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div className="flex justify-between items-center border-b border-[#1F1F22] pb-6">
                <div>
                  <h3 className="font-display font-black text-xl text-white uppercase">
                    Kayıtlı Sürücüler Veritabanı
                  </h3>
                  <p className="text-xs text-gray-400 block mt-1">
                    Platformda kayıtlı sürücü profilleri, sipariş geçmişleri ve lokasyon dağılımları.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    const newName = prompt('Lütfen eklenecek sürücünün tam adını girin:');
                    if (newName) {
                      setCustomers([...customers, { id: `cust-${Date.now()}`, name: newName, email: `${newName.toLowerCase().replace(/\s/g, '')}@gmail.com`, phone: '+90 (555) 000-1122', location: 'Şişli, İstanbul', tier: 'Standart Sürücü' }]);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-[#FF6A00] hover:bg-[#FF8533] text-black text-xs font-mono font-bold rounded uppercase flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Sürücü Ekle
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Sürücü adına veya lokasyona göre hızlı tarama yapın..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-[#0F0F10] text-xs text-white pl-9 pr-3 py-3 rounded border border-[#1F1F22] placeholder-gray-500"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn">
                {customers
                  .filter((c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.location.toLowerCase().includes(customerSearch.toLowerCase()))
                  .map((c) => (
                    <div key={c.id} className="p-4 bg-[#0F0F10] border border-[#1F1F22] rounded-xl space-y-3 relative group hover:border-[#FF6A00]/40 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-[#FF6A00]/10 text-[#FF6A00] font-mono px-2 py-0.5 rounded uppercase font-bold border border-[#FF6A00]/20">
                            {c.tier}
                          </span>
                          <h4 className="text-sm font-bold text-white uppercase mt-2">{c.name}</h4>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm('Sürücü kaydını sistemden silmek istiyor musunuz?')) {
                              setCustomers(customers.filter((el) => el.id !== c.id));
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-all rounded border border-transparent hover:border-red-500/20"
                          title="Sürücü kaydını sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="pt-2 font-mono text-[10.5px] text-gray-400 space-y-1 bg-black/40 p-2.5 rounded border border-neutral-900 text-left">
                        <p className="truncate">📧 {c.email}</p>
                        <p>📞 {c.phone}</p>
                        <p className="truncate">📍 {c.location}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 5: PAZARLAMA (MARKETING OUTREACH CAMPAIGNS) */}
          {activeSubTab === 'marketing' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  Kampanyalar &amp; SMS/E-Posta Dağıtım Merkezi
                </h3>
                <p className="text-xs text-gray-400 block mt-1">
                  Kayıtlı sürücü bülten abonelerine toplu bilgilendirme mesajları veya indirim kodları gönderin.
                </p>
              </div>

              {/* Campaign Creator form */}
              <form onSubmit={handleCreateCampaign} className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl space-y-4">
                <h4 className="text-xs font-mono font-bold text-white uppercase">Yeni Kampanya Gönderi Havuzu Oluştur</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Gönderi Başlığı (örn. Yaz Lastiklerinde Kaçırılmayacak Fırsat)"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    className="col-span-1 sm:col-span-2 bg-black text-xs text-white p-3 rounded border border-[#1F1F22]"
                    required
                  />

                  <select
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({ ...newCampaign, type: e.target.value as any })}
                    className="bg-black text-xs text-white p-3 rounded border border-[#1F1F22]"
                  >
                    <option value="E-Posta">Toplu E-Posta Gönderisi</option>
                    <option value="SMS">Toplu SMS Hücresel Canlı</option>
                  </select>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#FF6A00] text-black font-mono font-bold text-xs uppercase rounded hover:bg-[#FF8533]"
                  >
                    Bülten Transmisyonunu Başlat
                  </button>
                </div>
              </form>

              {/* Campaigns database */}
              <div className="space-y-3">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="p-4 bg-[#0F0F10] border border-[#1F1F22] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-black uppercase ${camp.type === 'E-Posta' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {camp.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 font-bold">Kampanya ID: {camp.id}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase mt-1.5">
                        {camp.name}
                      </h4>
                    </div>

                    <div className="flex gap-4 sm:text-right text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-900 w-full sm:w-auto font-mono justify-between sm:justify-end">
                      <div>
                        <span className="text-[9px] text-gray-500 block uppercase font-bold">Hedef Kitle</span>
                        <span className="text-white font-bold">{camp.sentTo} Sürücü</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block uppercase font-bold">Geri Dönüş Oranı</span>
                        <span className="text-[#FF6A00] font-bold">
                          {camp.sentTo > 0 ? `${Math.round((camp.opened / camp.sentTo) * 100)}%` : '%0'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block uppercase font-bold">Gönderim</span>
                        <span className="text-emerald-400 font-bold">{camp.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ÖDEMELER (PAYMENT GATEWAYS SYSTEM OVERLAYS) */}
          {activeSubTab === 'payments' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  Güvenli Ödeme Altyapısı Entegrasyonu
                </h3>
                <p className="text-xs text-gray-400 block mt-1">
                  Müşteri ödemelerini güvenli bir şekilde tahsil etmek için Stripe, PayTR ve Banka Havale altyapısı tercihlerini tanımlayın.
                </p>
              </div>

              <div className="space-y-4">
                {paymentGates.map((g) => (
                  <div key={g.id} className="p-4 bg-[#0F0F10] border border-[#1F1F22] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-[#FF6A00] mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase">{g.name}</h4>
                        <p className="text-[10.5px] font-mono text-gray-400">
                          Sertifika Durumu: <span className="text-emerald-400 font-bold">{g.keyStatus}</span> &bull; Mod: <span className="text-[#FF6A00]">{g.mode}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase ${g.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400'}`}>
                        {g.active ? 'Ödemeleri Kabul Ediyor' : 'Pasif durumda'}
                      </span>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={g.active}
                          onChange={(e) => {
                            setPaymentGates(paymentGates.map((item) => item.id === g.id ? { ...item, active: e.target.checked } : item));
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-neutral-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6A00]" />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BLOG PAYLAŞIMLARI (CONTENT ARTICLES & TUTORIALS) */}
          {activeSubTab === 'blog' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div className="flex justify-between items-center border-b border-[#1F1F22] pb-6">
                <div>
                  <h3 className="font-display font-black text-xl text-white uppercase">
                    Platform Blog ve Yayıncılık Merkezi
                  </h3>
                  <p className="text-xs text-gray-400 block mt-1">
                    Marka popülaritesini ve arama motoru optimizasyonunu artıracak teknik lastik ve performans makaleleri paylaşın.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    const headline = prompt('Lütfen makale başlığını yazın:');
                    if (headline) {
                      setBlogArticles([{ id: `art-${Date.now()}`, title: headline, author: 'Tire City Editörü', views: 0, date: 'Bugün' }, ...blogArticles]);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-[#FF6A00] hover:bg-[#FF8533] text-black text-xs font-mono font-bold rounded uppercase flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Yeni İçerik Ekle
                </button>
              </div>

              <div className="space-y-3">
                {blogArticles.map((art) => (
                  <div key={art.id} className="p-4 bg-[#0F0F10] border border-[#1F1F22] rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">{art.date} &bull; Yazar: {art.author}</span>
                      <h4 className="text-xs font-bold text-white uppercase mt-0.5">{art.title}</h4>
                    </div>

                    <div className="text-right flex items-center gap-4 text-xs font-mono">
                      <span className="text-gray-400">{art.views} Tıklanma</span>
                      <button
                        onClick={() => {
                          if (confirm('İçerik yazısını silmek istiyor musunuz?')) {
                            setBlogArticles(blogArticles.filter((el) => el.id !== art.id));
                          }
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-500 rounded border border-transparent hover:border-red-500/20 transition-all"
                        title="Yazıyı Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: EKLENTİLER & ÖNBELLEK (SECURE CACHE OPTIMIZER PLUGINS) */}
          {activeSubTab === 'plugins' && (
            <div className="space-y-6 text-left animate-fadeIn">
              <div>
                <h3 className="font-display font-black text-xl text-white uppercase">
                  Sistem Eklentileri ve Önbellek Ayarları
                </h3>
                <p className="text-xs text-gray-400 block mt-1">
                  Güvenlik duvarlarını denetleyin, çerez protokollerini optimize edin ve önbelleği el ile boşaltın.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {plugins.map((plu) => (
                  <div key={plu.id} className="p-5 bg-[#0F0F10] border border-[#1F1F22] rounded-xl flex flex-col justify-between hover:border-neutral-800 transition-all">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] bg-[#FF6A00]/10 text-[#FF6A00] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#FF6A00]/20">
                          {plu.category}
                        </span>
                        
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={plu.active}
                            onChange={(e) => {
                              setPlugins(plugins.map((item) => item.id === plu.id ? { ...item, active: e.target.checked } : item));
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-neutral-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF6A00]" />
                        </label>
                      </div>

                      <h4 className="text-xs font-bold text-white uppercase">{plu.name}</h4>
                      <p className="text-[10.5px] text-gray-400 font-sans mt-0.5 leading-relaxed">
                        {plu.description}
                      </p>
                    </div>

                    <div className="border-t border-neutral-900 pt-3 mt-4 flex justify-between items-center text-[9px] font-mono uppercase text-gray-500">
                      <span>Bulut Protokolü: Cloud Run</span>
                      <span className={plu.active ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                        {plu.active ? 'Aktif Akış Açık' : 'Akış Kapalı'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cache flushing widget bottom */}
              <div className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-3 text-left">
                  <RefreshCw className="w-5 h-5 text-[#FF6A00] animate-spin shrink-0 mt-0.5" style={{ animationDuration: '4s' }} />
                  <div>
                    <h5 className="font-bold text-xs text-white">Varnish Edge Önbellek Altyapısı</h5>
                    <p className="text-[10.5px] text-gray-400 mt-0.5">
                      Katalog listelerindeki fiyat, ebat ve marka güncellemelerinin ziyaretçilerin tarayıcılarında anında güncellenmesini zorunlu kılar.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => alert('Varnish önbelleğindeki lastik katalog verileri başarıyla temizlendi, ön sayfa senkronize edildi!')}
                  className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8533] text-black font-mono font-black text-xs uppercase tracking-wider rounded transition-all select-none"
                >
                  Önbelleği Boşalt (Flush Cache)
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
