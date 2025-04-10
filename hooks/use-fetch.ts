"use client";

import { useAuth } from "./use-auth";

export function useFetch() {
  const { token, handleUnauthorized } = useAuth();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      handleUnauthorized();
    }

    return response;
  };

  return { fetchWithAuth };
} 