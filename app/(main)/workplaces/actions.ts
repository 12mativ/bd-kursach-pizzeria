"use server";

import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { fetchWithAuth } from "@/utils/fetch";

const WorkplaceSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  status: z.enum(["free", "occupied", "partly occupied"], {
    required_error: "Статус обязателен",
  }),
});

export interface ICreateWorkplaceActionState {
  name?: string;
  status?: string;
  fieldErrors?: {
    name?: string[];
    status?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function createWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const validatedFields = WorkplaceSchema.safeParse({
    name: formData.get("name"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: "Неверные данные. Не удалось создать рабочее место.",
      success: false,
    };
  }

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/workplaces`,
    {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    }
  );

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при создании рабочего места",
      success: false,
    };
  }

  revalidatePath("/workplaces");

  return {
    fieldErrors: {},
    error: "Рабочее место успешно создано",
    success: true,
  };
}

export async function editWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const validatedFields = WorkplaceSchema.safeParse({
    name: formData.get("name"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: "Неверные данные. Не удалось обновить рабочее место.",
    };
  }

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/workplaces/${formData.get("id")}`,
    {
      method: "PATCH",
      body: JSON.stringify(validatedFields.data),
    }
  );

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при обновлении рабочего места",
    };
  }

  revalidatePath("/workplaces");

  return {
    fieldErrors: {},
    error: "",
    success: true,
  };
}

export async function deleteWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/workplaces/${formData.get("id")}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return { error: "Ошибка при удалении рабочего места" };
  }

  revalidatePath("/workplaces");

  return { error: "", success: true };
}

export async function addEmployeeToWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const workplaceId = formData.get("workplaceId") as string;
  const employeeIds = formData.getAll("employeeIds").map((id) => +id);

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/workplaces/${workplaceId}/employees`,
    {
      method: "PATCH",
      body: JSON.stringify({ employeeIds }),
    }
  );

  if (!response.ok) {
    return { error: "Ошибка при добавлении сотрудников" };
  }

  revalidatePath("/workplaces");

  return { error: "", success: true };
}
