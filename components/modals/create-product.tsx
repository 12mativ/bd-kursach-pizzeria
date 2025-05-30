"use client";

import { createProduct, ICreateProductActionState } from "@/app/(main)/products/actions";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { FormError } from "../ui/form-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const initialState: ICreateProductActionState = {
  name: "",
  description: "",
  price: 0,
  fieldErrors: {},
  error: "",
  success: false,
};

export const CreateProductModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [state, formAction] = useActionState(createProduct, initialState);
  const isModalOpen = isOpen && type === "createProduct";

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Добавить новый продукт
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-zinc-400">
              Название
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.name}
            />
            <FormError message={state?.fieldErrors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-zinc-400">
              Описание
            </label>
            <Textarea
              id="description"
              name="description"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 max-h-[200px]"
              defaultValue={state.description}
              rows={4}
            />
            <FormError message={state?.fieldErrors?.description?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-zinc-400">
              Цена (базовая)
            </label>
            <Input
              id="price"
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.price}
            />
            <FormError message={state?.fieldErrors?.price?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-zinc-400">
              Изображение
            </label>
            <Input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="productType" className="text-zinc-400">
              Выберите тип продукта
            </label>
            <Select name="productType">
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Выберите тип продукта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PIZZA">Пицца</SelectItem>
                <SelectItem value="DRINK">Напиток</SelectItem>
              </SelectContent>
            </Select>
            <FormError message={state?.fieldErrors?.productType?.[0]} />
          </div>

          <SubmitButton text="Создать" />

          <FormError message={state?.error} />

          <p aria-live="polite" className="sr-only" role="status">
            {state?.fieldErrors?.name?.[0]}
            {state?.fieldErrors?.description?.[0]}
            {state?.fieldErrors?.price?.[0]}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
