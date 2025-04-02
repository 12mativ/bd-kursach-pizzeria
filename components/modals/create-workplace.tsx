"use client";

import { createWorkplace, ICreateWorkplaceActionState } from "@/app/workplaces/actions";
import { useActionState } from "react";
import { Input } from "../ui/input";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useRef } from "react";
import { FormError } from "../ui/form-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const initialState: ICreateWorkplaceActionState = {
  name: "",
  status: "free",
};

export const CreateWorkplaceModal = () => {
  const [state, formAction] = useActionState(createWorkplace, initialState);
  const { isOpen, type, onClose } = useModal();
  const formRef = useRef<HTMLFormElement>(null);

  const isModalOpen = isOpen && type === "createWorkplace";

  const handleCreateEntityClassClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCreateEntityClassClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Создать новое рабочее место
          </DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
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
        </form>
      </DialogContent>
    </Dialog>
  );
}; 