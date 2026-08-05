import React from 'react';
import { Garment } from '../types';

interface GarmentCardProps {
  garment: Garment;
  onSelect: (garment: Garment) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (garment: Garment, e: React.MouseEvent) => void;
  onProposeSwap?: (garment: Garment, e: React.MouseEvent) => void;
}

export const GarmentCard: React.FC<GarmentCardProps> = ({
  garment,
  onSelect,
  onToggleFavorite,
  onAddToCart,
  onProposeSwap
}) => {
  return (
    <div 
      onClick={() => onSelect(garment)}
      className="bg-white rounded-2xl border border-[#d4c7b0]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#f1eee5] overflow-hidden">
        <img
          src={garment.image}
          alt={garment.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => onToggleFavorite(garment.id, e)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            garment.isFavorite 
              ? 'bg-[#a93712] text-white' 
              : 'bg-white/80 text-[#1c1c16] hover:bg-white'
          }`}
        >
          <span className={`material-symbols-outlined text-lg ${garment.isFavorite ? 'fill' : ''}`}>
            favorite
          </span>
        </button>

        {/* Listing Type Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {garment.type === 'Compra' && (
            <span className="bg-[#004634] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              Compra
            </span>
          )}
          {garment.type === 'Trueque' && (
            <span className="bg-[#a93712] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">sync_alt</span>
              Trueque
            </span>
          )}
          {garment.type === 'Ambos' && (
            <span className="bg-[#1f5e4a] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              Venta / Trueque
            </span>
          )}
        </div>

        {/* Eco Badge Bottom Overlay */}
        {garment.ecoBadge && (
          <div className="absolute bottom-2 left-2 bg-[#004634]/90 backdrop-blur-xs text-[#97d5bc] text-[10px] font-mono-code px-2 py-0.5 rounded-md flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#fe744b]">eco</span>
            <span>{garment.ecoBadge}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand / Seller */}
          <div className="flex items-center justify-between text-xs text-[#707974] mb-1">
            <span className="font-semibold text-[#004634] truncate max-w-[120px]">
              {garment.brand || garment.seller.handle}
            </span>
            <span className="font-mono-code text-[11px] bg-[#f1eee5] px-2 py-0.5 rounded text-[#1c1c16]">
              {garment.size} • {garment.condition}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-[#1c1c16] group-hover:text-[#004634] transition-colors line-clamp-2 leading-snug">
            {garment.title}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="mt-3 pt-3 border-t border-[#f1eee5] flex items-center justify-between">
          <div>
            {garment.type !== 'Trueque' ? (
              <span className="text-base font-black text-[#1c1c16] font-mono-code">
                ${garment.price.toLocaleString('es-CO')} COP
              </span>
            ) : (
              <span className="text-xs font-bold text-[#a93712] font-mono-code">
                Solo Intercambio
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {garment.type !== 'Compra' && onProposeSwap && (
              <button
                onClick={(e) => onProposeSwap(garment, e)}
                className="bg-[#fe744b]/15 text-[#a93712] hover:bg-[#fe744b]/30 p-2 rounded-lg transition-colors cursor-pointer"
                title="Proponer Trueque"
              >
                <span className="material-symbols-outlined text-lg leading-none">sync_alt</span>
              </button>
            )}

            <button
              onClick={(e) => onAddToCart(garment, e)}
              className="bg-[#004634] hover:bg-[#1f5e4a] text-white p-2 rounded-lg transition-all cursor-pointer shadow-xs"
              title="Agregar al Carrito"
            >
              <span className="material-symbols-outlined text-lg leading-none">add_shopping_cart</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
