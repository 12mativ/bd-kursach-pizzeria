"use server";

import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const PizzaSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  price: z.number().min(0, "Цена должна быть положительной"),
});

export interface ICreatePizzaActionState {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  fieldErrors?: {
    name?: string[];
    description?: string[];
    price?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function createPizza(
  state: ICreatePizzaActionState,
  formData: FormData
): Promise<ICreatePizzaActionState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image") as File;

  const validatedFields = PizzaSchema.safeParse({
    name,
    description,
    price: Number(price),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
    };
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", name as string);
  formDataToSend.append("description", description as string);
  formDataToSend.append("price", price as string);
  if (image) {
    formDataToSend.append("image", image);
  }

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/pizza`, {
    method: "POST",
    body: formDataToSend,
  });

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при создании пиццы",
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
    };
  }

  revalidatePath("/pizza");

  return {
    fieldErrors: {},
    success: true,
    name: "",
    description: "",
    price: 0,
  };
}

export async function editPizza(
  state: ICreatePizzaActionState,
  formData: FormData
): Promise<ICreatePizzaActionState> {
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image") as File;

  const validatedFields = PizzaSchema.safeParse({
    name,
    description,
    price: Number(price),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
    };
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", name as string);
  formDataToSend.append("description", description as string);
  formDataToSend.append("price", price as string);
  if (image.size > 0) {
    formDataToSend.append("image", image);
  }

  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/pizza/${id}`,
    {
      method: "PATCH",
      body: formDataToSend,
    }
  );

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при обновлении пиццы",
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
    };
  }

  revalidatePath("/pizza");

  return {
    fieldErrors: {},
    success: true,
    name: name as string,
    description: description as string,
    price: Number(price),
  };
}

export async function deletePizza(
  state: { error: string },
  formData: FormData
): Promise<{ error: string; success: boolean }> {
  const response = await fetchWithAuth(
    `${process.env.BACKEND_URL}/pizza/${formData.get("id")}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return {
      error: "Ошибка при удалении пиццы",
      success: false,
    };
  }

  revalidatePath("/pizza");

  return {
    error: "",
    success: true,
  };
}
