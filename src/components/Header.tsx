import React, { useState } from 'react';
import { ShoppingCart, GitCompare, Search, Menu, X, Flame, Sun, Moon, User, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  compareCount: number;
  onCompareToggle: () => void;
  onSearch: (query: string) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Header({
  activeTab,
  onTabSelect,
  cartCount,
  onCartToggle,
  compareCount,
  onCompareToggle,
  onSearch,
  theme,
  onThemeToggle,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    onTabSelect('shop');
  };

  const menuItems = [
    { id: 'home', label: 'ANA SAYFA' },
    { id: 'shop', label: 'LASTİK AL' },
    { id: 'brands', label: 'MARKALAR' },
    { id: 'contact', label: 'İLETİŞİM' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F10] dark:bg-[#0F0F10]/95 light:bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#262629]/80 light:border-slate-200/85 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => onTabSelect('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-[#FF6A00] transition-performance group-hover:scale-105 group-hover:rotate-12 glow-orange">
              <Flame className="w-7 h-7 text-black stroke-[2.5]" />
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full animate-ping opacity-25" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white block">
                TIRE<span className="text-[#FF6A00]">CITY</span>
              </span>
              <span className="text-[10px] font-mono tracking-[4px] text-slate-500 dark:text-gray-400 block -mt-1 group-hover:text-[#FF6A00] transition-colors">
                PERFORMANCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabSelect(item.id);
                  setSearchValue('');
                }}
                className={`px-4 py-2 rounded-md font-display font-bold text-xs tracking-wider transition-all duration-200 uppercase ${
                  activeTab === item.id
                    ? 'text-[#FF6A00] bg-[#FF6A00]/10 border-b-2 border-[#FF6A00]'
                    : 'text-slate-600 hover:text-slate-950 dark:text-gray-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar & Action Drawers */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Ebat ara (örn. 275/35)..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-48 xl:w-64 bg-slate-100 dark:bg-[#1B1B1D] text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 pl-9 pr-4 py-2.5 rounded-md border border-slate-200 dark:border-[#262629] focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-all font-mono"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-gray-500" />
            </form>

            {/* Cart Trigger */}
            <button
              onClick={onCartToggle}
              className="relative p-2.5 bg-[#FF6A00] text-black font-extrabold hover:bg-[#FF8533] rounded-md transition-performance hover:scale-105 glow-orange group"
              title="Sepeti Görüntüle"
            >
              <ShoppingCart className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-[10px] font-mono font-extrabold bg-white text-black rounded-full border border-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Trigger */}
            <button
              onClick={() => onTabSelect('profile')}
              className={`relative p-2.5 rounded-md transition-performance hover:scale-105 group border ${
                activeTab === 'profile'
                  ? 'bg-[#FF6A00] text-black border-[#FF6A00] glow-orange'
                  : 'bg-slate-100 dark:bg-[#1B1B1D] hover:bg-slate-200 dark:hover:bg-[#262629] border-slate-200 dark:border-[#262629] text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Profili Görüntüle"
            >
              <User className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>

            {/* Admin Central Settings Trigger */}
            <button
              onClick={() => onTabSelect('admin')}
              className={`relative p-2.5 rounded-md transition-performance hover:scale-105 group border ${
                activeTab === 'admin'
                  ? 'bg-[#FF6A00] text-black border-[#FF6A00] glow-orange'
                  : 'bg-slate-100 dark:bg-[#1B1B1D] hover:bg-slate-200 dark:hover:bg-[#262629] border-slate-200 dark:border-[#262629] text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Admin Paneli Yönetimi"
            >
              <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Right Edge UI */}
          <div className="flex items-center sm:hidden space-x-2">
            {/* Mobile Cart Button */}
            <button
              onClick={onCartToggle}
              className="p-2.5 bg-[#FF6A00] text-black rounded-md relative flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black font-bold text-[9px] w-4 h-4 text-center rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Profile Trigger */}
            <button
              onClick={() => onTabSelect('profile')}
              className={`p-2.5 rounded-md relative flex items-center justify-center border ${
                activeTab === 'profile'
                  ? 'bg-[#FF6A00] text-black border-[#FF6A00]'
                  : 'bg-slate-100 dark:bg-[#1B1B1D] border-slate-200 dark:border-[#262629] text-slate-600 dark:text-gray-300'
              }`}
              title="Profili Görüntüle"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Admin Trigger */}
            <button
              onClick={() => onTabSelect('admin')}
              className={`p-2.5 rounded-md relative flex items-center justify-center border ${
                activeTab === 'admin'
                  ? 'bg-[#FF6A00] text-black border-[#FF6A00]'
                  : 'bg-slate-100 dark:bg-[#1B1B1D] border-slate-200 dark:border-[#262629] text-slate-600 dark:text-gray-300'
              }`}
              title="Admin Paneli"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
            </button>

            {/* Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 bg-slate-100 dark:bg-[#1B1B1D] border border-slate-200 dark:border-[#262629] rounded-md text-slate-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1B1B1D] border-b border-slate-200 dark:border-[#262629] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Ebat ara (örn. Dört Mevsim)..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#0F0F10] text-xs text-slate-850 dark:text-white pl-10 pr-4 py-3 rounded-md border border-slate-200 dark:border-[#262629]"
            />
            <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400 dark:text-gray-500" />
          </form>

          {/* Mobile Links */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabSelect(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-md font-display font-extrabold text-sm tracking-wider uppercase transition-colors ${
                  activeTab === item.id
                    ? 'text-[#FF6A00] bg-[#FF6A00]/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
