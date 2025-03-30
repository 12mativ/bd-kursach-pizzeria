import { EmployeeCard, IEmployeeInfo } from "@/components/employee-card";
import { CreateEmployeeButton } from "./create-employee-button";

export default async function Page() {
  var data = await fetch(`${process.env.BACKEND_URL}/employees`);
  var employeesFromServer: IEmployeeInfo[] = await data.json();

  return (
    <div className="flex flex-col gap-y-3 m-3">
      <CreateEmployeeButton />
      <div className="flex gap-3 flex-wrap">
        {employeesFromServer.map((e) => (
          <EmployeeCard employee={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}