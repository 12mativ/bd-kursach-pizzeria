import { EmployeeCard, IEmployeeInfo } from "@/components/employee-card/employee-card";
import { CreateEmployeeButton } from "./create-employee-button";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/utils/fetch";

export default async function Page() {
  const { isAuth } = await verifySession();
  
  if (!isAuth) {
    redirect("/auth");
  }

  try {
    var data = await fetchWithAuth(`${process.env.BACKEND_URL}/employees`);
    if (data.status === 401) {
      redirect("/auth");
    }
    var employeesFromServer: IEmployeeInfo[] = await data.json();

    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
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
  } catch (error) {
    console.error("Ошибка при загрузке сотрудников:", error);
    redirect("/auth");
  }
}