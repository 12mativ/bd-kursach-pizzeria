"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { useCart } from "../providers/cart-provider";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export const SelectPizzaModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { addToCart } = useCart();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isModalOpen = isOpen && type === "selectProduct";

  const handlePriceChanged = (value: string) => {
    var result;

    switch (value) {
      case "small":
        result = 1;
        break;
      case "medium":
        result = 1.5;
        break;
      case "large":
        result = 2;
        break;
      default:
        result = 1;
        break;
    }

    if (data.productData?.price) {
      setPrice(data.productData?.price * result);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToCart({
      id: data.productData!.id!,
      name: data.productData!.name!,
      description: data.productData!.description!,
      imageUrl: data.productData?.imageUrl!,
      //@ts-expect-error: size IS in target
      size: e.target.size.value,
      productType: data.productData?.productType as "PIZZA" | "DRINK",
      quantity,
      price,
    });
    setQuantity(1);
    onClose();
  };

  useEffect(() => {
    if (data.productData?.price) {
      setPrice(data.productData.price);
    }
  }, [isModalOpen, data.productData?.price]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="block bg-zinc-900 w-fit">
        <DialogHeader>
          <DialogTitle className="text-zinc-100 text-2xl">
            {data.productData?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-x-4 w-auto">
          {data.productData?.imageUrl && (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.productData?.imageUrl}`}
              alt={data.productData?.name}
              className="w-[400px]"
            />
          )}
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-neutral-300 w-[80%]">
              {data.productData?.description}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between mt-2 space-y-4 h-full"
            >
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="size" className="text-zinc-400">
                    Выберите размер
                  </label>
                  <Select
                    name="size"
                    onValueChange={(value) => {
                      handlePriceChanged(value);
                    }}
                    defaultValue="small"
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                      <SelectValue placeholder="Выберите размер" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.productData?.productType === "PIZZA" ? (
                        <>
                          <SelectItem value="small">
                            Маленькая (25см)
                          </SelectItem>
                          <SelectItem value="medium">Средняя (30см)</SelectItem>
                          <SelectItem value="large">Большая (35см)</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="small">
                            Маленький (0.25 л)
                          </SelectItem>
                          <SelectItem value="medium">Средний (0.35 л)</SelectItem>
                          <SelectItem value="large">Большой (0.4 л)</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex w-fit items-center">
                  <Button
                    type="button"
                    className="bg-neutral-600 hover:bg-neutral-500 w-fit cursor-pointer"
                    onClick={() =>
                      setQuantity((pS) => {
                        if (pS === 1) {
                          return pS;
                        } else {
                          return (pS -= 1);
                        }
                      })
                    }
                  >
                    -
                  </Button>
                  <div className="px-4">{quantity}</div>
                  <Button
                    type="button"
                    className="bg-neutral-600 hover:bg-neutral-500 w-fit cursor-pointer"
                    onClick={() => setQuantity((pS) => (pS += 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="text-lg font-bold">{price * quantity}₽</p>
                <SubmitButton text="Добавить в корзину" />
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
