"use client";

import { editWorkplace } from "@/app/(main)/workplaces/actions";
import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const EditWorkplaceModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const workplaceData = data.workplaceData;

  const [state, formAction] = useActionState(editWorkplace, {
    name: workplaceData?.name ?? "",
    status: workplaceData?.status ?? "free",
    success: false,
    error: "",
  });

  const isModalOpen = isOpen && type === "editWorkplace";

  const handleEditEntityClassClose = () => {
    onClose();
  };

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleEditEntityClassClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Редактировать рабочее место
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={workplaceData?.id} />
          <div className="space-y-2">
            <label htmlFor="name" className="text-zinc-400">
              Введите название
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              defaultValue={workplaceData?.name}
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
            />
            <FormError message={state?.fieldErrors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-zinc-400">
              Выберите статус
            </label>
            <Select name="status" defaultValue={workplaceData?.status}>
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

          <SubmitButton text="Сохранить" />
        </form>
      </DialogContent>
    </Dialog>
  );
}; 