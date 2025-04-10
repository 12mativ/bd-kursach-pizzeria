import { cn, formatRole } from "@/lib/utils";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

export interface IEmployeeInfo {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  role: "PIZZAMAKER" | "MANAGER" | "CASHIER";
}

export const EmployeeCard = ({ employee }: { employee: IEmployeeInfo }) => {
  return (
    <div className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">
        {employee.surname} {employee.name} {employee.patronymic}
      </p>
      <div>
        <p className="text-sm text-neutral-400">Номер телефона</p>
        <p>{employee.phone}</p>
      </div>
      <p className={cn(employee.role === "MANAGER" ? "text-green-500" : employee.role === "PIZZAMAKER" ? "text-amber-500" : "text-fuchsia-400")}>{formatRole(employee.role)}</p>
      <div className="flex items-center gap-x-2 mt-2">
        <EditButton employee={employee} />
        <DeleteButton employee={employee} />
      </div>
    </div>
  );
};
