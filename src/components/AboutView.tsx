import React from 'react';
import { CheckCircle2, Truck } from 'lucide-react';

interface AboutViewProps {
  customAboutText?: string;
}

export default function AboutView({ customAboutText }: AboutViewProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fadeIn font-mono text-xs text-gray-400 space-y-8 text-left">
      <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase border-b border-[#262629] pb-6 mb-8 font-sans">
        TIRE CITY ORİJİNAL ÖZELLİKLERİ
      </h2>

      <div className="space-y-4 font-sans text-sm text-gray-300 leading-relaxed whitespace-pre-line">
        {customAboutText ? (
          <p>{customAboutText}</p>
        ) : (
          <>
            <p>
              On yılı aşkın bir süre önce, sıradan ve rehberliği olmayan lastik dağıtım ağlarına tepki olarak kurulan Tire City, ülke çapında tamamlanan 10.000'den fazla memnun montaj ile sektöründe fark yaratmıştır.
            </p>
            <p>
              Profesyonel CAD boyutlandırma planlarını, onaylı mekanik doğrulama indekslerini ve yüksek düzeyde kalibre edilmiş DOT veri tabanı kontrollerini birleştirerek, her sürücünün güvenli ve optimize edilmiş performans limitlerinin keyfini çıkarmasını sağlıyoruz.
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <span className="text-white font-bold block mb-1 uppercase text-xs">Lazer Yol Kuvveti Balansı</span>
            <span className="text-[11px] block">Her yerel garaj seçiminde mikro titreşimleri önlemek için lazer balans ayarı bulunur.</span>
          </div>
        </div>
        
        <div className="bg-[#1B1B1D]/40 border border-[#262629] p-5 rounded-lg flex gap-3">
          <Truck className="w-5 h-5 text-[#FF6A00] flex-shrink-0" />
          <div>
            <span className="text-white font-bold block mb-1 uppercase text-xs">Kapıda Mobil Montaj</span>
            <span className="text-[11px] block">Hafta sonu pist saatlerinizi bekleme salonlarında harcamayın. Dinamik hidrolik vanlarımız doğrudan garaj kapınıza gelsin.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
