"use client";

import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { IProductInfo } from "@/components/product-card/product-card";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "sonner";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const { token, userInfo } = useAuth();

  const handleCreateOrder = async () => {
    var body = {
      items: cart.map((el) => ({
        product_id: el.id,
        quantity: el.quantity,
        variant_name: el.size,
      })),
      clientId: userInfo?.clientId,
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      toast("Заказ успешно созадан!")
      clearCart();
    }).catch(() => {
      toast("Произошла ошибка при создании заказа.")
    });
  };

  useEffect(() => {
    var sum = 0;
    cart.forEach((el) => (sum += Number(el.price * el.quantity)));

    setTotalAmount(sum);
  }, [cart]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">
          Корзина ({totalAmount} ₽)
        </h1>

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
          {cart.map((pizza: IProductInfo) => (
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
                <p className="text-neutral-400 text-sm">
                  {pizza.productType === "PIZZA"
                    ? pizza.size === "small"
                      ? "25 см"
                      : pizza.size === "medium"
                      ? "30 см"
                      : "35 см"
                    : pizza.size === "small"
                    ? "0.25 л"
                    : pizza.size === "medium"
                    ? "0.35 л"
                    : "0.4 л"}
                </p>
                <p className="text-neutral-400 text-sm">{pizza.quantity} шт.</p>
                <p className="font-bold mt-2">
                  {pizza.price * pizza.quantity} ₽
                </p>
                <Button
                  onClick={() => removeFromCart(pizza.id)}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer w-fit self-center"
            onClick={handleCreateOrder}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </div>
  );
}
