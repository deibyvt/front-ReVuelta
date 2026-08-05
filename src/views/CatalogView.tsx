import React, { useState, useMemo } from 'react';
import { Garment, GarmentSize, GarmentCondition, ViewMode } from '../types';
import { GarmentCard } from '../components/GarmentCard';

interface CatalogViewProps {
  garments: Garment[];
  searchQuery: string;
  onSelectGarment: (garment: Garment) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (garment: Garment, e: React.MouseEvent) => void;
  onProposeSwap: (garment: Garment, e: React.MouseEvent) => void;
  onOpenPublishModal: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  garments,
  searchQuery,
  onSelectGarment,
  onToggleFavorite,
  onAddToCart,
  onProposeSwap,
  onOpenPublishModal,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedSize, setSelectedSize] = useState<string>('Todas');
  const [selectedCondition, setSelectedCondition] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<string>('recientes');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter logic
  const filteredGarments = useMemo(() => {
    return garments.filter((g) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = g.title.toLowerCase().includes(q);
        const matchesBrand = g.brand?.toLowerCase().includes(q);
        const matchesSeller = g.seller.name.toLowerCase().includes(q) || g.seller.handle.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesSeller) return false;
      }

      // Category
      if (selectedCategory !== 'Todas') {
        if (selectedCategory === 'Swap Zone' && g.type === 'Compra') return false;
        if (selectedCategory === 'Mujer' && g.category !== 'Women') return false;
        if (selectedCategory === 'Hombre' && g.category !== 'Men') return false;
        if (selectedCategory === 'Niños' && g.category !== 'Kids') return false;
      }

      // Type
      if (selectedType !== 'Todos') {
        if (selectedType === 'Compra' && g.type === 'Trueque') return false;
        if (selectedType === 'Trueque' && g.type === 'Compra') return false;
      }

      // Size
      if (selectedSize !== 'Todas' && g.size !== selectedSize) return false;

      // Condition
      if (selectedCondition !== 'Todas' && g.condition !== selectedCondition) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio_asc') return a.price - b.price;
      if (sortBy === 'precio_desc') return b.price - a.price;
      if (sortBy === 'co2') return (b.co2SavedKg || 0) - (a.co2SavedKg || 0);
      return 0; // recientes
    });
  }, [garments, searchQuery, selectedCategory, selectedType, selectedSize, selectedCondition, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#004634] via-[#1f5e4a] to-[#004634] text-white p-6 sm:p-10 shadow-lg border border-[#97d5bc]/30">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#fe744b]/20 text-[#fe744b] px-3 py-1 rounded-full text-xs font-bold border border-[#fe744b]/40 font-mono-code">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>Últimos descubrimientos sostenibles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sans">
            Dale otra vuelta a tu estilo sin dejar huella.
          </h1>

          <p className="text-sm sm:text-base text-[#bfc9c3] leading-relaxed">
            Explora prendas únicas verificadas por la comunidad. Compra con ahorro consciente o propón un trueque directo sin dinero de por medio.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenPublishModal}
              className="bg-[#fe744b] hover:bg-[#a93712] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">add_circle</span>
              <span>Publicar Prenda (+50 Pts)</span>
            </button>
            <button
              onClick={() => onNavigate('loyalty')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all border border-white/30 flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#fe744b]">stars</span>
              <span>Conoce tus Puntos ReVuelta</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Card */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-3">
          <div className="flex items-center justify-between text-[#97d5bc] font-mono-code">
            <span>CO2 Ahorrado hoy</span>
            <span className="font-bold text-white">+142.8 kg</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="bg-[#fe744b] h-full w-[72%] rounded-full"></div>
          </div>
          <p className="text-[11px] text-[#bfc9c3] leading-snug">
            Equivalente a plantar 18 árboles urbanos en Bogotá. ¡Suma tus prendas hoy!
          </p>
        </div>
      </section>

      {/* Filter and Categories Section */}
      <section className="space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['Todas', 'Mujer', 'Hombre', 'Niños', 'Swap Zone', 'Top Brands'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#004634] text-white shadow-sm'
                  : 'bg-white text-[#404944] border border-[#d4c7b0] hover:bg-[#f1eee5]'
              }`}
            >
              {cat === 'Swap Zone' && <span className="material-symbols-outlined text-xs mr-1 text-[#fe744b]">sync_alt</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#d4c7b0]/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#1c1c16] font-mono-code mr-1">Filtros:</span>

            {/* Modalidad */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#fdf9f0] border border-[#d4c7b0] text-[#1c1c16] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#004634]"
            >
              <option value="Todos">Tipo: Todos</option>
              <option value="Compra">Solo Compra</option>
              <option value="Trueque">Solo Trueque</option>
            </select>

            {/* Talla */}
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-[#fdf9f0] border border-[#d4c7b0] text-[#1c1c16] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#004634]"
            >
              <option value="Todas">Talla: Todas</option>
              <option value="XS">Talla XS</option>
              <option value="S">Talla S</option>
              <option value="M">Talla M</option>
              <option value="L">Talla L</option>
              <option value="XL">Talla XL</option>
            </select>

            {/* Estado */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="bg-[#fdf9f0] border border-[#d4c7b0] text-[#1c1c16] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#004634]"
            >
              <option value="Todas">Estado: Todos</option>
              <option value="Nuevo con etiquetas">Nuevo con etiqueta</option>
              <option value="Como nuevo">Como nuevo</option>
              <option value="Buen estado">Buen estado</option>
            </select>

            {/* Reset Filters */}
            {(selectedCategory !== 'Todas' || selectedSize !== 'Todas' || selectedCondition !== 'Todas' || selectedType !== 'Todos' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedSize('Todas');
                  setSelectedCondition('Todas');
                  setSelectedType('Todos');
                }}
                className="text-[#a93712] font-bold hover:underline ml-1"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#707974]">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#fdf9f0] border border-[#d4c7b0] text-[#1c1c16] font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#004634]"
            >
              <option value="recientes">Más Recientes</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="co2">Mayor CO2 Ahorrado</option>
            </select>
          </div>

        </div>

      </section>

      {/* Garments Grid Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#1c1c16] tracking-tight">
          Prendas disponibles ({filteredGarments.length})
        </h2>
        <span className="text-xs text-[#707974] font-mono-code">
          Mostrando catálogo en Bogotá & Envíos Nacionales
        </span>
      </div>

      {/* Grid */}
      {filteredGarments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGarments.map((garment) => (
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
      ) : (
        <div className="bg-white p-12 rounded-3xl text-center border border-[#d4c7b0] space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#f1eee5] flex items-center justify-center mx-auto text-[#707974]">
            <span className="material-symbols-outlined text-3xl">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-[#1c1c16]">No encontramos prendas con esos filtros</h3>
          <p className="text-xs text-[#707974] max-w-md mx-auto">
            Prueba ajustando los filtros de búsqueda o sé la primera persona en publicar una prenda en esta categoría.
          </p>
          <button
            onClick={onOpenPublishModal}
            className="bg-[#004634] text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#1f5e4a]"
          >
            Publicar Prenda
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredGarments.length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl border border-[#d4c7b0] bg-white text-xs font-bold text-[#1c1c16] disabled:opacity-40 hover:bg-[#f1eee5] cursor-pointer"
          >
            Anterior
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold font-mono-code transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#004634] text-white'
                  : 'bg-white text-[#404944] border border-[#d4c7b0] hover:bg-[#f1eee5]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-2 rounded-xl border border-[#d4c7b0] bg-white text-xs font-bold text-[#1c1c16] hover:bg-[#f1eee5] cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}

    </div>
  );
};
