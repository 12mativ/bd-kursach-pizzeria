"use client";

import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IEmployeeInfo } from "./employee-card";

export const DeleteButton = ({ employee }: { employee: IEmployeeInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-neutral-700 hover:bg-rose-600 cursor-pointer"
      onClick={() => onOpen("deleteEmployee", { employeeData: employee })}
    >
      Удалить
    </Button>
  );
};
