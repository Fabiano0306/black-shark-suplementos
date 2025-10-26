import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  resetShipping: () => void; // ✅ Novo
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('blackshark-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('blackshark-cart', JSON.stringify(cart));
  }, [cart]);

  // ✅ Novo método para resetar o frete salvo
  const resetShipping = () => {
    localStorage.removeItem('blackshark-shipping');
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.flavor === product.flavor
      );

      if (existingItem) {
        toast.success('Quantidade atualizada no carrinho!');
        return prevCart.map((item) =>
          item.id === product.id && item.flavor === product.flavor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const productWithDefaults = {
        ...product,
        quantity: 1,
        weight: product.weight ?? 0.5,
        width: product.width ?? 15,
        height: product.height ?? 10,
        length: product.length ?? 20,
      };

      toast.success('Produto adicionado ao carrinho!');
      return [...prevCart, productWithDefaults];
    });

    resetShipping(); // ✅ Sempre que adicionar item, reseta o frete
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success('Produto removido do carrinho');
    resetShipping(); // ✅ Reseta o frete
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) {
              toast.success('Produto removido do carrinho');
              return null;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      resetShipping(); // ✅ Reseta o frete ao alterar quantidade
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Carrinho limpo!');
    resetShipping(); // ✅ Reseta frete também
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        resetShipping, // ✅ Exportado
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
