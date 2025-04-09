import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/auth/check-session`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response?.ok) {
    redirect("/auth");
  }

  const data = await response.json();

  return { isAuth: true, userId: data.user.id };
});
