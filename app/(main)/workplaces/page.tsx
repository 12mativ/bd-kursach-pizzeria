import { WorkplaceCard } from "@/components/workplace-card/workplace-card";
import { CreateWorkplaceButton } from "./create-workplace-button";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { isManager, isAdmin, isPizzamaker, isCashier } from "@/lib/utils";

export default async function WorkplacesPage() {
  const { isAuth } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!isAuth || !token) {
    redirect("/auth");
  }

  var userInfo = jwtDecode(token);

  const workplacesResponse =
    isAdmin(userInfo) || isManager(userInfo)
      ? await fetchWithAuth(`${process.env.BACKEND_URL}/workplaces`)
      : await fetchWithAuth(
          `${process.env.BACKEND_URL}/employees/${userInfo.sub}/workplaces`
        );
  const workplaces = await workplacesResponse.json();

  const allEmployeesResponse =
    isAdmin(userInfo) || isManager(userInfo)
      ? await fetchWithAuth(`${process.env.BACKEND_URL}/employees`)
      : await fetchWithAuth(
          `${process.env.BACKEND_URL}/employees/${userInfo.sub}/workplaces`
        );
  const allEmployees =
    isAdmin(userInfo) || isManager(userInfo)
      ? await allEmployeesResponse.json()
      : [];

  if (!workplacesResponse.ok || !allEmployeesResponse.ok) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <p className="text-red-500">
          Произошла ошибка при загрузке рабочих мест
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Рабочие места</h1>
        {isAdmin(userInfo) && <CreateWorkplaceButton />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(isPizzamaker(userInfo) || isCashier(userInfo)) && workplaces.length === 0 && (
          <p className="text-zinc-400">
            Рабочие места не были назначены для Вас. <br />
            <span className="text-indigo-500">Хорошего отдыха!</span>
          </p>
        )}
        {workplaces.map((workplace: any) => (
          <WorkplaceCard
            key={workplace.id}
            workplace={workplace}
            employees={allEmployees}
          />
        ))}
      </div>
    </div>
  );
}
