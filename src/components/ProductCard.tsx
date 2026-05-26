import React from 'react';
import { TireProduct } from '../types';
import { Star, Heart, GitCompare, ArrowUpRight, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: TireProduct;
  onProductClick: (product: TireProduct) => void;
  onAddToCart: (product: TireProduct, size?: string) => void;
  onToggleCompare: (product: TireProduct) => void;
  isComparing: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
  onToggleCompare,
  isComparing,
  isWishlisted,
  onToggleWishlist,
}: ProductCardProps) {
  
  // Custom badges for additional visual variety
  const getBadgeText = (type: string, isPopular: boolean) => {
    if (isPopular) return '🔥 EN ÇOK SATAN';
    if (type === 'Track/Racing') return '🏁 PİST TEPKİSİ';
    if (type === 'Winter') return '❄️ BUZ KİLİDİ PRO';
    if (type === 'All-Terrain') return '⛰️ ARAZİ A/T';
    return '⚡ PERFORMANS';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#FF6A00]/40 group relative">
      
      {/* Top action bar overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <span className="bg-black text-slate-100 text-[9px] font-mono tracking-wider font-extrabold px-3 py-1.5 rounded-sm uppercase shadow-sm">
          {getBadgeText(product.type, product.isPopular)}
        </span>
        
        <div className="flex gap-1.5">
          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(product);
            }}
            className={`p-2 rounded-full shadow-sm border transition-all ${
              isComparing
                ? 'bg-[#FF6A00] text-black border-[#FF6A00]'
                : 'bg-white hover:bg-neutral-50 text-neutral-600 border-neutral-200'
            }`}
            title={isComparing ? 'Karşılaştırılıyor' : 'Karşılaştırmaya ekle'}
          >
            <GitCompare className="w-3.5 h-3.5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="p-2 bg-white hover:bg-neutral-50 text-neutral-500 rounded-full shadow-sm border border-neutral-200 transition-colors"
            title="Favorilere ekle"
          >
            <Heart 
              className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        onClick={() => onProductClick(product)}
        className="w-full pt-16 pb-6 bg-[#F8F9FA] flex items-center justify-center relative overflow-hidden cursor-pointer h-56"
      >
        <img
          src={product.images[0]}
          alt={`${product.brand} ${product.model}`}
          className="h-36 md:h-40 w-auto object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 drop-shadow-md"
          referrerPolicy="no-referrer"
        />
        
        {/* Hover zoom overlay indicator */}
        <div className="absolute inset-0 bg-[#0F0F10]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/90 text-[10px] font-mono tracking-wider text-slate-100 px-4 py-2 rounded-full uppercase flex items-center gap-1">
            <span>ÖZELLİKLERİ İNCELE</span>
            <ArrowUpRight className="w-3 h-3 text-[#FF6A00]" />
          </div>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col bg-white">
        
        {/* Brand & Type */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
            {product.brand}
          </span>
          <span className="text-[10px] font-mono tracking-wider text-[#FF6A00] uppercase font-bold px-2 py-0.5 bg-orange-50 rounded">
            {product.type === 'Summer' ? 'YAZ LASTİĞİ' : product.type === 'Winter' ? 'KIŞ LASTİĞİ' : product.type === 'All-Season' ? '4 MEVSİM' : product.type === 'All-Terrain' ? 'ARAZİ / AT' : 'PİST/YARIŞ'}
          </span>
        </div>

        {/* Model Title */}
        <h4 
          onClick={() => onProductClick(product)}
          className="font-display font-extrabold text-base text-[#0F0F10] tracking-tight hover:text-[#FF6A00] transition-colors cursor-pointer line-clamp-1 mb-2"
        >
          {product.brand} {product.model}
        </h4>

        {/* Tire Dimensions & Speed indexes */}
        <div className="flex items-center justify-between text-xs text-neutral-500 font-mono border-b border-neutral-100 pb-3 mb-3">
          <span className="font-extrabold text-neutral-900">{product.size}</span>
          <span>Hız/Yük Endeksi: {product.loadIndex}{product.speedRating}</span>
        </div>

        {/* Star reviews ratings */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-neutral-200'}`} 
              />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-neutral-900">{product.rating}</span>
          <span className="text-[10px] font-mono text-neutral-500">({product.reviewCount} yorum)</span>
        </div>

        {/* Price & Add to Cart row */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-dashed border-neutral-200">
          <div>
            {product.originalPrice && (
              <span className="text-xs font-mono line-through text-neutral-400 block -mb-1">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg md:text-xl font-mono font-extrabold text-[#0F0F10]">
              ${product.price.toFixed(2)}
              <span className="text-[10px] text-neutral-500 font-normal"> /adet</span>
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product, product.size)}
            className="bg-[#0F0F10] hover:bg-[#FF6A00] text-white hover:text-black p-3.5 rounded-lg transition-all duration-300 hover:scale-[1.08] hover:shadow-md hover:shadow-orange-500/20 group/btn"
            title="Hızlı Sepete Ekle"
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
