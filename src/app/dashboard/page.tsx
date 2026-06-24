"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppNavbar } from "@/components/layout/AppNavbar";
import {
  getRoleLabel,
  getRoleMenuItems,
  ROLE_DESCRIPTIONS
} from "@/lib/roles";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      {({ profile, email }) => {
        const menuItems = getRoleMenuItems(profile.role);

        return (
          <main className="min-h-screen bg-[#f7faf7] text-sanitary-ink">
            <AppNavbar profile={profile} />

            <section className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                Sesion autenticada correctamente.
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <section>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sanitary-green">
                    Dashboard privado
                  </p>
                  <h1 className="mt-3 text-3xl font-bold">
                    Bienvenido, {profile.full_name}
                  </h1>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Tu rol actual es{" "}
                    <strong>{getRoleLabel(profile.role)}</strong>. Desde este
                    panel se muestran solo las funcionalidades habilitadas para
                    tu perfil.
                  </p>
                </section>

                <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold">Perfil basico</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-slate-500">Correo</dt>
                      <dd className="mt-1 text-slate-800">{email}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">Rol</dt>
                      <dd className="mt-1 text-slate-800">
                        {getRoleLabel(profile.role)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500">Estado</dt>
                      <dd className="mt-1 text-slate-800">
                        {profile.is_active ? "Activo" : "Inactivo"}
                      </dd>
                    </div>
                  </dl>
                </aside>
              </div>

              <section className="mt-8">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold">
                    Opciones disponibles
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {ROLE_DESCRIPTIONS[profile.role]}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {menuItems.map((item) => (
                    <article
                      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                      key={item.title}
                    >
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                      {item.href ? (
                        <Link
                          className="mt-4 inline-flex rounded-md bg-sanitary-green px-3 py-2 text-sm font-semibold text-white transition hover:bg-sanitary-ink"
                          href={item.href}
                        >
                          Abrir
                        </Link>
                      ) : (
                        <p className="mt-4 text-sm font-medium text-slate-500">
                          Placeholder para siguientes historias.
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            </section>
          </main>
        );
      }}
    </ProtectedRoute>
  );
}
