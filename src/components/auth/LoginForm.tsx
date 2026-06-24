"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isSupabaseConfigured || !supabase) {
      setErrorMessage(
        "El acceso no esta disponible en este momento. Intenta nuevamente mas tarde."
      );
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage("Correo o contrasena incorrectos.");
      return;
    }

    setSuccessMessage("Sesion iniciada correctamente. Redirigiendo al panel...");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form
      className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
          Acceso seguro
        </p>
        <h1 className="mt-3 text-3xl font-bold text-sanitary-ink">
          Iniciar sesion
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Ingresa con el correo y la contrasena de tu cuenta registrada.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Correo electronico
          <input
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="usuario@correo.com"
            required
            type="email"
            value={email}
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            Usa el correo asociado a tu perfil municipal.
          </span>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Contrasena
          <input
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-sanitary-green focus:ring-2 focus:ring-sanitary-green/20"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contrasena"
            required
            type="password"
            value={password}
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            La contrasena distingue mayusculas y minusculas.
          </span>
        </label>
      </div>

      {errorMessage ? (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {successMessage}
        </div>
      ) : null}

      <button
        className="mt-6 w-full rounded-md bg-sanitary-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sanitary-ink disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Validando sesion..." : "Ingresar"}
      </button>
    </form>
  );
}
