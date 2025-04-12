"use client";

import {
  registerEmployee,
  ICreateEmployeeActionState,
} from "@/app/(main)/employees/actions";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { FormError } from "../ui/form-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const initialState: ICreateEmployeeActionState = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  username: "",
  password: "",
  role: undefined,
};

export const CreateEmployeeModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [state, formAction] = useActionState(registerEmployee, initialState);
  const isModalOpen = isOpen && type === "createEmployee";

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
            Зарегистрировать нового сотрудника
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

          <div className="space-y-2">
            <label htmlFor="username" className="text-zinc-400">
              Введите логин
            </label>
            <Input
              id="username"
              type="text"
              name="username"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.username}
            />
            <FormError message={state?.fieldErrors?.username?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-zinc-400">
              Введите пароль
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              defaultValue={state.password}
            />
            <FormError message={state?.fieldErrors?.password?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-zinc-400">
              Выберите роль
            </label>
            <Select name="role">
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

          <SubmitButton text="Зарегистрировать" />

          <FormError message={state?.error} />

          <p aria-live="polite" className="sr-only" role="status">
            {state?.fieldErrors?.name?.[0]}
            {state?.fieldErrors?.surname?.[0]}
            {state?.fieldErrors?.patronymic?.[0]}
            {state?.fieldErrors?.phone?.[0]}
            {state?.fieldErrors?.username?.[0]}
            {state?.fieldErrors?.password?.[0]}
            {state?.fieldErrors?.role?.[0]}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
