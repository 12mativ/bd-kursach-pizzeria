import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuth } = await verifySession();
  
  if (!isAuth) {
    redirect("/auth");
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-zinc-100">Добро пожаловать в <span className="text-indigo-500">систему управления пиццерией</span></h1>
    </div>
  );
}