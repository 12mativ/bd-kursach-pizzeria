import { verifySession } from "@/lib/dal";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreatePizzaButton from "./create-pizza-button";

export default async function PizzaPage() {
  const { isAuth } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userInfo = token ? jwtDecode<{ role: string }>(token) : null;

  if (!isAuth) {
    redirect("/auth");
  }

  if (userInfo && userInfo.role !== "ADMIN" && userInfo.role !== "MANAGER") {
    redirect("/");
  }
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Пицца</h1>
        <CreatePizzaButton />
      </div>
      <div className="flex gap-3 flex-wrap">
        {/* {employeesFromServer.map((e) => (
          <EmployeeCard employee={e} key={e.id} />
        ))} */}
      </div>
    </div>
  );
}
