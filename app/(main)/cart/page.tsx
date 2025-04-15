"use client";

import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { IPizzaInfo } from "@/components/pizza-card/pizza-card";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    var sum = 0;
    cart.forEach((el) => sum += Number(el.price));

    setTotalAmount(sum);
  }, [cart])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Корзина ({totalAmount} ₽)</h1>

        {cart.length > 0 && (
          <Button
            onClick={clearCart}
            className="flex items-center gap-x-2 bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
          >
            <p>Очистить корзину</p>
            <Trash2 />
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-neutral-400">Корзина пуста.</p>
      ) : (
        <div className="flex flex-col gap-y-3">
          {cart.map((pizza: IPizzaInfo) => (
            <div
              key={nanoid()}
              className="flex gap-x-4 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800"
            >
              {pizza.imageUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${pizza.imageUrl}`}
                  alt={pizza.name}
                  className="w-[100px] h-fit"
                />
              )}
              <div>
                <p className="text-indigo-400 text-lg">{pizza.name}</p>
                <p className="text-neutral-400 text-sm">{pizza.size === "small" ? "25 см" : pizza.size === "medium" ? "30 см" : "35 см"}</p>
                <p className="font-bold mt-2">{pizza.price} ₽</p>
                <Button onClick={() => removeFromCart(pizza.id)} className="bg-red-500 hover:bg-red-600 cursor-pointer">
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
