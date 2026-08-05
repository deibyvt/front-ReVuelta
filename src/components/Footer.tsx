import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1c1c16] text-[#e6e2d9] pt-12 pb-24 lg:pb-12 border-t border-[#404944] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#404944]/60">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#004634] flex items-center justify-center text-[#fe744b]">
                <span className="material-symbols-outlined text-lg">sync_alt</span>
              </div>
              <span className="text-xl font-black text-white font-sans">ReVuelta</span>
            </div>
            <p className="text-xs text-[#bfc9c3] leading-relaxed">
              La comunidad de moda circular líder en Colombia. Dale una segunda vida a tu clóset mediante compra transparente y trueque verificado.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#004634] px-3 py-1.5 rounded-full text-[11px] text-[#97d5bc] font-mono-code">
              <span className="material-symbols-outlined text-sm text-[#fe744b]">eco</span>
              <span>+45.2 Tn de CO2 Reducidos</span>
            </div>
          </div>

          {/* Col 2: Secciones */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#97d5bc] mb-3 font-mono-code">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs text-[#bfc9c3]">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Catálogo General
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Zona de Trueque Especial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('loyalty')} className="hover:text-white transition-colors">
                  Puntos & Recompensas Eco
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors">
                  Perfiles de la Comunidad
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Transacciones y Envíos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#97d5bc] mb-3 font-mono-code">
              Servicios & Logística
            </h4>
            <ul className="space-y-2 text-xs text-[#bfc9c3]">
              <li>
                <button onClick={() => onNavigate('transactions')} className="hover:text-white transition-colors">
                  Rastrear mi Envío
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipment_detail')} className="hover:text-white transition-colors">
                  Puntos de Acopio Físicos
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Certificación de Calidad
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Políticas de Devolución
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Soporte */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#97d5bc] mb-3 font-mono-code">
              Comunidad & Contacto
            </h4>
            <p className="text-xs text-[#bfc9c3] mb-3">
              ¿Tienes dudas sobre un trueque o envío? Escríbenos a soporte@revuelta.co
            </p>
            <div className="flex items-center gap-3 text-[#bfc9c3]">
              <span className="material-symbols-outlined text-lg hover:text-[#fe744b] cursor-pointer">
                chat
              </span>
              <span className="material-symbols-outlined text-lg hover:text-[#fe744b] cursor-pointer">
                verified
              </span>
              <span className="material-symbols-outlined text-lg hover:text-[#fe744b] cursor-pointer">
                share
              </span>
            </div>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#bfc9c3] gap-4">
          <p>© {new Date().getFullYear()} ReVuelta Circular Fashion Inc. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Términos del Trueque</span>
            <span className="hover:underline cursor-pointer">Privacidad</span>
            <span className="hover:underline cursor-pointer">Puntos de Acopio Bogotá</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
