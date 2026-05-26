import { useState } from 'react';
import { TireType } from '../types';
import { Sliders, RefreshCw } from 'lucide-react';

interface TireFinderProps {
  onFilterChange: (filters: {
    brand?: string;
    type?: TireType;
    width?: number;
    ratio?: number;
    diameter?: number;
    compatibleProductIds?: string[];
    vehicleLabel?: string;
  }) => void;
  onReset: () => void;
}

export default function TireFinder({ onFilterChange, onReset }: TireFinderProps) {
  // Size Selectors State
  const [selectedWidth, setSelectedWidth] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');

  const handleSearchSize = () => {
    onFilterChange({
      width: selectedWidth ? parseInt(selectedWidth) : undefined,
      ratio: selectedProfile ? parseInt(selectedProfile) : undefined,
      diameter: selectedDiameter ? parseInt(selectedDiameter) : undefined,
      vehicleLabel: selectedWidth ? `Ebat Profili: ${selectedWidth}/${selectedProfile}R${selectedDiameter}` : undefined,
    });
  };

  const triggerReset = () => {
    setSelectedWidth('');
    setSelectedProfile('');
    setSelectedDiameter('');
    onReset();
  };

  return (
    <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl overflow-hidden shadow-2xl relative animate-fadeIn text-left">
      {/* Decorative High-Performance Orange Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8533] animate-pulse" />

      {/* Header Banner - Pure single mode search */}
      <div className="flex items-center gap-2.5 px-6 py-4.5 border-b border-[#262629] bg-[#0F0F10]/40 text-white font-display font-bold text-xs tracking-wider uppercase">
        <span className="text-[#FF6A00] font-extrabold">🔍</span>
        <span>EBATA GÖRE LASTİK BUL</span>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Width Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Taban Genişliği (mm)</label>
            <select
              value={selectedWidth}
              onChange={(e) => setSelectedWidth(e.target.value)}
              className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono cursor-pointer"
            >
              <option value="">Genişlik Seçin</option>
              {['245', '255', '265', '275', '285', '305', '315'].map((w) => (
                <option key={w} value={w}>{w} mm</option>
              ))}
            </select>
          </div>

          {/* Profile Ratio */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Yanak Kesiti</label>
            <select
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono cursor-pointer"
            >
              <option value="">Profil Seçin</option>
              {['30', '35', '70'].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Diameter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Jant Çapı (inç)</label>
            <select
              value={selectedDiameter}
              onChange={(e) => setSelectedDiameter(e.target.value)}
              className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono cursor-pointer"
            >
              <option value="">Çap Seçin</option>
              {['17', '19', '20', '21'].map((d) => (
                <option key={d} value={d}>{d}" Jant</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#262629]/60">
          <div className="flex items-center gap-2 text-xs text-text-muted text-zinc-400 font-mono">
            <Sliders className="w-4 h-4 text-[#FF6A00]" />
            <span>Seçtiğiniz ebat limitlerine uyan lastikleri listelemek için filtreleyin.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={triggerReset}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-gray-400 hover:text-white border border-[#262629] hover:bg-white/5 rounded font-display font-bold text-xs uppercase tracking-wider transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sıfırla
            </button>

            <button
              onClick={handleSearchSize}
              disabled={!selectedWidth && !selectedProfile && !selectedDiameter}
              className="flex-1 sm:flex-initial px-8 py-3 bg-[#FF6A00] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-45 disabled:cursor-not-allowed transition-all glow-orange hover:scale-[1.02]"
            >
              Ebatları Filtrele
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
