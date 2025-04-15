"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IPizzaInfo } from "../pizza-card/pizza-card";

type CartContextType = {
  cart: IPizzaInfo[];
  addToCart: (pizza: IPizzaInfo) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<IPizzaInfo[]>([]);

  const addToCart = (pizza: IPizzaInfo) => {
    setCart((prevCart) => {
      // const existingPizza = prevCart.find((item) => item.id === pizza.id);
      // if (existingPizza) {
      //   return prevCart.map((item) =>
      //     item.id === pizza.id
      //       ? { ...item, quantity: item.quantity + pizza.quantity }
      //       : item
      //   );
      // }
      return [...prevCart, pizza];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};