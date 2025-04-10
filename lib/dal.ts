"use server";

import { cache } from "react";
import { fetchWithAuth } from "@/utils/fetch";

export const verifySession = cache(async () => {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/auth/check-session`,
    { method: "GET" }
  );
  
  if (!response?.ok) {
    return { isAuth: false };
  }

  const data = await response.json();

  return { isAuth: true, userId: data.user.id };
});
