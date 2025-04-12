"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { useFetch } from "@/hooks/use-fetch";
import { fetchWithAuth } from "@/utils/fetch";

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать минимум 2 символа" })
    .max(50, { message: "Имя не должно превышать 50 символов" }),
  surname: z
    .string()
    .min(2, { message: "Фамилия должна содержать минимум 2 символа" })
    .max(50, { message: "Фамилия не должна превышать 50 символов" }),
  patronymic: z
    .string()
    .min(2, { message: "Отчество должно содержать минимум 2 символа" })
    .max(50, { message: "Отчество не должно превышать 50 символов" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^7\d{10}$/, { message: "Номер телефона должен быть в формате 79991234567" }),
  email: z
    .string()
    .email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" })
    .max(50, { message: "Пароль не должен превышать 50 символов" }),
});

const LoginFormSchema = z.object({
  login: z
    .string()
    .min(1, { message: "Введите логин" }),
  password: z
    .string()
    .min(1, { message: "Введите пароль" }),
});

export interface FormState {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  email: string;
  password: string;
  errors?: {
    name?: string[];
    surname?: string[];
    patronymic?: string[];
    phone?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  access_token: string | undefined;
}

export interface LoginFormState {
  login: string;
  password: string;
  errors?: {
    login?: string[];
    password?: string[];
  };
  message?: string;
  access_token: string | undefined;
}

export async function signup(state: FormState, formData: FormData) {
  var name = formData.get("name") as string;
  var surname = formData.get("surname") as string;
  var patronymic = formData.get("patronymic") as string;
  var phone = formData.get("phone") as string;
  var email = formData.get("email") as string;
  var password = formData.get("password") as string;

  const validatedFields = SignupFormSchema.safeParse({
    name: name,
    surname: surname,
    patronymic: patronymic,
    phone: phone,
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      ...state,
      name: name,
      surname: surname,
      patronymic: patronymic,
      phone: phone,
      email: email,
      password: password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const response = await fetch(`${process.env.BACKEND_URL}/auth/register/client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, surname, patronymic, phone, email, password}),
  });

  if (!response.ok) {
    return {
      ...state,
      name: name,
      surname: surname,
      patronymic: patronymic,
      phone: phone,
      email: email,
      password: password,
      message: "Ошибка при регистрации",
    };
  }

  const data = await response.json();
  return { 
    ...state,
    name: name,
    surname: surname,
    patronymic: patronymic,
    phone: phone,
    email: email,
    password: password,
    access_token: data.access_token 
  };
}

export async function login(state: LoginFormState, formData: FormData) {
  const login = formData.get("login") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginFormSchema.safeParse({
    login,
    password,
  });

  if (!validatedFields.success) {
    return {
      ...state,
      login,
      password,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    return {
      ...state,
      login,
      password,
      message: "Неверный логин или пароль",
    };
  }

  const data = await response.json();
  return { 
    ...state,
    login,
    password,
    access_token: data.access_token 
  };
}

export async function logout() {
  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/auth/logout`, {
    method: "POST",
  });

  if (response.status === 401) {
    return { status: 401 };
  }

  if (!response.ok) {
    throw new Error("Ошибка при выходе из аккаунта");
  }
}