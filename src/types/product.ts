// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  flavor?: string;
  selectedFlavor?: string;
  flavors?: string[]; // Adicionado para suportar múltiplos sabores como string separada por vírgulas
  unavailableFlavors?: string[]; // Adicionado para sabores indisponíveis
  isBestSeller?: boolean;
  badge?: string;
  nutritionInfoImage?: string;

  // 🔽 Campos adicionados para cálculo de frete (Melhor Envio)
  weight?: number;   // peso em kg
  width?: number;    // largura em cm
  height?: number;   // altura em cm
  length?: number;   // comprimento em cm
}

export interface CartItem extends Product {
  quantity: number;
}
