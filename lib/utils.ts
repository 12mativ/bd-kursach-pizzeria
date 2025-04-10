import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRole(role: "PIZZAMAKER" | "MANAGER" | "CASHIER") {
  var result;

  switch (role) {
    case "PIZZAMAKER":
      result = "Пиццамейкер";
      break;
    case "MANAGER":
      result = "Менеджер";
      break;
    case "CASHIER":
      result = "Касссир";
      break;
    default:
      result = "Пиццамейкер";
      break;
  }

  return result;
}
