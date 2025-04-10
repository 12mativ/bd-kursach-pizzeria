"use client";

import { login, LoginFormState } from "../actions";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { FormError } from "@/components/ui/form-error";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState: LoginFormState = {
  login: "",
  password: "",
  errors: undefined,
  message: undefined,
  access_token: undefined,
};

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);
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
          <h2 className="text-2xl font-bold text-zinc-100">Вход</h2>
        </div>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="login" className="text-zinc-400">
              Логин
            </label>
            <Input
              id="login"
              name="login"
              type="text"
              required
              defaultValue={state?.login}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.login?.[0]} />
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
              defaultValue={state?.password}
              className="bg-zinc-700 border-zinc-600 text-zinc-100"
            />
            <FormError message={state?.errors?.password?.[0]} />
          </div>

          <SubmitButton text="Войти" />
          <FormError message={state?.message} />
        </form>
        <div className="text-center">
          <Link href="/auth" className="text-zinc-400 hover:text-zinc-300">
            Нет аккаунта? Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
} 