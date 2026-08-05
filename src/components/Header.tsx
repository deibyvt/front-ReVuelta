import React from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenPublishModal: () => void;
  cartCount: number;
  userPoints: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenPublishModal,
  cartCount,
  userPoints,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fdf9f0]/95 backdrop-blur-md border-b border-[#d4c7b0]/60 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#004634] text-[#97d5bc] text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="material-symbols-center text-sm text-[#fe744b]">eco</span>
        <span>¡Llegaste a ReVuelta! Por cada prenda intercambiada o comprada ahorras una media de 12kg de CO2.</span>
        <button 
          onClick={() => onNavigate('loyalty')}
          className="underline font-bold text-white hover:text-[#fe744b] ml-2 cursor-pointer transition-colors"
        >
          Ver tus {userPoints} pts ReVuelta
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo Brand */}
          <div 
            onClick={() => onNavigate('catalog')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-[#004634] flex items-center justify-center text-white shadow-sm group-hover:bg-[#1f5e4a] transition-all">
              <span className="material-symbols-outlined text-2xl text-[#fe744b] group-hover:rotate-180 transition-transform duration-500">
                sync_alt
              </span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#004634] font-sans">
                ReVuelta
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#a93712] -mt-1 font-mono-code">
                Moda Circular
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-2 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por prenda, estilo, talla o marca..."
              className="w-full bg-[#f1eee5] text-[#1c1c16] placeholder-[#707974] text-sm rounded-full pl-10 pr-4 py-2.5 border border-[#bfc9c3]/60 focus:outline-none focus:border-[#004634] focus:ring-1 focus:ring-[#004634] transition-all"
            />
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707974] text-xl">
              search
            </span>
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974] hover:text-[#1c1c16]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-[#404944]">
            <button
              onClick={() => onNavigate('catalog')}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                currentView === 'catalog'
                  ? 'bg-[#004634] text-white'
                  : 'hover:bg-[#f1eee5] hover:text-[#004634]'
              }`}
            >
              Explorar
            </button>
            <button
              onClick={() => onNavigate('transactions')}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                currentView === 'transactions' || currentView === 'shipment_detail'
                  ? 'bg-[#004634] text-white'
                  : 'hover:bg-[#f1eee5] hover:text-[#004634]'
              }`}
            >
              Transacciones
            </button>
            <button
              onClick={() => onNavigate('loyalty')}
              className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
                currentView === 'loyalty'
                  ? 'bg-[#004634] text-white'
                  : 'hover:bg-[#f1eee5] hover:text-[#004634]'
              }`}
            >
              <span className="material-symbols-outlined text-base text-[#fe744b]">stars</span>
              <span>Puntos ({userPoints})</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Publish Button */}
            <button
              onClick={onOpenPublishModal}
              className="bg-[#004634] hover:bg-[#1f5e4a] text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">add_circle</span>
              <span className="hidden sm:inline">Publicar Prenda</span>
              <span className="sm:hidden">Publicar</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className={`relative p-2.5 rounded-full border border-[#d4c7b0] transition-all cursor-pointer ${
                currentView === 'cart'
                  ? 'bg-[#004634] text-white border-[#004634]'
                  : 'bg-white hover:bg-[#f1eee5] text-[#1c1c16]'
              }`}
              title="Tu Carrito / Trueque"
            >
              <span className="material-symbols-outlined text-xl leading-none">
                shopping_bag
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a93712] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-mono-code">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all cursor-pointer ${
                currentView === 'profile'
                  ? 'border-[#004634] bg-[#004634]/10'
                  : 'border-[#d4c7b0] bg-white hover:bg-[#f1eee5]'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Avatar Laura"
                className="w-7 h-7 rounded-full object-cover border border-[#004634]"
              />
              <span className="text-xs font-bold text-[#1c1c16] hidden md:inline">Laura</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar en el catálogo..."
              className="w-full bg-[#f1eee5] text-[#1c1c16] placeholder-[#707974] text-xs rounded-full pl-9 pr-4 py-2 border border-[#bfc9c3]/60 focus:outline-none focus:border-[#004634]"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707974] text-lg">
              search
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
