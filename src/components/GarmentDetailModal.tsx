import React from 'react';
import { Garment } from '../types';

interface GarmentDetailModalProps {
  garment: Garment | null;
  onClose: () => void;
  onAddToCart: (garment: Garment) => void;
  onProposeSwap: (garment: Garment) => void;
  onViewSellerProfile?: (handle: string) => void;
}

export const GarmentDetailModal: React.FC<GarmentDetailModalProps> = ({
  garment,
  onClose,
  onAddToCart,
  onProposeSwap,
  onViewSellerProfile
}) => {
  if (!garment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#d4c7b0] animate-modal flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-[#f1eee5] relative min-h-[280px] md:min-h-full">
          <img
            src={garment.image}
            alt={garment.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden w-9 h-9 rounded-full bg-white/80 text-[#1c1c16] flex items-center justify-center shadow-md"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          {garment.co2SavedKg && (
            <div className="absolute bottom-4 left-4 right-4 bg-[#004634]/95 text-[#97d5bc] text-xs font-mono-code p-2.5 rounded-xl backdrop-blur-md flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#fe744b]">eco</span>
              <span>Ahorro ambiental estimado: <strong>{garment.co2SavedKg} kg CO2</strong></span>
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top Close Button (Desktop) */}
            <div className="hidden md:flex justify-between items-start mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a93712] font-mono-code">
                {garment.brand || 'Verificado ReVuelta'}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-[#f1eee5] text-[#707974] hover:text-[#1c1c16] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h2 className="text-xl font-black text-[#1c1c16] leading-snug mb-2">
              {garment.title}
            </h2>

            {/* Price & Badges */}
            <div className="flex items-center gap-3 mb-4">
              {garment.type !== 'Trueque' && (
                <span className="text-2xl font-black text-[#004634] font-mono-code">
                  ${garment.price.toLocaleString('es-CO')} COP
                </span>
              )}
              <span className="bg-[#f1eee5] text-[#1c1c16] text-xs font-bold px-2.5 py-1 rounded-md font-mono-code">
                Talla {garment.size}
              </span>
              <span className="bg-[#e6e2d9] text-[#404944] text-xs font-semibold px-2.5 py-1 rounded-md">
                {garment.condition}
              </span>
            </div>

            {/* Description */}
            <div className="bg-[#fdf9f0] p-3.5 rounded-2xl border border-[#d4c7b0]/60 mb-4 text-xs text-[#404944] space-y-1.5 leading-relaxed">
              <p className="font-semibold text-[#1c1c16]">Detalles de la prenda:</p>
              <p>{garment.description || 'Prenda en excelente estado seleccionada dentro de nuestra comunidad circular.'}</p>
              {garment.ecoBadge && (
                <div className="flex items-center gap-1.5 text-[#004634] font-medium pt-1">
                  <span className="material-symbols-outlined text-sm text-[#fe744b]">verified</span>
                  <span>{garment.ecoBadge}</span>
                </div>
              )}
            </div>

            {/* Seller Box */}
            <div 
              onClick={() => onViewSellerProfile && onViewSellerProfile(garment.seller.handle)}
              className="flex items-center justify-between p-3 rounded-xl border border-[#d4c7b0] hover:border-[#004634] bg-white transition-all cursor-pointer mb-6 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#004634] text-white font-bold flex items-center justify-center text-sm">
                  {garment.seller.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c1c16] group-hover:text-[#004634] transition-colors">
                    {garment.seller.name}
                  </h4>
                  <p className="text-[11px] text-[#707974]">{garment.seller.handle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs font-bold text-[#a93712]">
                  <span className="material-symbols-outlined text-sm fill">star</span>
                  <span>{garment.seller.rating || 4.8}</span>
                </div>
                <span className="text-[10px] text-[#707974]">{garment.seller.salesCount || 12} trueques</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-[#f1eee5]">
            {garment.type !== 'Compra' && (
              <button
                onClick={() => {
                  onProposeSwap(garment);
                  onClose();
                }}
                className="w-full bg-[#a93712] hover:bg-[#8e2e0e] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">sync_alt</span>
                <span>Proponer Trueque de Prenda</span>
              </button>
            )}

            {garment.type !== 'Trueque' && (
              <button
                onClick={() => {
                  onAddToCart(garment);
                  onClose();
                }}
                className="w-full bg-[#004634] hover:bg-[#1f5e4a] text-white font-bold text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span>Agregar al Carrito de Compra</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
