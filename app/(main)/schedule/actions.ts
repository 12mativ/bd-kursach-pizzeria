"use server";

import { fetchWithAuth } from "@/lib/server-utils/fetch-with-auth";
import { revalidatePath } from "next/cache";
import { verifySession } from "../../../lib/dal";
import { redirect } from "next/navigation";
import { z } from "zod";

const assignShiftSchema = z.object({
  date: z
    .string({ message: "Выберите дату" }),
  shiftId: z
    .string({ message: "Выберите смену" }),
});

export interface IAssignShiftActionState {
  date?: string;
  shiftId?: string;
  employeeId?: string;
  fieldErrors?: {
    date?: string[];
    shiftId?: string[];
  };
  error?: string;
  success?: boolean;
}

export async function assignShift(prevState: IAssignShiftActionState, formData: FormData): Promise<IAssignShiftActionState> {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/auth");
  }

  const date = formData.get("date") as string;
  console.log(date)
  const shiftId = formData.get("shiftId") as string;
  const employeeId = formData.get("employeeId") as string;

  const validatedFields = assignShiftSchema.safeParse({
    date,
    shiftId,
  });
  if (!validatedFields.success) {
    return {
      date,
      shiftId,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const response = await fetchWithAuth(`${process.env.BACKEND_URL}/employee-schedules/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employee_id: employeeId, shift_id: shiftId, work_date: date })
  });

  if (!response.ok) {
    return {
      ...prevState,
      error: "Ошибка при выборе смены",
      success: false
    };
  }

  revalidatePath("/schedule");

  return {
    error: "",
    success: true
  };
}