import React, { useState } from 'react';
import { Garment, CartItem, ViewMode } from '../types';
import { MOCK_USER_CLOSET } from '../data/mockData';

interface CartViewProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onNavigate: (view: ViewMode) => void;
  onCheckoutSuccess: (orderTitle: string, amount: number, isSwap: boolean) => void;
  swapTargetGarment: Garment | null;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onNavigate,
  onCheckoutSuccess,
  swapTargetGarment
}) => {
  const [activeTab, setActiveTab] = useState<'comprar' | 'trueque'>(
    swapTargetGarment ? 'trueque' : 'comprar'
  );

  // Swap State
  const [selectedClosetGarment, setSelectedClosetGarment] = useState<Garment>(MOCK_USER_CLOSET[0]);
  const [swapMessage, setSwapMessage] = useState<string>(
    '¡Hola! Me encanta tu prenda y creo que encaja perfecto con esta blusa de seda de mi armario.'
  );

  // Cart Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.garment.price, 0);
  const shippingFee = cartItems.length > 0 ? 5500 : 0;
  const discount = subtotal > 60000 ? 5000 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleConfirmPurchase = () => {
    if (cartItems.length === 0) return;
    const firstTitle = cartItems[0].garment.title;
    onCheckoutSuccess(firstTitle, grandTotal, false);
    onClearCart();
  };

  const handleConfirmSwapProposal = () => {
    const targetTitle = swapTargetGarment?.title || cartItems[0]?.garment.title || 'Vintage Denim Jacket';
    onCheckoutSuccess(`Trueque por ${targetTitle}`, 4900, true);
    onClearCart();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4c7b0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c16] tracking-tight">
            Tu Carrito & Propuestas de Trueque
          </h1>
          <p className="text-xs text-[#707974] font-mono-code mt-0.5">
            Gestiona tus compras verificadas e intercambios circulares
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#f1eee5] p-1 rounded-2xl flex items-center border border-[#bfc9c3] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('comprar')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'comprar'
                ? 'bg-[#004634] text-white shadow-xs'
                : 'text-[#404944] hover:text-[#1c1c16]'
            }`}
          >
            <span className="material-symbols-outlined text-base">shopping_bag</span>
            <span>Comprar ({cartItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('trueque')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'trueque'
                ? 'bg-[#a93712] text-white shadow-xs'
                : 'text-[#404944] hover:text-[#1c1c16]'
            }`}
          >
            <span className="material-symbols-outlined text-base">sync_alt</span>
            <span>Armar Trueque</span>
          </button>
        </div>
      </div>

      {/* COMPRAR TAB */}
      {activeTab === 'comprar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.garment.id}
                  className="bg-white p-4 rounded-2xl border border-[#d4c7b0]/80 shadow-xs flex items-center gap-4"
                >
                  <img
                    src={item.garment.image}
                    alt={item.garment.title}
                    className="w-20 h-24 object-cover rounded-xl bg-[#f1eee5]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#004634] font-mono-code">
                      {item.garment.brand || 'ReVuelta Verified'}
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c16] truncate">
                      {item.garment.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#707974] mt-1">
                      <span>Talla: {item.garment.size}</span>
                      <span>•</span>
                      <span>{item.garment.condition}</span>
                    </div>
                    <div className="text-sm font-black text-[#004634] font-mono-code mt-2">
                      ${item.garment.price.toLocaleString('es-CO')} COP
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.garment.id)}
                    className="p-2 text-[#707974] hover:text-[#a93712] rounded-lg transition-colors cursor-pointer"
                    title="Eliminar de carrito"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-3xl text-center border border-[#d4c7b0] space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#707974]">shopping_cart</span>
                <h3 className="text-base font-bold text-[#1c1c16]">Tu carrito de compra está vacío</h3>
                <p className="text-xs text-[#707974]">
                  Explora las prendas disponibles en el catálogo y agrega tus favoritas.
                </p>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="bg-[#004634] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#1f5e4a]"
                >
                  Explorar prendas
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-4 h-fit">
            <h3 className="text-base font-black text-[#1c1c16] border-b border-[#f1eee5] pb-3">
              Resumen del Pedido
            </h3>

            <div className="space-y-2 text-xs text-[#404944]">
              <div className="flex justify-between">
                <span>Subtotal prendas ({cartItems.length}):</span>
                <span className="font-mono-code font-bold">${subtotal.toLocaleString('es-CO')} COP</span>
              </div>
              <div className="flex justify-between">
                <span>Envío a Punto de Acopio:</span>
                <span className="font-mono-code font-bold">${shippingFee.toLocaleString('es-CO')} COP</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#004634] font-bold">
                  <span>Descuento ReVuelta Eco:</span>
                  <span className="font-mono-code">-${discount.toLocaleString('es-CO')} COP</span>
                </div>
              )}
            </div>

            <div className="border-t border-[#f1eee5] pt-3 flex justify-between items-center">
              <span className="text-sm font-black text-[#1c1c16]">Total Final:</span>
              <span className="text-xl font-black text-[#004634] font-mono-code">
                ${grandTotal.toLocaleString('es-CO')} COP
              </span>
            </div>

            <button
              onClick={handleConfirmPurchase}
              disabled={cartItems.length === 0}
              className="w-full bg-[#004634] hover:bg-[#1f5e4a] text-white font-bold text-xs py-3.5 rounded-2xl transition-all shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Confirmar Pedido de Compra</span>
            </button>

            <div className="p-3 bg-[#fdf9f0] rounded-xl border border-[#d4c7b0]/60 text-[11px] text-[#707974] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#004634]">security</span>
              <span>Garantía de reembolso si la prenda no coincide con el estado publicado.</span>
            </div>
          </div>

        </div>
      )}

      {/* TRUEQUE TAB */}
      {activeTab === 'trueque' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Builder area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Swap comparison layout */}
            <div className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#f1eee5] pb-3">
                <h3 className="text-base font-black text-[#1c1c16] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#a93712]">sync_alt</span>
                  <span>Propuesta de Intercambio Directo</span>
                </h3>
                <span className="bg-[#fe744b]/20 text-[#a93712] text-[10px] font-bold font-mono-code px-2.5 py-1 rounded-full">
                  $0 COP entre usuarios
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                
                {/* Desired Garment */}
                <div className="p-4 bg-[#fdf9f0] rounded-2xl border border-[#d4c7b0]/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a93712] font-mono-code">
                    Prenda deseada (Vendedor)
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={swapTargetGarment?.image || 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop'}
                      alt="Deseada"
                      className="w-16 h-20 object-cover rounded-xl bg-[#f1eee5]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#1c1c16]">
                        {swapTargetGarment?.title || 'Vintage Denim Jacket 90s'}
                      </h4>
                      <p className="text-[11px] text-[#707974] mt-0.5">Talla: {swapTargetGarment?.size || 'L'}</p>
                      <p className="text-[11px] text-[#004634] font-bold mt-1">
                        Vendedor: {swapTargetGarment?.seller.handle || '@carlos_closet'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Offered Garment from User Closet */}
                <div className="p-4 bg-[#004634]/5 rounded-2xl border border-[#004634]/30 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#004634] font-mono-code">
                    Tu Oferta (Tu Armario)
                  </span>
                  
                  {/* Select Closet Dropdown */}
                  <div className="space-y-2">
                    <select
                      value={selectedClosetGarment.id}
                      onChange={(e) => {
                        const found = MOCK_USER_CLOSET.find(c => c.id === e.target.value);
                        if (found) setSelectedClosetGarment(found);
                      }}
                      className="w-full bg-white border border-[#d4c7b0] rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-[#004634]"
                    >
                      {MOCK_USER_CLOSET.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.size})
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-3">
                      <img
                        src={selectedClosetGarment.image}
                        alt="Tu prenda"
                        className="w-16 h-20 object-cover rounded-xl bg-[#f1eee5]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#1c1c16]">{selectedClosetGarment.title}</h4>
                        <p className="text-[11px] text-[#707974]">Talla: {selectedClosetGarment.size} • {selectedClosetGarment.condition}</p>
                        <span className="inline-block text-[10px] bg-[#004634] text-white px-2 py-0.5 rounded font-mono-code mt-1">
                          Lista en tu clóset
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Message to Seller */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#404944]">
                  Mensaje personalizado para la propuesta:
                </label>
                <textarea
                  rows={3}
                  value={swapMessage}
                  onChange={(e) => setSwapMessage(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl p-3 text-xs focus:outline-none focus:border-[#a93712]"
                />
              </div>

            </div>

          </div>

          {/* Swap Summary */}
          <div className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-4 h-fit">
            <h3 className="text-base font-black text-[#1c1c16] border-b border-[#f1eee5] pb-3">
              Resumen del Trueque
            </h3>

            <div className="space-y-2 text-xs text-[#404944]">
              <div className="flex justify-between">
                <span>Intercambio de Prendas:</span>
                <span className="font-mono-code font-bold text-[#a93712]">$0 COP</span>
              </div>
              <div className="flex justify-between">
                <span>Tarifa de Gestión & Acopio:</span>
                <span className="font-mono-code font-bold">$4.900 COP</span>
              </div>
              <div className="flex justify-between text-[#004634] font-bold">
                <span>CO2 Ahorrado con este Trueque:</span>
                <span className="font-mono-code">18.2 kg CO2</span>
              </div>
            </div>

            <button
              onClick={handleConfirmSwapProposal}
              className="w-full bg-[#a93712] hover:bg-[#8e2e0e] text-white font-bold text-xs py-3.5 rounded-2xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">sync_alt</span>
              <span>Enviar Propuesta de Trueque</span>
            </button>

            <div className="p-3 bg-[#f1eee5] rounded-xl text-[11px] text-[#404944] space-y-1">
              <p className="font-bold text-[#1c1c16]">¿Cómo funciona el trueque?</p>
              <p>1. La vendedora recibe tu propuesta y tiene 48h para aceptar o declinar.</p>
              <p>2. Al aceptar, ambas entregan la prenda en el Punto de Acopio Chapinero.</p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
