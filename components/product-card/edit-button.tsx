"use client";

import { Edit } from "lucide-react";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IProductInfo } from "./product-card";

export const EditButton = ({ product }: { product: IProductInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
      onClick={() => onOpen("editProduct", { productData : product })}
    >
      <p>Редактировать</p>
      <Edit className="w-4 h-4" />
    </Button>
  );
};
