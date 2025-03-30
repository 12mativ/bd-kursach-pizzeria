"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Длина имени должна превышать 1 символ" })
    .max(50, { message: "Длина имени не должна превышать 50 символов" }),
  surname: z
    .string()
    .min(2, { message: "Длина фамилии должна превышать 1 символ" })
    .max(50, { message: "Длина фамилии не должна превышать 50 символов" }),
  patronymic: z
    .string()
    .min(2, { message: "Длина отчества должна превышать 1 символ" })
    .max(50, { message: "Длина отчества не должна превышать 50 символов" }),
  phone: z
    .string()
    .regex(/^7\d{10}$/, {
      message: "Номер телефона должен быть в формате 79999999999",
    }),
});

export interface ICreateEmployeeActionState {
  name?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
  fieldErrors?: {
    name?: string[];
    surname?: string[];
    patronymic?: string[];
    phone?: string[];
  };
  error?: string;
}

export async function createEmployee(
  prevState: ICreateEmployeeActionState,
  formData: FormData
): Promise<ICreateEmployeeActionState> {
  const name = formData.get("name") as string;
  const surname = formData.get("surname") as string;
  const patronymic = formData.get("patronymic") as string;
  const phone = formData.get("phone") as string;

  const validatedFields = createEmployeeSchema.safeParse({
    name,
    surname,
    patronymic,
    phone,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      name,
      surname,
      patronymic,
      phone,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/employees`, {
    method: "POST",
    body: JSON.stringify({ name, surname, patronymic, phone }),
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при создании сотрудника",
    };
  }

  revalidatePath("/employees");
  return {
    name,
    surname,
    patronymic,
    phone,
    fieldErrors: undefined,
    error: undefined
  };
}
