import React, { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (rating: number, comment: string) => void;
  sellerName?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  sellerName = 'Laura Vintage'
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Prenda en excelente estado', 'Punto de acopio rápido']);

  if (!isOpen) return null;

  const availableTags = [
    'Prenda en excelente estado',
    'Punto de acopio rápido',
    'Comunicación fluida',
    'Empaque 100% ecológico',
    'Fiel a la foto'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalComment = selectedTags.length > 0 
      ? `${selectedTags.join(', ')}. ${comment}` 
      : comment;
    onSubmitReview(rating, finalComment || '¡Excelente experiencia de moda circular!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#d4c7b0] animate-modal p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#fe744b]">rate_review</span>
            <div>
              <h3 className="text-lg font-bold text-[#1c1c16]">Califica tu experiencia</h3>
              <p className="text-xs text-[#707974]">Transacción realizada con {sellerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1eee5] text-[#707974] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 5 Star Picker */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#fdf9f0] rounded-2xl border border-[#d4c7b0]/60">
            <span className="text-xs font-bold text-[#404944] mb-2 uppercase tracking-wider font-mono-code">
              ¿Cuántas estrellas le das?
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-125"
                >
                  <span className={`material-symbols-outlined text-3xl ${
                    (hoverRating || rating) >= star ? 'text-[#a93712] fill' : 'text-[#bfc9c3]'
                  }`}>
                    star
                  </span>
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[#a93712] mt-1 font-mono-code">
              {rating === 5 ? '¡Excelente!' : rating === 4 ? 'Muy buena' : rating === 3 ? 'Aceptable' : 'Mejorable'}
            </span>
          </div>

          {/* Tag Pills */}
          <div>
            <label className="block text-xs font-bold text-[#404944] mb-2">
              Destacados de la transacción:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#004634] text-white border-[#004634]'
                        : 'bg-[#f1eee5] text-[#404944] border-[#bfc9c3] hover:border-[#004634]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold text-[#404944] mb-1">
              Comentario adicional (opcional)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe detalles adicionales para la comunidad ReVuelta..."
              className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl p-3 text-xs focus:outline-none focus:border-[#004634]"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-[#d4c7b0] text-xs font-bold text-[#707974] hover:bg-[#f1eee5]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-[#004634] hover:bg-[#1f5e4a] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Enviar Reseña (+25 pts)
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
