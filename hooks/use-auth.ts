"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    role: "ADMIN" | "PIZZAMAKER" | "MANAGER" | "CASHIER";
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Сохраняем токен в cookies для серверных запросов
      document.cookie = `token=${storedToken}; path=/`;
    }
  }, []);

  useEffect(() => {
    if (token) {
      setUserInfo(jwtDecode(token));
    }
  }, [token]);

  const saveToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    document.cookie = `token=${newToken}; path=/`;
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setToken(null);
  };

  const handleUnauthorized = () => {
    logout();
    if (pathname !== "/auth") {
      router.push("/auth");
    }
  };

  return { token, userInfo, saveToken, logout, handleUnauthorized };
}
