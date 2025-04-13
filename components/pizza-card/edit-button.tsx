"use client";

import { Edit } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IPizzaInfo } from "./pizza-card";

export const EditButton = ({ pizza }: { pizza: IPizzaInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
      onClick={() => onOpen("editPizza", { pizzaData: pizza })}
    >
      <p>Редактировать</p>
      <Edit className="w-4 h-4" />
    </Button>
  );
};
