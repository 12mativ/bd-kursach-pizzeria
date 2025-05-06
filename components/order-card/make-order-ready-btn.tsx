"use client";

import { makeOrderReady } from "@/app/(main)/orders/actions";
import { IOrder } from "@/app/(main)/orders/page";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

export const MakeOrderReadyButton = ({order}: {order: IOrder}) => {
  return (
    <Button
      className="flex gap-x-2 items-center cursor-pointer bg-green-600 hover:bg-green-700"
      onClick={() => makeOrderReady({ orderId: order.id })}
    >
      <p>Отметить готовым</p>
      <Check />
    </Button>
  );
};
