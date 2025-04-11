"use client";

import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

export function Header() {
  const {
    token,
    userInfo,
    logout: logoutLocal,
    handleUnauthorized,
  } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.status === 401) {
        handleUnauthorized();
        return;
      }
      logoutLocal();
      router.push("/auth");
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };

  var menuItems = [
    {
      id: 1,
      name: "Главная",
      href: "/",
      roles: ["ADMIN", "MANAGER", "PIZZAMAKER", "CASHIER"],
    },
    { id: 2, name: "Сотрудники", href: "/employees", roles: ["ADMIN", "MANAGER"] },
    { id: 3, name: "Рабочие места", href: "/workplaces", roles: ["ADMIN", "MANAGER"] },
  ];

  return (
    <div className="p-3 bg-neutral-800">
      <nav className="flex items-center justify-between">
        <div className="flex gap-x-3">
          {menuItems.map(
            (mI) =>
              userInfo?.role &&
              mI.roles.includes(userInfo.role) && (
                <Link
                  key={mI.id}
                  href={mI.href}
                  className="hover:text-indigo-400 hover:bg-neutral-700 transition p-2 rounded"
                >
                  {mI.name}
                </Link>
              )
          )}
        </div>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer transition"
          >
            <LogOut />
          </button>
        )}
      </nav>
    </div>
  );
}
