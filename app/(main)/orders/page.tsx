import { OrderCard } from "@/components/order-card/order-card";
import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { jwtDecode } from "jwt-decode";
import { CalendarDays, ChefHat, Clock } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IProduct {
  id: number;
  name: string;
  price: number;
  variant_name: string;
  quantity: number;
}

export interface IOrder {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  products: IProduct[];
}

export default async function Cart() {
  const { isAuth } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userInfo = token
    ? jwtDecode<{ role: string; clientId: string }>(token)
    : null;

  if (!isAuth) {
    redirect("/auth");
  }

  var data;
  var data2;

  if (userInfo?.role === "CLIENT") {
    data = await fetchWithAuth(
      `${process.env.BACKEND_URL}/orders/client?clientId=${userInfo?.clientId}`,
      {}
    );
  } else {
    data = await fetchWithAuth(
      `${process.env.BACKEND_URL}/orders/preparing`,
      {}
    );
    data2 = await fetchWithAuth(
      `${process.env.BACKEND_URL}/orders/ready`,
      {}
    );
  }

  var preparingOrders;
  var readyOrders;

  if (userInfo?.role === "CLIENT") {
    var allOrders = await data.json();
    preparingOrders = allOrders.filter((o: IOrder) => o.status === "preparing");
    readyOrders = allOrders.filter((o: IOrder) => o.status === "ready");
  } else {
    preparingOrders = await data.json();
    readyOrders = await data2?.json();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Заказы</h1>
      </div>

      <p className="text-xl font-semibold">Активные заказы</p>
      <div className="flex flex-wrap gap-2">
        {preparingOrders.map((o: IOrder) => (
          <OrderCard order={o} key={o.id} />
        ))}
      </div>

      <p className="text-xl font-semibold">Архив заказов</p>
      <div className="flex flex-wrap gap-2">
        {readyOrders.map((o: IOrder) => (
          <OrderCard order={o} key={o.id} />
        ))}
      </div>
    </div>
  );
}
