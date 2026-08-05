import React from 'react';
import { RewardCoupon } from '../types';

interface LoyaltyViewProps {
  userPoints: number;
  rewards: RewardCoupon[];
  onRedeemReward: (reward: RewardCoupon) => void;
}

export const LoyaltyView: React.FC<LoyaltyViewProps> = ({
  userPoints,
  rewards,
  onRedeemReward
}) => {
  const nextLevelPts = 2000;
  const progressPercent = Math.min(100, Math.round((userPoints / nextLevelPts) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c16] tracking-tight">
          Puntos & Fidelización ReVuelta
        </h1>
        <p className="text-xs text-[#707974] font-mono-code mt-0.5">
          Gana puntos por cada prenda publicada, comprada o intercambiada
        </p>
      </div>

      {/* Main Points Card */}
      <div className="bg-gradient-to-br from-[#004634] via-[#1f5e4a] to-[#004634] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#97d5bc]/30 relative overflow-hidden">
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-[#fe744b] text-white text-xs font-bold px-3 py-1 rounded-full font-mono-code">
              <span className="material-symbols-outlined text-sm">stars</span>
              <span>Nivel Actual: Eco-Aliado</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-6xl font-black font-mono-code tracking-tight">
                {userPoints.toLocaleString('es-CO')}
              </span>
              <span className="text-lg text-[#97d5bc] font-bold">Puntos ReVuelta</span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-[#bfc9c3] font-mono-code">
                <span>Progreso a Eco-Pionero</span>
                <span>{userPoints} / {nextLevelPts} Pts</span>
              </div>
              <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-[#fe744b] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Eco Stats */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[#bfc9c3]">Tu CO2 Ahorrado</span>
              <span className="font-bold text-[#97d5bc] font-mono-code">45.2 kg</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[#bfc9c3]">Prendas Circuladas</span>
              <span className="font-bold text-white font-mono-code">8 prendas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#bfc9c3]">Trueques Exitosos</span>
              <span className="font-bold text-white font-mono-code">5 trueques</span>
            </div>
          </div>

        </div>

      </div>

      {/* Rewards Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[#1c1c16] tracking-tight">
            Catálogo de Recompensas
          </h2>
          <span className="text-xs text-[#707974] font-mono-code">
            Canjea tus puntos por cupones y beneficios
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.pointsCost && !reward.isLocked;
            return (
              <div
                key={reward.id}
                className={`bg-white p-5 rounded-3xl border shadow-xs flex flex-col justify-between transition-all ${
                  reward.isHighlighted 
                    ? 'border-[#004634] ring-2 ring-[#004634]/20' 
                    : 'border-[#d4c7b0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#004634]/10 text-[#004634] flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">{reward.icon}</span>
                    </div>
                    <span className="text-xs font-black text-[#a93712] font-mono-code bg-[#f1eee5] px-2.5 py-1 rounded-full">
                      {reward.pointsCost} Pts
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#1c1c16] leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-[#707974] mt-1 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f1eee5]">
                  <button
                    onClick={() => onRedeemReward(reward)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-[#004634] hover:bg-[#1f5e4a] text-white shadow-xs'
                        : 'bg-[#f1eee5] text-[#707974] cursor-not-allowed'
                    }`}
                  >
                    {reward.isLocked
                      ? 'Bloqueado (Próximamente)'
                      : canAfford
                      ? 'Canjear Cupón'
                      : `Te faltan ${reward.pointsCost - userPoints} Pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* History Table */}
      <section className="bg-white p-6 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#1c1c16] border-b border-[#f1eee5] pb-3">
          Historial Reciente de Puntos
        </h3>

        <div className="space-y-3 text-xs">
          {[
            { action: 'Trueque completado (Vintage Denim Jacket)', pts: '+100 pts', date: '12 Oct 2023' },
            { action: 'Reseña enviada a Laura Vintage', pts: '+25 pts', date: '10 Oct 2023' },
            { action: 'Publicación de nueva prenda (Blazer Lino)', pts: '+50 pts', date: '08 Oct 2023' },
            { action: 'Bono de Bienvenida ReVuelta', pts: '+500 pts', date: '01 Oct 2023' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fdf9f0] border-b border-[#f1eee5] last:border-0">
              <div>
                <p className="font-bold text-[#1c1c16]">{item.action}</p>
                <p className="text-[11px] text-[#707974]">{item.date}</p>
              </div>
              <span className="font-mono-code font-bold text-[#004634]">{item.pts}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
