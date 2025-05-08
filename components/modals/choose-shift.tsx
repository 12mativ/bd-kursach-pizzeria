"use client";

import { useModal } from "@/hooks/use-modal-store";
import { useActionState, useEffect, useState } from "react";
import {
  assignShift,
  IAssignShiftActionState,
} from "../../app/(main)/schedule/actions";
import { SubmitButton } from "../submit-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormError } from "../ui/form-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const initialState: IAssignShiftActionState = {
  date: undefined,
  shiftId: "",
  employeeId: "",
};

export const AssignEmployeeModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [state, formAction] = useActionState(assignShift, initialState);
  const isModalOpen = isOpen && type === "assignShift";
  const [date, setDate] = useState<string>("");
  const [dateError, setDateError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      onClose();
      router.replace(`/schedule?refresh=${Date.now()}`, {
        scroll: false // Чтобы не скроллило страницу
      });
    }
  }, [state, onClose, router]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setDateError(null);

    // Проверка что дата не в прошлом
    if (new Date(selectedDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
      setDateError("Нельзя назначить смену на прошедшую дату");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Выбрать смену</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="employeeId" value={data.employeeId} />

          <div className="space-y-2">
            <label htmlFor="date" className="text-zinc-400">
              Дата
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-2 rounded bg-zinc-600 border-zinc-700 text-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            {dateError && <FormError message={dateError} />}
            <FormError message={state?.fieldErrors?.date?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="shiftId" className="text-zinc-400">
              Смена
            </label>
            <Select name="shiftId">
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue placeholder="Выберите смену" />
              </SelectTrigger>
              <SelectContent>
                {data.shiftsData?.map((sD) => (
                  <SelectItem value={String(sD.id)} key={sD.id}>
                    {sD.start_time.slice(0, -3)} - {sD.end_time.slice(0, -3)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormError message={state?.fieldErrors?.shiftId?.[0]} />
          </div>

          <SubmitButton text="Назначить смену" />

          <FormError message={state?.error} />

          <p aria-live="polite" className="sr-only" role="status">
            {state?.fieldErrors?.date?.[0]}
            {state?.fieldErrors?.shiftId?.[0]}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
