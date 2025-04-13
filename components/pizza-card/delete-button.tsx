"use client";

import { Trash2 } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IPizzaInfo } from "./pizza-card";

export const DeleteButton = ({ pizza }: { pizza: IPizzaInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-neutral-700 hover:bg-rose-600 cursor-pointer"
      onClick={() => onOpen("deletePizza", { pizzaData: pizza })}
    >
      <p>Удалить</p>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};
