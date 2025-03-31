"use client";

import { createEmployee, ICreateEmployeeActionState } from "@/app/actions";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { FormError } from "../ui/form-error";

export const EditEmployeeModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const employeeData = data.employeeData;

  const initialState: ICreateEmployeeActionState = {
    id: employeeData?.id,
    name: employeeData?.name ?? "",
    surname: employeeData?.surname ?? "",
    patronymic: employeeData?.patronymic ?? "",
    phone: employeeData?.phone ?? "",
  };

  const [state, formAction] = useActionState(createEmployee, initialState);

  const isModalOpen = isOpen && type === "editEmployee";

  const handleCreateEntityClassClose = () => {
    onClose();
  };

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state?.success, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCreateEntityClassClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">
            Изменить данные сотрудника
          </DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="surname" className="text-zinc-400">
              Введите фамилию
            </label>
            <Input
              id="surname"
              type="text"
              name="surname"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.surname}
            />
            <FormError message={state?.fieldErrors?.surname?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-zinc-400">
              Введите имя
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
            <label htmlFor="patronymic" className="text-zinc-400">
              Введите отчество
            </label>
            <Input
              id="patronymic"
              type="text"
              name="patronymic"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.patronymic}
            />
            <FormError message={state?.fieldErrors?.patronymic?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-zinc-400">
              Введите номер телефона
            </label>
            <Input
              id="phone"
              type="text"
              name="phone"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.phone}
            />
            <FormError message={state?.fieldErrors?.phone?.[0]} />
          </div>

          <SubmitButton text="Создать" />

          <p aria-live="polite" className="sr-only" role="status">
            {state?.fieldErrors?.name?.[0]}
            {state?.fieldErrors?.surname?.[0]}
            {state?.fieldErrors?.patronymic?.[0]}
            {state?.fieldErrors?.phone?.[0]}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
