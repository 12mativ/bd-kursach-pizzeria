import { WorkplaceCard } from "@/components/workplace-card/workplace-card";
import { CreateWorkplaceButton } from "./create-workplace-button";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

async function getWorkplaces() {
  const res = await fetch(`${process.env.BACKEND_URL}/workplaces`);

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

  const workplaces = await getWorkplaces();

  return (
    <div className="container mx-auto py-8 space-y-8">
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
}
