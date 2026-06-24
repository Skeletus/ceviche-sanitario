"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { supabase } from "@/lib/supabase";
import type { UserRole } from "@/types/auth";

const ADMIN_ONLY: readonly UserRole[] = ["admin"];

export default function AdminDashboardPage() {
  const [apiMessage, setApiMessage] = useState("");
  const [isCheckingApi, setIsCheckingApi] = useState(false);

  async function checkApiPermission() {
    setApiMessage("");

    if (!supabase) {
      setApiMessage("Supabase no esta configurado.");
      return;
    }

    setIsCheckingApi(true);
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    if (!accessToken) {
      setApiMessage("No hay token de sesion para validar la API.");
      setIsCheckingApi(false);
      return;
    }

    const response = await fetch("/api/admin/permissions", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const payload = (await response.json()) as { message?: string };
    setApiMessage(payload.message ?? "Validacion de API completada.");
    setIsCheckingApi(false);
  }

  return (
    <ProtectedRoute allowedRoles={ADMIN_ONLY}>
      {({ profile }) => (
        <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
          <AppNavbar profile={profile} />

          <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
              Ruta protegida por rol
            </p>
            <h1 className="mt-3 text-3xl font-bold">Panel administrativo</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
              Esta pantalla es un placeholder funcional para validar que solo
              el rol administrador puede acceder manualmente a una ruta privada
              administrativa.
            </p>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Validacion de API</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                El endpoint de ejemplo rechaza usuarios sin token o sin rol
                administrador.
              </p>
              <button
                className="mt-4 rounded-md bg-sanitary-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={isCheckingApi}
                onClick={checkApiPermission}
                type="button"
              >
                {isCheckingApi ? "Validando..." : "Probar permiso de API"}
              </button>
              {apiMessage ? (
                <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {apiMessage}
                </p>
              ) : null}
            </div>
          </section>
        </main>
      )}
    </ProtectedRoute>
  );
}
