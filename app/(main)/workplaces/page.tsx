import { WorkplaceCard } from "@/components/workplace-card/workplace-card";
import { CreateWorkplaceButton } from "./create-workplace-button";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/utils/fetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function WorkplacesPage() {
  const { isAuth } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!isAuth) {
    redirect("/auth");
  }

  if (token) {
    const userInfo = jwtDecode(token);
    // @ts-expect-error: role IS defined in the token
    if (userInfo.role !== "ADMIN") {
      redirect("/");
    }
  }

  const workplacesResponse = await fetchWithAuth(`${process.env.BACKEND_URL}/workplaces`);
  const workplaces = await workplacesResponse.json();
  const allEmployeesResponse = await fetchWithAuth(`${process.env.BACKEND_URL}/employees`);
  const allEmployees = await allEmployeesResponse.json();

  if (!workplacesResponse.ok || !allEmployeesResponse.ok) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <p className="text-red-500">Произошла ошибка при загрузке рабочих мест</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Рабочие места</h1>
        <CreateWorkplaceButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workplaces.map((workplace: any) => (
          <WorkplaceCard key={workplace.id} workplace={workplace} employees={allEmployees} />
        ))}
      </div>
    </div>
  );
}
