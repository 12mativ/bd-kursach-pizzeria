"use server";

import { cache } from "react";
import { fetchWithAuth } from "./server-utils/fetch-with-auth";

export const verifySession = cache(async () => {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/auth/check-session`,
    { method: "GET" }
  );
  
  if (!response?.ok) {
    return { isAuth: false };
  }

  const data = await response.json();

  return {
    isAuth: true,
    userId: data.user.id,
    role: data.user.role,
    username: data.user.username,
  };
});
