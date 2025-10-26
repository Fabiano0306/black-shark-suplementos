import { ShoppingCart, Info } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, resetShipping } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [showNutrition, setShowNutrition] = useState(false);

  const handleAddToCart = () => {
    if (product.flavors?.length > 0) {
      if (!selectedFlavor) {
        toast.error('Selecione um sabor antes de adicionar ao carrinho!');
        return;
      }

      if (product.unavailableFlavors?.includes(selectedFlavor)) {
        toast.error('Este sabor está indisponível!');
        return;
      }
    }

    resetShipping?.();

    addToCart({
      ...product,
      flavor: selectedFlavor || null,
    });

    toast.success('Produto adicionado ao carrinho!');
  };

  const isFlavorUnavailable = (flavor: string) =>
    product.unavailableFlavors?.includes(flavor);

  return (
    <div
      className="
        relative bg-gradient-to-b from-[#111] to-[#1a1a1a]
        border border-[#2a2a2a]/70 rounded-2xl overflow-hidden
        p-5 group shadow-[0_0_12px_rgba(0,0,0,0.3)]
        transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]
        hover:border-[#3a3a3a]
      "
    >
      {product.badge && (
        <Badge
          className="
            absolute top-3 right-3 z-10
            text-white font-bold text-xs px-2 py-1 rounded-full
            bg-gradient-to-r from-red-700 via-orange-500 to-yellow-400
            shadow-[0_0_20px_rgba(255,100,0,0.7)]
            relative overflow-hidden
            animate-firePulse
          "
        >
          <span className="relative z-10">{product.badge}</span>
          <span
            className="
              absolute inset-0 opacity-70 blur-[6px]
              bg-gradient-to-t from-red-700 via-orange-400 to-yellow-300
              animate-flame
            "
          ></span>
        </Badge>
      )}

      {/* Imagem principal */}
      <div className="relative h-44 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        />
      </div>

      {/* Conteúdo */}
      <div className="text-center space-y-3">
        <h3 className="text-base font-extrabold text-white tracking-wide leading-snug group-hover:text-[#00ffff] transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-400 leading-snug min-h-[3rem]">
            {product.description}
          </p>
        )}

        {product.flavors && product.flavors.length > 0 && (
          <div className="mt-2">
            <label className="block text-sm text-[#00ffff] font-semibold mb-1">
              Selecione o sabor:
            </label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="
                w-full bg-[#1a1a1a] text-white border border-[#333]
                rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ffff]
              "
            >
              <option value="">-- Escolha um sabor --</option>

              {product.flavors.map((flavor) => (
                <option
                  key={flavor}
                  value={flavor}
                  disabled={isFlavorUnavailable(flavor)}
                >
                  {flavor} {isFlavorUnavailable(flavor) && '(Indisponível)'}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4">
          <div className="flex justify-center items-baseline gap-1 mb-3">
            <span className="text-lg text-[#00ffff] font-extrabold">R$</span>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
              {product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddToCart}
              disabled={
                product.flavors?.length > 0 &&
                (!selectedFlavor || isFlavorUnavailable(selectedFlavor))
              }
              className={`
                w-full py-3
                bg-gradient-to-r from-[#00ffff] to-[#0077ff]
                text-black font-bold uppercase tracking-wide rounded-lg
                shadow-[0_0_15px_rgba(0,255,255,0.4)]
                flex items-center justify-center gap-2
                transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]
                ${
                  product.flavors?.length > 0 &&
                  (!selectedFlavor || isFlavorUnavailable(selectedFlavor))
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
              `}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              <ShoppingCart className="w-5 h-5" />
              Comprar
            </button>

            {/* Botão de informações nutricionais */}
            {product.nutritionInfoImage && (
                <button
                onClick={() => setShowNutrition(true)}
                className="
                  w-full py-2 text-sm rounded-lg border border-[#00ffff]/40
                  text-[#00ffff] font-semibold tracking-wide
                  hover:bg-[#00ffff]/10 hover:border-[#00ffff]
                  transition-all duration-300 flex items-center justify-center gap-2
                "
                >
                <Info className="w-4 h-4" />
                Nutricional
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de informações nutricionais */}
      {showNutrition && (
        <div
          className="
            fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50
            animate-fadeIn
          "
          onClick={() => setShowNutrition(false)}
        >
          <div
            className="bg-[#111] border border-[#00ffff]/30 rounded-xl p-4 max-w-md w-[90%] shadow-[0_0_30px_rgba(0,255,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-[#00ffff] text-lg font-bold mb-3 text-center">
              Informação Nutricional
            </h4>
            <img
              src={product.nutritionInfoImage}
              alt={`Informação nutricional de ${product.name}`}
              className="w-full rounded-lg border border-[#00ffff]/20"
            />
            <button
              onClick={() => setShowNutrition(false)}
              className="
                w-full mt-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#00ffff] to-[#0077ff]
                text-black font-bold uppercase tracking-wide
                shadow-[0_0_15px_rgba(0,255,255,0.4)]
                hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition-all
              "
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
