import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { cn, formatRole } from "@/lib/utils";
import { IEmployeeInfo } from "../employee-card/employee-card";
import { AddEmployeeButton } from "./add-employee-button";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

export interface IWorkplaceInfo {
  id: number;
  name: string;
  status: "free" | "occupied" | "partly occupied";
}

export const WorkplaceCard = async ({
  workplace,
  employees,
}: {
  workplace: IWorkplaceInfo;
  employees: IEmployeeInfo[];
}) => {
  const assignedEmployees = await fetchWithAuth(
    `${process.env.BACKEND_URL}/workplaces/${workplace.id}/employees`
  );
  const assignedEmployeesData: IEmployeeInfo[] = await assignedEmployees.json();

  const {role} = await verifySession();

  return (
    <div className="flex flex-col flex-wrap gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800">
      <p className="text-indigo-400">{workplace.name}</p>
      <p className="text-zinc-400">
        Статус:{" "}
        <span
          className={`font-medium ${
            workplace.status === "free"
              ? "text-green-500"
              : workplace.status === "occupied"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {workplace.status === "free"
            ? "Свободно"
            : workplace.status === "occupied"
            ? "Занято"
            : "Частично занято"}
        </span>
      </p>
      <div>
        {assignedEmployeesData.length > 0 && (
          <>
            <p className="text-zinc-400">Назначенные сотрудники:</p>
            <div className="flex flex-col gap-y-2 max-h-32 overflow-y-auto">
              {assignedEmployeesData.map((employee) => (
                <p key={employee.id}>
                  {employee.surname} {employee.name[0]}.{" "}
                  {employee.patronymic[0]}. (
                  <span
                    className={cn(
                      employee.role === "MANAGER"
                        ? "text-green-500"
                        : employee.role === "PIZZAMAKER"
                        ? "text-amber-500"
                        : "text-fuchsia-400"
                    )}
                  >
                    {formatRole(employee.role)}
                  </span>
                  )
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {role === "ADMIN" && <EditButton workplace={workplace} />}
        {role === "ADMIN" && <DeleteButton workplace={workplace} />}
        <AddEmployeeButton
          workplaceId={workplace.id}
          employees={employees}
          assignedEmployeesData={assignedEmployeesData}
        />
      </div>
    </div>
  );
};
