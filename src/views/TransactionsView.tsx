import React, { useState } from 'react';
import { Transaction, ViewMode } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  onSelectTransaction: (t: Transaction) => void;
  onNavigate: (view: ViewMode) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onSelectTransaction,
  onNavigate
}) => {
  const [filter, setFilter] = useState<string>('Todas');

  const filtered = transactions.filter((t) => {
    if (filter === 'Completadas') return t.status === 'Completado';
    if (filter === 'En camino') return t.status === 'En camino' || t.status === 'Pendiente';
    if (filter === 'Rechazadas') return t.status === 'Rechazado';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4c7b0] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c16] tracking-tight">
            Mis Transacciones & Historial
          </h1>
          <p className="text-xs text-[#707974] font-mono-code mt-0.5">
            Sigue el estado de tus compras, trueques y envíos a punto de acopio
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['Todas', 'En camino', 'Completadas', 'Rechazadas'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filter === f
                  ? 'bg-[#004634] text-white shadow-xs'
                  : 'bg-white text-[#404944] border border-[#d4c7b0] hover:bg-[#f1eee5]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelectTransaction(t)}
            className="bg-white p-5 rounded-3xl border border-[#d4c7b0] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-4">
              <img
                src={t.image}
                alt={t.title}
                className="w-16 h-20 object-cover rounded-2xl bg-[#f1eee5] shrink-0"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold text-[#004634] bg-[#f1eee5] px-2 py-0.5 rounded">
                    {t.orderNumber}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    t.type === 'Trueque' ? 'bg-[#fe744b]/20 text-[#a93712]' : 'bg-[#004634]/15 text-[#004634]'
                  }`}>
                    {t.type}
                  </span>
                  <span className="text-[11px] text-[#707974]">{t.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#1c1c16] group-hover:text-[#004634] transition-colors">
                  {t.title}
                </h3>

                <p className="text-xs text-[#404944]">{t.detail}</p>

                {t.rejectionReason && (
                  <p className="text-xs text-[#a93712] italic">
                    Motivo: {t.rejectionReason}
                  </p>
                )}
              </div>
            </div>

            {/* Status & Action */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f1eee5]">
              <div className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  t.status === 'Completado' 
                    ? 'bg-[#004634]' 
                    : t.status === 'En camino' 
                    ? 'bg-[#fe744b] animate-pulse' 
                    : 'bg-[#a93712]'
                }`} />
                <span className="text-xs font-bold text-[#1c1c16] font-mono-code">
                  {t.status}
                </span>
              </div>

              {t.shipmentNumber && (
                <div className="text-[11px] text-[#004634] font-bold flex items-center gap-1 mt-1">
                  <span>Envío {t.shipmentNumber}</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </div>
              )}
            </div>

          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white p-12 rounded-3xl text-center border border-[#d4c7b0]">
            <p className="text-xs text-[#707974]">No hay transacciones en esta categoría.</p>
          </div>
        )}
      </div>

    </div>
  );
};
