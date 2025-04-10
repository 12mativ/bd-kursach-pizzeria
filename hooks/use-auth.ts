"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Сохраняем токен в cookies для серверных запросов
      document.cookie = `token=${storedToken}; path=/`;
    }
  }, []);

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

  return { token, saveToken, logout };
} 