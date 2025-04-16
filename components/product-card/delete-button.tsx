"use client";

import { Trash2 } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IProductInfo } from "./product-card";

export const DeleteButton = ({ product }: { product: IProductInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-neutral-700 hover:bg-rose-600 cursor-pointer"
      onClick={() => onOpen("deleteProduct", { productData : product })}
    >
      <p>Удалить</p>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};
