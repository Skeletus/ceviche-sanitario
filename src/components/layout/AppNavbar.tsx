"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getRoleLabel, getRoleMenuItems } from "@/lib/roles";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/auth";

type AppNavbarProps = {
  profile: Profile;
};

export function AppNavbar({ profile }: AppNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuItems = getRoleMenuItems(profile.role);

  async function handleSignOut() {
    setErrorMessage("");

    if (!supabase) {
      setErrorMessage("No se pudo cerrar la sesion en este momento.");
      return;
    }

    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    setIsSigningOut(false);

    if (error) {
      setErrorMessage("No se pudo cerrar la sesion. Intenta nuevamente.");
      return;
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-emerald-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-base font-bold text-sanitary-ink" href="/dashboard">
            Ceviche Sanitario
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-md bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
              {profile.full_name}
            </span>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-semibold text-sanitary-green">
              {getRoleLabel(profile.role)}
            </span>
            <button
              className="rounded-md border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 transition hover:border-sanitary-green hover:text-sanitary-green disabled:cursor-not-allowed disabled:text-slate-400"
              disabled={isSigningOut}
              onClick={handleSignOut}
              type="button"
            >
              {isSigningOut ? "Cerrando..." : "Cerrar sesion"}
            </button>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2 text-sm">
          <Link
            className={`rounded-md border px-3 py-1.5 font-medium transition ${
              pathname === "/stalls"
                ? "border-sanitary-green bg-emerald-50 text-sanitary-green"
                : "border-slate-200 text-slate-700 hover:border-sanitary-green hover:text-sanitary-green"
            }`}
            href="/stalls"
          >
            Consulta publica
          </Link>
          {menuItems.map((item) =>
            item.href ? (
              <Link
                className={`rounded-md border px-3 py-1.5 font-medium transition ${
                  pathname === item.href
                    ? "border-sanitary-green bg-emerald-50 text-sanitary-green"
                    : "border-slate-200 text-slate-700 hover:border-sanitary-green hover:text-sanitary-green"
                }`}
                href={item.href}
                key={item.title}
              >
                {item.title}
              </Link>
            ) : (
              <span
                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 font-medium text-slate-500"
                key={item.title}
              >
                {item.title}
              </span>
            )
          )}
        </nav>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </header>
  );
}
