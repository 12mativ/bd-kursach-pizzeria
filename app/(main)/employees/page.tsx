import {
  EmployeeCard,
  IEmployeeInfo,
} from "@/components/employee-card/employee-card";
import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { redirect } from "next/navigation";
import { CreateEmployeeButton } from "./create-employee-button";

export default async function Page() {
  const { isAuth, role } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  if (role !== "ADMIN" && role !== "MANAGER") {
    redirect("/");
  }

  var data = await fetchWithAuth(`${process.env.BACKEND_URL}/employees`);
  var employeesFromServer: IEmployeeInfo[] = await data.json();

  if (!data.ok) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <p className="text-red-500">
          Произошла ошибка при загрузке сотрудников
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Сотрудники</h1>
        {role === "ADMIN" && <CreateEmployeeButton />}
      </div>
      <div className="flex gap-3 flex-wrap">
        {employeesFromServer.map((e) => (
          <EmployeeCard employee={e} key={e.id} />
        ))}
      </div>
    </div>
  );
}
