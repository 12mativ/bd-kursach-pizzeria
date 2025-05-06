"use server";

import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { revalidatePath } from "next/cache";

export async function makeOrderReady({orderId}: {orderId: number}) {
  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/orders/${orderId}`, {
    method: "PATCH",
    body: JSON.stringify({status: "ready"})
  });

  if (!response.ok) {
    return {
      error: "Ошибка при изменении статуса заказа",
      success: false
    };
  }

  revalidatePath("/orders");
  return {
    error: "",
    success: true
  };
}
