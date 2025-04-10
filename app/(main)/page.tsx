import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuth } = await verifySession();
  
  if (!isAuth) {
    redirect("/auth");
  }

  return (
    <div>
      
    </div>
  );
}
