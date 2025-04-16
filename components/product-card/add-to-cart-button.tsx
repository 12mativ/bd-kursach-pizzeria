"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { IProductInfo } from "./product-card";

export const AddToCartButton = ({ product }: { product: IProductInfo }) => {
  const { onOpen } = useModal();
  
  return (
    <Button
      className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
      onClick={() => {
        onOpen("selectProduct", { productData : product });
      }}
    >
      Выбрать
    </Button>
  );
};
