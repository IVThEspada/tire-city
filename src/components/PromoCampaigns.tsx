import { useState } from 'react';
import { BadgePercent, CreditCard, ChevronRight, Landmark, Wrench, ShieldCheck, Sparkles } from 'lucide-react';

export default function PromoCampaigns() {
  const [financeAmount, setFinanceAmount] = useState('1000');
  const [financeMonths, setFinanceMonths] = useState(6);

  // Active campaigns
  const campaigns = [
    {
      id: 'camp-1',
      brand: 'Michelin',
      title: 'Bahar Performans İndirimi',
      desc: '4 adet Pilot Sport lastiği satın alın ve anında 110$ değerinde Visa Ödül Kartı kazanın. Teklif yakında sona eriyor.',
      actionText: 'İndirimi Al',
      badge: 'PROMO KODU',
      theme: 'from-blue-900/10 via-blue-800/5 to-transparent border-blue-500/30'
    },
    {
      id: 'camp-2',
      brand: 'Continental',
      title: 'Sertifikalı Rot-Balans Paketi',
      desc: 'Sadece 99$\'a tam Road Force statik balans ayarı ve üst düzey 4 tekerlek hizalaması alın (Normalde 179.99$).',
      actionText: 'Fiyatı Kilitle',
      badge: 'BAHAR FIRSATI',
      theme: 'from-[#FF6A00]/10 via-[#FF6A00]/5 to-transparent border-[#FF6A00]/30'
    }
  ];

  const parsedAmount = parseFloat(financeAmount) || 0;
  const monthlyPayment = parsedAmount / financeMonths;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      {/* Active seasonal promotions banner slides */}
      <div className="lg:col-span-7 space-y-4">
        <h4 className="text-xs font-mono font-bold tracking-widest text-[#FF6A00] uppercase mb-1">
          ⚡ AKTİF SEZONSAL LASTİK İNDİRİMLERİ &amp; FIRSATLAR
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className={`p-5 rounded-lg border bg-[#1B1B1D]/40 ${camp.theme} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:scale-[1.01]`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono bg-[#FF6A00] text-black font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
                    {camp.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-bold">{camp.brand} Resmi</span>
                </div>
                <h5 className="font-display font-extrabold text-base text-white uppercase tracking-tight mt-1.5">
                  {camp.title}
                </h5>
                <p className="text-xs text-gray-400 mt-1 max-w-lg font-sans">
                  {camp.desc}
                </p>
              </div>

              <button className="whitespace-nowrap flex items-center gap-1 px-4 py-2 bg-white hover:bg-[#FF6A00] text-black hover:text-black rounded font-display font-bold text-[10px] tracking-wider uppercase transition-colors">
                {camp.actionText}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Financing widget calculator inside promo layout */}
      <div className="lg:col-span-5 bg-[#1B1B1D]/50 border border-[#262629] p-6 rounded-lg relative overflow-hidden">
        {/* Absolute branding watermark inside */}
        <div className="absolute top-2.5 right-2.5 opacity-15">
          <Sparkles className="w-12 h-12 text-[#FF6A00]" />
        </div>

        <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-4 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-[#FF6A00]" /> 
          Affirm Performans Finansman Hesaplayıcı
        </h4>

        <div className="space-y-4">
          {/* Amount parameter input */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">İstenilen Satın Alma Tutarı ($)</span>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm text-gray-500 font-mono">$</span>
              <input
                type="number"
                value={financeAmount}
                onChange={(e) => setFinanceAmount(e.target.value)}
                placeholder="Toplam lastik maliyeti"
                className="w-full bg-[#101012] text-xs text-white pl-8 pr-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
              />
            </div>
          </div>

          {/* Month term block clickers */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Taksit Vadesi</span>
            <div className="flex gap-2">
              {[3, 6, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setFinanceMonths(m)}
                  className={`flex-1 py-1.5 rounded font-mono font-bold text-xs border transition-all ${
                    financeMonths === m
                      ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-[#FF6A00]'
                      : 'border-[#262629] text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {m} Ay
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="bg-[#0F0F10] border border-[#262629] p-3 rounded-md flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 block">TAHMİNİ ÖDEME</span>
              <span className="text-xl font-mono font-black text-[#FF6A00]">
                ${monthlyPayment.toFixed(2)}
                <span className="text-xs text-gray-400 font-normal"> /ay</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-400 uppercase font-mono tracking-wider font-extrabold block">✓ %0 FAİZ GEÇERLİ</span>
              <span className="text-[9px] text-gray-500 block font-mono">Bileşik faiz yok</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
