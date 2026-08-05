import React, { useState } from 'react';
import { Garment, Review, ViewMode } from '../types';
import { GarmentCard } from '../components/GarmentCard';
import { ReviewModal } from '../components/ReviewModal';

interface ProfileViewProps {
  garments: Garment[];
  reviews: Review[];
  onSelectGarment: (garment: Garment) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (garment: Garment, e: React.MouseEvent) => void;
  onProposeSwap: (garment: Garment, e: React.MouseEvent) => void;
  onAddReview: (review: Review) => void;
  onNavigate: (view: ViewMode) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  garments,
  reviews,
  onSelectGarment,
  onToggleFavorite,
  onAddToCart,
  onProposeSwap,
  onAddReview,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'garments' | 'reviews'>('garments');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Filter garments belonging to Laura Vintage
  const lauraGarments = garments.filter(
    (g) => g.seller.handle === '@laura_vintage' || g.seller.name.includes('Laura')
  );

  const handleReviewSubmit = (rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev_${Date.now()}`,
      author: 'Usuario ReVuelta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
      rating,
      date: 'Hace un momento',
      comment,
      itemName: 'Transacción ReVuelta'
    };
    onAddReview(newReview);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl border border-[#d4c7b0] shadow-xs overflow-hidden">
        
        {/* Cover Photo */}
        <div className="h-40 bg-gradient-to-r from-[#004634] via-[#1f5e4a] to-[#004634] relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-mono-code font-bold px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#fe744b]">verified</span>
            <span>Vendedor Verificado</span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 pt-0 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                alt="Laura Vintage"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-md bg-white"
              />
              <div className="space-y-0.5">
                <h1 className="text-2xl font-black text-[#1c1c16] flex items-center gap-2">
                  <span>Laura Vintage</span>
                  <span className="material-symbols-outlined text-[#004634] text-xl fill">check_circle</span>
                </h1>
                <p className="text-xs font-mono-code text-[#707974]">@laura_vintage • Bogotá D.C.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-[#f1eee5] text-[#1c1c16] border border-[#bfc9c3]'
                    : 'bg-[#004634] text-white hover:bg-[#1f5e4a]'
                }`}
              >
                {isFollowing ? 'Siguiendo' : 'Seguir Perfil'}
              </button>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#a93712] hover:bg-[#8e2e0e] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">rate_review</span>
                <span>Calificar Experiencia</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-[#404944] max-w-2xl leading-relaxed mb-6">
            Apasionada por la moda circular y coleccionista de piezas vintage de los 80s/90s. Todas mis prendas son revisadas, higienizadas y listas para una segunda vida sostenible.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#f1eee5]">
            <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-center">
              <span className="block text-xl font-black text-[#004634] font-mono-code">15</span>
              <span className="text-[11px] text-[#707974]">Ventas exitosas</span>
            </div>
            <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-center">
              <span className="block text-xl font-black text-[#a93712] font-mono-code">8</span>
              <span className="text-[11px] text-[#707974]">Trueques realizados</span>
            </div>
            <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-center">
              <span className="block text-xl font-black text-[#1c1c16] font-mono-code flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-base text-[#a93712] fill">star</span>
                <span>4.8</span>
              </span>
              <span className="text-[11px] text-[#707974]">{reviews.length} valoraciones</span>
            </div>
            <div className="bg-[#fdf9f0] p-3 rounded-2xl border border-[#d4c7b0]/60 text-center">
              <span className="block text-xl font-black text-[#004634] font-mono-code">124 kg</span>
              <span className="text-[11px] text-[#707974]">CO2 Reducido</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-[#d4c7b0] pb-2">
        <button
          onClick={() => setActiveTab('garments')}
          className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'garments'
              ? 'border-[#004634] text-[#004634]'
              : 'border-transparent text-[#707974] hover:text-[#1c1c16]'
          }`}
        >
          Prendas Publicadas ({lauraGarments.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 text-xs font-bold transition-all cursor-pointer border-b-2 ${
            activeTab === 'reviews'
              ? 'border-[#004634] text-[#004634]'
              : 'border-transparent text-[#707974] hover:text-[#1c1c16]'
          }`}
        >
          Reseñas de la Comunidad ({reviews.length})
        </button>
      </div>

      {/* Garments Tab Content */}
      {activeTab === 'garments' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lauraGarments.map((garment) => (
            <GarmentCard
              key={garment.id}
              garment={garment}
              onSelect={onSelectGarment}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onProposeSwap={onProposeSwap}
            />
          ))}
        </div>
      )}

      {/* Reviews Tab Content */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-3xl border border-[#d4c7b0] shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-[#004634]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c16]">{rev.author}</h4>
                    <p className="text-[10px] text-[#707974]">{rev.date} • {rev.itemName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-[#a93712]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm fill">star</span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#404944] leading-relaxed pl-12">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleReviewSubmit}
        sellerName="Laura Vintage"
      />

    </div>
  );
};
