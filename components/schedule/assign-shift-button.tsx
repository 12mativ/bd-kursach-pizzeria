"use client";

import { IShift } from "../../app/(main)/schedule/page";
import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";

export const AssignShiftButton = ({
  shifts,
  employeeId,
}: {
  shifts: IShift[];
  employeeId: string;
}) => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("assignShift", { shiftsData: shifts, employeeId })}
      className="bg-indigo-500 hover:bg-indigo-600 cursor-pointer w-fit"
    >
      Выбрать рабочую смену +
    </Button>
  );
};
