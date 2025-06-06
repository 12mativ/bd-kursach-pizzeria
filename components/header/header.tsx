"use client";

import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/app/auth/actions";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { formatRole } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useCart } from "../providers/cart-provider";
export function Header() {
  const {
    token,
    userInfo,
    logout: logoutLocal,
    handleUnauthorized,
  } = useAuth();
  const router = useRouter();
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const { cart } = useCart();
  const pathname = usePathname();

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
    {
      id: 2,
      name: "Сотрудники",
      href: "/employees",
      roles: ["ADMIN", "MANAGER"],
    },
    {
      id: 3,
      name: "Рабочие места",
      href: "/workplaces",
      roles: ["ADMIN", "MANAGER", "PIZZAMAKER", "CASHIER"],
    },
    {
      id: 4,
      name: "Меню",
      href: "/products",
      roles: ["ADMIN", "MANAGER", "PIZZAMAKER", "CASHIER", "CLIENT"],
    },
    {
      id: 5,
      name: `Корзина | ${cart.length}`,
      href: "/cart",
      roles: ["CLIENT"],
    },
    {
      id: 6,
      name: `Заказы`,
      href: "/orders",
      roles: ["ADMIN", "MANAGER", "PIZZAMAKER", "CASHIER", "CLIENT"],
    },
    {
      id: 7,
      name: `Расписание`,
      href: "/schedule",
      roles: ["ADMIN", "MANAGER", "PIZZAMAKER", "CASHIER"],
    },
  ];

  useEffect(() => {
    setActiveMenuItem(pathname);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 p-3 bg-neutral-800 z-50">
      <nav className="flex items-center justify-between">
        <div className="flex gap-x-3">
          {menuItems.map(
            (mI) =>
              userInfo?.role &&
              mI.roles.includes(userInfo.role) && (
                <Link
                  key={mI.id}
                  href={mI.href}
                  className={`hover:text-indigo-400 hover:bg-neutral-700 transition p-2 rounded ${activeMenuItem === mI.href ? "text-indigo-400 bg-neutral-700" : ""}`}
                  onClick={() => setActiveMenuItem(mI.href)}
                >
                  {mI.name}
                </Link>
              )
          )}
        </div>
        {token && (
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col">
              <p className="text-white">{userInfo?.username}</p>
              <p className="text-indigo-400 text-sm">
                {formatRole(
                  userInfo?.role as "MANAGER" | "PIZZAMAKER" | "CASHIER"
                )}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded cursor-pointer transition"
            >
              <LogOut />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
