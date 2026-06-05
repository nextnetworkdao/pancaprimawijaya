import React, { createContext, useContext, useState } from 'react';
import { Product } from './types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  clearCartBySite: (site: 'panca' | 'sensor') => void;
  totalItems: number;
  totalPrice: number;
  getItemsBySite: (site: 'panca' | 'sensor') => CartItem[];
  getTotalItemsBySite: (site: 'panca' | 'sensor') => number;
  getTotalPriceBySite: (site: 'panca' | 'sensor') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems(curr => {
      const existing = curr.find(i => i.product.id === product.id);
      if (existing) {
        return curr.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...curr, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(curr => curr.filter(i => i.product.id !== productId));
  };

  const clearCart = () => setItems([]);
  const clearCartBySite = (site: 'panca' | 'sensor') => setItems(curr => curr.filter(i => (i.product.site || 'panca') !== site));

  const getItemsBySite = (site: 'panca' | 'sensor') => items.filter(i => (i.product.site || 'panca') === site);
  const getTotalItemsBySite = (site: 'panca' | 'sensor') => getItemsBySite(site).reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPriceBySite = (site: 'panca' | 'sensor') => getItemsBySite(site).reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, clearCartBySite, totalItems, totalPrice, getItemsBySite, getTotalItemsBySite, getTotalPriceBySite }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
