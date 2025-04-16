"use client";

import { editProduct, ICreateProductActionState } from "@/app/(main)/products/actions";
import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


export const EditProductModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const productData = data.productData;

  const initialState: ICreateProductActionState = {
    id: productData?.id,
    name: productData?.name ?? "",
    description: productData?.description ?? "",
    price: productData?.price ?? 0,
    success: false,
    error: "",
  };

  const [state, formAction] = useActionState(editProduct, initialState);

  const isModalOpen = isOpen && type === "editProduct";

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  if (!productData) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Изменить данные продукта
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
              defaultValue={productData.name}
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
              defaultValue={productData.description}
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
              defaultValue={productData.price}
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

          <input
            id="id"
            type="hidden"
            name="id"
            defaultValue={productData?.id}
          />

          <SubmitButton text="Сохранить" />

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
