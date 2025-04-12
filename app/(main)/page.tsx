import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const { isAuth, userId, role, username } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const userInfo = role !== "ADMIN" 
    ? await fetchWithAuth(`${process.env.BACKEND_URL}/employees/${userId}`, {
        method: "GET",
      })
    : null;

  const userInfoData = userInfo ? await userInfo.json() : {};

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-zinc-100">
        Добро пожаловать в{" "}
        <span className="text-indigo-500">систему управления пиццерией</span>,{" "}
        {userInfoData.name ?? username} {userInfoData.patronymic}!
      </h1>
    </div>
  );
}
