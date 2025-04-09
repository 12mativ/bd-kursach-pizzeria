"use client";

import { signup, FormState } from "../actions/auth";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "@/components/ui/form-error";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState: FormState = {
  name: "",
  surname: "",
  patronymic: "",
  phone: "",
  email: "",
  password: "",
  errors: undefined,
  message: undefined,
  access_token: undefined,
};

export default function AuthPage() {
  const [state, formAction] = useActionState(signup, initialState);
  const { saveToken, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  useEffect(() => {
    if (state?.access_token) {
      saveToken(state.access_token);
      router.push("/");
    }
  }, [state, saveToken, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-zinc-800 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-100">Регистрация</h2>
        </div>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="surname" className="text-zinc-400">
              Фамилия
            </label>
            <Input
              id="surname"
              name="surname"
              type="text"
              required
              defaultValue={state?.surname}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.surname?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-zinc-400">
              Имя
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={state?.name}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.name?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="patronymic" className="text-zinc-400">
              Отчество
            </label>
            <Input
              id="patronymic"
              name="patronymic"
              type="text"
              defaultValue={state?.patronymic}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.patronymic?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-zinc-400">
              Номер телефона
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="79991234567"
              defaultValue={state?.phone}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.phone?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={state?.email}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.email?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-zinc-400">
              Пароль
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.password?.[0]} />
          </div>

          <SubmitButton text="Зарегистрироваться" />
          <FormError message={state?.message} />
        </form>
        <div className="text-center">
          <Link href="/auth/login" className="text-zinc-400 hover:text-zinc-300">
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </div>
  );
}