import { IOrder } from "@/app/(main)/orders/page";
import { verifySession } from "@/lib/dal";
import { CalendarDays, ChefHat, Clock, Pizza } from "lucide-react";
import { MakeOrderReadyButton } from "./make-order-ready-btn";

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

export const OrderCard = async ({ order }: { order: IOrder }) => {
  const { role } = await verifySession();

  return (
    <div
      key={order.id}
      className="flex flex-col gap-y-2 border border-neutral-700 p-2 rounded w-[300px] bg-neutral-800"
    >
      <h3 className="text-xl text-center text-indo">Заказ #{order.id}</h3>
      {order.status === "preparing" ? (
        <div className="flex gap-x-2 items-center justify-center w-full bg-yellow-800 p-1 rounded">
          <p className="text-neutral-100 text-center animate-pulse">Готовится</p>
          <ChefHat className="text-neutral-100 animate-pulse" />
        </div>
      ) : (
        <div className="flex gap-x-2 items-center justify-center w-full bg-green-800 p-1 rounded">
          <p className="text-neutral-100 text-center">Готов к получению</p>
          <Pizza className="text-neutral-100" />
        </div>
      )}
      <p className="text-sm text-neutral-400">Время и дата заказа:</p>
      <div className="flex gap-x-2 items-center">
        <Clock className="w-5 h-5" />
        <p>{formatOrderDate(order.orderDate).time}</p>
      </div>
      <div className="flex gap-x-2 items-center">
        <CalendarDays className="w-5 h-5" />
        <p>{formatOrderDate(order.orderDate).date}</p>
      </div>
      <div className="border border-neutral-500 p-1 rounded text-sm max-h-25 overflow-y-auto">
        {order.products.map((p) => (
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
      <p className="text-right font-semibold grow">{order.totalAmount} ₽</p>

      {role !== "CLIENT" && order.status !== "ready" && (
        <MakeOrderReadyButton order={order} />
      )}
    </div>
  );
};
