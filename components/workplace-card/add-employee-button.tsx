"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { IEmployeeInfo } from "../employee-card/employee-card";
import { List, Users } from "lucide-react";

interface AddEmployeeButtonProps {
  workplaceId: number;
  employees: IEmployeeInfo[];
  assignedEmployeesData: IEmployeeInfo[];
}

export function AddEmployeeButton({ workplaceId, employees, assignedEmployeesData }: AddEmployeeButtonProps) {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("addEmployeeToWorkplace", { workplaceId, employees, assignedEmployeesData });
  };

  return (
    <Button onClick={handleClick} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer">
      <p>Список сотрудников</p>
      <List />
    </Button>
  );
}

