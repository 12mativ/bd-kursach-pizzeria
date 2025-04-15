"use client";

import {
  createPizza,
  ICreatePizzaActionState,
} from "@/app/(main)/pizza/actions";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const initialState: ICreatePizzaActionState = {
  name: "",
  description: "",
  price: 0,
  fieldErrors: {},
  error: "",
  success: false,
};

export const SelectPizzaModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [state, formAction] = useActionState(createPizza, initialState);
  const [price, setPrice] = useState(0);
  const isModalOpen = isOpen && type === "selectPizza";

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

    if (data.pizzaData?.price) {
      setPrice(data.pizzaData?.price * result);
    }
  };

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  useEffect(() => {
    if (data.pizzaData?.price) {
      setPrice(data.pizzaData.price);
    }
  }, [isModalOpen, data.pizzaData?.price]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="block bg-zinc-900 w-fit">
        <DialogHeader>
          <DialogTitle className="text-zinc-100 text-2xl">
            {data.pizzaData?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-x-4 w-auto">
          {data.pizzaData?.imageUrl && (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.pizzaData?.imageUrl}`}
              alt={data.pizzaData?.name}
              className="w-[400px]"
            />
          )}
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-neutral-300 w-[80%]">
              {data.pizzaData?.description}
            </p>
            <form
              action={formAction}
              className="flex flex-col justify-between mt-2 space-y-4 h-full"
            >
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
                    <SelectItem value="small">Маленькая (25см)</SelectItem>
                    <SelectItem value="medium">Средняя (30см)</SelectItem>
                    <SelectItem value="large">Большая (35см)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="text-lg font-bold">{price}₽</p>
                <SubmitButton text="Добавить в корзину" />
              </div>

              <FormError message={state?.error} />
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
