"use client";

import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link"

export function Header() {
  const { token, logout: logoutLocal } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status === 401) {
        logoutLocal();
        router.push("/auth");
        return;
      }
      logoutLocal();
      router.push("/auth");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  var menuItems = [
    {id: 1, name: "Главная", href: "/"},
    {id: 2, name: "Сотрудники", href: "/employees"},
    {id: 3, name: "Рабочие места", href: "/workplaces"},
  ]

  return (
    <div className="p-3 bg-neutral-800">
      <nav className="flex items-center justify-between">
        <div className="flex gap-x-3">
          {menuItems.map((mI) => (
            <Link key={mI.id} href={mI.href} className="hover:text-indigo-400 hover:bg-neutral-700 transition p-2 rounded">{mI.name}</Link>
          ))}
        </div>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Выйти
          </button>
        )}
      </nav>
    </div>
  );
}