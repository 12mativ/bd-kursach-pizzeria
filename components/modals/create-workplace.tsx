"use client";

import { createWorkplace, ICreateWorkplaceActionState } from "@/app/(main)/workplaces/actions";
import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import { Input } from "../ui/input";

const initialState: ICreateWorkplaceActionState = {
  name: "",
  capacity: 0,
};

export const CreateWorkplaceModal = () => {
  const { isOpen, type, onClose } = useModal();

  const [state, formAction] = useActionState(createWorkplace, initialState);

  const isModalOpen = isOpen && type === "createWorkplace";

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
            Создать новое рабочее место
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-zinc-400">
              Введите название
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={state.name}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <FormError message={state?.fieldErrors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="capacity" className="text-zinc-400">
              Введите вместимость рабочего места
            </label>
            <Input
              id="capacity"
              type="number"
              name="capacity"
              required
              defaultValue={state.capacity}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <FormError message={state?.fieldErrors?.capacity?.[0]} />
          </div>

          <SubmitButton text="Создать" />

          <FormError message={state?.error} />
          
        </form>
      </DialogContent>
    </Dialog>
  );
}; 