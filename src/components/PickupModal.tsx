import React, { useState } from 'react';

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPickupName?: string;
  onSelectPickup: (point: { name: string; address: string; city: string; hours: string }) => void;
}

export const PICKUP_POINTS = [
  {
    name: 'Punto de Acopio - ReVuelta Chapinero Hub',
    address: 'Calle 63 #13-45, Local 102',
    city: 'Bogotá D.C.',
    hours: 'Lun a Sáb: 9:00 AM - 7:00 PM',
    distance: '1.2 km'
  },
  {
    name: 'Punto de Acopio - ReVuelta Cedritos Eco-Spot',
    address: 'Calle 140 #11-20, Centro Comercial',
    city: 'Bogotá D.C.',
    hours: 'Lun a Sáb: 10:00 AM - 8:00 PM',
    distance: '5.8 km'
  },
  {
    name: 'Punto de Acopio - ReVuelta Zona T PickUp',
    address: 'Carrera 12 #83-19',
    city: 'Bogotá D.C.',
    hours: 'Mar a Dom: 11:00 AM - 8:00 PM',
    distance: '3.4 km'
  },
  {
    name: 'Punto de Acopio - Laureles Circular Spot',
    address: 'Circular 4 #72-10',
    city: 'Medellín',
    hours: 'Lun a Sáb: 9:00 AM - 6:00 PM',
    distance: 'Medellín Centro'
  }
];

export const PickupModal: React.FC<PickupModalProps> = ({
  isOpen,
  onClose,
  currentPickupName,
  onSelectPickup
}) => {
  const [selected, setSelected] = useState(PICKUP_POINTS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#d4c7b0] animate-modal p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#004634]">storefront</span>
            <div>
              <h3 className="text-lg font-bold text-[#1c1c16]">Seleccionar Punto de Acopio</h3>
              <p className="text-xs text-[#707974]">Entrega y recogida 100% libre de emisiones de CO2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1eee5] text-[#707974] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3 my-4 max-h-[60vh] overflow-y-auto">
          {PICKUP_POINTS.map((pt, idx) => {
            const isCurrent = selected.name === pt.name || currentPickupName === pt.name;
            return (
              <div
                key={idx}
                onClick={() => setSelected(pt)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isCurrent
                    ? 'border-[#004634] bg-[#004634]/5 shadow-xs'
                    : 'border-[#d4c7b0] bg-white hover:bg-[#fdf9f0]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                  isCurrent ? 'border-[#004634] bg-[#004634]' : 'border-[#bfc9c3]'
                }`}>
                  {isCurrent && <span className="material-symbols-outlined text-xs text-white">check</span>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1c1c16]">{pt.name}</h4>
                    <span className="text-[10px] font-mono-code bg-[#f1eee5] px-2 py-0.5 rounded text-[#404944]">
                      {pt.distance}
                    </span>
                  </div>
                  <p className="text-xs text-[#404944] mt-1">{pt.address}, {pt.city}</p>
                  <p className="text-[11px] text-[#004634] font-medium mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">schedule</span>
                    <span>{pt.hours}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#d4c7b0] text-xs font-bold text-[#707974] hover:bg-[#f1eee5]"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onSelectPickup(selected);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#004634] hover:bg-[#1f5e4a] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Confirmar Punto
          </button>
        </div>
      </div>
    </div>
  );
};
