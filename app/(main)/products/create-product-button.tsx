"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export default function CreatePizzaButton() {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("createProduct")}
      className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer w-fit"
    >
      Добавить продукт +
    </Button>
  );
}
