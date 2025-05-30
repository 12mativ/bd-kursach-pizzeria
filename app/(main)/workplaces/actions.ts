"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";

const WorkplaceSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  capacity: z.number({message: "Поле обязательно для заполнения"}).min(0, {message: "Значение вместимости рабочего места должно быть положительным"}),
});

export interface ICreateWorkplaceActionState {
  name?: string;
  capacity?: number;
  fieldErrors?: {
    name?: string[];
    capacity?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function createWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const name = formData.get("name") as string;
  const capacity = Number(formData.get("capacity"));

  const validatedFields = WorkplaceSchema.safeParse({
    name,
    capacity
  });

  if (!validatedFields.success) {
    return {
      name,
      capacity,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
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
      name,
      capacity,
      fieldErrors: {},
      error: "Ошибка при создании рабочего места",
      success: false,
    };
  }

  revalidatePath("/workplaces");

  return {
    fieldErrors: {},
    success: true,
  };
}

export async function editWorkplace(
  state: ICreateWorkplaceActionState,
  formData: FormData
): Promise<ICreateWorkplaceActionState> {
  const validatedFields = WorkplaceSchema.safeParse({
    name: formData.get("name"),
    capacity: Number(formData.get("capacity")),
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

  if (response.status === 400) {
    return { error: "Количество сотрудников превысило вместимость рабочего места" };
  }

  if (!response.ok) {
    return { error: "Ошибка при добавлении сотрудников" };
  }

  revalidatePath("/workplaces");

  return { error: "", success: true };
}
