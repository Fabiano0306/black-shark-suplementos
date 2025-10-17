import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

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
      {/* Badge de Mais Vendido */}
      {product.isBestSeller && (
        <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs px-2 py-1 rounded-full shadow-md">
          ⚡ Mais Vendido
        </Badge>
      )}

      {/* Imagem do Produto */}
      <div className="relative h-44 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        />
      </div>

      {/* Informações do Produto */}
      <div className="text-center space-y-3">
        <h3 className="text-base font-extrabold text-white tracking-wide leading-snug group-hover:text-[#00ffff] transition-colors min-h-[2.5rem]">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-400 leading-snug min-h-[3rem]">
            {product.description}
          </p>
        )}

        {/* Preço + Botão */}
        <div className="mt-4">
          <div className="flex justify-center items-baseline gap-1 mb-3">
            <span className="text-lg text-[#00ffff] font-extrabold">R$</span>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
              {product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="
  w-full py-3 mt-1
  bg-gradient-to-r from-[#00ffff] to-[#0077ff]
  text-black font-bold uppercase tracking-wide rounded-lg
  shadow-[0_0_15px_rgba(0,255,255,0.4)]
  flex items-center justify-center gap-2
  transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,255,255,0.7)]
"

            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <ShoppingCart className="w-5 h-5" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
