"use server";

import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createWorkplaceSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Длина названия должна превышать 2 символа" })
    .max(50, { message: "Длина названия не должна превышать 50 символов" }),
  status: z.enum(["free", "occupied", "partly occupied"], {
    required_error: "Выберите статус рабочего места",
  }),
});

export interface ICreateWorkplaceActionState {
  id?: number;
  name?: string;
  status?: "free" | "occupied" | "partly occupied";
  fieldErrors?: {
    name?: string[];
    status?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function createWorkplace(
  prevState: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const name = formData.get("name") as string;
  const status = formData.get("status") as "free" | "occupied" | "partly occupied";

  const validatedFields = createWorkplaceSchema.safeParse({
    name,
    status,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      name,
      status,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/workplaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, status }),
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при создании рабочего места",
    };
  }

  revalidatePath("/workplaces");
  return {
    name: "",
    status: "free",
    fieldErrors: undefined,
    error: undefined,
    success: true,
  };
}

export async function editWorkplace(
  prevState: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const id = formData.get("id");
  const name = formData.get("name") as string;
  const status = formData.get("status") as "free" | "occupied" | "partly occupied";

  const validatedFields = createWorkplaceSchema.safeParse({
    name,
    status,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      name,
      status,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/workplaces/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, status }),
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при обновлении рабочего места",
      success: false,
    };
  }

  revalidatePath("/workplaces");
  return {
    name,
    status,
    fieldErrors: undefined,
    error: undefined,
    success: true,
  };
}

export async function deleteWorkplace(
  prevState: { error: string },
  formData: FormData
) {
  const id = formData.get("id");

  const response = await fetch(`${process.env.BACKEND_URL}/workplaces/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      error: "Ошибка при удалении рабочего места",
      success: false,
    };
  }

  revalidatePath("/workplaces");
  return {
    error: "",
    success: true,
  };
} 