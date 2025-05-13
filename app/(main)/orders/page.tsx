import { OrderCard } from "@/components/order-card/order-card";
import { SearchInput } from "@/components/search-input";
import { verifySession } from "@/lib/dal";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { jwtDecode } from "jwt-decode";
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

//@ts-ignore
export default async function Cart({searchParams,}: {searchParams?: { search?: string }}) {
  const { isAuth } = await verifySession();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userInfo = token
    ? jwtDecode<{ role: string; clientId: string }>(token)
    : null;

  if (!isAuth) {
    redirect("/auth");
  }

  //@ts-ignore
  const searchQuery = searchParams?.search?.trim() || "";

  let data;
  let data2;

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

  let preparingOrders;
  let readyOrders;

  if (userInfo?.role === "CLIENT") {
    const allOrders = await data.json();
    preparingOrders = allOrders.filter((o: IOrder) => o.status === "preparing");
    readyOrders = allOrders.filter((o: IOrder) => o.status === "ready");
  } else {
    preparingOrders = await data.json();
    readyOrders = await data2?.json();
  }

  // Функция фильтрации заказов по поисковому запросу
  const filterOrders = (orders: IOrder[]) => {
    if (!searchQuery) return orders;
    return orders.filter(order => 
      order.id.toString().includes(searchQuery)
    );
  };

  const filteredPreparing = filterOrders(preparingOrders);
  const filteredReady = filterOrders(readyOrders || []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-100">Заказы</h1>
        <div className="w-full max-w-md">
          <SearchInput 
            placeholder="Поиск по номеру заказа..." 
            defaultValue={searchQuery}
          />
        </div>
      </div>

      <p className="text-xl font-semibold">Активные заказы</p>
      <div className="flex flex-wrap gap-2">
        {filteredPreparing.length > 0 ? (
          filteredPreparing.map((o: IOrder) => (
            <OrderCard order={o} key={o.id} />
          ))
        ) : (
          <p className="text-gray-500">
            {searchQuery ? "Не найдено активных заказов по вашему запросу" : "Нет активных заказов"}
          </p>
        )}
      </div>

      <p className="text-xl font-semibold">Архив заказов</p>
      <div className="flex flex-wrap gap-2">
        {filteredReady.length > 0 ? (
          filteredReady.map((o: IOrder) => (
            <OrderCard order={o} key={o.id} />
          ))
        ) : (
          <p className="text-gray-500">
            {searchQuery ? "Не найдено завершенных заказов по вашему запросу" : "Нет завершенных заказов"}
          </p>
        )}
      </div>
    </div>
  );
}