"use client";

import {
  editEmployee,
  ICreateEmployeeActionState,
} from "@/app/(main)/employees/actions";
import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export const EditEmployeeModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const employeeData = data.employeeData;

  const initialState: ICreateEmployeeActionState = {
    id: employeeData?.id,
    name: employeeData?.name ?? "",
    surname: employeeData?.surname ?? "",
    patronymic: employeeData?.patronymic ?? "",
    phone: employeeData?.phone ?? "",
    role: employeeData?.role ?? "PIZZAMAKER",
    success: false,
    error: "",
  };

  const [state, formAction] = useActionState(editEmployee, initialState);

  const isModalOpen = isOpen && type === "editEmployee";

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  if (!employeeData) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
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
              defaultValue={employeeData?.surname}
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
              defaultValue={employeeData?.name}
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
              defaultValue={employeeData?.patronymic}
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
              defaultValue={employeeData?.phone}
            />
            <FormError message={state?.fieldErrors?.phone?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-zinc-400">
              Выберите роль
            </label>
            <Select name="role" defaultValue={employeeData.role}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PIZZAMAKER">Пиццамейкер</SelectItem>
                <SelectItem value="MANAGER">Менеджер</SelectItem>
                <SelectItem value="CASHIER">Кассир</SelectItem>
              </SelectContent>
            </Select>
            <FormError message={state?.fieldErrors?.role?.[0]} />
          </div>

          <input
            id="id"
            type="hidden"
            name="id"
            defaultValue={employeeData?.id}
          />

          <SubmitButton text="Сохранить" />

          <FormError message={state?.error} />

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
