"use server";

import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";

const registerEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Длина имени должна превышать 2 символа" })
    .max(50, { message: "Длина имени не должна превышать 50 символов" }),
  surname: z
    .string()
    .min(2, { message: "Длина фамилии должна превышать 2 символа" })
    .max(50, { message: "Длина фамилии не должна превышать 50 символов" }),
  patronymic: z
    .string()
    .min(2, { message: "Длина отчества должна превышать 2 символа" })
    .max(50, { message: "Длина отчества не должна превышать 50 символов" })
    .optional()
    .or(z.literal("")),
  phone: z.string().regex(/^7\d{10}$/, {
    message: "Номер телефона должен быть в формате 79999999999",
  }),
  username: z
    .string()
    .min(3, { message: "Логин должен содержать минимум 3 символа" })
    .max(50, { message: "Логин не должен превышать 50 символов" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" })
    .max(50, { message: "Пароль не должен превышать 50 символов" }),
  role: z.enum(["PIZZAMAKER", "MANAGER", "CASHIER"], {
    message: "Выберите роль сотрудника",
  }),
});

const editEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Длина имени должна превышать 2 символа" })
    .max(50, { message: "Длина имени не должна превышать 50 символов" }),
  surname: z
    .string()
    .min(2, { message: "Длина фамилии должна превышать 2 символа" })
    .max(50, { message: "Длина фамилии не должна превышать 50 символов" }),
  patronymic: z
    .string()
    .min(2, { message: "Длина отчества должна превышать 2 символа" })
    .max(50, { message: "Длина отчества не должна превышать 50 символов" })
    .optional()
    .or(z.literal("")),
  phone: z.string().regex(/^7\d{10}$/, {
    message: "Номер телефона должен быть в формате 79999999999",
  }),
  role: z.enum(["PIZZAMAKER", "MANAGER", "CASHIER"], {
    message: "Выберите роль сотрудника",
  }),
});

export interface ICreateEmployeeActionState {
  id?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
  username?: string;
  password?: string;
  role?: "PIZZAMAKER" | "MANAGER" | "CASHIER";
  fieldErrors?: {
    name?: string[];
    surname?: string[];
    patronymic?: string[];
    phone?: string[];
    username?: string[];
    password?: string[];
    role?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function registerEmployee(
  prevState: ICreateEmployeeActionState,
  formData: FormData
): Promise<ICreateEmployeeActionState> {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const patronymic = formData.get("patronymic") as string;
  const phone = formData.get("phone") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "MANAGER" | "PIZZAMAKER" | "CASHIER";

  const validatedFields = registerEmployeeSchema.safeParse({
    name,
    surname,
    patronymic,
    phone,
    username,
    password,
    role: formData.get("role")
  });
console.log(role)
  if (!validatedFields.success) {
    return {
      name,
      surname,
      patronymic,
      phone,
      username,
      password,
      role,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/auth/register/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, surname, patronymic, phone, username, password, role }),
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при регистрации сотрудника",
      success: false,
    };
  }

  revalidatePath("/employees");
  return {
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
    username: "",
    password: "",
    role: undefined,
    fieldErrors: undefined,
    error: undefined,
    success: true,
  };
}

export async function editEmployee(
  prevState: ICreateEmployeeActionState,
  formData: FormData
): Promise<ICreateEmployeeActionState> {
  const id = formData.get("id");
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const patronymic = formData.get("patronymic") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as "PIZZAMAKER" | "MANAGER" | "CASHIER";

  const validatedFields = editEmployeeSchema.safeParse({
    name,
    surname,
    patronymic,
    phone,
    role
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      name,
      surname,
      patronymic,
      phone,
      role,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, surname, patronymic, phone, role }),
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при создании сотрудника",
      success: false,
    };
  }

  revalidatePath("/employees");
  return {
    name: name,
    surname: surname,
    patronymic: patronymic,
    phone: phone,
    role: role,
    fieldErrors: undefined,
    error: undefined,
    success: true,
  };
}

export async function deleteEmployee(
  prevState: {error: string},
  formData: FormData
) {
  const id = formData.get("id");

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/employees/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      error: "Ошибка при удалении сотрудника",
      success: false
    };
  }

  revalidatePath("/employees");
  return {
    error: "",
    success: true
  };
}
