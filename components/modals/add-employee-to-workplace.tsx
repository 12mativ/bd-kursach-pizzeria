"use client";

import { addEmployeeToWorkplace } from "@/app/(main)/workplaces/actions";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useState, useEffect } from "react";
import { SubmitButton } from "../submit-button";
import { cn, formatRole } from "@/lib/utils";

export function AddEmployeeToWorkplaceModal() {
  const { type, isOpen, onClose, data } = useModal();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  useEffect(() => {
    if (data.assignedEmployeesData) {
      setSelectedEmployees(
        data.assignedEmployeesData.map((emp) => emp.id.toString())
      );
    }
  }, [data.assignedEmployeesData]);

  const isModalOpen = isOpen && type === "addEmployeeToWorkplace";

  const handleCheckboxChange = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("workplaceId", data.workplaceId!.toString());
    selectedEmployees.forEach((id) => formData.append("employeeIds", id));
    const result = await addEmployeeToWorkplace({ error: "" }, formData);
    if (result.success) {
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Добавить сотрудников</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {data.employees?.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-2">
                <Checkbox
                  id={employee.id.toString()}
                  checked={selectedEmployees.includes(employee.id.toString())}
                  onCheckedChange={() =>
                    handleCheckboxChange(employee.id.toString())
                  }
                />
                <label
                  htmlFor={employee.id.toString()}
                  className="text-zinc-100"
                >
                  {employee.surname} {employee.name[0]}.{" "}
                  {employee.patronymic[0]}. (
                  <span
                    className={cn(
                      employee.role === "MANAGER"
                        ? "text-green-500"
                        : employee.role === "PIZZAMAKER"
                        ? "text-amber-500"
                        : "text-fuchsia-400",
                      "text-sm"
                    )}
                  >
                    {formatRole(employee.role)}
                  </span>
                  )
                </label>
              </div>
            ))}
          </div>
          <SubmitButton text="Сохранить" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
