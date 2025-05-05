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

interface IOrder {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  products: IProduct[];
}

const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    time: new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date),

    date: new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(date),
  };
};

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

  var data = await fetchWithAuth(
    `${process.env.BACKEND_URL}/orders?clientId=${userInfo?.clientId}`,
    {}
  );
  var orders: IOrder[] = await data.json();
  console.log(orders);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-100">Заказы</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {orders.map((o) => (
          <div
            key={o.id}
            className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800"
          >
            <h3 className="text-xl text-center text-indo">Заказ #{o.id}</h3>
            {o.status === "preparing" ? (
              <div className="flex gap-x-2 items-center justify-center w-full bg-yellow-800 p-1 rounded">
                <p className="text-neutral-100 text-center">Готовится</p>
                <ChefHat className="animate-pulse text-neutral-100" />
              </div>
            ) : (
              <p className="text-green-500">Готов к получению</p>
            )}
            <p className="text-sm text-neutral-400">Время и дата заказа:</p>
            <div className="flex gap-x-2 items-center">
              <Clock className="w-5 h-5" />
              <p>{formatOrderDate(o.orderDate).time}</p>
            </div>
            <div className="flex gap-x-2 items-center">
              <CalendarDays className="w-5 h-5" />
              <p>{formatOrderDate(o.orderDate).date}</p>
            </div>
            <div className="border border-neutral-500 p-1 rounded text-sm max-h-25 overflow-y-auto">
              {o.products.map((p) => (
                <div key={p.id} className="flex justify-between">
                  <p>
                    {p.name} (
                    {p.variant_name === "small"
                      ? "мал."
                      : p.variant_name === "medium"
                      ? "ср."
                      : "бол."}
                    ) x {p.quantity}
                  </p>
                  <p>{p.price * p.quantity} ₽</p>
                </div>
              ))}
            </div>
            <p className="text-right font-semibold">{o.totalAmount} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );
}
