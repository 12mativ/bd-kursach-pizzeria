import { WorkplaceCard } from "@/components/workplace-card/workplace-card";
import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { redirect } from "next/navigation";
import { CreateWorkplaceButton } from "./create-workplace-button";

export default async function WorkplacesPage() {
  const { isAuth, role, userId } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  if (role !== "ADMIN" && role !== "MANAGER" && role !== "PIZZAMAKER" && role !== "CASHIER") {
    redirect("/");
  }

  const workplacesResponse =
    role === "ADMIN" || role === "MANAGER"
      ? await fetchWithAuth(`${process.env.BACKEND_URL}/workplaces`)
      : await fetchWithAuth(
          `${process.env.BACKEND_URL}/employees/${userId}/workplaces`
        );
  const workplaces = await workplacesResponse.json();

  const allEmployeesResponse =
    role === "ADMIN" || role === "MANAGER"
      ? await fetchWithAuth(`${process.env.BACKEND_URL}/employees`)
      : await fetchWithAuth(
          `${process.env.BACKEND_URL}/employees/${userId}/workplaces`
        );
  const allEmployees =
    role === "ADMIN" || role === "MANAGER"
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
        {role === "ADMIN" && <CreateWorkplaceButton />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(role === "PIZZAMAKER" || role === "CASHIER") && workplaces.length === 0 && (
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
