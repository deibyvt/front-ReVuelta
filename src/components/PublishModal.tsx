import React, { useState } from 'react';
import { Garment, GarmentSize, GarmentCondition, ListingType } from '../types';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newGarment: Garment) => void;
}

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'
];

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onPublish
}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(45000);
  const [type, setType] = useState<ListingType>('Ambos');
  const [size, setSize] = useState<GarmentSize>('M');
  const [condition, setCondition] = useState<GarmentCondition>('Como nuevo');
  const [category, setCategory] = useState<'Women' | 'Men' | 'Kids'>('Women');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [certified, setCertified] = useState(true);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  if (!isOpen) return null;

  const handleAiDescription = () => {
    if (!title) return;
    setIsGeneratingAi(true);
    setTimeout(() => {
      setDescription(
        `Hermosa prenda "${title}" en estado ${condition}. Confeccionada con materiales duraderos y pensada para la economía circular. Ideal para combinar en outfits casuales o formales.`
      );
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newGarment: Garment = {
      id: `g_new_${Date.now()}`,
      title,
      price: type === 'Trueque' ? 0 : price,
      type,
      size,
      condition,
      category,
      brand: brand || 'Comunidad ReVuelta',
      image: selectedImage,
      description: description || 'Prenda en excelente estado publicada recientemente.',
      ecoBadge: 'Prenda ReVuelta Verificada',
      co2SavedKg: Math.round((Math.random() * 10 + 5) * 10) / 10,
      seller: {
        name: 'Laura Vintage',
        handle: '@laura_vintage',
        rating: 4.8,
        salesCount: 16
      },
      isFavorite: false
    };

    onPublish(newGarment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#d4c7b0] animate-modal my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#004634] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#fe744b]">add_circle</span>
            <div>
              <h2 className="text-lg font-bold">Publicar nueva prenda</h2>
              <p className="text-xs text-[#97d5bc]">Súmate a la moda circular y gana puntos ReVuelta</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Photos Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#404944] mb-2 font-mono-code">
              Fotografía Principal de la Prenda
            </label>
            <div className="grid grid-cols-5 gap-2.5">
              {SAMPLE_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedImage === img
                      ? 'border-[#004634] ring-2 ring-[#004634]/30 scale-95'
                      : 'border-[#d4c7b0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Prenda muestra" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">
                Nombre de la prenda *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Blazer Lino Vintage"
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#004634]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">
                Marca (Opcional)
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ej. Zara, Levi's, Vintage..."
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#004634]"
              />
            </div>
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">
                Modalidad de Publicación
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ListingType)}
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#004634]"
              >
                <option value="Ambos">Venta o Trueque (Recomendado)</option>
                <option value="Compra">Solo Venta</option>
                <option value="Trueque">Solo Trueque</option>
              </select>
            </div>

            {type !== 'Trueque' && (
              <div>
                <label className="block text-xs font-bold text-[#1c1c16] mb-1">
                  Precio estimado (COP)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-3.5 py-2.5 text-sm font-mono-code focus:outline-none focus:border-[#004634]"
                />
              </div>
            )}
          </div>

          {/* Category, Size, Condition */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#004634]"
              >
                <option value="Women">Mujer</option>
                <option value="Men">Hombre</option>
                <option value="Kids">Niños</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">Talla</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as GarmentSize)}
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#004634]"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1c1c16] mb-1">Estado</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as GarmentCondition)}
                className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-[#004634]"
              >
                <option value="Nuevo con etiquetas">Nuevo c/etiqueta</option>
                <option value="Como nuevo">Como nuevo</option>
                <option value="Buen estado">Buen estado</option>
                <option value="Usado">Usado en buen estado</option>
              </select>
            </div>
          </div>

          {/* Description & AI Button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#1c1c16]">
                Descripción de la prenda
              </label>
              <button
                type="button"
                onClick={handleAiDescription}
                disabled={isGeneratingAi || !title}
                className="text-[11px] font-bold text-[#004634] hover:text-[#1f5e4a] flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm text-[#fe744b]">auto_awesome</span>
                <span>{isGeneratingAi ? 'Generando...' : 'Auto-completar con IA'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe detalles de ajuste, tela, origen o conservación..."
              className="w-full bg-[#fdf9f0] border border-[#d4c7b0] rounded-xl p-3 text-sm focus:outline-none focus:border-[#004634]"
            />
          </div>

          {/* Quality Certification */}
          <div className="flex items-center gap-3 bg-[#f1eee5] p-3 rounded-xl border border-[#bfc9c3]">
            <input
              type="checkbox"
              id="certify"
              checked={certified}
              onChange={(e) => setCertified(e.target.checked)}
              className="w-4 h-4 text-[#004634] rounded accent-[#004634]"
            />
            <label htmlFor="certify" className="text-xs text-[#404944] leading-snug cursor-pointer">
              Certifico que esta prenda está en condiciones higiénicas óptimas y coincide con las fotos proporcionadas para los puntos de acopio.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#d4c7b0] text-xs font-bold text-[#707974] hover:bg-[#f1eee5]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!certified || !title}
              className="px-6 py-2.5 rounded-full bg-[#004634] hover:bg-[#1f5e4a] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              Publicar Prenda (+50 pts)
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
