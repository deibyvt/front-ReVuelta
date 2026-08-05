import React, { useState } from 'react';
import { Transaction, ViewMode } from '../types';
import { PickupModal } from '../components/PickupModal';

interface ShipmentDetailViewProps {
  transaction: Transaction | null;
  onNavigate: (view: ViewMode) => void;
  onOpenReviewModal?: () => void;
  onUpdatePickupPoint: (transactionId: string, point: { name: string; address: string; city: string; hours: string }) => void;
}

export const ShipmentDetailView: React.FC<ShipmentDetailViewProps> = ({
  transaction,
  onNavigate,
  onOpenReviewModal,
  onUpdatePickupPoint
}) => {
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Fallback transaction if none selected
  const t = transaction || {
    id: 't2',
    orderNumber: 'RV-8472-A',
    type: 'Compra',
    status: 'En camino',
    title: 'Botas de Cuero Vegano Estilo Combat',
    detail: 'En tránsito al punto de acopio Chapinero',
    date: '14 Oct 2023',
    amountCOP: 120000,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    shipmentNumber: '#4822',
    trackingCode: 'ECO993821005',
    carrier: 'EcoLogistics Bici-Mensajería',
    co2SavedKg: 14.8,
    pickupPoint: {
      name: 'Punto de Acopio - ReVuelta Chapinero',
      address: 'Calle 63 #13-45, Chapinero',
      city: 'Bogotá',
      hours: 'Lun - Sáb: 9:00 - 19:00'
    },
    timeline: [
      { step: 'Pedido realizado', date: '14 Oct, 10:15 AM', completed: true },
      { step: 'En preparación en taller vendedor', date: '14 Oct, 03:00 PM', completed: true },
      { step: 'En camino al punto de recogida', date: '15 Oct, 08:30 AM', completed: true, current: true },
      { step: 'Listo para reclamar en Chapinero', date: 'Estimado Hoy, 05:00 PM', completed: false }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-[#d4c7b0] pb-4">
        <button
          onClick={() => onNavigate('transactions')}
          className="flex items-center gap-1 text-xs font-bold text-[#004634] hover:text-[#1f5e4a] cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Volver a mis transacciones</span>
        </button>

        <span className="text-xs font-mono-code font-bold bg-[#004634] text-white px-3 py-1 rounded-full">
          Envío {t.shipmentNumber || '#4821'}
        </span>
      </div>

      {/* Main Status Header Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f1eee5] pb-4">
          <div>
            <span className="text-xs font-bold text-[#a93712] font-mono-code uppercase tracking-wider">
              Código de Rastreo: {t.trackingCode || 'ECO993821004'}
            </span>
            <h1 className="text-2xl font-black text-[#1c1c16] mt-0.5">
              {t.title}
            </h1>
            <p className="text-xs text-[#707974] mt-1">
              Transportista: <strong>{t.carrier || 'EcoLogistics express'}</strong>
            </p>
          </div>

          <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-right shrink-0">
            <span className="text-[10px] uppercase font-mono-code font-bold text-[#004634]">Estado Actual</span>
            <div className="flex items-center justify-end gap-1.5 text-base font-black text-[#004634]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fe744b] animate-pulse" />
              <span>{t.status}</span>
            </div>
          </div>
        </div>

        {/* Live Tracking Timeline */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#404944] font-mono-code">
            Línea de Tiempo del Envío
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#bfc9c3]">
            {(t.timeline || []).map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  step.completed 
                    ? 'bg-[#004634] border-[#004634] text-white' 
                    : step.current 
                    ? 'bg-[#fe744b] border-[#fe744b] text-white animate-bounce' 
                    : 'bg-white border-[#bfc9c3]'
                }`}>
                  {step.completed && <span className="material-symbols-outlined text-xs">check</span>}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-bold ${step.completed || step.current ? 'text-[#1c1c16]' : 'text-[#707974]'}`}>
                      {step.step}
                    </h4>
                    <span className="text-xs font-mono-code text-[#707974]">{step.date}</span>
                  </div>
                  {step.detail && <p className="text-xs text-[#404944] mt-0.5">{step.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pickup Point Info Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1eee5] pb-3">
            <h3 className="text-sm font-bold text-[#1c1c16] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004634]">storefront</span>
              <span>Punto de Recogida Seleccionado</span>
            </h3>
            <button
              onClick={() => setIsPickupModalOpen(true)}
              className="text-xs font-bold text-[#a93712] hover:underline cursor-pointer"
            >
              Cambiar
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black text-[#004634]">
              {t.pickupPoint?.name || 'Punto de Acopio - ReVuelta Chapinero'}
            </h4>
            <p className="text-xs text-[#404944]">
              {t.pickupPoint?.address || 'Calle 63 #13-45, Chapinero'}, {t.pickupPoint?.city || 'Bogotá'}
            </p>
            <p className="text-xs text-[#707974] flex items-center gap-1 font-mono-code">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>{t.pickupPoint?.hours || 'Lun - Sáb: 9:00 - 19:00'}</span>
            </p>
          </div>

          <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-xs text-[#404944] flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-[#fe744b]">eco</span>
            <span>Ahorraste <strong>{t.co2SavedKg || 12.4} kg de CO2</strong> al elegir recogida en punto de acopio.</span>
          </div>
        </div>

        {/* Seller Info & Actions */}
        <div className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1c1c16] border-b border-[#f1eee5] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004634]">person</span>
            <span>Vendedor & Soporte</span>
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                alt="Laura"
                className="w-10 h-10 rounded-full object-cover border border-[#004634]"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1c1c16]">Laura Vintage</h4>
                <p className="text-[11px] text-[#707974]">@laura_vintage • Vendedora Verificada</p>
              </div>
            </div>

            <button
              onClick={() => onOpenReviewModal && onOpenReviewModal()}
              className="bg-[#004634] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#1f5e4a] cursor-pointer"
            >
              Calificar
            </button>
          </div>

          <div className="pt-2 border-t border-[#f1eee5] flex gap-3">
            <button
              onClick={() => setIsSupportOpen(true)}
              className="flex-1 bg-[#f1eee5] hover:bg-[#e6e2d9] text-[#1c1c16] text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">support_agent</span>
              <span>Contactar Soporte</span>
            </button>
          </div>
        </div>

      </div>

      {/* Pickup Modal */}
      <PickupModal
        isOpen={isPickupModalOpen}
        onClose={() => setIsPickupModalOpen(false)}
        currentPickupName={t.pickupPoint?.name}
        onSelectPickup={(point) => onUpdatePickupPoint(t.id, point)}
      />

      {/* Support Dialog */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 border border-[#d4c7b0]">
            <h3 className="text-base font-bold text-[#1c1c16]">Soporte ReVuelta</h3>
            <p className="text-xs text-[#404944]">
              Nuestros agentes de logística revisan el estado de tu envío {t.shipmentNumber}. ¿Deseas solicitar una reprogramación de entrega?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsSupportOpen(false)}
                className="flex-1 py-2 bg-[#004634] text-white text-xs font-bold rounded-xl"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
