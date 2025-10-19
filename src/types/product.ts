// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  isBestSeller?: boolean;

  // 🔽 Campos adicionados para cálculo de frete (Melhor Envio)
  weight?: number;   // peso em kg
  width?: number;    // largura em cm
  height?: number;   // altura em cm
  length?: number;   // comprimento em cm
}

export interface CartItem extends Product {
  quantity: number;
}
