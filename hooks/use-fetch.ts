"use client";

import { useAuth } from "./use-auth";

export function useFetch() {
  const { token } = useAuth();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };

  return { fetchWithAuth };
} 