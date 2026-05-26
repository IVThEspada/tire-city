import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface ContactViewProps {
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
}

export default function ContactView({
  phone = '+1 (800) 555-TIRE',
  email = 'support@tirecityperformance.com',
  address = '100 Track Way, Speedway CA 90412',
  workingHours = 'Hafta İçi: 07:00 — 20:00\nHafta Sonu: 08:00 — 17:00 (Pist Desteği Öncelikli)',
}: ContactViewProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Teknik destek talebi başarıyla oluşturuldu! Sizinle en kısa sürede iletişime geçeceğiz.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn text-left">
      <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8">
        SÜRÜCÜ DESTEK VE SEVK KANALLARI
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-gray-400 text-xs font-mono leading-relaxed">
            Jant yük sınırları, özel kış hız indeksleri veya filo rezervasyon takvimleri ile ilgili sorularınız mı var? Doğrudan usta teknisyenlerimizle iletişime geçin:
          </p>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#FF6A00]" />
              <div>
                <span className="text-gray-500 block">DESTEK HATTI</span>
                <span className="text-white font-bold text-sm">{phone}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#FF6A00]" />
              <div>
                <span className="text-gray-500 block">TEKNİK DESTEK E-POSTASI</span>
                <span className="text-white font-bold text-sm font-sans">{email}</span>
              </div>
            </div>

            <div className="p-4 bg-[#1B1B1D]/40 border border-[#262629] rounded flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#FF6A00]" />
              <div>
                <span className="text-gray-500 block">GENEL MERKEZ</span>
                <span className="text-white font-bold">{address}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#FF6A00]/10 border border-[#FF6A00]/20 rounded text-xs font-mono text-gray-300 whitespace-pre-line">
            <strong>GARAJ ÇALIŞMA SAATLERİ:</strong>
            <br />
            {workingHours}
          </div>
        </div>

        {/* Submission form */}
        <div className="lg:col-span-7 bg-[#1B1B1D]/40 border border-[#262629] rounded-xl p-6 sm:p-8">
          <h4 className="font-display font-black text-sm text-white uppercase tracking-wider mb-6">
            DESTEK TALEBİ GÖNDER
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-left">Ad Soyad</span>
                <input type="text" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-left">E-posta Adresi</span>
                <input type="email" required className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-left">Mevcut Araç Modeli</span>
              <input type="text" placeholder="Örn: BMW M4 Coupe" className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white" />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-left">Mesaj Detayları</span>
              <textarea rows={4} required placeholder="Boyutlandırma endişelerinizi, ofset sorgularınızı veya özel performans hedeflerinizi buraya yazın..." className="w-full bg-[#101012] border border-[#262629] rounded px-3 py-2.5 text-white"></textarea>
            </div>

            <button type="submit" className="w-full py-3.5 bg-[#FF6A00] text-black font-display font-black tracking-wider uppercase rounded hover:bg-[#FF8533] transition-colors">
              Destek Talebi Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
