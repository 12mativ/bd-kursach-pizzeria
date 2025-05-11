import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import CreatePizzaButton from "./create-product-button";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { ProductCard, IProductInfo } from "@/components/product-card/product-card";
import Link from "next/link";

export default async function PizzaPage() {
  const { isAuth, role } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const pizzas = await fetchWithAuth(`${process.env.BACKEND_URL}/products/pizzas`, {
    method: "GET",
  });

  const drinks = await fetchWithAuth(`${process.env.BACKEND_URL}/products/drinks`, {
    method: "GET",
  });

  const pizzasFromServer = await pizzas.json();
  const drinksFromServer = await drinks.json();
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-sm text-indigo-400">
        <Link href="#pizza">Пицца </Link> 
        <span className="text-white">/</span> 
        <Link href="#drinks"> Напитки</Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100" id="pizza">Пицца</h1>
        {role === "ADMIN" && <CreatePizzaButton />}
      </div>
      <div className="flex gap-3 flex-wrap">
        {pizzasFromServer.map((p: IProductInfo) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-zinc-100" id="drinks">Напитки</h1>
      <div className="flex gap-3 flex-wrap">
        {drinksFromServer.map((p: IProductInfo) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
