"use client";

import { createWorkplace, ICreateWorkplaceActionState } from "@/app/(main)/workplaces/actions";
import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const initialState: ICreateWorkplaceActionState = {
  name: "",
  status: "free",
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
      <DialogContent className="bg-zinc-900 border-zinc-800">
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
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <FormError message={state?.fieldErrors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-zinc-400">
              Выберите статус
            </label>
            <Select name="status" defaultValue="free">
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="free" className="text-zinc-100">Свободно</SelectItem>
                <SelectItem value="occupied" className="text-zinc-100">Занято</SelectItem>
                <SelectItem value="partly occupied" className="text-zinc-100">Частично занято</SelectItem>
              </SelectContent>
            </Select>
            <FormError message={state?.fieldErrors?.status?.[0]} />
          </div>

          <SubmitButton text="Создать" />

          <FormError message={state?.error} />
          
        </form>
      </DialogContent>
    </Dialog>
  );
}; 