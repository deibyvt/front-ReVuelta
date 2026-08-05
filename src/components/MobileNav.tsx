import React from 'react';
import { ViewMode } from '../types';

interface MobileNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenPublishModal: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenPublishModal
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#d4c7b0] py-2 px-4 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Explorar */}
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
            currentView === 'catalog' ? 'text-[#004634]' : 'text-[#707974]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">grid_view</span>
          <span>Explorar</span>
        </button>

        {/* Transacciones */}
        <button
          onClick={() => onNavigate('transactions')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
            currentView === 'transactions' || currentView === 'shipment_detail'
              ? 'text-[#004634]'
              : 'text-[#707974]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">local_shipping</span>
          <span>Transacciones</span>
        </button>

        {/* Center Plus Publish Button */}
        <button
          onClick={onOpenPublishModal}
          className="w-12 h-12 rounded-full bg-[#004634] text-white flex items-center justify-center -mt-5 shadow-lg border-4 border-[#fdf9f0] cursor-pointer hover:bg-[#1f5e4a] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>

        {/* Carrito */}
        <button
          onClick={() => onNavigate('cart')}
          className={`relative flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
            currentView === 'cart' ? 'text-[#004634]' : 'text-[#707974]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          <span>Carrito</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-[#a93712] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono-code">
              {cartCount}
            </span>
          )}
        </button>

        {/* Puntos / Fidelidad */}
        <button
          onClick={() => onNavigate('loyalty')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold cursor-pointer ${
            currentView === 'loyalty' ? 'text-[#004634]' : 'text-[#707974]'
          }`}
        >
          <span className="material-symbols-outlined text-2xl text-[#fe744b]">stars</span>
          <span>Puntos</span>
        </button>

      </div>
    </div>
  );
};
