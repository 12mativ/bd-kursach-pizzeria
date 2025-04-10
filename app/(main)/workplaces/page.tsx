import { WorkplaceCard } from "@/components/workplace-card/workplace-card";
import { CreateWorkplaceButton } from "./create-workplace-button";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/utils/fetch";

async function getWorkplaces() {
  const res = await fetchWithAuth(`${process.env.BACKEND_URL}/workplaces`);
  
  if (res.status === 401) {
    redirect("/auth");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch workplaces");
  }

  return res.json();
}

export default async function WorkplacesPage() {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  try {
    const workplaces = await getWorkplaces();

    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-zinc-100">Рабочие места</h1>
          <CreateWorkplaceButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workplaces.map((workplace: any) => (
            <WorkplaceCard key={workplace.id} workplace={workplace} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Ошибка при загрузке рабочих мест:", error);
    redirect("/auth");
  }
}
