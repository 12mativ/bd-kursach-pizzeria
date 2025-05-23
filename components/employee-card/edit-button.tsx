"use client";

import { useModal } from "../../hooks/use-modal-store";
import { Button } from "../ui/button";
import { IEmployeeInfo } from "./employee-card";
import { Edit } from "lucide-react";
export const EditButton = ({ employee }: { employee: IEmployeeInfo }) => {
  const { onOpen } = useModal();
  return (
    <Button
      className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
      onClick={() => onOpen("editEmployee", { employeeData: employee })}
    >
      <p>Редактировать</p>
      <Edit className="w-4 h-4" />
    </Button>
  );
};
