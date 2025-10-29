import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/product';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, flavor: string | undefined, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  resetShipping: () => void;
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

  const resetShipping = () => {
    localStorage.removeItem('blackshark-shipping');
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.flavor === product.flavor
      );

      toast.dismiss(); // evita duplicação de popups

      if (existingItem) {
        toast.success('Quantidade atualizada no carrinho!', {
          description: `${product.name} (${product.flavor || 'Padrão'})`,
        });
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

      toast.success('Produto adicionado ao carrinho!', {
        description: `${product.name} (${product.flavor || 'Padrão'})`,
      });

      return [...prevCart, productWithDefaults];
    });

    resetShipping();
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.flavor === flavor))
    );
    toast.dismiss();
    toast.success('Produto removido do carrinho!');
    resetShipping();
  };

  const updateQuantity = (productId: string, flavor: string | undefined, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === productId && item.flavor === flavor) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) {
              toast.dismiss();
              toast.success('Produto removido do carrinho!');
              return null;
            }
            toast.dismiss();
            toast.success('Quantidade atualizada no carrinho!');
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      resetShipping();
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.dismiss();
    toast.success('Carrinho limpo!');
    resetShipping();
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
        resetShipping,
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
