"use server";

import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateProductSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  price: z.number().min(0, "Цена должна быть положительной"),
  productType: z.enum(["PIZZA", "DRINK",], {
    message: "Выберите тип продукта",
  }),
});

const EditProductSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().optional(),
  price: z.number().min(0, "Цена должна быть положительной"),
});

export interface ICreateProductActionState {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  productType?: "PIZZA" | "DRINK";
  fieldErrors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    productType?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function createProduct(
  state: ICreateProductActionState,
  formData: FormData
): Promise<ICreateProductActionState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const productType = formData.get("productType");
  const image = formData.get("image") as File;

  const validatedFields = CreateProductSchema.safeParse({
    name,
    description,
    price: Number(price),
    productType
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
      name: name as string,
      description: description as string,
      productType: productType as "PIZZA" | "DRINK",
      price: Number(price),
    };
  }

  const formDataToSend = new FormData();
  formDataToSend.append("name", name as string);
  formDataToSend.append("description", description as string);
  formDataToSend.append("price", price as string);
  formDataToSend.append("productType", productType as "PIZZA" | "DRINK");
  if (image) {
    formDataToSend.append("image", image);
  }

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/products`, {
    method: "POST",
    body: formDataToSend,
  });

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при создании продукта",
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
      productType: productType as "PIZZA" | "DRINK",
    };
  }

  revalidatePath("/products");

  return {
    fieldErrors: {},
    success: true,
    name: "",
    description: "",
    price: 0,
  };
}

export async function editProduct(
  state: ICreateProductActionState,
  formData: FormData
): Promise<ICreateProductActionState> {
  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const image = formData.get("image") as File;

  const validatedFields = EditProductSchema.safeParse({
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
    `${process.env.BACKEND_URL}/products/${id}`,
    {
      method: "PATCH",
      body: formDataToSend,
    }
  );

  if (!response.ok) {
    return {
      fieldErrors: {},
      error: "Ошибка при обновлении продукта",
      success: false,
      name: name as string,
      description: description as string,
      price: Number(price),
    };
  }

  revalidatePath("/products");

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
    `${process.env.BACKEND_URL}/products/${formData.get("id")}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return {
      error: "Ошибка при удалении продукта",
      success: false,
    };
  }

  revalidatePath("/products");

  return {
    error: "",
    success: true,
  };
}
