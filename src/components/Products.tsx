import { useState, useRef, useEffect } from 'react';
import { products, categories } from '@/data/products';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Detecta se há espaço para rolar
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (el) {
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
      }
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const amount = 200;
      el.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="produtos" className="py-20 bg-shark-black relative">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="mb-12 animate-fade-in text-left md:text-center">
          <h2 className="section-title">NOSSOS PRODUTOS</h2>
          <p className="text-shark-gray-light mt-4 text-lg">
            Selecione os melhores suplementos para seus objetivos
          </p>
        </div>

        {/* Filtro de Categorias */}
        <div className="mb-12 animate-slide-up relative">
          {/* Botão Esquerdo */}
          <button
            onClick={() => scroll('left')}
            className={`hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-shark-gray-dark/70 hover:bg-shark-gray transition-opacity duration-300 z-10 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="text-shark-white" size={20} />
          </button>

          {/* Wrapper com rolagem horizontal */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide px-2 sm:px-0"
          >
            <div className="flex gap-3 w-max mx-auto pb-3">
              {/* Botão "Todos" */}
              <button
  onClick={() => setSelectedCategory('Todos')}
  className={`px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap
    ${
      selectedCategory === 'Todos'
        ? 'bg-gradient-to-r from-[#00ffff] to-[#0077ff] text-white shadow-[0_0_18px_rgba(0,200,255,0.6)] scale-[1.03]'
        : 'bg-[#0f172a] text-white hover:bg-[#1e293b] hover:shadow-[0_0_15px_rgba(0,200,255,0.4)]'
    }`}
>
  Todos
</button>

              {/* Demais Categorias */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-shark-white text-shark-black'
                      : 'bg-shark-gray-dark text-shark-white hover:bg-shark-gray'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Botão Direito */}
          <button
            onClick={() => scroll('right')}
            className={`hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-shark-gray-dark/70 hover:bg-shark-gray transition-opacity duration-300 z-10 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="text-shark-white" size={20} />
          </button>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Caso não haja produtos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-shark-gray-light text-lg">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
