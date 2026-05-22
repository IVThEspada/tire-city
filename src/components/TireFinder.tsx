import { useState, useEffect } from 'react';
import { COMPATIBILITY, BRANDS } from '../data';
import { TireType } from '../types';
import { Sliders, Check, HelpCircle, RefreshCw } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'vehicle' | 'size' | 'brand' | 'type'>('vehicle');

  // Tab 1: Vehicle Selectors
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTrim, setSelectedTrim] = useState('');

  // Tab 2: Size Selectors
  const [selectedWidth, setSelectedWidth] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');

  // Tab 3: Brand Selector
  const [selectedBrand, setSelectedBrand] = useState('');

  // Tab 4: Type Selector
  const [selectedType, setSelectedType] = useState<TireType | ''>('');

  // Compatibility cascade helpers
  const years = Object.keys(COMPATIBILITY);
  const makes = selectedYear ? Object.keys(COMPATIBILITY[selectedYear] || {}) : [];
  const models = selectedYear && selectedMake ? Object.keys(COMPATIBILITY[selectedYear][selectedMake] || {}) : [];
  const trims = selectedYear && selectedMake && selectedModel ? Object.keys(COMPATIBILITY[selectedYear][selectedMake][selectedModel] || {}) : [];

  // Reset dependent fields when parent fields change
  useEffect(() => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedTrim('');
  }, [selectedYear]);

  useEffect(() => {
    setSelectedModel('');
    setSelectedTrim('');
  }, [selectedMake]);

  useEffect(() => {
    setSelectedTrim('');
  }, [selectedModel]);

  const handleSearchVehicle = () => {
    if (selectedYear && selectedMake && selectedModel && selectedTrim) {
      const config = COMPATIBILITY[selectedYear]?.[selectedMake]?.[selectedModel]?.[selectedTrim];
      if (config) {
        onFilterChange({
          compatibleProductIds: config.recommendedIds,
          vehicleLabel: `${selectedYear} ${selectedMake} ${selectedModel} (${selectedTrim}) - Stock Size ${config.tireSize}`,
        });
      }
    }
  };

  const handleSearchSize = () => {
    onFilterChange({
      width: selectedWidth ? parseInt(selectedWidth) : undefined,
      ratio: selectedProfile ? parseInt(selectedProfile) : undefined,
      diameter: selectedDiameter ? parseInt(selectedDiameter) : undefined,
      vehicleLabel: selectedWidth ? `Size Profile: ${selectedWidth}/${selectedProfile}R${selectedDiameter}` : undefined,
    });
  };

  const handleSearchBrand = () => {
    onFilterChange({
      brand: selectedBrand || undefined,
      vehicleLabel: selectedBrand ? `Brand: ${selectedBrand}` : undefined,
    });
  };

  const handleSearchType = () => {
    onFilterChange({
      type: selectedType ? (selectedType as TireType) : undefined,
      vehicleLabel: selectedType ? `Tire Category: ${selectedType}` : undefined,
    });
  };

  const triggerReset = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedTrim('');
    setSelectedWidth('');
    setSelectedProfile('');
    setSelectedDiameter('');
    setSelectedBrand('');
    setSelectedType('');
    onReset();
  };

  return (
    <div className="bg-[#1B1B1D] border border-[#262629] rounded-xl overflow-hidden shadow-2xl relative">
      {/* Decorative High-Performance Orange Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF6A00] to-[#FF8533] animate-pulse" />

      {/* Tabs list */}
      <div className="flex border-b border-[#262629] bg-[#0F0F10]/40 overflow-x-auto">
        {(['vehicle', 'size', 'brand', 'type'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[120px] px-6 py-4 text-center font-display font-bold text-xs tracking-wider uppercase transition-colors relative border-r border-[#262629] ${
              activeTab === tab
                ? 'text-white bg-[#1B1B1D]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF6A00]" />
            )}
            {tab === 'vehicle' && '🛒 Araca Göre Ara'}
            {tab === 'size' && '🔍 Ebata Göre Ara'}
            {tab === 'brand' && '🏢 Markaya Göre Ara'}
            {tab === 'type' && '🏁 Tipe Göre Ara'}
          </button>
        ))}
      </div>

      {/* Selector Area */}
      <div className="p-6 md:p-8">
        {activeTab === 'vehicle' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Year Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Yıl</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
              >
                <option value="">Yıl Seçin</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Make Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Marka</label>
              <select
                value={selectedMake}
                disabled={!selectedYear}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono disabled:opacity-40"
              >
                <option value="">{selectedYear ? 'Marka Seçin' : 'Önce Yıl Seçin'}</option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Model Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Model</label>
              <select
                value={selectedModel}
                disabled={!selectedMake}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono disabled:opacity-40"
              >
                <option value="">{selectedMake ? 'Model Seçin' : 'Önce Marka Seçin'}</option>
                {models.map((mdl) => (
                  <option key={mdl} value={mdl}>{mdl}</option>
                ))}
              </select>
            </div>

            {/* Trim Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Donanım Seçeneği</label>
              <select
                value={selectedTrim}
                disabled={!selectedModel}
                onChange={(e) => setSelectedTrim(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono disabled:opacity-40"
              >
                <option value="">{selectedModel ? 'Donanım Seçin' : 'Önce Model Seçin'}</option>
                {trims.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'size' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Width Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Taban Genişliği (mm)</label>
              <select
                value={selectedWidth}
                onChange={(e) => setSelectedWidth(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
              >
                <option value="">Genişlik Seçin</option>
                {['245', '255', '265', '275', '285', '305', '315'].map((w) => (
                  <option key={w} value={w}>{w} mm</option>
                ))}
              </select>
            </div>

            {/* Profile Ratio */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Yanak Kesiti</label>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
              >
                <option value="">Profil Seçin</option>
                {['30', '35', '70'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Diameter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Jant Çapı (inç)</label>
              <select
                value={selectedDiameter}
                onChange={(e) => setSelectedDiameter(e.target.value)}
                className="w-full bg-[#0F0F10] text-xs text-white px-4 py-3 rounded border border-[#262629] focus:outline-none focus:border-[#FF6A00] font-mono"
              >
                <option value="">Çap Seçin</option>
                {['17', '19', '20', '21'].map((d) => (
                  <option key={d} value={d}>{d}" Jant</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'brand' && (
          <div className="flex flex-wrap gap-3">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.name === selectedBrand ? '' : brand.name)}
                className={`px-5 py-3 rounded-lg border text-sm font-display font-bold transition-all ${
                  selectedBrand === brand.name
                    ? 'border-[#FF6A00] bg-[#FF6A00]/15 text-white glow-orange'
                    : 'border-[#262629] bg-[#0F0F10] text-gray-400 hover:text-white hover:border-gray-500'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'type' && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(['All-Season', 'Summer', 'Winter', 'All-Terrain', 'Track/Racing'] as TireType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type === selectedType ? '' : type)}
                className={`py-4 rounded-lg border text-xs tracking-wider uppercase font-display font-medium transition-all ${
                  selectedType === type
                    ? 'border-[#FF6A00] bg-[#FF6A00]/15 text-white glow-orange'
                    : 'border-[#262629] bg-[#0F0F10] text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#262629]/60">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <Sliders className="w-4 h-4 text-[#FF6A00]" />
            <span>Katalog özelliklerini, ebat ve marka filtrelerini anında uygulayın.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={triggerReset}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-gray-400 hover:text-white border border-[#262629] hover:bg-white/5 rounded font-display font-bold text-xs uppercase tracking-wider transition-performance"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Aramayı Sıfırla
            </button>

            {activeTab === 'vehicle' && (
              <button
                onClick={handleSearchVehicle}
                disabled={!selectedTrim}
                className="flex-1 sm:flex-initial px-8 py-3 bg-[#FF6A00] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-40 disabled:cursor-not-allowed transition-performance glow-orange hover:scale-[1.02]"
              >
                Lastikleri Bul
              </button>
            )}

            {activeTab === 'size' && (
              <button
                onClick={handleSearchSize}
                disabled={!selectedWidth && !selectedProfile && !selectedDiameter}
                className="flex-1 sm:flex-initial px-8 py-3 bg-[#FF6A00] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-40 transition-performance glow-orange hover:scale-[1.02]"
              >
                Ebatları Filtrele
              </button>
            )}

            {activeTab === 'brand' && (
              <button
                onClick={handleSearchBrand}
                disabled={!selectedBrand}
                className="flex-1 sm:flex-initial px-8 py-3 bg-[#FF6A00] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-40 transition-performance glow-orange"
              >
                Markayı Göster
              </button>
            )}

            {activeTab === 'type' && (
              <button
                onClick={handleSearchType}
                disabled={!selectedType}
                className="flex-1 sm:flex-initial px-8 py-3 bg-[#FF6A00] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded border border-[#FF6A00] hover:bg-[#FF8533] disabled:opacity-40 transition-performance glow-orange"
              >
                Türleri Göster
              </button>
            )}
          </div>
        </div>

        {/* Live Compatibility Confirmation feedback bar if vehicle matches */}
        {selectedTrim && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center gap-2.5 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span className="text-xs text-emerald-400 font-mono">
              Araç özellikleri açıldı: {selectedYear} {selectedMake} {selectedModel} ({selectedTrim}) için standart ebat{' '}
              <strong className="underline text-white font-bold">
                {COMPATIBILITY[selectedYear]?.[selectedMake]?.[selectedModel]?.[selectedTrim]?.tireSize}
              </strong>. Uygun lastikleri listelemek için yukarıdaki &ldquo;Lastikleri Bul&rdquo; butonuna tıklayın.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
