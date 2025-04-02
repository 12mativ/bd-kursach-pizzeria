import { EmployeeCard, IEmployeeInfo } from "@/components/employee-card/employee-card";
import { CreateEmployeeButton } from "./create-employee-button";

export default async function Page() {
  var data = await fetch(`${process.env.BACKEND_URL}/employees`);
  var employeesFromServer: IEmployeeInfo[] = await data.json();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Сотрудники</h1>
        <CreateEmployeeButton />
      </div>
      <div className="flex gap-3 flex-wrap">
        {employeesFromServer.map((e) => (
          <EmployeeCard employee={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}