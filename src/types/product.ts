export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
