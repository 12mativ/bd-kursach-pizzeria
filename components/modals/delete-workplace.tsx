"use client";

import { deleteWorkplace } from "@/app/(main)/workplaces/actions";
import { useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { FormError } from "../ui/form-error";
import { Button } from "../ui/button";
import { SubmitButton } from "../submit-button";

export const DeleteWorkplaceModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const initialState = {
    error: "",
    success: false,
  };

  const [state, formAction] = useActionState(deleteWorkplace, initialState);

  const isModalOpen = isOpen && type === "deleteWorkplace";

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-2 text-zinc-100">
            <p>Вы уверены, что хотите удалить рабочее место?</p>
            <p className="text-indigo-500">
              {data.workplaceData?.name}
            </p>
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="flex gap-x-3 justify-end">
            <Button
              className="bg-neutral-600 hover:bg-neutral-700 cursor-pointer"
              onClick={() => onClose()}
              type="button"
            >
              Отмена
            </Button>
            <SubmitButton text="Удалить" />
          </div>

          <input
            id="id"
            type="hidden"
            name="id"
            defaultValue={data.workplaceData?.id}
          />

          <FormError message={state.error} />

          <p aria-live="polite" className="sr-only" role="status">
            {state?.error}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 