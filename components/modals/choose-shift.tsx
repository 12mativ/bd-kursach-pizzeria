"use client";

import { useActionState, useEffect, useState } from "react";
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
import {
  assignShift,
  IAssignShiftActionState,
} from "../../app/(main)/schedule/actions";
import { Calendar } from "../ui/calendar";

const initialState: IAssignShiftActionState = {
  date: undefined,
  shiftId: "",
  employeeId: "",
};

export const AssignEmployeeModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [state, formAction] = useActionState(assignShift, initialState);
  const isModalOpen = isOpen && type === "assignShift";
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (state?.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-zinc-100">Выбрать смену</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="surname" className="text-zinc-400">
              Дата
            </label>
            <Calendar
              mode="single"
              selected={state.date ?? date}
              onSelect={setDate}
              disabled={(date) =>
                date < new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
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
                  <SelectItem value={String(sD.id)} key={sD.id}>{sD.start_time.slice(0, -3)} - {sD.end_time.slice(0, -3)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormError message={state?.fieldErrors?.shiftId?.[0]} />
          </div>

          <SubmitButton text="Зарегистрировать" />

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
