import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import CreatePizzaButton from "./create-pizza-button";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { PizzaCard, IPizzaInfo } from "@/components/pizza-card/pizza-card";

export default async function PizzaPage() {
  const { isAuth, role } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const pizzas = await fetchWithAuth(`${process.env.BACKEND_URL}/pizza`, {
    method: "GET",
  });

  const pizzasFromServer = await pizzas.json();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Пицца</h1>
        {role === "ADMIN" && <CreatePizzaButton />}
      </div>
      <div className="flex gap-3 flex-wrap">
        {pizzasFromServer.map((p: IPizzaInfo) => (
          <PizzaCard pizza={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
