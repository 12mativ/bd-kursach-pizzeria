"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { IPizzaInfo } from "./pizza-card";

export const AddToCartButton = ({ pizza }: { pizza: IPizzaInfo }) => {
  const { onOpen } = useModal();
  
  return (
    <Button
      className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
      onClick={() => {
        onOpen("selectPizza", { pizzaData: pizza });
      }}
    >
      Выбрать
    </Button>
  );
};
